import type { Metadata } from "next";
import "../globals.css";
import { RootShell, buildMetadata } from "@/components/root-shell";

export const metadata: Metadata = buildMetadata("zh");

export default function ZhLayout({ children }: { children: React.ReactNode }) {
  return <RootShell locale="zh">{children}</RootShell>;
}
