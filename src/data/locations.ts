import { Location, ServiceVariation } from '@/types';

const createServiceVariations = (city: string, areas: string[]): ServiceVariation[] => [
  {
    slug: 'graphic-design-company',
    title: `${city} Graphic Design Company | Professional Design Services`,
    description: `Award-winning graphic design services in ${city}. Professional branding, logo design, and visual solutions for businesses in ${areas.join(', ')} and surrounding areas.`,
    metaTitle: `Best Graphic Design Company in ${city} | Professional Design Services`,
    metaDescription: `Looking for a professional graphic design company in ${city}? WL CreationX offers expert graphic design services for businesses in ${areas.slice(0, 3).join(', ')} and beyond. Get a free consultation today!`
  },
  {
    slug: 'website-design-company',
    title: `${city} Website Design Company | Professional Web Development`,
    description: `Expert website design and development services in ${city}. Custom web solutions for businesses in ${areas.join(', ')} and surrounding areas.`,
    metaTitle: `Leading Website Design Company in ${city} | Custom Web Development`,
    metaDescription: `Need a professional website design company in ${city}? WL CreationX creates stunning, responsive websites for businesses in ${areas.slice(0, 3).join(', ')} and beyond. Get your free website quote today!`
  },
  {
    slug: 'branding-agency',
    title: `${city} Branding Agency | Professional Brand Design Services`,
    description: `Strategic branding and design services in ${city}. Complete brand solutions for businesses in ${areas.join(', ')} and surrounding areas.`,
    metaTitle: `Top Branding Agency in ${city} | Professional Brand Design`,
    metaDescription: `Transform your brand with WL CreationX, the leading branding agency in ${city}. Serving businesses in ${areas.slice(0, 3).join(', ')} and beyond. Get your free brand consultation today!`
  }
];

