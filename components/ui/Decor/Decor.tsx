import type { CSSProperties } from "react";

import styles from "./Decor.module.scss";

export type DecorPattern = "ring" | "zigzag";

export type DecorCluster = {
  pattern: DecorPattern;
  /** x of the cluster grid, from the container content edge */
  left: number;
  /** y of the grid top from the section top, or of its bottom from the section bottom */
  top?: number;
  bottom?: number;
  /** edge of a single square; the grid step is the same, so squares meet corner to corner */
  size: number;
};

/** [col, row] of every square, on the 5-cell grid each cluster is laid out on */
const patterns: Record<DecorPattern, [number, number][]> = {
  ring: [[2, 0], [1, 1], [3, 1], [0, 2], [4, 2], [1, 3], [3, 3], [2, 4]],
  zigzag: [[0, 0], [1, 1], [2, 2], [1, 3], [0, 4]],
};

const px = (value: number) => `${value / 10}rem`;

export function Decor({ clusters }: { clusters: DecorCluster[] }) {
  return (
    <div className={styles.decor} aria-hidden data-reveal="fade">
      <div className={styles.inner}>
        {clusters.map((cluster, clusterIndex) => {
          const rows = Math.max(...patterns[cluster.pattern].map(([, row]) => row)) + 1;

          return patterns[cluster.pattern].map(([col, row], squareIndex) => (
            <span
              key={`${clusterIndex}-${col}-${row}`}
              className={styles.square}
              style={{
                "--decor-index": squareIndex,
                left: px(cluster.left + col * cluster.size),
                top: cluster.top === undefined ? undefined : px(cluster.top + row * cluster.size),
                bottom:
                  cluster.bottom === undefined
                    ? undefined
                    : px(cluster.bottom + (rows - 1 - row) * cluster.size),
                width: px(cluster.size),
                height: px(cluster.size),
              } as CSSProperties}
            />
          ));
        })}
      </div>
    </div>
  );
}
