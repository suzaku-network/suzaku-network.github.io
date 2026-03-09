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
import lenis, { registerVirtualScrollInterceptor } from './lenis';

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

  // ── Entry-snap ──────────────────────────────────────────────────────────────
  // Fires every Lenis frame. On the first frame where the section becomes sticky,
  // snap to the correct entry position (snap[0] from top, snap[N-1] from bottom).
  //
  // Why this is needed: the user may have been scrolling quickly with the mouse.
  // Lenis accumulated a large targetScroll before the section pinned. By the time
  // we detect the sticky zone, animatedScroll may already be well into the first
  // transition. getNearestStep would then wrongly return step 1 and the
  // virtualScroll interceptor would snap to step 2, skipping card 1 entirely.
  const onScroll = () => {
    const inZone = isInStickyZone();

    if (!inZone && prevInZone && config.onLeave) {
      // Leaving the sticky zone from the bottom means the section was fully traversed.
      // Reset to initial state so re-entry always starts from step 0.
      const positions = getSnapPositions();
      if (window.scrollY > positions[stepCount - 1]) {
        if (config.resetDelay) {
          // Delay the reset so it fires after the outgoing snap animation completes,
          // hiding the state change from the user.
          pendingLeave = setTimeout(() => {
            pendingLeave = null;
            config.onLeave!();
          }, config.resetDelay);
        } else {
          config.onLeave();
        }
      }
    }

    if (inZone && !prevInZone && !isLocked) {
      // Cancel any pending delayed reset — the user returned before it fired.
      // onLeave will not be called; update() handles the visual state via scroll position.
      if (pendingLeave !== null) {
        clearTimeout(pendingLeave);
        pendingLeave = null;
      }
      const positions = getSnapPositions();
      const scrollY = window.scrollY;

      // Always enter at step 0 so sections reset to their initial state on re-entry.
      const entryTarget = positions[0];

      // Only correct if we're meaningfully off the entry snap point
      if (Math.abs(scrollY - entryTarget) > 10) {
        isLocked = true;

        if (lenis.isLocked && Math.abs(lenis.targetScroll - entryTarget) <= 20) {
          // A locked animation (e.g. sectionSnap) is already carrying us to entryTarget.
          // Overriding it with a short 0.4s correction would feel violent since the
          // remaining distance is small. Instead, let it complete and watch for arrival.
          const unsub = lenis.on('scroll', () => {
            if (Math.abs(window.scrollY - entryTarget) <= 10) {
              unsub();
              isLocked = false;
              config.onResetEnd?.();
            }
          });
        } else {
          // No suitable animation in progress — start the entry snap correction.
          lenis.scrollTo(entryTarget, {
            lock: true,
            force: true,
            duration: 0.4,
            easing: (t: number) => 1 - Math.pow(1 - t, 3),
            onComplete: () => { isLocked = false; config.onResetEnd?.(); },
          });
        }
      } else {
        // Already at step 0 — no animation needed, reset is done.
        config.onResetEnd?.();
      }
    }

    prevInZone = inZone;
  };

  const unsubScroll = lenis.on('scroll', onScroll);

  // ── Step interceptor ────────────────────────────────────────────────────────
  const interceptor = (deltaY: number): boolean => {
    if (!isInStickyZone()) return false; // not our section — pass through

    if (isLocked) return true; // animation running — swallow but don't re-trigger

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
