import type { Locale } from "@/i18n/types";

/**
 * 阅读时长估算 —— 列表页与详情页必须用同一套口径。
 *
 * 之前列表页按 `wordCount / 400`、英文详情页按 `wordCount / 200`，
 * 同一篇文章在两处显示不同分钟数。
 *
 * 中日韩文本按「字」计，拉丁文本按「词」计：
 *   中文 ≈ 400 字/分钟
 *   英文 ≈ 220 词/分钟
 */

const CJK_RE = /[\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff\u3040-\u30ff]/g;

export const WORDS_PER_MINUTE: Record<Locale, number> = {
  zh: 400,
  en: 220,
};

/**
 * 估算阅读分钟数。
 *
 * @param text  文章正文（Markdown 原文即可，不需要先渲染）
 * @param locale 决定按字还是按词计算
 */
export function estimateReadMinutes(text: string, locale: Locale): number {
  const body = text.trim();
  if (!body) return 1;

  const cjkChars = (body.match(CJK_RE) || []).length;
  // 去掉 CJK 后再按空白切拉丁词，避免中英混排重复计数
  const latinWords = body
    .replace(CJK_RE, " ")
    .split(/\s+/)
    .filter(Boolean).length;

  // 中文按字数，英文按词数；混排时取两者耗时之和
  const zhMinutes = cjkChars / WORDS_PER_MINUTE.zh;
  const enMinutes = latinWords / WORDS_PER_MINUTE.en;

  return Math.max(1, Math.ceil(zhMinutes + enMinutes));
}

/** 统计用于排序/展示的「词量」：中文字数 + 英文词数 */
export function countReadingUnits(text: string): number {
  const body = text.trim();
  if (!body) return 0;
  const cjkChars = (body.match(CJK_RE) || []).length;
  const latinWords = body
    .replace(CJK_RE, " ")
    .split(/\s+/)
    .filter(Boolean).length;
  return cjkChars + latinWords;
}
