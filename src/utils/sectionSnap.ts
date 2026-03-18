/**
 * initSectionSnap
 *
 * Registers a virtualScroll interceptor that snaps between major page sections.
 * All section behavior is derived from the centralized `sections` config in
 * `src/data/sections.ts`. No configuration is required at the call site.
 *
 * Sections are categorized into two types based on their breakpoint config:
 *
 * Non-scrollable sections (scrollable: false):
 *   Height is ~one viewport. Always intercept the scroll event, snap to the
 *   section's top edge, and exit immediately. The current non-scrollable section
 *   is excluded from candidates so the user always exits to the adjacent one.
 *
 * Scrollable sections (scrollable: true):
 *   Significantly taller than a viewport. Allow free scrolling within the
 *   section and only snap at boundaries:
 *   - Scrolling down: fires when within NEAR_BOTTOM px of the section's bottom.
 *   - Scrolling up:   fires when within NEAR_TOP px of the section's top.
 *   The `snapBackTo` property controls the landing position when entering from
 *   below (scrolling up): 'bottom' lands at the section's bottom edge so the
 *   user sees the end; 'top' always lands at the section's top.
 *
 * Breakpoint resolution:
 *   Desktop (≥1024px) and mobile configs are resolved on every scroll event,
 *   so responsive behavior automatically tracks window resizes.
 *
 * Sticky section handling:
 *   stepScroll interceptors are registered before this one in the chain; they
 *   handle internal steps and pass through only at section boundaries (step 0
 *   going up, last step going down). At those boundaries this interceptor fires
 *   to snap to the adjacent section.
 *
 * No manual isLocked flag: Lenis's own lock:true prevents our virtualScroll
 * callback from being called during an animation, removing the risk of the
 * flag getting stuck when step-scroll overrides the animation with force:true.
 */
import lenis, { registerVirtualScrollInterceptor } from "./lenis";
import { sections } from "@/data/sections";

const NEAR_BOTTOM = 100; // px before section bottom triggers downward snap
const NEAR_TOP = 50; // px into section top triggers upward snap
const DESKTOP_BP = 1024;

/** Duration of the section-snap animation in milliseconds. */
export const SNAP_DURATION_MS = 1000;

export function initSectionSnap(): () => void {
  function getTop(el: HTMLElement): number {
    return el.getBoundingClientRect().top + window.scrollY;
  }

  // After a snap animation completes, ignore scroll events briefly to prevent
  // residual touch momentum (finger lift) from immediately reversing the snap.
  let cooldownUntil = 0;
  const POST_SNAP_COOLDOWN = 400; // ms

  const interceptor = (deltaY: number): boolean => {
    if (Date.now() < cooldownUntil) return true;
    const direction = deltaY > 0 ? 1 : -1;
    const scrollY = window.scrollY;
    const vh = window.innerHeight;
    const isDesktop = window.innerWidth >= DESKTOP_BP;

    // Build per-section data, resolving breakpoint config on every event.
    const items = sections
      .map((sec) => {
        const el = document.getElementById(sec.id);
        if (!el) return null;
        const cfg = isDesktop ? sec.desktop : sec.mobile;
        if (cfg.hidden) return null;
        const isSnap = !cfg.scrollable;
        const outerTop = getTop(el);
        const height = el.offsetHeight;
        const snapY =
          cfg.snapAlign === "bottom"
            ? outerTop + height - vh
            : cfg.scrollable && cfg.snapBackTo === "bottom" && direction < 0
              ? outerTop + Math.max(0, height - vh)
              : outerTop;
        return { id: sec.id, outerTop, height, snapY, isSnap, cfg };
      })
      .filter((item): item is NonNullable<typeof item> => item !== null);

    // Identify the most specific section the user is currently inside.
    // Use the lower of outerTop and snapY so that sections with
    // snapAlign:'bottom' (whose snap position is above their DOM top)
    // are correctly detected as "current" when the user is snapped there.
    const effectiveTop = (i: (typeof items)[0]) =>
      Math.min(i.outerTop, i.snapY);
    const byTop = [...items].sort((a, b) => effectiveTop(a) - effectiveTop(b));
    const current = byTop.reduce<(typeof items)[0] | null>(
      (found, item) => (scrollY >= effectiveTop(item) - 5 ? item : found),
      null,
    );

    // Scrollable section: only snap at the boundaries, free-scroll everywhere else.
    if (current && !current.isSnap) {
      // Section fits entirely in the viewport (e.g. TakeAction on mobile).
      // There are no internal boundaries to snap at, so let the browser scroll
      // through it naturally.
      if (current.height <= vh) return false;

      if (direction > 0) {
        const distToBottom = current.outerTop + current.height - (scrollY + vh);
        if (distToBottom > NEAR_BOTTOM) return false;
      } else {
        const distToTop = scrollY - current.outerTop;
        if (distToTop > NEAR_TOP) return false;
      }
    }

    // Build snap point candidates.
    // Non-scrollable sections: exclude the current section so we always exit to
    // the adjacent section rather than snapping back to our own top.
    const snapPoints = items
      .filter((i) => !(current?.isSnap && i.id === current.id))
      .map((i) => i.snapY)
      .sort((a, b) => a - b);

    let target: number | null = null;

    if (direction > 0) {
      for (const p of snapPoints) {
        if (p > scrollY + 5) {
          target = p;
          break;
        }
      }
    } else {
      for (let i = snapPoints.length - 1; i >= 0; i--) {
        if (snapPoints[i] < scrollY - 5) {
          target = snapPoints[i];
          break;
        }
      }
    }

    if (target === null) return false;

    // Forward snaps cover ~1 viewport (we're always at the section's last step when
    // stepping forward). Keep them snappy: 1.0s ease-out-quartic.
    //
    // Backward snaps span the full scroll budget of the destination section
    // (e.g. the-risks is 500vh → snapping back to it from take-action covers 500vh).
    // The right unit is not pixels but internal steps: a section with stepCount=4
    // took 4 × 0.8s = ~3.2s to traverse forward, so returning should feel proportional.
    // Duration = stepCount × 0.5s, minimum 1.0s.
    // Ease-in-out (starts slow) rather than ease-out (starts fast) avoids the violent
    // initial burst that made the backward snap feel jarring.
    const isBackward = target < scrollY;
    const destItem = items.find((i) => i.snapY === target);
    const destSteps = destItem?.cfg.stepCount ?? 1;
    const duration = isBackward
      ? Math.max(1.0, destSteps * 0.5)
      : SNAP_DURATION_MS / 1000;
    const easing: (t: number) => number = isBackward
      ? (t) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2) // ease-in-out quad
      : (t) => 1 - Math.pow(1 - t, 4); // ease-out quart

    lenis.scrollTo(target, {
      lock: true,
      force: true,
      duration,
      easing,
      onComplete: () => {
        cooldownUntil = Date.now() + POST_SNAP_COOLDOWN;
      },
    });
    return true;
  };

  return registerVirtualScrollInterceptor(interceptor);
}
