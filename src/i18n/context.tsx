"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import type { Locale } from "./types";
import { localeFromPath, localePath, SOCIAL_BY_LOCALE } from "./types";
import { getDictionary, type Dictionary } from "./dictionaries";

type I18nValue = {
  locale: Locale;
  t: Dictionary;
  /** 加语言前缀的站内链接 */
  href: (path: string) => string;
  /** 另一种语言的同页链接（用于切换器） */
  altHref: string;
  /** 该语言对应的社交账号 */
  social: { twitter: string; linkedin: string };
};

const I18nContext = React.createContext<I18nValue | null>(null);

/**
 * 把当前路径映射到另一种语言的等价路径。
 *   /            ↔ /en
 *   /blogs/      ↔ /en/blogs/
 *   /blogs/foo/  ↔ /en/blogs/foo/
 */
function toAlternateLocalePath(pathname: string): string {
  const clean = pathname.replace(/\/+$/, "") || "/";
  if (clean === "/en") return "/";
  if (clean.startsWith("/en/")) return clean.slice(3);
  if (clean === "/") return "/en";
  return "/en" + clean;
}

export function I18nProvider({
  locale: forced,
  children,
}: {
  locale: Locale;
  children: React.ReactNode;
}) {
  // 服务端已知语言（来自路由），客户端仅在 /en 之外的边界情况兜底
  const pathname = usePathname();
  const detected = React.useMemo(() => localeFromPath(pathname || "/"), [pathname]);
  const locale = forced ?? detected;

  const value = React.useMemo<I18nValue>(
    () => ({
      locale,
      t: getDictionary(locale),
      href: (path: string) => localePath(locale, path),
      altHref: toAlternateLocalePath(pathname || "/"),
      social: SOCIAL_BY_LOCALE[locale],
    }),
    [locale, pathname]
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

/** 读取当前语言环境。没有 Provider 时安全回退到中文。 */
export function useI18n(): I18nValue {
  const ctx = React.useContext(I18nContext);
  if (ctx) return ctx;
  return {
    locale: "zh",
    t: getDictionary("zh"),
    href: (path: string) => path,
    altHref: "/en",
    social: SOCIAL_BY_LOCALE.zh,
  };
}
