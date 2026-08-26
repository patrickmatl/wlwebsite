"use client";

import GetInTouchButton from "@/components/GetInTouchButton";
import GetStartedButton from '@/components/GetStartedButton';

const pricing = [
  {
    name: "Interactive PDF Starter",
    price: "R3,900",
    features: [
      "Up to 8 pages",
      "Clickable navigation & links",
      "Basic animations",
      "Delivered in PDF & web format"
    ]
  },
  {
    name: "Digital Publication Pro",
    price: "R8,500",
    features: [
      "Up to 20 pages",
      "Custom interactivity (forms, videos)",
      "Brand-aligned design",
      "2 revision rounds"
    ]
  },
  {
    name: "Enterprise Interactive Publication",
    price: "R16,000",
    features: [
      "Up to 40 pages",
      "Advanced interactivity & analytics",
      "Unlimited revisions (within scope)",
      "All source files included"
    ]
  }
];

const faqs = [
  { q: "What is interactive digital publication design?", a: "Interactive digital publication design involves creating engaging, clickable, and multimedia-rich documents for online distribution and user interaction." },
  { q: "Do you offer interactive PDF design in Pretoria?", a: "Yes, we provide interactive PDF and digital publication design services in Pretoria and across South Africa." },
  { q: "Can you make my PDF clickable and interactive?", a: "Absolutely. We add clickable links, navigation, videos, animations, and more to your PDFs." },
  { q: "How much does interactive PDF design cost?", a: "Our packages start from R3,500, with pricing based on document length, features, and custom requirements." },
  { q: "What is included in your interactive publication design packages?", a: "Packages include custom layouts, branding, interactive elements, and revision rounds. See our pricing for details." },
  { q: "Do you design for both digital and print?", a: "Yes, we provide both print-ready and interactive digital versions of all publications." },
  { q: "Can you help with content and copy for digital publications?", a: "We offer copywriting and content refinement for digital publications as an add-on service." },
  { q: "How long does it take to design an interactive publication?", a: "Turnaround is typically 5–14 days depending on scope and complexity. Rush delivery is available on request." },
  { q: "Will my interactive PDF be editable after delivery?", a: "Yes, we deliver editable files in InDesign, PDF, or other formats as required." },
  { q: "Can you incorporate our company branding?", a: "Absolutely. We use your corporate identity, colors, fonts, and logos for full brand alignment." },
  { q: "What if I need revisions?", a: "All packages include at least one revision round. Additional changes can be arranged as needed." },
  { q: "Is my data confidential?", a: "Yes, all client data is treated as strictly confidential and NDAs can be signed if required." },
  { q: "Do you design interactive reports and brochures?", a: "Yes, we design interactive annual reports, brochures, magazines, and more." },
  { q: "Can you add video and audio to digital publications?", a: "We can embed video, audio, and animations for a rich multimedia experience." },
  { q: "Do you offer flipbook or page-turn effects?", a: "Yes, we can create flipbooks and page-turn effects for online publications." },
  { q: "Can you help with publication structure and navigation?", a: "We assist with structuring your publication for easy navigation and user experience." },
  { q: "Do you provide support for mobile-friendly publications?", a: "We design responsive publications that work across devices and screen sizes." },
  { q: "What industries do you serve with interactive publication design?", a: "We serve all sectors, including education, corporate, government, and more." },
  { q: "Can you redesign our existing digital publications?", a: "Yes, we can update, modernize, and improve your current digital publications." },
  { q: "How do you ensure accessibility in digital publications?", a: "We design with accessibility in mind, using readable fonts, alt text, and logical navigation." },
  { q: "Do you offer copyediting and proofreading?", a: "We can provide copyediting and proofreading for all digital publications as an add-on service." },
  { q: "Can you design publications for international audiences?", a: "Yes, we design for both local and international audiences." },
  { q: "What payment methods do you accept?", a: "We accept EFT, credit card, and other common payment options." },
  { q: "Do you offer discounts for recurring or bulk projects?", a: "Yes, contact us for custom pricing on recurring or large-scale publication projects." },
  { q: "Can you assist with digital publication hosting?", a: "We can advise on hosting solutions and platforms for your digital publications." },
  { q: "Do you provide editable graphics and charts?", a: "Yes, all graphics and charts are delivered in editable formats where possible." },
  { q: "How do I start a project with you?", a: "Contact us via the form or Get In Touch button to discuss your interactive publication needs." },
  { q: "Are your services available outside Pretoria?", a: "Yes, we serve clients across South Africa and internationally via remote collaboration." },
  { q: "Can you design interactive publications for NGOs and non-profits?", a: "Yes, we offer tailored services for NGOs and non-profit organizations." },
  { q: "Do you provide after-sales support?", a: "We offer limited after-sales support for minor tweaks and troubleshooting." },
  { q: "Do you offer training on using interactive publications?", a: "We provide basic handover and guidance; full training can be arranged on request." },
  { q: "Can you create publications for academic or research purposes?", a: "Yes, we design interactive publications for academic, scientific, and research projects." },
  { q: "How do you handle project communication?", a: "We communicate via email, phone, or video call for clear project updates and feedback." },
  { q: "Can you sign an NDA for sensitive projects?", a: "Yes, we are happy to sign NDAs to ensure confidentiality and data security." },
  { q: "What sets your Pretoria digital publication design apart?", a: "We combine local Pretoria insight with global design standards for exceptional results." },
  { q: "Can you design digital publications for government or public sector?", a: "Yes, we have experience designing for government and public sector clients." },
  { q: "Will my publications be accessible and inclusive?", a: "We design with accessibility and inclusivity in mind, using readable fonts and clear layouts." },
  { q: "Do you offer student or academic publication design?", a: "Yes, we assist students and academics with thesis and research publication design." },
  { q: "Can you help with localization and translation?", a: "We can assist with localization and translation for multilingual publications." },
  { q: "How do you ensure quality control?", a: "All publications undergo internal review and quality checks before final delivery." }
];

