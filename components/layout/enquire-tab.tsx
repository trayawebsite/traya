import {getTranslations} from 'next-intl/server';

// Persistent right-edge enquiry tab — vertically centred, site-wide. Jumps to
// the on-page enquiry form (#enquiry). Vermilion is the one strong punch here,
// so it stays a single small element (well under the ≤2%-of-view budget).
export async function EnquireTab() {
  const t = await getTranslations('Header');

  return (
    <a
      href="#enquiry"
      className="fixed right-0 top-1/2 z-40 hidden -translate-y-1/2 rotate-180 rounded-r-md bg-traya-deep px-3 py-2 text-[10px] font-semibold uppercase leading-none tracking-[0.16em] text-traya-cream shadow-md transition-colors duration-150 [writing-mode:vertical-rl] hover:bg-traya-red focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-traya-red focus-visible:ring-offset-1 sm:inline-block motion-reduce:transition-none"
    >
      {t('enquireNow')}
    </a>
  );
}
