"use client";

import GetInTouchButton from "@/components/GetInTouchButton";

const pricing = [
  {
    name: "Basic Investor Deck",
    price: "R5,000",
    features: [
      "Up to 15 slides",
      "Professional layout & branding",
      "1 revision round",
      "Delivered in PPTX & PDF"
    ]
  },
  {
    name: "Comprehensive IR Pack",
    price: "R9,500",
    features: [
      "Up to 30 slides",
      "Custom infographics & visuals",
      "2 revision rounds",
      "Editable files & print-ready PDF"
    ]
  },
  {
    name: "Premium Shareholder Report",
    price: "R16,000",
    features: [
      "Up to 50 pages/slides",
      "Advanced data visualization",
      "Unlimited revisions (within scope)",
      "Full print & digital formats"
    ]
  }
];

const faqs = [
  { q: "What is investor relations material design?", a: "Investor relations material design involves creating professional, compliant, and visually engaging documents for communicating with shareholders, analysts, and stakeholders." },
  { q: "Do you offer investor deck design in Pretoria?", a: "Yes, we offer investor deck and IR presentation design services in Pretoria and across South Africa." },
  { q: "Can you design shareholder reports and updates?", a: "Absolutely. We design shareholder reports, quarterly updates, and annual results presentations for listed and private companies." },
  { q: "How much does investor relations design cost?", a: "Our packages start from R5,000, with pricing based on complexity, number of slides/pages, and custom requirements." },
  { q: "What is included in your IR design packages?", a: "Packages include custom layouts, branding, infographics, compliance checks, and revision rounds. See our pricing for details." },
  { q: "Do you ensure compliance with JSE or global standards?", a: "Yes, we design with JSE and global IR best practices in mind, ensuring your materials are compliant and professional." },
  { q: "Can you help with IPO or fundraising presentations?", a: "Yes, we design IPO roadshow decks, fundraising presentations, and investor pitch decks." },
  { q: "Do you offer copywriting for IR materials?", a: "We offer copywriting and content refinement for financial and investor communications as an add-on service." },
  { q: "How long does it take to design an investor deck?", a: "Turnaround is typically 3–10 days depending on scope and complexity. Rush delivery is available on request." },
  { q: "Will my IR materials be editable after delivery?", a: "Yes, we deliver editable files in PPTX, PDF, or InDesign formats as required." },
  { q: "Can you incorporate our company branding?", a: "Absolutely. We use your corporate identity, colors, fonts, and logos for full brand alignment." },
  { q: "What if I need revisions?", a: "All packages include at least one revision round. Additional changes can be arranged as needed." },
  { q: "Is my financial data confidential?", a: "Yes, all client data is treated as strictly confidential and NDAs can be signed if required." },
  { q: "Do you design for both digital and print?", a: "Yes, we provide both print-ready and digital versions of all IR materials." },
  { q: "Can you visualize complex financial data?", a: "We specialize in clear, accurate visualizations of financial and operational data for IR audiences." },
  { q: "Do you offer annual report design?", a: "Yes, we design annual reports, integrated reports, and sustainability reports for listed and private companies." },
  { q: "Can you help with AGM or results presentations?", a: "We design AGM, interim, and results presentations for listed and private companies." },
  { q: "Do you offer design for SENS or regulatory announcements?", a: "We can design supporting visuals for SENS and regulatory communications." },
  { q: "What industries do you serve with IR design?", a: "We serve all sectors, including finance, mining, retail, tech, and more." },
  { q: "Can you provide infographics for investor communications?", a: "Yes, we create custom infographics for key metrics, milestones, and financial highlights." },
  { q: "Do you provide support for live investor events?", a: "We offer design and technical support for live investor calls, AGMs, and events in Pretoria and beyond." },
  { q: "Can you redesign our existing IR materials?", a: "Yes, we can update, modernize, and improve your current IR documents and presentations." },
  { q: "How do you ensure compliance with disclosure requirements?", a: "We work closely with your IR/legal team to ensure all content meets disclosure and compliance standards." },
  { q: "Do you offer interactive or digital-first IR materials?", a: "We design interactive PDFs and digital-first IR materials for online distribution." },
  { q: "What payment methods do you accept?", a: "We accept EFT, credit card, and other common payment options." },
  { q: "Can you design IR materials for international investors?", a: "Yes, we design for both local and international investor audiences." },
  { q: "Do you offer discounts for recurring or bulk projects?", a: "Yes, contact us for custom pricing on recurring or large-scale IR projects." },
  { q: "Can you assist with investor fact sheets?", a: "We design concise, impactful investor fact sheets and tear sheets." },
  { q: "Do you provide editable graphics and charts?", a: "Yes, all graphics and charts are delivered in editable formats where possible." },
  { q: "How do I start a project with you?", a: "Contact us via the form or Get In Touch button to discuss your IR design needs." },
  { q: "Are your services available outside Pretoria?", a: "Yes, we serve clients across South Africa and internationally via remote collaboration." },
  { q: "Can you help with investor presentations for roadshows?", a: "Yes, we design impactful roadshow presentations for investor engagement." },
  { q: "Do you provide after-sales support?", a: "We offer limited after-sales support for minor tweaks and troubleshooting." },
  { q: "Do you offer training on using IR presentations?", a: "We provide basic handover and guidance; full IR training can be arranged on request." },
  { q: "Can you create presentations for M&A or corporate actions?", a: "Yes, we design for M&A, capital raising, and other corporate actions." },
  { q: "How do you handle project communication?", a: "We communicate via email, phone, or video call for clear project updates and feedback." },
  { q: "Can you sign an NDA for sensitive projects?", a: "Yes, we are happy to sign NDAs to ensure confidentiality and data security." },
  { q: "What sets your Pretoria IR design apart?", a: "We combine local Pretoria insight with global IR best practices for exceptional results." },
  { q: "Can you design IR materials for JSE-listed companies?", a: "Yes, we have experience designing for JSE-listed and private companies alike." },
  { q: "Do you offer copyediting and proofreading?", a: "We can provide copyediting and proofreading for all IR materials as an add-on service." }
];

