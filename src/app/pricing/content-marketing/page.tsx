'use client';

import Breadcrumb from '@/components/Breadcrumb';
import PackageCard from '@/components/PackageCard';
import RelatedServices from '@/components/RelatedServices';
import GetInTouchButton from '@/components/GetInTouchButton';

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
      <div className="z-10 w-full max-w-5xl items-center justify-between text-sm">
        <Breadcrumb items={[
          { label: 'Services & Pricing', href: '/pricing' },
          { label: 'Content Marketing', href: '/pricing/content-marketing' }
        ]} />
        
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
              href: '/pricing/seo',
              anchor: 'View SEO Services'
            },
            {
              title: 'Email Marketing',
              description: 'Build lasting relationships with your audience through targeted campaigns.',
              href: '/pricing/email-marketing',
              anchor: 'View Email Marketing'
            }
          ]}
        />

        <div className="text-center mt-12">
          <GetInTouchButton />
        </div>
      </div>
    </main>
  );
}
