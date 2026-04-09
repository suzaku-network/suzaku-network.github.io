const withNextra = require("nextra")({
  theme: "nextra-theme-docs",
  themeConfig: "./theme.config.jsx",
  latex: true,
});

module.exports = withNextra({
  async redirects() {
    return [
      {
        source: "/suzaku-restaking",
        destination: "/suzaku-protocol",
        permanent: true,
      },
      {
        source: "/suzaku-restaking/:slug*",
        destination: "/suzaku-protocol/:slug*",
        permanent: true,
      },
    ];
  },
});

// If you have other Next.js configurations, you can pass them as the parameter:
// module.exports = withNextra({ /* other next.js config */ })
