'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import PortfolioItem from '@/components/PortfolioItem';
import PortfolioModal from '@/components/PortfolioModal';

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

const packageDescriptions = [
  'Elegant packaging design for premium South African product',
  'Modern product packaging for Pretoria brand',
  'Creative package design for local consumer goods',
  'Professional retail packaging for SA company',
  'Innovative product packaging for Gauteng brand',
  'Premium packaging solution for South African market'
];

const logos = Array.from({ length: 38 }, (_, i) => ({
  src: `/images/logos/Logo${i + 1}.webp`,
  alt: `${seoDescriptions[i % seoDescriptions.length]} - WL Creations Portfolio`,
  category: 'Logo Design',
  description: `Professional ${seoDescriptions[i % seoDescriptions.length].toLowerCase()}. Crafted with precision and creativity by WL Creations.`
}));

const packages = Array.from({ length: 6 }, (_, i) => ({
  src: `/images/packages/Package${i + 1}.webp`,
  alt: `${packageDescriptions[i]} - WL Creations Portfolio`,
  category: 'Packaging Design',
  description: `${packageDescriptions[i]}. Designed to stand out on shelves and capture consumer attention.`,
  width: 354,
  height: 564
}));

// Combine all portfolio items
const portfolioItems = [...logos, ...packages];

const categories = [
  'All',
  'Logo Design',
  'Packaging Design'
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

  // Filter items based on selected category
  const filteredItems = selectedCategory === 'All'
    ? portfolioItems
    : portfolioItems.filter(item => item.category === selectedCategory);

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

      {/* Portfolio Filter */}
      <section className="py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-8 py-3 rounded-full text-lg transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-[#FFD700] text-black font-medium'
                    : 'bg-zinc-800 text-white hover:bg-zinc-700'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Portfolio Grid */}
          <div className={`grid gap-6 ${
            selectedCategory === 'Packaging Design'
              ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
              : 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4'
          }`}>
            {filteredItems.map((item, index) => (
              <div
                key={`${item.category}-${index}`}
                className={`relative group overflow-hidden rounded-lg ${
                  item.category === 'Packaging Design' ? 'aspect-[354/564]' : 'aspect-square'
                }`}
                onClick={() => openModal(item.src, item.alt, item.description)}
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  width={400}
                  height={300}
                  className={`w-full h-full ${
                    item.category === 'Packaging Design'
                      ? 'object-cover'
                      : 'object-contain bg-zinc-900 p-4'
                  } transition-transform duration-300 group-hover:scale-105`}
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <p className="text-white text-lg font-medium px-4 text-center">{item.alt}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Modal */}
      {modalImage.isOpen && (
        <PortfolioModal
          src={modalImage.src}
          alt={modalImage.alt}
          description={modalImage.description}
          isOpen={modalImage.isOpen}
          onClose={closeModal}
        />
      )}
    </div>
  );
}
