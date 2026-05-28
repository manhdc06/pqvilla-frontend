'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';

import { ContactModal } from '~/components/pqvilla/contact-modal';

interface Product {
  id: number;
  name: string;
  category: string;
  description: string;
  image_url: string;
  images: string[];
}

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [activeImg, setActiveImg] = useState('');
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    fetch(`/api/products/${id}`)
      .then((r) => r.json())
      .then((d) => {
        setProduct(d);
        setActiveImg(d.image_url);
      });
  }, [id]);

  if (!product) {
    return (
      <main className="flex min-h-screen items-center justify-center" style={{ background: 'var(--pq-bg-primary)' }}>
        <div className="h-10 w-10 animate-spin rounded-full border-2" style={{ borderColor: 'var(--pq-accent)', borderTopColor: 'transparent' }} />
      </main>
    );
  }

  const allImages = [product.image_url, ...(product.images || [])].filter(Boolean);

  return (
    <main className="min-h-screen pb-24 pt-28" style={{ background: 'var(--pq-bg-primary)' }}>
      <div className="mx-auto max-w-[1100px] px-5">
        {/* Breadcrumb */}
        <div className="mb-8 flex items-center gap-2 text-sm" style={{ color: 'var(--pq-text-secondary)' }}>
          <Link href="/" style={{ color: 'var(--pq-text-secondary)' }} className="hover:underline">Trang chủ</Link>
          <span>/</span>
          <Link href="/products" style={{ color: 'var(--pq-text-secondary)' }} className="hover:underline">Sản phẩm</Link>
          <span>/</span>
          <span style={{ color: 'var(--pq-accent)' }}>{product.name}</span>
        </div>

        <div className="grid gap-12 lg:grid-cols-2">
          {/* Gallery */}
          <div>
            <div className="mb-4 overflow-hidden rounded-2xl border" style={{ borderColor: 'var(--pq-glass-border)', background: 'var(--pq-glass-bg)' }}>
              <Image
                src={activeImg}
                alt={product.name}
                width={700}
                height={500}
                className="h-[420px] w-full object-cover transition-all duration-500"
              />
            </div>
            {allImages.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {allImages.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImg(img)}
                    className="shrink-0 overflow-hidden rounded-lg border-2 transition-all duration-200"
                    style={{ borderColor: activeImg === img ? 'var(--pq-accent)' : 'transparent' }}
                  >
                    <Image src={img} alt={`${product.name} ${i + 1}`} width={90} height={70} className="h-[70px] w-[90px] object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div className="flex flex-col justify-center">
            <span
              className="mb-3 inline-block w-fit rounded-full px-4 py-1 text-xs font-semibold tracking-widest uppercase"
              style={{ background: 'rgba(200,155,94,0.15)', color: 'var(--pq-accent)' }}
            >
              {product.category}
            </span>
            <h1
              className="mb-6 text-4xl font-bold leading-tight"
              style={{ fontFamily: 'var(--pq-font-heading)', color: 'var(--pq-text-primary)' }}
            >
              {product.name}
            </h1>
            <p className="mb-8 text-base leading-relaxed" style={{ color: 'var(--pq-text-secondary)' }}>
              {product.description}
            </p>

            <div className="mb-8 rounded-xl border p-5" style={{ borderColor: 'var(--pq-glass-border)', background: 'var(--pq-glass-bg)' }}>
              <p className="mb-1 text-sm font-semibold" style={{ color: 'var(--pq-accent)' }}>Cam kết chất lượng</p>
              <ul className="space-y-1 text-sm" style={{ color: 'var(--pq-text-secondary)' }}>
                <li>✓ Vật liệu nhôm kính cao cấp, chính hãng</li>
                <li>✓ Thi công chuyên nghiệp, đúng tiến độ</li>
                <li>✓ Bảo hành dài hạn, hỗ trợ sau bán hàng</li>
              </ul>
            </div>

            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => setModalOpen(true)}
                className="rounded-full px-8 py-3.5 text-sm font-semibold tracking-wide uppercase transition-all duration-300 hover:-translate-y-0.5"
                style={{ background: 'var(--pq-accent)', color: 'var(--pq-bg-primary)' }}
              >
                Liên hệ báo giá
              </button>
              <a
                href="tel:0825888222"
                className="rounded-full border px-8 py-3.5 text-sm font-semibold tracking-wide uppercase transition-all duration-300 hover:-translate-y-0.5"
                style={{ borderColor: 'var(--pq-accent)', color: 'var(--pq-accent)' }}
              >
                📞 0825.888.222
              </a>
            </div>
          </div>
        </div>
      </div>

      <ContactModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </main>
  );
}
