import type { Metadata, Viewport } from 'next';

export const viewport: Viewport = {
  themeColor: '#000000',
  colorScheme: 'dark',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: 'Graphic Design Company | Best Graphic Design Agency in Pretoria',
  description: 'WL CreationX is the leading graphic design company and agency in Pretoria, South Africa. We specialize in professional branding, logo design, web design, and creative solutions for businesses across Gauteng. Trusted by top companies for innovative and impactful designs.',
  keywords: [
    'graphic design company pretoria',
    'graphic design agency pretoria',
    'branding agency pretoria',
    'web design pretoria',
    'creative agency pretoria',
    'logo design pretoria',
    'graphic design services pretoria',
    'best design agency in south africa',
    'professional graphic designers pretoria',
    'custom graphic design pretoria',
    'social media design pretoria',
    'packaging design pretoria',
    'print design pretoria',
    'UI/UX design pretoria',
    'motion graphics pretoria',
    'rebranding services pretoria',
    'marketing design pretoria',
    'corporate branding pretoria',
    'creative design solutions pretoria',
    'affordable graphic design pretoria'
  ],
  manifest: '/site.webmanifest',
  icons: {
    icon: [
      {
        url: '/favicon-32x32.png',
        sizes: '32x32',
        type: 'image/png'
      },
      {
        url: '/favicon-16x16.png',
        sizes: '16x16',
        type: 'image/png'
      }
    ],
    apple: [
      {
        url: '/apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png'
      }
    ]
  },
  openGraph: {
    title: 'Graphic Design Company | Top Graphic Design Agency in Pretoria',
    description: 'WL CreationX is the leading graphic design company and agency in Pretoria, South Africa. We specialize in professional branding, logo design, web design, and creative solutions for businesses across Gauteng. Trusted by top companies for innovative and impactful designs.',
    url: 'https://wlcreationx.co.za',
    siteName: 'WL CreationX Design Agency',
    locale: 'en_ZA',
    type: 'website',
    images: [
      {
        url: 'https://wlcreationx.co.za/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'WL CreationX - Graphic Design Agency in Pretoria',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Graphic Design Company | Top Graphic Design Agency in Pretoria',
    description: 'WL CreationX is the leading graphic design company and agency in Pretoria, South Africa. We specialize in professional branding, logo design, web design, and creative solutions for businesses across Gauteng. Trusted by top companies for innovative and impactful designs.',
    creator: '@wlcreationx',
    images: [
      {
        url: 'https://wlcreationx.co.za/images/twitter-image.jpg',
        width: 1200,
        height: 628,
        alt: 'WL CreationX - Graphic Design Agency in Pretoria',
      }
    ],
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  category: 'Graphic Design & Creative Services',
  authors: [
    {
      name: 'WL CreationX',
      url: 'https://wlcreationx.co.za',
    }
  ],
  publisher: 'WL CreationX Design Agency',
  alternates: {
    canonical: 'https://wlcreationx.co.za',
    languages: {
      'en-ZA': 'https://wlcreationx.co.za/en',
    },
  },
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
  metadataBase: new URL('https://wlcreationx.co.za'),
  appLinks: {
    web: {
      url: 'https://wlcreationx.co.za',
      should_fallback: true,
    },
  },
  other: {
    'fb:app_id': 'your_facebook_app_id',
    'instagram:creator': '@wlcreationx',
    'linkedin:company': 'wlcreationx',
  },
};