import { SinglePartner } from "@/components/ui/SinglePartner/SinglePartner";

import { alcoPartnersData } from "./AlcoPartner.data";

export function AlcoPartner() {
  return (
    <>
      {alcoPartnersData.map((partner) => (
        <SinglePartner key={partner.logo.src} {...partner} />
      ))}
    </>
  );
}
