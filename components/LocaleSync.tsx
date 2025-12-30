"use client";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { changeLanguage } from "@/app/[locale]/i18n/client";
import { isValidLocale } from "@/i18n.config";

export default function LocaleSync() {
  const pathname = usePathname();

  useEffect(() => {
    if (!pathname) return;
    const parts = pathname.split("/").filter(Boolean);
    const maybeLocale = parts[0];
    if (maybeLocale && isValidLocale(maybeLocale)) {
      // ensure client i18n instance uses same locale as route
      changeLanguage(maybeLocale as any).catch(() => {});
    }
  }, [pathname]);

  return null;
}
