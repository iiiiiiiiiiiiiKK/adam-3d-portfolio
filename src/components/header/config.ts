import { Link } from "@/types";
import type { Locale } from "@/i18n/types";
import { getDictionary } from "@/i18n/dictionaries";
import { localePath } from "@/i18n/types";

/**
 * 导航链接。标题按语言取，href 自动加语言前缀。
 * 新增语言时不需要改这里 —— 只要 dictionaries 里有对应 key。
 */
export function getLinks(locale: Locale): Link[] {
  const t = getDictionary(locale);
  return [
    {
      title: t.nav.home,
      href: localePath(locale, "/"),
      thumbnail: "/assets/nav-link-previews/landing.png",
    },
    {
      title: t.nav.skills,
      href: localePath(locale, "/#skills"),
      thumbnail: "/assets/nav-link-previews/skills.png",
    },
    {
      title: t.nav.experience,
      href: localePath(locale, "/#experience"),
      thumbnail: "/assets/nav-link-previews/landing.png",
    },
    {
      title: t.nav.projects,
      href: localePath(locale, "/#projects"),
      thumbnail: "/assets/nav-link-previews/projects.png",
    },
    {
      title: t.nav.blog,
      href: localePath(locale, "/blogs"),
      thumbnail: "/assets/nav-link-previews/blog.png",
    },
    {
      title: t.nav.contact,
      href: localePath(locale, "/#contact"),
      thumbnail: "/assets/nav-link-previews/contact.png",
    },
  ];
}

/** 兼容旧引用：默认中文。 */
const links = getLinks("zh");
export { links };
