"use client";

import { useParams, usePathname, useRouter } from "next/navigation";
import { useCallback, useMemo, useTransition } from "react";
import { Globe, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  languages,
  fallbackLng,
  cookieName,
  type Locale,
  LANGUAGE_NAMES,
} from "@/app/[locale]/i18n/settings";

export function LanguageSwitcher() {
  const pathname = usePathname();
  const params = useParams();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  // Determine current locale from params or pathname
  const currentLocale = useMemo(() => {
    // First check params (most reliable for [locale] routes)
    if (params.locale && languages.includes(params.locale as Locale)) {
      return params.locale as Locale;
    }
    // Check pathname for locale prefix
    const pathLocale = languages.find(
      (loc) => pathname.startsWith(`/${loc}/`) || pathname === `/${loc}`
    );
    return pathLocale || fallbackLng;
  }, [params.locale, pathname]);

  const handleLocaleChange = useCallback(
    (newLocale: Locale) => {
      // Save current scroll position
      const scrollY = window.scrollY;

      // Set locale cookie for persistence (1 year)
      document.cookie = `${cookieName}=${newLocale}; path=/; max-age=${
        365 * 24 * 60 * 60
      }; samesite=lax`;

      // Get path without current locale prefix
      let pathWithoutLocale = pathname;

      // Remove current locale from path if present
      for (const loc of languages) {
        if (pathname.startsWith(`/${loc}/`)) {
          pathWithoutLocale = pathname.slice(loc.length + 1);
          break;
        } else if (pathname === `/${loc}`) {
          pathWithoutLocale = "/";
          break;
        }
      }

      // Build new path
      let newPath: string;
      if (newLocale === fallbackLng) {
        // Default locale: no prefix in URL
        newPath = pathWithoutLocale || "/";
      } else {
        // Non-default locale: add prefix
        newPath = `/${newLocale}${
          pathWithoutLocale === "/" ? "" : pathWithoutLocale
        }`;
      }

      startTransition(() => {
        router.push(newPath, { scroll: false });
        router.refresh();
        // Restore scroll position after navigation
        requestAnimationFrame(() => {
          window.scrollTo(0, scrollY);
        });
      });
    },
    [pathname, router]
  );

  const currentLocaleName = useMemo(
    () => LANGUAGE_NAMES[currentLocale],
    [currentLocale]
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="gap-2"
          disabled={isPending}
        >
          <Globe className="h-4 w-4" />
          <span className="hidden sm:inline">{currentLocaleName}</span>
          <ChevronDown className="h-3 w-3" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" sideOffset={8} className="min-w-32">
        {languages.map((loc) => (
          <DropdownMenuItem
            key={loc}
            onSelect={() => handleLocaleChange(loc)}
            className={`cursor-pointer ${
              currentLocale === loc ? "bg-accent font-medium" : ""
            }`}
          >
            {LANGUAGE_NAMES[loc]}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
