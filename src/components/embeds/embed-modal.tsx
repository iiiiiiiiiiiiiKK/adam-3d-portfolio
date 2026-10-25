"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "motion/react";
import { ArrowUpRight, Loader2, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useI18n } from "@/i18n/context";

/**
 * Full-screen embed modal: wraps an external site (arcade / chat room) in an
 * iframe.
 *
 * Why iframe instead of vendoring their code:
 *  - Both are full applications (a Construct 2 runtime, and a WebTorrent +
 *    WebRTC client). Copying them in means pasting their build output into our
 *    repo, and every upstream upgrade breaks.
 *  - An iframe isolates their storage, permissions and scripts, so our CSP
 *    stays clean.
 * The cost is cross-origin opacity — so this component is only a container
 * with a fallback "open in a new window" link, never a controller.
 */
type EmbedModalProps = {
  open: boolean;
  onClose: () => void;
  /** Modal title */
  title: string;
  /** One-line subtitle */
  subtitle?: string;
  /** iframe URL */
  src: string;
  /** "Open in new window" target (defaults to src) */
  externalHref?: string;
  /** iframe allow attribute */
  allow?: string;
  /** Status-dot accent */
  accent?: "lime" | "cyan" | "amber";
};

const ACCENT_CLASS = {
  lime: "bg-lime-400 shadow-[0_0_8px_rgba(163,230,53,0.7)]",
  cyan: "bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.7)]",
  amber: "bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.7)]",
};

export function EmbedModal({
  open,
  onClose,
  title,
  subtitle,
  src,
  externalHref,
  allow = "camera;microphone;display-capture;fullscreen;clipboard-write;autoplay",
  accent = "lime",
}: EmbedModalProps) {
  const [loaded, setLoaded] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);
  const { t } = useI18n();

  // Portal can only mount client-side; `document` doesn't exist during SSR.
  React.useEffect(() => setMounted(true), []);

  // Reset the loading state so reopening shows the skeleton again.
  React.useEffect(() => {
    if (!open) setLoaded(false);
  }, [open]);

  // ESC closes; body scroll is locked while open.
  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22 }}
          className="fixed inset-0 z-[2000] flex items-center justify-center p-3 md:p-6"
          role="dialog"
          aria-modal="true"
          aria-label={title}
        >
          {/* Backdrop: click to close */}
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.97, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: 8 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className={cn(
              "relative flex h-[88vh] w-full max-w-[1400px] flex-col overflow-hidden",
              "rounded-xl border border-white/10 bg-[#0a0b12] shadow-2xl"
            )}
          >
            {/* Title bar */}
            <div className="flex shrink-0 items-center justify-between gap-3 border-b border-white/10 px-4 py-3">
              <div className="flex min-w-0 items-center gap-3">
                <span
                  className={cn("h-2 w-2 shrink-0 rounded-full", ACCENT_CLASS[accent])}
                  aria-hidden="true"
                />
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-white/90">{title}</p>
                  {subtitle && (
                    <p className="truncate text-[11px] text-white/40">{subtitle}</p>
                  )}
                </div>
              </div>

              <div className="flex shrink-0 items-center gap-1.5">
                <a
                  href={externalHref || src}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 rounded-md px-2.5 py-1.5 text-[11px] text-white/50 transition-colors hover:bg-white/5 hover:text-white/80"
                >
                  {t.misc.embedNewWindow}
                  <ArrowUpRight className="h-3 w-3" />
                </a>
                <button
                  onClick={onClose}
                  aria-label={t.nav.close}
                  className="rounded-md p-1.5 text-white/50 transition-colors hover:bg-white/10 hover:text-white"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="relative flex-1 bg-[#05060b]">
              {!loaded && (
                <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 text-white/40">
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <p className="text-xs">{t.misc.embedLoading}</p>
                </div>
              )}
              <iframe
                src={src}
                title={title}
                allow={allow}
                onLoad={() => setLoaded(true)}
                className="h-full w-full border-0"
                referrerPolicy="no-referrer"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
