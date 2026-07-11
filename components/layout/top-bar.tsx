import { getTranslations } from "next-intl/server";
import { getSiteSettings } from "@/lib/site-settings";
import { siteConfig } from "@/lib/site-config";
import { whatsAppHref } from "@/lib/whatsapp";
import { Container } from "@/components/ui/container";

const linkCls =
  "rounded-sm text-traya-cream/70 transition-colors duration-150 hover:text-traya-cream focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-traya-red-hi";

// Small leading glyphs for the contact links   inline SVG (currentColor) to
// match the social icons below; no extra icon dependency.
const iconCls = "size-4 shrink-0";
const PhoneIcon = (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={iconCls}
    aria-hidden="true"
  >
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);
const MailIcon = (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={iconCls}
    aria-hidden="true"
  >
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);
// Monochrome (currentColor) so it sits with the phone/mail glyphs rather than
// shouting in brand-green   the floating button carries the full-colour logo.
const WhatsAppIcon = (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={iconCls}
    aria-hidden="true"
  >
    <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm0 1.67c2.2 0 4.27.86 5.82 2.42a8.19 8.19 0 0 1 2.41 5.82c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.16 8.16 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24zm4.52 9.93c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.12-.16.25-.64.81-.78.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.01-.38.11-.5.11-.11.25-.29.37-.43.12-.14.16-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.23.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.14-1.18-.06-.1-.22-.16-.47-.28z" />
  </svg>
);

// Light formatter for the WhatsApp line (digits-only in config) → "+91 99989 16679".
function formatWa(num: string): string {
  const d = num.replace(/\D/g, "");
  if (d.length === 12 && d.startsWith("91")) {
    const n = d.slice(2);
    return `+91 ${n.slice(0, 5)} ${n.slice(5)}`;
  }
  return d ? `+${d}` : "";
}

// Minimal monochrome glyphs (currentColor)   no coloured icon circles. Fall back
// to the text label for any social without a mapped icon.
const SOCIAL_ICONS: Record<string, React.ReactNode> = {
  linkedin: (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className="size-4.5"
      aria-hidden="true"
    >
      <path d="M4.98 3.5A2.5 2.5 0 1 1 0 3.5a2.5 2.5 0 0 1 4.98 0zM.5 8h4V23h-4V8zM8.5 8h3.83v2.05h.05c.53-1 1.84-2.06 3.79-2.06 4.05 0 4.8 2.67 4.8 6.14V23h-4v-6.02c0-1.44-.03-3.29-2-3.29-2.01 0-2.32 1.57-2.32 3.19V23h-4V8z" />
    </svg>
  ),
  instagram: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="size-4.5"
      aria-hidden="true"
    >
      <rect x="2.5" y="2.5" width="19" height="19" rx="5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  ),
};

// Slim desktop utility strip above the nav. It is NOT sticky   it scrolls away
// while the nav below stays pinned. Real contact + text-link socials, on a
// faintly tinted shelf: deliberately not the dated amber-icon / obfuscated-email
// exporter bar. Values from getSiteSettings(); each renders only when present.
export async function TopBar() {
  const th = await getTranslations("Header");
  const s = await getSiteSettings();

  const socialUrl: Record<string, string> = {
    linkedin: s.socials.linkedin,
    instagram: s.socials.instagram,
  };
  const socials = siteConfig.socials.filter((soc) => socialUrl[soc.key]);

  const wa = siteConfig.whatsapp.number;
  const waHref = whatsAppHref(th("whatsappMessage"));

  const divider = <span aria-hidden className="h-3 w-px bg-traya-cream/20" />;

  return (
    <div className="hidden border-b border-traya-deep-mid bg-traya-deep lg:block">
      <Container className="flex h-11 items-center justify-end gap-6 text-[13px]">
        <address className="flex items-center gap-4 not-italic">
          {s.contact.phone && (
            <a
              href={`tel:${s.contact.phone.replace(/\s+/g, "")}`}
              className={`inline-flex items-center gap-1.5 ${linkCls}`}
            >
              {PhoneIcon}
              {s.contact.phone}
            </a>
          )}
          {s.contact.phone && waHref && divider}
          {waHref && (
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={th("whatsapp")}
              className={`inline-flex items-center gap-1.5 ${linkCls}`}
            >
              {WhatsAppIcon}
              {formatWa(wa)}
            </a>
          )}
          {(s.contact.phone || waHref) && s.contact.email && divider}
          {s.contact.email && (
            <a
              href={`mailto:${s.contact.email}`}
              className={`inline-flex items-center gap-1.5 ${linkCls}`}
            >
              {MailIcon}
              {s.contact.email}
            </a>
          )}
          {socials.length > 0 && (
            <>
              {divider}
              <ul className="flex items-center gap-3.5">
                {socials.map((soc) => (
                  <li key={soc.key}>
                    <a
                      href={socialUrl[soc.key]}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={soc.label}
                      className={`inline-flex ${linkCls}`}
                    >
                      {SOCIAL_ICONS[soc.key] ?? soc.label}
                    </a>
                  </li>
                ))}
              </ul>
            </>
          )}
        </address>
      </Container>
    </div>
  );
}
