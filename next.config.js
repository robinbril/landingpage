/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/landingpage',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  assetPrefix: '/landingpage/',
  turbopack: {
    root: process.cwd(),
  },
}

module.exports = nextConfig;
