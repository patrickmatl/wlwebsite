'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

interface PerformanceOptimizerProps {
  children: React.ReactNode;
}

interface WebVitalsMetric {
  name: string;
  delta: number;
  id: string;
}

export default function PerformanceOptimizer({ children }: PerformanceOptimizerProps) {
  const pathname = usePathname();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    // Preload critical resources
    const preloadResources = () => {
      // Preload critical fonts
      const fontUrls = [
        '/fonts/syne.woff2',
        '/fonts/space-grotesk.woff2'
      ];
      
      fontUrls.forEach(url => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'font';
        link.type = 'font/woff2';
        link.href = url;
        link.crossOrigin = 'anonymous';
        document.head.appendChild(link);
      });

      // Preload critical images
      const imageUrls = ['/logo.webp', '/hero-bg.webp'];
      imageUrls.forEach(url => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = url;
        document.head.appendChild(link);
      });
    };

    // Optimize resource loading
    const optimizeResources = () => {
      // Defer non-critical resources
      const deferScripts = document.querySelectorAll('script[data-defer]');
      deferScripts.forEach(script => {
        script.setAttribute('defer', '');
      });

      // Lazy load images that are off-screen
      if ('loading' in HTMLImageElement.prototype) {
        const lazyImages = document.querySelectorAll('img[loading="lazy"]');
        lazyImages.forEach(img => {
          img.setAttribute('loading', 'lazy');
        });
      }
    };

    // Monitor performance metrics
    const monitorPerformance = () => {
      // Monitor Core Web Vitals
      const reportWebVitals = ({ name, delta, id }: WebVitalsMetric) => {
        // Send to analytics
        console.log(`${name} metric:`, {
          name,
          value: delta,
          id
        });
      };

      // Only observe if PerformanceObserver is available
      if ('PerformanceObserver' in window) {
        // Observe LCP
        try {
          new PerformanceObserver((entryList) => {
            const entries = entryList.getEntries();
            const lastEntry = entries[entries.length - 1] as PerformanceEntry & { startTime: number };
            reportWebVitals({
              name: 'LCP',
              delta: lastEntry.startTime,
              id: 'lcp-' + pathname
            });
          }).observe({ entryTypes: ['largest-contentful-paint'] });
        } catch (e) {
          console.warn('LCP observation failed:', e);
        }

        // Observe FID
        try {
          new PerformanceObserver((entryList) => {
            const entries = entryList.getEntries();
            entries.forEach(entry => {
              const fidEntry = entry as PerformanceEntry & { 
                processingStart: number;
                startTime: number;
              };
              reportWebVitals({
                name: 'FID',
                delta: fidEntry.processingStart - fidEntry.startTime,
                id: 'fid-' + pathname
              });
            });
          }).observe({ entryTypes: ['first-input'] });
        } catch (e) {
          console.warn('FID observation failed:', e);
        }

        // Observe CLS
        try {
          new PerformanceObserver((entryList) => {
            const entries = entryList.getEntries();
            entries.forEach(entry => {
              const clsEntry = entry as PerformanceEntry & { value: number };
              reportWebVitals({
                name: 'CLS',
                delta: clsEntry.value,
                id: 'cls-' + pathname
              });
            });
          }).observe({ entryTypes: ['layout-shift'] });
        } catch (e) {
          console.warn('CLS observation failed:', e);
        }
      }
    };

    // Execute optimizations
    preloadResources();
    optimizeResources();
    monitorPerformance();

    // Cleanup function
    return () => {
      // Cleanup will be handled by React
    };
  }, [isClient, pathname]); // Re-run when pathname changes and after client-side hydration

  return <>{children}</>;
}
