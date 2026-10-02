import type { SinglePartnerData } from "@/components/ui/SinglePartner/SinglePartner";

export const alcoPartnersData = [
  {
    label: "Алкогольні спонсори",
    logo: {
      src: "/images/partners-jura.webp",
      alt: "Jura Single Malt Scotch Whisky",
      width: 736,
      height: 243,
    },
  },
  {
    logo: {
      src: "/images/partners-aznauri.webp",
      alt: "Aznauri — сила лева в тобі",
      width: 1171,
      height: 795,
    },
  },
  {
    logo: {
      src: "/images/partners-hetman.svg",
      alt: "Hetman — перша елітна горілка країни",
      width: 333,
      height: 248,
    },
  },
] satisfies SinglePartnerData[];
