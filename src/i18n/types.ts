export type Locale = "zh" | "en";

export const LOCALES: Locale[] = ["zh", "en"];
export const DEFAULT_LOCALE: Locale = "zh";

/** 该语言的 HTML lang 属性 */
export const HTML_LANG: Record<Locale, string> = {
  zh: "zh-CN",
  en: "en",
};

/** 前缀：中文站挂在根，英文站挂 /en */
export const LOCALE_PREFIX: Record<Locale, string> = {
  zh: "",
  en: "/en",
};

/** 给站内路径加语言前缀。`localePath("en", "/blogs")` → `/en/blogs` */
export function localePath(locale: Locale, path: string): string {
  if (!path.startsWith("/")) return path;
  const prefix = LOCALE_PREFIX[locale];
  if (!prefix) return path;
  return path === "/" ? prefix : `${prefix}${path}`;
}

/** 从路径推断语言（仅用于客户端兜底） */
export function localeFromPath(pathname: string): Locale {
  return pathname === "/en" || pathname.startsWith("/en/") ? "en" : "zh";
}

/** 两种语言各自的社交账号 —— 英文站用另一个 X 账号 */
export const SOCIAL_BY_LOCALE: Record<Locale, { twitter: string; linkedin: string }> = {
  zh: { twitter: "https://x.com/0xkillcoin", linkedin: "https://x.com/0xkillcoin" },
  en: { twitter: "https://x.com/kky2t", linkedin: "https://x.com/kky2t" },
};
