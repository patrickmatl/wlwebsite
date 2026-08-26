'use client';

import React from 'react';
import Link from 'next/link';
import { Location, Service } from '@/types';
import { LOCAL_BUSINESS } from '@/data/business';
import GetInTouchButton from '@/components/GetInTouchButton';

/**
 * /[city]/[service] page body.
 *
 * History: this page once rendered ~600 lines of identical hidden marketing
 * copy on every URL (doorway pages), and later a Service schema with empty
 * provider fields and an invented "R650 - R85000" priceRange. Both are gone:
 * the schema's provider is now the canonical LocalBusiness node from
 * src/data/business.ts and no price claims are made that don't appear on the
 * linked pricing pages.
 */
interface LocationPageProps {
  location: Location;
  service: Service;
}

// Map service slugs to their real pricing pages for the visible CTA links.
const PRICING_ROUTES: Record<string, string> = {
  'graphic-design': '/pricing/graphic-design-pretoria',
  'web-design': '/pricing/website-design-pretoria',
  branding: '/branding-solutions-pretoria',
  'packaging-design': '/pricing/packaging-design-pretoria',
  'marketing-materials': '/pricing/marketing-materials-pretoria',
};

export default function LocationPage({ location, service }: LocationPageProps) {
  const description = `Professional ${service.title} services for businesses in ${location.city}, delivered from our Pretoria studio. ${service.description}`;
  const pricingHref = PRICING_ROUTES[service.slug] ?? '/pricing';

  return (
    <div className="min-h-screen bg-black">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Service',
            name: `${service.title} in ${location.city}`,
            description,
            serviceType: service.title,
            provider: LOCAL_BUSINESS,
            areaServed: {
              '@type': 'City',
              name: location.city,
            },
            // No hasOfferCatalog. It emitted six Offer nodes on a 220-word
            // page that publishes no price at all, and structured data
            // claiming more than the visible page contains is the exact
            // complaint this domain already took a manual action for.
          }),
        }}
      />
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="font-syne text-4xl font-bold text-white mb-6">
          {service.title} in {location.city}
        </h1>
        <div className="prose prose-invert max-w-none">
          <p className="text-xl mb-6 text-neutral-300">{location.description}</p>

          <p className="mb-8 text-neutral-300 leading-relaxed">
            WL CreationX provides {service.title.toLowerCase()} for {location.city} businesses
            from our studio in Waterkloof Glen, Pretoria. We work on-site with clients across
            Gauteng and remotely with clients everywhere else in South Africa — briefs, concepts
            and revisions all run comfortably over video calls and shared review links, and we
            have done so since 2013. See{' '}
            <Link href={pricingHref} className="text-[#FFD700] hover:underline">
              our {service.title.toLowerCase()} pricing
            </Link>{' '}
            for current packages.
          </p>

          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-4">What&apos;s Included</h2>
            <p className="mb-6">{service.description}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-bold mb-4">Features</h3>
                <ul className="list-disc pl-5 space-y-2">
                  {service.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-2xl font-bold mb-4">Benefits</h3>
                <ul className="list-disc pl-5 space-y-2">
                  {service.benefits.map((benefit, index) => (
                    <li key={index}>{benefit}</li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-4">Working with Us from {location.city}</h2>
            <p className="mb-4">
              Every project starts with a consultation and a fixed written quote — no hourly
              surprises. You get two revision rounds on every design, and final artwork is handed
              over in open file formats you own outright.
            </p>
            <div className="not-prose mt-6">
              <GetInTouchButton text={`Get a ${service.title} Quote`} />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
