"use client";

import { useEffect, useState, type CSSProperties } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";

import { headerData } from "./Header.data";
import styles from "./Header.module.scss";

function Logo({ className }: { className?: string }) {
  const { logo } = headerData;

  return (
    <a href={logo.href} className={className}>
      <Image src="/images/logo-mark.svg" alt="" width={25} height={38} />
      <span>
        {logo.top}
        <br />
        {logo.bottom}
      </span>
    </a>
  );
}

/** must match the .overlay exit animation in Header.module.scss */
const CLOSE_DURATION = 240;

export function Header() {
  const [open, setOpen] = useState(false);
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!closing) return;

    const timer = window.setTimeout(() => {
      setOpen(false);
      setClosing(false);
    }, CLOSE_DURATION);

    return () => window.clearTimeout(timer);
  }, [closing]);

  const close = () => setClosing(true);

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Logo className={styles.logo} />

        <nav className={styles.nav}>
          <ul className={styles.navList}>
            {headerData.nav.map((link) => (
              <li key={link.href}>
                <a href={link.href} className={styles.navLink}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <button
          type="button"
          className={styles.burger}
          aria-label="Меню"
          aria-expanded={open}
          onClick={() => setOpen(true)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {/* portal: the menu must stay viewport-fixed even if an ancestor gains transform/filter */}
      {open &&
        createPortal(
          <div className={`${styles.overlay} ${closing ? styles.overlayClosing : ""}`}>
            <div className={styles.overlayTop}>
              <Logo className={styles.logo} />
              <button
                type="button"
                className={styles.close}
                aria-label="Закрити меню"
                onClick={close}
              >
                <span />
                <span />
              </button>
            </div>
            <nav>
              <ul className={styles.overlayList}>
                {headerData.nav.map((link, index) => (
                  <li
                    key={link.href}
                    style={{ "--stagger": `${index * 0.05}s` } as CSSProperties}
                  >
                    <a href={link.href} className={styles.navLink} onClick={close}>
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>,
          document.body,
        )}
    </header>
  );
}
