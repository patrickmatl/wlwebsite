'use client';

import { motion } from 'framer-motion';
import { FaCheck } from 'react-icons/fa';
import Breadcrumb from '@/components/Breadcrumb';
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
      {/* Breadcrumb */}
      <Breadcrumb items={breadcrumbItems} />
      
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
