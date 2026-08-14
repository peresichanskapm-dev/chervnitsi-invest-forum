import Image from "next/image";

import { generalPartnerData } from "./GeneralPartner.data";
import styles from "./GeneralPartner.module.scss";

export function GeneralPartner() {
  const { label, logo } = generalPartnerData;

  return (
    <section className={styles.section} aria-label={label} data-reveal="zoom">
      <Image
        className={styles.logo}
        src={logo.src}
        alt={logo.alt}
        width={logo.width}
        height={logo.height}
      />
      <span className={styles.label}>{label}</span>
    </section>
  );
}
