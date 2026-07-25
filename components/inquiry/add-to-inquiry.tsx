"use client";

import { useInquiry } from "@/lib/inquiry-context";
import { useTranslations } from "next-intl";

export function AddToInquiryButton({
  slug,
  name,
  category,
  className = "",
}: {
  slug: string;
  name: string;
  category: string;
  className?: string;
}) {
  const { add, remove, has } = useInquiry();
  const t = useTranslations("inquiry");
  const added = has(slug);

  return (
    <button
      type="button"
      onClick={() => (added ? remove(slug) : add({ slug, name, category }))}
      className={className}
    >
      {added ? t("removeFromList") : t("addToList")}
    </button>
  );
}
