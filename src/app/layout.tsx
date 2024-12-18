import type { Metadata } from 'next'
import { Space_Grotesk, Syne } from 'next/font/google'
import './globals.css'
import Footer from '@/components/Footer'
import Script from 'next/script'
import ClientRootWrapper from '@/components/ClientRootWrapper'

// Body font
const spaceGrotesk = Space_Grotesk({ 
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
  preload: true,
  adjustFontFallback: true,
})

// Main display font for headlines
const syne = Syne({
  subsets: ['latin'],
  variable: '--font-syne',
  display: 'swap',
  preload: true,
  adjustFontFallback: true,
})

export const metadata: Metadata = {
  title: 'WL CreationX | Premier Graphic Design Agency in Pretoria',
  description: 'Leading graphic design company & creative agency in Pretoria. Expert branding, web design, logo design & digital marketing services. Professional design solutions for businesses in Gauteng.',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=5',
  themeColor: '#0A0A0A',
  colorScheme: 'dark',
  metadataBase: new URL('https://wlcreationx.co.za'),
  alternates: {
    canonical: '/'
  },
  openGraph: {
    title: 'WL CreationX | Premier Graphic Design Agency in Pretoria',
    description: 'Professional graphic design, branding, and web design services in Pretoria. Transform your brand with our creative design solutions.',
    type: 'website',
    locale: 'en_ZA',
    siteName: 'WL CreationX',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'WL CreationX - Graphic Design Agency Pretoria'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'WL CreationX | Graphic Design Agency Pretoria',
    description: 'Professional graphic design and branding services in Pretoria. Transform your brand with our creative solutions.',
    images: ['/images/twitter-image.jpg']
  },
  keywords: [
    'graphic design company pretoria',
    'design agency pretoria',
    'logo design pretoria',
    'web design pretoria',
    'branding agency pretoria',
    'creative agency pretoria',
    'digital design agency pretoria',
    'corporate identity design pretoria',
    'ui ux design pretoria',
    'print design pretoria',
    'marketing design pretoria',
    'package design pretoria',
    'social media design pretoria',
    'brand identity design pretoria',
    'website designer pretoria',
    'creative design studio pretoria',
    'professional design services pretoria',
    'graphic designer pretoria',
    'design company gauteng',
    'digital marketing design pretoria'
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code', // Add your Google verification code
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${syne.variable}`} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <meta name="theme-color" content="#0A0A0A" />
      </head>
      <body suppressHydrationWarning>
        <ClientRootWrapper>
          <main className="flex min-h-[100svh] flex-col bg-[#0A0A0A] text-white font-space-grotesk overflow-x-hidden">
            {children}
            <Footer />
          </main>
        </ClientRootWrapper>
        <Script id="handle-hydration" strategy="afterInteractive">
          {`
            if (window.location.hash === '#rehydrate') {
              window.location.hash = '';
              window.location.reload();
            }
          `}
        </Script>
      </body>
    </html>
  )
}
