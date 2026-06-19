'use client';

import {useState, useEffect, cloneElement, type ReactElement} from 'react';
import Image from 'next/image';
import {z} from 'zod';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {useTranslations} from 'next-intl';
import {toast} from 'sonner';
import {inquirySchema} from '@/lib/validations';
import {Container} from '@/components/ui/container';
import {primaryButton} from '@/lib/button-styles';

// Shipment isn't on the API schema, so extend locally; it's folded into the
// message before POSTing to /api/inquiry.
const formSchema = inquirySchema.extend({shipment: z.string().optional()});
type FormValues = z.infer<typeof formSchema>;

// Pre-footer enquiry section (site-wide). Light ivory band + lifted white form
// card → strong contrast against the dark footer below. Vermilion only on the
// submit + accents. Wired to /api/inquiry (validation → email → Sheets → rate
// limit all already behind it). Real <label>s, not placeholder-as-label.
export function EnquirySection({founderPhoto}: {founderPhoto: string}) {
  const t = useTranslations('Enquiry');
  const shipmentModes = t('shipmentModes').split(' · ');
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    setFocus,
    formState: {errors, isSubmitting}
  } = useForm<FormValues>({resolver: zodResolver(formSchema)});

  // Prefill the product field from a "?product=…" enquire link (so the buyer
  // doesn't retype it and we keep per-product lead attribution).
  useEffect(() => {
    const product = new URLSearchParams(window.location.search).get('product');
    if (product) setValue('productName', product);
  }, [setValue]);

  // Move focus to the first invalid field on a failed submit (a11y — with
  // noValidate the native jump is off).
  function onInvalid(errs: Record<string, unknown>) {
    const first = Object.keys(errs)[0];
    if (first) setFocus(first as keyof FormValues);
  }

  async function onSubmit(values: FormValues) {
    const {shipment, ...rest} = values;
    const message = shipment ? `Shipment mode: ${shipment}\n\n${rest.message}` : rest.message;
    try {
      const res = await fetch('/api/inquiry', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({...rest, message})
      });
      const json = await res.json().catch(() => ({}));
      if (res.ok && json.ok) {
        toast.success(t('success'));
        reset();
      } else if (res.status === 429) {
        toast.error(t('rateLimited'));
      } else {
        toast.error(t('error'));
      }
    } catch {
      toast.error(t('error'));
    }
  }

  return (
    <section id="enquiry" className="border-t border-traya-border bg-traya-surface">
      <Container className="py-section">
        <div className="grid items-start gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-20">
          {/* Left — invitation */}
          <div className="max-w-md lg:pt-4">
            <p className="section-label">{t('eyebrow')}</p>
            <h2 className="mt-4 text-balance font-display text-display-sm text-foreground lg:text-display">
              {t('heading')}
            </h2>
            <p className="mt-5 leading-relaxed text-muted-foreground">{t('sub')}</p>
            <ul className="mt-8 space-y-3.5">
              {(['trust1', 'trust2', 'trust3'] as const).map((k) => (
                <li key={k} className="flex items-start gap-3 text-sm text-foreground/80">
                  <svg
                    className="mt-0.5 size-4 shrink-0 text-traya-forest"
                    viewBox="0 0 20 20"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M4 10.5l4 4 8-9" />
                  </svg>
                  {t(k)}
                </li>
              ))}
            </ul>

            {/* Founder note — a real face beats any illustration. Falls back to
                an initials avatar if the portrait fails to load. */}
            <figure className="mt-10 flex items-center gap-4 border-t border-traya-border pt-6">
              <FounderAvatar name={t('founderName')} src={founderPhoto} />
              <figcaption>
                <p className="font-display text-base italic leading-snug text-foreground">
                  {t('founderNote')}
                </p>
                <p className="mt-1.5 text-xs text-muted-foreground">
                  <span className="font-medium text-foreground/80">{t('founderName')}</span> ·{' '}
                  {t('founderRole')}
                </p>
              </figcaption>
            </figure>
          </div>

          {/* Right — form card */}
          <form
            onSubmit={handleSubmit(onSubmit, onInvalid)}
            noValidate
            className="rounded-2xl border border-traya-border bg-card p-6 shadow-md sm:p-8"
          >
            <div className="grid gap-x-5 gap-y-6 sm:grid-cols-2">
              <Field id="name" label={t('name')} required error={errors.name?.message}>
                <input id="name" type="text" autoComplete="name" {...register('name')} className={inputCls} />
              </Field>
              <Field id="email" label={t('email')} required error={errors.email?.message}>
                <input id="email" type="email" autoComplete="email" {...register('email')} className={inputCls} />
              </Field>
              <Field id="phone" label={t('phone')} error={errors.phone?.message}>
                <input id="phone" type="tel" autoComplete="tel" {...register('phone')} className={inputCls} />
              </Field>
              <Field id="company" label={t('company')} error={errors.company?.message}>
                <input id="company" type="text" autoComplete="organization" {...register('company')} className={inputCls} />
              </Field>
              <Field id="productName" label={t('product')} error={errors.productName?.message}>
                <input id="productName" type="text" {...register('productName')} className={inputCls} />
              </Field>
              <Field id="shipment" label={t('shipment')}>
                <select id="shipment" defaultValue="" {...register('shipment')} className={inputCls}>
                  <option value="" disabled>
                    {t('shipmentPlaceholder')}
                  </option>
                  {shipmentModes.map((m) => (
                    <option key={m} value={m}>
                      {m}
                    </option>
                  ))}
                </select>
              </Field>
              <Field id="message" label={t('requirements')} required error={errors.message?.message} full>
                <textarea
                  id="message"
                  rows={4}
                  placeholder={t('requirementsPlaceholder')}
                  {...register('message')}
                  className={`${inputCls} resize-y`}
                />
              </Field>
            </div>

            <div className="mt-7 flex justify-end">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`${primaryButton} disabled:cursor-not-allowed disabled:opacity-60`}
              >
                {isSubmitting ? t('sending') : t('submit')}
              </button>
            </div>
          </form>
        </div>
      </Container>
    </section>
  );
}

const inputCls =
  'w-full rounded-md border border-traya-border bg-background px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/70 focus-visible:border-traya-red focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-traya-red/30 aria-[invalid=true]:border-destructive';

// Optimized founder photo (next/image), with an initials avatar as the graceful
// fallback if the remote portrait fails to load.
function FounderAvatar({name, src}: {name: string; src: string}) {
  const [showPhoto, setShowPhoto] = useState(true);
  const initials = name
    .split(' ')
    .map((w) => w[0])
    .slice(0, 2)
    .join('');
  return (
    <span className="relative flex size-14 shrink-0 items-center justify-center overflow-hidden rounded-full bg-traya-red/10 font-display text-base font-medium text-traya-red-deep">
      {initials}
      {showPhoto && (
        <Image
          src={src}
          alt={name}
          fill
          sizes="56px"
          onError={() => setShowPhoto(false)}
          className="object-cover"
        />
      )}
    </span>
  );
}

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
      {/* Inject a11y wiring: required + invalid state announced; error is a live region. */}
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
