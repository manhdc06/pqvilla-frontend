'use client';

import { useEffect, useRef, useState } from 'react';

const STATS = [
  { icon: '⏱', target: 10, suffix: '+ NĂM', label: 'KINH NGHIỆM', desc: 'Hơn 10 năm trong lĩnh vực thi công nhôm kính' },
  { icon: '🏙', target: 500, suffix: '+', label: 'CÔNG TRÌNH', desc: 'Đã hoàn thành hơn 500+ công trình lớn nhỏ' },
  { icon: '🏆', target: 100, suffix: '%', label: 'SẢN PHẨM CHẤT LƯỢNG', desc: 'Nhôm chính hãng, phụ kiện đồng bộ cao cấp' },
  { icon: '🛡', target: 5, suffix: '+ NĂM', label: 'BẢO HÀNH DÀI HẠN', desc: 'Bảo hành từ 3 – 5 năm, hỗ trợ nhanh chóng' },
  { icon: '👥', target: 50, suffix: '+', label: 'ĐỘI NGŨ CHUYÊN NGHIỆP', desc: 'Kỹ thuật tay nghề cao, tận tâm - trách nhiệm' },
];

function StatCounter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting && !started.current) {
          started.current = true;
          let start = 0;
          const step = target / 60;
          const timer = setInterval(() => {
            start += step;
            if (start >= target) {
              setCount(target);
              clearInterval(timer);
            } else {
              setCount(Math.floor(start));
            }
          }, 16);
        }
      },
      { threshold: 0.3 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <div ref={ref} className="flex items-baseline justify-center gap-1">
      <span
        className="text-4xl font-bold"
        style={{ fontFamily: 'var(--pq-font-heading)', color: 'var(--pq-accent)' }}
      >
        {count}
      </span>
      <span className="text-lg font-bold" style={{ color: 'var(--pq-accent)' }}>
        {suffix}
      </span>
    </div>
  );
}

export function StatsSection() {
  return (
    <section id="about" className="py-24 text-center" style={{ background: 'var(--pq-bg-primary)' }}>
      <div className="mx-auto max-w-[1200px] px-5">
        <div
          className="mb-2.5 text-xs font-semibold tracking-[3px] uppercase"
          style={{ color: 'var(--pq-accent)' }}
        >
          TẠI SAO CHỌN CHÚNG TÔI
        </div>
        <h2
          className="mb-12 text-4xl font-bold"
          style={{ fontFamily: 'var(--pq-font-heading)', color: 'var(--pq-text-primary)' }}
        >
          Uy tín tạo nên thương hiệu
        </h2>
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-5">
          {STATS.map((s, i) => (
            <div key={i} className="p-5">
              <div
                className="mx-auto mb-4 flex h-[60px] w-[60px] items-center justify-center rounded-full border text-2xl"
                style={{
                  background: 'var(--pq-glass-bg)',
                  borderColor: 'var(--pq-glass-border)',
                }}
              >
                {s.icon}
              </div>
              <StatCounter target={s.target} suffix={s.suffix} />
              <div
                className="my-2 text-xs font-bold tracking-wide uppercase"
                style={{ color: 'var(--pq-text-primary)' }}
              >
                {s.label}
              </div>
              <p className="text-xs leading-relaxed" style={{ color: 'var(--pq-text-secondary)' }}>
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
