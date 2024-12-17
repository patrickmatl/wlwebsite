'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { FiChevronRight } from 'react-icons/fi';

const Breadcrumb = () => {
  const pathname = usePathname();
  
  // Don't show breadcrumb on homepage
  if (pathname === '/') return null;

  const pathSegments = pathname
    .split('/')
    .filter((segment) => segment !== '')
    .map((segment) => ({
      name: segment.split('-').map(word => 
        word.charAt(0).toUpperCase() + word.slice(1)
      ).join(' '),
      path: `/${segment}`,
    }));

  return (
    <nav className="w-full bg-black/95 backdrop-blur-sm py-4 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-2 text-sm">
          <Link
            href="/"
            className="text-neutral-400 hover:text-gold-500 transition-colors"
          >
            Home
          </Link>
          
          {pathSegments.map((segment, index) => (
            <div key={segment.path} className="flex items-center space-x-2">
              <FiChevronRight className="text-neutral-600 w-4 h-4" />
              {index === pathSegments.length - 1 ? (
                <span className="text-gold-500">{segment.name}</span>
              ) : (
                <Link
                  href={segment.path}
                  className="text-neutral-400 hover:text-gold-500 transition-colors"
                >
                  {segment.name}
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Breadcrumb;
