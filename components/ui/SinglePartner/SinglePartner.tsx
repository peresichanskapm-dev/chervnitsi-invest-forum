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
  title?: string;
  description?: string[];
};

export function SinglePartner({ label, logo, href, title, description }: SinglePartnerData) {
  const image = (
    <Image className={styles.logo} src={logo.src} alt={logo.alt} width={logo.width} height={logo.height} />
  );
  const logoNode = href ? (
    <a className={styles.logoLink} href={href} target="_blank" rel="noreferrer noopener">
      {image}
    </a>
  ) : (
    image
  );

  return (
    <section className={styles.section} aria-label={label}>
      <div className={styles.container}>
        <p className={styles.label} data-reveal="fade">
          {label}
        </p>

        {description?.length ? (
          <div className={styles.panel} data-reveal="zoom">
            <div className={styles.media}>{logoNode}</div>
            <article className={styles.content}>
              {title ? <h4 className={styles.title}>{title}</h4> : null}
              <div className={styles.description}>
                {description.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </article>
          </div>
        ) : (
          <div className={styles.card} data-reveal="zoom">
            {logoNode}
          </div>
        )}
      </div>
    </section>
  );
}
