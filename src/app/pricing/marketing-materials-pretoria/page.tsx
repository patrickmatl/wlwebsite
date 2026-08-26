'use client';

import Breadcrumb from '@/components/Breadcrumb';
import PackageCard from '@/components/PackageCard';
import RelatedServices from '@/components/RelatedServices';
import GetInTouchButton from '@/components/GetInTouchButton';
import Link from 'next/link';
import GetStartedButton from '@/components/GetStartedButton';

export default function MarketingMaterialsPage() {
  const packages = [
    {
      name: 'Essential Materials',
      price: 'R3,850',
      period: '',
      features: [
        'Business Card Design',
        'Letterhead Design',
        'Email Signature',
        'Social Media Templates',
        'Basic Brand Guidelines',
        'Source Files',
        '2 Revision Rounds',
        '1 Week Delivery'
      ],
      popular: false
    },
    {
      name: 'Professional Materials',
      price: 'R7,850',
      period: '',
      features: [
        'Business Card Design',
        'Letterhead & Envelope',
        'Email Signature',
        'Social Media Kit',
        'Presentation Template',
        'Brochure Design',
        'Brand Guidelines',
        'Source Files',
        '3 Revision Rounds',
        '2 Weeks Delivery'
      ],
      popular: true
    },
    {
      name: 'Enterprise Materials',
      price: 'R15,850',
      period: '',
      features: [
        'Complete Stationery Set',
        'Social Media Kit',
        'Presentation Templates',
        'Brochure & Flyers',
        'Banner Designs',
        'Vehicle Branding',
        'Signage Design',
        'Brand Style Guide',
        'All Source Files',
        'Unlimited Revisions'
      ],
      popular: false
    }
  ];

  const additionalServices = [
    {
      name: 'Single Item Design',
      price: 'From R850',
      description: 'Custom design for a single marketing item'
    },
    {
      name: 'Print Management',
      price: 'From R1,850',
      description: 'Professional printing coordination and quality control'
    }
  ];

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4 md:p-24">
      {/* BEGIN: FAQPage Structured Data for Marketing Materials Pretoria */}
      <script type="application/ld+json" suppressHydrationWarning>
        {`
        {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "What marketing materials do you design?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "We design business cards, letterheads, brochures, banners, signage, presentations, and more for Pretoria businesses."
              }
            },
            {
              "@type": "Question",
              "name": "How much do marketing materials cost in Pretoria?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "WL CreationX offers packages starting from R3,850. Pricing depends on the items, complexity, and quantity needed."
              }
            },
            {
              "@type": "Question",
              "name": "Can you help with print management?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes, we offer print management and quality control for Pretoria clients to ensure professional results."
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
              "name": "Can you design for both print and digital?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Absolutely! We create marketing materials for print and digital use, including social media and presentations."
              }
            },
            {
              "@type": "Question",
              "name": "How long does a marketing materials project take?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Most Pretoria projects are completed within 3–10 days, depending on the number of items and revisions."
              }
            },
            {
              "@type": "Question",
              "name": "How many revisions are included?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Revision rounds vary by package, but all Pretoria clients receive at least 2–3 rounds."
              }
            },
            {
              "@type": "Question",
              "name": "Do you design custom items?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes, we offer custom design for unique marketing materials to suit your Pretoria business needs."
              }
            },
            {
              "@type": "Question",
              "name": "Can you update my existing materials?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes, we can refresh or update your current marketing materials for Pretoria businesses."
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
      {/* END: FAQPage Structured Data for Marketing Materials Pretoria */}
      <div className="z-10 w-full max-w-5xl items-center justify-between text-sm">
        <Breadcrumb items={[
          { label: 'Services & Pricing', href: '/pricing' },
          { label: 'Marketing Materials', href: '/pricing/marketing-materials-pretoria' }
        ]} />
        
        <h1 className="text-4xl md:text-6xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-[#FFD700] via-[#FFC000] to-[#FFB000] mt-8 mb-4">
          Marketing Materials
        </h1>
        
        <p className="text-center text-xl mb-12 text-white/80">
          Professional marketing materials that help your business make a lasting impression.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {packages.map((pkg) => (
            <PackageCard key={pkg.name} {...pkg} service="Marketing materials" />
          ))}
        </div>

        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8 text-[#FFD700]">Additional Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {additionalServices.map((service) => (
              <div
                key={service.name}
                className="bg-zinc-900/50 backdrop-blur-sm rounded-xl p-6 border border-[#FFD700]/20 hover:border-[#FFD700]/40 transition-colors"
              >
                <h3 className="text-xl font-bold text-white mb-2">{service.name}</h3>
                <p className="text-[#FFD700] font-bold mb-2">{service.price}</p>
                <p className="text-white/60">{service.description}</p>
                <GetStartedButton
                  packageName={service.name}
                  packagePrice={service.price}
                  service="Marketing materials"
                  label="Enquire"
                  className="mt-4 w-full"
                />
              </div>
            ))}
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8 text-[#FFD700]">Our Design Process</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-zinc-900/50 backdrop-blur-sm rounded-xl p-6">
              <h3 className="text-xl font-bold text-white mb-4">Discovery & Design</h3>
              <ul className="space-y-2 text-white/80">
                <li>• Brand Analysis</li>
                <li>• Concept Development</li>
                <li>• Design Creation</li>
                <li>• Client Review</li>
              </ul>
            </div>
            <div className="bg-zinc-900/50 backdrop-blur-sm rounded-xl p-6">
              <h3 className="text-xl font-bold text-white mb-4">Refinement & Delivery</h3>
              <ul className="space-y-2 text-white/80">
                <li>• Revisions</li>
                <li>• Final Approval</li>
                <li>• File Preparation</li>
                <li>• Quality Control</li>
              </ul>
            </div>
          </div>
        </section>

        <RelatedServices
          currentService="Marketing Materials"
          services={[
            {
              title: 'Content Marketing',
              description: 'Engage your audience with high-quality, SEO-optimized content.',
              href: '/pricing/content-marketing-pretoria',
              anchor: 'View Content Marketing'
            },
            {
              title: 'Email Marketing',
              description: 'Build lasting relationships with your audience through targeted campaigns.',
              href: '/pricing/email-marketing-pretoria',
              anchor: 'View Email Marketing'
            }
          ]}
        />

        <div className="text-center mt-12">
          <GetInTouchButton />
        </div>
        {/* Contextual link to homepage with varied phrasing */}
        <div className="max-w-4xl mx-auto px-4 text-center mt-6">
          <p className="text-neutral-400 text-sm">
            Learn more about our <Link href="/" className="text-[#FFD700] hover:underline">Pretoria marketing design studio</Link> on the homepage.
          </p>
        </div>
      </div>
    
      {/* Previously hidden off-screen; now visible to every visitor */}
      <section className="mx-auto max-w-4xl px-4 py-12 prose prose-invert prose-headings:font-syne prose-headings:text-[#FFD700] prose-p:text-neutral-300 prose-li:text-neutral-300 prose-strong:text-white">
        <h2>Marketing Materials Design in Pretoria | WL CreationX</h2>
        <p>WL CreationX specializes in designing high-quality marketing materials for businesses in Pretoria, ranging from business cards and brochures to banners, stationery, and digital assets. Our expert design team ensures that every piece of marketing collateral is aligned with your brand identity, helping you make a memorable impression in a competitive marketplace.</p>
        <p>By leveraging the latest design trends and print technologies, we provide Pretoria companies with marketing materials that not only look stunning but also drive engagement and conversions. Our solutions are tailored to suit the unique needs of startups, SMEs, and large enterprises across Pretoria and surrounding areas.</p>
        <h3>Pretoria’s Leading Marketing Materials Agency</h3>
        <p>As Pretoria’s top marketing materials agency, WL CreationX delivers creative excellence and reliable service on every project. Our team works closely with clients to understand their goals, ensuring that each design not only captures attention but also communicates your brand’s message effectively.</p>
        <p>We offer end-to-end solutions, from concept development to print management, making us the preferred partner for Pretoria businesses seeking impactful marketing materials. Our commitment to quality and client satisfaction sets us apart in the Pretoria design industry.</p>
        <h4>Business Collateral & Print Design for Pretoria Companies</h4>
        <p>Our comprehensive business collateral services include the design of business cards, letterheads, flyers, presentations, signage, and more—each crafted to enhance your brand’s visibility and credibility in Pretoria. We understand the importance of cohesive branding across all touchpoints and ensure your materials reflect professionalism and consistency.</p>
        <p>Whether you need a single item or a full suite of print and digital collateral, our Pretoria-based team delivers results that help your business stand out. We also offer guidance on material selection, finishes, and print specifications to maximize the impact of your marketing investment.</p>
        <h5>Affordable Marketing Materials Packages in Pretoria</h5>
        <p>Our marketing materials packages are designed to be both affordable and comprehensive, catering to Pretoria SMEs, corporates, and entrepreneurs. Clients can choose from essential to enterprise packages, each offering transparent pricing, fast turnaround, and a wide range of design options.</p>
        <p>We believe that every Pretoria business deserves access to professional marketing materials, regardless of size or budget. With WL CreationX, you get value-driven solutions that boost your brand without breaking the bank.</p>
        <h6>Why Choose WL CreationX for Marketing Materials in Pretoria?</h6>
        <p>WL CreationX is recognized for local expertise, creative innovation, and dependable service. Our Pretoria team combines years of experience with a passion for design, ensuring every project exceeds expectations and delivers measurable results.</p>
        <p>From initial consultation to final delivery, we prioritize clear communication, timely execution, and ongoing support. Join the many Pretoria businesses that trust WL CreationX as their go-to partner for marketing materials and brand growth.</p>
      </section>
      {/* Previously hidden off-screen; now visible to every visitor */}
      <section className="mx-auto max-w-4xl px-4 py-12 prose prose-invert prose-headings:font-syne prose-headings:text-[#FFD700] prose-p:text-neutral-300 prose-li:text-neutral-300 prose-strong:text-white">
        <h3>Frequently Asked Questions about Marketing Materials in Pretoria</h3>
        <div><h4>What marketing materials do you design?</h4><p>We design a comprehensive range of marketing materials for Pretoria businesses, including business cards, letterheads, brochures, banners, signage, presentations, and digital assets. Our team ensures each item is custom-crafted to match your brand and marketing objectives.</p><p>Whether you need a single piece or a full suite of collateral, we have the expertise to deliver high-impact designs that resonate with your target audience and enhance your brand’s visibility in Pretoria.</p></div>
        <div><h4>How much do marketing materials cost in Pretoria?</h4><p>WL CreationX offers marketing material packages starting from R3,850, with pricing tailored to the specific items, complexity, and quantity required. We provide transparent quotes and detailed breakdowns so you know exactly what you’re getting.</p><p>Our packages are designed to deliver exceptional value for Pretoria businesses of all sizes, ensuring you receive professional-quality materials without hidden fees or unexpected costs.</p></div>
        <div><h4>Can you help with print management?</h4><p>Yes, we provide end-to-end print management and quality control for Pretoria clients, coordinating with trusted printers to ensure your materials are produced to the highest standards. Our team oversees every step, from file preparation to final delivery.</p><p>This comprehensive service saves you time, reduces errors, and guarantees professional results, allowing you to focus on your business while we handle the logistics.</p></div>
        <div><h4>Do you provide source files?</h4><p>Absolutely. All final designs include editable source files for Pretoria clients, giving you full control and flexibility for future updates or reprints. We use industry-standard formats compatible with major print shops and digital platforms.</p><p>Having access to source files ensures your brand assets remain consistent and easily adaptable as your Pretoria business evolves.</p></div>
        <div><h4>Can you design for both print and digital?</h4><p>Yes, we create marketing materials optimized for both print and digital use, including social media graphics, presentations, and email templates. Our Pretoria designers understand the nuances of each medium, ensuring your brand looks great everywhere.</p><p>We also provide guidance on file formats, color profiles, and resolution to guarantee the best results across all channels.</p></div>
        <div><h4>How long does a marketing materials project take?</h4><p>Most Pretoria marketing materials projects are completed within 3–10 days, depending on the number of items, complexity, and revision rounds. We prioritize efficiency without compromising quality, keeping you informed at every stage.</p><p>For urgent needs, we offer rush services to ensure your materials are delivered on time for important events or campaigns.</p></div>
        <div><h4>How many revisions are included?</h4><p>Revision rounds vary by package, but all Pretoria clients receive at least 2–3 rounds of revisions to ensure complete satisfaction. We believe in a collaborative process, working closely with you to refine each design until it meets your expectations.</p><p>Additional revisions can be arranged if needed, providing flexibility and peace of mind for your Pretoria business.</p></div>
        <div><h4>Do you design custom items?</h4><p>Yes, we offer fully custom design services for unique marketing materials tailored to your Pretoria business needs. From specialty packaging to event signage, our team can bring any vision to life.</p><p>We welcome creative challenges and enjoy collaborating with Pretoria clients on one-of-a-kind projects that make a statement.</p></div>
        <div><h4>Can you update my existing materials?</h4><p>We can refresh or update your current marketing materials to reflect new branding, messaging, or design trends. Our Pretoria team works efficiently to ensure a seamless transition and consistent brand presence across all touchpoints.</p><p>Updating your materials is a cost-effective way to keep your brand relevant and competitive in the Pretoria market.</p></div>
        <div><h4>Which areas of Pretoria do you serve?</h4><p>We serve all of Pretoria and surrounding regions, including Centurion, Hatfield, Brooklyn, Pretoria East, and more. Our digital-first approach allows us to work with clients remotely, providing the same high level of service and support regardless of location.</p><p>No matter where your business is based in Pretoria, WL CreationX is ready to help you elevate your marketing materials and brand presence.</p></div>
      </section>
    </main>
  );
}
