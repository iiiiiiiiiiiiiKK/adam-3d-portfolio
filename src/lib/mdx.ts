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
  locale: Locale;
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

function readMDXFile(filePath: string, locale: Locale): Omit<BlogPost, "slug"> {
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
  return { metadata: result.data, content, locale };
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

/**
 * 列出文章。
 * - locale = "zh"：只返回中文
 * - locale = "en"：优先用英文正文；还没翻译的条目回退中文正文，
 *   这样列表页不会出现空条目
 */
export function getBlogPosts(locale: Locale = "zh"): BlogPost[] {
  const zhDir = getBlogsDirectory("zh");
  const zhFiles = fs.readdirSync(zhDir).filter((file) => path.extname(file) === ".mdx");

  if (locale === "zh") {
    return zhFiles.map((file) => ({
      ...readMDXFile(path.join(zhDir, file), "zh"),
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
    if (enPath) return { ...readMDXFile(enPath, "en"), slug };
    return { ...readMDXFile(path.join(zhDir, file), "zh"), slug };
  });
}

export function getBlogPost(slug: string, locale: Locale = "zh"): BlogPost | null {
  if (!/^[a-zA-Z0-9][a-zA-Z0-9_-]*$/.test(slug)) return null;

  const candidates: { path: string; locale: Locale }[] = [];
  if (locale === "en") {
    candidates.push({ path: path.join(getBlogsDirectory("en"), `${slug}.mdx`), locale: "en" });
  }
  candidates.push({ path: path.join(getBlogsDirectory("zh"), `${slug}.mdx`), locale: "zh" });

  for (const candidate of candidates) {
    try {
      return { ...readMDXFile(candidate.path, candidate.locale), slug };
    } catch (error) {
      if (error instanceof Error && "code" in error && error.code === "ENOENT") continue;
      throw error;
    }
  }
  return null;
}
