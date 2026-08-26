'use client';

import Link from 'next/link';
import { BUSINESS, FULL_ADDRESS } from '@/data/business';

/**
 * This footer used to `return null` on the homepage, while layout.tsx rendered a
 * second copy inside a `hidden` wrapper. The net effect was that the homepage's
 * internal links existed in the HTML for crawlers but were invisible to users.
 * The footer is now rendered once, visibly, on every page.
 */
export default function Footer() {
  return (
    <footer className="bg-black w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-white font-syne font-bold text-lg mb-4">WL CreationX</h3>
            <p className="text-neutral-400 text-sm">
              Transforming brands through creative excellence in Pretoria, South Africa.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-syne font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about-graphic-design-company-pretoria" className="text-neutral-400 hover:text-white transition-colors text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-neutral-400 hover:text-white transition-colors text-sm">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/project-showcase-pretoria" className="text-neutral-400 hover:text-white transition-colors text-sm">
                  Portfolio
                </Link>
              </li>
              <li>
                <Link href="/get-in-touch-pretoria" className="text-neutral-400 hover:text-white transition-colors text-sm">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/*
            Services, in the footer specifically.

            The main navigation is a hamburger overlay: its links exist only
            once a visitor opens it, so they are not in the HTML a crawler
            reads. The footer is, on every page — which makes this the site's
            real internal link graph, and it was four links wide.

            The three city pages below had ZERO inbound links from anywhere on
            the site. A page nothing links to is a page Google is entitled to
            treat as unimportant, which is a poor argument to make about the
            pages meant to win "web design pretoria".

            Anchors name the service and the city on purpose: anchor text is
            the strongest on-page signal about the page at the other end.
          */}
          <div>
            <h3 className="text-white font-syne font-bold text-lg mb-4">Services in Pretoria</h3>
            <ul className="space-y-2">
              {[
                ['/pricing/website-design-pretoria', 'Website design in Pretoria'],
                ['/pricing/graphic-design-pretoria', 'Graphic design in Pretoria'],
                ['/pricing/packaging-design-pretoria', 'Packaging design in Pretoria'],
                ['/branding-solutions-pretoria', 'Brand identity design'],
                ['/pricing/annual-report-design-and-print-pretoria', 'Annual report design'],
                ['/pricing/seo-pretoria', 'SEO services in Pretoria'],
                ['/pretoria/web-design', 'Web design, Pretoria'],
                ['/centurion/web-design', 'Web design, Centurion'],
                ['/menlyn/graphic-design', 'Graphic design, Menlyn'],
              ].map(([href, label]) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-neutral-400 hover:text-white transition-colors text-sm"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-syne font-bold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="text-neutral-400 text-sm">Email: <a href={`mailto:${BUSINESS.email}`} className="hover:text-white">{BUSINESS.email}</a></li>
              <li className="text-neutral-400 text-sm">Phone: <a href={`tel:${BUSINESS.phoneE164}`} className="hover:text-white">{BUSINESS.phoneDisplay}</a></li>
              <li className="text-neutral-400 text-sm">{FULL_ADDRESS}, South Africa</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-neutral-800">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <p className="text-neutral-400 text-sm">
              &copy; {new Date().getFullYear()} WL CreationX. All rights reserved.
            </p>
            <div className="flex space-x-4">
              <Link href="/data-protection-policy-pretoria" className="text-neutral-400 hover:text-white transition-colors text-sm">
                Privacy Policy
              </Link>
              <Link href="/legal-terms-pretoria" className="text-neutral-400 hover:text-white transition-colors text-sm">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
