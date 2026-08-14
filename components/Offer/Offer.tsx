import Link from "next/link";

import { OFFER_INTRO, OFFER_SECTIONS, OFFER_SUBTITLE, OFFER_TITLE } from "./Offer.data";
import styles from "./Offer.module.scss";

export function Offer() {
  return (
    <div className={styles.offer}>
      <Link href="/#hero" className={styles.back}>
        ← на головну
      </Link>

      <h1 className={styles.title}>{OFFER_TITLE}</h1>
      <p className={styles.subtitle}>{OFFER_SUBTITLE}</p>

      {OFFER_INTRO.map((paragraph) => (
        <p key={paragraph} className={styles.paragraph}>
          {paragraph}
        </p>
      ))}

      {OFFER_SECTIONS.map((section) => (
        <section key={section.number} className={styles.section}>
          <h2 className={styles.sectionTitle}>
            {section.number}. {section.title}
          </h2>
          {section.blocks.map((block, index) =>
            block.type === "ul" ? (
              <ul key={index} className={styles.list}>
                {block.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            ) : (
              <p key={index} className={styles.paragraph}>
                {block.text}
              </p>
            ),
          )}
        </section>
      ))}
    </div>
  );
}
