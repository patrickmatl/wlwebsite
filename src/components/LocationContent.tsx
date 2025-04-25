'use client';

import React from 'react';
import Link from 'next/link';
import { Location } from '@/types';

interface LocationContentProps {
  location: Location;
}

export default function LocationContent({ location }: LocationContentProps) {
  if (!location.content) return null;

  const {
    h2,
    intro,
    aboutArea,
    services,
    expertise,
    industries,
    testimonials,
    faqs,
    contact
  } = location.content;

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-black to-gray-900 text-white py-20">
        <div className="container mx-auto text-center px-4">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            {location.title || `${location.content?.services?.mainService} in ${location.city}`}
          </h1>
          <h2 className="text-2xl md:text-3xl text-gray-300 mb-8">
            {location.subtitle || `Professional ${location.content?.services?.mainService} Company in ${location.city}`}
          </h2>
          <p className="text-lg max-w-3xl mx-auto">{intro}</p>
        </div>
      </section>

      {/* About Area */}
      {aboutArea && (
        <section className="bg-white py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold mb-8 text-center">
              {h2.about || `Leading ${location.content?.services?.mainService} Agency in ${location.city}`}
            </h2>
            <div className="prose max-w-none">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-2xl font-bold mb-4">Why Choose Us</h3>
                  <div dangerouslySetInnerHTML={{ __html: aboutArea.content }} />
                  <div className="mt-6">
                    <h4 className="text-xl font-bold mb-3">Our Expertise</h4>
                    <ul className="list-disc pl-5 space-y-2">
                      {aboutArea.keyPoints.map((point: string, index: number) => (
                        <li key={index}>{point}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-4">Benefits</h3>
                  <div className="space-y-4">
                    {aboutArea.benefits.map((benefit: { title: string; description: string }, index: number) => (
                      <div key={index}>
                        <h4 className="text-xl font-bold mb-2">{benefit.title}</h4>
                        <p>{benefit.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Services */}
      {services && (
        <section className="bg-gray-50 py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold mb-8 text-center">
              {h2.services || `Our ${location.content?.services?.mainService} Services in ${location.city}`}
            </h2>
            <p className="text-xl text-center mb-12">{services.intro}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.list.map((service: { h3: string; content: string; features?: string[]; slug?: string }, index: number) => (
                <div key={index} className="bg-white p-8 rounded-lg shadow-lg">
                  <h3 className="text-2xl font-bold mb-4">{service.h3}</h3>
                  <div dangerouslySetInnerHTML={{ __html: service.content }} />
                  <h4 className="text-lg font-semibold mb-3">Key Features:</h4>
                  <ul className="list-disc pl-5 mb-6">
                    {service.features?.map((feature: string, idx: number) => (
                      <li key={idx}>{feature}</li>
                    ))}
                  </ul>
                  {service.slug && (
                    <Link
                      href={`/services/${service.slug}`}
                      className="inline-block bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700"
                    >
                      Learn More
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
        <section className="bg-white p-8 rounded-lg">
          <h2 className="text-3xl font-bold mb-4">{h2.expertise}</h2>
          <div dangerouslySetInnerHTML={{ __html: expertise.content }} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {expertise.areas.map((area: { title: string; description: string }, index: number) => (
              <div key={index} className="border p-6 rounded-lg bg-white">
                <h3 className="text-xl font-bold mb-2">{area.title}</h3>
                <p>{area.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

{industries && (
  <section className="bg-gray-50 py-16">
    <div className="container mx-auto px-4">
      <h2 className="text-4xl font-bold mb-8 text-center">
        {h2.industries || `Industries We Serve in ${location.city}`}
      </h2>
      <div dangerouslySetInnerHTML={{ __html: industries.content }} />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {industries.sectors.map((sector: string, index: number) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h3 className="text-xl font-bold mb-2">{sector}</h3>
            {industries.descriptions?.[index] && (
              <p className="text-gray-600">{industries.descriptions[index].description}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  </section>
)}

      {/* Client Testimonials */}
      {testimonials && testimonials.length > 0 && (
        <section className="bg-white py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold mb-8 text-center">
              {h2.testimonials || `What Our ${location.city} Clients Say`}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {testimonials.map((testimonial: { client: string; company: string; rating: number; content: string }, index: number) => (
                <div key={index} className="bg-gray-50 p-8 rounded-lg shadow-lg">
                  <h3 className="sr-only">Client Testimonial</h3>
                  <div className="flex items-center mb-6">
                    <div>
                      <h4 className="font-bold text-xl">{testimonial.client}</h4>
                      <p className="text-gray-600">{testimonial.company}</p>
                    </div>
                    <div className="ml-auto">
                      <span className="text-yellow-400 text-xl">{'★'.repeat(testimonial.rating)}</span>
                    </div>
                  </div>
                  <blockquote>
                    <p className="text-lg italic">{testimonial.content}</p>
                  </blockquote>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Frequently Asked Questions */}
      {faqs && faqs.length > 0 && (
        <section className="bg-gray-50 py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold mb-8 text-center">
              {h2.faq || `Frequently Asked Questions About ${location.content?.services?.mainService} in ${location.city}`}
            </h2>
            <div className="max-w-3xl mx-auto space-y-6">
              {faqs.map((faq: { question: string; answer: string }, index: number) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-lg">
                  <h3 className="text-xl font-bold mb-3">{faq.question}</h3>
                  <p className="text-gray-700">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Location-Specific Content */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-8 text-center">
            {`Design Services in ${location.areas?.join(', ') || location.city}`}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">Primary Service Areas</h3>
              <ul className="space-y-2">
                {location.serviceAreas?.primary.map((area: string, index: number) => (
                  <li key={index} className="flex items-center">
                    <span className="text-blue-600 mr-2">•</span>
                    <span>{area}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-4">Extended Coverage</h3>
              <ul className="space-y-2">
                {location.serviceAreas?.secondary.map((area: string, index: number) => (
                  <li key={index} className="flex items-center">
                    <span className="text-blue-600 mr-2">•</span>
                    <span>{area}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="mt-12">
            <h3 className="text-2xl font-bold mb-4">Nearby Areas We Serve</h3>
            <p className="text-lg mb-4">
              We also provide our professional design services to businesses in:
            </p>
            <div className="flex flex-wrap gap-4">
              {location.nearbyAreas?.map((area: string, index: number) => (
                <span key={index} className="bg-gray-100 px-4 py-2 rounded-full">
                  {area}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Local Business Focus */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-8 text-center">
            {`Local Business Solutions in ${location.city}`}
          </h2>
          <div className="max-w-3xl mx-auto">
            <p className="text-lg mb-8">
              {`As a leading design agency in ${location.city}, we understand the unique challenges and opportunities of the local market. Our team of experienced designers and developers are committed to helping ${location.city} businesses succeed with professional design solutions.`}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-bold mb-4">Local Expertise</h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">✓</span>
                    <span>{`Deep understanding of ${location.city}'s business landscape`}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">✓</span>
                    <span>{`Knowledge of local market trends and consumer preferences`}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">✓</span>
                    <span>{`Experience working with diverse ${location.city} businesses`}</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-4">Local Benefits</h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">✓</span>
                    <span>Face-to-face consultations available</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">✓</span>
                    <span>Quick response times and local support</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">✓</span>
                    <span>Understanding of local competition</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      {contact && (
        <section className="bg-white py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold mb-12 text-center">
              {h2.contact || `Contact Our ${location.city} Team`}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
              <div>
                <h3 className="text-2xl font-bold mb-6">Get in Touch</h3>
                <div className="space-y-4">
                  {contact.phone && (
                    <div>
                      <h4 className="font-bold text-lg">Phone</h4>
                      <p className="text-xl">{contact.phone}</p>
                    </div>
                  )}
                  {contact.email && (
                    <div>
                      <h4 className="font-bold text-lg">Email</h4>
                      <p className="text-xl">{contact.email}</p>
                    </div>
                  )}
                  {contact.address && (
                    <div>
                      <h4 className="font-bold text-lg">Address</h4>
                      <p className="text-xl">{contact.address}</p>
                    </div>
                  )}
                  {contact.hours && (
                    <div>
                      <h4 className="font-bold text-lg">Business Hours</h4>
                      <p className="text-xl">{contact.hours}</p>
                    </div>
                  )}
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-6">Take Action</h3>
                <div className="space-y-4">
                  <Link
                    href="/contact"
                    className="block w-full text-center bg-blue-600 text-white py-4 px-6 rounded-lg hover:bg-blue-700 text-lg font-bold"
                  >
                    {contact.cta.primary}
                  </Link>
                  {contact.cta.secondary.map((action: { url: string; text: string }, index: number) => (
                    <Link
                      key={index}
                      href={action.url}
                      className="block w-full text-center border-2 border-blue-600 text-blue-600 py-4 px-6 rounded-lg hover:bg-blue-50 text-lg font-bold"
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