/**
 * SINGLE SOURCE OF TRUTH for every price WL CreationX quotes.
 *
 * The AI quote agent is only ever allowed to quote from this file — it is
 * given this list verbatim and instructed that inventing or adjusting a price
 * is forbidden. That is what keeps an automated quote from committing the
 * business to a number nobody approved.
 *
 * All amounts are in South African Rand (ZAR), excluding VAT unless stated.
 * When a price changes, change it HERE and the website, the quote engine and
 * the blog guides all follow.
 */

export type PriceUnit = 'fixed' | 'from' | 'per-month' | 'per-page' | 'per-image' | 'per-word';

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
  'Two revision rounds included in the quoted price',
  'Final artwork supplied in open, editable file formats you own',
  'Colour palettes, codes and fonts handed over with the final files',
  'Custom design — no templates',
  'A named project manager for the duration of the project',
] as const;

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
        amount: 780,
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
        amount: 3230,
        unit: 'fixed',
        includes: ['Custom PowerPoint template', '1 final concept', '5 template slides'],
        url: '/pricing/presentation-design-services-pretoria',
        notes: 'Additional slides can be added',
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
        name: 'Packaging / label design',
        amount: 2500,
        unit: 'from',
        includes: ['Concept development', 'Print-ready artwork', 'Dieline setup'],
        url: '/pricing/packaging-design-pretoria',
        notes: 'Final price depends on the number of SKUs and pack formats',
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
      {
        id: 'ecommerce',
        name: 'E-commerce website',
        amount: null,
        unit: 'from',
        includes: ['Online store', 'Payment gateway integration', 'Product catalogue'],
        url: '/pricing/ecommerce-pretoria',
        notes: 'Quoted after a scoping call — depends on product count and integrations',
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
