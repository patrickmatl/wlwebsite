/**
 * SINGLE SOURCE OF TRUTH for every price WL CreationX quotes.
 *
 * The AI quote agent is only ever allowed to quote from this file — it is
 * given this list verbatim and instructed that inventing or adjusting a price
 * is forbidden. That is what keeps an automated quote from committing the
 * business to a number nobody approved.
 *
 * All amounts are in South African Rand (ZAR). The studio is not a registered
 * VAT vendor, so no VAT is added and client-facing quotes do not mention it.
 * When a price changes, change it HERE and the website, the quote engine and
 * the blog guides all follow.
 */

export type PriceUnit =
  | 'fixed'
  | 'from'
  | 'per-month'
  | 'per-page'
  | 'per-image'
  | 'per-word'
  | 'per-hour'
  | 'per-minute'
  | 'per-unit';

export type PriceItem = {
  /** Stable id — used by quotes so line items survive copy edits */
  id: string;
  name: string;
  /** Amount in Rand. null = quoted on request after a scoping call. */
  amount: number | null;
  unit: PriceUnit;
  /** What the client actually receives */
  includes: string[];
  /** Page a client can read for the full detail */
  url: string;
  notes?: string;
};

export type PriceCategory = {
  id: string;
  name: string;
  /** Plain-language description the agent can use when clarifying */
  blurb: string;
  items: PriceItem[];
};

export const CURRENCY = 'ZAR';
export const CURRENCY_SYMBOL = 'R';

/** Applies to every design project — the agent should state these as standard. */
export const STANDARD_INCLUSIONS = [
  'Two rounds of changes built into the quoted price',
  'You own the artwork on final payment, handed over in editable working files',
  'Brand colours, codes and fonts documented with the handover',
  'Designed from scratch for you — we never work from templates',
  'One designer stays on your project from brief to handover',
  'Print-ready setup checked before anything goes to press',
] as const;

/**
 * Printing is bought in from trade printers rather than produced in-house, so
 * it can never be quoted from a fixed list: the price moves with quantity,
 * size, stock and finish. The agent must ask for specs, then the trade quote
 * is marked up by this much.
 *
 * 40% sits in the middle of the 30-50% range print brokers work to. Small runs
 * carry proportionally more admin than margin, so they take the minimum
 * handling fee instead — 40% of a R400 business-card run does not cover the
 * time it takes to place and check it.
 */
export const PRINT_MARKUP = 0.4;
export const PRINT_MIN_HANDLING = 650;

/** What to charge a client for print that cost `tradeCost` from the printer. */
export function printSellPrice(tradeCost: number): number {
  return Math.max(tradeCost * (1 + PRINT_MARKUP), tradeCost + PRINT_MIN_HANDLING);
}

export const EXTRAS: PriceItem[] = [
  {
    id: 'extra-revision',
    name: 'Additional revision round',
    amount: 520,
    unit: 'fixed',
    includes: ['One further round of changes beyond the two included'],
    url: '/visual-communication-services-pretoria',
  },
];

