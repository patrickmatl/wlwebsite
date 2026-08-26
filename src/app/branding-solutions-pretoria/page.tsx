import React from 'react';
import Link from 'next/link';

const BrandIdentityPackages = () => {
  return (
    <div className="min-h-screen bg-black text-white py-20 px-4 sm:px-6 lg:px-8">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[#FFD700] to-[#FFA500]">
          BRAND IDENTITY DESIGN PACKAGES
        </h1>
        <p className="text-lg mb-4">
          Choose from three design packages at a 10% discount on standard package pricing — mention this page when you enquire.
        </p>
        <p className="text-gray-300 max-w-3xl mx-auto">
          Professional visual identity and logo design packages for startup businesses. 
          An ideal solution for micro, small, and medium enterprises looking to rebrand 
          or update their corporate identity.
        </p>
      </div>

      {/* Packages Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {/* Standard Packages */}
        <div className="bg-zinc-900 rounded-lg p-6 border border-[#FFD700]/20 hover:border-[#FFD700]/40 transition-all">
          <h3 className="text-[#FFD700] text-xl font-bold mb-4">STANDARD ESSENTIALS</h3>
          <p className="text-sm text-gray-400 mb-2">WITH LETTERMARK, WORDMARK, ABSTRACT OR PICTORIAL LOGO</p>
          <p className="text-2xl font-bold mb-6">R 6 683*</p>
          <ul className="space-y-3 text-gray-300">
            <li>✓ 3 Creative Concepts</li>
            <li>✓ 4 Revision Rounds</li>
            <li>✓ 1 Final Design</li>
            <li>✓ Logo Package</li>
            <li>✓ Brand Colour Palette</li>
            <li>✓ Brand Typography Guide</li>
            <li>✓ 3 Logo-Based Patterns</li>
            <li>✓ Letterhead Design</li>
            <li>✓ Email Signatures</li>
          </ul>
        </div>

        <div className="bg-zinc-900 rounded-lg p-6 border border-[#FFD700]/20 hover:border-[#FFD700]/40 transition-all">
          <h3 className="text-[#FFD700] text-xl font-bold mb-4">STANDARD BASIC</h3>
          <p className="text-sm text-gray-400 mb-2">WITH LETTERMARK, WORDMARK, ABSTRACT OR PICTORIAL LOGO</p>
          <p className="text-2xl font-bold mb-6">R 9 356*</p>
          <ul className="space-y-3 text-gray-300">
            <li>✓ All Essentials Features</li>
            <li>✓ Business Cards</li>
            <li>✓ Social Media Templates</li>
          </ul>
        </div>

        <div className="bg-zinc-900 rounded-lg p-6 border border-[#FFD700]/20 hover:border-[#FFD700]/40 transition-all">
          <h3 className="text-[#FFD700] text-xl font-bold mb-4">STANDARD EXTENDED</h3>
          <p className="text-sm text-gray-400 mb-2">WITH LETTERMARK, WORDMARK, ABSTRACT OR PICTORIAL LOGO</p>
          <p className="text-2xl font-bold mb-6">R 13 662*</p>
          <ul className="space-y-3 text-gray-300">
            <li>✓ All Basic Features</li>
            <li>✓ Folder Design</li>
            <li>✓ PowerPoint Template</li>
            <li>✓ Cover Page</li>
          </ul>
        </div>
      </div>

      {/* Illustrative Packages */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        <div className="bg-zinc-900 rounded-lg p-6 border border-[#FFD700]/20 hover:border-[#FFD700]/40 transition-all">
          <h3 className="text-[#FFD700] text-xl font-bold mb-4">ILLUSTRATIVE ESSENTIALS</h3>
          <p className="text-sm text-gray-400 mb-2">WITH ILLUSTRATIVE LOGO</p>
          <p className="text-2xl font-bold mb-6">R 12 029*</p>
          <ul className="space-y-3 text-gray-300">
            <li>✓ Same features as Standard Essentials</li>
            <li>✓ Custom Illustration Work</li>
          </ul>
        </div>

        <div className="bg-zinc-900 rounded-lg p-6 border border-[#FFD700]/20 hover:border-[#FFD700]/40 transition-all">
          <h3 className="text-[#FFD700] text-xl font-bold mb-4">ILLUSTRATIVE BASIC</h3>
          <p className="text-sm text-gray-400 mb-2">WITH ILLUSTRATIVE LOGO</p>
          <p className="text-2xl font-bold mb-6">R 14 702*</p>
          <ul className="space-y-3 text-gray-300">
            <li>✓ Same features as Standard Basic</li>
            <li>✓ Custom Illustration Work</li>
          </ul>
        </div>

        <div className="bg-zinc-900 rounded-lg p-6 border border-[#FFD700]/20 hover:border-[#FFD700]/40 transition-all">
          <h3 className="text-[#FFD700] text-xl font-bold mb-4">ILLUSTRATIVE EXTENDED</h3>
          <p className="text-sm text-gray-400 mb-2">WITH ILLUSTRATIVE LOGO</p>
          <p className="text-2xl font-bold mb-6">R 19 008*</p>
          <ul className="space-y-3 text-gray-300">
            <li>✓ Same features as Standard Extended</li>
            <li>✓ Custom Illustration Work</li>
          </ul>
        </div>
      </div>

  {/* Disclaimer */}
  <div className="max-w-7xl mx-auto text-sm text-gray-400 italic">
    *All prices exclude native files, purchasing of rights managed stock photos or illustrations, 
    proofreading, copywriting, content generation, printing, photography, and custom illustration work.
  </div>

  {/*
    This page ranks first for "branding companies in pretoria" and, until now,
    linked out exactly once — to the home page. A page with authority and no
    outbound internal links passes none of it on, so the terms that actually
    pay saw nothing from it. Each link below is descriptive on purpose: the
    anchor text is what tells a crawler what sits at the other end.
  */}
  <div className="max-w-7xl mx-auto mt-10 text-center">
    <p className="text-neutral-400 text-sm">
      Not sure which package fits? Compare our{' '}
      <Link href="/pricing/graphic-design-pretoria" className="text-[#FFD700] hover:underline">
        graphic design prices in Pretoria
      </Link>
      ,{' '}
      <Link href="/pricing/website-design-pretoria" className="text-[#FFD700] hover:underline">
        website design prices in Pretoria
      </Link>{' '}
      and{' '}
      <Link href="/pricing/packaging-design-pretoria" className="text-[#FFD700] hover:underline">
        packaging design prices
      </Link>
      , or see{' '}
      <Link href="/project-showcase-pretoria" className="text-[#FFD700] hover:underline">
        recent branding work from our Pretoria studio
      </Link>
      .
    </p>
    <p className="text-neutral-400 text-sm mt-3">
      Everything <Link href="/" className="text-[#FFD700] hover:underline">WL CreationX</Link> offers,
      from design to web, video and photography, is listed on our{' '}
      <Link href="/pricing" className="text-[#FFD700] hover:underline">
        pricing page
      </Link>
      .
    </p>
  </div>
    </div>
  );
};

export default BrandIdentityPackages;
