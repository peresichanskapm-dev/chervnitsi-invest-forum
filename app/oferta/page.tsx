import type { Metadata } from "next";

import { Footer } from "@/components/home/Footer/Footer";
import { Header } from "@/components/home/Header/Header";
import { Offer } from "@/components/Offer/Offer";

import styles from "./page.module.scss";

export const metadata: Metadata = {
  title: "Публічна оферта — Chernivtsi Invest Forum",
  description: "Договір публічної оферти щодо участі у заході Chernivtsi Invest Forum.",
};

export default function Page() {
  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.main}>
        <div className="container">
          <Offer />
        </div>
      </main>
      <Footer />
    </div>
  );
}
