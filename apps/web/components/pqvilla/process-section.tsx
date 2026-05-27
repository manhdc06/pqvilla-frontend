'use client';

const STEPS = [
  { num: '01', title: 'Khảo Sát', desc: 'Khảo sát thực tế, tư vấn giải pháp phù hợp' },
  { num: '02', title: 'Báo Giá', desc: 'Báo giá chi tiết, rõ ràng, minh bạch' },
  { num: '03', title: 'Thiết Kế', desc: 'Thiết kế bản vẽ 2D, 3D theo yêu cầu' },
  { num: '04', title: 'Thi Công', desc: 'Thi công đúng tiến độ, đảm bảo chất lượng' },
  { num: '05', title: 'Bàn Giao', desc: 'Nghiệm thu, bàn giao và bảo hành trọn đời' },
];

export function ProcessSection() {
  return (
    <section className="py-24 text-center" style={{ background: 'var(--pq-bg-secondary)' }}>
      <div className="mx-auto max-w-[1200px] px-5">
        <div
          className="mb-2.5 text-xs font-semibold tracking-[3px] uppercase"
          style={{ color: 'var(--pq-accent)' }}
        >
          QUY TRÌNH LÀM VIỆC
        </div>
        <h2
          className="mb-12 text-4xl font-bold"
          style={{ fontFamily: 'var(--pq-font-heading)', color: 'var(--pq-text-primary)' }}
        >
          Chuyên nghiệp – Minh bạch
        </h2>
        <div className="relative flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          {/* Connector line – desktop only */}
          <div
            className="absolute top-[35px] hidden md:block"
            style={{
              left: '10%',
              right: '10%',
              height: '2px',
              background: 'var(--pq-glass-border)',
            }}
          />
          {STEPS.map((s) => (
            <div key={s.num} className="group relative flex-1 px-2.5">
              <div
                className="mx-auto mb-5 flex h-[70px] w-[70px] cursor-default items-center justify-center rounded-full border-2 text-xl font-bold transition-all duration-300 group-hover:text-black"
                style={{
                  fontFamily: 'var(--pq-font-heading)',
                  background: 'var(--pq-bg-secondary)',
                  borderColor: 'var(--pq-accent)',
                  color: 'var(--pq-accent)',
                  position: 'relative',
                  zIndex: 2,
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.background = 'var(--pq-accent)';
                  (e.currentTarget as HTMLDivElement).style.color = 'var(--pq-bg-primary)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.background = 'var(--pq-bg-secondary)';
                  (e.currentTarget as HTMLDivElement).style.color = 'var(--pq-accent)';
                }}
              >
                {s.num}
              </div>
              <h4
                className="mb-2 text-sm font-bold tracking-wide uppercase"
                style={{ color: 'var(--pq-text-primary)' }}
              >
                {s.title}
              </h4>
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
