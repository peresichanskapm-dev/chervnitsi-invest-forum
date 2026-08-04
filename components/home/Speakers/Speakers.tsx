import type { CSSProperties } from "react";
import Image from "next/image";

import { speakersData } from "./Speakers.data";
import styles from "./Speakers.module.scss";

export function Speakers() {
  const { eyebrow, speakers } = speakersData;

  return (
    <section className={styles.section} id="speakers">
      <div className={styles.container}>
        <p className={styles.eyebrow} data-reveal="fade">
          {eyebrow}
        </p>

        <ul className={styles.grid}>
          {speakers.map((speaker, index) => (
            <li
              key={index}
              className={styles.card}
              data-reveal=""
              style={{ "--reveal-delay": `${(index % 4) * 0.09}s` } as CSSProperties}
            >
              <div className={styles.photo}>
                <Image
                  className={styles.photoBack}
                  src="/images/speaker-bg.webp"
                  alt=""
                  width={905}
                  height={603}
                  sizes="(min-width: 992px) 905px, 150vw"
                  aria-hidden
                />
                <span className={styles.photoBackVeil} aria-hidden />
                <Image
                  className={styles.photoFront}
                  src={speaker.photo}
                  alt={`${speaker.firstName} ${speaker.lastName}`}
                  width={373}
                  height={559}
                  sizes="(min-width: 992px) 373px, 62vw"
                />
                <span className={styles.photoFrontVeil} aria-hidden />
              </div>

              <p className={styles.name}>
                <span>{speaker.firstName}</span>
                <span>{speaker.lastName}</span>
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
