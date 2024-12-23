'use client';

import Breadcrumb from '@/components/Breadcrumb';
import PackageCard from '@/components/PackageCard';
import RelatedServices from '@/components/RelatedServices';
import GetInTouchButton from '@/components/GetInTouchButton';

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
      <div className="z-10 w-full max-w-5xl items-center justify-between text-sm">
        <Breadcrumb items={[
          { label: 'Services & Pricing', href: '/pricing' },
          { label: 'SEO Services', href: '/pricing/seo' }
        ]} />
        
        <h1 className="text-4xl md:text-6xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-[#FFD700] via-[#FFC000] to-[#FFB000] mt-8 mb-4">
          SEO Services
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
              href: '/pricing/content-marketing',
              anchor: 'View Content Marketing'
            },
            {
              title: 'Google Ads',
              description: 'Drive targeted traffic and leads with Google Ads campaigns.',
              href: '/pricing/google-ads',
              anchor: 'View Google Ads'
            },
            {
              title: 'Website Design',
              description: 'Create a modern, SEO-friendly website that converts.',
              href: '/pricing/website-design',
              anchor: 'View Website Design'
            }
          ]}
        />
      </div>
    </main>
  );
}
