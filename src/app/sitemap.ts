import type { MetadataRoute } from "next";
import { config } from "@/data/config";
import { getBlogPosts, sortPostsByDateDesc } from "@/lib/mdx";

// Required for `output: "export"` — the post list is fixed at build time.
export const dynamic = "force-static";

// 站点用 trailingSlash: true，带斜杠才是 200（不带会 301）。sitemap 里必须写最终地址。
const withSlash = (path: string) => (path.endsWith("/") ? path : `${path}/`);

export default function sitemap(): MetadataRoute.Sitemap {
  const zhPosts = sortPostsByDateDesc(getBlogPosts("zh")).map((post) => ({
    url: withSlash(`${config.site}/blogs/${post.slug}`),
    lastModified: new Date(post.metadata.publishedAt),
    changeFrequency: "yearly" as const,
    priority: 0.5,
    alternates: {
      languages: {
        "zh-CN": withSlash(`${config.site}/blogs/${post.slug}`),
        en: withSlash(`${config.site}/en/blogs/${post.slug}`),
      },
    },
  }));

  // 只收录真正有译文的英文文章。缺译的 /en/blogs/<slug>/ 页面仍然存在
  // （供读者跳转），但 metadata 设了 noindex，也不应出现在 sitemap 里。
  const enPosts = sortPostsByDateDesc(getBlogPosts("en"))
    .filter((post) => post.translated)
    .map((post) => ({
      url: withSlash(`${config.site}/en/blogs/${post.slug}`),
      lastModified: new Date(post.metadata.publishedAt),
      changeFrequency: "yearly" as const,
      priority: 0.4,
      alternates: {
        languages: {
          "zh-CN": withSlash(`${config.site}/blogs/${post.slug}`),
          en: withSlash(`${config.site}/en/blogs/${post.slug}`),
        },
      },
    }));

  return [
    {
      url: withSlash(config.site),
      changeFrequency: "monthly",
      priority: 1,
      alternates: {
        languages: {
          "zh-CN": withSlash(config.site),
          en: withSlash(`${config.site}/en`),
        },
      },
    },
    {
      url: withSlash(`${config.site}/en`),
      changeFrequency: "monthly",
      priority: 0.9,
      alternates: {
        languages: {
          "zh-CN": withSlash(config.site),
          en: withSlash(`${config.site}/en`),
        },
      },
    },
    {
      url: withSlash(`${config.site}/blogs`),
      changeFrequency: "weekly",
      priority: 0.7,
      alternates: {
        languages: {
          "zh-CN": withSlash(`${config.site}/blogs`),
          en: withSlash(`${config.site}/en/blogs`),
        },
      },
    },
    {
      url: withSlash(`${config.site}/en/blogs`),
      changeFrequency: "weekly",
      priority: 0.6,
      alternates: {
        languages: {
          "zh-CN": withSlash(`${config.site}/blogs`),
          en: withSlash(`${config.site}/en/blogs`),
        },
      },
    },
    ...zhPosts,
    ...enPosts,
  ];
}
