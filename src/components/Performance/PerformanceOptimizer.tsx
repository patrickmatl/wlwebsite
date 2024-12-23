'use client';

import { useEffect, useCallback, ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { onCLS, onFID, onLCP, Metric } from 'web-vitals';

interface PerformanceOptimizerProps {
  children: ReactNode;
  onPerformanceData?: (data: PerformanceData) => void;
}

interface PerformanceData {
  fcp?: number;
  lcp?: number;
  cls?: number;
  fid?: number;
}

interface LayoutShift extends PerformanceEntry {
  value: number;
}

interface FirstInput extends PerformanceEntry {
  processingStart: number;
}

const PerformanceOptimizer = ({ children, onPerformanceData }: PerformanceOptimizerProps) => {
  const pathname = usePathname();

  const handlePerformanceEntry = useCallback((entry: PerformanceEntry) => {
    if (!onPerformanceData) return;

    const data: Partial<PerformanceData> = {};
    
    switch(entry.entryType) {
      case 'first-contentful-paint':
        data.fcp = entry.startTime;
        break;
      case 'largest-contentful-paint':
        data.lcp = entry.startTime;
        break;
      case 'layout-shift':
        data.cls = (entry as LayoutShift).value;
        break;
      case 'first-input':
        data.fid = (entry as FirstInput).processingStart - entry.startTime;
        break;
    }

    if (Object.keys(data).length > 0) {
      onPerformanceData(data);
    }
  }, [onPerformanceData]);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        list.getEntries().forEach(handlePerformanceEntry);
      });

      observer.observe({ entryTypes: ['first-contentful-paint', 'largest-contentful-paint', 'layout-shift', 'first-input'] });

      return () => observer.disconnect();
    }
  }, [handlePerformanceEntry]);

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
