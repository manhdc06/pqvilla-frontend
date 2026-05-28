'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { API_URL } from '~/lib/api';

interface Product {
  id: number;
  name: string;
  category: string;
  description: string;
  image_url: string;
}

export function ProductsSection() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/api/products?limit=6`)
      .then((r) => r.json())
      .then((data) => setProducts(data))
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section
      id="products"
      className="py-24 text-center"
      style={{ background: 'var(--pq-bg-primary)' }}
    >
      <div className="mx-auto max-w-[1200px] px-5">
        <div
          className="mb-2.5 text-xs font-semibold tracking-[3px] uppercase"
          style={{ color: 'var(--pq-accent)' }}
        >
          SẢN PHẨM
        </div>
        <h2
          className="mb-12 text-4xl font-bold"
          style={{ fontFamily: 'var(--pq-font-heading)', color: 'var(--pq-text-primary)' }}
        >
          Danh mục sản phẩm
        </h2>

        {loading ? (
          <div className="py-10" style={{ color: 'var(--pq-text-secondary)' }}>
            <div
              className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-2 border-t-transparent"
              style={{ borderColor: 'var(--pq-accent)', borderTopColor: 'transparent' }}
            />
            Đang tải sản phẩm...
          </div>
        ) : (
          <div className="mb-10 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-5">
            {products.slice(0, 6).map((p) => (
              <div
                key={p.id}
                className="cursor-pointer rounded-xl border p-5 transition-all duration-300 hover:-translate-y-2"
                style={{
                  background: 'var(--pq-glass-bg)',
                  borderColor: 'var(--pq-glass-border)',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--pq-accent)';
                  (e.currentTarget as HTMLDivElement).style.boxShadow = 'var(--pq-gold-glow)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--pq-glass-border)';
                  (e.currentTarget as HTMLDivElement).style.boxShadow = 'none';
                }}
              >
                <div className="mb-4 aspect-square w-full overflow-hidden rounded-lg">
                  <Image
                    src={p.image_url}
                    alt={p.name}
                    width={300}
                    height={300}
                    className="h-full w-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                </div>
                <h3
                  className="mb-2 text-sm font-bold tracking-wide uppercase"
                  style={{ color: 'var(--pq-text-primary)' }}
                >
                  {p.name}
                </h3>
                <p className="text-xs leading-relaxed" style={{ color: 'var(--pq-text-secondary)' }}>
                  {p.description}
                </p>
              </div>
            ))}
          </div>
        )}

        <Link
          href="/products"
          className="inline-flex items-center gap-2 rounded border px-8 py-4 text-sm font-semibold tracking-wide uppercase transition-all duration-300 hover:-translate-y-0.5"
          style={{
            borderColor: 'var(--pq-glass-border)',
            color: 'var(--pq-text-primary)',
          }}
        >
          XEM TẤT CẢ SẢN PHẨM
        </Link>
      </div>
    </section>
  );
}
