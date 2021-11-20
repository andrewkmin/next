/** @type {import('next').NextConfig} */
module.exports = {
  swcMinify: true,
  reactStrictMode: true,
  poweredByHeader: false,
  webpack5: true,
  compress: true,
  trailingSlash: true,
  generateEtags: true,
  optimizeFonts: true,
  generateBuildId: true,
  devIndicators: {
    buildActivity: true,
    buildActivityPosition: "bottom-right",
  },
};
