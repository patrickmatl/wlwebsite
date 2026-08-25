import { Location } from '@/types';

interface Region {
  name: string;
  slug: string;
  locations: Location[];
}

/**
 * Real service footprint only. WL CreationX has ONE studio, in Waterkloof Glen,
 * Pretoria. Gauteng is served on-site from that studio; Cape Town and Durban
 * are served remotely. Do not add provinces or cities we do not actively serve
 * — thin location pages were part of the penalty this site is recovering from.
 */
export const regions: Region[] = [
  {
    name: 'Gauteng',
    slug: 'gauteng',
    locations: [
      {
        id: 'pretoria',
        city: 'Pretoria',
        slug: 'pretoria',
        region: 'Gauteng',
        title: 'Design Services in Pretoria',
        description:
          'Graphic design, web design and branding from our studio in Waterkloof Glen, Pretoria — with in-person consultations across the city.',
        subLocations: [
          {
            name: 'Centurion',
            slug: 'centurion',
            description: 'Design services for Centurion businesses, minutes from our Pretoria studio',
          },
          {
            name: 'Menlyn',
            slug: 'menlyn',
            description: 'Design services for businesses in Menlyn and Pretoria East',
          },
        ],
      },
      {
        id: 'johannesburg',
        city: 'Johannesburg',
        slug: 'johannesburg',
        region: 'Gauteng',
        title: 'Design Services in Johannesburg',
        description:
          'Graphic design, web design and branding for Johannesburg businesses — served on-site from our Pretoria studio.',
        subLocations: [
          {
            name: 'Sandton',
            slug: 'sandton',
            description: 'Design services for Sandton businesses, with on-site meetings from Pretoria',
          },
          {
            name: 'Rosebank',
            slug: 'rosebank',
            description: 'Design services for Rosebank businesses, with on-site meetings from Pretoria',
          },
        ],
      },
    ],
  },
  {
    name: 'Western Cape',
    slug: 'western-cape',
    locations: [
      {
        id: 'cape-town',
        city: 'Cape Town',
        slug: 'cape-town',
        region: 'Western Cape',
        title: 'Design Services for Cape Town',
        description:
          'Graphic design, web design and branding for Cape Town businesses — delivered remotely from our Pretoria studio.',
        subLocations: [],
      },
    ],
  },
  {
    name: 'KwaZulu-Natal',
    slug: 'kwazulu-natal',
    locations: [
      {
        id: 'durban',
        city: 'Durban',
        slug: 'durban',
        region: 'KwaZulu-Natal',
        title: 'Design Services for Durban',
        description:
          'Graphic design, web design and branding for Durban businesses — delivered remotely from our Pretoria studio.',
        subLocations: [],
      },
    ],
  },
];
