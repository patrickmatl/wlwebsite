import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact WL CreationX | Get in Touch With Our Creative Team',
  description: 'Contact WL CreationX for innovative design solutions. Our creative team is ready to bring your vision to life.',
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
