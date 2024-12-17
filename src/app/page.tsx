'use client';

import { useState, useEffect, Suspense } from 'react';
import dynamic from 'next/dynamic';
import BackgroundParticles from '@/components/BackgroundParticles';

const DynamicHeroSection = dynamic(() => import('@/components/HeroSection'), {
  ssr: false
});

const DynamicBlogPreview = dynamic(() => import('@/components/BlogPreview'), {
  ssr: false
});

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <main 
      className={`min-h-screen bg-black text-white relative overflow-hidden perspective-1000 transition-opacity duration-500 ${
        isLoaded ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {/* Background with particles */}
      <BackgroundParticles />

      {/* Animated Grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30 animate-grid" />

      {/* Hero Section with SEO attributes */}
      <DynamicHeroSection 
        itemScope 
        itemType="https://schema.org/WPHeader"
        seoTitle="Premier Graphic Design Agency in Pretoria"
        seoDescription="Transforming brands through creative excellence. Your trusted design partner in Pretoria, delivering innovative graphic design, web development, and branding solutions."
      />

      {/* Services Section */}
      <section className="py-32 bg-black relative overflow-hidden" id="services">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Section Header */}
          <div className="text-center mb-20">
            <h2 className="font-syne text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-neutral-400 mb-6">
              Our Expertise
            </h2>
            <p className="font-space-grotesk text-xl text-neutral-400 max-w-2xl mx-auto">
              Transforming ideas into exceptional digital experiences
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Graphic Design',
                description: 'Brand identity, marketing materials, and visual storytelling that captures attention and drives engagement.',
                features: ['Logo Design', 'Brand Guidelines', 'Marketing Collateral', 'Social Media Graphics'],
                icon: '🎨'
              },
              {
                title: 'Web Design',
                description: 'Custom websites that combine stunning aesthetics with seamless functionality and optimal performance.',
                features: ['Custom Development', 'Responsive Design', 'E-commerce Solutions', 'CMS Integration'],
                icon: '💻'
              },
              {
                title: 'Print Design',
                description: 'High-quality print materials that make a lasting impression and elevate your brand.',
                features: ['Business Cards', 'Brochures', 'Packaging', 'Large Format Printing'],
                icon: '🖨️'
              },
              {
                title: 'UI/UX Design',
                description: 'Intuitive interfaces and user experiences that engage and delight your audience.',
                features: ['User Research', 'Wireframing', 'Prototyping', 'User Testing'],
                icon: '🎯'
              },
              {
                title: 'Motion Design',
                description: 'Dynamic animations and motion graphics that bring your brand to life.',
                features: ['Logo Animation', 'Social Media Content', 'Video Editing', 'Motion Graphics'],
                icon: '✨'
              },
              {
                title: 'Brand Strategy',
                description: 'Strategic brand development that positions you for success in your market.',
                features: ['Market Research', 'Brand Positioning', 'Content Strategy', 'Brand Voice'],
                icon: '📈'
              }
            ].map((service, index) => (
              <div 
                key={service.title}
                className="group relative bg-neutral-900 p-8 rounded-lg overflow-hidden transform hover:-translate-y-1 transition-all duration-300 service-card hover-trigger"
              >
                {/* Service background accent */}
                <div className="absolute inset-0 bg-gradient-to-br from-gold-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Icon */}
                <div className="text-4xl mb-6">{service.icon}</div>
                
                {/* Title */}
                <h3 className="font-syne text-2xl font-bold text-white mb-4">
                  {service.title}
                </h3>
                
                {/* Description */}
                <p className="font-space-grotesk text-neutral-400 mb-6">
                  {service.description}
                </p>
                
                {/* Features */}
                <ul className="space-y-2">
                  {service.features.map((feature) => (
                    <li key={feature} className="font-space-grotesk text-sm text-neutral-300 flex items-center">
                      <span className="w-1 h-1 bg-gold-500 rounded-full mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Background accents */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/2 h-px w-32 bg-gradient-to-r from-transparent via-gold-500 to-transparent" />
          <div className="absolute bottom-0 left-1/2 h-px w-32 bg-gradient-to-r from-transparent via-gold-500 to-transparent" />
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-gradient-to-b from-black/30 to-black/50 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <h2 className="font-syne text-4xl md:text-5xl font-bold text-center mb-16">
            Why Choose Our Design Agency in Pretoria?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="flex flex-col gap-2">
              <h3 className="font-syne text-2xl font-bold text-[#FFD700]">Local Expertise</h3>
              <p className="text-neutral-300">Based in Pretoria, we understand the local market and deliver designs that resonate with your target audience.</p>
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="font-syne text-2xl font-bold text-[#FFD700]">Creative Excellence</h3>
              <p className="text-neutral-300">Award-winning design solutions that combine creativity with strategic thinking.</p>
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="font-syne text-2xl font-bold text-[#FFD700]">Client-Focused Approach</h3>
              <p className="text-neutral-300">We work closely with you to understand your vision and deliver results that exceed expectations.</p>
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="font-syne text-2xl font-bold text-[#FFD700]">Full-Service Agency</h3>
              <p className="text-neutral-300">From concept to execution, we handle all your design needs under one roof.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Work */}
      <section className="py-20 bg-[#0A0A0A]" id="work">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between mb-16">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Featured Work</h2>
              <p className="text-gray-400 max-w-2xl">Transforming brands through strategic design and creative innovation.</p>
            </div>
            <a href="/portfolio.pdf" download className="mt-8 md:mt-0 group relative px-6 py-3 bg-transparent border border-[#FFD700] text-[#FFD700] rounded-full hover:bg-[#FFD700] hover:text-black transition-all duration-300 hover-trigger">
              <span>Download Portfolio</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </a>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Brand Identity Redesign',
                category: 'Branding & Identity',
                description: 'Complete brand transformation for a leading tech company.'
              },
              {
                title: 'E-commerce Platform',
                category: 'Web Development',
                description: 'Custom online store with seamless user experience.'
              },
              {
                title: 'Marketing Campaign',
                category: 'Digital Marketing',
                description: 'Integrated campaign that doubled client engagement.'
              }
            ].map((project, index) => (
              <div key={index} className="group relative aspect-[4/3] overflow-hidden bg-gray-900 rounded-lg cursor-pointer service-card hover-trigger">
                <div className="absolute inset-0 bg-gradient-to-br from-[#FFD700]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute inset-0 flex items-center justify-center p-8 text-white">
                  <div className="text-left transform translate-y-8 group-hover:translate-y-0 transition-transform">
                    <span className="text-[#FFD700] text-sm mb-2 block opacity-0 group-hover:opacity-100 transition-opacity delay-100">{project.category}</span>
                    <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
                    <p className="text-gray-300 mb-4 opacity-0 group-hover:opacity-100 transition-opacity delay-150">{project.description}</p>
                    <span className="inline-block px-4 py-2 border border-[#FFD700] text-[#FFD700] rounded-full text-sm opacity-0 group-hover:opacity-100 transition-opacity delay-200">
                      View Case Study →
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-32 bg-neutral-900 relative overflow-hidden" id="process">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Section Header */}
          <div className="text-center mb-20">
            <h2 className="font-syne text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-neutral-400 mb-6">
              Our Process
            </h2>
            <p className="font-space-grotesk text-xl text-neutral-400 max-w-2xl mx-auto">
              A refined approach to bringing your vision to life
            </p>
          </div>

          {/* Process Steps */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                step: '01',
                title: 'Discovery',
                description: 'Understanding your goals, audience, and unique challenges'
              },
              {
                step: '02',
                title: 'Strategy',
                description: 'Developing a tailored plan to achieve your objectives'
              },
              {
                step: '03',
                title: 'Creation',
                description: 'Bringing ideas to life with precision and creativity'
              },
              {
                step: '04',
                title: 'Refinement',
                description: 'Perfecting every detail for maximum impact'
              }
            ].map((phase) => (
              <div 
                key={phase.step}
                className="group relative p-8 process-step hover-trigger"
              >
                <div className="mb-4 font-syne text-gold-500 text-7xl font-bold opacity-20 group-hover:opacity-100 transition-opacity duration-300">
                  {phase.step}
                </div>
                <h3 className="font-syne text-2xl font-bold text-white mb-4">
                  {phase.title}
                </h3>
                <p className="font-space-grotesk text-neutral-400">
                  {phase.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Background accents */}
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-0 h-px w-full bg-gradient-to-r from-transparent via-gold-500/20 to-transparent" />
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 bg-[#0A0A0A] text-white" id="contact">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="font-syne text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-neutral-400 mb-8">
            Ready to elevate your brand?
          </h2>
          <p className="font-space-grotesk text-xl text-neutral-400 mb-12">
            Let's create something extraordinary together.
          </p>
          <button className="group relative px-8 py-3 bg-gold-500 text-black font-syne font-bold transform skew-x-12 hover:skew-x-0 transition-transform duration-300 hover-trigger">
            <span className="relative z-10">Get in Touch</span>
          </button>
        </div>
      </section>

      {/* Blog Preview Section */}
      <Suspense fallback={
        <section className="py-16 bg-black/50 backdrop-blur-sm">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center text-white">Latest Insights</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-zinc-900 rounded-lg p-6 animate-pulse">
                  <div className="h-48 bg-zinc-800 rounded-lg mb-4" />
                  <div className="h-6 bg-zinc-800 rounded w-3/4 mb-2" />
                  <div className="h-4 bg-zinc-800 rounded w-1/2" />
                </div>
              ))}
            </div>
          </div>
        </section>
      }>
        <DynamicBlogPreview />
      </Suspense>
    </main>
  );
}