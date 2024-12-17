import { notFound } from 'next/navigation';
import { Metadata } from 'next';

// This would typically come from a database or CMS
const locationData = {
  'cape-town': {
    title: 'Cape Town',
    metaDescription: 'Creative services in the Mother City',
    keywords: 'Cape Town, creative services, design agency',
    name: 'Cape Town',
    description: 'Creative services in the Mother City',
    fullDescription: `Based in the heart of Cape Town, we bring creative vision to life through innovative design solutions. Our Cape Town studio specializes in combining local cultural influences with contemporary design trends.`,
    image: '/images/cape-town.jpg',
    services: [
      'Brand Strategy',
      'Web Design',
      'Print Design',
      'UI/UX Design',
      'Motion Graphics'
    ],
    address: '123 Long Street, Cape Town',
    email: 'capetown@wlcreations.com',
    phone: '+27 21 123 4567',
    areas: ['Cape Town', 'Western Cape']
  },
  'johannesburg': {
    title: 'Johannesburg',
    metaDescription: 'Design solutions in the City of Gold',
    keywords: 'Johannesburg, design solutions, creative agency',
    name: 'Johannesburg',
    description: 'Design solutions in the City of Gold',
    fullDescription: `Our Johannesburg studio serves as a creative hub for the bustling business capital. We combine corporate expertise with creative excellence to deliver outstanding results.`,
    image: '/images/johannesburg.jpg',
    services: [
      'Corporate Identity',
      'Digital Marketing',
      'Web Development',
      'Print Media',
      'Brand Strategy'
    ],
    address: '456 Jan Smuts Avenue, Johannesburg',
    email: 'johannesburg@wlcreations.com',
    phone: '+27 11 123 4567',
    areas: ['Johannesburg', 'Gauteng']
  }
};

interface Props {
  params: Promise<{ locationId: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const location = locationData[resolvedParams.locationId as keyof typeof locationData];
  
  if (!location) {
    return {
      title: 'Location Not Found'
    };
  }

  return {
    title: location.title,
    description: location.metaDescription,
    keywords: location.keywords,
    openGraph: {
      title: location.title,
      description: location.description,
      images: [location.image],
      type: 'website',
    },
    alternates: {
      canonical: `https://wlcreations.com/locations/${resolvedParams.locationId}`,
    },
  };
}

export default async function LocationPage({ params }: Props) {
  const resolvedParams = await params;
  const location = locationData[resolvedParams.locationId as keyof typeof locationData];

  if (!location) {
    notFound();
  }

  // Generate JSON-LD structured data for better SEO
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: `WL Creations ${location.name}`,
    description: location.description,
    image: `https://wlcreations.com${location.image}`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: location.address,
      addressLocality: location.name,
      addressCountry: 'ZA'
    },
    geo: {
      '@type': 'GeoCoordinates',
      // Add actual coordinates for your locations
      latitude: '-33.924870',
      longitude: '18.424055'
    },
    url: `https://wlcreations.com/locations/${resolvedParams.locationId}`,
    telephone: location.phone,
    email: location.email,
    areaServed: location.areas,
    serviceType: location.services
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <div className="min-h-screen bg-black text-white pt-24">
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <div className="relative h-[50vh] rounded-xl overflow-hidden mb-12">
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${location.image})` }}
            />
            <div className="absolute bottom-0 left-0 right-0 p-8 z-20">
              <h1 className="text-5xl font-bold mb-4 text-[#FFD700]">
                Creative Design Agency in {location.name}
              </h1>
              <p className="text-xl text-gray-200">{location.description}</p>
            </div>
          </div>

          {/* Content Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-[#FFD700]">
                Professional Design Services in {location.name}
              </h2>
              <div className="prose prose-invert max-w-none">
                {location.fullDescription.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="text-lg leading-relaxed mb-6">
                    {paragraph}
                  </p>
                ))}
              </div>
              
              <h3 className="text-2xl font-bold mb-4 text-[#FFD700]">Our Services in {location.name}</h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {location.services.map((service, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    <span className="text-[#FFD700]">•</span>
                    <span>{service}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-3xl font-bold mb-6 text-[#FFD700]">Contact Our {location.name} Studio</h2>
              <div className="bg-zinc-900 p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-4">Studio Location</h3>
                <p className="mb-6">{location.address}</p>
                
                <h3 className="text-xl font-bold mb-4">Get in Touch</h3>
                <p className="mb-2">
                  <a href={`tel:${location.phone}`} className="text-[#FFD700] hover:underline">
                    {location.phone}
                  </a>
                </p>
                <p className="mb-4">
                  <a href={`mailto:${location.email}`} className="text-[#FFD700] hover:underline">
                    {location.email}
                  </a>
                </p>
                
                <h3 className="text-xl font-bold mb-4">Areas We Serve</h3>
                <ul className="grid grid-cols-2 gap-2 mb-6">
                  {location.areas.map((area, index) => (
                    <li key={index} className="text-gray-300">{area}</li>
                  ))}
                </ul>
                
                <button className="bg-[#FFD700] text-black px-6 py-3 rounded-lg font-bold hover:bg-[#FFE55C] transition-colors w-full">
                  Schedule a Consultation
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
