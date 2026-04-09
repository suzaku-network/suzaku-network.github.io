import { riskCards } from "@/data/riskCards";
import { journeyNodes } from "@/data/journeyNodes";

// Derived counts — kept here so sections.ts is the only file that needs updating
// when content changes in riskCards or journeyNodes.

/** Visible risk cards (hidden ones are excluded from the step-scroll). */
const theRisksStepCount = riskCards.filter((c) => !c.hidden).length;

/**
 * Unique animation phases in the journey graph.
 * Nodes 3A and 3B animate together in phase 3, so we deduplicate by the
 * numeric part of each node's label (parseInt strips the trailing letter).
 */
const takeActionStepCount = new Set(journeyNodes.map((n) => parseInt(n.label)))
  .size;

export type SnapBackTo = "top" | "bottom";

export interface SectionBreakpointConfig {
  /**
   * Whether the user can scroll through the section (`true`) or if it should
   * take the whole page and snap on every wheel event (`false`).
   */
  scrollable: boolean;
  /**
   * Where the screen should stop when snapping back (scrolling up into this
   * section). For non-scrollable sections this has no practical effect since
   * the section fits in one viewport.
   */
  snapBackTo: SnapBackTo;
  /**
   * If `true`, the section resets to its initial visual state once the user
   * has snapped forward to the next section.
   */
  reset: boolean;
  /**
   * Number of discrete internal steps (cards, nodes…) driven by step-scroll.
   * Used to scale the backward snap duration: the animation takes `stepCount × 0.5s`
   * so returning to a section feels proportional to how long it took to traverse forward.
   * Omit (or set to 1) for sections with no internal steps.
   */
  stepCount?: number;
  /**
   * Controls where in the section the viewport lands when snapping to it.
   * - `'top'` (default): section top aligns with viewport top.
   * - `'bottom'`: section bottom aligns with viewport bottom.
   *   Useful for short trailing sections (e.g. footer) that should anchor
   *   to the bottom of the screen rather than the top.
   */
  snapAlign?: "top" | "bottom";
  /**
   * If `true`, this section is completely invisible to the snap system
   * for this breakpoint. Use to enable a section only on mobile or desktop.
   */
  hidden?: boolean;
}

export interface SectionConfig {
  id: string;
  desktop: SectionBreakpointConfig;
  mobile: SectionBreakpointConfig;
}

export const sections: SectionConfig[] = [
  {
    id: "hero",
    desktop: { scrollable: false, snapBackTo: "top", reset: false },
    mobile: { scrollable: false, snapBackTo: "top", reset: false },
  },
  {
    id: "the-risks",
    desktop: {
      scrollable: false,
      snapBackTo: "top",
      reset: true,
      stepCount: theRisksStepCount,
    },
    mobile: {
      scrollable: false,
      snapBackTo: "top",
      reset: true,
      stepCount: theRisksStepCount,
    },
  },
  {
    id: "take-action",
    desktop: {
      scrollable: false,
      snapBackTo: "top",
      reset: true,
      stepCount: takeActionStepCount,
    },
    mobile: { scrollable: true, snapBackTo: "top", reset: false },
  },
  {
    id: "the-protocol",
    desktop: { scrollable: true, snapBackTo: "top", reset: false },
    mobile:  { scrollable: true, snapBackTo: "top", reset: false },
  },
  {
    id: "about-us",
    desktop: { scrollable: false, snapBackTo: "top", reset: false },
    mobile: { scrollable: false, snapBackTo: "top", reset: false, stepCount: 3 },
  },
  {
    id: "final-cta",
    desktop: { scrollable: false, snapBackTo: "top", reset: false },
    mobile: { scrollable: false, snapBackTo: "top", reset: false },
  },
  {
    id: "footer",
    desktop: { scrollable: false, snapBackTo: "top", reset: false, hidden: true },
    mobile: { scrollable: false, snapBackTo: "top", reset: false, snapAlign: "bottom" },
  },
];
