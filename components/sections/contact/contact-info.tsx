import Image from 'next/image';
import {getTranslations} from 'next-intl/server';
import {Container} from '@/components/ui/container';
import {getSiteSettings} from '@/lib/site-settings';
import {siteConfig} from '@/lib/site-config';
import {whatsAppHref} from '@/lib/whatsapp';
import {primaryButton} from '@/lib/button-styles';

const ICON = 'size-5';

const MailIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={ICON} aria-hidden="true">
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);
const PhoneIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={ICON} aria-hidden="true">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);
const WhatsAppIcon = (
  <svg viewBox="0 0 24 24" fill="currentColor" className={ICON} aria-hidden="true">
    <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm0 1.67c2.2 0 4.27.86 5.82 2.42a8.19 8.19 0 0 1 2.41 5.82c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.16 8.16 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24zm4.52 9.93c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.12-.16.25-.64.81-.78.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.01-.38.11-.5.11-.11.25-.29.37-.43.12-.14.16-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.23.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.14-1.18-.06-.1-.22-.16-.47-.28z" />
  </svg>
);
const PinIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={ICON} aria-hidden="true">
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);
const ClockIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={ICON} aria-hidden="true">
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </svg>
);
const ShareIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={ICON} aria-hidden="true">
    <circle cx="18" cy="5" r="3" />
    <circle cx="6" cy="12" r="3" />
    <circle cx="18" cy="19" r="3" />
    <path d="m8.6 13.5 6.8 4M15.4 6.5l-6.8 4" />
  </svg>
);

const linkCls =
  'rounded-sm underline-offset-4 transition-colors hover:text-traya-red-deep hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring';

export async function ContactInfo() {
  const t = await getTranslations('Contact');
  const th = await getTranslations('Header');
  const s = await getSiteSettings();

  const waHref = whatsAppHref(th('whatsappMessage'));

  const socialUrl: Record<string, string> = {
    linkedin: s.socials.linkedin,
    instagram: s.socials.instagram
  };
  const socials = siteConfig.socials.filter((soc) => socialUrl[soc.key]);

  return (
    <section className="border-b border-traya-border bg-background">
      <Container className="pt-section-sm pb-section-lg">
        {/* Header   left-aligned copy + CTA, image on the right */}
        <div className="grid items-center gap-10 lg:grid-cols-[0.48fr_0.52fr] lg:gap-16">
          <div className="max-w-xl">
            <p className="section-label">{t('hero.eyebrow')}</p>
            <h1 className="mt-3 text-balance font-display text-display-lg text-foreground">
              {t('hero.heading')}
            </h1>
            <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
              {t('hero.body')}
            </p>
            <a href="#enquiry" className={`mt-7 ${primaryButton}`}>
              {t('hero.cta')}
              <span aria-hidden className="ms-1.5">&rarr;</span>
            </a>
          </div>
          <Image
            src="/contact.webp"
            alt=""
            aria-hidden="true"
            width={612}
            height={408}
            priority
            sizes="(min-width: 1024px) 45vw, 100vw"
            className="h-auto w-full max-w-none"
          />
        </div>

        {/* Primary contact methods */}
        <div className="mt-14 grid gap-5 sm:grid-cols-3">
          {s.contact.email && (
            <ContactCard icon={MailIcon} label={t('emailLabel')}>
              <a href={`mailto:${s.contact.email}`} className={`text-foreground ${linkCls}`}>
                {s.contact.email}
              </a>
            </ContactCard>
          )}
          {s.contact.phone && (
            <ContactCard icon={PhoneIcon} label={t('phoneLabel')}>
              <a href={`tel:${s.contact.phone.replace(/\s+/g, '')}`} className={`text-foreground ${linkCls}`}>
                {s.contact.phone}
              </a>
            </ContactCard>
          )}
          {waHref && (
            <ContactCard icon={WhatsAppIcon} label={t('whatsappLabel')}>
              <a href={waHref} target="_blank" rel="noopener noreferrer" className={`text-foreground ${linkCls}`}>
                {t('whatsappCta')}
              </a>
            </ContactCard>
          )}
        </div>

        {/* Secondary info */}
        <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {s.contact.address && (
            <ContactCard icon={PinIcon} label={t('addressLabel')}>
              <address className="not-italic leading-relaxed text-foreground">{s.contact.address}</address>
            </ContactCard>
          )}
          <ContactCard icon={ClockIcon} label={t('hoursLabel')}>
            <p className="leading-relaxed text-muted-foreground">{t('hours')}</p>
          </ContactCard>
          {socials.length > 0 && (
            <ContactCard icon={ShareIcon} label={t('socialLabel')}>
              <ul className="flex flex-wrap gap-x-5 gap-y-2">
                {socials.map((soc) => (
                  <li key={soc.key}>
                    <a href={socialUrl[soc.key]} target="_blank" rel="noopener noreferrer" className={`text-foreground ${linkCls}`}>
                      {soc.label}
                    </a>
                  </li>
                ))}
              </ul>
            </ContactCard>
          )}
        </div>
      </Container>
    </section>
  );
}

function ContactCard({
  icon,
  label,
  children
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div data-stagger className="rounded-2xl border border-traya-border bg-card p-6 transition-shadow duration-200 hover:shadow-sm sm:p-7">
      <span className="grid size-10 place-items-center rounded-lg bg-traya-saffron-soft text-traya-saffron-lo">
        {icon}
      </span>
      <p className="mt-4 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
        {label}
      </p>
      <div className="mt-2 text-base">{children}</div>
    </div>
  );
}
