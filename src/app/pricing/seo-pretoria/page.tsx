'use client';

import PackageCard from '@/components/PackageCard';
import RelatedServices from '@/components/RelatedServices';
import GetInTouchButton from '@/components/GetInTouchButton';
import Link from 'next/link';

export default function SEOPage() {
  const packages = [
    {
      name: 'Essential SEO',
      price: 'R4,850',
      period: '/month',
      features: [
        'Keyword Research & Analysis',
        'On-Page SEO Optimization',
        'Technical SEO Audit',
        'Content Optimization',
        'Monthly Performance Reports',
        'Google Analytics Setup',
        'Local SEO Setup',
        'Basic Link Building'
      ],
      popular: false
    },
    {
      name: 'Professional SEO',
      price: 'R8,850',
      period: '/month',
      features: [
        'Advanced Keyword Research',
        'Comprehensive On-Page SEO',
        'Technical SEO Implementation',
        'Content Strategy & Creation',
        'Link Building Campaign',
        'Local SEO Optimization',
        'Competitor Analysis',
        'Monthly Strategy Calls',
        'Advanced Analytics Setup',
        'Conversion Tracking'
      ],
      popular: true
    },
    {
      name: 'Enterprise SEO',
      price: 'R15,850',
      period: '/month',
      features: [
        'Custom SEO Strategy',
        'International SEO',
        'Advanced Technical SEO',
        'Premium Content Creation',
        'Authority Link Building',
        'Advanced Local SEO',
        'E-commerce Optimization',
        'Weekly Strategy Calls',
        'Custom Reporting Dashboard',
        'CRO Implementation',
        'Priority Support',
        'ROI Tracking'
      ],
      popular: false
    }
  ];

  const additionalServices = [
    {
      name: 'Technical SEO Audit',
      price: 'From R3,850',
      description: 'Comprehensive technical SEO analysis'
    },
    {
      name: 'Local SEO Setup',
      price: 'From R2,850',
      description: 'Local business optimization package'
    },
    {
      name: 'E-commerce SEO',
      price: 'From R5,850',
      description: 'E-commerce website optimization'
    },
    {
      name: 'Content Optimization',
      price: 'From R950',
      description: 'Per page content optimization'
    }
  ];

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4 md:p-24">
      
      {/* BEGIN: FAQPage Structured Data for SEO Pretoria */}
      <script type="application/ld+json" suppressHydrationWarning>
        {`
        {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "What is SEO and why is it important for Pretoria businesses?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "SEO (Search Engine Optimization) improves your website’s visibility on search engines like Google, helping Pretoria businesses attract more organic traffic. Higher rankings mean more potential customers find your products or services online, leading to increased leads and sales."
              }
            },
            {
              "@type": "Question",
              "name": "How long does it take to see SEO results?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "SEO is a long-term investment; most Pretoria clients see noticeable improvements within 3–6 months, depending on competition and website history. Ongoing optimization is essential for maintaining and growing your rankings over time."
              }
            },
            {
              "@type": "Question",
              "name": "What SEO services do you offer in Pretoria?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "We offer keyword research, on-page SEO, technical optimization, content creation, link building, local SEO, and more for Pretoria businesses. Our packages are tailored to your goals, industry, and target audience."
              }
            },
            {
              "@type": "Question",
              "name": "Do you guarantee first-page rankings?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "No ethical SEO agency can guarantee specific rankings, as search algorithms are constantly changing. However, we use proven strategies to maximize your chances of achieving top positions in Pretoria search results."
              }
            },
            {
              "@type": "Question",
              "name": "Can you help with local SEO in Pretoria?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes, we specialize in local SEO strategies to help Pretoria businesses appear in local search results and Google Maps. This includes optimizing your Google Business Profile, local citations, and location-specific content."
              }
            },
            {
              "@type": "Question",
              "name": "How do you measure SEO success?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "We track rankings, organic traffic, leads, and conversions for Pretoria clients using advanced analytics tools. Monthly reports keep you informed about progress and ROI."
              }
            },
            {
              "@type": "Question",
              "name": "Is SEO a one-time service?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "SEO is an ongoing process. Search engines and competitors are always evolving, so continuous optimization is required for Pretoria businesses to maintain top rankings. We offer monthly packages for sustained growth and success."
              }
            },
            {
              "@type": "Question",
              "name": "Can you optimize my existing website?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Absolutely! We audit and optimize existing websites for Pretoria clients, improving site structure, speed, content, and technical elements. This helps boost your rankings and user experience."
              }
            },
            {
              "@type": "Question",
              "name": "Do you work with all business sizes?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes, we provide SEO solutions for Pretoria startups, SMEs, and large enterprises across all industries. Our flexible packages ensure every business can benefit from effective SEO."
              }
            },
            {
              "@type": "Question",
              "name": "Which areas of Pretoria do you serve?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "We serve all of Pretoria and surrounding regions, including Centurion, Hatfield, Brooklyn, Pretoria East, and more. Remote consultations and digital reporting are available for your convenience."
              }
            }
          ]
        }
        `}
      </script>
      {/* END: FAQPage Structured Data for SEO Pretoria */}
      <div className="z-10 w-full max-w-5xl items-center justify-between text-sm">
        
        <h1 className="text-4xl md:text-6xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-[#FFD700] via-[#FFC000] to-[#FFB000] mt-8 mb-4">
          SEO Services in Pretoria
        </h1>
        
        <p className="text-center text-xl mb-12 text-white/80">
          Improve your search engine rankings and drive organic traffic with our comprehensive SEO services.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {packages.map((pkg) => (
            <PackageCard key={pkg.name} {...pkg} />
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
              </div>
            ))}
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8 text-[#FFD700]">Our SEO Process</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-zinc-900/50 backdrop-blur-sm rounded-xl p-6">
              <h3 className="text-xl font-bold text-white mb-4">Research & Analysis</h3>
              <ul className="space-y-2 text-white/60">
                <li>• Keyword research</li>
                <li>• Competitor analysis</li>
                <li>• Technical site audit</li>
                <li>• Content gap analysis</li>
              </ul>
            </div>
            <div className="bg-zinc-900/50 backdrop-blur-sm rounded-xl p-6">
              <h3 className="text-xl font-bold text-white mb-4">On-Page Optimization</h3>
              <ul className="space-y-2 text-white/60">
                <li>• Meta optimization</li>
                <li>• Content optimization</li>
                <li>• Internal linking</li>
                <li>• Schema markup</li>
              </ul>
            </div>
            <div className="bg-zinc-900/50 backdrop-blur-sm rounded-xl p-6">
              <h3 className="text-xl font-bold text-white mb-4">Technical SEO</h3>
              <ul className="space-y-2 text-white/60">
                <li>• Site speed optimization</li>
                <li>• Mobile optimization</li>
                <li>• Indexing optimization</li>
                <li>• Security implementation</li>
              </ul>
            </div>
            <div className="bg-zinc-900/50 backdrop-blur-sm rounded-xl p-6">
              <h3 className="text-xl font-bold text-white mb-4">Ongoing Optimization</h3>
              <ul className="space-y-2 text-white/60">
                <li>• Performance monitoring</li>
                <li>• Content updates</li>
                <li>• Link building</li>
                <li>• Strategy refinement</li>
              </ul>
            </div>
          </div>
        </section>

        <GetInTouchButton />
        
        <RelatedServices
          currentService="SEO Services"
          services={[
            {
              title: 'Content Marketing',
              description: 'Engage your audience with high-quality, SEO-optimized content.',
              href: '/pricing/content-marketing-pretoria',
              anchor: 'View Content Marketing'
            },
            {
              title: 'Google Ads',
              description: 'Drive targeted traffic and leads with Google Ads campaigns.',
              href: '/pricing/google-ads-pretoria',
              anchor: 'View Google Ads'
            },
            {
              title: 'Website Design',
              description: 'Create a modern, SEO-friendly website that converts.',
              href: '/pricing/website-design-pretoria',
              anchor: 'View Website Design'
            },
            {
              title: 'Contact Us',
              description: 'Get in touch for a custom SEO strategy.',
              href: '/get-in-touch-pretoria',
              anchor: 'Contact Us'
            }
          ]}
        />
        {/* Contextual link to homepage with varied phrasing */}
        <div className="max-w-4xl mx-auto px-4 text-center mt-6">
          <p className="text-neutral-400 text-sm">
            Learn more about our <Link href="/" className="text-[#FFD700] hover:underline">Pretoria SEO agency</Link> on the homepage.
          </p>
        </div>
      </div>
      {/* Page intro - visible to every visitor */}
      <section className="w-full mx-auto max-w-4xl px-4 py-16 prose prose-invert prose-headings:font-syne prose-headings:text-[#FFD700] prose-p:text-neutral-300 prose-li:text-neutral-300 prose-strong:text-white">
        <p>WL CreationX provides expert SEO services in Pretoria, helping businesses achieve higher search engine rankings and increased organic traffic. Our Pretoria SEO specialists use proven strategies tailored to your industry and target audience.</p>
        <p>From keyword research to technical optimization, we deliver comprehensive SEO solutions that drive real results for Pretoria companies of all sizes.</p>
        <h2>SEO Agency in Pretoria</h2>
        <p>As a Pretoria SEO agency in business since 2013, we combine data-driven insights with creative content strategies to boost your online visibility. Our team stays updated with the latest search engine algorithms and best practices to keep your website ahead of the competition.</p>
        <p>We work closely with Pretoria businesses to develop custom SEO campaigns that align with your goals and deliver measurable ROI.</p>
        <h3>Custom SEO Solutions for Pretoria Businesses</h3>
        <p>Our SEO packages in Pretoria are designed to meet the unique needs of local businesses, e-commerce stores, and enterprises. We offer on-page, off-page, and technical SEO to ensure your website performs at its best.</p>
        <p>Whether you need local SEO, content optimization, or advanced analytics, our Pretoria SEO experts have you covered from start to finish.</p>
        <h4>Affordable SEO Packages in Pretoria</h4>
        <p>Choose from essential, professional, or enterprise SEO packages, all with transparent pricing and no hidden fees. Our Pretoria clients benefit from flexible options, monthly reporting, and ongoing support.</p>
        <p>We believe in making high-quality SEO accessible to businesses of all sizes throughout Pretoria and beyond.</p>
        <h5>Why Choose WL CreationX for SEO in Pretoria?</h5>
        <p>Pretoria businesses choose WL CreationX for our results-driven approach, technical expertise, and commitment to client success. We focus on sustainable, ethical SEO aimed at improving rankings and generating more leads over time.</p>
        <p>We prioritize long-term growth, ethical SEO practices, and transparent communication with all our Pretoria clients.</p>
      </section>
      
      {/* FAQ - visible on-page, mirrors the FAQPage JSON-LD above */}
      <section className="w-full mx-auto max-w-4xl px-4 py-16 prose prose-invert prose-headings:font-syne prose-headings:text-[#FFD700] prose-p:text-neutral-300 prose-li:text-neutral-300 prose-strong:text-white">
        <h2>Frequently Asked Questions about SEO in Pretoria</h2>
        <div><h3>What is SEO and why is it important for Pretoria businesses?</h3><p>SEO (Search Engine Optimization) improves your website’s visibility on search engines like Google, helping Pretoria businesses attract more organic traffic.</p><p>Higher rankings mean more potential customers find your products or services online, leading to increased leads and sales.</p></div>
        <div><h3>How long does it take to see SEO results?</h3><p>SEO is a long-term investment; most Pretoria clients see noticeable improvements within 3–6 months, depending on competition and website history.</p><p>Ongoing optimization is essential for maintaining and growing your rankings over time.</p></div>
        <div><h3>What SEO services do you offer in Pretoria?</h3><p>We offer keyword research, on-page SEO, technical optimization, content creation, link building, local SEO, and more for Pretoria businesses.</p><p>Our packages are tailored to your goals, industry, and target audience.</p></div>
        <div><h3>Do you guarantee first-page rankings?</h3><p>No ethical SEO agency can guarantee specific rankings, as search algorithms are constantly changing.</p><p>However, we use proven strategies to maximize your chances of achieving top positions in Pretoria search results.</p></div>
        <div><h3>Can you help with local SEO in Pretoria?</h3><p>Yes, we specialize in local SEO strategies to help Pretoria businesses appear in local search results and Google Maps.</p><p>This includes optimizing your Google Business Profile, local citations, and location-specific content.</p></div>
        <div><h3>How do you measure SEO success?</h3><p>We track rankings, organic traffic, leads, and conversions for Pretoria clients using advanced analytics tools.</p><p>Monthly reports keep you informed about progress and ROI.</p></div>
        <div><h3>Is SEO a one-time service?</h3><p>SEO is an ongoing process. Search engines and competitors are always evolving, so continuous optimization is required for Pretoria businesses to maintain top rankings.</p><p>We offer monthly packages for sustained growth and success.</p></div>
        <div><h3>Can you optimize my existing website?</h3><p>Absolutely! We audit and optimize existing websites for Pretoria clients, improving site structure, speed, content, and technical elements.</p><p>This helps boost your rankings and user experience.</p></div>
        <div><h3>Do you work with all business sizes?</h3><p>Yes, we provide SEO solutions for Pretoria startups, SMEs, and large enterprises across all industries.</p><p>Our flexible packages ensure every business can benefit from effective SEO.</p></div>
        <div><h3>Which areas of Pretoria do you serve?</h3><p>We serve all of Pretoria and surrounding regions, including Centurion, Hatfield, Brooklyn, Pretoria East, and more.</p><p>Remote consultations and digital reporting are available for your convenience.</p></div>
      </section>
    </main>
  );
}
