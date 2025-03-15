const nextConfig = {
  output: "export",
  experimental: {
    esmExternals: 'loose'
  },
  webpack: (config) => {
    config.externals = [...config.externals, { canvas: "canvas" }]; // required to make pdfjs work
    return config;
  },
  async rewrites() {
    return [
      {
        source: '/api/shops',
        destination: 'http://localhost:8080/shops' // bearsunday の正しいURLに置き換えてください
      },
    ];
  },
};

module.exports = nextConfig;
