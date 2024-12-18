import type { Metadata } from 'next'
import { Space_Grotesk, Syne } from 'next/font/google'
import './globals.css'
import RootClientWrapper from '@/components/RootClientWrapper'
import Script from 'next/script'
import MetaTags from '@/components/SEO/MetaTags'
import Footer from '@/components/Footer'
import ClientRootWrapper from '@/components/ClientRootWrapper'

// Main display font for headlines
const syne = Syne({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-syne',
  weight: ['400', '500', '600', '700', '800'],
  fallback: ['system-ui', 'arial']
})

// Body font
const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-space-grotesk',
  weight: ['300', '400', '500', '600', '700'],
  fallback: ['system-ui', 'arial']
})

export const metadata: Metadata = {
  metadataBase: new URL('https://wlcreationx.co.za'),
  title: {
    default: 'Graphic Design Company Pretoria | WL CreationX',
    template: '%s | WL CreationX Pretoria'
  },
  description: 'Best graphic design studio in Pretoria, offering comprehensive branding and digital solutions. Serving Pretoria, Pretoria East, and Pretoria North with creative excellence.',
  keywords: [
    'graphic design pretoria',
    'web design pretoria',
    'logo design pretoria',
    'branding agency pretoria',
    'digital marketing pretoria',
    'UI/UX design pretoria',
    'print design pretoria',
    'corporate identity pretoria',
    'website development pretoria',
    'creative agency pretoria',
    'WL CreationX',
    'best design studio pretoria',
    'affordable graphic design pretoria',
    'professional design services pretoria',
    'local design agency pretoria',
    'graphic designer near me',
    'pretoria design studio',
    'business branding pretoria',
    'website designer pretoria',
    'marketing agency pretoria',
    'pretoria east graphic designer',
  ],
  alternates: {
    canonical: 'https://wlcreationx.co.za',
  },
  openGraph: {
    type: 'website',
    locale: 'en_ZA',
    url: 'https://wlcreationx.co.za',
    title: 'Graphic Design Company Pretoria | WL CreationX',
    description: 'Best graphic design studio in Pretoria, offering comprehensive branding and digital solutions. Serving Pretoria, Pretoria East, and Pretoria North with creative excellence.',
    siteName: 'WL CreationX',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Graphic Design Company Pretoria | WL CreationX',
    description: 'Best graphic design studio in Pretoria, offering comprehensive branding and digital solutions.',
    creator: '@wlcreationx',
    site: '@wlcreationx',
  },
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
    google: 'your-google-verification-code',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Create the JSON-LD schema
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'ProfessionalService', 'DesignAgency'],
    name: 'WL CreationX',
    description: 'Premier graphic design agency in Pretoria offering comprehensive branding, web design, and digital marketing solutions.',
    url: 'https://wlcreationx.co.za',
    logo: 'https://wlcreationx.co.za/logo.png',
    image: 'https://wlcreationx.co.za/og-image.jpg',
    telephone: '+27623693769',
    email: 'info@wlcreationx.co.za',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '210 Albertus St',
      addressLocality: 'La Montagne',
      addressRegion: 'Gauteng',
      postalCode: '0183',
      addressCountry: 'ZA'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '-25.7479',
      longitude: '28.2293'
    },
    areaServed: {
      '@type': 'City',
      name: 'Pretoria',
      containedInPlace: {
        '@type': 'AdministrativeArea',
        name: 'Gauteng',
        containedInPlace: {
          '@type': 'Country',
          name: 'South Africa'
        }
      }
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '08:00',
      closes: '17:00'
    },
    priceRange: '$$',
    knowsAbout: [
      'Graphic Design',
      'Web Design',
      'Brand Identity Design',
      'UI/UX Design',
      'Digital Marketing',
      'Logo Design',
      'Print Design'
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Design Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Brand Identity Design',
            description: 'Complete branding solutions for businesses in Pretoria'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Web Design & Development',
            description: 'Professional website design and development services'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Graphic Design',
            description: 'Creative graphic design solutions for print and digital media'
          }
        }
      ]
    },
    sameAs: [
      'https://facebook.com/wlcreationx',
      'https://twitter.com/wlcreationx',
      'https://instagram.com/wlcreationx',
      'https://linkedin.com/company/wlcreationx',
      'https://behance.net/wlcreationx'
    ]
  };

  return (
    <html lang="en-ZA" className={`${syne.variable} ${spaceGrotesk.variable}`}>
      <head>
        <link
          rel="preload"
          href={`/fonts/${syne.style.fontFamily.toLowerCase()}-latin.woff2`}
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <MetaTags />
        <Script id="json-ld" type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </Script>
      </head>
      <body className="font-space-grotesk">
        <ClientRootWrapper>
          <RootClientWrapper spaceGrotesk={spaceGrotesk} syne={syne}>
            {children}
            <Footer />
          </RootClientWrapper>
        </ClientRootWrapper>
      </body>
    </html>
  );
}
