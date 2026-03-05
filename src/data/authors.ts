export interface Author {
  name: string;
  /** Path to avatar image in public/, e.g. /blog/authors/alice.jpg */
  avatar: string;
  /** Full X profile URL, e.g. https://x.com/alice */
  x?: string;
  /** Full LinkedIn profile URL */
  linkedin?: string;
}

/**
 * Author registry. Article frontmatter references authors by key.
 * Example frontmatter: author: "alice"
 */
export const authors: Record<string, Author> = {
  "suzaku-team": {
    name: "Suzaku Team",
    avatar: "/blog/authors/zaku-headshot.png",
    x: "https://x.com/SuzakuNetwork",
    linkedin: "https://www.linkedin.com/company/suzaku",
  },
  "gauthier-leonard": {
    name: "Gauthier Leonard",
    avatar: "/blog/authors/gauthier-dokkaebi.jpeg",
    x: "https://x.com/Nutymoon",
    linkedin: "https://www.linkedin.com/in/gauthier-leonard/",
  },
};
