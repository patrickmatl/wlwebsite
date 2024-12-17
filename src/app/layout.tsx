import type { Metadata } from 'next'
import { Space_Grotesk, Syne } from 'next/font/google'
import './globals.css'
import RootClientWrapper from '@/components/RootClientWrapper'
import Script from 'next/script'
import MetaTags from '@/components/SEO/MetaTags'
import Footer from '@/components/Footer'

// Main display font for headlines
const syne = Syne({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-syne',
  weight: ['400', '500', '600', '700', '800']
})

// Body font
const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-space-grotesk',
  weight: ['300', '400', '500', '600', '700']
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
    <html lang="en-ZA" className="scroll-smooth">
      <head>
        <MetaTags />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Script id="schema-script" type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "WebSite",
                  "@id": "https://wlcreationx.co.za/#website",
                  "url": "https://wlcreationx.co.za",
                  "name": "WL CreationX",
                  "description": "Leading graphic design studio in Pretoria",
                  "potentialAction": [{
                    "@type": "SearchAction",
                    "target": {
                      "@type": "EntryPoint",
                      "urlTemplate": "https://wlcreationx.co.za/search?q={search_term_string}"
                    },
                    "query-input": "required name=search_term_string"
                  }],
                  "publisher": {
                    "@type": "Organization",
                    "name": "WL CreationX",
                    "logo": {
                      "@type": "ImageObject",
                      "url": "https://wlcreationx.co.za/logo.png"
                    }
                  }
                },
                {
                  "@type": "LocalBusiness",
                  "@id": "https://wlcreationx.co.za/#business",
                  "name": "WL CreationX",
                  "image": "https://wlcreationx.co.za/studio-image.jpg",
                  "description": "Premier graphic design company in Pretoria, offering comprehensive branding and digital solutions. Serving Pretoria, Pretoria East, and Pretoria North with creative excellence.",
                  "url": "https://wlcreationx.co.za",
                  "telephone": "+27623693769",
                  "email": "info@wlcreationx.co.za",
                  "priceRange": "$$",
                  "address": {
                    "@type": "PostalAddress",
                    "streetAddress": "210 Albertus St",
                    "addressLocality": "Pretoria",
                    "addressRegion": "Gauteng",
                    "postalCode": "0183",
                    "addressCountry": "ZA"
                  },
                  "geo": {
                    "@type": "GeoCoordinates",
                    "latitude": "-25.7479",
                    "longitude": "28.2293"
                  },
                  "areaServed": [
                    {
                      "@type": "GeoCircle",
                      "name": "Pretoria Central",
                      "geoMidpoint": {
                        "@type": "GeoCoordinates",
                        "latitude": "-25.7479",
                        "longitude": "28.2293"
                      },
                      "geoRadius": "30000"
                    },
                    {
                      "@type": "GeoCircle",
                      "name": "Pretoria East",
                      "geoMidpoint": {
                        "@type": "GeoCoordinates",
                        "latitude": "-25.7832",
                        "longitude": "28.3016"
                      },
                      "geoRadius": "20000"
                    },
                    {
                      "@type": "GeoCircle",
                      "name": "Pretoria North",
                      "geoMidpoint": {
                        "@type": "GeoCoordinates",
                        "latitude": "-25.6741",
                        "longitude": "28.1859"
                      },
                      "geoRadius": "15000"
                    }
                  ],
                  "openingHoursSpecification": [
                    {
                      "@type": "OpeningHoursSpecification",
                      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                      "opens": "08:00",
                      "closes": "17:00"
                    }
                  ],
                  "sameAs": [
                    "https://facebook.com/wlcreationx",
                    "https://instagram.com/wlcreationx",
                    "https://linkedin.com/company/wlcreationx",
                    "https://twitter.com/wlcreationx"
                  ],
                  "hasOfferCatalog": {
                    "@type": "OfferCatalog",
                    "name": "Design Services",
                    "itemListElement": [
                      {
                        "@type": "Offer",
                        "itemOffered": {
                          "@type": "Service",
                          "name": "Logo Design",
                          "description": "Professional logo design services for businesses in Pretoria, Pretoria East, and Pretoria North"
                        }
                      },
                      {
                        "@type": "Offer",
                        "itemOffered": {
                          "@type": "Service",
                          "name": "Web Design",
                          "description": "Custom website design and development for businesses across Pretoria regions"
                        }
                      },
                      {
                        "@type": "Offer",
                        "itemOffered": {
                          "@type": "Service",
                          "name": "Branding",
                          "description": "Complete brand identity design services for Pretoria businesses"
                        }
                      },
                      {
                        "@type": "Offer",
                        "itemOffered": {
                          "@type": "Service",
                          "name": "Digital Marketing",
                          "description": "Comprehensive digital marketing solutions for Pretoria businesses"
                        }
                      },
                      {
                        "@type": "Offer",
                        "itemOffered": {
                          "@type": "Service",
                          "name": "Print Design",
                          "description": "Professional print design services for all Pretoria regions"
                        }
                      }
                    ]
                  }
                },
                {
                  "@type": "ProfessionalService",
                  "@id": "https://wlcreationx.co.za/#service",
                  "name": "WL CreationX Design Services",
                  "description": "Professional graphic design and branding services in Pretoria",
                  "serviceType": ["Graphic Design", "Web Design", "Branding", "Digital Marketing"],
                  "areaServed": [
                    {
                      "@type": "City",
                      "name": "Pretoria",
                      "sameAs": "https://en.wikipedia.org/wiki/Pretoria"
                    },
                    {
                      "@type": "City",
                      "name": "Pretoria East"
                    },
                    {
                      "@type": "City",
                      "name": "Pretoria North"
                    }
                  ]
                },
                {
                  "@type": "FAQPage",
                  "@id": "https://wlcreationx.co.za/#faq",
                  "mainEntity": [
                    {
                      "@type": "Question",
                      "name": "What graphic design services does WL CreationX offer in Pretoria?",
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "WL CreationX offers comprehensive graphic design services including logo design, branding, web design, UI/UX design, print design, and digital marketing solutions. We serve businesses throughout Pretoria, Pretoria East, and Pretoria North."
                      }
                    },
                    {
                      "@type": "Question",
                      "name": "Which areas of Pretoria do you serve?",
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "We serve all areas of Pretoria including Pretoria Central, Pretoria East, and Pretoria North. Our central location allows us to easily serve businesses throughout the greater Pretoria region."
                      }
                    },
                    {
                      "@type": "Question",
                      "name": "What makes WL CreationX different from other design agencies in Pretoria?",
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "We combine creative excellence with strategic thinking, offering personalized service and innovative solutions. Our deep understanding of the Pretoria market and international design standards sets us apart."
                      }
                    },
                    {
                      "@type": "Question",
                      "name": "What types of businesses do you serve in Pretoria?",
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "We serve a diverse range of businesses across Pretoria, from startups to established companies, including retail, professional services, restaurants, real estate agencies, and corporate enterprises. Our solutions are tailored to each business's unique needs and industry requirements."
                      }
                    },
                    {
                      "@type": "Question",
                      "name": "Do you offer web design services in Pretoria East?",
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Yes, we provide professional web design and development services throughout Pretoria East and surrounding areas. Our solutions include responsive websites, e-commerce platforms, and custom web applications."
                      }
                    },
                    {
                      "@type": "Question",
                      "name": "What is your process for logo design in Pretoria?",
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Our logo design process includes an initial consultation, research phase, concept development, presentation of multiple design options, refinement based on your feedback, and delivery of final files in all necessary formats. We ensure your logo stands out in the Pretoria market."
                      }
                    },
                    {
                      "@type": "Question",
                      "name": "Do you offer digital marketing services in Pretoria North?",
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Yes, we provide comprehensive digital marketing services in Pretoria North, including social media management, content creation, SEO, and online advertising campaigns tailored to your business needs."
                      }
                    },
                    {
                      "@type": "Question",
                      "name": "What are your turnaround times for design projects in Pretoria?",
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Project timelines vary: Logo design typically takes 1-2 weeks, business cards and stationery 3-5 days, websites 4-8 weeks depending on complexity. We provide detailed timelines during consultation and ensure timely delivery for all Pretoria clients."
                      }
                    }
                  ]
                }
              ]
            }
          `}
        </Script>
        <Script 
          id="google-analytics" 
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-XXXXXXXXXX');
            `
          }}
        />
      </head>
      <body className="font-sans antialiased">
        <RootClientWrapper spaceGrotesk={spaceGrotesk} syne={syne}>
          <main>
            {children}
          </main>
          <Footer />
        </RootClientWrapper>
      </body>
    </html>
  )
}
