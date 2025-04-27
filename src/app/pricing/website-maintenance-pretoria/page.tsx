'use client';

import { motion } from 'framer-motion';
import { FaCheck } from 'react-icons/fa';
import RelatedServices from '@/components/RelatedServices';
import GetInTouchButton from '@/components/GetInTouchButton';
import { serviceFAQs } from '@/data/serviceFAQs';

const WebsiteMaintenancePage = () => {
  const maintenancePackages = [
    {
      name: "Essential Maintenance",
      price: "R850/month",
      description: "Basic maintenance for small websites",
      features: [
        "Monthly Software Updates",
        "Basic Security Monitoring",
        "Weekly Backups",
        "Basic Performance Checks",
        "Up to 2 Content Updates",
        "Email Support",
        "Monthly Reports",
        "Response Time: 48 Hours"
      ],
      icon: <FaCheck className="w-8 h-8 text-[#FFD700]" />
    },
    {
      name: "Professional Maintenance",
      price: "R1,850/month",
      description: "Comprehensive care for business websites",
      features: [
        "Weekly Software Updates",
        "Advanced Security Monitoring",
        "Daily Backups",
        "Performance Optimization",
        "Up to 5 Content Updates",
        "Priority Email & Phone Support",
        "Weekly Reports",
        "Response Time: 24 Hours",
        "SSL Certificate Management",
        "Monthly SEO Check",
        "Uptime Monitoring",
        "Database Optimization"
      ],
      icon: <FaCheck className="w-8 h-8 text-[#FFD700]" />
    },
    {
      name: "Enterprise Maintenance",
      price: "R3,850/month",
      description: "Premium support for high-traffic websites",
      features: [
        "Real-time Software Updates",
        "24/7 Security Monitoring",
        "Hourly Backups",
        "Advanced Performance Optimization",
        "Unlimited Content Updates",
        "24/7 Priority Support",
        "Real-time Reports",
        "Response Time: 2 Hours",
        "Premium SSL Management",
        "Weekly SEO Optimization",
        "CDN Management",
        "Load Balancing",
        "DDoS Protection",
        "Emergency Support"
      ],
      icon: <FaCheck className="w-8 h-8 text-[#FFD700]" />
    }
  ];

  const relatedServices = [
    {
      title: 'Website Design',
      href: '/pricing/website-design-pretoria',
      description: 'Custom website design services',
      anchor: 'Website Design'
    },
    {
      title: 'SEO Services',
      href: '/pricing/seo-pretoria',
      description: 'Search engine optimization services',
      anchor: 'SEO'
    },
    {
      title: 'Website Security',
      href: '/pricing/website-security',
      description: 'Website security and protection services',
      anchor: 'Security'
    },
    {
      title: 'Contact Us',
      href: '/get-in-touch-pretoria',
      description: 'Get in touch with us for any inquiries or questions',
      anchor: 'Contact Us'
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* BEGIN: Visually Hidden SEO Headings H1-H5 for Website Maintenance Pretoria */}
        <section style={{position:'absolute',left:'-9999px',top:'auto',width:'1px',height:'1px',overflow:'hidden'}} aria-hidden="true">
          <h1>Pretoria Website Maintenance Services | WL CreationX</h1>
          <p>WL CreationX provides professional website maintenance services in Pretoria, ensuring your site remains secure, up-to-date, and fully optimized. Our Pretoria maintenance team handles everything from software updates to performance checks, so you can focus on your business.</p>
          <p>With proactive monitoring and fast support, we help Pretoria businesses prevent downtime, improve user experience, and safeguard their online presence.</p>
          <h2>Leading Website Maintenance Agency in Pretoria</h2>
          <p>As a trusted website maintenance agency in Pretoria, we combine technical expertise with responsive service to deliver reliable results. Our maintenance packages are designed to suit businesses of all sizes, from startups to enterprises.</p>
          <p>We keep your Pretoria website running smoothly with regular backups, security monitoring, and ongoing performance optimization.</p>
          <h3>Custom Website Maintenance Solutions for Pretoria Businesses</h3>
          <p>Our Pretoria website maintenance solutions are tailored to your platform, traffic, and business needs. We offer essential, professional, and enterprise packages, each with a range of features and flexible support options.</p>
          <p>From content updates to advanced security, our Pretoria team ensures your website remains competitive and compliant with industry standards.</p>
          <h4>Affordable Website Maintenance Packages in Pretoria</h4>
          <p>Choose from transparent, competitively priced maintenance packages for Pretoria businesses. We provide monthly reports, priority support, and no hidden fees, making quality website care accessible to all.</p>
          <p>Our Pretoria clients benefit from peace of mind, knowing their website is in expert hands every day of the year.</p>
          <h5>Why Choose WL CreationX for Website Maintenance in Pretoria?</h5>
          <p>WL CreationX is renowned for reliability, technical skill, and customer service in Pretoria website maintenance. Our team has a proven record of preventing issues before they arise and delivering fast, effective solutions when needed.</p>
          <p>We prioritize long-term partnerships, transparent communication, and measurable results for all our Pretoria website maintenance clients.</p>
        </section>
        {/* END: Visually Hidden SEO Headings H1-H5 for Website Maintenance Pretoria */}
        {/* BEGIN: Visually Hidden Website Maintenance FAQ for Pretoria */}
        <section style={{position:'absolute',left:'-9999px',top:'auto',width:'1px',height:'1px',overflow:'hidden'}} aria-hidden="true">
          <h2>Frequently Asked Questions about Website Maintenance in Pretoria</h2>
          <div><h3>What is included in your website maintenance services?</h3><p>Our Pretoria website maintenance covers software updates, security monitoring, backups, performance optimization, and content updates.</p><p>We offer different packages to suit the needs and budgets of all Pretoria businesses.</p></div>
          <div><h3>How often do you perform updates and backups?</h3><p>Depending on your package, we perform updates and backups monthly, weekly, or even hourly for Pretoria clients.</p><p>Regular maintenance ensures your website is always secure and running smoothly.</p></div>
          <div><h3>Do you offer emergency website support?</h3><p>Yes, our Pretoria team provides emergency support for urgent issues, including downtime, security breaches, and technical failures.</p><p>Enterprise clients receive 24/7 priority assistance for critical incidents.</p></div>
          <div><h3>Can you maintain websites built on any platform?</h3><p>We support all major platforms, including WordPress, Shopify, custom CMS, and more for Pretoria businesses.</p><p>Our team is experienced with a wide range of technologies and frameworks.</p></div>
          <div><h3>How do you keep my website secure?</h3><p>We implement advanced security monitoring, SSL management, and regular vulnerability scans for Pretoria websites.</p><p>Proactive measures help prevent hacks, malware, and data breaches.</p></div>
          <div><h3>Is website maintenance necessary for small businesses?</h3><p>Yes, regular maintenance is essential for all Pretoria businesses to prevent issues, improve performance, and protect customer data.</p><p>We offer affordable packages tailored to small business needs.</p></div>
          <div><h3>Do you provide maintenance reports?</h3><p>All Pretoria maintenance clients receive detailed monthly or real-time reports, depending on their package.</p><p>Reports cover updates performed, security status, and recommendations for improvement.</p></div>
          <div><h3>Can you update my website content?</h3><p>Yes, we handle content updates, image changes, and new page additions for Pretoria clients as part of our maintenance packages.</p><p>Fast turnaround times ensure your website stays current and relevant.</p></div>
          <div><h3>Do you offer website optimization as part of maintenance?</h3><p>Performance optimization, speed improvements, and SEO checks are included in our Pretoria website maintenance services.</p><p>We help your website load faster and rank better in search engines.</p></div>
          <div><h3>Which areas of Pretoria do you serve?</h3><p>We serve all of Pretoria and surrounding regions, including Centurion, Hatfield, Brooklyn, Pretoria East, and more.</p><p>Remote consultations and digital support are available for your convenience.</p></div>
        </section>
        {/* END: Visually Hidden Website Maintenance FAQ for Pretoria */}
        {/* BEGIN: FAQPage Structured Data for Website Maintenance Pretoria */}
        <script type="application/ld+json" suppressHydrationWarning>
          {`
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "What is included in your website maintenance services?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Our Pretoria website maintenance covers software updates, security monitoring, backups, performance optimization, and content updates. We offer different packages to suit the needs and budgets of all Pretoria businesses."
                }
              },
              {
                "@type": "Question",
                "name": "How often do you perform updates and backups?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Depending on your package, we perform updates and backups monthly, weekly, or even hourly for Pretoria clients. Regular maintenance ensures your website is always secure and running smoothly."
                }
              },
              {
                "@type": "Question",
                "name": "Do you offer emergency website support?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, our Pretoria team provides emergency support for urgent issues, including downtime, security breaches, and technical failures. Enterprise clients receive 24/7 priority assistance for critical incidents."
                }
              },
              {
                "@type": "Question",
                "name": "Can you maintain websites built on any platform?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "We support all major platforms, including WordPress, Shopify, custom CMS, and more for Pretoria businesses. Our team is experienced with a wide range of technologies and frameworks."
                }
              },
              {
                "@type": "Question",
                "name": "How do you keep my website secure?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "We implement advanced security monitoring, SSL management, and regular vulnerability scans for Pretoria websites. Proactive measures help prevent hacks, malware, and data breaches."
                }
              },
              {
                "@type": "Question",
                "name": "Is website maintenance necessary for small businesses?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, regular maintenance is essential for all Pretoria businesses to prevent issues, improve performance, and protect customer data. We offer affordable packages tailored to small business needs."
                }
              },
              {
                "@type": "Question",
                "name": "Do you provide maintenance reports?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "All Pretoria maintenance clients receive detailed monthly or real-time reports, depending on their package. Reports cover updates performed, security status, and recommendations for improvement."
                }
              },
              {
                "@type": "Question",
                "name": "Can you update my website content?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, we handle content updates, image changes, and new page additions for Pretoria clients as part of our maintenance packages. Fast turnaround times ensure your website stays current and relevant."
                }
              },
              {
                "@type": "Question",
                "name": "Do you offer website optimization as part of maintenance?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Performance optimization, speed improvements, and SEO checks are included in our Pretoria website maintenance services. We help your website load faster and rank better in search engines."
                }
              },
              {
                "@type": "Question",
                "name": "Which areas of Pretoria do you serve?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "We serve all of Pretoria and surrounding regions, including Centurion, Hatfield, Brooklyn, Pretoria East, and more. Remote consultations and digital support are available for your convenience."
                }
              }
            ]
          }
          `}
        </script>
        {/* END: FAQPage Structured Data for Website Maintenance Pretoria */}
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mt-12 mb-16"
        >
          <h1 className="text-4xl font-bold mb-4">Website Maintenance Services</h1>
          <p className="text-xl text-gray-400">Keep your website running smoothly with our professional maintenance services</p>
        </motion.div>

        {/* Maintenance Packages */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {maintenancePackages.map((pkg, index) => (
            <motion.div
              key={pkg.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-zinc-900 rounded-lg p-8 border border-[#FFD700]/20 hover:border-[#FFD700]/40 transition-colors"
            >
              <div className="flex items-center justify-center mb-6">
                {pkg.icon}
              </div>
              <h3 className="text-2xl font-bold text-[#FFD700] text-center mb-4">{pkg.name}</h3>
              <p className="text-3xl font-bold text-center mb-4">{pkg.price}</p>
              <p className="text-neutral-300 text-center mb-6">{pkg.description}</p>
              <div className="space-y-4">
                <ul className="space-y-2">
                  {pkg.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <FaCheck className="text-[#FFD700] mr-2 flex-shrink-0 mt-1" />
                      <span className="text-neutral-300">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-8">
                <GetInTouchButton 
                  variant="primary" 
                  text="Get Started" 
                  className="w-full py-3 px-4 bg-[#FFD700] text-black font-semibold rounded hover:bg-[#FFE44D] transition-colors"
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* FAQ Section */}
        <section className="py-20 bg-neutral-800 rounded-lg">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-white text-center mb-12">
              Frequently Asked Questions
            </h2>
            <div className="space-y-6">
              {serviceFAQs['website-maintenance']?.map((faq, index) => (
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
        <div className="mt-20">
          <RelatedServices 
            currentService="website-maintenance"
            services={relatedServices}
          />
        </div>
      </div>
    </div>
  );
};

export default WebsiteMaintenancePage;
