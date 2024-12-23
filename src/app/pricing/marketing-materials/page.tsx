'use client';

import { motion } from 'framer-motion';
import { FaCheck } from 'react-icons/fa';
import Breadcrumb from '@/components/Breadcrumb';
import RelatedServices from '@/components/RelatedServices';
import GetInTouchButton from '@/components/GetInTouchButton';
import { serviceFAQs } from '@/data/serviceFAQs';

const MarketingMaterialsPage = () => {
  const presentationPackages = [
    {
      name: "Basic Presentation Package",
      price: "From R1,500",
      description: "Professional presentation design for small businesses and startups",
      specifications: [
        "Up to 15 Slides",
        "PowerPoint/Google Slides",
        "2 Revision Rounds",
        "3-4 Day Delivery"
      ],
      features: [
        "Professional Layout Design",
        "Basic Animations",
        "Custom Color Scheme",
        "Stock Image Integration",
        "Basic Charts & Graphs",
        "Template Slides",
        "Basic Icons & Graphics",
        "PDF Export"
      ],
      icon: <FaCheck className="w-8 h-8 text-[#FFD700]" />
    },
    {
      name: "Professional Presentation Package",
      price: "From R2,500",
      description: "Advanced presentation design for corporate clients and important pitches",
      specifications: [
        "Up to 30 Slides",
        "PowerPoint/Keynote/Google Slides",
        "3 Revision Rounds",
        "4-5 Day Delivery"
      ],
      features: [
        "Premium Layout Design",
        "Complex Animations",
        "Custom Graphics & Icons",
        "Advanced Charts & Diagrams",
        "Infographic Design",
        "Interactive Elements",
        "Master Slide Templates",
        "Multiple Format Export",
        "Speaker Notes",
        "Mobile Optimization"
      ],
      icon: <FaCheck className="w-8 h-8 text-[#FFD700]" />
    },
    {
      name: "Enterprise Presentation Package",
      price: "From R4,500",
      description: "Premium presentation design for high-stakes presentations and conferences",
      specifications: [
        "Unlimited Slides",
        "All Presentation Platforms",
        "Unlimited Revisions",
        "5-7 Day Delivery"
      ],
      features: [
        "Custom Animation Effects",
        "Premium Graphics & Icons",
        "Complex Data Visualization",
        "Custom Illustrations",
        "Video Integration",
        "Interactive Features",
        "Print-Ready Version",
        "Multiple Color Schemes",
        "Presenter Training",
        "Handout Design"
      ],
      icon: <FaCheck className="w-8 h-8 text-[#FFD700]" />
    }
  ];

  const emailTemplatePackages = [
    {
      name: "Basic Email Template",
      price: "From R850",
      description: "Professional email template for newsletters and announcements",
      specifications: [
        "1 Template Design",
        "Responsive Layout",
        "2 Revision Rounds",
        "2-3 Day Delivery"
      ],
      features: [
        "Mobile Responsive Design",
        "Basic Layout Options",
        "Stock Image Integration",
        "CTA Buttons",
        "Social Media Icons",
        "Basic Customization",
        "Major Email Client Testing",
        "Setup Instructions"
      ],
      icon: <FaCheck className="w-8 h-8 text-[#FFD700]" />
    },
    {
      name: "Professional Email Package",
      price: "From R1,850",
      description: "Advanced email template suite for marketing campaigns",
      specifications: [
        "3 Template Designs",
        "Responsive Layout",
        "3 Revision Rounds",
        "3-4 Day Delivery"
      ],
      features: [
        "Advanced Responsive Design",
        "Multiple Layout Options",
        "Dynamic Content Areas",
        "Custom Graphics",
        "A/B Test Variants",
        "Advanced Customization",
        "Cross-Platform Testing",
        "Integration Support"
      ],
      icon: <FaCheck className="w-8 h-8 text-[#FFD700]" />
    }
  ];

  const packagingPackages = [
    {
      name: "Basic Packaging Design",
      price: "From R2,500",
      description: "Professional packaging design for small products",
      specifications: [
        "Single Product Design",
        "Print-Ready Files",
        "3 Revision Rounds",
        "5-7 Day Delivery"
      ],
      features: [
        "Custom Design",
        "Die-Cut Template",
        "Basic 3D Preview",
        "Material Recommendations",
        "Print Specifications",
        "Barcode Placement",
        "Required Legal Elements",
        "Color Management"
      ],
      icon: <FaCheck className="w-8 h-8 text-[#FFD700]" />
    },
    {
      name: "Premium Packaging Design",
      price: "From R4,500",
      description: "Comprehensive packaging design for product lines",
      specifications: [
        "Multiple Size Variants",
        "Print-Ready Files",
        "Unlimited Revisions",
        "7-10 Day Delivery"
      ],
      features: [
        "Custom Illustration",
        "Advanced 3D Mockups",
        "Multiple Variations",
        "Premium Materials",
        "Spot UV Options",
        "Foil Stamping Design",
        "Eco-Friendly Options",
        "Production Guidance"
      ],
      icon: <FaCheck className="w-8 h-8 text-[#FFD700]" />
    }
  ];

  const vehiclePackages = [
    {
      name: "Basic Vehicle Wrap",
      price: "From R3,500",
      description: "Professional vehicle wrap design for small vehicles",
      specifications: [
        "Single Vehicle Design",
        "Standard Templates",
        "3 Revision Rounds",
        "5-7 Day Delivery"
      ],
      features: [
        "Custom Design",
        "Vehicle Templates",
        "Basic 3D Preview",
        "Print Specifications",
        "Material Selection",
        "Installation Guide",
        "Color Management",
        "Brand Integration"
      ],
      icon: <FaCheck className="w-8 h-8 text-[#FFD700]" />
    },
    {
      name: "Fleet Vehicle Wrap",
      price: "From R6,500",
      description: "Comprehensive vehicle wrap design for multiple vehicles",
      specifications: [
        "Multiple Vehicle Types",
        "Custom Templates",
        "Unlimited Revisions",
        "7-10 Day Delivery"
      ],
      features: [
        "Fleet Consistency",
        "Advanced 3D Previews",
        "Multiple Variations",
        "Premium Materials",
        "Reflective Options",
        "Installation Planning",
        "Maintenance Guide",
        "Brand Guidelines"
      ],
      icon: <FaCheck className="w-8 h-8 text-[#FFD700]" />
    }
  ];

  const signagePackages = [
    {
      name: "Basic Signage Package",
      price: "From R1,200",
      description: "Professional signage design for small businesses",
      specifications: [
        "Single Sign Design",
        "Print-Ready Files",
        "2 Revision Rounds",
        "3-4 Day Delivery"
      ],
      features: [
        "Custom Design",
        "Material Selection",
        "Size Specifications",
        "Print-Ready Files",
        "Basic Lighting Plan",
        "Installation Guide",
        "Color Management",
        "Brand Integration"
      ],
      icon: <FaCheck className="w-8 h-8 text-[#FFD700]" />
    },
    {
      name: "Complete Signage Package",
      price: "From R2,500",
      description: "Comprehensive signage system design",
      specifications: [
        "Multiple Sign Types",
        "Print-Ready Files",
        "3 Revision Rounds",
        "5-7 Day Delivery"
      ],
      features: [
        "Wayfinding System",
        "Multiple Variations",
        "Illumination Design",
        "ADA Compliance",
        "Location Planning",
        "Technical Specs",
        "Installation Planning",
        "Maintenance Guide"
      ],
      icon: <FaCheck className="w-8 h-8 text-[#FFD700]" />
    }
  ];

  const additionalServices = [
    {
      name: "Rush Service",
      price: "+50% of base price",
      description: "48-72 hour turnaround time"
    },
    {
      name: "Additional Revisions",
      price: "From R500 per round",
      description: "Extra revision rounds beyond package inclusion"
    },
    {
      name: "Source Files",
      price: "From R750",
      description: "Editable source files in preferred format"
    }
  ];

  const relatedServices = [
    {
      title: 'Print Media',
      description: 'Professional printing services for all your business needs, from business cards to large format printing.',
      href: '/pricing/print-design',
      anchor: 'Explore Print Services'
    },
    {
      title: 'Graphic Design',
      description: 'Custom graphic design solutions to enhance your brand identity and visual communication.',
      href: '/pricing/graphic-design',
      anchor: 'View Design Services'
    },
    {
      title: 'Social Media',
      description: 'Engaging social media design and management to boost your online presence.',
      href: '/pricing/social-media',
      anchor: 'Discover Social Media Services'
    }
  ];

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'Marketing Materials', href: '/pricing/marketing-materials' }
  ];

  const faqs = serviceFAQs['marketing-materials'];

  const packages = [
    ...presentationPackages,
    ...emailTemplatePackages,
    ...packagingPackages,
    ...vehiclePackages,
    ...signagePackages
  ];

  const materialTypes = [
    {
      name: "Presentations",
      icon: <FaCheck className="w-6 h-6 text-[#FFD700]" />
    },
    {
      name: "Email Templates",
      icon: <FaCheck className="w-6 h-6 text-[#FFD700]" />
    },
    {
      name: "Packaging",
      icon: <FaCheck className="w-6 h-6 text-[#FFD700]" />
    },
    {
      name: "Vehicle Wraps",
      icon: <FaCheck className="w-6 h-6 text-[#FFD700]" />
    },
    {
      name: "Signage",
      icon: <FaCheck className="w-6 h-6 text-[#FFD700]" />
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white py-20 px-4 sm:px-6 lg:px-8">
      {/* Schema.org scripts */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "Marketing Materials Design Services",
            "description": "Professional marketing materials design services including brochures, flyers, business cards, and more.",
            "provider": {
              "@type": "Organization",
              "name": "WL Creationx"
            },
            "areaServed": "South Africa",
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "Marketing Materials Design Services",
              "itemListElement": [
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Basic Marketing Package",
                    "description": "Essential marketing materials for small businesses"
                  },
                  "price": "4980.00",
                  "priceCurrency": "ZAR"
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Professional Marketing Package",
                    "description": "Comprehensive marketing materials for growing businesses"
                  },
                  "price": "7890.00",
                  "priceCurrency": "ZAR"
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Premium Marketing Package",
                    "description": "Premium marketing materials for established businesses"
                  },
                  "price": "12980.00",
                  "priceCurrency": "ZAR"
                }
              ]
            }
          })
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": serviceFAQs['marketing-materials']?.map(faq => ({
              "@type": "Question",
              "name": faq.question,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer
              }
            })) || []
          })
        }}
      />
      {/* Breadcrumb */}
      <Breadcrumb items={breadcrumbItems} />
      
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">Marketing Materials</h1>
        <p className="text-xl text-neutral-300 max-w-3xl mx-auto">
          Professional marketing materials that help your business stand out
        </p>
      </div>

      {/* Marketing Packages */}
      <div className="max-w-7xl mx-auto mb-16">
        <h2 className="text-2xl font-bold text-[#FFD700] text-center mb-8">Marketing Packages</h2>
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

      {/* Material Types */}
      <div className="max-w-7xl mx-auto mb-16">
        <h2 className="text-2xl font-bold text-[#FFD700] text-center mb-8">Available Materials</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {materialTypes.map((material, index) => (
            <motion.div
              key={material.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-zinc-900 rounded-lg p-6 text-center border border-[#FFD700]/20"
            >
              <div className="flex items-center justify-center mb-4">
                {material.icon}
              </div>
              <h3 className="text-lg font-bold text-[#FFD700]">{material.name}</h3>
            </motion.div>
          ))}
        </div>
      </div>

      {/* FAQ Section */}
      <div className="mt-20">
        <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
        <div className="max-w-3xl mx-auto">
          {serviceFAQs['marketing-materials']?.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="mb-6 p-6 bg-zinc-900 rounded-lg"
            >
              <h3 className="text-xl font-semibold mb-2 text-[#FFD700]">{faq.question}</h3>
              <p className="text-gray-300">{faq.answer}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Related Services */}
      <RelatedServices
        currentService="Marketing Materials"
        services={[
          { 
            href: '/pricing/graphic-design',
            anchor: 'Graphic Design',
            title: 'Graphic Design Services',
            description: 'Professional graphic design services for all your marketing needs'
          },
          { 
            href: '/pricing/print-design',
            anchor: 'Print Design',
            title: 'Print Design Services',
            description: 'Expert print design services for your marketing materials'
          },
          { 
            href: '/pricing/packaging-design',
            anchor: 'Packaging Design',
            title: 'Packaging Design Services',
            description: 'Create impactful product packaging that enhances your marketing'
          }
        ]}
      />

      {/* CTA Section */}
      <section className="py-20 bg-black">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Create Your Marketing Materials?
          </h2>
          <p className="text-xl text-neutral-300 mb-8">
            Contact us for a free consultation and let's create materials that make an impact
          </p>
          <GetInTouchButton variant="primary" text="Start Your Project" className="text-lg" />
        </div>
      </section>
    </div>
  );
};

export default MarketingMaterialsPage;
