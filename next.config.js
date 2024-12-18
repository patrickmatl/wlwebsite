/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/webp'],
    minimumCacheTTL: 60,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    remotePatterns: [],
    unoptimized: false,
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  experimental: {
    optimizeCss: true,
    workerThreads: false,
    optimizePackageImports: ['react-icons'],
    webVitalsAttribution: ['CLS', 'LCP'],
    scrollRestoration: true,
    optimisticClientCache: true,
  },
  webpack: (config, { dev, isServer }) => {
    // Audio optimization
    config.module.rules.push({
      test: /\.(mp3)$/,
      use: {
        loader: 'file-loader',
        options: {
          name: 'static/media/[name].[hash].[ext]',
          publicPath: '/_next',
        },
      },
    });

    // Production optimizations
    if (!dev && !isServer) {
      // Enable tree shaking
      config.optimization = {
        ...config.optimization,
        usedExports: true,
        sideEffects: true,
        minimize: true,
        splitChunks: {
          chunks: 'all',
          minSize: 20000,
          maxSize: 50000,
          cacheGroups: {
            default: false,
            vendors: false,
            commons: {
              name: 'commons',
              chunks: 'all',
              minChunks: 2,
            },
            shared: {
              name: (module, chunks) => {
                const allChunksNames = chunks.map((item) => item.name).join('~');
                return `shared-${allChunksNames}`;
              },
              test: /node_modules/,
              chunks: 'all',
              enforce: true,
            },
          },
        },
      };
    }

    return config;
  },
  poweredByHeader: false,
  compress: true,
  reactStrictMode: true,
  productionBrowserSourceMaps: false,
  crossOrigin: 'anonymous',
  httpAgentOptions: {
    keepAlive: true,
  },
  headers: async () => [
    {
      source: '/:path*',
      headers: [
        {
          key: 'X-DNS-Prefetch-Control',
          value: 'on'
        },
        {
          key: 'Strict-Transport-Security',
          value: 'max-age=63072000; includeSubDomains; preload'
        },
        {
          key: 'X-Content-Type-Options',
          value: 'nosniff'
        },
        {
          key: 'X-Frame-Options',
          value: 'SAMEORIGIN'
        },
        {
          key: 'X-XSS-Protection',
          value: '1; mode=block'
        },
        {
          key: 'Referrer-Policy',
          value: 'strict-origin-when-cross-origin'
        },
        {
          key: 'Permissions-Policy',
          value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()'
        }
      ]
    },
    {
      source: '/:all*(svg|jpg|png|webp)',
      locale: false,
      headers: [
        {
          key: 'Cache-Control',
          value: 'public, max-age=31536000, must-revalidate'
        }
      ]
    },
    {
      source: '/fonts/:path*',
      headers: [
        {
          key: 'Cache-Control',
          value: 'public, max-age=31536000, must-revalidate'
        }
      ]
    }
  ]
}

module.exports = nextConfig
