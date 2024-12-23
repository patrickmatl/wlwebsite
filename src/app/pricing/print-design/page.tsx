'use client';

import { motion } from 'framer-motion';
import { FaPrint, FaPalette, FaImages, FaCheck } from 'react-icons/fa';
import Breadcrumb from '@/components/Breadcrumb';
import RelatedServices from '@/components/RelatedServices';
import GetInTouchButton from '@/components/GetInTouchButton';
import { serviceFAQs } from '@/data/serviceFAQs';

const PrintDesignPage = () => {
  const categories = [
    {
      name: "Business Essentials",
      icon: <FaPalette className="w-8 h-8 text-[#FFD700]" />,
      items: [
        {
          name: "Business Cards",
          price: "From R450",
          description: "Make a lasting first impression with our premium business cards. Choose from various finishes including matte, gloss, or spot UV coating.",
          specifications: [
            "Size: Standard 90x50mm or Custom",
            "Paper: 350gsm Premium Stock",
            "Finishing Options: Matte, Gloss, Spot UV",
            "Turnaround: 3-5 Business Days"
          ],
          features: [
            "Premium Quality Design",
            "Multiple Design Options",
            "Print-Ready Files",
            "High-Resolution Output",
            "Choice of Premium Finishes",
            "Double-Sided Options Available",
            "Rounded Corners Option",
            "Embossing Available",
            "Full Color CMYK Printing",
            "Bleeds & Crop Marks",
            "2 Revision Rounds",
            "Source Files Included"
          ]
        },
        {
          name: "Letterheads",
          price: "From R350",
          description: "Professional letterhead design that maintains your brand consistency across all business communications.",
          specifications: [
            "Size: A4 (210x297mm)",
            "Paper: 120gsm Premium Bond",
            "Format: Print & Digital",
            "Turnaround: 2-3 Business Days"
          ],
          features: [
            "Professional Layout",
            "Brand Integration",
            "Digital & Print Formats",
            "MS Word Template",
            "PDF Format",
            "Editable Design",
            "Header & Footer Design",
            "Contact Information Layout",
            "Multiple Color Variations",
            "Print Specifications",
            "2 Revision Rounds",
            "Source Files Included"
          ]
        }
      ]
    },
    {
      name: "Marketing Materials",
      icon: <FaImages className="w-8 h-8 text-[#FFD700]" />,
      items: [
        {
          name: "Brochures",
          price: "From R850",
          description: "Eye-catching brochure designs that effectively communicate your message and showcase your products or services.",
          specifications: [
            "Size: A4/A5/Custom",
            "Paper: 170gsm Art Paper",
            "Fold Options: Bi-fold/Tri-fold",
            "Turnaround: 4-6 Business Days"
          ],
          features: [
            "Custom Design",
            "Multiple Fold Options",
            "Professional Layout",
            "High-Quality Images",
            "Content Organization",
            "Infographic Design",
            "Photo Editing",
            "Brand Guidelines Compliance",
            "Print-Ready Files",
            "Digital Version",
            "2 Revision Rounds",
            "Source Files Included"
          ]
        },
        {
          name: "Flyers",
          price: "From R550",
          description: "Impactful flyer designs that grab attention and deliver your message effectively.",
          specifications: [
            "Size: A6/A5/A4",
            "Paper: 128gsm Art Paper",
            "Print: Single/Double Sided",
            "Turnaround: 2-3 Business Days"
          ],
          features: [
            "Eye-Catching Design",
            "Multiple Size Options",
            "High-Resolution Graphics",
            "Custom Illustrations",
            "QR Code Integration",
            "Call-to-Action Design",
            "Print-Ready Format",
            "Digital Version",
            "Social Media Formats",
            "2 Revision Rounds",
            "Source Files Included",
            "Quick Turnaround"
          ]
        }
      ]
    },
    {
      name: "Large Format",
      icon: <FaPrint className="w-8 h-8 text-[#FFD700]" />,
      items: [
        {
          name: "Banners",
          price: "From R750",
          description: "High-impact banner designs for indoor and outdoor advertising that command attention.",
          specifications: [
            "Size: Custom Dimensions",
            "Material: PVC/Mesh/Fabric",
            "Print: Full Color CMYK",
            "Turnaround: 3-5 Business Days"
          ],
          features: [
            "Custom Sizes Available",
            "Indoor/Outdoor Options",
            "High-Resolution Design",
            "Weather-Resistant Options",
            "Reinforced Edges",
            "Grommet Placement",
            "Stand Design Options",
            "Material Recommendations",
            "Print-Ready Files",
            "Installation Guidelines",
            "2 Revision Rounds",
            "Source Files Included"
          ]
        }
      ]
    }
  ];

  const additionalServices = [
    {
      name: "Rush Service",
      price: "+50% of base price",
      description: "24-48 hour turnaround time",
      icon: <FaPrint className="w-6 h-6 text-[#FFD700]" />
    },
    {
      name: "Extra Revisions",
      price: "R250 per round",
      description: "Additional design revision rounds",
      icon: <FaCheck className="w-6 h-6 text-[#FFD700]" />
    }
  ];

  const relatedServices = [
    {
      title: 'Marketing Materials',
      description: 'Custom marketing materials to promote your brand effectively.',
      href: '/pricing/marketing-materials',
      anchor: 'Explore Marketing Materials'
    },
    {
      title: 'Graphic Design',
      description: 'Professional graphic design services for your brand identity.',
      href: '/pricing/graphic-design',
      anchor: 'View Graphic Design Services'
    },
    {
      title: 'Packaging Design',
      description: 'Custom packaging solutions that make your products stand out.',
      href: '/pricing/marketing-materials#packaging',
      anchor: 'Discover Packaging Solutions'
    }
  ];

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'Print Design', href: '/pricing/print-design' }
  ];

  return (
    <div className="min-h-screen bg-black text-white py-20 px-4 sm:px-6 lg:px-8">
      {/* Breadcrumb */}
      <Breadcrumb items={breadcrumbItems} />
      
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">Print Design Services</h1>
        <p className="text-xl text-neutral-300 max-w-3xl mx-auto">
          Create stunning print materials that make a lasting impression
        </p>
      </div>

      {/* Categories */}
      {categories.map((category, categoryIndex) => (
        <div key={category.name} className="max-w-7xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-4 mb-8">
            {category.icon}
            <h2 className="text-2xl font-bold text-[#FFD700]">{category.name}</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {category.items.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: (categoryIndex + index) * 0.1 }}
                className="bg-zinc-900 rounded-lg p-8 border border-[#FFD700]/20 hover:border-[#FFD700]/40 transition-all"
              >
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-[#FFD700] mb-2">{item.name}</h3>
                  <p className="text-3xl font-bold">{item.price}</p>
                  <p className="text-neutral-300">{item.description}</p>
                </div>

                <h4 className="text-lg font-bold text-[#FFD700] mb-2">Specifications:</h4>
                <ul className="space-y-2 mb-8">
                  {item.specifications.map((specification, i) => (
                    <li key={i} className="text-neutral-300">{specification}</li>
                  ))}
                </ul>

                <h4 className="text-lg font-bold text-[#FFD700] mb-2">Features:</h4>
                <ul className="space-y-3 mb-8">
                  {item.features.map((feature, i) => (
                    <li key={i} className="flex items-center text-neutral-300">
                      <FaCheck className="text-[#FFD700] mr-2 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <button className="w-full py-3 px-4 bg-[#FFD700] text-black font-semibold rounded hover:bg-[#FFE44D] transition-colors">
                  Order Now
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      ))}

      {/* Additional Services */}
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold text-[#FFD700] text-center mb-8">Additional Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {additionalServices.map((service, index) => (
            <motion.div
              key={service.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-zinc-900 rounded-lg p-6 border border-[#FFD700]/20"
            >
              <div className="flex items-center gap-4 mb-4">
                {service.icon}
                <h3 className="text-xl font-bold text-[#FFD700]">{service.name}</h3>
              </div>
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
            {serviceFAQs['print-design'].map((faq: { question: string; answer: string }, index: number) => (
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
        currentService="Print Design"
        services={relatedServices}
      />

      {/* CTA Section */}
      <section className="py-20 bg-black">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Start Your Print Project?
          </h2>
          <p className="text-xl text-neutral-300 mb-8">
            Contact us for a custom quote tailored to your specific needs
          </p>
          <GetInTouchButton variant="primary" text="Get Started" className="text-lg" />
        </div>
      </section>
    </div>
  );
};

export default PrintDesignPage;
