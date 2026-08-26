'use client';

import PackageCard from '@/components/PackageCard';
import RelatedServices from '@/components/RelatedServices';
import GetInTouchButton from '@/components/GetInTouchButton';
import Link from 'next/link';
import GetStartedButton from '@/components/GetStartedButton';

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
      {/* BEGIN: FAQPage Structured Data for Email Marketing Pretoria */}
      <script type="application/ld+json" suppressHydrationWarning>
        {`
        {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "What is email marketing?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Email marketing is the use of targeted emails to promote your Pretoria business, build relationships, and drive sales or engagement."
              }
            },
            {
              "@type": "Question",
              "name": "How much does email marketing cost in Pretoria?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "WL CreationX offers email marketing packages starting from R2,850/month. Pricing depends on the number of campaigns, automation, and additional services."
              }
            },
            {
              "@type": "Question",
              "name": "What types of emails do you create?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "We create newsletters, promotional campaigns, automated sequences, onboarding emails, and more for Pretoria businesses."
              }
            },
            {
              "@type": "Question",
              "name": "Is email marketing effective for Pretoria businesses?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes! Email marketing delivers high ROI and is one of the most effective channels for Pretoria companies to nurture leads and increase repeat business."
              }
            },
            {
              "@type": "Question",
              "name": "Can you set up automation?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Absolutely. We set up automated email workflows for Pretoria clients, including welcome series, abandoned cart, follow-ups, and more."
              }
            },
            {
              "@type": "Question",
              "name": "Do you provide reporting?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes, all packages include performance tracking and monthly reports for Pretoria clients, showing opens, clicks, and conversions."
              }
            },
            {
              "@type": "Question",
              "name": "Can you design custom templates?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes, we design branded, mobile-responsive email templates tailored to your Pretoria business and audience."
              }
            },
            {
              "@type": "Question",
              "name": "Do you comply with POPIA?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes, all our email marketing services for Pretoria businesses are POPIA-compliant and follow best practices for consent and data privacy."
              }
            },
            {
              "@type": "Question",
              "name": "Do you offer once-off campaigns?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes, we offer single campaign management and setup for Pretoria businesses that need a one-time email push."
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
      {/* END: FAQPage Structured Data for Email Marketing Pretoria */}
      <div className="z-10 w-full max-w-5xl items-center justify-between text-sm">
        
        <h1 className="text-4xl md:text-6xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-[#FFD700] via-[#FFC000] to-[#FFB000] mt-8 mb-4">
          Email Marketing Services
        </h1>
        
        <p className="text-center text-xl mb-12 text-white/80">
          Build lasting relationships with your audience through targeted email campaigns.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {packages.map((pkg) => (
            <PackageCard key={pkg.name} {...pkg} service="Email marketing" />
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
                  service="Email marketing"
                  label="Enquire"
                  className="mt-4 w-full"
                />
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
              href: '/pricing/content-marketing-pretoria',
              anchor: 'View Content Marketing'
            },
            {
              title: 'SEO Services',
              description: 'Improve your search engine rankings and drive organic traffic.',
              href: '/pricing/seo-pretoria',
              anchor: 'View SEO Services'
            }
          ]}
        />

        <div className="text-center mt-12">
          <GetInTouchButton />
        </div>

        {/* Contextual link to homepage with varied phrasing */}
        <div className="max-w-4xl mx-auto px-4 text-center mt-6">
          <p className="text-neutral-400 text-sm">
            Learn more about our <Link href="/" className="text-[#FFD700] hover:underline">Pretoria email marketing agency</Link> on the homepage.
          </p>
        </div>
      </div>
    
      {/* Previously hidden off-screen; now visible to every visitor */}
      <section className="mx-auto max-w-4xl px-4 py-12 prose prose-invert prose-headings:font-syne prose-headings:text-[#FFD700] prose-p:text-neutral-300 prose-li:text-neutral-300 prose-strong:text-white">
        <h2>Email Marketing Services in Pretoria</h2>
        <p>WL CreationX helps Pretoria businesses grow with targeted, high-converting email marketing campaigns, automation, and analytics. Build lasting relationships and boost ROI with our expert team.</p>
        <h3>Email marketing for Pretoria businesses</h3>
        <p>Our Pretoria specialists design, write, and manage email campaigns that engage your audience and drive results. From newsletters to automation, we handle it all.</p>
        <h4>Email Campaigns & Automation for Pretoria Businesses</h4>
        <p>Reach your Pretoria customers with personalized, mobile-friendly emails, advanced segmentation, and data-driven strategies for maximum impact.</p>
        <h3>Affordable Email Marketing Packages in Pretoria</h3>
        <p>Choose from flexible monthly packages or once-off campaigns. Transparent pricing and measurable results for Pretoria startups, SMEs, and corporates.</p>
        <h3>Why Choose WL CreationX for Email Marketing in Pretoria?</h3>
        <p>Local expertise, creative content, and proven strategies. WL CreationX is Pretoria’s trusted partner for email marketing that delivers real business growth.</p>
      </section>
      {/* Previously hidden off-screen; now visible to every visitor */}
      <section className="mx-auto max-w-4xl px-4 py-12 prose prose-invert prose-headings:font-syne prose-headings:text-[#FFD700] prose-p:text-neutral-300 prose-li:text-neutral-300 prose-strong:text-white">
        <h3>Frequently Asked Questions about Email Marketing in Pretoria</h3>
        <div><h4>What is email marketing?</h4><p>Email marketing is the use of targeted emails to promote your Pretoria business, build relationships, and drive sales or engagement.</p></div>
        <div><h4>How much does email marketing cost in Pretoria?</h4><p>WL CreationX offers email marketing packages starting from R2,850/month. Pricing depends on the number of campaigns, automation, and additional services.</p></div>
        <div><h4>What types of emails do you create?</h4><p>We create newsletters, promotional campaigns, automated sequences, onboarding emails, and more for Pretoria businesses.</p></div>
        <div><h4>Is email marketing effective for Pretoria businesses?</h4><p>Yes! Email marketing delivers high ROI and is one of the most effective channels for Pretoria companies to nurture leads and increase repeat business.</p></div>
        <div><h4>Can you set up automation?</h4><p>Absolutely. We set up automated email workflows for Pretoria clients, including welcome series, abandoned cart, follow-ups, and more.</p></div>
        <div><h4>Do you provide reporting?</h4><p>Yes, all packages include performance tracking and monthly reports for Pretoria clients, showing opens, clicks, and conversions.</p></div>
        <div><h4>Can you design custom templates?</h4><p>Yes, we design branded, mobile-responsive email templates tailored to your Pretoria business and audience.</p></div>
        <div><h4>Do you comply with POPIA?</h4><p>Yes, all our email marketing services for Pretoria businesses are POPIA-compliant and follow best practices for consent and data privacy.</p></div>
        <div><h4>Do you offer once-off campaigns?</h4><p>Yes, we offer single campaign management and setup for Pretoria businesses that need a one-time email push.</p></div>
        <div><h4>Which areas of Pretoria do you serve?</h4><p>We serve all of Pretoria and surrounding suburbs, including Centurion, Hatfield, Brooklyn, Pretoria East, and more.</p></div>
      </section>
    </main>
  );
}
