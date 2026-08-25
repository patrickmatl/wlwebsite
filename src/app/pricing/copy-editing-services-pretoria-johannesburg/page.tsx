// Copy Editing Services Pricing Page for Pretoria & Johannesburg
"use client";
import RelatedServices from "@/components/RelatedServices";
import Link from 'next/link';

const copyEditingPricing = [
  {
    name: "1–250 Words",
    price: "R200",
    features: ["Editing for grammar, clarity, and style", "Tracked changes provided", "1 round of revisions", "Delivered in Word or PDF"],
    description: "Perfect for short articles, bios, or emails."
  },
  {
    name: "251–550 Words",
    price: "R400",
    features: ["Same features as above", "2 rounds of revisions", "Includes formatting suggestions"],
    description: "Great for reports, proposals, or web content."
  },
  {
    name: "551+ Words",
    price: "Custom Quote",
    features: ["Bulk discounts available", "Priority & express options", "Dedicated account manager"],
    description: "",
    quoteLink: "/get-in-touch-pretoria"
  }
];

const faqs = [
  {
    question: "What is copy editing?",
    answer: "Copy editing improves the grammar, clarity, style, tone, and consistency of your writing, with tracked changes so you can see every improvement."
  },
  {
    question: "What types of documents do you edit?",
    answer: "We edit articles, reports, web content, academic papers, business proposals, marketing materials, CVs and cover letters, and more."
  },
  {
    question: "How is pricing calculated?",
    answer: "Pricing is based on word count: R200 for 1–250 words, R400 for 251–550 words, and a custom quote for longer documents, with bulk discounts for larger or ongoing projects."
  },
  {
    question: "Can I request revisions?",
    answer: "Yes. The 1–250 word package includes 1 round of revisions and the 251–550 word package includes 2 rounds. Revision terms for larger projects are agreed in your custom quote."
  },
  {
    question: "Is my content confidential?",
    answer: "Absolutely. All documents are handled with strict confidentiality and security, and NDAs are available on request."
  },
  {
    question: "How long does copy editing take?",
    answer: "Most projects are completed within 2–4 business days. Expedited turnaround for urgent work is available, subject to availability."
  },
  {
    question: "Do you edit for non-native English speakers?",
    answer: "Yes, we regularly edit documents written by non-native English speakers to make the writing read naturally and clearly."
  },
  {
    question: "Can you format documents to a specific style guide?",
    answer: "Yes, we can edit and format documents to meet APA, Chicago, and other common style guides."
  },
  {
    question: "Is there a minimum order size?",
    answer: "No, we accept copy editing projects of any size, from a single email to a full manuscript."
  },
  {
    question: "How do I send my documents?",
    answer: "Contact us through our website or email your documents to us, and we will confirm the scope, price, and turnaround before starting."
  }
];

export default function CopyEditingServices() {
  return (
    <div className="min-h-screen bg-black text-white py-20 px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold text-[#FFD700] mb-8 text-center">Copy Editing Services Pricing (Pretoria & Johannesburg)</h1>
      <p className="text-lg text-neutral-300 max-w-2xl mx-auto mb-10 text-center">
        Professional copy editing to ensure your writing is clear, error-free, and impactful. We edit for grammar, style, tone, and consistency—perfect for business, academic, and creative content in Pretoria and Johannesburg.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 my-12">
        {copyEditingPricing.map((plan) => (
          <div key={plan.name} className="bg-zinc-900 rounded-xl shadow-lg p-8 border-2 border-[#FFD700]/70">
            <h3 className="text-2xl font-bold text-[#FFD700] mb-2">{plan.name}</h3>
            <div className="text-3xl font-extrabold text-white mb-1">{plan.price}</div>
            <ul className="text-white/90 text-sm mb-4 space-y-1">
              {plan.features.map((f, i) => <li key={i}>{f}</li>)}
            </ul>
            {plan.description && <div className="text-xs text-[#FFD700]/80">{plan.description}</div>}
            {plan.quoteLink && (
              plan.quoteLink.startsWith('http') || plan.quoteLink.startsWith('mailto:') || plan.quoteLink.startsWith('tel:') ? (
                <a href={plan.quoteLink} className="mt-2 inline-block bg-[#FFD700] text-zinc-900 font-bold px-6 py-2 rounded-lg hover:bg-[#FFD700]/90 transition" target="_blank" rel="noopener noreferrer">Get a Quote</a>
              ) : (
                <Link href={plan.quoteLink} className="mt-2 inline-block bg-[#FFD700] text-zinc-900 font-bold px-6 py-2 rounded-lg hover:bg-[#FFD700]/90 transition">Get a Quote</Link>
              )
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
      <RelatedServices currentService="Copy Editing Services" services={[
        { title: "Transcription Services", description: "Accurate audio/video to text.", href: "/pricing/transcription-services-pretoria-johannesburg", anchor: "View Service" },
        { title: "Copywriting Services", description: "Professional writing for all needs.", href: "/pricing/copywriting-services-pretoria-johannesburg", anchor: "View Service" }
      ]} />
      <div className="mt-10 text-center">
        <p className="text-neutral-400 text-sm">
          Explore more on our
          {" "}
          <Link href="/" className="text-[#FFD700] hover:underline">Pretoria editing services</Link>
          {" "}
          homepage.
        </p>
      </div>
    </div>
  );
}
