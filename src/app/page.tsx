'use client';

import { Suspense, lazy } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import FAQAccordion from '@/components/FAQ/FAQAccordion';
import HeroSection from '@/components/HeroSection';
import GetInTouchButton from '@/components/GetInTouchButton';
import ServicesSection from '@/components/ServicesSection';

// Simple loading components
const LoadingHero = () => (
  <div className="min-h-screen bg-black animate-pulse"></div>
);

const LoadingSection = () => (
  <div className="h-96 bg-neutral-900 animate-pulse"></div>
);

// Dynamic imports
const LogoCarousel = lazy(() => import('@/components/LogoCarousel'));
const BlogPreview = lazy(() => import('@/components/BlogPreview'));

import { useState, useEffect } from 'react';

type PortfolioItem = {
  src: string;
  alt: string;
  title: string;
  category: string;
};

type ImageItem = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

type ImageCategory = {
  logo: ImageItem[];
  packaging: ImageItem[];
};

const HomePage = () => {
  const [category, setCategory] = useState<'logo' | 'packaging'>('logo');
  const [debug, setDebug] = useState<string>('');

  const packageImages = [
    '/images/packages/Package1.webp',
    '/images/packages/Package2.webp',
    '/images/packages/Package3.webp',
    '/images/packages/Package4.webp',
    '/images/packages/Package5.webp',
    '/images/packages/Package6.webp'
  ];

  const logoImages = Array.from({ length: 38 }, (_, i) => `/images/logos/Logo${i + 1}.webp`);

  // Debug function to check image loading
  const checkImage = (src: string) => {
    const img = document.createElement('img');
    img.onload = () => setDebug(prev => prev + `\nLoaded: ${src}`);
    img.onerror = () => setDebug(prev => prev + `\nError loading: ${src}`);
    img.src = src;
  };

  useEffect(() => {
    if (category === 'packaging') {
      packageImages.forEach(checkImage);
    }
  }, [category]);

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
            "serviceArea": {
              "@type": "GeoCircle",
              "geoMidpoint": {
                "@type": "GeoCoordinates",
                "latitude": "-25.7461",
                "longitude": "28.2831"
              },
              "geoRadius": "50000"
            },
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

      {/* Animated Grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30 animate-grid" />

      {/* Hero Section with enhanced SEO attributes */}
      <Suspense fallback={<LoadingHero />}>
        <HeroSection 
          title="Design"
          subtitle="Agency"
          description="Transforming brands through creative excellence. Your trusted design partner in Pretoria, delivering innovative graphic design, web development, and branding solutions."
        />
      </Suspense>

      {/* Logo Carousel Section */}
      <section className="py-24 bg-black relative">
        <Suspense fallback={<LoadingSection />}>
          <LogoCarousel />
        </Suspense>
      </section>

      {/* Services Section */}
      <section className="py-32 bg-black relative overflow-hidden" id="services">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Section Header */}
          <div className="text-center mb-20">
            <h2 className="font-syne text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-neutral-400 mb-6">
              Our Expertise
            </h2>
            <p className="font-space-grotesk text-xl text-neutral-400 max-w-2xl mx-auto">
              Transforming ideas into exceptional digital experiences
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Graphic Design',
                description: 'Brand identity, marketing materials, and visual storytelling that captures attention and drives engagement.',
                features: ['Logo Design', 'Brand Guidelines', 'Marketing Collateral', 'Social Media Graphics'],
                icon: '🎨',
                link: '/pricing/graphic-design'
              },
              {
                title: 'Web Design',
                description: 'Custom websites that combine stunning aesthetics with seamless functionality and optimal performance.',
                features: ['Custom Development', 'Responsive Design', 'E-commerce Solutions', 'CMS Integration'],
                icon: '💻',
                link: '/pricing/website-design'
              },
              {
                title: 'Print Design',
                description: 'High-quality print materials that make a lasting impression and elevate your brand.',
                features: ['Business Cards', 'Brochures', 'Packaging', 'Large Format Printing'],
                icon: '🖨️',
                link: '/pricing/print-design'
              },
              {
                title: 'UI/UX Design',
                description: 'Intuitive interfaces and user experiences that engage and delight your audience.',
                features: ['User Research', 'Wireframing', 'Prototyping', 'User Testing'],
                icon: '🎯',
                link: '/pricing/website-design#custom'
              },
              {
                title: 'Motion Design',
                description: 'Dynamic animations and motion graphics that bring your brand to life.',
                features: ['Logo Animation', 'Social Media Content', 'Video Editing', 'Motion Graphics'],
                icon: '✨',
                link: '/pricing/graphic-design#animation'
              },
              {
                title: 'Brand Strategy',
                description: 'Strategic brand development that positions you for success in your market.',
                features: ['Market Research', 'Brand Positioning', 'Content Strategy', 'Brand Voice'],
                icon: '📈',
                link: '/pricing/graphic-design#corporate'
              }
            ].map((service, _index) => (
              <div 
                key={service.title}
                className="group relative bg-neutral-900 p-8 rounded-lg overflow-hidden transform hover:-translate-y-1 transition-all duration-300 service-card hover-trigger"
              >
                {/* Service background accent */}
                <div className="absolute inset-0 bg-gradient-to-br from-gold-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Icon */}
                <div className="text-4xl mb-6">{service.icon}</div>
                
                {/* Title */}
                <h3 className="font-syne text-2xl font-bold text-white mb-4">
                  {service.title}
                </h3>
                
                {/* Description */}
                <p className="font-space-grotesk text-neutral-400 mb-6">
                  {service.description}
                </p>
                
                {/* Features */}
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature) => (
                    <li key={feature} className="font-space-grotesk text-sm text-neutral-300 flex items-center">
                      <span className="w-1 h-1 bg-gold-500 rounded-full mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 mt-4">
                  <Link 
                    href={service.link}
                    className="inline-flex items-center justify-center px-4 py-2 border border-[#FFD700] text-[#FFD700] rounded hover:bg-[#FFD700] hover:text-black transition-all duration-300"
                  >
                    Learn More
                  </Link>
                  <Link 
                    href="/contact"
                    className="inline-flex items-center justify-center px-4 py-2 bg-[#FFD700] text-black rounded hover:bg-[#FFE44D] transition-all duration-300"
                  >
                    Get Quote
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Background accents */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/2 h-px w-32 bg-gradient-to-r from-transparent via-gold-500 to-transparent" />
          <div className="absolute bottom-0 left-1/2 h-px w-32 bg-gradient-to-r from-transparent via-gold-500 to-transparent" />
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-gradient-to-b from-black/30 to-black/50 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <h2 className="font-syne text-4xl md:text-5xl font-bold text-center mb-16">
            Why Choose Our Design Agency in Pretoria?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="flex flex-col gap-2">
              <h3 className="font-syne text-2xl font-bold text-[#FFD700]">Local Expertise</h3>
              <p className="text-neutral-300">Based in Pretoria, we understand the local market and deliver designs that resonate with your target audience.</p>
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="font-syne text-2xl font-bold text-[#FFD700]">Creative Excellence</h3>
              <p className="text-neutral-300">Award-winning design solutions that combine creativity with strategic thinking.</p>
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="font-syne text-2xl font-bold text-[#FFD700]">Client-Focused Approach</h3>
              <p className="text-neutral-300">We work closely with you to understand your vision and deliver results that exceed expectations.</p>
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="font-syne text-2xl font-bold text-[#FFD700]">Full-Service Agency</h3>
              <p className="text-neutral-300">From concept to execution, we handle all your design needs under one roof.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Work */}
      <section className="py-20 bg-[#0A0A0A]" id="work">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between mb-16">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Featured Work</h2>
              <p className="text-gray-400 max-w-2xl">Transforming brands through strategic design and creative innovation.</p>
            </div>
            <a href="/portfolio.pdf" download className="mt-8 md:mt-0 group relative px-6 py-3 bg-transparent border border-[#FFD700] text-[#FFD700] rounded-full hover:bg-[#FFD700] hover:text-black transition-all duration-300 hover-trigger">
              <span>Download Portfolio</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </a>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Brand Identity Redesign',
                category: 'Branding & Identity',
                description: 'Complete brand transformation for a leading tech company.'
              },
              {
                title: 'E-commerce Platform',
                category: 'Web Development',
                description: 'Custom online store with seamless user experience.'
              },
              {
                title: 'Marketing Campaign',
                category: 'Digital Marketing',
                description: 'Integrated campaign that doubled client engagement.'
              }
            ].map((project, index) => (
              <div key={index} className="group relative aspect-[4/3] overflow-hidden bg-gray-900 rounded-lg cursor-pointer service-card hover-trigger">
                <div className="absolute inset-0 bg-gradient-to-br from-[#FFD700]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute inset-0 flex items-center justify-center p-8 text-white">
                  <div className="text-left transform translate-y-8 group-hover:translate-y-0 transition-transform">
                    <span className="text-[#FFD700] text-sm mb-2 block opacity-0 group-hover:opacity-100 transition-opacity delay-100">{project.category}</span>
                    <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
                    <p className="text-gray-300 mb-4 opacity-0 group-hover:opacity-100 transition-opacity delay-150">{project.description}</p>
                    <span className="inline-block px-4 py-2 border border-[#FFD700] text-[#FFD700] rounded-full text-sm opacity-0 group-hover:opacity-100 transition-opacity delay-200">
                      View Case Study →
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section className="py-20 bg-[#0A0A0A]" id="portfolio">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Our Portfolio</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Explore our collection of logo designs and packaging projects. Each piece represents our commitment to quality and creativity.
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex justify-center gap-4 mb-12">
            <button
              onClick={() => setCategory('logo')}
              className={`px-8 py-3 rounded-full text-lg font-medium transition-all duration-300 ${
                category === 'logo' 
                  ? 'bg-[#FFD700] text-black' 
                  : 'bg-zinc-800 text-white hover:bg-zinc-700'
              }`}
            >
              Logo Design
            </button>
            <button
              onClick={() => setCategory('packaging')}
              className={`px-8 py-3 rounded-full text-lg font-medium transition-all duration-300 ${
                category === 'packaging' 
                  ? 'bg-[#FFD700] text-black' 
                  : 'bg-zinc-800 text-white hover:bg-zinc-700'
              }`}
            >
              Packaging Design
            </button>
          </div>

          {/* Debug Info */}
          {debug && (
            <div className="text-xs text-gray-400 mb-4 whitespace-pre-wrap">
              {debug}
            </div>
          )}

          {/* Portfolio Grid */}
          <div 
            className={`grid gap-6 ${
              category === 'packaging' 
                ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
                : 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4'
            }`}
          >
            {category === 'packaging' ? (
              // Package Images
              packageImages.map((src, index) => (
                <div 
                  key={src}
                  className="relative group aspect-[354/564] rounded-lg overflow-hidden"
                >
                  <Image
                    src={src}
                    alt={`Package Design ${index + 1}`}
                    width={354}
                    height={564}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <p className="text-white text-lg font-medium px-4 text-center">Package Design {index + 1}</p>
                  </div>
                </div>
              ))
            ) : (
              // Logo Images
              logoImages.map((src, index) => (
                <div 
                  key={src}
                  className="relative group aspect-square rounded-lg overflow-hidden bg-zinc-900"
                >
                  <Image
                    src={src}
                    alt={`Logo Design ${index + 1}`}
                    width={400}
                    height={400}
                    className="w-full h-full object-contain p-4 transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <p className="text-white text-lg font-medium px-4 text-center">Logo Design {index + 1}</p>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Call to Action */}
          <div className="text-center mt-16">
            <a
              href="#contact"
              className="inline-block bg-[#FFD700] text-black px-8 py-3 rounded-full font-medium hover:bg-[#FFE44D] transition-colors duration-300"
            >
              Start Your Design Project
            </a>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-32 bg-neutral-900 relative overflow-hidden" id="process">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Section Header */}
          <div className="text-center mb-20">
            <h2 className="font-syne text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-neutral-400 mb-6">
              Our Process
            </h2>
            <p className="font-space-grotesk text-xl text-neutral-400 max-w-2xl mx-auto">
              A refined approach to bringing your vision to life
            </p>
          </div>

          {/* Process Steps */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                step: '01',
                title: 'Discovery',
                description: 'Understanding your goals, audience, and unique challenges'
              },
              {
                step: '02',
                title: 'Strategy',
                description: 'Developing a tailored plan to achieve your objectives'
              },
              {
                step: '03',
                title: 'Creation',
                description: 'Bringing ideas to life with precision and creativity'
              },
              {
                step: '04',
                title: 'Refinement',
                description: 'Perfecting every detail for maximum impact'
              }
            ].map((phase) => (
              <div 
                key={phase.step}
                className="group relative p-8 process-step hover-trigger"
              >
                <div className="mb-4 font-syne text-gold-500 text-7xl font-bold opacity-20 group-hover:opacity-100 transition-opacity duration-300">
                  {phase.step}
                </div>
                <h3 className="font-syne text-2xl font-bold text-white mb-4">
                  {phase.title}
                </h3>
                <p className="font-space-grotesk text-neutral-400">
                  {phase.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Background accents */}
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-0 h-px w-full bg-gradient-to-r from-transparent via-gold-500/20 to-transparent" />
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-zinc-900/30">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-[#FFD700]">
            Frequently Asked Questions About Our Design Services
          </h2>

          {/* FAQ Schema */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
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
                  },
                  {
                    "@type": "Question",
                    "name": "What experience does WL CreationX have?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Established in 2016, WL CreationX has over 7 years of experience in the design industry. Our team has successfully completed hundreds of projects for businesses across South Africa, from startups to established enterprises. We're registered with the Companies and Intellectual Property Commission (CIPC) under registration number K2016514024."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "Do you offer design services in languages other than English?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Yes, we provide design services in multiple South African languages including English, Afrikaans, Zulu, and other official languages. We understand the importance of effective communication in our diverse market and ensure all designs are culturally appropriate and linguistically accurate."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "What file formats do you provide for completed designs?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "We provide all industry-standard file formats. For logos: AI, EPS, PDF, PNG, JPG, and SVG. For print designs: print-ready PDF files with proper bleed and crop marks. For web: optimized images in multiple formats and responsive designs for all devices. Source files are included in premium packages."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "Do you offer rush or express design services in Pretoria?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Yes, we offer express design services for urgent projects with 24-48 hour turnaround times, subject to availability and project scope. Rush services are available for logos, business cards, flyers, and other small design items. Additional fees may apply for express services."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "What makes WL CreationX different from other design agencies in Pretoria?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "WL CreationX stands out through our combination of local market expertise and international design standards. We offer personalized service, competitive pricing, and a full range of design solutions under one roof. Our team uses cutting-edge tools and technologies while providing dedicated support throughout your project."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "Do you provide training for managing websites or social media content?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Yes, we provide comprehensive training for clients on managing their websites, content management systems (CMS), and social media platforms. This includes video tutorials, documentation, and hands-on training sessions to ensure you can effectively maintain and update your digital presence."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "What industries do you specialize in?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "While we serve all industries, we have particular expertise in retail, professional services, healthcare, technology, hospitality, education, and manufacturing sectors in Pretoria and Gauteng. Each industry receives customized design solutions that align with sector-specific requirements and best practices."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "Do you offer ongoing maintenance and support?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Yes, we offer various maintenance packages for websites, brand materials, and digital assets. Our support includes regular updates, content management, security monitoring, and technical assistance. We also provide monthly packages for ongoing design needs and brand consistency management."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "What is your revision policy?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Our revision policy varies by package. Basic packages include 2-3 revision rounds, while premium packages offer unlimited revisions. We work closely with you until you're completely satisfied with the final design, ensuring it meets your vision and business objectives."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "Do you offer photography or video services?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "While our primary focus is on graphic and web design, we collaborate with professional photographers and videographers in Pretoria for clients needing these services. We can coordinate and art direct photo/video shoots to ensure they align with your brand identity."
                    }
                  }
                ]
              })
            }}
          />

          <FAQAccordion
            faqs={[
              {
                question: "What graphic design services does WL CreationX offer in Pretoria?",
                answer: "WL CreationX offers a comprehensive range of design services in Pretoria including logo design (from R650), brand identity packages, website design, UI/UX design, print design, packaging design, social media graphics, and corporate identity design. We also provide digital marketing design services and complete branding solutions for businesses of all sizes."
              },
              {
                question: "How much does professional logo design cost in Pretoria?",
                answer: "Our logo design packages in Pretoria start from R650 for basic designs and range up to R3,500 for premium packages. Basic packages include 1 concept and 2 revisions, while premium packages offer 5 concepts, unlimited revisions, and additional features like business card design and social media kit."
              },
              {
                question: "What's included in your website design packages?",
                answer: "Our website design packages range from R4,500 to R15,999. Basic packages include 5 pages, mobile responsiveness, contact forms, and basic SEO. Business packages add features like blog setup and Google Analytics. E-commerce packages include unlimited pages, product management, payment gateway integration, and inventory systems."
              },
              {
                question: "What is WL CreationX's design process?",
                answer: "Our design process begins with a thorough consultation to understand your needs, followed by research and concept development. We then create initial designs, collaborate with you for feedback and revisions, and finalize the deliverables. Throughout the process, we maintain clear communication and ensure your complete satisfaction."
              },
              {
                question: "Where is WL CreationX located in Pretoria?",
                answer: "WL CreationX is located at 210 Albertus St, La Montagne, Pretoria. We serve clients throughout Pretoria, Gauteng, and South Africa, offering both in-person consultations at our office and virtual meetings for convenience."
              },
              {
                question: "What experience does WL CreationX have?",
                answer: "Established in 2016, WL CreationX has over 7 years of experience in the design industry. Our team has successfully completed hundreds of projects for businesses across South Africa, from startups to established enterprises. We're registered with the Companies and Intellectual Property Commission (CIPC) under registration number K2016514024."
              },
              {
                question: "Do you offer design services in languages other than English?",
                answer: "Yes, we provide design services in multiple South African languages including English, Afrikaans, Zulu, and other official languages. We understand the importance of effective communication in our diverse market and ensure all designs are culturally appropriate and linguistically accurate."
              },
              {
                question: "What file formats do you provide for completed designs?",
                answer: "We provide all industry-standard file formats. For logos: AI, EPS, PDF, PNG, JPG, and SVG. For print designs: print-ready PDF files with proper bleed and crop marks. For web: optimized images in multiple formats and responsive designs for all devices. Source files are included in premium packages."
              },
              {
                question: "Do you offer rush or express design services in Pretoria?",
                answer: "Yes, we offer express design services for urgent projects with 24-48 hour turnaround times, subject to availability and project scope. Rush services are available for logos, business cards, flyers, and other small design items. Additional fees may apply for express services."
              },
              {
                question: "What makes WL CreationX different from other design agencies in Pretoria?",
                answer: "WL CreationX stands out through our combination of local market expertise and international design standards. We offer personalized service, competitive pricing, and a full range of design solutions under one roof. Our team uses cutting-edge tools and technologies while providing dedicated support throughout your project."
              }
            ]}
          />
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 bg-[#0A0A0A] text-white" id="contact">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="font-syne text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-neutral-400 mb-8">
            Ready to elevate your brand?
          </h2>
          <p className="font-space-grotesk text-xl text-neutral-400 mb-12">
            Let's create something extraordinary together.
          </p>
          <GetInTouchButton variant="primary" text="Get in Touch" className="text-lg" />
        </div>
      </section>

      {/* Blog Preview Section */}
      <Suspense fallback={<LoadingSection />}>
        <BlogPreview />
      </Suspense>
    </main>
  );
}

export default HomePage;