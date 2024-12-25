'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronDown } from 'react-icons/fa';

const menuItems = [
  { href: '/', label: 'Home' },
  { 
    href: '/pricing', 
    label: 'Services & Pricing',
    subItems: [
      {
        label: 'Web Services',
        items: [
          { href: '/pricing/website-design', label: 'Website Design' },
          { href: '/pricing/ecommerce', label: 'E-commerce' },
          { href: '/pricing/custom-development', label: 'Custom Development' },
          { href: '/pricing/website-maintenance', label: 'Website Maintenance' },
          { href: '/pricing/mobile-solutions', label: 'Mobile Solutions' }
        ]
      },
      {
        label: 'Design Services',
        items: [
          { href: '/pricing/graphic-design', label: 'Graphic Design' },
          { href: '/pricing/brand-identity', label: 'Brand Identity' },
          { href: '/pricing/print-design', label: 'Print Design' },
          { href: '/pricing/packaging-design', label: 'Packaging Design' },
          { href: '/pricing/marketing-materials', label: 'Marketing Materials' }
        ]
      },
      {
        label: 'Marketing Services',
        items: [
          { href: '/pricing/seo', label: 'SEO Services' },
          { href: '/pricing/google-ads', label: 'Google Ads' },
          { href: '/pricing/social-media', label: 'Social Media Marketing' },
          { href: '/pricing/content-marketing', label: 'Content Marketing' },
          { href: '/pricing/email-marketing', label: 'Email Marketing' }
        ]
      }
    ]
  },
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/blog', label: 'Blog' },
  { href: '/about', label: 'About' },
  { href: '/careers', label: 'Careers' },
  { href: '/contact', label: 'Contact' }
];

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const [openCategory, setOpenCategory] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const handleSubmenuClick = (label: string) => {
    setOpenSubmenu(openSubmenu === label ? null : label);
    setOpenCategory(null);
  };

  const handleCategoryClick = (label: string) => {
    setOpenCategory(openCategory === label ? null : label);
  };

  return (
    <>
      {/* Menu Button */}
      <div className="fixed top-8 right-8 z-50 flex items-center gap-3">
        <span className="text-gold-light/80 text-sm uppercase tracking-wider">
          {isOpen ? 'Close' : 'Menu'}
        </span>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-12 h-12 flex flex-col justify-center items-center gap-2 bg-black/50 backdrop-blur-sm rounded-full hover:scale-110 transition-transform duration-300"
          aria-label={isOpen ? 'Close Menu' : 'Open Menu'}
        >
          <span className={`w-6 h-0.5 bg-[#FFD700] transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-[5px]' : ''}`} />
          <span className={`w-6 h-0.5 bg-[#FFD700] transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`} />
          <span className={`w-6 h-0.5 bg-[#FFD700] transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-[5px]' : ''}`} />
        </button>
      </div>

      {/* Navigation Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.nav
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed inset-0 z-40 bg-black/95 backdrop-blur-lg overflow-y-auto"
          >
            <div className="flex flex-col items-center justify-center min-h-full py-20">
              {/* Menu Items */}
              <div className="space-y-6 text-center">
                {menuItems.map((item) => (
                  <div key={item.label}>
                    {item.subItems ? (
                      <div className="relative">
                        <button
                          onClick={() => handleSubmenuClick(item.label)}
                          className="text-2xl md:text-3xl text-white hover:text-gold-light transition-colors flex items-center gap-2 mx-auto"
                        >
                          {item.label}
                          <FaChevronDown
                            className={`transition-transform duration-300 ${
                              openSubmenu === item.label ? 'rotate-180' : ''
                            }`}
                          />
                        </button>
                        <AnimatePresence>
                          {openSubmenu === item.label && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.2 }}
                              className="mt-4 space-y-6"
                            >
                              {item.subItems.map((category) => (
                                <div key={category.label} className="space-y-2">
                                  <button
                                    onClick={() => handleCategoryClick(category.label)}
                                    className="text-xl text-gold-light/80 hover:text-gold-light transition-colors flex items-center gap-2 mx-auto"
                                  >
                                    {category.label}
                                    <FaChevronDown
                                      className={`transition-transform duration-300 ${
                                        openCategory === category.label ? 'rotate-180' : ''
                                      }`}
                                    />
                                  </button>
                                  <AnimatePresence>
                                    {openCategory === category.label && (
                                      <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        transition={{ duration: 0.2 }}
                                        className="space-y-2 pt-2"
                                      >
                                        {category.items.map((subItem) => (
                                          <Link
                                            key={subItem.label}
                                            href={subItem.href}
                                            className="block text-lg text-white/70 hover:text-gold-light transition-colors"
                                            onClick={() => setIsOpen(false)}
                                          >
                                            {subItem.label}
                                          </Link>
                                        ))}
                                      </motion.div>
                                    )}
                                  </AnimatePresence>
                                </div>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      <Link
                        href={item.href}
                        className="text-2xl md:text-3xl text-white hover:text-gold-light transition-colors block"
                        onClick={() => setIsOpen(false)}
                      >
                        {item.label}
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;
