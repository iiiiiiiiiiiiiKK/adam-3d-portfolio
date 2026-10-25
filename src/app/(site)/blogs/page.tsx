import React from "react";
import type { Metadata } from "next";
import { getBlogPosts } from "@/lib/mdx";
import { getDictionary } from "@/i18n/dictionaries";
import { getSiteConfig } from "@/data/config";
import BlogListClient from "./blog-list-client";

const t = getDictionary("zh");

export const metadata: Metadata = {
  title: `${t.blog.metaTitle} | ${getSiteConfig("zh").author}`,
  description: t.blog.metaDescription,
  alternates: {
    canonical: "https://321.market/blogs/",
    languages: { "zh-CN": "https://321.market/blogs/", en: "https://321.market/en/blogs/" },
  },
};

export default function BlogPage() {
  const posts = getBlogPosts("zh")
    .sort((a, b) => {
      if (new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)) {
        return -1;
      }
      return 1;
    })
    .map((post) => ({
      slug: post.slug,
      metadata: post.metadata,
      wordCount: post.content.trim().split(/\s+/).length,
    }));

  return <BlogListClient posts={posts} />;
}
