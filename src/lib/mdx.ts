import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { z } from "zod";
import type { Locale } from "@/i18n/types";

const metadataSchema = z.object({
  title: z.string().trim().min(1),
  publishedAt: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).refine(
    (value) => {
      const date = new Date(`${value}T00:00:00Z`);
      return !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value;
    },
    "Expected a valid date in YYYY-MM-DD format",
  ),
  summary: z.string().trim().min(1),
  image: z.string().trim().min(1).optional(),
  author: z.string().trim().min(1).optional(),
  tags: z.array(z.string().trim().min(1)).optional(),
});

export type BlogMeta = z.infer<typeof metadataSchema>;

export type BlogPost = {
  metadata: BlogMeta;
  content: string;
  slug: string;
  /** 正文实际语言。英文站缺译时可能回退成 "zh"。 */
  locale: Locale;
  /** 请求的语言是否真的有对应译文（false = 回退到了中文正文）。 */
  translated: boolean;
};

/** 每种语言的正文目录。英文缺失时由调用方回退到中文。 */
function getBlogsDirectory(locale: Locale = "zh") {
  const dir = locale === "en" ? "src/content/blogs-en" : "src/content/blogs";
  return path.join(process.cwd(), dir);
}

/** 从正文抽第一段纯文本，作为英文文章的兜底摘要。 */
function firstParagraph(body: string): string {
  for (const raw of body.split("\n")) {
    const line = raw.trim();
    if (
      !line ||
      line.startsWith("#") ||
      line.startsWith("![") ||
      line.startsWith("|") ||
      line.startsWith("```") ||
      line.startsWith(">") ||
      line.startsWith("- ") ||
      line.startsWith("* ")
    ) {
      continue;
    }
    const clean = line
      .replace(/\*\*(.+?)\*\*/g, "$1")
      .replace(/\*(.+?)\*/g, "$1")
      .replace(/`([^`]*)`/g, "$1")
      .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
      .replace(/\s+/g, " ")
      .trim();
    if (clean.length >= 20) return clean.slice(0, 160);
  }
  return "";
}

function readMDXFile(
  filePath: string,
  locale: Locale,
  translated: boolean,
): Omit<BlogPost, "slug"> {
  const rawContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(rawContent);

  // 英文版允许缺字段回退：summary 缺失时用正文首段
  const normalized = {
    ...data,
    summary: data.summary ?? firstParagraph(content),
  };

  const result = metadataSchema.safeParse(normalized);
  if (!result.success) {
    throw new Error(`Invalid blog frontmatter in ${filePath}: ${result.error.message}`);
  }
  return { metadata: result.data, content, locale, translated };
}

/** 列出某语言下已存在的文章 slug。 */
export function listBlogSlugs(locale: Locale = "zh"): string[] {
  const dir = getBlogsDirectory(locale);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((file) => path.extname(file) === ".mdx")
    .map((file) => path.basename(file, ".mdx"))
    .sort();
}

/** 有对应译文的 slug 集合。用于内容审计与缺译提示。 */
export function translatedSlugs(): Set<string> {
  return new Set(listBlogSlugs("en"));
}

/**
 * 列出文章。
 * - locale = "zh"：只返回中文
 * - locale = "en"：优先用英文正文；还没翻译的条目回退中文正文，
 *   并把 `translated` 标成 false，供页面显示「暂无译文」与 noindex。
 */
export function getBlogPosts(locale: Locale = "zh"): BlogPost[] {
  const zhDir = getBlogsDirectory("zh");
  const zhFiles = fs.readdirSync(zhDir).filter((file) => path.extname(file) === ".mdx");

  if (locale === "zh") {
    return zhFiles.map((file) => ({
      ...readMDXFile(path.join(zhDir, file), "zh", true),
      slug: path.basename(file, ".mdx"),
    }));
  }

  const enDir = getBlogsDirectory("en");
  const enFiles = new Map<string, string>();
  if (fs.existsSync(enDir)) {
    for (const file of fs.readdirSync(enDir)) {
      if (path.extname(file) === ".mdx") {
        enFiles.set(path.basename(file, ".mdx"), path.join(enDir, file));
      }
    }
  }

  return zhFiles.map((file) => {
    const slug = path.basename(file, ".mdx");
    const enPath = enFiles.get(slug);
    if (enPath) return { ...readMDXFile(enPath, "en", true), slug };
    return { ...readMDXFile(path.join(zhDir, file), "zh", false), slug };
  });
}

export function getBlogPost(slug: string, locale: Locale = "zh"): BlogPost | null {
  if (!/^[a-zA-Z0-9][a-zA-Z0-9_-]*$/.test(slug)) return null;

  const candidates: { path: string; locale: Locale; translated: boolean }[] = [];
  if (locale === "en") {
    candidates.push({
      path: path.join(getBlogsDirectory("en"), `${slug}.mdx`),
      locale: "en",
      translated: true,
    });
  }
  candidates.push({
    path: path.join(getBlogsDirectory("zh"), `${slug}.mdx`),
    locale: "zh",
    translated: locale === "zh",
  });

  for (const candidate of candidates) {
    try {
      return {
        ...readMDXFile(candidate.path, candidate.locale, candidate.translated),
        slug,
      };
    } catch (error) {
      if (error instanceof Error && "code" in error && error.code === "ENOENT") continue;
      throw error;
    }
  }
  return null;
}

/**
 * 文章排序：按 publishedAt 倒序（新的在前）。
 * 用时间戳相减而不是 `a < b ? 1 : -1`，保证 comparator 反对称、
 * 同日期时顺序稳定（再按 slug 兜底）。
 */
export function sortPostsByDateDesc<T extends { metadata: { publishedAt: string }; slug: string }>(
  posts: T[],
): T[] {
  return [...posts].sort((a, b) => {
    const delta =
      new Date(b.metadata.publishedAt).getTime() -
      new Date(a.metadata.publishedAt).getTime();
    if (delta !== 0) return delta;
    return a.slug.localeCompare(b.slug);
  });
}
