/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.azuki.com',
      },
      {
        protocol: 'https',
        hostname: 'ipfs.io',
      },
      {
        protocol: 'https',
        hostname: 'azkimg.imgix.net',
      },
    ],
  },
  devIndicators: {
    buildActivity: false,
  },
  compiler: {
    styledComponents: true,
  },
};

module.exports = nextConfig;
