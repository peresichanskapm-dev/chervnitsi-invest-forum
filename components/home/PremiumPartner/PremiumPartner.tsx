import type { CSSProperties } from "react";
import Image from "next/image";

import { premiumPartnerData } from "./PremiumPartner.data";
import styles from "./PremiumPartner.module.scss";

export function PremiumPartner() {
  const { label, partners } = premiumPartnerData;

  return (
    <section className={styles.section} aria-labelledby="premium-partner-title">
      <div className={`container ${styles.container}`}>
        <h3 className={styles.title} id="premium-partner-title" data-reveal="fade">
          {label}
        </h3>
        <div className={styles.panels}>
          {partners.map((partner, index) => (
            <div
              key={partner.id}
              className={styles.panel}
              data-reveal=""
              style={{ "--reveal-delay": `${0.1 + index * 0.05}s` } as CSSProperties}
            >
              <div className={styles.media}>
                {partner.href ? (
                  <a
                    href={partner.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className={styles.card}
                    aria-label={partner.logo.alt}
                  >
                    <Image
                      src={partner.logo.src}
                      alt={partner.logo.alt}
                      width={partner.logo.width}
                      height={partner.logo.height}
                      className={styles.logo}
                    />
                  </a>
                ) : (
                  <div className={styles.cardStatic} aria-label={partner.logo.alt}>
                    <Image
                      src={partner.logo.src}
                      alt={partner.logo.alt}
                      width={partner.logo.width}
                      height={partner.logo.height}
                      className={styles.logo}
                    />
                  </div>
                )}
              </div>
              <article className={styles.content}>
                <h4 className={styles.partnerTitle}>{partner.title}</h4>
                <div className={styles.text}>
                  {partner.description.map((paragraph) => (
                    <p key={paragraph} className={styles.paragraph}>
                      {paragraph}
                    </p>
                  ))}
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
