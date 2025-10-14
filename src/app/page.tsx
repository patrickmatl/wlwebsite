import { Metadata } from 'next';
import HomeContent from '@/components/HomeContent';
import { homeFaqs } from '@/data/homeFaqs';
import { generateFAQSchema } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'WL CreationX | Top Graphic Design Agency Pretoria',
  description: 'Leading graphic design company in Pretoria. Expert branding, logo design, web design services. 15+ Years Experience, Award-winning Agency, Free Consultation. Contact us today!',
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
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' }
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }
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
    description: 'Leading graphic design company in Pretoria. Expert branding, logo design, web design services. 15+ Years Experience, Award-winning Agency, Free Consultation.',
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

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white relative overflow-hidden perspective-1000">
      {/* FAQPage JSON-LD aligned with visible compact FAQ */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: generateFAQSchema(homeFaqs) }} />
      {/* Structured Data for LocalBusiness SEO - Enhanced for Local Intent */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: `{
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "name": "WL CreationX",
        "image": "https://wlcreationx.co.za/images/og-image.jpg",
        "@id": "https://wlcreationx.co.za",
        "url": "https://wlcreationx.co.za",
        "telephone": "+27 62 369 3769",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Chambord Apartments, 210 Albertus St, La Montagne",
          "addressLocality": "Pretoria",
          "addressRegion": "Gauteng",
          "postalCode": "0183",
          "addressCountry": "ZA"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": -25.7479,
          "longitude": 28.2293
        },
        "areaServed": ["Pretoria East", "Pretoria North", "Pretoria West", "Centurion", "Hatfield", "Brooklyn", "Menlyn", "Arcadia", "Silver Lakes", "Lynnwood", "La Montagne", "Gauteng", "Pretoria"],
        "serviceArea": {
          "@type": "Place",
          "name": "Pretoria"
        },
        "hasMap": "https://goo.gl/maps/2gXk8F8z6yP2",
        "sameAs": [
          "https://www.facebook.com/wlcreationx",
          "https://www.instagram.com/wlcreationx",
          "https://www.linkedin.com/company/wlcreationx"
        ],
        "openingHoursSpecification": [
          {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            "opens": "08:00",
            "closes": "17:00"
          },
          {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Saturday"],
            "opens": "08:00",
            "closes": "15:00"
          }
        ],
        "description": "WL CreationX is a leading graphic design company in Pretoria, offering branding, logo design, web design, and creative services for all Pretoria suburbs and Gauteng."
      }`}} />
      <HomeContent />
    </main>
  );
}
