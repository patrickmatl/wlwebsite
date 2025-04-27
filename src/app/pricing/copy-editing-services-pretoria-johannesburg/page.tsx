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
        <h2 className="text-2xl font-bold text-[#FFD700] mb-4">FAQs</h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold">What is copy editing?</h3>
            <p className="text-neutral-300">Copy editing improves grammar, clarity, and style in your documents.</p>
          </div>
          <div>
            <h3 className="font-semibold">What types of documents do you edit?</h3>
            <p className="text-neutral-300">We edit articles, reports, web content, academic papers, and more.</p>
          </div>
          <div>
            <h3 className="font-semibold">How is pricing calculated?</h3>
            <p className="text-neutral-300">Pricing is per word, with discounts for larger projects or ongoing work.</p>
          </div>
          <div>
            <h3 className="font-semibold">Can I request revisions?</h3>
            <p className="text-neutral-300">Yes, all packages include at least 2 revisions. Premium includes 3.</p>
          </div>
          <div>
            <h3 className="font-semibold">Is my content confidential?</h3>
            <p className="text-neutral-300">Absolutely. All documents are handled with strict confidentiality and security.</p>
          </div>
        </div>
      </div>
      {/* First batch of hidden SEO FAQ Schema Markup for Copy Editing Services Pretoria & Johannesburg */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          'mainEntity': [
            {
              '@type': 'Question',
              'name': 'What are copy editing services in Pretoria and Johannesburg?',
              'acceptedAnswer': {
                '@type': 'Answer',
                'text': 'Copy editing services in Pretoria and Johannesburg involve reviewing and improving grammar, clarity, and style in your documents.'
              }
            },
            {
              '@type': 'Question',
              'name': 'How much do copy editing services cost in Pretoria?',
              'acceptedAnswer': {
                '@type': 'Answer',
                'text': 'Copy editing services in Pretoria typically cost R0.80 to R1.20 per word, depending on complexity and turnaround time.'
              }
            },
            {
              '@type': 'Question',
              'name': 'Do you edit academic documents in Johannesburg?',
              'acceptedAnswer': {
                '@type': 'Answer',
                'text': 'Yes, we edit theses, dissertations, and research papers for students and academics in Johannesburg and Pretoria.'
              }
            },
            {
              '@type': 'Question',
              'name': 'Can you provide fast copy editing in Pretoria?',
              'acceptedAnswer': {
                '@type': 'Answer',
                'text': 'Yes, we offer expedited copy editing services in Pretoria and Johannesburg for urgent projects.'
              }
            },
            {
              '@type': 'Question',
              'name': 'Is proofreading included with copy editing in Johannesburg?',
              'acceptedAnswer': {
                '@type': 'Answer',
                'text': 'Proofreading is included in all copy editing services in Johannesburg and Pretoria.'
              }
            },
            {
              '@type': 'Question',
              'name': 'What types of documents do you edit in Pretoria?',
              'acceptedAnswer': {
                '@type': 'Answer',
                'text': 'We edit business documents, academic papers, web content, and more in Pretoria and Johannesburg.'
              }
            },
            {
              '@type': 'Question',
              'name': 'Do you offer editing for non-native English speakers in Johannesburg?',
              'acceptedAnswer': {
                '@type': 'Answer',
                'text': 'Yes, we specialize in editing documents for non-native English speakers in Johannesburg and Pretoria.'
              }
            },
            {
              '@type': 'Question',
              'name': 'How long does copy editing take in Pretoria?',
              'acceptedAnswer': {
                '@type': 'Answer',
                'text': 'Most copy editing projects in Pretoria and Johannesburg are completed within 2-4 business days.'
              }
            },
            {
              '@type': 'Question',
              'name': 'Can you edit legal documents in Johannesburg?',
              'acceptedAnswer': {
                '@type': 'Answer',
                'text': 'Yes, we edit contracts, agreements, and other legal documents for clients in Johannesburg and Pretoria.'
              }
            },
            {
              '@type': 'Question',
              'name': 'How do I order copy editing services in Pretoria?',
              'acceptedAnswer': {
                '@type': 'Answer',
                'text': 'Contact us online or by phone to discuss your copy editing needs in Pretoria or Johannesburg and receive a quote.'
              }
            }
          ]
        })
      }} />
      {/* Second batch of hidden SEO FAQ Schema Markup for Copy Editing Services Pretoria & Johannesburg */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          'mainEntity': [
            {
              '@type': 'Question',
              'name': 'Can you edit website content for Pretoria businesses?',
              'acceptedAnswer': {
                '@type': 'Answer',
                'text': 'Yes, we edit website content for businesses in Pretoria and Johannesburg, improving clarity and SEO.'
              }
            },
            {
              '@type': 'Question',
              'name': 'Do you provide copy editing for marketing materials in Johannesburg?',
              'acceptedAnswer': {
                '@type': 'Answer',
                'text': 'Yes, we edit brochures, flyers, and other marketing materials for Johannesburg and Pretoria clients.'
              }
            },
            {
              '@type': 'Question',
              'name': 'Can you edit CVs and cover letters in Pretoria?',
              'acceptedAnswer': {
                '@type': 'Answer',
                'text': 'Yes, we offer copy editing for CVs and cover letters in Pretoria and Johannesburg.'
              }
            },
            {
              '@type': 'Question',
              'name': 'Do you provide copy editing for books in Johannesburg?',
              'acceptedAnswer': {
                '@type': 'Answer',
                'text': 'Yes, we edit manuscripts and books for authors in Johannesburg and Pretoria.'
              }
            },
            {
              '@type': 'Question',
              'name': 'How do you ensure confidentiality for Pretoria copy editing projects?',
              'acceptedAnswer': {
                '@type': 'Answer',
                'text': 'All copy editing projects in Pretoria and Johannesburg are handled with strict confidentiality and NDAs are available.'
              }
            },
            {
              '@type': 'Question',
              'name': 'Can you edit technical documents in Johannesburg?',
              'acceptedAnswer': {
                '@type': 'Answer',
                'text': 'Yes, we have experience editing technical, medical, and scientific documents in Johannesburg and Pretoria.'
              }
            },
            {
              '@type': 'Question',
              'name': 'Do you provide feedback and suggestions during copy editing in Pretoria?',
              'acceptedAnswer': {
                '@type': 'Answer',
                'text': 'Yes, we provide detailed feedback and suggestions to improve your documents in Pretoria and Johannesburg.'
              }
            },
            {
              '@type': 'Question',
              'name': 'Can you format documents according to style guides in Johannesburg?',
              'acceptedAnswer': {
                '@type': 'Answer',
                'text': 'Yes, we format and edit documents to meet APA, Chicago, and other style guides in Johannesburg and Pretoria.'
              }
            },
            {
              '@type': 'Question',
              'name': 'Is there a minimum order size for copy editing in Pretoria?',
              'acceptedAnswer': {
                '@type': 'Answer',
                'text': 'No, we accept copy editing projects of any size in Pretoria and Johannesburg.'
              }
            },
            {
              '@type': 'Question',
              'name': 'How do I send files for copy editing in Johannesburg?',
              'acceptedAnswer': {
                '@type': 'Answer',
                'text': 'You can upload your documents securely online or email them for copy editing in Johannesburg and Pretoria.'
              }
            }
          ]
        })
      }} />
      {/* Third batch of hidden SEO FAQ Schema Markup for Copy Editing Services Pretoria & Johannesburg */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          'mainEntity': [
            {
              '@type': 'Question',
              'name': 'Do you offer copy editing for grant proposals in Pretoria?',
              'acceptedAnswer': {
                '@type': 'Answer',
                'text': 'Yes, we edit grant proposals and funding applications for clients in Pretoria and Johannesburg.'
              }
            },
            {
              '@type': 'Question',
              'name': 'Can you edit speeches and presentations in Johannesburg?',
              'acceptedAnswer': {
                '@type': 'Answer',
                'text': 'Yes, we edit speeches and presentations for events and professionals in Johannesburg and Pretoria.'
              }
            },
            {
              '@type': 'Question',
              'name': 'Do you provide copy editing for newsletters in Pretoria?',
              'acceptedAnswer': {
                '@type': 'Answer',
                'text': 'Yes, we edit newsletters and email campaigns for Pretoria and Johannesburg businesses.'
              }
            },
            {
              '@type': 'Question',
              'name': 'Can you edit advertising copy in Johannesburg?',
              'acceptedAnswer': {
                '@type': 'Answer',
                'text': 'Yes, we edit advertising and marketing copy for Johannesburg and Pretoria clients.'
              }
            },
            {
              '@type': 'Question',
              'name': 'Do you offer copy editing for annual reports in Pretoria?',
              'acceptedAnswer': {
                '@type': 'Answer',
                'text': 'Yes, we edit annual reports and corporate documents for Pretoria and Johannesburg companies.'
              }
            },
            {
              '@type': 'Question',
              'name': 'Can you edit resumes for Johannesburg job seekers?',
              'acceptedAnswer': {
                '@type': 'Answer',
                'text': 'Yes, we edit resumes and LinkedIn profiles for job seekers in Johannesburg and Pretoria.'
              }
            },
            {
              '@type': 'Question',
              'name': 'Do you provide copy editing for blog posts in Pretoria?',
              'acceptedAnswer': {
                '@type': 'Answer',
                'text': 'Yes, we edit blog posts and online articles for Pretoria and Johannesburg clients.'
              }
            },
            {
              '@type': 'Question',
              'name': 'Can you edit non-profit documents in Johannesburg?',
              'acceptedAnswer': {
                '@type': 'Answer',
                'text': 'Yes, we edit non-profit documents, reports, and proposals for Johannesburg and Pretoria organizations.'
              }
            },
            {
              '@type': 'Question',
              'name': 'Do you offer copy editing for multilingual documents in Pretoria?',
              'acceptedAnswer': {
                '@type': 'Answer',
                'text': 'Yes, we edit English and multilingual documents for clients in Pretoria and Johannesburg.'
              }
            },
            {
              '@type': 'Question',
              'name': 'How do you handle urgent copy editing requests in Johannesburg?',
              'acceptedAnswer': {
                '@type': 'Answer',
                'text': 'We accept urgent copy editing requests in Johannesburg and Pretoria, subject to availability.'
              }
            }
          ]
        })
      }} />
      {/* Fourth batch of hidden SEO FAQ Schema Markup for Copy Editing Services Pretoria & Johannesburg */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          'mainEntity': [
            {
              '@type': 'Question',
              'name': 'Do you offer copy editing for government documents in Pretoria?',
              'acceptedAnswer': {
                '@type': 'Answer',
                'text': 'Yes, we edit government documents and official reports for Pretoria and Johannesburg clients.'
              }
            },
            {
              '@type': 'Question',
              'name': 'Can you edit scripts and screenplays in Johannesburg?',
              'acceptedAnswer': {
                '@type': 'Answer',
                'text': 'Yes, we edit scripts, screenplays, and creative writing for Johannesburg and Pretoria writers.'
              }
            },
            {
              '@type': 'Question',
              'name': 'Do you provide copy editing for business proposals in Pretoria?',
              'acceptedAnswer': {
                '@type': 'Answer',
                'text': 'Yes, we edit business proposals and presentations for Pretoria and Johannesburg companies.'
              }
            },
            {
              '@type': 'Question',
              'name': 'Can you edit product manuals in Johannesburg?',
              'acceptedAnswer': {
                '@type': 'Answer',
                'text': 'Yes, we edit product manuals and technical guides for Johannesburg and Pretoria businesses.'
              }
            },
            {
              '@type': 'Question',
              'name': 'Do you offer copy editing for real estate listings in Pretoria?',
              'acceptedAnswer': {
                '@type': 'Answer',
                'text': 'Yes, we edit real estate listings, brochures, and web content for Pretoria and Johannesburg agencies.'
              }
            },
            {
              '@type': 'Question',
              'name': 'Can you edit training materials in Johannesburg?',
              'acceptedAnswer': {
                '@type': 'Answer',
                'text': 'Yes, we edit training manuals and e-learning content for Johannesburg and Pretoria organizations.'
              }
            },
            {
              '@type': 'Question',
              'name': 'Do you provide copy editing for scientific papers in Pretoria?',
              'acceptedAnswer': {
                '@type': 'Answer',
                'text': 'Yes, we edit scientific papers and research articles for Pretoria and Johannesburg academics.'
              }
            },
            {
              '@type': 'Question',
              'name': 'Can you edit funding applications in Johannesburg?',
              'acceptedAnswer': {
                '@type': 'Answer',
                'text': 'Yes, we edit funding and grant applications for Johannesburg and Pretoria clients.'
              }
            },
            {
              '@type': 'Question',
              'name': 'Do you offer copy editing retainers for ongoing work in Pretoria?',
              'acceptedAnswer': {
                '@type': 'Answer',
                'text': 'Yes, we provide monthly copy editing retainers for ongoing content needs in Pretoria and Johannesburg.'
              }
            },
            {
              '@type': 'Question',
              'name': 'How do you handle revisions for Johannesburg copy editing projects?',
              'acceptedAnswer': {
                '@type': 'Answer',
                'text': 'We offer multiple revision rounds to ensure Johannesburg and Pretoria clients are fully satisfied.'
              }
            }
          ]
        })
      }} />
      <RelatedServices currentService="Copy Editing Services" services={[
        { title: "Transcription Services", description: "Accurate audio/video to text.", href: "/pricing/transcription-services-pretoria-johannesburg", anchor: "View Service" },
        { title: "Copywriting Services", description: "Professional writing for all needs.", href: "/pricing/copywriting-services-pretoria-johannesburg", anchor: "View Service" }
      ]} />
    </div>
  );
}
