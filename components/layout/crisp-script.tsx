'use client';

import {useEffect} from 'react';
import {Crisp} from 'crisp-sdk-web';

const CRISP_ID = process.env.NEXT_PUBLIC_CRISP_WEBSITE_ID;

export function CrispScript() {
  useEffect(() => {
    if (!CRISP_ID) return;

    Crisp.configure(CRISP_ID, {autoload: false});
    Crisp.load();

    // CSS: hide native launcher badge — only our custom floating button should show.
    // The SDK injects a .crisp-client container; the launcher badge sits inside it.
    const style = document.createElement('style');
    style.id = 'crisp-hide-launcher';
    style.textContent = `
      .crisp-client .crisp-badge-container,
      .crisp-client .crisp-message-count { display: none !important; }
    `;
    document.head.appendChild(style);

    return () => {style.remove();};
  }, []);

  return null;
}
