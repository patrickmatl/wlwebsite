"use client";

import GetInTouchButton from "@/components/GetInTouchButton";
import Link from 'next/link';

const pricing = [
  {
    name: "Starter Presentation",
    price: "R3,500",
    features: [
      "Up to 10 custom slides",
      "Basic branding & layout",
      "1 revision round",
      "Delivered in PowerPoint or PDF"
    ]
  },
  {
    name: "Professional Deck",
    price: "R6,500",
    features: [
      "Up to 25 custom slides",
      "Advanced branding & infographics",
      "2 revision rounds",
      "Editable PPTX & PDF files"
    ]
  },
  {
    name: "Executive Presentation",
    price: "R11,000",
    features: [
      "Up to 40 slides",
      "Premium design, icons & data visuals",
      "Unlimited revisions (within scope)",
      "Editable PPTX, PDF, Keynote, Google Slides"
    ]
  }
];

// EXTENDED FAQ DATA (40 total)
const faqs = [
  {
    q: "What is professional presentation design?",
    a: "Professional presentation design involves creating visually compelling slides that communicate your message clearly and effectively, using branding, layout, and data visualization best practices."
  },
  {
    q: "Do you offer PowerPoint design services in Pretoria?",
    a: "Yes, we provide expert PowerPoint presentation design services in Pretoria and nationwide, tailored to your business needs."
  },
  {
    q: "Can you design Google Slides and Keynote presentations?",
    a: "Absolutely! We design presentations for PowerPoint, Google Slides, Keynote, and other formats, ensuring consistency across platforms."
  },
  {
    q: "How much does a business presentation design cost?",
    a: "Our business presentation design packages start from R3,500 for a basic deck and scale up based on slide count, complexity, and customization."
  },
  {
    q: "What is included in your presentation design packages?",
    a: "Packages include custom slides, branding, infographics, data visualization, and revision rounds. See our pricing section for details."
  },
  {
    q: "How long does it take to design a presentation?",
    a: "Turnaround times range from 2–7 days depending on the package and project scope. Rush delivery is available on request."
  },
  {
    q: "Can you help with investor pitch decks?",
    a: "Yes, we specialize in investor pitch deck design, ensuring your story is clear, persuasive, and visually engaging for potential investors."
  },
  {
    q: "Do you design conference or event presentations?",
    a: "We create impactful conference, event, and seminar presentations that capture attention and reinforce your message."
  },
  {
    q: "Will my slides be editable after delivery?",
    a: "Yes, all final presentations are delivered in editable formats (PPTX, Google Slides, Keynote) unless otherwise requested."
  },
  {
    q: "Can you incorporate my company branding?",
    a: "Absolutely. We use your corporate identity, color palette, fonts, and logos to ensure brand consistency throughout your presentation."
  },
  {
    q: "What if I need revisions?",
    a: "All packages include at least one revision round. Additional revisions can be arranged as needed."
  },
  {
    q: "Is my content confidential?",
    a: "Yes, we treat all client content as strictly confidential and can sign NDAs if required."
  },
  {
    q: "Do you provide copywriting for presentations?",
    a: "We offer copywriting and content refinement as an add-on service to ensure your slides are concise and impactful."
  },
  {
    q: "Can you create infographics and data visualizations for my slides?",
    a: "Yes, we specialize in creating custom infographics and data visuals to enhance your presentation's clarity and appeal."
  },
  {
    q: "How do I get started with your presentation design services?",
    a: "Simply contact us using the form or button on this page. We'll discuss your needs and recommend the best package for you."
  },
  { q: "Do you offer custom template design for companies?", a: "Yes, we design custom PowerPoint, Google Slides, and Keynote templates for consistent branding across your organization." },
  { q: "Can you redesign my existing presentation?", a: "Absolutely. We can refresh and modernize your current slides, improving visuals, layout, and messaging." },
  { q: "Do you provide training on using the presentations?", a: "We offer basic handover and guidance. Full presentation skills training can be arranged as an additional service." },
  { q: "What industries do you serve with presentation design?", a: "We serve all industries, including finance, healthcare, education, tech, legal, and more." },
  { q: "Can you add animations and transitions?", a: "Yes, we can add tasteful animations and transitions to enhance engagement without distracting from your message." },
  { q: "Do you design multilingual presentations?", a: "Yes, we can work with content in multiple languages or create multilingual decks as needed." },
  { q: "Can you help with presentation storytelling and structure?", a: "We assist with structuring your presentation for maximum impact, including storyline, flow, and slide order." },
  { q: "Do you offer rush or overnight presentation design?", a: "Rush delivery is available for an additional fee, subject to availability and project scope." },
  { q: "How do you deliver the final presentation?", a: "We deliver presentations via secure download link or email, in your requested file format(s)." },
  { q: "Can you design presentations for online webinars?", a: "Yes, we optimize presentations for both in-person and virtual events, including webinars and remote meetings." },
  { q: "Do you offer on-site presentation support in Pretoria?", a: "On-site support is available in Pretoria for large projects or events, subject to scheduling and fees." },
  { q: "What payment methods do you accept?", a: "We accept EFT, credit card, and other common payment options for your convenience." },
  { q: "Can you design presentations for NGOs and non-profits?", a: "Yes, we offer special rates and tailored services for NGOs and non-profit organizations." },
  { q: "Can you help with presentation printing?", a: "We can provide print-ready files and coordinate with printers if required." },
  { q: "Do you offer ongoing presentation support?", a: "Yes, we offer retainer and ongoing support packages for frequent presentation needs." },
  { q: "Can you design interactive presentations?", a: "We can create interactive elements such as clickable navigation, embedded media, and more." },
  { q: "How do you ensure presentations are accessible?", a: "We follow accessibility best practices, including readable fonts, color contrast, and alt text where possible." },
  { q: "Do you use stock images or custom graphics?", a: "We use a mix of high-quality stock images and custom graphics/illustrations as needed." },
  { q: "Can you sign an NDA for sensitive projects?", a: "Yes, we are happy to sign NDAs to ensure your confidentiality and data security." },
  { q: "What is your revision policy?", a: "Each package includes a set number of revisions; additional revisions are available at an hourly rate." },
  { q: "Do you offer discounts for bulk or recurring projects?", a: "We offer discounts for large or ongoing presentation projects – contact us for a custom quote." },
  { q: "Can you design scientific or technical presentations?", a: "Yes, we have experience designing for technical, scientific, and academic audiences." },
  { q: "How do you handle client feedback during the design process?", a: "We provide preview links and regular updates for your feedback and approval at each stage." },
  { q: "Can you help with presentation delivery and public speaking?", a: "We can refer you to trusted partners for public speaking coaching and delivery training." },
  { q: "Do you provide editable icons and infographics?", a: "Yes, all custom icons and infographics are delivered in editable vector formats where possible." },
  { q: "Can you work with tight deadlines?", a: "We do our best to accommodate urgent requests – let us know your timeline when you enquire." },
  { q: "How do I book your presentation design service?", a: "Simply use the contact form or Get In Touch button on this page to start your project." },
  { q: "Are your services available outside Pretoria?", a: "Yes, we serve clients across South Africa and internationally via remote collaboration." },
  { q: "Can you design presentations for sales pitches?", a: "Yes, persuasive sales pitch decks are one of our specialties." },
  { q: "What software do you use for presentation design?", a: "We use PowerPoint, Google Slides, Keynote, Adobe Creative Suite, and Figma as required." },
  { q: "Do you offer student or academic presentation design?", a: "Yes, we assist students and academics with thesis, dissertation, and research presentations." },
  { q: "Can you design presentations for tenders and proposals?", a: "We create professional tender, RFP, and proposal presentations to help you win new business." },
  { q: "Will my presentation be mobile-friendly?", a: "We design with responsive layouts in mind for optimal viewing on all devices." },
  { q: "How do you ensure quality control?", a: "All presentations undergo internal review and quality checks before final delivery." },
  { q: "Can you include video or audio in my presentation?", a: "Yes, we can embed video, audio, and interactive media as required." },
  { q: "Do you offer after-sales support?", a: "We provide limited after-sales support for minor tweaks and troubleshooting." },
  { q: "How do you handle project communication?", a: "We communicate via email, phone, or video call to ensure clear project updates and feedback." },
  { q: "What sets your Pretoria presentation design apart?", a: "Our Pretoria team combines local insight with global design standards for exceptional results." }
];

