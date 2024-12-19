/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
    formats: ['image/webp'],
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(mp3|wav|ogg)$/i,
      type: 'asset/resource',
    });
    return config;
  },
  poweredByHeader: false,
};

module.exports = nextConfig;
