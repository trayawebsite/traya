'use client';

import {useState} from 'react';
import {useTranslations} from 'next-intl';
import {Link} from '@/i18n/navigation';
import {useEnquiry, type EnquiryItem} from '@/lib/enquiry-context';
import {Container} from '@/components/ui/container';
import {primaryButton} from '@/lib/button-styles';
import {toast} from 'sonner';

export function EnquiryListView() {
  const t = useTranslations('Enquiry.list');
  const {items, remove, clear} = useEnquiry();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const canSubmit = items.length > 0 && name.trim().length >= 2 && email.trim().length > 0;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;

    setSubmitting(true);
    try {
      const productList = items.map((i) => `${i.name} (${i.category})`).join('\n  ');
      const fullMessage = [
        'Enquiry List: batched RFQ',
        '',
        'Products:',
        `  ${productList}`,
        '',
        message ? `Notes:\n${message}` : ''
      ]
        .filter(Boolean)
        .join('\n');

      const res = await fetch('/api/inquiry', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          company: company.trim() || undefined,
          phone: phone.trim() || undefined,
          productName: items.map((i) => i.name).join(', '),
          message: fullMessage
        })
      });
      const json = await res.json().catch(() => ({}));

      if (res.ok && json.ok) {
        toast.success(t('success'));
        clear();
        setSubmitted(true);
      } else if (res.status === 429) {
        toast.error(t('rateLimited'));
      } else {
        toast.error(t('error'));
      }
    } catch {
      toast.error(t('error'));
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <section className="bg-background">
        <Container className="py-section-lg">
          <div className="mx-auto max-w-lg text-center">
            <div className="mx-auto mb-6 flex size-16 items-center justify-center rounded-full bg-traya-forest/10 text-traya-forest">
              <svg className="size-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 10.5l4 4 8-9" />
              </svg>
            </div>
            <h1 className="font-display text-display-sm text-foreground">{t('submittedHeading')}</h1>
            <p className="mt-4 leading-relaxed text-muted-foreground">{t('submittedBody')}</p>
            <Link href="/products" className={`${primaryButton} mt-8 inline-flex`}>
              {t('browseProducts')}
            </Link>
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section className="bg-background">
      <Container className="py-section-lg">
        <div className="mx-auto max-w-3xl">
          <p className="section-label">{t('eyebrow')}</p>
          <h1 className="mt-3 text-balance font-display text-display-lg text-foreground">
            {t('heading')}
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{t('sub')}</p>

          {/* Product list */}
          {items.length === 0 ? (
            <div className="mt-12 rounded-2xl border border-dashed border-traya-border bg-traya-surface/50 py-16 text-center">
              <p className="text-muted-foreground">{t('empty')}</p>
              <Link href="/products" className={`${primaryButton} mt-6 inline-flex`}>
                {t('browseProducts')}
              </Link>
            </div>
          ) : (
            <>
              <div className="mt-10 space-y-3">
                {items.map((item) => (
                  <EnquiryItemRow key={item.slug} item={item} onRemove={remove} t={t} />
                ))}
              </div>

              {/* Contact form */}
              <form onSubmit={handleSubmit} noValidate className="mt-10 rounded-2xl border border-traya-border bg-card p-6 shadow-sm sm:p-8">
                <h2 className="font-display text-lg text-foreground">{t('contactHeading')}</h2>
                <p className="mt-1 text-sm text-muted-foreground">{t('contactSub')}</p>

                <div className="mt-6 grid gap-x-5 gap-y-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="enq-name" className="mb-1.5 block text-xs font-medium text-foreground/70">
                      {t('name')} <span className="text-destructive" aria-hidden="true">*</span>
                    </label>
                    <input
                      id="enq-name"
                      type="text"
                      required
                      autoComplete="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className={inputCls}
                    />
                  </div>
                  <div>
                    <label htmlFor="enq-email" className="mb-1.5 block text-xs font-medium text-foreground/70">
                      {t('email')} <span className="text-destructive" aria-hidden="true">*</span>
                    </label>
                    <input
                      id="enq-email"
                      type="email"
                      required
                      autoComplete="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={inputCls}
                    />
                  </div>
                  <div>
                    <label htmlFor="enq-company" className="mb-1.5 block text-xs font-medium text-foreground/70">
                      {t('company')}
                    </label>
                    <input
                      id="enq-company"
                      type="text"
                      autoComplete="organization"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      className={inputCls}
                    />
                  </div>
                  <div>
                    <label htmlFor="enq-phone" className="mb-1.5 block text-xs font-medium text-foreground/70">
                      {t('phone')}
                    </label>
                    <input
                      id="enq-phone"
                      type="tel"
                      autoComplete="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className={inputCls}
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="enq-message" className="mb-1.5 block text-xs font-medium text-foreground/70">
                      {t('notes')}
                    </label>
                    <textarea
                      id="enq-message"
                      rows={3}
                      placeholder={t('notesPlaceholder')}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className={`${inputCls} resize-y`}
                    />
                  </div>
                </div>

                <div className="mt-7 flex items-center justify-between">
                  <button type="button" onClick={clear} className="text-sm text-muted-foreground hover:text-destructive">
                    {t('clearAll')}
                  </button>
                  <button
                    type="submit"
                    disabled={!canSubmit || submitting}
                    className={`${primaryButton} disabled:cursor-not-allowed disabled:opacity-60`}
                  >
                    {submitting ? t('sending') : t('submit')}
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </Container>
    </section>
  );
}

const inputCls =
  'w-full rounded-md border border-traya-border bg-background px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/70 focus-visible:border-traya-red focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-traya-red/30';

function EnquiryItemRow({
  item,
  onRemove,
  t
}: {
  item: EnquiryItem;
  onRemove: (slug: string) => void;
  t: (key: string) => string;
}) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-xl border border-traya-border bg-card px-5 py-4">
      <div className="min-w-0">
        <Link
          href={`/products/${item.slug}`}
          className="font-medium text-foreground hover:text-traya-red-deep hover:underline"
        >
          {item.name}
        </Link>
        <p className="mt-0.5 text-xs text-muted-foreground">{item.category}</p>
      </div>
      <button
        type="button"
        onClick={() => onRemove(item.slug)}
        className="shrink-0 rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
        aria-label={`${t('remove')} ${item.name}`}
      >
        <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>
    </div>
  );
}
