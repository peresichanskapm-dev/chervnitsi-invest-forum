# Round 2 — hero seam, About title, speaker crops, ticket width

Four independent fixes. Pricing table is deliberately **not** touched — on desktop its grid
already fills the container (`1fr` columns), and the mobile horizontal scroll stays as designed.

---

## 1. Dark gradient at the bottom of the hero (mobile)

`components/home/Hero/Hero.module.scss`

The `.hero::after` fade already exists but is `display: none` until 992px, so on phones the
banner's dark-but-not-black bottom edge (luminance ≈ 20–30) butts straight into the `#050505`
About section and the seam shows.

In the base `.hero::after` rule change:

```scss
    display: block;
    height: 8rem;
```

(`display: none` → `display: block`, `height: 16rem` → `8rem`.)

Then in the `@media (min-width: 992px)` block, the `.hero` override currently reads:

```scss
  .hero {
    padding-top: 9.33rem;

    &::after {
      display: block;
    }
  }
```

Replace the nested `&::after` body with the desktop height instead of the now-redundant
display flip:

```scss
  .hero {
    padding-top: 9.33rem;

    &::after {
      height: 16rem;
    }
  }
```

The buttons stay legible: `.actions` is `z-index: 2`, the fade is `z-index: 1` with
`pointer-events: none`.

---

## 2. About title fills the container on mobile

`components/home/About/About.module.scss`

Today `.title` is `font-size: min(4rem, 8.5vw)`, which leaves a ragged right edge — the block
ends well short of the container. Size it so the **first line** (logo mark + gap +
"CHERNIVTSI") is exactly as wide as the container.

Measured, not guessed:

| Piece | Width |
|---|---|
| `CHERNIVTSI`, Inter wght 800, from the font's own `hmtx` | 6.2075 em |
| logo mark — `24.9871 × 37.3236` svg at `height: 0.74em` | 0.4954 em |
| gap | 1.6 rem (fixed) |
| **line 1** | **6.7029 em + 1.6 rem** |

So `font-size = (container width − 1.6rem) / 6.7029`. Divide by **6.75** instead, for ~1%
slack against hinting and subpixel rounding.

Lines 2 and 3 are narrower and do not constrain: `INVEST` is `1.88em` indent + 3.7676 em =
5.65 em, `FORUM` is 3.69 em.

Add to `.grid` (base rule):

```scss
  container-type: inline-size;
```

and replace the base `.title` font-size with two declarations — the first is the fallback for
browsers without container queries, which drop the second at parse time:

```scss
.title {
  display: flex;
  align-items: flex-start;
  gap: 1.6rem;
  /* line 1 is the mark (0.4954em) + gap + "CHERNIVTSI" (6.2075em at wght 800), so this
     divisor makes the wordmark span the container exactly */
  font-size: min(4rem, 8.5vw);
  font-size: min(6.4rem, calc((100cqw - 1.6rem) / 6.75));
}
```

The 6.4rem cap only bites between roughly 500px and the 992px breakpoint, where filling the
width would make the heading absurd. Delete the old
`/* the mark sits inline with the wordmark, so both have to fit a 320px screen */` comment —
the new one replaces it.

Do **not** touch the `@media (min-width: 992px)` `.title` rule; desktop is correct.

Sanity values: 426px viewport → 54.8px; 390px → 49.5px; 320px → 39.1px.

---

## 3. Tighter crops for Klichuk and Lukenchuk

`components/home/Speakers/Speakers.data.ts`

Their faces read much smaller than the other three. Measured hair-to-chin as a share of the
image height: Yuschenko 34%, Osypenko 33%, Kurysh 27% — Klichuk 17%, Lukenchuk 21%.

Two new assets are already generated, both `1200×1800`, WebP q86:

- `public/images/speakers/klichuk-v2.webp` — 98 KB
- `public/images/speakers/lukenchuk-v3.webp` — 117 KB

Both are cropped so the face lands at ~32% of the frame height with the face centre at 26% from
the top, matching the existing three. Lukenchuk's source carries `EXIF orientation 8`; the crop
bakes the rotation in, so the new file needs no orientation tag.

Change only the two `photo` fields:

```ts
      photo: "/images/speakers/klichuk-v2.webp",
```
```ts
      photo: "/images/speakers/lukenchuk-v3.webp",
```

Filenames are bumped rather than overwritten because `next/image` caches by URL, not by file
content — reusing the name serves the old bytes indefinitely.

**Keep** `klichuk.webp` and `lukenchuk.webp` on disk. They are the only full-resolution copies
in the repo and any future re-crop needs them. Do not delete them, and do not touch the other
three speaker images or any CSS in `Speakers.module.scss`.

The crop was later re-run with the face centre at 29% of the frame height instead of 26%,
because at 26% his hair sat only 2.7% below the top of the square card while the other
speakers sit at ~7%.

---

## 4. Ticket cards ~1/3 wider

`components/home/Tickets/Tickets.module.scss`

Three widths, each raised by about a third:

| Rule | From | To |
|---|---|---|
| `.slide` base `max-width` | `30rem` | `40rem` |
| `@media (min-width: 576px)` `.slide` `width` | `26.3rem` | `35rem` |
| `@media (min-width: 992px)` `.slide` `width` | `45rem` | `60rem` |

Leave `width: 85vw` in the base rule and every padding as is — `.slide` carries the horizontal
padding, so the card inside grows with it.

---

## Verify

```bash
npm run build
```

Then at 390 and 1440 px:

1. Hero → About seam has no visible step; buttons still sit above the fade.
2. The About wordmark's first line ends flush with the paragraph text below it, with no
   horizontal scrollbar at 320, 360, 390 and 430 px.
3. Klichuk and Lukenchuk read at the same face scale as Yuschenko and Osypenko in the grid.
4. Ticket cards are wider and still snap; the last card can still be scrolled fully into view.

Do not use `npm run lint` as a gate — it fails on this repo for an unrelated pre-existing
reason (stale build output under `.claude/worktrees/`). Lint touched files directly instead.
