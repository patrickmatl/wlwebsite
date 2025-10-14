'use client';

import { motion } from 'framer-motion';
import { FaCheck } from 'react-icons/fa';
import Breadcrumb from '@/components/Breadcrumb';
import RelatedServices from '@/components/RelatedServices';
import GetInTouchButton from '@/components/GetInTouchButton';
import { serviceFAQs } from '@/data/serviceFAQs';
import Link from 'next/link';

const WebsiteDesignPage = () => {
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'Website Design', href: '/pricing/website-design-pretoria' }
  ];

  const packages = [
    {
      name: "3 Page Custom Website",
      price: "R8,980.00",
      icon: <FaCheck className="w-8 h-8 text-[#FFD700]" />,
      features: [
        "3 Custom Pages",
        "Mobile Responsive Design",
        "Contact Form Integration",
        "Social Media Integration",
        "Basic SEO Setup",
        "Google Analytics Integration",
        "2 Rounds of Revisions",
        "Training Session",
        "3 Months Support"
      ]
    },
    {
      name: "6 Page Custom Website",
      price: "R14,780.00",
      icon: <FaCheck className="w-8 h-8 text-[#FFD700]" />,
      features: [
        "6 Custom Pages",
        "Mobile Responsive Design",
        "Advanced Contact Forms",
        "Social Media Integration",
        "Enhanced SEO Setup",
        "Google Analytics & Search Console",
        "3 Rounds of Revisions",
        "2 Training Sessions",
        "6 Months Support"
      ]
    },
    {
      name: "9 Page Custom Website",
      price: "R17,420.00",
      icon: <FaCheck className="w-8 h-8 text-[#FFD700]" />,
      features: [
        "9 Custom Pages",
        "Mobile Responsive Design",
        "Advanced Forms & Integration",
        "Social Media Integration",
        "Comprehensive SEO Setup",
        "Full Analytics Suite",
        "4 Rounds of Revisions",
        "3 Training Sessions",
        "12 Months Support"
      ]
    },
    {
      name: "Catalog Website",
      price: "R19,780.00",
      icon: <FaCheck className="w-8 h-8 text-[#FFD700]" />,
      features: [
        "Up to 50 Products",
        "Product Categories",
        "Search Functionality",
        "Mobile Responsive Design",
        "Product Filtering",
        "SEO Optimization",
        "Analytics Integration",
        "3 Training Sessions",
        "12 Months Support"
      ]
    },
    {
      name: "E-Commerce Website",
      price: "R23,690.00",
      icon: <FaCheck className="w-8 h-8 text-[#FFD700]" />,
      features: [
        "Unlimited Products",
        "Payment Gateway Integration",
        "Inventory Management",
        "Order Management",
        "Customer Accounts",
        "Mobile Responsive Design",
        "Advanced SEO Setup",
        "4 Training Sessions",
        "12 Months Support"
      ]
    }
  ];

  const additionalFeatures = [
    {
      name: "POPIA Compliancy",
      price: "R1,350.00",
      description: "Complete POPIA compliance implementation for your website"
    },
    {
      name: "Custom Development",
      price: "Starting at R27,980.00",
      description: "Tailored solutions for unique business requirements"
    },
    {
      name: "Rush Service",
      price: "+50% of package price",
      description: "Expedited delivery within 5-7 business days"
    }
  ];

  const relatedServices = [
    {
      title: 'Website Maintenance',
      description: 'Keep your website secure, up-to-date, and performing at its best.',
      href: '/pricing/website-maintenance-pretoria',
      anchor: 'View Maintenance Plans'
    },
    {
      title: 'Digital Marketing',
      description: 'Boost your online presence with our digital marketing services.',
      href: '/pricing/google-ads-pretoria',
      anchor: 'Explore Digital Marketing'
    },
    {
      title: 'Custom Development',
      description: 'Tailored web applications and custom functionality.',
      href: '/pricing/custom-development-pretoria',
      anchor: 'View Development Services'
    },
    {
      title: 'Contact Us',
      description: 'Get in touch with us to discuss your project.',
      href: '/get-in-touch-pretoria',
      anchor: 'Contact Us'
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white py-20 px-4 sm:px-6 lg:px-8">
      {/* BEGIN: Visually Hidden SEO Headings H1-H5 for Website Design Pretoria */}
      <section style={{position:'absolute',left:'-9999px',top:'auto',width:'1px',height:'1px',overflow:'hidden'}} aria-hidden="true">
        <h1>Professional Website Design in Pretoria | WL CreationX</h1>
        <p>WL CreationX delivers modern, mobile-friendly website design for Pretoria businesses. Our expert team builds high-performance websites tailored to your brand, industry, and Pretoria audience.</p>
        <h2>Pretoria’s Top Web Design Agency</h2>
        <p>We specialize in custom web design, WordPress development, and business websites for Pretoria companies of all sizes. From startups to established brands, we create websites that convert visitors into customers.</p>
        <h3>Affordable Website Packages for Pretoria Businesses</h3>
        <p>Choose from our range of website packages, including 3-page, 6-page, and 9-page sites, as well as catalog and ecommerce options. All packages include SEO, analytics, and ongoing support for Pretoria clients.</p>
        <h4>Why Invest in a Pretoria Website?</h4>
        <p>Stand out in the Pretoria market with a fast, secure, and visually stunning website. Our Pretoria web design services help you attract local customers and grow your business online.</p>
        <h5>Why Choose WL CreationX for Website Design in Pretoria?</h5>
        <p>We combine Pretoria market knowledge, creative design, and technical expertise to deliver websites that drive results. Get personal service and fast support from our local team.</p>
      </section>
      {/* END: Visually Hidden SEO Headings H1-H5 for Website Design Pretoria */}
      {/* BEGIN: Visually Hidden Website Design FAQ for Pretoria */}
      <section style={{position:'absolute',left:'-9999px',top:'auto',width:'1px',height:'1px',overflow:'hidden'}} aria-hidden="true">
        <h2>Frequently Asked Questions about Website Design in Pretoria</h2>
        <div><h3>How much does a website cost in Pretoria?</h3><p>Website design packages at WL CreationX start from R8,980 for a 3-page site and go up to R23,690+ for ecommerce or advanced features. Pricing depends on the number of pages, custom development, and integrations.</p></div>
        <div><h3>What is included in your website packages?</h3><p>All packages include responsive design, SEO setup, analytics, contact forms, social media integration, and training for Pretoria business owners. Support is included for 3–12 months depending on the package.</p></div>
        <div><h3>How long does it take to build a website?</h3><p>Most Pretoria website projects take 1–4 weeks, depending on requirements and content readiness. Rush options are available for urgent projects.</p></div>
        <div><h3>Do you offer custom web development?</h3><p>Yes, we provide custom development for unique features, integrations, or business needs. Our Pretoria team builds solutions tailored to your goals.</p></div>
        <div><h3>Will my website work on mobile devices?</h3><p>Absolutely. Every site we build is fully responsive and optimized for mobile, tablet, and desktop users in Pretoria and beyond.</p></div>
        <div><h3>Can I update my website myself?</h3><p>Yes, our websites are built on user-friendly platforms like WordPress. We provide training so Pretoria business owners can easily update content, images, and more.</p></div>
        <div><h3>Do you offer SEO services?</h3><p>All sites include basic SEO setup. We also offer advanced SEO and digital marketing services to help Pretoria businesses rank higher and attract more customers.</p></div>
        <div><h3>Do you provide website hosting?</h3><p>We recommend reliable hosting providers for Pretoria businesses and can assist with setup and migration. Hosting is not included by default but can be arranged.</p></div>
        <div><h3>What makes your web design different?</h3><p>We combine Pretoria market insights, creative design, and technical skill to deliver websites that look great and perform. Our focus is on results and client satisfaction.</p></div>
        <div><h3>Which areas of Pretoria do you serve?</h3><p>We serve all of Pretoria and surrounding areas, including Centurion, Hatfield, Brooklyn, Pretoria East, and more. Remote and on-site consultations are available.</p></div>
      </section>
      {/* END: Visually Hidden Website Design FAQ for Pretoria */}
      {/* BEGIN: FAQPage Structured Data for Website Design Pretoria */}
      <script type="application/ld+json" suppressHydrationWarning>
        {`
        {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "How much does a website cost in Pretoria?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Website design packages at WL CreationX start from R8,980 for a 3-page site and go up to R23,690+ for ecommerce or advanced features. Pricing depends on the number of pages, custom development, and integrations."
              }
            },
            {
              "@type": "Question",
              "name": "What is included in your website packages?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "All packages include responsive design, SEO setup, analytics, contact forms, social media integration, and training for Pretoria business owners. Support is included for 3–12 months depending on the package."
              }
            },
            {
              "@type": "Question",
              "name": "How long does it take to build a website?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Most Pretoria website projects take 1–4 weeks, depending on requirements and content readiness. Rush options are available for urgent projects."
              }
            },
            {
              "@type": "Question",
              "name": "Do you offer custom web development?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes, we provide custom development for unique features, integrations, or business needs. Our Pretoria team builds solutions tailored to your goals."
              }
            },
            {
              "@type": "Question",
              "name": "Will my website work on mobile devices?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Absolutely. Every site we build is fully responsive and optimized for mobile, tablet, and desktop users in Pretoria and beyond."
              }
            },
            {
              "@type": "Question",
              "name": "Can I update my website myself?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes, our websites are built on user-friendly platforms like WordPress. We provide training so Pretoria business owners can easily update content, images, and more."
              }
            },
            {
              "@type": "Question",
              "name": "Do you offer SEO services?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "All sites include basic SEO setup. We also offer advanced SEO and digital marketing services to help Pretoria businesses rank higher and attract more customers."
              }
            },
            {
              "@type": "Question",
              "name": "Do you provide website hosting?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "We recommend reliable hosting providers for Pretoria businesses and can assist with setup and migration. Hosting is not included by default but can be arranged."
              }
            },
            {
              "@type": "Question",
              "name": "What makes your web design different?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "We combine Pretoria market insights, creative design, and technical skill to deliver websites that look great and perform. Our focus is on results and client satisfaction."
              }
            },
            {
              "@type": "Question",
              "name": "Which areas of Pretoria do you serve?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "We serve all of Pretoria and surrounding areas, including Centurion, Hatfield, Brooklyn, Pretoria East, and more. Remote and on-site consultations are available."
              }
            }
          ]
        }
        `}
      </script>
      {/* END: FAQPage Structured Data for Website Design Pretoria */}
      {/* Breadcrumb */}
      <Breadcrumb items={breadcrumbItems} />

      {/* Header Section */}
      <div className="max-w-7xl mx-auto text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[#FFD700] to-[#FFA500]">
          Website Design Packages
        </h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          Professional web design solutions tailored to your business needs.
          All packages include mobile responsiveness, SEO optimization, and dedicated support.
        </p>
      </div>

      {/* Main Packages Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        {packages.map((pkg, index) => (
          <motion.div
            key={pkg.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-zinc-900 rounded-lg p-8 border border-[#FFD700]/20 hover:border-[#FFD700]/40 transition-all"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-2xl font-bold text-[#FFD700] mb-2">{pkg.name}</h3>
                <p className="text-3xl font-bold">{pkg.price}</p>
              </div>
              {pkg.icon}
            </div>

            <ul className="space-y-3 mb-8">
              {pkg.features.map((feature, i) => (
                <li key={i} className="flex items-center text-gray-300">
                  <FaCheck className="text-[#FFD700] mr-2 flex-shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <button className="w-full py-3 px-4 bg-[#FFD700] text-black font-semibold rounded hover:bg-[#FFE44D] transition-colors">
              Get Started
            </button>
          </motion.div>
        ))}
      </div>

      {/* Additional Features */}
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold text-[#FFD700] text-center mb-8">Additional Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {additionalFeatures.map((feature, index) => (
            <motion.div
              key={feature.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-zinc-900 rounded-lg p-6 border border-[#FFD700]/20"
            >
              <h3 className="text-xl font-bold text-[#FFD700] mb-2">{feature.name}</h3>
              <p className="text-2xl font-bold mb-4">{feature.price}</p>
              <p className="text-gray-300">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* FAQ Section */}
      <section className="py-20 bg-neutral-800">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {serviceFAQs['website-design']?.map((faq, index) => (
              <motion.div
                key={faq.question}
                className="bg-neutral-900 rounded-lg p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <h3 className="text-xl font-bold text-white mb-3">{faq.question}</h3>
                <p className="text-neutral-400">{faq.answer}</p>
              </motion.div>
            )) || []}
          </div>
        </div>
      </section>

      {/* Related Services */}
      <RelatedServices
        currentService="Website Design"
        services={relatedServices}
      />

      {/* CTA Section */}
      <section className="py-20 bg-black">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Build Your Dream Website?
          </h2>
          <p className="text-xl text-neutral-300 mb-8">
            Contact us for a free consultation and let's create something amazing together
          </p>
          <GetInTouchButton variant="primary" text="Start Your Project" className="text-lg" />
        </div>
      </section>
      {/* Contextual link to homepage with varied phrasing */}
      <div className="max-w-4xl mx-auto px-4 text-center mt-6">
        <p className="text-neutral-400 text-sm">
          Learn more about our <Link href="/" className="text-[#FFD700] hover:underline">Pretoria web design studio</Link> on the homepage.
        </p>
      </div>
    </div>
  );
};

export default WebsiteDesignPage;