export default function InteractiveDigitalPublicationInteractivePdfDesignPretoria() {
  return (
    <div className="min-h-screen bg-black text-white py-20 px-4 sm:px-6 lg:px-8">
      <section className="max-w-3xl mx-auto text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4">Interactive Digital Publication & Interactive PDF Design Pretoria</h1>
        <p className="text-lg text-gray-300 mb-6">Creation of interactive PDFs and digital magazines for engaging online experiences. We design interactive documents that captivate, inform, and convert.</p>
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
                service="Interactive digital publication"
                className="mt-auto w-full"
              />
            </div>
          ))}
        </div>
      </section>
      {/* FAQ - shown to every visitor; mirrors the FAQPage JSON-LD below */}
      <section aria-label="Frequently Asked Questions" className="mx-auto max-w-4xl px-4 py-16 prose prose-invert prose-headings:font-syne prose-headings:text-[#FFD700] prose-p:text-neutral-300 prose-li:text-neutral-300 prose-strong:text-white">
        <h2>Interactive Digital Publication & Interactive PDF Design FAQ</h2>
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
        <h2>Interactive Digital Publication & PDF Design in Pretoria</h2>
        <p>Our interactive digital publication and PDF design services in Pretoria help organizations create engaging, multimedia-rich documents for online and offline audiences. We design interactive reports, brochures, and eBooks that drive engagement and deliver information effectively.</p>
        <p>Pretoria clients trust us for professional interactive PDF design that combines usability, accessibility, and visual appeal for all types of digital publications.</p>
        <h3>Why Choose Pretoria for Interactive Publication Design?</h3>
        <p>Pretoria is a hub for innovation and digital transformation. Our interactive publication designers understand the needs of Pretoria businesses, government, and non-profits, delivering solutions that stand out in the digital landscape.</p>
        <p>We help Pretoria organizations modernize their communications with interactive PDFs, flipbooks, and digital magazines tailored to their audiences.</p>
        <h4>Custom Interactive Reports, Brochures, and Magazines</h4>
        <p>Every digital publication project is unique. We offer custom interactive report design, digital brochure layouts, and multimedia eBooks for Pretoria clients. Our team ensures your content is presented in an engaging, user-friendly format.</p>
        <p>From annual reports to marketing materials, our Pretoria interactive publication designers deliver digital documents that inform, persuade, and inspire action.</p>
        <h5>Serving Pretoria’s Digital Community</h5>
        <p>We serve a diverse range of Pretoria clients, from corporates to educational institutions and NGOs. Our interactive publication design portfolio includes work for finance, education, health, and tech sectors in Pretoria and Gauteng.</p>
        <p>Whether you need a one-off digital publication or ongoing interactive design support, our Pretoria team is ready to help you communicate your message.</p>
        <h2>Digital Publication Standards and Best Practices</h2>
        <p>Usability and accessibility are critical in digital publication design. We ensure all Pretoria interactive PDFs follow best practices for navigation, accessibility, and multimedia integration.</p>
        <p>Our Pretoria digital publication design team stays current with new technologies and trends, ensuring your publications are always effective and engaging.</p>
        <h3>Affordable Interactive PDF Design Packages Pretoria</h3>
        <p>Our interactive PDF design packages are competitively priced for Pretoria organizations. We offer transparent pricing, fast turnaround, and scalable solutions for projects of any size.</p>
        <p>Contact us to discuss your interactive digital publication needs in Pretoria and discover how we can bring your documents to life.</p>
        <h4>Pretoria, Gauteng, and South Africa Coverage</h4>
        <p>Based in Pretoria, we work with clients across Gauteng and South Africa. Our remote collaboration tools allow us to deliver digital publication design excellence nationwide.</p>
        <p>We understand Pretoria’s digital culture and can adapt our services for local, national, or global audiences.</p>
        <h5>Get Started with Pretoria’s Interactive Publication Design Experts</h5>
        <p>Ready to make your publications interactive? Our Pretoria team is here to support your next report, brochure, or magazine with world-class digital design.</p>
        <p>Contact Pretoria’s leading interactive publication design specialists for a free consultation and see how we can help you engage your audience.</p>
      </section>
    </div>
  );
}
