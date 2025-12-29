import { NextResponse, type NextRequest } from "next/server";
import Negotiator from "accept-language";
import {
  LANGUAGES,
  DEFAULT_LOCALE,
  cookieName,
  isValidLocale,
  type Locale,
} from "./i18n.config";

// Initialize negotiator with supported languages
Negotiator.languages([...LANGUAGES]);

/**
 * Get the preferred locale from the request
 * Priority: URL > Cookie > Accept-Language > Default
 */
function getPreferredLocale(request: NextRequest): Locale {
  // Check cookie first
  const cookieLocale = request.cookies.get(cookieName)?.value;
  if (cookieLocale && isValidLocale(cookieLocale)) {
    return cookieLocale;
  }

  // Check Accept-Language header
  const acceptLang = request.headers.get("Accept-Language");
  if (acceptLang) {
    const detected = Negotiator.get(acceptLang);
    if (detected && isValidLocale(detected)) {
      return detected;
    }
  }

  return DEFAULT_LOCALE;
}

export function middleware(request: NextRequest): NextResponse | undefined {
  const { pathname } = request.nextUrl;

  // Check if the pathname has a locale prefix
  const pathnameLocale = LANGUAGES.find(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  // If pathname starts with default locale, redirect to remove it
  if (
    pathname.startsWith(`/${DEFAULT_LOCALE}/`) ||
    pathname === `/${DEFAULT_LOCALE}`
  ) {
    const newPathname = pathname.replace(
      `/${DEFAULT_LOCALE}`,
      pathname === `/${DEFAULT_LOCALE}` ? "/" : ""
    );
    const response = NextResponse.redirect(
      new URL(newPathname || "/", request.url)
    );

    // Set locale cookie
    response.cookies.set(cookieName, DEFAULT_LOCALE, {
      maxAge: 365 * 24 * 60 * 60,
      path: "/",
      sameSite: "lax",
    });

    return response;
  }

  // If pathname has a non-default locale, set cookie and continue
  if (pathnameLocale && pathnameLocale !== DEFAULT_LOCALE) {
    const response = NextResponse.next();
    response.cookies.set(cookieName, pathnameLocale, {
      maxAge: 365 * 24 * 60 * 60,
      path: "/",
      sameSite: "lax",
    });
    return response;
  }

  // If pathname doesn't have a locale, determine locale and rewrite
  if (!pathnameLocale) {
    const preferredLocale = getPreferredLocale(request);

    // For default locale, rewrite internally without redirect
    if (preferredLocale === DEFAULT_LOCALE) {
      const response = NextResponse.rewrite(
        new URL(`/${DEFAULT_LOCALE}${pathname}`, request.url)
      );
      response.cookies.set(cookieName, DEFAULT_LOCALE, {
        maxAge: 365 * 24 * 60 * 60,
        path: "/",
        sameSite: "lax",
      });
      return response;
    }

    // For non-default locale, redirect to include locale in URL
    const response = NextResponse.redirect(
      new URL(`/${preferredLocale}${pathname}`, request.url)
    );
    response.cookies.set(cookieName, preferredLocale, {
      maxAge: 365 * 24 * 60 * 60,
      path: "/",
      sameSite: "lax",
    });
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Skip all internal paths (_next, api, static files)
    "/((?!api|_next/static|_next/image|favicon.ico|images|icon|static|.*\\..*).*)",
  ],
};
