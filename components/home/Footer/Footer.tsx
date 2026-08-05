import type { CSSProperties } from "react";
import Image from "next/image";

import { footerData, type FooterSocial } from "./Footer.data";
import styles from "./Footer.module.scss";

const SOCIAL_ICONS: Record<FooterSocial["id"], React.ReactNode> = {
  instagram: (
    <>
      <path d="M23.7614 41.6989H23.6761C12.9991 41.6989 4.3125 33.0098 4.3125 22.3297V22.2442C4.3125 11.5641 12.9991 2.875 23.6761 2.875H23.7614C34.4384 2.875 43.125 11.5641 43.125 22.2442V22.3297C43.125 33.0098 34.4384 41.6989 23.7614 41.6989ZM23.6761 4.18915C13.723 4.18915 5.62626 12.2882 5.62626 22.2442V22.3297C5.62626 32.2857 13.723 40.3848 23.6761 40.3848H23.7614C33.7145 40.3848 41.8112 32.2857 41.8112 22.3297V22.2442C41.8112 12.2882 33.7145 4.18915 23.7614 4.18915H23.6761Z" />
      <path d="M29.5211 11.1631H17.9179C14.7123 11.1631 12.1045 13.7717 12.1045 16.9782V27.5965C12.1045 30.803 14.7123 33.4116 17.9179 33.4116H29.5211C32.7266 33.4116 35.3345 30.803 35.3345 27.5965V16.9782C35.3345 13.7717 32.7266 11.1631 29.5211 11.1631ZM14.1553 16.9782C14.1553 14.9032 15.8435 13.2145 17.9179 13.2145H29.5211C31.5955 13.2145 33.2837 14.9032 33.2837 16.9782V27.5965C33.2837 29.6715 31.5955 31.3602 29.5211 31.3602H17.9179C15.8435 31.3602 14.1553 29.6715 14.1553 27.5965V16.9782Z" />
      <path d="M23.7197 27.695C26.7006 27.695 29.1272 25.2691 29.1272 22.286C29.1272 19.3029 26.702 16.877 23.7197 16.877C20.7375 16.877 18.3123 19.3029 18.3123 22.286C18.3123 25.2691 20.7375 27.695 23.7197 27.695ZM23.7197 18.9296C25.5708 18.9296 27.0764 20.4357 27.0764 22.2873C27.0764 24.1389 25.5708 25.645 23.7197 25.645C21.8686 25.645 20.363 24.1389 20.363 22.2873C20.363 20.4357 21.8686 18.9296 23.7197 18.9296Z" />
      <path d="M29.6276 17.7507C30.4303 17.7507 31.0846 17.0976 31.0846 16.2933C31.0846 15.4891 30.4316 14.8359 29.6276 14.8359C28.8236 14.8359 28.1707 15.4891 28.1707 16.2933C28.1707 17.0976 28.8236 17.7507 29.6276 17.7507Z" />
    </>
  ),
};

export function Footer() {
  const { logo, contacts, socials, copyright, developedBy } = footerData;

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.top}`}>
        <a href={logo.href} className={styles.logo} data-reveal="left">
          <Image src="/images/logo-mark.svg" alt="" width={25} height={38} />
          <span>
            {logo.top}
            <br />
            {logo.bottom}
          </span>
        </a>

        <div className={styles.contacts}>
          {contacts.map((contact, index) => (
            <div
              className={styles.contact}
              key={contact.href}
              data-reveal=""
              style={
                { "--reveal-delay": `${index * 0.08}s` } as CSSProperties
              }
            >
              <p className={styles.contactLabel}>{contact.label}</p>
              <p className={styles.contactName}>{contact.name}</p>
              <a className={styles.contactPhone} href={contact.href}>
                {contact.phone}
              </a>
            </div>
          ))}
        </div>

        <div className={styles.socials} data-reveal="right">
          {socials.map((social) => (
            <a
              key={social.id}
              className={styles.social}
              href={social.href}
              target="_blank"
              rel="noreferrer"
              aria-label={social.label}
            >
              <svg viewBox="0 0 46 46" fill="currentColor" aria-hidden>
                {SOCIAL_ICONS[social.id]}
              </svg>
            </a>
          ))}
        </div>
      </div>

      <div className={`container ${styles.bottom}`} data-reveal="fade">
        <p>{copyright}</p>
        <a href={developedBy.href} target="_blank" rel="noreferrer">
          {developedBy.label}
        </a>
      </div>
    </footer>
  );
}
