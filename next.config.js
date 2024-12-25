/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
    formats: ['image/webp'],
  },
  webpack: (config, { dev, isServer }) => {
    // Audio file handling
    config.module.rules.push({
      test: /\.(mp3|wav|ogg)$/i,
      type: 'asset/resource',
    });

    // Optimize client-side bundles in production
    if (!dev && !isServer) {
      config.optimization = {
        ...config.optimization,
        minimize: true,
        splitChunks: {
          chunks: 'all',
          minSize: 10000,
          maxSize: 40000,
          cacheGroups: {
            default: false,
            vendors: false,
            framework: {
              chunks: 'all',
              name: 'framework',
              test: /(?<!node_modules.*)[\\/]node_modules[\\/](react|react-dom|scheduler|prop-types|use-subscription)[\\/]/,
              priority: 40,
              enforce: true,
            },
            commons: {
              name: 'commons',
              chunks: 'initial',
              minChunks: 2,
              priority: 20,
            },
            lib: {
              test: /[\\/]node_modules[\\/]/,
              chunks: 'all',
              name(module, chunks, cacheGroupKey) {
                const moduleFileName = module
                  .identifier()
                  .split('/')
                  .reduceRight((item) => item);
                return `${cacheGroupKey}-${moduleFileName}`;
              },
              priority: 15,
              minChunks: 2,
              reuseExistingChunk: true,
            },
            shared: {
              name: false,
              priority: 10,
              minChunks: 2,
              reuseExistingChunk: true,
            },
          },
        },
        runtimeChunk: { name: 'runtime' },
      };
    }

    return config;
  },
  poweredByHeader: false,
  productionBrowserSourceMaps: false,
  reactStrictMode: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
};

module.exports = nextConfig;
