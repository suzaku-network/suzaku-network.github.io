/**
 * initStepScroll
 *
 * Registers a Lenis virtualScroll interceptor that snaps a sticky-scroll
 * section to discrete step positions, one step per scroll action.
 *
 * Key mechanisms:
 * - lenis.scrollTo(target, { lock: true, force: true }) prevents ALL new scroll
 *   input during the animation with no queuing or skipping.
 * - An entry-snap listener (lenis.on 'scroll') detects the first frame where
 *   the sticky zone becomes active and corrects any lerp overshoot that Lenis
 *   accumulated while approaching the section from outside. Without this, the
 *   first card can end up mid-transition because Lenis's lerp target was set
 *   past snap[0] before the section pinned.
 *
 * Returns a cleanup function that removes all listeners.
 */
import lenis, { registerVirtualScrollInterceptor, getScrollDestination } from './lenis';

export interface StepScrollConfig {
  outerEl: HTMLElement;
  stepCount: number;
  holdWeight: number;
  transWeight: number;
  /**
   * Called when the user exits the section after fully traversing it (leaves from the bottom).
   * Use this to hard-reset the visual state and set an `isResetting` flag to suppress
   * scroll-driven updates during the return animation.
   */
  onLeave?: () => void;
  /**
   * How long to wait (ms) after leaving before calling `onLeave`. Set this to the
   * section-snap animation duration so the reset is hidden behind the outgoing transition.
   * If the user re-enters the section before the delay expires the pending call is cancelled.
   */
  resetDelay?: number;
  /**
   * Called once the entry-snap animation to step 0 completes (or immediately if no
   * correction is needed). Clear the `isResetting` flag here to resume scroll-driven updates.
   */
  onResetEnd?: () => void;
}

