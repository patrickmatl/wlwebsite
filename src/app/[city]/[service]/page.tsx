import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { regions } from '@/data/regions';
import { services } from '@/data/services';
import { isIndexableServiceArea } from '@/data/service-areas';
import LocationPage from '@/components/LocationPage';

type Props = {
  params: Promise<{ city: string; service: string }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const location = findLocation(resolvedParams.city);
  const service = services.find(s => s.slug === resolvedParams.service);

  if (!location || !service) {
    return {
      title: 'Service Not Found',
      description: 'The requested service page could not be found.'
    };
  }

  // NOTE: resolvedParams.city (the URL segment) is used for the canonical —
  // findLocation() may resolve a sublocation, but the canonical must match
  // the URL actually being served.
  const canonicalUrl = `https://wlcreationx.co.za/${resolvedParams.city}/${service.slug}`;

  // Every one of these pages is the same template with the city name swapped,
  // so only the areas the studio actually works from are offered to search.
  // The rest still render for anyone who follows a link; they are simply not
  // put forward as something worth indexing. See src/data/service-areas.ts.
  const indexable = isIndexableServiceArea(resolvedParams.city);

  return {
    title: { absolute: `${service.title} in ${location.city} | WL CreationX` },
    description: indexable
      ? `${service.title} in ${location.city} from WL CreationX, a design studio based in Pretoria. ${service.description}`
      : `${service.title} in ${location.city}. ${service.description}`,
    robots: indexable ? undefined : { index: false, follow: true },
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${service.title} in ${location.city} | WL CreationX`,
      description: `Professional ${service.title} services in ${location.city}. ${service.description}`,
      url: canonicalUrl,
      siteName: 'WL CreationX',
      locale: 'en_ZA',
      type: 'website',
      images: [{ url: '/images/og-image.jpg', width: 1200, height: 630, alt: 'WL CreationX — Graphic Design Company in Pretoria' }],
    },
  };
}

function findLocation(slug: string) {
  for (const region of regions) {
    // Check main locations
    const location = region.locations.find(loc => loc.slug === slug);
    if (location) {
      return location;
    }

    // Check sublocations
    for (const loc of region.locations) {
      const sublocation = loc.subLocations?.find(sub => sub.slug === slug);
      if (sublocation) {
        return {
          ...loc,
          city: sublocation.name,
          slug: sublocation.slug,
          title: `Creative Services in ${sublocation.name}`,
          description: sublocation.description
        };
      }
    }
  }
  return null;
}

export default async function ServicePage({ params }: Props) {
  const resolvedParams = await params;
  const location = findLocation(resolvedParams.city);
  const service = services.find(s => s.slug === resolvedParams.service);

  if (!location || !service) {
    notFound();
  }

  return <LocationPage location={location} service={service} />;
}
