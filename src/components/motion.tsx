"use client";

import { useEffect, useRef, useState, type ReactNode, type CSSProperties } from "react";

export function Reveal({
  children,
  className = "",
  delay = 0,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "p" | "span" | "h2" | "h3" | "li" | "article";
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      el.classList.add("in-view");
      return;
    }
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.unobserve(el);
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <Tag
      ref={ref as never}
      className={`reveal ${inView ? "in-view" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}

export function ShinyText({
  text,
  className = "",
  highlightClassName = "",
}: {
  text: string;
  className?: string;
  highlightClassName?: string;
}) {
  return (
    <span className={`text-shimmer ${className}`}>
      {text}
      <span className={highlightClassName} style={{ display: "contents" }} />
    </span>
  );
}

export function SpotlightCard({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const raf = useRef(0);

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    cancelAnimationFrame(raf.current);
    raf.current = requestAnimationFrame(() => {
      el.style.setProperty("--mx", `${x}px`);
      el.style.setProperty("--my", `${y}px`);
    });
  };

  useEffect(() => {
    return () => cancelAnimationFrame(raf.current);
  }, []);

  return (
    <div
      ref={ref}
      onMouseMove={onMouseMove}
      className={`spotlight-card group ${className}`}
    >
      {children}
    </div>
  );
}

export function Magnet({
  children,
  strength = 0.35,
  className = "",
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const raf = useRef(0);

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - (rect.left + rect.width / 2)) * strength;
    const y = (e.clientY - (rect.top + rect.height / 2)) * strength;
    cancelAnimationFrame(raf.current);
    raf.current = requestAnimationFrame(() => {
      el.style.setProperty("--mag-x", `${x}px`);
      el.style.setProperty("--mag-y", `${y}px`);
    });
  };

  const onMouseLeave = () => {
    cancelAnimationFrame(raf.current);
    raf.current = requestAnimationFrame(() => {
      if (ref.current) {
        ref.current.style.setProperty("--mag-x", "0px");
        ref.current.style.setProperty("--mag-y", "0px");
      }
    });
  };

  useEffect(() => {
    return () => cancelAnimationFrame(raf.current);
  }, []);

  return (
    <div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className={`magnet ${className}`}
    >
      {children}
    </div>
  );
}

export function CountUp({
  to,
  duration = 1600,
  suffix = "",
  className = "",
}: {
  to: number;
  duration?: number;
  suffix?: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [value, setValue] = useState(0);
  const [started, setStarted] = useState(
    () => typeof IntersectionObserver === "undefined"
  );

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          obs.unobserve(el);
        }
      },
      { threshold: 0.4 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    let frame = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(Math.round(eased * to));
      if (p < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [started, to, duration]);

  return (
    <span ref={ref} className={className}>
      {value}
      {suffix}
      <noscript>
        {to}
        {suffix}
      </noscript>
    </span>
  );
}

export function Marquee({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`marquee ${className}`}>
      <div className="marquee-track">{children}</div>
      <div className="marquee-track" aria-hidden="true">
        {children}
      </div>
    </div>
  );
}

export function Aurora({
  variant = "dark",
  className = "",
  style,
}: {
  variant?: "dark" | "light";
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <div className={`aurora aurora-${variant} ${className}`} style={style} />
  );
}

export function GhostWord({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      aria-hidden="true"
      className={`ghost-word text-[22vw] sm:text-[12rem] md:text-[15rem] ${className}`}
    >
      {children}
    </span>
  );
}

export function Sparkle({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 0c.9 6.3 3.6 9 12 12-8.4 3-11.1 5.7-12 12-.9-6.3-3.6-9-12-12 8.4-3 11.1-5.7 12-12Z" />
    </svg>
  );
}
