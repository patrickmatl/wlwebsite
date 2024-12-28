import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { regions } from '@/data/regions';
import { services } from '@/data/services';
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

  return {
    title: `${service.title} in ${location.city} | WL CreationX`,
    description: `Professional ${service.title} services in ${location.city}. ${service.description}`,
    openGraph: {
      title: `${service.title} in ${location.city} | WL CreationX`,
      description: `Professional ${service.title} services in ${location.city}. ${service.description}`,
      url: `https://wlcreationx.co.za/${location.slug}/${service.slug}`,
      siteName: 'WL CreationX',
      locale: 'en_ZA',
      type: 'website',
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
