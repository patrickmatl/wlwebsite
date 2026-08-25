// Transcription Services Pricing Page for Pretoria & Johannesburg
"use client";
import RelatedServices from "@/components/RelatedServices";
import Link from 'next/link';

const transcriptionPricing = [
  {
    name: "1–250 Words",
    price: "R250",
    features: ["Professional transcription by a human expert", "Standard turnaround (24–48 hours)", "Includes timestamps & speaker labels", "Audio/video accepted", "Free minor edits"],
    description: "Perfect for short interviews, memos, or voice notes."
  },
  {
    name: "251–550 Words",
    price: "R450",
    features: ["Same features as above", "Includes quality review"],
    description: "Ideal for meetings, podcasts, or lectures."
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
    question: "What types of transcription do you offer?",
    answer: "We offer clean and verbatim transcription, as well as technical, medical, legal, academic, and media transcription."
  },
  {
    question: "How much does transcription cost?",
    answer: "Pricing is based on the transcript's word count: R250 for 1–250 words, R450 for 251–550 words, and a custom quote for longer recordings, with bulk discounts available."
  },
  {
    question: "How fast is delivery?",
    answer: "Most files are delivered within 24–48 hours. Priority and express options are available for urgent projects."
  },
  {
    question: "Are my files confidential?",
    answer: "Yes, all files are handled securely and confidentially, and NDAs are available on request."
  },
  {
    question: "What file formats do you accept?",
    answer: "All common audio and video formats, including MP3, WAV, MP4, and MOV."
  },
  {
    question: "Do transcripts include timestamps and speaker labels?",
    answer: "Yes, timestamps and speaker labels are included with every transcription package."
  },
  {
    question: "Can you handle poor-quality or multi-speaker audio?",
    answer: "Yes, our experienced transcribers work with challenging audio and multi-speaker recordings; we will flag any sections that are genuinely inaudible."
  },
  {
    question: "Do you transcribe languages other than English?",
    answer: "Yes, we offer transcription in English, Afrikaans, and other major languages on request."
  },
  {
    question: "Do you offer discounts for bulk or ongoing projects?",
    answer: "Yes, contact us for custom pricing on large or recurring transcription projects."
  },
  {
    question: "In what format will I receive my transcript?",
    answer: "Transcripts are delivered in Word or PDF by default, and other formats can be arranged on request."
  }
];

export default function TranscriptionServices() {
  return (
    <div className="min-h-screen bg-black text-white py-20 px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold text-[#FFD700] mb-8 text-center">Transcription Services Pricing</h1>
      <p className="text-lg text-neutral-300 max-w-2xl mx-auto mb-10 text-center">
        Professional audio and video transcription services for businesses, academics, legal, and media clients. We deliver accurate, confidential transcripts with fast turnaround times—choose between clean or verbatim, standard or technical/medical.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 my-12">
        {transcriptionPricing.map((plan, i) => (
          <div key={i} className="bg-zinc-900 rounded-xl shadow-lg p-8 border-2 border-[#FFD700]/70">
            <h3 className="text-2xl font-bold text-[#FFD700] mb-2">{plan.name}</h3>
            <div className="text-3xl font-extrabold text-white mb-1">{plan.price}</div>
            <ul className="text-white/90 text-sm mb-4 space-y-1">
              {plan.features.map((f, j) => <li key={j}>{f}</li>)}
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
      <RelatedServices currentService="Transcription Services" services={[
        { title: "Copywriting Services", description: "Professional copy for web, ads, and more.", href: "/pricing/copywriting-services-pretoria-johannesburg", anchor: "View Service" },
        { title: "Copy Editing Services", description: "Ensure clarity and correctness.", href: "/pricing/copy-editing-services-pretoria-johannesburg", anchor: "View Service" }
      ]} />
    </div>
  );
}
