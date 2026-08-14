# Hero → single banner image + overlaid buttons

Replace the hand-built hero composition (plate + title + tagline + theater photo + glow +
chevron decor) with one flat banner image per breakpoint, and float the two CTA buttons on
top of it, high up — right under the green plate instead of below the photo.

Assets are already generated and committed-ready. Only three source files change.

---

## 0. Assets (already done — do not regenerate)

| File | Size | Used at |
|---|---|---|
| `public/images/hero-banner.webp` | 2400×1260 (design 1200×630) | `min-width: 992px` |
| `public/images/hero-banner-mobile-v2.webp` | 860×1390 (design 430×695) | below 992px |

Notes, in case they ever need rebuilding from the Figma exports:

- Both come from the PNG renders in `~/Downloads` (`banner.png`, `iPhone 14 & 15 Pro Max - 4 (1).png`).
- The phone export carries **bogus alpha** — the grainy sky layer is stored as bright RGB at
  alpha ≈ 12. Taking straight RGB and ignoring the alpha channel blasts the grain at full
  brightness and produces grey blotches over the sky. It must be **alpha-composited onto
  `#050505`**.
- The phone export's top 48 device px (24 design px) are fully transparent status-bar padding
  and are **cropped off**, so the banner starts right under the site header.
- WebP quality 86, method 6.

---

## 1. `components/home/Hero/Hero.data.ts` — full replacement

Everything about the chevron decor, the theater photo and the split title is gone. The title,
date and tagline stay in data because they still feed the screen-reader-only `<h1>` (the
headline is now pixels, so the page would otherwise have no `h1` and no indexable title text).

```ts
export const heroData = {
  date: { day: "3-4 жовтня", year: "2026" },
  title: { top: "Chernivtsi", bottom: "Invest Forum" },
  tagline: "Місце, де відбуваються інвестиції",
  banner: {
    mobile: { src: "/images/hero-banner-mobile-v2.webp", width: 860, height: 1390 },
    desktop: { src: "/images/hero-banner.webp", width: 2400, height: 1260 },
    alt: "Chernivtsi Invest Forum, 3-4 жовтня 2026 — Чернівецький театр у світлі прожекторів",
  },
  actions: {
    partner: {
      label: "стати партнером форуму",
      href: "#partnership",
      formSource: "Hero — Стати партнером форуму",
    },
    book: {
      label: "Забронювати місце",
      href: "#tickets",
      formSource: "Hero — Забронювати місце",
    },
  },
};
```

Delete the `DecorItem` type, `decorOffset` and the `decor` array — nothing outside this folder
imports them (verified). Leave `public/images/chev-*.svg`, `hero-glow.svg`,
`hero-title-shape.svg`, `hero-dot.svg` and `hero-theater.webp` on disk; they are now unused but
harmless, and deleting them is a separate call.

---

## 2. `components/home/Hero/Hero.tsx` — full replacement

```tsx
import { LeadLink } from "@/components/ui/LeadLink/LeadLink";

import { heroData } from "./Hero.data";
import styles from "./Hero.module.scss";

export function Hero() {
  const { date, title, tagline, banner, actions } = heroData;

  return (
    <section className={styles.hero} id="hero">
      <h1 className={styles.srOnly}>
        {`${title.top} ${title.bottom} — ${tagline}. ${date.day} ${date.year}`}
      </h1>

      <div className={styles.banner}>
        <picture>
          <source
            media="(min-width: 992px)"
            srcSet={banner.desktop.src}
            width={banner.desktop.width}
            height={banner.desktop.height}
          />
          {/* eslint-disable-next-line @next/next/no-img-element -- art-directed <picture>:
              next/image cannot swap sources per breakpoint, and rendering two <Image>s would
              download both. The files are pre-optimised WebP, so there is nothing to optimise. */}
          <img
            className={styles.bannerImage}
            src={banner.mobile.src}
            width={banner.mobile.width}
            height={banner.mobile.height}
            alt={banner.alt}
            fetchPriority="high"
            decoding="async"
          />
        </picture>

        <div className={styles.actions}>
          <LeadLink
            href={actions.partner.href}
            formSource={actions.partner.formSource}
            className={styles.buttonGhost}
          >
            {actions.partner.label}
          </LeadLink>
          <LeadLink
            href={actions.book.href}
            formSource={actions.book.formSource}
            className={styles.buttonPrimary}
          >
            {actions.book.label}
          </LeadLink>
        </div>
      </div>
    </section>
  );
}
```

The `Decor` sub-component, the `px()` helper and the `next/image` import all go.

---

## 3. `components/home/Hero/Hero.module.scss` — full replacement

