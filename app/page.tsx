import { About } from "@/components/home/About/About";
import { AutoPartner } from "@/components/home/AutoPartner/AutoPartner";
import { EnergyPartner } from "@/components/home/EnergyPartner/EnergyPartner";
import { EventPartner } from "@/components/home/EventPartner/EventPartner";
import { FlowerPartner } from "@/components/home/FlowerPartner/FlowerPartner";
import { Footer } from "@/components/home/Footer/Footer";
import { Form } from "@/components/home/Form/Form";
import { GeneralPartner } from "@/components/home/GeneralPartner/GeneralPartner";
import { Header } from "@/components/home/Header/Header";
import { Hero } from "@/components/home/Hero/Hero";
import { HotelPartners } from "@/components/home/HotelPartners/HotelPartners";
import { InvestExpo } from "@/components/home/InvestExpo/InvestExpo";
import { InvestPartner } from "@/components/home/InvestPartner/InvestPartner";
import { MediaPartners } from "@/components/home/MediaPartners/MediaPartners";
import { Partnership } from "@/components/home/Partnership/Partnership";
import { PremiumPartner } from "@/components/home/PremiumPartner/PremiumPartner";
import { Pricing } from "@/components/home/Pricing/Pricing";
import { Program } from "@/components/home/Program/Program";
import { ProgramBanner } from "@/components/home/ProgramBanner/ProgramBanner";
import { ReminderPopup } from "@/components/home/ReminderPopup/ReminderPopup";
import { Speakers } from "@/components/home/Speakers/Speakers";
import { SpeakersBanner } from "@/components/home/SpeakersBanner/SpeakersBanner";
import { Stats } from "@/components/home/Stats/Stats";
import { Tickets } from "@/components/home/Tickets/Tickets";
import { TitlePartner } from "@/components/home/TitlePartner/TitlePartner";
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
        <ProgramBanner />
        <Pricing dateKey={dateKey} />
        <GeneralPartner />
        <TitlePartner />
        <EnergyPartner />
        <InvestPartner />
        <PremiumPartner />
        <InvestExpo />
        <AutoPartner />
        <FlowerPartner />
        <EventPartner />
        <MediaPartners />
        <HotelPartners />
        <Form />
      </main>
      <Footer />
      <ReminderPopup />
    </>
  );
}
