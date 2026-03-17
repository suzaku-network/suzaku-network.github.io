export interface DecentralizationPhase {
  title: string;
  /** Supports **bold** markdown syntax (rendered via snarkdown) */
  description: string;
  /** If true, phase is styled as the starting point (muted). Otherwise uses accent color. */
  isOrigin?: boolean;
}

export interface ProtocolParticipant {
  /** Short label displayed inside the circle ring (e.g. abbreviation) */
  label: string;
  title: string;
  /** Supports **bold** markdown syntax (rendered via snarkdown) */
  description: string;
}

export interface Auditor {
  name: string;
  url: string;
  logo: string;
}

export const decentralizationPhases: DecentralizationPhase[] = [
  {
    title: "Full PoA",
    description: "The L1 team controls the entire validator set",
    isOrigin: true,
  },
  {
    title: "First PoS slice",
    description:
      "The **BalancerValidatorManager** splits control between PoA and PoS",
  },
  {
    title: "Growing PoS weight",
    description: "Raise the PoS share progressively as the network matures",
  },
  {
    title: "Full PoS",
    description: "Set PoA weight to zero. 100% PoS.",
  },
];

export const protocolParticipants: ProtocolParticipant[] = [
  {
    label: "L1",
    title: "L1 teams",
    description:
      "Set the L1's **staking requirements**. Deploy and curate the **L1 LST**. Our team handles the technical setup and ongoing support.",
  },
  {
    label: "S",
    title: "Stakers",
    description:
      "Stake L1 tokens, receive an **LST usable across DeFi**. Earn L1 **staking rewards** and other incentives.",
  },
  {
    label: "O",
    title: "Operators",
    description:
      "**Opt in** to secure L1s, **receive stake delegation** to spin up validators and **earn rewards** based on uptime.",
  },
];

export const auditors: Auditor[] = [
  {
    name: "Cyfrin",
    url: "https://www.cyfrin.io/",
    logo: "/partners/auditors/cyfrin-logo.svg",
  },
  {
    name: "Omniscia",
    url: "https://omniscia.io/",
    logo: "/partners/auditors/omniscia-logo.svg",
  },
  {
    name: "Octane",
    url: "https://www.octane.security/",
    logo: "/partners/auditors/octane-logo.svg",
  },
];
