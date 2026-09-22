import { SinglePartner } from "@/components/ui/SinglePartner/SinglePartner";

import { energyPartnerData } from "./EnergyPartner.data";

export function EnergyPartner() {
  return <SinglePartner {...energyPartnerData} />;
}
