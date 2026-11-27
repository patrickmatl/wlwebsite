import type { AreaPage } from '@/data/area-pages';

/**
 * Gqeberha (Port Elizabeth): served remotely from the Pretoria studio. No
 * office, staff or phone number in the Eastern Cape. People still search
 * "port elizabeth", so both names are used. Read the rules at the top of
 * area-pages.ts.
 */
const page: AreaPage = {
  slug: 'graphic-design-port-elizabeth',
  kind: 'graphic-design',
  coverage: 'remote',
  province: 'Eastern Cape',
  placeName: 'Gqeberha (Port Elizabeth)',
  linkLabel: 'Graphic design for Port Elizabeth (Gqeberha)',
  metaTitle: 'Graphic Design Port Elizabeth (Gqeberha) | WL CreationX',
  metaDescription:
    'Capability documents, packaging, brochures and websites for Gqeberha (Port Elizabeth) firms, designed remotely by a Pretoria studio at published rates.',
  eyebrow: 'Gqeberha · Nelson Mandela Bay, served remotely',
  h1: 'Graphic Design for Port Elizabeth (Gqeberha) Businesses',
  lead:
    'Gqeberha, still searched for as Port Elizabeth, is a city of vehicle plants, export harbours, citrus and holiday coastline. WL CreationX designs supplier documents, packaging, brochures and websites for Nelson Mandela Bay businesses from our studio in Pretoria, working with you remotely.',
  ctaLabel: 'Start a Gqeberha project',
  quickFacts: [
    { label: 'Based in', value: 'Pretoria, working remotely' },
    { label: 'Proofs', value: 'Marked-up PDFs by email' },
    { label: 'Printed items', value: 'Couriered nationwide' },
  ],
  introHeading: 'Design for a metro that answers to supply chains',
  intro: [
    'A large part of Nelson Mandela Bay’s economy exists to supply someone else. Component makers in Struandale and Kariega feed vehicle assembly lines, businesses at Coega serve the port and the special economic zone, and growers in the nearby Sundays River Valley pack citrus for buyers overseas. Each of those customers has a supplier list, an audit checklist and a procurement team. Good design here is mostly about making a capable company easy to evaluate.',
    'That kind of work travels well. Capability statements, supplier presentations, technical brochures and export packaging are produced as files, reviewed on screen and approved in writing. They do not need a designer in the room; they need a clear brief and a studio that keeps to the dates it agrees.',
    'WL CreationX is a Pretoria studio, running since 2013, with no office or representative in the Eastern Cape. You talk to us by video call, WhatsApp or email during our normal hours, and you receive finished work online, by courier, or as print-ready files for a printer in the Bay.',
  ],
  servicesHeading: 'How we help Nelson Mandela Bay businesses',
  servicesIntro:
    'Led by the documents suppliers and exporters depend on, followed by the work that tourism and local retail need.',
  services: [
    {
      title: 'Interactive capability statements',
      priceId: 'interactive-pdf',
      body:
        'A clickable PDF with a contents page and internal links, so a buyer can jump straight to your certifications, plant list or quality section. The file is kept small enough to email, and it is easy to update when you add a customer or a machine.',
      href: '/pricing/interactive-digital-publication-interactive-pdf-design-pretoria',
      linkLabel: 'Graphic design price list',
    },
    {
      title: 'Export and retail packaging',
      priceId: 'packaging',
      body:
        'Labels and sleeves for processed food, citrus products and goods made in the metro, built on your printer’s die line with the barcode and regulatory panel set up correctly. Extra pack formats are quoted per format.',
      href: '/pricing/packaging-design-pretoria',
      linkLabel: 'Packaging design pricing',
    },
    {
      title: 'Tourism brochures',
      priceId: 'brochure',
      body:
        'A Z-fold that fits a hotel rack or a visitor-centre stand, for guest houses, lodges near Addo and activity operators on the beachfront. The layout answers what visitors actually ask: where you are, how long it takes, what it costs and how to book.',
      href: '/pricing/print-design-pretoria',
      linkLabel: 'Brochure and print design prices',
    },
    {
      title: 'Business websites',
      priceId: 'website',
      body:
        'Responsive sites with content management and basic SEO configured before launch. For a Gqeberha business that includes making sure both the old and the new city names appear where people search for them.',
      href: '/pricing/website-design-pretoria',
      linkLabel: 'Website design packages',
    },
    {
      title: 'Corporate identity packs',
      priceId: 'ci-1',
      body:
        'Two logo concepts, a final logo, business cards, letterhead and an email signature. A practical starting set for an engineering firm setting up near Coega or a new practice in Newton Park.',
      href: '/visual-communication-services-pretoria',
      linkLabel: 'Corporate identity packs and prices',
    },
    {
      title: 'Social media templates',
      priceId: 'social-essential',
      body:
        'A monthly template set plus profile and story artwork, for Richmond Hill restaurants, shops and tour operators who post for themselves but want every post to look like the same business.',
      href: '/pricing/social-media-pretoria',
      linkLabel: 'Social media packages',
    },
  ],
  districtsHeading: 'Parts of Nelson Mandela Bay we design for',
  districtsIntro:
    'We work with businesses across the metro, all of it remotely. This is what each area tends to ask for.',
  districts: [
    {
      name: 'Central & Richmond Hill',
      note: 'The older city centre with legal and municipal-facing firms, and Richmond Hill’s restaurants and small creative businesses. Menus, signage artwork and identities.',
    },
    {
      name: 'Newton Park & Greenacres',
      note: 'A major commercial and retail hub with shops, medical suites and professional offices. Stationery, brochures and websites.',
    },
    {
      name: 'Summerstrand & Humewood',
      note: 'Beachfront hotels and restaurants, plus the businesses around Nelson Mandela University’s main campus. Visitor print, event material and social content.',
    },
    {
      name: 'Struandale & Deal Party',
      note: 'Industrial areas near the harbour with component manufacturers, engineering workshops and warehousing. Technical brochures, safety signage and supplier documents.',
    },
    {
      name: 'Coega SEZ & the Port of Ngqura',
      note: 'The special economic zone and deep-water port north-east of the city, with manufacturing and logistics investors. Capability statements and investor-facing presentations.',
    },
    {
      name: 'Kariega',
      note: 'Formerly Uitenhage and the centre of the metro’s vehicle manufacturing. Supplier documentation, plant signage artwork and training material.',
    },
  ],
  industriesHeading: 'Advice for Gqeberha’s main sectors',
  industries: [
    {
      name: 'Automotive component suppliers',
      body:
        'Your customers audit quality systems, so let your documents show the same discipline. Use one template for capability statements, quality manuals and supplier presentations, with document numbers and revision dates always in the same place. Line-side and safety signage should use the standard symbols your customer already uses on its own floor.',
    },
    {
      name: 'Citrus and agri-processing',
      body:
        'Export packaging is read by inspectors, importers and warehouse staff long before any shopper sees it. Leave clear space for marking and traceability codes, keep grower and packhouse details legible, and check every panel against the destination market’s requirements before artwork is finalised.',
    },
    {
      name: 'Tourism and hospitality',
      body:
        'Visitors often combine the city with Addo or the Garden Route, so tell them how to reach you from both. A rack brochure and a booking page that works well on a phone will do more for a guest house than a long website nobody scrolls through.',
    },
    {
      name: 'Engineering and industrial services',
      body:
        'Firms tendering for work at Coega or the ports compete on credibility first. A tidy profile that sets out project types, equipment and safety record, backed by matching letterhead and email signatures, helps a small firm get past the first paper sift.',
    },
  ],
  localWork: [],
  processHeading: 'From brief to delivery, without anyone flying in',
  process: [
    {
      title: 'Brief over video or WhatsApp',
      body: 'Tell us about your customers and deadlines on a call, or start with WhatsApp messages and voice notes if your days are spent on the factory floor. We confirm everything by email afterwards.',
    },
    {
      title: 'Quote against our price list',
      body: 'The quote uses the same published rates shown on this page, with the deliverables and delivery date stated. Work begins once you accept it.',
    },
    {
      title: 'Screen proofs, two revisions',
      body: 'Each draft comes as a PDF with our comments marked. Your quality or marketing manager can add notes straight onto it, and two rounds of changes are included.',
    },
    {
      title: 'Files, courier or a printer in the Bay',
      body: 'Interactive PDFs and websites are delivered online. Brochures and stationery can be printed in Pretoria and couriered to you, or we hand print-ready files to your local printer or packaging supplier.',
    },
  ],
  faqs: [
    {
      q: 'Is WL CreationX based in Port Elizabeth?',
      a: 'No. Our only studio is in Waterkloof Glen, Pretoria, and we have no office, staff or phone line in Gqeberha. We work with Nelson Mandela Bay clients entirely remotely, during the same hours we keep for everyone.',
    },
    {
      q: 'Should our material say Port Elizabeth or Gqeberha?',
      a: 'Gqeberha is the official name, but many people, especially outside the province, still search for Port Elizabeth. On a website we normally use both in the page text and contact details, so you can be found either way. On printed stationery the official name in the postal address is the safer choice.',
    },
    {
      q: 'Can you work to our customer’s supplier document requirements?',
      a: 'Send us the customer’s supplier manual or template and we will design within it, including numbering, revision fields and any required logos or disclaimers. We design the documents; the content and compliance statements remain yours to verify.',
    },
    {
      q: 'Can you visit our plant to take photographs?',
      a: 'Not as a matter of course. On-site work outside Gauteng is possible only by arrangement and is quoted separately, with travel included. Many clients use a photographer in the Bay and send us the images, which we lay out and clean up.',
    },
    {
      q: 'Will a Gqeberha printer accept your files?',
      a: 'Yes. We supply print-ready PDFs with bleed and crop marks to the printer’s specification, or packaging artwork on their die line. Send us their specs at the start and there are no surprises at press stage.',
    },
  ],
  closingHeading: 'Tell us what your customers need to see',
  closing:
    'Email or WhatsApp us with the document or product you are working on and the date it is due. We will arrange a call at a time that fits around your shifts, then send a quote based on our published prices.',
};

export default page;
