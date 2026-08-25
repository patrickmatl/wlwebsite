/**
 * SINGLE SOURCE OF TRUTH for business identity data (NAP: Name, Address, Phone).
 *
 * Google cross-checks the name/address/phone published on the site against the
 * Google Business Profile and citation sites. Inconsistent NAP suppresses local
 * rankings. Before this file existed, the site published two different phone
 * numbers and two different street addresses.
 *
 * If any detail changes, change it HERE and only here. Do not hardcode contact
 * details anywhere else.
 */

export const BUSINESS = {
  name: 'WL CreationX',
  legalName: 'WL CreationX',
  url: 'https://wlcreationx.co.za',
  logo: 'https://wlcreationx.co.za/images/brand/logo-512.png',
  ogImage: 'https://wlcreationx.co.za/images/og-image.jpg',
  email: 'info@wlcreationx.co.za',

  // Phone — the number the WhatsApp / call buttons actually dial.
  phoneDisplay: '+27 62 369 3789',
  phoneE164: '+27623693789',
  whatsappNumber: '27623693789',

  // Address — confirmed current office (2026-08).
  address: {
    building: 'Park Lane West Building',
    street: '194 Bancor Ave',
    suburb: 'Waterkloof Glen',
    city: 'Pretoria',
    region: 'Gauteng',
    postalCode: '0181',
    countryCode: 'ZA',
    countryName: 'South Africa',
  },

  // Approximate coordinates for Waterkloof Glen, Pretoria.
  // TODO(owner): fine-tune from the exact Google Maps pin for the office.
  geo: {
    latitude: -25.7846,
    longitude: 28.2905,
  },

  foundedYear: 2013,
  registeredYear: 2016,

  openingHours: [
    { days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '08:00', closes: '17:00' },
    { days: ['Saturday'], opens: '08:00', closes: '15:00' },
  ],

  sameAs: [
    'https://www.facebook.com/wlcreationx',
    'https://www.instagram.com/wlcreationx',
    'https://www.linkedin.com/company/wlcreationx',
  ],

  areaServed: [
    'Pretoria',
    'Pretoria East',
    'Pretoria North',
    'Pretoria West',
    'Centurion',
    'Hatfield',
    'Brooklyn',
    'Menlyn',
    'Arcadia',
    'Silver Lakes',
    'Lynnwood',
    'Waterkloof',
    'Johannesburg',
    'Sandton',
    'Midrand',
    'Gauteng',
  ],
} as const;

/** "Park Lane West Building, 194 Bancor Ave, Waterkloof Glen, Pretoria, 0181" */
export const FULL_ADDRESS = `${BUSINESS.address.building}, ${BUSINESS.address.street}, ${BUSINESS.address.suburb}, ${BUSINESS.address.city}, ${BUSINESS.address.postalCode}`;

/** Schema.org PostalAddress object, ready to embed in any JSON-LD block. */
export const POSTAL_ADDRESS = {
  '@type': 'PostalAddress',
  streetAddress: `${BUSINESS.address.building}, ${BUSINESS.address.street}`,
  addressLocality: BUSINESS.address.city,
  addressRegion: BUSINESS.address.region,
  postalCode: BUSINESS.address.postalCode,
  addressCountry: BUSINESS.address.countryCode,
} as const;

/** Schema.org GeoCoordinates object. */
export const GEO = {
  '@type': 'GeoCoordinates',
  latitude: BUSINESS.geo.latitude,
  longitude: BUSINESS.geo.longitude,
} as const;

/** Schema.org OpeningHoursSpecification array. */
export const OPENING_HOURS = BUSINESS.openingHours.map((h) => ({
  '@type': 'OpeningHoursSpecification',
  dayOfWeek: h.days,
  opens: h.opens,
  closes: h.closes,
}));

/**
 * Canonical LocalBusiness JSON-LD node. Spread/extend for page-specific
 * variants; never re-declare NAP fields by hand.
 */
export const LOCAL_BUSINESS = {
  '@type': 'LocalBusiness',
  '@id': `${BUSINESS.url}/#business`,
  name: BUSINESS.name,
  url: BUSINESS.url,
  image: BUSINESS.ogImage,
  telephone: BUSINESS.phoneDisplay,
  email: BUSINESS.email,
  address: POSTAL_ADDRESS,
  geo: GEO,
  openingHoursSpecification: OPENING_HOURS,
  sameAs: BUSINESS.sameAs,
  areaServed: BUSINESS.areaServed,
  foundingDate: String(BUSINESS.foundedYear),
} as const;
