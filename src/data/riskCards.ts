export interface RiskCard {
  tags: string[];
  headline: string;
  /** Card body — supports **bold** markdown syntax */
  body: string;
  /** Path to image in public/, e.g. /news/image-1200x400.png */
  image: string;
  /** Link shown as an overlay on the card image */
  articleUrl: string;
  /** Label displayed in the article overlay */
  articleLabel: string;
  /** Set to true to exclude this card from rendering */
  hidden?: boolean;
}

const DEFAULT_ARTICLE_URL = "/blog/why-l1-decentralization-matters";
const DEFAULT_ARTICLE_LABEL =
  "Why L1 Decentralization Matters (More Than You Think)";

export const riskCards: RiskCard[] = [
  {
    tags: ["Bridged TVL"],
    headline: "Hackers Drain All L1 TVL After Key Compromise",
    body: "If a single entity **controls more than 67%** of your L1, accessing their keys allows to **bridge out all the TVL** of your chain.",
    image: "/news/l1-tvl-drained-1200x400.png",
    articleUrl: DEFAULT_ARTICLE_URL,
    articleLabel: DEFAULT_ARTICLE_LABEL,
  },
  {
    tags: ["Liveness"],
    headline: "Operator Outage Causes L1 Halt for 6 Hours",
    body: "**More than 20%** of your network going offline will cause your chain to **halt**, and temporarily prevent all transactions from being processed.",
    image: "/news/l1-halted-1200x400.png",
    articleUrl: DEFAULT_ARTICLE_URL,
    articleLabel: DEFAULT_ARTICLE_LABEL,
  },
  {
    tags: ["Censorship"],
    headline: "AWS Blocks Access to Funds After Legal Order",
    body: "Cloud providers are private actors that can be **coerced by regulators**, and they can **block access to funds** after a legal order.",
    image: "/news/judgment-hammer-1200x400.png",
    articleUrl: DEFAULT_ARTICLE_URL,
    articleLabel: DEFAULT_ARTICLE_LABEL,
    hidden: true,
  },
  {
    tags: ["Hacks"],
    headline: "ByBit lost $1.4B, Swissborg lost $41.5M…",
    body: "… both due to an **OpSec failure of their service providers**. Any centralized setup **WILL be breached**. The only barrier is decentralization.",
    image: "/news/hacks-rekt-2025-1200x400.png",
    articleUrl: DEFAULT_ARTICLE_URL,
    articleLabel: DEFAULT_ARTICLE_LABEL,
  },
];
