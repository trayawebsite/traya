'use client';

import {createContext, useContext, useState, useEffect, useCallback, type ReactNode} from 'react';

export type EnquiryItem = {
  slug: string;
  name: string;
  category: string;
  addedAt: number;
};

type EnquiryContextValue = {
  items: EnquiryItem[];
  add: (item: Omit<EnquiryItem, 'addedAt'>) => void;
  remove: (slug: string) => void;
  clear: () => void;
  has: (slug: string) => boolean;
  count: number;
};

const STORAGE_KEY = 'traya-enquiry-list';

function loadFromStorage(): EnquiryItem[] {
  if (typeof window === 'undefined') return [];
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch {
    // corrupt storage — start fresh
  }
  return [];
}

const EnquiryContext = createContext<EnquiryContextValue | null>(null);

export function EnquiryProvider({children}: {children: ReactNode}) {
  const [items, setItems] = useState<EnquiryItem[]>(loadFromStorage);

  // Persist to localStorage on change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // storage full or blocked — silently fail
    }
  }, [items]);

  const add = useCallback((item: Omit<EnquiryItem, 'addedAt'>) => {
    setItems((prev) => {
      if (prev.some((i) => i.slug === item.slug)) return prev;
      return [...prev, {...item, addedAt: Date.now()}];
    });
  }, []);

  const remove = useCallback((slug: string) => {
    setItems((prev) => prev.filter((i) => i.slug !== slug));
  }, []);

  const clear = useCallback(() => {
    setItems([]);
  }, []);

  const has = useCallback(
    (slug: string) => items.some((i) => i.slug === slug),
    [items]
  );

  return (
    <EnquiryContext.Provider value={{items, add, remove, clear, has, count: items.length}}>
      {children}
    </EnquiryContext.Provider>
  );
}

export function useEnquiry() {
  const ctx = useContext(EnquiryContext);
  if (!ctx) throw new Error('useEnquiry must be used within EnquiryProvider');
  return ctx;
}
