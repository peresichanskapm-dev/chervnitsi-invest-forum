export type DecorItem = {
  src: string;
  /** position of the decor box inside the 1408-wide hero canvas, in px */
  left: number;
  top: number;
  /** size of the square box the rotated glyph is centred in */
  box: number;
  /** unrotated glyph size */
  width: number;
  height: number;
};

/** the design draws the same chevron field twice, the second copy nudged by this offset */
export const decorOffset = { x: -12.86, y: 15.88 };

export const decor: DecorItem[] = [
  { src: "/images/chev-a.svg", left: 449.5, top: 532.84, box: 106.034, width: 74.493, height: 75.461 },
  { src: "/images/chev-b.svg", left: 543.77, top: 532.84, box: 106.032, width: 74.491, height: 75.461 },
  { src: "/images/chev-half.svg", left: 450.1, top: 485.39, box: 78.864, width: 37.775, height: 73.755 },
  { src: "/images/chev-c.svg", left: 923.33, top: 109.41, box: 106.034, width: 74.492, height: 75.463 },
  { src: "/images/chev-d.svg", left: 850.98, top: 0, box: 106.033, width: 74.492, height: 75.462 },
  { src: "/images/chev-e.svg", left: 609.21, top: 0, box: 106.034, width: 74.492, height: 75.463 },
  { src: "/images/chev-half2.svg", left: 569.88, top: 0, box: 80.072, width: 37.775, height: 75.463 },
  { src: "/images/chev-f.svg", left: 1232.15, top: 0, box: 106.035, width: 74.493, height: 75.463 },
  { src: "/images/chev-g.svg", left: 275.68, top: 532.66, box: 106.032, width: 74.491, height: 75.461 },
  { src: "/images/chev-half3.svg", left: 118.12, top: 532.66, box: 80.069, width: 37.773, height: 75.461 },
];

export const heroData = {
  date: { day: "3-4 жовтня", year: "2026" },
  title: { top: "Chernivtsi", bottom: "INVEST FORUM" },
  tagline: "Місце, де відбуваються інвестиції",
  photo: {
    src: "/images/hero-theater.webp",
    alt: "Чернівецький театр у світлі прожекторів",
  },
  actions: {
    partner: {
      label: "стати партнером форуму",
      href: "#partnership",
      formSource: "Hero — Стати партнером форуму",
    },
    book: {
      label: "Забронювати місце",
      href: "#tickets",
      formSource: "Hero — Забронювати місце",
    },
  },
};
