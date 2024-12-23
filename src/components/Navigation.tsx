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
      {/* Hamburger Menu */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-8 right-8 z-50 w-12 h-12 flex flex-col justify-center items-center gap-2 bg-black/50 backdrop-blur-sm rounded-full hover:scale-110 transition-transform duration-300"
        aria-label="Toggle Menu"
      >
        <span className={`w-6 h-0.5 bg-[#FFD700] transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-[5px]' : ''}`} />
        <span className={`w-6 h-0.5 bg-[#FFD700] transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`} />
        <span className={`w-6 h-0.5 bg-[#FFD700] transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-[5px]' : ''}`} />
      </button>

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
              {/* Logo */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="mb-12"
              >
                <Link href="/" onClick={() => setIsOpen(false)}>
                  <span className="text-2xl font-syne font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#FFD700] via-[#FFC000] to-[#FFB000]">
                    WL Creationx
                  </span>
                </Link>
              </motion.div>

              {/* Menu Items */}
              <div className="flex flex-col items-center gap-6 w-full max-w-md px-4">
                {menuItems.map((item, index) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                    className="w-full"
                  >
                    {item.subItems ? (
                      <div className="w-full">
                        <button
                          onClick={() => handleSubmenuClick(item.label)}
                          className="w-full flex items-center justify-between text-3xl font-syne text-white hover:text-[#FFD700] transition-colors duration-300 mb-2"
                        >
                          <span>{item.label}</span>
                          <FaChevronDown
                            className={`transform transition-transform duration-300 ${
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
                              transition={{ duration: 0.3 }}
                              className="overflow-hidden"
                            >
                              <div className="bg-zinc-900/50 rounded-lg p-4 space-y-4">
                                {item.subItems.map((category) => (
                                  <div key={category.label} className="space-y-2">
                                    <button
                                      onClick={() => handleCategoryClick(category.label)}
                                      className="w-full flex items-center justify-between text-xl font-syne text-[#FFD700] transition-colors duration-300"
                                    >
                                      <span>{category.label}</span>
                                      <FaChevronDown
                                        className={`transform transition-transform duration-300 ${
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
                                          transition={{ duration: 0.3 }}
                                          className="space-y-2 pl-4"
                                        >
                                          {category.items.map((subItem) => (
                                            <Link
                                              key={subItem.href}
                                              href={subItem.href}
                                              className="block text-lg font-syne text-white/60 hover:text-[#FFD700] transition-colors duration-300 pl-4 border-l-2 border-[#FFD700]/20 hover:border-[#FFD700]"
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
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      <Link
                        href={item.href}
                        className="block text-3xl font-syne text-white hover:text-[#FFD700] transition-colors duration-300"
                        onClick={() => setIsOpen(false)}
                      >
                        {item.label}
                      </Link>
                    )}
                  </motion.div>
                ))}
              </div>

              {/* Contact Info */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="mt-12 text-center"
              >
                <p className="text-[#FFD700]/80 text-sm">
                  Pretoria, South Africa
                </p>
                <a
                  href="mailto:info@wlcreationx.co.za"
                  className="text-white/60 hover:text-[#FFD700] transition-colors duration-300"
                >
                  info@wlcreationx.co.za
                </a>
              </motion.div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;
