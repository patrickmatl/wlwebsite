'use client';

import React from 'react';
import { Location, Service } from '@/types';

/**
 * This page used to render <RootClientWrapper /> above its own content, which
 * stamped the same ~600 lines of generic Pretoria marketing copy onto every
 * /[city]/[service] URL. Dozens of URLs carrying near-identical text is the
 * definition of a doorway page, and it also produced two <main> elements and a
 * duplicated hero per page.
 *
 * The page now renders only content that actually varies by location and
 * service. If you want more depth on these pages, add genuinely
 * location-specific copy to the `content` field in src/data/regions.ts.
 */
interface LocationPageProps {
  location: Location;
  service: Service;
}

export default function LocationPage({ location, service }: LocationPageProps) {
  const description = service.metaDescription 
    ? service.metaDescription.replace('{city}', location.city)
    : `Professional ${service.title} services in ${location.city}. ${service.description}`;

  return (
    <div className="min-h-screen bg-black">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": `${service.title} in ${location.city}`,
            "description": description,
            "provider": {
              "@type": "LocalBusiness",
              "name": "WL CreationX",
              "image": "https://wlcreationx.co.za/logo.png",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": location.content?.contact?.address || "",
                "addressLocality": location.city,
                "addressRegion": location.region,
                "postalCode": "0184",
                "addressCountry": "ZA"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": "-25.7479",
                "longitude": "28.2293"
              },
              "url": `https://wlcreationx.co.za/${location.slug}/${service.slug}`,
              "telephone": location.content?.contact?.phone || "",
              "priceRange": "R650 - R85000"
            },
            "areaServed": {
              "@type": "City",
              "name": location.city
            },
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": `${service.title} Services`,
              "itemListElement": service.features.map(feature => ({
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": feature,
                  "description": ""
                }
              }))
            }
          })
        }}
      />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-white mb-8">
          {service.title} in {location.city}
        </h1>
        <div className="prose prose-invert max-w-none">
          <p className="text-xl mb-8">{location.description}</p>
          
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Services</h2>
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
          
          {location.content?.contact && (
            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-4">Contact Us</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  {location.content.contact.phone && (
                    <p className="mb-2">
                      <strong>Phone:</strong> {location.content.contact.phone}
                    </p>
                  )}
                  {location.content.contact.email && (
                    <p className="mb-2">
                      <strong>Email:</strong> {location.content.contact.email}
                    </p>
                  )}
                  {location.content.contact.address && (
                    <p className="mb-2">
                      <strong>Address:</strong> {location.content.contact.address}
                    </p>
                  )}
                  {location.content.contact.hours && (
                    <p className="mb-2">
                      <strong>Hours:</strong> {location.content.contact.hours}
                    </p>
                  )}
                </div>
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
