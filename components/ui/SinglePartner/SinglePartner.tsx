import Image from "next/image";

import styles from "./SinglePartner.module.scss";

export type SinglePartnerData = {
  label: string;
  logo: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
  href?: string;
  description?: string[];
};

export function SinglePartner({ label, logo, href, description }: SinglePartnerData) {
  const image = (
    <Image className={styles.logo} src={logo.src} alt={logo.alt} width={logo.width} height={logo.height} />
  );

  return (
    <section className={styles.section} aria-label={label}>
      <div className={styles.container}>
        <p className={styles.label} data-reveal="fade">
          {label}
        </p>

        <div className={styles.card} data-reveal="zoom">
          {href ? (
            <a className={styles.logoLink} href={href} target="_blank" rel="noreferrer noopener">
              {image}
            </a>
          ) : (
            image
          )}

          {description?.length ? (
            <div className={styles.description}>
              {description.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
