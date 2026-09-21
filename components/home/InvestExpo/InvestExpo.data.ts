export type InvestExpoLogo = {
  src: string;
  alt: string;
  width: number;
  height: number;
  href?: string;
};

export const investExpoData = {
  label: "Invest Expo",
  logos: [
    {
      src: "/images/partners-ideal-textile.webp",
      alt: "Ideal Textile",
      width: 1200,
      height: 357,
    },
    {
      src: "/images/partners-bude-dim.webp",
      alt: "Буде Дім",
      width: 3416,
      height: 3415,
    },
    {
      src: "/images/partners-kodra-invest.webp",
      alt: "KODRA Invest",
      width: 1443,
      height: 2256,
      href: "https://www.kodrahouse.com/",
    },
    {
      src: "/images/partners-forrest.svg",
      alt: "Forrest Trinity Resort",
      width: 1350,
      height: 275,
    },
  ] satisfies InvestExpoLogo[],
};
