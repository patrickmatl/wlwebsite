"use client";

import GetInTouchButton from "@/components/GetInTouchButton";

const pricing = [
  {
    name: "Event Branding Essentials",
    price: "R5,000",
    features: [
      "Logo & event identity",
      "Basic signage design",
      "1 revision round",
      "Print-ready files"
    ]
  },
  {
    name: "Full Event Branding Pack",
    price: "R12,000",
    features: [
      "Event logo, signage, lanyards, digital banners",
      "Custom graphics & templates",
      "2 revision rounds",
      "Editable & print-ready files"
    ]
  },
  {
    name: "Premium Event Experience",
    price: "R22,000",
    features: [
      "Comprehensive event branding (all touchpoints)",
      "Advanced environmental graphics",
      "Unlimited revisions (within scope)",
      "All source files included"
    ]
  }
];

const faqs = [
  { q: "What is event branding design?", a: "Event branding design involves creating cohesive visual identities and materials for events, ensuring a memorable and professional attendee experience." },
  { q: "Do you offer event branding design in Pretoria?", a: "Yes, we provide event branding and design services in Pretoria and across South Africa." },
  { q: "Can you design event logos and themes?", a: "Absolutely. We design event logos, themes, and visual identities tailored to your event goals." },
  { q: "How much does event branding design cost?", a: "Our packages start from R4,000, with pricing based on event size, deliverables, and custom requirements." },
  { q: "What is included in your event branding packages?", a: "Packages include logo, theme, signage, digital and print materials, and revision rounds. See our pricing for details." },
  { q: "Do you design for both in-person and virtual events?", a: "Yes, we provide branding for both physical and virtual/hybrid events." },
  { q: "Can you help with event invitations and programs?", a: "We design invitations, programs, agendas, and guest communications for events." },
  { q: "How long does it take to design event branding?", a: "Turnaround is typically 5–14 days depending on scope and complexity. Rush delivery is available on request." },
  { q: "Will my event branding be editable after delivery?", a: "Yes, we deliver editable files in Illustrator, InDesign, or other formats as required." },
  { q: "Can you incorporate our company branding into event materials?", a: "Absolutely. We use your corporate identity, colors, fonts, and logos for full brand alignment." },
  { q: "What if I need revisions?", a: "All packages include at least one revision round. Additional changes can be arranged as needed." },
  { q: "Is my event information confidential?", a: "Yes, all client data is treated as strictly confidential and NDAs can be signed if required." },
  { q: "Do you design event signage and wayfinding?", a: "Yes, we design signage, banners, and wayfinding materials for events of all sizes." },
  { q: "Can you provide social media graphics for events?", a: "We create graphics for event promotion on social media and digital platforms." },
  { q: "Do you offer event website and landing page design?", a: "Yes, we design event websites and landing pages for registrations and information." },
  { q: "Can you help with stage and screen visuals?", a: "We design stage backdrops, screen content, and presentation templates for events." },
  { q: "Do you provide support for event printing?", a: "We can provide print-ready files and coordinate with printers if required." },
  { q: "What industries do you serve with event branding?", a: "We serve all sectors, including corporate, education, government, non-profit, and more." },
  { q: "Can you redesign our existing event branding?", a: "Yes, we can update, modernize, and improve your current event branding." },
  { q: "How do you ensure accessibility in event materials?", a: "We design with accessibility in mind, using readable fonts, high-contrast colors, and clear layouts." },
  { q: "Do you offer copyediting and proofreading?", a: "We can provide copyediting and proofreading for all event materials as an add-on service." },
  { q: "Can you design for international events?", a: "Yes, we design for both local and international events and audiences." },
  { q: "What payment methods do you accept?", a: "We accept EFT, credit card, and other common payment options." },
  { q: "Do you offer discounts for recurring or large events?", a: "Yes, contact us for custom pricing on recurring or large-scale event projects." },
  { q: "Can you assist with event branding rollout?", a: "We can advise on branding rollout, signage placement, and digital asset distribution." },
  { q: "Do you provide editable graphics and templates?", a: "Yes, all graphics and templates are delivered in editable formats where possible." },
  { q: "How do I start a project with you?", a: "Contact us via the form or Get In Touch button to discuss your event branding needs." },
  { q: "Are your services available outside Pretoria?", a: "Yes, we serve clients across South Africa and internationally via remote collaboration." },
  { q: "Can you design event branding for NGOs and non-profits?", a: "Yes, we offer tailored services for NGOs and non-profit organizations." },
  { q: "Do you provide after-sales support?", a: "We offer limited after-sales support for minor tweaks and troubleshooting." },
  { q: "Do you offer training on using event branding templates?", a: "We provide basic handover and guidance; full training can be arranged on request." },
  { q: "Can you create branding for conferences and exhibitions?", a: "Yes, we design branding for conferences, exhibitions, and trade shows." },
  { q: "How do you handle project communication?", a: "We communicate via email, phone, or video call for clear project updates and feedback." },
  { q: "Can you sign an NDA for sensitive projects?", a: "Yes, we are happy to sign NDAs to ensure confidentiality and data security." },
  { q: "What sets your Pretoria event branding apart?", a: "We combine local Pretoria insight with global event branding standards for exceptional results." },
  { q: "Can you design for government or public sector events?", a: "Yes, we have experience designing for government and public sector events." },
  { q: "Will my event materials be accessible and inclusive?", a: "We design with accessibility and inclusivity in mind, using readable fonts and clear layouts." },
  { q: "Do you offer student or academic event branding?", a: "Yes, we assist students and academics with event branding and materials." },
  { q: "Can you help with localization and translation?", a: "We can assist with localization and translation for multilingual event materials." },
  { q: "How do you ensure quality control?", a: "All event materials undergo internal review and quality checks before final delivery." }
];

