export type HotelPartner = {
  id: string;
  name: string;
  discount: string;
  bookingLabel: string;
  website: { display: string; href: string };
  promoCode: string;
};

export const hotelPartnersData = {
  eyebrow: "готелі-партнери",
  title: "Проживання зі знижкою",
  hotels: [
    {
      id: "victoria-deluxe",
      name: "Готель Victoria Deluxe",
      discount: "-10%",
      bookingLabel: "Забронювати номер зі знижкою -10% можна за номером телефону, вказаним на сайті",
      website: { display: "victoriadeluxehotel.com.ua", href: "https://victoriadeluxehotel.com.ua" },
      promoCode: "Інвест форум",
    },
  ] satisfies HotelPartner[],
};
