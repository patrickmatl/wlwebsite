// Test commit to update timestamp: 2025-04-25T20:12:15+02:00
"use client";

import { motion } from "framer-motion";
import GetInTouchButton from "@/components/GetInTouchButton";
import RelatedServices from "@/components/RelatedServices";
import Link from 'next/link';
import GetStartedButton from '@/components/GetStartedButton';

const relatedServices = [
  {
    title: "Graphic Design",
    description: "Creative graphic design for all your business needs.",
    href: "/pricing/graphic-design-pretoria",
    anchor: "View Service"
  },
  {
    title: "Brand Identity",
    description: "Build a memorable and cohesive brand identity.",
    href: "/pricing/brand-identity",
    anchor: "View Service"
  },
  {
    title: "Print Design",
    description: "Professional print design for brochures, flyers, and more.",
    href: "/pricing/print-design-pretoria",
    anchor: "View Service"
  },
  {
    title: "Packaging Design",
    description: "Eye-catching packaging design that stands out.",
    href: "/pricing/packaging-design-pretoria",
    anchor: "View Service"
  },
  {
    title: "Marketing Materials",
    description: "Effective marketing materials to promote your business.",
    href: "/pricing/marketing-materials-pretoria",
    anchor: "View Service"
  },
  {
    title: "Annual Report Design & Print",
    description: "Professional annual report design and print services in Pretoria.",
    href: "/pricing/annual-report-design-and-print-pretoria",
    anchor: "View Service"
  }
];

