export interface JourneyNode {
  id: string;
  label: string;
  title: string;
  /** Subtitle appended in a muted colour, e.g. "(permissionless)" */
  subtitle?: string;
  description: string;
  /** Button rendered below the description. "highlight" → ButtonHighlight, "standard" → ButtonStandard */
  button?: "highlight" | "standard";
  /** Label rendered in caps above the logos, e.g. "TRUSTED BY" */
  trustedBy?: string;
  logos?: { src: string; alt: string }[];
}

export const journeyNodes: JourneyNode[] = [
  {
    id: "node-1",
    label: "1",
    title: "Audit",
    description:
      "Start with our **L1 Auditor tool**. See what risks your L1 is exposed to and what **weak points to prioritize**.",
    button: "highlight",
  },
  {
    id: "node-2",
    label: "2",
    title: "Plan",
    description:
      "Our team will help you design a **progressive decentralization plan** tailored to your constraints and objectives.",
    button: "standard",
  },
  {
    id: "node-3a",
    label: "3A",
    title: "Implement",
    subtitle: "Permissionless",
    description:
      "Leverage the Suzaku protocol to implement **Proof of Stake**.",
    trustedBy: "TRUSTED BY",
    logos: [
      { src: "/partners/customers/dexalot-logo.svg", alt: "Dexalot" },
      { src: "/partners/customers/kite-logo.svg", alt: "Kite" },
    ],
  },
  {
    id: "node-3b",
    label: "3B",
    title: "Implement",
    subtitle: "Permissioned",
    description:
      "Leverage our team's operator network to **distribute your chain's validator set**.",
  },
];
