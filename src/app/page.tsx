'use client';

import { Suspense } from 'react';
import dynamic from 'next/dynamic';

// Simple loading component
const LoadingHero = () => (
  <div className="min-h-screen bg-black animate-pulse"></div>
);

// Dynamic import with loading boundary
const HeroSection = dynamic(() => import('@/components/HeroSection'), {
  loading: () => <LoadingHero />,
  ssr: false,
});

const HomePage = () => {
  return (
    <main className="min-h-screen bg-black text-white relative overflow-hidden perspective-1000">
      {/* Structured data for organization and local business */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": ["LocalBusiness", "DesignAgency"],
            "name": "WL CreationX",
            "description": "Premier graphic design agency in Pretoria offering professional branding, web design, and creative services. Specializing in logo design, corporate identity, and digital marketing solutions for businesses in Gauteng.",
            "url": "https://wlcreationx.co.za",
            "logo": "https://wlcreationx.co.za/logo.png",
            "image": "https://wlcreationx.co.za/images/office.jpg",
            "priceRange": "R650 - R85000",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "210 Albertus St",
              "addressLocality": "La Montagne",
              "addressRegion": "Pretoria",
              "postalCode": "0183",
              "addressCountry": "ZA"
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": "-25.7461",
              "longitude": "28.2831"
            },
            "telephone": "+27623693769",
            "email": "info@wlcreationx.co.za",
            "areaServed": ["Pretoria", "Gauteng", "South Africa"],
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "Design Services",
              "itemListElement": [
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Logo Design Pretoria",
                    "description": "Professional logo design services in Pretoria"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Web Design Pretoria",
                    "description": "Custom website design and development in Pretoria"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Brand Identity Design",
                    "description": "Complete brand identity design services in Pretoria"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Graphic Design Agency Pretoria",
                    "description": "Full-service graphic design agency in Pretoria"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Corporate Identity Design",
                    "description": "Professional corporate identity design in Pretoria"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Digital Marketing Design",
                    "description": "Digital marketing and design services in Pretoria"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Print Design Services",
                    "description": "Professional print design services in Pretoria"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "UI/UX Design Pretoria",
                    "description": "User interface and experience design in Pretoria"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Social Media Design",
                    "description": "Social media graphics and design in Pretoria"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Branding Agency Pretoria",
                    "description": "Professional branding agency services in Pretoria"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Creative Design Studio",
                    "description": "Creative design studio services in Pretoria"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Package Design Pretoria",
                    "description": "Product and package design services in Pretoria"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Marketing Design Agency",
                    "description": "Marketing design and strategy in Pretoria"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "E-commerce Design",
                    "description": "E-commerce website design in Pretoria"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Responsive Web Design",
                    "description": "Mobile-friendly website design in Pretoria"
                  }
                }
              ]
            },
            "sameAs": [
              "https://www.facebook.com/wlcreationx",
              "https://www.instagram.com/wlcreationx",
              "https://www.linkedin.com/company/wlcreationx",
              "https://www.behance.net/wlcreationx"
            ],
            "openingHoursSpecification": {
              "@type": "OpeningHoursSpecification",
              "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
              "opens": "08:00",
              "closes": "17:00"
            },
            "keywords": [
              "graphic design company pretoria",
              "design agency pretoria",
              "logo design pretoria",
              "web design pretoria",
              "branding agency pretoria",
              "creative agency pretoria",
              "digital design agency pretoria",
              "corporate identity design pretoria",
              "ui ux design pretoria",
              "print design pretoria",
              "marketing design pretoria",
              "package design pretoria",
              "social media design pretoria",
              "brand identity design pretoria",
              "website designer pretoria",
              "creative design studio pretoria",
              "professional design services pretoria",
              "graphic designer pretoria",
              "design company gauteng",
              "digital marketing design pretoria"
            ]
          })
        }}
      />

      {/* Hero Section */}
      <Suspense fallback={<LoadingHero />}>
        <HeroSection 
          title="Design"
          subtitle="Agency"
          description="Transforming brands through creative excellence. Your trusted design partner in Pretoria, delivering innovative graphic design, web development, and branding solutions."
        />
      </Suspense>

      {/* Hidden content for SEO */}
      <div className="seo-only">
        {/* Services Section */}
        <section id="services">
          <h2>Our Design Expertise</h2>
          <div>
            <h3>Graphic Design</h3>
            <p>Brand identity, marketing materials, and visual storytelling that captures attention and drives engagement.</p>
            
            <h3>Web Design</h3>
            <p>Custom websites that combine stunning aesthetics with seamless functionality and optimal performance.</p>
            
            <h3>Print Design</h3>
            <p>High-quality print materials that make a lasting impression and elevate your brand.</p>
            
            <h3>UI/UX Design</h3>
            <p>Intuitive interfaces and user experiences that engage and delight your audience.</p>
            
            <h3>Motion Design</h3>
            <p>Dynamic animations and motion graphics that bring your brand to life.</p>
            
            <h3>Brand Strategy</h3>
            <p>Strategic brand development that positions you for success in your market.</p>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section id="why-choose-us">
          <h2>Why Choose Our Design Agency in Pretoria?</h2>
          <p>Leading creative design agency in Pretoria offering professional branding and design services.</p>
        </section>

        {/* Footer Content */}
        <footer>
          <div>
            <h3>Contact Us</h3>
            <p>210 Albertus St, La Montagne, Pretoria, 0183</p>
            <p>Phone: +27623693769</p>
            <p>Email: info@wlcreationx.co.za</p>
          </div>
        </footer>
      </div>
    </main>
  );
};

export default HomePage;