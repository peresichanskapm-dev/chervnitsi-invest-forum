"use client";

import { useState } from "react";
import Image from "next/image";

import { type ProgramCard, type ProgramDay, programData } from "./Program.data";
import styles from "./Program.module.scss";

type MediaProps = {
  src: string;
  alt: string;
  sizes: string;
  className: string;
};

function Media({ src, alt, sizes, className }: MediaProps) {
  return (
    <div className={className}>
      <Image src={src} alt={alt} fill sizes={sizes} />
    </div>
  );
}

type CardProps = {
  card: ProgramCard;
  number: string;
  sizes: string;
};

function Card({ card, number, sizes }: CardProps) {
  return (
    <article className={styles.card}>
      <div className={styles.cardHeading}>
        <p className={styles.cardNumber}>{number}</p>
        <h3 className={styles.cardTitle}>{card.title}</h3>
      </div>
      <Media
        src={card.image}
        alt={card.imageAlt}
        sizes={sizes}
        className={styles.cardMedia}
      />
      <p className={styles.cardText}>{card.text}</p>
    </article>
  );
}

function Panel({ day, active }: { day: ProgramDay; active: boolean }) {
  return (
    <div
      className={styles.panel}
      id={`program-panel-${day.id}`}
      role="tabpanel"
      aria-labelledby={`program-tab-${day.id}`}
      hidden={!active}
    >
      <div className={styles.stack}>
        <Media
          src={day.hero}
          alt={day.heroAlt}
          sizes="(min-width: 992px) 120.8rem, 100vw"
          className={styles.hero}
        />
        <p className={styles.intro}>{day.intro}</p>
      </div>

      <div className={styles.rows}>
        {day.feature ? (
          <article className={styles.feature}>
            <Media
              src={day.feature.image}
              alt={day.feature.imageAlt}
              sizes="(min-width: 992px) 50rem, 100vw"
              className={styles.featureMedia}
            />
            <div className={styles.featureBody}>
              <div className={styles.cardHeading}>
                <p className={styles.cardNumber}>01</p>
                <h3 className={styles.cardTitle}>{day.feature.title}</h3>
              </div>
              <p className={styles.cardText}>{day.feature.text}</p>
            </div>
          </article>
        ) : null}

        <div className={styles.grid} data-columns={day.cards.length}>
          {day.cards.map((card, index) => (
            <Card
              key={card.id}
              card={card}
              number={String(index + (day.feature ? 2 : 1)).padStart(2, "0")}
              sizes={
                day.cards.length > 2
                  ? "(min-width: 992px) 36rem, 100vw"
                  : "(min-width: 992px) 56rem, 100vw"
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export function Program() {
  const { days, sectionAriaLabel } = programData;
  const [activeDay, setActiveDay] = useState(days[0].id);

  return (
    <section className={styles.section} id="program" aria-label={sectionAriaLabel}>
      <div className="container">
        <div className={styles.block} data-reveal="">
          <div className={styles.tabs} role="tablist" aria-label={sectionAriaLabel}>
            {days.map((day) => {
              const active = day.id === activeDay;

              return (
                <button
                  key={day.id}
                  type="button"
                  className={`${styles.tab} ${active ? styles.tabActive : ""}`}
                  id={`program-tab-${day.id}`}
                  role="tab"
                  aria-selected={active}
                  aria-controls={`program-panel-${day.id}`}
                  onClick={() => setActiveDay(day.id)}
                >
                  {day.tabLabel}
                </button>
              );
            })}
          </div>

          {days.map((day) => (
            <Panel key={day.id} day={day} active={day.id === activeDay} />
          ))}
        </div>
      </div>
    </section>
  );
}
