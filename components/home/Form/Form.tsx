"use client";

import { useState, useSyncExternalStore, type CSSProperties, type FormEvent } from "react";
import Image from "next/image";

import { pushToDataLayer } from "@/lib/gtm";
import { getLeadSource, getServerLeadSource, subscribeToLeadSource } from "@/lib/leadSource";
import { isPhoneComplete } from "@/lib/phoneMask";
import { usePhoneMask } from "@/lib/usePhoneMask";
import { getTrackingForForm } from "@/lib/utm";

import { formData } from "./Form.data";
import styles from "./Form.module.scss";

type FieldName = "name" | "email" | "phone";

const NAME_PATTERN = /^[\p{L}\p{M}][\p{L}\p{M}'’\- ]*$/u;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function Form() {
  const phoneMask = usePhoneMask();
  const [errors, setErrors] = useState<Partial<Record<FieldName, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitState, setSubmitState] = useState<"idle" | "success" | "error">("idle");
  /** the CTA a visitor clicked lives in sessionStorage, so it must stay empty during SSR to keep hydration matching */
  const leadSource = useSyncExternalStore(
    subscribeToLeadSource,
    getLeadSource,
    getServerLeadSource,
  );

  const validate = (name: string, email: string, phone: string) => {
    const nextErrors: Partial<Record<FieldName, string>> = {};

    if (!name) {
      nextErrors.name = formData.errors.nameRequired;
    } else if (name.length < 2) {
      nextErrors.name = formData.errors.nameMinLength;
    } else if (!NAME_PATTERN.test(name)) {
      nextErrors.name = formData.errors.nameInvalid;
    }

    if (!email) {
      nextErrors.email = formData.errors.emailRequired;
    } else if (!EMAIL_PATTERN.test(email)) {
      nextErrors.email = formData.errors.emailInvalid;
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
    const email = String(values.get("email") ?? "").trim();
    const phone = phoneMask.isComplete ? phoneMask.value : "";

    const validationErrors = validate(name, email, phoneMask.value);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const tracking = getTrackingForForm();
    const formSource = leadSource.formSource || formData.formSource;
    const ticketTitle = leadSource.ticketTitle ?? "";

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone,
          ticketTitle,
          formSource,
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
        form_source: formSource,
        ticket_title: ticketTitle,
        ...tracking,
      });

      /* brief pause so the visitor sees the success message before leaving the site */
      window.setTimeout(() => {
        window.location.href = formData.ticketCheckoutUrl;
      }, 1200);
    } catch {
      setSubmitState("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className={styles.section} id="form">
      <div className="container">
        <p className={styles.eyebrow} data-reveal="fade">
          {formData.eyebrow}
        </p>

        <div className={styles.lockup} data-reveal="left">
          <Image
            className={styles.mark}
            src="/images/logo-mark.svg"
            alt=""
            width={25}
            height={38}
          />
          <h2 className={styles.title}>
            {formData.logo.top}
            <br />
            {formData.logo.bottom}
          </h2>
        </div>

        <form className={styles.form} onSubmit={onSubmit} noValidate>
          <div className={styles.field} data-reveal="">
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

          <div className={styles.field} data-reveal="" style={{ "--reveal-delay": "0.08s" } as CSSProperties}>
            <input
              name="email"
              type="email"
              className={styles.input}
              placeholder={formData.placeholders.email}
              autoComplete="email"
              aria-label={formData.placeholders.email}
              aria-invalid={errors.email ? "true" : "false"}
            />
            {errors.email && <p className={styles.error}>{errors.email}</p>}
          </div>

          <div className={styles.field} data-reveal="" style={{ "--reveal-delay": "0.16s" } as CSSProperties}>
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

          {/* wrapper carries the reveal so its end transform can't outrank the button's hover */}
          <div
            className={styles.submitWrap}
            data-reveal=""
            style={{ "--reveal-delay": "0.24s" } as CSSProperties}
          >
            <button className={styles.submit} type="submit" disabled={isSubmitting}>
              {isSubmitting ? formData.submitting : formData.submit}
            </button>
          </div>

          {submitState !== "idle" && (
            <p
              className={submitState === "success" ? styles.success : styles.failure}
              role="status"
            >
              {submitState === "success" ? formData.submitSuccess : formData.submitError}
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
