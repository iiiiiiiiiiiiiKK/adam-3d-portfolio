import type { Locale } from "./types";

/**
 * 全站 UI 文案。新增语言时在这里加一份即可，组件里只引用 key。
 * 注意：这里只放「界面」文字；站点数据（技能 / 经历 / 项目）在 src/data 里
 * 按语言各自维护，博客正文在 src/content/blogs{,-en} 里。
 */
export const dictionaries = {
  zh: {
    /** 语言切换器 */
    langSwitcher: {
      label: "切换语言",
      zh: "中文",
      en: "English",
      /** 切到另一种语言的提示 */
      switchTo: "English",
    },

    nav: {
      home: "Home",
      skills: "Skills",
      experience: "Experience",
      projects: "Projects",
      blog: "Blog",
      contact: "Contact",
      menu: "菜单",
      close: "关闭",
      openMenu: "打开菜单",
      closeMenu: "关闭菜单",
    },

    hero: {
      greeting: "你好，我是",
      nameTooltip: "控制台里留了点东西给你",
      contact: "联系我",
      contactTooltip: "欢迎来信",
      github: "GitHub",
    },

    sections: {
      skills: {
        title: "技术栈",
        descReady: "平时真正在用的东西",
        descLoading: "（提示：按一下键）",
      },
      experience: { title: "经历", desc: "这几年在做什么。" },
      projects: { title: "项目", desc: "自己做的和别人做的。" },
      contact: {
        titleLines: ["找我聊点", "正经事"],
        cardTitle: "联系我",
        descriptionPrefix: "直接发邮件到",
        descriptionSuffix: "，或者在下面留个话。",
        formNote: "点击发送会调用你自己的邮件客户端，内容不经过任何第三方服务。",
      },
    },

    form: {
      name: "称呼",
      namePlaceholder: "你的名字",
      email: "邮箱",
      emailPlaceholder: "you@example.com",
      message: "想聊的事",
      messagePlaceholder: "项目、合作，或者只是打个招呼。",
      send: "发送邮件",
      errors: {
        name: "称呼至少 2 个字符",
        email: "请填一个有效的邮箱地址",
        message: "内容至少 10 个字符",
      },
      toastTitle: "邮件客户端已打开",
      toastDesc: "检查一下内容，然后按发送就行。",
    },

    blog: {
      metaTitle: "开源观察",
      metaDescription:
        "GitHub 上翻到的开源项目，跑过、拆过、还留在机器上用的，写清楚它解决什么问题、谁该用、哪里不行。",
      kicker: "开源观察",
      headlineTop: "挖到好东西，",
      headlineBottom: "就想讲清楚",
      intro:
        "GitHub 上翻到的开源项目，我跑过、拆过、还留在机器上用的，写清楚它解决什么问题、谁该用、哪里不行。",
      count: (total: number, shown: number) => `共 ${total} 篇 · 当前 ${shown} 篇`,
      all: "全部",
      pinned: "置顶",
      readFull: "读全文",
      minutesRead: (n: number) => `${n} 分钟读完`,
      minutes: (n: number) => `${n} 分钟`,
      prev: "上一页",
      next: "下一页",
      empty: "还没有文章，过几天再来。",
      backToList: "返回文章列表",
      writtenBy: "作者",
    },

    notFound: {
      metaTitle: "404 · 页面不存在",
      metaDescription: "这个地址下什么都没有。",
      heading: "页面不存在",
      body: "它可能从未存在，也可能被我自己搬走了。",
      back: "回首页",
    },

    footer: {
      rights: (year: number, author: string) => `© ${year} ${author}. 保留所有权利。`,
    },

    misc: {
      toggleTheme: "切换主题",
      themeLight: "开灯",
      themeDark: "关灯",
      rightClickHint: "在任意位置右键试试",
      keyboardHintIdle: "按一下键帽",
      keyboardHintIdleSub: "悬停、点击，或者直接按字母键",
      arcade: "打开街机厅",
      chat: "打开聊天室",
      arcadeTitle: "街机厅",
      arcadeSubtitle: "60 款开源 H5 小游戏 · 由 chengzuopeng/game-space 提供",
      chatTitle: "公共聊天室",
      chatSubtitle: "P2P 加密直连 · 无账号、无服务器",
      embedNewWindow: "新窗口",
      embedLoading: "正在连接…",
      motionNudgeTitle: "已开启「减少动态效果」",
      motionNudgeBody: "3D 场景和动效都被关掉了。要看完整版本吗？",
      motionNudgeAccept: "打开 3D",
      motionNudgeDecline: "不必了",
    },
  },

  en: {
    langSwitcher: {
      label: "Switch language",
      zh: "中文",
      en: "English",
      switchTo: "中文",
    },

    nav: {
      home: "Home",
      skills: "Skills",
      experience: "Experience",
      projects: "Projects",
      blog: "Writing",
      contact: "Contact",
      menu: "Menu",
      close: "Close",
      openMenu: "Open menu",
      closeMenu: "Close menu",
    },

    hero: {
      greeting: "Hi, I'm",
      nameTooltip: "There's something waiting for you in the console",
      contact: "Get in touch",
      contactTooltip: "Always happy to hear from you",
      github: "GitHub",
    },

    sections: {
      skills: {
        title: "Stack",
        descReady: "What I actually reach for",
        descLoading: "(tap a keycap)",
      },
      experience: { title: "Experience", desc: "What I've been doing these years." },
      projects: { title: "Projects", desc: "Mine, and a few by other people." },
      contact: {
        titleLines: ["Let's talk", "about something real"],
        cardTitle: "Get in touch",
        descriptionPrefix: "Email me at",
        descriptionSuffix: ", or leave a note below.",
        formNote:
          "Sending opens your own mail client — nothing passes through a third-party service.",
      },
    },

    form: {
      name: "Name",
      namePlaceholder: "Your name",
      email: "Email",
      emailPlaceholder: "you@example.com",
      message: "What's on your mind",
      messagePlaceholder: "A project, a collaboration, or just to say hi.",
      send: "Send email",
      errors: {
        name: "Name must be at least 2 characters",
        email: "Please enter a valid email address",
        message: "Message must be at least 10 characters",
      },
      toastTitle: "Mail client opened",
      toastDesc: "Check the draft, then hit send.",
    },

    blog: {
      metaTitle: "Open Source Notes",
      metaDescription:
        "Open-source projects I found on GitHub, actually ran, took apart, and kept on my machine — what they solve, who they're for, and where they fall short.",
      kicker: "Open Source Notes",
      headlineTop: "Found something good,",
      headlineBottom: "want to explain it",
      intro:
        "Open-source projects I found on GitHub, actually ran, took apart, and kept on my machine — what they solve, who they're for, and where they fall short.",
      count: (total: number, shown: number) => `${total} posts · ${shown} shown`,
      all: "All",
      pinned: "Featured",
      readFull: "Read",
      minutesRead: (n: number) => `${n} min read`,
      minutes: (n: number) => `${n} min`,
      prev: "Previous",
      next: "Next",
      empty: "No posts yet. Check back soon.",
      backToList: "Back to all posts",
      writtenBy: "By",
    },

    notFound: {
      metaTitle: "404 · Page not found",
      metaDescription: "Nothing lives at this address.",
      heading: "Page not found",
      body: "It may never have existed — or I moved it myself.",
      back: "Back home",
    },

    footer: {
      rights: (year: number, author: string) => `© ${year} ${author}. All rights reserved.`,
    },

    misc: {
      toggleTheme: "Toggle theme",
      themeLight: "Lights on",
      themeDark: "Lights off",
      rightClickHint: "Right-click anywhere",
      keyboardHintIdle: "Tap a keycap",
      keyboardHintIdleSub: "Hover, click, or just press a letter key",
      arcade: "Open the arcade",
      chat: "Open the chat room",
      arcadeTitle: "Arcade",
      arcadeSubtitle: "60 open-source HTML5 games · powered by chengzuopeng/game-space",
      chatTitle: "Public chat",
      chatSubtitle: "Peer-to-peer and encrypted · no account, no server",
      embedNewWindow: "New window",
      embedLoading: "Connecting…",
      motionNudgeTitle: "Reduced motion is on",
      motionNudgeBody: "The 3D scene and animations are paused. Want the full version?",
      motionNudgeAccept: "Enable 3D",
      motionNudgeDecline: "Not now",
    },
  },
} satisfies Record<Locale, unknown>;

export type Dictionary = (typeof dictionaries)["zh"];

export const getDictionary = (locale: Locale): Dictionary => dictionaries[locale] as Dictionary;
