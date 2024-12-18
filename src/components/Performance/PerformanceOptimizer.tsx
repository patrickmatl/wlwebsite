'use client';

import { useEffect, ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { onCLS, onFID, onLCP, Metric } from 'web-vitals';

interface PerformanceOptimizerProps {
  children: ReactNode;
}

const PerformanceOptimizer = ({ children }: PerformanceOptimizerProps) => {
  const pathname = usePathname();

  useEffect(() => {
    // Preload critical resources
    const preloadResources = () => {
      const resources = [
        { href: '/fonts/syne.woff2', as: 'font', type: 'font/woff2' },
        { href: '/fonts/space-grotesk.woff2', as: 'font', type: 'font/woff2' },
        { href: '/images/hero/hero1.webp', as: 'image' },
      ];

      resources.forEach(({ href, as, type }) => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = href;
        link.as = as;
        if (type) link.type = type;
        link.crossOrigin = 'anonymous';
        document.head.appendChild(link);
      });
    };

    // Optimize LCP
    const optimizeLCP = () => {
      // Add loading="eager" to LCP elements
      const lcpElements = document.querySelectorAll('img[data-lcp="true"]');
      lcpElements.forEach((element) => {
        if (element instanceof HTMLImageElement) {
          element.loading = 'eager';
          element.fetchPriority = 'high';
        }
      });
    };

    // Monitor performance metrics
    const reportWebVitals = ({ name, delta, id, value }: Metric) => {
      // Send to analytics
      console.log(`${name} metric:`, {
        name,
        delta,
        id,
        value
      });
    };

    // Monitor Core Web Vitals using web-vitals package
    onCLS(reportWebVitals);
    onFID(reportWebVitals);
    onLCP(reportWebVitals);

    preloadResources();
    optimizeLCP();

    // No cleanup needed for web-vitals as they auto-cleanup
  }, [pathname]);

  return <>{children}</>;
};

export default PerformanceOptimizer;