export default function PresentationDesignServicesPretoria() {
  return (
    <div className="min-h-screen bg-black text-white py-20 px-4 sm:px-6 lg:px-8">
      <section className="max-w-3xl mx-auto text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4">Presentation Design Services Pretoria</h1>
        <p className="text-lg text-gray-300 mb-6">Custom PowerPoint, Google Slides, and Keynote presentations to impress your audience and elevate your brand. We create visually stunning, persuasive presentations for business, investor, and conference needs.</p>
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
        <h2>Presentation Design Services FAQ</h2>
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
        <h2>Expert Presentation Design Services in Pretoria</h2>
        <p>Our presentation design services in Pretoria are tailored to help businesses, professionals, and organizations create visually compelling slides that captivate audiences and communicate key messages effectively. Whether you need investor presentations, sales decks, or conference visuals, our Pretoria-based team combines creativity with strategic storytelling for maximum impact.</p>
        <p>By leveraging the latest design trends and tools, we ensure your presentations stand out in a competitive market. Our expertise covers PowerPoint, Google Slides, and custom solutions, making us the go-to choice for presentation design in Pretoria and throughout South Africa.</p>
        <h3>Why Choose Our Pretoria Presentation Designers?</h3>
        <p>Choosing our Pretoria presentation designers means partnering with professionals who understand both local and global business needs. We offer personalized service, fast turnaround times, and a commitment to quality that sets us apart from generic online providers.</p>
        <p>Our portfolio includes work for leading Pretoria companies, NGOs, and government agencies, ensuring your presentation aligns with industry standards and resonates with your target audience.</p>
        <h4>Custom Business Presentation Solutions</h4>
        <p>Every business has unique goals, which is why we offer custom presentation design solutions tailored to your brand and objectives. From pitch decks for Pretoria startups to corporate reports for established enterprises, our team delivers results that drive engagement and action.</p>
        <p>We integrate your branding, data, and messaging to create cohesive, persuasive presentations that help you win clients, secure funding, or inform stakeholders.</p>
        <h5>Pretoria Presentation Design for All Industries</h5>
        <p>Our Pretoria presentation design services cater to a wide range of industries, including finance, healthcare, education, and technology. We understand sector-specific requirements and adapt our approach to meet your unique needs.</p>
        <p>Whether you’re presenting to investors, employees, or customers, our designs help you communicate with clarity and confidence across Pretoria and beyond.</p>
        <h2>PowerPoint and Google Slides Specialists in Pretoria</h2>
        <p>We specialize in designing high-impact PowerPoint and Google Slides presentations for Pretoria clients. Our team ensures seamless compatibility, easy editing, and visually consistent slides that reinforce your message and brand identity.</p>
        <p>With years of experience in Pretoria’s business landscape, we know how to create presentations that impress local and international audiences alike.</p>
        <h3>Affordable Presentation Design Packages Pretoria</h3>
        <p>Our affordable presentation design packages are structured to suit businesses of all sizes in Pretoria. Transparent pricing, clear deliverables, and no hidden fees make us the preferred choice for professional presentation design in Gauteng and South Africa.</p>
        <p>Contact us to learn more about our Pretoria presentation design packages, or request a custom quote for your next project.</p>
        <h4>Serving Pretoria, Gauteng, and South Africa</h4>
        <p>Based in Pretoria, we proudly serve clients across Gauteng and South Africa. Our remote collaboration tools allow us to work with businesses nationwide, delivering presentation design excellence wherever you are located.</p>
        <p>We understand the Pretoria market and can adapt our services to local trends, languages, and business cultures for maximum relevance and effectiveness.</p>
        <h5>Get Started with Pretoria’s Leading Presentation Designers</h5>
        <p>Ready to elevate your presentations? Our Pretoria team is here to help you make a lasting impression. Reach out today for a free consultation and discover how our presentation design services can transform your next pitch, report, or event.</p>
        <p>Experience the difference of working with Pretoria’s top-rated presentation design specialists—your success is our priority.</p>
      </section>
      <div className="mt-4 text-center">
        <p className="text-neutral-400 text-sm">
          Learn more on our {" "}
          <Link href="/" className="text-[#FFD700] hover:underline">Pretoria presentation design studio</Link>
          {" "} homepage.
        </p>
      </div>
    </div>
  );
}
