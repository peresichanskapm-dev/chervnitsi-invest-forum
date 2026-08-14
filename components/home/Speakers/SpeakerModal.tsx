"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";

import type { Speaker } from "./Speakers.data";
import styles from "./SpeakerModal.module.scss";

type SpeakerModalProps = {
  speakers: Speaker[];
  index: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
};

/* the two arrow paths are Figma's exact vector data (CaretLeft / CaretRight) */
const CARET_LEFT_PATH =
  "M8.17106 12.3859L14.0037 17.8402C14.0579 17.8908 14.1223 17.931 14.1931 17.9585C14.2639 17.9859 14.3398 18 14.4164 18C14.493 18 14.5689 17.9859 14.6397 17.9585C14.7105 17.931 14.7749 17.8908 14.8291 17.8402C14.8833 17.7895 14.9262 17.7293 14.9556 17.6631C14.9849 17.5969 15 17.5259 15 17.4543C15 17.3826 14.9849 17.3116 14.9556 17.2454C14.9262 17.1792 14.8833 17.1191 14.8291 17.0684L9.40832 12L14.8291 6.93162C14.9385 6.82928 15 6.69047 15 6.54573C15 6.40099 14.9385 6.26218 14.8291 6.15984C14.7196 6.0575 14.5712 6 14.4164 6C14.2616 6 14.1132 6.0575 14.0037 6.15984L8.17106 11.6141C8.11683 11.6648 8.07381 11.7249 8.04446 11.7911C8.01511 11.8573 8 11.9283 8 12C8 12.0717 8.01511 12.1427 8.04446 12.2089C8.07381 12.2751 8.11683 12.3352 8.17106 12.3859Z";
const CARET_RIGHT_PATH =
  "M15.8289 12.3859L9.99625 17.8402C9.94206 17.8908 9.87773 17.931 9.80692 17.9585C9.73612 17.9859 9.66023 18 9.58359 18C9.50695 18 9.43107 17.9859 9.36026 17.9585C9.28946 17.931 9.22512 17.8908 9.17093 17.8402C9.11674 17.7895 9.07375 17.7293 9.04442 17.6631C9.01509 17.5969 9 17.5259 9 17.4543C9 17.3826 9.01509 17.3116 9.04442 17.2454C9.07375 17.1792 9.11674 17.1191 9.17093 17.0684L14.5917 12L9.17093 6.93162C9.06149 6.82928 9 6.69047 9 6.54573C9 6.40099 9.06149 6.26218 9.17093 6.15984C9.28037 6.0575 9.42881 6 9.58359 6C9.73837 6 9.88681 6.0575 9.99625 6.15984L15.8289 11.6141C15.8832 11.6648 15.9262 11.7249 15.9555 11.7911C15.9849 11.8573 16 11.9283 16 12C16 12.0717 15.9849 12.1427 15.9555 12.2089C15.9262 12.2751 15.8832 12.3352 15.8289 12.3859Z";

export function SpeakerModal({ speakers, index, onClose, onNavigate }: SpeakerModalProps) {
  const speaker = speakers[index];
  const prevIndex = (index - 1 + speakers.length) % speakers.length;
  const nextIndex = (index + 1) % speakers.length;

  useEffect(() => {
    const { documentElement: root, body } = document;
    const scrollY = window.scrollY;

    root.style.overflow = "hidden";
    body.style.position = "fixed";
    body.style.top = `${-scrollY}px`;
    body.style.left = "0";
    body.style.right = "0";
    body.style.width = "100%";

    return () => {
      root.style.overflow = "";
      body.style.position = "";
      body.style.top = "";
      body.style.left = "";
      body.style.right = "";
      body.style.width = "";
      window.scrollTo(0, scrollY);
    };
  }, []);

  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowLeft") onNavigate(prevIndex);
      if (event.key === "ArrowRight") onNavigate(nextIndex);
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose, onNavigate, prevIndex, nextIndex]);

  return createPortal(
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(event) => event.stopPropagation()}>
        <button type="button" className={styles.close} aria-label="Закрити" onClick={onClose}>
          <span />
          <span />
        </button>

        <div className={styles.photo}>
          <Image
            src={speaker.photo}
            alt={`${speaker.firstName} ${speaker.lastName}`}
            fill
            sizes="(min-width: 992px) 50vw, 100vw"
            style={{ objectFit: "cover", objectPosition: "50% 18%" }}
            priority
          />
        </div>

        <div className={styles.content}>
          <h3 className={styles.name}>
            {speaker.firstName} {speaker.lastName}
          </h3>
          {speaker.description ? <p className={styles.description}>{speaker.description}</p> : null}

          <div className={styles.nav}>
            <button type="button" className={styles.navButton} onClick={() => onNavigate(prevIndex)}>
              <span className={styles.caret} aria-hidden>
                <svg viewBox="0 0 24 24" fill="none">
                  <path d={CARET_LEFT_PATH} fill="var(--color-ink)" />
                </svg>
              </span>
              <span>
                {speakers[prevIndex].firstName} {speakers[prevIndex].lastName}
              </span>
            </button>

            <button
              type="button"
              className={`${styles.navButton} ${styles.navButtonNext}`}
              onClick={() => onNavigate(nextIndex)}
            >
              <span>
                {speakers[nextIndex].firstName} {speakers[nextIndex].lastName}
              </span>
              <span className={styles.caret} aria-hidden>
                <svg viewBox="0 0 24 24" fill="none">
                  <path d={CARET_RIGHT_PATH} fill="var(--color-ink)" />
                </svg>
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}
