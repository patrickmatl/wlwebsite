"use client";

import { motion } from "framer-motion";
import GetInTouchButton from "@/components/GetInTouchButton";
import RelatedServices from "@/components/RelatedServices";

export default function AnnualReportDesignPrintPretoria() {
  return (
    <div className="min-h-screen bg-black text-white py-20 px-4 sm:px-6 lg:px-8">
      {/* Visually Hidden SEO Headings */}
      <section style={{position:'absolute',left:'-9999px',top:'auto',width:'1px',height:'1px',overflow:'hidden'}} aria-hidden="true">
        <h1>Annual Report Design Pretoria | Annual Report Printing Pretoria | WL CreationX</h1>
        <p>WL CreationX is the leading agency for annual report design and print in Pretoria, Gauteng. We create professional, visually striking annual reports that help Pretoria businesses and organizations communicate achievements, financial results, and vision with clarity and impact.</p>
        <h2>Best Annual Report Designers in Pretoria</h2>
        <p>Our Pretoria-based team specializes in custom annual report design, corporate report design, and financial report design for companies, NGOs, and government entities. We combine creative layouts, infographics, and premium printing to deliver outstanding results.</p>
        <h3>Comprehensive Annual Report Printing Services in Pretoria</h3>
        <p>From concept to print, we offer end-to-end solutions: research, copywriting, design, typesetting, proofing, and high-quality printing. Our annual report printing services in Pretoria ensure your reports are delivered on time and on budget, with a flawless finish.</p>
        <h4>Why Choose WL CreationX for Annual Report Design in Pretoria?</h4>
        <ul>
          <li>Expert annual report designers in Pretoria with years of experience</li>
          <li>Cutting-edge design, clear data presentation, and brand consistency</li>
          <li>Fast turnaround and reliable delivery across Pretoria & Gauteng</li>
          <li>Trusted by corporates, SMEs, non-profits, and public sector clients</li>
          <li>Affordable packages for all business sizes</li>
        </ul>
        <h5>Pretoria’s Trusted Annual Report Agency – WL CreationX</h5>
        <p>Looking for the best annual report design and print company in Pretoria? WL CreationX delivers award-winning annual reports that impress stakeholders and support your brand’s reputation.</p>
      </section>

      {/* Visually Hidden SEO FAQ for Annual Report Design Pretoria */}
      <section style={{position:'absolute',left:'-9999px',top:'auto',width:'1px',height:'1px',overflow:'hidden'}} aria-hidden="true">
        <h2>Frequently Asked Questions about Annual Report Design and Print in Pretoria</h2>
        <div><h3>What makes a great annual report design?</h3><p>A great annual report design combines clear financial data, engaging infographics, compelling storytelling, and professional layout to highlight your Pretoria company’s achievements and future goals.</p></div>
        <div><h3>Do you offer annual report printing in Pretoria?</h3><p>Yes, WL CreationX provides high-quality annual report printing in Pretoria, including a range of paper stocks, binding, and finishes for a premium result.</p></div>
        <div><h3>How long does it take to design and print an annual report?</h3><p>Most annual report projects in Pretoria are completed within 2–4 weeks, depending on complexity and client feedback cycles.</p></div>
        <div><h3>Can you help with copywriting and data visualization?</h3><p>Absolutely. Our Pretoria team offers copywriting, data visualization, and infographic design to ensure your annual report is informative and visually appealing.</p></div>
        <div><h3>Is my annual report design confidential?</h3><p>Yes. We sign NDAs and treat all Pretoria client information with strict confidentiality during the design and print process.</p></div>
        <div><h3>Do you serve clients outside Pretoria?</h3><p>We primarily serve Pretoria and Gauteng, but also work with clients across South Africa and internationally for annual report design and print projects.</p></div>
        <div><h3>What industries do you serve?</h3><p>We design annual reports for corporates, NGOs, government, education, healthcare, finance, and more in Pretoria and beyond.</p></div>
        <div><h3>How do I get started?</h3><p>Contact WL CreationX via our website to discuss your annual report design and print needs in Pretoria. We’ll provide a free consultation and quote.</p></div>
      </section>

      {/* Hero Section */}
      <section className="text-center max-w-3xl mx-auto mb-12">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#FFD700] mb-4"
        >
          Annual Report Design and Print Pretoria
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="text-lg md:text-xl text-neutral-200 mb-6"
        >
          Showcase your company’s achievements and vision with a professionally designed and printed annual report. We handle every detail, from creative layout to high-quality print, ensuring your report makes a lasting impression.
        </motion.p>
        <GetInTouchButton />
      </section>

      {/* Pricing Plans Section */}
      <section className="max-w-6xl mx-auto mb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* BASIC Plan */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-zinc-900 border border-zinc-700 rounded-3xl shadow-lg p-8 flex flex-col items-center text-center hover:border-[#FFD700] transition-all"
          >
            <h3 className="text-2xl font-bold text-[#FFD700] mb-2">BASIC</h3>
            <div className="text-3xl font-extrabold mb-4">R 25,000</div>
            <ul className="space-y-2 text-neutral-200 mb-6">
              <li>Cover design</li>
              <li>Collage artwork</li>
              <li>Typographic work</li>
              <li>Layout</li>
              <li>Up To 50 Pages</li>
            </ul>
            <a href="http://localhost:3001/get-in-touch-pretoria" className="bg-[#FFD700] text-black px-6 py-2 rounded-full font-medium hover:bg-[#FFA500] transition-all block">Choose Plan</a>
          </motion.div>

          {/* Standard Plan */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-zinc-900 border border-zinc-700 rounded-3xl shadow-lg p-8 flex flex-col items-center text-center hover:border-[#FFD700] transition-all"
          >
            <h3 className="text-2xl font-bold text-[#FFD700] mb-2">Standard</h3>
            <div className="text-3xl font-extrabold mb-4">R 48,000</div>
            <ul className="space-y-2 text-neutral-200 mb-6">
              <li>Cover Design</li>
              <li>Collage Artwork</li>
              <li>Typographic Artwork</li>
              <li>Layout</li>
              <li>Up to 100 Pages</li>
            </ul>
            <a href="http://localhost:3001/get-in-touch-pretoria" className="bg-[#FFD700] text-black px-6 py-2 rounded-full font-medium hover:bg-[#FFA500] transition-all block">Choose Plan</a>
          </motion.div>

          {/* Gold Plan */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="bg-zinc-900 border border-zinc-700 rounded-3xl shadow-lg p-8 flex flex-col items-center text-center hover:border-[#FFD700] transition-all"
          >
            <h3 className="text-2xl font-bold text-[#FFD700] mb-2">Gold</h3>
            <div className="text-3xl font-extrabold mb-4">R 71,000</div>
            <ul className="space-y-2 text-neutral-200 mb-6">
              <li>Cover Design</li>
              <li>Collage Artwork</li>
              <li>Typographic Artwork</li>
              <li>Layout</li>
              <li>Up to 150 Pages</li>
            </ul>
            <a href="http://localhost:3001/get-in-touch-pretoria" className="bg-[#FFD700] text-black px-6 py-2 rounded-full font-medium hover:bg-[#FFA500] transition-all block">Choose Plan</a>
          </motion.div>

          {/* Personal Plan */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-zinc-900 border border-zinc-700 rounded-3xl shadow-lg p-8 flex flex-col items-center text-center hover:border-[#FFD700] transition-all"
          >
            <h3 className="text-2xl font-bold text-[#FFD700] mb-2">Personal</h3>
            <div className="text-3xl font-extrabold mb-4">R 94,000</div>
            <ul className="space-y-2 text-neutral-200 mb-6">
              <li>Cover Design</li>
              <li>Collage Artwork</li>
              <li>Typographic Artwork</li>
              <li>Layout</li>
              <li>Up to 200 Pages</li>
            </ul>
            <a href="http://localhost:3001/get-in-touch-pretoria" className="bg-[#FFD700] text-black px-6 py-2 rounded-full font-medium hover:bg-[#FFA500] transition-all block">Choose Plan</a>
          </motion.div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="max-w-3xl mx-auto mb-16 text-center">
        <h2 className="text-2xl font-bold text-[#FFD700] mb-4">How It Works</h2>
        <div className="space-y-2 text-neutral-200">
          <p><span className="font-semibold text-white">1. Choose your plan</span> – Select the package that fits your needs.</p>
          <p><span className="font-semibold text-white">2. Get in touch</span> – Contact us and we’ll discuss your goals, content, and timeline.</p>
          <p><span className="font-semibold text-white">3. We design & print</span> – Our team creates your annual report and manages the print process.</p>
          <p><span className="font-semibold text-white">4. Delivery</span> – Receive your professionally printed annual reports, ready to impress.</p>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="max-w-2xl mx-auto mb-16 text-center">
        <div className="bg-zinc-800 rounded-3xl p-8 border border-zinc-700 shadow-lg">
          <p className="text-lg italic text-neutral-100 mb-4">“WL CreationX delivered our annual report on time and exceeded our expectations. The design was stunning and the print quality was superb. Highly recommended!”</p>
          <div className="text-[#FFD700] font-bold">— Client in Pretoria</div>
        </div>
      </section>

      {/* Contact Encouragement */}
      <section className="max-w-3xl mx-auto mb-16 text-center">
        <h2 className="text-xl font-bold text-[#FFD700] mb-2">Not sure which plan is right for you?</h2>
        <p className="text-neutral-200 mb-4">Contact us for a free consultation or a custom quote tailored to your organization’s needs.</p>
        <a href="http://localhost:3001/get-in-touch-pretoria" className="inline-block bg-[#FFD700] text-black px-8 py-3 rounded-full font-medium hover:bg-[#FFA500] transition-all">Contact Us</a>
      </section>

      {/* Related Services */}
      <RelatedServices />
    </div>
  );
}
