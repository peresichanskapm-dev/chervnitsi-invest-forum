import { type TicketTierId, getTierPrices } from "@/lib/pricingSchedule";

export type TicketFeature = {
  text: string;
  /** the mockup sets the "everything from X, plus:" line in semibold */
  strong?: boolean;
};

export type Ticket = {
  tier: TicketTierId;
  name: string;
  price: string;
  oldPrice: string;
  features: TicketFeature[];
  /** how many features a collapsed card shows; omit to always show all of them */
  previewCount?: number;
  cta: { label: string; href: string };
};

const cta = { label: "Купити квиток", href: "#form" };

const ticketsContent = {
  title: "квитки",
  tickets: [
    {
      tier: "business",
      name: "BUSINESS",
      cta,
      features: [
        { text: "Доступ до конференції першого дня" },
        { text: "Відвідування всіх відкритих виступів" },
        { text: "Welcome coffee" },
        { text: "Доступ до Invest Expo" },
        { text: "Нетворкінг із підприємцями, інвесторами та власниками бізнесу" },
        { text: "Telegram-спільнота форуму" },
        { text: "Бізнес-знайомства серед 500+ учасників" },
      ],
    },
    {
      tier: "premium",
      name: "PREMIUM",
      previewCount: 6,
      cta,
      features: [
        { text: "Все, що входить у Business, а також:", strong: true },
        { text: "Доступ до форуму протягом 2-х днів" },
        { text: "Гарантовані сидячі місця у Premium-зоні" },
        { text: "Fast Check-in" },
        { text: "Side Events першого дня" },
        { text: "Welcome coffee" },
        { text: "Food Voucher для використання у Food Court та партнерських закладах в рамках обіду" },
        { text: "Безкоштовний коктейль-бар протягом першого дня" },
        { text: "Afterparty до Дня міста" },
        { text: "Поїздка у автентичну Вижницю" },
        { text: "— Українські вечорниці" },
        { text: "— Традиційна буковинська кухня" },
        { text: "— Жива народна музика" },
      ],
    },
    {
      tier: "vip",
      name: "VIP",
      previewCount: 6,
      cta,
      features: [
        { text: "Все, що входить у Premium, а також:", strong: true },
        { text: "Fast Line реєстрація" },
        { text: "Місця у перших рядах" },
        { text: "Доступ до VIP Lounge зі спікерами та інвесторами" },
        { text: "VIP Lounge протягом форуму" },
        { text: "Постійний фуршет у VIP Lounge" },
        { text: "Авторські коктейлі без обмежень" },
        { text: "VIP-зона з кальянами" },
        { text: "Пріоритетний доступ до інвест-пітчів" },
        { text: "Закритий VIP-захід другого дня на березі річки з вечерею" },
        { text: "Камерний нетворкінг зі спікерами, інвесторами та партнерами" },
        { text: "Подарунковий Box від партнерів" },
      ],
    },
  ],
  expandLabel: "Відкрити більше...",
  collapseLabel: "Згорнути",
} satisfies {
  title: string;
  tickets: Omit<Ticket, "price" | "oldPrice">[];
  expandLabel: string;
  collapseLabel: string;
};

/** prices come from the pricing schedule so cards and the schedule table can never disagree */
export function getTicketsData(dateKey: string) {
  const prices = getTierPrices(dateKey);

  return {
    ...ticketsContent,
    tickets: ticketsContent.tickets.map((ticket) => ({
      ...ticket,
      ...prices[ticket.tier],
    })) satisfies Ticket[],
  };
}
