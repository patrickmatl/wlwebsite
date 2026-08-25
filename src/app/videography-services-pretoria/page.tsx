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
    name: 'Brand Story Video',
    price: 'R12,500',
    features: [
      'Half-day shoot in or around Pretoria',
      'Pre-production call and shot list',
      '60–90 second finished film',
      'Licensed music and colour grade',
      'Subtitled cut for social',
      '2 revision rounds',
    ],
    popular: false,
  },
  {
    name: 'Corporate Video Package',
    price: 'R21,500',
    features: [
      'Full-day shoot with two-camera setup',
      'Scripting and interview direction',
      'Professional lighting and audio',
      '2–3 minute main film',
      'Three short social cutdowns',
      'Motion graphics and lower thirds',
      '3 revision rounds',
    ],
    popular: true,
  },
  {
    name: 'Event Coverage',
    price: 'R9,850',
    features: [
      'Up to 6 hours on site',
      'Roaming videographer',
      'Highlights reel (90–120 seconds)',
      'Speaker and panel capture',
      'Next-day teaser clip',
      'Raw footage handover',
    ],
    popular: false,
  },
];

const addOns = [
  { name: 'Drone / Aerial Footage', price: 'From R3,450', description: 'Licensed drone operator, 4K aerial coverage' },
  { name: 'Second Camera Operator', price: 'From R2,850', description: 'Multi-angle coverage for interviews and events' },
  { name: 'Scriptwriting & Storyboard', price: 'From R2,400', description: 'Concept, script and shot-by-shot storyboard' },
  { name: 'Edit-Only / Post Production', price: 'From R1,950', description: 'You supply the footage, we cut and grade it' },
  { name: 'Subtitles & Translation', price: 'From R850', description: 'Burned-in or SRT, English and Afrikaans' },
  { name: 'Extra Social Cutdowns', price: 'From R1,150', description: 'Vertical 9:16 versions for Reels and TikTok' },
];

const services = [
  {
    title: 'Corporate & Company Videos',
    body: 'Company profile films, culture videos and internal communication pieces for Pretoria businesses, government departments and NGOs. We handle scripting, interview direction, lighting and audio so the people on camera actually look and sound the part.',
  },
  {
    title: 'Event Videography',
    body: 'Conferences, launches, awards evenings and expos across Pretoria and Gauteng. We cover keynote sessions, panel discussions and candid floor footage, then deliver a highlights reel you can post while the event is still fresh.',
  },
  {
    title: 'Product & Commercial Video',
    body: 'Studio and on-location product films for retail, manufacturing and e-commerce brands. Controlled lighting, macro detail work and clean motion so your product reads clearly on a phone screen.',
  },
  {
    title: 'Drone & Aerial Videography',
    body: 'Licensed aerial coverage for property, construction, mining, agriculture and large venues. Useful when a site is too big to make sense from the ground.',
  },
  {
    title: 'Social Media Video',
    body: 'Vertical, fast-cut content built for Instagram Reels, TikTok and YouTube Shorts. Shot for the format rather than cropped down from a landscape edit afterwards.',
  },
  {
    title: 'Video Editing & Post Production',
    body: 'Already have footage? We edit, colour grade, mix audio, add motion graphics and deliver in whatever formats and aspect ratios you need.',
  },
];

const process = [
  { step: '01', title: 'Brief & Quote', body: 'We talk through what the video needs to achieve, who it is for and where it will run. You get a fixed quote before anything is booked.' },
  { step: '02', title: 'Pre-Production', body: 'Script, shot list, location scouting and scheduling. Everyone knows what is being filmed before the camera comes out of the bag.' },
  { step: '03', title: 'The Shoot', body: 'Our crew arrives with camera, lighting and audio kit. Most Pretoria shoots run a half or full day depending on scope.' },
  { step: '04', title: 'Edit & Grade', body: 'First cut within five working days. Colour grade, sound mix, graphics and music are applied once the structure is signed off.' },
  { step: '05', title: 'Revisions & Delivery', body: 'You review, we refine, and you receive final files in every format and aspect ratio agreed in the brief.' },
];

const faqs = [
  {
    question: 'How much does videography cost in Pretoria?',
    answer:
      'Our video work starts at R9,850 for event coverage and R12,500 for a brand story film, with full corporate packages at R21,500. Final cost depends on shoot length, crew size, number of locations and how many edited versions you need. Every quote is fixed before the shoot is booked, so there are no surprise line items afterwards.',
  },
  {
    question: 'Do you travel outside Pretoria for shoots?',
    answer:
      'Yes. We are based in Pretoria and cover Centurion, Midrand, Johannesburg, Sandton and the wider Gauteng area at no additional travel cost. Shoots further afield in South Africa are quoted with travel and accommodation listed separately so you can see exactly what you are paying for.',
  },
  {
    question: 'How long does a video project take?',
    answer:
      'A typical corporate video runs about three to four weeks end to end: roughly one week for pre-production, one shoot day, and two weeks for editing and revisions. Event highlights reels are faster, and we can deliver a teaser clip the next day if you need something to post immediately.',
  },
  {
    question: 'Do you write the script, or do we?',
    answer:
      'Either. Many clients come to us with a rough idea and we develop the script and storyboard from there. If you already have an approved script we will work to it, and flag anything that will be difficult or expensive to shoot before we start.',
  },
  {
    question: 'Can you fly a drone legally for our shoot?',
    answer:
      'Yes. Aerial work is flown by a licensed operator within South African civil aviation rules. Some locations require prior permission or fall inside restricted airspace, so we check the site during pre-production and tell you upfront if aerial footage is not possible there.',
  },
  {
    question: 'What formats do we get at the end?',
    answer:
      'Standard delivery is a high-quality master file plus web-optimised versions. If you need vertical 9:16 cuts for Reels and TikTok, square 1:1 for feeds, or subtitled versions, we include those in the delivery list agreed in the brief. Raw footage can be handed over on request.',
  },
  {
    question: 'Do you also do photography on the same day?',
    answer:
      'Yes, and it is usually the cheapest way to get both. Because the crew, lighting and location are already set up, adding stills to a video shoot costs considerably less than booking a separate photography session. See our photography services in Pretoria for details.',
  },
  {
    question: 'Who owns the footage once the project is done?',
    answer:
      'You do. Full usage rights to the finished video transfer to you on final payment. We ask only to show the work in our own portfolio, and we will leave it out entirely if the project is confidential.',
  },
];