export default function InvestorRelationsMaterialDesignServicesPretoria() {
  return (
    <div className="min-h-screen bg-black text-white py-20 px-4 sm:px-6 lg:px-8">
      <section className="max-w-3xl mx-auto text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4">Investor Relations Material Design Services Pretoria</h1>
        <p className="text-lg text-gray-300 mb-6">Professional design and copy for investor decks, shareholder updates, and financial communications. Impress your stakeholders with clear, compelling, and compliant presentations.</p>
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
        <h2>Investor Relations Material Design Services FAQ</h2>
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
        <h2>Investor Relations Material Design in Pretoria</h2>
        <p>Our investor relations material design services in Pretoria empower companies to communicate effectively with shareholders, analysts, and the investment community. We create compelling IR decks, shareholder updates, and financial presentations that comply with industry regulations and resonate with Pretoria’s business audience.</p>
        <p>With a focus on clarity, compliance, and visual impact, we help Pretoria-based companies build trust and credibility through expertly designed investor relations materials tailored for both local and international investors.</p>
        <h3>Why Choose Pretoria for IR Design?</h3>
        <p>Pretoria is a hub for corporate headquarters and listed companies in South Africa. Our IR design services leverage local market insights and global best practices to ensure your materials stand out in investor communications, AGMs, and results announcements.</p>
        <p>We understand the needs of Pretoria’s financial sector and can adapt our IR design solutions for JSE-listed companies, private firms, and startups alike.</p>
        <h4>Custom IR Decks, Reports, and Presentations</h4>
        <p>Every investor relations project is unique. We offer custom IR deck design, annual and integrated report layouts, and tailored financial presentations for Pretoria clients. Our team integrates your branding, data, and messaging for maximum impact.</p>
        <p>From IPO roadshows to quarterly results, our Pretoria IR designers deliver professional, compliant, and engaging materials that support your investor relations strategy.</p>
        <h5>Serving Pretoria’s Corporate Community</h5>
        <p>We serve a diverse range of Pretoria clients, from blue-chip corporates to innovative startups. Our IR design portfolio includes work for major financial institutions, mining companies, and technology firms in Pretoria and Gauteng.</p>
        <p>Whether you need a one-off investor presentation or ongoing IR support, our Pretoria team is ready to help you achieve your communication goals.</p>
        <h2>IR Design Compliance and Best Practices</h2>
        <p>Compliance is critical in investor relations. We ensure all Pretoria IR materials follow JSE, King IV, and global IR standards, giving your stakeholders confidence in your communications.</p>
        <p>Our Pretoria IR design team stays up to date with evolving disclosure requirements and industry trends, ensuring your materials are always relevant and effective.</p>
        <h3>Affordable Investor Relations Design Packages Pretoria</h3>
        <p>Our investor relations design packages are competitively priced for Pretoria businesses. We offer transparent pricing, fast turnaround, and scalable solutions for projects of any size.</p>
        <p>Contact us to discuss your IR design needs in Pretoria and discover how we can elevate your investor communications.</p>
        <h4>Pretoria, Gauteng, and South Africa Coverage</h4>
        <p>Based in Pretoria, we work with clients across Gauteng and South Africa. Our remote collaboration tools allow us to deliver IR design excellence to companies nationwide.</p>
        <p>We understand Pretoria’s corporate culture and can adapt our services for local, national, or cross-border investor audiences.</p>
        <h5>Get Started with Pretoria’s IR Design Experts</h5>
        <p>Ready to improve your investor relations materials? Our Pretoria team is here to support your next AGM, results announcement, or investor roadshow with world-class design.</p>
        <p>Contact Pretoria’s leading IR design specialists for a free consultation and see how we can help you communicate with confidence.</p>
      </section>
    </div>
  );
}
