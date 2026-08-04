import Image from "next/image";

import { LeadLink } from "@/components/ui/LeadLink/LeadLink";

import { decor, decorOffset, heroData } from "./Hero.data";
import styles from "./Hero.module.scss";

const px = (value: number) => `${value / 10}rem`;

function Decor() {
  return (
    <div className={styles.decor} aria-hidden>
      {[
        { dx: 0, dy: 0, key: "front" },
        { dx: decorOffset.x, dy: decorOffset.y, key: "back" },
      ].map((layer) =>
        decor.map((item, index) => (
          <span
            key={`${layer.key}-${index}`}
            className={styles.decorItem}
            style={{
              left: px(item.left + layer.dx),
              top: px(item.top + layer.dy),
              width: px(item.box),
              height: px(item.box),
            }}
          >
            <Image
              src={item.src}
              alt=""
              width={item.width}
              height={item.height}
              style={{ width: px(item.width), height: px(item.height) }}
            />
          </span>
        )),
      )}
    </div>
  );
}

export function Hero() {
  const { date, title, tagline, photo, actions } = heroData;

  return (
    <section className={styles.hero} id="hero">
      <div className={styles.canvas}>
        <div className={styles.stage}>
          <span className={styles.glow} aria-hidden />

          <Decor />

          <div className={styles.photo}>
            <Image
              src={photo.src}
              alt={photo.alt}
              width={1074}
              height={886}
              priority
              sizes="(min-width: 992px) 1074px, 100vw"
            />
          </div>

          <span className={styles.fade} aria-hidden />

          <div className={styles.plate}>
            <Image
              className={styles.plateShape}
              src="/images/hero-title-shape.svg"
              alt=""
              width={763}
              height={375}
              aria-hidden
            />
            <span className={`${styles.square} ${styles.squareOne}`} aria-hidden />
            <span className={`${styles.square} ${styles.squareTwo}`} aria-hidden />
            <span
              className={`${styles.square} ${styles.squareThree}`}
              aria-hidden
            />

            <p className={styles.date}>
              <span>{date.day}</span>
              <span className={styles.year}>{date.year}</span>
            </p>

            <h1 className={styles.title}>
              <span>{title.top}</span>
              <span>{title.bottom}</span>
            </h1>

            <p className={styles.tagline}>{tagline}</p>
          </div>

          <div className={styles.actions}>
            <LeadLink
              href={actions.partner.href}
              formSource={actions.partner.formSource}
              className={styles.buttonGhost}
            >
              {actions.partner.label}
            </LeadLink>
            <LeadLink
              href={actions.book.href}
              formSource={actions.book.formSource}
              className={styles.buttonPrimary}
            >
              {actions.book.label}
            </LeadLink>
          </div>
        </div>
      </div>
    </section>
  );
}
