/** [col, row] of every square, on the 5-cell grid a cluster is laid out on */
export const REMINDER_RING: [number, number][] = [
  [2, 0],
  [1, 1],
  [3, 1],
  [0, 2],
  [4, 2],
  [1, 3],
  [3, 3],
  [2, 4],
];

/** decor is placed against the card box, not the viewport, so it travels with the card */
export type ReminderCluster = {
  left: number;
  top: number;
  /** edge of a single square; the grid step is the same, so squares meet corner to corner */
  size: number;
};

export const reminderClusters: ReminderCluster[] = [
  { left: 813, top: -102, size: 19.101 },
  { left: -141, top: 231, size: 26.658 },
];

export const reminderPopupData = {
  /** how long a visitor has to stay on the page before the popup opens */
  delayMs: 20000,
  title: {
    lines: ["ХОЧЕТЕ ПЕРЕЙНЯТИ ДОСВІД ЛІДЕРІВ РИНКУ", "ТА ОТРИМАТИ ДОСТУП"],
    lastLine: "ДО ",
    /** rendered in lime — the only coloured run in the heading */
    lastLineAccent: "СИЛЬНОГО ОТОЧЕННЯ ІНВЕСТОРІВ?",
  },
  subtitle: "Залиште свій контакт, і наш менеджер допоможе підібрати найкращий формат участі",
  close: "Закрити",
  submit: "Надіслати",
  submitting: "Надсилаємо…",
  submitSuccess: "Дякуємо! Наш менеджер зв’яжеться з вами найближчим часом.",
  submitError: "Не вдалося надіслати заявку. Спробуйте ще раз.",
  formSource: "Попап нагадування",
};
