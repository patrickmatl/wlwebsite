'use client';

import { motion } from 'framer-motion';
import { FaPrint, FaPalette, FaImages, FaCheck } from 'react-icons/fa';
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
      description: 'Comprehensive marketing material design services.',
      href: 'http://localhost:3001/pricing/marketing-materials-pretoria',
      anchor: 'Explore Marketing Materials'
    },
    {
      title: 'Graphic Design',
      description: 'Creative graphic design for all your needs.',
      href: 'http://localhost:3001/pricing/graphic-design-pretoria',
      anchor: 'View Graphic Design Services'
    },
    {
      title: 'Packaging Design',
      description: 'Custom packaging solutions that make your products stand out.',
      href: 'http://localhost:3001/pricing/marketing-materials-pretoria#packaging',
      anchor: 'Discover Packaging Solutions'
    },
    {
      title: 'Contact Us',
      description: 'Get in touch for print design quotes and advice.',
      href: 'http://localhost:3001/get-in-touch-pretoria',
      anchor: 'Contact Us'
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white py-20 px-4 sm:px-6 lg:px-8">
      {/* BEGIN: Visually Hidden SEO Headings H1-H5 for Print Design Pretoria */}
      <section style={{position:'absolute',left:'-9999px',top:'auto',width:'1px',height:'1px',overflow:'hidden'}} aria-hidden="true">
        <h1>Print Design Services in Pretoria | WL CreationX</h1>
        <p>WL CreationX offers expert print design services for Pretoria businesses, delivering high-quality business cards, letterheads, brochures, banners, flyers, and more. Our experienced designers ensure every print asset is visually striking and professionally crafted to elevate your brand in the competitive Pretoria market.</p>
        <p>We combine creative vision with technical precision, using the latest design software and print techniques to produce materials that stand out. Our Pretoria clients benefit from custom solutions tailored to their brand, audience, and marketing objectives.</p>
        <h2>Pretoria’s Leading Print Design Agency</h2>
        <p>As Pretoria’s leading print design agency, WL CreationX is known for its attention to detail, fast turnaround, and commitment to quality. We manage the entire print process, from initial concept to final delivery, ensuring your materials meet the highest standards.</p>
        <p>Our team collaborates closely with Pretoria businesses to understand their unique needs, offering guidance on paper stocks, finishes, and print specifications for the best possible results. We help you make a lasting impression with every printed piece.</p>
        <h3>Business Essentials, Marketing Materials & Large Format Printing</h3>
        <p>We provide comprehensive print design services for business essentials (business cards, letterheads), marketing materials (brochures, flyers), and large format items (banners, signage). Each category is designed to boost your brand’s visibility and credibility in Pretoria.</p>
        <p>Our designers ensure consistency across all print and digital touchpoints, so your Pretoria business presents a unified, professional image to clients and partners alike.</p>
        <h4>Affordable Print Design Packages in Pretoria</h4>
        <p>Our print design packages are competitively priced to suit Pretoria businesses of all sizes, from startups to established enterprises. We offer transparent pricing, flexible options, and no hidden fees, making professional print design accessible to everyone.</p>
        <p>With WL CreationX, you receive value-driven solutions that maximize your marketing budget and deliver measurable results in the Pretoria marketplace.</p>
        <h5>Why Choose WL CreationX for Print Design in Pretoria?</h5>
        <p>WL CreationX is trusted by Pretoria businesses for our creativity, reliability, and dedication to client satisfaction. Our team brings years of experience and a passion for design to every project, ensuring your print materials exceed expectations.</p>
        <p>We prioritize open communication, fast delivery, and ongoing support, making us the go-to print design partner for Pretoria companies seeking to grow their brand and reach new audiences.</p>
      </section>
      {/* END: Visually Hidden SEO Headings H1-H5 for Print Design Pretoria */}
      {/* BEGIN: Visually Hidden Print Design FAQ for Pretoria */}
      <section style={{position:'absolute',left:'-9999px',top:'auto',width:'1px',height:'1px',overflow:'hidden'}} aria-hidden="true">
        <h2>Frequently Asked Questions about Print Design in Pretoria</h2>
        <div><h3>What print design services do you offer?</h3><p>We offer a full spectrum of print design services for Pretoria businesses, including business cards, letterheads, brochures, flyers, banners, and large format signage. Our team works with you to create custom designs that reflect your brand and marketing goals.</p><p>Whether you need a single item or a complete set of print materials, we ensure every design is optimized for quality, clarity, and impact in the Pretoria market.</p></div>
        <div><h3>How much does print design cost in Pretoria?</h3><p>WL CreationX provides transparent, competitive pricing for print design services in Pretoria. Costs vary depending on the type and quantity of materials, complexity of design, and any special finishes or requirements.</p><p>We offer detailed quotes and package options to suit all budgets, ensuring Pretoria businesses receive professional results without overspending.</p></div>
        <div><h3>Can you manage the printing process?</h3><p>Yes, we offer end-to-end print management for Pretoria clients, coordinating with trusted print partners to ensure your materials are produced to the highest standards. Our team handles file preparation, proofing, and quality checks for a seamless experience.</p><p>This service saves you time and ensures your print assets are delivered on schedule and exactly as envisioned.</p></div>
        <div><h3>Do you provide source files for print designs?</h3><p>Absolutely. All final print designs include editable source files, giving Pretoria clients full control for future updates or reprints. We use industry-standard formats compatible with major print shops and digital platforms.</p><p>Having access to source files ensures your brand remains consistent and adaptable as your Pretoria business grows.</p></div>
        <div><h3>Can you design for both small and large format printing?</h3><p>Yes, we specialize in both small format (business cards, flyers) and large format (banners, signage) print design for Pretoria businesses. Our team understands the technical requirements of each format and delivers designs that look great at any size.</p><p>We also advise on material selection, resolution, and finishing options to ensure the best results for every print project.</p></div>
        <div><h3>How long does a print design project take?</h3><p>Most Pretoria print design projects are completed within 2–7 days, depending on complexity and revisions required. We provide clear timelines and keep you updated throughout the process for complete peace of mind.</p><p>For urgent needs, we offer rush services to ensure your materials are ready for important events or campaigns.</p></div>
        <div><h3>How many revisions are included?</h3><p>Revision rounds vary by package, but all Pretoria clients receive at least 2–3 rounds to ensure satisfaction. We work collaboratively to refine each design until it meets your expectations and business needs.</p><p>Additional revisions can be arranged for a small fee, providing flexibility and control over the final product.</p></div>
        <div><h3>Do you design custom print items?</h3><p>Yes, we offer fully custom print design services for unique items such as specialty packaging, event materials, and branded merchandise for Pretoria businesses. Our designers enjoy creative challenges and bring your ideas to life with originality and flair.</p><p>We welcome custom projects and provide expert advice to ensure your print assets stand out in the Pretoria marketplace.</p></div>
        <div><h3>Can you update my existing print materials?</h3><p>We can refresh or update your current print materials to reflect new branding, messaging, or design trends. Our Pretoria team works efficiently to ensure a seamless transition and maintain brand consistency across all your assets.</p><p>Updating your print materials is a cost-effective way to keep your brand relevant and competitive in Pretoria.</p></div>
        <div><h3>Which areas of Pretoria do you serve?</h3><p>We serve all of Pretoria and surrounding regions, including Centurion, Hatfield, Brooklyn, Pretoria East, and more. Our digital-first approach allows us to work with clients remotely, providing the same high level of service wherever your business is based.</p><p>No matter your location in Pretoria, WL CreationX is ready to help you elevate your print design and marketing presence.</p></div>
      </section>
      {/* END: Visually Hidden Print Design FAQ for Pretoria */}
      {/* FAQPage Structured Data for Print Design Pretoria */}
      <script type="application/ld+json" suppressHydrationWarning>
        {`
        {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "What types of print materials do you design?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "We design business cards, letterheads, brochures, flyers, banners, posters, and more for Pretoria businesses. Our team ensures every print material is tailored to your brand and marketing objectives."
              }
            },
            {
              "@type": "Question",
              "name": "How much does print design cost in Pretoria?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Our print design packages start from R350, with pricing based on the type of material, design complexity, and additional services. We provide transparent quotes and flexible options for Pretoria clients."
              }
            },
            {
              "@type": "Question",
              "name": "Can you provide print-ready files?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes, all designs include high-resolution, print-ready files compatible with local Pretoria printers or national print shops. We also offer guidance on paper types, finishes, and print specifications."
              }
            },
            {
              "@type": "Question",
              "name": "Do you offer rush print design services?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes, we provide rush services for urgent print design needs in Pretoria, delivering quality results within tight deadlines. Contact us for availability and turnaround times on expedited projects."
              }
            },
            {
              "@type": "Question",
              "name": "Can you help with content and copywriting?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Absolutely! We assist Pretoria clients with content creation, copywriting, and layout to ensure your print materials are clear and persuasive. Our team works collaboratively to deliver compelling messaging and attractive design."
              }
            },
            {
              "@type": "Question",
              "name": "Do you design for large format printing?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes, we specialize in large format print design, including banners, signage, and posters for Pretoria businesses and events. Our designs are optimized for clarity and impact at any scale."
              }
            },
            {
              "@type": "Question",
              "name": "Can you match my existing brand guidelines?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "We work with your existing brand guidelines to ensure consistency across all print materials for your Pretoria business. If you need new guidelines, we can help establish a cohesive visual identity."
              }
            },
            {
              "@type": "Question",
              "name": "Do you offer eco-friendly print design solutions?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "We support Pretoria clients in choosing sustainable papers and inks, and design for minimal waste and environmental impact. Ask us about eco-friendly print options for your next project."
              }
            },
            {
              "@type": "Question",
              "name": "Can you update or redesign my old print materials?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "We refresh and modernize outdated print materials for Pretoria businesses, bringing your brand up to date with current trends. Our redesigns improve both aesthetics and effectiveness."
              }
            },
            {
              "@type": "Question",
              "name": "Which areas of Pretoria do you serve?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "We serve all of Pretoria and surrounding regions, including Centurion, Hatfield, Brooklyn, Pretoria East, and more. Remote consultations and digital deliveries are available for your convenience."
              }
            }
          ]
        }
        `}
      </script>
      {/* END: FAQPage Structured Data for Print Design Pretoria */}
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
            {serviceFAQs['print-design']?.map((faq, index) => (
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
