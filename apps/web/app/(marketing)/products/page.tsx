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

const CATEGORIES = [
  { key: 'all', label: 'Tất Cả' },
  { key: 'CỬA NHÔM', label: 'Cửa Nhôm' },
  { key: 'VÁCH KÍNH', label: 'Vách Kính' },
  { key: 'MẶT DỰNG', label: 'Mặt Dựng' },
  { key: 'KHÁC', label: 'Khác' },
];

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetch(`${API_URL}/api/products`)
      .then((r) => r.json())
      .then((data) => setProducts(data))
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  }, []);

  const filtered = filter === 'all' ? products : products.filter((p) => p.category === filter);

  return (
    <main className="min-h-screen pb-24 pt-32" style={{ background: 'var(--pq-bg-primary)' }}>
      <div className="mx-auto max-w-[1200px] px-5">
        <div
          className="mb-2.5 text-center text-xs font-semibold tracking-[3px] uppercase"
          style={{ color: 'var(--pq-accent)' }}
        >
          SẢN PHẨM
        </div>
        <h1
          className="mb-12 text-center text-4xl font-bold"
          style={{ fontFamily: 'var(--pq-font-heading)', color: 'var(--pq-text-primary)' }}
        >
          Tất cả sản phẩm
        </h1>

        {/* Filters */}
        <div className="mb-10 flex flex-wrap justify-center gap-3">
          {CATEGORIES.map((c) => (
            <button
              key={c.key}
              onClick={() => setFilter(c.key)}
              className="cursor-pointer rounded-full border px-6 py-2.5 text-sm font-medium transition-all duration-300"
              style={
                filter === c.key
                  ? { background: 'var(--pq-accent)', color: 'var(--pq-bg-primary)', borderColor: 'var(--pq-accent)', fontWeight: 600 }
                  : { background: 'transparent', color: 'var(--pq-text-secondary)', borderColor: 'var(--pq-glass-border)' }
              }
            >
              {c.label}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="py-20 text-center" style={{ color: 'var(--pq-text-secondary)' }}>
            <div
              className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-2"
              style={{ borderColor: 'var(--pq-accent)', borderTopColor: 'transparent' }}
            />
            Đang tải sản phẩm...
          </div>
        ) : filtered.length === 0 ? (
          <p className="py-20 text-center" style={{ color: 'var(--pq-text-secondary)' }}>
            Chưa có sản phẩm nào.
          </p>
        ) : (
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
            {filtered.map((p) => (
              <Link
                key={p.id}
                href={`/products/${p.id}`}
                className="group block overflow-hidden rounded-xl border transition-all duration-300 hover:-translate-y-1"
                style={{ background: 'var(--pq-glass-bg)', borderColor: 'var(--pq-glass-border)' }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.borderColor = 'var(--pq-accent)'; (e.currentTarget as HTMLAnchorElement).style.boxShadow = 'var(--pq-gold-glow)'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.borderColor = 'var(--pq-glass-border)'; (e.currentTarget as HTMLAnchorElement).style.boxShadow = 'none'; }}
              >
                <div className="aspect-square w-full overflow-hidden">
                  <Image src={p.image_url} alt={p.name} width={400} height={400} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
                <div className="p-3">
                  <p className="mb-1 text-[10px] font-semibold uppercase tracking-widest" style={{ color: 'var(--pq-accent)' }}>{p.category}</p>
                  <h3 className="line-clamp-2 text-xs font-bold leading-tight uppercase" style={{ color: 'var(--pq-text-primary)' }}>{p.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
