"use client";

import HeroSection from "./HeroSection";
import Link from "next/link";
import FAQAccordion from "./FAQ/FAQAccordion";
import { homeFaqs } from "@/data/homeFaqs";

export default function HomeContent() {
  return (
    <main className="min-h-screen bg-black text-white relative overflow-hidden perspective-1000">
      {/* Hero Section (Visible Content) */}
      <HeroSection
        title="Design"
        subtitle="Agency"
        description="Leading graphic design agency in Pretoria, delivering innovative visual solutions and creative excellence for businesses nationwide."
      />

      {/* Defer below-the-fold work from initial render */}
      <div style={{ contentVisibility: 'auto', containIntrinsicSize: '1200px' }}>
      {/* Visual Content Sections */}
      <section className="py-20 px-4 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl md:text-3xl font-syne font-semibold mb-4 text-[#FFD700] opacity-90">
            Graphic Design Company in Pretoria
          </h1>
          <p className="mb-4 text-neutral-300 text-base leading-relaxed">
            Welcome to <Link href="/" className="text-[#FFD700] hover:underline">WL CreationX</Link>, the leading graphic design company and agency in Pretoria, South Africa. We specialize in creating visually stunning and impactful designs that help businesses stand out in today's competitive market. Explore our
            <Link href="/branding-solutions-pretoria" className="text-[#FFD700] hover:underline"> branding solutions</Link> and
            <Link href="/visual-communication-services-pretoria" className="text-[#FFD700] hover:underline"> visual communication services</Link> tailored for Pretoria.
          </p>
          <p className="text-neutral-300 text-base leading-relaxed mb-6">
            As one of the top <Link href="/pricing" className="text-[#FFD700] hover:underline">graphic design companies in Pretoria</Link>, we pride ourselves on delivering innovative and creative solutions tailored to your unique needs. From <Link href="/branding-solutions-pretoria" className="text-[#FFD700] hover:underline">branding</Link> and <Link href="/pricing/graphic-design-pretoria" className="text-[#FFD700] hover:underline">logo design</Link> to <Link href="/pricing/website-design-pretoria" className="text-[#FFD700] hover:underline">web design</Link> and marketing materials, we've got you covered.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            <Link href="/branding-solutions-pretoria" className="group">
              <div className="bg-black/50 p-6 rounded-lg hover:bg-black/70 transition-all">
                <h3 className="text-2xl font-syne font-bold mb-4 text-[#FFD700]">Branding Solutions</h3>
                <p className="text-neutral-300 text-sm leading-relaxed">
                  Build a memorable brand presence with Pretoria-focused strategy and design. We craft complete identities — logos, color systems, typography, and guidelines — that connect with local audiences and scale across print and digital.
                </p>
              </div>
            </Link>
            <Link href="/visual-communication-services-pretoria" className="group">
              <div className="bg-black/50 p-6 rounded-lg hover:bg-black/70 transition-all">
                <h3 className="text-2xl font-syne font-bold mb-4 text-[#FFD700]">Web & Visual Communication</h3>
                <p className="text-neutral-300 text-sm leading-relaxed">
                  Engage Pretoria customers with fast, responsive websites and targeted visual content. We design UX-focused sites, landing pages, and campaign assets that improve conversions and SEO visibility in Gauteng.
                </p>
              </div>
            </Link>
            <Link href="/branding-solutions-pretoria" className="group">
              <div className="bg-black/50 p-6 rounded-lg hover:bg-black/70 transition-all">
                <h3 className="text-2xl font-syne font-bold mb-4 text-[#FFD700]">Logo Design</h3>
                <p className="text-neutral-300 text-sm leading-relaxed">
                  Distinctive logos that feel at home in Pretoria’s market. We translate your story into a versatile mark with strong typography and scalable geometry.
                </p>
              </div>
            </Link>
            <Link href="/visual-communication-services-pretoria" className="group">
              <div className="bg-black/50 p-6 rounded-lg hover:bg-black/70 transition-all">
                <h3 className="text-2xl font-syne font-bold mb-4 text-[#FFD700]">Print Design</h3>
                <p className="text-neutral-300 text-sm leading-relaxed">
                  High-impact brochures, flyers, posters, and packaging designed for Pretoria audiences.
                </p>
              </div>
            </Link>
          </div>
          <div className="mt-12 text-center">
            <Link href="/get-in-touch-pretoria" className="inline-block bg-[#FFD700] text-black px-8 py-3 rounded-full font-bold hover:bg-[#FFD700]/90 transition-all">
              Get Free Consultation
            </Link>
          </div>
        </div>
      </section>

      {/* Internal Links: Strengthen Site Architecture */}
      <section className="py-10 px-4 bg-black/60">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-lg font-syne font-semibold mb-3 text-[#FFD700] opacity-90">Popular Pretoria Pages</h2>
          <ul className="flex flex-wrap gap-3 text-sm text-neutral-300">
            <li><Link href="/branding-solutions-pretoria" className="text-[#FFD700] hover:underline">Branding Solutions – Pretoria</Link></li>
            <li><Link href="/visual-communication-services-pretoria" className="text-[#FFD700] hover:underline">Visual Communication – Pretoria</Link></li>
            <li><Link href="/project-showcase-pretoria" className="text-[#FFD700] hover:underline">Project Showcase – Pretoria</Link></li>
            <li><Link href="/get-in-touch-pretoria" className="text-[#FFD700] hover:underline">Get in Touch – Pretoria</Link></li>
          </ul>
        </div>
      </section>

      {/* NAP Block: Name, Address, Phone */}
      <section className="py-8 px-4 bg-black">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-lg font-syne font-semibold mb-3 text-[#FFD700] opacity-90">Contact & Location (Pretoria)</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-neutral-300">
            <div>
              <p className="text-white font-semibold">WL CreationX</p>
              <p>Pretoria, Gauteng, South Africa</p>
            </div>
            <div>
              <p className="text-white font-semibold">Phone</p>
              <p>+27 62 369 3769</p>
            </div>
            <div>
              <p className="text-white font-semibold">Hours</p>
              <p>Mon–Fri: 09:00–17:00</p>
            </div>
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="py-16 px-4 bg-black">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-syne font-bold mb-8 text-[#FFD700]">
            Frequently Asked Questions
          </h2>
          <FAQAccordion faqs={homeFaqs} />
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-gray-900 to-black">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-syne font-bold mb-6 text-[#FFD700]">
            Ready to Elevate Your Brand?
          </h2>
          <p className="mb-8 text-neutral-300 text-lg">
            Partner with Pretoria's leading graphic design company and take your business to the next level. Whether you need a new logo, a website redesign, or a complete branding strategy, we're here to help.
          </p>
          <Link
            href="/get-in-touch-pretoria"
            className="inline-flex items-center justify-center px-8 py-3 bg-[#FFD700] text-black hover:bg-[#FFD700]/90 transition-all duration-300 font-medium text-lg"
          >
            Get a Free Consultation
          </Link>
        </div>
      </section>

      {/* Contextual link to homepage with varied phrasing */}
      <section className="py-6 px-4 bg-black">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-neutral-400 text-sm">
            Discover more on our <Link href="/" className="text-[#FFD700] hover:underline">homepage</Link> — including pricing, services, and projects.
          </p>
        </div>
      </section>
      </div>
    </main>
  );
}