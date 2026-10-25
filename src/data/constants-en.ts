/**
 * 技能与经历的英文文案。
 *
 * 中文原文仍在 src/data/constants.ts（SKILLS / EXPERIENCE / themeDisclaimers），
 * 这里只补英文，键与 SkillNames 一一对应。
 */
import { SkillNames } from "./constants";

export const SKILL_DESCRIPTIONS_EN: Record<SkillNames, string> = {
  [SkillNames.TS]: "Types are the first test suite — nothing runs until it compiles.",
  [SkillNames.REACT]: "Nineteen years in, it's still my most fluent UI language.",
  [SkillNames.NEXTJS]: "App Router finally made full-stack work without switching brains.",
  [SkillNames.JS]: "One language, from quick scripts all the way to full-stack.",
  [SkillNames.NODEJS]: "Ingestion, job queues, CLIs — the ungrateful work lands here.",
  [SkillNames.POSTGRES]: "TimescaleDB for time series, plain tables for everything else.",
  [SkillNames.MONGODB]: "When the schema changes weekly, a document store earns its keep.",
  [SkillNames.TAILWIND]: "Styles live next to the markup, so redesigns touch one file.",
  [SkillNames.DOCKER]: "The cure for \"it worked on my machine.\"",
  [SkillNames.LINUX]: "Everything on a server is, eventually, a few text files.",
  [SkillNames.GIT]: "Sleeping well depends on it.",
  [SkillNames.GITHUB]: "Fifty-some repos, half of them tools I wrote for myself.",
  [SkillNames.EXPRESS]: "Not elegant, but absolutely fast enough.",
  [SkillNames.NGINX]: "Reverse proxy, certs, static files — one box covers a lot.",
  [SkillNames.AWS]: "Gets the job done; the bill reminds me not to leave instances on.",
  [SkillNames.GCP]: "My fallback for batch jobs and anything ML.",
  [SkillNames.VUE]: "The second syntax I keep having to learn when inheriting projects.",
  [SkillNames.HTML]: "Get the semantics right and you skip half the CSS.",
  [SkillNames.CSS]: "Grid and container queries genuinely changed layout work.",
  [SkillNames.PRETTIER]: "Arguments about formatting end here.",
  [SkillNames.NPM]: "Install, publish, ship CLI plugins — all of it.",
  [SkillNames.FIREBASE]: "For prototypes, the backend can wait until tomorrow.",
  [SkillNames.VIM]: "Editing a config on a server; where the escape key is barely matters.",
  [SkillNames.WORDPRESS]: "The most frequent guest among the legacy sites I've taken over.",
};

/** 经历（英文）。结构与 constants.ts 里的 EXPERIENCE 对应。 */
export const EXPERIENCE_EN = [
  {
    id: 1,
    startDate: "2023",
    endDate: "Present",
    title: "Indie developer / Full-stack engineer",
    company: "Self-employed · Indie Hacker",
    description: [
      "One person running the whole chain: deciding what's worth building, picking the stack, ingesting data, writing backend services, building the interface, and keeping it alive in production — nothing outsourced.",
      "I prefer products that can be verified: get the data flowing and the metrics computing first, argue about how it looks later.",
      "TypeScript is the spine. Node handles ingestion and scheduling, Postgres carries ledgers and time series, the front end is uniformly React / Next.js.",
      "My delivery habit is to push operating cost close to zero — if it can be statically hosted, it never gets a server; if it can run on the edge, it never calls home.",
    ],
    skills: [
      SkillNames.TS,
      SkillNames.REACT,
      SkillNames.NEXTJS,
      SkillNames.NODEJS,
      SkillNames.POSTGRES,
      SkillNames.DOCKER,
      SkillNames.LINUX,
    ],
  },
  {
    id: 2,
    startDate: "2022",
    endDate: "Present",
    title: "Quant trading & financial data",
    company: "Self-built research platform",
    description: [
      "Built the market-data and backtesting pipeline from scratch: multi-exchange ingestion, tick and candle storage, indicator computation and signal delivery as one async pipeline.",
      "What I care about is whether the data can be trusted, not how many strategies exist. Time alignment, adjustment conventions and exchange quirks decide whether a backtest is honest.",
      "Risk control lives in the data layer: outlier detection, gap filling, delisted-symbol pruning — all resolved at ingestion time.",
      "Conclusions are stored so they can be reproduced: parameters, data versions and evaluation conventions all leave a trail, so nobody trusts a remembered return figure.",
    ],
    skills: [
      SkillNames.POSTGRES,
      SkillNames.JS,
      SkillNames.NODEJS,
      SkillNames.MONGODB,
      SkillNames.DOCKER,
      SkillNames.LINUX,
    ],
  },
  {
    id: 3,
    startDate: "2021",
    endDate: "Present",
    title: "Cross-border e-commerce & growth",
    company: "Own stores / consulting",
    description: [
      "Sourcing and ad spend across multi-platform store groups: platform back-office data, ad cost and shipping times stitched into one operating dashboard.",
      "The core work is closing the data loop — sourcing from demand signals, pricing from margin models, restocking from turnover days, all landing in the same tables.",
      "Built in-house tooling instead of buying SaaS: order aggregation, inventory alerts and profit calculation written by hand. The subscription savings matter far less than owning the data.",
      "Most of the pain wasn't technical, it was definitions: does a refund count as revenue, is ad spend a cost? Until those agree, every report is wrong.",
    ],
    skills: [
      SkillNames.JS,
      SkillNames.POSTGRES,
      SkillNames.NODEJS,
      SkillNames.DOCKER,
      SkillNames.AWS,
    ],
  },
];

export const THEME_DISCLAIMERS_EN = {
  light: [
    "Warning: light mode emits an entire galaxy worth of photons.",
    "High energy ahead. Find sunglasses before continuing.",
    "Only trained eyes can withstand this brightness.",
    "Are you sure? Your retinas just filed a complaint.",
    "Switching to light mode… good luck out there.",
  ],
  dark: [
    "Welcome back to the dark side. This is home turf.",
    "Dark mode on. Your eyes approve.",
    "Life is bright enough already — let the interface be dark.",
    "Back into the shadows. How is it out there?",
    "Dark mode: the discerning choice.",
  ],
};

export const THEME_TEXT_EN = { light: "Lights on", dark: "Lights off" };
