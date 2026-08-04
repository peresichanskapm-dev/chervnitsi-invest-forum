export type NavLink = {
  label: string;
  href: string;
};

export const headerData = {
  logo: {
    top: "Chernivtsi",
    bottom: "INVEST FORUM",
    href: "#hero",
  },
  nav: [
    { label: "про подію", href: "#about" },
    { label: "програма", href: "#program" },
    { label: "спікери", href: "#speakers" },
    { label: "квитки", href: "#tickets" },
    { label: "графік підвищення цін", href: "#price-schedule" },
  ] satisfies NavLink[],
};
