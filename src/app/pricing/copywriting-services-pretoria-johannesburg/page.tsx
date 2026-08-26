// Copywriting Services Pricing Page for Pretoria & Johannesburg
"use client";
import Link from 'next/link';
import RelatedServices from "@/components/RelatedServices";
import GetStartedButton from '@/components/GetStartedButton';

const copywritingPricing = [
  {
    name: "1–250 Words",
    price: "R300",
    features: ["Original copy by a professional writer", "SEO optimization included", "1 round of revisions", "Delivered in your preferred format"],
    description: "Great for ads, short bios, or product descriptions."
  },
  {
    name: "251–550 Words",
    price: "R550",
    features: ["Same features as above", "2 rounds of revisions", "Includes research & keyword targeting"],
    description: "Ideal for web pages, blog posts, or longer ads."
  },
  {
    name: "551+ Words",
    price: "Custom Quote",
    features: ["Bulk & retainer discounts", "Priority delivery available", "Dedicated account manager"],
    description: "",
    custom: true
  }
];

const faqs = [
  {
    question: "What do your copywriting services include?",
    answer: "We write original, persuasive copy tailored to your brand and audience, including research, SEO optimization, and revisions as set out in each package."
  },
  {
    question: "How much does copywriting cost?",
    answer: "Pricing is based on word count: R300 for 1–250 words, R550 for 251–550 words, and a custom quote for longer projects, with bulk and retainer discounts available."
  },
  {
    question: "What types of copy do you write?",
    answer: "Website copy, blog articles, ad copy, product descriptions, email campaigns, social media content, brochures, and press releases."
  },
  {
    question: "Is SEO optimization included?",
    answer: "Yes, every package includes SEO optimization, and the 251–550 word package adds keyword research and targeting."
  },
  {
    question: "How fast is delivery?",
    answer: "Most copywriting projects are completed within 2–5 business days depending on scope. Rush delivery is available, subject to availability."
  },
  {
    question: "Are revisions included?",
    answer: "Yes. The 1–250 word package includes 1 round of revisions and the 251–550 word package includes 2 rounds. Revision terms for larger projects are agreed in your custom quote."
  },
  {
    question: "Is the copy original?",
    answer: "All copy is written from scratch for your business and checked for plagiarism before delivery."
  },
  {
    question: "Can you write for specialised industries?",
    answer: "Yes, we research your industry and audience so the copy fits technical, professional, and niche sectors alike."
  },
  {
    question: "Do you offer retainers for ongoing content?",
    answer: "Yes, we offer monthly retainers with discounted rates for businesses that need regular content."
  },
  {
    question: "How do I get started?",
    answer: "Contact us through our website with a brief description of your project, and we will confirm the scope, price, and turnaround before writing begins."
  }
];

export default function CopywritingServices() {
  return (
    <div className="min-h-screen bg-black text-white py-20 px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold text-[#FFD700] mb-8 text-center">Copywriting Services Pricing (Pretoria & Johannesburg)</h1>
      <p className="text-lg text-neutral-300 max-w-2xl mx-auto mb-10 text-center">
        Creative, persuasive copywriting for web, blogs, ads, and more—crafted to engage, convert, and boost your brand. Our team delivers SEO-optimized, conversion-focused content tailored for your business in Pretoria and Johannesburg.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 my-12">
        {copywritingPricing.map((plan) => (
          <div key={plan.name} className="bg-zinc-900 rounded-xl shadow-lg p-8 border-2 border-[#FFD700]/70">
            <h3 className="text-2xl font-bold text-[#FFD700] mb-2">{plan.name}</h3>
            <div className="text-3xl font-extrabold text-white mb-1">{plan.price}</div>
            <ul className="text-white/90 text-sm mb-4 space-y-1">
              {plan.features.map((f, i) => <li key={i}>{f}</li>)}
            </ul>
            {plan.description && <div className="text-xs text-[#FFD700]/80">{plan.description}</div>}
            {plan.custom && (
              <GetStartedButton packageName={plan.name} packagePrice={plan.price} service="Copywriting" label="Get a Quote" className="mt-2 inline-block bg-[#FFD700] text-zinc-900 font-bold px-6 py-2 rounded-lg hover:bg-[#FFD700]/90 transition" />
            )}
          </div>
        ))}
      </div>
      <div className="max-w-3xl mx-auto mb-12">
        <h2 className="text-2xl font-bold text-[#FFD700] mb-4">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map((faq) => (
            <div key={faq.question} className="bg-zinc-900/50 rounded-xl p-5 border border-[#FFD700]/30">
              <h3 className="font-semibold text-[#FFD700] mb-1">{faq.question}</h3>
              <p className="text-neutral-300">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          'mainEntity': faqs.map((faq) => ({
            '@type': 'Question',
            'name': faq.question,
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': faq.answer
            }
          }))
        })
      }} />
      <RelatedServices currentService="Copywriting Services" services={[
        { title: "Transcription Services", description: "Audio and video to text.", href: "/pricing/transcription-services-pretoria-johannesburg", anchor: "View Service" },
        { title: "Copy Editing Services", description: "Proofreading and editing for clarity.", href: "/pricing/copy-editing-services-pretoria-johannesburg", anchor: "View Service" }
      ]} />
      <div className="mt-10 text-center">
        <p className="text-neutral-400 text-sm">
          Explore more on our
          {" "}
          <Link href="/" className="text-[#FFD700] hover:underline">Pretoria copywriting agency</Link>
          {" "}
          homepage.
        </p>
      </div>
    </div>
  );
}
