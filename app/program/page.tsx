import type { Metadata } from "next";

import { ProgramPage } from "@/components/program/ProgramPage";

export const metadata: Metadata = {
  title: "Програма — Chernivtsi Invest Forum",
  description: "Детальна програма Chernivtsi Invest Forum: Main Stage, Side Stage та другий день форуму.",
};

export default function Page() {
  return <ProgramPage />;
}
