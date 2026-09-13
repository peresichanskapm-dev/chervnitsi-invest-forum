"use client";

import { Footer } from "@/components/home/Footer/Footer";
import { Header } from "@/components/home/Header/Header";
import { ReminderPopup } from "@/components/home/ReminderPopup/ReminderPopup";

import { ProgramContact } from "./ProgramChrome";
import { ProgramSchedule } from "./ProgramSchedule";
import styles from "@/app/program/page.module.scss";

export function ProgramPage() {
  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.main}>
        <ProgramSchedule afterContent={(activeKey) => <ProgramContact variantKey={activeKey} />} />
      </main>
      <Footer />
      <ReminderPopup />
    </div>
  );
}
