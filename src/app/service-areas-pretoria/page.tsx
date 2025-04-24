import Link from 'next/link';

export default function LocationsPage() {
  const locations = [
    {
      id: 'cape-town',
      name: 'Cape Town',
      description: 'Creative services in the Mother City',
      image: '/images/cape-town.jpg'
    },
    {
      id: 'johannesburg',
      name: 'Johannesburg',
      description: 'Design solutions in the City of Gold',
      image: '/images/johannesburg.jpg'
    },
    // Add more locations as needed
  ];

  return (
    <div className="min-h-screen bg-black text-white pt-24">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl md:text-5xl font-bold mb-8 text-[#FFD700]">Our Locations</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {locations.map((location) => (
            <Link 
              href={`/locations/${location.id}`} 
              key={location.id}
              className="group relative overflow-hidden rounded-lg hover:scale-105 transition-transform duration-300"
            >
              <div className="aspect-video relative">
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
                <div 
                  className="absolute inset-0 bg-cover bg-center z-0"
                  style={{ backgroundImage: `url(${location.image})` }}
                />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                <h2 className="text-2xl font-bold mb-2">{location.name}</h2>
                <p className="text-gray-200">{location.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
