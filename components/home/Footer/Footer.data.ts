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

export type FooterPartner = {
  label: string;
  name: string;
  icon?: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
};

export const footerData = {
  logo: {
    top: "Chernivtsi",
    bottom: "INVEST FORUM",
    href: "/#hero",
  },
  contacts: [
    {
      label: "З питань квитків:",
      name: "Валерія Глотова",
      phone: "+380 73 215 09 36",
      href: "tel:+380732150936",
    },
    {
      label: "З питань партнерства:",
      name: "Маркіян Ільчишин",
      phone: "+380 68 929 21 05",
      href: "tel:+380689292105",
    },
    {
      label: "З питань програми:",
      name: "Ірина Федяєва",
      phone: "+380 63 263 08 87",
      href: "tel:+380632630887",
    },
  ] satisfies FooterContact[],
  partners: [
    {
      label: "співорганізатор",
      // the line break is deliberate — both partner names are set two lines
      name: "Буковинський\nбізнес альянс",
    },
    {
      label: "за підтримки",
      name: "Чернівецької\nміської ради",
      icon: {
        src: "/images/chernivtsi-crest.webp",
        alt: "Герб Чернівців",
        width: 524,
        height: 693,
      },
    },
    {
      label: "за підтримки",
      name: "Чернівецької\nОВА",
      icon: {
        src: "/images/chernivtsi-oblast-crest.webp",
        alt: "Герб Чернівецької області",
        width: 1280,
        height: 1405,
      },
    },
  ] satisfies FooterPartner[],
  socials: [
    {
      id: "instagram",
      label: "Instagram",
      href: "https://www.instagram.com/chernivtsi_invest/",
    },
  ] satisfies FooterSocial[],
  copyright: "© 2026 Chernivtsi INVEST FORUM. All rights are reserved.",
  offer: {
    label: "Публічна оферта",
    href: "/oferta",
  },
  developedBy: {
    label: "Developed and supported by vau.agency.",
    href: "https://vau.agency/",
  },
};
