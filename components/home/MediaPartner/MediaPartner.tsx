import Image from "next/image";

import { mediaPartnerData } from "./MediaPartner.data";
import styles from "./MediaPartner.module.scss";

export function MediaPartner() {
  const { label, logo, href } = mediaPartnerData;

  return (
    <section className={styles.section} aria-label={label}>
      <div className={styles.container}>
        <p className={styles.label} data-reveal="fade">
          {label}
        </p>

        <a
          className={styles.card}
          href={href}
          target="_blank"
          rel="noreferrer noopener"
          data-reveal="zoom"
        >
          <Image
            className={styles.logo}
            src={logo.src}
            alt={logo.alt}
            width={logo.width}
            height={logo.height}
          />
        </a>
      </div>
    </section>
  );
}
