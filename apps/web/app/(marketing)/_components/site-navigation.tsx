'use client';

import { useState } from 'react';
import Link from 'next/link';

const NAV_LINKS = [
  { href: '/#home', label: 'Trang Chủ' },
  { href: '/#about', label: 'Giới Thiệu' },
  { href: '/products', label: 'Sản Phẩm' },
  { href: '/#projects', label: 'Dự Án' },
  { href: '/#contact', label: 'Liên Hệ' },
];

export function SiteNavigation() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <nav className="hidden items-center gap-7 md:flex">
        {NAV_LINKS.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className="text-xs font-medium tracking-wide uppercase transition-colors duration-300 hover:text-[#C89B5E]"
            style={{ color: '#B5BDC9' }}
          >
            {l.label}
          </Link>
        ))}
      </nav>

      <button
        className="flex cursor-pointer flex-col gap-1.5 p-1 md:hidden"
        onClick={() => setMobileOpen(true)}
        aria-label="Menu"
        style={{ background: 'none', border: 'none' }}
      >
        <span className="block h-0.5 w-6 rounded bg-white" />
        <span className="block h-0.5 w-6 rounded bg-white" />
        <span className="block h-0.5 w-6 rounded bg-white" />
      </button>

      {mobileOpen && (
        <div
          className="fixed inset-0 z-[999] flex flex-col items-center justify-center gap-8"
          style={{ background: 'rgba(7,11,18,0.98)' }}
        >
          <button
            onClick={() => setMobileOpen(false)}
            className="absolute right-6 top-6 cursor-pointer text-4xl text-white"
            style={{ background: 'none', border: 'none' }}
          >
            ×
          </button>
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setMobileOpen(false)}
              className="text-xl font-medium transition-colors duration-300 hover:text-[#C89B5E]"
              style={{ color: '#B5BDC9' }}
            >
              {l.label}
            </Link>
          ))}
          <a
            href="tel:0825888222"
            className="mt-4 flex items-center gap-2 rounded-full border px-6 py-3 text-sm font-semibold"
            style={{ borderColor: '#C89B5E', color: '#C89B5E' }}
          >
            📞 0825.888.222
          </a>
        </div>
      )}
    </>
  );
}
