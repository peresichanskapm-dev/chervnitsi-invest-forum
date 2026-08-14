# Fix: ticket cards no longer stretch to the tallest one

## Cause

`swiper/css` ships these, at specificity (0,1,0):

```css
.swiper       { overflow: hidden }
.swiper-slide { display: block; height: 100% }
```

Our module classes land on the very same elements at the very same specificity
(`.Tickets_swiper__hash`, `.Tickets_slide__hash`), so which one wins is decided purely by the
order Next happens to emit the two stylesheets in — and it went Swiper's way.

Consequences: `.slide`'s `display: flex` was replaced by `display: block`, so `.card { flex: 1 }`
had no flex parent to stretch in, and `height: 100%` on a wrapper of `height: auto` resolves to
auto. Every card collapsed to its own content height. The same coin-flip also silently threatens
`overflow: visible` on `.swiper` — that is the peek effect, and it would disappear the same way.

The scrollbar rule in this file already dodges this with a doubled selector. Do the same for the
other two.

## Fix — `components/home/Tickets/Tickets.module.scss`

Replace the `.swiper` rule:

```scss
/* overflow: visible is the whole trick — Swiper translates the wrapper, so the next card
   peeks past the container edge instead of being clipped at it.
   Doubled with :global so it outranks swiper/css's own `.swiper { overflow: hidden }`,
   which has identical specificity and whose import order Next does not guarantee. */
.swiper {
  overflow: visible;

  &:global(.swiper) {
    overflow: visible;
  }
}
```

And extend `.slide` — keep every existing declaration, add the nested block:

```scss
/* display:flex (not height:100%) so an expanded card can push the row taller instead of overflowing */
.slide {
  display: flex;
  flex-shrink: 0;
  width: 85vw;
  max-width: 40rem;
  padding: 0 0.8rem;
  scroll-snap-align: start;

  /* beats swiper/css's `.swiper-slide { display: block; height: 100% }`. `height: auto` is the
     load-bearing half: the wrapper is a flex row with the default `align-items: stretch`, so an
     auto-height slide grows to the tallest one, while `height: 100%` would resolve against a
     wrapper of height auto and collapse each card onto its own content. */
  &:global(.swiper-slide) {
    display: flex;
    height: auto;
  }
}
```

Nothing else changes — not `.card`, not the widths, not `Tickets.tsx`.

This matches what lviv-invest does: its compiled `.slide` rule carries `height: auto` and its
`.card` carries `height: 100%`, for exactly this reason.

## Verify

```bash
npm run build
npm run dev
```

At 390 px and 1440 px:

1. All ticket cards are the same height — the height of the tallest — with their CTA buttons on
   one line. Check before *and* after expanding a card's feature list: expanding must grow the
   whole row, not just that one card.
2. The next card still peeks past the container's right edge (that is the `overflow: visible`
   half of the fix).
3. Drag, momentum, wheel and the scrollbar all still behave as before.
