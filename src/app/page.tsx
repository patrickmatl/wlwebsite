import { Metadata } from 'next';
import HomeContent from '@/components/HomeContent';
import { homeFaqs } from '@/data/homeFaqs';
import { generateFAQSchema } from '@/lib/schema';
import { BUSINESS } from '@/data/business';

export const metadata: Metadata = {
  title: { absolute: 'WL CreationX | Graphic Design Company Pretoria' },
  description:
    'WL CreationX is a graphic design company in Pretoria offering branding, logo design, web design, videography and photography. In business since 2013. Get a free consultation.',
  keywords: [
    'graphic design company pretoria',
    'graphic design agency pretoria',
    'branding agency pretoria',
    'web design pretoria',
    'creative agency pretoria',
    'logo design pretoria',
    'videography pretoria',
    'photography pretoria',
  ],
  manifest: '/site.webmanifest',
  alternates: {
    canonical: 'https://wlcreationx.co.za',
  },
  openGraph: {
    title: 'WL CreationX | Graphic Design Company Pretoria',
    description:
      'Graphic design company in Pretoria offering branding, logo design, web design, videography and photography. In business since 2013.',
    url: 'https://wlcreationx.co.za',
    siteName: 'WL CreationX',
    locale: 'en_ZA',
    type: 'website',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'WL CreationX — Graphic Design Company in Pretoria',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'WL CreationX | Graphic Design Company Pretoria',
    description:
      'Graphic design company in Pretoria offering branding, logo design, web design, videography and photography.',
    images: ['/images/og-image.jpg'],
  },
  category: 'Graphic Design & Creative Services',
  publisher: BUSINESS.name,
};

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white relative overflow-hidden perspective-1000">
      {/* FAQPage JSON-LD aligned with visible compact FAQ */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: generateFAQSchema(homeFaqs) }} />
      {/* LocalBusiness JSON-LD is emitted once, sitewide, from the root layout (single @id) */}
      <HomeContent />
    </main>
  );
}
