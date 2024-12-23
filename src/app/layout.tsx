import type { Metadata, Viewport } from 'next';
import { Space_Grotesk, Syne } from 'next/font/google';
import './globals.css';
import Footer from '@/components/Footer';
import ClientRootWrapper from '@/components/ClientRootWrapper';

// Body font
const spaceGrotesk = Space_Grotesk({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-space-grotesk',
  adjustFontFallback: true,
});

// Heading font
const syne = Syne({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-syne',
  adjustFontFallback: true,
});

export const viewport: Viewport = {
  themeColor: '#000000',
  colorScheme: 'dark',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: {
    template: '%s | WL Creationx',
    default: 'WL Creationx | Digital Agency in South Africa',
  },
  description: 'Professional digital agency offering web design, development, and digital marketing services in South Africa.',
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
    title: 'WL CreationX | Premier Graphic Design Agency in Pretoria',
    description: 'Leading graphic design company & creative agency in Pretoria. Expert branding, web design, logo design & digital marketing services.',
    url: 'https://wlcreationx.co.za',
    siteName: 'WL CreationX',
    locale: 'en_ZA',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'WL CreationX | Premier Graphic Design Agency in Pretoria',
    description: 'Leading graphic design company & creative agency in Pretoria. Expert branding, web design, logo design & digital marketing services.',
    creator: '@wlcreationx',
  },
  keywords: [
    'graphic design pretoria',
    'web design pretoria',
    'logo design pretoria',
    'branding agency pretoria',
    'professional design services pretoria',
    'graphic designer pretoria',
    'design company gauteng',
    'digital marketing design pretoria'
  ],
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
  category: 'technology',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${syne.variable}`}>
      <body>
        <ClientRootWrapper>
          <main className="flex min-h-[100svh] flex-col bg-[#0A0A0A] text-white font-space-grotesk overflow-x-hidden">
            {children}
            <Footer />
          </main>
        </ClientRootWrapper>
      </body>
    </html>
  );
}
