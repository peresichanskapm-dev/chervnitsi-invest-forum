import Image from "next/image";

import { mediaPartnersData } from "./MediaPartners.data";
import styles from "./MediaPartners.module.scss";

export function MediaPartners() {
  const { label, logos } = mediaPartnersData;

  return (
    <section className={styles.section} aria-label={label}>
      <div className={styles.container}>
        <p className={styles.label} data-reveal="fade">
          {label}
        </p>

        <ul className={styles.grid}>
          {logos.map((logo, index) => (
            <li key={`${logo.alt}-${index}`} className={styles.card} data-reveal="zoom">
              <Image
                className={styles.logo}
                src={logo.src}
                alt={logo.alt}
                width={logo.width}
                height={logo.height}
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
