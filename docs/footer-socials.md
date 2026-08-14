# Footer — drop Telegram, close the gap it leaves behind

Two separate things:

1. Telegram goes.
2. The desktop top row is `justify-content: space-between` over three children — logo, contacts,
   socials — but `contacts` is an empty array, so it renders an empty middle item and the row
   reads as two things pinned to opposite edges with a void between them. Removing an icon widens
   that void further.

The fix for (2) is data-driven, so `space-between` comes back by itself the day the client sends
real contacts.

---

## 1. `components/home/Footer/Footer.data.ts`

Narrow the id union and drop the entry:

```ts
export type FooterSocial = {
  id: "instagram" | "facebook";
  label: string;
  href: string;
};
```

```ts
  socials: [
    { id: "instagram", label: "Instagram", href: "#" },
    { id: "facebook", label: "Facebook", href: "#" },
  ] satisfies FooterSocial[],
```

Leave the `// TODO: real profile URLs pending from the client` comment above it, and leave
`contacts: [] as FooterContact[]` and its comment exactly as they are.

## 2. `components/home/Footer/Footer.tsx`

Delete the whole `telegram:` entry from `SOCIAL_ICONS` — the union no longer allows the key, so
leaving it there is a type error, not dead weight. The paths stay in git history if it ever
comes back.

Then make the empty contacts block stop occupying a slot, and flag the row as compact:

```tsx
export function Footer() {
  const { logo, contacts, socials, copyright, developedBy } = footerData;
  const hasContacts = contacts.length > 0;

  return (
    <footer className={styles.footer}>
      <div
        className={`container ${styles.top} ${hasContacts ? "" : styles.topCompact}`}
      >
```

and wrap the contacts block:

```tsx
        {hasContacts && (
          <div className={styles.contacts}>
            {contacts.map((contact, index) => (
              ...unchanged...
            ))}
          </div>
        )}
```

Everything inside the map, the logo block, the socials block and the bottom row stay byte for
byte as they are.

## 3. `components/home/Footer/Footer.module.scss`

Inside the existing `@media (min-width: 992px)` block, after the `.top` rule, add:

```scss
  /* with no contacts there is nothing to space apart, and `space-between` would strand the logo
     and the icons at opposite edges. Centred matches `.bottom`, which is centred already. */
  .topCompact {
    justify-content: center;
    gap: 6.4rem;
  }
```

Nothing else in the file changes — the base (mobile) `.top` is already a centred column, so
mobile is unaffected either way.

## Verify

```bash
npm run build
```

1. Desktop 1440px: two icons, logo and icons sit together in the middle of the row with one
   even gap — no void, nothing pinned to the edges.
2. Mobile 390px: unchanged — logo above, two centred icons below.
3. Temporarily add one entry to `contacts` in the data file: the row must snap back to
   `space-between` with three blocks. Remove it again afterwards.
4. No TypeScript error about a `telegram` key in `SOCIAL_ICONS`.
