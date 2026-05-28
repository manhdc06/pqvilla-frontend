'use client';

import { useEffect, useState } from 'react';

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
        <div className="hidden items-center gap-3 md:flex">
          <a
            href="/auth/sign-in"
            className="rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-300"
            style={{ color: '#C89B5E', border: '1px solid rgba(200,155,94,0.4)' }}
          >
            Đăng nhập
          </a>
          <a
            href="tel:0962777317"
            className="rounded-full border px-6 py-2.5 text-sm font-semibold transition-all duration-300"
            style={{ borderColor: '#C89B5E', color: '#C89B5E' }}
          >
            📞 0962 777 317
          </a>
        </div>
      </div>
    </header>
  );
}
