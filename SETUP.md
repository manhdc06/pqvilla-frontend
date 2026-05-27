# PQ VILLA - Hướng dẫn Setup & Deploy

## Cấu trúc mới

```
pqvilla/
├── frontend/           ← Next.js + MakerKit (deploy Vercel)
│   └── apps/web/
│       ├── app/(marketing)/    ← Trang chủ, sản phẩm
│       ├── app/home/           ← Admin dashboard
│       └── components/pqvilla/ ← PQ VILLA components
├── backend/            ← FastAPI (deploy Vercel)
│   ├── app/
│   │   ├── main.py
│   │   ├── routers/    ← products, projects, auth
│   │   └── models/
│   └── supabase/schema.sql
└── (files cũ - có thể giữ lại)
```

---

## Bước 1: Setup Supabase

1. Tạo project tại [supabase.com](https://supabase.com)
2. Vào **SQL Editor**, chạy file `backend/supabase/schema.sql`
3. Vào **Storage** → tạo 2 buckets:
   - `product-images` (Public)
   - `project-images` (Public)
4. Lấy các keys: **Project URL**, **anon key**, **service_role key**

---

## Bước 2: Deploy Backend (FastAPI → Vercel)

```bash
cd backend

# Copy và điền env
cp .env.example .env

# Deploy lên Vercel
vercel

# Thêm environment variables trong Vercel Dashboard:
# SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, SUPABASE_ANON_KEY
# JWT_SECRET, ADMIN_EMAIL, ADMIN_PASSWORD
# CORS_ORIGINS=https://pqvilla.vercel.app
```

---

## Bước 3: Deploy Frontend (Next.js → Vercel)

```bash
cd frontend

# Cài dependencies
pnpm install

# Deploy
vercel

# Thêm environment variables trong Vercel Dashboard:
# NEXT_PUBLIC_SUPABASE_URL
# NEXT_PUBLIC_SUPABASE_ANON_KEY
# SUPABASE_SERVICE_ROLE_KEY
# NEXT_PUBLIC_API_URL=https://your-backend.vercel.app
```

---

## Bước 4: Chạy local

```bash
# Backend
cd backend
pip install -r requirements.txt
cp .env.example .env  # điền Supabase keys
uvicorn app.main:app --reload --port 8000

# Frontend (terminal khác)
cd frontend
pnpm install
# Tạo apps/web/.env.local với Supabase keys
pnpm --filter web dev
```

---

## API Endpoints

| Method | URL | Auth | Mô tả |
|--------|-----|------|-------|
| POST | `/api/auth/login` | - | Đăng nhập admin |
| GET | `/api/products` | - | Danh sách sản phẩm |
| POST | `/api/products` | Bearer | Thêm sản phẩm + upload ảnh |
| PATCH | `/api/products/{id}` | Bearer | Sửa sản phẩm |
| DELETE | `/api/products/{id}` | Bearer | Xóa sản phẩm |
| GET | `/api/projects` | - | Danh sách dự án |
| POST | `/api/projects` | Bearer | Thêm dự án + upload ảnh |
| DELETE | `/api/projects/{id}` | Bearer | Xóa dự án |

---

## Admin Dashboard

- URL: `https://your-site.vercel.app/home`
- Đăng nhập bằng email/password trong Supabase Auth (MakerKit tự handle)
- Menu: **Sản Phẩm** / **Dự Án** → thêm/xóa trực tiếp
