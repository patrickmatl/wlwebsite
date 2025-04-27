import React from 'react';
import { Service, Location } from '@/types';
import Link from 'next/link';

interface ServiceContentProps {
  service: Service;
  locations?: Location[];
}

export default function ServiceContent({ service, locations = [] }: ServiceContentProps) {
  return (
    <div className="space-y-8">
      <div className="prose max-w-none">
        <p className="text-lg">{service.description}</p>
      </div>

      <section>
        <h2 className="text-2xl font-bold mb-4">Key Features</h2>
        <ul className="list-disc pl-5 space-y-2">
          {service.features.map((feature, index) => (
            <li key={index}>{feature}</li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Benefits</h2>
        <ul className="list-disc pl-5 space-y-2">
          {service.benefits.map((benefit, index) => (
            <li key={index}>{benefit}</li>
          ))}
        </ul>
      </section>

      {locations.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold mb-4">Available Locations</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {locations.map((location) => (
              <div key={location.id} className="p-4 border rounded-lg">
                <h3 className="font-bold">{location.city}</h3>
                <p className="text-sm text-gray-600">{location.region}</p>
                <Link 
                  href={`/locations/${location.slug}`}
                  className="text-blue-400 hover:text-blue-300"
                >
                  Learn more about our services in {location.city} →
                </Link>
              </div>
            ))}
          </div>
        </section>
      )}

      {service.content?.faqs && service.content.faqs.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {service.content.faqs.map((faq, index) => (
              <div key={index} className="border-b pb-4">
                <h3 className="text-xl font-bold mb-2">{faq.question}</h3>
                <p>{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      <section>
        <h2 className="text-2xl font-bold mb-4">Why Choose Us</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-4">Our Expertise</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>Years of industry experience</li>
              <li>Professional and dedicated team</li>
              <li>Proven track record of success</li>
              <li>Cutting-edge technology and tools</li>
            </ul>
          </div>
          <div>
            <h3 className="text-2xl font-bold mb-4">Our Process</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>Initial consultation and needs assessment</li>
              <li>Custom strategy development</li>
              <li>Regular progress updates</li>
              <li>Continuous optimization and support</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="text-center">
        <h2 className="text-2xl font-bold mb-4">Ready to Get Started?</h2>
        <p className="mb-6">Contact us today to discuss your project and see how we can help.</p>
        <Link 
          href="/get-in-touch-pretoria"
          className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-500 transition-colors"
        >
          Contact Us
        </Link>
      </section>
    </div>
  );
}
