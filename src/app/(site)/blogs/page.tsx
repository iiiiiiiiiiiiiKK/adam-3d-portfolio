import React from "react";
import type { Metadata } from "next";
import { getBlogPosts, sortPostsByDateDesc } from "@/lib/mdx";
import { countReadingUnits } from "@/lib/read-time";
import { getDictionary } from "@/i18n/dictionaries";
import { getSiteConfig } from "@/data/config";
import BlogListClient from "./blog-list-client";

const locale = "zh" as const;
const t = getDictionary(locale);
const site = getSiteConfig(locale);

export const metadata: Metadata = {
  title: `${t.blog.metaTitle} | ${site.author}`,
  description: t.blog.metaDescription,
  alternates: {
    canonical: `${site.site}/blogs/`,
    languages: {
      "zh-CN": `${site.site}/blogs/`,
      en: `${site.site}/en/blogs/`,
    },
  },
};

export default function BlogPage() {
  const posts = sortPostsByDateDesc(getBlogPosts(locale)).map((post) => ({
    slug: post.slug,
    metadata: post.metadata,
    readingUnits: countReadingUnits(post.content),
    translated: post.translated,
  }));

  return <BlogListClient posts={posts} locale={locale} />;
}
