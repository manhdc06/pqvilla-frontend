'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { API_URL } from '~/lib/api';

interface Product {
  id: number;
  name: string;
  category: string;
  description?: string;
  image_url: string;
}

export function ProductsSection() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const trackRef = useRef<HTMLDivElement>(null);
  const CARD_W = 220; // px per card + gap

  useEffect(() => {
    fetch(`${API_URL}/api/products`)
      .then((r) => r.json())
      .then((data) => setProducts(data))
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  }, []);

  const scroll = (dir: 'left' | 'right') => {
    trackRef.current?.scrollBy({ left: dir === 'right' ? CARD_W * 2 : -CARD_W * 2, behavior: 'smooth' });
  };

  return (
    <section id="products" className="py-24 text-center" style={{ background: 'var(--pq-bg-primary)' }}>
      <div className="mx-auto max-w-[1200px] px-5">
        <div className="mb-2.5 text-xs font-semibold tracking-[3px] uppercase" style={{ color: 'var(--pq-accent)' }}>
          SẢN PHẨM
        </div>
        <h2 className="mb-12 text-4xl font-bold" style={{ fontFamily: 'var(--pq-font-heading)', color: 'var(--pq-text-primary)' }}>
          Danh mục sản phẩm
        </h2>

        {loading ? (
          <div className="py-10" style={{ color: 'var(--pq-text-secondary)' }}>
            <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-2" style={{ borderColor: 'var(--pq-accent)', borderTopColor: 'transparent' }} />
            Đang tải sản phẩm...
          </div>
        ) : (
          <div className="relative mb-10">
            {/* Prev */}
            <button
              onClick={() => scroll('left')}
              className="absolute -left-5 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border shadow-lg transition-all hover:scale-110"
              style={{ background: 'var(--pq-bg-secondary)', borderColor: 'var(--pq-glass-border)', color: 'var(--pq-text-primary)' }}
            >
              ‹
            </button>

            {/* Track */}
            <div
              ref={trackRef}
              className="flex gap-4 overflow-x-auto pb-1"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {products.map((p) => (
                <Link
                  key={p.id}
                  href={`/products/${p.id}`}
                  className="group block shrink-0 overflow-hidden rounded-xl border transition-all duration-300 hover:-translate-y-1"
                  style={{ width: 200, background: 'var(--pq-glass-bg)', borderColor: 'var(--pq-glass-border)' }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.borderColor = 'var(--pq-accent)'; (e.currentTarget as HTMLAnchorElement).style.boxShadow = 'var(--pq-gold-glow)'; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.borderColor = 'var(--pq-glass-border)'; (e.currentTarget as HTMLAnchorElement).style.boxShadow = 'none'; }}
                >
                  <div className="aspect-square w-full overflow-hidden">
                    <Image src={p.image_url} alt={p.name} width={200} height={200} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  </div>
                  <div className="p-3 text-left">
                    <p className="mb-1 text-[10px] font-semibold uppercase tracking-widest" style={{ color: 'var(--pq-accent)' }}>{p.category}</p>
                    <h3 className="mb-1 line-clamp-2 text-xs font-bold leading-tight uppercase" style={{ color: 'var(--pq-text-primary)' }}>{p.name}</h3>
                    {p.description && <p className="line-clamp-2 text-[11px] leading-relaxed" style={{ color: 'var(--pq-text-secondary)' }}>{p.description}</p>}
                  </div>
                </Link>
              ))}
            </div>

            {/* Next */}
            <button
              onClick={() => scroll('right')}
              className="absolute -right-5 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border shadow-lg transition-all hover:scale-110"
              style={{ background: 'var(--pq-bg-secondary)', borderColor: 'var(--pq-glass-border)', color: 'var(--pq-text-primary)' }}
            >
              ›
            </button>
          </div>
        )}

        <Link
          href="/products"
          className="inline-flex items-center gap-2 rounded border px-8 py-4 text-sm font-semibold tracking-wide uppercase transition-all duration-300 hover:-translate-y-0.5"
          style={{ borderColor: 'var(--pq-glass-border)', color: 'var(--pq-text-primary)' }}
        >
          XEM TẤT CẢ SẢN PHẨM
        </Link>
      </div>
    </section>
  );
}
