'use client';

import { useState } from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaWhatsapp, FaLinkedin, FaInstagram, FaFacebookSquare, FaCheck, FaClock } from 'react-icons/fa';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Contact() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedService, setSelectedService] = useState('');
  const [budget, setBudget] = useState('');
  const [timeline, setTimeline] = useState('');
  const [contactMethod, setContactMethod] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Add your form submission logic here
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative h-[40vh] flex items-center justify-center"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black z-10" />
        <div className="absolute inset-0 bg-[url('/images/contact-hero.jpg')] bg-cover bg-center" />
        <div className="relative z-20 text-center px-4">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 text-[#FFD700]">Get in Touch</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto text-gray-300">
            Let's create something extraordinary together
          </p>
        </div>
      </motion.section>

      {/* Main Content */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Information */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-3xl font-bold mb-6 text-[#FFD700]">Contact Information</h2>
                <p className="text-gray-300 text-lg mb-8">
                  Ready to start your project? Contact us for a consultation and let's bring your vision to life.
                </p>
              </div>

              <div className="space-y-6">
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  className="flex items-start space-x-4 p-4 bg-zinc-900/50 rounded-lg"
                >
                  <FaPhone className="text-[#FFD700] w-6 h-6 mt-1" />
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Call Us</h3>
                    <a href="tel:+27623693769" className="text-gray-300 hover:text-[#FFD700] transition-colors block">
                      +27 62 369 3769
                    </a>
                  </div>
                </motion.div>

                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  className="flex items-start space-x-4 p-4 bg-zinc-900/50 rounded-lg"
                >
                  <FaWhatsapp className="text-[#FFD700] w-6 h-6 mt-1" />
                  <div>
                    <h3 className="text-xl font-semibold mb-2">WhatsApp</h3>
                    <a href="https://wa.me/27623693769" className="text-gray-300 hover:text-[#FFD700] transition-colors block">
                      +27 62 369 3769
                    </a>
                  </div>
                </motion.div>

                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  className="flex items-start space-x-4 p-4 bg-zinc-900/50 rounded-lg"
                >
                  <FaEnvelope className="text-[#FFD700] w-6 h-6 mt-1" />
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Email Us</h3>
                    <a href="mailto:info@wlcreationx.co.za" className="text-gray-300 hover:text-[#FFD700] transition-colors block">
                      info@wlcreationx.co.za
                    </a>
                  </div>
                </motion.div>

                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  className="flex items-start space-x-4 p-4 bg-zinc-900/50 rounded-lg"
                >
                  <FaMapMarkerAlt className="text-[#FFD700] w-6 h-6 mt-1" />
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Visit Us</h3>
                    <p className="text-gray-300">210 Albertus St</p>
                    <p className="text-gray-300">La Montagne, Pretoria, 0183</p>
                    <p className="text-gray-300">South Africa</p>
                  </div>
                </motion.div>
              </div>

              {/* Business Hours */}
              <div className="pt-8 border-t border-zinc-800">
                <div className="flex items-center mb-4">
                  <FaClock className="text-[#FFD700] w-5 h-5 mr-2" />
                  <h3 className="text-xl font-semibold">Business Hours</h3>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-300">Monday - Friday</span>
                    <span className="text-[#FFD700]">8:00 AM - 5:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Saturday</span>
                    <span className="text-[#FFD700]">9:00 AM - 1:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Sunday</span>
                    <span className="text-[#FFD700]">Closed</span>
                  </div>
                </div>
              </div>

              {/* Social Media Links */}
              <div className="pt-8 border-t border-zinc-800">
                <h3 className="text-xl font-semibold mb-4">Connect With Us</h3>
                <div className="flex space-x-4">
                  <motion.a
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#FFD700] hover:text-[#FFE55C] transition-colors"
                  >
                    <FaLinkedin className="w-6 h-6" />
                  </motion.a>
                  <motion.a
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#FFD700] hover:text-[#FFE55C] transition-colors"
                  >
                    <FaInstagram className="w-6 h-6" />
                  </motion.a>
                  <motion.a
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#FFD700] hover:text-[#FFE55C] transition-colors"
                  >
                    <FaFacebookSquare className="w-6 h-6" />
                  </motion.a>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-zinc-900 p-8 rounded-lg relative overflow-hidden"
            >
              {isSubmitted && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute inset-0 bg-zinc-900 flex items-center justify-center z-10"
                >
                  <div className="text-center">
                    <FaCheck className="w-16 h-16 text-green-500 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold mb-2">Message Sent!</h3>
                    <p className="text-gray-300">We'll get back to you soon.</p>
                  </div>
                </motion.div>
              )}

              <h2 className="text-3xl font-bold mb-6 text-[#FFD700]">Send Us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className="w-full bg-black border border-zinc-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#FFD700] transition-colors"
                      placeholder="John Doe"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="w-full bg-black border border-zinc-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#FFD700] transition-colors"
                      placeholder="john@example.com"
                      required
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      className="w-full bg-black border border-zinc-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#FFD700] transition-colors"
                      placeholder="+27 00 000 0000"
                    />
                  </div>
                  <div>
                    <label htmlFor="service" className="block text-sm font-medium text-gray-300 mb-2">
                      Service Interested In *
                    </label>
                    <select
                      id="service"
                      name="service"
                      value={selectedService}
                      onChange={(e) => setSelectedService(e.target.value)}
                      className="w-full bg-black border border-zinc-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#FFD700] transition-colors"
                      required
                    >
                      <option value="">Select a service</option>
                      <option value="branding">Brand Identity Design</option>
                      <option value="web">Web Design & Development</option>
                      <option value="ui">UI/UX Design</option>
                      <option value="print">Print Design</option>
                      <option value="digital">Digital Marketing</option>
                      <option value="motion">Motion Design</option>
                      <option value="photography">Photography</option>
                      <option value="videography">Videography</option>
                      <option value="aerial">Aerial Photography/Videography</option>
                      <option value="commercial">Commercial Photography</option>
                      <option value="events">Event Coverage</option>
                      <option value="corporate">Corporate Media</option>
                      <option value="product">Product Photography</option>
                      <option value="social">Social Media Content</option>
                      <option value="editing">Photo/Video Editing</option>
                      <option value="livestreaming">Live Streaming</option>
                      <option value="virtual">Virtual Tours</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="timeline" className="block text-sm font-medium text-gray-300 mb-2">
                      Project Timeline *
                    </label>
                    <select
                      id="timeline"
                      name="timeline"
                      value={timeline}
                      onChange={(e) => setTimeline(e.target.value)}
                      className="w-full bg-black border border-zinc-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#FFD700] transition-colors"
                      required
                    >
                      <option value="">Select timeline</option>
                      <option value="urgent">Urgent (Within 48 hours)</option>
                      <option value="week">This Week</option>
                      <option value="2weeks">Within 2 Weeks</option>
                      <option value="month">Within a Month</option>
                      <option value="flexible">Flexible Timeline</option>
                      <option value="planning">Just Planning Ahead</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="budget" className="block text-sm font-medium text-gray-300 mb-2">
                      Budget Range
                    </label>
                    <select
                      id="budget"
                      name="budget"
                      value={budget}
                      onChange={(e) => setBudget(e.target.value)}
                      className="w-full bg-black border border-zinc-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#FFD700] transition-colors"
                    >
                      <option value="">Select budget range</option>
                      <option value="<5k">Less than R5,000</option>
                      <option value="5k-10k">R5,000 - R10,000</option>
                      <option value="10k-20k">R10,000 - R20,000</option>
                      <option value="20k-50k">R20,000 - R50,000</option>
                      <option value="50k+">R50,000+</option>
                      <option value="discuss">Let's Discuss</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                    Project Details *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    className="w-full bg-black border border-zinc-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#FFD700] transition-colors"
                    placeholder="Tell us about your project requirements and goals..."
                    required
                  ></textarea>
                </div>

                {/* Reference/Inspiration */}
                <div>
                  <label htmlFor="reference" className="block text-sm font-medium text-gray-300 mb-2">
                    Reference Links
                  </label>
                  <input
                    type="text"
                    id="reference"
                    name="reference"
                    className="w-full bg-black border border-zinc-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#FFD700] transition-colors"
                    placeholder="Share links to any reference work or inspiration (Optional)"
                  />
                </div>

                {/* How did you hear about us */}
                <div>
                  <label htmlFor="source" className="block text-sm font-medium text-gray-300 mb-2">
                    How did you hear about us?
                  </label>
                  <select
                    id="source"
                    name="source"
                    className="w-full bg-black border border-zinc-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#FFD700] transition-colors"
                  >
                    <option value="">Select an option</option>
                    <option value="google">Google Search</option>
                    <option value="social">Social Media</option>
                    <option value="referral">Referral</option>
                    <option value="portfolio">Your Portfolio</option>
                    <option value="event">Event/Exhibition</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                {/* Preferred Contact Method */}
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Preferred Contact Method *
                    </label>
                    <div className="grid grid-cols-3 gap-4">
                      {[
                        { id: 'email', label: 'Email', icon: FaEnvelope },
                        { id: 'phone', label: 'Phone', icon: FaPhone },
                        { id: 'whatsapp', label: 'WhatsApp', icon: FaWhatsapp }
                      ].map((method) => (
                        <label
                          key={method.id}
                          className={`flex items-center space-x-2 bg-black border ${
                            contactMethod === method.id ? 'border-[#FFD700]' : 'border-zinc-700'
                          } rounded-lg px-4 py-3 cursor-pointer hover:border-[#FFD700] transition-colors`}
                        >
                          <input
                            type="radio"
                            name="contactMethod"
                            value={method.id}
                            checked={contactMethod === method.id}
                            onChange={(e) => setContactMethod(e.target.value)}
                            className="text-[#FFD700] focus:ring-[#FFD700]"
                            required
                          />
                          <method.icon className="w-4 h-4 text-[#FFD700]" />
                          <span className="text-gray-300">{method.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Dynamic Contact Field */}
                  {contactMethod && (
                    <div className="animate-fadeIn">
                      {contactMethod === 'email' && (
                        <div>
                          <label htmlFor="emailAddress" className="block text-sm font-medium text-gray-300 mb-2">
                            Email Address *
                          </label>
                          <input
                            type="email"
                            id="emailAddress"
                            name="emailAddress"
                            className="w-full bg-black border border-zinc-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#FFD700] transition-colors"
                            placeholder="your@email.com"
                            required
                          />
                        </div>
                      )}
                      {contactMethod === 'phone' && (
                        <div>
                          <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-300 mb-2">
                            Phone Number *
                          </label>
                          <input
                            type="tel"
                            id="phoneNumber"
                            name="phoneNumber"
                            className="w-full bg-black border border-zinc-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#FFD700] transition-colors"
                            placeholder="+27 00 000 0000"
                            required
                          />
                        </div>
                      )}
                      {contactMethod === 'whatsapp' && (
                        <div>
                          <label htmlFor="whatsappNumber" className="block text-sm font-medium text-gray-300 mb-2">
                            WhatsApp Number *
                          </label>
                          <input
                            type="tel"
                            id="whatsappNumber"
                            name="whatsappNumber"
                            className="w-full bg-black border border-zinc-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#FFD700] transition-colors"
                            placeholder="+27 00 000 0000"
                            required
                          />
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Terms and Privacy */}
                <div className="flex items-start space-x-2">
                  <input
                    type="checkbox"
                    id="terms"
                    name="terms"
                    className="mt-1 text-[#FFD700] focus:ring-[#FFD700] rounded"
                    required
                  />
                  <label htmlFor="terms" className="text-sm text-gray-300">
                    I agree to the{' '}
                    <Link href="/terms" className="text-[#FFD700] hover:text-[#FFA500] underline">
                      Terms of Service
                    </Link>{' '}
                    and{' '}
                    <Link href="/privacy-policy" className="text-[#FFD700] hover:text-[#FFA500] underline">
                      Privacy Policy
                    </Link>
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#FFD700] text-black font-bold py-4 px-8 rounded-lg hover:bg-[#FFA500] transition-colors duration-300 flex items-center justify-center space-x-2"
                >
                  <span>Send Message</span>
                  <FaEnvelope className="w-5 h-5" />
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-zinc-900/50">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-bold mb-8 text-center text-[#FFD700]">Frequently Asked Questions</h2>

          {/* FAQ Schema */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "FAQPage",
                "mainEntity": [
                  {
                    "@type": "Question",
                    "name": "What is your typical response time?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "We aim to respond to all inquiries within 24 hours during business days. For urgent matters, please contact us via phone or WhatsApp."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "Do you offer in-person consultations?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Yes, we offer both in-person and virtual consultations. You can schedule a meeting at our Pretoria office or arrange a video call for your convenience."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "What information should I prepare for the consultation?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "It's helpful to have your project goals, timeline, budget range, and any reference materials or inspiration ready for our discussion. This helps us understand your vision better."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "How long does a typical project take to complete?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Project timelines vary depending on scope and complexity. A basic website might take 4-6 weeks, while a comprehensive brand identity project could take 6-8 weeks. We'll provide a detailed timeline during our consultation."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "What is your payment structure?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "We typically require a 50% deposit to begin work, with the remaining balance due upon project completion. For larger projects, we can arrange milestone-based payments. We accept bank transfers."
                    }
                  }
                ]
              })
            }}
          />

          <div className="grid gap-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-zinc-900 p-6 rounded-lg hover:bg-zinc-800/80 transition-colors duration-300"
            >
              <h3 className="text-xl font-semibold mb-3">What is your typical response time?</h3>
              <p className="text-gray-300">We aim to respond to all inquiries within 24 hours during business days. For urgent matters, please contact us via phone or WhatsApp.</p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-zinc-900 p-6 rounded-lg hover:bg-zinc-800/80 transition-colors duration-300"
            >
              <h3 className="text-xl font-semibold mb-3">Do you offer in-person consultations?</h3>
              <p className="text-gray-300">Yes, we offer both in-person and virtual consultations. You can schedule a meeting at our Pretoria office or arrange a video call for your convenience.</p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-zinc-900 p-6 rounded-lg hover:bg-zinc-800/80 transition-colors duration-300"
            >
              <h3 className="text-xl font-semibold mb-3">What information should I prepare for the consultation?</h3>
              <p className="text-gray-300">It's helpful to have your project goals, timeline, budget range, and any reference materials or inspiration ready for our discussion. This helps us understand your vision better.</p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-zinc-900 p-6 rounded-lg hover:bg-zinc-800/80 transition-colors duration-300"
            >
              <h3 className="text-xl font-semibold mb-3">How long does a typical project take to complete?</h3>
              <p className="text-gray-300">Project timelines vary depending on scope and complexity. A basic website might take 4-6 weeks, while a comprehensive brand identity project could take 6-8 weeks. We'll provide a detailed timeline during our consultation.</p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="bg-zinc-900 p-6 rounded-lg hover:bg-zinc-800/80 transition-colors duration-300"
            >
              <h3 className="text-xl font-semibold mb-3">What is your payment structure?</h3>
              <p className="text-gray-300">We typically require a 50% deposit to begin work, with the remaining balance due upon project completion. For larger projects, we can arrange milestone-based payments. We accept bank transfers.</p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="bg-zinc-900 p-6 rounded-lg hover:bg-zinc-800/80 transition-colors duration-300"
            >
              <h3 className="text-xl font-semibold mb-3">Do you provide ongoing support after project completion?</h3>
              <p className="text-gray-300">Yes, we offer various maintenance and support packages for websites and digital products. For brand identity projects, we provide a comprehensive brand guide and ongoing consultation as needed.</p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="bg-zinc-900 p-6 rounded-lg hover:bg-zinc-800/80 transition-colors duration-300"
            >
              <h3 className="text-xl font-semibold mb-3">What makes WL CreationX different from other agencies?</h3>
              <p className="text-gray-300">We combine strategic thinking with creative excellence, focusing on delivering measurable results. Our team brings years of experience in both design and business strategy, ensuring your project not only looks great but also achieves your business objectives.</p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="bg-zinc-900 p-6 rounded-lg hover:bg-zinc-800/80 transition-colors duration-300"
            >
              <h3 className="text-xl font-semibold mb-3">Do you work with clients outside of Pretoria?</h3>
              <p className="text-gray-300">Yes, we work with clients nationwide and internationally. We use video conferencing and project management tools to ensure smooth communication and project delivery, regardless of location.</p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.9 }}
              className="bg-zinc-900 p-6 rounded-lg hover:bg-zinc-800/80 transition-colors duration-300"
            >
              <h3 className="text-xl font-semibold mb-3">What if I need revisions to the design?</h3>
              <p className="text-gray-300">Our project quotes include a specified number of revision rounds. We work closely with you during the design process to ensure we're meeting your vision. Additional revisions beyond the included rounds can be arranged at an hourly rate.</p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.0 }}
              className="bg-zinc-900 p-6 rounded-lg hover:bg-zinc-800/80 transition-colors duration-300"
            >
              <h3 className="text-xl font-semibold mb-3">Can you work with my existing brand guidelines?</h3>
              <p className="text-gray-300">Absolutely! We're experienced in working with established brand guidelines and can create new designs that align perfectly with your existing brand identity while bringing fresh creative perspectives.</p>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}
