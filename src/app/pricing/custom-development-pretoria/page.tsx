'use client';

import { motion } from 'framer-motion';
import { FaCheck } from 'react-icons/fa';
import RelatedServices from '@/components/RelatedServices';
import GetInTouchButton from '@/components/GetInTouchButton';
import { serviceFAQs } from '@/data/serviceFAQs';
import Link from 'next/link';
import GetStartedButton from '@/components/GetStartedButton';

const CustomDevelopmentPage = () => {
  const packages = [
    {
      name: "Custom Web Application",
      price: "Starting at R27,980.00",
      icon: <FaCheck className="w-8 h-8 text-[#FFD700]" />,
      description: "Custom web application development",
      features: [
        "Custom UI/UX Design",
        "Secure Authentication",
        "Database Integration",
        "API Development",
        "Custom Business Logic",
        "Performance Optimization",
        "Testing & QA",
        "Documentation",
        "6 Months Support"
      ]
    },
    {
      name: "Enterprise System",
      price: "Starting at R45,890.00",
      icon: <FaCheck className="w-8 h-8 text-[#FFD700]" />,
      description: "Enterprise system development",
      features: [
        "Complex Business Logic",
        "Multiple User Roles",
        "Advanced Security",
        "Data Analytics",
        "Third-party Integrations",
        "Scalable Architecture",
        "Comprehensive Testing",
        "Full Documentation",
        "12 Months Support"
      ]
    },
    {
      name: "API & Integration",
      price: "Starting at R18,780.00",
      icon: <FaCheck className="w-8 h-8 text-[#FFD700]" />,
      description: "API and integration development",
      features: [
        "RESTful API Design",
        "Authentication & Security",
        "Third-party Integration",
        "Data Transformation",
        "Performance Optimization",
        "API Documentation",
        "Testing Suite",
        "Monitoring Setup",
        "6 Months Support"
      ]
    }
  ];

  const technologies = [
    {
      name: "React",
      icon: <FaCheck className="w-8 h-8 text-[#FFD700]" />
    },
    {
      name: "Node.js",
      icon: <FaCheck className="w-8 h-8 text-[#FFD700]" />
    },
    {
      name: "MongoDB",
      icon: <FaCheck className="w-8 h-8 text-[#FFD700]" />
    },
    {
      name: "AWS",
      icon: <FaCheck className="w-8 h-8 text-[#FFD700]" />
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white py-20 px-4 sm:px-6 lg:px-8">
      {/* BEGIN: FAQPage Structured Data for Custom Development Pretoria */}
      <script type="application/ld+json" suppressHydrationWarning>
        {`
        {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "What is custom software development?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Custom software development is the process of designing, building, and deploying solutions tailored to your Pretoria business’s unique needs, workflows, and goals."
              }
            },
            {
              "@type": "Question",
              "name": "How much does custom development cost in Pretoria?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "WL CreationX offers custom development packages starting from R18,780. Pricing depends on complexity, features, and integrations required for your Pretoria project."
              }
            },
            {
              "@type": "Question",
              "name": "What technologies do you use?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "We use React, Node.js, MongoDB, AWS, and other modern technologies to build scalable, secure solutions for Pretoria businesses."
              }
            },
            {
              "@type": "Question",
              "name": "Can you integrate with my existing systems?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes. We specialize in API development and integration, connecting your Pretoria business with CRMs, ERPs, payment gateways, and more."
              }
            },
            {
              "@type": "Question",
              "name": "How long does a custom project take?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Project timelines vary, but most Pretoria custom development projects take 2–12 weeks depending on requirements and scope."
              }
            },
            {
              "@type": "Question",
              "name": "Do you provide support and maintenance?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "All packages include 6–12 months of support for Pretoria clients. Ongoing maintenance plans are also available."
              }
            },
            {
              "@type": "Question",
              "name": "Can you build mobile apps?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes, we develop cross-platform mobile apps and integrate them with your web systems for Pretoria businesses."
              }
            },
            {
              "@type": "Question",
              "name": "Is my data secure?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Security is a top priority. We follow best practices for authentication, encryption, and data protection for Pretoria clients."
              }
            },
            {
              "@type": "Question",
              "name": "Do you sign NDAs?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes, we sign NDAs to protect your ideas and business information throughout the custom development process in Pretoria."
              }
            },
            {
              "@type": "Question",
              "name": "Which areas of Pretoria do you serve?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "We serve all of Pretoria and surrounding areas, including Centurion, Hatfield, Brooklyn, Pretoria East, and more."
              }
            }
          ]
        }
        `}
      </script>
      {/* END: FAQPage Structured Data for Custom Development Pretoria */}
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">Custom Development Solutions</h1>
        <p className="text-xl text-neutral-300 max-w-3xl mx-auto">
          Transform your ideas into reality with our expert custom development services
        </p>
      </div>

      {/* Service Packages */}
      <div className="max-w-7xl mx-auto mb-16">
        <h2 className="text-2xl font-bold text-[#FFD700] text-center mb-8">Development Packages</h2>
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
                <h4 className="font-semibold text-[#FFD700]">Features:</h4>
                <ul className="space-y-2">
                  {pkg.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <FaCheck className="text-[#FFD700] mr-2 flex-shrink-0 mt-1" />
                      <span className="text-neutral-300">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <GetStartedButton
                packageName={pkg.name}
                packagePrice={pkg.price}
                service="Custom development"
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Technologies */}
      <div className="max-w-7xl mx-auto mb-16">
        <h2 className="text-2xl font-bold text-[#FFD700] text-center mb-8">Technologies We Use</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {technologies.map((tech, index) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-zinc-900 rounded-lg p-6 text-center border border-[#FFD700]/20"
            >
              <div className="flex items-center justify-center mb-4">
                {tech.icon}
              </div>
              <h3 className="text-lg font-bold text-[#FFD700]">{tech.name}</h3>
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
            {serviceFAQs['custom-development']?.map((faq, index) => (
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
        currentService="Custom Development"
        services={[
          { 
            href: '/pricing/website-maintenance-pretoria',
            anchor: 'Website Maintenance',
            title: 'Website Maintenance Services',
            description: 'Keep your custom-built solutions running smoothly with our maintenance services'
          },
          { 
            href: '/pricing/mobile-solutions-pretoria',
            anchor: 'Mobile Solutions',
            title: 'Mobile Development Services',
            description: 'Extend your web applications with custom mobile solutions'
          },
          { 
            href: '/pricing/ecommerce-pretoria',
            anchor: 'E-commerce Solutions',
            title: 'E-commerce Development',
            description: 'Build custom e-commerce solutions tailored to your business needs'
          }
        ]}
      />

      {/* CTA Section */}
      <section className="py-20 bg-black">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Build Your Custom Solution?
          </h2>
          <p className="text-xl text-neutral-300 mb-8">
            Contact us for a free consultation and let's bring your vision to life
          </p>
          <GetInTouchButton variant="primary" text="Start Your Project" className="text-lg" />
        </div>
      </section>
      <div className="mt-4 text-center">
        <p className="text-neutral-400 text-sm">
          Learn more on our
          {" "}
          <Link href="/" className="text-[#FFD700] hover:underline">Pretoria web development agency</Link>
          {" "}
          homepage.
        </p>
      </div>

      <section className="mx-auto max-w-4xl px-4 py-12 prose prose-invert prose-headings:font-syne prose-headings:text-[#FFD700] prose-p:text-neutral-300 prose-li:text-neutral-300 prose-strong:text-white">
        <h3>Frequently Asked Questions about Custom Development in Pretoria</h3>
        <div><h4>What is custom software development?</h4><p>Custom software development is the process of designing, building, and deploying solutions tailored to your Pretoria business’s unique needs, workflows, and goals.</p></div>
        <div><h4>How much does custom development cost in Pretoria?</h4><p>WL CreationX offers custom development packages starting from R18,780. Pricing depends on complexity, features, and integrations required for your Pretoria project.</p></div>
        <div><h4>What technologies do you use?</h4><p>We use React, Node.js, MongoDB, AWS, and other modern technologies to build scalable, secure solutions for Pretoria businesses.</p></div>
        <div><h4>Can you integrate with my existing systems?</h4><p>Yes. We specialize in API development and integration, connecting your Pretoria business with CRMs, ERPs, payment gateways, and more.</p></div>
        <div><h4>How long does a custom project take?</h4><p>Project timelines vary, but most Pretoria custom development projects take 2–12 weeks depending on requirements and scope.</p></div>
        <div><h4>Do you provide support and maintenance?</h4><p>All packages include 6–12 months of support for Pretoria clients. Ongoing maintenance plans are also available.</p></div>
        <div><h4>Can you build mobile apps?</h4><p>Yes, we develop cross-platform mobile apps and integrate them with your web systems for Pretoria businesses.</p></div>
        <div><h4>Is my data secure?</h4><p>Security is a top priority. We follow best practices for authentication, encryption, and data protection for Pretoria clients.</p></div>
        <div><h4>Do you sign NDAs?</h4><p>Yes, we sign NDAs to protect your ideas and business information throughout the custom development process in Pretoria.</p></div>
        <div><h4>Which areas of Pretoria do you serve?</h4><p>We serve all of Pretoria and surrounding areas, including Centurion, Hatfield, Brooklyn, Pretoria East, and more.</p></div>
      </section>
    </div>
  );
};

export default CustomDevelopmentPage;
