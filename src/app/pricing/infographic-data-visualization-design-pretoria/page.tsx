"use client";

import GetInTouchButton from "@/components/GetInTouchButton";

const pricing = [
  {
    name: "Infographic Starter",
    price: "R2,800",
    features: [
      "1 custom infographic",
      "Branded to your CI",
      "1 revision round",
      "Delivered in PNG & PDF"
    ]
  },
  {
    name: "Data Visualization Pack",
    price: "R6,000",
    features: [
      "Up to 5 infographics/charts",
      "Custom icons & illustrations",
      "2 revision rounds",
      "Editable & web-ready files"
    ]
  },
  {
    name: "Comprehensive Visual Storytelling",
    price: "R12,000",
    features: [
      "Up to 12 infographics/data visuals",
      "Advanced animation/interactive options",
      "Unlimited revisions (within scope)",
      "All source files included"
    ]
  }
];

// EXTENDED FAQ DATA (40 total)
const faqs = [
  { q: "What is infographic design?", a: "Infographic design involves creating visual representations of information, data, or knowledge to communicate complex ideas quickly and clearly." },
  { q: "Do you offer infographic design in Pretoria?", a: "Yes, we provide custom infographic and data visualization design services in Pretoria and across South Africa." },
  { q: "Can you design data visualizations for reports?", a: "Absolutely. We create data visualizations for reports, presentations, websites, and more." },
  { q: "How much does infographic design cost?", a: "Our packages start from R2,800, with pricing based on complexity, number of visuals, and custom requirements." },
  { q: "What is included in your infographic design packages?", a: "Packages include custom graphics, branding, data visualizations, and revision rounds. See our pricing for details." },
  { q: "Do you create interactive infographics?", a: "Yes, we design both static and interactive infographics for web and digital use." },
  { q: "Can you help with infographic content and copy?", a: "We offer copywriting and content refinement for infographics as an add-on service." },
  { q: "How long does it take to design an infographic?", a: "Turnaround is typically 2–7 days depending on scope and complexity. Rush delivery is available on request." },
  { q: "Will my infographics be editable after delivery?", a: "Yes, we deliver editable files in Illustrator, PowerPoint, or other formats as required." },
  { q: "Can you incorporate our company branding?", a: "Absolutely. We use your corporate identity, colors, fonts, and logos for full brand alignment." },
  { q: "What if I need revisions?", a: "All packages include at least one revision round. Additional changes can be arranged as needed." },
  { q: "Is my data confidential?", a: "Yes, all client data is treated as strictly confidential and NDAs can be signed if required." },
  { q: "Do you design infographics for both digital and print?", a: "Yes, we provide both print-ready and digital versions of all infographics." },
  { q: "Can you visualize complex data sets?", a: "We specialize in clear, accurate visualizations of complex data for all audiences." },
  { q: "Do you offer infographics for marketing and social media?", a: "Yes, we design infographics for marketing campaigns, social media, and websites." },
  { q: "Can you help with infographic structure and storytelling?", a: "We assist with structuring your infographic for clarity and impact." },
  { q: "Do you provide support for infographic animation?", a: "We offer animated infographic design for web and video use." },
  { q: "What industries do you serve with infographic design?", a: "We serve all sectors, including education, healthcare, finance, tech, and more." },
  { q: "Can you redesign our existing infographics?", a: "Yes, we can update, modernize, and improve your current infographics." },
  { q: "How do you ensure accuracy in data visualization?", a: "We work closely with your team to ensure all data is represented accurately and clearly." },
  { q: "Do you offer copyediting and proofreading?", a: "We can provide copyediting and proofreading for all infographics as an add-on service." },
  { q: "Can you design infographics for international audiences?", a: "Yes, we design for both local and international audiences." },
  { q: "What payment methods do you accept?", a: "We accept EFT, credit card, and other common payment options." },
  { q: "Do you offer discounts for recurring or bulk projects?", a: "Yes, contact us for custom pricing on recurring or large-scale infographic projects." },
  { q: "Can you assist with infographic printing?", a: "We can provide print-ready files and coordinate with printers if required." },
  { q: "Do you provide editable graphics and charts?", a: "Yes, all graphics and charts are delivered in editable formats where possible." },
  { q: "How do I start a project with you?", a: "Contact us via the form or Get In Touch button to discuss your infographic design needs." },
  { q: "Are your services available outside Pretoria?", a: "Yes, we serve clients across South Africa and internationally via remote collaboration." },
  { q: "Can you design infographics for NGOs and non-profits?", a: "Yes, we offer tailored services for NGOs and non-profit organizations." },
  { q: "Do you provide after-sales support?", a: "We offer limited after-sales support for minor tweaks and troubleshooting." },
  { q: "Do you offer training on using infographic templates?", a: "We provide basic handover and guidance; full training can be arranged on request." },
  { q: "Can you create infographics for academic or research projects?", a: "Yes, we design infographics for academic, scientific, and research purposes." },
  { q: "How do you handle project communication?", a: "We communicate via email, phone, or video call for clear project updates and feedback." },
  { q: "Can you sign an NDA for sensitive projects?", a: "Yes, we are happy to sign NDAs to ensure confidentiality and data security." },
  { q: "What sets your Pretoria infographic design apart?", a: "We combine local Pretoria insight with global design standards for exceptional results." },
  { q: "Can you design infographics for government or public sector?", a: "Yes, we have experience designing for government and public sector clients." },
  { q: "Will my infographics be accessible and inclusive?", a: "We design with accessibility and inclusivity in mind, using readable fonts and clear layouts." },
  { q: "Do you offer student or academic infographic design?", a: "Yes, we assist students and academics with thesis and research infographics." },
  { q: "Can you help with infographic localization and translation?", a: "We can assist with localization and translation for multilingual infographics." },
  { q: "How do you ensure quality control?", a: "All infographics undergo internal review and quality checks before final delivery." }
];

