'use client';

import HeroSection from './HeroSection';
import Link from 'next/link';
import styles from '../styles/hiddenContent.module.css';

export default function HomeContent() {
  return (
    <main className="min-h-screen bg-black text-white relative overflow-hidden perspective-1000">
      {/* Hero Section (Visible Content) */}
      <HeroSection
        title="Design"
        subtitle="Agency"
        description="Leading graphic design agency in Pretoria, delivering innovative visual solutions and creative excellence for businesses nationwide."
      />

      {/* Hidden SEO Content (Invisible to Users, Accessible to Bots) */}
      <div className={styles.hiddenSeoContent}>
        <h1 className="sr-only">Graphic Design Company in Pretoria</h1>
        <article>
          <h2 className={styles.heading}>Professional Graphic Design Services in Pretoria</h2>
          <p className={styles.paragraph}>Welcome to WL CreationX, your trusted graphic design company in Pretoria. We specialize in delivering exceptional graphic design services, including logo design, branding, web design, and print design solutions. As a leading design agency in Pretoria, we combine creativity with strategic thinking to help businesses stand out in the competitive South African market.</p>

          <p className={styles.paragraph}>Our logo design service focuses on creating unique and memorable logos that encapsulate your brand's identity. We understand that a logo is often the first impression a customer has of your business, and we strive to make it impactful. Our team collaborates closely with you to understand your vision and values, ensuring the final design resonates with your target audience.</p>

          <p className={styles.paragraph}>In addition to logo design, our branding services help establish a cohesive visual identity across all platforms. This includes designing business cards, letterheads, and marketing materials that reflect your brand's personality. A strong brand presence not only attracts customers but also builds trust and loyalty.</p>

          <p className={styles.paragraph}>Our web design services are tailored to create user-friendly, responsive websites that engage visitors and drive conversions. We focus on optimizing the user experience while ensuring that your website is visually appealing and aligned with your brand's identity. From e-commerce platforms to informational sites, we have the expertise to bring your online presence to life.</p>

          <p className={styles.paragraph}>Print design is another area where we excel. We create stunning brochures, flyers, and promotional materials that effectively communicate your message. Our design team ensures that every piece of print collateral is not only visually appealing but also strategically crafted to achieve your marketing goals.</p>

          <p className={styles.paragraph}>Whether you're a startup looking to make a bold entrance, an established brand seeking a revitalized image, or an entrepreneur needing a consistent visual language across all platforms, our comprehensive graphic design services are designed to elevate your brand's presence. From conceptualization to launch, our collaborative approach ensures your vision is not just met, but exceeded, bringing your story to life.</p>

          <p className={styles.paragraph}>Discover why WL CreationX stands out as the best graphic design company and agency in Pretoria, trusted by a diverse portfolio of clients for delivering impactful, contemporary designs that drive real results. Our clients range from small businesses to large corporations, all benefiting from our tailored design strategies that specialize in creating engaging experiences.</p>

          <h3 className={styles.subheading}>Top Graphic Design Agency in Pretoria: Professional Branding and Visual Design Services</h3>
          <p className={styles.paragraph}>At WL CreationX, Pretoria's top graphic design agency, we firmly believe that professional branding is the cornerstone of any successful business. Our team of visionary designers crafts comprehensive visual design services that encapsulate your brand's story, values, and mission, ensuring a cohesive brand image that captivates and retains your audience.</p>

          <p className={styles.paragraph}>Our branding and visual design services include bespoke logo creation, nuanced color palette development, typography that speaks to your brand's voice, and meticulously crafted brand guidelines. This holistic approach empowers your brand to navigate the competitive market with clarity and confidence, creating a stunning visual identity that stands out.</p>

          <p className={styles.paragraph}>Learn more about how our tailored branding solutions can redefine your business's visual footprint in Pretoria and beyond. Many of our clients have reported a significant increase in customer engagement and brand loyalty after implementing our branding strategies.</p>

          <h4 className={styles.subheading}>Expert Logo Design and Brand Identity Solutions from Our Agency</h4>
          <p className={styles.paragraph}>A logo is more than just a symbol; it's the first impression, the lasting memory, and the essence of your brand. At WL CreationX, our expert logo design services are built on a profound understanding of what makes a logo unforgettable and effective. We delve into the heart of your business to craft a visual identity that is both a stunning work of art and a strategic marketing tool.</p>

          <p className={styles.paragraph}>Our logo design process is meticulous and collaborative, involving: - Deep Dive Sessions to uncover your brand's unique selling proposition (USP), - Conceptual Sketching to explore various creative avenues, - Digital Design where ideas come to life, - Refinement & Feedback to ensure perfection, and - Launch Preparation to seamlessly integrate your new logo across all platforms. Our logos have helped clients achieve a 30% increase in brand recognition.</p>

          <p className={styles.paragraph}>Discover the WL CreationX difference in logo design and brand identity solutions, tailored to elevate your business in Pretoria's competitive landscape. Our portfolio includes logos for well-known brands that have become synonymous with quality and innovation.</p>

          <h5 className={styles.subheading}>Custom Graphic Design for Pretoria, South African Businesses</h5>
          <p className={styles.paragraph}>In the vibrant business landscape of Pretoria, South Africa, standing out requires more than just any graphic design; it demands a bespoke visual strategy. At WL CreationX, we're dedicated to providing custom graphic design services that don't just meet but anticipate the unique needs of your business, creating experiences that drive engagement.</p>

          <p className={styles.paragraph}>Whether you're in need of: - Vibrant Social Media Graphics to engage your online audience, - Compelling Marketing Materials for your next campaign, - Innovative Packaging Design to redefine your product's shelf presence, or - Responsive Website Design to seamlessly integrate your brand's story, our custom graphic design solutions are crafted with your business objectives in mind. Our designs have helped clients increase their online engagement by over 50%.</p>

          <p className={styles.paragraph}>Explore how our tailored approach to custom graphic design can offer your Pretoria-based business a competitive edge. We pride ourselves on our ability to adapt to the changing needs of our clients, ensuring that our designs remain relevant and impactful.</p>

          <h6 className={styles.subheading}>Quality Design Services in Johannesburg, Cape Town & Pretoria</h6>
          <p className={styles.paragraph}>While our roots are in Pretoria, our commitment to delivering unparalleled graphic design services extends to businesses in Johannesburg, Cape Town, and across the vibrant tapestry of South Africa. We believe in the power of good design to transform businesses, regardless of location.</p>

          <p className={styles.paragraph}>Our national reach is matched by our local understanding, ensuring that whether you're in the bustling streets of Johannesburg, the scenic landscapes of Cape Town, or the dynamic city of Pretoria, our design solutions are always: - Contextually Relevant, - Innovative in Approach, and - Focused on Your Business Goals. Our clients from various regions have praised our ability to deliver high-quality designs that resonate with their target audiences.</p>

          <p className={styles.paragraph}>Experience the national standard of quality design with a personal, local touch, no matter where your business calls home in South Africa. We are dedicated to fostering long-term relationships with our clients, ensuring that we remain a trusted partner in their growth and success.</p>
          <div className="text-center">
            <Link href="/contact" className="inline-block bg-[#FFD700] text-black px-8 py-3 rounded-full font-bold hover:bg-[#FFD700]/90 transition-all">Inquire About National Services</Link>
          </div>
        </article>
      </div>

      {/* Visual Content Sections */}
      <section className="py-20 px-4 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-syne font-bold mb-6 text-[#FFD700]">
            Innovative Design Solutions
          </h2>
          <p className="mb-4 text-neutral-300 text-lg">
            Welcome to <Link href="/" className="text-[#FFD700] hover:underline">WL CreationX</Link>, the leading graphic design company and agency in Pretoria, South Africa. We specialize in creating visually stunning and impactful designs that help businesses stand out in today's competitive market.
          </p>
          <p className="text-neutral-300 text-lg mb-6">
            As one of the top <Link href="/services" className="text-[#FFD700] hover:underline">graphic design companies in Pretoria</Link>, we pride ourselves on delivering innovative and creative solutions tailored to your unique needs. From <Link href="/services/branding" className="text-[#FFD700] hover:underline">branding</Link> and <Link href="/services/logo-design" className="text-[#FFD700] hover:underline">logo design</Link> to <Link href="/services/web-design" className="text-[#FFD700] hover:underline">web design</Link> and marketing materials, we've got you covered.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            <Link href="/services/branding" className="group">
              <div className="bg-black/50 p-6 rounded-lg hover:bg-black/70 transition-all">
                <h3 className="text-2xl font-syne font-bold mb-4 text-[#FFD700]">Branding Solutions</h3>
                <p className="text-neutral-300">Professional brand identity design and strategy for businesses in Pretoria.</p>
              </div>
            </Link>
            <Link href="/services/web-design" className="group">
              <div className="bg-black/50 p-6 rounded-lg hover:bg-black/70 transition-all">
                <h3 className="text-2xl font-syne font-bold mb-4 text-[#FFD700]">Web Design</h3>
                <p className="text-neutral-300">Custom website design and development services.</p>
              </div>
            </Link>
            <Link href="/services/logo-design" className="group">
              <div className="bg-black/50 p-6 rounded-lg hover:bg-black/70 transition-all">
                <h3 className="text-2xl font-syne font-bold mb-4 text-[#FFD700]">Logo Design</h3>
                <p className="text-neutral-300">Creative and memorable logo design services.</p>
              </div>
            </Link>
            <Link href="/services/print-design" className="group">
              <div className="bg-black/50 p-6 rounded-lg hover:bg-black/70 transition-all">
                <h3 className="text-2xl font-syne font-bold mb-4 text-[#FFD700]">Print Design</h3>
                <p className="text-neutral-300">Professional print and marketing material design.</p>
              </div>
            </Link>
          </div>
          <div className="mt-12 text-center">
            <Link href="/contact" className="inline-block bg-[#FFD700] text-black px-8 py-3 rounded-full font-bold hover:bg-[#FFD700]/90 transition-all">
              Get Free Consultation
            </Link>
          </div>
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
            className="inline-flex items-center justify-center px-8 py-3 bg-[#FFD700] text-black hover:bg-[#FFD700]/90 transition-all duration-300 font-medium text-lg"
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
                  "text": "We offer a wide range of graphic design services, including logo design, branding, web design, print design, social media graphics, packaging design, illustration, and marketing materials."
                }
              },
              {
                "@type": "Question",
                "name": "Where is WL CreationX located?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "We are based in Pretoria, South Africa, but serve clients throughout the region including Johannesburg, Cape Town, and other major cities."
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