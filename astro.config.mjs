import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import icon from "astro-icon";

/** Wraps ![alt](src "caption") into <figure><img/><figcaption>caption</figcaption></figure> */
function rehypeFigureCaption() {
  return (tree) => {
    function walk(node) {
      if (!node.children) return;
      for (let i = 0; i < node.children.length; i++) {
        const child = node.children[i];
        if (
          child.type === "element" &&
          child.tagName === "img" &&
          child.properties?.title
        ) {
          node.children[i] = {
            type: "element",
            tagName: "figure",
            properties: { className: ["figure-caption"] },
            children: [
              child,
              {
                type: "element",
                tagName: "figcaption",
                properties: {},
                children: [{ type: "text", value: child.properties.title }],
              },
            ],
          };
        } else {
          walk(child);
        }
      }
    }
    walk(tree);
  };
}

export default defineConfig({
  integrations: [tailwind(), icon()],
  markdown: {
    rehypePlugins: [rehypeFigureCaption],
  },
});
