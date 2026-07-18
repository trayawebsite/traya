"use client";

import {
  useState,
  useEffect,
  cloneElement,
  useMemo,
  type ReactElement,
} from "react";
import { z } from "zod";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { makeQuoteSchema, type QuoteInput } from "@/lib/validations";
import { primaryButton } from "@/lib/button-styles";
import { useHoneypot } from "@/components/ui/honeypot";
import { TestimonialCarousel } from "@/components/ui/testimonial-carousel";
import {
  User,
  Mail,
  Building2,
  Phone,
  MapPin,
  Package,
  MessageSquare,
  Check,
} from "lucide-react";

type Testimonial = {
  quote: string;
  name: string;
  role?: string;
  location?: string;
};

type Purpose = "quote" | "sample";
type FormValues = QuoteInput & { purpose: Purpose };

// Quote / paid-sample request   wired to /api/quote. A purpose toggle switches
// between a price quote and a (chargeable) sample request; the choice is folded
// into the message so the trade desk sees it clearly. Left column carries a
// trust panel (or testimonials when available) so it never looks bare.
export function QuoteForm({
  productName,
  productSlug,
  testimonials = [],
}: {
  productName?: string;
  productSlug?: string;
  testimonials?: Testimonial[];
}) {
  const t = useTranslations("Quote");
  const tv = useTranslations("Validation");
  const schema = useMemo(
    () => makeQuoteSchema(tv).extend({ purpose: z.enum(["quote", "sample"]) }),
    [tv],
  );
  const honeypot = useHoneypot();
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    setFocus,
    setValue,
    control,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      productName: productName || "",
      productSlug: productSlug || "",
      purpose: "quote",
    },
  });

  // Apply "?intent=sample" (preselect sample) and "?product=…" (per-SKU
  // attribution) from category enquire links. Both write into the form via
  // RHF setValue (not React state), so there's no setState-in-effect.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("intent") === "sample") setValue("purpose", "sample");
    const product = params.get("product");
    if (product) setValue("productName", product);
  }, [setValue]);

  const purpose = useWatch({ control, name: "purpose" });
  const isSample = purpose === "sample";
  // Effective product label: the live "productName" form value (the prop by
  // default, or a per-SKU "?product=" applied above) → badge + heading.
  const displayName = useWatch({ control, name: "productName" });

  function onInvalid(errs: Record<string, unknown>) {
    const first = Object.keys(errs)[0];
    if (first) setFocus(first as keyof FormValues);
  }

  async function onSubmit(values: FormValues) {
    const { purpose: p, ...rest } = values;
    // Fold the request type into the message so it reaches the lead email/sheet
    // (the API's quote schema doesn't carry a purpose field).
    const message = `${p === "sample" ? t("messageSample") : t("messageQuote")}\n\n${rest.message}`;
    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...rest, message, website: honeypot.getValue() }),
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

  const hasTestimonials = testimonials.length > 0;

  return (
    <div className="mx-auto grid max-w-5xl items-start gap-12 lg:grid-cols-[minmax(0,1fr)_1.6fr] lg:gap-16">
      {/* Left   social proof if we have it, else a "what to expect" trust panel */}
      <div className="hidden lg:block lg:sticky lg:top-24">
        {hasTestimonials ? (
          <TestimonialCarousel testimonials={testimonials} />
        ) : (
          <QuoteTrust />
        )}
      </div>

      {/* Right   form */}
      <form
        onSubmit={handleSubmit(onSubmit, onInvalid)}
        noValidate
        className="relative max-w-2xl rounded-2xl border border-traya-border bg-card px-5 py-6 shadow-sm sm:px-6 sm:py-8"
      >
        {honeypot.field}
        {displayName && (
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-traya-border bg-traya-surface px-3.5 py-1.5 text-xs font-medium text-foreground/80">
            <Package
              className="size-3.5 text-traya-saffron-lo"
              aria-hidden="true"
            />
            {t("quotingFor")}{" "}
            <span className="font-semibold text-foreground">{displayName}</span>
          </div>
        )}

        {/* Purpose toggle   price quote vs paid sample */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <span className="text-xs font-medium text-foreground/70">
            {t("purposeLabel")}
          </span>
          <div
            role="radiogroup"
            aria-label={t("purposeLabel")}
            className="inline-flex rounded-full border border-traya-border bg-traya-surface p-1 text-sm"
          >
            {(["quote", "sample"] as const).map((p) => (
              <button
                key={p}
                type="button"
                role="radio"
                aria-checked={purpose === p}
                onClick={() => setValue("purpose", p)}
                className={`rounded-full px-4 py-1.5 transition-colors ${
                  purpose === p
                    ? "bg-card font-medium text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {p === "quote" ? t("purposeQuote") : t("purposeSample")}
              </button>
            ))}
          </div>
        </div>

        <h2 className="mt-5 font-display text-display-sm text-foreground">
          {isSample
            ? displayName
              ? t("sampleHeadingFor", { name: displayName })
              : t("sampleHeading")
            : displayName
              ? t("headingFor", { name: displayName })
              : t("heading")}
        </h2>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          {isSample ? t("sampleSub") : t("sub")}
        </p>

        {isSample && (
          <p className="mt-4 flex items-start gap-2 rounded-xl bg-traya-saffron-soft/60 px-4 py-3 text-xs leading-relaxed text-foreground/80">
            <Package
              className="mt-0.5 size-4 shrink-0 text-traya-saffron-lo"
              aria-hidden="true"
            />
            {t("sampleNote")}
          </p>
        )}

        <div className="mt-8 space-y-8">
          {/* Contact Details Group */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-foreground">
              {t("contactDetails")}
            </h3>
            <div className="grid gap-x-5 gap-y-6 sm:grid-cols-2">
              <Field
                id="name"
                label={t("name")}
                icon={<User className="size-4" />}
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
                icon={<Mail className="size-4" />}
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
                icon={<Building2 className="size-4" />}
                error={errors.company?.message}
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
                id="phone"
                label={t("phone")}
                icon={<Phone className="size-4" />}
                error={errors.phone?.message}
              >
                <input
                  id="phone"
                  type="tel"
                  autoComplete="tel"
                  {...register("phone")}
                  className={inputCls}
                />
              </Field>
              <Field
                id="country"
                label={t("country")}
                icon={<MapPin className="size-4" />}
                error={errors.country?.message}
                full
              >
                <input
                  id="country"
                  type="text"
                  autoComplete="country-name"
                  {...register("country")}
                  className={inputCls}
                />
              </Field>
            </div>
          </div>

          {/* Request Details Group */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-foreground">
              {t("requestDetails")}
            </h3>
            <div className="grid gap-x-5 gap-y-6 sm:grid-cols-2">
              <Field
                id="quantity"
                label={isSample ? t("sampleQuantity") : t("quantity")}
                icon={<Package className="size-4" />}
                error={errors.quantity?.message}
                full
              >
                <input
                  id="quantity"
                  type="text"
                  placeholder={
                    isSample
                      ? t("sampleQuantityPlaceholder")
                      : t("quantityPlaceholder")
                  }
                  {...register("quantity")}
                  className={inputCls}
                />
              </Field>
              <input type="hidden" {...register("productName")} />
              <input type="hidden" {...register("productSlug")} />
              <Field
                id="message"
                label={t("message")}
                icon={<MessageSquare className="size-4" />}
                error={errors.message?.message}
                full
              >
                <textarea
                  id="message"
                  rows={4}
                  placeholder={t("messagePlaceholder")}
                  {...register("message")}
                  className={`${inputCls} resize-y`}
                />
              </Field>
            </div>
          </div>
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
            {isSubmitting
              ? t("sending")
              : isSample
                ? t("sampleSubmit")
                : t("submit")}
          </button>
        </div>
      </form>
    </div>
  );
}

// Default left column when there are no testimonials yet   tells the buyer what
// they get and that it's no-obligation, so the section reads as complete.
function QuoteTrust() {
  const t = useTranslations("Quote");
  const includes = ["pricing", "moq", "packaging", "leadTime", "docs"] as const;
  return (
    <div className="rounded-2xl border border-traya-border bg-traya-surface p-6 sm:p-7">
      <p className="section-label">{t("trust.eyebrow")}</p>
      <h3 className="mt-3 font-display text-xl leading-snug text-foreground">
        {t("trust.heading")}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        {t("trust.sub")}
      </p>
      <ul className="mt-6 space-y-3">
        {includes.map((k) => (
          <li
            key={k}
            className="flex items-start gap-3 text-sm leading-relaxed text-foreground/85"
          >
            <Check
              className="mt-0.5 size-4 shrink-0 text-traya-forest"
              aria-hidden="true"
            />
            {t(`trust.${k}`)}
          </li>
        ))}
      </ul>
      <p className="mt-6 border-t border-traya-border pt-4 text-xs leading-relaxed text-muted-foreground">
        {t("trust.note")}
      </p>
    </div>
  );
}

const inputCls =
  "w-full rounded-md border border-traya-border bg-background px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/70 focus-visible:border-traya-red focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-traya-red/30 aria-[invalid=true]:border-destructive transition-colors";

function Field({
  id,
  label,
  required,
  error,
  full,
  icon,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  full?: boolean;
  icon?: ReactElement;
  children: ReactElement<{ className?: string }>;
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
      <div className="relative">
        {icon && (
          <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3.5 text-muted-foreground/60">
            {icon}
          </div>
        )}
        {cloneElement(children as ReactElement<Record<string, unknown>>, {
          "aria-required": required ? true : undefined,
          "aria-invalid": error ? true : undefined,
          "aria-describedby": errorId,
          className: `${children.props.className || ""} ${icon ? "ps-10" : ""}`,
        })}
      </div>
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
