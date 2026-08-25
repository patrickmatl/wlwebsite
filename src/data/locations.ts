import { Location } from '@/types';
import { BUSINESS, FULL_ADDRESS } from '@/data/business';

/**
 * City pages describe ONE business: the WL CreationX studio in Waterkloof Glen,
 * Pretoria. Every city other than Pretoria is served from that studio — on-site
 * across Gauteng, remotely for the rest of South Africa. There are no branch
 * offices, no per-city phone numbers or emails, and no testimonials on these
 * pages. Keep it that way.
 */

interface CityProfile {
  id: string;
  city: string;
  region: string;
  /** Real suburbs / districts we produce work for in this city. */
  areas: string[];
  /** How this city is actually served from Pretoria. */
  serviceModel: string;
  /** Genuinely city-specific intro paragraph — not a token swap. */
  intro: string;
  /** City-specific "about" paragraphs. */
  aboutParagraphs: string[];
  /** City-specific FAQ replacing the generic first question. */
  cityFaq: { question: string; answer: string };
  /** Only the Pretoria entry carries the studio's coordinates. */
  isHomeCity?: boolean;
}

const SHARED_KEY_POINTS = [
  'One studio in Waterkloof Glen, Pretoria — no branch offices, no middlemen',
  'Designing for South African businesses since 2013',
  'Graphic design, web design, branding and packaging under one roof',
  'On-site consultations across Gauteng; video calls for the rest of the country',
  'Print jobs produced in Pretoria and couriered nationwide',
  'Direct communication with the people doing the work',
];

const SHARED_BENEFITS = [
  {
    title: 'One Studio, Nationwide Reach',
    description:
      'All work is produced by our Pretoria team, whether we meet you in person in Gauteng or over a video call anywhere in South Africa.',
  },
  {
    title: 'A Decade of Practice',
    description:
      'WL CreationX has been designing for South African businesses since 2013 — brand identities, websites, packaging and print.',
  },
  {
    title: 'Straightforward Process',
    description:
      'Briefing, concept, revisions, delivery — with clear timelines agreed up front and one point of contact throughout.',
  },
];

const SHARED_FAQS = [
  {
    question: 'How long does a typical design project take?',
    answer:
      'It depends on scope: a logo and basic brand identity usually runs two to three weeks, and a complete website around six to eight weeks. We agree a written timeline with you before work starts, and you can see current package details on our pricing page.',
  },
  {
    question: 'Do you offer support after a project is finished?',
    answer:
      'Yes. We offer website maintenance plans and remain available for artwork updates, reprints and brand extensions after handover. Everything is handled by the same Pretoria team that built your project.',
  },
];

