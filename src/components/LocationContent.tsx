'use client';

import React from 'react';
import Link from 'next/link';
import { Location } from '@/types';
import { BUSINESS } from '@/data/business';

interface LocationContentProps {
  location: Location;
}

/** Map internal service slugs to real routes on this site. */
const SERVICE_ROUTES: Record<string, string> = {
  'graphic-design': '/pricing/graphic-design-pretoria',
  'web-design': '/pricing/website-design-pretoria',
  branding: '/branding-solutions-pretoria',
  'packaging-design': '/pricing/packaging-design-pretoria',
  'marketing-materials': '/pricing/marketing-materials-pretoria',
  'digital-marketing': '/digital-marketing-services-pretoria',
};

export default function LocationContent({ location }: LocationContentProps) {
  if (!location.content) return null;

  const {
    h2,
    intro,
    aboutArea,
    services,
    expertise,
    industries,
    faqs,
    contact
  } = location.content;

  const isHomeCity = location.slug === 'pretoria';

  const heroHeading = location.title || `Design Services for ${location.city} Businesses`;
  const rawServicesHeading = h2.services || `Design Services for ${location.city} Businesses`;
  // Avoid repeating the hero heading verbatim in the services section.
  const servicesHeading =
    rawServicesHeading === heroHeading
      ? `Our Core Services for ${location.city} Businesses`
      : rawServicesHeading;

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-black to-zinc-900 text-white py-20 rounded-2xl border border-[#FFD700]/20">
        <div className="container mx-auto text-center px-4">
          <h2 className="font-syne text-4xl md:text-5xl font-bold mb-6">
            {heroHeading}
          </h2>
          {location.subtitle && (
            <p className="text-xl md:text-2xl text-[#FFD700] mb-8">{location.subtitle}</p>
          )}
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">{intro}</p>
        </div>
      </section>

      {/* About */}
      {aboutArea && (
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="font-syne text-3xl md:text-4xl font-bold text-white mb-8 text-center">
              {h2.about || 'About WL CreationX'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-zinc-900/50 border border-[#FFD700]/20 rounded-xl p-8">
                <h3 className="font-syne text-2xl font-bold text-white mb-4">How We Work</h3>
                <div className="space-y-4 text-gray-300">
                  {aboutArea.content.split('\n\n').map((paragraph, index) => (
                    <p key={index}>{paragraph.trim()}</p>
                  ))}
                </div>
                <div className="mt-6">
                  <h4 className="font-syne text-xl font-bold text-white mb-3">At a Glance</h4>
                  <ul className="space-y-2 text-gray-300">
                    {aboutArea.keyPoints.map((point: string, index: number) => (
                      <li key={index} className="flex items-start">
                        <span className="text-[#FFD700] mr-2">•</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="bg-zinc-900/50 border border-[#FFD700]/20 rounded-xl p-8">
                <h3 className="font-syne text-2xl font-bold text-white mb-4">Why Clients Stay</h3>
                <div className="space-y-6">
                  {aboutArea.benefits.map((benefit: { title: string; description: string }, index: number) => (
                    <div key={index}>
                      <h4 className="font-syne text-xl font-bold text-[#FFD700] mb-2">{benefit.title}</h4>
                      <p className="text-gray-300">{benefit.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Services */}
      {services && (
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="font-syne text-3xl md:text-4xl font-bold text-white mb-8 text-center">
              {servicesHeading}
            </h2>
            <p className="text-xl text-gray-300 text-center mb-12">{services.intro}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {services.list.map((service: { h3: string; content: string; features?: string[]; slug?: string }, index: number) => (
                <div key={index} className="bg-zinc-900/50 border border-[#FFD700]/20 rounded-xl p-8">
                  <h3 className="font-syne text-2xl font-bold text-white mb-4">{service.h3}</h3>
                  <p className="text-gray-300 mb-6">{service.content}</p>
                  <h4 className="font-syne text-lg font-semibold text-[#FFD700] mb-3">What&apos;s Included</h4>
                  <ul className="space-y-2 mb-6 text-gray-300">
                    {service.features?.map((feature: string, idx: number) => (
                      <li key={idx} className="flex items-start">
                        <span className="text-[#FFD700] mr-2">•</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  {service.slug && SERVICE_ROUTES[service.slug] && (
                    <Link
                      href={SERVICE_ROUTES[service.slug]}
                      className="inline-block bg-[#FFD700] text-black py-2 px-6 rounded-lg font-bold hover:bg-[#FFD700]/80 transition-colors"
                    >
                      View Pricing & Details
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Expertise */}
      {expertise && (
        <section className="bg-zinc-900/50 border border-[#FFD700]/20 rounded-xl p-8">
          <h2 className="font-syne text-3xl font-bold text-white mb-4">{h2.expertise}</h2>
          <p className="text-gray-300 mb-8">{expertise.content}</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {expertise.areas.map((area: { title: string; description: string }, index: number) => (
              <div key={index} className="border border-[#FFD700]/20 p-6 rounded-lg bg-black/40">
                <h3 className="font-syne text-xl font-bold text-[#FFD700] mb-2">{area.title}</h3>
                <p className="text-gray-300">{area.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Industries */}
      {industries && (
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="font-syne text-3xl md:text-4xl font-bold text-white mb-4 text-center">
              {h2.industries || 'Industries We Work With'}
            </h2>
            <p className="text-gray-300 text-center mb-8">{industries.content}</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {industries.sectors.map((sector: string, index: number) => (
                <div key={index} className="bg-zinc-900/50 border border-[#FFD700]/20 p-6 rounded-lg text-center">
                  <h3 className="font-syne text-lg font-bold text-white mb-2">{sector}</h3>
                  {industries.descriptions?.[index] && (
                    <p className="text-gray-400 text-sm">{industries.descriptions[index].description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Frequently Asked Questions */}
      {faqs && faqs.length > 0 && (
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="font-syne text-3xl md:text-4xl font-bold text-white mb-8 text-center">
              {h2.faq || 'Frequently Asked Questions'}
            </h2>
            <div className="max-w-3xl mx-auto space-y-6">
              {faqs.map((faq: { question: string; answer: string }, index: number) => (
                <div key={index} className="bg-zinc-900/50 border border-[#FFD700]/20 p-6 rounded-lg">
                  <h3 className="font-syne text-xl font-bold text-white mb-3">{faq.question}</h3>
                  <p className="text-gray-300">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Areas Served */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="font-syne text-3xl md:text-4xl font-bold text-white mb-4 text-center">
            {`Areas We Serve in ${location.city}`}
          </h2>
          <p className="text-gray-300 text-center max-w-3xl mx-auto mb-12">
            {isHomeCity
              ? 'All work is produced at our Waterkloof Glen studio. We regularly meet clients and deliver projects across these Pretoria areas:'
              : `All work is produced at our Pretoria studio. From there we deliver projects to businesses across these ${location.city} areas:`}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-zinc-900/50 border border-[#FFD700]/20 rounded-xl p-8">
              <h3 className="font-syne text-2xl font-bold text-white mb-4">Frequently Served Areas</h3>
              <ul className="space-y-2 text-gray-300">
                {location.serviceAreas?.primary.map((area: string, index: number) => (
                  <li key={index} className="flex items-center">
                    <span className="text-[#FFD700] mr-2">•</span>
                    <span>{area}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-zinc-900/50 border border-[#FFD700]/20 rounded-xl p-8">
              <h3 className="font-syne text-2xl font-bold text-white mb-4">Also Served</h3>
              <ul className="space-y-2 text-gray-300">
                {location.serviceAreas?.secondary.map((area: string, index: number) => (
                  <li key={index} className="flex items-center">
                    <span className="text-[#FFD700] mr-2">•</span>
                    <span>{area}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          {location.nearbyAreas && location.nearbyAreas.length > 0 && (
            <div className="mt-12">
              <h3 className="font-syne text-2xl font-bold text-white mb-4">Beyond {location.city}</h3>
              <div className="flex flex-wrap gap-4">
                {location.nearbyAreas.map((area: string, index: number) => (
                  <span key={index} className="bg-zinc-900/50 border border-[#FFD700]/20 text-gray-300 px-4 py-2 rounded-full">
                    {area}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* How We Serve This City */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="font-syne text-3xl md:text-4xl font-bold text-white mb-8 text-center">
            {isHomeCity ? 'A Pretoria Studio, In Person' : `How We Serve ${location.city} from Pretoria`}
          </h2>
          <div className="max-w-3xl mx-auto">
            <p className="text-lg text-gray-300 mb-8">
              {isHomeCity
                ? 'WL CreationX is based in Waterkloof Glen, Pretoria — the one and only office we have. Local clients can meet us face to face for briefings, concept presentations and print handovers at any stage of a project.'
                : `WL CreationX has one studio, in Waterkloof Glen, Pretoria. We serve ${location.city} businesses from there — on-site meetings are available across Gauteng, and everywhere else we work remotely over video calls and email, with printed work delivered by courier.`}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-zinc-900/50 border border-[#FFD700]/20 rounded-xl p-8">
                <h3 className="font-syne text-2xl font-bold text-white mb-4">What You Can Expect</h3>
                <ul className="space-y-4 text-gray-300">
                  <li className="flex items-start">
                    <span className="text-[#FFD700] mr-2">✓</span>
                    <span>The same Pretoria design team on every project, start to finish</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#FFD700] mr-2">✓</span>
                    <span>A written scope and timeline agreed before work begins</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#FFD700] mr-2">✓</span>
                    <span>Staged reviews so you approve concepts before final artwork</span>
                  </li>
                </ul>
              </div>
              <div className="bg-zinc-900/50 border border-[#FFD700]/20 rounded-xl p-8">
                <h3 className="font-syne text-2xl font-bold text-white mb-4">Meetings & Delivery</h3>
                <ul className="space-y-4 text-gray-300">
                  <li className="flex items-start">
                    <span className="text-[#FFD700] mr-2">✓</span>
                    <span>
                      {location.region === 'Gauteng'
                        ? 'In-person consultations available across Gauteng'
                        : 'Video-call consultations at times that suit you'}
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#FFD700] mr-2">✓</span>
                    <span>Digital files delivered online; print couriered nationwide</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#FFD700] mr-2">✓</span>
                    <span>One point of contact by phone, email or WhatsApp</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      {contact && (
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="font-syne text-3xl md:text-4xl font-bold text-white mb-12 text-center">
              {h2.contact || 'Contact WL CreationX'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
              <div className="bg-zinc-900/50 border border-[#FFD700]/20 rounded-xl p-8">
                <h3 className="font-syne text-2xl font-bold text-white mb-6">Get in Touch</h3>
                <div className="space-y-4">
                  {contact.phone && (
                    <div>
                      <h4 className="font-syne font-bold text-lg text-[#FFD700]">Phone</h4>
                      <p className="text-xl text-gray-300">
                        <a href={`tel:${BUSINESS.phoneE164}`} className="hover:text-[#FFD700] transition-colors">
                          {contact.phone}
                        </a>
                      </p>
                    </div>
                  )}
                  {contact.email && (
                    <div>
                      <h4 className="font-syne font-bold text-lg text-[#FFD700]">Email</h4>
                      <p className="text-xl text-gray-300">
                        <a href={`mailto:${contact.email}`} className="hover:text-[#FFD700] transition-colors">
                          {contact.email}
                        </a>
                      </p>
                    </div>
                  )}
                  {contact.address && (
                    <div>
                      <h4 className="font-syne font-bold text-lg text-[#FFD700]">Address</h4>
                      <p className="text-xl text-gray-300">{contact.address}</p>
                    </div>
                  )}
                  {contact.hours && (
                    <div>
                      <h4 className="font-syne font-bold text-lg text-[#FFD700]">Business Hours</h4>
                      <p className="text-xl text-gray-300">{contact.hours}</p>
                    </div>
                  )}
                </div>
              </div>
              <div>
                <h3 className="font-syne text-2xl font-bold text-white mb-6">Take Action</h3>
                <div className="space-y-4">
                  <Link
                    href="/get-in-touch-pretoria"
                    className="block w-full text-center bg-[#FFD700] text-black py-4 px-6 rounded-lg hover:bg-[#FFD700]/80 text-lg font-bold transition-colors"
                  >
                    {contact.cta.primary}
                  </Link>
                  {contact.cta.secondary.map((action: { url: string; text: string }, index: number) => (
                    <Link
                      key={index}
                      href={action.url}
                      className="block w-full text-center border-2 border-[#FFD700] text-[#FFD700] py-4 px-6 rounded-lg hover:bg-[#FFD700]/10 text-lg font-bold transition-colors"
                    >
                      {action.text}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
