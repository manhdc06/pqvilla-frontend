'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';

const slides = [
  { bg: '/images/hero/hero-1.png' },
  { bg: '/images/hero/hero-2.png' },
  { bg: '/images/hero/hero-3.png' },
];

export function HeroSection({ onOpenModal }: { onOpenModal: () => void }) {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => setCurrent((c) => (c + 1) % slides.length), []);
  const prev = useCallback(() => setCurrent((c) => (c - 1 + slides.length) % slides.length), []);

  useEffect(() => {
    const t = setInterval(next, 5000);
    return () => clearInterval(t);
  }, [next]);

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden"
      style={{ background: 'var(--pq-bg-primary)' }}
    >
      {/* Slider */}
      <div className="absolute inset-0 z-0">
        {slides.map((s, i) => (
          <div
            key={i}
            className="absolute inset-0 transition-opacity duration-[1200ms]"
            style={{
              backgroundImage: `url(${s.bg})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              opacity: i === current ? 1 : 0,
            }}
          >
            <div
              className="absolute inset-0"
              style={{
                background:
                  'linear-gradient(to right, rgba(7,11,18,0.85) 0%, rgba(7,11,18,0.6) 50%, rgba(7,11,18,0.3) 100%)',
              }}
            />
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 w-full px-[5vw]">
        <div className="max-w-[520px]">
          <h1
            className="mb-5 font-light tracking-widest uppercase"
            style={{ fontFamily: 'var(--pq-font-body)', fontSize: '2.2rem', lineHeight: 1.3 }}
          >
            GIẢI PHÁP
            <span
              className="my-1 block font-bold italic"
              style={{
                color: 'var(--pq-accent)',
                fontFamily: 'var(--pq-font-heading)',
                fontSize: '2.8rem',
                lineHeight: 1.2,
              }}
            >
              NHÔM KÍNH CAO CẤP
            </span>
            CHO MỌI CÔNG TRÌNH
          </h1>
          <p
            className="mb-8 max-w-[480px] leading-relaxed"
            style={{ color: 'var(--pq-text-secondary)', fontSize: '0.92rem' }}
          >
            Chuyên thiết kế, thi công các hạng mục nhôm kính cao cấp: cửa nhôm, cửa kính, vách kính,
            mặt dựng... Cam kết chất lượng – Tiến độ – Bền đẹp với thời gian.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={onOpenModal}
              className="flex cursor-pointer items-center gap-2 rounded px-8 py-4 text-sm font-semibold tracking-wide uppercase transition-all duration-300 hover:-translate-y-0.5"
              style={{
                background: 'var(--pq-accent)',
                color: 'var(--pq-bg-primary)',
              }}
            >
              NHẬN BÁO GIÁ →
            </button>
            <Link
              href="#projects"
              className="rounded border px-8 py-4 text-sm font-semibold tracking-wide uppercase transition-all duration-300 hover:-translate-y-0.5"
              style={{
                borderColor: 'var(--pq-glass-border)',
                color: 'var(--pq-text-primary)',
              }}
            >
              XEM DỰ ÁN
            </Link>
          </div>
        </div>
      </div>

      {/* Arrows */}
      <button
        onClick={prev}
        aria-label="Previous"
        className="absolute left-8 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border text-lg backdrop-blur-md transition-all hidden md:flex"
        style={{
          background: 'var(--pq-glass-bg)',
          borderColor: 'var(--pq-glass-border)',
          color: 'var(--pq-text-primary)',
        }}
      >
        ‹
      </button>
      <button
        onClick={next}
        aria-label="Next"
        className="absolute right-8 top-1/2 z-20 hidden h-11 w-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border text-lg backdrop-blur-md transition-all md:flex"
        style={{
          background: 'var(--pq-glass-bg)',
          borderColor: 'var(--pq-glass-border)',
          color: 'var(--pq-text-primary)',
        }}
      >
        ›
      </button>

      {/* Dots */}
      <div className="absolute bottom-10 left-1/2 z-20 flex -translate-x-1/2 gap-2.5">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className="h-2.5 cursor-pointer rounded-full transition-all duration-300"
            style={{
              width: i === current ? '30px' : '10px',
              background: i === current ? 'var(--pq-accent)' : 'var(--pq-glass-border)',
            }}
          />
        ))}
      </div>
    </section>
  );
}
