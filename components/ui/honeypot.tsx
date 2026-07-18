"use client";

import { useCallback, useRef } from "react";

// Honeypot spam trap. Renders a text input that real users never see or tab to
// (off-screen, aria-hidden, tabIndex -1, autoComplete off), but naive bots tend
// to auto-fill. `field` goes inside the <form>; `getValue()` is read at submit
// time and sent as `website` in the payload. The lead API silently drops any
// request where it's non-empty. Stateless + no client secret   cheap first-line
// defense alongside the per-IP rate limit.
export function useHoneypot() {
  const ref = useRef<HTMLInputElement>(null);
  const getValue = useCallback(() => ref.current?.value ?? "", []);

  const field = (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute -left-[9999px] top-0 h-0 w-0 overflow-hidden"
    >
      <label>
        Do not fill this field
        <input
          ref={ref}
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          defaultValue=""
        />
      </label>
    </div>
  );

  return { field, getValue };
}
