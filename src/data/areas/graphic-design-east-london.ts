import type { AreaPage } from '@/data/area-pages';

/**
 * East London is served remotely from the Pretoria studio. There is no office,
 * phone number or staff member in East London or Buffalo City, and the copy must
 * never imply one. Facts used: the river port, vehicle manufacturing and its
 * supplier base, the East London IDZ on the West Bank, Bhisho as the provincial
 * seat within Buffalo City, coastal tourism. No statistics, no company names.
 */
const page: AreaPage = {
  slug: 'graphic-design-east-london',
  placeName: 'East London',
  kind: 'graphic-design',
  coverage: 'remote',
  province: 'Eastern Cape',
  linkLabel: 'Graphic design for East London companies',
  metaTitle: 'Graphic Design for East London Companies | WL CreationX',
  metaDescription:
    'Remote graphic design from a Pretoria studio for East London manufacturers, port businesses and coastal tourism: profiles, packaging, signage and websites.',
  eyebrow: 'East London · remote design from Pretoria',
  h1: 'Graphic Design for East London Companies',
  lead:
    'WL CreationX designs capability profiles, technical diagrams, packaging, factory signage and websites for East London manufacturers, logistics firms and coastal tourism businesses. We are a Pretoria studio and work with Buffalo City clients entirely online, with print couriered down or sent to a printer near you.',
  ctaLabel: 'Request an East London quote',
  quickFacts: [
    { label: 'Where we are', value: 'Waterkloof Glen, Pretoria' },
    { label: 'Proofs', value: 'Marked-up PDFs by email' },
    { label: 'Hours', value: 'Mon–Fri 8–5, Sat 8–3' },
  ],
  introHeading: 'Design for a manufacturing and port city',
  intro: [
    'East London makes things and ships things. Vehicle manufacturing has shaped the local economy for generations, and around it has grown a supplier base of component makers, toolrooms, engineering shops and logistics companies, many of them in the East London Industrial Development Zone on the West Bank. Add a working river port and the N2 and N6 corridors, and a large share of the city’s businesses sell to procurement departments rather than to the public.',
    'Those buyers judge a supplier on paperwork long before a site visit. A capability statement that explains your processes, certifications and capacity in plain order, a quality manual that looks maintained, product labels that carry the right codes: these are design jobs, and they are the ones East London firms most often bring to an outside studio. The other side of the city is the coast. Hotels, guesthouses and tour operators along the beachfront and up towards the Wild Coast need brochures, websites and social content that sell a place to people who have never been there.',
    'We do this work from Pretoria and say so openly. WL CreationX has one studio, in Waterkloof Glen, and no one stationed in East London. That has not been a problem for technical and print work, because the drawings, specifications and text you already hold are what we design from. We have been working this way since 2013, and every price on this page comes from our published list.',
  ],
  servicesHeading: 'What we design for East London businesses',
  servicesIntro:
    'Weighted towards manufacturing and supply-chain work first, then tourism. Prices are pulled from our live price list.',
  services: [
    {
      title: 'Capability statements and company profiles',
      priceId: 'company-profile',
      body:
        'For suppliers registering on a vendor database or answering a request for quotation. We structure the profile around what a buyer checks: scope of work, certifications, equipment list, capacity, key staff and B-BBEE level, set out so the answers are easy to find.',
      href: '/pricing/marketing-materials-pretoria',
      linkLabel: 'Company profile pricing',
    },
    {
      title: 'Process diagrams and technical infographics',
      priceId: 'infographic',
      body:
        'Production flows, quality-control steps, supply-chain maps and assembly sequences redrawn so a visiting auditor or a new operator can follow them. Useful in profiles, training material and on the factory wall.',
      href: '/pricing/infographic-data-visualization-design-pretoria',
      linkLabel: 'Infographic and marketing material pricing',
    },
    {
      title: 'Labels, cartons and industrial packaging',
      priceId: 'packaging',
      body:
        'Component boxes, part labels with barcode and batch fields, and retail packaging for food and consumer goods made in the Eastern Cape. Artwork goes to the converter’s die line with every legal and handling mark in place.',
      href: '/pricing/packaging-design-pretoria',
      linkLabel: 'Packaging design pricing',
    },
    {
      title: 'Factory and safety signage',
      priceId: 'signage',
      body:
        'Site entrance boards, PPE zone signs, evacuation plans and warehouse bay markers designed as one consistent family. Supplied as production files for a signmaker in Buffalo City, so nothing heavy has to travel.',
      href: '/pricing/print-design-pretoria',
      linkLabel: 'Signage design pricing',
    },
    {
      title: 'Nine-page websites for industrial firms',
      priceId: 'website-9',
      body:
        'Room for separate pages per capability, an equipment list, certifications and a contact route that reaches the right person. Built to load quickly, read well on a phone and give procurement teams what they search for.',
      href: '/pricing/website-design-pretoria',
      linkLabel: 'Website design packages',
    },
    {
      title: 'Brochures for lodges and tour operators',
      priceId: 'brochure',
      body:
        'Folded brochures and rate sheets for guesthouses, hotels and operators serving the beachfront and the Wild Coast. Designed for tourism offices and trade shows, with a PDF version for email enquiries.',
      href: '/pricing/print-design-pretoria',
      linkLabel: 'Brochure design pricing',
    },
    {
      title: 'Monthly social media content',
      priceId: 'social-essential',
      body:
        'A steady flow of posts for hospitality and retail businesses that want to stay visible between holiday seasons without writing every caption themselves.',
      href: '/pricing/social-media-pretoria',
      linkLabel: 'Social media packages',
    },
  ],
  districtsHeading: 'Parts of Buffalo City we design for',
  districtsIntro:
    'We work with these areas from a distance. Tell us where your premises are and who passes them, and we will design with that audience in mind.',
  districts: [
    {
      name: 'West Bank & the East London IDZ',
      note: 'Automotive suppliers, manufacturers and logistics operators in and around the industrial development zone. Capability profiles, signage and labelling.',
    },
    {
      name: 'Port area & Buffalo River',
      note: 'Freight, clearing and marine service businesses connected to the harbour. Company profiles and fleet artwork that read clearly.',
    },
    {
      name: 'East London CBD & Oxford Street',
      note: 'Professional offices, retailers and public-sector organisations in the older commercial centre.',
    },
    {
      name: 'Quigney & the Esplanade',
      note: 'Hotels, guesthouses and restaurants along the beachfront. Menus, brochures and booking-focused websites.',
    },
    {
      name: 'Vincent & Berea',
      note: 'Office blocks, medical rooms and consultancies. Practice stationery, profiles and websites.',
    },
    {
      name: 'Beacon Bay & Gonubie',
      note: 'Retail centres and owner-run businesses in the suburbs north-east of the city, often starting with a logo and a website.',
    },
    {
      name: 'Bhisho & Qonce',
      note: 'The provincial capital and the neighbouring town within the metro, where departments and the suppliers that serve them need formal reports and tender documents.',
    },
  ],
  industriesHeading: 'Design advice for East London’s main industries',
  industries: [
    {
      name: 'Automotive component suppliers',
      body:
        'Your customer’s supplier-quality team reads your documents line by line. Use one consistent template for profiles, process sheets and quality records, keep part numbering identical to the customer’s system, and date every revision on the page.',
    },
    {
      name: 'Logistics and port services',
      body:
        'Clients want to know what you move, where and how fast. A one-page service sheet with a simple route map and clear contact names often wins more work than a long brochure. Truck and trailer artwork should read from the side at speed.',
    },
    {
      name: 'Coastal tourism and hospitality',
      body:
        'Visitors book on photographs. Spend on good images of your rooms and the view, keep rates and directions on the website current, and design a brochure that still works when printed on an office printer at a tourism desk.',
    },
    {
      name: 'Government departments and their suppliers',
      body:
        'Tender submissions are compared side by side under time pressure. Follow the returnable-document order exactly, use tabbed section dividers, and keep the cover plain and professional rather than decorative.',
    },
  ],
  localWork: [],
  processHeading: 'Working with us from East London',
  process: [
    {
      title: 'Send the technical pack',
      body: 'Before the first call, email what you already have: drawings, certificates, an old profile, photos of the plant or premises. It lets us arrive at the video call with sensible questions instead of a blank brief.',
    },
    {
      title: 'Scoping call and fixed price',
      body: 'We go through the pack with you on a video call, agree what will be designed and by when, and send a written quote. Nothing starts until you approve it.',
    },
    {
      title: 'Rounds of review on PDF',
      body: 'Drafts come back as PDFs you can comment on directly. Engineers, quality managers and directors can all add notes to the same file, and we consolidate them into one revision.',
    },
    {
      title: 'Files to your printer or signmaker',
      body: 'Production files go straight to a supplier in East London if you have one, which saves freight on heavy or bulky items. Smaller print runs can be produced in Pretoria and couriered to you.',
    },
  ],
  faqs: [
    {
      q: 'Are you based in East London?',
      a: 'No. WL CreationX has one studio, in Waterkloof Glen, Pretoria, and no branch, agent or phone line in East London. East London clients work with us remotely by video call, WhatsApp and email.',
    },
    {
      q: 'Can you prepare a supplier profile for a vehicle manufacturer’s vendor process?',
      a: 'We can design and structure it so the information is clear and complete. The content, certifications and figures must come from you, and if the customer issues a template or checklist, send it so we follow it exactly.',
    },
    {
      q: 'Will you visit our plant to take photographs?',
      a: 'Only by arrangement. Shoots outside Gauteng are quoted separately, including travel, so we will not assume a visit. Many clients use a local photographer and send us the images, and we can brief that photographer for you.',
    },
    {
      q: 'Can a signmaker in East London produce the signage you design?',
      a: 'Yes, and for large or heavy signs that is usually the sensible route. We supply files to the signmaker’s specification and answer their technical questions directly.',
    },
    {
      q: 'Do you build websites for guesthouses and tour operators?',
      a: 'Yes. We design and build the site online and hand it over when it goes live. If you use a booking platform, we link to it or embed it so guests can reserve from the page.',
    },
  ],
  closingHeading: 'Working on an East London project?',
  closing:
    'Email or WhatsApp us what you have and what you need: a profile for a tender, labels for a new product, signs for a new building. We will book a video call and come back with a dated plan and a fixed price.',
};

export default page;
