import type { DecorCluster } from "@/components/ui/Decor/Decor";

export type Stat = {
  value: string;
  label: string;
};

export const statsData = {
  eyebrow: "Як це буде у цифрах",
  stats: [
    { value: "500+", label: "учасників" },
    { value: "30+", label: "спікерів" },
    { value: "40+", label: "інвестиційних проєктів" },
  ] satisfies Stat[],
  highlight: {
    value: "200+ млн $",
    label: "потенційних інвестиційних можливостей",
  },
};

export const statsDecor: DecorCluster[] = [
  { pattern: "zigzag", left: -100, top: 291, size: 86 },
  { pattern: "ring", left: 144.8, top: 463, size: 34.6 },
  { pattern: "ring", left: 393, top: 341, size: 17.3 },
  { pattern: "ring", left: 635, top: 221, size: 17.3 },
];
