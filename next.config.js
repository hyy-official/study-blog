/**
 * @type {import('next').NextConfig}

 */
const { withContentlayer } = require('next-contentlayer')

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  cssModules: {
    modules: true,
  },
};

module.exports = withContentlayer(nextConfig);
