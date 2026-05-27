'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

import { AppLogo } from '~/components/app-logo';

import { SiteNavigation } from './site-navigation';

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className="fixed left-0 top-0 z-[1000] w-full transition-all duration-400"
      style={
        scrolled
          ? {
              background: 'rgba(7,11,18,0.97)',
              backdropFilter: 'blur(20px)',
              borderBottom: '1px solid rgba(255,255,255,0.1)',
              padding: '10px 0',
              boxShadow: '0 2px 30px rgba(0,0,0,0.5)',
            }
          : {
              background: 'transparent',
              padding: '14px 0',
            }
      }
    >
      <div className="mx-auto flex max-w-[1200px] items-center justify-between px-5">
        <AppLogo />
        <SiteNavigation />
        <a
          href="tel:0962777317"
          className="hidden items-center gap-2 rounded-full border px-6 py-2.5 text-sm font-semibold transition-all duration-300 md:inline-flex"
          style={{ borderColor: '#C89B5E', color: '#C89B5E' }}
        >
          📞 0962 777 317
        </a>
      </div>
    </header>
  );
}
