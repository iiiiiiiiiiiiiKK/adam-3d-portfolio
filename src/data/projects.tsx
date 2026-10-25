import { Button } from "@/components/ui/button";
import { TypographyH3, TypographyP } from "@/components/ui/typography";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";
import type { Locale } from "@/i18n/types";

const BASE_PATH = "/assets/projects-screenshots";

// Renders a brand SVG from /public as a monochrome glyph that inherits the
// surrounding text color (the skill dock styles every icon via currentColor),
// so full-color marks like Mistral flatten to match the rest of the set.
const MaskIcon = ({ src, title }: { src: string; title?: string }) => (
  <span
    role="img"
    aria-label={title}
    className="block bg-current"
    style={{
      width: "1em",
      height: "1em",
      WebkitMaskImage: `url(${src})`,
      maskImage: `url(${src})`,
      WebkitMaskRepeat: "no-repeat",
      maskRepeat: "no-repeat",
      WebkitMaskPosition: "center",
      maskPosition: "center",
      WebkitMaskSize: "contain",
      maskSize: "contain",
    }}
  />
);

const ProjectsLinks = ({
  live,
  repo,
  locale,
}: {
  live?: string;
  repo?: string;
  locale: Locale;
}) => {
  const visit = locale === "en" ? "Visit" : "Visit Website";
  return (
    <div className="flex flex-col md:flex-row items-center justify-start gap-3 my-3 mb-8">
      {live && live !== "#" && (
        <Link
          className="font-mono underline flex gap-2"
          rel="noopener"
          target="_new"
          href={live}
        >
          <Button variant={"default"} size={"sm"}>
            {visit}
            <ArrowUpRight className="ml-3 w-5 h-5" />
          </Button>
        </Link>
      )}
      {repo && repo !== "#" && (
        <Link
          className="font-mono underline flex gap-2"
          rel="noopener"
          target="_new"
          href={repo}
        >
          <Button variant={"default"} size={"sm"}>
            Github
            <ArrowUpRight className="ml-3 w-5 h-5" />
          </Button>
        </Link>
      )}
    </div>
  );
};

export type Skill = {
  title: string;
  bg: string;
  fg: string;
  icon: ReactNode;
};
// Brand chips sourced from thesvg CLI mono SVGs in /public/assets/logos,
// rendered via MaskIcon so each one inherits the dock's currentColor.
const brand = (title: string, file: string): Skill => ({
  title,
  bg: "black",
  fg: "white",
  icon: <MaskIcon src={`/assets/logos/${file}`} title={title} />,
});

const textMark = (title: string, label: string, size = "text-xs"): Skill => ({
  title,
  bg: "black",
  fg: "white",
  icon: <span className={`${size} font-bold`}>{label}</span>,
});

const PROJECT_SKILLS = {
  js: brand("JavaScript", "javascript-mono.svg"),
  ts: brand("TypeScript", "typescript-mono.svg"),
  react: brand("React.js", "react-mono.svg"),
  next: brand("Next.js", "nextdotjs-mono.svg"),
  node: brand("Node.js", "nodedotjs-mono.svg"),
  python: brand("Python", "python-mono.svg"),
  postgres: brand("PostgreSQL", "postgresql-mono.svg"),
  redis: brand("Redis / BullMQ", "redis-mono.svg"),
  docker: brand("Docker", "docker-mono.svg"),
  cloudflare: brand("Cloudflare", "cloudflare-mono.svg"),
  tailwind: brand("Tailwind", "tailwind-css-mono.svg"),
  trpc: brand("tRPC", "trpc-mono.svg"),
  drizzle: brand("Drizzle ORM", "drizzle-mono.svg"),
  honey: brand("Hono", "hono-mono.svg"),
  supabase: brand("Supabase", "supabase-mono.svg"),
  vercel: brand("Vercel", "vercel-mono.svg"),
  motion: brand("Motion", "motion.svg"),
  gsap: brand("GSAP", "gsap-mono.svg"),
  zustand: textMark("Zustand", "Zu"),
  vite: textMark("Vite", "Vite"),
  pwa: textMark("PWA", "PWA"),
  timescale: textMark("TimescaleDB", "TSDB"),
  telegram: textMark("Telegram Bot", "TG", "text-base"),
  ffmpeg: textMark("FFmpeg", "FFmpeg"),
  tauri: textMark("Tauri", "Tauri"),
  cli: textMark("CLI", "CLI"),
  sdk: textMark("SDK", "SDK"),
  mcp: textMark("MCP", "MCP"),
  dsh: textMark("DeepSeek Harness", "dsh"),
  staticSite: textMark("Static HTML", "HTML"),
  vanilla: textMark("Vanilla JS", "JS"),
  ws: textMark("WebSocket", "WS"),
  recharts: textMark("Recharts", "Chart"),
  canvas: textMark("Canvas 2D", "Canvas"),
  playwright: textMark("Playwright", "PW"),
  localFirst: textMark("Local-first", "Local"),
  css3: textMark("CSS3", "CSS"),
  ocr: textMark("OCR scanning", "OCR"),
};

