import type { Locale } from "@/i18n/types";
import { localeFromPath } from "@/i18n/types";

/**
 * 站点路径判定 —— 所有「按路由决定行为」的地方统一走这里。
 *
 * 之前 Particles / AppOverlays 各自写死 `pathname.startsWith("/blogs/")`
 * 和 `pathname === "/"`，漏掉了 `/en/...` 这一整套英文路由，导致
 * 中英文站行为不对称（英文文章页仍挂粒子背景、英文首页没有 Overlay）。
 */

/** 去掉结尾多余斜杠，根路径保留 "/" */
export function normalizePath(pathname: string): string {
  if (!pathname) return "/";
  const trimmed = pathname.replace(/\/+$/, "");
  return trimmed === "" ? "/" : trimmed;
}

/** 去掉语言前缀后的「逻辑路径」。`/en/blogs/x` → `/blogs/x` */
export function stripLocale(pathname: string): string {
  const p = normalizePath(pathname);
  if (p === "/en") return "/";
  if (p.startsWith("/en/")) return p.slice(3);
  return p;
}

/** 首页判定：`/` 与 `/en` 都是首页 */
export function isHomePath(pathname: string): boolean {
  return stripLocale(pathname) === "/";
}

/** 博客列表页：`/blogs` 与 `/en/blogs` */
export function isBlogListPath(pathname: string): boolean {
  return stripLocale(pathname) === "/blogs";
}

/** 博客文章页：`/blogs/<slug>` 与 `/en/blogs/<slug>`（不含列表页本身） */
export function isBlogPostPath(pathname: string): boolean {
  const p = stripLocale(pathname);
  return p.startsWith("/blogs/") && p !== "/blogs";
}

/** 组件演示路由（不套站点外壳） */
export function isBarePath(pathname: string): boolean {
  return normalizePath(pathname).startsWith("/components");
}

/**
 * 计算同一页面在另一种语言下的等价路径。
 * 支持 query / hash 之外的纯路径；分页与筛选参数由调用方自行拼回。
 */
export function alternateLocalePath(pathname: string, targetLocale: Locale): string {
  const logical = stripLocale(pathname);
  if (targetLocale === "en") {
    return logical === "/" ? "/en" : `/en${logical}`;
  }
  return logical;
}

export { localeFromPath };
