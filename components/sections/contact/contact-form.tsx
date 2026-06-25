'use client';

import {cloneElement, type ReactElement} from 'react';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {useTranslations} from 'next-intl';
import {toast} from 'sonner';
import {contactSchema, type ContactInput} from '@/lib/validations';
import {primaryButton} from '@/lib/button-styles';

// Contact form — wired to /api/contact (validation → email → Sheets → rate
// limit). Uses the same react-hook-form + Zod pattern as EnquirySection.
export function ContactForm() {
  const t = useTranslations('Contact.form');
  const {
    register,
    handleSubmit,
    reset,
    setFocus,
    formState: {errors, isSubmitting}
  } = useForm<ContactInput>({resolver: zodResolver(contactSchema)});

  function onInvalid(errs: Record<string, unknown>) {
    const first = Object.keys(errs)[0];
    if (first) setFocus(first as keyof ContactInput);
  }

  async function onSubmit(values: ContactInput) {
    try {
      const res = await fetch('/api/contact', {
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

  return (
    <form
      onSubmit={handleSubmit(onSubmit, onInvalid)}
      noValidate
      className="rounded-2xl border border-traya-border bg-card p-6 shadow-md sm:p-8"
    >
      <p className="section-label">{t('eyebrow')}</p>
      <h2 className="mt-3 font-display text-display-sm text-foreground">
        {t('heading')}
      </h2>
      <p className="mt-3 leading-relaxed text-muted-foreground">{t('sub')}</p>

      <div className="mt-8 grid gap-x-5 gap-y-6 sm:grid-cols-2">
        <Field id="name" label={t('name')} required error={errors.name?.message}>
          <input id="name" type="text" autoComplete="name" {...register('name')} className={inputCls} />
        </Field>
        <Field id="email" label={t('email')} required error={errors.email?.message}>
          <input id="email" type="email" autoComplete="email" {...register('email')} className={inputCls} />
        </Field>
        <Field id="company" label={t('company')} error={errors.company?.message}>
          <input id="company" type="text" autoComplete="organization" {...register('company')} className={inputCls} />
        </Field>
        <Field id="message" label={t('message')} required error={errors.message?.message} full>
          <textarea
            id="message"
            rows={5}
            placeholder={t('messagePlaceholder')}
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
