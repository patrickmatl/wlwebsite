'use client';

import HeroSection from './HeroSection';
import Link from 'next/link';


// SEO-optimized headings for graphic design
const headings = {
  h2: {
    services: "Graphic Design Services in Pretoria South Africa",
    portfolio: "Award-Winning Design Agency Pretoria Portfolio",
    about: "Leading Creative Design Agency in Pretoria South Africa",
    testimonials: "Trusted by Top Companies Across Pretoria South Africa",
    projects: "Innovative Graphic Design Solutions",
    contact: "Partner with Pretoria's Top Design Agency"
  }
};

export default function HomeContent() {
  return (
    <main className="min-h-screen bg-black text-white relative overflow-hidden perspective-1000">
      <HeroSection
        title="Design"
        subtitle="Agency"
        description="Leading graphic design agency in Pretoria, delivering innovative visual solutions and creative excellence for businesses nationwide."
      />
      
      {/* Hidden SEO Headings */}
      <div className="sr-only">
        <h1>Premier Graphic Design Company and Agency in Pretoria South Africa</h1>
        <h2>Graphic Design Company in Pretoria South Africa</h2>
        <h3>Professional Branding and Visual Design Services</h3>
        <h4>Expert Logo Design and Brand Identity Solutions</h4>
        <h5>Custom Graphic Design for South African Businesses</h5>
        <h6>Quality Design Services in Johannesburg, Cape Town & Pretoria</h6>
      </div>

      {/* H1: Design Company and Agency in Pretoria South Africa */}
      <section className="py-20 px-4 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-syne font-bold mb-6 text-[#FFD700]">
            Premier Graphic Design Company and Agency in Pretoria South Africa
          </h1>
          <p className="mb-4 text-neutral-300 text-lg">
            Welcome to <span className="text-[#FFD700]">WL CreationX</span>, the leading graphic design company and agency in Pretoria, South Africa. We specialize in creating visually stunning and impactful designs that help businesses stand out in today's competitive market.
          </p>
          <p className="text-neutral-300 text-lg">
            As one of the top graphic design companies in Pretoria, we pride ourselves on delivering innovative and creative solutions tailored to your unique needs. From branding and logo design to web design and marketing materials, we've got you covered.
          </p>
        </div>
      </section>

      {/* H2: Best Graphic Design Company in Pretoria South Africa */}
      <section className="py-20 px-4 bg-black">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-syne font-bold mb-6 text-white">
            Graphic Design Company in Pretoria South Africa
          </h2>
          <p className="mb-4 text-neutral-300 text-lg">
            Our graphic design company in Pretoria is dedicated to helping businesses create a strong and memorable visual identity. With years of experience and a passion for creativity, we've become one of the most trusted graphic design agencies in South Africa.
          </p>
          <p className="text-neutral-300 text-lg">
            We understand that every business is unique, which is why we offer customized design solutions that align with your brand's goals and values. Whether you're looking for a complete brand overhaul or just need a new logo, our team is here to help. Let us show you why we're the go-to graphic design company in Pretoria.
          </p>
        </div>
      </section>

      {/* H3: Top Graphic Design Agency in Pretoria Professional Branding and Visual Design Services */}
      <section className="py-20 px-4 bg-gradient-to-b from-gray-900 to-black">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-2xl md:text-3xl font-syne font-bold mb-6 text-[#FFD700]">
            Professional Branding and Visual Design Services
          </h3>
          <p className="mb-4 text-neutral-300 text-lg">
            At our graphic design agency in Pretoria, we offer professional branding and visual design services that help businesses create a lasting impression. Your brand is more than just a logo—it's the face of your business, and we're here to make it unforgettable.
          </p>
          <p className="text-neutral-300 text-lg">
            Our branding services include logo design, color palette development, typography selection, and brand guidelines. We work closely with you to ensure that every element of your brand reflects your business's personality and values. Let us help you create a brand that stands out in the crowded marketplace.
          </p>
        </div>
      </section>

      {/* H4: Expert Logo Design and Brand Identity Solutions */}
      <section className="py-20 px-4 bg-black">
        <div className="max-w-4xl mx-auto">
          <h4 className="text-xl md:text-2xl font-syne font-bold mb-6 text-white">
            Expert Logo Design and Brand Identity Solutions
          </h4>
          <p className="mb-4 text-neutral-300 text-lg">
            Your logo is the cornerstone of your brand identity, and our team of expert designers is here to create a logo that truly represents your business. As one of the leading graphic design companies in Pretoria, we specialize in crafting logos that are not only visually appealing but also meaningful and memorable.
          </p>
          <p className="text-neutral-300 text-lg">
            We take a strategic approach to logo design, ensuring that it resonates with your target audience and communicates your brand's message effectively. From concept to final design, we'll work with you every step of the way to create a logo that you'll be proud to showcase.
          </p>
        </div>
      </section>

      {/* H5: Custom Graphic Design for Pretoria, South African Businesses */}
      <section className="py-20 px-4 bg-gradient-to-b from-gray-900 to-black">
        <div className="max-w-4xl mx-auto">
          <h5 className="text-lg md:text-xl font-syne font-bold mb-6 text-[#FFD700]">
            Custom Graphic Design for South African Businesses
          </h5>
          <p className="mb-4 text-neutral-300 text-lg">
            Every business is unique, and so are its design needs. That's why our graphic design agency in Pretoria offers custom graphic design services tailored to the specific requirements of South African businesses. Whether you need marketing materials, social media graphics, or packaging design, we've got you covered.
          </p>
          <p className="text-neutral-300 text-lg">
            Our team takes the time to understand your business, industry, and target audience to create designs that not only look great but also drive results. Let us help you create custom designs that set your business apart from the competition.
          </p>
        </div>
      </section>

      {/* H6: Quality Design Services in Johannesburg, Cape Town & Pretoria */}
      <section className="py-20 px-4 bg-black">
        <div className="max-w-4xl mx-auto">
          <h6 className="text-base md:text-lg font-syne font-bold mb-6 text-white">
            Quality Design Services in Johannesburg, Cape Town & Pretoria
          </h6>
          <p className="mb-4 text-neutral-300 text-lg">
            While we're based in Pretoria, our graphic design services extend to businesses in Johannesburg, Cape Town, and across South Africa. No matter where you're located, we're here to provide you with high-quality design solutions that help your business succeed.
          </p>
          <p className="text-neutral-300 text-lg">
            Our team is equipped to handle projects of all sizes and complexities, ensuring that you receive the same level of professionalism and creativity no matter where you are. Partner with us and experience the difference that quality design can make for your business.
          </p>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-gray-900 to-black">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-syne font-bold mb-6 text-[#FFD700]">
            Ready to Elevate Your Brand?
          </h2>
          <p className="mb-8 text-neutral-300 text-lg">
            Partner with Pretoria's leading graphic design company and take your business to the next level. Whether you need a new logo, a website redesign, or a complete branding strategy, we're here to help.
          </p>
          <Link 
            href="/contact"
            className="inline-flex items-center justify-center px-8 py-3 bg-[#FFD700] text-black hover:bg-[#FFA500] rounded-full transition-all duration-300 font-medium text-lg"
          >
            Get a Free Consultation
          </Link>
        </div>
      </section>

      {/* Schema.org Markup */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify([
          {
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "WL CreationX",
            "description": "Leading graphic design agency in Pretoria, delivering innovative visual solutions and creative excellence for businesses nationwide.",
            "image": "https://wlcreationx.co.za/images/logo.png",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "123 Design Street",
              "addressLocality": "Pretoria",
              "addressRegion": "Gauteng",
              "postalCode": "0002",
              "addressCountry": "South Africa"
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": "-25.7479",
              "longitude": "28.2293"
            },
            "url": "https://wlcreationx.co.za",
            "telephone": "+27623693769",
            "priceRange": "$$",
            "areaServed": ["Pretoria", "Johannesburg", "Cape Town", "South Africa"],
            "sameAs": [
              "https://facebook.com/wlcreationx",
              "https://twitter.com/wlcreationx",
              "https://instagram.com/wlcreationx",
              "https://linkedin.com/company/wlcreationx"
            ]
          },
          {
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "WL CreationX",
            "url": "https://wlcreationx.co.za",
            "logo": "https://wlcreationx.co.za/images/logo.png",
            "description": "Premier graphic design company and agency in Pretoria, South Africa, specializing in branding, logo design, and visual solutions.",
            "sameAs": [
              "https://facebook.com/wlcreationx",
              "https://twitter.com/wlcreationx",
              "https://instagram.com/wlcreationx",
              "https://linkedin.com/company/wlcreationx"
            ],
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "+27623693769",
              "contactType": "customer service",
              "email": "info@wlcreationx.co.za",
              "availableLanguage": ["English"]
            }
          },
          {
            "@context": "https://schema.org",
            "@type": "WebSite",
            "url": "https://wlcreationx.co.za",
            "name": "WL CreationX",
            "description": "Leading graphic design agency in Pretoria, South Africa, offering professional branding, logo design, and visual solutions.",
            "potentialAction": {
              "@type": "SearchAction",
              "target": "https://wlcreationx.co.za/search?q={search_term_string}",
              "query-input": "required name=search_term_string"
            }
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://wlcreationx.co.za"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Graphic Design Services",
                "item": "https://wlcreationx.co.za/services"
              },
              {
                "@type": "ListItem",
                "position": 3,
                "name": "Portfolio",
                "item": "https://wlcreationx.co.za/portfolio"
              }
            ]
          },
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "What services does WL CreationX offer?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "We offer a wide range of graphic design services, including branding, logo design, web design, print design, social media graphics, packaging design, illustration, and marketing materials."
                }
              },
              {
                "@type": "Question",
                "name": "Where is WL CreationX located?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "We are based in Pretoria, South Africa, but serve clients nationwide, including Johannesburg, Cape Town, and other major cities."
                }
              },
              {
                "@type": "Question",
                "name": "How can I contact WL CreationX?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "You can contact us via phone at +27623693769, email at info@wlcreationx.co.za, or through the contact form on our website."
                }
              },
              {
                "@type": "Question",
                "name": "What industries does WL CreationX serve?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "We work with businesses across various industries, including retail, healthcare, real estate, education, hospitality, and technology."
                }
              },
              {
                "@type": "Question",
                "name": "How much do your graphic design services cost?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Our pricing varies depending on the scope and complexity of the project. We offer competitive rates and can provide a custom quote after discussing your specific needs."
                }
              },
              {
                "@type": "Question",
                "name": "Do you offer custom graphic design solutions?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, we specialize in creating custom graphic design solutions tailored to your business's unique needs and goals."
                }
              },
              {
                "@type": "Question",
                "name": "How long does it take to complete a design project?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "The timeline depends on the project's complexity. We work efficiently to deliver high-quality designs within agreed-upon deadlines."
                }
              },
              {
                "@type": "Question",
                "name": "Can you help with rebranding an existing business?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Absolutely! We specialize in rebranding businesses to give them a fresh, modern look while maintaining their core identity."
                }
              },
              {
                "@type": "Question",
                "name": "Do you design websites as well?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, we offer web design and development services to create visually appealing and user-friendly websites for businesses."
                }
              },
              {
                "@type": "Question",
                "name": "What file formats do you provide for designs?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "We provide designs in various formats, including PNG, JPEG, PDF, SVG, and AI, depending on your requirements."
                }
              },
              {
                "@type": "Question",
                "name": "Do you offer social media design services?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, we create engaging social media graphics and content to help businesses grow their online presence."
                }
              },
              {
                "@type": "Question",
                "name": "Can you design marketing materials like brochures and flyers?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, we design a wide range of marketing materials, including brochures, flyers, business cards, posters, and banners."
                }
              },
              {
                "@type": "Question",
                "name": "Do you work with startups?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, we love working with startups and helping them establish a strong visual identity from the ground up."
                }
              },
              {
                "@type": "Question",
                "name": "What makes WL CreationX different from other graphic design companies?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "We combine creativity with strategic thinking to deliver designs that not only look great but also drive results. Our client-centric approach and attention to detail set us apart."
                }
              },
              {
                "@type": "Question",
                "name": "Do you offer revisions on design projects?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, we offer a set number of revisions to ensure you're completely satisfied with the final design."
                }
              },
              {
                "@type": "Question",
                "name": "Can you handle urgent design projects?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, we can accommodate urgent projects. Contact us with your requirements, and we'll do our best to meet your deadline."
                }
              },
              {
                "@type": "Question",
                "name": "Do you provide design services for packaging?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, we specialize in creating innovative and eye-catching packaging designs that help products stand out on the shelves."
                }
              },
              {
                "@type": "Question",
                "name": "What is your process for starting a new design project?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Our process begins with a consultation to understand your needs, followed by concept development, design creation, and final delivery with revisions as needed."
                }
              },
              {
                "@type": "Question",
                "name": "Do you offer design services for events?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, we design materials for events, including invitations, banners, posters, and digital assets."
                }
              },
              {
                "@type": "Question",
                "name": "Can you help with rebranding an existing business?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Absolutely! We specialize in rebranding businesses to give them a fresh, modern look while maintaining their core identity."
                }
              },
              {
                "@type": "Question",
                "name": "What services does a graphic design agency typically offer?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "A graphic design agency usually offers services like branding, logo design, web design, print design, social media graphics, packaging design, illustration, and marketing materials."
                }
              },
              {
                "@type": "Question",
                "name": "What is included in branding services?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Branding services typically include logo design, color palette development, typography selection, brand guidelines, and creating a cohesive visual identity for your business."
                }
              },
              {
                "@type": "Question",
                "name": "Do you design websites as part of your services?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, we offer web design and development services to create visually appealing, user-friendly, and responsive websites for businesses."
                }
              },
              {
                "@type": "Question",
                "name": "Can you create social media graphics?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Absolutely! We design engaging social media graphics, including posts, banners, stories, and ads, to help businesses grow their online presence."
                }
              },
              {
                "@type": "Question",
                "name": "Do you offer print design services?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, we design print materials like brochures, flyers, business cards, posters, banners, and more for businesses."
                }
              },
              {
                "@type": "Question",
                "name": "What is the process for creating a logo?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Our logo design process includes a consultation, research, concept development, revisions, and final delivery in various file formats."
                }
              },
              {
                "@type": "Question",
                "name": "Can you design packaging for products?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, we specialize in creating innovative and eye-catching packaging designs that help products stand out on the shelves."
                }
              },
              {
                "@type": "Question",
                "name": "Do you provide illustration services?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, we offer custom illustration services for businesses, including digital artwork, character design, and infographics."
                }
              },
              {
                "@type": "Question",
                "name": "Can you help with rebranding an existing business?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Absolutely! We specialize in rebranding businesses to give them a fresh, modern look while maintaining their core identity."
                }
              },
              {
                "@type": "Question",
                "name": "Do you design marketing materials?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, we design a wide range of marketing materials, including brochures, flyers, business cards, posters, and digital ads."
                }
              },
              {
                "@type": "Question",
                "name": "Can you create infographics?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, we design custom infographics to help businesses present complex information in a visually appealing and easy-to-understand way."
                }
              },
              {
                "@type": "Question",
                "name": "Do you offer motion graphics or animation services?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, we create motion graphics and animations for websites, social media, and marketing campaigns to engage your audience."
                }
              },
              {
                "@type": "Question",
                "name": "Can you design email newsletters?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, we design visually appealing email newsletters that help businesses communicate effectively with their audience."
                }
              },
              {
                "@type": "Question",
                "name": "Do you offer UI/UX design services?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, we provide UI/UX design services to create user-friendly and visually appealing interfaces for websites and apps."
                }
              },
              {
                "@type": "Question",
                "name": "Can you design presentations?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, we design professional and visually engaging presentations for businesses, including PowerPoint and Google Slides templates."
                }
              },
              {
                "@type": "Question",
                "name": "Do you create designs for events?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, we design materials for events, including invitations, banners, posters, and digital assets."
                }
              },
              {
                "@type": "Question",
                "name": "Can you design annual reports?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, we design professional and visually appealing annual reports for businesses and organizations."
                }
              },
              {
                "@type": "Question",
                "name": "Do you offer photography services?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "While we primarily focus on graphic design, we can collaborate with professional photographers to provide full-service branding solutions."
                }
              },
              {
                "@type": "Question",
                "name": "Can you design merchandise like T-shirts and mugs?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, we design custom artwork for merchandise, including T-shirts, mugs, tote bags, and more."
                }
              },
              {
                "@type": "Question",
                "name": "Do you offer design consulting services?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, we provide design consulting to help businesses develop effective visual strategies and improve their branding."
                }
              }
            ]
          }
        ])
      }} />
    </main>
  );
}