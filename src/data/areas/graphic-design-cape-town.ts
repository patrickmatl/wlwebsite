import type { AreaPage } from '@/data/area-pages';

/**
 * Cape Town: served remotely from the Pretoria studio. No office, staff or
 * phone number in Cape Town. Read the rules at the top of area-pages.ts.
 */
const page: AreaPage = {
  slug: 'graphic-design-cape-town',
  kind: 'graphic-design',
  coverage: 'remote',
  province: 'Western Cape',
  placeName: 'Cape Town',
  linkLabel: 'Graphic design for Cape Town businesses',
  metaTitle: 'Graphic Design for Cape Town Businesses | WL CreationX',
  metaDescription:
    'Wine and food labels, online shops, menus, logos and pitch decks for Cape Town businesses, designed remotely by our Pretoria studio at published prices.',
  eyebrow: 'Cape Town · designed in Pretoria, delivered remotely',
  h1: 'Graphic Design for Cape Town, from a Pretoria Studio',
  lead:
    'WL CreationX is a Pretoria design studio that works with Cape Town companies at a distance: wine and food labels, online shops, menus, start-up identities and pitch decks. Briefs and reviews happen on video call, WhatsApp and email, and finished work arrives online or by courier.',
  ctaLabel: 'Brief us from Cape Town',
  quickFacts: [
    { label: 'Where we are', value: 'One studio, in Pretoria' },
    { label: 'Briefing', value: 'Video call, WhatsApp, email' },
    { label: 'Print', value: 'Couriered, or files for your printer' },
  ],
  introHeading: 'Why a Cape Town business would brief a studio up north',
  intro: [
    'Cape Town has plenty of good designers, and we would not pretend otherwise. The Cape Town clients who come to us usually have a specific reason: they sell into Gauteng and want material that lands well with buyers there, they already use us for a Gauteng branch, or they want a published price list and a written scope before anything starts. Whatever the reason, we are a Pretoria studio with one office, and everything for Cape Town is done remotely.',
    'The work itself follows the shape of the Cape economy. Hospitality and tourism plan around the summer season, so menus, brochures and booking pages need to be finished well before the December rush rather than in the middle of it. Wine and food producers need labels that hold their own on a crowded shelf and still carry every mandatory detail. The city’s start-ups and investment firms need decks and websites that explain something complicated to a reader in a hurry.',
    'Distance changes the routine more than the result. You will not have us sitting in your office, so we make up for it with clear written briefs, marked-up PDF proofs and calls booked at times that suit you. Cape Town clients get the same hours as everyone else: weekdays from eight to five and Saturdays until three.',
  ],
  servicesHeading: 'What Cape Town clients ask us to design',
  servicesIntro:
    'Picked and ordered for the Cape’s mix of producers, hospitality venues and young companies. The rate on each card comes straight from our published list.',
  services: [
    {
      title: 'Labels and packaging ranges',
      priceId: 'packaging-range',
      body:
        'Wine, gin, olive oil, preserves and cosmetics usually launch as a range rather than a single product. We design the family together, so each variant is easy to tell apart and the range still looks like one brand. Artwork is built on your label printer’s die line, so you can keep the Cape printer you already trust.',
      href: '/pricing/packaging-design-pretoria',
      linkLabel: 'Packaging design prices',
    },
    {
      title: 'Online shops',
      priceId: 'ecommerce',
      body:
        'For producers and makers who want to sell direct, including to customers in other provinces. We build the store, the product catalogue and the payment gateway, so a customer in Johannesburg can order as easily as one in Constantia.',
      href: '/pricing/ecommerce-pretoria',
      linkLabel: 'E-commerce website pricing',
    },
    {
      title: 'Menus and wine lists',
      priceId: 'menu-design',
      body:
        'Restaurants and tasting rooms change what they offer with the season. We lay out menus and wine lists so dishes, vintages and prices can be swapped without starting again, and supply print-ready files for a printer near you.',
      href: '/pricing/print-design-pretoria',
      linkLabel: 'Menu and print design prices',
    },
    {
      title: 'Logos for new ventures',
      priceId: 'logo-4',
      body:
        'Four original concepts for founders who want real options to compare before committing. You get vector files you own, equally usable on a pitch deck, an app icon and a shopfront.',
      href: '/logo-design-pretoria',
      linkLabel: 'Logo design options and prices',
    },
    {
      title: 'Pitch decks and investor presentations',
      priceId: 'powerpoint',
      body:
        'A deck is often sent ahead of the meeting and read without you there to explain it. We build PowerPoint concepts with a clear story order and charts that stay legible on a laptop screen, set up so your team can keep editing them.',
      href: '/pricing/presentation-design-services-pretoria',
      linkLabel: 'Presentation design pricing',
    },
    {
      title: 'Search optimisation for visitor businesses',
      priceId: 'seo-professional',
      body:
        'Travellers plan Cape Town trips on their phones weeks ahead. Our professional SEO retainer adds content strategy, link building and a monthly strategy call to the technical groundwork, for guesthouses, tour operators and restaurants that depend on being found.',
      href: '/pricing/seo-pretoria',
      linkLabel: 'SEO packages and prices',
    },
  ],
  districtsHeading: 'Cape Town business areas we work with',
  districtsIntro:
    'We serve every one of these remotely from Pretoria. The notes describe the kind of work each area tends to need; none of them is an office of ours.',
  districts: [
    {
      name: 'City Bowl & Foreshore',
      note: 'Law firms, consultancies, corporate offices and organisations that deal with provincial government. Mostly company profiles, presentations and reports.',
    },
    {
      name: 'V&A Waterfront',
      note: 'Hotels, restaurants and tour operators around the harbour, alongside offices for financial firms. Menus, visitor print and polished investor material.',
    },
    {
      name: 'Woodstock & Salt River',
      note: 'Independent brands, food businesses and studios in converted warehouses. Clients here often arrive with a clear point of view, which makes for good briefs.',
    },
    {
      name: 'Century City',
      note: 'A planned business district beside the N1 with head offices, conference venues and retail. Corporate identity, signage artwork and event print.',
    },
    {
      name: 'Tyger Valley & Bellville',
      note: 'The commercial centre of the northern suburbs, with professional practices, insurers and medical groups. Brochures, websites and stationery.',
    },
    {
      name: 'Claremont & the southern suburbs',
      note: 'Investment firms, private schools and owner-run professional practices. Restrained identities and carefully set documents.',
    },
    {
      name: 'Montague Gardens & Epping',
      note: 'Industrial and distribution areas with manufacturers and food processors. Packaging, product catalogues and fleet artwork.',
    },
  ],
  industriesHeading: 'Practical design notes for Cape Town sectors',
  industries: [
    {
      name: 'Hospitality and tourism',
      body:
        'Brief your seasonal print in winter. A menu, brochure or booking-page update signed off by October goes to print calmly; the same job in mid-December competes with every other venue in the city for the printer’s time. Write for overseas readers too: plain English, prices clearly marked, and directions that make sense to someone who has never been here.',
    },
    {
      name: 'Wine and artisanal food producers',
      body:
        'Wine-shop customers and retail buyers decide at arm’s length. Make the producer name and the variety readable before any illustration, and keep the mandatory label details in a fixed position across the range, so each new vintage is a quick update instead of a redesign. Talk to your label printer early about stock and finishes, because textured papers and foiling change how fine type reproduces.',
    },
    {
      name: 'Technology start-ups',
      body:
        'An investor or first customer gives your material a minute, if that. Say what the product does in one sentence on the opening slide and the home page, show it working with a real screenshot, and keep the founding story for later. A simple mark that still reads as a tiny app icon is worth more than an elaborate one.',
    },
    {
      name: 'Investment and financial services',
      body:
        'Fact sheets, quarterly letters and presentations are read by people comparing you with other managers. Consistent chart styles, comfortable type sizes and a template your compliance team approves once will save rework every quarter.',
    },
  ],
  localWork: [],
  processHeading: 'How a remote Cape Town project runs',
  process: [
    {
      title: 'A video call to start',
      body: 'We go through what you sell, who buys it and what material you already have. Share your screen, or walk us round your shelf or venue on a phone camera. A written scope and quote follow by email.',
    },
    {
      title: 'Concepts as annotated PDFs',
      body: 'First designs arrive as PDFs with a note on the thinking behind each option. Mark them up directly, or send WhatsApp voice notes if that is quicker on a busy service day.',
    },
    {
      title: 'Changes and approval',
      body: 'Two revision rounds are included. For seasonal work we fix the sign-off date at the start, so a summer menu is finished before the season and not during it.',
    },
    {
      title: 'Printed in Pretoria or by your printer',
      body: 'For print you choose: we produce it in Pretoria and courier it to Cape Town, or we send print-ready files to the printer you already use. Websites and digital files are delivered online.',
    },
  ],
  faqs: [
    {
      q: 'Is there a WL CreationX office in Cape Town?',
      a: 'No. Our only studio is at 194 Bancor Ave, Waterkloof Glen, Pretoria. We have no staff, phone line or meeting room in Cape Town. Every Cape Town project is run remotely by the same team that handles our Pretoria clients.',
    },
    {
      q: 'Can you come down for a photo shoot or an event?',
      a: 'Only by arrangement, and it is quoted separately with travel included. Most Cape Town clients find it simpler to book a local photographer and have us design with the images.',
    },
    {
      q: 'Will our labels be printed by you or by our own printer?',
      a: 'Either. Many producers have a label printer they have used for years, and we are glad to supply artwork to that printer’s specifications. We can also produce print in Pretoria and courier it, but specialist papers and finishes are usually easier to proof with a printer close to you.',
    },
    {
      q: 'How do we review designs if we never meet?',
      a: 'Proofs come as marked-up PDFs by email, and we talk them through on a video call or WhatsApp. For colour-critical print, such as a label on textured stock, ask your printer for a physical proof before the full run.',
    },
    {
      q: 'Do Cape Town clients pay a different rate?',
      a: 'No. You pay the same published rates as a client in Pretoria. The only extra costs that can come up are courier charges for print we send, and travel if you book on-site work.',
    },
    {
      q: 'Can you finish our material before the summer season?',
      a: 'Tell us the date the menu, brochure or site must be ready and we will say honestly whether it can be done properly in the time. Briefing in the quieter winter months gives you the most room.',
    },
  ],
  closingHeading: 'Planning ahead of the season?',
  closing:
    'Send a WhatsApp or email with what you need and when it has to be ready. We will set up a video call, then send a scope and a quote you can sign off without leaving Cape Town.',
};

export default page;
