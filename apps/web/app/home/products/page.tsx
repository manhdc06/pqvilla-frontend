'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface Product {
  id: number;
  name: string;
  category: string;
  description: string;
  image_url: string;
  images: string[];
}

const CATEGORIES = ['CỬA NHÔM', 'VÁCH KÍNH', 'MẶT DỰNG', 'KHÁC'];

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [extraPreviews, setExtraPreviews] = useState<string[]>([]);
  const [form, setForm] = useState({ name: '', category: 'CỬA NHÔM', description: '' });
  const fileRef = useRef<HTMLInputElement>(null);
  const extraRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetch('/api/products')
      .then((r) => r.json())
      .then((data) => { setProducts(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const file = fileRef.current?.files?.[0];
    if (!file) return alert('Vui lòng chọn ảnh chính');
    setSubmitting(true);
    const fd = new FormData();
    fd.append('name', form.name);
    fd.append('category', form.category);
    fd.append('description', form.description || 'Sản phẩm nhôm kính cao cấp.');
    fd.append('image', file);
    if (extraRef.current?.files) {
      Array.from(extraRef.current.files).forEach((f) => fd.append('extra_images', f));
    }
    const res = await fetch('/api/admin/products', { method: 'POST', body: fd });
    if (res.ok) {
      const newProduct = await res.json();
      setProducts((prev) => [newProduct, ...prev]);
      setForm({ name: '', category: 'CỬA NHÔM', description: '' });
      setPreview(null);
      setExtraPreviews([]);
      if (fileRef.current) fileRef.current.value = '';
      if (extraRef.current) extraRef.current.value = '';
    } else {
      alert('Thêm sản phẩm thất bại');
    }
    setSubmitting(false);
  };

  return (
    <div className="p-6">
      <h1 className="mb-6 text-2xl font-bold">Quản lý Sản Phẩm</h1>

      <form onSubmit={handleSubmit} className="mb-10 rounded-xl border border-zinc-700 bg-zinc-900/50 p-6">
        <h2 className="mb-4 text-lg font-semibold">Thêm sản phẩm mới</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-medium">Tên sản phẩm *</label>
            <input
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full rounded border border-zinc-700 bg-zinc-900 p-2.5 text-sm text-white placeholder:text-zinc-500"
              placeholder="VD: Cửa Mở Quay Nhôm"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Danh mục *</label>
            <select
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              style={{ background: '#18181b', color: '#fff', colorScheme: 'dark' }}
              className="w-full rounded border border-zinc-700 p-2.5 text-sm"
            >
              {CATEGORIES.map((c) => <option key={c} style={{ background: '#18181b', color: '#fff' }}>{c}</option>)}
            </select>
          </div>
          <div className="sm:col-span-2">
            <label className="mb-1 block text-sm font-medium">Mô tả</label>
            <textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="w-full rounded border border-zinc-700 bg-zinc-900 p-2.5 text-sm text-white placeholder:text-zinc-500"
              rows={2}
              placeholder="Mô tả ngắn về sản phẩm..."
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Ảnh chính *</label>
            {preview && <Image src={preview} alt="preview" width={120} height={90} className="mb-2 rounded object-cover" />}
            <input ref={fileRef} type="file" accept="image/*" className="w-full text-sm text-zinc-400"
              onChange={(e) => { const f = e.target.files?.[0]; if (f) setPreview(URL.createObjectURL(f)); }} />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Ảnh phụ (nhiều ảnh)</label>
            {extraPreviews.length > 0 && (
              <div className="mb-2 flex flex-wrap gap-1">
                {extraPreviews.map((src, i) => <Image key={i} src={src} alt="extra" width={60} height={50} className="h-12 w-16 rounded object-cover" />)}
              </div>
            )}
            <input ref={extraRef} type="file" accept="image/*" multiple className="w-full text-sm text-zinc-400"
              onChange={(e) => setExtraPreviews(Array.from(e.target.files || []).map((f) => URL.createObjectURL(f)))} />
          </div>
        </div>
        <button type="submit" disabled={submitting}
          className="mt-4 rounded bg-amber-600 px-6 py-2.5 text-sm font-semibold text-white disabled:opacity-60">
          {submitting ? 'Đang thêm...' : 'Thêm sản phẩm'}
        </button>
      </form>

      {loading ? (
        <div className="flex items-center gap-3 text-zinc-400">
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-t-transparent" style={{ borderColor: '#C89B5E', borderTopColor: 'transparent' }} />
          Đang tải...
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => (
            <div key={p.id} className="rounded-xl border border-zinc-700 bg-zinc-900/30 p-4">
              <div className="relative mb-3">
                <Image src={p.image_url} alt={p.name} width={400} height={300} className="h-40 w-full rounded-lg object-cover" />
                {p.images?.length > 0 && (
                  <span className="absolute bottom-2 right-2 rounded-full bg-black/70 px-2 py-0.5 text-xs text-zinc-300">
                    +{p.images.length} ảnh
                  </span>
                )}
              </div>
              <span className="mb-1 inline-block rounded-full bg-amber-900/50 px-2 py-0.5 text-xs font-semibold text-amber-400">{p.category}</span>
              <h3 className="mb-1 font-semibold">{p.name}</h3>
              <p className="mb-3 line-clamp-2 text-xs text-zinc-400">{p.description}</p>
              <Link
                href={`/home/products/${p.id}`}
                className="block rounded bg-zinc-700 py-1.5 text-center text-xs font-semibold text-white hover:bg-zinc-600"
              >
                Chỉnh sửa
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
