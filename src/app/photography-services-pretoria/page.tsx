'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import PackageCard from '@/components/PackageCard';
import FAQAccordion from '@/components/FAQ/FAQAccordion';
import RelatedServices from '@/components/RelatedServices';
import GetInTouchButton from '@/components/GetInTouchButton';
import { generateFAQSchema } from '@/lib/schema';

const packages = [
  {
    name: 'Product Photography',
    price: 'R3,850',
    features: [
      'Up to 15 products, studio lit',
      'White and lifestyle backgrounds',
      'Multiple angles per product',
      'Retouched, web-ready files',
      'E-commerce sizing and cropping',
      '1 revision round',
    ],
    popular: false,
  },
  {
    name: 'Corporate & Team Shoot',
    price: 'R6,450',
    features: [
      'Half-day on site in Pretoria',
      'Up to 20 staff headshots',
      'Consistent lighting and backdrop',
      'Office and culture candids',
      'Retouched, LinkedIn-ready crops',
      'Brand-matched colour treatment',
      '2 revision rounds',
    ],
    popular: true,
  },
  {
    name: 'Event Photography',
    price: 'R4,950',
    features: [
      'Up to 5 hours coverage',
      'Roaming photographer',
      'Speaker, panel and floor candids',
      'Same-week gallery delivery',
      'Social-ready crops included',
      'Full resolution originals',
    ],
    popular: false,
  },
];

const addOns = [
  { name: 'Extra Products', price: 'From R145 each', description: 'Additional items beyond the package count' },
  { name: 'Model / Talent', price: 'From R2,650', description: 'Booked and directed for lifestyle shoots' },
  { name: 'Advanced Retouching', price: 'From R280 per image', description: 'Compositing, ghost mannequin, heavy clean-up' },
  { name: 'Property / Interior Set', price: 'From R3,200', description: 'Wide-angle interiors, HDR blending' },
  { name: 'Drone / Aerial Stills', price: 'From R2,950', description: 'Licensed operator, high-resolution aerial images' },
  { name: 'Same-Day Turnaround', price: 'From R1,450', description: 'Edited selects delivered within 24 hours' },
];

const services = [
  {
    title: 'Product & E-Commerce Photography',
    body: 'Clean, consistent product images for online stores, catalogues and marketplace listings. Shot on white for listings and styled in-set for campaigns, cropped and sized to whatever platform you sell on.',
  },
  {
    title: 'Corporate Headshots',
    body: 'Consistent, professional headshots for entire teams, shot at your Pretoria offices or in studio. Same lighting and backdrop for everyone, so your leadership page and LinkedIn profiles finally match.',
  },
  {
    title: 'Event Photography',
    body: 'Conferences, launches, awards evenings and corporate functions across Pretoria and Gauteng. Keynotes, panels, networking candids and the detail shots that make an event recap worth reading.',
  },
  {
    title: 'Food & Hospitality Photography',
    body: 'Menu, delivery-app and campaign photography for restaurants, caterers and food brands. Styled and lit so the dish looks like what actually arrives at the table.',
  },
  {
    title: 'Property & Interior Photography',
    body: 'Wide-angle interiors and exteriors for estate agents, guesthouses, developers and architects. Windows correctly exposed, verticals straight, rooms looking like themselves.',
  },
  {
    title: 'Brand & Lifestyle Photography',
    body: 'Image libraries built around your brand rather than bought off a stock site. Shot to a mood board so everything you publish for the next year looks like it came from the same place.',
  },
];

const process = [
  { step: '01', title: 'Brief & Quote', body: 'We agree what is being shot, how many images you need and where they will be used. Fixed quote before the booking is confirmed.' },
  { step: '02', title: 'Mood Board', body: 'For brand and lifestyle work we agree a visual direction upfront so the shoot has a reference to hit.' },
  { step: '03', title: 'The Shoot', body: 'Studio or on location in Pretoria. Product shoots typically run a half day; team shoots depend on headcount.' },
  { step: '04', title: 'Selects & Retouch', body: 'We cull to the strongest frames, then colour correct and retouch the selected images.' },
  { step: '05', title: 'Delivery', body: 'Downloadable gallery with full-resolution and web-optimised versions, cropped for the platforms you named in the brief.' },
];