const createLocationContent = (city: string, areas: string[]) => ({
  h1: `Professional Design Services in ${city}`,
  h2: {
    about: `Expert Design Solutions for ${city} Businesses`,
    services: `Comprehensive Design Services in ${city}`,
    expertise: `Our Design Expertise in ${city}`,
    process: `Our Design Process`,
    industries: `Industries We Serve in ${city}`,
    portfolio: `Recent Projects in ${city}`,
    testimonials: `What Our ${city} Clients Say`,
    faq: `Frequently Asked Questions`,
    contact: `Contact Our ${city} Team`
  },
  intro: `Welcome to WL CreationX, your premier design partner in ${city}. With over a decade of experience, we specialize in graphic design, website design, branding, and packaging design solutions tailored to the unique needs of ${city} businesses.`,
  aboutArea: {
    h2: `About Our ${city} Design Agency`,
    content: `As a leading design company in ${city}, we understand the local market dynamics and business landscape. Our team of experienced designers, developers, and brand strategists work collaboratively to deliver exceptional results that help your business stand out in today's competitive market.

    We pride ourselves on our deep understanding of ${city}'s business ecosystem and our ability to create designs that resonate with your target audience. Whether you're a startup looking to establish your brand or an established business aiming to refresh your image, our expertise and local knowledge ensure your success.
    
    Our commitment to excellence has made us the trusted choice for businesses across ${city}. We combine creative innovation with strategic thinking to deliver solutions that not only look great but also drive real business results.`,
    keyPoints: [
      `Local ${city} design experts with deep market knowledge`,
      `Award-winning creative team with industry certifications`,
      `Proven track record of successful projects in ${city}`,
      `Custom solutions tailored to your business goals`,
      `Comprehensive design services under one roof`,
      `Regular updates and transparent communication`,
      `Post-project support and maintenance`,
      `Competitive pricing with flexible packages`
    ],
    benefits: [
      {
        title: "Local Market Expertise",
        description: `Benefit from our deep understanding of ${city}'s business landscape and consumer preferences.`
      },
      {
        title: "Proven Methodology",
        description: "Our systematic approach combines creative excellence with strategic thinking."
      },
      {
        title: "Dedicated Support",
        description: `Get personalized attention from our ${city}-based team.`
      }
    ]
  },
  services: {
    h2: `Our Services in ${city}`,
    intro: `Discover our comprehensive range of professional design services tailored for ${city} businesses:`,
    mainService: 'Design Services',
    list: [
      {
        h3: "Graphic Design Services",
        content: `Professional graphic design solutions for ${city} businesses. We create impactful visual content that enhances your brand and drives engagement.`,
        slug: 'graphic-design',
        features: [
          "Custom logo design and brand identity",
          "Marketing materials and collateral",
          "Social media graphics and digital assets",
          "Print design and advertising materials",
          "Infographics and visual content",
          "Corporate stationery and business cards"
        ],
        benefits: [
          "Enhanced brand visibility",
          "Professional market presence",
          "Consistent brand messaging",
          "Increased customer engagement",
          "Better marketing results",
          "Stand out from competitors"
        ]
      },
      {
        h3: "Website Design Services",
        content: `Custom website design and development services in ${city}. We create modern, responsive websites that drive results for your business.`,
        slug: 'web-design',
        features: [
          "Custom website design",
          "E-commerce solutions",
          "Responsive mobile design",
          "User experience optimization",
          "Content management systems",
          "Website maintenance and support"
        ],
        benefits: [
          "Increased online visibility",
          "Better user experience",
          "Higher conversion rates",
          "Mobile-friendly design",
          "Easy content updates",
          "Secure and reliable hosting"
        ]
      }
    ]
  },
  expertise: {
    content: `Our expertise in ${city} spans across multiple design disciplines.`,
    areas: [
      {
        title: "Strategic Design Thinking",
        description: `We apply proven design methodologies tailored to ${city}'s market needs.`
      },
      {
        title: "Local Market Knowledge",
        description: `Our deep understanding of ${city}'s business landscape helps us create effective designs.`
      },
      {
        title: "Technical Excellence",
        description: "Our team stays updated with the latest design tools and technologies."
      }
    ]
  },
  industries: {
    content: `We serve diverse industries across ${city}:`,
    sectors: [
      "Retail & E-commerce",
      "Professional Services",
      "Healthcare & Medical",
      "Food & Beverage",
      "Technology & IT",
      "Real Estate",
      "Education",
      "Manufacturing"
    ],
    descriptions: [
      {
        industry: 'Retail & E-commerce',
        description: `Custom design solutions for ${city}'s retail businesses`
      },
      {
        industry: 'Professional Services',
        description: 'Brand identity and web design for service providers'
      },
      {
        industry: 'Healthcare & Medical',
        description: 'Professional healthcare marketing materials'
      }
    ]
  },
  testimonials: [
    {
      client: "Sarah Johnson",
      company: `Leading Retailer in ${city}`,
      content: `WL CreationX transformed our brand completely. Their understanding of ${city}'s retail market helped us create a visual identity that really connects with our customers.`,
      rating: 5
    },
    {
      client: "David Smith",
      company: `Tech Startup, ${city}`,
      content: "The team's expertise in both design and technology helped us create a website that not only looks great but also performs exceptionally well.",
      rating: 5
    }
  ],
  faqs: [
    {
      question: `How much do design services cost in ${city}?`,
      answer: `Our design services in ${city} are tailored to your specific needs and budget. We offer flexible packages starting from R2,500, with custom solutions for larger projects. Contact us for a detailed quote based on your requirements.`
    },
    {
      question: `How long does a typical design project take in ${city}?`,
      answer: `Project timelines vary based on complexity and scope. A logo design typically takes 2-3 weeks, while a complete website might take 6-8 weeks. We provide detailed timelines during our initial consultation.`
    },
    {
      question: `Do you offer ongoing support after project completion?`,
      answer: `Yes, we provide comprehensive post-project support from our ${city} office. This includes maintenance, updates, and technical support to ensure your design continues to serve your business effectively.`
    }
  ],
  contact: {
    h2: `Contact Our ${city} Team`,
    phone: "+27 (0)12 345 6789",
    email: `${city.toLowerCase()}@wlcreationx.co.za`,
    address: `123 Business District, ${city}, South Africa`,
    hours: "Monday - Friday: 8:00 AM - 5:00 PM",
    cta: {
      primary: "Get a Free Consultation",
      secondary: [
        {
          url: "/portfolio",
          text: "View Our Portfolio"
        },
        {
          url: "/services",
          text: "Download Our Service Guide"
        }
      ]
    }
  }
});

