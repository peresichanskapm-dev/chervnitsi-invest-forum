import Image from "next/image";

import { titlePartnerData } from "./TitlePartner.data";
import styles from "./TitlePartner.module.scss";

export function TitlePartner() {
  const { label, logo } = titlePartnerData;

  return (
    <section className={styles.section} aria-label={label}>
      <div className={styles.container}>
        <p className={styles.label} data-reveal="fade">
          {label}
        </p>

        <div className={styles.card} data-reveal="zoom">
          <Image
            className={styles.logo}
            src={logo.src}
            alt={logo.alt}
            width={logo.width}
            height={logo.height}
          />
        </div>
      </div>
    </section>
  );
}
