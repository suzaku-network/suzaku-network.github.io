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
const takeActionStepCount = new Set(journeyNodes.map((n) => parseInt(n.label))).size;

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
    mobile:  { scrollable: false, snapBackTo: "top", reset: false },
  },
  {
    id: "the-risks",
    desktop: { scrollable: false, snapBackTo: "top", reset: true, stepCount: theRisksStepCount },
    mobile:  { scrollable: false, snapBackTo: "top", reset: true, stepCount: theRisksStepCount },
  },
  {
    id: "take-action",
    desktop: { scrollable: false, snapBackTo: "top",    reset: true,  stepCount: takeActionStepCount },
    mobile:  { scrollable: true,  snapBackTo: "top", reset: false },
  },
  {
    id: "the-protocol",
    desktop: { scrollable: true, snapBackTo: "bottom", reset: false },
    mobile:  { scrollable: true, snapBackTo: "bottom", reset: false },
  },
  {
    id: "about-us",
    desktop: { scrollable: true, snapBackTo: "bottom", reset: false },
    mobile:  { scrollable: true, snapBackTo: "bottom", reset: false },
  },
  {
    id: "final-cta",
    desktop: { scrollable: false, snapBackTo: "top", reset: false },
    mobile:  { scrollable: false, snapBackTo: "top", reset: false },
  },
];
