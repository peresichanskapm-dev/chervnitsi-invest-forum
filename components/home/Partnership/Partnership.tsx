import type { CSSProperties } from "react";
import Image from "next/image";

import { LeadLink } from "@/components/ui/LeadLink/LeadLink";

import { partnershipData } from "./Partnership.data";
import styles from "./Partnership.module.scss";

export function Partnership() {
  const { eyebrow, title, text, cta, photo } = partnershipData;

  return (
    <section className={styles.section} id="partnership">
      <div className={styles.media} aria-hidden>
        <Image
          className={styles.photo}
          src={photo.src}
          alt={photo.alt}
          width={1440}
          height={960}
          sizes="100vw"
        />
        <span className={styles.veil} />
      </div>

      <div className={styles.container}>
        <div className={styles.content}>
          <p className={styles.eyebrow} data-reveal="fade">
            {eyebrow}
          </p>
          <h2 className={styles.title} data-reveal="left">
            {title}
          </h2>
          <p
            className={styles.text}
            data-reveal="left"
            style={{ "--reveal-delay": "0.1s" } as CSSProperties}
          >
            {text}
          </p>
          {/* the reveal lives on a wrapper: its `transform: none` end state would otherwise
              outrank the button's own hover transform */}
          <div data-reveal="" style={{ "--reveal-delay": "0.2s" } as CSSProperties}>
            <LeadLink href={cta.href} formSource={cta.formSource} className={styles.cta}>
              {cta.label}
            </LeadLink>
          </div>
        </div>
      </div>

      <span className={styles.accent} aria-hidden />
    </section>
  );
}
