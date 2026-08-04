import type { DecorCluster } from "@/components/ui/Decor/Decor";

export type AboutParagraph = {
  /** lead phrase rendered in lime, ahead of the rest of the paragraph */
  highlight?: string;
  text: string;
};

export const aboutData = {
  eyebrow: "Про захід",
  /** the middle line is indented in the design — see `.titleText` */
  title: ["Chernivtsi", "Invest", "Forum"],
  paragraphs: [
    {
      text: "Це інвестиційна платформа, що об'єднує інвесторів, підприємців, девелоперів, представників держави, міжнародного бізнесу та фінансових інституцій для створення нових партнерств, презентації інвестиційних можливостей Буковини та розвитку економічної співпраці між Україною та країнами Європи (Румунія, Болгарія, Молдова, Словаччина).",
    },
    {
      highlight: "Форум стане найбільшою інвестиційною подією Буковини",
      text: " та ключовою платформою для розвитку транскордонного бізнесу, залучення капіталу, реалізації масштабних інвестиційних проєктів і міжнародного партнерства.\nСаме тут підприємці знаходять інвесторів, інвестори — перспективні проєкти, а бізнес, громади та влада створюють нові можливості для розвитку регіону.",
    },
  ] satisfies AboutParagraph[],
};

/** anchored to the section bottom, since the copy height moves the top edge around */
export const aboutDecor: DecorCluster[] = [
  { pattern: "ring", left: 517, bottom: 147.5, size: 17.3 },
  { pattern: "ring", left: 753, bottom: 11.5, size: 17.3 },
];
