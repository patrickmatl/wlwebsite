'use client';

import Link from 'next/link';
import { FaChevronRight } from 'react-icons/fa';

interface BreadcrumbProps {
  items: Array<{
    label: string;
    href: string;
  }>;
}

const Breadcrumb = ({ items }: BreadcrumbProps) => {
  return (
    <nav className="py-4 px-4 sm:px-6 lg:px-8 bg-neutral-800">
      <ol className="flex items-center space-x-2 text-sm">
        <li>
          <Link href="/" className="text-neutral-400 hover:text-[#FFD700]">
            Home
          </Link>
        </li>
        {items.map((item, index) => (
          <li key={item.href} className="flex items-center">
            <FaChevronRight className="text-neutral-600 mx-2" size={12} />
            {index === items.length - 1 ? (
              <span className="text-[#FFD700]">{item.label}</span>
            ) : (
              <Link href={item.href} className="text-neutral-400 hover:text-[#FFD700]">
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
