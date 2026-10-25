import type { Locale } from "@/i18n/types";

/**
 * 站点数据（标题、描述、社交链接、联系区块文案）。
 * 按语言各存一份；组件里通过 getSiteConfig(locale) 取。
 *
 * 注意区分：
 *  - 这里的是「站点身份」级文案（会被 metadata / OG 卡片用到）
 *  - 界面上的按钮、提示语在 src/i18n/dictionaries.ts
 */

export type SiteConfig = {
  title: string;
  description: { long: string; short: string };
  keywords: string[];
  author: string;
  role: string;
  email: string;
  site: string;
  github: { stars: number; link: string; username: string; repo: string };
  contact: {
    titleLines: [string, string];
    cardTitle: string;
    descriptionPrefix: string;
    descriptionSuffix: string;
    formNote: string;
  };
  ogImg: string;
  social: { twitter: string; linkedin: string; github: string };
};

const SITE = "https://321.market";
const GITHUB_USER = "iiiiiiiiiiiiiKK";
const GITHUB = `https://github.com/${GITHUB_USER}`;

function build(locale: Locale): SiteConfig {
  if (locale === "en") {
    return {
      title: "Adam | Independent maker drifting through trading markets",
      description: {
        long: "Adam's personal site: finance and quant, cross-border e-commerce growth, full-stack engineering and AI agent tooling. Things I've built, and things I'm still poking at.",
        short:
          "Adam's personal site — finance and quant, cross-border e-commerce, full-stack engineering and indie products.",
      },
      keywords: [
        "Adam",
        "portfolio",
        "full-stack developer",
        "quant trading",
        "cross-border e-commerce",
        "AI agent",
        "TypeScript",
        "React",
        "Next.js",
        "Cloudflare",
        "Python",
        "indie hacker",
      ],
      author: "Adam",
      role: "Independent maker drifting through trading markets",
      email: "changyuansex@gmail.com",
      site: SITE,
      github: { stars: 5280, link: GITHUB, username: GITHUB_USER, repo: "" },
      contact: {
        titleLines: ["Let's talk", "about something real"],
        cardTitle: "Get in touch",
        descriptionPrefix: "Email me at",
        descriptionSuffix: ", or leave a note below.",
        formNote:
          "Sending opens your own mail client — nothing passes through a third-party service.",
      },
      ogImg: `${SITE}/assets/seo/og-image.png`,
      social: { twitter: "https://x.com/kky2t", linkedin: "https://x.com/kky2t", github: GITHUB },
    };
  }

  return {
    title: "Adam | 扫地僧 · 游离在交易市场的独立创作者",
    description: {
      long: "Adam（扫地僧）的个人站点：金融与量化、跨境电商增长、全栈开发与 AI Agent 工具。这里是我做过的东西，也是我还在折腾的东西。",
      short: "Adam（扫地僧）的个人站点 — 金融与量化、跨境电商、全栈开发与独立产品。",
    },
    keywords: [
      "Adam",
      "扫地僧",
      "portfolio",
      "full-stack developer",
      "quant trading",
      "cross-border e-commerce",
      "AI agent",
      "TypeScript",
      "React",
      "Next.js",
      "Cloudflare",
      "Python",
      "独立开发者",
    ],
    author: "Adam",
    role: "扫地僧 · 游离在交易市场的独立创作者",
    email: "changyuansex@gmail.com",
    site: SITE,
    github: { stars: 5280, link: GITHUB, username: GITHUB_USER, repo: "" },
    contact: {
      titleLines: ["找我聊点", "正经事"],
      cardTitle: "联系我",
      descriptionPrefix: "直接发邮件到",
      descriptionSuffix: "，或者在下面留个话。",
      formNote: "点击发送会调用你自己的邮件客户端，内容不经过任何第三方服务。",
    },
    ogImg: `${SITE}/assets/seo/og-image.png`,
    social: { twitter: "https://x.com/0xkillcoin", linkedin: "https://x.com/0xkillcoin", github: GITHUB },
  };
}

const cache: Partial<Record<Locale, SiteConfig>> = {};

export function getSiteConfig(locale: Locale): SiteConfig {
  if (!cache[locale]) cache[locale] = build(locale);
  return cache[locale]!;
}

/** 兼容旧引用：默认中文配置。新代码请用 getSiteConfig(locale)。 */
export const config = getSiteConfig("zh");
