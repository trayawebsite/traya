"use client";

import { useState, cloneElement, useMemo, type ReactElement } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { makeContactSchema, type ContactInput } from "@/lib/validations";
import { primaryButton } from "@/lib/button-styles";
import { useHoneypot } from "@/components/ui/honeypot";
import { Check } from "lucide-react";

// Contact form   wired to /api/contact (validation → email → Sheets → rate
// limit). Two-column: a left invitation/trust panel + the form, so the section
// reads as considered rather than a lone card. Inline success confirmation.
export function ContactForm() {
  const t = useTranslations("Contact.form");
  const tv = useTranslations("Validation");
  const schema = useMemo(() => makeContactSchema(tv), [tv]);
  const honeypot = useHoneypot();
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    setFocus,
    formState: { errors, isSubmitting },
  } = useForm<ContactInput>({ resolver: zodResolver(schema) });

  function onInvalid(errs: Record<string, unknown>) {
    const first = Object.keys(errs)[0];
    if (first) setFocus(first as keyof ContactInput);
  }

  async function onSubmit(values: ContactInput) {
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, website: honeypot.getValue() }),
      });
      const json = await res.json().catch(() => ({}));
      if (res.ok && json.ok) {
        setSubmitted(true);
        reset();
      } else if (res.status === 429) {
        toast.error(t("rateLimited"));
      } else {
        toast.error(t("error"));
      }
    } catch {
      toast.error(t("error"));
    }
  }

  if (submitted) {
    return (
      <div className="mx-auto max-w-2xl rounded-2xl border border-traya-border bg-card px-6 py-12 text-center shadow-sm sm:px-8">
        <div className="mx-auto mb-5 flex size-14 items-center justify-center rounded-full bg-traya-forest/10 text-traya-forest">
          <Check className="size-7" aria-hidden="true" />
        </div>
        <h3 className="font-display text-display-sm text-foreground">
          {t("successHeading")}
        </h3>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          {t("successBody")}
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto grid max-w-5xl items-start gap-12 lg:grid-cols-[minmax(0,1fr)_1.5fr] lg:gap-16">
      {/* Left   invitation + reassurance */}
      <div className="lg:pt-2">
        <p className="section-label">{t("eyebrow")}</p>
        <h2 className="mt-4 text-balance font-display text-display-sm text-foreground">
          {t("heading")}
        </h2>
        <p className="mt-4 leading-relaxed text-muted-foreground">{t("sub")}</p>
        <ul className="mt-8 space-y-3.5">
          {(["point1", "point2", "point3"] as const).map((k) => (
            <li
              key={k}
              className="flex items-start gap-3 text-sm leading-relaxed text-foreground/80"
            >
              <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-traya-forest/10 text-traya-forest">
                <Check className="size-3" aria-hidden="true" />
              </span>
              {t(k)}
            </li>
          ))}
        </ul>
      </div>

      {/* Right   form card */}
      <form
        onSubmit={handleSubmit(onSubmit, onInvalid)}
        noValidate
        className="relative rounded-2xl border border-traya-border bg-card p-6 shadow-md sm:p-8"
      >
        {honeypot.field}
        <div className="grid gap-x-5 gap-y-6 sm:grid-cols-2">
          <Field
            id="name"
            label={t("name")}
            required
            error={errors.name?.message}
          >
            <input
              id="name"
              type="text"
              autoComplete="name"
              {...register("name")}
              className={inputCls}
            />
          </Field>
          <Field
            id="email"
            label={t("email")}
            required
            error={errors.email?.message}
          >
            <input
              id="email"
              type="email"
              autoComplete="email"
              {...register("email")}
              className={inputCls}
            />
          </Field>
          <Field
            id="company"
            label={t("company")}
            error={errors.company?.message}
            full
          >
            <input
              id="company"
              type="text"
              autoComplete="organization"
              {...register("company")}
              className={inputCls}
            />
          </Field>
          <Field
            id="message"
            label={t("message")}
            required
            error={errors.message?.message}
            full
          >
            <textarea
              id="message"
              rows={5}
              placeholder={t("messagePlaceholder")}
              {...register("message")}
              className={`${inputCls} resize-y`}
            />
          </Field>
        </div>

        <div className="mt-7 flex flex-col-reverse items-stretch gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs leading-relaxed text-muted-foreground">
            {t("reassurance")}
          </p>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`${primaryButton} shrink-0 disabled:cursor-not-allowed disabled:opacity-60`}
          >
            {isSubmitting ? t("sending") : t("submit")}
          </button>
        </div>
      </form>
    </div>
  );
}

const inputCls =
  "w-full rounded-md border border-traya-border bg-background px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/70 focus-visible:border-traya-red focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-traya-red/30 aria-[invalid=true]:border-destructive";

function Field({
  id,
  label,
  required,
  error,
  full,
  children,
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
    <div className={full ? "sm:col-span-2" : undefined}>
      <label
        htmlFor={id}
        className="mb-1.5 block text-xs font-medium text-foreground/70"
      >
        {label}
        {required && (
          <span aria-hidden="true" className="text-destructive">
            {" "}
            *
          </span>
        )}
      </label>
      {cloneElement(children as ReactElement<Record<string, unknown>>, {
        "aria-required": required ? true : undefined,
        "aria-invalid": error ? true : undefined,
        "aria-describedby": errorId,
      })}
      {error && (
        <p
          id={errorId}
          role="alert"
          className="mt-1.5 text-xs text-destructive"
        >
          {error}
        </p>
      )}
    </div>
  );
}