const createLocation = (
  id: string,
  city: string,
  region: string,
  areas: string[],
  mainKeywords: string[],
  nearbyAreas: string[],
  serviceAreas: { primary: string[]; secondary: string[] },
  localKeywords: string[]
): Location => {
  const content = createLocationContent(city, areas);
  
  return {
    id,
    slug: id,
    city,
    title: `Creative Agency in ${city} | Professional Design Services`,
    description: `Leading creative agency in ${city}. We offer professional web design, graphic design, branding, and digital marketing solutions tailored for your business.`,
    region,
    areas: ['Central', 'North', 'East', 'West', 'South'],
    serviceAreas: {
      primary: [`${city} Central`, `${city} CBD`, `${city} North`, `${city} East`],
      secondary: [`${city} West`, `${city} South`, `Greater ${city} Area`]
    },
    nearbyAreas: [
      `${city} Metropolitan Area`,
      'Surrounding Suburbs',
      'Business Districts',
      'Industrial Areas'
    ],
    metaTitle: `Top Creative Agency in ${city} | WL CreationX`,
    metaDescription: `Looking for a professional creative agency in ${city}? WL CreationX offers expert design services including web design, graphic design, and branding. Get a free consultation today!`,
    content: {
      ...content,
      coordinates: {
        latitude: '-26.2041',  // Default to Johannesburg coordinates
        longitude: '28.0473'
      },
      services: {
        h2: `Our Services in ${city}`,
        intro: `Discover our comprehensive range of professional design services tailored for ${city} businesses:`,
        mainService: 'Design Services',
        list: [
          {
            h3: "Graphic Design Services",
            content: `Professional graphic design solutions for ${city} businesses. We create impactful visual content that enhances your brand and drives engagement.`,
            slug: 'graphic-design',
            features: [
              "Custom logo design and brand identity",
              "Marketing materials and collateral",
              "Social media graphics and digital assets",
              "Print design and advertising materials",
              "Infographics and visual content",
              "Corporate stationery and business cards"
            ],
            benefits: [
              "Enhanced brand visibility",
              "Professional market presence",
              "Consistent brand messaging",
              "Increased customer engagement",
              "Better marketing results",
              "Stand out from competitors"
            ]
          },
          {
            h3: "Website Design Services",
            content: `Custom website design and development services in ${city}. We create modern, responsive websites that drive results for your business.`,
            slug: 'web-design',
            features: [
              "Custom website design",
              "E-commerce solutions",
              "Responsive mobile design",
              "User experience optimization",
              "Content management systems",
              "Website maintenance and support"
            ],
            benefits: [
              "Increased online visibility",
              "Better user experience",
              "Higher conversion rates",
              "Mobile-friendly design",
              "Easy content updates",
              "Secure and reliable hosting"
            ]
          }
        ]
      },
      industries: {
        ...content.industries,
        descriptions: [
          {
            industry: 'Retail & E-commerce',
            description: `Custom design solutions for ${city}'s retail businesses`
          },
          {
            industry: 'Professional Services',
            description: 'Brand identity and web design for service providers'
          },
          {
            industry: 'Healthcare & Medical',
            description: 'Professional healthcare marketing materials'
          }
        ]
      },
      contact: {
        ...content.contact,
        cta: {
          primary: "Get a Free Consultation",
          secondary: [
            {
              url: "/portfolio",
              text: "View Our Portfolio"
            },
            {
              url: "/services",
              text: "Download Our Service Guide"
            }
          ]
        }
      }
    }
  };
};

