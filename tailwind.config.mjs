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
    },
  },
  plugins: [],
};
