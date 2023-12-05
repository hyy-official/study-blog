/**
 * @type {import('next').NextConfig}

 */
const { withContentlayer } = require('next-contentlayer')


const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  trailingSlash: true,
  output: 'export',
  cssModules: {
    modules: true,
  },
  basePath: process.env.NODE_ENV === 'production' ? '/study-blog' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/study-blog' : ''
};

module.exports = withContentlayer(nextConfig);
