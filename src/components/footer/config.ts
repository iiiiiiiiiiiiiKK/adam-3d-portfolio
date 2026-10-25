import type { Locale } from "@/i18n/types";

/**
 * 页脚链接。X 账号按语言切换 —— 中文站 0xkillcoin，英文站 kky2t。
 */
export function getFooterLinks(locale: Locale): { title: string; href: string }[] {
  return [
    {
      title: "GitHub",
      href: "https://github.com/iiiiiiiiiiiiiKK",
    },
    {
      title: "X",
      href: locale === "en" ? "https://x.com/kky2t" : "https://x.com/0xkillcoin",
    },
  ];
}

/** 兼容旧引用：默认中文。 */
const footer = getFooterLinks("zh");
export { footer };