const faqs = [
  {
    question: "What is annual report design?",
    answer: "Annual report design is the process of creating a visually engaging, professionally formatted document that communicates a company’s yearly performance, achievements, and financial data. Our Pretoria team specializes in impactful annual report design."
  },
  {
    question: "Why is professional annual report design important for Pretoria businesses?",
    answer: "Professional annual report design builds trust with stakeholders, investors, and clients by presenting information clearly and reflecting your Pretoria brand’s quality and credibility."
  },
  {
    question: "How do I choose the best annual report designers in Pretoria?",
    answer: "Look for Pretoria annual report designers with a strong portfolio, creative skills, and experience in your industry. WL CreationX is a leading choice for annual report design and print in Pretoria and Gauteng."
  },
  {
    question: "Do you offer annual report printing in Pretoria?",
    answer: "Yes, we provide high-quality annual report printing in Pretoria, with options for paper, binding, and finishing to suit your needs."
  },
  {
    question: "What types of annual reports do you design and print?",
    answer: "We design and print corporate annual reports, financial reports, sustainability reports, NGO reports, and more for Pretoria and South African organizations."
  },
  {
    question: "Can you help with copywriting and content for my annual report?",
    answer: "Absolutely. Our Pretoria team offers copywriting, editing, and data visualization for annual reports, ensuring your message is clear and compelling."
  },
  {
    question: "How long does annual report design and print take?",
    answer: "Typical annual report projects in Pretoria take 2–4 weeks, depending on complexity, content, and client feedback cycles."
  },
  {
    question: "What is the cost of annual report design in Pretoria?",
    answer: "Annual report design pricing in Pretoria varies by length, complexity, and print requirements. Contact us for a tailored quote."
  },
  {
    question: "Do you offer digital annual report design for Pretoria clients?",
    answer: "Yes, we design interactive and digital annual reports for Pretoria businesses, ideal for online distribution and engagement."
  },
  {
    question: "Can you print annual reports for companies outside Pretoria?",
    answer: "We primarily serve Pretoria and Gauteng, but also print and deliver annual reports across South Africa."
  },
  {
    question: "What makes your annual report design services unique in Pretoria?",
    answer: "We combine creative layouts, infographics, and premium printing to deliver standout annual reports for Pretoria clients."
  },
  {
    question: "What file formats do you provide for annual report design?",
    answer: "We deliver annual report designs in print-ready PDF, digital PDF, and other formats as needed for Pretoria clients."
  },
  {
    question: "Can you include infographics and charts in my annual report?",
    answer: "Yes, our Pretoria team creates custom infographics, charts, and data visualizations for impactful annual report design."
  },
  {
    question: "How do I start my annual report project in Pretoria?",
    answer: "Contact WL CreationX to discuss your annual report design and print needs. We’ll guide you through every step."
  },
  {
    question: "Do you sign NDAs for confidential annual report projects?",
    answer: "Yes, we sign NDAs and treat all Pretoria client information with strict confidentiality."
  },
  {
    question: "Can you design bilingual or multilingual annual reports?",
    answer: "Yes, we offer bilingual and multilingual annual report design for Pretoria and South African organizations."
  },
  {
    question: "What industries do you serve for annual report design in Pretoria?",
    answer: "We serve corporates, NGOs, government, education, healthcare, finance, and more in Pretoria and Gauteng."
  },
  {
    question: "Do you offer rush or express annual report printing in Pretoria?",
    answer: "Yes, we offer rush and express annual report printing for urgent Pretoria projects, subject to availability."
  },
  {
    question: "What binding options are available for annual report printing?",
    answer: "We offer saddle-stitched, perfect bound, spiral, and hardcover binding for annual report printing in Pretoria."
  },
  {
    question: "Can you help with annual report compliance and regulations?",
    answer: "Yes, we design annual reports that meet South African compliance and reporting standards."
  },
  {
    question: "What are the steps in your annual report design process?",
    answer: "Our Pretoria annual report process includes briefing, content planning, design, proofing, printing, and delivery."
  },
  {
    question: "How do you ensure brand consistency in annual report design?",
    answer: "We use your Pretoria company’s brand guidelines to ensure consistent colors, fonts, and messaging throughout the annual report."
  },
  {
    question: "Do you offer eco-friendly annual report printing in Pretoria?",
    answer: "Yes, we offer sustainable and eco-friendly paper and print options for annual reports in Pretoria and Gauteng."
  },
  {
    question: "Can I see samples of your annual report design work?",
    answer: "Yes, view our Pretoria annual report design portfolio on our website or request samples."
  },
  {
    question: "What is the minimum order for annual report printing?",
    answer: "We print annual reports in Pretoria with flexible minimum orders, suitable for small and large organizations."
  },
  {
    question: "Do you offer annual report mailing and distribution in Pretoria?",
    answer: "Yes, we can arrange mailing and distribution of printed annual reports within Pretoria and South Africa."
  },
  {
    question: "Can you redesign my old annual report?",
    answer: "Yes, we redesign outdated annual reports for Pretoria businesses to modernize and refresh your brand image."
  },
  {
    question: "How do you handle revisions and feedback?",
    answer: "We include revision rounds in our Pretoria annual report packages to ensure your satisfaction."
  },
  {
    question: "What is the difference between annual report design and corporate brochure design?",
    answer: "Annual report design focuses on yearly performance and compliance, while brochures are for marketing. We offer both in Pretoria."
  },
  {
    question: "Do you offer annual report design for NGOs and non-profits?",
    answer: "Yes, we specialize in annual report design and print for Pretoria NGOs, non-profits, and charities."
  },
  {
    question: "Can you help with financial report design and presentation?",
    answer: "Yes, our Pretoria designers are experts in financial report design and clear data presentation."
  },
  {
    question: "What languages do you support for annual report design?",
    answer: "We support English, Afrikaans, and other South African languages for annual report design in Pretoria."
  },
  {
    question: "How do you ensure the security of my annual report data?",
    answer: "All Pretoria client data is handled securely and confidentially throughout the annual report design and print process."
  },
  {
    question: "What makes WL CreationX the best choice for annual report design in Pretoria?",
    answer: "Our expertise, creativity, and client-focused approach make us Pretoria’s top agency for annual report design and print."
  },
  {
    question: "Can you help with annual report photography and imagery?",
    answer: "Yes, we offer photography and image sourcing for Pretoria annual report projects."
  },
  {
    question: "Do you offer interactive PDF annual reports?",
    answer: "Yes, we design interactive PDF annual reports for Pretoria businesses to enhance engagement and accessibility."
  },
  {
    question: "How do I provide content for my annual report?",
    answer: "We guide Pretoria clients through content collection, or provide copywriting and editing as needed."
  },
  {
    question: "Can you design annual reports for listed companies?",
    answer: "Yes, we design and print annual reports for JSE-listed and large Pretoria companies, meeting all regulatory requirements."
  },
  {
    question: "Do you offer annual report design workshops or consultations?",
    answer: "Yes, we offer workshops and consultations for Pretoria organizations planning their annual reports."
  },
  {
    question: "How do you handle last-minute changes to annual reports?",
    answer: "We work flexibly with Pretoria clients to accommodate urgent changes before printing."
  },
  {
    question: "Can you design annual reports for schools and educational institutions?",
    answer: "Yes, we design and print annual reports for Pretoria schools, colleges, and universities."
  },
  {
    question: "What is your experience with annual report projects in Pretoria?",
    answer: "We have years of experience delivering annual report design and print for Pretoria and Gauteng organizations."
  },
  {
    question: "Do you offer discounts for bulk annual report printing?",
    answer: "Yes, we provide competitive pricing and discounts for large annual report print runs in Pretoria."
  },
  {
    question: "Can you print annual reports with custom finishes and embossing?",
    answer: "Yes, we offer custom finishes, embossing, and foil for premium annual report printing in Pretoria."
  },
  {
    question: "How do I get a quote for annual report design and print?",
    answer: "Contact WL CreationX for a free quote on annual report design and print in Pretoria, Gauteng, and South Africa."
  },
  {
    question: "Do you serve clients outside South Africa?",
    answer: "Yes, we work with international clients seeking annual report design and print expertise from Pretoria."
  },
  {
    question: "Can you help with annual report project management?",
    answer: "Yes, we manage Pretoria annual report projects from start to finish, coordinating design, print, and delivery."
  },
  {
    question: "What payment methods do you accept for annual report projects?",
    answer: "We accept EFT, credit card, and other payment options for Pretoria annual report clients."
  },
  {
    question: "How do I review and approve my annual report before printing?",
    answer: "We provide digital proofs for Pretoria clients to review and approve before going to print."
  }
];

