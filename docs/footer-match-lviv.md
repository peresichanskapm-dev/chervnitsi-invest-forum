# Footer — match the lviv-invest arrangement

Reference: `C:\Users\verni\WebstormProjects\lviv-invest\lviv-invest\components\Footer\`
(`Footer.tsx`, `Footer.module.scss`).

Only one file changes: `components/home/Footer/Footer.module.scss`. The markup already has the
same three blocks in the same order (logo → contacts → socials, then a bottom bar), so this is
geometry, not structure.

## What is being copied, and what is not

Copied: the flex arrangement, the three-stage responsive behaviour, paddings, gaps, icon box
size, and the bottom bar's rule and rhythm.

**Not** copied, deliberately:

- their palette — icons `#11dbac`, footer `#0b0b0b`. Ours stay lime / our own tokens. Their
  `#0b0b0b` is what `--color-bg-alt` (`#0c0c0c`) already is, so that one is matched via the token
  rather than a literal.
- their logo lockup — a single 85×40 svg wordmark. Ours is a mark plus two lines of type, and
  swapping it is a different decision than "arrange the footer like theirs".
- their `space-between` on `.top` when contacts are empty. `.topCompact` (added last round) stays
  and still wins in that case — otherwise the void this footer just got rid of comes straight
  back.

## Their breakpoints, translated

They are desktop-first: base is the widest, then `max-width: 1200px`, then `max-width: 768px`.
Mobile-first, the same three states are:

| state | `.top` | `.contacts` | `.socials` |
|---|---|---|---|
| base (< 768) | column, centred, gap 3.2rem | column, gap 2rem, centred | **row**, gap 1.6rem |
| ≥ 768 | row, space-between, `align-items: center`, gap 1.6rem | row, gap 0.8rem | **column** |
| ≥ 1200 | `align-items: flex-start`, gap 2rem | row, gap 2rem | **row** |

The socials going column between 768 and 1200 and back to row at 1200 is theirs, not a mistake —
it is what keeps the icons out of the contacts' way while the row is tight.

## The edits

### `.footer`

```scss
.footer {
  padding: 0;
  background: var(--color-bg-alt);
}
```

The vertical rhythm moves onto the two rows, as theirs does.

### `.top` — base

```scss
.top {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3.2rem;
  padding: 3.2rem 0;
}
```

### `.contacts` / `.contact` type — base

Their sizes, ours by token where one exists:

```scss
.contactLabel {
  font-size: 1.4rem;
  line-height: 1.4;
  letter-spacing: -0.014rem;
  color: var(--color-text);
}

.contactName {
  font-size: 2rem;
  font-weight: 400;
  line-height: 1.3;
  text-transform: uppercase;
  color: #ffffff;
}

.contactPhone {
  font-size: 2rem;
  font-weight: 400;
  line-height: 1.3;
  text-transform: uppercase;
  color: var(--brand-lime);
}
```

`.contactPhone:hover { opacity: 0.75 }` stays as it is. Note `.contactName` drops from
`font-weight: 700` to `400` — that is theirs.

### `.socials` / `.social` — base

```scss
.socials {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.6rem;
}

.social {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 4.6rem;
  height: 4.6rem;
  padding: 0.2rem;
  color: var(--brand-lime);
  transition:
    transform 0.25s var(--ease-out-soft),
    opacity 0.2s ease;
}
```

(`4.4rem` → `4.6rem`; the hover rule and `.social svg` are unchanged.)

### `.bottom` — base

```scss
.bottom {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.8rem;
  padding: 1.6rem 0;
  border-top: 0.1rem solid #d2d2d2;
  font-size: 1.6rem;
  line-height: 1.3;
  text-align: center;
  color: var(--color-text-muted);

  a {
    display: inline-block;
    padding: 1.4rem 0;
    margin: -1.4rem 0;
    transition: color 0.2s ease;

    &:hover {
      color: var(--brand-lime);
    }
  }
}
```

`margin-top: 3.2rem` and `padding-top: 2.4rem` go — `.top`'s own padding now provides the gap,
exactly as in theirs. The border becomes solid `#d2d2d2` instead of `rgba(210, 210, 210, 0.6)`.
Font size is 1.6rem at every width now, so the desktop `.bottom` font-size override goes too.
Keep the `a` block as it is — the enlarged tap target is ours and is worth keeping.

### Replace the whole `@media (min-width: 992px)` block

The 992px breakpoint is replaced by their two:

```scss
@media (min-width: 768px) {
  .top {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: 1.6rem;
  }

  /* with no contacts there is nothing to space apart, and `space-between` would strand the logo
     and the icons at opposite edges. Centred matches `.bottom`, which is centred already. */
  .topCompact {
    justify-content: center;
    gap: 6.4rem;
  }

  .contacts {
    flex-direction: row;
    gap: 0.8rem;
  }

  .contact {
    align-items: flex-start;
    text-align: left;
  }

  .logo {
    font-size: 2.2rem;
  }

  .logo img {
    height: 4.4rem;
  }

  /* theirs: while the row is tight the icons stack, so they never crowd the contacts */
  .socials {
    flex-direction: column;
  }

  .bottom {
    flex-direction: row;
    justify-content: center;
    gap: 2.4rem;
  }
}

@media (min-width: 1200px) {
  .top {
    align-items: flex-start;
    gap: 2rem;
  }

  .contacts {
    gap: 2rem;
  }

  .socials {
    flex-direction: row;
  }

  .contactLabel {
    font-size: 1.6rem;
    letter-spacing: normal;
  }
}
```

Note `.topCompact` moves from the old 992 block into the 768 block, so it keeps overriding
`.top`'s `space-between` at every width where that applies.

## Verify

```bash
npm run build
npm run dev
```

1. 390px: logo, then two icons in a row, centred; thin light rule above the bottom bar, which
   stacks in two centred lines.
2. 900px: logo and icons on one line; icons **stacked vertically**; bottom bar on one line.
3. 1400px: icons back in a row, top row aligned to the top.
4. No double gap above the rule — `.bottom` has no `margin-top` any more.
5. Add a contact to `Footer.data.ts` temporarily: it must sit between logo and icons, phone in
   lime, and the row must switch from centred to `space-between`. Remove it again.
