'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';

const CATEGORIES = [
  { value: 'nha-pho', label: 'Nhà Phố' },
  { value: 'biet-thu', label: 'Biệt Thự' },
  { value: 'chung-cu', label: 'Chung Cư' },
  { value: 'van-phong', label: 'Văn Phòng' },
  { value: 'khach-san', label: 'Khách Sạn' },
  { value: 'khac', label: 'Khác' },
];

interface Project {
  id: number;
  name: string;
  location: string;
  category: string;
  image_url: string;
  images: string[];
}

export default function EditProjectPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [project, setProject] = useState<Project | null>(null);
  const [form, setForm] = useState({ name: '', location: '', category: 'khac' });
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [mainPreview, setMainPreview] = useState('');
  const [newPreviews, setNewPreviews] = useState<string[]>([]);
  const [toDelete, setToDelete] = useState<string[]>([]);
  const mainImgRef = useRef<HTMLInputElement>(null);
  const extraImgsRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetch(`/api/projects/${id}`)
      .then((r) => r.json())
      .then((d: Project) => {
        setProject(d);
        setForm({ name: d.name, location: d.location || '', category: d.category });
        setMainPreview(d.image_url);
      });
  }, [id]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const fd = new FormData();
    fd.append('name', form.name);
    fd.append('location', form.location);
    fd.append('category', form.category);
    if (mainImgRef.current?.files?.[0]) fd.append('image', mainImgRef.current.files[0]);
    if (extraImgsRef.current?.files) {
      Array.from(extraImgsRef.current.files).forEach((f) => fd.append('extra_images', f));
    }
    if (toDelete.length) fd.append('delete_images', toDelete.join(','));

    const res = await fetch(`/api/admin/projects/${id}`, { method: 'PATCH', body: fd });
    if (res.ok) {
      router.push('/home/projects');
    } else {
      alert('Lưu thất bại');
    }
    setSaving(false);
  };

  const handleDelete = async () => {
    if (!confirm('Xóa dự án này? Không thể hoàn tác.')) return;
    setDeleting(true);
    await fetch(`/api/admin/projects/${id}`, { method: 'DELETE' });
    router.push('/home/projects');
  };

  const toggleDeleteImage = (url: string) => {
    setToDelete((prev) => prev.includes(url) ? prev.filter((u) => u !== url) : [...prev, url]);
  };

  if (!project) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-t-transparent" style={{ borderColor: '#C89B5E', borderTopColor: 'transparent' }} />
      </div>
    );
  }

  const extraImages = project.images || [];

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Chỉnh sửa dự án</h1>
        <button
          onClick={handleDelete}
          disabled={deleting}
          className="rounded bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700 disabled:opacity-60"
        >
          {deleting ? 'Đang xóa...' : 'Xóa dự án'}
        </button>
      </div>

      <form onSubmit={handleSave} className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-5 rounded-xl border border-zinc-700 bg-zinc-900/50 p-6">
          <div>
            <label className="mb-1 block text-sm font-medium">Tên dự án *</label>
            <input
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full rounded border border-zinc-700 bg-zinc-900 p-2.5 text-sm text-white"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Địa điểm</label>
            <input
              value={form.location}
              onChange={(e) => setForm({ ...form, location: e.target.value })}
              className="w-full rounded border border-zinc-700 bg-zinc-900 p-2.5 text-sm text-white"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Loại công trình</label>
            <select
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              style={{ background: '#18181b', color: '#fff', colorScheme: 'dark' }}
              className="w-full rounded border border-zinc-700 p-2.5 text-sm"
            >
              {CATEGORIES.map((c) => <option key={c.value} value={c.value} style={{ background: '#18181b' }}>{c.label}</option>)}
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">Ảnh chính</label>
            <div className="mb-2">
              <Image src={mainPreview} alt="main" width={300} height={200} className="h-40 w-full rounded-lg object-cover" />
            </div>
            <input
              ref={mainImgRef}
              type="file"
              accept="image/*"
              className="w-full text-sm text-zinc-400"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) setMainPreview(URL.createObjectURL(f));
              }}
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">Thêm ảnh phụ</label>
            <input
              ref={extraImgsRef}
              type="file"
              accept="image/*"
              multiple
              className="w-full text-sm text-zinc-400"
              onChange={(e) => {
                const files = Array.from(e.target.files || []);
                setNewPreviews(files.map((f) => URL.createObjectURL(f)));
              }}
            />
            {newPreviews.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-2">
                {newPreviews.map((src, i) => (
                  <Image key={i} src={src} alt="new" width={80} height={64} className="h-16 w-20 rounded object-cover" />
                ))}
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={saving}
            className="w-full rounded bg-amber-600 py-3 text-sm font-semibold text-white disabled:opacity-60"
          >
            {saving ? 'Đang lưu...' : 'Lưu thay đổi'}
          </button>
        </div>

        <div className="rounded-xl border border-zinc-700 bg-zinc-900/50 p-6">
          <h2 className="mb-4 font-semibold">Ảnh hiện có ({extraImages.length + 1})</h2>
          <p className="mb-4 text-xs text-zinc-400">Chọn ảnh muốn xóa (viền đỏ = sẽ bị xóa khi lưu)</p>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            <div className="relative overflow-hidden rounded-xl border-2" style={{ borderColor: '#C89B5E' }}>
              <Image src={project.image_url} alt="main" width={200} height={150} className="h-32 w-full object-cover" />
              <span className="absolute bottom-1 left-1 rounded bg-amber-600 px-1.5 py-0.5 text-[10px] font-semibold text-white">Chính</span>
            </div>
            {extraImages.map((url, i) => {
              const marked = toDelete.includes(url);
              return (
                <button
                  type="button"
                  key={i}
                  onClick={() => toggleDeleteImage(url)}
                  className="relative overflow-hidden rounded-xl border-2 transition-all"
                  style={{ borderColor: marked ? '#ef4444' : 'transparent' }}
                >
                  <Image src={url} alt={`extra ${i}`} width={200} height={150} className={`h-32 w-full object-cover ${marked ? 'opacity-50' : ''}`} />
                  {marked && (
                    <div className="absolute inset-0 flex items-center justify-center bg-red-900/40">
                      <span className="text-2xl font-bold text-red-400">✕</span>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
          {extraImages.length === 0 && (
            <p className="text-sm text-zinc-500">Chưa có ảnh phụ.</p>
          )}
        </div>
      </form>
    </div>
  );
}
