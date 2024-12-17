'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const menuItems = [
  { num: '01', text: 'Home', href: '/' },
  { num: '02', text: 'About', href: '/about' },
  { num: '03', text: 'Packages', href: '/packages' },
  { num: '04', text: 'Portfolio', href: '/portfolio' },
  { num: '05', text: 'Blog', href: '/blog' },
  { num: '06', text: 'Careers', href: '/careers' },
  { num: '07', text: 'Contact', href: '/contact' },
];

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [_scrolled, setScrolled] = useState(false);
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

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <>
      <nav className={`fixed inset-0 bg-black/95 backdrop-blur-md transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out z-50`}>
        <div className="container mx-auto h-full flex">
          {/* Left side - Menu Items */}
          <div className="w-1/2 pl-12 py-24 flex flex-col justify-start">
            <ul className="space-y-6 text-left">
              {menuItems.map(({ num, text, href }) => (
                <li key={text} className="group">
                  <Link 
                    href={href}
                    onClick={closeMenu}
                    className="flex items-center space-x-4 group"
                  >
                    <span className="text-sm font-mono text-neutral-500">{num}</span>
                    <span className="text-2xl font-syne text-gold-500 hover:text-white transition-colors">{text}</span>
                  </Link>
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
      </nav>

      {/* Hamburger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-8 right-8 z-50 p-2 hover-trigger group flex items-center gap-2"
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
    </>
  );
};

export default Navigation;
