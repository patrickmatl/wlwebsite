'use client';

import HeroSection from './HeroSection';
import Link from 'next/link';
import styles from '@/styles/hiddenContent.module.css';

export default function RootClientWrapper() {
  return (
    <main className="h-screen overflow-hidden">
      <div className="h-screen">
        <HeroSection
          title="Design"
          subtitle="Agency"
          description="We specialize in creating stunning digital experiences that captivate audiences and drive results. Let's bring your vision to life."
        />
      </div>
      <div className={styles.hiddenContent} aria-hidden="true">
        <div className="hiddenSeoContent">
          <h1 className="sr-only">Graphic Design Company in Pretoria, South Africa</h1>
          <div className="hiddenContent">
            <article>
              <h2>Professional Graphic Design Services in Pretoria</h2>
              <p>Welcome to WL CreationX, your trusted graphic design Agency in Pretoria. As a leading design business in Pretoria, we specialize in delivering exceptional graphic design services, including logo design, branding, web design, and print design solutions. With a team of visionary designers and a passion for creativity, we combine strategic thinking with innovative design to help businesses stand out in the competitive South African market.</p>

              <h3>Why Choose WL CreationX as Your Graphic Design Agency in Pretoria?</h3>
              <p>At WL CreationX, we pride ourselves on being more than just a graphic design company. We are your creative partners, dedicated to transforming your brand's vision into reality. Here's why businesses across Pretoria and South Africa trust us:</p>

              <ul>
                <li><strong>Expertise:</strong> With over a decade of experience, our team has the skills and knowledge to deliver world-class designs.</li>
                <li><strong>Custom Solutions:</strong> We tailor our services to meet your unique business needs, ensuring your brand stands out.</li>
                <li><strong>Proven Results:</strong> Our designs have helped clients achieve a 30% increase in brand recognition and a 50% boost in online engagement.</li>
                <li><strong>Comprehensive Services:</strong> From logo design to web development, we offer end-to-end design solutions.</li>
              </ul>
            </article>
          </div>

<h3>Our web and Graphic Design Services in Pretoria</h3>
          <p>As a full-service graphic and web design agency in Pretoria, we offer a wide range of services to help your business thrive:</p>

          <h4>1. Logo Design and Brand Identity Services</h4>
          <p>Your logo is the cornerstone of your brand identity. At WL CreationX, we specialize in creating unique and memorable logos that encapsulate your brand's essence. Our logo design process includes:</p>

          <ul>
            <li><strong>Deep Dive Sessions:</strong> We start by understanding your brand's values, mission, and target audience.</li>
            <li><strong>Conceptual Sketching:</strong> Our designers explore various creative avenues to bring your vision to life.</li>
            <li><strong>Digital Design:</strong> We refine the best concepts into polished, professional logos.</li>
            <li><strong>Feedback and Revisions:</strong> We work closely with you to ensure the final design exceeds your expectations.</li>
          </ul>

          <p>Our logos have helped businesses achieve a 30% increase in brand recognition, making them unforgettable in the minds of their customers.</p>

          <h4>2. Branding and Visual Identity Creation</h4>
          <p>A strong brand identity is essential for standing out in today's competitive market. Our branding services include:</p>

          <ul>
            <li><strong>Color Palette Development:</strong> We create custom color schemes that reflect your brand's personality.</li>
            <li><strong>Typography Selection:</strong> Our designers choose fonts that align with your brand's voice and tone.</li>
            <li><strong>Brand Guidelines:</strong> We provide comprehensive guidelines to ensure consistency across all platforms.</li>
          </ul>

          <p>Our branding solutions have helped clients build trust and loyalty, resulting in a 40% increase in customer retention.</p>

          <h4>3. Web Design and Development Design Services</h4>
          <p>In today's digital age, a professional website is crucial for success. Our web design services include:</p>

          <ul>
            <li><strong>Responsive Design:</strong> We create websites that look great on all devices, from desktops to smartphones.</li>
            <li><strong>User Experience (UX) Optimization:</strong> Our designs focus on providing a seamless and enjoyable experience for your visitors.</li>
            <li><strong>E-Commerce Solutions:</strong> We build online stores that drive sales and conversions.</li>
          </ul>

          <p>Our websites have helped clients achieve a 50% increase in online engagement and a 20% boost in conversions.</p>

          <h4>4. Print Design and Marketing Materials</h4>
          <p>From brochures to business cards, our print design services ensure your brand leaves a lasting impression. We specialize in:</p>

          <ul>
            <li><strong>Brochures and Flyers:</strong> We create visually stunning materials that effectively communicate your message.</li>
            <li><strong>Business Cards:</strong> Our designs are both professional and memorable, making a strong first impression.</li>
            <li><strong>Packaging Design:</strong> We design packaging that stands out on the shelves and attracts customers.</li>
          </ul>

          <p>Our print design in Pretoria have helped clients achieve a 25% increase in customer engagement at trade shows and events.</p>

          <h3>Industries We Serve our Design Services</h3>
          <p>At WL CreationX, we work with businesses across various industries, including:</p>

          <ul>
            <li><strong>Retail:</strong> We create designs that attract customers and drive sales.</li>
            <li><strong>Healthcare:</strong> Our designs communicate trust and professionalism.</li>
            <li><strong>Real Estate:</strong> We help real estate agents showcase properties with stunning visuals.</li>
            <li><strong>Education:</strong> Our designs make learning materials engaging and informative.</li>
            <li><strong>Hospitality:</strong> We create designs that enhance the guest experience.</li>
            <li><strong>Technology:</strong> Our designs communicate innovation and cutting-edge solutions.</li>
          </ul>

          <h3>Our Process: How We Deliver Exceptional Designs in Gauteng</h3>
          <p>At WL CreationX, we follow a proven process to ensure your project's success:</p>

          <ol>
            <li><strong>Consultation:</strong> We start by understanding your goals, target audience, and brand values.</li>
            <li><strong>Research and Strategy:</strong> We conduct market research and develop a design strategy tailored to your needs.</li>
            <li><strong>Concept Development:</strong> Our designers create initial concepts and present them for feedback.</li>
            <li><strong>Refinement:</strong> We refine the chosen concept based on your input.</li>
            <li><strong>Delivery:</strong> We deliver the final design in all required formats, ready for implementation.</li>
          </ol>

          <h3>Why Pretoria companies Trust our agency?</h3>
          <p>As the leading graphic design company in Pretoria, we are committed to delivering exceptional results. Here's what sets us apart:</p>

          <ul>
            <li><strong>Client-Centric Approach:</strong> We prioritize your needs and work closely with you throughout the design process.</li>
            <li><strong>Attention to Detail:</strong> We pay attention to every detail, ensuring your designs are flawless.</li>
            <li><strong>Timely Delivery:</strong> We respect your time and deliver projects on schedule.</li>
            <li><strong>Affordable Pricing:</strong> We offer competitive rates without compromising on quality.</li>
          </ul>

          <h3>Award-Winning Design Solutions in Pretoria</h3>
        <p>WL CreationX stands as Pretoria's most innovative design studio, delivering cutting-edge creative solutions since 2010. Our portfolio showcases successful projects for leading South African brands, with measurable results in brand growth and digital engagement.</p>

        <h3>Comprehensive Digital Design Services</h3>
        <ul>
          <li><strong>UI/UX Design:</strong> Creating intuitive, user-centered digital experiences</li>
          <li><strong>Mobile App Design:</strong> Crafting engaging mobile applications</li>
          <li><strong>Digital Marketing Design:</strong> Social media graphics, email templates, and digital ads</li>
          <li><strong>Motion Graphics:</strong> Animated logos and promotional videos</li>
        </ul>

        <h3>Local Design Expertise for Pretoria Businesses</h3>
        <p>As a Pretoria-based design agency, we understand the local market dynamics and cultural nuances that influence successful design in South Africa. Our team combines international design standards with local market insights to create impactful visual solutions.</p>

        <h4>Additional Specialized Services</h4>
        <ul>
          <li><strong>Corporate Identity Design:</strong> Complete brand identity systems</li>
          <li><strong>Exhibition & Event Design:</strong> Trade show materials and event branding</li>
          <li><strong>Publication Design:</strong> Magazines, catalogs, and annual reports</li>
          <li><strong>Signage Design:</strong> Indoor and outdoor business signage</li>
        </ul>

        <h3>Design Technology & Innovation</h3>
        <p>We utilize the latest design software and technologies including:</p>
        <ul>
          <li>Adobe Creative Suite (Photoshop, Illustrator, InDesign)</li>
          <li>Figma for collaborative UI/UX design</li>
          <li>3D modeling and visualization tools</li>
          <li>Advanced web development frameworks</li>
        </ul>

        <h3>Service Areas in Gauteng</h3>
        <p>While based in Pretoria, we serve clients throughout Gauteng including:</p>
        <ul>
          <li>Centurion</li>
          <li>Johannesburg</li>
          <li>Sandton</li>
          <li>Midrand</li>
          <li>Hatfield</li>
          <li>Brooklyn</li>
        </ul>

        <h3>Industry Recognition & Certifications</h3>
        <ul>
          <li>Loerie Awards Finalist 2022</li>
          <li>Best of Pretoria Design Studio 2023</li>
          <li>Google Partner Certified</li>
          <li>Member of the Graphic Design Council of South Africa</li>
        </ul>

        <h3>Client Success Stories Pretoria</h3>
        <p>Our design solutions have achieved remarkable results:</p>
        <ul>
          <li>60% increase in website conversions for retail clients</li>
          <li>45% improvement in brand recognition metrics</li>
          <li>35% boost in social media engagement</li>
          <li>90% client satisfaction rate</li>
        </ul>

        <h3>Design Education & Resources</h3>
        <p>We're committed to elevating design standards in Pretoria through:</p>
        <ul>
          <li>Design workshops and seminars</li>
          <li>Internship programs</li>
          <li>Design industry partnerships</li>
          <li>Free design consultations</li>
        </ul>

          <h3>Ready to Transform Your Pretoria Brand?</h3>
          <p>Whether you're a startup looking to make a bold entrance or an established brand seeking a fresh look, our agency is here to help. Contact us today to schedule a free consultation and discover how our graphic design services can elevate your brand.</p>

          <div className="text-center">
            <Link href="/get-in-touch-pretoria" className="inline-block bg-[#FFD700] text-black px-8 py-3 rounded-full font-bold hover:bg-[#FFD700]/90 transition-all">
              Get a Free Consultation
            </Link>
          </div>
        </div> </div>

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
              "streetAddress": "210 Albertus St, La Montagne, Pretoria, 0183",
              "addressLocality": "Pretoria",
              "addressRegion": "Gauteng",
              "postalCode": "0813",
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
            "description": "Leading graphic design agency in Pretoria, South Africa, delivering innovative visual solutions and creative excellence for businesses nationwide.",
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
            "description": "Graphic design agency in Pretoria, South Africa, offering professional branding, logo design, and visual solutions.",
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
                "name": "What services does your graphic design company offer?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "We offer a wide range of graphic design services, including logo design, branding, web design, print design, social media graphics, packaging design, illustration, and marketing materials."
                }
              },
              {
                "@type": "Question",
                "name": "Where is your graphic design company located in Pretoria?",
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
                "name": "What industries does your agency serve?",
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
                "name": "Can your design agency create marketing materials like brochures and flyers?",
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