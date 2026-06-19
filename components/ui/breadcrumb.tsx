import {useTranslations} from 'next-intl';
import {Link} from '@/i18n/navigation';

// Breadcrumb trail — Home › Products › Category › Product. Pass items in order;
// the last (no href) is the current page.
export function Breadcrumb({items}: {items: {label: string; href?: string}[]}) {
  const t = useTranslations('Links');
  return (
    <nav aria-label={t('breadcrumb')}>
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted-foreground">
        {items.map((item, i) => (
          <li key={`${item.label}-${i}`} className="flex items-center gap-x-2">
            {i > 0 && (
              <span aria-hidden className="text-traya-border">
                /
              </span>
            )}
            {item.href ? (
              <Link
                href={item.href}
                className="rounded-sm transition-colors hover:text-traya-red-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                {item.label}
              </Link>
            ) : (
              <span className="text-foreground/70" aria-current="page">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
