import Link from 'next/link';

export function PqSiteFooter() {
  return (
    <footer
      id="contact"
      className="pb-8 pt-20"
      style={{ background: 'var(--pq-bg-secondary)' }}
    >
      <div className="mx-auto max-w-[1200px] px-5">
        <div className="mb-12 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr_1.5fr]">
          {/* Brand */}
          <div>
            <div className="mb-4 flex items-center gap-2.5">
              <div
                className="flex h-11 w-11 items-center justify-center rounded-md text-sm font-bold"
                style={{
                  background: 'linear-gradient(135deg, var(--pq-accent), var(--pq-accent-dark))',
                  color: 'var(--pq-bg-primary)',
                  fontFamily: 'var(--pq-font-heading)',
                }}
              >
                PQ
              </div>
              <div>
                <div className="text-sm font-bold tracking-widest text-white uppercase">PQ VILLA</div>
                <div className="text-[10px] tracking-[3px] uppercase" style={{ color: 'var(--pq-text-secondary)' }}>
                  Aluminium & Glass
                </div>
              </div>
            </div>
            <p className="mb-4 text-sm leading-loose" style={{ color: 'var(--pq-text-secondary)' }}>
              Chuyên thiết kế và thi công các hạng mục nhôm kính cao cấp cho nhà phố, biệt thự, dự án, văn phòng, khách sạn.
            </p>
            <div className="flex gap-3">
              <a
                href="https://www.facebook.com/nhomkinhkienminhphuquang"
                target="_blank"
                rel="noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full border text-sm transition-all duration-300"
                style={{ background: 'var(--pq-glass-bg)', borderColor: 'var(--pq-glass-border)', color: 'var(--pq-text-secondary)' }}
                onMouseEnter={(e) => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = 'var(--pq-accent)'; el.style.color = 'var(--pq-bg-primary)'; el.style.borderColor = 'var(--pq-accent)'; }}
                onMouseLeave={(e) => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = 'var(--pq-glass-bg)'; el.style.color = 'var(--pq-text-secondary)'; el.style.borderColor = 'var(--pq-glass-border)'; }}
              >
                f
              </a>
            </div>
          </div>

          {/* About */}
          <div>
            <h4 className="mb-5 text-sm font-bold tracking-wide uppercase text-white">Về Chúng Tôi</h4>
            {['Giới thiệu', 'Tầm nhìn sứ mệnh', 'Đội ngũ nhân sự', 'Xưởng sản xuất'].map((t) => (
              <Link key={t} href="#" className="block py-0.5 text-sm leading-loose transition-colors duration-300 hover:text-[#C89B5E]" style={{ color: 'var(--pq-text-secondary)' }}>{t}</Link>
            ))}
          </div>

          {/* Products */}
          <div>
            <h4 className="mb-5 text-sm font-bold tracking-wide uppercase text-white">Sản Phẩm</h4>
            {['Cửa mở quay', 'Cửa lùa', 'Cửa xếp trượt', 'Vách kính', 'Mặt dựng'].map((t) => (
              <Link key={t} href="/products" className="block py-0.5 text-sm leading-loose transition-colors duration-300 hover:text-[#C89B5E]" style={{ color: 'var(--pq-text-secondary)' }}>{t}</Link>
            ))}
          </div>

          {/* Support */}
          <div>
            <h4 className="mb-5 text-sm font-bold tracking-wide uppercase text-white">Hỗ Trợ</h4>
            {['Chính sách bảo hành', 'Hướng dẫn sử dụng', 'Thanh toán', 'Câu hỏi thường gặp'].map((t) => (
              <Link key={t} href="#" className="block py-0.5 text-sm leading-loose transition-colors duration-300 hover:text-[#C89B5E]" style={{ color: 'var(--pq-text-secondary)' }}>{t}</Link>
            ))}
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-5 text-sm font-bold tracking-wide uppercase text-white">Liên Hệ</h4>
            <div className="space-y-3">
              <div className="flex items-start gap-2.5 text-sm" style={{ color: 'var(--pq-text-secondary)' }}>
                <span style={{ color: 'var(--pq-accent)', marginTop: 2 }}>🏢</span>
                <a href="https://maps.google.com" target="_blank" rel="noreferrer" className="leading-relaxed transition-colors hover:text-[#C89B5E]">
                  Showroom: 54 Nguyễn Hữu Cảnh, Đồng Hới
                </a>
              </div>
              <div className="flex items-start gap-2.5 text-sm" style={{ color: 'var(--pq-text-secondary)' }}>
                <span style={{ color: 'var(--pq-accent)', marginTop: 2 }}>🏭</span>
                <span className="leading-relaxed">Nhà xưởng: Xóm 5, Lương Yến, Lương Ninh</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm" style={{ color: 'var(--pq-text-secondary)' }}>
                <span style={{ color: 'var(--pq-accent)' }}>📞</span>
                <a href="tel:0962777317" className="transition-colors hover:text-[#C89B5E]">0962 777 317</a>
              </div>
            </div>
          </div>
        </div>

        <div
          className="flex flex-col items-center justify-between gap-2.5 border-t pt-6 text-center sm:flex-row sm:text-left"
          style={{ borderColor: 'var(--pq-glass-border)' }}
        >
          <p className="text-xs" style={{ color: 'var(--pq-text-secondary)' }}>
            © 2026 PQ VILLA. All rights reserved.
          </p>
          <p className="text-xs" style={{ color: 'var(--pq-text-secondary)' }}>
            Thiết kế bởi PQ VILLA Team
          </p>
        </div>
      </div>
    </footer>
  );
}
