'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

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
    const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8000';
    fetch(`${apiUrl}/api/products`)
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
              <div
                key={p.id}
                className="cursor-pointer rounded-xl border p-5 transition-all duration-300 hover:-translate-y-2"
                style={{ background: 'var(--pq-glass-bg)', borderColor: 'var(--pq-glass-border)' }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--pq-accent)'; (e.currentTarget as HTMLDivElement).style.boxShadow = 'var(--pq-gold-glow)'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--pq-glass-border)'; (e.currentTarget as HTMLDivElement).style.boxShadow = 'none'; }}
              >
                <div className="mb-4 aspect-square w-full overflow-hidden rounded-lg">
                  <Image src={p.image_url} alt={p.name} width={400} height={400} className="h-full w-full object-cover transition-transform duration-500 hover:scale-110" />
                </div>
                <span
                  className="mb-2 inline-block rounded-full px-3 py-1 text-[10px] font-semibold tracking-wide uppercase"
                  style={{ background: 'rgba(200,155,94,0.15)', color: 'var(--pq-accent)' }}
                >
                  {p.category}
                </span>
                <h3 className="mb-2 text-sm font-bold tracking-wide uppercase" style={{ color: 'var(--pq-text-primary)' }}>
                  {p.name}
                </h3>
                <p className="text-xs leading-relaxed" style={{ color: 'var(--pq-text-secondary)' }}>
                  {p.description}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
