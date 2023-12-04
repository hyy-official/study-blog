/**
 * @type {import('next').NextConfig}

 */
const { withContentlayer } = require('next-contentlayer')

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: 'export'
};

module.exports = withContentlayer(nextConfig);
