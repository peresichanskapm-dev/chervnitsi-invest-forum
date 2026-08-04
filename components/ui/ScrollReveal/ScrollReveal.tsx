"use client";

import { useEffect } from "react";

/**
 * One observer for the whole page: any element with `data-reveal` gets
 * `data-reveal-visible` the first time it enters the viewport, and the transition
 * itself lives in globals.scss. Nothing writes inline styles, so an element is free
 * to keep its own transform once revealed.
 */
export function ScrollReveal() {
  useEffect(() => {
    const root = document.documentElement;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      root.classList.remove("has-reveal");
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.setAttribute("data-reveal-visible", "");
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -8% 0px" },
    );

    document.querySelectorAll("[data-reveal]").forEach((node) => observer.observe(node));

    return () => observer.disconnect();
  }, []);

  return null;
}
