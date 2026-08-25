'use client';

import PackageCard from '@/components/PackageCard';
import RelatedServices from '@/components/RelatedServices';
import GetInTouchButton from '@/components/GetInTouchButton';
import Link from 'next/link';

export default function ContentMarketingPage() {
  const packages = [
    {
      name: 'Essential Content',
      price: 'R3,850',
      period: '/month',
      features: [
        '2 Blog Posts per Month',
        'Keyword Research',
        'Content Strategy',
        'Basic SEO Optimization',
        'Content Calendar',
        'Social Media Snippets',
        'Monthly Performance Reports',
        'Content Distribution'
      ],
      popular: false
    },
    {
      name: 'Professional Content',
      price: 'R7,850',
      period: '/month',
      features: [
        '4 Blog Posts per Month',
        'Advanced Keyword Research',
        'Content Strategy & Planning',
        'Advanced SEO Optimization',
        'Content Calendar',
        'Social Media Content',
        'Email Newsletter Content',
        'Performance Analytics',
        'Content Distribution',
        'Monthly Strategy Calls'
      ],
      popular: true
    },
    {
      name: 'Enterprise Content',
      price: 'R15,850',
      period: '/month',
      features: [
        '8 Blog Posts per Month',
        'Comprehensive Content Strategy',
        'Premium SEO Optimization',
        'Custom Content Calendar',
        'Social Media Management',
        'Email Marketing Content',
        'Lead Magnet Creation',
        'Video Script Writing',
        'Infographic Design',
        'Weekly Strategy Calls'
      ],
      popular: false
    }
  ];

  const additionalServices = [
    {
      name: 'Single Blog Post',
      price: 'From R850',
      description: 'One-time blog post with research and SEO optimization'
    },
    {
      name: 'Content Audit',
      price: 'From R1,850',
      description: 'Comprehensive analysis of your existing content with recommendations'
    }
  ];

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4 md:p-24">
      {/* BEGIN: Visually Hidden SEO Headings H1-H5 for Content Marketing Pretoria */}
      <section style={{position:'absolute',left:'-9999px',top:'auto',width:'1px',height:'1px',overflow:'hidden'}} aria-hidden="true">
        <h1>Content Marketing Services in Pretoria | WL CreationX</h1>
        <p>WL CreationX delivers strategic content marketing for Pretoria businesses, helping you attract, engage, and convert your ideal customers with SEO-optimized content.</p>
        <h2>Pretoria’s Leading Content Marketing Agency</h2>
        <p>Our Pretoria team specializes in blog writing, content strategy, social media content, and lead generation. We help Pretoria companies build authority and drive results online.</p>
        <h3>SEO Content & Blogging for Pretoria Businesses</h3>
        <p>Boost your Pretoria website’s rankings with keyword-rich blog posts, landing pages, and content campaigns tailored to your audience and goals.</p>
        <h4>Affordable Content Packages & Pricing in Pretoria</h4>
        <p>Choose from monthly content packages or once-off services. Transparent pricing and measurable results for Pretoria startups, SMEs, and corporates.</p>
        <h5>Why Choose WL CreationX for Content Marketing in Pretoria?</h5>
        <p>Local expertise, creative writers, and proven strategies. WL CreationX is Pretoria’s trusted partner for content that converts and grows your business.</p>
      </section>
      {/* END: Visually Hidden SEO Headings H1-H5 for Content Marketing Pretoria */}
      {/* BEGIN: Visually Hidden Content Marketing FAQ for Pretoria */}
      <section style={{position:'absolute',left:'-9999px',top:'auto',width:'1px',height:'1px',overflow:'hidden'}} aria-hidden="true">
        <h2>Frequently Asked Questions about Content Marketing in Pretoria</h2>
        <div><h3>What is content marketing?</h3><p>Content marketing is a strategy focused on creating and distributing valuable, relevant content to attract and engage your target Pretoria audience, ultimately driving profitable customer action.</p></div>
        <div><h3>How much does content marketing cost in Pretoria?</h3><p>WL CreationX offers content marketing packages starting from R3,850/month. Pricing depends on the number of blog posts, strategy, and additional services required.</p></div>
        <div><h3>What types of content do you create?</h3><p>We create blog posts, website copy, social media content, email newsletters, lead magnets, infographics, and more for Pretoria businesses.</p></div>
        <div><h3>Is content marketing effective for Pretoria businesses?</h3><p>Yes! Strategic content marketing improves SEO, builds brand authority, and generates leads for Pretoria companies across industries.</p></div>
        <div><h3>How long does it take to see results?</h3><p>Content marketing is a long-term strategy. Most Pretoria clients see improved rankings, traffic, and engagement within 3–6 months.</p></div>
        <div><h3>Do you offer one-off content projects?</h3><p>Yes, we offer single blog posts, content audits, and once-off campaigns for Pretoria businesses that need specific deliverables.</p></div>
        <div><h3>Can you help with content strategy?</h3><p>Absolutely. We develop custom content strategies for Pretoria clients, including keyword research, content calendars, and performance tracking.</p></div>
        <div><h3>Is your content SEO-optimized?</h3><p>All our content is optimized for Pretoria SEO best practices, including keyword usage, internal linking, and structure for higher rankings.</p></div>
        <div><h3>Do you provide reports?</h3><p>Yes, monthly clients receive performance reports showing rankings, traffic, and content engagement for their Pretoria business.</p></div>
        <div><h3>Which areas of Pretoria do you serve?</h3><p>We serve all of Pretoria and surrounding suburbs, including Centurion, Hatfield, Brooklyn, Pretoria East, and more.</p></div>
      </section>
      {/* END: Visually Hidden Content Marketing FAQ for Pretoria */}
      {/* BEGIN: FAQPage Structured Data for Content Marketing Pretoria */}
      <script type="application/ld+json" suppressHydrationWarning>
        {`
        {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "What is content marketing?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Content marketing is a strategy focused on creating and distributing valuable, relevant content to attract and engage your target Pretoria audience, ultimately driving profitable customer action."
              }
            },
            {
              "@type": "Question",
              "name": "How much does content marketing cost in Pretoria?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "WL CreationX offers content marketing packages starting from R3,850/month. Pricing depends on the number of blog posts, strategy, and additional services required."
              }
            },
            {
              "@type": "Question",
              "name": "What types of content do you create?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "We create blog posts, website copy, social media content, email newsletters, lead magnets, infographics, and more for Pretoria businesses."
              }
            },
            {
              "@type": "Question",
              "name": "Is content marketing effective for Pretoria businesses?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes! Strategic content marketing improves SEO, builds brand authority, and generates leads for Pretoria companies across industries."
              }
            },
            {
              "@type": "Question",
              "name": "How long does it take to see results?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Content marketing is a long-term strategy. Most Pretoria clients see improved rankings, traffic, and engagement within 3–6 months."
              }
            },
            {
              "@type": "Question",
              "name": "Do you offer one-off content projects?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes, we offer single blog posts, content audits, and once-off campaigns for Pretoria businesses that need specific deliverables."
              }
            },
            {
              "@type": "Question",
              "name": "Can you help with content strategy?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Absolutely. We develop custom content strategies for Pretoria clients, including keyword research, content calendars, and performance tracking."
              }
            },
            {
              "@type": "Question",
              "name": "Is your content SEO-optimized?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "All our content is optimized for Pretoria SEO best practices, including keyword usage, internal linking, and structure for higher rankings."
              }
            },
            {
              "@type": "Question",
              "name": "Do you provide reports?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes, monthly clients receive performance reports showing rankings, traffic, and content engagement for their Pretoria business."
              }
            },
            {
              "@type": "Question",
              "name": "Which areas of Pretoria do you serve?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "We serve all of Pretoria and surrounding suburbs, including Centurion, Hatfield, Brooklyn, Pretoria East, and more."
              }
            }
          ]
        }
        `}
      </script>
      {/* END: FAQPage Structured Data for Content Marketing Pretoria */}
      <div className="z-10 w-full max-w-5xl items-center justify-between text-sm">
        
        <h1 className="text-4xl md:text-6xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-[#FFD700] via-[#FFC000] to-[#FFB000] mt-8 mb-4">
          Content Marketing Services
        </h1>
        
        <p className="text-center text-xl mb-12 text-white/80">
          Engage your audience with high-quality, SEO-optimized content that drives results.
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
          <h2 className="text-3xl font-bold text-center mb-8 text-[#FFD700]">Our Content Process</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-zinc-900/50 backdrop-blur-sm rounded-xl p-6">
              <h3 className="text-xl font-bold text-white mb-4">Research & Strategy</h3>
              <ul className="space-y-2 text-white/80">
                <li>• Audience Analysis</li>
                <li>• Competitor Research</li>
                <li>• Keyword Research</li>
                <li>• Content Gap Analysis</li>
              </ul>
            </div>
            <div className="bg-zinc-900/50 backdrop-blur-sm rounded-xl p-6">
              <h3 className="text-xl font-bold text-white mb-4">Content Creation</h3>
              <ul className="space-y-2 text-white/80">
                <li>• SEO Optimization</li>
                <li>• Engaging Writing</li>
                <li>• Visual Elements</li>
                <li>• Quality Assurance</li>
              </ul>
            </div>
          </div>
        </section>

        <RelatedServices
          currentService="Content Marketing"
          services={[
            {
              title: 'SEO Services',
              description: 'Improve your search engine rankings and drive organic traffic.',
              href: '/pricing/seo-pretoria',
              anchor: 'View SEO Services'
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
            Learn more about our <Link href="/" className="text-[#FFD700] hover:underline">Pretoria content marketing services</Link> on the homepage.
          </p>
        </div>
      </div>
    </main>
  );
}
