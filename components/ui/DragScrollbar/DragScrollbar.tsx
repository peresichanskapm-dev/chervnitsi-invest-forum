"use client";

import { useCallback, useEffect, useRef, useState, type RefObject } from "react";

import styles from "./DragScrollbar.module.scss";

type DragScrollbarProps = {
  targetRef: RefObject<HTMLElement | null>;
  className?: string;
};

export function DragScrollbar({ targetRef, className }: DragScrollbarProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [ratio, setRatio] = useState(1);
  const [progress, setProgress] = useState(0);

  const sync = useCallback(() => {
    const target = targetRef.current;
    if (!target) return;

    const scrollable = target.scrollWidth - target.clientWidth;
    setRatio(target.scrollWidth > 0 ? target.clientWidth / target.scrollWidth : 1);
    setProgress(scrollable > 0 ? target.scrollLeft / scrollable : 0);
  }, [targetRef]);

  useEffect(() => {
    const target = targetRef.current;
    if (!target) return;

    sync();
    target.addEventListener("scroll", sync, { passive: true });

    const observer = new ResizeObserver(sync);
    observer.observe(target);
    for (const child of Array.from(target.children)) observer.observe(child);

    return () => {
      target.removeEventListener("scroll", sync);
      observer.disconnect();
    };
  }, [sync, targetRef]);

  const scrollToPointer = useCallback(
    (clientX: number) => {
      const target = targetRef.current;
      const track = trackRef.current;
      if (!target || !track) return;

      const rect = track.getBoundingClientRect();
      const thumbWidth = rect.width * ratio;
      const usable = rect.width - thumbWidth;
      if (usable <= 0) return;

      const next = (clientX - rect.left - thumbWidth / 2) / usable;
      target.scrollLeft =
        Math.min(Math.max(next, 0), 1) * (target.scrollWidth - target.clientWidth);
    },
    [ratio, targetRef],
  );

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    event.currentTarget.setPointerCapture(event.pointerId);
    scrollToPointer(event.clientX);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!event.currentTarget.hasPointerCapture(event.pointerId)) return;
    scrollToPointer(event.clientX);
  };

  const isScrollable = ratio < 0.999;

  return (
    <div
      ref={trackRef}
      className={[styles.track, isScrollable ? "" : styles.hidden, className]
        .filter(Boolean)
        .join(" ")}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      aria-hidden
    >
      <div
        className={styles.thumb}
        style={{
          width: `${ratio * 100}%`,
          left: `${progress * (100 - ratio * 100)}%`,
        }}
      />
    </div>
  );
}
