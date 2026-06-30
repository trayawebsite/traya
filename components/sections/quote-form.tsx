'use client';

import {useState, cloneElement, useMemo, type ReactElement} from 'react';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {useTranslations} from 'next-intl';
import {toast} from 'sonner';
import {makeQuoteSchema, type QuoteInput} from '@/lib/validations';
import {primaryButton} from '@/lib/button-styles';
import {TestimonialCarousel} from '@/components/ui/testimonial-carousel';
import {User, Mail, Building2, Phone, MapPin, Package, MessageSquare, Check} from 'lucide-react';

type Testimonial = {
  quote: string;
  name: string;
  role?: string;
  location?: string;
};

// Quote request form — wired to /api/quote. Left column carries social proof
// (testimonials) when available, else a "what to expect" trust panel so the
// section never looks bare. Form prefills the product/category being quoted.
export function QuoteForm({
  productName,
  productSlug,
  testimonials = []
}: {
  productName?: string;
  productSlug?: string;
  testimonials?: Testimonial[];
}) {
  const t = useTranslations('Quote');
  const tv = useTranslations('Validation');
  const schema = useMemo(() => makeQuoteSchema(tv), [tv]);
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    setFocus,
    formState: {errors, isSubmitting}
  } = useForm<QuoteInput>({
    resolver: zodResolver(schema),
    defaultValues: {
      productName: productName || '',
      productSlug: productSlug || ''
    }
  });

  function onInvalid(errs: Record<string, unknown>) {
    const first = Object.keys(errs)[0];
    if (first) setFocus(first as keyof QuoteInput);
  }

  async function onSubmit(values: QuoteInput) {
    try {
      const res = await fetch('/api/quote', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(values)
      });
      const json = await res.json().catch(() => ({}));
      if (res.ok && json.ok) {
        setSubmitted(true);
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

  // Inline confirmation — a B2B buyer who just submitted wants a clear receipt,
  // not a toast that vanishes.
  if (submitted) {
    return (
      <div className="mx-auto max-w-2xl rounded-2xl border border-traya-border bg-card px-6 py-12 text-center shadow-sm sm:px-8">
        <div className="mx-auto mb-5 flex size-14 items-center justify-center rounded-full bg-traya-forest/10 text-traya-forest">
          <Check className="size-7" aria-hidden="true" />
        </div>
        <h3 className="font-display text-display-sm text-foreground">{t('successHeading')}</h3>
        <p className="mt-3 leading-relaxed text-muted-foreground">{t('successBody')}</p>
      </div>
    );
  }

  const hasTestimonials = testimonials.length > 0;

  return (
    <div className="mx-auto grid max-w-5xl items-start gap-12 lg:grid-cols-[minmax(0,1fr)_1.6fr] lg:gap-16">
      {/* Left — social proof if we have it, else a "what to expect" trust panel */}
      <div className="hidden lg:block lg:sticky lg:top-24">
        {hasTestimonials ? <TestimonialCarousel testimonials={testimonials} /> : <QuoteTrust />}
      </div>

      {/* Right — form */}
      <form
        onSubmit={handleSubmit(onSubmit, onInvalid)}
        noValidate
        className="max-w-2xl rounded-2xl border border-traya-border bg-card px-5 py-6 shadow-sm sm:px-6 sm:py-8"
      >
        {productName && (
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-traya-border bg-traya-surface px-3.5 py-1.5 text-xs font-medium text-foreground/80">
            <Package className="size-3.5 text-traya-saffron-lo" aria-hidden="true" />
            {t('quotingFor')} <span className="font-semibold text-foreground">{productName}</span>
          </div>
        )}
        <p className="text-sm font-medium text-traya-red-deep">{t('eyebrow')}</p>
        <h2 className="mt-3 font-display text-display-sm text-foreground">
          {productName ? t('headingFor', {name: productName}) : t('heading')}
        </h2>
        <p className="mt-3 leading-relaxed text-muted-foreground">{t('sub')}</p>

        <div className="mt-8 space-y-8">
          {/* Contact Details Group */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-foreground">{t('contactDetails')}</h3>
            <div className="grid gap-x-5 gap-y-6 sm:grid-cols-2">
              <Field id="name" label={t('name')} icon={<User className="size-4" />} required error={errors.name?.message}>
                <input id="name" type="text" autoComplete="name" {...register('name')} className={inputCls} />
              </Field>
              <Field id="email" label={t('email')} icon={<Mail className="size-4" />} required error={errors.email?.message}>
                <input id="email" type="email" autoComplete="email" {...register('email')} className={inputCls} />
              </Field>
              <Field id="company" label={t('company')} icon={<Building2 className="size-4" />} error={errors.company?.message}>
                <input id="company" type="text" autoComplete="organization" {...register('company')} className={inputCls} />
              </Field>
              <Field id="phone" label={t('phone')} icon={<Phone className="size-4" />} error={errors.phone?.message}>
                <input id="phone" type="tel" autoComplete="tel" {...register('phone')} className={inputCls} />
              </Field>
              <Field id="country" label={t('country')} icon={<MapPin className="size-4" />} error={errors.country?.message} full>
                <input id="country" type="text" autoComplete="country-name" {...register('country')} className={inputCls} />
              </Field>
            </div>
          </div>

          {/* Request Details Group */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-foreground">{t('requestDetails')}</h3>
            <div className="grid gap-x-5 gap-y-6 sm:grid-cols-2">
              <Field id="quantity" label={t('quantity')} icon={<Package className="size-4" />} error={errors.quantity?.message} full>
                <input
                  id="quantity"
                  type="text"
                  placeholder={t('quantityPlaceholder')}
                  {...register('quantity')}
                  className={inputCls}
                />
              </Field>
              <input type="hidden" {...register('productName')} />
              <input type="hidden" {...register('productSlug')} />
              <Field id="message" label={t('message')} icon={<MessageSquare className="size-4" />} error={errors.message?.message} full>
                <textarea
                  id="message"
                  rows={4}
                  placeholder={t('messagePlaceholder')}
                  {...register('message')}
                  className={`${inputCls} resize-y`}
                />
              </Field>
            </div>
          </div>
        </div>

        <div className="mt-7 flex flex-col-reverse items-stretch gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs leading-relaxed text-muted-foreground">{t('reassurance')}</p>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`${primaryButton} shrink-0 disabled:cursor-not-allowed disabled:opacity-60`}
          >
            {isSubmitting ? t('sending') : t('submit')}
          </button>
        </div>
      </form>
    </div>
  );
}

// Default left column when there are no testimonials yet — tells the buyer what
// they get and that it's no-obligation, so the section reads as complete.
function QuoteTrust() {
  const t = useTranslations('Quote');
  const includes = ['pricing', 'moq', 'packaging', 'leadTime', 'docs'] as const;
  return (
    <div className="rounded-2xl border border-traya-border bg-traya-surface p-6 sm:p-7">
      <p className="section-label">{t('trust.eyebrow')}</p>
      <h3 className="mt-3 font-display text-xl leading-snug text-foreground">{t('trust.heading')}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t('trust.sub')}</p>
      <ul className="mt-6 space-y-3">
        {includes.map((k) => (
          <li key={k} className="flex items-start gap-3 text-sm leading-relaxed text-foreground/85">
            <Check className="mt-0.5 size-4 shrink-0 text-traya-forest" aria-hidden="true" />
            {t(`trust.${k}`)}
          </li>
        ))}
      </ul>
      <p className="mt-6 border-t border-traya-border pt-4 text-xs leading-relaxed text-muted-foreground">
        {t('trust.note')}
      </p>
    </div>
  );
}

const inputCls =
  'w-full rounded-md border border-traya-border bg-background px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/70 focus-visible:border-traya-red focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-traya-red/30 aria-[invalid=true]:border-destructive transition-colors';

function Field({
  id,
  label,
  required,
  error,
  full,
  icon,
  children
}: {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  full?: boolean;
  icon?: ReactElement;
  children: ReactElement<{className?: string}>;
}) {
  const errorId = error ? `${id}-error` : undefined;
  return (
    <div className={full ? 'sm:col-span-2' : undefined}>
      <label htmlFor={id} className="mb-1.5 block text-xs font-medium text-foreground/70">
        {label}
        {required && <span aria-hidden="true" className="text-destructive"> *</span>}
      </label>
      <div className="relative">
        {icon && (
          <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3.5 text-muted-foreground/60">
            {icon}
          </div>
        )}
        {cloneElement(children as ReactElement<Record<string, unknown>>, {
          'aria-required': required ? true : undefined,
          'aria-invalid': error ? true : undefined,
          'aria-describedby': errorId,
          className: `${children.props.className || ''} ${icon ? 'ps-10' : ''}`
        })}
      </div>
      {error && (
        <p id={errorId} role="alert" className="mt-1.5 text-xs text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}
