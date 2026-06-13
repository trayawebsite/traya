import {Link} from '@/i18n/navigation';
import {cn} from '@/lib/utils';

type Item = {key: string; href: string; label: string};

// PRESENTATION — pure, prop-driven. Semantic nav > ul > li. No animation;
// colours come only from semantic tokens. A redesign rewrites this file only.
export function NavDesktop({items, pathname}: {items: Item[]; pathname: string}) {
  return (
    <nav aria-label="Primary" className="hidden md:block">
      <ul className="flex items-center gap-8">
        {items.map((item) => {
          const active = pathname === item.href || pathname.startsWith(item.href + '/');
          return (
            <li key={item.key}>
              <Link
                href={item.href}
                aria-current={active ? 'page' : undefined}
                className={cn(
                  'rounded-sm text-sm hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
                  active ? 'font-medium text-foreground' : 'text-muted-foreground'
                )}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
