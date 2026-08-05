import { LeadLink } from "@/components/ui/LeadLink/LeadLink";

import { heroData } from "./Hero.data";
import styles from "./Hero.module.scss";

export function Hero() {
  const { date, title, tagline, banner, actions } = heroData;

  return (
    <section className={styles.hero} id="hero">
      <h1 className={styles.srOnly}>
        {`${title.top} ${title.bottom} — ${tagline}. ${date.day} ${date.year}`}
      </h1>

      <div className={styles.banner}>
        <picture>
          <source
            media="(min-width: 992px)"
            srcSet={banner.desktop.src}
            width={banner.desktop.width}
            height={banner.desktop.height}
          />
          {/* eslint-disable-next-line @next/next/no-img-element -- art-directed <picture>:
              next/image cannot swap sources per breakpoint, and rendering two <Image>s would
              download both. The files are pre-optimised WebP, so there is nothing to optimise. */}
          <img
            className={styles.bannerImage}
            src={banner.mobile.src}
            width={banner.mobile.width}
            height={banner.mobile.height}
            alt={banner.alt}
            fetchPriority="high"
            decoding="async"
          />
        </picture>

        <div className={styles.actions}>
          <LeadLink
            href={actions.partner.href}
            formSource={actions.partner.formSource}
            className={styles.buttonGhost}
          >
            {actions.partner.label}
          </LeadLink>
          <LeadLink
            href={actions.book.href}
            formSource={actions.book.formSource}
            className={styles.buttonPrimary}
          >
            {actions.book.label}
          </LeadLink>
        </div>
      </div>
    </section>
  );
}
