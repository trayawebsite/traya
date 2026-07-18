import {getTranslations} from 'next-intl/server';
import {Container} from '@/components/ui/container';

// Globe, handshake, and growth icons reuse the exact line-icon markup already
// used elsewhere on the site (Why Traya, product groups) so this band matches
// the rest of the icon system instead of standing out as filled clip-art.
// India stays a filled silhouette   the one shape that genuinely needs fill.
const IconGlobe = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" className="size-10" aria-hidden="true">
    <circle cx="12" cy="12" r="10" />
    <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
    <path d="M2 12h20" />
  </svg>
);
const IconDeal = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" className="size-10" aria-hidden="true">
    <path d="m11 17 2 2a1 1 0 1 0 3-3" />
    <path d="m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4" />
    <path d="m21 3 1 11h-2" />
    <path d="M3 3 2 14l6.5 6.5a1 1 0 1 0 3-3" />
    <path d="M3 4h8" />
  </svg>
);
const IconBlocks = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" className="size-10" aria-hidden="true">
    <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
    <polyline points="16 7 22 7 22 13" />
  </svg>
);
const IconIndia = (
  <svg viewBox="0 0 512 512" fill="currentColor" className="size-10" aria-hidden="true">
    <path d="M484.018,170.463l-15.984-23.539c-1.575-2.318-4.217-3.677-7.022-3.603l-30.985,0.811c-2.672,0.07-5.143,1.433-6.627,3.655l-3.155,4.725L388.1,173.085c-2.135,1.367-3.521,3.641-3.757,6.165l-0.698,7.477h-12.474l-24.531-19.986c-1.972-1.606-4.578-2.209-7.051-1.637c-2.478,0.574-4.55,2.26-5.616,4.569l-10.213,22.127l-97.731-41.722l5.606-21.373c1.093-4.169-1.214-8.474-5.292-9.871l-8.112-2.78l-13.356-20.421l1.913-0.468c2.507-0.614,4.58-2.368,5.599-4.739c1.021-2.371,0.87-5.082-0.408-7.325l-4.612-8.095l17.65-36.232c1.867-3.832,0.498-8.455-3.153-10.652l-15.863-9.55c-1.407-0.847-3.029-1.258-4.679-1.167l-33.854,1.79L125.259,0.692c-2.436-1.068-5.244-0.893-7.53,0.476L94.983,14.785c-2.257,1.35-3.731,3.699-3.968,6.319c-0.237,2.62,0.793,5.193,2.77,6.928l12.683,11.118l0.7,28.185c0.049,1.99,0.819,3.894,2.165,5.361l20.845,22.699l-17.285,31.159c-0.653,1.176-1.006,2.492-1.031,3.837l-0.065,3.424l-30.387,33.396l-15.409-4.936c-4.267-1.367-8.849,0.936-10.297,5.18l-8.483,24.879c-1.14,3.344-0.019,7.043,2.787,9.19l4.37,3.344l11.122,22.763l0.083,4.961l-33.572,12.034c-3.112,1.116-5.253,3.985-5.438,7.287c-0.184,3.302,1.626,6.392,4.594,7.847l10.272,5.032c-1.474,1.048-2.578,2.563-3.11,4.327c-0.714,2.361-0.331,4.919,1.044,6.967l12.545,18.684c0.801,1.194,1.901,2.157,3.19,2.792l20.351,10.039c3.531,1.741,7.795,0.739,10.181-2.388l8.967-11.753l4.829,11.443l-2.897,15.235c-0.28,1.47-0.152,2.988,0.366,4.391l67.375,182.103c1.18,3.189,4.314,5.372,7.716,5.372c0.994,0,1.989-0.18,2.936-0.542l16.495-6.3c1.903-0.727,3.47-2.135,4.396-3.951l3.62-7.104l5.625-6.869l14.134-16.951c0.916-1.099,1.53-2.419,1.78-3.828l7.456-41.929c0.24-1.346,0.14-2.73-0.291-4.028l-3.938-11.883l7.505-22.685l6.273-3.867l7.845-0.926c2.266-0.268,4.32-1.463,5.669-3.304l9.725-13.256c3.284-1.371,7.145-2.423,9.787-4.883c3.121-2.906,6.049-6.051,9.063-9.067c2.41-2.41,4.739-4.433,6.095-7.618c1.523-3.574,2.982-7.177,4.472-10.765l29.257-16.078c2.315-1.273,3.878-3.578,4.203-6.2l1.432-11.569l10.941-8.369l14.679,2.924c2.791,0.555,5.678-0.373,7.622-2.456c1.944-2.083,2.672-5.025,1.923-7.774l-13.987-51.376l17.169-7.117l11.792,7.705c1.083,0.708,2.317,1.15,3.603,1.291l8.712,0.957l-9.762,14.434c-1.746,2.582-1.885,5.928-0.355,8.644c1.528,2.716,4.44,4.342,7.573,4.183l6.436-0.316l14.874,20.32c1.961,2.68,5.34,3.92,8.572,3.137c3.228-0.78,5.671-3.427,6.193-6.707l4.051-25.518l6.909,1.324c2.185,0.416,4.451-0.066,6.274-1.346c1.822-1.279,3.049-3.242,3.4-5.441l4.471-28.067l3.973-5.242c0.86-1.135,1.411-2.474,1.598-3.886l0.67-5.043l24.203-8.41c2.722-0.946,4.75-3.246,5.348-6.065l2.839-13.395C485.724,174.6,485.276,172.315,484.018,170.463z" />
  </svg>
);

// Icon pairing follows the stat content: globe → global trade partner,
// handshake → trusted partnerships, blocks → expanding portfolio, map → India.
const ITEMS = [
  {key: 's1', icon: IconGlobe},
  {key: 's2', icon: IconDeal},
  {key: 's3', icon: IconBlocks},
  {key: 's4', icon: IconIndia}
] as const;

// Brand-value band on the deep espresso: icon → serif label → subtitle, four
// across with hairline dividers and a small saffron diamond on each seam.
export async function Stats() {
  const t = await getTranslations('Home.stats');

  return (
    <section className="relative bg-traya-deep text-traya-cream">
      {/* brand top rule */}
      <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-traya-red/60 to-transparent" />
      <Container className="py-14 lg:py-16">
        <ul className="grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-4 lg:gap-x-0 lg:gap-y-0 lg:divide-x lg:divide-traya-cream/10">
          {ITEMS.map((item, i) => (
            <li
              key={item.key}
              data-stagger
              className="relative flex flex-col items-center px-4 text-center lg:px-8"
            >
              {/* saffron diamonds on the interior seams only (desktop) */}
              {i > 0 && (
                <span
                  aria-hidden
                  className="absolute left-0 top-1/2 hidden size-1.5 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-traya-saffron/80 lg:block"
                />
              )}
              <span className="text-traya-saffron">{item.icon}</span>
              <p className="mt-3 font-display text-lg uppercase tracking-[0.12em] text-traya-cream lg:text-xl">
                {t(item.key)}
              </p>
              <p className="mt-1 text-sm text-traya-cream/60">{t(`${item.key}Sub`)}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
