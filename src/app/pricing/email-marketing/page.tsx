'use client';

import Breadcrumb from '@/components/Breadcrumb';
import PackageCard from '@/components/PackageCard';
import RelatedServices from '@/components/RelatedServices';
import GetInTouchButton from '@/components/GetInTouchButton';

export default function EmailMarketingPage() {
  const packages = [
    {
      name: 'Essential Email',
      price: 'R2,850',
      period: '/month',
      features: [
        '2 Email Campaigns per Month',
        'List Management',
        'Basic Automation',
        'Template Design',
        'Performance Tracking',
        'A/B Testing',
        'Subscriber Segmentation',
        'Basic Analytics'
      ],
      popular: false
    },
    {
      name: 'Professional Email',
      price: 'R6,850',
      period: '/month',
      features: [
        '4 Email Campaigns per Month',
        'Advanced List Management',
        'Marketing Automation',
        'Custom Template Design',
        'Advanced Analytics',
        'Lead Scoring',
        'Dynamic Content',
        'Integration Setup',
        'Monthly Strategy Calls',
        'Priority Support'
      ],
      popular: true
    },
    {
      name: 'Enterprise Email',
      price: 'R12,850',
      period: '/month',
      features: [
        '8 Email Campaigns per Month',
        'Premium List Management',
        'Complex Automation Flows',
        'Multiple Custom Templates',
        'Advanced Segmentation',
        'Predictive Analytics',
        'CRM Integration',
        'Landing Pages',
        'Weekly Strategy Calls',
        'Dedicated Support'
      ],
      popular: false
    }
  ];

  const additionalServices = [
    {
      name: 'One-Time Campaign',
      price: 'From R950',
      description: 'Single email campaign design and execution'
    },
    {
      name: 'Automation Setup',
      price: 'From R2,850',
      description: 'Custom email automation workflow setup'
    }
  ];

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4 md:p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between text-sm">
        <Breadcrumb items={[
          { label: 'Services & Pricing', href: '/pricing' },
          { label: 'Email Marketing', href: '/pricing/email-marketing' }
        ]} />
        
        <h1 className="text-4xl md:text-6xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-[#FFD700] via-[#FFC000] to-[#FFB000] mt-8 mb-4">
          Email Marketing Services
        </h1>
        
        <p className="text-center text-xl mb-12 text-white/80">
          Build lasting relationships with your audience through targeted email campaigns.
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
          <h2 className="text-3xl font-bold text-center mb-8 text-[#FFD700]">Our Email Process</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-zinc-900/50 backdrop-blur-sm rounded-xl p-6">
              <h3 className="text-xl font-bold text-white mb-4">Strategy & Setup</h3>
              <ul className="space-y-2 text-white/80">
                <li>• List Building</li>
                <li>• Audience Segmentation</li>
                <li>• Template Design</li>
                <li>• Automation Planning</li>
              </ul>
            </div>
            <div className="bg-zinc-900/50 backdrop-blur-sm rounded-xl p-6">
              <h3 className="text-xl font-bold text-white mb-4">Execution & Analysis</h3>
              <ul className="space-y-2 text-white/80">
                <li>• Campaign Creation</li>
                <li>• A/B Testing</li>
                <li>• Performance Tracking</li>
                <li>• Optimization</li>
              </ul>
            </div>
          </div>
        </section>

        <RelatedServices
          currentService="Email Marketing"
          services={[
            {
              title: 'Content Marketing',
              description: 'Engage your audience with high-quality, SEO-optimized content.',
              href: '/pricing/content-marketing',
              anchor: 'View Content Marketing'
            },
            {
              title: 'SEO Services',
              description: 'Improve your search engine rankings and drive organic traffic.',
              href: '/pricing/seo',
              anchor: 'View SEO Services'
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
