import type { CSSProperties } from "react";
import Image from "next/image";

import { hotelPartnersData } from "./HotelPartners.data";
import styles from "./HotelPartners.module.scss";

export function HotelPartners() {
  const { eyebrow, title, hotels } = hotelPartnersData;

  return (
    <section className={styles.section} id="hotels">
      <div className={styles.container}>
        <p className={styles.eyebrow} data-reveal="fade">
          {eyebrow}
        </p>
        <h2 className={styles.title} data-reveal="left">
          {title}
        </h2>

        <ul className={styles.panels}>
          {hotels.map((hotel) => (
            <li key={hotel.id} className={styles.panel} data-reveal="">
              <div className={styles.brand}>
                <Image
                  className={styles.logo}
                  src={hotel.logo.src}
                  alt={hotel.name}
                  width={hotel.logo.width}
                  height={hotel.logo.height}
                  style={{ "--logo-scale": hotel.logo.scale ?? 1 } as CSSProperties}
                />
              </div>
              <div className={styles.info}>
                <p className={styles.name}>{hotel.name}</p>
                <p className={styles.discount}>{hotel.discount}</p>
                <p className={styles.booking}>
                  {hotel.bookingLabel}
                  {" — "}
                  <a
                    className={styles.link}
                    href={hotel.website.href}
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    {hotel.website.display}
                  </a>
                </p>
                <p className={styles.promo}>
                  Промокод: <span className={styles.promoValue}>{hotel.promoCode}</span>
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