export const PRICING: PriceCategory[] = [
  {
    id: 'logo',
    name: 'Logo Design',
    blurb:
      'Standalone logo design. Priced by how many distinct initial concepts you want to choose from.',
    items: [
      {
        id: 'logo-redraw',
        name: 'Logo redraw (existing logo rebuilt as vector)',
        amount: 1040,
        unit: 'fixed',
        includes: ['Existing logo redrawn', '1 final concept', 'Print-ready files supplied'],
        url: '/visual-communication-services-pretoria',
      },
      {
        id: 'logo-2',
        name: 'Logo design — 2 concepts',
        amount: 2080,
        unit: 'fixed',
        includes: ['2 unique concepts', '1 final logo', 'Print-ready files', '2 revision rounds'],
        url: '/pricing/graphic-design-pretoria',
      },
      {
        id: 'logo-4',
        name: 'Logo design — 4 concepts',
        amount: 3120,
        unit: 'fixed',
        includes: ['4 unique concepts', '1 final logo', 'Print-ready files', '2 revision rounds'],
        url: '/pricing/graphic-design-pretoria',
      },
      {
        id: 'logo-6',
        name: 'Logo design — 6 concepts',
        amount: 4160,
        unit: 'fixed',
        includes: ['6 unique concepts', '1 final logo', 'Print-ready files', '2 revision rounds'],
        url: '/pricing/graphic-design-pretoria',
      },
      {
        id: 'app-icon',
        name: 'App icon design',
        amount: 2080,
        unit: 'fixed',
        includes: [
          '2 unique concepts',
          '1 final icon',
          'Every iOS and Android store size supplied',
          'Adaptive Android version',
          'Vector master file',
        ],
        url: '/logo-design-pretoria',
      },
    ],
  },
  {
    id: 'corporate-identity',
    name: 'Corporate Identity Packs',
    blurb: 'Logo plus the core business stationery, priced as a bundle.',
    items: [
      {
        id: 'ci-1',
        name: 'Corporate Identity Pack 1',
        amount: 4160,
        unit: 'fixed',
        includes: [
          '2 unique logo concepts',
          '1 final logo',
          'Business card design',
          'Letterhead design',
          'Email signature design',
          '2 revision rounds',
        ],
        url: '/visual-communication-services-pretoria',
      },
      {
        id: 'ci-2',
        name: 'Corporate Identity Pack 2',
        amount: 5080,
        unit: 'fixed',
        includes: [
          '4 unique logo concepts',
          '1 final logo',
          'Business card design',
          'Letterhead design',
          'Email signature design',
          '2 revision rounds',
        ],
        url: '/visual-communication-services-pretoria',
      },
      {
        id: 'ci-3',
        name: 'Corporate Identity Pack 3',
        amount: 6410,
        unit: 'fixed',
        includes: [
          '6 unique logo concepts',
          '1 final logo',
          'Business card design',
          'Letterhead design',
          'Email signature design',
          '2 revision rounds',
        ],
        url: '/visual-communication-services-pretoria',
      },
    ],
  },
  {
    id: 'business-essentials',
    name: 'Business Essentials',
    blurb: 'Individual stationery items when a full pack is not needed.',
    items: [
      {
        id: 'business-card',
        name: 'Business card design',
        amount: 1040,
        unit: 'fixed',
        includes: ['2 unique options', '1 final concept', '90 x 50mm', 'Print-ready files'],
        url: '/visual-communication-services-pretoria',
      },
      {
        id: 'letterhead',
        name: 'Letterhead design',
        amount: 1290,
        unit: 'fixed',
        includes: ['2 unique options', '1 final concept', '2 revision rounds'],
        url: '/visual-communication-services-pretoria',
      },
      {
        id: 'email-sig-static',
        name: 'Email signature (static image)',
        amount: 1040,
        unit: 'fixed',
        includes: ['2 unique options', '1 final concept', 'Single clickable link'],
        url: '/visual-communication-services-pretoria',
      },
      {
        id: 'email-sig-html',
        name: 'Email signature (interactive HTML)',
        amount: 1560,
        unit: 'fixed',
        includes: ['2 unique options', 'HTML coded', 'Multiple clickable links'],
        url: '/visual-communication-services-pretoria',
        notes: 'Requires hosting to run',
      },
      {
        id: 'cv-design',
        name: 'CV / résumé design',
        amount: 1950,
        unit: 'fixed',
        includes: [
          '2 unique options',
          'Up to 2 pages laid out',
          'Matching cover letter page',
          'Editable Word version you can update yourself',
          'Print and PDF versions',
        ],
        url: '/pricing/graphic-design-pretoria',
      },
    ],
  },
  {
    id: 'print',
    name: 'Print & Digital Media',
    blurb: 'Marketing collateral for print and digital distribution.',
    items: [
      {
        id: 'flyer',
        name: 'Flyer design (A6–A4)',
        amount: 950,
        unit: 'from',
        includes: ['2 unique options', '1 final concept', 'Print-ready files', '2 revision rounds'],
        url: '/pricing/print-design-pretoria',
      },
      {
        id: 'publication-advert',
        name: 'Publication / media advert',
        amount: 960,
        unit: 'from',
        includes: ['2 unique options', '1 final concept', 'For print and digital media'],
        url: '/pricing/print-design-pretoria',
      },
      {
        id: 'digital-flyer',
        name: 'Digital / WhatsApp flyer',
        amount: 1040,
        unit: 'fixed',
        includes: ['2 unique options', '1 final concept', 'Digital format only'],
        url: '/pricing/print-design-pretoria',
      },
      {
        id: 'poster',
        name: 'Poster design (A4–A0)',
        amount: 1560,
        unit: 'from',
        includes: ['2 unique options', '1 final concept', 'Print-ready files'],
        url: '/pricing/print-design-pretoria',
      },
      {
        id: 'signage',
        name: 'Signage / advertising board design',
        amount: 1560,
        unit: 'from',
        includes: ['2 unique options', '1 final concept', 'Print-ready files'],
        url: '/pricing/print-design-pretoria',
        notes: 'Final price varies with the size of the board',
      },
      {
        id: 'brochure',
        name: 'Brochure (Z-fold)',
        amount: 2590,
        unit: 'fixed',
        includes: ['2 unique options', '1 final concept', 'Print-ready files', '2 revision rounds'],
        url: '/pricing/print-design-pretoria',
      },
      {
        id: 'company-folder',
        name: 'Company folder',
        amount: 3230,
        unit: 'fixed',
        includes: ['2 unique options', '1 final concept', 'Print-ready files'],
        url: '/pricing/print-design-pretoria',
      },
      {
        id: 'company-profile',
        name: 'Company profile',
        amount: 780,
        unit: 'per-page',
        includes: ['2 unique options', '1 final concept', 'Print-ready files'],
        url: '/pricing/marketing-materials-pretoria',
        notes: 'Priced per page — ask how many pages the client needs',
      },
      {
        id: 'powerpoint',
        name: 'PowerPoint presentation concept pack',
        amount: 3500,
        unit: 'fixed',
        includes: ['Custom PowerPoint template', '1 final concept', '5 template slides'],
        url: '/pricing/presentation-design-services-pretoria',
        notes: 'Additional slides can be added',
      },
      {
        id: 'book-layout',
        name: 'Book / e-book layout',
        amount: 650,
        unit: 'per-page',
        includes: [
          'Full interior layout and typesetting',
          'Cover design included',
          'Print-ready PDF plus a screen-optimised PDF version',
          'Editable working files on handover',
        ],
        url: '/pricing/print-design-pretoria',
        notes: 'Priced per page — ask the page count. Minimum 24 pages',
      },
      {
        id: 'magazine-layout',
        name: 'Magazine layout',
        amount: 780,
        unit: 'per-page',
        includes: [
          'Cover concept and full interior layout',
          'Grid, style and typography system set up',
          'Image placement and basic cleanup',
          'Print-ready artwork plus a screen PDF',
        ],
        url: '/pricing/print-design-pretoria',
        notes: 'Priced per page — ask the page count. Minimum 12 pages',
      },
      {
        id: 'catalogue-page',
        name: 'Product catalogue design',
        amount: 780,
        unit: 'per-page',
        includes: [
          'Product grid layout and typesetting',
          'Product images placed and cleaned up',
          'Cover design included',
          'Print-ready artwork plus a screen PDF',
        ],
        url: '/pricing/marketing-materials-pretoria',
        notes: 'Priced per page — ask the page count. Minimum 8 pages',
      },
      {
        id: 'invitation-suite',
        name: 'Wedding / event invitation suite',
        amount: 2950,
        unit: 'from',
        includes: [
          'Invitation concept and final artwork',
          'RSVP and information card designs',
          'Digital WhatsApp version of the invite',
          'Print-ready files with foil or emboss setup where needed',
        ],
        url: '/pricing/print-design-pretoria',
        notes: 'Final price depends on how many pieces the suite needs — ask before quoting',
      },
      {
        id: 'greeting-card',
        name: 'Greeting / holiday card design',
        amount: 1560,
        unit: 'fixed',
        includes: [
          '2 unique options',
          '1 final concept',
          'Outside and inside artwork',
          'Digital e-card version',
          'Print-ready files',
        ],
        url: '/pricing/print-design-pretoria',
      },
      {
        id: 'certificate-design',
        name: 'Certificate design',
        amount: 1290,
        unit: 'fixed',
        includes: [
          '2 unique options',
          '1 final concept',
          'Editable name and date fields',
          'Print-ready files with foil or seal setup where needed',
        ],
        url: '/pricing/print-design-pretoria',
      },
      {
        id: 'calendar-design',
        name: 'Calendar design (wall or desk)',
        amount: 4450,
        unit: 'fixed',
        includes: [
          'Cover plus 12 month layouts',
          'Your photos or artwork placed and cleaned up',
          'South African public holidays set correctly',
          'Print-ready files with binding edge set up',
        ],
        url: '/pricing/print-design-pretoria',
      },
      {
        id: 'price-list',
        name: 'Price list / rate card design',
        amount: 1850,
        unit: 'from',
        includes: [
          '2 unique options',
          'Price list laid out and typeset',
          'Editable file so you can update prices yourself',
          'Print and digital versions',
        ],
        url: '/pricing/marketing-materials-pretoria',
        notes: 'From price covers up to 2 pages — ask the page count before quoting',
      },
      {
        id: 'banner-ad-set',
        name: 'Web / display banner ad set',
        amount: 2450,
        unit: 'fixed',
        includes: [
          'One campaign concept adapted across 6 standard ad sizes',
          'Google and Meta specification sizes covered',
          'Editable working files',
          '2 revision rounds',
        ],
        url: '/pricing/marketing-materials-pretoria',
        notes: 'Static banners. Animated HTML5 versions are quoted separately',
      },
      {
        id: 'doc-template',
        name: 'Document template (Word / Google Docs)',
        amount: 2450,
        unit: 'fixed',
        includes: [
          'Proposal, report or letter template built in Word or Google Docs',
          'Cover page, heading styles and page furniture set up',
          'Placeholder text showing your team where everything goes',
          'Fully editable by your staff without design software',
        ],
        url: '/pricing/graphic-design-pretoria',
      },
    ],
  },
  {
    id: 'packaging',
    name: 'Packaging Design',
    blurb: 'Product packaging and label design.',
    items: [
      {
        id: 'packaging',
        name: 'Label / sleeve design (single product)',
        amount: 4850,
        unit: 'from',
        includes: ['Concept development', 'Print-ready artwork', 'Dieline setup'],
        url: '/pricing/packaging-design-pretoria',
        notes: 'Covers one SKU. Additional pack formats are quoted per format',
      },
      {
        id: 'packaging-carton',
        name: 'Folding carton / box design (single product)',
        amount: 4850,
        unit: 'fixed',
        includes: [
          'Structural dieline built to the printer specification',
          'Full carton artwork across every panel',
          'Barcode and regulatory panel setup',
        ],
        url: '/pricing/packaging-design-pretoria',
      },
      {
        id: 'packaging-range',
        name: 'Packaging range (3–5 products)',
        amount: 9850,
        unit: 'fixed',
        includes: [
          'One master design system applied across the range',
          'Print-ready artwork for every SKU',
          'Variant colour and naming system so the range extends cleanly later',
        ],
        url: '/pricing/packaging-design-pretoria',
      },
      {
        id: 'packaging-full',
        name: 'Full packaging system (6+ products)',
        amount: null,
        unit: 'from',
        includes: [
          'Complete range architecture',
          'Packaging guidelines document',
          'Artwork for every SKU and pack format',
        ],
        url: '/pricing/packaging-design-pretoria',
        notes: 'Scoped on a call — SKU count and pack formats drive the price',
      },
      {
        id: 'sticker-sheet',
        name: 'Sticker / label sheet design',
        amount: 1450,
        unit: 'fixed',
        includes: [
          '2 unique options',
          'Sheet of up to 6 coordinated sticker or label designs',
          'Cut lines set up for the printer',
          'Print-ready files plus digital versions',
        ],
        url: '/pricing/packaging-design-pretoria',
        notes: 'Larger sets are quoted per design',
      },
      {
        id: 'hangtag-bag',
        name: 'Hang tag & shopping bag design',
        amount: 2950,
        unit: 'fixed',
        includes: [
          'Hang tag designed from your existing brand identity, with cut line and eyelet setup',
          'Shopping bag artwork on the supplier dieline',
          'Print-ready files for both pieces',
          'Mockups of tag and bag',
        ],
        url: '/pricing/packaging-design-pretoria',
        notes: 'Assumes an existing brand identity. New packaging concept development is quoted under Packaging Design',
      },
    ],
  },
  {
    id: 'reports',
    name: 'Reports & Publications',
    blurb:
      'Annual reports, integrated and ESG reports, investor material and interactive publications — long documents where the figures, tables and charts have to be right as well as look right.',
    items: [
      {
        id: 'annual-report',
        name: 'Annual report design (up to 24 pages)',
        amount: 18500,
        unit: 'fixed',
        includes: [
          'Cover concept and full interior layout',
          'Financial tables and charts typeset and styled',
          'Print-ready artwork plus a screen-optimised PDF',
        ],
        url: '/pricing/annual-report-design-and-print-pretoria',
        notes: 'Assumes the client supplies final copy and signed-off figures',
      },
      {
        id: 'annual-report-large',
        name: 'Annual report design (25–48 pages)',
        amount: 32000,
        unit: 'fixed',
        includes: [
          'Everything in the 24-page report',
          'Extended chart and infographic set',
          'Section dividers and a navigation system',
        ],
        url: '/pricing/annual-report-design-and-print-pretoria',
      },
      {
        id: 'annual-report-page',
        name: 'Additional report page',
        amount: 650,
        unit: 'per-page',
        includes: ['Layout and typesetting of one further page'],
        url: '/pricing/annual-report-design-and-print-pretoria',
      },
      {
        id: 'integrated-report',
        name: 'Integrated report design',
        amount: null,
        unit: 'from',
        includes: [
          'Integrated reporting structure across financial and non-financial content',
          'Full chart, table and infographic system',
          'Print and digital versions',
        ],
        url: '/pricing/annual-report-design-and-print-pretoria',
        notes: 'Always scoped on a call — page count and content volume drive the price',
      },
      {
        id: 'esg-report',
        name: 'Sustainability / ESG report design (up to 24 pages)',
        amount: 16500,
        unit: 'fixed',
        includes: [
          'Cover concept and interior layout',
          'Sustainability data visualised as charts and infographics',
          'Print-ready artwork plus a screen-optimised PDF',
        ],
        url: '/pricing/sustainability-esg-report-design-services-pretoria',
      },
      {
        id: 'esg-report-basic',
        name: 'Basic ESG report design',
        amount: 7500,
        unit: 'fixed',
        includes: [
          'Up to 12 pages',
          'Chart and data styling',
        ],
        url: '/pricing/sustainability-esg-report-design-services-pretoria',
      },
      {
        id: 'esg-integrated',
        name: 'Integrated annual and ESG report',
        amount: 28000,
        unit: 'fixed',
        includes: [
          'Combined annual and sustainability report',
          'Full data visualisation',
          'Print-ready and digital versions',
        ],
        url: '/pricing/sustainability-esg-report-design-services-pretoria',
      },
      {
        id: 'investor-relations',
        name: 'Investor relations pack / results presentation',
        amount: 9850,
        unit: 'from',
        includes: [
          'Results presentation or investor deck design',
          'Financial charts and data tables styled',
          'Editable master file you can reuse for future results',
        ],
        url: '/pricing/investor-relations-material-design-services-pretoria',
      },
      {
        id: 'ir-deck-basic',
        name: 'Investor deck (basic)',
        amount: 5000,
        unit: 'fixed',
        includes: [
          'Investor presentation laid out',
          'Chart and data styling',
        ],
        url: '/pricing/investor-relations-material-design-services-pretoria',
      },
      {
        id: 'ir-shareholder-report',
        name: 'Premium shareholder report',
        amount: 16000,
        unit: 'fixed',
        includes: [
          'Full shareholder report design',
          'Data visualisation throughout',
          'Print-ready and digital versions',
        ],
        url: '/pricing/investor-relations-material-design-services-pretoria',
      },
      {
        id: 'interactive-pdf',
        name: 'Interactive digital publication (up to 24 pages)',
        amount: 12500,
        unit: 'fixed',
        includes: [
          'Interactive PDF with working navigation and internal links',
          'Clickable contents page and cross-references',
          'File size optimised for email and web',
        ],
        url: '/pricing/interactive-digital-publication-interactive-pdf-design-pretoria',
      },
      {
        id: 'interactive-pdf-starter',
        name: 'Interactive PDF (starter)',
        amount: 3900,
        unit: 'fixed',
        includes: [
          'Up to 8 pages',
          'Clickable navigation and links',
        ],
        url: '/pricing/interactive-digital-publication-interactive-pdf-design-pretoria',
      },
      {
        id: 'interactive-pdf-enterprise',
        name: 'Enterprise interactive publication',
        amount: 16000,
        unit: 'fixed',
        includes: [
          'Extended page count',
          'Embedded media and forms',
          'Full interactive navigation',
        ],
        url: '/pricing/interactive-digital-publication-interactive-pdf-design-pretoria',
      },
      {
        id: 'infographic',
        name: 'Infographic design',
        amount: 2800,
        unit: 'fixed',
        includes: ['One custom infographic', 'Print and screen versions supplied'],
        url: '/pricing/infographic-design-pretoria',
      },
      {
        id: 'data-visualisation',
        name: 'Data visualisation set',
        amount: 6000,
        unit: 'fixed',
        includes: [
          'A set of charts built from your data',
          'One consistent visual system across the set',
          'Editable source files',
        ],
        url: '/pricing/infographic-data-visualization-design-pretoria',
      },
      {
        id: 'internal-comms',
        name: 'Internal communications pack',
        amount: 4850,
        unit: 'from',
        includes: [
          'Campaign concept aimed at an internal audience',
          'Posters, email headers and intranet artwork',
          'Editable templates your team can reuse',
        ],
        url: '/pricing/internal-communications-design-pretoria',
      },
      {
        id: 'internal-memo',
        name: 'Internal memo design',
        amount: 1800,
        unit: 'fixed',
        includes: [
          'Single memo or notice laid out',
          'Editable template supplied',
        ],
        url: '/pricing/internal-communications-design-pretoria',
      },
      {
        id: 'internal-newsletter',
        name: 'Staff newsletter design',
        amount: 4800,
        unit: 'fixed',
        includes: [
          'Multi-page staff newsletter',
          'Editable template for future issues',
        ],
        url: '/pricing/internal-communications-design-pretoria',
      },
      {
        id: 'internal-campaign',
        name: 'Internal campaign pack',
        amount: 9000,
        unit: 'fixed',
        includes: [
          'Full internal campaign concept',
          'Posters, screens, email and intranet artwork',
          'Editable templates your team can reuse',
        ],
        url: '/pricing/internal-communications-design-pretoria',
      },
      {
        id: 'lead-magnet',
        name: 'Lead magnet / e-book design (up to 12 pages)',
        amount: 5850,
        unit: 'fixed',
        includes: [
          'Cover concept and full interior layout',
          'Charts, callouts and pull quotes styled',
          'Screen-optimised PDF sized for email and download',
          'Editable working files',
        ],
        url: '/pricing/content-marketing-pretoria',
        notes: 'Additional pages at R650 per page',
      },
    ],
  },
  {
    id: 'brand-systems',
    name: 'Brand Systems & Environments',
    blurb: 'The pieces that carry a logo out into a working brand across every surface.',
    items: [
      {
        id: 'brand-guidelines',
        name: 'Brand guidelines document',
        amount: 6500,
        unit: 'fixed',
        includes: [
          'Logo usage rules and clear-space',
          'Colour, typography and imagery system',
          'Do and do-not examples any supplier can follow',
        ],
        url: '/pricing/graphic-design-pretoria',
      },
      {
        id: 'social-templates',
        name: 'Social media template pack',
        amount: 2850,
        unit: 'fixed',
        includes: [
          'Editable templates for post, story and cover formats',
          'Set up in Canva or the tool your team already uses',
          'Brand fonts and colours pre-loaded',
        ],
        url: '/pricing/social-media-pretoria',
      },
      {
        id: 'social-essential',
        name: 'Social media package — Essential',
        amount: 3500,
        unit: 'per-month',
        includes: [
          'Monthly template set',
          'Profile and story artwork',
        ],
        url: '/pricing/social-media-pretoria',
      },
      {
        id: 'social-professional',
        name: 'Social media package — Professional',
        amount: 5500,
        unit: 'per-month',
        includes: [
          'Expanded monthly template set',
          'Campaign artwork',
        ],
        url: '/pricing/social-media-pretoria',
      },
      {
        id: 'social-premium',
        name: 'Social media package — Premium',
        amount: 8500,
        unit: 'per-month',
        includes: [
          'Full monthly content design',
          'Campaign and ad artwork',
        ],
        url: '/pricing/social-media-pretoria',
      },
      {
        id: 'event-branding',
        name: 'Event branding pack',
        amount: 5850,
        unit: 'from',
        includes: [
          'Event identity and key visual',
          'Backdrop, banner, signage and name-badge artwork',
          'Programme or invitation design',
        ],
        url: '/pricing/event-branding-design-pretoria',
      },
      {
        id: 'event-branding-full',
        name: 'Full event branding pack',
        amount: 12000,
        unit: 'fixed',
        includes: [
          'Signage, stage and wayfinding artwork',
          'Delegate and print collateral',
        ],
        url: '/pricing/event-branding-design-pretoria',
      },
      {
        id: 'event-branding-premium',
        name: 'Premium event experience',
        amount: 22000,
        unit: 'fixed',
        includes: [
          'Full environmental branding',
          'Large-format and 3D elements',
          'Complete print-ready artwork set',
        ],
        url: '/pricing/event-branding-design-pretoria',
      },
      {
        id: 'vehicle-branding',
        name: 'Vehicle branding design',
        amount: 2950,
        unit: 'fixed',
        includes: ['Artwork laid out to the wrap installer template', 'Every side visualised'],
        url: '/pricing/print-design-pretoria',
      },
      {
        id: 'pullup-banner',
        name: 'Pull-up banner design',
        amount: 1450,
        unit: 'fixed',
        includes: ['Print-ready banner artwork at full size'],
        url: '/pricing/print-design-pretoria',
      },
      {
        id: 'menu-design',
        name: 'Menu design',
        amount: 1850,
        unit: 'from',
        includes: ['Menu layout and typesetting', 'Print-ready artwork'],
        url: '/pricing/print-design-pretoria',
      },
      {
        id: 'merch-artwork',
        name: 'T-shirt / merch artwork',
        amount: 1560,
        unit: 'fixed',
        includes: [
          '2 unique options',
          '1 final design with front and back placement',
          'Print-ready vector artwork with spot colours separated',
          'Mockup on the garment',
          "Files set to your printer's specification",
        ],
        url: '/branding-solutions-pretoria',
        notes: 'Covers one design. Additional designs are quoted per design',
      },
      {
        id: 'corporate-gift-artwork',
        name: 'Corporate gift artwork',
        amount: 2450,
        unit: 'fixed',
        includes: [
          'Your branding adapted to up to 5 gift items',
          'Artwork laid out on each supplier template',
          'Print-ready vector files per item',
          'Mockups of every item',
        ],
        url: '/branding-solutions-pretoria',
      },
      {
        id: 'youtube-pack',
        name: 'YouTube channel art & thumbnail pack',
        amount: 2450,
        unit: 'fixed',
        includes: [
          'Channel banner sized for every device',
          'Profile image and video watermark',
          '6 editable thumbnail templates',
          'Brand fonts and colours pre-loaded',
        ],
        url: '/pricing/social-media-pretoria',
      },
      {
        id: 'podcast-cover',
        name: 'Podcast cover art',
        amount: 1850,
        unit: 'fixed',
        includes: [
          '2 unique cover concepts',
          '3000px master file to podcast platform spec',
          'Sizes for every major platform',
          'Editable episode artwork template',
        ],
        url: '/pricing/social-media-pretoria',
      },
      {
        id: 'office-branding',
        name: 'Wall graphics & office branding',
        amount: 4850,
        unit: 'from',
        includes: [
          'Wall, window and reception artwork designed to your measurements',
          'Designs visualised on photos of your actual space',
          'Installer-ready print files at full size',
          'Material and finish specification for the installer',
        ],
        url: '/branding-solutions-pretoria',
        notes: 'Final price depends on how many surfaces are branded — ask for photos and measurements',
      },
    ],
  },
  {
    id: 'words',
    name: 'Copy & Transcription',
    blurb: 'Written work, priced separately from the design it sits inside.',
    items: [
      {
        id: 'copywriting',
        name: 'Copywriting',
        amount: 950,
        unit: 'per-page',
        includes: ['Original copy written to your brief', 'One round of changes'],
        url: '/pricing/copywriting-services-pretoria-johannesburg',
        notes: 'A page is roughly 400–500 words',
      },
      {
        id: 'copy-editing',
        name: 'Copy editing and proofreading',
        amount: 450,
        unit: 'per-page',
        includes: ['Grammar, consistency and tone edit of copy you already have'],
        url: '/pricing/copy-editing-services-pretoria-johannesburg',
      },
      {
        id: 'transcription',
        name: 'Transcription',
        amount: 25,
        // Per minute of audio, as the note has always said. It was 'fixed',
        // which rendered as a flat "R25" — so a sixty-minute interview quoted
        // at R25 instead of R1,500. Silent underquoting, exactly the kind the
        // agent is told to avoid.
        unit: 'per-minute',
        includes: ['Typed transcript of clear audio', 'Speaker labels where needed'],
        url: '/pricing/transcription-services-pretoria-johannesburg',
        notes: 'Priced per minute of audio. Poor recordings are quoted separately',
      },
    ],
  },
  {
    id: 'print-supply',
    name: 'Printing & Production',
    blurb:
      'We design it, and we can have it printed. Printing is bought in from trade printers, so it is always quoted per job rather than from a list.',
    items: [
      {
        id: 'print-supply',
        name: 'Print supply and production management',
        amount: null,
        unit: 'from',
        includes: [
          'Trade quote obtained against your specification',
          'Artwork prepared and checked before it goes to press',
          'The print run managed through to delivery',
        ],
        url: '/pricing/print-design-pretoria',
        notes:
          'NEVER put a print price in a quote. Ask for quantity, size, stock and finish, and say printing is quoted separately once we have the specs. Design and print always appear as separate lines',
      },
    ],
  },
  {
    id: 'web',
    name: 'Website Design & Development',
    blurb: 'Business websites, e-commerce and ongoing maintenance.',
    items: [
      {
        id: 'website',
        name: 'Business website design',
        amount: 8980,
        unit: 'from',
        includes: ['Custom responsive design', 'Content management', 'Basic SEO setup'],
        url: '/pricing/website-design-pretoria',
        notes: 'Final price depends on page count and functionality — always scope before quoting',
      },
      // The ladder the website-design page has published all along. Without
      // these the agent had exactly one website item — "from R8,980" — so a
      // nine-page job and a three-page job resolved to the same figure, and
      // the larger one was quoted at the smaller one's price. Undercharging by
      // omission is still undercharging, and it is the kind nobody notices.
      // Amounts are the studio's own published prices, not new numbers.
      {
        id: 'website-6',
        name: 'Website design — 6 pages',
        amount: 14780,
        unit: 'fixed',
        includes: [
          '6 custom pages',
          'Mobile responsive design',
          'SEO setup and analytics',
          'Content management',
        ],
        url: '/pricing/website-design-pretoria',
      },
      {
        id: 'website-9',
        name: 'Website design — 9 pages',
        amount: 17420,
        unit: 'fixed',
        includes: [
          '9 custom pages',
          'Mobile responsive design',
          'SEO setup and analytics',
          'Content management',
        ],
        url: '/pricing/website-design-pretoria',
      },
      {
        id: 'website-catalog',
        name: 'Catalogue website',
        amount: 19780,
        unit: 'fixed',
        includes: ['Product catalogue', 'Search and filtering', 'Mobile responsive design'],
        url: '/pricing/website-design-pretoria',
      },
      {
        id: 'popia',
        name: 'POPIA compliance setup',
        amount: 1350,
        unit: 'fixed',
        includes: ['Privacy policy', 'Cookie consent', 'Data handling notices'],
        url: '/pricing/website-design-pretoria',
      },
      {
        id: 'ecommerce',
        name: 'E-commerce website',
        amount: null,
        unit: 'from',
        includes: ['Online store', 'Payment gateway integration', 'Product catalogue'],
        url: '/pricing/ecommerce-pretoria',
        notes: 'Quoted after a scoping call — depends on product count and integrations',
      },
      {
        id: 'mobile-first-site',
        name: 'Mobile-first website',
        amount: 16780,
        unit: 'fixed',
        includes: [
          'Designed for phone screens first, then scaled up',
          'Up to 5 pages',
          'Fast-loading, touch-friendly layouts',
          'Contact form and click-to-call',
        ],
        url: '/pricing/mobile-solutions-pretoria',
      },
      {
        id: 'pwa',
        name: 'Progressive web app (PWA)',
        amount: 23890,
        unit: 'fixed',
        includes: [
          'Installs to the home screen like an app',
          'Works offline for content already loaded',
          'Push notification support',
          'No app-store submission needed',
        ],
        url: '/pricing/mobile-solutions-pretoria',
      },
      {
        id: 'mobile-custom',
        name: 'Custom mobile solution',
        amount: 32980,
        unit: 'fixed',
        includes: [
          'Custom mobile-web build around your workflow',
          'Integration with your existing systems',
          'Admin area to manage content',
          'Training on handover',
        ],
        url: '/pricing/mobile-solutions-pretoria',
      },
      {
        id: 'app-discovery',
        name: 'App discovery and specification',
        amount: 25000,
        unit: 'fixed',
        includes: [
          'Structured sessions to pin down what the app must actually do',
          'Feature list and user flows documented',
          'Screen-by-screen wireframes',
          'A written specification a developer can build and quote from',
        ],
        url: '/pricing/mobile-solutions-pretoria',
        notes: 'The paid first step on any native app. Quote this BEFORE any build price - a build number given without it is a guess',
      },
      {
        id: 'app-native-mvp',
        name: 'Native mobile app - MVP build (iOS and Android)',
        amount: 185000,
        unit: 'from',
        includes: [
          'Cross-platform build running on iOS and Android',
          'The core feature set agreed at discovery',
          'App interface designed and built',
          'Submitted to the Apple and Google stores',
          'Source code handed over',
        ],
        url: '/pricing/mobile-solutions-pretoria',
        notes: 'FROM price only, and only after discovery. Scope drives this number more than anything else - never quote an app from an email alone',
      },
      {
        id: 'app-native-full',
        name: 'Native mobile app with backend and user accounts',
        amount: 320000,
        unit: 'from',
        includes: [
          'Everything in the MVP build',
          'User registration, login and profiles',
          'Server, database and an admin dashboard',
          'Third-party integrations such as payments, maps or messaging',
          'Store submission and source code handed over',
        ],
        url: '/pricing/mobile-solutions-pretoria',
        notes: 'FROM price only, and only after discovery',
      },
      {
        id: 'app-enterprise',
        name: 'Enterprise mobile application',
        amount: null,
        unit: 'from',
        includes: [
          'Scoped against your existing systems and security requirements',
          'Integration with enterprise software already in place',
          'Role-based access and audit trails',
          'Support arrangement agreed separately',
        ],
        url: '/pricing/mobile-solutions-pretoria',
        notes: 'Always scoped on a call. Never put a number on this',
      },
      // Maintenance was published on its own page and absent from this file
      // entirely, so the agent could not quote the studio's only recurring
      // product even when a client asked for it by name.
      {
        id: 'maintenance-essential',
        name: 'Website maintenance — Essential',
        amount: 1500,
        unit: 'per-month',
        includes: ['Software and plugin updates', 'Security monitoring', 'Monthly backups'],
        url: '/pricing/website-maintenance-pretoria',
      },
      {
        id: 'maintenance-professional',
        name: 'Website maintenance — Professional',
        amount: 3500,
        unit: 'per-month',
        includes: ['Everything in Essential', 'Content updates', 'Performance monitoring'],
        url: '/pricing/website-maintenance-pretoria',
      },
      {
        id: 'maintenance-enterprise',
        name: 'Website maintenance — Enterprise',
        amount: 7500,
        unit: 'per-month',
        includes: ['Everything in Professional', 'Priority support', 'Ongoing development time'],
        url: '/pricing/website-maintenance-pretoria',
      },
      {
        id: 'email-template',
        name: 'Email newsletter template (Mailchimp-ready)',
        amount: 3850,
        unit: 'fixed',
        includes: [
          'Custom newsletter design',
          'Built in Mailchimp with editable content blocks',
          'Tested on desktop and mobile mail clients',
          'Brand fonts and colours set up',
          '2 revision rounds',
        ],
        url: '/pricing/email-marketing-pretoria',
      },
    ],
  },
  {
    id: 'marketing',
    name: 'Digital Marketing',
    blurb: 'Retainer-based marketing services, billed monthly.',
    items: [
      {
        id: 'seo-essential',
        name: 'Essential SEO',
        amount: 4850,
        unit: 'per-month',
        includes: [
          'Keyword research',
          'On-page SEO',
          'Technical SEO audit',
          'Monthly performance reports',
        ],
        url: '/pricing/seo-pretoria',
      },
      {
        id: 'seo-professional',
        name: 'Professional SEO',
        amount: 8850,
        unit: 'per-month',
        includes: [
          'Everything in Essential',
          'Content strategy and creation',
          'Link building campaign',
          'Monthly strategy calls',
        ],
        url: '/pricing/seo-pretoria',
      },
      {
        id: 'seo-enterprise',
        name: 'Enterprise SEO',
        amount: 15850,
        unit: 'per-month',
        includes: [
          'Custom SEO strategy',
          'Advanced technical SEO',
          'Authority link building',
          'Weekly strategy calls',
        ],
        url: '/pricing/seo-pretoria',
      },
    ],
  },
  {
    id: 'video',
    name: 'Videography',
    blurb: 'Corporate video, event coverage and brand films.',
    items: [
      {
        id: 'video-event',
        name: 'Event coverage',
        amount: 9850,
        unit: 'fixed',
        includes: [
          'Up to 6 hours on site',
          'Highlights reel (90–120 seconds)',
          'Next-day teaser clip',
          'Raw footage handover',
        ],
        url: '/videography-services-pretoria',
      },
      {
        id: 'video-brand',
        name: 'Brand story video',
        amount: 12500,
        unit: 'fixed',
        includes: [
          'Half-day shoot',
          '60–90 second finished film',
          'Licensed music and colour grade',
          '2 revision rounds',
        ],
        url: '/videography-services-pretoria',
      },
      {
        id: 'video-corporate',
        name: 'Corporate video package',
        amount: 21500,
        unit: 'fixed',
        includes: [
          'Full-day two-camera shoot',
          'Scripting and interview direction',
          '2–3 minute main film',
          'Three social cutdowns',
          '3 revision rounds',
        ],
        url: '/videography-services-pretoria',
      },
      {
        id: 'logo-sting',
        name: 'Animated logo sting',
        amount: 2950,
        unit: 'fixed',
        includes: [
          'Your logo animated as a 3–5 second intro/outro',
          'Full HD and 4K MP4 files',
          'Transparent-background version for video editors',
          'Licensed sound effect synced to the animation',
        ],
        url: '/pricing/corporate-video-pretoria',
      },
      {
        id: 'social-video-pack',
        name: 'Short-form social video editing pack',
        amount: 4850,
        unit: 'fixed',
        includes: [
          '4 vertical videos edited from footage you supply',
          'Up to 60 seconds each',
          'Captions and on-screen text',
          'Licensed music',
          'Exports sized for every platform',
        ],
        url: '/pricing/social-media-pretoria',
      },
      {
        id: 'explainer-video',
        name: 'Explainer / animation video',
        amount: null,
        unit: 'from',
        includes: [
          'Script development support',
          'Storyboard signed off before animation starts',
          'Voiceover artist sourced and directed',
          'Finished animation with licensed music',
          'Exports sized for every platform',
        ],
        url: '/pricing/corporate-video-pretoria',
        notes: 'Always scoped on a call — length and animation style drive the price',
      },
    ],
  },
  {
    id: 'photo',
    name: 'Photography',
    blurb: 'Commercial photography — product, corporate and event.',
    items: [
      {
        id: 'photo-product',
        name: 'Product photography',
        amount: 3850,
        unit: 'fixed',
        includes: [
          'Up to 15 products, studio lit',
          'Multiple angles per product',
          'Retouched, web-ready files',
        ],
        url: '/photography-services-pretoria',
      },
      {
        id: 'photo-event',
        name: 'Event photography',
        amount: 4950,
        unit: 'fixed',
        includes: [
          'Up to 5 hours coverage',
          'Same-week gallery delivery',
          'Full resolution originals',
        ],
        url: '/photography-services-pretoria',
      },
      {
        id: 'photo-corporate',
        name: 'Corporate / team shoot',
        amount: 6450,
        unit: 'fixed',
        includes: [
          'Half-day on site',
          'Up to 20 staff headshots',
          'Office and culture candids',
          '2 revision rounds',
        ],
        url: '/photography-services-pretoria',
      },
      {
        id: 'photo-retouch',
        name: 'Photo retouching',
        amount: 450,
        unit: 'per-image',
        includes: [
          'Advanced retouch of images you supply',
          'Background removal or cleanup where needed',
          'Colour correction to a consistent standard',
          'High-resolution and web versions of each image',
        ],
        url: '/pricing/photography-pretoria',
        notes: 'Minimum 5 images per order. Heavy restoration work is quoted separately',
      },
    ],
  },
  {
    id: 'translation',
    name: 'Translation & Localisation',
    blurb:
      'Professional translation and the layout work that has to follow it, for publications that ship in more than one language.',
    items: [
      {
        id: 'translation-word',
        name: 'Professional translation',
        amount: 2.5,
        unit: 'per-word',
        includes: [
          'Translated by a professional translator working into their own language',
          'Suited to corporate, governance and technical publication content',
          'Terminology kept consistent across the whole document',
          'Delivered as editable text, ready for layout',
        ],
        url: '/pricing/copywriting-services-pretoria-johannesburg',
        notes: 'Per SOURCE word - ask for the English word count before quoting. Laying the translation out is quoted separately under typesetting-translated',
      },
      {
        id: 'typesetting-translated',
        name: 'Translated edition typesetting',
        amount: 175,
        unit: 'per-page',
        includes: [
          'Approved translation flowed into the existing design',
          'Text reflow, spacing and hyphenation corrected for the language',
          'Tables, captions and charts adjusted to fit',
          'Page balancing and a final layout check',
        ],
        url: '/pricing/print-design-pretoria',
        notes: 'Per page, per language. Translated text usually runs longer than the English, so allow more pages than the source',
      },
    ],
  },
  {
    id: 'production',
    name: 'Production, Print Management & Delivery',
    blurb:
      'The lines a large job needs and a small one does not: concept routes, coordination, prepress, branded media and getting the finished work to the door.',
    items: [
      {
        id: 'concept-development',
        name: 'Creative concept development',
        amount: 10000,
        unit: 'from',
        includes: [
          'Several genuinely different design routes, not variations of one',
          'Cover direction, typography and colour system for each route',
          'Page architecture shown in context',
          'Presented for selection before production starts',
        ],
        url: '/pricing/graphic-design-pretoria',
        notes: 'For publications and campaigns where the client picks between directions. From price covers five routes',
      },
      {
        id: 'project-management',
        name: 'Project management and consultation',
        amount: 10000,
        unit: 'from',
        includes: [
          'One point of contact for the whole project',
          'Review rounds scheduled and feedback consolidated',
          'Translators, printers and suppliers coordinated',
          'Approvals tracked and production overseen through to delivery',
        ],
        url: '/pricing/graphic-design-pretoria',
        notes: 'Quote this on any job with outside suppliers or more than two review rounds. The time is real and is otherwise absorbed unpaid',
      },
      {
        id: 'prepress',
        name: 'Prepress and print preparation',
        amount: 4000,
        unit: 'from',
        includes: [
          'Print-ready PDFs with bleed and crop marks',
          'Image resolution, colour space and font checks',
          'Final artwork check before release to the printer',
          'Printer proof prepared and reviewed',
        ],
        url: '/pricing/print-design-pretoria',
      },
      {
        id: 'digital-editions',
        name: 'Digital publication versions',
        amount: 2500,
        unit: 'fixed',
        includes: [
          'High-resolution master PDF',
          'Compressed version sized for a website',
          'Further compressed version sized for email',
          'Supplied for each language edition',
        ],
        url: '/pricing/print-design-pretoria',
      },
      {
        id: 'usb-8gb',
        name: 'USB flash drive supply (8GB)',
        amount: 110,
        unit: 'per-unit',
        includes: [
          '8GB USB flash drives sourced and supplied',
        ],
        url: '/pricing/marketing-materials-pretoria',
        notes: 'Per drive. Price moves with capacity and quantity - confirm both before quoting',
      },
      {
        id: 'usb-branding',
        name: 'USB UV branding',
        amount: 25,
        unit: 'per-unit',
        includes: [
          'Your logo UV-printed onto each drive',
          'Artwork set up to the supplier template',
        ],
        url: '/pricing/marketing-materials-pretoria',
        notes: 'Per drive, on drives we supply',
      },
      {
        id: 'usb-loading',
        name: 'USB file loading and verification',
        amount: 25,
        unit: 'per-unit',
        includes: [
          'Final files copied onto every drive',
          'Organised into clearly named folders',
          'Each drive opened and checked after copying',
        ],
        url: '/pricing/marketing-materials-pretoria',
        notes: 'Per drive',
      },
      {
        id: 'packaging-delivery',
        name: 'Packaging, handling and local delivery',
        amount: 2500,
        unit: 'from',
        includes: [
          'Finished work packed for transport',
          'Collection from the printer or supplier',
          'Delivery to one local address',
        ],
        url: '/pricing/print-design-pretoria',
        notes: 'From price covers one local delivery. Outlying areas and multiple drops are quoted on the job',
      },
    ],
  },
  {
    id: 'studio',
    name: 'Studio Time',
    blurb: 'Hourly senior studio time for small jobs and once-off requests that do not fit any fixed price item.',
    items: [
      {
        id: 'custom-hourly',
        name: 'Studio hourly rate',
        amount: 1150,
        unit: 'per-hour',
        includes: [
          'Senior designer time on your job',
          'Work handed over in editable files',
          'A time log supplied with the invoice',
        ],
        url: '/pricing',
        notes: 'One-hour minimum, then billed in half-hour steps. An estimate is agreed before work starts. Use only when no fixed item fits',
      },
    ],
  },
];