export default function VideographyServicesPretoria() {
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
            name: 'Videography and Video Production in Pretoria',
            serviceType: 'Videography',
            description:
              'Corporate video, event videography, product video, drone footage and post production for businesses in Pretoria and Gauteng.',
            provider: {
              '@type': 'LocalBusiness',
              name: 'WL CreationX',
              image: 'https://wlcreationx.co.za/images/og-image.jpg',
              url: 'https://wlcreationx.co.za',
              telephone: '+27 62 369 3789',
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
          Videography in Pretoria
        </motion.h1>
        <p className="max-w-3xl mx-auto text-lg text-neutral-300 leading-relaxed mb-4">
          WL CreationX is a Pretoria video production company making corporate films, event
          coverage, product video and aerial footage for businesses across Gauteng. We shoot,
          edit, grade and deliver in-house, so the brand you built with our{' '}
          <Link href="/" className="text-[#FFD700] hover:underline">
            graphic design team
          </Link>{' '}
          carries straight through to the screen.
        </p>
        <p className="max-w-3xl mx-auto text-base text-neutral-400 leading-relaxed mb-8">
          Fixed quotes, licensed drone operation, and a first cut within five working days.
        </p>
        <div className="flex justify-center"><GetInTouchButton text="Get a Video Quote" /></div>
      </section>

      {/* What we film */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="font-syne text-3xl font-bold text-[#FFD700] text-center mb-4">
          Video Production Services We Offer in Pretoria
        </h2>
        <p className="max-w-3xl mx-auto text-center text-neutral-400 mb-12">
          Six core service lines, all filmed and finished by the same in-house team.
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
          Videography Packages &amp; Pricing
        </h2>
        <p className="max-w-3xl mx-auto text-center text-neutral-400 mb-12">
          Transparent starting prices in South African Rand. Every project is quoted to scope
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
          How a Video Project Runs
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
          Where We Film
        </h2>
        <p className="text-neutral-300 leading-relaxed mb-4">
          We are based in Waterkloof Glen, Pretoria, and film across Pretoria East, Pretoria North,
          Pretoria West, Hatfield, Brooklyn, Menlyn, Lynnwood, Arcadia, Silver Lakes and
          Centurion at no extra travel charge. Shoots in Johannesburg, Sandton and Midrand are
          routine, and we quote travel separately for work elsewhere in South Africa.
        </p>
        <p className="text-neutral-300 leading-relaxed">
          If you are looking for a videographer in Pretoria who can also handle the branding,
          design and web side of a campaign, that is the reason we exist as one studio rather
          than four suppliers. See our{' '}
          <Link href="/service-areas-pretoria" className="text-[#FFD700] hover:underline">
            full service areas
          </Link>{' '}
          for the complete list.
        </p>
      </section>

      {/* FAQ */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="font-syne text-3xl font-bold text-[#FFD700] text-center mb-12">
          Videography Pretoria — Frequently Asked Questions
        </h2>
        <FAQAccordion faqs={faqs} />
      </section>

      {/* CTA */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h2 className="font-syne text-3xl font-bold text-[#FFD700] mb-4">
          Ready to Brief a Video?
        </h2>
        <p className="text-neutral-300 mb-8">
          Tell us what the video needs to do and we will come back with a fixed quote and a
          shooting schedule.
        </p>
        <div className="flex justify-center"><GetInTouchButton text="Get a Video Quote" /></div>
      </section>

      <RelatedServices
        currentService="Videography"
        services={[
          {
            title: 'Photography',
            description:
              'Product, corporate and event photography in Pretoria — often shot on the same day as your video.',
            href: '/photography-services-pretoria',
            anchor: 'View photography services',
          },
          {
            title: 'Corporate Video Pricing',
            description: 'Detailed package breakdown for corporate and company profile films.',
            href: '/pricing/corporate-video-pretoria',
            anchor: 'See corporate video pricing',
          },
          {
            title: 'Drone Video',
            description: 'Licensed aerial videography for property, construction and large sites.',
            href: '/pricing/drone-video-pretoria',
            anchor: 'See drone video pricing',
          },
          {
            title: 'Social Media Marketing',
            description: 'Put the finished video to work with paid and organic social campaigns.',
            href: '/pricing/social-media-pretoria',
            anchor: 'See social media services',
          },
          {
            title: 'Graphic Design',
            description: 'Titles, lower thirds and campaign artwork that match your brand system.',
            href: '/pricing/graphic-design-pretoria',
            anchor: 'See graphic design pricing',
          },
        ]}
      />
    </div>
  );
}
