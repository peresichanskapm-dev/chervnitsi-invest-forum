export type MediaPartnerLogo = {
  src: string;
  alt: string;
  width: number;
  height: number;
  href?: string;
};

export const mediaPartnersData = {
  label: "Медіа партнери",
  logos: [
    {
      src: "/images/partners-vluchno-media.webp",
      alt: "Влучно.Медіа",
      width: 2082,
      height: 441,
      href: "https://vluchno.media/",
    },
    { src: "/images/partners-ua-news.webp", alt: "ua.news", width: 1200, height: 256 },
    { src: "/images/partners-shpalta.webp", alt: "Шпальта", width: 1200, height: 193 },
    { src: "/images/partners-c4.webp", alt: "C4", width: 1022, height: 999 },
    {
      src: "/images/partners-crp.webp",
      alt: "Центр розвитку підприємництва",
      width: 709,
      height: 243,
    },
    { src: "/images/partners-true-ua.webp", alt: "True UA", width: 1200, height: 375 },
    {
      src: "/images/partners-33-kanal.webp",
      alt: "33 канал — для всієї родини",
      width: 1400,
      height: 540,
    },
    { src: "/images/partners-ass.webp", alt: "АСС — медіа агентство", width: 344, height: 145 },
    {
      src: "/images/partners-molodyi-bukovynets.webp",
      alt: "Молодий буковинець",
      width: 900,
      height: 900,
    },
    {
      src: "/images/partners-citysites.svg",
      alt: "CitySites — мережі міських сайтів",
      width: 170,
      height: 106,
    },
  ] satisfies MediaPartnerLogo[],
};
