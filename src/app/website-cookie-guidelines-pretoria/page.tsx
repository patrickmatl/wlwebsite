import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cookie Policy | WL CreationX',
  description: 'Learn about how WL CreationX uses cookies and similar technologies on our website.',
};

export default function CookiePolicy() {
  const lastUpdated = '13 December 2023';

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative py-20">
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-900 to-black" />
        <div className="relative z-10 container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-[#FFD700]">Cookie Policy</h1>
          <p className="text-gray-300">Last Updated: {lastUpdated}</p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="prose prose-invert max-w-none">
            <div className="mb-12">
              <p className="text-lg text-gray-300 leading-relaxed">
                This Cookie Policy explains how WL CreationX (Registration Number: K2016514024) ("we", "us", "our") uses cookies and similar technologies on our website. By using our website, you consent to the use of cookies as described in this policy.
              </p>
            </div>

            <div className="space-y-12">
              {[
                {
                  title: '1. What Are Cookies?',
                  content: `Cookies are small text files that are placed on your device when you visit our website. They help us provide you with a better website experience by:

• Remembering your preferences
• Understanding how you use our website
• Improving site functionality
• Enabling certain features and functions`
                },
                {
                  title: '2. Types of Cookies We Use',
                  content: `We use the following types of cookies:

Essential Cookies:
• Required for the website to function
• Cannot be disabled
• Help with basic functionality and security

Analytical/Performance Cookies:
• Help us understand how visitors use our website
• Provide anonymous statistics
• Used to improve website performance

Functionality Cookies:
• Remember your preferences
• Enhance your user experience
• Store your chosen settings

Marketing Cookies:
• Track visitors across websites
• Used for advertising purposes
• Help measure marketing effectiveness`
                },
                {
                  title: '3. Specific Cookies We Use',
                  content: `Essential Cookies:
• Session cookies for security
• Authentication cookies
• Basic functionality cookies

Analytics Cookies:
• Google Analytics
• Performance measurement
• User behavior tracking

Functionality Cookies:
• Language preferences
• Theme preferences
• User customizations

These cookies are used in accordance with South African data protection laws, including POPIA.`
                },
                {
                  title: '4. Cookie Duration',
                  content: `Our cookies last for different periods:

• Session Cookies: Delete when you close your browser
• Persistent Cookies: Remain for a set period
• Permanent Cookies: Stay until manually deleted

We regularly review our cookies to ensure they are necessary and appropriate.`
                },
                {
                  title: '5. Managing Cookies',
                  content: `You can control cookies through your browser settings:

• Block all cookies
• Delete existing cookies
• Allow cookies from specific sites
• Set cookie preferences

Note: Blocking essential cookies may affect website functionality.`
                },
                {
                  title: '6. Third-Party Cookies',
                  content: `We may allow third-party services to set cookies:

• Analytics providers
• Social media platforms
• Advertising networks

These third parties have their own privacy policies and cookie practices.`
                },
                {
                  title: '7. Your Consent',
                  content: `By using our website, you consent to our use of cookies as described in this policy. You can withdraw consent by:

• Changing browser settings
• Deleting cookies
• Using cookie management tools

We will ask for renewed consent periodically as required by law.`
                },
                {
                  title: '8. Updates to This Policy',
                  content: `We may update this Cookie Policy to reflect:

• Changes in our practices
• New regulatory requirements
• Improved functionality

Changes will be effective when posted on the website.`
                },
                {
                  title: '9. Contact Information',
                  content: `For questions about our Cookie Policy, contact:

• Company: WL CreationX
• Registration: K2016514024
• Contact: Tebogo Mazibuko
• Email: tebogo@wlcreationx.co.za
• Phone: +27 62 369 3769
• Address: 210 Albertus St, La Montagne, Pretoria, 0183`
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
