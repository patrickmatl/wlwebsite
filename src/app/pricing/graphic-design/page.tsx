'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Breadcrumb from '@/components/Breadcrumb';
import PackageCard from '@/components/PackageCard';
import AnimatedSection from '@/components/AnimatedSection';
import { FaArrowRight, FaCheck } from 'react-icons/fa';
import RelatedServices from '@/components/RelatedServices';
import GetInTouchButton from '@/components/GetInTouchButton';

const GraphicDesignPricingPage = () => {
  const logoPackages = [
    {
      name: "Basic Logo",
      price: "R750",
      features: [
        "1 Initial Concept",
        "2 Revision Rounds",
        "High Resolution Files",
        "Basic Source Files",
        "3-5 Day Delivery"
      ]
    },
    {
      name: "Professional Logo",
      price: "R1,750",
      features: [
        "2 Initial Concepts",
        "3 Revision Rounds",
        "High Resolution Files",
        "Source Files (AI, EPS, PDF)",
        "Social Media Formats",
        "2-3 Day Delivery"
      ]
    },
    {
      name: "Premium Logo",
      price: "R3,750",
      features: [
        "5 Initial Concepts",
        "Unlimited Revisions",
        "All File Formats",
        "Source Files (All Formats)",
        "Social Media Kit",
        "Business Card Design",
        "24-48 Hour Delivery"
      ]
    }
  ];

  const brandPackages = [
    {
      name: "Startup Brand Package",
      price: "R9,999",
      features: [
        "Logo Design",
        "Business Card Design",
        "Social Media Templates",
        "Brand Style Guide",
        "Email Signature",
        "4 Weeks Delivery"
      ]
    },
    {
      name: "Professional Brand Package",
      price: "R18,999",
      features: [
        "Premium Logo Design",
        "Business Card & Stationery",
        "Social Media Kit",
        "Brand Guidelines",
        "Marketing Materials",
        "Email Templates",
        "6 Weeks Delivery"
      ]
    },
    {
      name: "Enterprise Brand Package",
      price: "R29,999",
      features: [
        "Custom Logo & Identity",
        "Complete Stationery Suite",
        "Advanced Brand Guidelines",
        "Social Media Strategy",
        "Marketing Collateral",
        "Video Intro Animation",
        "Email Marketing Setup",
        "8 Weeks Delivery"
      ]
    }
  ];

  const additionalServices = [
    {
      title: "Marketing Materials",
      description: "Professional presentation designs, email templates, packaging design, and more",
      link: "/pricing/marketing-materials",
      icon: "🎨"
    },
    {
      title: "Print Design",
      description: "Business cards, brochures, flyers, and large format printing solutions",
      link: "/pricing/print-design",
      icon: "🖨️"
    },
    {
      title: "Social Media Design",
      description: "Custom templates, profile setups, and monthly content management",
      link: "/pricing/social-media",
      icon: "📱"
    }
  ];

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'Graphic Design', href: '/pricing/graphic-design' }
  ];

  const packages = [
    {
      name: "Logo Design",
      price: "R1,500",
      description: "Get a professional logo design that represents your brand",
      features: [
        "1 Initial Concept",
        "2 Revision Rounds",
        "High Resolution Files",
        "Basic Source Files",
        "3-5 Day Delivery"
      ],
      icon: <FaCheck className="text-[#FFD700] text-4xl" />
    },
    {
      name: "Brand Identity",
      price: "R3,000",
      description: "Establish a strong brand identity with our comprehensive package",
      features: [
        "Logo Design",
        "Business Card Design",
        "Social Media Templates",
        "Brand Style Guide",
        "Email Signature",
        "4 Weeks Delivery"
      ],
      icon: <FaCheck className="text-[#FFD700] text-4xl" />
    },
    {
      name: "Graphic Design",
      price: "R2,000",
      description: "Get custom graphic design solutions for your business",
      features: [
        "1 Initial Concept",
        "2 Revision Rounds",
        "High Resolution Files",
        "Basic Source Files",
        "3-5 Day Delivery"
      ],
      icon: <FaCheck className="text-[#FFD700] text-4xl" />
    }
  ];

  const designProcess = [
    {
      title: "Discovery",
      description: "We learn about your business and goals",
      icon: <FaCheck className="text-[#FFD700] text-4xl" />
    },
    {
      title: "Concept",
      description: "We create initial concepts for your design",
      icon: <FaCheck className="text-[#FFD700] text-4xl" />
    },
    {
      title: "Revision",
      description: "We revise and refine your design based on your feedback",
      icon: <FaCheck className="text-[#FFD700] text-4xl" />
    },
    {
      title: "Delivery",
      description: "We deliver your final design files",
      icon: <FaCheck className="text-[#FFD700] text-4xl" />
    }
  ];

  const serviceFAQs = {
    'graphic-design': [
      {
        question: "What is the turnaround time for graphic design projects?",
        answer: "Our typical turnaround time is 3-5 business days, but this can vary depending on the complexity of the project."
      },
      {
        question: "Do you offer revisions?",
        answer: "Yes, we offer 2 revision rounds for most projects. Additional revisions may incur an additional fee."
      },
      {
        question: "What file formats do you provide?",
        answer: "We provide high-resolution files in various formats, including PNG, JPEG, and PDF."
      }
    ]
  };

  return (
    <div className="min-h-screen bg-black text-white py-20 px-4 sm:px-6 lg:px-8">
      <Breadcrumb items={breadcrumbItems} />
      
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">Graphic Design Services</h1>
        <p className="text-xl text-neutral-300 max-w-3xl mx-auto">
          Create stunning visuals that capture attention and communicate your message effectively
        </p>
      </div>

      {/* Design Packages */}
      <div className="max-w-7xl mx-auto mb-16">
        <h2 className="text-2xl font-bold text-[#FFD700] text-center mb-8">Design Packages</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
              <p className="text-3xl font-bold text-center mb-4">{pkg.price}</p>
              <p className="text-neutral-300 text-center mb-6">{pkg.description}</p>
              <div className="space-y-4 mb-6">
                <h4 className="font-semibold text-[#FFD700]">Includes:</h4>
                <ul className="space-y-2">
                  {pkg.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <FaCheck className="text-[#FFD700] mr-2 flex-shrink-0 mt-1" />
                      <span className="text-neutral-300">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <button className="w-full py-3 px-4 bg-[#FFD700] text-black font-semibold rounded hover:bg-[#FFE44D] transition-colors">
                Get Started
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Design Process */}
      <div className="max-w-7xl mx-auto mb-16">
        <h2 className="text-2xl font-bold text-[#FFD700] text-center mb-8">Our Design Process</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {designProcess.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-zinc-900 rounded-lg p-6 text-center border border-[#FFD700]/20"
            >
              <div className="flex items-center justify-center mb-4">
                {step.icon}
              </div>
              <h3 className="text-lg font-bold text-[#FFD700] mb-2">{step.title}</h3>
              <p className="text-neutral-300">{step.description}</p>
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
            {serviceFAQs['graphic-design'].map((faq, index) => (
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
            ))}
          </div>
        </div>
      </section>

      {/* Related Services */}
      <RelatedServices
        currentService="Graphic Design"
        services={[
          { 
            href: '/pricing/print-design',
            anchor: 'Print Design',
            title: 'Print Design Services',
            description: 'Transform your graphics into professional print materials'
          },
          { 
            href: '/pricing/marketing-materials',
            anchor: 'Marketing Materials',
            title: 'Marketing Materials Services',
            description: 'Create comprehensive marketing materials with our design expertise'
          },
          { 
            href: '/pricing/packaging-design',
            anchor: 'Packaging Design',
            title: 'Packaging Design Services',
            description: 'Design stunning product packaging that stands out on the shelf'
          }
        ]}
      />

      {/* CTA Section */}
      <section className="py-20 bg-black">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Create Stunning Designs?
          </h2>
          <p className="text-xl text-neutral-300 mb-8">
            Contact us for a free consultation and let's bring your vision to life
          </p>
          <GetInTouchButton variant="primary" text="Start Your Project" className="text-lg" />
        </div>
      </section>
    </div>
  );
};

export default GraphicDesignPricingPage;