import { About } from "@/components/home/About/About";
import { AutoPartner } from "@/components/home/AutoPartner/AutoPartner";
import { EventPartner } from "@/components/home/EventPartner/EventPartner";
import { Footer } from "@/components/home/Footer/Footer";
import { Form } from "@/components/home/Form/Form";
import { GeneralPartner } from "@/components/home/GeneralPartner/GeneralPartner";
import { Header } from "@/components/home/Header/Header";
import { Hero } from "@/components/home/Hero/Hero";
import { HotelPartners } from "@/components/home/HotelPartners/HotelPartners";
import { InvestExpo } from "@/components/home/InvestExpo/InvestExpo";
import { Partnership } from "@/components/home/Partnership/Partnership";
import { Pricing } from "@/components/home/Pricing/Pricing";
import { Program } from "@/components/home/Program/Program";
import { Speakers } from "@/components/home/Speakers/Speakers";
import { SpeakersBanner } from "@/components/home/SpeakersBanner/SpeakersBanner";
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
        <SpeakersBanner />
        <Partnership />
        <Tickets dateKey={dateKey} />
        <Program />
        <Pricing dateKey={dateKey} />
        <GeneralPartner />
        <EventPartner />
        <AutoPartner />
        <InvestExpo />
        <HotelPartners />
        <Form />
      </main>
      <Footer />
    </>
  );
}
