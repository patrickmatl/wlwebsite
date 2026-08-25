import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'The terms and conditions that govern the use of WL CreationX design, web and marketing services, covering quotes, payment, revisions and delivery.',
  alternates: {
    canonical: 'https://wlcreationx.co.za/legal-terms-pretoria',
  },
  openGraph: {
    title: 'Terms of Service',
    description: 'The terms and conditions that govern the use of WL CreationX design, web and marketing services, covering quotes, payment, revisions and delivery.',
    url: 'https://wlcreationx.co.za/legal-terms-pretoria',
    siteName: 'WL CreationX',
    locale: 'en_ZA',
    type: 'website',
    images: ['/images/og-image.jpg'],
  },
};

export default function TermsOfService() {
  const lastUpdated = '13 December 2023';

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative py-20">
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-900 to-black" />
        <div className="relative z-10 container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-[#FFD700]">Terms of Service</h1>
          <p className="text-gray-300">Last Updated: {lastUpdated}</p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="prose prose-invert max-w-none">
            <div className="mb-12">
              <p className="text-lg text-gray-300 leading-relaxed">
                These Terms of Service ("Terms") govern your use of services provided by WL CreationX (Registration Number: K2016514024) ("we", "us", "our"). By accessing our website or using our services, you agree to be bound by these Terms.
              </p>
            </div>

            <div className="space-y-12">
              {[
                {
                  title: '1. Acceptance of Terms',
                  content: `By accessing our website or using our services, you acknowledge that you have read, understood, and agree to be bound by these Terms. If you do not agree with any part of these Terms, you must not use our services.`
                },
                {
                  title: '2. Services',
                  content: `We provide creative design services including but not limited to:

• Web design and development
• Graphic design
• Brand identity design
• UI/UX design
• Print design
• Digital marketing services

The specific details, deliverables, and timelines for each service will be outlined in a separate service agreement or proposal.`
                },
                {
                  title: '3. Client Obligations',
                  content: `As a client, you agree to:

• Provide accurate and complete information
• Respond to requests for information in a timely manner
• Review and provide feedback on deliverables within agreed timeframes
• Pay all fees as per the agreed payment schedule
• Obtain necessary permissions for materials provided to us
• Comply with all applicable laws and regulations`
                },
                {
                  title: '4. Intellectual Property Rights',
                  content: `• We retain ownership of all intellectual property rights in our design concepts until full payment is received
• Upon full payment, you receive ownership of the final deliverables as specified in the service agreement
• We retain the right to use completed work in our portfolio
• You warrant that any content provided to us does not infringe on third-party rights
• Our design tools, processes, and methodologies remain our exclusive property`
                },
                {
                  title: '5. Payment Terms',
                  content: `• Payment terms will be specified in the service agreement or proposal
• A non-refundable deposit may be required before work commences
• Late payments may incur additional charges
• All prices are quoted in South African Rand (ZAR)
• Bank charges for international payments are the client's responsibility`
                },
                {
                  title: '6. Project Timeline and Delivery',
                  content: `• Project timelines will be outlined in the service agreement
• Delays caused by late client feedback may affect final delivery dates
• Rush fees may apply for expedited services
• We reserve the right to adjust timelines due to unforeseen circumstances
• Final deliverables will be provided upon receipt of full payment`
                },
                {
                  title: '7. Revisions and Changes',
                  content: `• Number of revisions included will be specified in the service agreement
• Additional revisions may incur extra charges
• Substantial changes to project scope may require a new quote
• Change requests must be submitted in writing`
                },
                {
                  title: '8. Termination',
                  content: `Either party may terminate the service agreement if:

• The other party breaches these Terms
• By mutual written agreement
• Force majeure events persist beyond 30 days

Upon termination:
• You must pay for all work completed
• We will deliver all completed work upon payment
• Partially completed work remains our property`
                },
                {
                  title: '9. Limitation of Liability',
                  content: `• Our liability is limited to the amount paid for services
• We are not liable for indirect, consequential, or special damages
• We do not guarantee specific business results
• We are not liable for third-party services or products
• Force majeure events exclude us from liability`
                },
                {
                  title: '10. Confidentiality',
                  content: `Both parties agree to:

• Keep confidential information secure
• Use it only for the intended purpose
• Return or destroy it upon request
• Not disclose it to third parties without written consent
• Maintain confidentiality after service completion`
                },
                {
                  title: '11. Warranties and Representations',
                  content: `• Services are provided "as is" without warranty
• We do not guarantee third-party services or products
• You warrant that provided content is owned by you or licensed
• You warrant compliance with applicable laws`
                },
                {
                  title: '12. Dispute Resolution',
                  content: `• Disputes will be resolved through negotiation
• Mediation may be used if negotiation fails
• South African law governs these Terms
• Pretoria courts have jurisdiction
• The prevailing party may recover legal costs`
                },
                {
                  title: '13. Indemnification',
                  content: `You agree to indemnify us against claims arising from:

• Your breach of these Terms
• Your content or materials
• Your use of our services
• Third-party claims related to your business`
                },
                {
                  title: '14. Changes to Terms',
                  content: `We reserve the right to modify these Terms at any time. Changes will be effective upon posting to our website. Continued use of our services constitutes acceptance of modified Terms.`
                },
                {
                  title: '15. Contact Information',
                  content: `For questions about these Terms, contact us at:

• Company: WL CreationX
• Registration: K2016514024
• Contact: Tebogo Mazibuko
• Email: tebogo@wlcreationx.co.za
• Phone: +27 62 369 3769
• Address: Park Lane West Building, 194 Bancor Ave, Waterkloof Glen, Pretoria, 0181`
                }
              ].map((section) => (
                <div key={section.title} className="space-y-4">
                  <h2 className="text-2xl font-bold text-[#FFD700]">{section.title}</h2>
                  <div className="text-gray-300 space-y-4">
                    {section.content.split('\n\n').map((paragraph, index) => (
                      <div key={index}>
                        {paragraph.startsWith('•') ? (
                          <ul className="list-disc pl-5 space-y-2">
                            {paragraph.split('\n').map((item, i) => (
                              <li key={i} className="text-gray-300">
                                {item.replace('• ', '')}
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p className="text-gray-300">{paragraph}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
