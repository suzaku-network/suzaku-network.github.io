import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const blog = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/blog" }),
  schema: ({ image: imageHelper }) => z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    image: imageHelper(),
    imageAlt: z.string(),
    author: z.string(),
    tags: z.array(z.string()).optional(),
    draft: z.boolean().optional().default(false),
  }),
});

export const collections = { blog };