Every percentage below was measured off the actual exports, in the coordinate space of the
image that is on screen at that breakpoint. Do not "round them nicer".

```scss
.hero {
  position: relative;
  overflow: hidden;
  /* the header is fixed and opaque, so the banner has to start below it */
  padding-top: 7.73rem;
  background: var(--color-bg);

  &::after {
    content: "";
    display: none;
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1;
    height: 16rem;
    background: linear-gradient(
      180deg,
      rgba(5, 5, 5, 0) 0%,
      var(--color-bg) 100%
    );
    pointer-events: none;
  }
}

.srOnly {
  position: absolute;
  width: 0.1rem;
  height: 0.1rem;
  margin: -0.1rem;
  padding: 0;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
  border: 0;
}

.banner {
  position: relative;
  width: 100%;
}

@keyframes heroFade {
  from {
    opacity: 0;
  }
}

@keyframes heroRise {
  from {
    opacity: 0;
    transform: translate3d(0, 2.4rem, 0);
  }
}

/*
 * aspect-ratio matches the file that <picture> actually serves at this width, so the box is
 * correct before the bytes land — no layout shift, and no object-fit crop of the artwork.
 */
.bannerImage {
  display: block;
  width: 100%;
  height: auto;
  aspect-ratio: 860 / 1390;
  animation: heroFade 1.2s var(--ease-out-soft) both;
}

/*
 * The buttons float over the banner, positioned in percentages of it so they keep their
 * relationship to the baked-in green plate at every viewport width.
 * Mobile: the lit facade offers no calm band between 36% and 70%, so the buttons sit low
 * over the entrance cornice with ~8% bottom margin.
 */
.actions {
  position: absolute;
  z-index: 2;
  left: var(--container-gutter);
  right: var(--container-gutter);
  top: 74%;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  animation: heroRise 0.9s var(--ease-out-soft) 0.35s both;
}

.buttonGhost,
.buttonPrimary {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 5.12rem;
  padding: 0 2.16rem;
  font-size: 1.55rem;
  font-weight: 600;
  letter-spacing: -0.02em;
  text-transform: uppercase;
  transition:
    opacity 0.2s ease,
    transform 0.2s var(--ease-out-soft),
    box-shadow 0.25s ease;

  &:hover {
    opacity: 0.85;
    transform: translateY(-0.3rem);
    box-shadow: 0 1.2rem 2.4rem rgba(192, 246, 3, 0.18);
  }

  &:active {
    transform: translateY(0);
  }
}

/* opaque, not --color-surface: this button now sits on top of the photo, and 40% grey over a
   lit facade reads as a smudge */
.buttonGhost {
  background: rgba(16, 16, 16, 0.88);
  color: #ffffff;
}

.buttonPrimary {
  --brand-gradient-angle: 147deg;

  background: var(--brand-gradient);
  color: var(--color-ink);
}

@media (min-width: 992px) {
  .hero {
    padding-top: 9.33rem;

    &::after {
      display: block;
    }
  }

  .bannerImage {
    aspect-ratio: 2400 / 1260;
  }

  /* 10.5% = the left edge of the baked "CHERNIVTSI"; 70% clears the plate's lower square (65.7%) */
  .actions {
    left: 10.5%;
    right: auto;
    top: 70%;
    flex-direction: row;
    gap: 0;
  }

  .buttonGhost {
    width: 30rem;
  }

  .buttonPrimary {
    width: 24.7059rem;
  }
}
```

`padding-top` values are the real header heights, not guesses: `2rem + 3.73rem + 2rem = 7.73rem`
mobile, `3.2rem + 3.73rem + 2.4rem = 9.33rem` desktop (`Header.module.scss` paddings + the
logo mark). If the header ever changes height these two must follow.

---

## 4. Verify

```bash
npm run lint && npm run build
npm run dev
```

Check at **390, 430, 991, 992, 1440, 1920** px wide:

1. Nothing of the banner hides behind the fixed header — the top-left dark decor square is
   fully visible at every width.
2. The two buttons sit **below** the green plate and never overlap it, at every width.
3. No horizontal scrollbar (`document.documentElement.scrollWidth === window.innerWidth`).
4. Exactly one image request for the banner in the Network tab — mobile file below 992,
   desktop file at/above it. If both are requested, the `<picture>`/`<source>` order is wrong.
5. The sky is near-black, not grainy grey. Grey grainy blotches mean the straight-RGB asset
   got used.
6. `document.querySelectorAll("h1").length === 1` and its `textContent` is the full headline.

Only number to hand-tune if the client dislikes the placement: `.actions { top }` — `74%`
mobile, `70%` desktop.
