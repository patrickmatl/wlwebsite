import Link from 'next/link';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaBehance } from 'react-icons/fa';
import CopyrightYear from './CopyrightYear';

const Footer = () => {
  const footerLinks = {
    services: [
      { name: 'Logo Design', href: '/services/logo-design' },
      { name: 'Web Design', href: '/services/web-design' },
      { name: 'Branding', href: '/services/branding' },
      { name: 'UI/UX Design', href: '/services/ui-ux-design' },
      { name: 'Print Design', href: '/services/print-design' },
      { name: 'Brand Identity Packages', href: '/brand-identity-packages' },
    ],
    company: [
      { name: 'About Us', href: '/about' },
      { name: 'Our Work', href: '/portfolio' },
      { name: 'Contact', href: '/contact' },
      { name: 'Blog', href: '/blog' },
      { name: 'Careers', href: '/careers' },
    ],
    legal: [
      { name: 'Privacy Policy', href: '/privacy-policy' },
      { name: 'Terms of Service', href: '/terms' },
      { name: 'Cookie Policy', href: '/cookie-policy' },
      { name: 'Sitemap', href: '/sitemap' },
    ],
  };

  const socialLinks = [
    { icon: FaFacebookF, href: 'https://facebook.com/wlcreationx', label: 'Facebook' },
    { icon: FaTwitter, href: 'https://twitter.com/wlcreationx', label: 'Twitter' },
    { icon: FaInstagram, href: 'https://instagram.com/wlcreationx', label: 'Instagram' },
    { icon: FaLinkedinIn, href: 'https://linkedin.com/company/wlcreationx', label: 'LinkedIn' },
    { icon: FaBehance, href: 'https://behance.net/wlcreationx', label: 'Behance' },
  ];

  return (
    <footer className="bg-black text-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px]"
          style={{
            background: 'radial-gradient(circle at center, rgba(255,215,0,0.15), transparent 70%)',
          }}
        />
        <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px]"
          style={{
            background: 'radial-gradient(circle at center, rgba(255,215,0,0.1), transparent 70%)',
          }}
        />
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Section */}
        <div className="pt-20 pb-12 border-b border-gold-500/20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Brand Column */}
            <div className="space-y-8">
              <div className="space-y-4">
                <h2 className="font-syne text-3xl font-bold text-gold-500">WL CreationX</h2>
                <p className="text-neutral-400 text-sm leading-relaxed">
                  Creating exceptional digital experiences and innovative design solutions for businesses in Pretoria and beyond.
                </p>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-neutral-400">210 Albertus St</p>
                <p className="text-sm text-neutral-400">La Montagne, Pretoria, 0183</p>
                <p className="text-sm text-gold-500 hover:text-gold-400 transition-colors">
                  <a href="tel:+27623693769">+27 62 369 3769</a>
                </p>
                <p className="text-sm text-gold-500 hover:text-gold-400 transition-colors">
                  <a href="mailto:info@wlcreationx.co.za">info@wlcreationx.co.za</a>
                </p>
              </div>
            </div>

            {/* Services Links */}
            <div>
              <h3 className="font-syne text-lg font-bold mb-6">Services</h3>
              <ul className="space-y-4">
                <li>
                  <Link 
                    href="/services"
                    className="text-neutral-400 hover:text-gold-500 transition-colors duration-300"
                  >
                    Our Services
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/pricing"
                    className="text-neutral-400 hover:text-gold-500 transition-colors duration-300"
                  >
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/portfolio"
                    className="text-neutral-400 hover:text-gold-500 transition-colors duration-300"
                  >
                    Portfolio
                  </Link>
                </li>
              </ul>
            </div>

            {/* Company Links */}
            <div>
              <h3 className="font-syne text-lg font-bold mb-6">Company</h3>
              <ul className="space-y-4">
                {footerLinks.company.map((link) => (
                  <li key={link.name}>
                    <Link 
                      href={link.href}
                      className="text-neutral-400 hover:text-gold-500 transition-colors duration-300"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal Links */}
            <div>
              <h3 className="font-syne text-lg font-bold mb-6">Legal</h3>
              <ul className="space-y-4">
                {footerLinks.legal.map((link) => (
                  <li key={link.name}>
                    <Link 
                      href={link.href}
                      className="text-neutral-400 hover:text-gold-500 transition-colors duration-300"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="py-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Copyright */}
            <div className="text-sm text-neutral-400">
              &copy; <CopyrightYear /> WL CreationX. All rights reserved.
            </div>

            {/* Social Links */}
            <div className="flex space-x-6">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-400 hover:text-gold-500 transition-colors duration-300"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
