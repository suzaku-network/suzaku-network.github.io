export const HOMEPAGE_TAGLINE = {
  label: "Suzaku",
  heading: "The Decentralization Hub for L1s",
  subheading: [
    "Suzaku connects L1 builders with stakers and operators",
    "to secure their networks through decentralization.",
  ],
} as const;

export const HOMEPAGE_PERSONAS = [
  {
    label: "For Stakers",
    heading: "Help L1s scale",
    body: [
      "Stake on Proof-of-Stake Suzaku-powered Avalanche L1s. Earn rewards and other incentives while supporting the growth of projects you believe in.",
    ],
    cta: {
      type: "standard" as const,
      label: "Open the staking app",
      href: "https://app.suzaku.network",
      external: true,
    },
  },
  {
    label: "For Builders",
    featured: true,
    heading: "Secure your L1",
    body: [
      "A centralized validator set is a silent liability. Suzaku helps you decentralize at your own pace to establish critical network security.",
    ],
    cta: {
      type: "highlight" as const,
      label: "Learn about L1 risks and take action",
      href: "/for-builders",
      external: false,
    },
  },
  {
    label: "For Operators",
    heading: "Validate L1s",
    body: [
      "Professional node operators are at the core of Suzaku's security model. Validate Suzaku-powered L1s and be part of the network from day one.",
    ],
    cta: {
      type: "standard" as const,
      label: "Express your interest",
      href: undefined,
      external: true,
    },
  },
] as const;
