import { notFound } from 'next/navigation';
import { services } from '@/data/services';
import { locations } from '@/data/locations';
import { Metadata, ResolvingMetadata } from 'next';
import ServiceContent from '@/components/ServiceContent';
import ServiceSchema from '@/components/ServiceSchema';

type Props = {
  params: Promise<{ serviceId: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export async function generateMetadata(
  { params }: Props
): Promise<Metadata> {
  const resolvedParams = await params;
  const service = services.find(s => s.slug === resolvedParams.serviceId);
  
  if (!service) return {
    title: 'Service Not Found',
    description: 'The requested service page could not be found.',
    metadataBase: new URL('https://wlcreationx.co.za'),
  };

  return {
    title: service.metaTitle || `${service.title} | WL CreationX`,
    description: service.metaDescription || service.description,
    metadataBase: new URL('https://wlcreationx.co.za'),
    openGraph: {
      title: service.metaTitle || `${service.title} | WL CreationX`,
      description: service.metaDescription || service.description,
      url: `https://wlcreationx.co.za/services/${service.slug}`,
      siteName: 'WL CreationX',
      locale: 'en_ZA',
      type: 'website',
    },
  };
}

export default async function ServicePage({ params }: Props) {
  const resolvedParams = await params;
  const service = services.find(s => s.slug === resolvedParams.serviceId);
  
  if (!service) notFound();

  // Find locations that offer this service
  const serviceLocations = locations.filter(location => 
    location.content?.services?.list.some(s => 
      s.h3.toLowerCase() === service.title.toLowerCase()
    )
  );

  // Get the first location for this service (usually main city)
  const serviceLocation = locations[0]?.city || 'South Africa';
  const baseUrl = 'https://wlcreationx.co.za';

  return (
    <div className="min-h-screen bg-black">
      <main className="container mx-auto px-4 py-8">
        <ServiceSchema 
          service={service}
          location={serviceLocation}
          baseUrl={baseUrl}
        />
        <h1 className="text-4xl font-bold text-white mb-8">
          {service.title}
        </h1>
        <ServiceContent 
          service={service} 
          locations={serviceLocations} 
        />
      </main>
    </div>
  );
}
