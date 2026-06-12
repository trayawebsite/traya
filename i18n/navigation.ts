import {createNavigation} from 'next-intl/navigation';
import {routing} from './routing';

// Locale-aware drop-in replacements for next/link and next/navigation.
// Always import Link/redirect/useRouter/usePathname from here, never from next directly.
export const {Link, redirect, usePathname, useRouter, getPathname} =
  createNavigation(routing);
