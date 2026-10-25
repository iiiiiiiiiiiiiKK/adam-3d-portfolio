import React, { Suspense } from "react";
import Link from "next/link";
import { getFooterLinks } from "./config";
import { Button } from "../ui/button";
import SocialMediaButtons from "../social/social-media-icons";
import { getSiteConfig } from "@/data/config";
import { getDictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/types";

async function CopyrightYear() {
  const year = new Date().getFullYear();
  return <>{year}</>;
}

export function FooterInner({ locale }: { locale: Locale }) {
  const config = getSiteConfig(locale);
  const t = getDictionary(locale);
  const footerLinks = getFooterLinks(locale);

  return (
    <footer className="flex w-full shrink-0 flex-col items-center gap-2 border-t border-border px-4 py-6 sm:flex-row md:px-6 sm:justify-between">
      <p className="text-xs text-gray-500 dark:text-gray-400">
        {/* 年份单独用 Suspense 包裹，避免静态导出把它冻在构建那一刻 */}
        <Suspense fallback={<>© {config.author}</>}>
          <CopyrightYear />
        </Suspense>{" "}
        {locale === "en" ? (
          <>— {config.author}. All rights reserved.</>
        ) : (
          <>— {config.author}. 保留所有权利。</>
        )}
      </p>
      <SocialMediaButtons locale={locale} />
      <nav className="flex gap-4 sm:gap-6 z-10">
        {footerLinks.map((link, index) => {
          const { title, href } = link;
          return (
            <Link
              className="text-xs underline-offset-4 hover:underline"
              href={href}
              key={`l_${index}`}
            >
              <Button variant={"link"}>{title}</Button>
            </Link>
          );
        })}
      </nav>
    </footer>
  );
}

/** 兼容旧引用：默认中文。新代码请直接用 FooterInner。 */
function Footer() {
  return <FooterInner locale="zh" />;
}

export default Footer;
