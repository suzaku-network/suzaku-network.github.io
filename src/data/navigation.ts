export const NAV_LINKS: readonly {
  label: string;
  href: string;
  external: boolean;
  button?: boolean;
}[] = [
  { label: "For builders", href: "/for-builders", external: false },
  { label: "Blog", href: "/blog", external: false },
  {
    label: "App",
    href: "https://app.suzaku.network",
    external: true,
    button: true,
  },
  {
    label: "L1 Auditor",
    href: "https://auditor.suzaku.network",
    external: true,
    button: true,
  },
  {
    label: "Docs",
    href: "https://docs.suzaku.network/",
    external: true,
    button: true,
  },
  {
    label: "Contact",
    href: "https://forms.gle/US695J3BYoy8tztu9",
    external: true,
    button: true,
  },
];

/** Section links used only on the /for-builders page. */
export const FOR_BUILDERS_SECTIONS = [
  { label: "The Risks", id: "the-risks" },
  { label: "Take Action", id: "take-action" },
  { label: "The Protocol", id: "the-protocol" },
  { label: "About Us", id: "about-us" },
  { label: "Start now", id: "final-cta" },
] as const;

export const SOCIAL_LINKS = [
  {
    label: "X (Twitter)",
    href: "https://x.com/SuzakuNetwork",
    icon: "simple-icons:x",
  },
  {
    label: "Discord",
    href: "https://discord.gg/4XP6aqFkKX",
    icon: "simple-icons:discord",
  },
  {
    label: "GitHub",
    href: "https://github.com/suzaku-network",
    icon: "simple-icons:github",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/suzaku",
    icon: "simple-icons:linkedin",
  },
] as const;

export const RESOURCE_LINKS = [
  { label: "Blog", href: "/blog" },
  {
    label: "Docs",
    href: "https://docs.suzaku.network/",
  },
  {
    label: "Branding Kit",
    href: "https://drive.google.com/drive/folders/1WCTwyhALU7pMXfaSHnd4dadCjUjmT3yV",
  },
] as const;

export const LEGAL_LINKS = [
  {
    label: "Terms & Conditions",
    href: "https://docs.suzaku.network/pdf/Suzaku-TermsAndConditions.pdf",
  },
  {
    label: "Legal Notice",
    href: "https://docs.suzaku.network/pdf/Suzaku-LegalNotice.pdf",
  },
  {
    label: "Privacy Policy",
    href: "https://docs.suzaku.network/pdf/Suzaku-PrivacyPolicy.pdf",
  },
  {
    label: "Disclaimer",
    href: "https://docs.suzaku.network/disclaimer",
  },
] as const;
