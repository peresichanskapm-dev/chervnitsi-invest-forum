export const PRICING_TIME_ZONE = "Europe/Kyiv";

const NBSP = " ";

export type TicketTierId = "businessLight" | "business" | "premium" | "vip";

export const PRICING_COLUMNS: ReadonlyArray<{ tierId: TicketTierId; label: string }> = [
  { tierId: "businessLight", label: "BUSINESS LIGHT" },
  { tierId: "business", label: "BUSINESS" },
  { tierId: "premium", label: "PREMIUM" },
  { tierId: "vip", label: "VIP" },
];

type PricingPhase = {
  id: string;
  phase: string;
  /** Kyiv date (YYYY-MM-DD) the phase starts on; null = no lower bound. A phase runs until the next one starts. */
  startDate: string | null;
  /** printed verbatim in the table — the design's own wording, which is not always derivable from startDate */
  date: string;
  prices: Record<TicketTierId, number>;
};

const PRICING_PHASES: ReadonlyArray<PricingPhase> = [
  {
    id: "main-price",
    phase: "Main Price",
    startDate: null,
    date: "02.09.26 - 06.09.26",
    prices: { businessLight: 4200, business: 6900, premium: 16900, vip: 26900 },
  },
  {
    id: "lazy-owls",
    phase: "Lazy Owls",
    startDate: "2026-09-07",
    date: "07.09.26 - 20.09.26",
    prices: { businessLight: 5200, business: 7900, premium: 17900, vip: 27900 },
  },
  {
    id: "last-chance",
    phase: "Last Chance",
    startDate: "2026-09-21",
    date: "21.09.26 - 27.09.26",
    prices: { businessLight: 5900, business: 8900, premium: 18900, vip: 28900 },
  },
  {
    id: "final-week",
    phase: "Final Week",
    startDate: "2026-09-28",
    date: "28.09.26 - 02.10.26",
    prices: { businessLight: 6200, business: 9900, premium: 19900, vip: 30900 },
  },
  {
    id: "event-price",
    phase: "Event Price",
    startDate: "2026-10-03",
    date: "03.10.2026",
    prices: { businessLight: 7900, business: 10500, premium: 21900, vip: 42700 },
  },
];

export type PricingRow = {
  id: string;
  phase: string;
  date: string;
  values: string[];
  highlight: boolean;
  blur: boolean;
  isActive: boolean;
};

export type TierPrice = {
  price: string;
  oldPrice: string;
};

function formatNumber(value: number): string {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, NBSP);
}

/**
 * Resolve "today" in Kyiv time. Call this on the server and thread the result
 * down — deriving it inside a client component makes the first render disagree
 * with the server one.
 */
export function getPricingDateKey(date: Date = new Date()): string {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: PRICING_TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(date);

  const year = parts.find((part) => part.type === "year")?.value;
  const month = parts.find((part) => part.type === "month")?.value;
  const day = parts.find((part) => part.type === "day")?.value;

  if (!year || !month || !day) {
    throw new Error("Failed to resolve pricing date key.");
  }

  return `${year}-${month}-${day}`;
}

export function getActivePhaseIndex(dateKey: string = getPricingDateKey()): number {
  let activeIndex = 0;

  PRICING_PHASES.forEach((phase, index) => {
    if (phase.startDate && phase.startDate <= dateKey) {
      activeIndex = index;
    }
  });

  return activeIndex;
}

export function getPricingRows(dateKey: string = getPricingDateKey()): PricingRow[] {
  const activeIndex = getActivePhaseIndex(dateKey);

  return PRICING_PHASES.map((phase, index) => ({
    id: phase.id,
    phase: phase.phase,
    date: phase.date,
    values: PRICING_COLUMNS.map(({ tierId }) => formatNumber(phase.prices[tierId])),
    highlight: index === activeIndex,
    blur: index < activeIndex,
    isActive: index === activeIndex,
  }));
}

export function getTierPrices(dateKey: string = getPricingDateKey()): Record<TicketTierId, TierPrice> {
  const activePhase = PRICING_PHASES[getActivePhaseIndex(dateKey)];
  const lastPhase = PRICING_PHASES[PRICING_PHASES.length - 1];

  return PRICING_COLUMNS.reduce<Record<TicketTierId, TierPrice>>(
    (accumulator, { tierId }) => {
      accumulator[tierId] = {
        price: `${formatNumber(activePhase.prices[tierId])}₴`,
        oldPrice: `${formatNumber(lastPhase.prices[tierId])}₴`,
      };

      return accumulator;
    },
    {} as Record<TicketTierId, TierPrice>,
  );
}
