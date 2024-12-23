'use client';

import { useEffect, useCallback, ReactNode } from 'react';
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

  // Web Vitals
  useEffect(() => {
    const reportWebVital = (metric: Metric) => {
      if (onPerformanceData) {
        onPerformanceData({ [metric.name]: metric.value });
      }
    };

    onCLS(reportWebVital);
    onFID(reportWebVital);
    onLCP(reportWebVital);
  }, [onPerformanceData]);

  return <>{children}</>;
};

export default PerformanceOptimizer;
