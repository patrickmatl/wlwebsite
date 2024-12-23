'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronDown } from 'react-icons/fi';

interface MenuItem {
  label: string;
  href?: string;
  submenu?: {
    title: string;
    items: {
      label: string;
      href: string;
      description?: string;
    }[];
  }[];
}

interface MegaMenuProps {
  items: MenuItem[];
}

const menuItems: MenuItem[] = [
  {
    label: 'Home',
    href: '/'
  },
  {
    label: 'Services',
    submenu: [
      {
        title: 'Our Services',
        items: [
          {
            label: 'Brand Identity Packages',
            href: '/brand-identity-packages',
            description: 'Complete branding solutions for your business'
          },
          {
            label: 'Graphic Design',
            href: '/graphic-design',
            description: 'Professional graphic design services'
          },
          {
            label: 'Website Design',
            href: '/services',
            description: 'Custom website design and development'
          }
        ]
      },
      {
        title: 'Pricing',
        items: [
          {
            label: 'Graphic Design Pricing',
            href: '/pricing/graphic-design',
            description: 'View our graphic design packages'
          },
          {
            label: 'Website Design Pricing',
            href: '/pricing/website-design',
            description: 'Website development pricing options'
          },
          {
            label: 'All Packages',
            href: '/packages',
            description: 'Browse all our service packages'
          }
        ]
      }
    ]
  },
  {
    label: 'Portfolio',
    href: '/portfolio'
  },
  {
    label: 'About',
    submenu: [
      {
        title: 'Company',
        items: [
          {
            label: 'About Us',
            href: '/about',
            description: 'Learn about our company and values'
          },
          {
            label: 'Locations',
            href: '/locations',
            description: 'Find our office locations'
          },
          {
            label: 'Careers',
            href: '/careers',
            description: 'Join our growing team'
          }
        ]
      },
      {
        title: 'Resources',
        items: [
          {
            label: 'Blog',
            href: '/blog',
            description: 'Industry insights and updates'
          },
          {
            label: 'Privacy Policy',
            href: '/privacy-policy',
            description: 'Our privacy commitments'
          },
          {
            label: 'Terms of Service',
            href: '/terms',
            description: 'Terms and conditions'
          }
        ]
      }
    ]
  },
  {
    label: 'Contact',
    href: '/contact'
  }
];

const MegaMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const handleMouseEnter = (label: string) => {
    setActiveMenu(label);
  };

  const handleMouseLeave = () => {
    setActiveMenu(null);
  };

  const navBackground = scrolled ? 'bg-black/95 backdrop-blur-sm' : 'bg-transparent';
  const navPadding = scrolled ? 'py-4' : 'py-6';

  return (
    <nav className={`fixed w-full z-[100] transition-all duration-300 ${navBackground} ${navPadding} text-white`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="text-[#FFD700] font-bold text-xl">
              WL CreationX
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="block md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 hover-trigger group flex items-center gap-2"
              aria-label={isOpen ? 'Close Menu' : 'Open Menu'}
            >
              <span className="text-sm text-neutral-400 font-space-grotesk tracking-wider transition-opacity duration-300">
                {isOpen ? 'Close' : 'Menu'}
              </span>
              <div className="flex flex-col items-center justify-center w-8 h-8">
                <span 
                  className={`w-8 h-0.5 bg-[#FFD700] transform transition-all duration-500 ease-out origin-center
                    ${isOpen 
                      ? 'rotate-45 translate-y-[9px]' 
                      : 'group-hover:w-6'
                    }`} 
                />
                <span 
                  className={`w-8 h-0.5 bg-[#FFD700] my-1.5 transform transition-all duration-300 ease-out
                    ${isOpen 
                      ? 'scale-x-0 opacity-0' 
                      : 'group-hover:w-4 delay-75'
                    }`} 
                />
                <span 
                  className={`w-8 h-0.5 bg-[#FFD700] transform transition-all duration-500 ease-out origin-center
                    ${isOpen 
                      ? '-rotate-45 -translate-y-[9px]' 
                      : 'group-hover:w-7'
                    }`} 
                />
              </div>
            </button>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex flex-1 justify-center">
            <div className="flex items-center space-x-8">
              {menuItems.map((item) => (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => handleMouseEnter(item.label)}
                  onMouseLeave={handleMouseLeave}
                >
                  {item.href ? (
                    <Link
                      href={item.href}
                      className="inline-flex items-center px-1 pt-1 text-sm font-medium text-white hover:text-[#FFD700] transition-colors duration-200"
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <button
                      className="inline-flex items-center px-1 pt-1 text-sm font-medium text-white hover:text-[#FFD700] transition-colors duration-200"
                    >
                      {item.label}
                      <FiChevronDown className="ml-1 h-4 w-4" />
                    </button>
                  )}

                  {/* Mega Menu Dropdown */}
                  <AnimatePresence>
                    {item.submenu && activeMenu === item.label && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute left-0 mt-5 w-screen max-w-screen-xl transform px-2 sm:px-0 lg:ml-0 lg:left-1/2 lg:-translate-x-1/2"
                      >
                        <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
                          <div className="relative grid grid-cols-2 gap-6 bg-black bg-opacity-95 px-5 py-6 sm:gap-8 sm:p-8">
                            {item.submenu.map((section) => (
                              <div key={section.title}>
                                <h3 className="text-[#FFD700] text-sm font-bold tracking-wide uppercase mb-3">
                                  {section.title}
                                </h3>
                                <ul className="space-y-4">
                                  {section.items.map((subItem) => (
                                    <li key={subItem.label}>
                                      <Link
                                        href={subItem.href}
                                        className="group flex"
                                      >
                                        <div>
                                          <p className="text-base font-medium text-white group-hover:text-[#FFD700] transition-colors duration-200">
                                            {subItem.label}
                                          </p>
                                          {subItem.description && (
                                            <p className="mt-1 text-sm text-gray-400">
                                              {subItem.description}
                                            </p>
                                          )}
                                        </div>
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                          </div>
                          <div className="bg-zinc-900 px-5 py-5 sm:px-8 sm:py-8">
                            <div>
                              <h3 className="text-sm tracking-wide font-medium text-[#FFD700] uppercase">
                                Latest Updates
                              </h3>
                              <ul className="mt-4 space-y-4">
                                <li className="text-base truncate">
                                  <Link
                                    href="/blog"
                                    className="text-gray-300 hover:text-[#FFD700] transition-colors duration-200"
                                  >
                                    Check out our latest blog posts
                                  </Link>
                                </li>
                              </ul>
                            </div>
                            <div className="mt-5 text-sm">
                              <Link
                                href="/blog"
                                className="text-[#FFD700] hover:text-[#FFA500] transition-colors duration-200"
                              >
                                View all posts <span aria-hidden="true">&rarr;</span>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Link
              href="/contact"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-black bg-[#FFD700] hover:bg-[#FFA500] transition-colors duration-200"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.nav
            initial={{ opacity: 0, x: '-100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '-100%' }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/95 backdrop-blur-md z-50 md:hidden"
          >
            <div className="container mx-auto h-full flex">
              {/* Left side - Menu Items */}
              <div className="w-1/2 pl-12 py-24 flex flex-col justify-start">
                <ul className="space-y-6 text-left">
                  {menuItems.map((item, index) => (
                    <li key={item.label} className="group">
                      {item.submenu ? (
                        <div>
                          <div className="flex items-center space-x-4 group mb-4">
                            <span className="text-sm font-mono text-neutral-500">{`0${index + 1}`}</span>
                            <span className="text-2xl font-syne text-gold-500">{item.label}</span>
                          </div>
                          <div className="ml-8 space-y-6">
                            {item.submenu.map((section) => (
                              <div key={section.title} className="mb-4">
                                <h3 className="text-[#FFD700] text-sm font-bold tracking-wide uppercase mb-3">
                                  {section.title}
                                </h3>
                                <ul className="space-y-3">
                                  {section.items.map((subItem) => (
                                    <li key={subItem.label}>
                                      <Link
                                        href={subItem.href}
                                        onClick={() => setIsOpen(false)}
                                        className="text-neutral-400 hover:text-white transition-colors block"
                                      >
                                        {subItem.label}
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <Link 
                          href={item.href || '#'}
                          onClick={() => setIsOpen(false)}
                          className="flex items-center space-x-4 group"
                        >
                          <span className="text-sm font-mono text-neutral-500">{`0${index + 1}`}</span>
                          <span className="text-2xl font-syne text-gold-500 hover:text-white transition-colors">{item.label}</span>
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Center - Divider */}
              <div className="w-px bg-neutral-800 my-24 mx-8" />

              {/* Right side - Contact Info */}
              <div className="w-1/2 py-24 pl-8">
                <div className="space-y-8 text-neutral-500">
                  <div>
                    <h3 className="text-sm font-mono mb-2">Phone:</h3>
                    <a href="tel:0623693769" className="hover:text-white transition-colors">062 369 3769</a>
                  </div>

                  <div>
                    <h3 className="text-sm font-mono mb-2">Address:</h3>
                    <p className="hover:text-white transition-colors">
                      210 Albertus St, La Montagne,<br />
                      Pretoria, 0183
                    </p>
                  </div>

                  <div>
                    <h3 className="text-sm font-mono mb-2">Email:</h3>
                    <a href="mailto:info@wlcreationx.co.za" className="hover:text-white transition-colors">
                      info@wlcreationx.co.za
                    </a>
                  </div>

                  <div>
                    <h3 className="text-sm font-mono mb-2">Job Seekers Email:</h3>
                    <a href="mailto:careers@wlcreationx.co.za" className="hover:text-white transition-colors">
                      careers@wlcreationx.co.za
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default MegaMenu;