export default function InfographicDataVisualizationDesignPretoria() {
  return (
    <div className="min-h-screen bg-black text-white py-20 px-4 sm:px-6 lg:px-8">
      <section className="max-w-3xl mx-auto text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4">Infographic & Data Visualization Design Pretoria</h1>
        <p className="text-lg text-gray-300 mb-6">Custom infographics and data visualizations for reports, marketing, and digital content. We turn complex data into clear, engaging visuals that drive understanding and impact.</p>
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
        <h2>Infographic & Data Visualization Design FAQ</h2>
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
        <h2>Infographic & Data Visualization Design in Pretoria</h2>
        <p>Our infographic and data visualization design services in Pretoria help organizations turn complex data into clear, engaging visuals. We create custom infographics, charts, and interactive graphics for reports, presentations, and digital platforms.</p>
        <p>Pretoria businesses rely on us for professional data visualization that enhances understanding and drives decision-making across South Africa and beyond.</p>
        <h3>Why Choose Pretoria for Infographic Design?</h3>
        <p>Pretoria is a center for research, business, and innovation. Our infographic designers understand local and global trends, ensuring your visuals resonate with Pretoria’s diverse audiences.</p>
        <p>We work with Pretoria companies, NGOs, and educational institutions to create infographics that support marketing, training, and stakeholder communication goals.</p>
        <h4>Custom Infographics, Dashboards, and Reports</h4>
        <p>Every data visualization project is unique. We offer custom infographic design, dashboard creation, and report graphics for Pretoria clients. Our team ensures your data is presented accurately and attractively for maximum impact.</p>
        <p>From annual reports to marketing campaigns, our Pretoria infographic designers deliver visuals that engage, inform, and inspire action.</p>
        <h5>Serving Pretoria’s Business and Research Community</h5>
        <p>We serve a diverse range of Pretoria clients, from corporates to universities and non-profits. Our infographic design portfolio includes work for finance, health, education, and tech sectors in Pretoria and Gauteng.</p>
        <p>Whether you need a one-off infographic or ongoing data visualization support, our Pretoria team is ready to help you communicate your message.</p>
        <h2>Data Visualization Standards and Best Practices</h2>
        <p>Accuracy and clarity are critical in data visualization. We ensure all Pretoria infographics follow best practices for design, accessibility, and storytelling.</p>
        <p>Our Pretoria infographic design team stays current with new tools and trends, ensuring your visuals are always effective and engaging.</p>
        <h3>Affordable Infographic Design Packages Pretoria</h3>
        <p>Our infographic design packages are competitively priced for Pretoria organizations. We offer transparent pricing, fast turnaround, and scalable solutions for projects of any size.</p>
        <p>Contact us to discuss your infographic and data visualization needs in Pretoria and discover how we can bring your data to life.</p>
        <h4>Pretoria, Gauteng, and South Africa Coverage</h4>
        <p>Based in Pretoria, we work with clients across Gauteng and South Africa. Our remote collaboration tools allow us to deliver infographic design excellence nationwide.</p>
        <p>We understand Pretoria’s business and research culture and can adapt our services for local, national, or global audiences.</p>
        <h5>Get Started with Pretoria’s Infographic Design Experts</h5>
        <p>Ready to visualize your data? Our Pretoria team is here to support your next report, campaign, or presentation with world-class infographic design.</p>
        <p>Contact Pretoria’s leading infographic design specialists for a free consultation and see how we can help you communicate visually.</p>
      </section>
    </div>
  );
}
