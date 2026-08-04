"use client";

import { useRef, type ReactNode } from "react";

import { DragScrollbar } from "./DragScrollbar";
import styles from "./ScrollArea.module.scss";

type ScrollAreaProps = {
  children: ReactNode;
  /** class for the scrolling element itself */
  className?: string;
  /** class for the scrollbar track */
  scrollbarClassName?: string;
  rootClassName?: string;
};

export function ScrollArea({
  children,
  className,
  scrollbarClassName,
  rootClassName,
}: ScrollAreaProps) {
  const scrollerRef = useRef<HTMLDivElement>(null);

  return (
    <div className={[styles.root, rootClassName].filter(Boolean).join(" ")}>
      <div ref={scrollerRef} className={[styles.scroller, className].filter(Boolean).join(" ")}>
        {children}
      </div>
      <DragScrollbar targetRef={scrollerRef} className={scrollbarClassName} />
    </div>
  );
}
