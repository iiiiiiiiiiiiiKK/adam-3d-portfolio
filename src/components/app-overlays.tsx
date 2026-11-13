"use client";

import { usePathname } from "next/navigation";
import Particles from "@/components/Particles";
import RemoteCursors from "@/components/realtime/remote-cursors";
import EasterEggs from "@/components/easter-eggs";
import ElasticCursor from "@/components/ui/ElasticCursor";
import RadialMenu from "@/components/radial-menu/index";
import MotionNudge from "@/components/motion-nudge";
import DomainNotice from "@/components/domain-notice";
import { usePerfProfile } from "@/hooks/use-perf-profile";
import { isHomePath } from "@/lib/routes";

export default function AppOverlays() {
  const pathname = usePathname() || "/";
  // `/` 和 `/en` 都是首页 —— 之前只判断 `/`，英文首页缺少
  // RemoteCursors / RadialMenu / MotionNudge，两站行为不对称。
  const isHome = isHomePath(pathname);

  const { particleCount, maxDpr, disableDecorative } = usePerfProfile();

  return (
    <>
      {particleCount > 0 && (
        <Particles
          className="fixed inset-0 -z-10 animate-fade-in"
          quantity={particleCount}
          maxDpr={maxDpr}
        />
      )}
      {isHome && <RemoteCursors />}
      {!disableDecorative && <EasterEggs />}
      {!disableDecorative && <ElasticCursor />}
      {isHome && <RadialMenu />}
      {isHome && <MotionNudge />}
      <DomainNotice />
    </>
  );
}
