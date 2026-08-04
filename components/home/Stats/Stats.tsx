import type { CSSProperties } from "react";

import { Decor } from "@/components/ui/Decor/Decor";

import { statsData, statsDecor } from "./Stats.data";
import styles from "./Stats.module.scss";

export function Stats() {
  const { eyebrow, stats, highlight } = statsData;

  return (
    <section className={styles.section} id="numbers">
      <Decor clusters={statsDecor} />

      <p className={styles.eyebrow} data-reveal="fade">
        {eyebrow}
      </p>

      <div className={styles.container}>
        <div className={styles.content}>
          <ul className={styles.grid}>
            {stats.map((stat, index) => (
              <li
                key={stat.label}
                className={styles.stat}
                data-reveal=""
                style={{ "--reveal-delay": `${index * 0.1}s` } as CSSProperties}
              >
                <span className={styles.statValue}>{stat.value}</span>
                <span className={styles.statLabel}>{stat.label}</span>
              </li>
            ))}
          </ul>

          <div className={styles.highlight} data-reveal="zoom">
            <p className={styles.highlightValue}>{highlight.value}</p>
            <p className={styles.highlightLabel}>{highlight.label}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
