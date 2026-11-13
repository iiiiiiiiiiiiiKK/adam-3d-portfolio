const fs = require('fs');
const path = require('path');

const ROOT = process.cwd();
const OUT = path.join(ROOT, 'out');
const issues = [];

function walk(dir, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else out.push(p);
  }
  return out;
}

const files = walk(OUT);
const html = files.filter((p) => p.endsWith('.html'));
if (!html.length) issues.push('out/ 中没有 HTML 产物');

// sitemap 中的 URL 必须能映射到静态 index.html 或文件
const sitemapPath = path.join(OUT, 'sitemap.xml');
if (fs.existsSync(sitemapPath)) {
  const xml = fs.readFileSync(sitemapPath, 'utf8');
  for (const m of xml.matchAll(/<loc>([^<]+)<\/loc>/g)) {
    const u = new URL(m[1]);
    const pathname = u.pathname.replace(/^\/+/, '');
    const rel = pathname.endsWith('/') ? path.join(pathname, 'index.html') : pathname;
    if (!fs.existsSync(path.join(OUT, rel))) {
      issues.push(`sitemap URL 缺少静态文件: ${m[1]}`);
    }
  }
} else {
  issues.push('out/sitemap.xml 不存在');
}

// 导出后必须保留 CNAME
if (!fs.existsSync(path.join(OUT, 'CNAME'))) issues.push('out/CNAME 不存在');

// 关键双语首页与列表页
for (const p of ['index.html', 'en/index.html', 'blogs/index.html', 'en/blogs/index.html']) {
  if (!fs.existsSync(path.join(OUT, p))) issues.push(`缺少关键页面: out/${p}`);
}

console.log(`静态 HTML: ${html.length}`);
if (issues.length) {
  console.error(`❌ 导出审计失败：${issues.length} 项`);
  issues.slice(0, 50).forEach((x) => console.error(`  - ${x}`));
  process.exit(1);
}
console.log('✅ 静态导出审计通过');