export default function AnnualReportDesignPrintPretoria() {
  return (
    <div className="min-h-screen bg-black text-white py-20 px-4 sm:px-6 lg:px-8">
      {/* FAQ structured data generated from the visible FAQ list below */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((faq) => ({
              "@type": "Question",
              name: faq.question,
              acceptedAnswer: {
                "@type": "Answer",
                text: faq.answer
              }
            }))
          })
        }}
      />

      {/* Hero Section */}
      <section className="text-center max-w-3xl mx-auto mb-12">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-4xl sm:text-5xl font-extrabold text-white mb-4"
        >
          Bespoke Annual Report Design
        </motion.h1>
        <p className="text-lg text-gray-300 mb-6">Showcase your achievements and vision with a professionally designed annual report tailored for your brand.</p>
        <GetInTouchButton className="mx-auto" />
      </section>

      {/* Process Section */}
      <section className="max-w-4xl mx-auto mb-16">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-2xl font-bold text-yellow-400 mb-8 text-center"
        >
          Our Creative Workflow
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-gray-900 p-6 rounded-lg shadow-lg flex flex-col items-center">
            <h3 className="text-lg font-semibold text-white mb-2">Choose Your Project Team</h3>
            <p className="text-gray-400 text-center">Select the ideal team from your company to coordinate and supply all necessary information for a seamless project experience.</p>
          </div>
          <div className="bg-gray-900 p-6 rounded-lg shadow-lg flex flex-col items-center">
            <h3 className="text-lg font-semibold text-white mb-2">Gather Key Content Year-Round</h3>
            <p className="text-gray-400 text-center">Consistently collect and organize your annual data to prevent last-minute rushes and ensure accuracy.</p>
          </div>
          <div className="bg-gray-900 p-6 rounded-lg shadow-lg flex flex-col items-center">
            <h3 className="text-lg font-semibold text-white mb-2">Thorough Review & Edits</h3>
            <p className="text-gray-400 text-center">Allow ample time for draft reviews and feedback so your report is polished and error-free.</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
          <div className="bg-gray-900 p-6 rounded-lg shadow-lg flex flex-col items-center">
            <h3 className="text-lg font-semibold text-white mb-2">Strategic Project Planning</h3>
            <p className="text-gray-400 text-center">Define clear responsibilities and deadlines for every stage to keep your project on track.</p>
          </div>
          <div className="bg-gray-900 p-6 rounded-lg shadow-lg flex flex-col items-center">
            <h3 className="text-lg font-semibold text-white mb-2">Design, Copywriting & Photography</h3>
            <p className="text-gray-400 text-center">Once the brief and content are ready, we craft your report’s narrative, visuals, and commission any required photography.</p>
          </div>
          <div className="bg-gray-900 p-6 rounded-lg shadow-lg flex flex-col items-center">
            <h3 className="text-lg font-semibold text-white mb-2">Print & Publication</h3>
            <p className="text-gray-400 text-center">After final approval, we manage the print and delivery for a flawless, on-time result.</p>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="max-w-5xl mx-auto mb-20">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-2xl font-bold text-yellow-400 mb-8 text-center"
        >
          Design Packages & Pricing
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Starter */}
          <div className="bg-gray-900 rounded-lg shadow-lg flex flex-col items-center p-6 border-2 border-yellow-400">
            <h3 className="text-xl font-semibold text-white mb-2">Starter</h3>
            <p className="text-yellow-300 text-3xl font-bold mb-2">R 25 000</p>
            <ul className="text-gray-400 mb-6 space-y-1 text-sm">
              <li>Striking cover design</li>
              <li>Custom collage artwork</li>
              <li>Professional typography</li>
              <li>Layout for up to 50 pages</li>
            </ul>
            <GetStartedButton packageName="Starter" packagePrice="R 25 000" service="Annual report design" label="Select Plan" className="inline-block bg-[#FFD700] text-black px-8 py-3 rounded-full font-medium hover:bg-[#FFA500] transition-all" />
          </div>
          {/* Professional */}
          <div className="bg-gray-900 rounded-lg shadow-lg flex flex-col items-center p-6 border-2 border-yellow-400">
            <h3 className="text-xl font-semibold text-white mb-2">Professional</h3>
            <p className="text-yellow-300 text-3xl font-bold mb-2">R 48 000</p>
            <ul className="text-gray-400 mb-6 space-y-1 text-sm">
              <li>All Starter features</li>
              <li>Layout for up to 100 pages</li>
              <li>Enhanced typographic artwork</li>
            </ul>
            <GetStartedButton packageName="Professional" packagePrice="R 48 000" service="Annual report design" label="Select Plan" className="bg-[#FFD700] text-black px-6 py-2 rounded-full font-medium hover:bg-[#FFA500] transition-all block" />
          </div>
          {/* Premium */}
          <div className="bg-gray-900 rounded-lg shadow-lg flex flex-col items-center p-6 border-2 border-yellow-400">
            <h3 className="text-xl font-semibold text-white mb-2">Premium</h3>
            <p className="text-yellow-300 text-3xl font-bold mb-2">R 71 000</p>
            <ul className="text-gray-400 mb-6 space-y-1 text-sm">
              <li>All Professional features</li>
              <li>Layout for up to 150 pages</li>
            </ul>
            <GetStartedButton packageName="Premium" packagePrice="R 71 000" service="Annual report design" label="Select Plan" className="bg-[#FFD700] text-black px-6 py-2 rounded-full font-medium hover:bg-[#FFA500] transition-all block" />
          </div>
          {/* Elite */}
          <div className="bg-gray-900 rounded-lg shadow-lg flex flex-col items-center p-6 border-2 border-yellow-400">
            <h3 className="text-xl font-semibold text-white mb-2">Elite</h3>
            <p className="text-yellow-300 text-3xl font-bold mb-2">R 94 000</p>
            <ul className="text-gray-400 mb-6 space-y-1 text-sm">
              <li>All Premium features</li>
              <li>Layout for up to 200 pages</li>
            </ul>
            <GetStartedButton packageName="Elite" packagePrice="R 94 000" service="Annual report design" label="Select Plan" className="bg-[#FFD700] text-black px-6 py-2 rounded-full font-medium hover:bg-[#FFA500] transition-all block" />
          </div>
        </div>
      </section>

      {/* Contact Encouragement */}
      <section className="max-w-3xl mx-auto mb-16 text-center">
        <h2 className="text-xl font-bold text-[#FFD700] mb-2">Not sure which plan is right for you?</h2>
        <p className="text-neutral-200 mb-4">Contact us for a free consultation or a custom quote tailored to your organization’s needs.</p>
        <Link href="/get-in-touch-pretoria" className="inline-block bg-[#FFD700] text-black px-8 py-3 rounded-full font-medium hover:bg-[#FFA500] transition-all">Contact Us</Link>
      </section>

  {/* Related Services */}
  <RelatedServices currentService="Annual Report Design & Print" services={relatedServices} />
  {/* Contextual link to homepage with varied phrasing */}
  <div className="max-w-3xl mx-auto text-center mt-8">
    <p className="text-neutral-400 text-sm">
      Learn more about our <Link href="/" className="text-[#FFD700] hover:underline">graphic design company Pretoria</Link> on the homepage.
    </p>
  </div>

      <section className="mx-auto max-w-4xl px-4 py-12 prose prose-invert prose-headings:font-syne prose-headings:text-[#FFD700] prose-p:text-neutral-300 prose-li:text-neutral-300 prose-strong:text-white">
        <h3>Frequently Asked Questions about Annual Report Design and Print in Pretoria</h3>
        {faqs.map((faq) => (
          <div key={faq.question}>
            <h4>{faq.question}</h4>
            <p>{faq.answer}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
