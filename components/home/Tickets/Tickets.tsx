"use client";

import { useRef, useState, type CSSProperties } from "react";

import { DragScrollbar } from "@/components/ui/DragScrollbar/DragScrollbar";
import { setLeadSource } from "@/lib/leadSource";

import { type Ticket, getTicketsData } from "./Tickets.data";
import styles from "./Tickets.module.scss";

type CardProps = {
  ticket: Ticket;
  expandLabel: string;
  collapseLabel: string;
};

function TicketCard({ ticket, expandLabel, collapseLabel }: CardProps) {
  const [expanded, setExpanded] = useState(false);
  const isTruncated =
    Boolean(ticket.previewCount) && ticket.features.length > (ticket.previewCount ?? 0);
  const collapsed = isTruncated && !expanded;
  const visibleFeatures = collapsed
    ? ticket.features.slice(0, ticket.previewCount)
    : ticket.features;

  return (
    <article className={styles.card}>
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
  const scrollerRef = useRef<HTMLDivElement>(null);

  return (
    <section className={styles.tickets} id="tickets">
      <h2 className={styles.title} data-reveal="fade">
        {title}
      </h2>

      <div className={styles.container}>
        <div ref={scrollerRef} className={styles.scroller} role="list" aria-label={title}>
          {tickets.map((ticket, index) => (
            <div
              key={ticket.name}
              className={styles.slide}
              role="listitem"
              data-reveal=""
              style={{ "--reveal-delay": `${index * 0.09}s` } as CSSProperties}
            >
              <TicketCard
                ticket={ticket}
                expandLabel={expandLabel}
                collapseLabel={collapseLabel}
              />
            </div>
          ))}
        </div>

        <DragScrollbar targetRef={scrollerRef} className={styles.scrollbar} />
      </div>
    </section>
  );
}
