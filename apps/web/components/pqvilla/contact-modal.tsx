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
        className="relative w-[90%] max-w-[420px] rounded-2xl p-12 text-center"
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
          className="mb-3 text-3xl font-bold"
          style={{ fontFamily: 'var(--pq-font-heading)', color: 'var(--pq-text-primary)' }}
        >
          Liên hệ tư vấn
        </h3>
        <p className="mb-5 text-sm leading-relaxed" style={{ color: 'var(--pq-text-secondary)' }}>
          Gọi ngay cho chúng tôi để được tư vấn miễn phí về giải pháp nhôm kính cao cấp!
        </p>
        <div
          className="mb-5 text-4xl font-bold tracking-widest"
          style={{ fontFamily: 'var(--pq-font-heading)', color: 'var(--pq-accent)' }}
        >
          0962 777 317
        </div>
        <a
          href="tel:0962777317"
          className="flex w-full items-center justify-center gap-2 rounded-lg py-4 text-base font-semibold tracking-wide uppercase transition-all duration-300 hover:opacity-90"
          style={{ background: 'var(--pq-accent)', color: 'var(--pq-bg-primary)' }}
        >
          📞 GỌI NGAY
        </a>
      </div>
    </div>
  );
}
