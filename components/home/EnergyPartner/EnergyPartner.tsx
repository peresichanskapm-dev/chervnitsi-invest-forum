import Image from "next/image";

import styles from "../AutoPartner/AutoPartner.module.scss";
import { energyPartnerData } from "./EnergyPartner.data";

export function EnergyPartner() {
  const { label, logo } = energyPartnerData;

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