export default function EventBrandingDesignPretoria() {
  return (
    <div className="min-h-screen bg-black text-white py-20 px-4 sm:px-6 lg:px-8">
      <section className="max-w-3xl mx-auto text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4">Event Branding Design Pretoria</h1>
        <p className="text-lg text-gray-300 mb-6">Complete event branding solutions for conferences, launches, and activations. We design memorable event identities, signage, and digital collateral for a seamless attendee experience.</p>
        <GetInTouchButton className="mx-auto" />
      </section>
      <section className="max-w-5xl mx-auto mb-16">
        <h2 className="text-2xl font-bold text-yellow-400 mb-8 text-center">Our Packages</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricing.map((pkg) => (
            <div key={pkg.name} className="bg-zinc-900 rounded-xl p-8 border border-yellow-500/20 hover:border-yellow-400/60 transition-all flex flex-col items-center">
              <h3 className="text-xl font-bold text-yellow-300 mb-4">{pkg.name}</h3>
              <div className="text-3xl font-extrabold text-yellow-400 mb-2">{pkg.price}</div>
              <ul className="text-gray-300 text-left mb-6 space-y-2">
                {pkg.features.map((f, i) => (
                  <li key={i} className="flex items-start"><span className="text-yellow-400 mr-2">•</span>{f}</li>
                ))}
              </ul>
              <GetInTouchButton className="mt-auto w-full" />
            </div>
          ))}
        </div>
      </section>
      {/* FAQ - shown to every visitor; mirrors the FAQPage JSON-LD below */}
      <section aria-label="Frequently Asked Questions" className="mx-auto max-w-4xl px-4 py-16 prose prose-invert prose-headings:font-syne prose-headings:text-[#FFD700] prose-p:text-neutral-300 prose-li:text-neutral-300 prose-strong:text-white">
        <h2>Event Branding Design FAQ</h2>
        <dl className="not-prose mt-8 space-y-6">
          {faqs.map((faq, i) => (
            <div key={i} className="rounded-lg border border-zinc-800 bg-black/40 p-5">
              <dt className="font-syne text-lg font-semibold text-white">{faq.q}</dt>
              <dd className="mt-2 text-sm leading-relaxed text-neutral-300">{faq.a}</dd>
            </div>
          ))}
        </dl>
      </section>
      {/* FAQ Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            'mainEntity': faqs.map(faq => ({
              '@type': 'Question',
              'name': faq.q,
              'acceptedAnswer': {
                '@type': 'Answer',
                'text': faq.a
              }
            }))
          })
        }}
      />
      {/* Service detail - visible on-page content */}
      <section aria-label="Service Detail" className="mx-auto max-w-4xl px-4 py-16 prose prose-invert prose-headings:font-syne prose-headings:text-[#FFD700] prose-p:text-neutral-300 prose-li:text-neutral-300 prose-strong:text-white">
        <h2>Event Branding Design in Pretoria</h2>
        <p>Our event branding design services in Pretoria help organizations create memorable, cohesive visual identities for conferences, exhibitions, and corporate events. We design event logos, signage, invitations, and digital assets tailored to Pretoria’s vibrant business scene.</p>
        <p>Pretoria clients trust us for professional event branding that elevates attendee experience and reinforces brand recognition across South Africa.</p>
        <h3>Why Choose Pretoria for Event Branding?</h3>
        <p>Pretoria is a hub for major events, expos, and business gatherings. Our event branding designers understand the needs of Pretoria organizers and deliver creative solutions that stand out in competitive environments.</p>
        <p>We help Pretoria organizations make a lasting impression with event branding that combines local relevance and global design standards.</p>
        <h4>Custom Logos, Signage, and Digital Assets</h4>
        <p>Every event is unique. We offer custom logo design, signage, and digital asset creation for Pretoria events. Our team ensures your event branding is consistent, impactful, and aligned with your objectives.</p>
        <p>From conferences to product launches, our Pretoria event branding designers deliver materials that engage, inform, and inspire attendees.</p>
        <h5>Serving Pretoria’s Event Community</h5>
        <p>We serve a diverse range of Pretoria clients, from corporates to non-profits and government agencies. Our event branding portfolio includes work for finance, tech, education, and public sector events in Pretoria and Gauteng.</p>
        <p>Whether you need a one-off event branding solution or ongoing support, our Pretoria team is ready to help you create unforgettable experiences.</p>
        <h2>Event Branding Standards and Best Practices</h2>
        <p>Consistency and creativity are critical in event branding. We ensure all Pretoria event materials follow best practices for design, accessibility, and audience engagement.</p>
        <p>Our Pretoria event branding team stays current with new trends and technologies, ensuring your event stands out for all the right reasons.</p>
        <h3>Affordable Event Branding Packages Pretoria</h3>
        <p>Our event branding packages are competitively priced for Pretoria organizations. We offer transparent pricing, fast turnaround, and scalable solutions for events of any size.</p>
        <p>Contact us to discuss your event branding needs in Pretoria and discover how we can help you create a memorable event.</p>
        <h4>Pretoria, Gauteng, and South Africa Coverage</h4>
        <p>Based in Pretoria, we work with clients across Gauteng and South Africa. Our remote collaboration tools allow us to deliver event branding excellence nationwide.</p>
        <p>We understand Pretoria’s event culture and can adapt our services for local, national, or global audiences.</p>
        <h5>Get Started with Pretoria’s Event Branding Experts</h5>
        <p>Ready to brand your next event? Our Pretoria team is here to support your next conference, exhibition, or launch with world-class event branding.</p>
        <p>Contact Pretoria’s leading event branding specialists for a free consultation and see how we can help you create impact.</p>
      </section>
    </div>
  );
}
