"use client";

import React, { useRef, useEffect, useCallback } from "react";
import { useMousePosition } from "@/utils/mouse";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { isBlogPostPath } from "@/lib/routes";

interface ParticlesProps {
  className?: string;
  quantity?: number;
  staticity?: number;
  ease?: number;
  refresh?: boolean;
  /** Device-pixel-ratio ceiling — caps fill cost on high-DPI / low-end screens. */
  maxDpr?: number;
}

type Circle = {
  x: number;
  y: number;
  translateX: number;
  translateY: number;
  size: number;
  alpha: number;
  targetAlpha: number;
  dx: number;
  dy: number;
  magnetism: number;
};

export default function Particles({
  className = "",
  quantity = 30,
  staticity = 50,
  ease = 50,
  refresh = false,
  maxDpr = 2,
}: ParticlesProps) {
  const pathname = usePathname();
  // `/blogs/<slug>` 与 `/en/blogs/<slug>` 都不挂粒子 —— 阅读页要安静。
  // 之前只判断了中文前缀，英文文章页仍然会挂载一块全屏 Canvas。
  const isBlogPost = isBlogPostPath(pathname || "/");

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const context = useRef<CanvasRenderingContext2D | null>(null);
  const circles = useRef<Circle[]>([]);
  const mousePosition = useMousePosition();
  const mouse = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const canvasSize = useRef<{ w: number; h: number }>({ w: 0, h: 0 });
  const rafId = useRef<number>(0);
  const dprRef = useRef(1);
  // 循环依赖打断器：step 需要再次调度 animate，animate 又调用 step。
  // 用一个 ref 承接 animate，避免 useCallback 互相依赖。
  const animateRef = useRef<() => void>(() => {});

  const clearContext = useCallback(() => {
    const ctx = context.current;
    if (!ctx) return;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvasSize.current.w * dprRef.current, canvasSize.current.h * dprRef.current);
  }, []);

  const circleParams = useCallback((): Circle => {
    const x = Math.floor(Math.random() * canvasSize.current.w);
    const y = Math.floor(Math.random() * canvasSize.current.h);
    return {
      x,
      y,
      translateX: 0,
      translateY: 0,
      size: Math.floor(Math.random() * 2) + 0.1,
      alpha: 0,
      targetAlpha: parseFloat((Math.random() * 0.6 + 0.1).toFixed(1)),
      dx: (Math.random() - 0.5) * 0.2,
      dy: (Math.random() - 0.5) * 0.2,
      magnetism: 0.1 + Math.random() * 4,
    };
  }, []);

  const drawCircle = useCallback((circle: Circle, update = false) => {
    const ctx = context.current;
    if (!ctx) return;
    const { x, y, translateX, translateY, size, alpha } = circle;
    const dpr = dprRef.current;
    // 每次都从 DPR 基准矩阵开始，避免 translate 在多次绘制之间累积
    ctx.setTransform(dpr, 0, 0, dpr, translateX * dpr, translateY * dpr);
    ctx.beginPath();
    ctx.arc(x, y, size, 0, 2 * Math.PI);
    ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
    ctx.fill();
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    if (!update) circles.current.push(circle);
  }, []);

  const drawParticles = useCallback(() => {
    clearContext();
    for (let i = 0; i < quantity; i++) drawCircle(circleParams());
  }, [clearContext, drawCircle, circleParams, quantity]);

  const resizeCanvas = useCallback(() => {
    const container = canvasContainerRef.current;
    const canvas = canvasRef.current;
    const ctx = context.current;
    if (!container || !canvas || !ctx) return;

    // DPR 在每次 resize 时重新取，否则外接显示器切换后比例会错
    dprRef.current =
      typeof window !== "undefined" ? Math.min(window.devicePixelRatio || 1, maxDpr) : 1;
    const dpr = dprRef.current;

    circles.current.length = 0;
    canvasSize.current.w = container.offsetWidth;
    canvasSize.current.h = container.offsetHeight;

    // 设置 width/height 会重置上下文状态，因此随后必须显式 setTransform，
    // 而不是 scale()（scale 是在现有矩阵上累乘）。
    canvas.width = canvasSize.current.w * dpr;
    canvas.height = canvasSize.current.h * dpr;
    canvas.style.width = `${canvasSize.current.w}px`;
    canvas.style.height = `${canvasSize.current.h}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }, [maxDpr]);

  const initCanvas = useCallback(() => {
    resizeCanvas();
    drawParticles();
  }, [resizeCanvas, drawParticles]);

  const remapValue = (
    value: number,
    start1: number,
    end1: number,
    start2: number,
    end2: number
  ): number => {
    const remapped =
      ((value - start1) * (end2 - start2)) / (end1 - start1) + start2;
    return remapped > 0 ? remapped : 0;
  };

  /** 单帧推进 + 绘制，不含 requestAnimationFrame 调用 */
  const step = useCallback(() => {
    clearContext();
    const dpr = dprRef.current;
    const ctx = context.current;
    if (!ctx) return;

    circles.current.forEach((circle: Circle, i: number) => {
      const edge = [
        circle.x + circle.translateX - circle.size,
        canvasSize.current.w - circle.x - circle.translateX - circle.size,
        circle.y + circle.translateY - circle.size,
        canvasSize.current.h - circle.y - circle.translateY - circle.size,
      ];
      const closestEdge = edge.reduce((a, b) => Math.min(a, b));
      const remapClosestEdge = parseFloat(
        remapValue(closestEdge, 0, 20, 0, 1).toFixed(2)
      );
      if (remapClosestEdge > 1) {
        circle.alpha += 0.02;
        if (circle.alpha > circle.targetAlpha) circle.alpha = circle.targetAlpha;
      } else {
        circle.alpha = circle.targetAlpha * remapClosestEdge;
      }
      circle.x += circle.dx;
      circle.y += circle.dy;
      circle.translateX +=
        (mouse.current.x / (staticity / circle.magnetism) - circle.translateX) / ease;
      circle.translateY +=
        (mouse.current.y / (staticity / circle.magnetism) - circle.translateY) / ease;

      const outside =
        circle.x < -circle.size ||
        circle.x > canvasSize.current.w + circle.size ||
        circle.y < -circle.size ||
        circle.y > canvasSize.current.h + circle.size;

      if (outside) {
        circles.current.splice(i, 1);
        drawCircle(circleParams());
      } else {
        // 直接定位后画，省掉每次都 spread 一个新对象的开销
        ctx.setTransform(dpr, 0, 0, dpr, circle.translateX * dpr, circle.translateY * dpr);
        ctx.beginPath();
        ctx.arc(circle.x, circle.y, circle.size, 0, 2 * Math.PI);
        ctx.fillStyle = `rgba(255, 255, 255, ${circle.alpha})`;
        ctx.fill();
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      }
    });

    rafId.current = window.requestAnimationFrame(animateRef.current);
  }, [clearContext, drawCircle, circleParams, staticity, ease]);

  // step 与 animate 互相引用，用 animateRef 打断 useCallback 循环依赖
  const animate = useCallback(() => {
    step();
  }, [step]);

  useEffect(() => {
    animateRef.current = animate;
  }, [animate]);

  const onMouseMove = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const { w, h } = canvasSize.current;
    const x = mousePosition.x - rect.left - w / 2;
    const y = mousePosition.y - rect.top - h / 2;
    const inside = x < w / 2 && x > -w / 2 && y < h / 2 && y > -h / 2;
    if (inside) {
      mouse.current.x = x;
      mouse.current.y = y;
    }
  }, [mousePosition.x, mousePosition.y]);

  useEffect(() => {
    if (isBlogPost) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    context.current = canvas.getContext("2d");
    initCanvas();
    animate();

    window.addEventListener("resize", initCanvas);

    const onVisibility = () => {
      cancelAnimationFrame(rafId.current);
      if (!document.hidden) animate();
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      cancelAnimationFrame(rafId.current);
      window.removeEventListener("resize", initCanvas);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [isBlogPost, initCanvas, animate]);

  useEffect(() => {
    if (isBlogPost) return;
    onMouseMove();
  }, [isBlogPost, onMouseMove]);

  useEffect(() => {
    if (isBlogPost) return;
    initCanvas();
  }, [isBlogPost, initCanvas, refresh]);

  if (isBlogPost) return null;

  return (
    <div
      className={cn(
        className,
        "dark:bg-gradient-to-tl from-black via-zinc-600/20 to-black"
      )}
      ref={canvasContainerRef}
      aria-hidden="true"
    >
      <canvas ref={canvasRef} />
    </div>
  );
}