export function initStepScroll(config: StepScrollConfig): () => void {
  const { outerEl, stepCount, holdWeight, transWeight } = config;
  const totalW = stepCount * holdWeight + (stepCount - 1) * transWeight;

  /** Absolute document Y of the outer element's top edge. */
  function getOuterTop(): number {
    return outerEl.getBoundingClientRect().top + window.scrollY;
  }

  /** Snap positions: window.scrollY value for the start of each step's hold phase. */
  function getSnapPositions(): number[] {
    const vh = window.innerHeight;
    const scrollBudget = Math.max(0, outerEl.offsetHeight - vh);
    const outerTop = getOuterTop();
    const positions: number[] = [];
    for (let i = 0; i < stepCount; i++) {
      const cum = i * (holdWeight + transWeight);
      const rawProgress = totalW > 0 ? cum / totalW : 0;
      positions.push(outerTop + rawProgress * scrollBudget);
    }
    return positions;
  }

  /** Find the step whose snap position is closest to current scroll. */
  function getNearestStep(positions: number[]): number {
    const scrollY = window.scrollY;
    let closest = 0;
    let minDist = Infinity;
    for (let i = 0; i < positions.length; i++) {
      const dist = Math.abs(scrollY - positions[i]);
      if (dist < minDist) { minDist = dist; closest = i; }
    }
    return closest;
  }

  /** True when the outer div is pinned sticky to the viewport top. */
  function isInStickyZone(): boolean {
    const rect = outerEl.getBoundingClientRect();
    const vh = window.innerHeight;
    return rect.top <= 1 && rect.bottom >= vh - 1;
  }

  let isLocked = false;
  let prevInZone = false;
  let pendingLeave: ReturnType<typeof setTimeout> | null = null;

  // True after onLeave fires and before onResetEnd is called. Used by the
  // interceptor as a fallback: if lenis.on('scroll') didn't fire during a
  // lock:true animation, the interceptor handles the pending entry instead.
  let needsResetEnd = false;

  function callResetEnd() {
    needsResetEnd = false;
    config.onResetEnd?.();
  }

  /** Is the current scrollTo animation's destination within this section? */
  function isDestInSection(): boolean {
    const dest = getScrollDestination();
    if (dest === null) return false;
    const outerTop = getOuterTop();
    const scrollBudget = Math.max(0, outerEl.offsetHeight - window.innerHeight);
    return dest >= outerTop - 5 && dest <= outerTop + scrollBudget + 5;
  }

  // ── Entry-snap ──────────────────────────────────────────────────────────────
  // Fires every Lenis frame. On the first frame where the section becomes sticky,
  // snap to the correct entry position (snap[0]).
  //
  // Why this is needed: the user may have been scrolling quickly with the mouse.
  // Lenis accumulated a large targetScroll before the section pinned. By the time
  // we detect the sticky zone, animatedScroll may already be well into the first
  // transition. getNearestStep would then wrongly return step 1 and the
  // virtualScroll interceptor would snap to step 2, skipping card 1 entirely.
  //
  // Programmatic-scroll guard: when `lenis.isLocked` is true, a scrollTo animation
  // is in progress (nav jump, back-to-top, sectionSnap). We check whether the
  // animation's target falls inside this section:
  //   - Outside → pass-through. Don't intercept, don't touch isResetting.
  //   - Inside  → the animation is landing here. Wait for arrival, then reset.
  const onScroll = () => {
    const scrollY = window.scrollY;
    const inZone = isInStickyZone();

    if (!inZone && prevInZone && config.onLeave) {
      const positions = getSnapPositions();
      if (scrollY > positions[stepCount - 1]) {
        if (config.resetDelay) {
          pendingLeave = setTimeout(() => {
            pendingLeave = null;
            needsResetEnd = true;
            config.onLeave!();
          }, config.resetDelay);
        } else {
          needsResetEnd = true;
          config.onLeave();
        }
      }
    }

    if (inZone && !prevInZone && !isLocked) {
      if (pendingLeave !== null) {
        clearTimeout(pendingLeave);
        pendingLeave = null;
      }

      const positions = getSnapPositions();
      const entryTarget = positions[0];

      if (lenis.isLocked) {
        // A programmatic scrollTo is in flight.
        if (isDestInSection()) {
          // Landing here (e.g. sectionSnap backward into this section).
          // Wait for arrival before calling onResetEnd so that isResetting
          // stays true and update() is suppressed during the animation.
          isLocked = true;
          const unsub = lenis.on('scroll', () => {
            if (!lenis.isLocked || Math.abs(window.scrollY - entryTarget) <= 10) {
              unsub();
              isLocked = false;
              callResetEnd();
            }
          });
        }
        // Target is outside this section (nav jump or back-to-top passing
        // through). Don't intercept and don't call onResetEnd — keep
        // isResetting as-is so update() stays suppressed.
      } else if (Math.abs(scrollY - entryTarget) > 10) {
        // Natural scrolling (wheel/touch) overshot step 0. Correct.
        isLocked = true;
        lenis.scrollTo(entryTarget, {
          lock: true,
          force: true,
          duration: 0.4,
          easing: (t: number) => 1 - Math.pow(1 - t, 3),
          onComplete: () => { isLocked = false; callResetEnd(); },
        });
      } else {
        callResetEnd();
      }
    }

    prevInZone = inZone;
  };

  const unsubScroll = lenis.on('scroll', onScroll);

  // ── Step interceptor ────────────────────────────────────────────────────────
  const interceptor = (deltaY: number): boolean => {
    if (!isInStickyZone()) return false; // not our section — pass through

    if (isLocked) return true; // animation running — swallow but don't re-trigger

    // Fallback entry handling: if the section was reset (onLeave fired) and we
    // arrived via a lock:true animation whose scroll events didn't reach the
    // onScroll entry-snap above, handle the pending initialization now.
    // Swallow this one event so the section gets a clean start before the user
    // can step through or exit.
    if (!prevInZone && needsResetEnd) {
      prevInZone = true;
      callResetEnd();
      return true;
    }

    const direction = deltaY > 0 ? 1 : -1;
    const positions = getSnapPositions();
    const currentStep = getNearestStep(positions);

    // At boundaries, let the event pass through so the user exits naturally
    if (direction < 0 && currentStep === 0) return false;
    if (direction > 0 && currentStep === stepCount - 1) return false;

    const nextStep = currentStep + direction;
    isLocked = true;

    lenis.scrollTo(positions[nextStep], {
      lock: true,
      // force: proceed even if Lenis is already locked from a previous
      // scrollTo that hasn't fired onStart yet (one-frame timing gap).
      force: true,
      duration: 0.8,
      easing: (t: number) => 1 - Math.pow(1 - t, 3), // ease-out cubic
      onComplete: () => { isLocked = false; },
    });

    return true; // event handled — tell Lenis to swallow it
  };

  const unregisterInterceptor = registerVirtualScrollInterceptor(interceptor);

  return () => {
    if (pendingLeave !== null) {
      clearTimeout(pendingLeave);
      pendingLeave = null;
    }
    unsubScroll();
    unregisterInterceptor();
  };
}
