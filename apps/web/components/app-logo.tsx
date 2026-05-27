import Link from 'next/link';

import { cn } from '@kit/ui/utils';

function LogoImage({ className }: { className?: string }) {
  return (
    <div className={cn('flex flex-col leading-none', className)}>
      <span
        style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontSize: '22px',
          fontWeight: 700,
          letterSpacing: '0.12em',
          color: '#ffffff',
          textTransform: 'uppercase',
        }}
      >
        PQ VILLA
      </span>
      <span
        style={{
          fontFamily: "'Montserrat', sans-serif",
          fontSize: '8px',
          fontWeight: 400,
          letterSpacing: '0.3em',
          color: '#C89B5E',
          textTransform: 'uppercase',
          marginTop: '1px',
        }}
      >
        Nhôm Kính Cao Cấp
      </span>
    </div>
  );
}

export function AppLogo({
  href,
  label,
  className,
}: {
  href?: string | null;
  className?: string;
  label?: string;
}) {
  if (href === null) {
    return <LogoImage className={className} />;
  }

  return (
    <Link aria-label={label ?? 'PQ VILLA'} href={href ?? '/'}>
      <LogoImage className={className} />
    </Link>
  );
}
