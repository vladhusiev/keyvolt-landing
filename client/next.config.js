/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '1337',
        pathname: '/**',
      },
      {
        // Add Strapi Cloud support
        protocol: 'https',
        hostname: 'orderly-heart-64e30646b8.media.strapiapp.com',
        pathname: '/**',
      },
    ],
    formats: ['image/webp', 'image/avif', 'image/png', 'image/jpeg', 'image/gif', 'image/svg+xml'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },
};

module.exports = nextConfig;