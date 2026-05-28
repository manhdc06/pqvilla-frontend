'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';

import { ContactModal } from '~/components/pqvilla/contact-modal';

interface Project {
  id: number;
  name: string;
  location: string;
  category: string;
  image_url: string;
  images: string[];
}

const CATEGORY_LABELS: Record<string, string> = {
  'nha-pho': 'Nhà Phố',
  'biet-thu': 'Biệt Thự',
  'chung-cu': 'Chung Cư',
  'van-phong': 'Văn Phòng',
  'khach-san': 'Khách Sạn',
  'khac': 'Khác',
};

export default function ProjectDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [activeImg, setActiveImg] = useState('');
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    fetch(`/api/projects/${id}`)
      .then((r) => r.json())
      .then((d) => {
        setProject(d);
        setActiveImg(d.image_url);
      });
  }, [id]);

  if (!project) {
    return (
      <main className="flex min-h-screen items-center justify-center" style={{ background: 'var(--pq-bg-primary)' }}>
        <div className="h-10 w-10 animate-spin rounded-full border-2" style={{ borderColor: 'var(--pq-accent)', borderTopColor: 'transparent' }} />
      </main>
    );
  }

  const allImages = [project.image_url, ...(project.images || [])].filter(Boolean);

  return (
    <main className="min-h-screen pb-24 pt-28" style={{ background: 'var(--pq-bg-primary)' }}>
      <div className="mx-auto max-w-[1100px] px-5">
        <div className="mb-8 flex items-center gap-2 text-sm" style={{ color: 'var(--pq-text-secondary)' }}>
          <Link href="/" style={{ color: 'var(--pq-text-secondary)' }} className="hover:underline">Trang chủ</Link>
          <span>/</span>
          <Link href="/projects" style={{ color: 'var(--pq-text-secondary)' }} className="hover:underline">Dự án</Link>
          <span>/</span>
          <span style={{ color: 'var(--pq-accent)' }}>{project.name}</span>
        </div>

        {/* Hero image */}
        <div className="mb-8 overflow-hidden rounded-2xl border" style={{ borderColor: 'var(--pq-glass-border)' }}>
          <Image src={activeImg} alt={project.name} width={1100} height={600} className="h-[500px] w-full object-cover transition-all duration-500" />
        </div>

        {/* Thumbnails */}
        {allImages.length > 1 && (
          <div className="mb-10 flex gap-3 overflow-x-auto pb-2">
            {allImages.map((img, i) => (
              <button
                key={i}
                onClick={() => setActiveImg(img)}
                className="shrink-0 overflow-hidden rounded-xl border-2 transition-all duration-200"
                style={{ borderColor: activeImg === img ? 'var(--pq-accent)' : 'transparent' }}
              >
                <Image src={img} alt={`${project.name} ${i + 1}`} width={120} height={85} className="h-[85px] w-[120px] object-cover" />
              </button>
            ))}
          </div>
        )}

        <div className="grid gap-10 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <span
              className="mb-3 inline-block w-fit rounded-full px-4 py-1 text-xs font-semibold tracking-widest uppercase"
              style={{ background: 'rgba(200,155,94,0.15)', color: 'var(--pq-accent)' }}
            >
              {CATEGORY_LABELS[project.category] ?? project.category}
            </span>
            <h1 className="mb-4 text-4xl font-bold" style={{ fontFamily: 'var(--pq-font-heading)', color: 'var(--pq-text-primary)' }}>
              {project.name}
            </h1>
            {project.location && (
              <p className="mb-6 text-base" style={{ color: 'var(--pq-text-secondary)' }}>
                📍 {project.location}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-4">
            <button
              onClick={() => setModalOpen(true)}
              className="w-full rounded-full px-6 py-3.5 text-sm font-semibold tracking-wide uppercase transition-all duration-300 hover:-translate-y-0.5"
              style={{ background: 'var(--pq-accent)', color: 'var(--pq-bg-primary)' }}
            >
              Liên hệ tư vấn
            </button>
            <a
              href="tel:0962777317"
              className="w-full rounded-full border px-6 py-3.5 text-center text-sm font-semibold tracking-wide uppercase transition-all duration-300 hover:-translate-y-0.5"
              style={{ borderColor: 'var(--pq-accent)', color: 'var(--pq-accent)' }}
            >
              📞 0962 777 317
            </a>
          </div>
        </div>
      </div>

      <ContactModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </main>
  );
}
