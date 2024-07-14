/**
 * @type {import('next').NextConfig}

 */
const { withContentlayer } = require('next-contentlayer')
const isProd = process.env.NODE_ENV === 'production';
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  trailingSlash: true,
  output: 'export',
  basePath: isProd ? '/study-blog' : '',
  assetPrefix: isProd ?  '/study-blog' : '',
  images: {
    unoptimized: isProd ? false: true,  // 이미지 최적화 비활성화
    loader: 'default',
    path: isProd ? '/study-blog/' : '/',
  },
};

module.exports = withContentlayer(nextConfig);
