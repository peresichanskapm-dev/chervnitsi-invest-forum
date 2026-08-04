export type Speaker = {
  firstName: string;
  lastName: string;
  photo: string;
};

const placeholderPhoto = "/images/speaker-portrait.webp";

export const speakersData = {
  eyebrow: "спікери",
  /** placeholder line-up straight from the mockup — swap names and photos when the real list lands */
  speakers: Array.from({ length: 8 }, () => ({
    firstName: "Тарас",
    lastName: "Бачинський",
    photo: placeholderPhoto,
  })) satisfies Speaker[],
};
