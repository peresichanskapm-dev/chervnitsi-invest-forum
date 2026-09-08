"use client";

import { useCallback, useEffect, useState, type CSSProperties, type FormEvent } from "react";
import { createPortal } from "react-dom";

import { pushToDataLayer } from "@/lib/gtm";
import { isPhoneComplete } from "@/lib/phoneMask";
import { usePhoneMask } from "@/lib/usePhoneMask";
import { getTrackingForForm } from "@/lib/utm";

import { formData } from "../Form/Form.data";
import {
  REMINDER_RING,
  reminderClusters,
  reminderPopupData,
  reminderSlabs,
} from "./ReminderPopup.data";
import styles from "./ReminderPopup.module.scss";

type FieldName = "name" | "phone";

const NAME_PATTERN = /^[\p{L}\p{M}][\p{L}\p{M}'’\- ]*$/u;

/** one popup per tab session — a visitor who already dismissed it shouldn't meet it on every page load */
const SEEN_KEY = "cif:reminder-popup-seen";

const px = (value: number) => `${value / 10}rem`;

function wasSeen(): boolean {
  try {
    return window.sessionStorage.getItem(SEEN_KEY) === "1";
  } catch {
    return false;
  }
}

function markSeen(): void {
  try {
    window.sessionStorage.setItem(SEEN_KEY, "1");
  } catch {
    // Ignore storage failures (private mode, disabled storage).
  }
}

export function ReminderPopup() {
  const phoneMask = usePhoneMask();
  const [isOpen, setIsOpen] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<FieldName, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitState, setSubmitState] = useState<"idle" | "success" | "error">("idle");

  const close = useCallback(() => setIsOpen(false), []);

  useEffect(() => {
    if (wasSeen()) {
      return;
    }

    const timer = window.setTimeout(() => {
      markSeen();
      setIsOpen(true);
      pushToDataLayer({ event: "reminder_popup_shown", form_source: reminderPopupData.formSource });
    }, reminderPopupData.delayMs);

    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, close]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

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
      /* see SpeakerModal: "instant" keeps html's smooth scrolling from swallowing the restore */
      window.scrollTo({ top: scrollY, left: 0, behavior: "instant" });
    };
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  const validate = (name: string, phone: string) => {
    const nextErrors: Partial<Record<FieldName, string>> = {};

    if (!name) {
      nextErrors.name = formData.errors.nameRequired;
    } else if (name.length < 2) {
      nextErrors.name = formData.errors.nameMinLength;
    } else if (!NAME_PATTERN.test(name)) {
      nextErrors.name = formData.errors.nameInvalid;
    }

    if (!phone) {
      nextErrors.phone = formData.errors.phoneRequired;
    } else if (!isPhoneComplete(phone)) {
      nextErrors.phone = formData.errors.phoneIncomplete;
    }

    return nextErrors;
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitState("idle");
    setErrors({});

    const form = event.currentTarget;
    const values = new FormData(form);
    const name = String(values.get("name") ?? "").trim();

    const validationErrors = validate(name, phoneMask.value);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const tracking = getTrackingForForm();

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone: phoneMask.value,
          formSource: reminderPopupData.formSource,
          ...tracking,
        }),
      });

      if (!response.ok) {
        throw new Error("Request failed");
      }

      form.reset();
      phoneMask.reset();
      setSubmitState("success");

      /* fires only once Telegram has accepted the lead, so a 502 never counts as a conversion */
      pushToDataLayer({
        event: "lead_submit",
        form_source: reminderPopupData.formSource,
        ticket_title: "",
        ...tracking,
      });

      /* long enough to read the confirmation before the popup gets out of the way */
      window.setTimeout(close, 2400);
    } catch {
      setSubmitState("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return createPortal(
    <div className={styles.overlay} onClick={close}>
      <div className={styles.stage}>
        <div className={styles.decor} aria-hidden>
          {reminderClusters.map((cluster, clusterIndex) =>
            REMINDER_RING.map(([col, row], squareIndex) => (
              <span
                key={`c${clusterIndex}-${col}-${row}`}
                className={styles.square}
                style={
                  {
                    "--decor-index": squareIndex,
                    left: px(cluster.left + col * cluster.size),
                    top: px(cluster.top + row * cluster.size),
                    width: px(cluster.size),
                    height: px(cluster.size),
                  } as CSSProperties
                }
              />
            )),
          )}

          {reminderSlabs.map((slab, index) => (
            <span
              key={`s${index}`}
              className={styles.slab}
              style={
                {
                  "--decor-index": index,
                  left: px(slab.left),
                  top: px(slab.top),
                  width: px(slab.width),
                  height: px(slab.height),
                } as CSSProperties
              }
            />
          ))}
        </div>

        <div
          className={styles.card}
          role="dialog"
          aria-modal="true"
          aria-label={reminderPopupData.title}
          onClick={(event) => event.stopPropagation()}
        >
          <button
            type="button"
            className={styles.close}
            aria-label={reminderPopupData.close}
            onClick={close}
          >
            <span />
            <span />
          </button>

          <h2 className={styles.title}>{reminderPopupData.title}</h2>
          <p className={styles.subtitle}>{reminderPopupData.subtitle}</p>
          <span className={styles.divider} aria-hidden />

          <form className={styles.fields} onSubmit={onSubmit} noValidate>
            <div className={styles.field}>
              <input
                name="name"
                type="text"
                className={styles.input}
                placeholder={formData.placeholders.name}
                autoComplete="name"
                aria-label={formData.placeholders.name}
                aria-invalid={errors.name ? "true" : "false"}
              />
              {errors.name && <p className={styles.error}>{errors.name}</p>}
            </div>

            <div className={styles.field}>
              <input
                name="phone"
                type="tel"
                inputMode="numeric"
                autoComplete="tel"
                className={styles.input}
                aria-label="Телефон"
                aria-invalid={errors.phone ? "true" : "false"}
                {...phoneMask.bind}
              />
              {errors.phone && <p className={styles.error}>{errors.phone}</p>}
            </div>

            <button className={styles.submit} type="submit" disabled={isSubmitting}>
              {isSubmitting ? reminderPopupData.submitting : reminderPopupData.submit}
            </button>

            {submitState !== "idle" && (
              <p
                className={submitState === "success" ? styles.success : styles.failure}
                role="status"
              >
                {submitState === "success"
                  ? reminderPopupData.submitSuccess
                  : reminderPopupData.submitError}
              </p>
            )}
          </form>
        </div>
      </div>
    </div>,
    document.body,
  );
}
