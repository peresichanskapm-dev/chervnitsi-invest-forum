"use client";

import { useState, type FormEvent } from "react";

import { formData } from "@/components/home/Form/Form.data";
import { isPhoneComplete } from "@/lib/phoneMask";
import { usePhoneMask } from "@/lib/usePhoneMask";
import { getTrackingForForm } from "@/lib/utm";

import type { ProgramKey } from "./data";
import styles from "./ProgramChrome.module.scss";

const dictionary = {
  contactEyebrow: formData.eyebrow,
  name: formData.placeholders.name,
  email: formData.placeholders.email,
  phone: "+38 (0",
  submit: formData.submit,
  errors: {
    name: formData.errors.nameRequired,
    email: formData.errors.emailRequired,
    phone: formData.errors.phoneRequired,
  },
};

export function ProgramContact({ variantKey }: { variantKey: ProgramKey }) {
  const phoneMask = usePhoneMask();
  const [errors, setErrors] = useState<Partial<Record<"name" | "email" | "phone", string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const marginClass = styles[`contact_${variantKey.replace(/-/g, "_")}`] ?? styles.contact_day1_main;

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting) return;
    const values = new FormData(event.currentTarget);
    const name = String(values.get("name") ?? "").trim();
    const email = String(values.get("email") ?? "").trim();
    const nextErrors: Partial<Record<"name" | "email" | "phone", string>> = {};

    if (!name) nextErrors.name = dictionary.errors.name;
    if (!email) nextErrors.email = dictionary.errors.email;
    if (!isPhoneComplete(phoneMask.value)) nextErrors.phone = dictionary.errors.phone;
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone: phoneMask.value,
          formSource: "Форма на сторінці програми",
          ...getTrackingForForm(),
        }),
      });
      if (!response.ok) {
        throw new Error("Request failed");
      }
      event.currentTarget.reset();
      phoneMask.reset();
      window.setTimeout(() => {
        window.location.href = formData.ticketCheckoutUrl;
      }, 1200);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className={`${styles.contact} ${marginClass}`} data-reveal="">
      <div className={styles.contactContent}>
        <p className={styles.contactEyebrow}>{dictionary.contactEyebrow}</p>
        <div className={styles.contactTitle}>
          <p className={styles.contactTitleLine}>CHERNIVTSI</p>
          <p className={styles.contactTitleLine}>INVEST FORUM</p>
        </div>
      </div>
      <form className={styles.form} onSubmit={submit} noValidate>
        <label>
          <input name="name" placeholder={dictionary.name} aria-invalid={errors.name ? "true" : "false"} />
          {errors.name ? <span>{errors.name}</span> : null}
        </label>
        <label>
          <input name="email" type="email" placeholder={dictionary.email} aria-invalid={errors.email ? "true" : "false"} />
          {errors.email ? <span>{errors.email}</span> : null}
        </label>
        <label>
          <input
            name="phone"
            type="tel"
            inputMode="numeric"
            placeholder={dictionary.phone}
            aria-invalid={errors.phone ? "true" : "false"}
            {...phoneMask.bind}
          />
          {errors.phone ? <span>{errors.phone}</span> : null}
        </label>
        <button type="submit" disabled={isSubmitting}>
          {dictionary.submit}
        </button>
      </form>
    </section>
  );
}
