interface MetadataConfig {
  title: string;
  description: string;
  keywords: string;
  ogImage: string;
  path: string;
}

export const generateMetadata = ({
  title,
  description,
  keywords,
  ogImage,
  path
}: MetadataConfig) => {
  const baseUrl = 'https://wlcreations.co.za';
  
  return {
    title: `${title} | WL Creations`,
    description,
    keywords,
    openGraph: {
      title: `${title} | WL Creations`,
      description,
      type: 'website',
      url: `${baseUrl}${path}`,
      images: [
        {
          url: `${baseUrl}/images/og/${ogImage}`,
          width: 1200,
          height: 630,
          alt: title
        }
      ]
    },
    alternates: {
      canonical: `${baseUrl}${path}`
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | WL Creations`,
      description,
      images: [`${baseUrl}/images/og/${ogImage}`],
    }
  };
};

export const servicesMetadata = {
  'website-design': {
    title: 'Professional Website Design Services',
    description: 'Custom website design and development services tailored to your business needs. From responsive designs to e-commerce solutions.',
    keywords: 'website design, web development, responsive design, e-commerce, WordPress, custom websites, South Africa',
    ogImage: 'website-design.jpg',
    path: '/pricing/website-design'
  },
  'graphic-design': {
    title: 'Professional Graphic Design Services',
    description: 'Creative graphic design services including logo design, brand identity, and visual communication solutions.',
    keywords: 'graphic design, logo design, brand identity, visual design, corporate identity, South Africa',
    ogImage: 'graphic-design.jpg',
    path: '/pricing/graphic-design'
  },
  'print-design': {
    title: 'Professional Print Design Services',
    description: 'High-quality print design services for business cards, brochures, flyers, and large format printing.',
    keywords: 'print design, business cards, brochures, flyers, large format printing, print media, South Africa',
    ogImage: 'print-design.jpg',
    path: '/pricing/print-design'
  },
  'marketing-materials': {
    title: 'Marketing Materials Design Services',
    description: 'Professional marketing material design including presentations, packaging, vehicle wraps, and signage.',
    keywords: 'marketing materials, presentation design, packaging design, vehicle wraps, signage design, South Africa',
    ogImage: 'marketing-materials.jpg',
    path: '/pricing/marketing-materials'
  },
  'social-media': {
    title: 'Social Media Design & Management Services',
    description: 'Professional social media design and management services to boost your online presence.',
    keywords: 'social media design, social media management, content creation, social media marketing, South Africa',
    ogImage: 'social-media.jpg',
    path: '/pricing/social-media-pretoria'
  },
  'google-ads': {
    title: 'Google Ads & Digital Marketing Services',
    description: 'Professional Google Ads management and digital marketing services to grow your online presence.',
    keywords: 'Google Ads, PPC, digital marketing, search advertising, display ads, remarketing, South Africa',
    ogImage: 'google-ads.jpg',
    path: '/pricing/google-ads-pretoria'
  },
  'website-maintenance': {
    title: 'Website Maintenance Services',
    description: 'Professional website maintenance services to keep your website secure, up-to-date, and performing at its best.',
    keywords: 'website maintenance, WordPress updates, security monitoring, backups, performance optimization, South Africa',
    ogImage: 'website-maintenance.jpg',
    path: '/pricing/website-maintenance-pretoria'
  }
};
