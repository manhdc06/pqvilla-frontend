import Image from 'next/image';
import Link from 'next/link';

import { cn } from '@kit/ui/utils';

function LogoImage({ className }: { className?: string }) {
  return (
    <div className={cn('flex items-center gap-2', className)}>
      <Image
        src="/images/logo.jpg"
        alt="PQ VILLA"
        width={36}
        height={36}
        className="shrink-0 rounded-sm object-contain"
        priority
      />
      <div className="flex flex-col leading-none group-data-[collapsible=icon]:hidden">
        <span
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: '20px',
            fontWeight: 700,
            letterSpacing: '0.12em',
            color: '#ffffff',
            textTransform: 'uppercase',
            whiteSpace: 'nowrap',
          }}
        >
          PQ VILLA
        </span>
        <span
          style={{
            fontFamily: "'Montserrat', sans-serif",
            fontSize: '7px',
            fontWeight: 400,
            letterSpacing: '0.25em',
            color: '#C89B5E',
            textTransform: 'uppercase',
            marginTop: '1px',
            whiteSpace: 'nowrap',
          }}
        >
          Nhôm Kính Cao Cấp
        </span>
      </div>
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
  collapsed?: boolean;
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
