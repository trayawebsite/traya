'use client';

import {useSyncExternalStore} from 'react';

// Renders the current year on the client so the SSG copyright never goes stale
// between rebuilds. useSyncExternalStore gives a client-only value with no
// hydration mismatch and no setState-in-effect: server snapshot is null
// (renders empty), client snapshot is the live year.
const subscribe = () => () => {};

export function CurrentYear() {
  const year = useSyncExternalStore(
    subscribe,
    () => new Date().getFullYear(),
    () => null
  );
  return <>{year ?? ''}</>;
}
