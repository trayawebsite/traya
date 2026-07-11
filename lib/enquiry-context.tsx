"use client";

import {
  createContext,
  useContext,
  useCallback,
  useSyncExternalStore,
  type ReactNode,
} from "react";

export type EnquiryItem = {
  slug: string;
  name: string;
  category: string;
  addedAt: number;
};

type EnquiryContextValue = {
  items: EnquiryItem[];
  add: (item: Omit<EnquiryItem, "addedAt">) => void;
  remove: (slug: string) => void;
  clear: () => void;
  has: (slug: string) => boolean;
  count: number;
};

const STORAGE_KEY = "traya-enquiry-list";

// ── localStorage-backed external store ───────────────────────────────────
// Using useSyncExternalStore (rather than useState + an effect) gives us a
// server snapshot of [] that matches the first client render   no hydration
// mismatch on the header badge   while reading the real persisted list on the
// client, and it stays lint-clean (no setState-in-effect).
const EMPTY: EnquiryItem[] = [];
let cache: EnquiryItem[] = EMPTY; // stable snapshot reference
let cacheRaw: string | null = null; // the raw string `cache` was parsed from
const listeners = new Set<() => void>();

function read(): EnquiryItem[] {
  if (typeof window === "undefined") return EMPTY;
  let raw: string | null = null;
  try {
    raw = localStorage.getItem(STORAGE_KEY);
  } catch {
    raw = null;
  }
  // Same underlying string → return the same reference (required by
  // useSyncExternalStore to avoid an infinite render loop).
  if (raw === cacheRaw) return cache;
  cacheRaw = raw;
  try {
    const parsed = raw ? JSON.parse(raw) : [];
    cache = Array.isArray(parsed) ? parsed : EMPTY;
  } catch {
    cache = EMPTY; // corrupt storage   start fresh
  }
  return cache;
}

function emit() {
  for (const l of listeners) l();
}

function write(items: EnquiryItem[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {
    // storage full or blocked   silently fail
  }
  cacheRaw = null; // force a fresh parse on the next read()
  emit();
}

function subscribe(callback: () => void) {
  listeners.add(callback);
  // Keep multiple tabs in sync.
  const onStorage = (e: StorageEvent) => {
    if (e.key === STORAGE_KEY) emit();
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(callback);
    window.removeEventListener("storage", onStorage);
  };
}

const getSnapshot = () => read();
const getServerSnapshot = () => EMPTY;

const EnquiryContext = createContext<EnquiryContextValue | null>(null);

export function EnquiryProvider({ children }: { children: ReactNode }) {
  const items = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const add = useCallback((item: Omit<EnquiryItem, "addedAt">) => {
    const current = read();
    if (current.some((i) => i.slug === item.slug)) return;
    write([...current, { ...item, addedAt: Date.now() }]);
  }, []);

  const remove = useCallback((slug: string) => {
    write(read().filter((i) => i.slug !== slug));
  }, []);

  const clear = useCallback(() => {
    write([]);
  }, []);

  const has = useCallback(
    (slug: string) => items.some((i) => i.slug === slug),
    [items],
  );

  return (
    <EnquiryContext.Provider
      value={{ items, add, remove, clear, has, count: items.length }}
    >
      {children}
    </EnquiryContext.Provider>
  );
}

export function useEnquiry() {
  const ctx = useContext(EnquiryContext);
  if (!ctx) throw new Error("useEnquiry must be used within EnquiryProvider");
  return ctx;
}
