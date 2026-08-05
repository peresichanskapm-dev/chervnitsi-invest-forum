export type FooterContact = {
  label: string;
  name: string;
  phone: string;
  href: string;
};

export type FooterSocial = {
  id: "instagram";
  label: string;
  href: string;
};

export const footerData = {
  logo: {
    top: "Chernivtsi",
    bottom: "INVEST FORUM",
    href: "#hero",
  },
  // contact blocks are intentionally empty — add entries here to bring them back
  contacts: [] as FooterContact[],
  socials: [
    {
      id: "instagram",
      label: "Instagram",
      href: "https://www.instagram.com/chernivtsi_invest/",
    },
  ] satisfies FooterSocial[],
  copyright: "© 2026 Chernivtsi INVEST FORUM. All rights are reserved.",
  developedBy: {
    label: "Developed and supported by vau.agency.",
    href: "https://vau.agency/",
  },
};