const faqs = [
  {
    question: 'How much does a photographer cost in Pretoria?',
    answer:
      'Our commercial photography starts at R3,850 for a product shoot, R4,950 for event coverage and R6,450 for a half-day corporate team shoot. Price depends on how many images you need, whether we shoot in studio or on location, and how much retouching is involved. You get a fixed quote before the booking is confirmed.',
  },
  {
    question: 'Do you shoot in studio or at our premises?',
    answer:
      'Both. Product and food work is usually better in a controlled studio setup, while corporate headshots, team photos and event coverage are almost always shot at your offices or venue. We bring portable lighting and backdrops for on-location work, so the results stay consistent either way.',
  },
  {
    question: 'How many images do we receive?',
    answer:
      'It varies by package. A product shoot delivers multiple angles for each of up to 15 items, a corporate half-day covers up to 20 staff headshots plus candids, and event coverage typically produces 150 to 300 edited images depending on the length and pace of the event.',
  },
  {
    question: 'How long until we get the photos?',
    answer:
      'Standard turnaround is five to seven working days for edited images. Event galleries are usually delivered within the same week, and we can add same-day turnaround of selected images if you need something to publish immediately.',
  },
  {
    question: 'Is retouching included?',
    answer:
      'Colour correction, exposure balancing and basic clean-up are included in every package. Heavier work such as compositing, ghost mannequin for clothing, or detailed skin and product retouching is quoted per image so you only pay for the frames that need it.',
  },
  {
    question: 'Do we own the images?',
    answer:
      'Yes. Full commercial usage rights transfer to you on final payment, with no per-use or time-limited licensing. We ask only to show selected work in our portfolio, and we exclude the shoot entirely if the project is confidential.',
  },
  {
    question: 'Can you do photography and video on the same day?',
    answer:
      'Yes, and it is the most cost-effective way to do both. The crew, lighting and location are already in place, so adding stills to a video shoot costs far less than booking two separate sessions. See our videography services in Pretoria for the video side.',
  },
  {
    question: 'Which areas of Pretoria do you cover?',
    answer:
      'We are based in Waterkloof Glen and shoot across Pretoria East, North and West, plus Hatfield, Brooklyn, Menlyn, Lynnwood, Arcadia, Silver Lakes and Centurion at no extra travel cost. Johannesburg, Sandton and Midrand shoots are routine, and travel is quoted separately for work further afield.',
  },
];

