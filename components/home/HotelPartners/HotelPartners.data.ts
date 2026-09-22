export type HotelPartner = {
  id: string;
  name: string;
  logo: { src: string; width: number; height: number; scale?: number };
  discount: string;
  bookingLabel: string;
  phone?: { display: string; href: string };
  website: { display: string; href: string };
  promoCode?: string;
};

export const hotelPartnersData = {
  eyebrow: "готелі-партнери",
  title: "Проживання зі знижкою",
  hotels: [
    {
      id: "victoria-deluxe",
      name: "Готель Victoria Deluxe",
      logo: { src: "/images/partners-victoria-deluxe.webp", width: 3434, height: 1017 },
      discount: "-10%",
      bookingLabel: "Забронювати номер зі знижкою -10% можна за номером телефону, вказаним на сайті",
      website: { display: "victoriadeluxehotel.com.ua", href: "https://victoriadeluxehotel.com.ua" },
      promoCode: "Інвест форум",
    },
    {
      id: "grand-royal",
      name: "Готель Grand Royal",
      logo: { src: "/images/partners-grand-royal-v2.webp", width: 530, height: 598, scale: 1.75 },
      discount: "-15%",
      bookingLabel: "Забронювати номер зі знижкою -15% можна за номером телефону, вказаним на сайті",
      website: { display: "grand.cv.ua", href: "https://grand.cv.ua/" },
      promoCode: "Інвест форум",
    },
    {
      id: "allure-inn",
      name: "Готель Allure Inn",
      logo: { src: "/images/partners-allure-inn.webp", width: 457, height: 248, scale: 1.5 },
      discount: "-15%",
      bookingLabel: "Забронювати номер зі знижкою -15% можна за номером телефону",
      phone: { display: "+380 (99) 500 08 22", href: "tel:+380995000822" },
      website: { display: "allureinn.com", href: "https://www.allureinn.com" },
    },
  ] satisfies HotelPartner[],
};
