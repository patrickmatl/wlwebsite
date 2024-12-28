'use client';

import Script from 'next/script';

export default function SEOContent() {
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://wlcreationx.co.za",
    "name": "WL creationX Design Agency",
    "image": "https://wlcreationx.co.za/images/logo.png",
    "description": "Premier graphic design company in Pretoria offering professional branding, web design, and creative solutions. Trusted graphic design agency for businesses in Pretoria and Gauteng.",
    "url": "https://wlcreationx.co.za",
    "telephone": "+27123456789",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Your Street Address",
      "addressLocality": "Pretoria",
      "addressRegion": "Gauteng",
      "postalCode": "0081",
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
        "geoMidpoint": {
          "@type": "GeoCoordinates",
          "latitude": "-25.7479",
          "longitude": "28.2293"
        },
        "geoRadius": "50000"
      },
      {
        "@type": "City",
        "name": "Pretoria"
      },
      {
        "@type": "City",
        "name": "Centurion"
      },
      {
        "@type": "City",
        "name": "Midrand"
      }
    ],
    "priceRange": "$$",
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday"
      ],
      "opens": "08:00",
      "closes": "17:00"
    },
    "sameAs": [
      "https://facebook.com/whitelabel",
      "https://instagram.com/whitelabel",
      "https://linkedin.com/company/whitelabel"
    ]
  };

  const professionalServiceSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "White Label Design Agency",
    "serviceType": "Graphic Design",
    "additionalType": "https://www.wikidata.org/wiki/Q5592126",
    "knowsAbout": [
      "Graphic Design",
      "Brand Identity Design",
      "Web Design",
      "Logo Design",
      "Print Design",
      "Packaging Design",
      "UI/UX Design"
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Design Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Brand Design",
            "description": "Professional brand identity design in Pretoria"
          },
          "priceSpecification": {
            "@type": "PriceSpecification",
            "price": "3500.00",
            "priceCurrency": "ZAR"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Logo Design",
            "description": "Custom logo design services in Pretoria"
          },
          "priceSpecification": {
            "@type": "PriceSpecification",
            "price": "650.00",
            "priceCurrency": "ZAR"
          }
        }
      ]
    }
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "White Label Design Agency",
    "alternateName": "White Label",
    "foundingDate": "2016",
    "founders": [{
      "@type": "Person",
      "name": "Founder Name"
    }],
    "knowsLanguage": [
      "en",
      "af",
      "zu",
      "xh",
      "st"
    ],
    "award": [
      "Best Design Agency Pretoria 2023",
      "Top Rated on Clutch 2023"
    ]
  };

  const aggregateRatingSchema = {
    "@context": "https://schema.org",
    "@type": "AggregateRating",
    "itemReviewed": {
      "@type": "LocalBusiness",
      "name": "White Label Design Agency",
      "image": "https://whitelabel.co.za/images/logo.png"
    },
    "ratingValue": "4.9",
    "bestRating": "5",
    "worstRating": "1",
    "ratingCount": "127",
    "reviewCount": "89"
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What graphic design services does WL CreationX offer in Pretoria?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "WL CreationX offers a comprehensive range of design services in Pretoria including logo design (from R650), brand identity packages, website design, UI/UX design, print design, packaging design, social media graphics, and corporate identity design. We also provide digital marketing design services and complete branding solutions for businesses of all sizes."
        }
      },
      {
        "@type": "Question",
        "name": "How much does professional logo design cost in Pretoria?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Our logo design packages in Pretoria start from R650 for basic designs and range up to R3,500 for premium packages. Basic packages include 1 concept and 2 revisions, while premium packages offer 5 concepts, unlimited revisions, and additional features like business card design and social media kit."
        }
      },
      {
        "@type": "Question",
        "name": "What's included in your website design packages?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Our website design packages range from R4,500 to R15,999. Basic packages include 5 pages, mobile responsiveness, contact forms, and basic SEO. Business packages add features like blog setup and Google Analytics. E-commerce packages include unlimited pages, product management, payment gateway integration, and inventory systems."
        }
      },
      {
        "@type": "Question",
        "name": "What is WL CreationX's design process?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Our design process begins with a thorough consultation to understand your needs, followed by research and concept development. We then create initial designs, collaborate with you for feedback and revisions, and finalize the deliverables. Throughout the process, we maintain clear communication and ensure your complete satisfaction."
        }
      },
      {
        "@type": "Question",
        "name": "Where is WL CreationX located in Pretoria?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "WL CreationX is located at 210 Albertus St, La Montagne, Pretoria. We serve clients throughout Pretoria, Gauteng, and South Africa, offering both in-person consultations at our office and virtual meetings for convenience."
        }
      }
    ]
  };

  return (
    <>
      {/* Structured Data */}
      <Script id="structured-data-local" type="application/ld+json">
        {JSON.stringify(localBusinessSchema)}
      </Script>
      <Script id="structured-data-professional" type="application/ld+json">
        {JSON.stringify(professionalServiceSchema)}
      </Script>
      <Script id="structured-data-organization" type="application/ld+json">
        {JSON.stringify(organizationSchema)}
      </Script>
      <Script id="structured-data-rating" type="application/ld+json">
        {JSON.stringify(aggregateRatingSchema)}
      </Script>
      <Script id="structured-data-faq" type="application/ld+json">
        {JSON.stringify(faqSchema)}
      </Script>

      {/* Hidden SEO Content */}
      <div className="sr-only">
        <h2>Premier Graphic Design Company in Pretoria</h2>
        <p>
          Looking for a professional graphic design company in Pretoria? White Label is your trusted 
          graphic design agency delivering exceptional creative solutions. Our Pretoria-based design 
          team specializes in brand identity, web design, and print materials.
        </p>
        
        <h3>Expert Graphic Design Services in Pretoria</h3>
        <ul>
          <li>Brand Identity Design and Strategy</li>
          <li>Website Design and Development</li>
          <li>Print Design and Marketing Materials</li>
          <li>Logo Design and Corporate Identity</li>
          <li>Digital Marketing Design</li>
          <li>Packaging Design</li>
        </ul>

        <h3>Areas We Serve in Pretoria and Gauteng</h3>
        <ul>
          <li>Pretoria Central Business District</li>
          <li>Centurion and Surrounds</li>
          <li>Menlyn and Brooklyn</li>
          <li>Hatfield and Arcadia</li>
          <li>Waterkloof and Surrounds</li>
          <li>Midrand and Johannesburg North</li>
          <li>Pretoria East (Including Faerie Glen, Garsfontein)</li>
          <li>Pretoria North (Including Wonderboom, Montana)</li>
        </ul>

        <h3>Industry-Specific Design Solutions</h3>
        <ul>
          <li>Corporate and Business Design</li>
          <li>Retail and E-commerce Design</li>
          <li>Restaurant and Hospitality Design</li>
          <li>Healthcare and Medical Design</li>
          <li>Educational Institution Design</li>
          <li>Technology and IT Company Design</li>
          <li>Real Estate and Property Design</li>
        </ul>

        <h3>Local Design Expertise</h3>
        <p>
          As a Pretoria-based graphic design agency, we understand the local market dynamics and cultural nuances. 
          Our designs resonate with South African audiences while maintaining international standards. We offer services 
          in multiple languages including English, Afrikaans, Zulu, Xhosa, and Sotho.
        </p>

        <h3>Design Packages and Pricing</h3>
        <ul>
          <li>Logo Design Packages from R650</li>
          <li>Brand Identity Packages from R3,500</li>
          <li>Website Design Packages from R4,500</li>
          <li>E-commerce Solutions from R15,999</li>
          <li>Print Design Packages from R1,200</li>
          <li>Monthly Retainer Options Available</li>
        </ul>

        <h3>Why Choose Our Graphic Design Agency?</h3>
        <ul>
          <li>Local Pretoria-based design team</li>
          <li>Over 7 years of industry experience</li>
          <li>Award-winning creative solutions</li>
          <li>Personalized service and support</li>
          <li>Competitive pricing for local businesses</li>
          <li>Fast turnaround times</li>
          <li>Free consultations</li>
          <li>After-hours support available</li>
        </ul>

        <h3>Related Keywords</h3>
        <p>
          graphic design pretoria, graphic designer pretoria, logo design pretoria, 
          web design pretoria, branding agency pretoria, print design pretoria, 
          corporate identity pretoria, package design pretoria, ui ux design pretoria, 
          graphic design company gauteng, design agency south africa, affordable graphic design pretoria, 
          professional graphic designer pretoria, creative agency pretoria, digital design pretoria
        </p>
      </div>
    </>
  );
}