export type Project = {
  id: string;
  category: string;
  title: string;
  src: string;
  screenshots: string[];
  skills: { frontend: Skill[]; backend: Skill[] };
  content: React.ReactNode | any;
  github?: string;
  live: string;
};

/** 每个项目的骨架（与语言无关的部分）：截图、技术栈、链接。 */
const SKELETONS: Omit<Project, "category" | "title" | "content">[] = [
  {
    id: "tradecat",
    src: `${BASE_PATH}/tradecat/landing.png`,
    screenshots: [],
    skills: {
      frontend: [PROJECT_SKILLS.python, PROJECT_SKILLS.telegram],
      backend: [
        PROJECT_SKILLS.postgres,
        PROJECT_SKILLS.timescale,
        PROJECT_SKILLS.redis,
        PROJECT_SKILLS.docker,
      ],
    },
    github: "https://github.com/iiiiiiiiiiiiiKK/tradecat",
    live: "https://x.com/tradecat_ai",
  },
  {
    id: "fullyhedged",
    src: `${BASE_PATH}/fullyhedged/landing.png`,
    screenshots: [],
    skills: {
      frontend: [PROJECT_SKILLS.vanilla, PROJECT_SKILLS.canvas, PROJECT_SKILLS.css3],
      backend: [PROJECT_SKILLS.ws, PROJECT_SKILLS.ocr],
    },
    github: "https://github.com/iiiiiiiiiiiKK/Fully-Hedged",
    live: "https://fully-hedged.vercel.app",
  },
  {
    id: "lifeledger",
    src: `${BASE_PATH}/lifeledger/landing.png`,
    screenshots: [],
    skills: {
      frontend: [
        PROJECT_SKILLS.react,
        PROJECT_SKILLS.ts,
        PROJECT_SKILLS.vite,
        PROJECT_SKILLS.recharts,
      ],
      backend: [PROJECT_SKILLS.localFirst, PROJECT_SKILLS.pwa],
    },
    github: "https://github.com/iiiiiiiiiiiKK/life-ledger",
    live: "https://321.market/life-ledger/",
  },
  {
    id: "baokuan",
    src: `${BASE_PATH}/baokuan/landing.png`,
    screenshots: [],
    skills: {
      frontend: [PROJECT_SKILLS.react, PROJECT_SKILLS.ts, PROJECT_SKILLS.canvas],
      backend: [PROJECT_SKILLS.staticSite],
    },
    github: "https://github.com/iiiiiiiiiiiKK/baokuan-poster",
    live: "https://321.market/baokuan-poster/",
  },
  {
    id: "photostudio",
    src: `${BASE_PATH}/photostudio/landing.png`,
    screenshots: [],
    skills: {
      frontend: [PROJECT_SKILLS.react, PROJECT_SKILLS.ts, PROJECT_SKILLS.canvas],
      backend: [PROJECT_SKILLS.node, PROJECT_SKILLS.playwright],
    },
    github: "https://github.com/iiiiiiiiiiiKK/open-source-photo-studio",
    live: "https://321.market/open-source-photo-studio/",
  },
  {
    id: "absurd",
    src: `${BASE_PATH}/absurd/landing.png`,
    screenshots: [],
    skills: {
      frontend: [PROJECT_SKILLS.react, PROJECT_SKILLS.ts],
      backend: [PROJECT_SKILLS.staticSite],
    },
    github: "https://github.com/iiiiiiiiiiiiiKK/absurd-startup-lab",
    live: "https://321.market/absurd-startup-lab/",
  },
];

