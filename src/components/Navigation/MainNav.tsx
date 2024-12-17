'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX } from 'react-icons/fi';

const menuItems = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Services', path: '/services' },
  { name: 'Packages', path: '/packages' },
  { name: 'Portfolio', path: '/portfolio' },
  { name: 'Blog', path: '/blog' },
  { name: 'Contact', path: '/contact' },
  { name: 'Careers', path: '/careers' },
];

const MainNav = () => {
  const [isOpen, setIsOpen] = useState(false);
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

  const navBackground = scrolled ? 'bg-black/95 backdrop-blur-sm' : 'bg-transparent';
  const navPadding = scrolled ? 'py-4' : 'py-6';

  return (
    <>
      <nav className={`fixed w-full z-50 transition-all duration-300 ${navBackground} ${navPadding}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link href="/" className="text-gold-500 font-syne text-2xl font-bold">
              WL CreationX
            </Link>

            {/* Hamburger Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="fixed top-8 right-8 z-50 p-2 hover-trigger group"
              aria-label={isOpen ? 'Close Menu' : 'Open Menu'}
            >
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
        </div>
      </nav>

      {/* Full Screen Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black"
          >
            <div className="min-h-screen flex items-center justify-center">
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 20, opacity: 0 }}
                className="text-center space-y-8"
              >
                {menuItems.map((item) => (
                  <div key={item.path}>
                    <Link
                      href={item.path}
                      className={`font-syne text-4xl md:text-5xl hover:text-[#FFD700] transition-all duration-300 relative group inline-block hover-trigger ${
                        pathname === item.path
                          ? 'text-[#FFD700]'
                          : 'text-white'
                      }`}
                    >
                      <span className="block transition-transform duration-300 group-hover:-translate-y-2">
                        {item.name}
                      </span>
                      <span className="block h-0.5 w-0 bg-[#FFD700] transition-all duration-300 group-hover:w-full" />
                    </Link>
                  </div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default MainNav;
