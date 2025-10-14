'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FaBox, FaBars, FaCheck, FaShoppingBag, FaBoxOpen, FaGift } from 'react-icons/fa';
import Breadcrumb from '@/components/Breadcrumb';
import RelatedServices from '@/components/RelatedServices';
import GetInTouchButton from '@/components/GetInTouchButton';
import { serviceFAQs } from '@/data/serviceFAQs';
import Link from 'next/link';

const PackagingDesignPage = () => {
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'Packaging Design', href: '/pricing/packaging-design' }
  ];

  const packages = [
    {
      name: "Basic Packaging",
      price: "R2,500",
      icon: <FaBox className="w-8 h-8 text-[#FFD700]" />,
      features: [
        "1 Product Package Design",
        "2 Design Concepts",
        "3 Revision Rounds",
        "Print-Ready Files",
        "Basic 3D Mockup",
        "5-7 Day Delivery"
      ]
    },
    {
      name: "Professional Package",
      price: "R4,750",
      icon: <FaBoxOpen className="w-8 h-8 text-[#FFD700]" />,
      features: [
        "2 Product Package Designs",
        "3 Design Concepts Each",
        "5 Revision Rounds",
        "Print-Ready Files",
        "Advanced 3D Mockups",
        "Label Design",
        "3-5 Day Delivery"
      ]
    },
    {
      name: "Premium Collection",
      price: "R8,950",
      icon: <FaGift className="w-8 h-8 text-[#FFD700]" />,
      features: [
        "Full Product Line (Up to 5 Items)",
        "Multiple Design Concepts",
        "Unlimited Revisions",
        "Print-Ready Files",
        "Photorealistic 3D Mockups",
        "Label & Insert Designs",
        "Brand Style Guide",
        "Priority 2-3 Day Delivery"
      ]
    }
  ];

  const additionalServices = [
    {
      name: "3D Mockup Rendering",
      price: "R1,200",
      icon: <FaBox className="w-6 h-6 text-[#FFD700]" />,
      description: "Photorealistic 3D renderings of your packaging design from multiple angles"
    },
    {
      name: "Label Design",
      price: "R850",
      icon: <FaBars className="w-6 h-6 text-[#FFD700]" />,
      description: "Custom label design with nutritional information and required certifications"
    },
    {
      name: "Package Insert",
      price: "R650",
      icon: <FaShoppingBag className="w-6 h-6 text-[#FFD700]" />,
      description: "Design of instruction manuals, promotional inserts, or product information sheets"
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white py-20 px-4 sm:px-6 lg:px-8">
      {/* BEGIN: Visually Hidden SEO Headings H1-H5 for Packaging Design Pretoria */}
      <section style={{position:'absolute',left:'-9999px',top:'auto',width:'1px',height:'1px',overflow:'hidden'}} aria-hidden="true">
        <h1>Pretoria Packaging Design Services | WL CreationX</h1>
        <p>WL CreationX delivers expert packaging design services in Pretoria, helping brands stand out on the shelf and build customer loyalty. Our team specializes in creative, functional, and market-ready packaging for a wide range of products.</p>
        <p>From food and beverage to cosmetics and retail, our Pretoria packaging designers use the latest trends and technology to create packaging that attracts attention and communicates your brand story effectively.</p>
        <h2>Leading Packaging Design Agency in Pretoria</h2>
        <p>As a top-rated packaging design agency in Pretoria, we combine strategic thinking with artistic flair to deliver packaging that drives sales. Our process includes research, concept development, and custom design tailored to your target audience.</p>
        <p>We work closely with Pretoria businesses to ensure every packaging project meets industry standards, regulatory requirements, and your unique brand vision.</p>
        <h3>Custom Product Packaging for Pretoria Businesses</h3>
        <p>Our custom packaging solutions in Pretoria are designed to suit products of all shapes and sizes. Whether you need boxes, labels, pouches, or inserts, our designers craft packaging that protects your product and enhances its appeal.</p>
        <p>We offer print-ready files, 3D mockups, and support throughout the production process, ensuring your Pretoria packaging stands out in a competitive market.</p>
        <h4>Affordable Packaging Design Packages in Pretoria</h4>
        <p>Choose from basic to premium packaging design packages, all with transparent pricing and fast turnaround. Our Pretoria clients benefit from flexible options that fit startups, SMEs, and established brands alike.</p>
        <p>Each package includes multiple design concepts, revision rounds, and professional guidance to ensure your packaging is both beautiful and functional.</p>
        <h5>Why Choose WL CreationX for Packaging Design in Pretoria?</h5>
        <p>WL CreationX is trusted by Pretoria businesses for our creativity, reliability, and commitment to quality. Our designers have deep experience in packaging for diverse industries, ensuring every project is handled with care.</p>
        <p>We prioritize client satisfaction, delivering packaging that not only meets expectations but exceeds them—helping Pretoria brands grow and succeed.</p>
      </section>
      {/* END: Visually Hidden SEO Headings H1-H5 for Packaging Design Pretoria */}
      {/* BEGIN: Visually Hidden Packaging Design FAQ for Pretoria */}
      <section style={{position:'absolute',left:'-9999px',top:'auto',width:'1px',height:'1px',overflow:'hidden'}} aria-hidden="true">
        <h2>Frequently Asked Questions about Packaging Design in Pretoria</h2>
        <div><h3>What types of packaging do you design?</h3><p>We design boxes, labels, sleeves, pouches, inserts, and more for Pretoria businesses across various industries.</p><p>Our team ensures each packaging type is tailored to your product’s needs and market requirements.</p></div>
        <div><h3>How much does packaging design cost in Pretoria?</h3><p>Our packages start from R2,500, with pricing based on complexity, number of items, and additional services like 3D mockups or inserts.</p><p>We offer transparent quotes and flexible options for Pretoria clients.</p></div>
        <div><h3>Can you provide print-ready files?</h3><p>Yes, all final packaging designs include high-resolution, print-ready files suitable for your chosen printer in Pretoria or nationwide.</p><p>We also offer guidance on material selection and print specifications.</p></div>
        <div><h3>Do you offer 3D mockups?</h3><p>Yes, we provide photorealistic 3D mockups so you can visualize your packaging before production.</p><p>This service helps Pretoria clients make informed decisions and impress stakeholders.</p></div>
        <div><h3>How long does a packaging design project take?</h3><p>Most Pretoria packaging projects are completed within 5–10 days, depending on scope and revision rounds.</p><p>Rush options are available for urgent projects.</p></div>
        <div><h3>Can you help with label compliance?</h3><p>Absolutely! We design labels that meet South African regulatory requirements for food, cosmetics, and more.</p><p>Our Pretoria team stays updated on industry standards to ensure compliance and safety.</p></div>
        <div><h3>Do you design packaging for startups?</h3><p>Yes, we love working with Pretoria startups and small businesses, offering affordable packages and guidance throughout the process.</p><p>We help new brands launch with professional packaging that stands out.</p></div>
        <div><h3>Can you update my existing packaging?</h3><p>We can refresh or redesign your current packaging for a modern, competitive look.</p><p>This service is ideal for Pretoria businesses looking to rebrand or relaunch products.</p></div>
        <div><h3>Do you offer eco-friendly packaging design?</h3><p>We support Pretoria clients in creating sustainable packaging by recommending eco-friendly materials and design practices.</p><p>Our designs balance environmental responsibility with effective branding.</p></div>
        <div><h3>Which areas of Pretoria do you serve?</h3><p>We serve all of Pretoria and nearby regions, including Centurion, Hatfield, Brooklyn, Pretoria East, and more.</p><p>Remote consultations and digital deliveries are also available.</p></div>
      </section>
      {/* END: Visually Hidden Packaging Design FAQ for Pretoria */}
      {/* BEGIN: FAQPage Structured Data for Packaging Design Pretoria */}
      <script type="application/ld+json" suppressHydrationWarning>
        {`
        {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "What types of packaging do you design?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "We design boxes, labels, sleeves, pouches, inserts, and more for Pretoria businesses across various industries. Our team ensures each packaging type is tailored to your product’s needs and market requirements."
              }
            },
            {
              "@type": "Question",
              "name": "How much does packaging design cost in Pretoria?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Our packages start from R2,500, with pricing based on complexity, number of items, and additional services like 3D mockups or inserts. We offer transparent quotes and flexible options for Pretoria clients."
              }
            },
            {
              "@type": "Question",
              "name": "Can you provide print-ready files?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes, all final packaging designs include high-resolution, print-ready files suitable for your chosen printer in Pretoria or nationwide. We also offer guidance on material selection and print specifications."
              }
            },
            {
              "@type": "Question",
              "name": "Do you offer 3D mockups?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes, we provide photorealistic 3D mockups so you can visualize your packaging before production. This service helps Pretoria clients make informed decisions and impress stakeholders."
              }
            },
            {
              "@type": "Question",
              "name": "How long does a packaging design project take?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Most Pretoria packaging projects are completed within 5–10 days, depending on scope and revision rounds. Rush options are available for urgent projects."
              }
            },
            {
              "@type": "Question",
              "name": "Can you help with label compliance?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Absolutely! We design labels that meet South African regulatory requirements for food, cosmetics, and more. Our Pretoria team stays updated on industry standards to ensure compliance and safety."
              }
            },
            {
              "@type": "Question",
              "name": "Do you design packaging for startups?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes, we love working with Pretoria startups and small businesses, offering affordable packages and guidance throughout the process. We help new brands launch with professional packaging that stands out."
              }
            },
            {
              "@type": "Question",
              "name": "Can you update my existing packaging?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "We can refresh or redesign your current packaging for a modern, competitive look. This service is ideal for Pretoria businesses looking to rebrand or relaunch products."
              }
            },
            {
              "@type": "Question",
              "name": "Do you offer eco-friendly packaging design?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "We support Pretoria clients in creating sustainable packaging by recommending eco-friendly materials and design practices. Our designs balance environmental responsibility with effective branding."
              }
            },
            {
              "@type": "Question",
              "name": "Which areas of Pretoria do you serve?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "We serve all of Pretoria and nearby regions, including Centurion, Hatfield, Brooklyn, Pretoria East, and more. Remote consultations and digital deliveries are also available."
              }
            }
          ]
        }
        `}
      </script>
      {/* END: FAQPage Structured Data for Packaging Design Pretoria */}
      <Breadcrumb items={breadcrumbItems} />
      
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">Packaging Design Services</h1>
        <p className="text-xl text-neutral-300 max-w-3xl mx-auto">
          Transform your products with eye-catching packaging designs that make a lasting impression
        </p>
      </div>

      {/* Packages Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {packages.map((pkg, index) => (
          <motion.div
            key={pkg.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-zinc-900 rounded-lg p-8 border border-[#FFD700]/20"
          >
            <div className="flex items-center justify-center mb-6">
              {pkg.icon}
            </div>
            <h3 className="text-2xl font-bold text-[#FFD700] text-center mb-4">{pkg.name}</h3>
            <p className="text-3xl font-bold text-center mb-8">{pkg.price}</p>
            <ul className="space-y-4 mb-8">
              {pkg.features.map((feature, i) => (
                <li key={i} className="flex items-start">
                  <FaCheck className="text-[#FFD700] mr-2 flex-shrink-0 mt-1" />
                  <span className="text-neutral-300">{feature}</span>
                </li>
              ))}
            </ul>
            <button className="w-full py-3 px-4 bg-[#FFD700] text-black font-semibold rounded hover:bg-[#FFE44D] transition-colors">
              Get Started
            </button>
          </motion.div>
        ))}
      </div>

      {/* Additional Services */}
      <div className="max-w-7xl mx-auto mb-16">
        <h2 className="text-2xl font-bold text-[#FFD700] text-center mb-8">Additional Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {additionalServices.map((service, index) => (
            <motion.div
              key={service.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-zinc-900 rounded-lg p-6 border border-[#FFD700]/20"
            >
              <h3 className="text-xl font-bold text-[#FFD700] mb-2">{service.name}</h3>
              <p className="text-2xl font-bold mb-4">{service.price}</p>
              <p className="text-neutral-300">{service.description}</p>
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
            {serviceFAQs['packaging-design']?.map((faq, index) => (
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
        currentService="Packaging Design"
        services={[
          {
            title: 'Print Design',
            description: 'Professional print design for all your marketing needs.',
            href: '/pricing/print-design-pretoria',
            anchor: 'View Print Design Services'
          },
          {
            title: 'Graphic Design',
            description: 'Creative graphic design for all your needs.',
            href: '/pricing/graphic-design-pretoria',
            anchor: 'View Graphic Design Services'
          },
          {
            title: 'Contact Us',
            description: 'Get in touch for packaging design advice.',
            href: '/get-in-touch-pretoria',
            anchor: 'Contact Us'
          },
          {
            title: 'Marketing Materials',
            description: 'Comprehensive marketing material design services.',
            href: '/pricing/marketing-materials-pretoria',
            anchor: 'View Marketing Materials'
          }
        ]}
      />

      {/* CTA Section */}
      <section className="py-20 bg-black">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Transform Your Product Packaging?
          </h2>
          <p className="text-xl text-neutral-300 mb-8">
            Contact us for a free consultation and let's create packaging that sells
          </p>
          <GetInTouchButton variant="primary" text="Start Your Project" className="text-lg" />
        </div>
      </section>
      {/* Contextual link to homepage with varied phrasing */}
      <div className="max-w-4xl mx-auto px-4 text-center mt-6">
        <p className="text-neutral-400 text-sm">
          Learn more about our <Link href="/" className="text-[#FFD700] hover:underline">graphic design company Pretoria</Link> on the homepage.
        </p>
      </div>
    </div>
  );
};

export default PackagingDesignPage;
