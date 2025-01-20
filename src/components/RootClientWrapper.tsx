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
              <p>Welcome to WL CreationX, your trusted graphic design company in Pretoria. As a leading design agency in Pretoria, we specialize in delivering exceptional graphic design services, including logo design, branding, web design, and print design solutions. With a team of visionary designers and a passion for creativity, we combine strategic thinking with innovative design to help businesses stand out in the competitive South African market.</p>

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

<h3>Our Graphic Design Services in Pretoria</h3>
          <p>As a full-service graphic design agency in Pretoria, we offer a wide range of services to help your business thrive:</p>

          <h4>1. Logo Design and Brand Identity</h4>
          <p>Your logo is the cornerstone of your brand identity. At WL CreationX, we specialize in creating unique and memorable logos that encapsulate your brand's essence. Our logo design process includes:</p>

          <ul>
            <li><strong>Deep Dive Sessions:</strong> We start by understanding your brand's values, mission, and target audience.</li>
            <li><strong>Conceptual Sketching:</strong> Our designers explore various creative avenues to bring your vision to life.</li>
            <li><strong>Digital Design:</strong> We refine the best concepts into polished, professional logos.</li>
            <li><strong>Feedback and Revisions:</strong> We work closely with you to ensure the final design exceeds your expectations.</li>
          </ul>

          <p>Our logos have helped businesses achieve a 30% increase in brand recognition, making them unforgettable in the minds of their customers.</p>

          <h4>2. Branding and Visual Identity</h4>
          <p>A strong brand identity is essential for standing out in today's competitive market. Our branding services include:</p>

          <ul>
            <li><strong>Color Palette Development:</strong> We create custom color schemes that reflect your brand's personality.</li>
            <li><strong>Typography Selection:</strong> Our designers choose fonts that align with your brand's voice and tone.</li>
            <li><strong>Brand Guidelines:</strong> We provide comprehensive guidelines to ensure consistency across all platforms.</li>
          </ul>

          <p>Our branding solutions have helped clients build trust and loyalty, resulting in a 40% increase in customer retention.</p>

          <h4>3. Web Design and Development</h4>
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

          <p>Our print designs have helped clients achieve a 25% increase in customer engagement at trade shows and events.</p>

          <h3>Industries We Serve</h3>
          <p>At WL CreationX, we work with businesses across various industries, including:</p>

          <ul>
            <li><strong>Retail:</strong> We create designs that attract customers and drive sales.</li>
            <li><strong>Healthcare:</strong> Our designs communicate trust and professionalism.</li>
            <li><strong>Real Estate:</strong> We help real estate agents showcase properties with stunning visuals.</li>
            <li><strong>Education:</strong> Our designs make learning materials engaging and informative.</li>
            <li><strong>Hospitality:</strong> We create designs that enhance the guest experience.</li>
            <li><strong>Technology:</strong> Our designs communicate innovation and cutting-edge solutions.</li>
          </ul>

          <h3>Our Process: How We Deliver Exceptional Designs</h3>
          <p>At WL CreationX, we follow a proven process to ensure your project's success:</p>

          <ol>
            <li><strong>Consultation:</strong> We start by understanding your goals, target audience, and brand values.</li>
            <li><strong>Research and Strategy:</strong> We conduct market research and develop a design strategy tailored to your needs.</li>
            <li><strong>Concept Development:</strong> Our designers create initial concepts and present them for feedback.</li>
            <li><strong>Refinement:</strong> We refine the chosen concept based on your input.</li>
            <li><strong>Delivery:</strong> We deliver the final design in all required formats, ready for implementation.</li>
          </ol>

          <h3>Why Pretoria Businesses Trust WL CreationX</h3>
          <p>As the leading graphic design company in Pretoria, we are committed to delivering exceptional results. Here's what sets us apart:</p>

          <ul>
            <li><strong>Client-Centric Approach:</strong> We prioritize your needs and work closely with you throughout the design process.</li>
            <li><strong>Attention to Detail:</strong> We pay attention to every detail, ensuring your designs are flawless.</li>
            <li><strong>Timely Delivery:</strong> We respect your time and deliver projects on schedule.</li>
            <li><strong>Affordable Pricing:</strong> We offer competitive rates without compromising on quality.</li>
          </ul>

          <h3>Ready to Transform Your Brand?</h3>
          <p>Whether you're a startup looking to make a bold entrance or an established brand seeking a fresh look, WL CreationX is here to help. Contact us today to schedule a free consultation and discover how our graphic design services can elevate your brand.</p>

          <div className="text-center">
            <Link href="/contact" className="inline-block bg-[#FFD700] text-black px-8 py-3 rounded-full font-bold hover:bg-[#FFD700]/90 transition-all">
              Get a Free Consultation
            </Link>
          </div>
        </div>

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
            }
          ])
        }} />
      </div>
    </main>
  );
}
