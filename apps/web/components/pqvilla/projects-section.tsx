'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { API_URL } from '~/lib/api';

interface Project {
  id: number;
  name: string;
  location: string;
  category: string;
  image_url: string;
}

const FILTERS = [
  { key: 'all', label: 'Tất Cả' },
  { key: 'nha-pho', label: 'Nhà Phố' },
  { key: 'biet-thu', label: 'Biệt Thự' },
  { key: 'chung-cu', label: 'Chung Cư' },
  { key: 'van-phong', label: 'Văn Phòng' },
  { key: 'khach-san', label: 'Khách Sạn' },
];

export function ProjectsSection() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const apiUrl = API_URL;
    fetch(`${apiUrl}/api/projects`)
      .then((r) => r.json())
      .then((data) => setProjects(data))
      .catch(() => setProjects([]))
      .finally(() => setLoading(false));
  }, []);

  const filtered = filter === 'all' ? projects : projects.filter((p) => p.category === filter);

  return (
    <section
      id="projects"
      className="py-24 text-center"
      style={{ background: 'var(--pq-bg-secondary)' }}
    >
      <div className="mx-auto max-w-[1200px] px-5">
        <div
          className="mb-2.5 text-xs font-semibold tracking-[3px] uppercase"
          style={{ color: 'var(--pq-accent)' }}
        >
          DỰ ÁN
        </div>
        <h2
          className="mb-12 text-4xl font-bold"
          style={{ fontFamily: 'var(--pq-font-heading)', color: 'var(--pq-text-primary)' }}
        >
          Một số công trình tiêu biểu
        </h2>

        {/* Filters */}
        <div className="mb-10 flex flex-wrap justify-center gap-3">
          {FILTERS.map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className="cursor-pointer rounded-full border px-6 py-2.5 text-sm font-medium transition-all duration-300"
              style={
                filter === f.key
                  ? {
                      background: 'var(--pq-accent)',
                      color: 'var(--pq-bg-primary)',
                      borderColor: 'var(--pq-accent)',
                      fontWeight: 600,
                    }
                  : {
                      background: 'transparent',
                      color: 'var(--pq-text-secondary)',
                      borderColor: 'var(--pq-glass-border)',
                    }
              }
            >
              {f.label}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="py-10" style={{ color: 'var(--pq-text-secondary)' }}>
            <div
              className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-2"
              style={{ borderColor: 'var(--pq-accent)', borderTopColor: 'transparent' }}
            />
            Đang tải dự án...
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
            {filtered.map((p) => (
              <Link
                key={p.id}
                href={`/projects/${p.id}`}
                className="group relative aspect-[4/3] block overflow-hidden rounded-xl"
              >
                <Image
                  src={p.image_url}
                  alt={p.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div
                  className="absolute inset-0 flex flex-col justify-end p-5 transition-all duration-300"
                  style={{ background: 'linear-gradient(to top, rgba(7,11,18,0.9) 0%, transparent 60%)' }}
                >
                  <h4 className="mb-1 text-sm font-semibold text-white">{p.name}</h4>
                  {p.location && <span className="text-xs" style={{ color: 'var(--pq-text-secondary)' }}>{p.location}</span>}
                  <span className="mt-2 text-[10px] font-semibold uppercase tracking-widest opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{ color: 'var(--pq-accent)' }}>Xem chi tiết →</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
