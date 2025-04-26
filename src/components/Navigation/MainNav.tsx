'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FaBars, FaTimes } from 'react-icons/fa';

const MainNav = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about-graphic-design-company-pretoria' },
    {
      label: 'Services',
      href: '/pricing',
      subItems: [
        { label: 'Annual Report Design & Print', href: '/pricing/annual-report-design-and-print-pretoria' },
        { label: 'Presentation Design', href: '/pricing/presentation-design-services-pretoria' },
        { label: 'Investor Relations Material Design', href: '/pricing/investor-relations-material-design-services-pretoria' },
        { label: 'Sustainability & ESG Report Design', href: '/pricing/sustainability-esg-report-design-services-pretoria' },
        { label: 'Infographic & Data Visualization Design', href: '/pricing/infographic-data-visualization-design-pretoria' },
        { label: 'Interactive Digital Publication & PDF', href: '/pricing/interactive-digital-publication-interactive-pdf-design-pretoria' },
        { label: 'Internal Communications Design', href: '/pricing/internal-communications-design-pretoria' },
        { label: 'Event Branding Design', href: '/pricing/event-branding-design-pretoria' },
        { label: 'SEO Services', href: '/pricing/seo' },
        { label: 'Content Marketing', href: '/pricing/content-marketing' },
        { label: 'Email Marketing', href: '/pricing/email-marketing' },
        { label: 'Marketing Materials', href: '/pricing/marketing-materials-pretoria' },
        { label: 'Transcription', href: '/pricing/transcription-services-pretoria-johannesburg' },
        { label: 'Copywriting', href: '/pricing/copywriting-services-pretoria-johannesburg' },
        { label: 'Copy Editing', href: '/pricing/copy-editing-services-pretoria-johannesburg' },
        { label: 'Corporate Video', href: '/pricing/corporate-video-pretoria' },
        { label: 'Drone Video', href: '/pricing/drone-video-pretoria' },
        { label: 'Photography', href: '/pricing/photography-pretoria' },
        { label: 'Product Photography', href: '/pricing/product-photography-pretoria' },
      ]
    },
    { label: 'Contact', href: '/get-in-touch-pretoria' },
    { label: 'Portfolio', href: '/project-showcase-pretoria' },
    { label: 'Blog', href: '/creative-industry-blog-pretoria' },
    { label: 'Careers', href: '/join-our-team-pretoria' },
  ];

  return (
    <nav className="relative z-50">
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-4 right-4 z-50 p-2 rounded-lg bg-zinc-900/90 text-white hover:bg-zinc-800 transition-colors"
      >
        {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </button>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 bg-black/95 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        } md:hidden`}
      >
        <div className="flex flex-col items-center justify-center h-full">
          {navItems.map((item) => (
            <div key={item.label} className="relative group py-4">
              <Link
                href={item.href}
                className="text-2xl text-white hover:text-[#FFD700] transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
              {item.subItems && (
                <div className="mt-2 space-y-2">
                  {item.subItems.map((subItem) => (
                    <Link
                      key={subItem.label}
                      href={subItem.href}
                      className="block text-lg text-white/80 hover:text-[#FFD700] transition-colors pl-4"
                      onClick={() => setIsOpen(false)}
                    >
                      {subItem.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center justify-end space-x-8 p-4">
        {navItems.map((item) => (
          <div key={item.label} className="relative group">
            <Link
              href={item.href}
              className="text-white hover:text-[#FFD700] transition-colors"
            >
              {item.label}
            </Link>
            {item.subItems && (
              <div className="absolute left-0 mt-2 w-48 bg-zinc-900/95 rounded-lg shadow-xl py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                {item.subItems.map((subItem) => (
                  <Link
                    key={subItem.label}
                    href={subItem.href}
                    className="block px-4 py-2 text-white hover:text-[#FFD700] hover:bg-zinc-800/50 transition-colors"
                  >
                    {subItem.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </nav>
  );
};

export default MainNav;
