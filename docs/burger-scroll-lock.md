# Fix: the page still scrolls behind the open burger menu

## Cause

`Header.tsx` already tries to lock it:

```ts
document.body.style.overflow = open ? "hidden" : "";
```

but `app/globals.scss` declares

```scss
html,
body {
  max-width: 100vw;
  overflow-x: hidden;
}
```

Overflow propagates from `body` to the viewport **only while the root element's own overflow is
`visible`**. `overflow-x: hidden` on `html` ends that, so `html` is the scrolling box and the
line above sets a property nothing reads.

Setting it on `document.documentElement` instead fixes desktop browsers, but iOS Safari still
rubber-bands the page behind a fixed overlay. The reliable lock is to freeze the body at a
negative offset and put the scroll position back on release.

## Fix — `components/home/Header/Header.tsx`

Replace the whole first effect:

```ts
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);
```

with:

```ts
  /*
   * globals.scss puts `overflow-x: hidden` on `html`, which makes `html` the scrolling box —
   * overflow on `body` stops propagating to the viewport, so locking `body` alone does nothing.
   * Pinning the body at a negative offset also stops iOS rubber-banding behind the overlay.
   */
  useEffect(() => {
    if (!open) return;

    const { documentElement: root, body } = document;
    const scrollY = window.scrollY;

    root.style.overflow = "hidden";
    body.style.position = "fixed";
    body.style.top = `${-scrollY}px`;
    body.style.left = "0";
    body.style.right = "0";
    body.style.width = "100%";

    return () => {
      root.style.overflow = "";
      body.style.position = "";
      body.style.top = "";
      body.style.left = "";
      body.style.right = "";
      body.style.width = "";
      window.scrollTo(0, scrollY);
    };
  }, [open]);
```

Nothing else in the file changes. The lock is held for the whole `closing` animation, because
`open` only flips to `false` once the timer fires.

`position: fixed` on `body` does not endanger the portalled overlay: only `transform`, `filter`,
`perspective`, `contain` and `will-change` create a containing block for a fixed descendant — a
fixed ancestor does not.

No scrollbar-width compensation is needed. `.burger` is `display: none` from 992px, so `open`
can only become true at widths where the scrollbar is an overlay one with no layout width.

## Verify

```bash
npm run build
npm run dev
```

On a phone (or devtools device mode) at 390px:

1. Scroll halfway down the page, open the burger — the page behind does not move, and swiping
   over the overlay does not scroll it either.
2. Close the menu — the page is exactly where it was, no jump to the top and no jump by the
   header's height.
3. Open the menu at the very top of the page and close it — still at the top.
4. Tap a nav link: the menu closes and the page scrolls to that section.
5. Desktop 1440px: nothing changes, the burger is not reachable.