/** Flat lookup for the agent and for rendering. */
export const ALL_ITEMS: PriceItem[] = [...PRICING.flatMap((c) => c.items), ...EXTRAS];

export function findPriceItem(id: string): PriceItem | undefined {
  return ALL_ITEMS.find((i) => i.id === id);
}

export function formatPrice(item: Pick<PriceItem, 'amount' | 'unit'>): string {
  if (item.amount === null) return 'Quoted on request';
  const n = item.amount.toLocaleString('en-ZA');
  switch (item.unit) {
    case 'from':
      return `From ${CURRENCY_SYMBOL}${n}`;
    case 'per-month':
      return `${CURRENCY_SYMBOL}${n}/month`;
    case 'per-page':
      return `${CURRENCY_SYMBOL}${n} per page`;
    case 'per-image':
      return `${CURRENCY_SYMBOL}${n} per image`;
    case 'per-word':
      return `${CURRENCY_SYMBOL}${n} per word`;
    case 'per-hour':
      return `${CURRENCY_SYMBOL}${n} per hour`;
    case 'per-minute':
      return `${CURRENCY_SYMBOL}${n} per minute`;
    case 'per-unit':
      return `${CURRENCY_SYMBOL}${n} each`;
    default:
      return `${CURRENCY_SYMBOL}${n}`;
  }
}

/**
 * The price list rendered as plain text for the AI system prompt.
 * Deterministic ordering — important for prompt caching.
 */
export function priceListForPrompt(): string {
  const lines: string[] = [];
  for (const cat of PRICING) {
    lines.push(`\n## ${cat.name}`);
    lines.push(cat.blurb);
    for (const item of cat.items) {
      const price = formatPrice(item);
      lines.push(
        `- [${item.id}] ${item.name} — ${price}` +
          (item.notes ? ` (NOTE: ${item.notes})` : '') +
          `\n    includes: ${item.includes.join('; ')}`,
      );
    }
  }
  lines.push('\n## Extras');
  for (const item of EXTRAS) {
    lines.push(`- [${item.id}] ${item.name} — ${formatPrice(item)}`);
  }
  lines.push('\n## Included with every project');
  for (const inc of STANDARD_INCLUSIONS) lines.push(`- ${inc}`);
  return lines.join('\n');
}
