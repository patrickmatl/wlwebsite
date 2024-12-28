import { notFound } from 'next/navigation';
import { locations } from '@/data/locations';
import { services } from '@/data/services';
import type { Service } from '@/types/service';
import { Metadata, ResolvingMetadata } from 'next';
import LocationContent from '@/components/LocationContent';
import LocationSchema from '@/components/LocationSchema';

type Props = {
  params: Promise<{ locationId: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const resolvedParams = await params;
  const location = locations.find(l => l.slug === resolvedParams.locationId);
  
  if (!location) return {
    title: 'Location Not Found',
    description: 'The requested location page could not be found.',
    metadataBase: new URL('https://wlcreationx.co.za'),
  };

  return {
    title: `Graphic Design & Web Design Company in ${location.city} | WL CreationX`,
    description: `Leading graphic design, website design, branding & packaging design company in ${location.city}. Professional creative solutions for businesses across ${location.region}. Expert design services tailored to your needs.`,
    metadataBase: new URL('https://wlcreationx.co.za'),
    keywords: [
      `graphic design company ${location.city.toLowerCase()}`,
      `website design company ${location.city.toLowerCase()}`,
      `branding company ${location.city.toLowerCase()}`,
      `packaging design company ${location.city.toLowerCase()}`,
      `logo design ${location.city.toLowerCase()}`,
      `web design agency ${location.city.toLowerCase()}`,
      `creative agency ${location.city.toLowerCase()}`,
      `design studio ${location.city.toLowerCase()}`,
      `brand identity design ${location.city.toLowerCase()}`,
      `corporate branding ${location.city.toLowerCase()}`
    ],
    openGraph: {
      title: `Graphic Design & Web Design Company in ${location.city} | WL CreationX`,
      description: `Leading graphic design, website design, branding & packaging design company in ${location.city}. Professional creative solutions for businesses across ${location.region}. Expert design services tailored to your needs.`,
      url: `https://wlcreationx.co.za/locations/${location.slug}`,
      siteName: 'WL CreationX Design Agency',
      locale: 'en_ZA',
      type: 'website',
      images: [
        {
          url: 'https://wlcreationx.co.za/images/og-image.jpg',
          width: 1200,
          height: 630,
          alt: `WL CreationX - Design Company in ${location.city}`,
        }
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `Graphic Design & Web Design Company in ${location.city} | WL CreationX`,
      description: `Leading graphic design, website design, branding & packaging design company in ${location.city}. Professional creative solutions for businesses across ${location.region}. Expert design services tailored to your needs.`,
      creator: '@wlcreationx',
      images: [
        {
          url: 'https://wlcreationx.co.za/images/twitter-image.jpg',
          width: 1200,
          height: 628,
          alt: `WL CreationX - Design Company in ${location.city}`,
        }
      ],
    },
    robots: {
      index: true,
      follow: true,
      nocache: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    alternates: {
      canonical: `https://wlcreationx.co.za/locations/${location.slug}`,
    },
  };
}

export default async function LocationPage({ params }: Props) {
  const resolvedParams = await params;
  const location = locations.find(l => l.slug === resolvedParams.locationId);
  
  if (!location) notFound();

  const baseUrl = 'https://wlcreationx.co.za';

  const locationServices: Service[] = location.content?.services?.list.map(service => {
    const matchingService = services.find(s => 
      s.title.toLowerCase() === service.h3.toLowerCase()
    );
    if (matchingService) return matchingService;

    // Create a new service object if no matching service is found
    return {
      id: service.h3.toLowerCase(),
      slug: service.h3.toLowerCase().replace(/\s+/g, '-'),
      title: service.h3,
      description: service.content,
      features: service.features || [],
      benefits: service.benefits || [],
      intro: service.content,
      content: {
        intro: service.content,
        features: service.features || [],
        benefits: service.benefits || [],
        process: [],
        faqs: []
      }
    };
  }) || [];

  return (
    <div className="min-h-screen bg-black">
      <main className="container mx-auto px-4 py-8">
        <LocationSchema 
          location={location}
          services={locationServices}
          baseUrl={baseUrl}
        />
        <h1 className="text-4xl font-bold text-white mb-8">
          {location.city}
        </h1>
        <LocationContent location={location} />
      </main>
    </div>
  );
}