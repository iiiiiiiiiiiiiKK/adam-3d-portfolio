import type { Metadata } from "next";
import "../../globals.css";
import { RootShell, buildMetadata } from "@/components/root-shell";

export const metadata: Metadata = buildMetadata("en", "/");

export default function EnLayout({ children }: { children: React.ReactNode }) {
  return <RootShell locale="en">{children}</RootShell>;
}
