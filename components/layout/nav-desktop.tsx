import {Link} from '@/i18n/navigation';
import {cn} from '@/lib/utils';

type Item = {key: string; href: string; label: string};

// PRESENTATION — pure, prop-driven. A redesign rewrites this file only.
export function NavDesktop({items, pathname}: {items: Item[]; pathname: string}) {
  return (
    <nav aria-label="Primary" className="hidden items-center gap-8 md:flex">
      {items.map((item) => {
        const active = pathname === item.href || pathname.startsWith(item.href + '/');
        return (
          <Link
            key={item.key}
            href={item.href}
            aria-current={active ? 'page' : undefined}
            className={cn(
              'rounded-sm text-sm transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
              active ? 'font-medium text-foreground' : 'text-muted-foreground'
            )}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
