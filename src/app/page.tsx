import { Metadata } from 'next';
import dynamic from 'next/dynamic';

const RootClientWrapper = dynamic(() => import('@/components/RootClientWrapper'));

type HomePageProps = {
  params: Promise<Record<string, never>>;
  searchParams: Promise<{ city?: string; service?: string }>;
};

export const metadata: Metadata = {
  title: 'WL CreationX | Top Graphic Design Agency Pretoria',
  description: 'Leading graphic design company in Pretoria. Expert branding, logo design, web design services. ✓15+ Years Experience ✓Award-winning Agency ✓Free Consultation. Contact us today!',
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
    'custom graphic design pretoria'
  ],
  viewport: 'width=device-width, initial-scale=1',
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
  alternates: {
    canonical: 'https://wlcreationx.co.za',
    languages: {
      'en-ZA': 'https://wlcreationx.co.za',
      'x-default': 'https://wlcreationx.co.za'
    }
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
  openGraph: {
    title: 'WL CreationX | Premier Graphic Design Agency in Pretoria',
    description: 'Leading graphic design company in Pretoria. Expert branding, logo design, web design services. ✓15+ Years Experience ✓Award-winning Agency ✓Free Consultation.',
    url: 'https://wlcreationx.co.za',
    siteName: 'WL CreationX Design Agency',
    locale: 'en_ZA',
    type: 'website',
    images: [
      {
        url: 'https://wlcreationx.co.za/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'WL CreationX - Leading Graphic Design Agency in Pretoria'
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'WL CreationX | Top Graphic Design Agency Pretoria',
    description: 'Leading graphic design company in Pretoria. Expert branding, logo design, web design services. Contact us for professional design solutions.',
    images: ['https://wlcreationx.co.za/images/twitter-card.jpg'],
    creator: '@wlcreationx'
  },
  verification: {
    google: 'your-google-verification-code',
  },
  category: 'Graphic Design & Creative Services',
  authors: [
    {
      name: 'WL CreationX',
      url: 'https://wlcreationx.co.za',
    }
  ],
  publisher: 'WL CreationX Design Agency',
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

export default async function Home(_props: HomePageProps) {
  return (
    <html>
      <head>
        <link rel="canonical" href="https://wlcreationx.co.za/" />
        <meta name="robots" content="index, follow" />
        <meta name="description" content="Leading graphic design company in Pretoria. Expert branding, logo design, web design services." />
        <meta name="keywords" content="graphic design company pretoria, graphic design agency pretoria, branding agency pretoria, web design pretoria" />
      </head>
      <body>
        <main className="min-h-screen bg-black text-white relative overflow-hidden perspective-1000">
          <RootClientWrapper />
        </main>
      </body>
    </html>
  );
}