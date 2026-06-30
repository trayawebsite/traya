'use client';

import {useEnquiry} from '@/lib/enquiry-context';
import {Link} from '@/i18n/navigation';

export function EnquiryBadge({className = ''}: {className?: string}) {
  const {count} = useEnquiry();

  if (count === 0) return null;

  return (
    <Link href="/enquiry" className={className}>
      <span className="relative">
        <svg
          className="size-5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
          <line x1="3" y1="6" x2="21" y2="6" />
          <path d="M16 10a4 4 0 01-8 0" />
        </svg>
        <span className="absolute -end-2 -top-2 flex size-5 items-center justify-center rounded-full bg-traya-red text-[10px] font-bold text-white">
          {count}
        </span>
      </span>
    </Link>
  );
}
