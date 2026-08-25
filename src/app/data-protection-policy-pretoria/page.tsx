import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy & Data Protection Policy',
  description: 'How WL CreationX collects, uses and protects your personal information under the Protection of Personal Information Act (POPIA), and your rights.',
  alternates: {
    canonical: 'https://wlcreationx.co.za/data-protection-policy-pretoria',
  },
  openGraph: {
    title: 'Privacy & Data Protection Policy',
    description: 'How WL CreationX collects, uses and protects your personal information under the Protection of Personal Information Act (POPIA), and your rights.',
    url: 'https://wlcreationx.co.za/data-protection-policy-pretoria',
    siteName: 'WL CreationX',
    locale: 'en_ZA',
    type: 'website',
    images: ['/images/og-image.jpg'],
  },
};

export default function PrivacyPolicy() {
  const lastUpdated = '13 December 2023';

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative py-20">
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-900 to-black" />
        <div className="relative z-10 container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-[#FFD700]">Privacy Policy</h1>
          <p className="text-gray-300">Last Updated: {lastUpdated}</p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="prose prose-invert max-w-none">
            <div className="mb-12">
              <p className="text-lg text-gray-300 leading-relaxed">
                WL CreationX (Registration Number: K2016514024), a company registered in accordance with the laws of South Africa ("we", "us", "our"), is committed to protecting your privacy and personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information in accordance with the Protection of Personal Information Act 4 of 2013 (POPIA).
              </p>
            </div>

            <div className="space-y-12">
              {[
                {
                  title: '1. Introduction',
                  content: `This Privacy Policy applies to all personal information collected by WL CreationX through our website (www.wlcreationx.co.za), client interactions, and business operations. By using our services or providing us with your information, you consent to the practices described in this policy.`
                },
                {
                  title: '2. Information We Collect',
                  content: `We collect and process the following types of personal information:

• Personal Details: Name, email address, phone number, physical address
• Business Information: Company name, job title, business address
• Technical Data: IP address, browser type, device information
• Usage Data: How you interact with our website and services
• Project-Related Information: Project requirements, preferences, feedback
• Communication Records: Emails, calls, meetings, and other correspondence`
                },
                {
                  title: '3. How We Collect Information',
                  content: `We collect information through:

• Direct interactions with you
• Automated technologies on our website
• Third-party service providers
• Public sources
• Client referrals and business partnerships`
                },
                {
                  title: '4. Purpose of Processing',
                  content: `We process your personal information for the following purposes:

• Providing our design and creative services
• Managing our relationship with you
• Improving our services and website
• Sending relevant communications and updates
• Complying with legal obligations
• Processing payments and maintaining accounts
• Marketing our services (with your consent)
• Analyzing and improving our business operations`
                },
                {
                  title: '5. Legal Basis for Processing',
                  content: `We process personal information in accordance with POPIA and rely on the following legal bases:

• Consent from the data subject
• Contractual necessity
• Legal obligations
• Legitimate business interests
• Protection of the data subject's vital interests`
                },
                {
                  title: '6. Information Sharing and Disclosure',
                  content: `We may share your information with:

• Service providers and contractors
• Professional advisers
• Regulatory authorities
• Business partners
• Potential buyers or investors

We require all third parties to respect the security of your personal information and treat it in accordance with the law.`
                },
                {
                  title: '7. Data Security',
                  content: `We implement appropriate technical and organizational measures to protect your personal information, including:

• Encryption of data
• Secure servers and networks
• Access controls and authentication
• Regular security assessments
• Staff training on data protection
• Physical security measures`
                },
                {
                  title: '8. Your Rights',
                  content: `Under POPIA, you have the right to:

• Access your personal information
• Correct inaccurate information
• Request deletion of your information
• Object to processing
• Withdraw consent
• Lodge a complaint with the Information Regulator
• Request information about third parties who have accessed your information`
                },
                {
                  title: '9. Data Retention',
                  content: `We retain personal information for as long as necessary to:

• Fulfill the purposes for which it was collected
• Comply with legal obligations
• Resolve disputes
• Enforce our agreements

After this period, we securely delete or anonymize your information.`
                },
                {
                  title: '10. International Transfers',
                  content: `When we transfer personal information outside South Africa, we ensure appropriate safeguards are in place in accordance with POPIA requirements.`
                },
                {
                  title: '11. Children\'s Privacy',
                  content: `We do not knowingly collect or process personal information from children under 18 without parental consent.`
                },
                {
                  title: '12. Cookies and Tracking',
                  content: `Our website uses cookies and similar technologies. For detailed information, please refer to our Cookie Policy.`
                },
                {
                  title: '13. Changes to This Policy',
                  content: `We may update this Privacy Policy from time to time. We will notify you of any significant changes through our website or direct communication.`
                },
                {
                  title: '14. Contact Information',
                  content: `For any privacy-related queries or to exercise your rights, contact our Information Officer:

• Name: Tebogo Mazibuko
• Email: tebogo@wlcreationx.co.za
• Phone: +27 62 369 3769
• Address: Park Lane West Building, 194 Bancor Ave, Waterkloof Glen, Pretoria, 0181

You may also contact the Information Regulator (South Africa):
• Website: www.justice.gov.za/inforeg
• Email: inforeg@justice.gov.za`
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
