export type PremiumPartnerLogo = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type PremiumPartner = {
  id: string;
  logo: PremiumPartnerLogo;
  href?: string;
  title: string;
  description: string[];
};

const partners: PremiumPartner[] = [
  {
    id: "ecotech-invest",
    logo: {
      src: "/images/partners-ecotech-invest.svg",
      alt: "Ecotech Invest",
      width: 409,
      height: 97,
    },
    title: "Ecotech Invest",
    description: [
      "Ecotech Invest відкриває приватним інвесторам доступ до ринку електроенергії через співінвестування в системи зберігання енергії, забезпечуючи повний цикл — від підбору локації до трейдингу та управління активами.",
      "До проєктів уже долучилися 210+ інвесторів із капіталом понад $8 млн, а поточна III черга інвестування пропонує прогнозований дохід від 19% річних у доларах.",
    ],
  },
];

export const premiumPartnerData = {
  label: "Преміум партнер",
  partners,
};
