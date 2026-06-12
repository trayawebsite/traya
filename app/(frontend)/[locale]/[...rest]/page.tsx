import {notFound} from 'next/navigation';

// Catch-all for unmatched paths under a locale. Forces Next to render the
// localized, shell-wrapped not-found.tsx instead of the bare root 404.
// Real pages (about, products, …) are more specific and always win over this.
export default function CatchAllNotFound() {
  notFound();
}
