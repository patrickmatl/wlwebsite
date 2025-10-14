'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

const AudioPlayer = dynamic(() => import('@/components/AudioPlayer'), { ssr: false });
const WhatsAppButton = dynamic(() => import('@/components/WhatsAppButton'), { ssr: false });
const MobileContactBar = dynamic(() => import('@/components/MobileContactBar'), { ssr: false });

export default function DeferredUI() {
  const [idle, setIdle] = useState(false);

  useEffect(() => {
    const hasRIC = typeof window !== 'undefined' && 'requestIdleCallback' in window;
    const rIC: Window['requestIdleCallback'] | undefined = hasRIC
      ? window.requestIdleCallback
      : undefined;
    if (rIC) {
      rIC(() => setIdle(true));
    } else {
      const t = setTimeout(() => setIdle(true), 1200);
      return () => clearTimeout(t);
    }
  }, []);

  useEffect(() => {
    if (!idle) return;
    // Load Material Icons CSS after idle to avoid render-blocking
    const href = 'https://fonts.googleapis.com/icon?family=Material+Icons';
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    document.head.appendChild(link);
    return () => {
      // Optional cleanup: keep the stylesheet attached
    };
  }, [idle]);

  if (!idle) return null;

  return (
    <>
      <AudioPlayer />
      <WhatsAppButton />
      <MobileContactBar />
    </>
  );
}