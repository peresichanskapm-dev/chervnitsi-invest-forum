import Image from "next/image";

import { speakersBannerData } from "./SpeakersBanner.data";
import styles from "./SpeakersBanner.module.scss";

export function SpeakersBanner() {
  const { prefix, count, suffix, art } = speakersBannerData;

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.card} data-reveal="zoom">
          <div className={styles.text}>
            <div className={styles.labels}>
              <span className={styles.label}>{prefix}</span>
              <span className={styles.label}>{suffix}</span>
            </div>
            <span className={styles.count}>{count}</span>
          </div>

          <div className={styles.art} aria-hidden>
            <span className={styles.shape1}>
              <Image src={art[0].src} alt="" width={art[0].width} height={art[0].height} />
            </span>
            <span className={styles.shape2}>
              <Image src={art[1].src} alt="" width={art[1].width} height={art[1].height} />
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
