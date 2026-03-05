import typography from "@tailwindcss/typography";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        "suzaku-black": "#101010",
        "suzaku-teal": "#00A4AF",
        "suzaku-green": "#43F6AB",
        "suzaku-border": "#222222",
      },
      fontFamily: {
        sans: ["Inconsolata", "monospace"],
        mono: ["Inconsolata", "monospace"],
      },
      backgroundImage: {
        "suzaku-gradient": "linear-gradient(90deg, #00A4AF, #43F6AB)",
      },
      typography: {
        DEFAULT: {
          css: {
            fontFamily: "Inconsolata, monospace",
            "h1, h2, h3, h4, h5, h6": {
              fontWeight: "600",
              fontFamily: "Inconsolata, monospace",
            },
            a: {
              color: "#ffffff",
              textDecoration: "underline",
              "&:hover": { color: "#43F6AB" },
            },
            "code, pre": {
              fontFamily: "Inconsolata, monospace",
            },
            pre: {
              backgroundColor: "#1a1a1a",
              border: "1px solid rgba(255,255,255,0.1)",
            },
            code: {
              backgroundColor: "#1a1a1a",
              padding: "0.1em 0.3em",
              borderRadius: "0.25rem",
              fontWeight: "400",
            },
            "code::before": { content: '""' },
            "code::after": { content: '""' },
            maxWidth: "none",
          },
        },
      },
    },
  },
  plugins: [typography],
};