const createLocation = (profile: CityProfile): Location => {
  const { id, city, region, areas, isHomeCity } = profile;
  const primaryAreas = areas.slice(0, 5);
  const secondaryAreas = areas.slice(5);

  return {
    id,
    slug: id,
    city,
    title: `Design Services for ${city} Businesses`,
    subtitle: isHomeCity
      ? 'Graphic design, web design and branding from our Waterkloof Glen studio'
      : `Graphic design, web design and branding — ${profile.serviceModel.toLowerCase()}`,
    description: `Graphic design, website design, branding and packaging design for ${city} businesses, delivered by WL CreationX from our Pretoria studio.`,
    region,
    areas,
    serviceAreas: {
      primary: primaryAreas,
      secondary: secondaryAreas,
    },
    nearbyAreas: isHomeCity
      ? ['Centurion', 'Midrand', 'Irene', 'Silver Lakes']
      : [`Greater ${city} area (remote and courier delivery)`],
    metaTitle: `Design Services ${city} | WL CreationX`,
    metaDescription: `Graphic design, web design, branding and packaging for ${city} businesses — delivered by WL CreationX from our Pretoria studio, on-site in Gauteng and remotely nationwide.`,
    content: {
      h1: `Design Services for ${city} Businesses`,
      h2: {
        about: `About WL CreationX`,
        services: `Design Services for ${city} Businesses`,
        expertise: `What We Bring to ${city} Projects`,
        process: `Our Design Process`,
        industries: `Industries We Work With`,
        portfolio: `Recent Work`,
        testimonials: `Client Feedback`,
        faq: `Frequently Asked Questions`,
        contact: `Contact WL CreationX`,
      },
      intro: profile.intro,
      aboutArea: {
        h2: `About WL CreationX`,
        content: profile.aboutParagraphs.join('\n\n'),
        keyPoints: SHARED_KEY_POINTS,
        benefits: SHARED_BENEFITS,
      },
      ...(isHomeCity
        ? {
            coordinates: {
              latitude: String(BUSINESS.geo.latitude),
              longitude: String(BUSINESS.geo.longitude),
            },
          }
        : {}),
      services: {
        h2: `Design Services for ${city} Businesses`,
        intro: isHomeCity
          ? 'The core services we deliver from our Pretoria studio:'
          : `The core services we deliver for ${city} businesses from our Pretoria studio:`,
        mainService: 'Design Services',
        list: [
          {
            h3: 'Graphic Design',
            content: isHomeCity
              ? 'Logos, brand identities, marketing collateral and print artwork, designed at our Waterkloof Glen studio.'
              : `Logos, brand identities, marketing collateral and print artwork for ${city} businesses, designed in Pretoria and delivered digitally or by courier.`,
            slug: 'graphic-design',
            features: [
              'Logo design and brand identity',
              'Marketing materials and collateral',
              'Social media graphics and digital assets',
              'Print design and advertising artwork',
              'Infographics and visual content',
              'Corporate stationery and business cards',
            ],
            benefits: [
              'A consistent, professional brand image',
              'Print-ready artwork with correct specifications',
              'Files supplied in the formats you need',
              'One team for concept through to final artwork',
              'Revisions built into every quote',
              'Direct access to the designers on your project',
            ],
          },
          {
            h3: 'Website Design',
            content: isHomeCity
              ? 'Modern, responsive websites planned, designed and built by our Pretoria team.'
              : `Modern, responsive websites for ${city} businesses — planned over video calls, built by our Pretoria team, and launched with your input at every stage.`,
            slug: 'web-design',
            features: [
              'Custom website design',
              'E-commerce solutions',
              'Responsive mobile design',
              'User experience planning',
              'Content management systems',
              'Website maintenance and support',
            ],
            benefits: [
              'A site that works on every screen size',
              'Content you can update yourself',
              'Clear structure for visitors and search engines',
              'Design and development by one accountable team',
              'Staged reviews before anything goes live',
              'Optional ongoing maintenance plans',
            ],
          },
        ],
      },
      expertise: {
        content: profile.serviceModel,
        areas: [
          {
            title: 'Brand and Graphic Design',
            description:
              'Identity systems, marketing collateral and print artwork built to hold up across every format you use.',
          },
          {
            title: 'Web Design and Development',
            description:
              'Responsive websites planned around your content and customers, built and maintained by the same team.',
          },
          {
            title: 'Packaging and Print',
            description:
              'Packaging design and print production managed from Pretoria, with courier delivery anywhere in South Africa.',
          },
        ],
      },
      industries: {
        content: 'We design for a broad mix of South African businesses, including:',
        sectors: [
          'Retail & E-commerce',
          'Professional Services',
          'Healthcare & Medical',
          'Food & Beverage',
          'Technology & IT',
          'Real Estate',
          'Education',
          'Manufacturing',
        ],
        descriptions: [
          {
            industry: 'Retail & E-commerce',
            description: 'Brand identities, packaging and online stores for retailers',
          },
          {
            industry: 'Professional Services',
            description: 'Brand identity and web design for service providers',
          },
          {
            industry: 'Healthcare & Medical',
            description: 'Clear, professional marketing materials for practices',
          },
        ],
      },
      testimonials: [],
      faqs: [
        profile.cityFaq,
        ...SHARED_FAQS,
      ],
      contact: {
        h2: 'Contact WL CreationX',
        phone: BUSINESS.phoneDisplay,
        email: BUSINESS.email,
        address: isHomeCity
          ? `${FULL_ADDRESS}, South Africa`
          : `Served from our Pretoria studio: ${FULL_ADDRESS}, South Africa`,
        hours: 'Monday – Friday: 08:00 – 17:00, Saturday: 08:00 – 15:00',
        cta: {
          primary: 'Get in Touch',
          secondary: [
            {
              url: '/project-showcase-pretoria',
              text: 'View Our Work',
            },
            {
              url: '/pricing',
              text: 'See Pricing & Packages',
            },
          ],
        },
      },
    },
  };
};

