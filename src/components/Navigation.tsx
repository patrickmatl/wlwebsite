'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronDown } from 'react-icons/fa';
import { usePathname } from 'next/navigation';

const menuItems = [
  { href: '/', label: 'Home' },
  { 
    href: '/pricing', 
    label: 'Services & Pricing',
    subItems: [
      {
        label: 'Web Services',
        items: [
          { href: '/pricing/website-design-pretoria', label: 'Website Design' },
          { href: '/pricing/ecommerce-pretoria', label: 'E-commerce' },
          { href: '/pricing/custom-development-pretoria', label: 'Custom Development' },
          { href: '/pricing/website-maintenance-pretoria', label: 'Website Maintenance' },
          { href: '/pricing/mobile-solutions-pretoria', label: 'Mobile Solutions' }
        ]
      },
      {
        label: 'Design Services',
        items: [
          { href: '/pricing/graphic-design-pretoria', label: 'Graphic Design' },
          { href: '/branding-solutions-pretoria', label: 'Brand Identity' },
          { href: '/pricing/print-design-pretoria', label: 'Print Design' },
          { href: '/pricing/packaging-design-pretoria', label: 'Packaging Design' },
          { href: '/pricing/marketing-materials-pretoria', label: 'Marketing Materials' },
          { href: '/pricing/annual-report-design-and-print-pretoria', label: 'Annual Report Design & Print' },
          { href: '/pricing/transcription-services-pretoria-johannesburg', label: 'Transcription Services' },
          { href: '/pricing/copywriting-services-pretoria-johannesburg', label: 'Copywriting Services' },
          { href: '/pricing/copy-editing-services-pretoria-johannesburg', label: 'Copy Editing Services' }
        ]
      },
      {
        label: 'Marketing Services',
        items: [
          { href: '/pricing/seo-pretoria', label: 'SEO Services' },
          { href: '/pricing/google-ads-pretoria', label: 'Google Ads' },
          { href: '/pricing/social-media-pretoria', label: 'Social Media Marketing' },
          { href: '/pricing/content-marketing-pretoria', label: 'Content Marketing' },
          { href: '/pricing/email-marketing-pretoria', label: 'Email Marketing' }
        ]
      },
      {
        label: 'Video & Image Services',
        items: [
          { href: '/videography-services-pretoria', label: 'Videography Pretoria' },
          { href: '/photography-services-pretoria', label: 'Photography Pretoria' },
          { href: '/pricing/corporate-video-pretoria', label: 'Corporate Video' },
          { href: '/pricing/drone-video-pretoria', label: 'Drone Video' },
          { href: '/pricing/photography-pretoria', label: 'Photography Pricing' },
          { href: '/pricing/product-photography-pretoria', label: 'Product Photography' }
        ]
      }
    ]
  },
  { href: '/project-showcase-pretoria', label: 'Portfolio' },
  { href: '/creative-industry-blog-pretoria', label: 'Blog' },
  { href: '/about-graphic-design-company-pretoria', label: 'About' },
  { href: '/join-our-team-pretoria', label: 'Careers' },
  { href: '/get-in-touch-pretoria', label: 'Contact' },
];

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  /**
   * Hover menus need a grace period, not a bare onMouseLeave.
   *
   * The button and the drawer are separate elements, so a pointer travelling
   * from one to the other leaves the first before it enters the second. Closing
   * on that gap makes the menu impossible to reach; closing only when the
   * drawer is left means a pointer that opened the menu and then went straight
   * back to the page leaves it stuck open, which is what testing showed.
   *
   * So both elements start a short timer on leave and cancel it on enter.
   * Crossing the gap cancels the timer before it fires; genuinely walking away
   * lets it run.
   */
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const cancelClose = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };

  const openNow = () => {
    cancelClose();
    setIsOpen(true);
  };

  const closeSoon = () => {
    cancelClose();
    closeTimer.current = setTimeout(() => {
      setIsOpen(false);
      setOpenSubmenu(null);
      setOpenCategory(null);
    }, 220);
  };

  useEffect(() => cancelClose, []);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const [openCategory, setOpenCategory] = useState<string | null>(null);
  const pathname = usePathname();

  // Fix hydration issue
  useEffect(() => {
    
    // Close menu when route changes
    setIsOpen(false);
    setOpenSubmenu(null);
    setOpenCategory(null);
  }, [pathname]);

  const handleSubmenuClick = (label: string) => {
    setOpenSubmenu(openSubmenu === label ? null : label);
    setOpenCategory(null);
  };

  const handleCategoryClick = (label: string) => {
    setOpenCategory(openCategory === label ? null : label);
  };

  return (
    <>
      {/*
        Primary navigation, rendered in the HTML on every page.

        The overlay menu below is mounted only while `isOpen` is true, so until
        a visitor clicks, none of its links exist in the document at all. A
        crawler never clicks. The result was a site whose entire internal link
        graph was the footer: an audit on 2026-08-28 found the digital marketing
        page linked from 0 of 65 pages, visual communication from 1, and service
        bundles from 2 — every one of them declared important in the sitemap.

        These links are genuinely visible on desktop rather than hidden and
        exposed only to crawlers. That distinction is not pedantry on this
        domain: it took a Google penalty for hidden text, and off-screen links
        that only a robot can see are the same trick wearing a different hat.
        Below the lg breakpoint they are hidden by CSS and the hamburger takes
        over, which is an ordinary responsive pattern rather than cloaking —
        the small screen genuinely cannot show them.
      */}
      <nav
        aria-label="Primary"
        className="hidden lg:flex fixed top-8 left-1/2 -translate-x-1/2 z-40 items-center gap-6 rounded-full border border-[#FFD700]/20 bg-black/70 px-7 py-3 backdrop-blur-md"
      >
        {[
          ['/pricing/graphic-design-pretoria', 'Graphic Design'],
          ['/branding-solutions-pretoria', 'Branding'],
          ['/pricing/website-design-pretoria', 'Web Design'],
          ['/digital-marketing-services-pretoria', 'Digital Marketing'],
          ['/photography-services-pretoria', 'Photography'],
          ['/videography-services-pretoria', 'Videography'],
          ['/project-showcase-pretoria', 'Portfolio'],
          ['/pricing', 'Pricing'],
          ['/get-in-touch-pretoria', 'Contact'],
        ].map(([href, label]) => (
          <Link
            key={href}
            href={href}
            className="whitespace-nowrap text-sm text-neutral-300 transition-colors hover:text-[#FFD700]"
          >
            {label}
          </Link>
        ))}
      </nav>

      {/*
        Hover opens the drawer on pointer devices; click still works everywhere.

        Worth being clear about what this does and does not buy: it is a
        convenience for visitors and nothing more. A crawler never hovers, so
        opening on hover contributes exactly nothing to discovery — what fixed
        that was rendering the nav on the server at all (see ClientRootWrapper)
        and the visible desktop bar above, both of which put real links in the
        HTML.

        onMouseLeave closes it, so the drawer behaves like a menu rather than a
        trap. Touch devices report no hover, the handlers never fire, and the
        button keeps its original click behaviour.
      */}
      <div
        className="fixed top-8 right-8 z-50 flex items-center gap-3"
        onMouseEnter={openNow}
        onMouseLeave={closeSoon}
      >
        <span className="text-[#FFD700]/80 text-sm uppercase tracking-wider font-medium">
          {isOpen ? 'Close' : 'Menu'}
        </span>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-12 h-12 flex flex-col justify-center items-center gap-2 bg-black/50 backdrop-blur-sm rounded-full hover:scale-110 transition-all duration-300 hover:bg-[#FFD700]/10"
          aria-label={isOpen ? 'Close Menu' : 'Open Menu'}
        >
          <span className={`w-6 h-0.5 bg-[#FFD700] transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-[5px]' : ''}`} />
          <span className={`w-6 h-0.5 bg-[#FFD700] transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`} />
          <span className={`w-6 h-0.5 bg-[#FFD700] transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-[5px]' : ''}`} />
        </button>
      </div>

      {/* Navigation Menu */}
      <AnimatePresence mode="wait">
        {isOpen && (
          <motion.nav
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            onMouseEnter={cancelClose}
            onMouseLeave={closeSoon}
            aria-label="Full menu"
            // A side drawer rather than the full-screen takeover it used to be.
            // Opening on hover only works if leaving the panel closes it again,
            // and a panel covering the entire viewport would mean the pointer
            // has nowhere to leave to. Full width below sm, where it is opened
            // by tapping and closed by the button.
            className="fixed top-0 right-0 z-40 h-full w-full sm:w-[26rem] border-l border-[#FFD700]/20 bg-black/95 backdrop-blur-lg overflow-y-auto"
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
                          className={`text-2xl md:text-3xl transition-all duration-300 flex items-center gap-2 mx-auto group
                            ${openSubmenu === item.label ? 'text-[#FFD700]' : 'text-white hover:text-[#FFD700]'}`}
                        >
                          {item.label}
                          <FaChevronDown
                            className={`transition-transform duration-300 group-hover:text-[#FFD700] ${
                              openSubmenu === item.label ? 'rotate-180 text-[#FFD700]' : ''
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
                                    className={`text-xl transition-all duration-300 flex items-center gap-2 mx-auto group
                                      ${openCategory === category.label ? 'text-[#FFD700]' : 'text-[#FFD700]/60 hover:text-[#FFD700]'}`}
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
                                            className={`block text-lg transition-all duration-300
                                              ${pathname === subItem.href ? 'text-[#FFD700]' : 'text-white/60 hover:text-white'}`}
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
                        className={`text-2xl md:text-3xl transition-all duration-300 block
                          ${pathname === item.href ? 'text-[#FFD700]' : 'text-white hover:text-[#FFD700]'}`}
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
