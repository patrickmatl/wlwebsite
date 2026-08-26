'use client';

import { motion } from 'framer-motion';
import { FaCheck } from 'react-icons/fa';
import RelatedServices from '@/components/RelatedServices';
import GetInTouchButton from '@/components/GetInTouchButton';
import { serviceFAQs } from '@/data/serviceFAQs';
import Link from 'next/link';
import GetStartedButton from '@/components/GetStartedButton';

const GraphicDesignPage = () => {
  const designPackages = [
    {
      name: "Essential Design Package",
      price: "From R3,850",
      description: "Perfect for startups and small businesses",
      features: [
        "Logo Design (2 Concepts)",
        "Business Card Design",
        "Social Media Profile Kit",
        "Basic Brand Guidelines",
        "2 Revision Rounds",
        "Source Files Included",
        "5-7 Day Delivery",
        "Email Support"
      ],
      icon: <FaCheck className="w-8 h-8 text-[#FFD700]" />
    },
    {
      name: "Professional Design Package",
      price: "From R7,850",
      description: "Comprehensive design solutions for growing businesses",
      features: [
        "Logo Design (4 Concepts)",
        "Complete Stationery Design",
        "Social Media Kit (5 Templates)",
        "Brochure/Flyer Design",
        "Comprehensive Brand Guidelines",
        "Email Signature Design",
        "3 Revision Rounds",
        "Source Files Included",
        "Priority Support",
        "3-5 Day Delivery",
        "1 Month Free Design Support"
      ],
      icon: <FaCheck className="w-8 h-8 text-[#FFD700]" />
    },
    {
      name: "Enterprise Design Package",
      price: "From R15,850",
      description: "Premium design solutions for established brands",
      features: [
        "Logo Design (6 Concepts)",
        "Complete Brand Identity",
        "Social Media Kit (10 Templates)",
        "Marketing Collateral Design",
        "Packaging Design",
        "Website Graphics",
        "Advanced Brand Guidelines",
        "Unlimited Revisions",
        "Source Files Included",
        "24/7 Priority Support",
        "2-3 Day Delivery",
        "3 Months Free Design Support"
      ],
      icon: <FaCheck className="w-8 h-8 text-[#FFD700]" />
    }
  ];

  const additionalServices = [
    {
      name: "Logo Design",
      price: "From R2,080",
      features: ["3 Concepts", "3 Revisions", "Source Files", "Brand Guidelines"]
    },
    {
      name: "Social Media Graphics",
      price: "From R1,850/month",
      features: ["10 Posts/Month", "2 Revisions/Post", "Custom Templates", "Content Calendar"]
    },
    {
      name: "Print Design",
      price: "From R950",
      features: ["Business Cards", "Flyers", "Brochures", "Print-Ready Files"]
    },
    {
      name: "Packaging Design",
      price: "From R4,850",
      features: ["3D Mockups", "Print-Ready Files", "Technical Specifications", "Production Support"]
    }
  ];

  const relatedServices = [
    {
      title: 'Brand Identity',
      href: '/branding-solutions-pretoria',
      description: 'Complete brand identity solutions',
      anchor: 'Brand Identity'
    },
    {
      title: 'Marketing Materials',
      href: '/pricing/marketing-materials-pretoria',
      description: 'Professional marketing collateral design',
      anchor: 'Marketing'
    },
    {
      title: 'Website Design',
      href: '/pricing/website-design-pretoria',
      description: 'Custom website design services',
      anchor: 'Web Design'
    },
    {
      title: 'Contact Us',
      description: 'Get in touch for graphic design quotes and advice.',
      href: '/get-in-touch-pretoria',
      anchor: 'Contact Us'
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* BEGIN: FAQPage Structured Data for Graphic Design Pretoria */}
      <script type="application/ld+json" suppressHydrationWarning>
        {`
        {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "What graphic design services do you offer?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "We offer logo design, branding, packaging, marketing materials, social media graphics, and more for Pretoria businesses."
              }
            },
            {
              "@type": "Question",
              "name": "How much does graphic design cost in Pretoria?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Standalone logo design starts from R2,080, and full design packages start from R3,850. Pricing depends on project scope, complexity, and deliverables."
              }
            },
            {
              "@type": "Question",
              "name": "Can you design a logo for my Pretoria business?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Absolutely! We create memorable, professional logos tailored to your Pretoria brand identity and audience."
              }
            },
            {
              "@type": "Question",
              "name": "Do you provide brand guidelines?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes, all comprehensive packages include detailed brand guidelines for Pretoria clients to ensure consistent visual identity."
              }
            },
            {
              "@type": "Question",
              "name": "Can you design for print and digital?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes, we design for both print (business cards, flyers, packaging) and digital (social media, web graphics) for Pretoria businesses."
              }
            },
            {
              "@type": "Question",
              "name": "How long does a design project take?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Most Pretoria design projects are completed within 3–10 days, depending on complexity and revisions."
              }
            },
            {
              "@type": "Question",
              "name": "How many revisions are included?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Revision rounds vary by package, but all Pretoria clients receive at least 2–3 rounds to ensure satisfaction."
              }
            },
            {
              "@type": "Question",
              "name": "Do you provide source files?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes, all final designs include editable source files for Pretoria clients."
              }
            },
            {
              "@type": "Question",
              "name": "Can you work with my existing brand?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes, we can refresh or extend your current Pretoria brand identity to keep it modern and consistent."
              }
            },
            {
              "@type": "Question",
              "name": "Which areas of Pretoria do you serve?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "We serve all of Pretoria and surrounding regions, including Centurion, Hatfield, Brooklyn, Pretoria East, and more."
              }
            }
          ]
        }
        `}
      </script>
      {/* END: FAQPage Structured Data for Graphic Design Pretoria */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mt-12 mb-16"
        >
          <h1 className="text-4xl font-bold mb-4">Graphic Design in Pretoria</h1>
          <p className="text-xl text-gray-400">Professional graphic design solutions for your brand</p>
        </motion.div>

        {/* Design Packages */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {designPackages.map((pkg, index) => (
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

        {/* Additional Services */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold text-center mb-12">Additional Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
                <ul className="space-y-2">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <FaCheck className="text-[#FFD700] mr-2 flex-shrink-0 mt-1" />
                      <span className="text-neutral-300">{feature}</span>
                    </li>
                  ))}
                </ul>
                <GetStartedButton
                  packageName={service.name}
                  packagePrice={service.price}
                  service="Graphic design"
                  label="Enquire"
                  className="mt-4 w-full"
                />
              </motion.div>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <section className="py-20 bg-neutral-800 rounded-lg mt-20">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-white text-center mb-12">
              Frequently Asked Questions
            </h2>
            <div className="space-y-6">
              {serviceFAQs['graphic-design']?.map((faq, index) => (
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
            currentService="graphic-design"
            services={relatedServices}
          />
        </div>
        {/* Contextual link to homepage with varied phrasing */}
        <div className="mt-10 text-center">
          <p className="text-neutral-400 text-sm">
            Discover more from our <Link href="/" className="text-[#FFD700] hover:underline">graphic designers in Pretoria</Link> on the homepage.
          </p>
        </div>
      </div>

      <section className="mx-auto max-w-4xl px-4 py-12 prose prose-invert prose-headings:font-syne prose-headings:text-[#FFD700] prose-p:text-neutral-300 prose-li:text-neutral-300 prose-strong:text-white">
        <h3>Frequently Asked Questions about Graphic Design in Pretoria</h3>
        <div><h4>What graphic design services do you offer?</h4><p>We offer logo design, branding, packaging, marketing materials, social media graphics, and more for Pretoria businesses. Our services are tailored to your specific goals and industry, ensuring your brand stands out in a crowded marketplace.</p><p>From initial brainstorming to final files, we work closely with Pretoria clients to deliver creative solutions that drive results and support your business growth.</p></div>
        <div><h4>How much does graphic design cost in Pretoria?</h4><p>Standalone logo design starts from R2,080, and full design packages start from R3,850. Pricing depends on project scope, complexity, and deliverables. We provide transparent quotes and flexible options for Pretoria businesses of all sizes.</p><p>Our goal is to deliver exceptional value and quality, helping Pretoria companies invest confidently in their brand’s visual presence.</p></div>
        <div><h4>Can you design a logo for my Pretoria business?</h4><p>Absolutely! We create memorable, professional logos tailored to your Pretoria brand identity and audience. Our logo design process includes research, concept development, and multiple revisions to ensure the perfect result.</p><p>Your logo will be delivered in all necessary formats for print and digital use, giving your Pretoria business a strong and versatile visual foundation.</p></div>
        <div><h4>Do you provide brand guidelines?</h4><p>Yes, all comprehensive packages include detailed brand guidelines for Pretoria clients to ensure consistent visual identity. These guidelines cover logo usage, color palettes, typography, and more.</p><p>Brand guidelines empower Pretoria businesses to maintain a cohesive look and feel across all marketing channels, both now and in the future.</p></div>
        <div><h4>Can you design for print and digital?</h4><p>Yes, we design for both print (business cards, flyers, packaging) and digital (social media, web graphics) for Pretoria businesses. Our team understands the unique requirements of each medium and ensures your designs look great everywhere.</p><p>We provide print-ready files and digital assets, so Pretoria clients can launch campaigns with confidence and consistency.</p></div>
        <div><h4>How long does a design project take?</h4><p>Most Pretoria design projects are completed within 3–10 days, depending on complexity and revisions. We provide clear timelines and regular updates, so you always know what to expect.</p><p>For urgent needs, we offer expedited services to help Pretoria businesses meet tight deadlines without sacrificing quality.</p></div>
        <div><h4>How many revisions are included?</h4><p>Revision rounds vary by package, but all Pretoria clients receive at least 2–3 rounds to ensure satisfaction. We believe in a collaborative process and work with you until the design meets your expectations.</p><p>Additional revisions can be arranged if needed, providing flexibility and peace of mind for Pretoria businesses.</p></div>
        <div><h4>Do you provide source files?</h4><p>Yes, all final designs include editable source files for Pretoria clients. We use industry-standard formats, making it easy for you to update or repurpose designs in the future.</p><p>Having access to source files gives Pretoria businesses full control over their brand assets and ensures long-term value from every project.</p></div>
        <div><h4>Can you work with my existing brand?</h4><p>Yes, we can refresh or extend your current Pretoria brand identity to keep it modern and consistent. Our team respects your existing brand equity while introducing creative updates that align with your goals.</p><p>Updating your brand is a cost-effective way for Pretoria businesses to stay relevant and competitive in a dynamic market.</p></div>
        <div><h4>Which areas of Pretoria do you serve?</h4><p>We serve all of Pretoria and surrounding regions, including Centurion, Hatfield, Brooklyn, Pretoria East, and more. Our digital-first approach allows us to work with clients remotely or in person, providing the same high level of service wherever you are.</p><p>No matter your location in Pretoria, WL CreationX is ready to help you achieve your graphic design goals and elevate your brand presence.</p></div>
      </section>
    </div>
  );
};

export default GraphicDesignPage;