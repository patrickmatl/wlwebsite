'use client';

import { useState } from 'react';
import PortfolioItem from '@/components/PortfolioItem';
import PortfolioModal from '@/components/PortfolioModal';
import { motion } from 'framer-motion';

// Generate array of logo paths with SEO-optimized descriptions
const seoDescriptions = [
  'Modern minimalist logo design for Pretoria business branding',
  'Corporate identity logo design for South African company',
  'Creative brand mark design for Pretoria startup',
  'Professional business logo design for Gauteng enterprise',
  'Custom typography logo for South African brand',
  'Elegant logo design for Pretoria luxury brand',
  'Contemporary logo design for tech company in Pretoria',
  'Unique brand identity design for local business',
  'Premium logo design for South African corporate',
  'Innovative logo concept for Pretoria digital agency',
  'Strategic brand identity for Gauteng company',
  'Artistic logo design for creative business in Pretoria',
  'Professional corporate branding for SA enterprise',
  'Modern icon design for tech startup in Pretoria',
  'Distinctive logo mark for South African brand',
  'Clean and professional logo for Pretoria business',
  'Dynamic brand identity for growing company',
  'Sophisticated logo design for premium brand',
  'Contemporary business branding for local company',
  'Creative logo solution for Pretoria enterprise',
  'Professional brand mark for South African startup',
  'Minimalist logo design for modern business',
  'Strategic visual identity for Pretoria company',
  'Unique corporate logo for SA business',
  'Premium brand design for local enterprise',
  'Innovative logo mark for tech company',
  'Professional business branding for Pretoria',
  'Creative corporate identity design',
  'Modern brand solution for SA company',
  'Distinctive logo for local business',
  'Strategic brand mark for Pretoria enterprise',
  'Professional logo design for growing company',
  'Creative visual identity for South African brand',
  'Contemporary logo for tech startup',
  'Premium business branding solution',
  'Innovative corporate identity design',
  'Professional logo mark for local company',
  'Strategic brand identity for Pretoria business'
];

const logos = Array.from({ length: 38 }, (_, i) => ({
  src: `/images/logos/Logo${i + 1}.webp`,
  alt: `${seoDescriptions[i % seoDescriptions.length]} - WL Creations Portfolio`,
  category: 'Logo Design',
  description: `Professional ${seoDescriptions[i % seoDescriptions.length].toLowerCase()}. Crafted with precision and creativity by WL Creations.`
}));

const categories = [
  'All',
  'Logo Design',
  'Website Design',
  'Packaging Design',
  'Brand Identity',
  'Print Design',
  'Social Media'
];

export default function Portfolio() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [modalImage, setModalImage] = useState({ isOpen: false, src: '', alt: '', description: '' });

  const openModal = (src: string, alt: string, description: string) => {
    setModalImage({ isOpen: true, src, alt, description });
  };

  const closeModal = () => {
    setModalImage({ isOpen: false, src: '', alt: '', description: '' });
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section with SEO-optimized content */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-gradient-to-b from-[#FFD700]/10 to-transparent opacity-20" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 max-w-7xl mx-auto text-center"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-[#FFD700] to-[#FFA500]">
            Pretoria's Premier Graphic Design Portfolio
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Discover our creative graphic design solutions crafted in Pretoria. From logo design to complete brand identity systems, we help businesses stand out in the South African market.
          </p>
        </motion.div>
      </section>

      {/* SEO-enhanced Category Filter */}
      <section className="py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-8">
            Professional Graphic Design Services in Pretoria
          </h2>
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-[#FFD700] text-black'
                    : 'bg-zinc-900 text-white hover:bg-[#FFD700]/20'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Grid with Rich Snippets */}
      <section className="px-4 pb-24">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {logos
              .filter(item => selectedCategory === 'All' || item.category === selectedCategory)
              .map((item, index) => (
                <PortfolioItem
                  key={index}
                  src={item.src}
                  alt={item.alt}
                  category={item.category}
                  onClick={() => openModal(item.src, item.alt, item.description)}
                />
              ))}
          </div>
        </div>
      </section>

      {/* Enhanced Modal with SEO Content */}
      <PortfolioModal
        isOpen={modalImage.isOpen}
        onClose={closeModal}
        src={modalImage.src}
        alt={modalImage.alt}
        description={modalImage.description}
      />

      {/* SEO Footer Section */}
      <section className="py-16 px-4 bg-zinc-900">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-6">
            Leading Graphic Design Company in Pretoria
          </h2>
          <p className="text-gray-300 max-w-3xl mx-auto mb-8">
            We specialize in creating impactful visual solutions for businesses across Pretoria and South Africa. 
            Our expertise spans logo design, brand identity, packaging design, and digital media.
          </p>
          <motion.a
            href="/contact"
            className="inline-block px-8 py-3 bg-[#FFD700] text-black rounded-full font-semibold hover:bg-[#FFA500] transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Start Your Design Project Today
          </motion.a>
        </div>
      </section>
    </div>
  );
}
