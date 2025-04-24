'use client';

import { motion } from 'framer-motion';
import { FaCheck } from 'react-icons/fa';
import RelatedServices from '@/components/RelatedServices';
import GetInTouchButton from '@/components/GetInTouchButton';
import { serviceFAQs } from '@/data/serviceFAQs';

const CustomDevelopmentPage = () => {
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'Custom Development', href: '/pricing/custom-development' }
  ];

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
      {/* BEGIN: Visually Hidden SEO Headings H1-H5 for Custom Development Pretoria */}
      <section style={{position:'absolute',left:'-9999px',top:'auto',width:'1px',height:'1px',overflow:'hidden'}} aria-hidden="true">
        <h1>Custom Software Development in Pretoria | WL CreationX</h1>
        <p>WL CreationX offers bespoke software and web application development for Pretoria businesses. We turn your ideas into secure, scalable, and high-performance digital solutions.</p>
        <h2>Pretoria’s Leading Custom Development Agency</h2>
        <p>Our Pretoria-based team specializes in web apps, enterprise systems, APIs, and integrations. We help Pretoria companies innovate and grow with tailored technology.</p>
        <h3>Web & Mobile App Development for Pretoria Businesses</h3>
        <p>From MVPs to complex platforms, we deliver custom solutions using React, Node.js, AWS, and more. Pretoria clients trust us for quality, speed, and support.</p>
        <h4>Affordable Custom Development Packages in Pretoria</h4>
        <p>Choose from flexible packages for startups, SMEs, and enterprises. Transparent pricing and expert guidance for Pretoria businesses of all sizes.</p>
        <h5>Why Choose WL CreationX for Custom Development in Pretoria?</h5>
        <p>Local expertise, agile process, and proven results. WL CreationX is Pretoria’s trusted partner for custom software and app development.</p>
      </section>
      {/* END: Visually Hidden SEO Headings H1-H5 for Custom Development Pretoria */}
      {/* BEGIN: Visually Hidden Custom Development FAQ for Pretoria */}
      <section style={{position:'absolute',left:'-9999px',top:'auto',width:'1px',height:'1px',overflow:'hidden'}} aria-hidden="true">
        <h2>Frequently Asked Questions about Custom Development in Pretoria</h2>
        <div><h3>What is custom software development?</h3><p>Custom software development is the process of designing, building, and deploying solutions tailored to your Pretoria business’s unique needs, workflows, and goals.</p></div>
        <div><h3>How much does custom development cost in Pretoria?</h3><p>WL CreationX offers custom development packages starting from R18,780. Pricing depends on complexity, features, and integrations required for your Pretoria project.</p></div>
        <div><h3>What technologies do you use?</h3><p>We use React, Node.js, MongoDB, AWS, and other modern technologies to build scalable, secure solutions for Pretoria businesses.</p></div>
        <div><h3>Can you integrate with my existing systems?</h3><p>Yes. We specialize in API development and integration, connecting your Pretoria business with CRMs, ERPs, payment gateways, and more.</p></div>
        <div><h3>How long does a custom project take?</h3><p>Project timelines vary, but most Pretoria custom development projects take 2–12 weeks depending on requirements and scope.</p></div>
        <div><h3>Do you provide support and maintenance?</h3><p>All packages include 6–12 months of support for Pretoria clients. Ongoing maintenance plans are also available.</p></div>
        <div><h3>Can you build mobile apps?</h3><p>Yes, we develop cross-platform mobile apps and integrate them with your web systems for Pretoria businesses.</p></div>
        <div><h3>Is my data secure?</h3><p>Security is a top priority. We follow best practices for authentication, encryption, and data protection for Pretoria clients.</p></div>
        <div><h3>Do you sign NDAs?</h3><p>Yes, we sign NDAs to protect your ideas and business information throughout the custom development process in Pretoria.</p></div>
        <div><h3>Which areas of Pretoria do you serve?</h3><p>We serve all of Pretoria and surrounding areas, including Centurion, Hatfield, Brooklyn, Pretoria East, and more.</p></div>
      </section>
      {/* END: Visually Hidden Custom Development FAQ for Pretoria */}
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
              <button className="w-full py-3 px-4 bg-[#FFD700] text-black font-semibold rounded hover:bg-[#FFE44D] transition-colors">
                Get Started
              </button>
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
            href: '/pricing/website-maintenance',
            anchor: 'Website Maintenance',
            title: 'Website Maintenance Services',
            description: 'Keep your custom-built solutions running smoothly with our maintenance services'
          },
          { 
            href: '/pricing/mobile-solutions',
            anchor: 'Mobile Solutions',
            title: 'Mobile Development Services',
            description: 'Extend your web applications with custom mobile solutions'
          },
          { 
            href: '/pricing/ecommerce',
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
    </div>
  );
};

export default CustomDevelopmentPage;
