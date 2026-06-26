'use client';

import {useEffect} from 'react';

const CRISP_ID = process.env.NEXT_PUBLIC_CRISP_WEBSITE_ID;

export function CrispScript() {
  useEffect(() => {
    if (!CRISP_ID) return;
    window.$crisp = [];
    window.CRISP_WEBSITE_ID = CRISP_ID;
    const script = document.createElement('script');
    script.src = 'https://client.crisp.chat/l.js';
    script.async = true;
    document.head.appendChild(script);
  }, []);

  return null;
}

declare global {
  interface Window {
    $crisp: unknown[];
    CRISP_WEBSITE_ID: string;
  }
}
