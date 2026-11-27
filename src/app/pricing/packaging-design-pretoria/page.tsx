'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { FaBox, FaBars, FaCheck, FaShoppingBag, FaBoxOpen, FaGift, FaTag, FaStickyNote } from 'react-icons/fa';
import Breadcrumb from '@/components/Breadcrumb';
import RelatedServices from '@/components/RelatedServices';
import GetInTouchButton from '@/components/GetInTouchButton';
import CaseStudies from '@/components/CaseStudies';
import Link from 'next/link';
import GetStartedButton from '@/components/GetStartedButton';

const PAGE_URL = 'https://wlcreationx.co.za/pricing/packaging-design-pretoria';
const GUIDE_URL = '/creative-industry-blog-pretoria/packaging-design-checklist-south-africa';

// One list feeds both the visible FAQ and the FAQPage JSON-LD, so they cannot drift.
// Amounts in the first answer: packaging, packaging-carton, packaging-range,
// packaging-3d-mockup, packaging-label-extra, packaging-insert in pricing.ts.
const faqs = [
  {
    q: 'How much does packaging design cost in Pretoria?',
    a: 'With us, a label or sleeve for one product starts from R4,850, and a folding carton or box for one product is R4,850. A range of three to five products built on one design system is R9,850. Ranges of six or more products are quoted after a short call, because the number of products and pack formats sets the price. Add-ons are priced separately: photorealistic 3D mockup rendering is R1,200, an extra label variant is R850 and a package insert is R650.',
  },
  {
    q: 'What do I need to have ready before we start?',
    a: 'The product facts (name, what it is, net quantity, variants), all the text that must appear on the pack, your logo and brand colours if you have them, a barcode number if you sell through retailers, and the dieline or label size from your printer. If some of it is missing we can still start on concepts, but the final artwork cannot be finished until it arrives. Our packaging design checklist lists everything in detail.',
  },
  {
    q: 'Do you supply the dieline?',
    a: 'The dieline should come from your printer or packaging supplier, because it has to match their cutting tools and the exact container or carton you are buying. For a folding carton we build the structural dieline to the printer\'s specification. If you have not chosen a printer yet, tell us early and we will help you work out what to ask for.',
  },
  {
    q: 'Can you make sure my label is legally compliant?',
    a: 'We plan and lay out space for the information your product category needs, such as net quantity, ingredients and allergens for food, manufacturer details, barcode and batch or date areas, and we set it in sizes that stay legible. We are designers, not regulatory advisers, so the wording and the rules that apply to your product must be confirmed by you with the relevant authority or your compliance adviser. We then place exactly what you approve.',
  },
  {
    q: 'What files do I get at the end?',
    a: 'A print-ready PDF built to your printer\'s specification (usually PDF/X with bleed and the dieline on its own layer), the open vector source files, and JPG or PNG mockups for your website and social media. Once the project is paid, the final artwork is yours to use and reprint.',
  },
  {
    q: 'How many revisions are included?',
    a: 'Two revision rounds are included. A round is one consolidated set of changes from you, which we then apply. Extra rounds can be added if you need them, and we will tell you before any extra cost applies.',
  },
  {
    q: 'How long does a packaging design project take?',
    a: 'Most single-product projects take 5 to 10 working days of design time once we have the brief, the product facts and the dieline. Ranges take longer because each product needs its own artwork. The biggest delays usually come from waiting for copy, barcodes or the dieline, so having those ready shortens the job. Your quote confirms the timeline.',
  },
  {
    q: 'Do you offer 3D mockups?',
    a: 'A basic mockup is included with a single-product package so you can see the design on the pack before you print. Photorealistic 3D renders from several angles are available as an add-on. If you need real photographs of the printed product for an online shop, our product photography service covers that.',
  },
  {
    q: 'Can you redesign my existing packaging?',
    a: 'Yes. Send us photos of the current pack, the printer\'s dieline and anything you know about what works and what does not. We can keep the elements your customers recognise, such as colour or logo position, and fix layout, legibility and range consistency around them.',
  },
  {
    q: 'Do you work with businesses outside Pretoria?',
    a: 'Our studio is at 194 Bancor Ave, Waterkloof Glen, Pretoria, and we work with producers across Pretoria, Centurion, Johannesburg and the rest of Gauteng. Packaging artwork is delivered digitally, so we also work with businesses elsewhere in South Africa through video calls and email.',
  },
];

