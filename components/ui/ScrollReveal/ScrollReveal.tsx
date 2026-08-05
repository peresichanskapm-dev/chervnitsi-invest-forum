"use client";

import { useEffect } from "react";

/**
 * One observer for the whole page: any element with `data-reveal` gets
 * `data-reveal-visible` the first time it enters the viewport, and the transition
 * itself lives in globals.scss. Nothing writes inline styles, so an element is free
 * to keep its own transform once revealed. A MutationObserver also picks up
 * `[data-reveal]` elements mounted after this effect runs (e.g. a fallback swapped
 * for its real content later), so they get observed too instead of staying hidden.
 * A page-end fallback also reveals anything still unrevealed once the document
 * cannot scroll any further, since the observer's negative bottom root margin can
 * never be satisfied by short elements sitting in the last 8% of the document.
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

    const observeTree = (node: Element) => {
      if (node.matches("[data-reveal]:not([data-reveal-visible])")) observer.observe(node);
      node
        .querySelectorAll("[data-reveal]:not([data-reveal-visible])")
        .forEach((child) => observer.observe(child));
    };

    observeTree(document.body);

    /*
     * Anything mounted after this effect — the tickets slider swapping its fallback markup for
     * Swiper, for instance — would otherwise never be observed, and globals.scss keeps every
     * unobserved [data-reveal] at opacity 0 permanently.
     */
    const mutations = new MutationObserver((records) => {
      for (const record of records) {
        for (const added of record.addedNodes) {
          if (added.nodeType === Node.ELEMENT_NODE) observeTree(added as Element);
        }
      }
    });
    mutations.observe(document.body, { childList: true, subtree: true });

    /*
     * The -8% root margin can never be satisfied by an element in the last 8% of the document:
     * scrolling stops before it clears the band. At the very bottom, reveal whatever is left.
     */
    let frame = 0;
    const revealAtPageEnd = () => {
      frame = 0;
      const doc = document.documentElement;
      if (window.innerHeight + window.scrollY < doc.scrollHeight - 2) return;
      for (const node of document.querySelectorAll(
        "[data-reveal]:not([data-reveal-visible])",
      )) {
        const rect = node.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          node.setAttribute("data-reveal-visible", "");
          observer.unobserve(node);
        }
      }
    };
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(revealAtPageEnd);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    onScroll();

    return () => {
      observer.disconnect();
      mutations.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return null;
}
