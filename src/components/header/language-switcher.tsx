"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";
import { Languages } from "lucide-react";
import { cn } from "@/lib/utils";
import { useI18n } from "@/i18n/context";
import type { Locale } from "@/i18n/types";

/**
 * 中／英切换器。
 *
 * 视觉上是一个两段式胶囊，当前语言高亮 —— 比单个 "EN/中" 按钮更能表达
 * 「这是双语站，两种都完整」。语言是路由决定的（/ 与 /en），所以切换
 * 就是一个普通链接，不是客户端状态。
 */
export function LanguageSwitcher({ className }: { className?: string }) {
  const { locale, t } = useI18n();
  const pathname = usePathname() || "/";

  // 计算两种语言各自的等价路径
  const clean = pathname.replace(/\/+$/, "") || "/";
  const isEn = clean === "/en" || clean.startsWith("/en/");
  const zhHref = isEn ? (clean.slice(3) || "/") : clean;
  const enHref = isEn ? clean : clean === "/" ? "/en" : `/en${clean}`;

  const options: { key: Locale; href: string; label: string }[] = [
    { key: "zh", href: zhHref, label: "中文" },
    { key: "en", href: enHref, label: "EN" },
  ];

  return (
    <div
      className={cn(
        "relative flex items-center gap-0.5 rounded-full border border-border/60 bg-background/40 p-0.5 backdrop-blur-sm",
        className
      )}
      role="group"
      aria-label={t.langSwitcher.label}
    >
      {options.map((opt) => {
        const active = locale === opt.key;
        return (
          <Link
            key={opt.key}
            href={opt.href}
            hrefLang={opt.key === "zh" ? "zh-CN" : "en"}
            aria-current={active ? "true" : undefined}
            className={cn(
              "relative flex h-7 items-center justify-center rounded-full px-2.5 text-[11px] font-medium transition-colors",
              active
                ? "text-background"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {active && (
              <motion.span
                layoutId="lang-pill"
                className="absolute inset-0 rounded-full bg-foreground"
                transition={{ type: "spring", stiffness: 380, damping: 32 }}
              />
            )}
            <span className="relative z-10 tracking-wide">{opt.label}</span>
          </Link>
        );
      })}
      <Languages className="ml-1 mr-1.5 h-3 w-3 shrink-0 text-muted-foreground/50" aria-hidden />
    </div>
  );
}
