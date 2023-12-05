/**
 * @type {import('next').NextConfig}

 */
const { withContentlayer } = require('next-contentlayer')

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output:'export',
  cssModules: {
    modules: true,
  },
};

module.exports = withContentlayer(nextConfig);
