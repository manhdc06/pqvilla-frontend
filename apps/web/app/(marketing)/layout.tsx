import { SiteFooter } from '~/(marketing)/_components/site-footer';
import { SiteHeader } from '~/(marketing)/_components/site-header';
import { withI18n } from '~/lib/i18n/with-i18n';

async function SiteLayout(props: React.PropsWithChildren) {
  return (
    <div className="flex min-h-screen flex-col" style={{ background: 'var(--pq-bg-primary)' }}>
      <SiteHeader />
      {props.children}
      <SiteFooter />
    </div>
  );
}

export default withI18n(SiteLayout);
