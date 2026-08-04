import { About } from "@/components/home/About/About";
import { Footer } from "@/components/home/Footer/Footer";
import { Form } from "@/components/home/Form/Form";
import { Header } from "@/components/home/Header/Header";
import { Hero } from "@/components/home/Hero/Hero";
import { Partnership } from "@/components/home/Partnership/Partnership";
import { Pricing } from "@/components/home/Pricing/Pricing";
import { Speakers } from "@/components/home/Speakers/Speakers";
import { Stats } from "@/components/home/Stats/Stats";
import { Tickets } from "@/components/home/Tickets/Tickets";
import { getPricingDateKey } from "@/lib/pricingSchedule";

/** the page is static, so without this the active pricing phase would freeze at build time */
export const revalidate = 3600;

export default function Home() {
  const dateKey = getPricingDateKey();

  return (
    <>
      <main>
        <Header />
        <Hero />
        <About />
        <Stats />
        <Speakers />
        <Partnership />
        <Tickets dateKey={dateKey} />
        <Pricing dateKey={dateKey} />
        <Form />
      </main>
      <Footer />
    </>
  );
}
