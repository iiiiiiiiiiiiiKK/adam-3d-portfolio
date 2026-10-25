import type { Metadata } from "next";
import Script from "next/script";
import { GoogleAnalytics } from "@next/third-parties/google";

import SiteFrame from "@/components/site-frame";
import GitHubStars from "@/components/header/github-stars";
import { Providers } from "@/components/providers";
import { I18nProvider } from "@/i18n/context";
import { getSiteConfig } from "@/data/config";
import { HTML_LANG, LOCALES, type Locale } from "@/i18n/types";
import { UMAMI_SRC } from "@/lib/umami";
import { fontClassNames } from "@/lib/fonts";

/** 站位：让两种语言的 <html> 壳完全一致，只有 lang 与 metadata 不同。 */
export function buildMetadata(locale: Locale, path = ""): Metadata {
  const config = getSiteConfig(locale);
  const canonical = `${config.site}${locale === "en" ? "/en" : ""}${path}`;

  return {
    metadataBase: new URL(config.site),
    title: config.title,
    description: config.description.long,
    keywords: config.keywords,
    authors: [{ name: config.author }],
    alternates: {
      canonical,
      languages: Object.fromEntries(
        LOCALES.map((l) => [
          l === "zh" ? "zh-CN" : "en",
          `${config.site}${l === "en" ? "/en" : ""}${path}`,
        ])
      ),
    },
    openGraph: {
      title: config.title,
      description: config.description.short,
      url: canonical,
      locale: locale === "en" ? "en_US" : "zh_CN",
      images: [
        {
          url: config.ogImg,
          width: 1200,
          height: 630,
          alt: "Portfolio preview",
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: config.title,
      description: config.description.short,
      images: [config.ogImg],
    },
    robots: { index: true, follow: true },
  };
}

export function RootShell({
  locale,
  children,
}: {
  locale: Locale;
  children: React.ReactNode;
}) {
  return (
    <html lang={HTML_LANG[locale]} className={fontClassNames} suppressHydrationWarning>
      <head>
        {process.env.UMAMI_SITE_ID && (
          <Script
            defer
            src={UMAMI_SRC}
            data-website-id={process.env.UMAMI_SITE_ID}
          />
        )}
      </head>
      <body>
        <I18nProvider locale={locale}>
          <Providers>
            <SiteFrame locale={locale} githubStars={<GitHubStars className="mr-4" />}>
              {children}
            </SiteFrame>
          </Providers>
        </I18nProvider>
        {process.env.NEXT_PUBLIC_GA_ID && (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
        )}
      </body>
    </html>
  );
}
