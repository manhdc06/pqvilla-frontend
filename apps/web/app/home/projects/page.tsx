'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

interface Project {
  id: number;
  name: string;
  location: string;
  category: string;
  image_url: string;
}

const CATEGORIES = [
  { value: 'nha-pho', label: 'Nhà Phố' },
  { value: 'biet-thu', label: 'Biệt Thự' },
  { value: 'chung-cu', label: 'Chung Cư' },
  { value: 'van-phong', label: 'Văn Phòng' },
  { value: 'khach-san', label: 'Khách Sạn' },
  { value: 'khac', label: 'Khác' },
];

function getToken() {
  return typeof window !== 'undefined' ? localStorage.getItem('pqvilla_token') : null;
}

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [form, setForm] = useState({ name: '', location: '', category: 'nha-pho' });
  const fileRef = useRef<HTMLInputElement>(null);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8000';

  const load = async () => {
    setLoading(true);
    const res = await fetch(`${apiUrl}/api/projects`);
    setProjects(await res.json());
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
    fd.append('location', form.location);
    fd.append('category', form.category);
    fd.append('image', file);
    const res = await fetch(`${apiUrl}/api/projects`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${getToken()}` },
      body: fd,
    });
    if (res.ok) {
      setForm({ name: '', location: '', category: 'nha-pho' });
      setPreview(null);
      if (fileRef.current) fileRef.current.value = '';
      await load();
    } else {
      alert('Thêm dự án thất bại');
    }
    setSubmitting(false);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Xóa dự án này?')) return;
    await fetch(`${apiUrl}/api/projects/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    await load();
  };

  return (
    <div className="p-6">
      <h1 className="mb-6 text-2xl font-bold">Quản lý Dự Án</h1>

      <form onSubmit={handleSubmit} className="mb-10 rounded-xl border p-6">
        <h2 className="mb-4 text-lg font-semibold">Thêm dự án mới</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-medium">Tên dự án *</label>
            <input
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full rounded border p-2.5 text-sm"
              placeholder="VD: Biệt thự ABC"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Địa điểm</label>
            <input
              value={form.location}
              onChange={(e) => setForm({ ...form, location: e.target.value })}
              className="w-full rounded border p-2.5 text-sm"
              placeholder="VD: Hà Nội"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Loại công trình</label>
            <select
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="w-full rounded border p-2.5 text-sm"
            >
              {CATEGORIES.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
            </select>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Ảnh dự án *</label>
            {preview && (
              <Image src={preview} alt="preview" width={120} height={90} className="mb-2 rounded object-cover" />
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
          {submitting ? 'Đang thêm...' : 'Thêm dự án'}
        </button>
      </form>

      {loading ? (
        <p className="text-muted-foreground">Đang tải...</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p) => (
            <div key={p.id} className="rounded-xl border p-4">
              <Image src={p.image_url} alt={p.name} width={400} height={300} className="mb-3 h-40 w-full rounded object-cover" />
              <span className="mb-1 inline-block rounded-full bg-amber-100 px-2 py-0.5 text-xs font-semibold text-amber-800">{p.category}</span>
              <h3 className="font-semibold">{p.name}</h3>
              {p.location && <p className="mb-3 text-sm text-muted-foreground">{p.location}</p>}
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
