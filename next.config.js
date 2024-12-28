/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
    formats: ['image/webp'],
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
      type: 'asset/resource',
      generator: {
        filename: 'static/media/[path][name][ext]'
      }
    });
    return config;
  },
  // Handle static file paths
  output: 'standalone',
  poweredByHeader: false,
  reactStrictMode: true
};

module.exports = nextConfig;
