'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface Project {
  id: number;
  name: string;
  location: string;
  category: string;
  image_url: string;
}

const CATEGORIES = [
  { key: 'all', label: 'Tất Cả' },
  { key: 'nha-pho', label: 'Nhà Phố' },
  { key: 'biet-thu', label: 'Biệt Thự' },
  { key: 'chung-cu', label: 'Chung Cư' },
  { key: 'van-phong', label: 'Văn Phòng' },
  { key: 'khach-san', label: 'Khách Sạn' },
];

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetch('/api/projects')
      .then((r) => r.json())
      .then((d) => setProjects(d))
      .catch(() => setProjects([]))
      .finally(() => setLoading(false));
  }, []);

  const filtered = filter === 'all' ? projects : projects.filter((p) => p.category === filter);

  return (
    <main className="min-h-screen pb-24 pt-32" style={{ background: 'var(--pq-bg-primary)' }}>
      <div className="mx-auto max-w-[1200px] px-5">
        <div className="mb-2.5 text-center text-xs font-semibold tracking-[3px] uppercase" style={{ color: 'var(--pq-accent)' }}>
          DỰ ÁN
        </div>
        <h1 className="mb-12 text-center text-4xl font-bold" style={{ fontFamily: 'var(--pq-font-heading)', color: 'var(--pq-text-primary)' }}>
          Công trình tiêu biểu
        </h1>

        <div className="mb-10 flex flex-wrap justify-center gap-3">
          {CATEGORIES.map((c) => (
            <button key={c.key} onClick={() => setFilter(c.key)}
              className="cursor-pointer rounded-full border px-6 py-2.5 text-sm font-medium transition-all duration-300"
              style={filter === c.key
                ? { background: 'var(--pq-accent)', color: 'var(--pq-bg-primary)', borderColor: 'var(--pq-accent)', fontWeight: 600 }
                : { background: 'transparent', color: 'var(--pq-text-secondary)', borderColor: 'var(--pq-glass-border)' }}>
              {c.label}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="py-20 text-center" style={{ color: 'var(--pq-text-secondary)' }}>
            <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-2"
              style={{ borderColor: 'var(--pq-accent)', borderTopColor: 'transparent' }} />
            Đang tải...
          </div>
        ) : filtered.length === 0 ? (
          <p className="py-20 text-center" style={{ color: 'var(--pq-text-secondary)' }}>Chưa có dự án nào.</p>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((p) => (
              <Link key={p.id} href={`/projects/${p.id}`}
                className="group overflow-hidden rounded-2xl border transition-all duration-300 hover:-translate-y-2"
                style={{ background: 'var(--pq-glass-bg)', borderColor: 'var(--pq-glass-border)' }}>
                <div className="overflow-hidden">
                  <Image src={p.image_url} alt={p.name} width={600} height={400}
                    className="h-56 w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
                <div className="p-5">
                  <span className="mb-2 inline-block rounded-full px-3 py-1 text-[10px] font-semibold tracking-wide uppercase"
                    style={{ background: 'rgba(200,155,94,0.15)', color: 'var(--pq-accent)' }}>
                    {CATEGORIES.find((c) => c.key === p.category)?.label ?? p.category}
                  </span>
                  <h3 className="mb-1 font-bold" style={{ color: 'var(--pq-text-primary)' }}>{p.name}</h3>
                  {p.location && <p className="text-sm" style={{ color: 'var(--pq-text-secondary)' }}>📍 {p.location}</p>}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
