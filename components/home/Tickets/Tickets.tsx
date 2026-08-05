"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";

import { setLeadSource } from "@/lib/leadSource";

import { type Ticket, getTicketsData } from "./Tickets.data";
import styles from "./Tickets.module.scss";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/scrollbar";

type SwiperReact = typeof import("swiper/react");
type SwiperModules = typeof import("swiper/modules");

type SwiperApi = {
  Swiper: SwiperReact["Swiper"];
  SwiperSlide: SwiperReact["SwiperSlide"];
  modules: [
    SwiperModules["FreeMode"],
    SwiperModules["Scrollbar"],
    SwiperModules["Mousewheel"],
    SwiperModules["Keyboard"],
  ];
};

type CardProps = {
  ticket: Ticket;
  expandLabel: string;
  collapseLabel: string;
  index: number;
};

function TicketCard({ ticket, expandLabel, collapseLabel, index }: CardProps) {
  const [expanded, setExpanded] = useState(false);
  const isTruncated =
    Boolean(ticket.previewCount) && ticket.features.length > (ticket.previewCount ?? 0);
  const collapsed = isTruncated && !expanded;
  const visibleFeatures = collapsed
    ? ticket.features.slice(0, ticket.previewCount)
    : ticket.features;

  return (
    /* data-reveal sits on the card, not the slide: Swiper owns the slide element and
       ScrollReveal writes a permanent inline transform onto whatever it reveals */
    <article
      className={styles.card}
      data-reveal=""
      style={{ "--reveal-delay": `${Math.min(index * 0.09, 0.4)}s` } as CSSProperties}
    >
      <header className={styles.cardHeader}>
        <h3 className={styles.cardTitle}>{ticket.name}</h3>
        <p className={styles.price}>
          <span className={styles.currentPrice}>{ticket.price}</span>
          <s className={styles.oldPrice}>{ticket.oldPrice}</s>
        </p>
      </header>

      <div className={styles.divider} />

      <ul className={styles.list}>
        {visibleFeatures.map((feature) => (
          <li
            key={feature.text}
            className={feature.strong ? styles.listItemStrong : styles.listItem}
          >
            {feature.text}
          </li>
        ))}
      </ul>

      {isTruncated && (
        <button
          type="button"
          className={styles.toggle}
          onClick={() => setExpanded((value) => !value)}
        >
          {expanded ? collapseLabel : expandLabel}
        </button>
      )}

      <div className={styles.actions}>
        <a
          href={ticket.cta.href}
          className={styles.button}
          onClick={() =>
            setLeadSource({
              formSource: `Квиток — ${ticket.name}`,
              ticketTitle: ticket.name,
            })
          }
        >
          {ticket.cta.label}
        </a>
      </div>
    </article>
  );
}

export function Tickets({ dateKey }: { dateKey: string }) {
  const { title, tickets, expandLabel, collapseLabel } = getTicketsData(dateKey);
  const sectionRef = useRef<HTMLElement>(null);
  const [near, setNear] = useState(false);
  const [api, setApi] = useState<SwiperApi | null>(null);

  /* the slider only matters once the section is close to the viewport, so the Swiper chunk
     is not on the critical path for a page whose hero is the thing people actually see */
  useEffect(() => {
    if (near) return;
    const node = sectionRef.current;
    if (!node || !("IntersectionObserver" in window)) {
      setNear(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setNear(true);
          observer.disconnect();
        }
      },
      { rootMargin: "300px 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [near]);

  useEffect(() => {
    if (!near) return;
    let alive = true;
    void Promise.all([import("swiper/react"), import("swiper/modules")]).then(
      ([react, modules]) => {
        if (!alive) return;
        setApi({
          Swiper: react.Swiper,
          SwiperSlide: react.SwiperSlide,
          modules: [
            modules.FreeMode,
            modules.Scrollbar,
            modules.Mousewheel,
            modules.Keyboard,
          ],
        });
      },
    );
    return () => {
      alive = false;
    };
  }, [near]);

  const cards = tickets.map((ticket, index) => (
    <TicketCard
      key={ticket.name}
      ticket={ticket}
      expandLabel={expandLabel}
      collapseLabel={collapseLabel}
      index={index}
    />
  ));

  return (
    <section ref={sectionRef} className={styles.tickets} id="tickets">
      <h2 className={styles.title} data-reveal="fade">
        {title}
      </h2>

      <div className={`container ${styles.container}`}>
        {api ? (
          <api.Swiper
            className={styles.swiper}
            modules={api.modules}
            slidesPerView="auto"
            freeMode={{ enabled: true, momentum: true, momentumRatio: 0.9 }}
            mousewheel={{ forceToAxis: true, sensitivity: 1 }}
            keyboard={{ enabled: true, onlyInViewport: true }}
            scrollbar={{ el: `.${styles.scrollbar}`, draggable: true }}
          >
            {tickets.map((ticket, index) => (
              <api.SwiperSlide key={ticket.name} className={styles.slide}>
                {cards[index]}
              </api.SwiperSlide>
            ))}
          </api.Swiper>
        ) : (
          <div
            className={`${styles.swiper} ${styles.fallbackScroller}`}
            role="list"
            aria-label={title}
          >
            {tickets.map((ticket, index) => (
              <div key={ticket.name} className={styles.slide} role="listitem">
                {cards[index]}
              </div>
            ))}
          </div>
        )}

        <div className={styles.scrollbar} />
      </div>
    </section>
  );
}
