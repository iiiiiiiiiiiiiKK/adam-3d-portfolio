"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/header/header";
import { FooterInner } from "@/components/footer/footer";
import AppOverlays from "@/components/app-overlays";
import type { Locale } from "@/i18n/types";

/**
 * Wraps the app shell for one locale.
 *
 * The site renders twice (root = Chinese, `/en` = English) through two route
 * groups, each with its own root layout so `<html lang>` is correct. This frame
 * only needs to know which locale it's wrapping.
 */
export default function SiteFrame({
  children,
  githubStars,
  locale = "zh",
}: {
  children: React.ReactNode;
  githubStars?: React.ReactNode;
  locale?: Locale;
}) {
  const pathname = usePathname();
  const bare = pathname?.startsWith("/components") ?? false;

  if (bare) return <>{children}</>;

  return (
    <>
      <Header githubStars={githubStars} />
      {children}
      <FooterInner locale={locale} />
      <AppOverlays />
    </>
  );
}
