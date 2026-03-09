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

const lenis = new Lenis({
  autoRaf: true,
  lerp: 0.3,
  virtualScroll: (data) => {
    // Ignore zero-delta events (touchstart taps, touchend after tap).
    // Without this guard, deltaY=0 is interpreted as direction=-1 by the
    // interceptors, causing a spurious backward snap on every mobile tap.
    if (data.deltaX === 0 && data.deltaY === 0) return true;

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
