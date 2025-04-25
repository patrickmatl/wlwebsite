'use client';

import { motion } from 'framer-motion';
import { FaCheck } from 'react-icons/fa';
import RelatedServices from '@/components/RelatedServices';
import GetInTouchButton from '@/components/GetInTouchButton';
import { serviceFAQs } from '@/data/serviceFAQs';

const SocialMediaPage = () => {
  const packages = [
    {
      name: "Profile Setup Package",
      price: "From R1,850",
      icon: <FaCheck className="w-8 h-8 text-[#FFD700]" />,
      description: "Professional social media profile setup that establishes your brand presence across platforms with custom design elements and strategy.",
      specifications: [
        "Platforms: Instagram, Facebook, Twitter, LinkedIn",
        "Setup Time: 3-4 Business Days",
        "Image Formats: JPG, PNG, AI, PSD",
        "Resolution: Platform-Specific Optimized",
        "Strategy Session: 1-Hour Consultation"
      ],
      features: [
        "Custom Profile Picture Design (All Sizes)",
        "Professional Cover Image Design (All Platforms)",
        "Strategic Bio Writing & SEO Optimization",
        "Brand Color & Style Integration",
        "Complete Contact Information Setup",
        "Detailed Business Information Setup",
        "Cross-Platform Brand Consistency",
        "Advanced Analytics Setup & Training",
        "Custom Highlight Covers (10 Designs)",
        "Strategic Link Integration",
        "Business Verification Support",
        "Platform Best Practices Guide",
        "Competitor Analysis Report",
        "30-Day Action Plan"
      ],
      deliverables: [
        "All Source Files (AI, PSD)",
        "Platform-Optimized Images",
        "Comprehensive Brand Guidelines",
        "Detailed Setup Documentation",
        "Analytics Setup Guide",
        "Content Planning Calendar",
        "Platform Strategy Document"
      ]
    },
    {
      name: "Post Templates Package",
      price: "From R1,250",
      icon: <FaCheck className="w-8 h-8 text-[#FFD700]" />,
      description: "Professional post template package with versatile designs for consistent brand communication.",
      specifications: [
        "Format: All Platform Sizes",
        "File Types: PSD, AI, Canva Pro",
        "Templates: 5 Base Designs with Variations",
        "Delivery: 3-4 Business Days",
        "Training Session: 1-Hour"
      ],
      features: [
        "5 Custom Template Designs",
        "All Platform Size Variations",
        "Advanced Brand Integration",
        "Custom Typography System",
        "Smart Object Integration",
        "Grid Layout System",
        "Multiple Content Categories",
        "Seasonal Variations",
        "Animation Guidelines",
        "Content Type Variations",
        "Easy-Edit Documentation",
        "2 Revision Rounds",
        "1-Hour Training Session",
        "30-Day Support"
      ],
      deliverables: [
        "Master Template Files",
        "Platform-Specific Variations",
        "Comprehensive Style Guide",
        "Content Type Guidelines",
        "Font Package",
        "Custom Icon Set",
        "Video Tutorial Series"
      ]
    },
    {
      name: "Story Templates Package",
      price: "From R950",
      icon: <FaCheck className="w-8 h-8 text-[#FFD700]" />,
      description: "Engaging story templates designed for maximum impact with interactive elements and brand integration.",
      specifications: [
        "Size: All Platform Story Sizes",
        "Format: Instagram/Facebook Stories",
        "Templates: 8 Base Designs",
        "Delivery: 2-3 Business Days",
        "Training: Video Tutorial"
      ],
      features: [
        "8 Story Templates",
        "Interactive Element Designs",
        "Advanced Brand Integration",
        "Custom Animation Presets",
        "Highlight Cover Designs",
        "Swipe-Up Layout Options",
        "Poll & Quiz Templates",
        "Q&A Layout Designs",
        "Countdown Templates",
        "Music Integration Layouts",
        "Shopping Feature Templates",
        "Location Story Designs",
        "2 Revision Rounds",
        "Comprehensive Guidelines"
      ],
      deliverables: [
        "Master PSD/AI Files",
        "Ready-to-Use Templates",
        "Animation Preset Pack",
        "Comprehensive Style Guide",
        "Video Tutorial Series",
        "30-Day Support"
      ]
    }
  ];

  const monthlyPackages = [
    {
      name: "Essential Social Package",
      price: "R3,500/month",
      icon: <FaCheck className="w-8 h-8 text-[#FFD700]" />,
      description: "Perfect for small businesses looking to establish and maintain a professional social media presence.",
      specifications: [
        "Posts: 12 Per Month",
        "Platforms: 2 of Choice",
        "Response Time: 24-48 Hours",
        "Monthly Strategy Call",
        "Monthly Report & Analysis"
      ],
      features: [
        "12 Custom Posts Per Month",
        "4 Story Designs Per Week",
        "Monthly Content Calendar",
        "Basic Engagement Monitoring",
        "2 Platform Management",
        "Monthly Performance Report",
        "Content Strategy",
        "Hashtag Research & Strategy",
        "Basic Community Management",
        "Monthly Analytics Report",
        "Content Library Access",
        "Regular Updates",
        "Monthly Strategy Call",
        "Basic Crisis Management"
      ],
      deliverables: [
        "Monthly Content Calendar",
        "Performance Reports",
        "Engagement Analytics",
        "Content Library Access",
        "Strategy Document",
        "Monthly Consultation"
      ]
    },
    {
      name: "Professional Social Package",
      price: "R5,500/month",
      icon: <FaCheck className="w-8 h-8 text-[#FFD700]" />,
      description: "Comprehensive social media management for growing businesses seeking active engagement and growth.",
      specifications: [
        "Posts: 20 Per Month",
        "Platforms: 3 of Choice",
        "Response Time: 24 Hours",
        "Bi-Weekly Strategy Calls",
        "Weekly Reports"
      ],
      features: [
        "20 Custom Posts Per Month",
        "Daily Story Designs",
        "Advanced Content Calendar",
        "Active Engagement Monitoring",
        "3 Platform Management",
        "Weekly Performance Reports",
        "Advanced Content Strategy",
        "Competitor Analysis",
        "Full Community Management",
        "Advanced Hashtag Strategy",
        "Influencer Outreach",
        "Crisis Management",
        "Ad Campaign Support",
        "Content Photography"
      ],
      deliverables: [
        "Weekly Performance Reports",
        "Monthly Strategy Updates",
        "Engagement Analytics",
        "Premium Content Library",
        "Crisis Management Plan",
        "Photography Sessions"
      ]
    },
    {
      name: "Premium Social Package",
      price: "R8,500/month",
      icon: <FaCheck className="w-8 h-8 text-[#FFD700]" />,
      description: "Elite social media management for businesses requiring comprehensive coverage and maximum engagement.",
      specifications: [
        "Posts: 30+ Per Month",
        "Platforms: All Major Platforms",
        "Response Time: 12 Hours",
        "Weekly Strategy Calls",
        "Daily Monitoring & Reports"
      ],
      features: [
        "30+ Custom Posts Per Month",
        "Multiple Daily Stories",
        "Advanced Content Calendar",
        "24/7 Engagement Monitoring",
        "All Platform Management",
        "Daily Performance Tracking",
        "Elite Content Strategy",
        "Advanced Competitor Tracking",
        "Priority Community Management",
        "Real-Time Trend Monitoring",
        "Crisis Management",
        "VIP Support",
        "Monthly Video Content",
        "Professional Photography"
      ],
      deliverables: [
        "Daily Engagement Reports",
        "Weekly Strategy Updates",
        "Monthly Performance Review",
        "Custom Analytics Dashboard",
        "Priority Support Access",
        "Monthly Content Photoshoot",
        "Video Content Package"
      ]
    }
  ];

  const platforms = [
    {
      name: "Instagram",
      icon: <FaCheck className="w-6 h-6" />,
      description: "Visual content and stories"
    },
    {
      name: "Facebook",
      icon: <FaCheck className="w-6 h-6" />,
      description: "Community engagement"
    },
    {
      name: "Twitter",
      icon: <FaCheck className="w-6 h-6" />,
      description: "Real-time updates"
    },
    {
      name: "LinkedIn",
      icon: <FaCheck className="w-6 h-6" />,
      description: "Professional networking"
    }
  ];

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'Social Media', href: '/pricing/social-media' }
  ];

  return (
    <div className="min-h-screen bg-black text-white py-20 px-4 sm:px-6 lg:px-8">
      {/* BEGIN: Visually Hidden SEO Headings H1-H5 for Social Media Pretoria */}
      <section style={{position:'absolute',left:'-9999px',top:'auto',width:'1px',height:'1px',overflow:'hidden'}} aria-hidden="true">
        <h1>Pretoria Social Media Services | WL CreationX</h1>
        <p>WL CreationX delivers expert social media services in Pretoria, empowering businesses to build strong online communities and drive engagement across all major platforms. Our Pretoria social media team crafts tailored strategies that amplify your brand voice and increase your digital reach.</p>
        <p>From profile setup to ongoing content creation, we help Pretoria businesses stand out with creative, consistent, and impactful social media campaigns.</p>
        <h2>Leading Social Media Agency in Pretoria</h2>
        <p>As a top social media agency in Pretoria, we combine data-driven insights with creative storytelling to grow your audience and foster brand loyalty. Our Pretoria specialists stay ahead of trends, ensuring your social presence is fresh, relevant, and effective.</p>
        <p>We provide end-to-end social media management, from strategy and design to analytics and optimization, for businesses of all sizes in Pretoria.</p>
        <h3>Custom Social Media Solutions for Pretoria Businesses</h3>
        <p>Our Pretoria social media packages are designed for startups, SMEs, and large enterprises, offering everything from post and story templates to full monthly management. We tailor every campaign to your goals and target audience.</p>
        <p>Whether you need brand awareness, lead generation, or community engagement, our Pretoria team delivers measurable results on platforms like Facebook, Instagram, LinkedIn, and more.</p>
        <h4>Affordable Social Media Packages in Pretoria</h4>
        <p>Choose from a range of social media packages with transparent pricing and no hidden costs. Our Pretoria clients benefit from flexible options, monthly reports, and ongoing support for continuous growth.</p>
        <p>We make professional social media management accessible to all Pretoria businesses, regardless of size or industry.</p>
        <h5>Why Choose WL CreationX for Social Media in Pretoria?</h5>
        <p>WL CreationX is trusted by Pretoria businesses for our creative approach, technical expertise, and dedication to client success. Our social media team has a proven record of increasing engagement, followers, and brand awareness.</p>
        <p>We focus on authentic storytelling, ethical growth, and transparent communication with all our Pretoria clients.</p>
      </section>
      {/* END: Visually Hidden SEO Headings H1-H5 for Social Media Pretoria */}
      {/* BEGIN: Visually Hidden Social Media FAQ for Pretoria */}
      <section style={{position:'absolute',left:'-9999px',top:'auto',width:'1px',height:'1px',overflow:'hidden'}} aria-hidden="true">
        <h2>Frequently Asked Questions about Social Media in Pretoria</h2>
        <div><h3>Which social media platforms do you manage?</h3><p>We manage Facebook, Instagram, LinkedIn, Twitter, and more for Pretoria businesses, ensuring consistent branding and engagement across all channels.</p><p>Our team stays updated on the latest platform features and trends to maximize your results.</p></div>
        <div><h3>How do your social media packages work?</h3><p>Our Pretoria social media packages include profile setup, content creation, post scheduling, engagement monitoring, and monthly reporting.</p><p>Choose from one-time setup or ongoing monthly management, depending on your needs.</p></div>
        <div><h3>Can you create custom content for my brand?</h3><p>Yes, we design custom posts, stories, and templates that reflect your Pretoria brand’s identity and messaging.</p><p>Our creative team ensures every piece of content is on-brand and optimized for engagement.</p></div>
        <div><h3>How do you measure social media success?</h3><p>We track engagement, follower growth, reach, and conversions for Pretoria clients using advanced analytics tools.</p><p>Monthly reports provide insights into performance and recommendations for improvement.</p></div>
        <div><h3>Do you offer social media advertising?</h3><p>Yes, we provide social media advertising services for Pretoria businesses, including campaign setup, targeting, and optimization.</p><p>Our team helps you reach new audiences and achieve your marketing goals.</p></div>
        <div><h3>Can you train my team on social media best practices?</h3><p>Absolutely! We offer training and consultation for Pretoria businesses, empowering your team to manage social media effectively.</p><p>Workshops and ongoing support are available on request.</p></div>
        <div><h3>Is social media management suitable for small businesses?</h3><p>Yes, our Pretoria social media services are ideal for small businesses looking to grow their presence and connect with local customers.</p><p>We offer affordable packages and personalized support for every stage of growth.</p></div>
        <div><h3>How soon can I expect to see results?</h3><p>Most Pretoria clients notice increased engagement and follower growth within the first few months, depending on your goals and activity level.</p><p>Consistent posting and ongoing optimization are key to long-term success.</p></div>
        <div><h3>Do you offer content calendars and planning?</h3><p>Yes, we provide detailed content calendars for Pretoria clients, ensuring your social media is organized, strategic, and effective.</p><p>Our planning process keeps your content consistent and aligned with your business goals.</p></div>
        <div><h3>Which areas of Pretoria do you serve?</h3><p>We serve all of Pretoria and surrounding areas, including Centurion, Hatfield, Brooklyn, Pretoria East, and more.</p><p>Remote consultations and digital delivery are available for your convenience.</p></div>
      </section>
      {/* END: Visually Hidden Social Media FAQ for Pretoria */}
      {/* BEGIN: FAQPage Structured Data for Social Media Pretoria */}
      <script type="application/ld+json" suppressHydrationWarning>
        {`
        {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "Which social media platforms do you manage?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "We manage Facebook, Instagram, LinkedIn, Twitter, and more for Pretoria businesses, ensuring consistent branding and engagement across all channels. Our team stays updated on the latest platform features and trends to maximize your results."
              }
            },
            {
              "@type": "Question",
              "name": "How do your social media packages work?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Our Pretoria social media packages include profile setup, content creation, post scheduling, engagement monitoring, and monthly reporting. Choose from one-time setup or ongoing monthly management, depending on your needs."
              }
            },
            {
              "@type": "Question",
              "name": "Can you create custom content for my brand?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes, we design custom posts, stories, and templates that reflect your Pretoria brand’s identity and messaging. Our creative team ensures every piece of content is on-brand and optimized for engagement."
              }
            },
            {
              "@type": "Question",
              "name": "How do you measure social media success?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "We track engagement, follower growth, reach, and conversions for Pretoria clients using advanced analytics tools. Monthly reports provide insights into performance and recommendations for improvement."
              }
            },
            {
              "@type": "Question",
              "name": "Do you offer social media advertising?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes, we provide social media advertising services for Pretoria businesses, including campaign setup, targeting, and optimization. Our team helps you reach new audiences and achieve your marketing goals."
              }
            },
            {
              "@type": "Question",
              "name": "Can you train my team on social media best practices?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Absolutely! We offer training and consultation for Pretoria businesses, empowering your team to manage social media effectively. Workshops and ongoing support are available on request."
              }
            },
            {
              "@type": "Question",
              "name": "Is social media management suitable for small businesses?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes, our Pretoria social media services are ideal for small businesses looking to grow their presence and connect with local customers. We offer affordable packages and personalized support for every stage of growth."
              }
            },
            {
              "@type": "Question",
              "name": "How soon can I expect to see results?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Most Pretoria clients notice increased engagement and follower growth within the first few months, depending on your goals and activity level. Consistent posting and ongoing optimization are key to long-term success."
              }
            },
            {
              "@type": "Question",
              "name": "Do you offer content calendars and planning?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes, we provide detailed content calendars for Pretoria clients, ensuring your social media is organized, strategic, and effective. Our planning process keeps your content consistent and aligned with your business goals."
              }
            },
            {
              "@type": "Question",
              "name": "Which areas of Pretoria do you serve?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "We serve all of Pretoria and surrounding areas, including Centurion, Hatfield, Brooklyn, Pretoria East, and more. Remote consultations and digital delivery are available for your convenience."
              }
            }
          ]
        }
        `}
      </script>
      {/* END: FAQPage Structured Data for Social Media Pretoria */}
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">Social Media Services</h1>
        <p className="text-xl text-neutral-300 max-w-3xl mx-auto">
          Build a strong social media presence with our professional management services
        </p>
      </div>

      {/* Service Packages */}
      <div className="max-w-7xl mx-auto mb-16">
        <h2 className="text-2xl font-bold text-[#FFD700] text-center mb-8">Management Packages</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {packages.map((pkg, index) => (
            <motion.div
              key={pkg.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-zinc-900 rounded-lg p-8 border border-[#FFD700]/20"
            >
              <div className="flex items-center justify-center mb-6">
                {pkg.icon}
              </div>
              <h3 className="text-2xl font-bold text-[#FFD700] text-center mb-4">{pkg.name}</h3>
              <p className="text-3xl font-bold text-center mb-4">{pkg.price}</p>
              <p className="text-neutral-300 text-center mb-6">{pkg.description}</p>
              <div className="space-y-4 mb-6">
                <h4 className="font-semibold text-[#FFD700]">Features:</h4>
                <ul className="space-y-2">
                  {pkg.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <FaCheck className="text-[#FFD700] mr-2 flex-shrink-0 mt-1" />
                      <span className="text-neutral-300">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <button className="w-full py-3 px-4 bg-[#FFD700] text-black font-semibold rounded hover:bg-[#FFE44D] transition-colors">
                Get Started
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Monthly Packages */}
      <div className="max-w-7xl mx-auto mb-16">
        <h2 className="text-2xl font-bold text-[#FFD700] text-center mb-8">Monthly Management Packages</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {monthlyPackages.map((pkg, index) => (
            <motion.div
              key={pkg.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-zinc-900 rounded-lg p-8 border border-[#FFD700]/20"
            >
              <div className="flex items-center justify-center mb-6">
                {pkg.icon}
              </div>
              <h3 className="text-2xl font-bold text-[#FFD700] text-center mb-4">{pkg.name}</h3>
              <p className="text-3xl font-bold text-center mb-4">{pkg.price}</p>
              <p className="text-neutral-300 text-center mb-6">{pkg.description}</p>
              <div className="space-y-4 mb-6">
                <h4 className="font-semibold text-[#FFD700]">Features:</h4>
                <ul className="space-y-2">
                  {pkg.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <FaCheck className="text-[#FFD700] mr-2 flex-shrink-0 mt-1" />
                      <span className="text-neutral-300">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <button className="w-full py-3 px-4 bg-[#FFD700] text-black font-semibold rounded hover:bg-[#FFE44D] transition-colors">
                Subscribe Now
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Platforms */}
      <div className="max-w-7xl mx-auto mb-16">
        <h2 className="text-2xl font-bold text-[#FFD700] text-center mb-8">Platforms We Support</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {platforms.map((platform, index) => (
            <motion.div
              key={platform.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-zinc-900 rounded-lg p-6 text-center border border-[#FFD700]/20"
            >
              <div className="flex items-center justify-center mb-4">
                {platform.icon}
              </div>
              <h3 className="text-lg font-bold text-[#FFD700]">{platform.name}</h3>
            </motion.div>
          ))}
        </div>
      </div>

      {/* FAQ Section */}
      <section className="py-20 bg-neutral-800">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {serviceFAQs['social-media'].map((faq: { question: string; answer: string }, index: number) => (
              <motion.div
                key={faq.question}
                className="bg-neutral-900 rounded-lg p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <h3 className="text-xl font-bold text-white mb-3">{faq.question}</h3>
                <p className="text-neutral-400">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Services */}
      <RelatedServices
        currentService="Social Media Marketing"
        services={[
          {
            title: 'Content Marketing',
            description: 'Strategic content creation and distribution.',
            href: '/pricing/content-marketing',
            anchor: 'View Content Marketing Services'
          },
          {
            title: 'Email Marketing',
            description: 'Targeted email campaigns and automation.',
            href: '/pricing/email-marketing',
            anchor: 'View Email Marketing Services'
          },
          {
            title: 'SEO Services',
            description: 'Improve your search engine visibility.',
            href: '/pricing/seo',
            anchor: 'View SEO Services'
          },
          {
            title: 'Contact Us',
            description: 'Get in touch with us for a free consultation.',
            href: 'http://localhost:3001/get-in-touch-pretoria',
            anchor: 'Contact Us'
          }
        ]}
      />

      {/* CTA Section */}
      <section className="py-20 bg-black">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Grow Your Social Media Presence?
          </h2>
          <p className="text-xl text-neutral-300 mb-8">
            Contact us for a free consultation and let's create your social media strategy
          </p>
          <GetInTouchButton variant="primary" text="Start Your Project" className="text-lg" />
        </div>
      </section>
    </div>
  );
};

export default SocialMediaPage;