export const locations: Location[] = [
  createLocation(
    'pretoria',
    'Pretoria',
    'Gauteng',
    [
      'Centurion',
      'Menlyn',
      'Brooklyn',
      'Hatfield',
      'Waterkloof',
      'Lynnwood',
      'Arcadia',
      'Sunnyside',
      'Montana',
      'Garsfontein'
    ],
    [
      'graphic design pretoria',
      'website design pretoria',
      'logo design pretoria',
      'branding agency pretoria',
      'web design company pretoria',
      'packaging design pretoria',
      'digital marketing pretoria',
      'creative agency pretoria'
    ],
    [
      'Midrand',
      'Johannesburg North',
      'Sandton',
      'Randburg'
    ],
    {
      primary: [
        'Pretoria East',
        'Pretoria North',
        'Pretoria West',
        'Pretoria Central',
        'Centurion'
      ],
      secondary: [
        'Bronkhorstspruit',
        'Cullinan',
        'Hammanskraal',
        'Winterveld',
        'Mamelodi'
      ]
    },
    [
      'pretoria business graphic design',
      'corporate branding pretoria',
      'pretoria ecommerce websites',
      'affordable web design pretoria',
      'professional logo designer pretoria',
      'pretoria digital marketing services',
      'best graphic designer in pretoria',
      'website development pretoria cbd'
    ]
  ),
  createLocation(
    'johannesburg',
    'Johannesburg',
    'Gauteng',
    [
      'Sandton',
      'Rosebank',
      'Randburg',
      'Fourways',
      'Bryanston',
      'Midrand',
      'Roodepoort',
      'Northcliff',
      'Parktown',
      'Melville'
    ],
    [
      'graphic design johannesburg',
      'website design johannesburg',
      'logo design johannesburg',
      'branding agency johannesburg',
      'web design company johannesburg',
      'packaging design johannesburg',
      'digital marketing johannesburg',
      'creative agency johannesburg'
    ],
    [
      'Pretoria',
      'Centurion',
      'East Rand',
      'West Rand'
    ],
    {
      primary: [
        'Sandton CBD',
        'Randburg',
        'Rosebank',
        'Fourways',
        'Midrand'
      ],
      secondary: [
        'Soweto',
        'Lenasia',
        'Alexandra',
        'Diepsloot',
        'Orange Farm'
      ]
    },
    [
      'johannesburg business graphic design',
      'corporate branding johannesburg',
      'johannesburg ecommerce websites',
      'affordable web design johannesburg',
      'professional logo designer johannesburg',
      'johannesburg digital marketing services',
      'best graphic designer in johannesburg',
      'website development johannesburg cbd'
    ]
  ),
  createLocation(
    'cape-town',
    'Cape Town',
    'Western Cape',
    [
      'City Bowl',
      'Sea Point',
      'Green Point',
      'Camps Bay',
      'Woodstock',
      'Observatory',
      'Claremont',
      'Constantia',
      'Century City',
      'Bellville'
    ],
    [
      'graphic design cape town',
      'website design cape town',
      'logo design cape town',
      'branding agency cape town',
      'web design company cape town',
      'packaging design cape town',
      'digital marketing cape town',
      'creative agency cape town'
    ],
    [
      'Stellenbosch',
      'Somerset West',
      'Paarl',
      'Bloubergstrand'
    ],
    {
      primary: [
        'Cape Town CBD',
        'Atlantic Seaboard',
        'Southern Suburbs',
        'Northern Suburbs',
        'City Bowl'
      ],
      secondary: [
        'Khayelitsha',
        'Mitchell\'s Plain',
        'Gugulethu',
        'Durbanville',
        'Table View'
      ]
    },
    [
      'cape town business graphic design',
      'corporate branding cape town',
      'cape town ecommerce websites',
      'affordable web design cape town',
      'professional logo designer cape town',
      'cape town digital marketing services',
      'best graphic designer in cape town',
      'website development cape town cbd'
    ]
  ),
  createLocation(
    'durban',
    'Durban',
    'KwaZulu-Natal',
    [
      'Umhlanga',
      'Ballito',
      'Berea',
      'Morningside',
      'Westville',
      'Pinetown',
      'La Lucia',
      'Glenwood',
      'Musgrave',
      'Durban North'
    ],
    [
      'graphic design durban',
      'website design durban',
      'logo design durban',
      'branding agency durban',
      'web design company durban',
      'packaging design durban',
      'digital marketing durban',
      'creative agency durban'
    ],
    [
      'Pietermaritzburg',
      'Amanzimtoti',
      'Stanger',
      'Hillcrest'
    ],
    {
      primary: [
        'Durban CBD',
        'Umhlanga',
        'Berea',
        'Morningside',
        'Westville'
      ],
      secondary: [
        'KwaMashu',
        'Umlazi',
        'Chatsworth',
        'Phoenix',
        'Inanda'
      ]
    },
    [
      'durban business graphic design',
      'corporate branding durban',
      'durban ecommerce websites',
      'affordable web design durban',
      'professional logo designer durban',
      'durban digital marketing services',
      'best graphic designer in durban',
      'website development durban cbd'
    ]
  )
];
