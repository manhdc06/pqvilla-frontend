-- PQ VILLA Database Schema
-- Chạy file này trong Supabase SQL Editor

-- Bảng sản phẩm
CREATE TABLE IF NOT EXISTS products (
  id          BIGSERIAL PRIMARY KEY,
  name        TEXT NOT NULL,
  category    TEXT NOT NULL DEFAULT 'KHÁC',
  description TEXT NOT NULL DEFAULT 'Sản phẩm nhôm kính cao cấp.',
  image_url   TEXT NOT NULL,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Bảng dự án
CREATE TABLE IF NOT EXISTS projects (
  id         BIGSERIAL PRIMARY KEY,
  name       TEXT NOT NULL,
  location   TEXT NOT NULL DEFAULT '',
  category   TEXT NOT NULL DEFAULT 'khac',
  image_url  TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Row Level Security: chỉ đọc công khai, ghi cần service role
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "public read products"  ON products FOR SELECT USING (true);
CREATE POLICY "public read projects"  ON projects FOR SELECT USING (true);

-- Storage buckets (tạo thủ công trong Supabase Dashboard > Storage)
-- Bucket: product-images  (public)
-- Bucket: project-images  (public)

-- Seed data mẫu
INSERT INTO products (name, category, description, image_url) VALUES
  ('Cửa Mở Quay Nhôm Cao Cấp', 'CỬA NHÔM', 'Hệ cửa mở quay nhôm cao cấp với thiết kế hiện đại, độ bền vượt trội.', 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600'),
  ('Cửa Lùa Nhôm Kính', 'CỬA NHÔM', 'Cửa lùa vận hành êm ái, tiết kiệm không gian, thích hợp cho phòng khách và ban công.', 'https://images.unsplash.com/photo-1558618047-3f5b1c2f2f0a?w=600'),
  ('Vách Kính Văn Phòng', 'VÁCH KÍNH', 'Giải pháp tối ưu cho văn phòng, nhà ở hiện đại với kính cường lực an toàn.', 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600'),
  ('Mặt Dựng Nhôm Kính', 'MẶT DỰNG', 'Hệ mặt dựng nhôm kính cao cấp cho các công trình thương mại và dân dụng.', 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600'),
  ('Cửa Xếp Trượt', 'CỬA NHÔM', 'Hệ cửa xếp trượt linh hoạt, tiết kiệm diện tích, thẩm mỹ cao.', 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600');

INSERT INTO projects (name, location, category, image_url) VALUES
  ('Biệt thự Vinhomes Riverside', 'Hà Nội', 'biet-thu', 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=600'),
  ('Nhà phố 5x20 - Quảng Bình', 'Quảng Bình', 'nha-pho', 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600'),
  ('Tòa nhà văn phòng - Đà Nẵng', 'Đà Nẵng', 'van-phong', 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600'),
  ('Khách sạn The Sea', 'Nha Trang', 'khach-san', 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600'),
  ('Nhà phố hiện đại - Đồng Hới', 'Quảng Bình', 'nha-pho', 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600'),
  ('Showroom BMW Lê Văn Lương', 'Hà Nội', 'van-phong', 'https://images.unsplash.com/photo-1577495508048-b635879837f1?w=600');
