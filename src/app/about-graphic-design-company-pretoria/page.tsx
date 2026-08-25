import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { BUSINESS } from '@/data/business';

export const metadata: Metadata = {
  title: 'About WL CreationX | Graphic Design Studio Pretoria',
  description:
    'The WL CreationX story: a Pretoria graphic design studio founded in 2013 and registered in 2016, offering design, web, video and photography nationwide.',
  alternates: {
    canonical: 'https://wlcreationx.co.za/about-graphic-design-company-pretoria',
  },
  openGraph: {
    title: 'About WL CreationX | Graphic Design Studio Pretoria',
    description:
      'The WL CreationX story: a Pretoria graphic design studio founded in 2013 and registered in 2016, offering design, web, video and photography nationwide.',
    url: 'https://wlcreationx.co.za/about-graphic-design-company-pretoria',
    siteName: 'WL CreationX',
    locale: 'en_ZA',
    type: 'website',
    images: ['/images/og-image.jpg'],
  },
};

const aboutPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  name: 'About WL CreationX',
  url: 'https://wlcreationx.co.za/about-graphic-design-company-pretoria',
  mainEntity: { '@id': 'https://wlcreationx.co.za/#business' },
};

export default function AboutPage() {
  const milestones = [
    {
      year: '2013',
      title: 'The Beginning',
      description: 'Started as a passionate creative venture, offering design solutions to local businesses.'
    },
    {
      year: '2016',
      title: 'Official Registration',
      description: 'Formally registered as WL CreationX, marking our commitment to professional excellence.'
    },
    {
      year: '2018',
      title: 'Digital Expansion',
      description: 'Expanded our services to include comprehensive digital solutions and web development.'
    },
    {
      year: '2020',
      title: 'Remote Evolution',
      description: 'Adapted to serve clients nationwide through innovative remote collaboration.'
    },
    {
      year: '2023',
      title: 'Creative Innovation',
      description: 'Marked ten years since the studio began — a 2013-to-2023 milestone on the way to today.'
    },
    {
      year: '2026',
      title: 'Today',
      description: 'Operating as a full-service studio from Pretoria — graphic design, web design, video production and photography under one roof, serving Gauteng on-site and the rest of South Africa remotely.'
    }
  ];

  const processSteps = [
    {
      step: '01',
      title: 'Consultation',
      description: 'We start with a conversation — in person in Pretoria, or over a call — to understand your business, your audience and what the project needs to achieve.'
    },
    {
      step: '02',
      title: 'Fixed Quote',
      description: 'You receive a written quote with a fixed price and clear scope before any work begins. No hourly surprises, no scope creep on our side.'
    },
    {
      step: '03',
      title: 'Concepts',
      description: 'We present initial design concepts for you to review, so you can react to real work rather than abstract descriptions.'
    },
    {
      step: '04',
      title: 'Two Revision Rounds',
      description: 'Every project includes two structured revision rounds, where we refine the chosen concept based on your feedback.'
    },
    {
      step: '05',
      title: 'Open-File Handover',
      description: 'On completion you receive the final artwork along with the open, editable source files. Your brand assets belong to you.'
    }
  ];

  const expertise = [
    {
      title: 'Graphic Design',
      description: 'Logos, corporate identity, print and marketing collateral designed from our Pretoria studio.',
      href: '/pricing/graphic-design-pretoria'
    },
    {
      title: 'Branding',
      description: 'Brand strategy and identity systems that keep your business consistent across every touchpoint.',
      href: '/branding-solutions-pretoria'
    },
    {
      title: 'Website Design',
      description: 'Modern, responsive websites designed and built to represent your brand properly online.',
      href: '/pricing/website-design-pretoria'
    },
    {
      title: 'Videography',
      description: 'Corporate video, promotional content and drone footage produced for businesses in Gauteng.',
      href: '/videography-services-pretoria'
    },
    {
      title: 'Photography',
      description: 'Product, corporate and event photography shot in-studio or on location in Gauteng.',
      href: '/photography-services-pretoria'
    }
  ];

  const whyClientsStay = [
    {
      title: 'Fixed Quotes, No Surprises',
      description: 'Every project is quoted upfront at a fixed price with a defined scope, so you always know the cost before we start.'
    },
    {
      title: 'You Own Your Files',
      description: 'We hand over open, editable source files at the end of every project. You are never locked in to us to make future changes.'
    },
    {
      title: 'One Studio, Four Disciplines',
      description: 'Design, web, video and photography from a single team means consistent branding and one point of contact instead of four suppliers.'
    }
  ];

  return (
    <main className="min-h-screen bg-black text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutPageSchema) }}
      />

      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black z-10" />
        <div className="absolute inset-0 bg-[url('/images/about-hero.jpg')] bg-cover bg-center" />
        <div className="relative z-20 text-center px-4">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 text-[#FFD700]">Our Story</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto">
            A Pretoria design studio turning creative visions into reality since 2013
          </p>
        </div>
      </section>

      {/* Journey Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold mb-12 text-center text-[#FFD700]">Our Journey</h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <p className="text-lg leading-relaxed">
                WL CreationX started in 2013 as a small creative venture serving local businesses, and was formally registered in 2016. Today we operate as a full-service studio from {BUSINESS.address.building} in {BUSINESS.address.suburb}, Pretoria.
              </p>
              <p className="text-lg leading-relaxed">
                Our only office is in Pretoria — we work on-site with clients across Gauteng and remotely with businesses throughout South Africa. From brand identity to websites, video and photography, everything is produced by one team under one roof.
              </p>
            </div>
            <div className="relative h-[400px] rounded-lg overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
              <Image
                src="/images/journey.jpg"
                alt="WL CreationX journey through the years"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* How We Work Section */}
      <section className="py-20 bg-zinc-900">
        <div className="container mx-auto max-w-6xl px-4">
          <h2 className="text-4xl font-bold mb-4 text-center text-[#FFD700]">How We Work</h2>
          <p className="text-lg text-gray-300 text-center max-w-3xl mx-auto mb-12">
            The same straightforward process applies to every project, whether it&apos;s a logo, a website or a video shoot.
          </p>
          <div className="space-y-6">
            {processSteps.map((step) => (
              <div
                key={step.step}
                className="flex flex-col md:flex-row gap-6 items-start p-6 bg-zinc-900/50 border border-[#FFD700]/20 rounded-lg"
              >
                <div className="md:w-20 shrink-0">
                  <span className="text-3xl font-bold text-[#FFD700]">{step.step}</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                  <p className="text-gray-300">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Expertise Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold mb-4 text-center text-[#FFD700]">What We&apos;re Experts In</h2>
          <p className="text-lg text-gray-300 text-center max-w-3xl mx-auto mb-12">
            Five service lines, one studio, one consistent standard of work.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {expertise.map((service) => (
              <Link
                key={service.href}
                href={service.href}
                className="block p-6 bg-zinc-900/50 border border-[#FFD700]/20 rounded-lg hover:border-[#FFD700]/60 transition-colors"
              >
                <h3 className="text-2xl font-bold mb-4 text-[#FFD700]">{service.title}</h3>
                <p className="text-gray-300 mb-4">{service.description}</p>
                <span className="text-[#FFD700] font-bold">Learn more &rarr;</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-zinc-900">
        <div className="container mx-auto max-w-6xl px-4">
          <h2 className="text-4xl font-bold mb-12 text-center text-[#FFD700]">Our Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Innovation',
                description: 'Pushing creative boundaries and embracing new technologies to deliver cutting-edge solutions.'
              },
              {
                title: 'Excellence',
                description: 'Maintaining the highest standards in every project, from concept to execution.'
              },
              {
                title: 'Partnership',
                description: 'Building lasting relationships with our clients through collaboration and trust.'
              }
            ].map((value, index) => (
              <div key={index} className="p-6 bg-black rounded-lg hover:bg-zinc-800 transition-colors">
                <h3 className="text-2xl font-bold mb-4 text-[#FFD700]">{value.title}</h3>
                <p className="text-gray-300">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold mb-12 text-center text-[#FFD700]">Milestones</h2>
          <div className="space-y-8">
            {milestones.map((milestone, index) => (
              <div key={index} className="flex flex-col md:flex-row gap-6 items-start">
                <div className="md:w-32">
                  <span className="text-2xl font-bold text-[#FFD700]">{milestone.year}</span>
                </div>
                <div className="flex-1 pb-8 border-b border-zinc-800">
                  <h3 className="text-xl font-bold mb-2">{milestone.title}</h3>
                  <p className="text-gray-300">{milestone.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Clients Stay Section */}
      <section className="py-20 bg-zinc-900">
        <div className="container mx-auto max-w-6xl px-4">
          <h2 className="text-4xl font-bold mb-4 text-center text-[#FFD700]">Why Clients Stay</h2>
          <p className="text-lg text-gray-300 text-center max-w-3xl mx-auto mb-12">
            We don&apos;t rely on lock-in contracts — we rely on a process that keeps working for clients project after project.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {whyClientsStay.map((reason, index) => (
              <div key={index} className="p-6 bg-zinc-900/50 border border-[#FFD700]/20 rounded-lg">
                <h3 className="text-2xl font-bold mb-4 text-[#FFD700]">{reason.title}</h3>
                <p className="text-gray-300">{reason.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <h2 className="text-4xl font-bold mb-6 text-[#FFD700]">Ready to Start Your Project?</h2>
          <p className="text-xl mb-8">
            Tell us what you need — we&apos;ll respond with a consultation and a fixed quote. Visit us in Pretoria or work with us remotely from anywhere in South Africa.
          </p>
          <Link
            href="/get-in-touch-pretoria"
            className="inline-block bg-[#FFD700] text-black px-8 py-4 rounded-lg font-bold text-lg hover:bg-[#FFE55C] transition-colors"
          >
            Get in Touch
          </Link>
        </div>
      </section>
    </main>
  );
}
