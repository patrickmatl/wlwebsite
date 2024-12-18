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
      // Mark LCP elements for priority loading
      const lcpElements = document.querySelectorAll('[data-lcp="true"]');
      lcpElements.forEach((element) => {
        if (element instanceof HTMLElement) {
          // Force immediate paint of LCP elements
          element.style.visibility = 'visible';
          element.style.contentVisibility = 'visible';
          element.style.contain = 'none';
        }
      });
    };

    // Monitor performance metrics with more detailed logging
    const reportWebVitals = ({ name, delta, id, value }: Metric) => {
      // Log performance metrics
      if (name === 'LCP') {
        console.log('LCP detected:', {
          value: Math.round(value),
          element: document.querySelector('[data-lcp="true"]')?.textContent
        });
      }
    };

    preloadResources();
    optimizeLCP();

    // Monitor Core Web Vitals
    onLCP(reportWebVitals);
    onFID(reportWebVitals);
    onCLS(reportWebVitals);

  }, [pathname]);

  return <>{children}</>;
};

export default PerformanceOptimizer;
