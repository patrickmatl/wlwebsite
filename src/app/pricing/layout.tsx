import { Metadata } from 'next';
import { servicesMetadata } from '@/lib/metadata';

type ValidServices = keyof typeof servicesMetadata;

export const generateMetadata = ({ params }: { 
  params: { service?: string } 
}): Metadata => {
  if (!params.service) {
    return {
      title: 'Services & Pricing | WL Creationx',
      description: 'Professional web design, development, and digital marketing services at competitive prices.',
    };
  }

  const service = params.service as ValidServices;
  return servicesMetadata[service] || {
    title: 'Services & Pricing | WL Creationx',
    description: 'Professional web design, development, and digital marketing services at competitive prices.',
  };
};

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
