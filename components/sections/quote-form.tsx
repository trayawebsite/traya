'use client';

import {cloneElement, type ReactElement} from 'react';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {useTranslations} from 'next-intl';
import {toast} from 'sonner';
import {quoteSchema, type QuoteInput} from '@/lib/validations';
import {primaryButton} from '@/lib/button-styles';
import {TestimonialCarousel} from '@/components/ui/testimonial-carousel';
import {User, Mail, Building2, Phone, MapPin, Package, MessageSquare} from 'lucide-react';

type Testimonial = {
  quote: string;
  name: string;
  role?: string;
  location?: string;
};

// Quote request form — wired to /api/quote. Shows animated testimonials
// on the left for social proof. Form width stays consistent.
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
  const {
    register,
    handleSubmit,
    reset,
    setFocus,
    formState: {errors, isSubmitting}
  } = useForm<QuoteInput>({
    resolver: zodResolver(quoteSchema),
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

  const hasTestimonials = testimonials.length > 0;

  return (
    <div className={`mx-auto grid items-start gap-12 ${hasTestimonials ? 'max-w-5xl lg:grid-cols-[minmax(0,1.2fr)_2.5fr] lg:gap-24' : 'max-w-2xl'}`}>
      {/* Left — animated testimonials (hidden on mobile, shrinks on desktop) */}
      {hasTestimonials && (
        <div className="hidden lg:block lg:sticky lg:top-24">
          <TestimonialCarousel testimonials={testimonials} />
        </div>
      )}

      {/* Right — form (consistent width, max constrained) */}
      <form
        onSubmit={handleSubmit(onSubmit, onInvalid)}
        noValidate
        className="max-w-2xl rounded-2xl border border-traya-border bg-card px-5 py-6 shadow-sm sm:px-6 sm:py-8"
      >
        <p className="text-sm font-medium text-traya-red-deep">{t('eyebrow')}</p>
        <h2 className="mt-3 font-display text-display-sm text-foreground">
          {t('heading')}
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
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-muted-foreground/60">
            {icon}
          </div>
        )}
        {cloneElement(children as ReactElement<Record<string, unknown>>, {
          'aria-required': required ? true : undefined,
          'aria-invalid': error ? true : undefined,
          'aria-describedby': errorId,
          className: `${children.props.className || ''} ${icon ? 'pl-10' : ''}`
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
