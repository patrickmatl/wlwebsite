import { notFound } from 'next/navigation';
import { locations } from '@/data/locations';
import { Metadata } from 'next';
import LocationContent from '@/components/LocationContent';
import LocationSchema from '@/components/LocationSchema';

type Props = {
  params: Promise<{ locationId: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export function generateStaticParams() {
  return locations.map((location) => ({
    locationId: location.slug,
  }));
}

export async function generateMetadata(
  { params }: Props
): Promise<Metadata> {
  const resolvedParams = await params;
  const location = locations.find(l => l.slug === resolvedParams.locationId);

  if (!location) return {
    title: 'Location Not Found',
    description: 'The requested location page could not be found.',
    metadataBase: new URL('https://wlcreationx.co.za'),
  };

  const title = `${location.city} Graphic & Web Design Services | WL CreationX`;
  const description = `Graphic design, web design, branding & packaging for ${location.city} businesses — delivered from our Pretoria studio, on-site in Gauteng or remotely nationwide.`;
  const pageUrl = `https://wlcreationx.co.za/service-areas-pretoria/${location.slug}`;

  return {
    title,
    description,
    metadataBase: new URL('https://wlcreationx.co.za'),
    openGraph: {
      title,
      description,
      url: pageUrl,
      siteName: 'WL CreationX',
      locale: 'en_ZA',
      type: 'website',
      images: [
        {
          url: 'https://wlcreationx.co.za/images/og-image.jpg',
          width: 1200,
          height: 630,
          alt: `WL CreationX — Design Services for ${location.city}`,
        }
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      creator: '@wlcreationx',
      images: [
        {
          url: 'https://wlcreationx.co.za/images/twitter-card.jpg',
          width: 1200,
          height: 628,
          alt: `WL CreationX — Design Services for ${location.city}`,
        }
      ],
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
    alternates: {
      canonical: pageUrl,
    },
  };
}

export default async function LocationPage({ params }: Props) {
  const resolvedParams = await params;
  const location = locations.find(l => l.slug === resolvedParams.locationId);

  if (!location) notFound();

  const baseUrl = 'https://wlcreationx.co.za';

  return (
    <div className="min-h-screen bg-black">
      <main className="container mx-auto px-4 py-8">
        <LocationSchema
          location={location}
          baseUrl={baseUrl}
        />
        <h1 className="text-4xl font-bold text-white mb-8">
          {location.city} Graphic &amp; Web Design Services
        </h1>
        <LocationContent location={location} />
      </main>
    </div>
  );
}
