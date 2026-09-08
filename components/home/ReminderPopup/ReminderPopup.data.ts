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

export type ReminderSlab = {
  left: number;
  top: number;
  width: number;
  height: number;
};

export const reminderClusters: ReminderCluster[] = [
  { left: 479, top: -178, size: 16.3 },
  { left: 835, top: -75, size: 19.1 },
  { left: -68, top: 331, size: 24.6 },
];

export const reminderSlabs: ReminderSlab[] = [
  { left: -80, top: -57, width: 60, height: 57 },
  { left: 937, top: 111, width: 60, height: 57 },
  { left: 880, top: 168, width: 60, height: 57 },
  { left: -124, top: 197, width: 60, height: 57 },
  { left: 853, top: 393, width: 114.4, height: 57.2 },
];

export const reminderPopupData = {
  /** how long a visitor has to stay on the page before the popup opens */
  delayMs: 20000,
  title: "Хочете стати партнером",
  subtitle: "Залиште свій контакт, і наш менеджер зв’яжеться з вами",
  close: "Закрити",
  submit: "Надіслати",
  submitting: "Надсилаємо…",
  submitSuccess: "Дякуємо! Наш менеджер зв’яжеться з вами найближчим часом.",
  submitError: "Не вдалося надіслати заявку. Спробуйте ще раз.",
  formSource: "Попап — Хочете стати партнером",
};
