import React from "react";

/** Shared MDX element renderers for blog posts (both locales). */
export const blogComponents = {
  h1: (props: any) => (
    <h1
      className="font-display text-2xl md:text-3xl leading-[1.15] mt-14 mb-6 text-foreground"
      {...props}
    />
  ),
  h2: (props: any) => (
    <h2
      className="font-display text-xl md:text-2xl leading-[1.2] mt-12 mb-4 text-foreground relative"
      {...props}
    />
  ),
  h3: (props: any) => (
    <h3
      className="font-display text-lg md:text-xl leading-[1.25] mt-8 mb-3 text-foreground"
      {...props}
    />
  ),
  p: (props: any) => (
    <p
      className="text-muted-foreground leading-[1.8] mb-7 text-[17px] font-sans"
      {...props}
    />
  ),
  ul: (props: any) => (
    <ul
      className="mb-7 text-muted-foreground space-y-3 text-[17px] leading-[1.8] font-sans"
      {...props}
    />
  ),
  ol: (props: any) => (
    <ol
      className="list-decimal mb-7 text-muted-foreground space-y-3 text-[17px] leading-[1.8] font-sans pl-5"
      {...props}
    />
  ),
  li: (props: any) => (
    <li className="pl-2 relative before:content-['–'] before:absolute before:-left-5 before:text-[hsl(20,100%,70%)] before:font-medium" {...props} />
  ),
  blockquote: (props: any) => (
    <blockquote
      className="border-l-2 border-[hsl(20,100%,70%)] pl-6 my-8 text-foreground/80 italic text-lg leading-relaxed font-sans"
      {...props}
    />
  ),
  code: (props: any) => (
    <code
      className="bg-muted/50 text-[hsl(20,100%,65%)] px-1.5 py-0.5 rounded text-[15px] font-mono"
      {...props}
    />
  ),
  pre: (props: any) => (
    <pre
      className="bg-[hsl(222,84%,3%)] p-5 rounded-xl overflow-x-auto mb-8 border border-border/50 text-sm leading-relaxed"
      {...props}
    />
  ),
  a: (props: any) => (
    <a
      className="text-[hsl(20,100%,70%)] hover:text-[hsl(20,100%,80%)] underline decoration-[hsl(20,100%,70%)]/30 underline-offset-4 hover:decoration-[hsl(20,100%,70%)] transition-colors"
      {...props}
    />
  ),
  hr: () => (
    <hr className="my-12 border-none h-px bg-gradient-to-r from-transparent via-border to-transparent" />
  ),
  strong: (props: any) => (
    <strong className="text-foreground font-semibold" {...props} />
  ),
  // GFM tables (parsed by remark-gfm). Horizontally scrollable container so
  // wide tables never blow out the content column.
  table: (props: any) => (
    <div className="my-8 overflow-x-auto rounded-xl border border-border/50">
      <table className="w-full border-collapse text-sm font-sans" {...props} />
    </div>
  ),
  thead: (props: any) => <thead className="bg-muted/40" {...props} />,
  th: (props: any) => (
    <th
      className="text-left font-semibold text-foreground px-4 py-3 border-b border-border/50 whitespace-nowrap"
      {...props}
    />
  ),
  td: (props: any) => (
    <td
      className="text-muted-foreground px-4 py-3 border-b border-border/30 align-top leading-relaxed"
      {...props}
    />
  ),
  tr: (props: any) => (
    <tr className="even:bg-muted/20 transition-colors hover:bg-muted/30" {...props} />
  ),
};
