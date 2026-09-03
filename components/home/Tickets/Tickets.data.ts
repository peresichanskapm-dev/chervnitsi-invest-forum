import { type TicketTierId, getTierPrices } from "@/lib/pricingSchedule";

export type TicketFeature = {
  text: string;
  /** the mockup sets the "everything from X, plus:" line in semibold */
  strong?: boolean;
  /** "none" drops the bullet (section headers like "Не входить:"), "cross" swaps it for a white ✕ (excluded items) */
  marker?: "none" | "cross";
};

export type Ticket = {
  tier: TicketTierId;
  name: string;
  description: string;
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
      tier: "businessLight",
      name: "BUSINESS LIGHT",
      description: "Доступний формат для участі у форумі та знайомства з бізнес-спільнотою.",
      cta,
      features: [
        { text: "Доступ до конференції першого дня лише з амфітеатру на 3-му поверсі театру" },
        { text: "Нетворкінг із підприємцями, інвесторами та власниками бізнесу та території проведення події" },
        { text: "Доступ до Invest Expo протягом першого та другого днів" },
        { text: "Доступ до Telegram-чату учасників події" },
        { text: "Не входить:", strong: true, marker: "none" },
        { text: "Welcome coffee під час реєстрації", marker: "cross" },
        { text: "Доступ до посадкових місць на першому поверсі театру", marker: "cross" },
      ],
    },
    {
      tier: "business",
      name: "BUSINESS",
      description: "Доступний формат для участі у головній події та знайомства з бізнес-спільнотою та інвесторами.",
      previewCount: 7,
      cta,
      features: [
        { text: "Все, що входить у Business LIGHT, а також:", strong: true },
        { text: "Доступ до конференції першого дня в зоні бізнес на першому поверсі" },
        { text: "Доступ до виступів на основній сцені" },
        { text: "Доступ до посадкових місць в основній залі (без гарантованого сидячого місця)" },
        { text: "Welcome coffee під час реєстрації" },
        { text: "Доступ до Invest Expo протягом першого та другого днів" },
        { text: "Нетворкінг із підприємцями, інвесторами та власниками бізнесу" },
        { text: "Електронний інвестиційний дайджест із проєктами 2026 року" },
        { text: "Презентації спікерів після події" },
        { text: "Загальний фотозвіт з події" },
        { text: "Не входить:", strong: true, marker: "none" },
        { text: "Гарантоване сидяче місце", marker: "cross" },
        { text: "Food Voucher", marker: "cross" },
        { text: "Afterparty", marker: "cross" },
        { text: "Другий день форуму у Вижниці", marker: "cross" },
      ],
    },
    {
      tier: "premium",
      name: "PREMIUM",
      description:
        "Повноцінна участь у Чернівці Invest Forum протягом двох днів + доступ до закритої інвестиційної екосистеми LIF Invest Media.",
      previewCount: 6,
      cta,
      features: [
        { text: "Все, що входить у Business, а також:", strong: true },
        { text: "Доступ до форуму протягом 2-х днів" },
        { text: "Гарантоване сидяче місце у Premium-зоні" },
        { text: "Повна участь у 2 днях форуму, включаючи виїзну програму 4 жовтня", strong: true },
        {
          text: "Доступ до Side Events першого дня — паралельних виступів та камерних подій на додаткових локаціях поруч із театром",
        },
        { text: "Welcome coffee" },
        { text: "Food Voucher для використання у Food Court та партнерських закладах в рамках обіду" },
        { text: "Безкоштовний коктейль-бар протягом першого дня" },
        { text: "Afterparty до Дня міста" },
        { text: "Відеозапис Lviv Invest Forum 2026 — 100+ спікерів та практичних виступів" },
        { text: "🎁 1 Expo-квиток на Lviv Invest Forum 2027 у подарунок" },
        { text: "Доступ до закритого чату Lviv Invest — спільноти з 3000+ інвесторів" },
        { text: "Виїзна програма другого дня у Вижниці:", strong: true },
        { text: "— Українські вечорниці" },
        { text: "— Традиційна буковинська кухня" },
        { text: "— Жива народна музика" },
        { text: "— Ватра" },
        { text: "— Майстер-класи" },
        { text: "— Душевний нетворкінг та Invest Fuckup Nights в камерній атмосфері" },
        { text: "Організований трансфер Чернівці → Вижниця → Чернівці" },
        {
          text: "–15% на події LIF Invest Media — Rivne Invest Forum, Lviv Invest Forum та інші інвестиційні події у 2026–2027 роках",
        },
        { text: "Не входить:", strong: true, marker: "none" },
        { text: "VIP Lounge на другому поверсі", marker: "cross" },
        { text: "Подарунки від партнерів", marker: "cross" },
        { text: "Квиток категорії Business на Lviv Invest Forum 2027 у подарунок", marker: "cross" },
        { text: "Закрита VIP-вечеря", marker: "cross" },
      ],
    },
    {
      tier: "vip",
      name: "VIP",
      description: "Максимум комфорту, близькість до спікерів та доступ до закритої VIP-програми форуму.",
      previewCount: 6,
      cta,
      features: [
        { text: "Все, що входить у Premium, а також:", strong: true },
        { text: "Закрита вечеря VIP-учасників із ТОП-спікером", strong: true },
        { text: "Fast Line реєстрація" },
        {
          text: "Місця у перших рядах перед основною сценою та можливість слухати виступи з VIP-ложі на другому поверсі",
        },
        { text: "Доступ до окремої VIP-зони зі спікерами" },
        { text: "Фуршет у VIP-зоні" },
        { text: "Shisha Bar у VIP-зоні на відкритому повітрі" },
        { text: "Wine & Whisky Bar у VIP-зоні" },
        { text: "Спеціальні знижки на проживання в готелях-партнерах" },
        { text: "Окремий чат VIP-учасників для комунікації та нетворкінгу" },
        { text: "Подарунки від партнерів заходу" },
        { text: "Камерний нетворкінг зі спікерами, інвесторами та партнерами" },
        { text: "Квиток категорії Business на Lviv Invest Forum 2027 у подарунок" },
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