// Offers mirror pricing.ts: packaging, packaging-carton, packaging-range, sticker-sheet,
// hangtag-bag, packaging-3d-mockup, packaging-label-extra, packaging-insert.
// packaging-full is quoted on request, so it carries no Offer.
const offers: { name: string; price: number; from?: boolean }[] = [
  { name: 'Label / sleeve design (single product)', price: 4850, from: true },
  { name: 'Folding carton / box design (single product)', price: 4850 },
  { name: 'Packaging range (3–5 products)', price: 9850 },
  { name: 'Sticker / label sheet design', price: 1450 },
  { name: 'Hang tag & shopping bag design', price: 2950 },
  { name: '3D mockup rendering', price: 1200 },
  { name: 'Additional label design (add-on)', price: 850 },
  { name: 'Package insert design', price: 650 },
];

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': `${PAGE_URL}#service`,
  name: 'Packaging Design in Pretoria',
  serviceType: 'Packaging design',
  description:
    'Label, sleeve, folding carton, pouch, hang tag and range packaging design for producers in Pretoria and Gauteng, set up on the printer\'s dieline with print-ready artwork.',
  url: PAGE_URL,
  provider: { '@id': 'https://wlcreationx.co.za/#business' },
  areaServed: [
    { '@type': 'City', name: 'Pretoria' },
    { '@type': 'AdministrativeArea', name: 'Gauteng' },
  ],
  offers: offers.map((o) =>
    o.from
      ? {
          '@type': 'Offer',
          name: o.name,
          url: PAGE_URL,
          priceCurrency: 'ZAR',
          priceSpecification: { '@type': 'PriceSpecification', minPrice: o.price, priceCurrency: 'ZAR' },
        }
      : { '@type': 'Offer', name: o.name, url: PAGE_URL, price: o.price, priceCurrency: 'ZAR' },
  ),
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
};

const portfolio = [
  {
    src: '/images/packages/Package1.webp',
    alt: 'Teal takeaway coffee cup with a white lotus logo for Serene Sanctuary, with a black lid',
    caption: 'Serene Sanctuary: takeaway cup branding',
  },
  {
    src: '/images/packages/Package2.webp',
    alt: 'Purple stand-up pouch for Crispelle biscuits with a window panel showing the biscuits and a short product description',
    caption: 'Crispelle: biscuit pouch',
  },
  {
    src: '/images/packages/Package3.webp',
    alt: 'Gugu perfume bottle and matching white folding carton, both carrying the round teal Gugu logo',
    caption: 'Gugu Perfume: bottle label and carton',
  },
  {
    src: '/images/packages/Package4.webp',
    alt: 'White Lerato shampoo bottle with a green pump, the Lerato logo, strawberry imagery and a net quantity line on the label',
    caption: 'Lerato Shampoo: bottle label',
  },
  {
    src: '/images/packages/Package5.webp',
    alt: 'Sun Bloom oil bottle with a maroon wrap-around label and sunflower artwork',
    caption: 'Sun Bloom: wrap-around bottle label',
  },
  {
    src: '/images/packages/Package6.webp',
    alt: 'Zonke Still Water bottle with a green and navy sleeve carrying the Zonke logo on a diagonal band',
    caption: 'Zonke Still Water: bottle sleeve',
  },
];

