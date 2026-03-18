/**
 * Global Lenis singleton.
 *
 * Lenis takes over all wheel events on the page, providing smooth scrolling
 * via its lerp-based animation loop. Components that need to intercept scroll
 * input (e.g. step-scroll sections) register a VirtualScrollInterceptor here.
 *
 * The virtualScroll callback fires before Lenis processes each wheel event.
 * Returning `false` from it swallows the event (Lenis still calls
 * preventDefault on the underlying wheel event, so the browser does not
 * natively scroll either). Returning `true` lets Lenis handle it normally.
 */
import Lenis from "lenis";

type VirtualScrollInterceptor = (deltaY: number) => boolean;
const interceptors: VirtualScrollInterceptor[] = [];

// Track when Lenis yields to native overscroll (pull-to-refresh at the top,
// or overscroll bounce at the bottom). After yielding, suppress events briefly
// so the rubber-band bounce-back doesn't trigger a forward section snap.
let overscrollCooldownUntil = 0;
const OVERSCROLL_COOLDOWN = 400; // ms

const lenis = new Lenis({
  autoRaf: true,
  lerp: 0.3,
  virtualScroll: (data) => {
    // Ignore zero-delta events (touchstart taps, touchend after tap).
    // Without this guard, deltaY=0 is interpreted as direction=-1 by the
    // interceptors, causing a spurious backward snap on every mobile tap.
    if (data.deltaX === 0 && data.deltaY === 0) return true;

    // At the very top scrolling up (or very bottom scrolling down): yield to
    // the browser so native overscroll / pull-to-refresh works as expected.
    const atTop = window.scrollY <= 0 && data.deltaY < 0;
    const atBottom =
      window.scrollY >= document.documentElement.scrollHeight - window.innerHeight - 1 &&
      data.deltaY > 0;
    if (atTop || atBottom) {
      overscrollCooldownUntil = Date.now() + OVERSCROLL_COOLDOWN;
      return false;
    }

    // Suppress events briefly after overscroll so bounce-back momentum
    // doesn't trigger a forward snap.
    if (Date.now() < overscrollCooldownUntil) return false;

    for (const fn of interceptors) {
      if (fn(data.deltaY)) {
        // Interceptor claims this event. We must call preventDefault() here,
        // because returning false from virtualScroll makes Lenis exit early
        // BEFORE it would call preventDefault() itself (line ~499 in lenis.ts).
        // Without this, the browser's native scroll fires even though we
        // returned false.
        if (data.event.cancelable) data.event.preventDefault();
        return false; // tell Lenis: don't add delta to targetScroll
      }
    }
    return true; // nothing intercepted → let Lenis scroll normally
  },
});

export default lenis;

/**
 * Register a virtualScroll interceptor for a sticky section.
 * The function receives deltaY and should return:
 *   true  → the event was handled (swallow it, Lenis will not scroll)
 *   false → not our concern (pass it on)
 *
 * Returns a cleanup function that removes the interceptor.
 */
export function registerVirtualScrollInterceptor(
  fn: VirtualScrollInterceptor,
): () => void {
  interceptors.push(fn);
  return () => {
    const idx = interceptors.indexOf(fn);
    if (idx !== -1) interceptors.splice(idx, 1);
  };
}

/**
 * The actual destination of the current scrollTo animation. Lenis updates
 * `targetScroll` to the *current interpolated position* on each frame (not
 * the final destination), so we read the real target from the internal
 * Animate instance instead.
 */
function getScrollDestination(): number | null {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const anim = (lenis as any).animate;
  if (!anim || !anim.isRunning) return null;
  return anim.to as number;
}

/**
 * Returns true when a locked scrollTo animation is in flight and its
 * destination falls outside the given section's scroll range. Components use
 * this to suppress their scroll-driven update() during pass-throughs (e.g.
 * nav jumps that skip over the section without stopping).
 */
export function isPassingThrough(sectionEl: HTMLElement): boolean {
  if (!lenis.isLocked) return false;
  const dest = getScrollDestination();
  if (dest === null) return false;
  const outerTop = sectionEl.getBoundingClientRect().top + window.scrollY;
  const vh = window.innerHeight;
  const scrollBudget = Math.max(0, sectionEl.offsetHeight - vh);
  return dest < outerTop - 5 || dest > outerTop + scrollBudget + 5;
}

/** Exported for stepScroll's entry-snap logic. */
export { getScrollDestination };
