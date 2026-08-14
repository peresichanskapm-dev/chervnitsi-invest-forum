# Add three speakers

## Assets (already generated — do not regenerate)

Cropped from the source photos to the same framing as the existing five (hair-to-chin ≈ 32% of
the frame height, face centre 26% from the top, 2:3, 1200×1800, WebP q86):

| File | Person | Face share |
|---|---|---|
| `public/images/speakers/rohozha.webp` | Яна Рогожа | 32.0% |
| `public/images/speakers/bachynskyi-taras.webp` | Тарас Бачинський | 38.4% |
| `public/images/speakers/bachynskyi-ostap.webp` | Остап Бачинський | 32.1% |

Taras' source is only 1180×2084, so a 2:3 crop is width-limited — his face lands slightly
larger than the house 32%. That is the ceiling for this source; do not try to fix it in CSS.

Each photo was opened and looked at before being tied to a name — the two Bachynskyi files are
not distinguishable from their filenames alone.

## Edit — `components/home/Speakers/Speakers.data.ts`

Append three entries to `speakersData.speakers`, after Руслан Осипенко, keeping the existing
object shape and field order:

```ts
    {
      firstName: "Яна",
      lastName: "Рогожа",
      photo: "/images/speakers/rohozha.webp",
    },
    {
      firstName: "Тарас",
      lastName: "Бачинський",
      photo: "/images/speakers/bachynskyi-taras.webp",
    },
    {
      firstName: "Остап",
      lastName: "Бачинський",
      photo: "/images/speakers/bachynskyi-ostap.webp",
    },
```

Nothing else changes. No CSS: the grid is `repeat(2, 1fr)` on mobile and `repeat(4, 1fr)` from
992px, so eight speakers fill four rows and two rows respectively with no ragged last row.

## Verify

```bash
npm run build
```

Then at 390 px and 1440 px: eight cards, names under each, and the three new faces read at the
same scale as Ющенко and Осипенко.
