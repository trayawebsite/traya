'use client';

import {useState, useMemo, cloneElement, type ReactElement} from 'react';
import {z} from 'zod';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {useTranslations} from 'next-intl';
import {Link} from '@/i18n/navigation';
import {useEnquiry, type EnquiryItem} from '@/lib/enquiry-context';
import {Container} from '@/components/ui/container';
import {useHoneypot} from '@/components/ui/honeypot';
import {primaryButton} from '@/lib/button-styles';
import {toast} from 'sonner';

// Local schema for the enquiry-list form fields. productName and message are
// constructed from the cart items before POSTing, so they aren't form inputs.
type FormValues = {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  notes?: string;
};

export function EnquiryListView() {
  const t = useTranslations('Enquiry.list');
  const tv = useTranslations('Validation');
  const {items, remove, clear} = useEnquiry();
  const [submitted, setSubmitted] = useState(false);
  const formSchema = useMemo(
    () =>
      z.object({
        name: z.string().trim().min(2, tv('name')).max(100),
        email: z.string().trim().email(tv('email')),
        company: z.string().trim().max(150).optional().or(z.literal('')),
        phone: z.string().trim().max(30).optional().or(z.literal('')),
        notes: z.string().trim().max(2000).optional().or(z.literal(''))
      }),
    [tv]
  );
  const honeypot = useHoneypot();
  const {
    register,
    handleSubmit,
    reset,
    setFocus,
    formState: {errors, isSubmitting}
  } = useForm<FormValues>({resolver: zodResolver(formSchema)});

  // Move focus to the first invalid field on a failed submit (a11y).
  function onInvalid(errs: Record<string, unknown>) {
    const first = Object.keys(errs)[0];
    if (first) setFocus(first as keyof FormValues);
  }

  async function onSubmit(values: FormValues) {
    const productList = items.map((i) => `${i.name} (${i.category})`).join('\n  ');
    const fullMessage = [
      'Enquiry List: batched RFQ',
      '',
      'Products:',
      `  ${productList}`,
      '',
      values.notes ? `Notes:\n${values.notes}` : ''
    ]
      .filter(Boolean)
      .join('\n')
      .slice(0, 2000);

    // productName is a lead-list column the server caps at 200 chars, so a large
    // cart must be summarised here — the full itemised list lives in `message`.
    const allNames = items.map((i) => i.name).join(', ');
    const productName =
      allNames.length <= 200
        ? allNames
        : `${items.length} products — ${allNames.slice(0, 170).trimEnd()}…`;

    try {
      const res = await fetch('/api/inquiry', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          name: values.name.trim(),
          email: values.email.trim(),
          company: values.company?.trim() || undefined,
          phone: values.phone?.trim() || undefined,
          productName,
          message: fullMessage,
          website: honeypot.getValue()
        })
      });
      const json = await res.json().catch(() => ({}));

      if (res.ok && json.ok) {
        toast.success(t('success'));
        clear();
        reset();
        setSubmitted(true);
      } else if (res.status === 429) {
        toast.error(t('rateLimited'));
      } else {
        toast.error(t('error'));
      }
    } catch {
      toast.error(t('error'));
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
            {t('heading')}{" "}
            <span className="text-traya-red">
              {t('headingAccent')}
            </span>
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
              <form
                onSubmit={handleSubmit(onSubmit, onInvalid)}
                noValidate
                className="relative mt-10 rounded-2xl border border-traya-border bg-card p-6 shadow-sm sm:p-8"
              >
                {honeypot.field}
                <h2 className="font-display text-lg text-foreground">{t('contactHeading')}</h2>
                <p className="mt-1 text-sm text-muted-foreground">{t('contactSub')}</p>

                <div className="mt-6 grid gap-x-5 gap-y-5 sm:grid-cols-2">
                  <Field id="name" label={t('name')} required error={errors.name?.message}>
                    <input id="name" type="text" autoComplete="name" {...register('name')} className={inputCls} />
                  </Field>
                  <Field id="email" label={t('email')} required error={errors.email?.message}>
                    <input id="email" type="email" autoComplete="email" {...register('email')} className={inputCls} />
                  </Field>
                  <Field id="company" label={t('company')} error={errors.company?.message}>
                    <input id="company" type="text" autoComplete="organization" {...register('company')} className={inputCls} />
                  </Field>
                  <Field id="phone" label={t('phone')} error={errors.phone?.message}>
                    <input id="phone" type="tel" autoComplete="tel" {...register('phone')} className={inputCls} />
                  </Field>
                  <Field id="notes" label={t('notes')} error={errors.notes?.message} full>
                    <textarea
                      id="notes"
                      rows={3}
                      placeholder={t('notesPlaceholder')}
                      {...register('notes')}
                      className={`${inputCls} resize-y`}
                    />
                  </Field>
                </div>

                <div className="mt-7 flex items-center justify-between">
                  <button type="button" onClick={clear} className="text-sm text-muted-foreground hover:text-destructive">
                    {t('clearAll')}
                  </button>
                  <button
                    type="submit"
                    disabled={items.length === 0 || isSubmitting}
                    className={`${primaryButton} disabled:cursor-not-allowed disabled:opacity-60`}
                  >
                    {isSubmitting ? t('sending') : t('submit')}
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
  'w-full rounded-md border border-traya-border bg-background px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/70 focus-visible:border-traya-red focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-traya-red/30 aria-[invalid=true]:border-destructive';

function Field({
  id,
  label,
  required,
  error,
  full,
  children
}: {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  full?: boolean;
  children: ReactElement;
}) {
  const errorId = error ? `${id}-error` : undefined;
  return (
    <div className={full ? 'sm:col-span-2' : undefined}>
      <label htmlFor={id} className="mb-1.5 block text-xs font-medium text-foreground/70">
        {label}
        {required && <span aria-hidden="true" className="text-destructive"> *</span>}
      </label>
      {cloneElement(children as ReactElement<Record<string, unknown>>, {
        'aria-required': required ? true : undefined,
        'aria-invalid': error ? true : undefined,
        'aria-describedby': errorId
      })}
      {error && (
        <p id={errorId} role="alert" className="mt-1.5 text-xs text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}

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
