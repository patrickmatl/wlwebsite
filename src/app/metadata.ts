import type { Metadata, Viewport } from 'next';

export const viewport: Viewport = {
  themeColor: '#000000',
  colorScheme: 'dark',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: 'Graphic Design Company | Graphic Design Agency Pretoria',
  description: 'Best graphic design company and agency in Pretoria. Professional branding, web design, and creative solutions for businesses. Contact us for expert design services.',
  keywords: 'graphic design company pretoria, graphic design agency pretoria, branding agency pretoria, web design pretoria, creative agency pretoria',
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
    title: 'Graphic Design Company | Graphic Design Agency Pretoria',
    description: 'Premier graphic design company and agency in Pretoria. Professional branding, web design, and creative solutions for businesses. Contact us for expert design services.',
    url: 'https://wlcreationx.co.za',
    siteName: 'WL Creationx Design Agency',
    locale: 'en_ZA',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Graphic Design Company | Graphic Design Agency Pretoria',
    description: 'Number one graphic design company and agency in Pretoria. Professional branding, web design, and creative solutions for businesses.',
    creator: '@wlcreationx',
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
  verification: {
    google: 'verification_token',
  },
  category: 'technology',
};
