import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Service Areas | Graphic Design Across Gauteng',
  description:
    'WL CreationX works from one studio in Pretoria: on-site graphic design, branding and web design across Gauteng, with remote delivery for clients nationwide.',
  alternates: {
    canonical: 'https://wlcreationx.co.za/service-areas-pretoria',
  },
  openGraph: {
    title: 'Service Areas | Graphic Design Across Gauteng | WL CreationX',
    description:
      'WL CreationX works from one studio in Pretoria: on-site graphic design, branding and web design across Gauteng, with remote delivery for clients nationwide.',
    url: 'https://wlcreationx.co.za/service-areas-pretoria',
    siteName: 'WL CreationX',
    locale: 'en_ZA',
    type: 'website',
    images: ['/images/og-image.jpg'],
  },
};

const serviceAreas = [
  {
    id: 'pretoria',
    name: 'Pretoria',
    badge: 'Home Base',
    description:
      'Our only studio — Park Lane West Building, Waterkloof Glen. In-person meetings, shoots and workshops happen here.',
    image: '/images/pretoria.jpg',
  },
  {
    id: 'johannesburg',
    name: 'Johannesburg',
    badge: 'On-Site in Gauteng',
    description:
      'Regular on-site visits, briefings and shoots across Johannesburg, served from our Pretoria studio.',
    image: '/images/johannesburg.jpg',
  },
  {
    id: 'cape-town',
    name: 'Cape Town',
    badge: 'Remote',
    description:
      'Full design, branding and web services delivered remotely to Cape Town businesses via video calls and courier.',
    image: '/images/cape-town.jpg',
  },
  {
    id: 'durban',
    name: 'Durban',
    badge: 'Remote',
    description:
      'Remote collaboration for Durban clients — the same process and deliverables, managed from Pretoria.',
    image: '/images/durban.jpg',
  },
];

export default function ServiceAreasPage() {
  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-16">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl md:text-5xl font-bold font-syne mb-4 text-[#FFD700]">
          Areas We Serve
        </h1>
        <p className="text-gray-300 max-w-3xl mb-10">
          WL CreationX operates from a single studio in Waterkloof Glen, Pretoria. We work
          on-site with clients across Gauteng and deliver graphic design, branding, web design
          and marketing projects remotely to businesses anywhere in South Africa.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {serviceAreas.map((area) => (
            <Link
              href={`/service-areas-pretoria/${area.id}`}
              key={area.id}
              className="group relative overflow-hidden rounded-lg border border-[#FFD700]/20 bg-zinc-900/50 hover:scale-[1.02] transition-transform duration-300"
            >
              <div className="aspect-video relative">
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10" />
                <div
                  className="absolute inset-0 bg-cover bg-center z-0"
                  style={{ backgroundImage: `url(${area.image})` }}
                />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                <span className="inline-block text-xs uppercase tracking-wider text-[#FFD700] mb-2">
                  {area.badge}
                </span>
                <h2 className="text-2xl font-bold font-syne mb-2">{area.name}</h2>
                <p className="text-gray-200 text-sm">{area.description}</p>
              </div>
            </Link>
          ))}
        </div>
        <div className="mt-12 rounded-lg border border-[#FFD700]/20 bg-zinc-900/50 p-6 max-w-3xl">
          <h2 className="text-xl font-bold font-syne text-[#FFD700] mb-2">
            One Studio, Nationwide Reach
          </h2>
          <p className="text-gray-300 text-sm">
            We do not have offices in other cities. Every project is run from our Pretoria
            studio — in person where distance allows, and remotely everywhere else.{' '}
            <Link href="/get-in-touch-pretoria" className="text-[#FFD700] underline underline-offset-4">
              Get in touch
            </Link>{' '}
            to discuss how we can work with your team.
          </p>
        </div>
      </div>
    </div>
  );
}