const PackagingDesignPage = () => {
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'Packaging Design', href: '/pricing/packaging-design-pretoria' }
  ];

  // Mirrors pricing.ts packaging, packaging-range, packaging-full.
  // Client component: keep these strings in step with that file by hand.
  const packages = [
    {
      name: "Single Product",
      price: "R4,850",
      priceNote: "from · one label or sleeve",
      icon: <FaBox className="w-8 h-8 text-[#FFD700]" />,
      features: [
        "1 product, one label or sleeve",
        "2 design concepts",
        "Artwork set up on your printer's dieline",
        "2 revision rounds",
        "Print-ready files",
        "Basic 3D mockup"
      ]
    },
    {
      name: "Product Range (3–5)",
      price: "R9,850",
      priceNote: "3 to 5 products",
      icon: <FaBoxOpen className="w-8 h-8 text-[#FFD700]" />,
      features: [
        "One master design system across the range",
        "Variant colour and naming system",
        "Print-ready artwork for every product",
        "2 revision rounds",
        "Advanced 3D mockups",
        "Range extends cleanly when you add products"
      ]
    },
    {
      name: "Full System (6+)",
      price: "Quoted on request",
      priceNote: "scoped on a short call",
      icon: <FaGift className="w-8 h-8 text-[#FFD700]" />,
      features: [
        "Full product line (6+ items)",
        "Complete range architecture",
        "Artwork for every product and pack format",
        "Packaging guidelines document",
        "Photorealistic 3D mockups",
        "Label and insert designs"
      ]
    }
  ];

  // Mirrors pricing.ts packaging-carton, sticker-sheet, hangtag-bag.
  const otherItems = [
    {
      name: "Folding Carton / Box (single product)",
      price: "R4,850",
      icon: <FaBoxOpen className="w-6 h-6 text-[#FFD700]" />,
      description: "Structural dieline built to your printer's specification, full artwork across every panel, and the barcode and regulatory panel set up."
    },
    {
      name: "Sticker / Label Sheet",
      price: "R1,450",
      icon: <FaStickyNote className="w-6 h-6 text-[#FFD700]" />,
      description: "A sheet of up to six coordinated sticker or label designs, two options to choose from, cut lines set up for the printer, plus digital versions."
    },
    {
      name: "Hang Tag & Shopping Bag",
      price: "R2,950",
      icon: <FaTag className="w-6 h-6 text-[#FFD700]" />,
      description: "A hang tag with cut line and eyelet setup, and shopping bag artwork on the supplier's dieline, designed from your existing brand identity, with mockups of both."
    }
  ];

  // Mirrors pricing.ts packaging-3d-mockup, packaging-label-extra, packaging-insert.
  const additionalServices = [
    {
      name: "3D Mockup Rendering",
      price: "R1,200",
      icon: <FaBox className="w-6 h-6 text-[#FFD700]" />,
      description: "Photorealistic 3D renderings of your packaging design from multiple angles"
    },
    {
      name: "Additional Label Design",
      price: "R850",
      icon: <FaBars className="w-6 h-6 text-[#FFD700]" />,
      description: "An extra label for a product already in your packaging project (a new flavour, size or variant), with nutritional information and required certifications"
    },
    {
      name: "Package Insert",
      price: "R650",
      icon: <FaShoppingBag className="w-6 h-6 text-[#FFD700]" />,
      description: "Design of instruction manuals, promotional inserts, or product information sheets"
    }
  ];

  const deliverables = [
    { title: 'Concepts', text: 'Two design directions for a single product, each shown on your actual pack shape so you judge it as a customer would see it, not as a flat rectangle.' },
    { title: 'Design to the printer\'s dieline', text: 'Every panel, fold, glue flap and safe zone follows the dieline your printer supplies, so the artwork fits the carton, label or pouch you are actually buying.' },
    { title: 'Print-ready artwork', text: 'Final files built to the printer\'s specification: correct colour mode, bleed, outlined text, and separate layers for the dieline, white ink, varnish or foil where your job uses them.' },
    { title: 'Mockups', text: 'A 3D mockup of the finished pack for approvals, investors, retailer presentations and your online shop before the first print run lands.' },
    { title: 'Two revision rounds', text: 'Two consolidated rounds of changes are included. We make the changes, show you the result and check the details again before anything goes to print.' },
    { title: 'Files you own', text: 'Once the project is paid, the artwork and the open source files are yours. Reprint with any printer and add variants later without starting again.' },
  ];

  const packagingTypes = [
    { title: 'Labels', text: 'Front and back labels for jars, bottles, tubs and tins, on paper or synthetic stock, sized to the container and the label printer\'s roll or sheet layout.' },
    { title: 'Sleeves and wraps', text: 'Wrap-around labels and shrink or stretch sleeves that cover the whole container, where the artwork has to allow for the curve and any distortion when the sleeve shrinks.' },
    { title: 'Folding cartons and boxes', text: 'Retail cartons, tuck-end boxes and gift boxes with artwork across every panel, from the front face to the base and the glue flap.' },
    { title: 'Pouches and bags', text: 'Stand-up and flat pouches for snacks, coffee, spices, pet food and dry goods, including window panels and zip or tear-notch areas.' },
    { title: 'Hang tags and shopping bags', text: 'Swing tags with cut lines and eyelet positions, and carrier bags set up on the bag supplier\'s dieline.' },
    { title: 'Inserts and stickers', text: 'Instruction leaflets, thank-you cards, product information sheets, seals and sticker sheets that sit inside or on the pack.' },
    { title: 'Product ranges', text: 'A master layout with a variant colour and naming system so three, five or fifteen products read as one family on the shelf and the next flavour is quick to add.' },
  ];

  const steps = [
    { title: 'Brief and product facts', text: 'We start with the product, who buys it, where it will be sold and what sits next to it on the shelf. You send the product facts and all the text that must appear on the pack. Our packaging checklist lists what to gather.' },
    { title: 'Dieline from your printer', text: 'You get the dieline or exact label size from your printer or packaging supplier. We do not guess dimensions: a label that is two millimetres too wide will wrinkle on the container.' },
    { title: 'Concepts', text: 'We design concepts on the dieline and show each one as a mockup, with the front panel tested at shelf distance and the mandatory information already in place.' },
    { title: 'Revisions', text: 'You choose a direction and send one consolidated set of changes per round. Two rounds are included.' },
    { title: 'Print-ready artwork', text: 'We build the final artwork for every panel and variant to the printer\'s specification and send the files with a short note of colours, finishes and layers used.' },
    { title: 'Proof check with the printer', text: 'Your printer sends a proof. We check it against the artwork with you, and you sign it off. A printed proof on the real material is the only reliable way to judge colour, so ask for one on any large run.' },
  ];

  const audiences = [
    { title: 'Food and beverage producers', text: 'Sauces, spices, baked goods, snacks, coffee, juice and water bottled or packed around Pretoria and Gauteng, where the label must carry a lot of mandatory information and still sell the product.' },
    { title: 'Cosmetics and personal care', text: 'Skincare, hair care, candles and fragrance, where small containers, curved surfaces and premium finishes make layout and print setup demanding.' },
    { title: 'Small manufacturers', text: 'Cleaning products, hardware, pet products and other goods moving from plain packaging or a home-printed label to something a retailer will stock.' },
    { title: 'Start-ups preparing for retail', text: 'Brands getting ready for markets, farm stalls, independent shops or a first chain-store listing, who need packaging that prints correctly the first time.' },
  ];

  const furtherReading = [
    { href: GUIDE_URL, label: 'Packaging design checklist for South African products' },
    { href: '/creative-industry-blog-pretoria/logo-file-formats-explained', label: 'Logo file formats explained' },
    { href: '/creative-industry-blog-pretoria/what-a-brand-identity-includes', label: 'What a brand identity includes' },
    { href: '/creative-industry-blog-pretoria/graphic-design-cost-pretoria-2026', label: 'Graphic design cost in Pretoria: 2026 price guide' },
    { href: '/branding-solutions-pretoria', label: 'Branding solutions in Pretoria' },
    { href: '/pricing/print-design-pretoria', label: 'Print design pricing' },
    { href: '/pricing/product-photography-pretoria', label: 'Product photography pricing' },
  ];

  return (
    <div className="min-h-screen bg-black text-white py-20 px-4 sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Breadcrumb items={breadcrumbItems} />

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">Packaging Design in Pretoria</h1>
        <p className="text-xl text-neutral-300 max-w-3xl mx-auto">
          Labels, sleeves, cartons, pouches and full product ranges, designed on your printer&apos;s dieline and delivered as print-ready artwork you own.
        </p>
        <p className="text-neutral-400 max-w-3xl mx-auto mt-4 leading-relaxed">
          WL CreationX has designed for South African businesses since 2013 from our studio in Waterkloof Glen, Pretoria.
          Packaging is where design meets production: the pack has to sell the product from a metre away, carry the
          information your product category requires, and print correctly on the material your printer uses. Our prices
          are published below, and each of the three main packages includes concepts, two revision rounds and final files.
        </p>
      </div>

      {/* Packages Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {packages.map((pkg, index) => (
          <motion.div
            key={pkg.name}
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-zinc-900 rounded-lg p-8 border border-[#FFD700]/20"
          >
            <div className="flex items-center justify-center mb-6">
              {pkg.icon}
            </div>
            <h3 className="text-2xl font-bold text-[#FFD700] text-center mb-4">{pkg.name}</h3>
            <p className="text-3xl font-bold text-center mb-1">{pkg.price}</p>
            <p className="text-sm text-neutral-400 text-center mb-8">{pkg.priceNote}</p>
            <ul className="space-y-4 mb-8">
              {pkg.features.map((feature, i) => (
                <li key={i} className="flex items-start">
                  <FaCheck className="text-[#FFD700] mr-2 flex-shrink-0 mt-1" />
                  <span className="text-neutral-300">{feature}</span>
                </li>
              ))}
            </ul>
            <GetStartedButton
              packageName={pkg.name}
              packagePrice={pkg.price}
              service="Packaging design"
            />
          </motion.div>
        ))}
      </div>

      {/* Other packaging items */}
      <div className="max-w-7xl mx-auto mb-16">
        <h2 className="font-syne text-2xl font-bold text-[#FFD700] text-center mb-8">Cartons, Stickers and Tags</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {otherItems.map((item) => (
            <div key={item.name} className="bg-zinc-900 rounded-lg p-6 border border-[#FFD700]/20">
              <div className="mb-3">{item.icon}</div>
              <h3 className="text-xl font-bold text-[#FFD700] mb-2">{item.name}</h3>
              <p className="text-2xl font-bold mb-4">{item.price}</p>
              <p className="text-neutral-300">{item.description}</p>
              <GetStartedButton
                packageName={item.name}
                packagePrice={item.price}
                service="Packaging design"
                label="Enquire"
                className="mt-4 w-full"
              />
            </div>
          ))}
        </div>
        <p className="text-sm text-neutral-400 text-center mt-6 max-w-3xl mx-auto">
          The hang tag and bag price assumes you already have a brand identity. New packaging concepts are covered by the packages above.
        </p>
      </div>

      {/* Additional Services */}
      <div className="max-w-7xl mx-auto mb-16">
        <h2 className="text-2xl font-bold text-[#FFD700] text-center mb-8">Additional Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {additionalServices.map((service, index) => (
            <motion.div
              key={service.name}
              initial={false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-zinc-900 rounded-lg p-6 border border-[#FFD700]/20"
            >
              <h3 className="text-xl font-bold text-[#FFD700] mb-2">{service.name}</h3>
              <p className="text-2xl font-bold mb-4">{service.price}</p>
              <p className="text-neutral-300">{service.description}</p>
              <GetStartedButton
                packageName={service.name}
                packagePrice={service.price}
                service="Packaging design"
                label="Enquire"
                className="mt-4 w-full"
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* What changes the price */}
      <section className="max-w-4xl mx-auto mb-16" aria-labelledby="price-factors">
        <h2 id="price-factors" className="font-syne text-3xl font-bold text-[#FFD700] mb-4">What Changes the Price</h2>
        <p className="text-neutral-300 leading-relaxed mb-4">
          The prices above cover the design work. Printing is not included, because its cost depends on the run length,
          material and finishes you choose with your printer. What moves the design price is mostly the amount of
          artwork to produce:
        </p>
        <ul className="space-y-3 text-neutral-300 mb-4">
          <li className="flex items-start"><FaCheck className="text-[#FFD700] mr-2 flex-shrink-0 mt-1" /><span><strong className="text-white">Number of products.</strong> Each product in a range needs its own finished artwork, even when the design system is shared.</span></li>
          <li className="flex items-start"><FaCheck className="text-[#FFD700] mr-2 flex-shrink-0 mt-1" /><span><strong className="text-white">Pack formats.</strong> A label, a carton and a pouch for the same product are three different dielines and three sets of artwork. Extra formats are quoted per format.</span></li>
          <li className="flex items-start"><FaCheck className="text-[#FFD700] mr-2 flex-shrink-0 mt-1" /><span><strong className="text-white">Variants.</strong> A new flavour, size or scent on an existing design is an add-on label rather than a new project.</span></li>
          <li className="flex items-start"><FaCheck className="text-[#FFD700] mr-2 flex-shrink-0 mt-1" /><span><strong className="text-white">Starting point.</strong> If there is no logo or brand identity yet, that work comes first and is priced separately.</span></li>
          <li className="flex items-start"><FaCheck className="text-[#FFD700] mr-2 flex-shrink-0 mt-1" /><span><strong className="text-white">Illustration and photography.</strong> Custom illustration, or a product shoot for imagery on the pack, adds to the price when the design needs it.</span></li>
        </ul>
        <p className="text-neutral-400 leading-relaxed">
          For a wider view of design prices in Pretoria, see our{' '}
          <Link href="/creative-industry-blog-pretoria/graphic-design-cost-pretoria-2026" className="text-[#FFD700] hover:underline">graphic design cost guide for 2026</Link>.
        </p>
      </section>

      {/* What you get */}
      <section className="max-w-5xl mx-auto mb-16" aria-labelledby="what-you-get">
        <h2 id="what-you-get" className="font-syne text-3xl font-bold text-[#FFD700] mb-4">What You Get</h2>
        <p className="text-neutral-300 leading-relaxed mb-8">
          Whichever package you choose, the work follows the same pattern: design that fits the physical pack, artwork
          your printer can use without fixing it, and files that stay with you.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {deliverables.map((d) => (
            <div key={d.title} className="rounded-lg border border-white/10 bg-white/[0.03] p-6">
              <h3 className="text-lg font-bold text-white mb-2 flex items-start">
                <FaCheck className="text-[#FFD700] mr-2 flex-shrink-0 mt-1" />
                {d.title}
              </h3>
              <p className="text-neutral-300 leading-relaxed">{d.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Packaging types */}
      <section className="max-w-5xl mx-auto mb-16" aria-labelledby="packaging-types">
        <h2 id="packaging-types" className="font-syne text-3xl font-bold text-[#FFD700] mb-4">Packaging We Design</h2>
        <p className="text-neutral-300 leading-relaxed mb-8">
          Each format has its own production rules, so the format decides how we set up the file as much as how it looks.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {packagingTypes.map((t) => (
            <div key={t.title} className="rounded-lg border border-[#FFD700]/20 bg-zinc-900 p-6">
              <h3 className="text-lg font-bold text-[#FFD700] mb-2">{t.title}</h3>
              <p className="text-neutral-300 leading-relaxed">{t.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Portfolio */}
      <section className="max-w-6xl mx-auto mb-16" aria-labelledby="packaging-portfolio">
        <h2 id="packaging-portfolio" className="font-syne text-3xl font-bold text-[#FFD700] mb-4">Packaging From Our Portfolio</h2>
        <p className="text-neutral-300 leading-relaxed mb-8">
          Cups, pouches, bottles, cartons and sleeves from our packaging work. Each brand is designed to read clearly on
          its own container, with the logo and product name doing the work at a distance.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {portfolio.map((p) => (
            <figure key={p.src} className="rounded-lg overflow-hidden border border-white/10 bg-zinc-900">
              <Image
                src={p.src}
                alt={p.alt}
                width={354}
                height={564}
                loading="lazy"
                sizes="(min-width: 768px) 33vw, 50vw"
                className="w-full h-auto"
              />
              <figcaption className="p-3 text-sm text-neutral-300">{p.caption}</figcaption>
            </figure>
          ))}
        </div>
        <p className="mt-6 text-neutral-300">
          See more logo and packaging work in our{' '}
          <Link href="/project-showcase-pretoria" className="text-[#FFD700] hover:underline">
            design portfolio
          </Link>
          .
        </p>
      </section>

      {/* Process */}
      <section className="max-w-4xl mx-auto mb-16" aria-labelledby="packaging-process">
        <h2 id="packaging-process" className="font-syne text-3xl font-bold text-[#FFD700] mb-4">How a Packaging Project Runs</h2>
        <p className="text-neutral-300 leading-relaxed mb-8">
          Six steps, from the first conversation to the printer&apos;s proof. Most of the risk in packaging sits in the
          first two and the last one, which is why we spend time on them.
        </p>
        <ol className="space-y-6">
          {steps.map((s, i) => (
            <li key={s.title} className="flex gap-4">
              <span className="flex-shrink-0 w-10 h-10 rounded-full bg-[#FFD700] text-black font-bold flex items-center justify-center">
                {i + 1}
              </span>
              <div>
                <h3 className="text-lg font-bold text-white mb-1">{s.title}</h3>
                <p className="text-neutral-300 leading-relaxed">{s.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* File formats */}
      <section className="max-w-4xl mx-auto mb-16" aria-labelledby="print-handover">
        <h2 id="print-handover" className="font-syne text-3xl font-bold text-[#FFD700] mb-4">File Formats and Print Handover</h2>
        <p className="text-neutral-300 leading-relaxed mb-6">
          Printers differ in what they want, so we ask for their specification sheet and build to it. A typical packaging
          handover looks like this:
        </p>
        <ul className="space-y-3 text-neutral-300">
          <li className="flex items-start"><FaCheck className="text-[#FFD700] mr-2 flex-shrink-0 mt-1" /><span><strong className="text-white">Print-ready PDF</strong>, usually a PDF/X standard (PDF/X-1a or PDF/X-4, whichever your printer asks for), so fonts, colours and image resolution are locked in.</span></li>
          <li className="flex items-start"><FaCheck className="text-[#FFD700] mr-2 flex-shrink-0 mt-1" /><span><strong className="text-white">Vector source files</strong> with text kept editable in the master and outlined in the print file, so you can update a variant or ingredient line later.</span></li>
          <li className="flex items-start"><FaCheck className="text-[#FFD700] mr-2 flex-shrink-0 mt-1" /><span><strong className="text-white">CMYK or Pantone colour</strong>: CMYK for full-colour work, named Pantone spot colours where a brand colour must match exactly across runs and printers.</span></li>
          <li className="flex items-start"><FaCheck className="text-[#FFD700] mr-2 flex-shrink-0 mt-1" /><span><strong className="text-white">Bleed and safe zones</strong> to the printer&apos;s figures, commonly around 3 mm of bleed, with important text kept clear of cuts and folds.</span></li>
          <li className="flex items-start"><FaCheck className="text-[#FFD700] mr-2 flex-shrink-0 mt-1" /><span><strong className="text-white">The dieline on its own layer</strong>, set as a named spot colour that does not print, with white ink, varnish, foil or embossing on separate layers when used.</span></li>
          <li className="flex items-start"><FaCheck className="text-[#FFD700] mr-2 flex-shrink-0 mt-1" /><span><strong className="text-white">Images at full resolution</strong> for the printed size (around 300 ppi), and barcodes placed as vector artwork, never as a screenshot.</span></li>
          <li className="flex items-start"><FaCheck className="text-[#FFD700] mr-2 flex-shrink-0 mt-1" /><span><strong className="text-white">Web files</strong>: JPG or PNG mockups and flat artwork for your online shop, retailer listings and social media.</span></li>
        </ul>
        <p className="text-neutral-400 leading-relaxed mt-6">
          Not sure what the different file types are for? Our guide to{' '}
          <Link href="/creative-industry-blog-pretoria/logo-file-formats-explained" className="text-[#FFD700] hover:underline">logo file formats</Link>{' '}
          explains vector, PDF, PNG and the rest in plain language.
        </p>
      </section>

      {/* Shelf and compliance */}
      <section className="max-w-4xl mx-auto mb-16" aria-labelledby="shelf-compliance">
        <h2 id="shelf-compliance" className="font-syne text-3xl font-bold text-[#FFD700] mb-4">Designed for the Shelf, With Room for the Rules</h2>
        <p className="text-neutral-300 leading-relaxed mb-4">
          A shopper decides in seconds, often from a metre or two away. The front panel has one job: say clearly what the
          product is, which brand it belongs to and which variant it is. We test concepts at real size and at a distance,
          check how the pack looks next to its competitors, and keep variant colours distinct enough that a customer can
          find their flavour without picking up every jar.
        </p>
        <p className="text-neutral-300 leading-relaxed mb-4">
          The back and side panels carry the information that keeps the product on the shelf. Depending on the product,
          that can include net quantity, ingredients and allergens, nutritional information, the manufacturer or importer&apos;s
          details, usage and storage instructions, a barcode, and space for batch numbers and best-before or expiry dates
          that are printed or stamped later. Planning that space from the first concept avoids the familiar problem of a
          beautiful front and a back panel crammed into unreadable type.
        </p>
        <p className="text-neutral-300 leading-relaxed mb-4">
          The rules depend on what you sell. Food, cosmetics and other categories each have their own labelling
          requirements, and the Consumer Protection Act also covers product information. We lay out what your product
          needs, but the wording and requirements must be confirmed by you with the relevant authority or your compliance
          adviser. Barcodes for retail are issued by GS1 South Africa, so register early if you plan to sell through
          retailers.
        </p>
        <p className="text-neutral-300 leading-relaxed">
          Our{' '}
          <Link href={GUIDE_URL} className="text-[#FFD700] hover:underline">packaging design checklist for South African products</Link>{' '}
          walks through all of this in detail, from the dieline to the printer&apos;s proof.
        </p>
      </section>

      {/* Common problems */}
      <section className="max-w-4xl mx-auto mb-16" aria-labelledby="common-problems">
        <h2 id="common-problems" className="font-syne text-3xl font-bold text-[#FFD700] mb-4">Packaging Problems Worth Avoiding</h2>
        <p className="text-neutral-300 leading-relaxed mb-6">
          Most packaging problems are expensive because they are found after printing. These are the ones we check for
          on every job:
        </p>
        <div className="space-y-5">
          <div>
            <h3 className="text-lg font-bold text-white mb-1">A label that does not fit the container</h3>
            <p className="text-neutral-300 leading-relaxed">Designing to a guessed size, or to a different supplier&apos;s jar, leads to wrinkles, gaps and overlaps. Working from the printer&apos;s dieline and the actual container prevents it.</p>
          </div>
          <div>
            <h3 className="text-lg font-bold text-white mb-1">Back panels with no room</h3>
            <p className="text-neutral-300 leading-relaxed">When the required information is added at the end, it ends up in tiny type. We place it in the first concept, using the real copy where you have it.</p>
          </div>
          <div>
            <h3 className="text-lg font-bold text-white mb-1">Colours that print differently</h3>
            <p className="text-neutral-300 leading-relaxed">Screen colours rarely match print, and the same ink looks different on kraft, white board or clear film. We set up colour for the actual material and recommend a printed proof.</p>
          </div>
          <div>
            <h3 className="text-lg font-bold text-white mb-1">Barcodes that will not scan</h3>
            <p className="text-neutral-300 leading-relaxed">Barcodes placed too small, in the wrong colour, across a fold or without a clear margin can be rejected at the till. We place them as vector artwork in a safe position.</p>
          </div>
          <div>
            <h3 className="text-lg font-bold text-white mb-1">A range that drifts</h3>
            <p className="text-neutral-300 leading-relaxed">Products designed one at a time, by different people, rarely look like a family. A master layout and variant system keeps the range consistent as it grows.</p>
          </div>
        </div>
      </section>

      {/* Who it suits */}
      <section className="max-w-5xl mx-auto mb-16" aria-labelledby="who-it-suits">
        <h2 id="who-it-suits" className="font-syne text-3xl font-bold text-[#FFD700] mb-4">Who Our Packaging Design Suits</h2>
        <p className="text-neutral-300 leading-relaxed mb-8">
          Our packaging service is built for producers in Pretoria and Gauteng who make the product themselves and need
          packaging that looks the part and prints without surprises.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {audiences.map((a) => (
            <div key={a.title} className="rounded-lg border border-white/10 bg-white/[0.03] p-6">
              <h3 className="text-lg font-bold text-white mb-2">{a.title}</h3>
              <p className="text-neutral-300 leading-relaxed">{a.text}</p>
            </div>
          ))}
        </div>
        <p className="text-neutral-300 leading-relaxed mt-6">
          No logo or brand identity yet? Start with our{' '}
          <Link href="/branding-solutions-pretoria" className="text-[#FFD700] hover:underline">branding solutions</Link>{' '}
          and read{' '}
          <Link href="/creative-industry-blog-pretoria/what-a-brand-identity-includes" className="text-[#FFD700] hover:underline">what a brand identity includes</Link>
          , so the packaging is built on a system rather than a one-off design.
        </p>
      </section>

      <CaseStudies service="packaging" heading="Recent packaging projects" />

      {/* FAQ Section */}
      <section className="py-20 bg-neutral-800 -mx-4 sm:-mx-6 lg:-mx-8 px-4" aria-labelledby="packaging-faq">
        <div className="max-w-4xl mx-auto">
          <h2 id="packaging-faq" className="font-syne text-3xl font-bold text-white text-center mb-12">
            Packaging Design: Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {faqs.map((faq) => (
              <div key={faq.q} className="bg-neutral-900 rounded-lg p-6">
                <h3 className="text-xl font-bold text-white mb-3">{faq.q}</h3>
                <p className="text-neutral-300 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Further reading */}
      <section className="max-w-4xl mx-auto py-16" aria-labelledby="further-reading">
        <h2 id="further-reading" className="font-syne text-2xl font-bold text-[#FFD700] mb-6">Further Reading</h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {furtherReading.map((r) => (
            <li key={r.href}>
              <Link href={r.href} className="text-neutral-200 hover:text-[#FFD700] underline underline-offset-4">
                {r.label}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* Related Services */}
      <RelatedServices
        currentService="Packaging Design"
        services={[
          {
            title: 'Print Design',
            description: 'Professional print design for all your marketing needs.',
            href: '/pricing/print-design-pretoria',
            anchor: 'View Print Design Services'
          },
          {
            title: 'Product Photography',
            description: 'Photographs of your finished packaging for online shops and listings.',
            href: '/pricing/product-photography-pretoria',
            anchor: 'View Product Photography'
          },
          {
            title: 'Graphic Design',
            description: 'Creative graphic design for all your needs.',
            href: '/pricing/graphic-design-pretoria',
            anchor: 'View Graphic Design Services'
          },
          {
            title: 'Marketing Materials',
            description: 'Comprehensive marketing material design services.',
            href: '/pricing/marketing-materials-pretoria',
            anchor: 'View Marketing Materials'
          }
        ]}
      />

      {/* CTA Section */}
      <section className="py-20 bg-black">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Start Your Packaging?
          </h2>
          <p className="text-xl text-neutral-300 mb-8">
            Send us the product, the printer&apos;s dieline if you have it, and where you plan to sell. We will reply with a quote and a timeline.
          </p>
          <GetInTouchButton variant="primary" text="Start Your Project" className="text-lg" />
        </div>
      </section>
      {/* Contextual link to homepage with varied phrasing */}
      <div className="max-w-4xl mx-auto px-4 text-center mt-6">
        <p className="text-neutral-400 text-sm">
          Learn more about our <Link href="/" className="text-[#FFD700] hover:underline">graphic design company Pretoria</Link> on the homepage.
        </p>
      </div>
    </div>
  );
};

export default PackagingDesignPage;
