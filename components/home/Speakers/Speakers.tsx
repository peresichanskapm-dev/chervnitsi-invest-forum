"use client";

import { useState, type CSSProperties } from "react";
import Image from "next/image";

import { speakersData } from "./Speakers.data";
import { SpeakerModal } from "./SpeakerModal";
import styles from "./Speakers.module.scss";

export function Speakers() {
  const { eyebrow, speakers } = speakersData;
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

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
              <button type="button" className={styles.cardButton} onClick={() => setActiveIndex(index)}>
                <span className={styles.photo}>
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
                </span>

                <p className={styles.name}>
                  <span>{speaker.firstName}</span>
                  <span>{speaker.lastName}</span>
                </p>
              </button>
            </li>
          ))}
        </ul>
      </div>

      {activeIndex !== null && (
        <SpeakerModal
          speakers={speakers}
          index={activeIndex}
          onClose={() => setActiveIndex(null)}
          onNavigate={setActiveIndex}
        />
      )}
    </section>
  );
}
