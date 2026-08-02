"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";

export function Stagger({
  text,
  className = "",
  delay = 0,
  as: Tag = "span",
}: {
  text: string;
  className?: string;
  delay?: number;
  as?: "span" | "h1" | "h2" | "p";
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
      { threshold: 0.4, rootMargin: "0px 0px -10% 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const words = text.split(" ");

  return (
    <Tag
      ref={ref as never}
      aria-label={text}
      className={`stagger ${inView ? "in-view" : ""} ${className}`}
    >
      {words.map((word, i) => (
        <span
          key={i}
          className="stagger-word"
          style={
            { "--sd": `${delay + i * 70}ms` } as CSSProperties
          }
        >
          {word}
        </span>
      ))}
    </Tag>
  );
}
