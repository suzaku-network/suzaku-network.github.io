import type { ImageMetadata } from "astro";
import zakuHeadshot from "@/assets/blog/authors/zaku-headshot.png";
import gauthierDokkaebi from "@/assets/blog/authors/gauthier-dokkaebi.jpeg";

export interface Author {
  name: string;
  avatar: ImageMetadata;
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
    avatar: zakuHeadshot,
    x: "https://x.com/SuzakuNetwork",
    linkedin: "https://www.linkedin.com/company/suzaku",
  },
  "gauthier-leonard": {
    name: "Gauthier Leonard",
    avatar: gauthierDokkaebi,
    x: "https://x.com/Nutymoon",
    linkedin: "https://www.linkedin.com/in/gauthier-leonard/",
  },
};
