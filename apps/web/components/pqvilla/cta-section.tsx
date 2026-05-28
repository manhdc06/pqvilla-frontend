'use client';

export function CtaSection({ onOpenModal }: { onOpenModal: () => void }) {
  return (
    <section
      className="py-16"
      style={{ background: 'linear-gradient(135deg, var(--pq-accent) 0%, var(--pq-accent-dark) 100%)' }}
    >
      <div className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-between gap-5 px-5">
        <div>
          <h3
            className="mb-1.5 text-2xl font-bold"
            style={{ fontFamily: 'var(--pq-font-heading)', color: 'var(--pq-bg-primary)' }}
          >
            Bạn đang cần tư vấn giải pháp nhôm kính cho công trình của mình?
          </h3>
          <p style={{ color: 'rgba(7,11,18,0.7)', fontSize: '0.95rem' }}>
            Liên hệ ngay để được tư vấn và nhận báo giá tốt nhất!
          </p>
        </div>
        <div className="flex flex-wrap gap-4">
          <button
            onClick={onOpenModal}
            className="cursor-pointer rounded px-8 py-4 text-sm font-semibold tracking-wide uppercase transition-all duration-300 hover:-translate-y-0.5"
            style={{ background: 'var(--pq-bg-primary)', color: 'var(--pq-text-primary)' }}
          >
            NHẬN TƯ VẤN NGAY
          </button>
          <a
            href="tel:0825888222"
            className="flex items-center gap-2 rounded border-2 px-8 py-4 text-sm font-semibold tracking-wide uppercase transition-all duration-300 hover:-translate-y-0.5 hover:bg-black hover:text-white"
            style={{ borderColor: 'var(--pq-bg-primary)', color: 'var(--pq-bg-primary)' }}
          >
            📞 0825.888.222
          </a>
        </div>
      </div>
    </section>
  );
}
