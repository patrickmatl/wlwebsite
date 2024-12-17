'use client';

import React from 'react';
import { motion } from 'framer-motion';

const PackagesPage = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section with Animation */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#FFD700]/10 to-transparent opacity-20"></div>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-7xl mx-auto text-center relative z-10"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-[#FFD700] to-[#FFA500]">
            PROFESSIONAL DESIGN PACKAGES
          </h1>
          <p className="text-xl md:text-2xl mb-6 text-[#FFD700]">
            Elevate your brand with our industry-leading design solutions
          </p>
          <p className="text-gray-300 max-w-3xl mx-auto text-lg">
            As a premier design agency, we offer comprehensive creative solutions 
            tailored to businesses of all sizes. From startups to enterprise-level 
            organizations, our packages are designed to deliver exceptional value 
            and results.
          </p>
        </motion.div>
      </section>

      {/* Logo Design Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#FFD700]">Logo Design Packages</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Choose from our carefully crafted logo design packages to establish a strong brand identity
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {[
              {
                name: "Basic Logo",
                price: "R650",
                features: [
                  "1 Initial Concept",
                  "2 Revision Rounds",
                  "High Resolution Files",
                  "Basic Source Files",
                  "3-5 Day Delivery"
                ]
              },
              {
                name: "Professional Logo",
                price: "R1,500",
                features: [
                  "2 Initial Concepts",
                  "3 Revision Rounds",
                  "High Resolution Files",
                  "Source Files (AI, EPS, PDF)",
                  "Social Media Formats",
                  "2-3 Day Delivery"
                ]
              },
              {
                name: "Premium Logo",
                price: "R3,500",
                features: [
                  "5 Initial Concepts",
                  "Unlimited Revisions",
                  "All File Formats",
                  "Source Files (All Formats)",
                  "Social Media Kit",
                  "Business Card Design",
                  "24-48 Hour Delivery"
                ]
              }
            ].map((pkg, index) => (
              <motion.div
                key={pkg.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-zinc-900 rounded-lg p-8 border border-[#FFD700]/20 hover:border-[#FFD700]/40 transition-all duration-300"
              >
                <h3 className="text-2xl font-bold mb-4">{pkg.name}</h3>
                <div className="text-3xl font-bold text-[#FFD700] mb-6">{pkg.price}</div>
                <ul className="space-y-4 mb-8">
                  {pkg.features.map((feature) => (
                    <li key={feature} className="flex items-start">
                      <svg className="w-6 h-6 text-[#FFD700] mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
                <button className="w-full py-3 px-6 bg-[#FFD700] text-black font-bold rounded-lg hover:bg-[#FFA500] transition-colors duration-300">
                  Get Started
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Web Design Packages */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-zinc-900/30">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#FFD700]">Web Design Packages</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Transform your online presence with our professional web design solutions
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {[
              {
                name: "Basic Website",
                price: "R4,500",
                features: [
                  "5 Pages",
                  "Mobile Responsive",
                  "Contact Form",
                  "Basic SEO Setup",
                  "Social Media Integration",
                  "2 Weeks Delivery"
                ]
              },
              {
                name: "Business Website",
                price: "R8,999",
                features: [
                  "10 Pages",
                  "Mobile Responsive",
                  "Advanced Contact Forms",
                  "Full SEO Optimization",
                  "Social Media Integration",
                  "Blog Setup",
                  "Google Analytics",
                  "3 Weeks Delivery"
                ]
              },
              {
                name: "E-commerce Website",
                price: "R15,999",
                features: [
                  "Unlimited Pages",
                  "Mobile Responsive",
                  "Product Management",
                  "Payment Gateway",
                  "Inventory System",
                  "Order Management",
                  "Advanced Analytics",
                  "Email Marketing Setup",
                  "4 Weeks Delivery"
                ]
              }
            ].map((pkg, index) => (
              <motion.div
                key={pkg.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-zinc-900 rounded-lg p-8 border border-[#FFD700]/20 hover:border-[#FFD700]/40 transition-all duration-300"
              >
                <h3 className="text-2xl font-bold mb-4">{pkg.name}</h3>
                <div className="text-3xl font-bold text-[#FFD700] mb-6">{pkg.price}</div>
                <ul className="space-y-4 mb-8">
                  {pkg.features.map((feature) => (
                    <li key={feature} className="flex items-start">
                      <svg className="w-6 h-6 text-[#FFD700] mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
                <button className="w-full py-3 px-6 bg-[#FFD700] text-black font-bold rounded-lg hover:bg-[#FFA500] transition-colors duration-300">
                  Get Started
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Complete Brand Packages */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#FFD700]">Complete Brand Packages</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Comprehensive branding solutions for businesses ready to make a lasting impression
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {[
              {
                name: "Startup Brand Package",
                price: "R9,999",
                features: [
                  "Logo Design",
                  "Business Card Design",
                  "Basic Website (5 Pages)",
                  "Social Media Templates",
                  "Brand Style Guide",
                  "Email Signature",
                  "4 Weeks Delivery"
                ]
              },
              {
                name: "Professional Brand Package",
                price: "R18,999",
                features: [
                  "Premium Logo Design",
                  "Business Card & Stationery",
                  "Business Website (10 Pages)",
                  "Social Media Kit",
                  "Brand Guidelines",
                  "Marketing Materials",
                  "Email Templates",
                  "6 Weeks Delivery"
                ]
              },
              {
                name: "Enterprise Brand Package",
                price: "R29,999",
                features: [
                  "Custom Logo & Identity",
                  "Complete Stationery Suite",
                  "E-commerce Website",
                  "Advanced Brand Guidelines",
                  "Social Media Strategy",
                  "Marketing Collateral",
                  "Video Intro Animation",
                  "Email Marketing Setup",
                  "8 Weeks Delivery"
                ]
              }
            ].map((pkg, index) => (
              <motion.div
                key={pkg.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-zinc-900 rounded-lg p-8 border border-[#FFD700]/20 hover:border-[#FFD700]/40 transition-all duration-300"
              >
                <h3 className="text-2xl font-bold mb-4">{pkg.name}</h3>
                <div className="text-3xl font-bold text-[#FFD700] mb-6">{pkg.price}</div>
                <ul className="space-y-4 mb-8">
                  {pkg.features.map((feature) => (
                    <li key={feature} className="flex items-start">
                      <svg className="w-6 h-6 text-[#FFD700] mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
                <button className="w-full py-3 px-6 bg-[#FFD700] text-black font-bold rounded-lg hover:bg-[#FFA500] transition-colors duration-300">
                  Get Started
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA and Stats Section */}
      <section className="py-32">
        {/* Initial CTA */}
        <div className="text-center mb-16">
          <p className="text-xl text-gray-300">
            Ready to elevate your brand? Contact us for a personalized consultation.
          </p>
          <div className="mt-8">
            <button className="bg-[#FFD700] text-black px-12 py-4 rounded-lg font-bold text-lg hover:bg-[#FFA500] transition-colors duration-300">
              Schedule a Consultation
            </button>
          </div>
        </div>

        {/* Transform Your Brand Section */}
        <div className="max-w-5xl mx-auto bg-zinc-900/30 rounded-2xl p-16 mb-24">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-8 text-[#FFD700]">
              Ready to Transform Your Brand?
            </h2>
            <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
              Book a free consultation with our experts to discuss your project needs and discover how we can help you achieve your business goals.
            </p>
            <div className="space-x-6">
              <button className="bg-[#FFD700] text-black px-12 py-4 rounded-lg font-bold text-lg hover:bg-[#FFA500] transition-colors duration-300">
                Schedule a Consultation
              </button>
              <button className="border-2 border-[#FFD700] text-[#FFD700] px-12 py-4 rounded-lg font-bold text-lg hover:bg-[#FFD700] hover:text-black transition-colors duration-300">
                View Our Work
              </button>
            </div>
          </motion.div>
        </div>

        {/* Pretoria Studio Section */}
        <div className="max-w-5xl mx-auto bg-zinc-900/30 rounded-2xl p-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-8 text-[#FFD700]">
              Pretoria's Premier Graphic Design Studio
            </h2>
            <p className="text-xl text-gray-300 mb-16 max-w-3xl mx-auto leading-relaxed">
              Based in the heart of Pretoria, we've been serving local businesses with world-class design solutions. 
              Our deep understanding of the local market combined with international design standards makes us the 
              preferred choice for businesses in Pretoria and beyond.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="text-center"
              >
                <div className="text-5xl font-bold text-[#FFD700] mb-4">100+</div>
                <div className="text-xl text-gray-300">Pretoria Businesses Served</div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="text-center"
              >
                <div className="text-5xl font-bold text-[#FFD700] mb-4">10+</div>
                <div className="text-xl text-gray-300">Years in Pretoria</div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.3 }}
                className="text-center"
              >
                <div className="text-5xl font-bold text-[#FFD700] mb-4">5★</div>
                <div className="text-xl text-gray-300">Rated Design Agency</div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer Notes */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center text-gray-400 text-sm">
        <p className="mb-2">* All packages include dedicated support throughout the project</p>
        <p className="mb-2">* Custom requirements can be accommodated upon request</p>
        <p>* Prices are subject to change based on specific project requirements</p>
      </div>

      {/* Additional Services */}
      <div className="max-w-7xl mx-auto mb-20">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-[#FFD700]">Additional Professional Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="bg-zinc-900 rounded-lg p-6 border border-[#FFD700]/20 hover:border-[#FFD700]/40 transition-all">
            <h3 className="text-xl font-bold mb-4">Social Media Package</h3>
            <p className="text-2xl font-bold mb-2">R3,500/month</p>
            <ul className="space-y-3 text-gray-300">
              <li>✓ Content Creation</li>
              <li>✓ 15 Posts Monthly</li>
              <li>✓ Engagement Management</li>
              <li>✓ Monthly Analytics</li>
            </ul>
          </div>

          <div className="bg-zinc-900 rounded-lg p-6 border border-[#FFD700]/20 hover:border-[#FFD700]/40 transition-all">
            <h3 className="text-xl font-bold mb-4">SEO Package</h3>
            <p className="text-2xl font-bold mb-2">R4,500/month</p>
            <ul className="space-y-3 text-gray-300">
              <li>✓ Keyword Research</li>
              <li>✓ On-Page Optimization</li>
              <li>✓ Content Strategy</li>
              <li>✓ Monthly Reports</li>
            </ul>
          </div>

          <div className="bg-zinc-900 rounded-lg p-6 border border-[#FFD700]/20 hover:border-[#FFD700]/40 transition-all">
            <h3 className="text-xl font-bold mb-4">Video Production</h3>
            <p className="text-2xl font-bold mb-2">From R7,500</p>
            <ul className="space-y-3 text-gray-300">
              <li>✓ Professional Filming</li>
              <li>✓ Video Editing</li>
              <li>✓ Motion Graphics</li>
              <li>✓ Sound Design</li>
            </ul>
          </div>

          <div className="bg-zinc-900 rounded-lg p-6 border border-[#FFD700]/20 hover:border-[#FFD700]/40 transition-all">
            <h3 className="text-xl font-bold mb-4">Photography</h3>
            <p className="text-2xl font-bold mb-2">From R5,500</p>
            <ul className="space-y-3 text-gray-300">
              <li>✓ Product Photography</li>
              <li>✓ Corporate Portraits</li>
              <li>✓ Event Coverage</li>
              <li>✓ Retouching</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Enterprise Solutions */}
      <div className="max-w-7xl mx-auto mb-20">
        <div className="bg-gradient-to-r from-zinc-900 to-black p-8 rounded-lg border border-[#FFD700]/20">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-[#FFD700]">Enterprise Solutions</h2>
          <p className="text-gray-300 mb-6">
            For large organizations requiring custom solutions, we offer tailored packages 
            designed to meet your specific needs and objectives. Our enterprise solutions 
            include dedicated account management, priority support, and custom development 
            services.
          </p>
          <p className="text-xl font-bold text-white">Contact us for a customized quote</p>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="max-w-7xl mx-auto mb-20">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-[#FFD700] text-center">Why Choose WL CreationX</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <h3 className="text-xl font-bold mb-4">Expertise</h3>
            <p className="text-gray-300">
              Over 10 years of experience delivering exceptional design solutions to 
              clients worldwide.
            </p>
          </div>
          <div className="text-center">
            <h3 className="text-xl font-bold mb-4">Quality</h3>
            <p className="text-gray-300">
              Award-winning designs and industry-leading standards in every project 
              we deliver.
            </p>
          </div>
          <div className="text-center">
            <h3 className="text-xl font-bold mb-4">Support</h3>
            <p className="text-gray-300">
              Dedicated project management and ongoing support to ensure your success.
            </p>
          </div>
        </div>
      </div>

      {/* Specialized Industry Solutions */}
      <div className="max-w-7xl mx-auto mb-20">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-[#FFD700]">Industry-Specific Solutions</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="bg-zinc-900 rounded-lg p-6 border border-[#FFD700]/20 hover:border-[#FFD700]/40 transition-all">
            <h3 className="text-xl font-bold mb-4">Restaurant Package</h3>
            <p className="text-2xl font-bold mb-2">From R15,000</p>
            <ul className="space-y-3 text-gray-300">
              <li>✓ Brand Identity</li>
              <li>✓ Menu Design</li>
              <li>✓ Food Photography</li>
              <li>✓ Website with Online Ordering</li>
              <li>✓ Social Media Setup</li>
            </ul>
          </div>

          <div className="bg-zinc-900 rounded-lg p-6 border border-[#FFD700]/20 hover:border-[#FFD700]/40 transition-all">
            <h3 className="text-xl font-bold mb-4">Real Estate Package</h3>
            <p className="text-2xl font-bold mb-2">From R20,000</p>
            <ul className="space-y-3 text-gray-300">
              <li>✓ Property Listings Website</li>
              <li>✓ Virtual Tours</li>
              <li>✓ Professional Photography</li>
              <li>✓ Lead Generation System</li>
              <li>✓ CRM Integration</li>
            </ul>
          </div>

          <div className="bg-zinc-900 rounded-lg p-6 border border-[#FFD700]/20 hover:border-[#FFD700]/40 transition-all">
            <h3 className="text-xl font-bold mb-4">Healthcare Package</h3>
            <p className="text-2xl font-bold mb-2">From R25,000</p>
            <ul className="space-y-3 text-gray-300">
              <li>✓ POPIA Compliant Website</li>
              <li>✓ Appointment System</li>
              <li>✓ Patient Portal</li>
              <li>✓ Medical Photography</li>
              <li>✓ Secure Data Handling</li>
            </ul>
          </div>

          <div className="bg-zinc-900 rounded-lg p-6 border border-[#FFD700]/20 hover:border-[#FFD700]/40 transition-all">
            <h3 className="text-xl font-bold mb-4">Education Package</h3>
            <p className="text-2xl font-bold mb-2">From R30,000</p>
            <ul className="space-y-3 text-gray-300">
              <li>✓ Learning Management System</li>
              <li>✓ Course Creation Tools</li>
              <li>✓ Student Portal</li>
              <li>✓ Assessment Platform</li>
              <li>✓ Analytics Dashboard</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Digital Marketing Solutions */}
      <div className="max-w-7xl mx-auto mb-20">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-[#FFD700]">Digital Marketing Solutions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-zinc-900 rounded-lg p-6 border border-[#FFD700]/20 hover:border-[#FFD700]/40 transition-all">
            <h3 className="text-xl font-bold mb-4">Startup Growth</h3>
            <p className="text-2xl font-bold mb-2">R5,500/month</p>
            <ul className="space-y-3 text-gray-300">
              <li>✓ Social Media Management</li>
              <li>✓ Basic SEO</li>
              <li>✓ Content Creation</li>
              <li>✓ Monthly Reports</li>
              <li>✓ 3-Month Minimum</li>
            </ul>
          </div>

          <div className="bg-zinc-900 rounded-lg p-6 border border-[#FFD700]/20 hover:border-[#FFD700]/40 transition-all">
            <h3 className="text-xl font-bold mb-4">Business Pro</h3>
            <p className="text-2xl font-bold mb-2">R12,500/month</p>
            <ul className="space-y-3 text-gray-300">
              <li>✓ Advanced Social Management</li>
              <li>✓ Comprehensive SEO</li>
              <li>✓ Content Strategy</li>
              <li>✓ Email Marketing</li>
              <li>✓ PPC Campaigns</li>
              <li>✓ Weekly Reports</li>
            </ul>
          </div>

          <div className="bg-zinc-900 rounded-lg p-6 border border-[#FFD700]/20 hover:border-[#FFD700]/40 transition-all">
            <h3 className="text-xl font-bold mb-4">Enterprise Growth</h3>
            <p className="text-2xl font-bold mb-2">R25,000/month</p>
            <ul className="space-y-3 text-gray-300">
              <li>✓ Full-Service Digital Marketing</li>
              <li>✓ Marketing Automation</li>
              <li>✓ Advanced Analytics</li>
              <li>✓ Lead Generation</li>
              <li>✓ Conversion Optimization</li>
              <li>✓ Dedicated Account Manager</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Maintenance & Support */}
      <div className="max-w-7xl mx-auto mb-20">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-[#FFD700]">Maintenance & Support Plans</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-zinc-900 rounded-lg p-6 border border-[#FFD700]/20 hover:border-[#FFD700]/40 transition-all">
            <h3 className="text-xl font-bold mb-4">Essential Care</h3>
            <p className="text-2xl font-bold mb-2">R1,500/month</p>
            <ul className="space-y-3 text-gray-300">
              <li>✓ Security Updates</li>
              <li>✓ Weekly Backups</li>
              <li>✓ Basic Monitoring</li>
              <li>✓ 48hr Response Time</li>
            </ul>
          </div>

          <div className="bg-zinc-900 rounded-lg p-6 border border-[#FFD700]/20 hover:border-[#FFD700]/40 transition-all">
            <h3 className="text-xl font-bold mb-4">Business Care</h3>
            <p className="text-2xl font-bold mb-2">R3,500/month</p>
            <ul className="space-y-3 text-gray-300">
              <li>✓ Daily Backups</li>
              <li>✓ Performance Monitoring</li>
              <li>✓ Content Updates</li>
              <li>✓ 24hr Response Time</li>
              <li>✓ Monthly Reports</li>
            </ul>
          </div>

          <div className="bg-zinc-900 rounded-lg p-6 border border-[#FFD700]/20 hover:border-[#FFD700]/40 transition-all">
            <h3 className="text-xl font-bold mb-4">Premium Care</h3>
            <p className="text-2xl font-bold mb-2">R7,500/month</p>
            <ul className="space-y-3 text-gray-300">
              <li>✓ 24/7 Monitoring</li>
              <li>✓ Priority Support</li>
              <li>✓ Unlimited Updates</li>
              <li>✓ 4hr Response Time</li>
              <li>✓ Weekly Reports</li>
              <li>✓ Performance Optimization</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Client Testimonials */}
      <div className="max-w-7xl mx-auto mb-20">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-[#FFD700] text-center">Client Success Stories</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-zinc-900 p-8 rounded-lg border border-[#FFD700]/20">
            <p className="text-gray-300 mb-6 italic">
              "WL CreationX transformed our brand completely. The attention to detail 
              and professional service exceeded our expectations."
            </p>
            <p className="font-bold">- CEO, Financial Services Firm</p>
          </div>
          <div className="bg-zinc-900 p-8 rounded-lg border border-[#FFD700]/20">
            <p className="text-gray-300 mb-6 italic">
              "Our e-commerce sales increased by 300% after implementing their 
              digital marketing strategy. Exceptional results!"
            </p>
            <p className="font-bold">- Marketing Director, Retail Brand</p>
          </div>
          <div className="bg-zinc-900 p-8 rounded-lg border border-[#FFD700]/20">
            <p className="text-gray-300 mb-6 italic">
              "The website they created for us perfectly captures our brand essence 
              and has significantly improved user engagement."
            </p>
            <p className="font-bold">- Founder, Tech Startup</p>
          </div>
        </div>
      </div>

      {/* Process Timeline */}
      <div className="max-w-7xl mx-auto mb-20">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-[#FFD700] text-center">Our Process</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-[#FFD700] rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-black font-bold text-xl">1</span>
            </div>
            <h3 className="text-xl font-bold mb-2">Discovery</h3>
            <p className="text-gray-300">Understanding your goals and requirements</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-[#FFD700] rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-black font-bold text-xl">2</span>
            </div>
            <h3 className="text-xl font-bold mb-2">Strategy</h3>
            <p className="text-gray-300">Developing a tailored solution</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-[#FFD700] rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-black font-bold text-xl">3</span>
            </div>
            <h3 className="text-xl font-bold mb-2">Creation</h3>
            <p className="text-gray-300">Bringing your vision to life</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-[#FFD700] rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-black font-bold text-xl">4</span>
            </div>
            <h3 className="text-xl font-bold mb-2">Launch</h3>
            <p className="text-gray-300">Delivering and optimizing results</p>
          </div>
        </div>
      </div>

      {/* Technical Expertise */}
      <div className="max-w-7xl mx-auto mb-20">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-[#FFD700] text-center">Industry-Leading Technical Expertise</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div className="bg-zinc-900 p-8 rounded-lg border border-[#FFD700]/20">
            <h3 className="text-xl font-bold mb-4 text-[#FFD700]">Design Tools</h3>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-center">
                <span className="text-[#FFD700] mr-2">●</span>
                Adobe Photoshop
              </li>
              <li className="flex items-center">
                <span className="text-[#FFD700] mr-2">●</span>
                Adobe Illustrator
              </li>
              <li className="flex items-center">
                <span className="text-[#FFD700] mr-2">●</span>
                Adobe Premier Pro
              </li>
              <li className="flex items-center">
                <span className="text-[#FFD700] mr-2">●</span>
                Adobe After Effects
              </li>
              <li className="flex items-center">
                <span className="text-[#FFD700] mr-2">●</span>
                Figma
              </li>
            </ul>
          </div>

          <div className="bg-zinc-900 p-8 rounded-lg border border-[#FFD700]/20">
            <h3 className="text-xl font-bold mb-4 text-[#FFD700]">Development</h3>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-center">
                <span className="text-[#FFD700] mr-2">●</span>
                React + Vite
              </li>
              <li className="flex items-center">
                <span className="text-[#FFD700] mr-2">●</span>
                Next.js
              </li>
              <li className="flex items-center">
                <span className="text-[#FFD700] mr-2">●</span>
                WordPress
              </li>
              <li className="flex items-center">
                <span className="text-[#FFD700] mr-2">●</span>
                HTML5 & CSS3
              </li>
              <li className="flex items-center">
                <span className="text-[#FFD700] mr-2">●</span>
                JavaScript/TypeScript
              </li>
            </ul>
          </div>

          <div className="bg-zinc-900 p-8 rounded-lg border border-[#FFD700]/20">
            <h3 className="text-xl font-bold mb-4 text-[#FFD700]">Expertise</h3>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-center">
                <span className="text-[#FFD700] mr-2">●</span>
                UI/UX Design
              </li>
              <li className="flex items-center">
                <span className="text-[#FFD700] mr-2">●</span>
                Brand Identity
              </li>
              <li className="flex items-center">
                <span className="text-[#FFD700] mr-2">●</span>
                Web Development
              </li>
              <li className="flex items-center">
                <span className="text-[#FFD700] mr-2">●</span>
                Digital Marketing
              </li>
              <li className="flex items-center">
                <span className="text-[#FFD700] mr-2">●</span>
                Motion Graphics
              </li>
            </ul>
          </div>
        </div>

        <div className="bg-gradient-to-r from-zinc-900 to-black p-8 rounded-lg border border-[#FFD700]/20">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-xl font-bold mb-4 text-[#FFD700]">Why Choose Our Technical Expertise?</h3>
            <p className="text-gray-300 mb-6">
              With over a decade of experience in the creative industry, our team combines cutting-edge 
              technical skills with artistic excellence. We stay ahead of industry trends and utilize 
              the latest tools and technologies to deliver exceptional results for our clients.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <p className="text-3xl font-bold text-[#FFD700] mb-2">10+</p>
                <p className="text-sm text-gray-300">Years Experience</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-[#FFD700] mb-2">200+</p>
                <p className="text-sm text-gray-300">Projects Completed</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-[#FFD700] mb-2">50+</p>
                <p className="text-sm text-gray-300">Regular Clients</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Technology Stack Banner */}
      <div className="max-w-7xl mx-auto mb-20 overflow-hidden">
        <div className="bg-zinc-900/50 py-12 px-8 rounded-lg">
          <h3 className="text-xl font-bold mb-8 text-center text-[#FFD700]">Our Technology Stack</h3>
          <div className="flex flex-wrap justify-center gap-8">
            <div className="flex items-center bg-black/30 px-6 py-3 rounded-full">
              <span className="text-[#FFD700] mr-2">⚡</span>
              React
            </div>
            <div className="flex items-center bg-black/30 px-6 py-3 rounded-full">
              <span className="text-[#FFD700] mr-2">⚡</span>
              Next.js
            </div>
            <div className="flex items-center bg-black/30 px-6 py-3 rounded-full">
              <span className="text-[#FFD700] mr-2">⚡</span>
              WordPress
            </div>
            <div className="flex items-center bg-black/30 px-6 py-3 rounded-full">
              <span className="text-[#FFD700] mr-2">⚡</span>
              Photoshop
            </div>
            <div className="flex items-center bg-black/30 px-6 py-3 rounded-full">
              <span className="text-[#FFD700] mr-2">⚡</span>
              Illustrator
            </div>
            <div className="flex items-center bg-black/30 px-6 py-3 rounded-full">
              <span className="text-[#FFD700] mr-2">⚡</span>
              Premier Pro
            </div>
          </div>
        </div>
      </div>

      {/* Contact CTA */}
      <div className="max-w-3xl mx-auto text-center">
        <p className="text-gray-300 mb-6">
          Ready to elevate your brand? Contact us for a personalized consultation.
        </p>
        <a 
          href="/contact" 
          className="inline-block px-8 py-3 bg-[#FFD700] text-black font-bold rounded-lg hover:bg-[#FFA500] transition-colors"
        >
          Schedule a Consultation
        </a>
      </div>

      {/* Enhanced Contact CTA */}
      <div className="max-w-4xl mx-auto text-center bg-gradient-to-r from-zinc-900 to-black p-12 rounded-lg border border-[#FFD700]/20">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-[#FFD700]">Ready to Transform Your Brand?</h2>
        <p className="text-gray-300 mb-8 text-lg">
          Book a free consultation with our experts to discuss your project needs and discover 
          how we can help you achieve your business goals.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a 
            href="/contact" 
            className="inline-block px-8 py-3 bg-[#FFD700] text-black font-bold rounded-lg hover:bg-[#FFA500] transition-colors"
          >
            Schedule a Consultation
          </a>
          <a 
            href="/portfolio" 
            className="inline-block px-8 py-3 border-2 border-[#FFD700] text-[#FFD700] font-bold rounded-lg hover:bg-[#FFD700] hover:text-black transition-colors"
          >
            View Our Work
          </a>
        </div>
      </div>

      {/* Pretoria Business Section */}
      <div className="max-w-7xl mx-auto mb-20">
        <div className="bg-gradient-to-r from-zinc-900 to-black p-8 rounded-lg border border-[#FFD700]/20">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-[#FFD700] text-center">
            Pretoria's Premier Graphic Design Studio
          </h2>
          <p className="text-gray-300 mb-6 text-center">
            Based in the heart of Pretoria, we've been serving local businesses with world-class 
            design solutions. Our deep understanding of the local market combined with international 
            design standards makes us the preferred choice for businesses in Pretoria and beyond.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
              <p className="text-3xl font-bold text-[#FFD700] mb-2">100+</p>
              <p className="text-sm text-gray-300">Pretoria Businesses Served</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-[#FFD700] mb-2">10+</p>
              <p className="text-sm text-gray-300">Years in Pretoria</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-[#FFD700] mb-2">5★</p>
              <p className="text-sm text-gray-300">Rated Design Agency</p>
            </div>
          </div>
        </div>
      </div>

      {/* Location-Specific CTA */}
      <div className="max-w-4xl mx-auto text-center bg-gradient-to-r from-zinc-900 to-black p-12 rounded-lg border border-[#FFD700]/20">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-[#FFD700]">
          Looking for Professional Graphic Design in Pretoria?
        </h2>
        <p className="text-gray-300 mb-8 text-lg">
          Get in touch with Pretoria's trusted design team. Book a free consultation 
          to discuss your project needs and discover how we can help elevate your brand.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a 
            href="/contact" 
            className="inline-block px-8 py-3 bg-[#FFD700] text-black font-bold rounded-lg hover:bg-[#FFA500] transition-colors"
          >
            Schedule a Free Consultation
          </a>
          <a 
            href="/portfolio" 
            className="inline-block px-8 py-3 border-2 border-[#FFD700] text-[#FFD700] font-bold rounded-lg hover:bg-[#FFD700] hover:text-black transition-colors"
          >
            View Our Pretoria Portfolio
          </a>
        </div>
      </div>

      {/* Frequently Asked Questions */}
      <div className="max-w-7xl mx-auto mb-20">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-[#FFD700] text-center">
          Frequently Asked Questions About Our Graphic Design Services in Pretoria
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-zinc-900 p-8 rounded-lg border border-[#FFD700]/20">
            <h3 className="text-xl font-bold mb-4 text-[#FFD700]">
              What graphic design services do you offer in Pretoria?
            </h3>
            <p className="text-gray-300">
              We offer comprehensive graphic design services including logo design, 
              brand identity packages, web design, marketing materials, and social media graphics. 
              All our services are delivered from our Pretoria studio with a focus on local business needs.
            </p>
          </div>

          <div className="bg-zinc-900 p-8 rounded-lg border border-[#FFD700]/20">
            <h3 className="text-xl font-bold mb-4 text-[#FFD700]">
              How much do your graphic design packages cost in Pretoria?
            </h3>
            <p className="text-gray-300">
              Our packages start from R650 for basic logo design up to R85,000 for 
              comprehensive brand solutions. We offer competitive rates while maintaining 
              professional quality that meets international standards.
            </p>
          </div>

          <div className="bg-zinc-900 p-8 rounded-lg border border-[#FFD700]/20">
            <h3 className="text-xl font-bold mb-4 text-[#FFD700]">
              What makes your Pretoria design studio unique?
            </h3>
            <p className="text-gray-300">
              We combine local market expertise with international design standards. 
              Our team uses cutting-edge tools and technologies while providing 
              personalized service that understands the Pretoria business landscape.
            </p>
          </div>

          <div className="bg-zinc-900 p-8 rounded-lg border border-[#FFD700]/20">
            <h3 className="text-xl font-bold mb-4 text-[#FFD700]">
              Do you offer ongoing design support for Pretoria businesses?
            </h3>
            <p className="text-gray-300">
              Yes, we provide monthly maintenance packages and retainer services for 
              ongoing design needs. This ensures your brand maintains consistency 
              across all marketing materials throughout the year.
            </p>
          </div>
        </div>
      </div>

      {/* Terms */}
      <div className="max-w-3xl mx-auto mt-16 text-center text-sm text-gray-400">
        <p className="mb-2">* All prices are subject to change and exclude VAT</p>
        <p className="mb-2">* Custom requirements may affect final pricing</p>
        <p className="mb-2">* Delivery times may vary based on project complexity</p>
        <p>* Payment terms: 50% deposit required to commence work</p>
      </div>
    </div>
  );
};

export default PackagesPage;
