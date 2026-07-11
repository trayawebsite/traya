"use client";

import { useEffect, useMemo, cloneElement, type ReactElement } from "react";
import Image from "next/image";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { makeInquirySchema, type InquiryInput } from "@/lib/validations";
import { Container } from "@/components/ui/container";
import { IconChip } from "@/components/ui/icon-chip";
import { primaryButton } from "@/lib/button-styles";

// The three assurance points beside the illustration   chat, shield, globe.
const POINT_ICONS = [
  <svg
    key="0"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="size-5"
    aria-hidden="true"
  >
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    <path d="M8 9h8" />
    <path d="M8 13h5" />
  </svg>,
  <svg
    key="1"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="size-5"
    aria-hidden="true"
  >
    <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1 1 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
    <path d="m9 12 2 2 4-4" />
  </svg>,
  <svg
    key="2"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="size-5"
    aria-hidden="true"
  >
    <circle cx="12" cy="12" r="10" />
    <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
    <path d="M2 12h20" />
  </svg>,
];

// Shipment isn't on the API schema, so extend locally; it's folded into the
// message before POSTing to /api/inquiry.
type FormValues = InquiryInput & { shipment?: string };

// Pre-footer enquiry section (site-wide). Light ivory band + lifted white form
// card → strong contrast against the dark footer below. Vermilion only on the
// submit + accents. Wired to /api/inquiry (validation → email → Sheets → rate
// limit all already behind it). Real <label>s, not placeholder-as-label.
export function EnquirySection() {
  const t = useTranslations("Enquiry");
  const tv = useTranslations("Validation");
  const shipmentModes = t("shipmentModes").split(" · ");
  const formSchema = useMemo(
    () => makeInquirySchema(tv).extend({ shipment: z.string().optional() }),
    [tv],
  );
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    setFocus,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(formSchema) });

  // Prefill the product field from a "?product=…" enquire link (so the buyer
  // doesn't retype it and we keep per-product lead attribution).
  useEffect(() => {
    const product = new URLSearchParams(window.location.search).get("product");
    if (product) setValue("productName", product);
  }, [setValue]);

  // Move focus to the first invalid field on a failed submit (a11y   with
  // noValidate the native jump is off).
  function onInvalid(errs: Record<string, unknown>) {
    const first = Object.keys(errs)[0];
    if (first) setFocus(first as keyof FormValues);
  }

  async function onSubmit(values: FormValues) {
    const { shipment, ...rest } = values;
    const message = shipment
      ? `${t("shipmentPrefix")} ${shipment}\n\n${rest.message}`
      : rest.message;
    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...rest, message }),
      });
      const json = await res.json().catch(() => ({}));
      if (res.ok && json.ok) {
        toast.success(t("success"));
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

  return (
    <section
      id="enquiry"
      className="border-t border-traya-border bg-traya-surface"
    >
      <Container className="py-section">
        <div className="grid items-start gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-20">
          {/* Left   invitation: short heading, assurance points, illustration */}
          <div className="lg:pt-4">
            <p className="section-label">{t("eyebrow")}</p>
            <h2 className="mt-4 text-balance font-display text-display-sm text-foreground lg:text-display">
              {t("heading")}
            </h2>
            <p className="mt-4 max-w-sm leading-relaxed text-muted-foreground">
              {t("sub")}
            </p>

            {/* Assurance points in an even row, illustration at full panel width below */}
            <ul className="mt-8 grid grid-cols-3 gap-3">
              {(["trust1", "trust2", "trust3"] as const).map((k, i) => (
                <li key={k} className="flex items-center gap-2.5">
                  <IconChip className="size-9 [&>svg]:size-4">
                    {POINT_ICONS[i]}
                  </IconChip>
                  <div>
                    <p className="text-xs font-medium text-foreground">
                      {t(k)}
                    </p>
                    <span
                      aria-hidden
                      className="mt-1 block h-0.5 w-6 bg-traya-saffron/70"
                    />
                  </div>
                </li>
              ))}
            </ul>
            <Image
              src="/enquiry/conversation.webp"
              alt=""
              aria-hidden
              width={1000}
              height={667}
              sizes="(min-width: 1024px) 42vw, 90vw"
              className="mt-8 hidden h-auto w-full sm:block"
            />
          </div>

          {/* Right   form card */}
          <form
            onSubmit={handleSubmit(onSubmit, onInvalid)}
            noValidate
            className="rounded-2xl border border-traya-border bg-card p-6 shadow-md sm:p-8"
          >
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
                id="phone"
                label={t("phone")}
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
                id="company"
                label={t("company")}
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
                id="productName"
                label={t("product")}
                error={errors.productName?.message}
              >
                <input
                  id="productName"
                  type="text"
                  {...register("productName")}
                  className={inputCls}
                />
              </Field>
              <Field id="shipment" label={t("shipment")}>
                <select
                  id="shipment"
                  defaultValue=""
                  {...register("shipment")}
                  className={inputCls}
                >
                  <option value="" disabled>
                    {t("shipmentPlaceholder")}
                  </option>
                  {shipmentModes.map((m) => (
                    <option key={m} value={m}>
                      {m}
                    </option>
                  ))}
                </select>
              </Field>
              <Field
                id="message"
                label={t("requirements")}
                required
                error={errors.message?.message}
                full
              >
                <textarea
                  id="message"
                  rows={4}
                  placeholder={t("requirementsPlaceholder")}
                  {...register("message")}
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
                {isSubmitting ? t("sending") : t("submit")}
              </button>
            </div>
          </form>
        </div>
      </Container>
    </section>
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
      {/* Inject a11y wiring: required + invalid state announced; error is a live region. */}
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
