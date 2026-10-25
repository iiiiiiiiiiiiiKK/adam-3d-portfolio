"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Pause, Play } from "lucide-react";
import { usePerfProfile } from "@/hooks/use-perf-profile";
import { useI18n } from "@/i18n/context";

const memes = [
  {
    name: "confused-travolta",
    alt: "John Travolta looking around an empty room, confused about where everyone went.",
    caption: {
      zh: "他自己也找不到这个页面。",
      en: "Even he can't find this page.",
    },
  },
  {
    name: "homer-disappearing",
    alt: "Homer Simpson slowly disappearing into a hedge.",
    caption: {
      zh: "本页消失的现场录像。",
      en: "Footage of this page disappearing.",
    },
  },
  {
    name: "confused-math",
    alt: "A confused woman trying to make sense of floating math equations.",
    caption: {
      zh: "算过了，答案还是 404。",
      en: "Did the math. The answer is still 404.",
    },
  },
  {
    name: "napoleon-waiting",
    alt: "Napoleon Dynamite sitting on some steps, waiting impatiently.",
    caption: {
      zh: "再等它也不会出现。",
      en: "Waiting longer won't bring it back.",
    },
  },
] as const;

export default function NotFoundMeme() {
  const { reducedMotion, lowEnd } = usePerfProfile();
  const { locale } = useI18n();
  const [paused, setPaused] = useState(false);
  const [meme, setMeme] = useState<(typeof memes)[number] | null>(null);
  const allowAnimation = !reducedMotion && !lowEnd;
  const playing = allowAnimation && !paused;

  useEffect(() => {
    // Pick after hydration so server and client markup agree on the first render.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMeme(memes[Math.floor(Math.random() * memes.length)]);
  }, []);

  return (
    <figure className="overflow-hidden rounded-2xl border border-border bg-muted/40">
      <div className="relative aspect-[2/1] w-full bg-black" aria-busy={!meme}>
        {meme && (
          <Image
            src={`/assets/404/${meme.name}${playing ? "" : "-still"}.gif`}
            alt={meme.alt}
            fill
            unoptimized
            className="object-contain"
          />
        )}
      </div>
      <figcaption className="flex min-h-14 items-center justify-between gap-3 px-4 py-2 text-left">
        <span className="text-sm text-muted-foreground">
          {meme?.caption[locale] ?? (locale === "en" ? "Looking for this page…" : "正在找这个页面…")}
        </span>
        {meme && allowAnimation && (
          <button
            type="button"
            onClick={() => setPaused((value) => !value)}
            aria-label={
              playing
                ? locale === "en" ? "Pause" : "暂停"
                : locale === "en" ? "Play" : "播放"
            }
            className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            {playing
              ? <Pause className="h-4 w-4" aria-hidden="true" />
              : <Play className="h-4 w-4" aria-hidden="true" />}
          </button>
        )}
      </figcaption>
    </figure>
  );
}
