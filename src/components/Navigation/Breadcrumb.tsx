'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { FiChevronRight } from 'react-icons/fi';

const Breadcrumb = () => {
  const pathname = usePathname();
  
  // Don't show breadcrumb on homepage
  if (pathname === '/') return null;

  const segments = pathname.split('/').filter((segment) => segment !== '');

  // Only these intermediate paths are real routes. Anything else (e.g. the
  // bare city segment of /pretoria/graphic-design) must render as plain text,
  // otherwise the breadcrumb emits internal links that 404.
  const LINKABLE_INTERMEDIATE = new Set([
    '/pricing',
    '/service-areas-pretoria',
    '/creative-industry-blog-pretoria',
    '/digital-marketing-services-pretoria',
  ]);

  const pathSegments = segments.map((segment, index) => {
    const path = `/${segments.slice(0, index + 1).join('/')}`;
    return {
      name: segment.split('-').map(word =>
        word === 'seo' ? 'SEO' : word === 'faq' ? 'FAQ' : word.charAt(0).toUpperCase() + word.slice(1)
      ).join(' '),
      path,
      linkable: LINKABLE_INTERMEDIATE.has(path),
    };
  });

  return (
    <nav aria-label="Breadcrumb" className="w-full bg-black/95 backdrop-blur-sm py-4 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-2 text-sm">
          <Link
            href="/"
            className="text-neutral-400 hover:text-[#FFD700] transition-colors"
          >
            Home
          </Link>
          
          {pathSegments.map((segment, index) => (
            <div key={segment.path} className="flex items-center space-x-2">
              <FiChevronRight className="text-neutral-600 w-4 h-4" />
              {index === pathSegments.length - 1 ? (
                <span aria-current="page" className="text-[#FFD700]">{segment.name}</span>
              ) : segment.linkable ? (
                <Link
                  href={segment.path}
                  className="text-neutral-400 hover:text-[#FFD700] transition-colors"
                >
                  {segment.name}
                </Link>
              ) : (
                <span className="text-neutral-400">{segment.name}</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Breadcrumb;
