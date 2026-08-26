"use client";

import GetInTouchButton from "@/components/GetInTouchButton";
import GetStartedButton from '@/components/GetStartedButton';

const pricing = [
  {
    name: "Internal Memo Design",
    price: "R1,800",
    features: [
      "1 custom memo or announcement",
      "Branded to your CI",
      "1 revision round",
      "Delivered in PDF & Word"
    ]
  },
  {
    name: "Staff Newsletter",
    price: "R4,800",
    features: [
      "Up to 4 pages",
      "Custom graphics & layout",
      "2 revision rounds",
      "Editable & print-ready files"
    ]
  },
  {
    name: "Internal Campaign Pack",
    price: "R9,000",
    features: [
      "Multi-piece campaign (posters, mailers, digital)",
      "Advanced design & messaging",
      "Unlimited revisions (within scope)",
      "All source files included"
    ]
  }
];

const faqs = [
  { q: "What is internal communications design?", a: "Internal communications design involves creating engaging, branded materials to improve employee engagement, information sharing, and company culture." },
  { q: "Do you offer internal communications design in Pretoria?", a: "Yes, we provide internal communications design services in Pretoria and across South Africa." },
  { q: "Can you design employee newsletters and magazines?", a: "Absolutely. We design digital and print newsletters, magazines, and bulletins for employees." },
  { q: "How much does internal communications design cost?", a: "Our packages start from R2,500, with pricing based on format, length, and custom requirements." },
  { q: "What is included in your internal comms design packages?", a: "Packages include custom layouts, branding, infographics, and revision rounds. See our pricing for details." },
  { q: "Do you design for both digital and print?", a: "Yes, we provide both print-ready and digital versions of all internal communications materials." },
  { q: "Can you help with content and copy for internal comms?", a: "We offer copywriting and content refinement for internal communications as an add-on service." },
  { q: "How long does it take to design an internal newsletter?", a: "Turnaround is typically 3–7 days depending on scope and complexity. Rush delivery is available on request." },
  { q: "Will my internal comms materials be editable after delivery?", a: "Yes, we deliver editable files in InDesign, Word, or PDF formats as required." },
  { q: "Can you incorporate our company branding?", a: "Absolutely. We use your corporate identity, colors, fonts, and logos for full brand alignment." },
  { q: "What if I need revisions?", a: "All packages include at least one revision round. Additional changes can be arranged as needed." },
  { q: "Is my data confidential?", a: "Yes, all client data is treated as strictly confidential and NDAs can be signed if required." },
  { q: "Do you design materials for employee onboarding?", a: "Yes, we design onboarding packs, guides, and welcome materials for new hires." },
  { q: "Can you add interactive elements to digital comms?", a: "We can add clickable links, navigation, and multimedia to digital communications." },
  { q: "Do you offer infographics for internal communications?", a: "Yes, we create custom infographics for internal campaigns, KPIs, and company updates." },
  { q: "Can you help with campaign structure and messaging?", a: "We assist with structuring your campaign for clarity and impact." },
  { q: "Do you provide support for mobile-friendly communications?", a: "We design responsive materials that work across devices and screen sizes." },
  { q: "What industries do you serve with internal comms design?", a: "We serve all sectors, including corporate, education, healthcare, government, and more." },
  { q: "Can you redesign our existing internal comms materials?", a: "Yes, we can update, modernize, and improve your current materials." },
  { q: "How do you ensure accessibility in internal communications?", a: "We design with accessibility in mind, using readable fonts, alt text, and logical navigation." },
  { q: "Do you offer copyediting and proofreading?", a: "We can provide copyediting and proofreading for all internal comms as an add-on service." },
  { q: "Can you design materials for international teams?", a: "Yes, we design for both local and international teams." },
  { q: "What payment methods do you accept?", a: "We accept EFT, credit card, and other common payment options." },
  { q: "Do you offer discounts for recurring or bulk projects?", a: "Yes, contact us for custom pricing on recurring or large-scale internal comms projects." },
  { q: "Can you assist with internal comms distribution?", a: "We can advise on distribution platforms and methods for your materials." },
  { q: "Do you provide editable graphics and charts?", a: "Yes, all graphics and charts are delivered in editable formats where possible." },
  { q: "How do I start a project with you?", a: "Contact us via the form or Get In Touch button to discuss your internal communications needs." },
  { q: "Are your services available outside Pretoria?", a: "Yes, we serve clients across South Africa and internationally via remote collaboration." },
  { q: "Can you design materials for NGOs and non-profits?", a: "Yes, we offer tailored services for NGOs and non-profit organizations." },
  { q: "Do you provide after-sales support?", a: "We offer limited after-sales support for minor tweaks and troubleshooting." },
  { q: "Do you offer training on using internal comms templates?", a: "We provide basic handover and guidance; full training can be arranged on request." },
  { q: "Can you create materials for employee engagement campaigns?", a: "Yes, we design for employee engagement, recognition, and wellness campaigns." },
  { q: "How do you handle project communication?", a: "We communicate via email, phone, or video call for clear project updates and feedback." },
  { q: "Can you sign an NDA for sensitive projects?", a: "Yes, we are happy to sign NDAs to ensure confidentiality and data security." },
  { q: "What sets your Pretoria internal comms design apart?", a: "We combine local Pretoria insight with global design standards for exceptional results." },
  { q: "Can you design for government or public sector?", a: "Yes, we have experience designing for government and public sector clients." },
  { q: "Will my materials be accessible and inclusive?", a: "We design with accessibility and inclusivity in mind, using readable fonts and clear layouts." },
  { q: "Do you offer student or academic material design?", a: "Yes, we assist students and academics with internal comms and engagement materials." },
  { q: "Can you help with localization and translation?", a: "We can assist with localization and translation for multilingual materials." },
  { q: "How do you ensure quality control?", a: "All materials undergo internal review and quality checks before final delivery." }
];

