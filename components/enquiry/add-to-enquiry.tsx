'use client';

import {useEnquiry} from '@/lib/enquiry-context';
import {useTranslations} from 'next-intl';

export function AddToEnquiryButton({
  slug,
  name,
  category,
  className = ''
}: {
  slug: string;
  name: string;
  category: string;
  className?: string;
}) {
  const {add, remove, has} = useEnquiry();
  const t = useTranslations('Enquiry');
  const added = has(slug);

  return (
    <button
      type="button"
      onClick={() => (added ? remove(slug) : add({slug, name, category}))}
      className={className}
    >
      {added ? t('removeFromList') : t('addToList')}
    </button>
  );
}
