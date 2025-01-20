'use client';

import HeroSection from './HeroSection';
import Link from 'next/link';
import styles from '../styles/hiddenContent.module.css';

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
      
      <div className={styles['hidden-seo-content']}>
        <h1 className="sr-only">WL CreationX - Premier Graphic Design Company in Pretoria</h1>
        <article>
          <h2>Professional Graphic Design Services in Pretoria</h2>
          <p>Welcome to WL CreationX, your trusted graphic design company in Pretoria. We specialize in delivering exceptional graphic design services, including logo design, branding, web design, and print design solutions. As a leading design agency in Pretoria, we combine creativity with strategic thinking to help businesses stand out in the competitive South African market.</p>
          
          <h3>Expert Graphic Design Solutions in Pretoria</h3>
          <p>Our team of experienced graphic designers in Pretoria offers comprehensive design services tailored to your business needs. From corporate branding to digital marketing materials, we create impactful visual solutions that drive results. With over 15 years of experience in the Pretoria design industry, we understand the local market and deliver solutions that resonate with your target audience.</p>
          
          <h4>Comprehensive Graphic Design Services in Pretoria</h4>
          <ul>
            <li>Professional Logo Design and Brand Identity Development</li>
            <li>Custom Website Design and Development</li>
            <li>Print Design and Marketing Materials Creation</li>
            <li>Social Media Graphics and Digital Marketing Assets</li>
            <li>Packaging Design and Product Branding Solutions</li>
            <li>Corporate Stationery and Business Cards Design</li>
            <li>Billboard and Large Format Design Services</li>
            <li>Magazine and Newsletter Design</li>
            <li>Exhibition and Event Graphics Design</li>
            <li>Vehicle Wrap and Signage Design</li>
          </ul>

          <h5>Why Choose WL CreationX as Your Graphic Design Agency in Pretoria</h5>
          <ul>
            <li>15+ Years of Professional Design Experience</li>
            <li>Extensive Portfolio of Successful Projects</li>
            <li>Custom-Tailored Design Solutions</li>
            <li>Competitive and Transparent Pricing</li>
            <li>Quick Turnaround Time on Projects</li>
            <li>Dedicated Project Management Team</li>
            <li>Industry-Leading Design Tools and Technology</li>
            <li>Ongoing Support and Maintenance</li>
            <li>Free Initial Design Consultation</li>
            <li>100% Satisfaction Guarantee</li>
          </ul>

          <h6>Serving Pretoria and Surrounding Areas</h6>
          <p>Based in Pretoria, we serve clients throughout the region including:</p>
          <ul>
            <li>Pretoria Central and CBD</li>
            <li>Centurion Business District</li>
            <li>Menlyn Maine and Surrounds</li>
            <li>Brooklyn and Waterkloof</li>
            <li>Hatfield and Arcadia</li>
            <li>Lynnwood and Faerie Glen</li>
            <li>Garsfontein and Moreleta Park</li>
            <li>Silver Lakes and Equestria</li>
          </ul>

          <section>
            <h3>Graphic Design Expertise and Specializations</h3>
            <p>At WL CreationX, we pride ourselves on delivering professional graphic design services that help businesses in Pretoria establish a strong visual presence. Our team specializes in:</p>
            <ul>
              <li>Modern and Timeless Logo Design</li>
              <li>Corporate Identity Development</li>
              <li>Responsive Website Design</li>
              <li>E-commerce Solutions</li>
              <li>Brand Guidelines Creation</li>
              <li>Marketing Collateral Design</li>
              <li>Social Media Content Creation</li>
              <li>Motion Graphics and Animation</li>
            </ul>
          </section>

          <section>
            <h4>Our Graphic Design Process in Pretoria</h4>
            <ol>
              <li>Initial Consultation and Brief Development</li>
              <li>Research and Strategy Planning</li>
              <li>Concept Development and Design</li>
              <li>Client Review and Feedback</li>
              <li>Design Refinement and Finalization</li>
              <li>Implementation and Launch Support</li>
            </ol>
          </section>
        </article>

        <h2 className="text-3xl md:text-4xl font-syne font-bold mb-6 text-white">Best Graphic Design Company in Pretoria South Africa</h2>
        <p className="mb-4 text-neutral-300 text-lg">As the premier graphic design company in Pretoria, South Africa, WL CreationX is renowned for crafting bespoke visual identities that catapult businesses into the spotlight. With a deep understanding of the local market and a passion for innovation, our team of experts tailors design solutions that not only reflect your brand's essence but also resonate deeply with your target audience.</p>
        <p className="text-neutral-300 text-lg">Whether you're a startup looking to make a bold entrance, an established brand seeking a revitalized image, or an entrepreneur needing a consistent visual language across all platforms, our comprehensive graphic design services are designed to elevate your brand's presence. From conceptualization to launch, our collaborative approach ensures your vision is not just met, but exceeded.</p>
        <p className="text-neutral-300 text-lg mb-6">Discover why WL CreationX stands out as the best graphic design company in Pretoria, trusted by a diverse portfolio of clients for delivering impactful, contemporary designs that drive real results. Our clients range from small businesses to large corporations, all benefiting from our tailored design strategies.</p>

        <h3 className="text-2xl md:text-3xl font-syne font-bold mb-6 text-[#FFD700]">Top Graphic Design Agency in Pretoria Professional Branding and Visual Design Services</h3>
        <p className="mb-4 text-neutral-300 text-lg">At WL CreationX, Pretoria's top graphic design agency, we firmly believe that professional branding is the cornerstone of any successful business. Our team of visionary designers crafts comprehensive visual design services that encapsulate your brand's story, values, and mission, ensuring a cohesive brand image that captivates and retains your audience.</p>
        <p className="text-neutral-300 text-lg">Our branding and visual design services include, but are not limited to, bespoke logo creation, nuanced color palette development, typography that speaks to your brand's voice, and meticulously crafted brand guidelines. This holistic approach empowers your brand to navigate the competitive market with clarity and confidence.</p>
        <p className="text-neutral-300 text-lg mb-6">Learn more about how our tailored branding solutions can redefine your business's visual footprint in Pretoria and beyond. Many of our clients have reported a significant increase in customer engagement and brand loyalty after implementing our branding strategies.</p>

        <h4 className="text-xl md:text-2xl font-syne font-bold mb-6 text-white">Expert Logo Design and Brand Identity Solutions</h4>
        <p className="mb-4 text-neutral-300 text-lg">A logo is more than just a symbol; it's the first impression, the lasting memory, and the essence of your brand. At WL CreationX, our expert logo design services are built on a profound understanding of what makes a logo unforgettable and effective. We delve into the heart of your business to craft a visual identity that is both a stunning work of art and a strategic marketing tool.</p>
        <p className="text-neutral-300 text-lg">Our logo design process is meticulous and collaborative, involving: - Deep Dive Sessions to uncover your brand's unique selling proposition (USP), - Conceptual Sketching to explore various creative avenues, - Digital Design where ideas come to life, - Refinement & Feedback to ensure perfection, and - Launch Preparation to seamlessly integrate your new logo across all platforms. Our logos have helped clients achieve a 30% increase in brand recognition.</p>
        <p className="text-neutral-300 text-lg mb-6">Discover the WL CreationX difference in logo design and brand identity solutions, tailored to elevate your business in Pretoria's competitive landscape. Our portfolio includes logos for well-known brands that have become synonymous with quality and innovation.</p>

        <h5 className="text-lg md:text-xl font-syne font-bold mb-6 text-[#FFD700]">Custom Graphic Design for Pretoria, South African Businesses</h5>
        <p className="mb-4 text-neutral-300 text-lg">In the vibrant business landscape of Pretoria, South Africa, standing out requires more than just any graphic design; it demands a bespoke visual strategy. At WL CreationX, we're dedicated to providing custom graphic design services that don't just meet but anticipate the unique needs of your business.</p>
        <p className="text-neutral-300 text-lg">Whether you're in need of: - Vibrant Social Media Graphics to engage your online audience, - Compelling Marketing Materials for your next campaign, - Innovative Packaging Design to redefine your product's shelf presence, or - Responsive Website Design to seamlessly integrate your brand's story, our custom graphic design solutions are crafted with your business objectives in mind. Our designs have helped clients increase their online engagement by over 50%.</p>
        <p className="text-neutral-300 text-lg mb-6">Explore how our tailored approach to custom graphic design can offer your Pretoria-based business a competitive edge. We pride ourselves on our ability to adapt to the changing needs of our clients, ensuring that our designs remain relevant and impactful.</p>

        <h6 className="text-base md:text-lg font-syne font-bold mb-6 text-white">Quality Design Services in Johannesburg, Cape Town & Pretoria</h6>
        <p className="mb-4 text-neutral-300 text-lg">While our roots are in Pretoria, our commitment to delivering unparalleled graphic design services extends to businesses in Johannesburg, Cape Town, and across the vibrant tapestry of South Africa. We believe in the power of good design to transform businesses, regardless of location.</p>
        <p className="text-neutral-300 text-lg">Our national reach is matched by our local understanding, ensuring that whether you're in the bustling streets of Johannesburg, the scenic landscapes of Cape Town, or the dynamic city of Pretoria, our design solutions are always: - Contextually Relevant, - Innovative in Approach, and - Focused on Your Business Goals. Our clients from various regions have praised our ability to deliver high-quality designs that resonate with their target audiences.</p>
        <p className="text-neutral-300 text-lg mb-6">Experience the national standard of quality design with a personal, local touch, no matter where your business calls home in South Africa. We are dedicated to fostering long-term relationships with our clients, ensuring that we remain a trusted partner in their growth and success.</p>
        <div className="text-center">
          <Link href="/contact" className="inline-block bg-[#FFD700] text-black px-8 py-3 rounded-full font-bold hover:bg-[#FFD700]/90 transition-all">Inquire About National Services</Link>
        </div>
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