export default function InternalCommunicationsDesignPretoria() {
  return (
    <div className="min-h-screen bg-black text-white py-20 px-4 sm:px-6 lg:px-8">
      <section className="max-w-3xl mx-auto text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4">Internal Communications Design Pretoria</h1>
        <p className="text-lg text-gray-300 mb-6">Engaging internal communications for staff, leadership, and change initiatives. We design memos, newsletters, and campaigns that inform, inspire, and align your team.</p>
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
              <GetStartedButton
                packageName={pkg.name}
                packagePrice={pkg.price}
                service="Internal communications"
                className="mt-auto w-full"
              />
            </div>
          ))}
        </div>
      </section>
      {/* FAQ - shown to every visitor; mirrors the FAQPage JSON-LD below */}
      <section aria-label="Frequently Asked Questions" className="mx-auto max-w-4xl px-4 py-16 prose prose-invert prose-headings:font-syne prose-headings:text-[#FFD700] prose-p:text-neutral-300 prose-li:text-neutral-300 prose-strong:text-white">
        <h2>Internal Communications Design FAQ</h2>
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
        <h2>Internal Communications Design in Pretoria</h2>
        <p>Our internal communications design services in Pretoria help organizations engage employees, share information, and build a strong company culture. We create newsletters, bulletins, onboarding packs, and digital campaigns tailored to Pretoria’s business landscape.</p>
        <p>Pretoria companies trust us for professional internal communications design that drives engagement and supports organizational objectives across South Africa.</p>
        <h3>Why Choose Pretoria for Internal Comms Design?</h3>
        <p>Pretoria is home to leading corporates, government agencies, and NGOs. Our internal comms designers understand Pretoria’s unique workplace dynamics and craft materials that resonate with diverse employee audiences.</p>
        <p>We help Pretoria organizations improve employee engagement and retention through clear, branded communications aligned with local and global best practices.</p>
        <h4>Custom Newsletters, Campaigns, and Onboarding Packs</h4>
        <p>Every internal communications project is unique. We offer custom newsletter design, employee campaign materials, and onboarding documentation for Pretoria clients. Our team ensures your content is visually appealing and easy to understand.</p>
        <p>From HR campaigns to executive communications, our Pretoria internal comms designers deliver materials that inform, motivate, and inspire action.</p>
        <h3>Serving Pretoria’s Business Community</h3>
        <p>We serve a diverse range of Pretoria clients, from corporates to educational institutions and non-profits. Our internal communications design portfolio includes work for finance, health, education, and tech sectors in Pretoria and Gauteng.</p>
        <p>Whether you need a one-off internal campaign or ongoing communications support, our Pretoria team is ready to help you connect with your workforce.</p>
        <h2>Internal Comms Standards and Best Practices</h2>
        <p>Clarity and consistency are critical in internal communications. We ensure all Pretoria materials follow best practices for design, accessibility, and employee engagement.</p>
        <p>Our Pretoria internal comms design team stays current with new tools and trends, ensuring your materials are always effective and relevant.</p>
        <h3>Affordable Internal Communications Design Packages Pretoria</h3>
        <p>Our internal communications design packages are competitively priced for Pretoria organizations. We offer transparent pricing, fast turnaround, and scalable solutions for projects of any size.</p>
        <p>Contact us to discuss your internal communications needs in Pretoria and discover how we can help you build a stronger organization.</p>
        <h4>Pretoria, Gauteng, and South Africa Coverage</h4>
        <p>Based in Pretoria, we work with clients across Gauteng and South Africa. Our remote collaboration tools allow us to deliver internal communications design excellence nationwide.</p>
        <p>We understand Pretoria’s business culture and can adapt our services for local, national, or global audiences.</p>
        <h3>Get Started with Pretoria’s Internal Communications Design Experts</h3>
        <p>Ready to improve your internal communications? Our Pretoria team is here to support your next campaign, onboarding, or newsletter with world-class design.</p>
        <p>Talk to us about your internal communications for a free consultation and see how we can help you engage your employees.</p>
      </section>
    </div>
  );
}