export const locations: Location[] = [
  createLocation({
    id: 'pretoria',
    city: 'Pretoria',
    region: 'Gauteng',
    isHomeCity: true,
    areas: [
      'Centurion',
      'Menlyn',
      'Brooklyn',
      'Hatfield',
      'Waterkloof',
      'Lynnwood',
      'Arcadia',
      'Sunnyside',
      'Montana',
      'Garsfontein',
    ],
    serviceModel:
      'Pretoria is home base: our studio is in Waterkloof Glen, and we meet clients in person across the city and Centurion.',
    intro:
      'WL CreationX is a Pretoria design studio based at Park Lane West Building in Waterkloof Glen. Since 2013 we have designed logos, brand identities, websites and packaging for businesses across the city — from Hatfield startups to established firms in Brooklyn, Menlyn and Centurion. Because we are local, you can sit down with us in person at any stage of your project.',
    aboutParagraphs: [
      'WL CreationX started in Pretoria in 2013 and has stayed here since. Our studio in Waterkloof Glen is where every project is designed and produced — there are no outsourced teams and no branch offices.',
      'Being based in the city means Pretoria clients get the most direct version of our service: face-to-face briefings, in-person artwork reviews, and quick turnarounds on print collection or delivery anywhere from Centurion to Montana.',
    ],
    cityFaq: {
      question: 'Can we meet you in person in Pretoria?',
      answer:
        'Yes. Our studio is at Park Lane West Building, 194 Bancor Ave, Waterkloof Glen. We hold briefings and artwork reviews at the studio or at your premises anywhere in Pretoria and Centurion — just book a time by phone or email first.',
    },
  }),
  createLocation({
    id: 'johannesburg',
    city: 'Johannesburg',
    region: 'Gauteng',
    areas: [
      'Sandton',
      'Rosebank',
      'Randburg',
      'Fourways',
      'Bryanston',
      'Midrand',
      'Roodepoort',
      'Northcliff',
      'Parktown',
      'Melville',
    ],
    serviceModel:
      'Johannesburg is served on-site from our Pretoria studio: we travel down the N1 for briefings and reviews, and handle the day-to-day work remotely.',
    intro:
      'WL CreationX serves Johannesburg businesses from our studio in Waterkloof Glen, Pretoria — under an hour away on the N1. We regularly travel to Sandton, Rosebank, Midrand and surrounding areas for briefings, brand workshops and artwork sign-offs, while design and development work happens at our Pretoria studio. To be clear: we do not have a Johannesburg office; you get a Gauteng team that comes to you when it matters and works efficiently in between.',
    aboutParagraphs: [
      'We have worked with Johannesburg businesses for years without ever pretending to have an office there. Our studio is in Pretoria, and the short trip between the cities means on-site meetings in Sandton, Rosebank or Midrand are easy to arrange around the milestones that benefit from them — kick-off briefings, concept presentations and final sign-offs.',
      'Between meetings, projects run exactly as they do for our Pretoria clients: the same designers, the same process, with progress shared by email and video call. Printed work is produced in Pretoria and delivered to your Johannesburg premises by courier or by hand.',
    ],
    cityFaq: {
      question: 'Do you have an office in Johannesburg?',
      answer:
        'No — our only studio is in Waterkloof Glen, Pretoria. Because Johannesburg is close by, we travel to you for briefings, presentations and sign-offs anywhere in the greater Johannesburg area, and run the rest of the project from Pretoria.',
    },
  }),
  createLocation({
    id: 'cape-town',
    city: 'Cape Town',
    region: 'Western Cape',
    areas: [
      'City Bowl',
      'Sea Point',
      'Green Point',
      'Woodstock',
      'Observatory',
      'Claremont',
      'Constantia',
      'Century City',
      'Bellville',
    ],
    serviceModel:
      'Cape Town is served remotely from our Pretoria studio: video-call briefings, online reviews, and courier delivery for printed work.',
    intro:
      'WL CreationX works with Cape Town businesses remotely from our studio in Pretoria. Briefings and concept presentations happen over video calls, artwork is reviewed and approved online, and finished print work is couriered to your door in the City Bowl, the southern suburbs or the northern suburbs. We do not have a Cape Town office — and for most branding, web and design projects, distance makes no practical difference: the process is structured so you see and approve everything at each stage, wherever you are.',
    aboutParagraphs: [
      'Design is work that travels well. For Cape Town clients we run the whole engagement remotely from Pretoria: a video-call briefing to understand your business, concepts presented on screen, and revisions turned around by email until the work is right.',
      'Websites are built and launched entirely online. For print and packaging, we prepare production-ready artwork in Pretoria and either courier finished goods to you or supply files directly to a printer of your choice in the Western Cape.',
    ],
    cityFaq: {
      question: 'How do you work with Cape Town clients from Pretoria?',
      answer:
        'Entirely remotely. Briefings and presentations happen over video calls, artwork approvals happen by email, and websites launch online. Printed items are either couriered from Pretoria or printed in Cape Town from the production files we supply.',
    },
  }),
  createLocation({
    id: 'durban',
    city: 'Durban',
    region: 'KwaZulu-Natal',
    areas: [
      'Umhlanga',
      'Ballito',
      'Berea',
      'Morningside',
      'Westville',
      'Pinetown',
      'La Lucia',
      'Glenwood',
      'Durban North',
    ],
    serviceModel:
      'Durban is served remotely from our Pretoria studio: video-call briefings, online approvals, and courier delivery for printed work.',
    intro:
      'WL CreationX serves Durban and the KwaZulu-Natal North Coast remotely from our Pretoria studio. Whether your business is in Umhlanga, Ballito, Westville or central Durban, projects run over video calls and email: we brief on screen, present concepts online, and refine until you sign off. We do not have a Durban office — printed work is produced in Pretoria and couriered to you, or supplied as production-ready files to a KZN printer you prefer.',
    aboutParagraphs: [
      'Our Durban clients work with the same Pretoria team that handles every WL CreationX project. The engagement starts with a video-call briefing, moves through on-screen concept presentations, and ends with final files delivered digitally — or printed goods couriered to your premises anywhere in the greater Durban area.',
      'Because nothing is outsourced, you deal directly with the designers doing the work, and the process is the same whether you are around the corner from our studio or on the KZN coast.',
    ],
    cityFaq: {
      question: 'Do you travel to Durban for meetings?',
      answer:
        'Durban projects run remotely from our Pretoria studio as standard — video-call briefings, online presentations and email approvals. If a project genuinely needs an on-site visit, we can discuss travel arrangements as part of the quote.',
    },
  }),
];