export default function PhotographyServicesPretoria() {
  return (
    <div className="min-h-screen bg-black text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: generateFAQSchema(faqs) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Service',
            name: 'Commercial Photography in Pretoria',
            serviceType: 'Photography',
            description:
              'Product, corporate headshot, event, food, property and brand photography for businesses in Pretoria and Gauteng.',
            provider: {
              '@type': 'LocalBusiness',
              name: 'WL CreationX',
              image: 'https://wlcreationx.co.za/images/og-image.jpg',
              url: 'https://wlcreationx.co.za',
              telephone: '+27 62 369 3769',
              address: {
                '@type': 'PostalAddress',
                streetAddress: 'Park Lane West Building, 194 Bancor Ave',
                addressLocality: 'Pretoria',
                addressRegion: 'Gauteng',
                postalCode: '0181',
                addressCountry: 'ZA',
              },
              geo: { '@type': 'GeoCoordinates', latitude: -25.7846, longitude: 28.2905 },
            },
            areaServed: [
              { '@type': 'City', name: 'Pretoria' },
              { '@type': 'City', name: 'Centurion' },
              { '@type': 'City', name: 'Johannesburg' },
              { '@type': 'AdministrativeArea', name: 'Gauteng' },
            ],
            offers: packages.map((p) => ({
              '@type': 'Offer',
              name: p.name,
              price: p.price.replace(/[^0-9]/g, ''),
              priceCurrency: 'ZAR',
            })),
          }),
        }}
      />

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="font-syne text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[#FFD700] via-[#FFC000] to-[#FFB000]"
        >
          Photography in Pretoria
        </motion.h1>
        <p className="max-w-3xl mx-auto text-lg text-neutral-300 leading-relaxed mb-4">
          WL CreationX is a Pretoria commercial photography studio shooting product, corporate,
          event, food and property work for businesses across Gauteng. Everything is shot and
          retouched in-house, art-directed by the same team that builds our clients&apos;{' '}
          <Link href="/branding-solutions-pretoria" className="text-[#FFD700] hover:underline">
            brand identities
          </Link>
          .
        </p>
        <p className="max-w-3xl mx-auto text-base text-neutral-400 leading-relaxed mb-8">
          Fixed quotes, full commercial usage rights, and edited images inside a week.
        </p>
        <div className="flex justify-center">
          <GetInTouchButton text="Get a Photography Quote" />
        </div>
      </section>

      {/* What we shoot */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="font-syne text-3xl font-bold text-[#FFD700] text-center mb-4">
          Photography Services We Offer in Pretoria
        </h2>
        <p className="max-w-3xl mx-auto text-center text-neutral-400 mb-12">
          Six commercial photography lines, all shot and finished by the same in-house team.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="bg-zinc-900/50 backdrop-blur-sm rounded-xl p-6 border border-[#FFD700]/20 hover:border-[#FFD700]/40 transition-all"
            >
              <h3 className="font-syne text-xl font-bold text-white mb-3">{s.title}</h3>
              <p className="text-sm text-neutral-300 leading-relaxed">{s.body}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Packages */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="font-syne text-3xl font-bold text-[#FFD700] text-center mb-4">
          Photography Packages &amp; Pricing
        </h2>
        <p className="max-w-3xl mx-auto text-center text-neutral-400 mb-12">
          Transparent starting prices in South African Rand. Every shoot is quoted to scope
          before it is booked.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {packages.map((pkg) => (
            <PackageCard key={pkg.name} {...pkg} />
          ))}
        </div>
      </section>

      {/* Add-ons */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="font-syne text-3xl font-bold text-[#FFD700] text-center mb-12">
          Add-Ons &amp; Additional Services
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {addOns.map((a) => (
            <div
              key={a.name}
              className="bg-zinc-900/50 backdrop-blur-sm rounded-xl p-6 border border-[#FFD700]/20 hover:border-[#FFD700]/40 transition-colors"
            >
              <h3 className="font-syne text-lg font-bold text-white mb-1">{a.name}</h3>
              <p className="text-[#FFD700] font-bold mb-2">{a.price}</p>
              <p className="text-sm text-neutral-400">{a.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Process */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="font-syne text-3xl font-bold text-[#FFD700] text-center mb-12">
          How a Photo Shoot Runs
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {process.map((p) => (
            <div key={p.step} className="bg-zinc-900/50 rounded-xl p-6 border border-[#FFD700]/20">
              <span className="font-syne text-3xl font-bold text-[#FFD700]/40">{p.step}</span>
              <h3 className="font-syne text-lg font-bold text-white mt-2 mb-2">{p.title}</h3>
              <p className="text-sm text-neutral-400 leading-relaxed">{p.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Areas served */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="font-syne text-3xl font-bold text-[#FFD700] text-center mb-6">
          Where We Shoot
        </h2>
        <p className="text-neutral-300 leading-relaxed mb-4">
          Our studio is in Waterkloof Glen, Pretoria, and we shoot on location across Pretoria East,
          Pretoria North, Pretoria West, Hatfield, Brooklyn, Menlyn, Lynnwood, Arcadia, Silver
          Lakes and Centurion with no additional travel charge. Johannesburg, Sandton and Midrand
          shoots are routine, and travel is quoted separately for work elsewhere in South Africa.
        </p>
        <p className="text-neutral-300 leading-relaxed">
          If you need a photographer in Pretoria who can also handle the design, branding and web
          work the images will live in, that is exactly why we run as one studio. See our{' '}
          <Link href="/service-areas-pretoria" className="text-[#FFD700] hover:underline">
            full service areas
          </Link>{' '}
          for the complete list.
        </p>
      </section>

      {/* FAQ */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="font-syne text-3xl font-bold text-[#FFD700] text-center mb-12">
          Photography Pretoria — Frequently Asked Questions
        </h2>
        <FAQAccordion faqs={faqs} />
      </section>

      {/* CTA */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h2 className="font-syne text-3xl font-bold text-[#FFD700] mb-4">
          Ready to Book a Shoot?
        </h2>
        <p className="text-neutral-300 mb-8">
          Tell us what you need photographed and where the images will be used, and we will come
          back with a fixed quote.
        </p>
        <div className="flex justify-center">
          <GetInTouchButton text="Get a Photography Quote" />
        </div>
      </section>

      <RelatedServices
        currentService="Photography"
        services={[
          {
            title: 'Videography',
            description:
              'Corporate video, event coverage and drone work in Pretoria — often shot on the same day as your stills.',
            href: '/videography-services-pretoria',
            anchor: 'View videography services',
          },
          {
            title: 'Product Photography Pricing',
            description: 'Detailed package breakdown for e-commerce and catalogue product shoots.',
            href: '/pricing/product-photography-pretoria',
            anchor: 'See product photography pricing',
          },
          {
            title: 'General Photography Pricing',
            description: 'Full rate card across our commercial photography services.',
            href: '/pricing/photography-pretoria',
            anchor: 'See photography pricing',
          },
          {
            title: 'Packaging Design',
            description: 'Turn the product shots into shelf-ready packaging and label design.',
            href: '/pricing/packaging-design-pretoria',
            anchor: 'See packaging design',
          },
          {
            title: 'Social Media Marketing',
            description: 'Put the new image library to work across your social channels.',
            href: '/pricing/social-media-pretoria',
            anchor: 'See social media services',
          },
        ]}
      />
    </div>
  );
}
