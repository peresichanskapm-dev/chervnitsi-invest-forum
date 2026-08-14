# Partnership photo — zoom in on the stage, mobile only

The `object-fit: cover` fix framed the photo correctly, but on a phone the whole hall is squeezed
into ~390px and the stage reads as a small bright smear.

## Why `transform`, not width/height

The `<Image fill>` element carries next/image's own inline
`position: absolute; inset: 0; width: 100%; height: 100%`. Inline styles win over a stylesheet,
so growing the element with `width`/`height` in the module is not an option. `transform` and
`object-position` are not set inline, so those are the knobs that actually work.

`.section` is already `overflow: hidden`, so the scaled image is clipped by the section.

## Values

Simulated against a 390×430 section — the scale/origin pair below keeps the speaker, the branded
LED screen and the front rows of the crowd all in frame. At 1.6 and above the screen's wordmark
starts getting cut at the edges, so 1.4 is the ceiling worth taking.

## Fix — `components/home/Partnership/Partnership.module.scss`

Base (mobile) `.photo` becomes:

```scss
/* cover, never fill: the box is sized by the copy inside the section, so `fill` made the
   image's aspect ratio a function of the text length and the browser zoom */
.photo {
  object-fit: cover;
  object-position: 50% 50%;
  /* the hall is too wide to read at phone width — push in on the stage. Origin above centre
     because the stage sits in the upper half and the crowd should stay in frame below it. */
  transform: scale(1.4);
  transform-origin: 50% 30%;
}
```

And inside the existing `@media (min-width: 992px)` block, next to the `.veil` override, reset
it — desktop is wide enough to show the room as shot:

```scss
  .photo {
    transform: none;
  }
```

## Fix — `components/home/Partnership/Partnership.tsx`

`sizes="100vw"` now under-describes the mobile case: the element is painted 1.4× wider than the
viewport, so the browser would pick a source one step too small. Change the one prop:

```tsx
          sizes="(max-width: 991px) 140vw, 100vw"
```

Nothing else in either file changes.

## Verify

```bash
npm run build
npm run dev
```

1. At 390px the speaker and the branded screen are clearly readable, with crowd still visible
   below — not a wall of heads, not a cropped wordmark.
2. At 1440px the framing is exactly as it is now (the transform is off above 992px).
3. Nothing spills outside the section at any width — no horizontal scrollbar.
4. Resize slowly across the 992px breakpoint: the swap is a step change in zoom, not a jump in
   the image's proportions.
