'use client';

import { useEffect } from 'react';

export function ContactModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center"
      style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)' }}
      onClick={onClose}
    >
      <div
        className="relative w-[90%] max-w-[500px] rounded-2xl p-8 text-center"
        style={{ background: 'var(--pq-bg-secondary)', border: '1px solid var(--pq-glass-border)' }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute right-5 top-4 cursor-pointer text-3xl transition-colors"
          style={{ color: 'var(--pq-text-secondary)', background: 'none', border: 'none' }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.color = 'var(--pq-accent)')}
          onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.color = 'var(--pq-text-secondary)')}
        >
          ×
        </button>

        <div
          className="mx-auto mb-5 flex h-[70px] w-[70px] items-center justify-center rounded-full text-2xl"
          style={{
            background: 'linear-gradient(135deg, var(--pq-accent), var(--pq-accent-dark))',
            color: 'var(--pq-bg-primary)',
          }}
        >
          📞
        </div>

        <h3
          className="mb-2 text-2xl font-bold"
          style={{ fontFamily: 'var(--pq-font-heading)', color: 'var(--pq-text-primary)' }}
        >
          Liên hệ tư vấn
        </h3>
        <p className="mb-4 text-sm leading-relaxed" style={{ color: 'var(--pq-text-secondary)' }}>
          Gọi ngay để được tư vấn miễn phí về giải pháp nhôm kính cao cấp!
        </p>

        <div className="mb-4 flex flex-col gap-2 sm:flex-row">
          <a href="tel:0825888222"
            className="flex flex-1 items-center justify-center gap-2 rounded-xl py-3.5 text-base font-bold transition-all hover:opacity-90"
            style={{ background: 'var(--pq-accent)', color: 'var(--pq-bg-primary)' }}>
            📞 0825.888.222
          </a>
          <a href="tel:0964604386"
            className="flex flex-1 items-center justify-center gap-2 rounded-xl border py-3.5 text-base font-bold transition-all hover:opacity-90"
            style={{ borderColor: 'var(--pq-accent)', color: 'var(--pq-accent)' }}>
            📞 0964.604.386
          </a>
        </div>

        <div className="rounded-xl p-4 text-left" style={{ background: 'rgba(200,155,94,0.08)', border: '1px solid rgba(200,155,94,0.2)' }}>
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest" style={{ color: 'var(--pq-accent)' }}>Cam kết chất lượng</p>
          <ul className="space-y-1 text-xs leading-relaxed" style={{ color: 'var(--pq-text-secondary)' }}>
            <li>• Nhôm Xingfa Quảng Đông bảo hành <strong style={{ color: 'var(--pq-text-primary)' }}>5 năm</strong> bong tróc bề mặt sơn</li>
            <li>• Nhôm Xingfa PMA bảo hành <strong style={{ color: 'var(--pq-text-primary)' }}>15 năm</strong> bong tróc bề mặt sơn</li>
            <li>• Nhôm Maxpro bảo hành <strong style={{ color: 'var(--pq-text-primary)' }}>25 năm</strong> bong tróc bề mặt sơn</li>
            <li>• Bảo hành công trình <strong style={{ color: 'var(--pq-text-primary)' }}>12 tháng</strong>, xử lý sự cố trong 48 giờ</li>
            <li>• Hàng đạt tiêu chuẩn loại 1 — phát hiện hàng giả đền bù <strong style={{ color: 'var(--pq-text-primary)' }}>100% hợp đồng</strong></li>
          </ul>
        </div>
      </div>
    </div>
  );
}
