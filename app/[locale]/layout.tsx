import "@/css/globals.css";

import { maindescription, maintitle } from "@/data/localeMetadata";
import siteMetadata from "@/data/siteMetadata";
import { dir } from "i18next";
import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import type { ReactElement } from "react";
import { languages, type Locale } from "./i18n/settings";
import { MainLayout } from "@/layouts";
import { Providers } from "@/providers";

export async function generateStaticParams(): Promise<{ locale: string }[]> {
  return languages.map((locale) => ({ locale }));
}

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-space-grotesk",
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const locale = resolvedParams.locale as Locale;

  return {
    metadataBase: new URL(siteMetadata.siteUrl),
    title: {
      default: maintitle[locale] || maintitle.en,
      template: `%s | ${maintitle[locale] || maintitle.en}`,
    },
    description: maindescription[locale] || maindescription.en,
    openGraph: {
      title: maintitle[locale] || maintitle.en,
      description: maindescription[locale] || maindescription.en,
      url: "./",
      siteName: maintitle[locale] || maintitle.en,
      images: [siteMetadata.socialBanner],
      locale,
      type: "website",
    },
    alternates: {
      canonical: "./",
      types: {
        "application/rss+xml": `${siteMetadata.siteUrl}/feed.xml`,
      },
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    twitter: {
      title: maintitle[locale] || maintitle.en,
      description: maindescription[locale] || maindescription.en,
      site: siteMetadata.siteUrl,
      creator: siteMetadata.author,
      card: "summary_large_image",
      images: [siteMetadata.socialBanner],
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}): Promise<ReactElement> {
  const resolvedParams = await params;
  const locale = resolvedParams.locale as Locale;

  return (
    <html
      lang={locale}
      dir={dir(locale)}
      className={`${spaceGrotesk.variable} scroll-smooth`}
      suppressHydrationWarning
    >
      <head>
        <link
          rel="apple-touch-icon"
          sizes="76x76"
          href="/static/favicons/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/static/favicons/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/static/favicons/favicon-16x16.png"
        />
        <link rel="manifest" href="/static/favicons/site.webmanifest" />
        <link
          rel="mask-icon"
          href="/static/favicons/safari-pinned-tab.svg"
          color="#5bbad5"
        />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta
          name="theme-color"
          media="(prefers-color-scheme: light)"
          content="#fff"
        />
        <meta
          name="theme-color"
          media="(prefers-color-scheme: dark)"
          content="#000"
        />
        <link rel="alternate" type="application/rss+xml" href="/feed.xml" />
      </head>
      <body className="min-h-screen bg-background font-sans antialiased">
        <Providers locale={locale}>
          <MainLayout>{children}</MainLayout>
        </Providers>
      </body>
    </html>
  );
}
