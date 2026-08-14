# Fix: partnership photo distorts at any size but one

## Cause

```scss
.photo {
  position: absolute;
  left: -0.02%;
  top: -54.38%;
  width: 100%;
  height: 208.7%;
  object-fit: fill;
}
```

`object-fit: fill` stretches the bitmap to whatever box it is given, and that box is
`100% × 208.7%` **of the section**, whose height is set by the text inside it. So the image's
aspect ratio is a function of the copy length, the viewport width and the browser zoom.

There is exactly one size where it happens to look right: a 1440×460 section, where the box
works out to 1440×960. Everywhere else it warps — worst on mobile, where a ~390×430 section
gives a 390×877 box for a 1586×992 source, a 3× vertical stretch.

`Partnership.tsx` also declares `width={1440} height={960}`; the file is really **1586×992**.

## What the current geometry actually shows

Worth preserving, since the crop was chosen in Figma. With the box at `top: -54.38%` and
`height: 208.7%`, the visible slice is the middle **26.1% – 74.0%** of the image, full width.

`object-fit: cover` on a full-size box reproduces that on its own: at 1440×460 it shows
**24.4% – 75.6%**, centred. A 1.7% difference — invisible — and it stays correct at every other
size instead of stretching.

## Fix 1 — `components/home/Partnership/Partnership.tsx`

Switch the photo to `fill`. `.media` is already `position: absolute; inset: 0`, so it is a valid
positioned parent, and `fill` makes next/image emit the `inset: 0; width: 100%; height: 100%`
itself — no percentage geometry left to drift.

```tsx
        <Image
          className={styles.photo}
          src={photo.src}
          alt={photo.alt}
          fill
          sizes="100vw"
        />
```

(`width` / `height` props go away — they are mutually exclusive with `fill`, and the values
there were wrong anyway.)

## Fix 2 — `components/home/Partnership/Partnership.module.scss`

Replace the whole `.photo` rule:

```scss
/* cover, never fill: the box is sized by the copy inside the section, so `fill` made the
   image's aspect ratio a function of the text length and the browser zoom */
.photo {
  object-fit: cover;
  object-position: 50% 50%;
}
```

## Fix 3 — mobile legibility of the veil

The veil is a horizontal gradient — opaque black at the left edge, fully transparent at the
right:

```scss
background: linear-gradient(270deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.9) 100%);
```

That works on desktop, where `.content` is capped at `61rem` and sits in the dark half. On a
390px phone the copy runs the full width, into the transparent end — and the right of the frame
holds a lit LED screen (p95 luminance 128 under the text zone). So the veil never reaches zero
on mobile.

Base rule becomes:

```scss
.veil {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    270deg,
    rgba(0, 0, 0, 0.55) 0%,
    rgba(0, 0, 0, 0.92) 100%
  );
}
```

and the desktop original is restored inside the existing `@media (min-width: 992px)` block:

```scss
  .veil {
    background: linear-gradient(
      270deg,
      rgba(0, 0, 0, 0) 0%,
      rgba(0, 0, 0, 0.9) 100%
    );
  }
```

Nothing else in the file changes — not `.section`, `.container`, `.content`, `.accent`, or any
type rule.

## Verify

```bash
npm run build
npm run dev
```

1. At 390, 768, 1440 and 1920 px the crowd photo keeps its proportions — faces are not stretched
   tall or squashed wide. Compare a face near the centre across two widths.
2. Browser zoom at 67%, 100%, 150% on desktop: still undistorted at every step. This is the case
   that used to break.
3. On mobile every line of copy sits on a dark enough background to read, including the last
   words of the longest line.
4. On desktop the right side of the photo is still clean and unveiled, and the green `.accent`
   bar is where it was.
