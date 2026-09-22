import Image from "next/image";

import { generalPartnerData } from "./GeneralPartner.data";
import styles from "./GeneralPartner.module.scss";

export function GeneralPartner() {
  const { label, logo, href, description } = generalPartnerData;

  return (
    <section className={styles.section} aria-label={label}>
      <a className={styles.logoLink} href={href} target="_blank" rel="noreferrer noopener" data-reveal="zoom">
        <Image
          className={styles.logo}
          src={logo.src}
          alt={logo.alt}
          width={logo.width}
          height={logo.height}
        />
      </a>
      <span className={styles.label} data-reveal="fade">
        {label}
      </span>
      <div className={styles.description} data-reveal="fade">
        {description.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
    </section>
  );
}
