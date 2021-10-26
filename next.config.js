/** @type {import('next').NextConfig} */
module.exports = {
  swcMinify: true,
  reactStrictMode: true,
  poweredByHeader: false,
  experimental: {
    serverComponents: true,
    concurrentFeatures: true,
  },
};
