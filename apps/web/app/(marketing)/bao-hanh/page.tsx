import Link from 'next/link';

export const metadata = {
  title: 'Chính sách bảo hành – PQ VILLA',
};

export default function BaoHanhPage() {
  return (
    <main className="min-h-screen pb-24 pt-28" style={{ background: 'var(--pq-bg-primary)' }}>
      <div className="mx-auto max-w-[860px] px-5">
        {/* Breadcrumb */}
        <div className="mb-8 flex items-center gap-2 text-sm" style={{ color: 'var(--pq-text-secondary)' }}>
          <Link href="/" style={{ color: 'var(--pq-text-secondary)' }} className="hover:underline">Trang chủ</Link>
          <span>/</span>
          <span style={{ color: 'var(--pq-accent)' }}>Chính sách bảo hành</span>
        </div>

        <h1
          className="mb-10 text-4xl font-bold"
          style={{ fontFamily: 'var(--pq-font-heading)', color: 'var(--pq-text-primary)' }}
        >
          Chính Sách Bảo Hành
        </h1>

        {/* Construction warranty */}
        <section className="mb-8 rounded-2xl border p-8" style={{ borderColor: 'var(--pq-glass-border)', background: 'var(--pq-glass-bg)' }}>
          <h2 className="mb-4 text-xl font-bold" style={{ color: 'var(--pq-accent)', fontFamily: 'var(--pq-font-heading)' }}>
            Bảo hành công trình
          </h2>
          <p className="mb-4 text-base leading-relaxed" style={{ color: 'var(--pq-text-secondary)' }}>
            Bảo hành công trình trong thời gian <strong style={{ color: 'var(--pq-text-primary)' }}>12 tháng</strong>. Mọi sự cố phát sinh sẽ được tiếp nhận và xử lý trong vòng <strong style={{ color: 'var(--pq-text-primary)' }}>48 giờ</strong> kể từ khi nhận được thông báo từ Chủ đầu tư.
          </p>
        </section>

        {/* Product warranty */}
        <section className="mb-8 rounded-2xl border p-8" style={{ borderColor: 'var(--pq-glass-border)', background: 'var(--pq-glass-bg)' }}>
          <h2 className="mb-4 text-xl font-bold" style={{ color: 'var(--pq-accent)', fontFamily: 'var(--pq-font-heading)' }}>
            Bảo hành sản phẩm nhôm
          </h2>
          <ul className="space-y-3 text-base" style={{ color: 'var(--pq-text-secondary)' }}>
            <li className="flex items-start gap-3">
              <span style={{ color: 'var(--pq-accent)', marginTop: 2 }}>✓</span>
              <span>Nhôm Xingfa Quảng Đông bảo hành <strong style={{ color: 'var(--pq-text-primary)' }}>5 năm</strong> bong tróc bề mặt sơn</span>
            </li>
            <li className="flex items-start gap-3">
              <span style={{ color: 'var(--pq-accent)', marginTop: 2 }}>✓</span>
              <span>Nhôm Xingfa PMA bảo hành <strong style={{ color: 'var(--pq-text-primary)' }}>15 năm</strong> bong tróc bề mặt sơn</span>
            </li>
            <li className="flex items-start gap-3">
              <span style={{ color: 'var(--pq-accent)', marginTop: 2 }}>✓</span>
              <span>Nhôm Maxpro bảo hành <strong style={{ color: 'var(--pq-text-primary)' }}>25 năm</strong> bong tróc bề mặt sơn</span>
            </li>
          </ul>
        </section>

        {/* Quality commitment */}
        <section
          className="rounded-2xl p-8"
          style={{ background: 'rgba(200,155,94,0.08)', border: '1px solid rgba(200,155,94,0.25)' }}
        >
          <h2 className="mb-4 text-xl font-bold uppercase tracking-wide" style={{ color: 'var(--pq-accent)', fontFamily: 'var(--pq-font-heading)' }}>
            Cam kết chất lượng
          </h2>
          <p className="text-base font-semibold leading-relaxed uppercase" style={{ color: 'var(--pq-text-primary)' }}>
            Đảm bảo sản phẩm mang tính thẩm mỹ cao, hàng đạt tiêu chuẩn loại 1 không pha lẫn PKK và nhôm không đúng chủng loại.
          </p>
          <p className="mt-4 text-base font-bold leading-relaxed" style={{ color: 'var(--pq-accent)' }}>
            Nếu phát hiện hàng giả, hàng kém chất lượng — đền bù <span className="text-xl">100% hợp đồng</span>.
          </p>
        </section>
      </div>
    </main>
  );
}