type Copy = {
  category: string;
  title: string;
  lead: string;
  body: string;
  h3a: string;
  pa: string;
  h3b: string;
  pb: string;
};

const COPY: Record<Locale, Record<string, Copy>> = {
  zh: {
    tradecat: {
      category: "量化数据平台",
      title: "交易猫 TradeCat",
      lead: "加密货币量化交易数据平台 —— 实时采集、38 个技术指标、Telegram 信号推送。",
      body: "全市场行情持续入库：600+ 币种、约 3.7 亿条 K 线沉淀在 TimescaleDB 里，指标计算与信号判定跑在同一套时序管道上，边写边算。",
      h3a: "数据规模",
      pa: "615+ 交易对、3.7 亿条 K 线、38 个指标全量计算。冷热分层存储：时序表按 chunk 切分并配置压缩策略，历史扫描和实时写入互不阻塞。",
      h3b: "信号链路",
      pb: "采集 → 指标 → 策略判定 → Telegram Bot 推送，整条链路异步解耦，策略侧可热插拔新的指标组合而不必回填历史。",
    },
    fullyhedged: {
      category: "交易终端",
      title: "@oAdam TERMINAL",
      lead: "给自己造的交易舱：双所行情、动态风险敞口、强平预警，一屏看完。",
      body: "一个纯前端的加密货币实时监控与策略模拟终端。Binance / OKX 双所切换，70+ 币种 WebSocket 毫秒级推送，多空仓位独立与合并计算。",
      h3a: "为什么要自己做",
      pa: "交易所自带的仓位页面不会告诉你「再跌多少就爆」，也不会把净 Delta 和强平距离放在一起看。这个终端只解决一件事：把「危险还有多远」变成一个随时可读的数字。",
      h3b: "几个自己会用的细节",
      pb: "OCR 识别截图里的仓位数据，省掉手抄均价和数量；战术模拟器实时推演加仓后的均价与强平价变化；策略矩阵自动标注三级支撑与三级阻力；三套主题（暗黑 / 明亮 / 像素）随时切换。",
    },
    lifeledger: {
      category: "本地优先工具",
      title: "人生账本 Life Ledger",
      lead: "把每天的时间当账记：时间资产、时间负债、时间净值、时间现金流。",
      body: "一个记账工具，不是待办清单。待办记「我要做什么」，它记「我实际把时间花在哪、值不值、耗不耗神」，然后把这笔投入转成四张报表。",
      h3a: "口径自己定",
      pa: "休息、娱乐、家庭陪伴默认是中性，系统不会替你判定成负债 —— 只有你亲手把某个分类标为「负债」，它才计入负债。另加两条辅助指标：注意力成本（Σ 时长 × 精力消耗 ÷ 3）与长期目标投入。",
      h3b: "数据不出浏览器",
      pb: "本地优先，无账号、无后端、无埋点。所有数字只来自你亲手写下的记录，存在自己的浏览器里。",
    },
    baokuan: {
      category: "内容工具",
      title: "爆款配图",
      lead: "一句话变成配图 —— 中文文字排版工作台，预览即导出。",
      body: "写完一段话，不用再开设计软件调字距、找配色、对齐基线。10 套差异化模板，Canvas 单一渲染源，屏幕上看到什么，导出的 PNG 就是什么。",
      h3a: "单一渲染源",
      pa: "预览和导出走同一段 Canvas 绘制代码，不存在「预览好看、导出错位」—— 这类工具最常见的翻车点直接被结构性地消掉了。",
      h3b: "为中文排版做的取舍",
      pb: "中文字重、行高、标点挤压和西文完全不是一套规则。模板里把这几项分别当成独立参数处理，而不是指望浏览器默认表现。",
    },
    photostudio: {
      category: "开发者工具",
      title: "开源项目照相馆",
      lead: "输入仓库地址，自动产出中文介绍、亮点摘要和一张能发出去的展示图。",
      body: "开源项目最难的一步往往不是写代码，是「怎么跟别人说清楚这是什么」。给它一个 GitHub 仓库或官网地址，它会真的打开页面、截真图、读内容，再套进模板出图。",
      h3a: "真截图，不是拼贴",
      pa: "用 Playwright 实际渲染目标站点再截图，六套模板 × 三种比例，出来的图里是项目真实的样子，而不是占位框。",
      h3b: "一键导出",
      pb: "生成结果直接导出 PNG，可以贴进 README、社交媒体、或产品 Hunt 页面，不用再过一遍设计。",
    },
    absurd: {
      category: "娱乐实验",
      title: "离谱创业模拟器",
      lead: "下一个改变世界的项目，可能很荒唐。",
      body: "7200+ 组合的荒诞创业提案生成器：随机撞出一个你从没想过、但仔细想想好像真能做的点子。",
      h3a: "不需要 API Key",
      pa: "全部组合在本地生成，点开就能玩，不登录、不填 Key、不发请求。断网也能一直摇。",
      h3b: "能带走",
      pb: "看中的点子可以导出成海报、Markdown 或 JSON —— 拿去发朋友圈，或者真的开工。",
    },
  },
  en: {
    tradecat: {
      category: "Quant data platform",
      title: "TradeCat",
      lead: "A crypto quant data platform: live ingestion, 38 technical indicators, Telegram signal delivery.",
      body: "Full-market candles keep flowing in — 600+ symbols and roughly 370M candles sit in TimescaleDB, with indicator computation and signal evaluation running on the same time-series pipeline, writing and computing as it goes.",
      h3a: "Scale",
      pa: "615+ pairs, 370M candles, 38 indicators computed across the board. Hot/cold tiered storage: time-series tables are chunked with compression policies so historical scans and live writes never block each other.",
      h3b: "Signal pipeline",
      pb: "Ingest → indicators → strategy evaluation → Telegram bot, fully decoupled and async. The strategy side can hot-swap new indicator combinations without backfilling history.",
    },
    fullyhedged: {
      category: "Trading terminal",
      title: "@oAdam TERMINAL",
      lead: "A cockpit I built for myself: two exchanges, live exposure, liquidation warnings — one screen.",
      body: "A purely client-side crypto monitoring and strategy-simulation terminal. Switch between Binance and OKX, 70+ symbols over WebSocket at millisecond latency, long and short positions computed independently or combined.",
      h3a: "Why build my own",
      pa: "An exchange's position page won't tell you how much further price can fall before you're wiped out, and it won't put net delta next to liquidation distance. This terminal solves exactly one thing: turning \"how far away is danger\" into a number you can read at any moment.",
      h3b: "Details I actually use",
      pb: "OCR reads position data straight from a screenshot, so no more copying entry prices by hand; a tactical simulator projects how average price and liquidation price move after adding to a position; the strategy matrix marks three levels of support and resistance automatically; three themes (dark / light / pixel) switch on demand.",
    },
    lifeledger: {
      category: "Local-first tool",
      title: "Life Ledger",
      lead: "Book every day as an account: time assets, time liabilities, time net worth, time cash flow.",
      body: "A bookkeeping tool, not a to-do list. A to-do list records what you intend to do; this records where your time actually went, whether it was worth it, and how much it drained you — then turns that spend into four statements.",
      h3a: "You define the terms",
      pa: "Rest, entertainment and time with family are neutral by default — the system never classifies them as liabilities on your behalf. Only categories you personally mark as liabilities count as such. Two supporting metrics come along: attention cost (Σ duration × energy drain ÷ 3) and long-term goal investment.",
      h3b: "Data never leaves the browser",
      pb: "Local-first: no account, no backend, no tracking. Every number comes from records you wrote yourself, stored in your own browser.",
    },
    baokuan: {
      category: "Content tool",
      title: "Poster Studio",
      lead: "One sentence in, a finished graphic out — a CJK typography workbench you can export from directly.",
      body: "Once the copy is written, you don't need to open a design app to fix tracking, hunt for a palette and align baselines. Ten distinct templates, one Canvas renderer: what you see on screen is exactly what the exported PNG contains.",
      h3a: "Single render source",
      pa: "Preview and export run the same Canvas drawing code, so \"looked great in preview, misaligned on export\" — the most common failure of tools like this — is structurally impossible.",
      h3b: "Trade-offs made for CJK type",
      pb: "Chinese font weights, line heights and punctuation compression follow completely different rules from Latin text. The templates treat each of those as an independent parameter instead of hoping the browser's defaults work out.",
    },
    photostudio: {
      category: "Developer tool",
      title: "Open Source Photo Studio",
      lead: "Paste a repo URL, get an intro, a highlight summary and a share-ready promo image.",
      body: "The hardest part of an open-source project usually isn't writing the code — it's explaining to others what the thing is. Give it a GitHub repo or a project homepage and it genuinely opens the page, takes real screenshots, reads the content, then composes an image from a template.",
      h3a: "Real screenshots, not mockups",
      pa: "Playwright actually renders the target site before capturing, across six templates and three aspect ratios. What ends up in the image is the project as it really looks, not a placeholder box.",
      h3b: "One-click export",
      pb: "Results export straight to PNG — drop them into a README, a social post or a Product Hunt page without another design pass.",
    },
    absurd: {
      category: "Playful experiment",
      title: "Absurd Startup Lab",
      lead: "The next world-changing company might be completely ridiculous.",
      body: "A generator with 7200+ combinations of absurd startup proposals: collide random ideas until something you'd never have considered — but which, on reflection, might actually work — falls out.",
      h3a: "No API key needed",
      pa: "Every combination is generated locally. Open it and play: no login, no key to paste, no requests fired. It keeps rolling with the network unplugged.",
      h3b: "Take it with you",
      pb: "Ideas you like export as a poster, Markdown or JSON — post them, or actually start building.",
    },
  },
};

function buildProject(locale: Locale): Project[] {
  return SKELETONS.map((skeleton) => {
    const c = COPY[locale][skeleton.id];
    return {
      ...skeleton,
      category: c.category,
      title: c.title,
      get content() {
        return (
          <div>
            <TypographyP className="font-mono text-2xl text-center">{c.lead}</TypographyP>
            <TypographyP className="font-mono">{c.body}</TypographyP>
            <ProjectsLinks live={this.live} repo={this.github} locale={locale} />

            <TypographyH3 className="my-4 mt-8">{c.h3a}</TypographyH3>
            <p className="font-mono mb-2">{c.pa}</p>

            <TypographyH3 className="my-4 mt-8">{c.h3b}</TypographyH3>
            <p className="font-mono mb-2">{c.pb}</p>
          </div>
        );
      },
    };
  });
}

const projectsZh = buildProject("zh");
const projectsEn = buildProject("en");

export function getProjects(locale: Locale): Project[] {
  return locale === "en" ? projectsEn : projectsZh;
}

/** 兼容旧引用：默认中文。新代码请用 getProjects(locale)。 */
const projects = projectsZh;
export default projects;
