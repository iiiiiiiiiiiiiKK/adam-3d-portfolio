#!/usr/bin/env node
/**
 * 内容与资源审计（只读）。
 *
 * 用途：在 CI 的 build 之前跑，拦住那些「构建能过但线上会坏」的问题：
 *   1. 中英文文章 slug 是否一一对应
 *   2. MDX 里引用的图片是否真的存在于 public/
 *   3. frontmatter 必填字段是否齐全
 *   4. 硬编码的 /assets 路径是否都能落地
 *
 * 退出码：0 = 通过；1 = 有阻塞问题
 */

const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const ZH_DIR = path.join(ROOT, "src/content/blogs");
const EN_DIR = path.join(ROOT, "src/content/blogs-en");
const PUBLIC_DIR = path.join(ROOT, "public");

const errors = [];
const warnings = [];

const rel = (p) => path.relative(ROOT, p);

function listMdx(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""))
    .sort();
}

const zhSlugs = listMdx(ZH_DIR);
const enSlugs = listMdx(EN_DIR);

// ---------- 1. slug 对齐 ----------
const missingEn = zhSlugs.filter((s) => !enSlugs.includes(s));
const orphanEn = enSlugs.filter((s) => !zhSlugs.includes(s));

if (missingEn.length) {
  errors.push(
    `缺少英文译文 ${missingEn.length} 篇（英文站会回退中文正文）：\n` +
      missingEn.map((s) => `    - ${s}`).join("\n"),
  );
}
if (orphanEn.length) {
  warnings.push(
    `存在 ${orphanEn.length} 个无中文对应的英文文件（不会生成路由）：\n` +
      orphanEn.map((s) => `    - ${s}`).join("\n"),
  );
}

// ---------- 2. frontmatter 必填 ----------
const REQUIRED = ["title", "publishedAt", "summary"];
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

function checkFrontmatter(dir, slugs, label) {
  for (const slug of slugs) {
    const file = path.join(dir, `${slug}.mdx`);
    const raw = fs.readFileSync(file, "utf8");
    const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
    if (!m) {
      errors.push(`${label}/${slug}.mdx 缺少 frontmatter`);
      continue;
    }
    const block = m[1];
    for (const key of REQUIRED) {
      if (!new RegExp(`^${key}\\s*:`, "m").test(block)) {
        errors.push(`${label}/${slug}.mdx 缺少 frontmatter 字段: ${key}`);
      }
    }
    const date = block.match(/^publishedAt\s*:\s*"?([^"\n]+)"?/m);
    if (date && !DATE_RE.test(date[1].trim())) {
      errors.push(`${label}/${slug}.mdx publishedAt 格式不是 YYYY-MM-DD: ${date[1]}`);
    }
  }
}

checkFrontmatter(ZH_DIR, zhSlugs, "blogs");
checkFrontmatter(EN_DIR, enSlugs, "blogs-en");

// ---------- 3. MDX 图片存在性 ----------
const missingImages = new Set();

function checkImages(dir, slugs, label) {
  for (const slug of slugs) {
    const raw = fs.readFileSync(path.join(dir, `${slug}.mdx`), "utf8");
    for (const m of raw.matchAll(/!\[[^\]]*\]\(([^)\s]+)/g)) {
      const url = m[1];
      if (!url.startsWith("/")) continue; // 外链不检查
      const clean = url.split("?")[0].split("#")[0];
      const abs = path.join(PUBLIC_DIR, clean);
      if (!fs.existsSync(abs)) missingImages.add(`${label}/${slug} -> ${clean}`);
    }
  }
}

checkImages(ZH_DIR, zhSlugs, "blogs");
checkImages(EN_DIR, enSlugs, "blogs-en");

if (missingImages.size) {
  errors.push(
    `MDX 引用了 ${missingImages.size} 个不存在的图片：\n` +
      [...missingImages].slice(0, 30).map((s) => `    - ${s}`).join("\n") +
      (missingImages.size > 30 ? `\n    … 其余 ${missingImages.size - 30} 条` : ""),
  );
}

// ---------- 4. 源码里硬编码的 /assets 引用 ----------
function walk(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(p, out);
    else if (/\.(ts|tsx)$/.test(entry.name)) out.push(p);
  }
  return out;
}

const missingAssetRefs = new Set();
for (const file of walk(path.join(ROOT, "src"))) {
  const src = fs.readFileSync(file, "utf8");
  for (const m of src.matchAll(/["'`](\/assets\/[^"'`\s]+)["'`]/g)) {
    const url = m[1].split("?")[0];
    if (url.includes("${")) continue; // 动态拼接，跳过
    if (!fs.existsSync(path.join(PUBLIC_DIR, url))) {
      missingAssetRefs.add(`${rel(file)} -> ${url}`);
    }
  }
}

if (missingAssetRefs.size) {
  warnings.push(
    `源码引用了 ${missingAssetRefs.size} 个不存在的 public 资源：\n` +
      [...missingAssetRefs].slice(0, 30).map((s) => `    - ${s}`).join("\n"),
  );
}

// ---------- 5. CNAME ----------
const cnamePath = path.join(PUBLIC_DIR, "CNAME");
if (!fs.existsSync(cnamePath)) {
  warnings.push("public/CNAME 不存在：GitHub Pages 自定义域名会失效");
} else {
  const cname = fs.readFileSync(cnamePath, "utf8").trim();
  if (!/^[a-z0-9.-]+$/i.test(cname)) {
    errors.push(`public/CNAME 内容可疑: ${JSON.stringify(cname)}`);
  }
}

// ---------- 输出 ----------
console.log(`中文文章: ${zhSlugs.length}`);
console.log(`英文文章: ${enSlugs.length}`);

if (warnings.length) {
  console.log("\n⚠️  警告:");
  warnings.forEach((w) => console.log(`  ${w}`));
}

if (errors.length) {
  console.log("\n❌ 错误:");
  errors.forEach((e) => console.log(`  ${e}`));
  console.log(`\n审计失败：${errors.length} 项错误`);
  process.exit(1);
}

console.log("\n✅ 内容审计通过");
