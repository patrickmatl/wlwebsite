'use client';

import { useState, useEffect, useRef } from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaWhatsapp, FaLinkedin, FaInstagram, FaFacebookSquare } from 'react-icons/fa';
import Link from 'next/link';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = 'https://itpmauqewzpxmwsdprmq.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml0cG1hdXFld3pweG13c2Rwcm1xIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ2MTI5NTAsImV4cCI6MjA1MDE4ODk1MH0.TSeTdVFUcitGocIDNcNN3yRRQDN--SF72az-Ih7tWLM'

// Create Supabase client with error logging
const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: false
  }
});

// Test Supabase connection
const testConnection = async () => {
  try {
    const { error } = await supabase
      .from('contact_submissions')
      .select('count')
      .limit(1);
    
    if (error) {
      console.error('Supabase connection test error:', error);
    } else {
      console.log('Supabase connection successful');
    }
  } catch (err) {
    console.error('Failed to test Supabase connection:', err);
  }
};

// Contact Form Component
function ContactFormContent() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      const formData = new FormData(e.currentTarget as HTMLFormElement);
      
      // Check honeypot field
      const honeypot = formData.get('website')?.toString();
      if (honeypot) {
        // Silently reject bot submissions
        console.log('Bot submission detected');
        setSuccess(true); // Fake success to avoid giving feedback to bots
        setTimeout(() => setSuccess(false), 5000);
        return;
      }

      const contactMethod = formData.get('preferred_contact_method')?.toString();
      
      // Create submission data object
      const submissionData = {
        name: formData.get('name')?.toString() || '',
        email: formData.get('email')?.toString() || '',
        phone: formData.get('phone')?.toString() || null,
        service_interested: formData.get('service_interested')?.toString() || '',
        project_timeline: formData.get('project_timeline')?.toString() || '',
        budget_range: formData.get('budget_range')?.toString() || '',
        project_details: formData.get('project_details')?.toString() || '',
        reference_links: formData.get('reference_links')?.toString() || null,
        how_did_you_hear: formData.get('how_did_you_hear')?.toString() || null,
        preferred_contact_method: contactMethod,
        contact_details: contactMethod === 'email' 
          ? formData.get('email')?.toString() 
          : formData.get('phone')?.toString(),
        terms_accepted: true,
        status: 'new'
      };

      // Insert the data
      const { error: insertError } = await supabase
        .from('contact_submissions')
        .insert([submissionData]);

      if (insertError) {
        throw new Error(insertError.message);
      }

      setSuccess(true);
      formRef.current?.reset();
      setTimeout(() => setSuccess(false), 5000);
      
    } catch (err) {
      console.error('Form submission error:', err);
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-zinc-900/50 p-6 rounded-lg relative">
      <h2 className="text-2xl font-bold text-[#FFD700] mb-4">Send Us a Message</h2>
      
      {error && (
        <div className="mb-4 p-3 bg-red-900/50 border border-red-500 rounded text-red-200 text-sm">
          {error}
        </div>
      )}
      
      {success && (
        <div className="absolute inset-0 flex items-center justify-center bg-zinc-900/95 rounded-lg">
          <div className="text-center p-6">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-[#FFD700] mb-2">Message Sent!</h3>
            <p className="text-zinc-300">Thank you for contacting us. We'll get back to you soon.</p>
          </div>
        </div>
      )}

      <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
        {/* Honeypot field - hidden from real users but visible to bots */}
        <div className="hidden" aria-hidden="true" style={{ display: 'none' }}>
          <label htmlFor="website">Website</label>
          <input
            type="text"
            id="website"
            name="website"
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label htmlFor="name" className="block text-xs mb-1">Your Name *</label>
            <input
              type="text"
              id="name"
              name="name"
              required
              className="w-full px-3 py-1.5 bg-black border border-zinc-700 rounded text-sm focus:outline-none focus:border-[#FFD700]"
              placeholder="John Doe"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-xs mb-1">Email Address *</label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="w-full px-3 py-1.5 bg-black border border-zinc-700 rounded text-sm focus:outline-none focus:border-[#FFD700]"
              placeholder="john@example.com"
            />
          </div>
        </div>

        <div>
          <label htmlFor="phone" className="block text-xs mb-1">Phone Number</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            className="w-full px-3 py-1.5 bg-black border border-zinc-700 rounded text-sm focus:outline-none focus:border-[#FFD700]"
            placeholder="+27 00 000 0000"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label htmlFor="service_interested" className="block text-xs mb-1">Service *</label>
            <select
              id="service_interested"
              name="service_interested"
              required
              className="w-full px-3 py-1.5 bg-black border border-zinc-700 rounded text-sm focus:outline-none focus:border-[#FFD700]"
            >
              <option value="">Select a service</option>
              <option value="Logo Design">Logo Design</option>
              <option value="Brand Identity">Brand Identity</option>
              <option value="Website Design">Website Design</option>
              <option value="Print Design">Print Design</option>
              <option value="Packaging Design">Packaging Design</option>
              <option value="Social Media Design">Social Media Design</option>
            </select>
          </div>

          <div>
            <label htmlFor="project_timeline" className="block text-xs mb-1">Timeline *</label>
            <select
              id="project_timeline"
              name="project_timeline"
              required
              className="w-full px-3 py-1.5 bg-black border border-zinc-700 rounded text-sm focus:outline-none focus:border-[#FFD700]"
            >
              <option value="">Select timeline</option>
              <option value="ASAP">As soon as possible</option>
              <option value="1-2 weeks">1-2 weeks</option>
              <option value="2-4 weeks">2-4 weeks</option>
              <option value="1-2 months">1-2 months</option>
              <option value="2+ months">2+ months</option>
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="budget_range" className="block text-xs mb-1">Budget Range *</label>
          <select
            id="budget_range"
            name="budget_range"
            required
            className="w-full px-3 py-1.5 bg-black border border-zinc-700 rounded text-sm focus:outline-none focus:border-[#FFD700]"
          >
            <option value="">Select budget range</option>
            <option value="R1000-R5000">R1,000 - R5,000</option>
            <option value="R5000-R10000">R5,000 - R10,000</option>
            <option value="R10000-R20000">R10,000 - R20,000</option>
            <option value="R20000+">R20,000+</option>
          </select>
        </div>

        <div>
          <label htmlFor="project_details" className="block text-xs mb-1">Project Details *</label>
          <textarea
            id="project_details"
            name="project_details"
            required
            rows={3}
            className="w-full px-3 py-1.5 bg-black border border-zinc-700 rounded text-sm focus:outline-none focus:border-[#FFD700]"
            placeholder="Tell us about your project requirements and goals..."
          ></textarea>
        </div>

        <div>
          <label htmlFor="reference_links" className="block text-xs mb-1">Reference Links</label>
          <input
            type="text"
            id="reference_links"
            name="reference_links"
            className="w-full px-3 py-1.5 bg-black border border-zinc-700 rounded text-sm focus:outline-none focus:border-[#FFD700]"
            placeholder="Share links to any reference work or inspiration (Optional)"
          />
        </div>

        <div>
          <label htmlFor="how_did_you_hear" className="block text-xs mb-1">How did you hear about us?</label>
          <select
            id="how_did_you_hear"
            name="how_did_you_hear"
            className="w-full px-3 py-1.5 bg-black border border-zinc-700 rounded text-sm focus:outline-none focus:border-[#FFD700]"
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

        <div>
          <label className="block text-xs mb-2">Preferred Contact Method *</label>
          <div className="grid grid-cols-3 gap-2">
            {[/* eslint-disable @typescript-eslint/no-unused-vars */
              { id: 'email', label: 'Email', icon: FaEnvelope },
              { id: 'phone', label: 'Phone', icon: FaPhone },
              { id: 'whatsapp', label: 'WhatsApp', icon: FaWhatsapp }
            ].map((method) => (
              <label
                key={method.id}
                className="flex items-center space-x-1 p-2 bg-black border border-zinc-700 rounded cursor-pointer hover:border-[#FFD700] text-sm"
              >
                <input
                  type="radio"
                  name="preferred_contact_method"
                  value={method.id}
                  required
                  className="text-[#FFD700]"
                />
                <method.icon className="text-[#FFD700] text-sm" />
                <span className="text-xs">{method.label}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="flex items-start space-x-2">
          <input
            type="checkbox"
            id="terms"
            name="terms"
            required
            className="mt-1"
          />
          <label htmlFor="terms" className="text-xs">
            I agree to the{' '/* eslint-disable @typescript-eslint/no-unused-vars */}
            <Link href="/terms" className="text-[#FFD700] hover:text-[#FFA500] underline">
              Terms of Service
            </Link>{' '/* eslint-disable @typescript-eslint/no-unused-vars */}
            and{' '/* eslint-disable @typescript-eslint/no-unused-vars */}
            <Link href="/privacy-policy" className="text-[#FFD700] hover:text-[#FFA500] underline">
              Privacy Policy
            </Link>
          </label>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-2 px-4 bg-[#FFD700] text-black font-semibold rounded text-sm hover:bg-[#FFE44D] transition-colors ${
            isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </button>
      </form>
    </div>
  );
}

// Main Contact Page Component
export default function Contact() {
  // Test connection on component mount
  useEffect(() => {
    testConnection();
  }, []);

  return (
    <main className="min-h-screen bg-black text-white py-8">
      <div className="max-w-5xl mx-auto px-4 bg-zinc-900/30 rounded-lg shadow-2xl backdrop-blur-sm">
        <div className="p-6 space-y-8">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Contact Information section */}
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-[#FFD700] mb-3">Contact Information</h2>
                <p className="text-gray-300 text-sm mb-4">
                  Ready to start your project? Contact us for a consultation and let's bring your vision to life.
                </p>
              </div>

              {/* Contact Methods */}
              <div className="grid grid-cols-1 gap-4">
                <div className="flex items-center space-x-2">
                  <FaPhone className="text-[#FFD700] text-lg" />
                  <div>
                    <h3 className="font-semibold text-sm">Call Us</h3>
                    <p className="text-gray-300 text-sm">+27 62 369 3789</p>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <FaEnvelope className="text-[#FFD700] text-lg" />
                  <div>
                    <h3 className="font-semibold text-sm">Email Us</h3>
                    <p className="text-gray-300 text-sm">info@wlcreationx.co.za</p>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <FaWhatsapp className="text-[#FFD700] text-lg" />
                  <div>
                    <h3 className="font-semibold text-sm">WhatsApp</h3>
                    <p className="text-gray-300 text-sm">+27 62 369 3789</p>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <FaMapMarkerAlt className="text-[#FFD700] text-lg" />
                  <div>
                    <h3 className="font-semibold text-sm">Visit Us</h3>
                    <p className="text-gray-300 text-sm">
                      210 Albertus St, La Montagne
                    </p>
                  </div>
                </div>
              </div>

              {/* Business Hours */}
              <div>
                <h3 className="text-lg font-bold mb-2">Business Hours</h3>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span>Monday - Friday</span>
                    <span className="text-[#FFD700]">8:00 AM - 5:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday</span>
                    <span className="text-[#FFD700]">9:00 AM - 1:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday</span>
                    <span className="text-[#FFD700]">Closed</span>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div>
                <h3 className="text-lg font-bold mb-2">Connect With Us</h3>
                <div className="flex space-x-4">
                  <Link href="https://linkedin.com" className="text-[#FFD700] hover:text-[#FFA500] transition-colors">
                    <FaLinkedin size={20} />
                  </Link>
                  <Link href="https://instagram.com" className="text-[#FFD700] hover:text-[#FFA500] transition-colors">
                    <FaInstagram size={20} />
                  </Link>
                  <Link href="https://facebook.com" className="text-[#FFD700] hover:text-[#FFA500] transition-colors">
                    <FaFacebookSquare size={20} />
                  </Link>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <ContactFormContent />
          </div>

          {/* FAQ Section */}
          <div className="border-t border-zinc-800 pt-8">
            <h2 className="text-2xl font-bold text-[#FFD700] mb-6">Frequently Asked Questions</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2">What services do you offer?</h3>
                  <p className="text-gray-300 text-sm">
                    We offer a comprehensive range of design services including logo design, brand identity, website design, print design, packaging design, and social media design.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">How long does a project typically take?</h3>
                  <p className="text-gray-300 text-sm">
                    Project timelines vary depending on complexity and scope. Simple projects might take 1-2 weeks, while more complex ones can take several months. We'll provide a detailed timeline during our initial consultation.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">What is your payment process?</h3>
                  <p className="text-gray-300 text-sm">
                    We typically require a 50% deposit to begin work, with the remaining balance due upon project completion. We accept various payment methods and can discuss payment plans for larger projects.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">How quickly do you respond to inquiries?</h3>
                  <p className="text-gray-300 text-sm">
                    We aim to respond to all inquiries within 24 hours during business days. For urgent matters, you can reach us directly via WhatsApp or phone during business hours (8:00 AM - 5:00 PM SAST).
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Do you provide after-hours support?</h3>
                  <p className="text-gray-300 text-sm">
                    While our regular business hours are Monday to Friday, we do offer emergency support for critical issues. Additional charges may apply for after-hours support.
                  </p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Do you offer revisions?</h3>
                  <p className="text-gray-300 text-sm">
                    Yes, we include a set number of revisions in our project quotes. Additional revisions can be arranged at an hourly rate. We work closely with you to ensure you're completely satisfied with the final result.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Can you work with clients remotely?</h3>
                  <p className="text-gray-300 text-sm">
                    Absolutely! We work with clients worldwide using various communication tools. We can schedule video calls, use project management software, and maintain regular communication throughout the project.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">What do I need to get started?</h3>
                  <p className="text-gray-300 text-sm">
                    Fill out our contact form with your project details, and we'll schedule a consultation to discuss your needs, timeline, and budget. We'll then provide a detailed proposal for your review.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Do you sign NDAs?</h3>
                  <p className="text-gray-300 text-sm">
                    Yes, we're happy to sign Non-Disclosure Agreements (NDAs) to protect your intellectual property and ensure confidentiality throughout our collaboration.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">What happens after I submit the contact form?</h3>
                  <p className="text-gray-300 text-sm">
                    After submission, you'll receive an immediate confirmation. Our team will review your requirements and contact you within 24 hours to schedule a consultation or request additional information.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
