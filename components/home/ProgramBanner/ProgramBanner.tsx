import { programBannerData } from "./ProgramBanner.data";
import styles from "./ProgramBanner.module.scss";

export function ProgramBanner() {
  const { title, status, button, href } = programBannerData;

  return (
    <section className={styles.section} id="schedule" aria-label={title}>
      <div className={`container ${styles.container}`} data-reveal="">
        <div className={styles.panel}>
          <p className={styles.title}>
            <span className={styles.titleText}>{title}</span>
            <span className={styles.status}>{status}</span>
          </p>
          <a className={styles.button} href={href}>
            <span>{button}</span>
            <span className={styles.arrow} aria-hidden>
              &rarr;
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
