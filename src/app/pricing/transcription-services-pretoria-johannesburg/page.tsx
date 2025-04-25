// Transcription Services Pricing Page for Pretoria & Johannesburg
"use client";
import RelatedServices from "@/components/RelatedServices";

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
              <a href={plan.quoteLink} className="mt-2 inline-block bg-[#FFD700] text-zinc-900 font-bold px-6 py-2 rounded-lg hover:bg-[#FFD700]/90 transition">Get a Quote</a>
            )}
          </div>
        ))}
      </div>
      {/* Hidden SEO FAQ Schema Markup for Transcription Services Pretoria & Johannesburg */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          'mainEntity': [
            {
              '@type': 'Question',
              'name': 'What types of transcription do you offer?',
              'acceptedAnswer': {
                '@type': 'Answer',
                'text': 'Verbatim, clean, technical, medical, legal, and more.'
              }
            },
            {
              '@type': 'Question',
              'name': 'How fast is delivery?',
              'acceptedAnswer': {
                '@type': 'Answer',
                'text': 'Most files delivered within 24-48 hours. Rush options available.'
              }
            },
            {
              '@type': 'Question',
              'name': 'Are files confidential?',
              'acceptedAnswer': {
                '@type': 'Answer',
                'text': 'Yes, all files are handled securely and confidentially. NDAs available.'
              }
            },
            {
              '@type': 'Question',
              'name': 'What file types do you accept?',
              'acceptedAnswer': {
                '@type': 'Answer',
                'text': 'All common audio/video formats (MP3, WAV, MP4, MOV, etc.).'
              }
            },
            {
              '@type': 'Question',
              'name': 'Do you offer bulk or ongoing project discounts?',
              'acceptedAnswer': {
                '@type': 'Answer',
                'text': 'Yes, contact us for custom pricing on large or recurring projects.'
              }
            },
            {
              '@type': 'Question',
              'name': 'What are transcription services in Pretoria and Johannesburg?',
              'acceptedAnswer': {
                '@type': 'Answer',
                'text': 'Transcription services in Pretoria and Johannesburg convert audio and video files into accurate text documents for legal, academic, business, and media clients.'
              }
            },
            {
              '@type': 'Question',
              'name': 'How much do transcription services cost in Pretoria?',
              'acceptedAnswer': {
                '@type': 'Answer',
                'text': 'Industry-standard transcription pricing in Pretoria starts from R18 per audio minute for standard audio. Premium and technical transcription may cost more.'
              }
            },
            {
              '@type': 'Question',
              'name': 'How fast is the turnaround for transcription in Johannesburg?',
              'acceptedAnswer': {
                '@type': 'Answer',
                'text': 'Most transcription services in Johannesburg deliver within 24-48 hours, with rush options available for urgent projects.'
              }
            },
            {
              '@type': 'Question',
              'name': 'Are transcription services confidential in Pretoria?',
              'acceptedAnswer': {
                '@type': 'Answer',
                'text': 'Yes, all transcription services in Pretoria and Johannesburg are handled with strict confidentiality and security protocols.'
              }
            },
            {
              '@type': 'Question',
              'name': 'Do you offer transcription for medical and legal files in Johannesburg?',
              'acceptedAnswer': {
                '@type': 'Answer',
                'text': 'Yes, we provide medical and legal transcription services in Johannesburg and Pretoria, including technical terminology and secure handling.'
              }
            },
            {
              '@type': 'Question',
              'name': 'What audio formats are accepted for transcription in Pretoria?',
              'acceptedAnswer': {
                '@type': 'Answer',
                'text': 'We accept all common audio and video formats for transcription in Pretoria, including MP3, WAV, MP4, MOV, and more.'
              }
            },
            {
              '@type': 'Question',
              'name': 'Can I get a quote for bulk transcription in Johannesburg?',
              'acceptedAnswer': {
                '@type': 'Answer',
                'text': 'Yes, contact us for custom pricing and discounts on large or ongoing transcription projects in Johannesburg.'
              }
            },
            {
              '@type': 'Question',
              'name': 'Do you provide verbatim and clean transcription in Pretoria?',
              'acceptedAnswer': {
                '@type': 'Answer',
                'text': 'We offer both verbatim and clean transcription services in Pretoria and Johannesburg, depending on your needs.'
              }
            },
            {
              '@type': 'Question',
              'name': 'Is speaker identification available for transcription in Johannesburg?',
              'acceptedAnswer': {
                '@type': 'Answer',
                'text': 'Yes, we provide speaker identification in all transcription projects for Johannesburg and Pretoria.'
              }
            },
            {
              '@type': 'Question',
              'name': 'Are NDAs available for transcription services in Pretoria?',
              'acceptedAnswer': {
                '@type': 'Answer',
                'text': 'Yes, we can provide non-disclosure agreements for all transcription projects in Pretoria and Johannesburg.'
              }
            }
          ]
        })
      }} />
      {/* Second batch of hidden SEO FAQ Schema Markup for Transcription Services Pretoria & Johannesburg */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          'mainEntity': [
            {
              '@type': 'Question',
              'name': 'Can you transcribe multiple languages in Pretoria and Johannesburg?',
              'acceptedAnswer': {
                '@type': 'Answer',
                'text': 'Yes, we offer multilingual transcription services in Pretoria and Johannesburg for English, Afrikaans, and other major languages.'
              }
            },
            {
              '@type': 'Question',
              'name': 'What industries use transcription services in Pretoria?',
              'acceptedAnswer': {
                '@type': 'Answer',
                'text': 'Transcription services in Pretoria are used by legal, medical, academic, business, and media industries.'
              }
            },
            {
              '@type': 'Question',
              'name': 'How do I send files for transcription in Johannesburg?',
              'acceptedAnswer': {
                '@type': 'Answer',
                'text': 'You can securely upload audio or video files online for transcription in Johannesburg via our website or email.'
              }
            },
            {
              '@type': 'Question',
              'name': 'Can you transcribe poor quality audio from Pretoria?',
              'acceptedAnswer': {
                '@type': 'Answer',
                'text': 'We use advanced technology and experienced transcribers to handle even poor quality audio from Pretoria and Johannesburg.'
              }
            },
            {
              '@type': 'Question',
              'name': 'Do you offer timestamped transcription in Johannesburg?',
              'acceptedAnswer': {
                '@type': 'Answer',
                'text': 'Yes, we provide timestamped transcription services in Johannesburg and Pretoria for interviews, research, and more.'
              }
            },
            {
              '@type': 'Question',
              'name': 'What is the process for ordering transcription in Pretoria?',
              'acceptedAnswer': {
                '@type': 'Answer',
                'text': 'Simply upload your files, select your preferences, and we will deliver your transcript to Pretoria or Johannesburg.'
              }
            },
            {
              '@type': 'Question',
              'name': 'Are your transcriptionists based in South Africa?',
              'acceptedAnswer': {
                '@type': 'Answer',
                'text': 'Yes, many of our transcriptionists are based in South Africa and understand local accents and terminology.'
              }
            },
            {
              '@type': 'Question',
              'name': 'Can I get a certified transcript in Johannesburg?',
              'acceptedAnswer': {
                '@type': 'Answer',
                'text': 'Yes, certified transcripts for legal or official use are available in Johannesburg and Pretoria.'
              }
            },
            {
              '@type': 'Question',
              'name': 'Is there a minimum order size for transcription in Pretoria?',
              'acceptedAnswer': {
                '@type': 'Answer',
                'text': 'No, we accept transcription orders of any size in Pretoria and Johannesburg.'
              }
            },
            {
              '@type': 'Question',
              'name': 'How do you ensure accuracy in transcription for Johannesburg clients?',
              'acceptedAnswer': {
                '@type': 'Answer',
                'text': 'Accuracy is ensured through experienced transcribers, quality checks, and optional proofreading for Johannesburg and Pretoria clients.'
              }
            }
          ]
        })
      }} />
      {/* Third batch of hidden SEO FAQ Schema Markup for Transcription Services Pretoria & Johannesburg */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          'mainEntity': [
            {
              '@type': 'Question',
              'name': 'Do you offer transcription for legal proceedings in Pretoria?',
              'acceptedAnswer': {
                '@type': 'Answer',
                'text': 'Yes, we provide accurate legal transcription for court hearings, depositions, and arbitrations in Pretoria and Johannesburg.'
              }
            },
            {
              '@type': 'Question',
              'name': 'Can you transcribe medical dictations in Johannesburg?',
              'acceptedAnswer': {
                '@type': 'Answer',
                'text': 'Yes, we transcribe medical dictations for healthcare professionals in Johannesburg and Pretoria.'
              }
            },
            {
              '@type': 'Question',
              'name': 'Do you offer transcription for academic research in Pretoria?',
              'acceptedAnswer': {
                '@type': 'Answer',
                'text': 'Yes, we transcribe interviews, focus groups, and lectures for academic research in Pretoria and Johannesburg.'
              }
            },
            {
              '@type': 'Question',
              'name': 'Can you provide verbatim transcription in Johannesburg?',
              'acceptedAnswer': {
                '@type': 'Answer',
                'text': 'Yes, we offer verbatim transcription services for Johannesburg and Pretoria clients who need every word captured.'
              }
            },
            {
              '@type': 'Question',
              'name': 'Do you transcribe podcasts for Pretoria businesses?',
              'acceptedAnswer': {
                '@type': 'Answer',
                'text': 'Yes, we transcribe podcasts and audio content for businesses and creators in Pretoria and Johannesburg.'
              }
            },
            {
              '@type': 'Question',
              'name': 'Can you transcribe confidential meetings in Johannesburg?',
              'acceptedAnswer': {
                '@type': 'Answer',
                'text': 'Yes, we handle confidential meeting transcription with strict privacy for Johannesburg and Pretoria clients.'
              }
            },
            {
              '@type': 'Question',
              'name': 'Do you offer transcription for media and journalists in Pretoria?',
              'acceptedAnswer': {
                '@type': 'Answer',
                'text': 'Yes, we transcribe interviews, press conferences, and news footage for media professionals in Pretoria and Johannesburg.'
              }
            },
            {
              '@type': 'Question',
              'name': 'Can you provide real-time transcription in Johannesburg?',
              'acceptedAnswer': {
                '@type': 'Answer',
                'text': 'We offer real-time and same-day transcription services in Johannesburg and Pretoria for urgent needs.'
              }
            },
            {
              '@type': 'Question',
              'name': 'Do you transcribe audio from multiple speakers in Pretoria?',
              'acceptedAnswer': {
                '@type': 'Answer',
                'text': 'Yes, we are experienced in transcribing multi-speaker recordings for Pretoria and Johannesburg clients.'
              }
            },
            {
              '@type': 'Question',
              'name': 'Can you deliver transcripts in different formats for Johannesburg clients?',
              'acceptedAnswer': {
                '@type': 'Answer',
                'text': 'Yes, we deliver transcripts in Word, PDF, or custom formats for Johannesburg and Pretoria clients.'
              }
            }
          ]
        })
      }} />
      {/* Fourth batch of hidden SEO FAQ Schema Markup for Transcription Services Pretoria & Johannesburg */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          'mainEntity': [
            {
              '@type': 'Question',
              'name': 'Do you offer transcription for conferences and seminars in Pretoria?',
              'acceptedAnswer': {
                '@type': 'Answer',
                'text': 'Yes, we transcribe conferences, seminars, and workshops for clients in Pretoria and Johannesburg.'
              }
            },
            {
              '@type': 'Question',
              'name': 'Can you transcribe video content for Johannesburg businesses?',
              'acceptedAnswer': {
                '@type': 'Answer',
                'text': 'Yes, we transcribe video content for marketing, training, and documentation for Johannesburg and Pretoria businesses.'
              }
            },
            {
              '@type': 'Question',
              'name': 'Do you provide transcription for insurance claims in Pretoria?',
              'acceptedAnswer': {
                '@type': 'Answer',
                'text': 'Yes, we transcribe insurance claim recordings and statements for clients in Pretoria and Johannesburg.'
              }
            },
            {
              '@type': 'Question',
              'name': 'Can you transcribe focus group discussions in Johannesburg?',
              'acceptedAnswer': {
                '@type': 'Answer',
                'text': 'Yes, we transcribe focus group discussions for research and marketing in Johannesburg and Pretoria.'
              }
            },
            {
              '@type': 'Question',
              'name': 'Do you offer transcription for religious organizations in Pretoria?',
              'acceptedAnswer': {
                '@type': 'Answer',
                'text': 'Yes, we transcribe sermons, meetings, and events for religious organizations in Pretoria and Johannesburg.'
              }
            },
            {
              '@type': 'Question',
              'name': 'Can you transcribe multilingual meetings in Johannesburg?',
              'acceptedAnswer': {
                '@type': 'Answer',
                'text': 'Yes, we transcribe multilingual meetings and provide translations for Johannesburg and Pretoria clients.'
              }
            },
            {
              '@type': 'Question',
              'name': 'Do you provide transcription for market research in Pretoria?',
              'acceptedAnswer': {
                '@type': 'Answer',
                'text': 'Yes, we transcribe interviews, surveys, and focus groups for market research in Pretoria and Johannesburg.'
              }
            },
            {
              '@type': 'Question',
              'name': 'Can you transcribe court recordings in Johannesburg?',
              'acceptedAnswer': {
                '@type': 'Answer',
                'text': 'Yes, we transcribe court recordings and legal proceedings for Johannesburg and Pretoria clients.'
              }
            },
            {
              '@type': 'Question',
              'name': 'Do you offer transcription for NGOs in Pretoria?',
              'acceptedAnswer': {
                '@type': 'Answer',
                'text': 'Yes, we transcribe interviews, reports, and meetings for NGOs in Pretoria and Johannesburg.'
              }
            },
            {
              '@type': 'Question',
              'name': 'Can you transcribe confidential legal documents in Johannesburg?',
              'acceptedAnswer': {
                '@type': 'Answer',
                'text': 'Yes, we ensure confidentiality and security for all legal transcription projects in Johannesburg and Pretoria.'
              }
            }
          ]
        })
      }} />
      <RelatedServices currentService="Transcription Services" services={[
        { title: "Copywriting Services", description: "Professional copy for web, ads, and more.", href: "/pricing/copywriting-services-pretoria-johannesburg", anchor: "View Service" },
        { title: "Copy Editing Services", description: "Ensure clarity and correctness.", href: "/pricing/copy-editing-services-pretoria-johannesburg", anchor: "View Service" }
      ]} />
    </div>
  );
}
