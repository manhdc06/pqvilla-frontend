'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

interface Product {
  id: number;
  name: string;
  category: string;
  description: string;
  image_url: string;
}

const CATEGORIES = ['CỬA NHÔM', 'VÁCH KÍNH', 'MẶT DỰNG', 'KHÁC'];

function getToken() {
  return typeof window !== 'undefined' ? localStorage.getItem('pqvilla_token') : null;
}

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [form, setForm] = useState({ name: '', category: 'CỬA NHÔM', description: '' });
  const fileRef = useRef<HTMLInputElement>(null);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8000';

  const load = async () => {
    setLoading(true);
    const res = await fetch(`${apiUrl}/api/products`);
    setProducts(await res.json());
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const file = fileRef.current?.files?.[0];
    if (!file) return alert('Vui lòng chọn ảnh');
    setSubmitting(true);
    const fd = new FormData();
    fd.append('name', form.name);
    fd.append('category', form.category);
    fd.append('description', form.description || 'Sản phẩm nhôm kính cao cấp.');
    fd.append('image', file);
    const res = await fetch(`${apiUrl}/api/products`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${getToken()}` },
      body: fd,
    });
    if (res.ok) {
      setForm({ name: '', category: 'CỬA NHÔM', description: '' });
      setPreview(null);
      if (fileRef.current) fileRef.current.value = '';
      await load();
    } else {
      alert('Thêm sản phẩm thất bại');
    }
    setSubmitting(false);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Xóa sản phẩm này?')) return;
    await fetch(`${apiUrl}/api/products/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    await load();
  };

  return (
    <div className="p-6">
      <h1 className="mb-6 text-2xl font-bold">Quản lý Sản Phẩm</h1>

      {/* Add form */}
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
          <div className="sm:col-span-2">
            <label className="mb-1 block text-sm font-medium">Ảnh sản phẩm *</label>
            {preview && (
              <Image src={preview} alt="preview" width={120} height={120} className="mb-2 rounded object-cover" />
            )}
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              className="w-full text-sm"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) setPreview(URL.createObjectURL(f));
              }}
            />
          </div>
        </div>
        <button
          type="submit"
          disabled={submitting}
          className="mt-4 rounded bg-amber-600 px-6 py-2.5 text-sm font-semibold text-white disabled:opacity-60"
        >
          {submitting ? 'Đang thêm...' : 'Thêm sản phẩm'}
        </button>
      </form>

      {/* Product list */}
      {loading ? (
        <p className="text-muted-foreground">Đang tải...</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => (
            <div key={p.id} className="rounded-xl border p-4">
              <Image src={p.image_url} alt={p.name} width={400} height={300} className="mb-3 h-40 w-full rounded object-cover" />
              <span className="mb-1 inline-block rounded-full bg-amber-100 px-2 py-0.5 text-xs font-semibold text-amber-800">{p.category}</span>
              <h3 className="font-semibold">{p.name}</h3>
              <p className="mb-3 text-sm text-muted-foreground">{p.description}</p>
              <button
                onClick={() => handleDelete(p.id)}
                className="rounded bg-red-600 px-4 py-1.5 text-xs font-semibold text-white hover:bg-red-700"
              >
                Xóa
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
