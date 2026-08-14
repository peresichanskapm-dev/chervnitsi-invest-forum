# Tickets slider — match the lviv-invest mechanic

Replace the native scroll-snap scroller + custom `DragScrollbar` with Swiper, configured exactly
as lviv-invest.com configures its own tickets slider.

## Where the spec comes from

lviv-invest.com runs the same stack (Next App Router + SCSS Modules + `data-reveal`), so the
mechanic was read straight out of its production bundle rather than guessed:

- `_next/static/chunks/31f607ed28e47dd9.js` — the Tickets client component
- `_next/static/chunks/6395ecc915486fd0.css` — its compiled module styles

What it does, in order:

1. `useState(false)` "near" flag. An `IntersectionObserver` on the `<section>` with
   `rootMargin: "300px 0px"` flips it to `true`; if `IntersectionObserver` is missing, it flips
   immediately.
2. Once near, `Promise.all([import("swiper/react"), import("swiper/modules")])` loads
   `Swiper`, `SwiperSlide` and the modules `[FreeMode, Scrollbar, Mousewheel, Keyboard]` into
   state.
3. Until that resolves it renders a plain flex scroller with both the `swiper` and
   `fallbackScroller` classes, so the cards are usable (and indexable) without JS.
4. `data-reveal` lives on the **card**, never on the slide — Swiper owns the slide element.

Swiper props, verbatim from their bundle:

```
slidesPerView: "auto"
freeMode:   { enabled: true, momentum: true, momentumRatio: 0.9 }
mousewheel: { forceToAxis: true, sensitivity: 1 }
keyboard:   { enabled: true, onlyInViewport: true }
scrollbar:  { el: `.${styles.scrollbar}`, draggable: true }
```

Net behaviour vs. what we have now: grab-and-drag anywhere on the cards, momentum flick instead
of hard snap, horizontal mouse wheel, arrow keys when in view, and a draggable scrollbar.

---

## 1. Dependency

```bash
npm install swiper@14.0.7
```

14.0.7 is current, has no peer dependencies, and still ships the `./react`, `./modules` and
`./css/*` subpath exports this uses.

---

## 2. `components/home/Tickets/Tickets.tsx` — full replacement

```tsx
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
```

If `<api.Swiper>` / `<api.SwiperSlide>` trips the JSX-namespace rule in this TS config,
destructure first (`const { Swiper, SwiperSlide, modules } = api;`) inside a branch and use the
capitalised locals — do not switch to `any`.

`DragScrollbar` is no longer imported here. **Keep the component** —
`components/ui/DragScrollbar/` is still used by `ScrollArea`, which Pricing depends on.

---

## 3. `components/home/Tickets/Tickets.module.scss`

Replace the `.container` / `.scroller` / `.scrollbar` block (currently lines ~17–40) with:

```scss
.container {
  position: relative;
}

/* overflow: visible is the whole trick — Swiper translates the wrapper, so the next card
   peeks past the container edge instead of being clipped at it */
.swiper {
  overflow: visible;
}

.fallbackScroller {
  display: flex;
  overflow-x: auto;
  /* `visible` computes to `auto` next to a scrolling axis, which spawns a stray vertical bar */
  overflow-y: hidden;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
}

.fallbackScroller::-webkit-scrollbar {
  display: none;
}

.scrollbar {
  height: 0.4rem;
  margin: 3.2rem 0 0;
  border-radius: 999px;

  /* doubled selector so it outranks swiper/css/scrollbar's own .swiper-scrollbar background,
     whose specificity is identical and whose import order Next does not guarantee */
  &:global(.swiper-scrollbar) {
    background: #2a2a2a;
  }

  :global(.swiper-scrollbar-drag) {
    --brand-gradient-angle: 90deg;

    border-radius: 999px;
    background: var(--brand-gradient);
  }
}
```

In `.slide`, keep every width and padding exactly as they are now (`85vw` / `max-width: 40rem`
base, `35rem` at 576px, `60rem` at 992px) and add one line so the fallback still snaps:

```scss
  scroll-snap-align: start;
```

Delete nothing else. `.card` and everything below it stays untouched.

Note the horizontal padding moves off the slider and onto the global `container` class the
component now wraps itself in — that is why `.swiper` needs no padding of its own and why the
scrollbar's old `margin: 3.2rem max(...)` collapses to `margin: 3.2rem 0 0`.

---

## 4. Verify

```bash
npm run build
npm run dev
```

At 390 px and 1440 px:

1. Cards drag by grabbing anywhere on them, and keep gliding after release (free mode momentum).
2. A horizontal wheel / trackpad swipe scrolls the row; a vertical one still scrolls the page
   (`forceToAxis`).
3. The scrollbar thumb drags, and its fill is the brand gradient on a `#2a2a2a` track.
4. Arrow keys move the row only while the section is on screen.
5. The last card can be brought fully into view — nothing is trapped past the right edge.
6. With JS disabled the cards are still there, in a scrollable row.
7. Reveal animation still runs on the cards, once each.

Do not use `npm run lint` as a gate — it fails on this repo for an unrelated pre-existing reason
(stale build output under `.claude/worktrees/`). Lint the touched files directly instead.
