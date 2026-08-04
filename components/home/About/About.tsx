import type { CSSProperties } from "react";
import Image from "next/image";

import { Decor } from "@/components/ui/Decor/Decor";

import { aboutData, aboutDecor } from "./About.data";
import styles from "./About.module.scss";

export function About() {
  const { eyebrow, title, paragraphs } = aboutData;

  return (
    <section className={styles.section} id="about">
      <Decor clusters={aboutDecor} />

      <div className={styles.container}>
        <p className={styles.eyebrow} data-reveal="fade">
          {eyebrow}
        </p>

        <div className={styles.grid}>
          <h2 className={styles.title} data-reveal="left">
            <Image
              className={styles.mark}
              src="/images/logo-mark.svg"
              alt=""
              width={25}
              height={38}
              aria-hidden
            />
            <span className={styles.titleText}>
              {title.map((line) => (
                <span key={line}>{line}</span>
              ))}
            </span>
          </h2>

          <div className={styles.copy}>
            {paragraphs.map((paragraph, index) => (
              <p
                key={paragraph.text}
                className={styles.paragraph}
                data-reveal="right"
                style={{ "--reveal-delay": `${index * 0.1}s` } as CSSProperties}
              >
                {paragraph.highlight ? (
                  <span className={styles.highlight}>{paragraph.highlight}</span>
                ) : null}
                {paragraph.text}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
