# Fix: short elements at the very end of the page never reveal

## Symptom

On desktop the footer's bottom bar — the rule, the copyright line and the credit link — never
appears. On mobile it does.

## Cause

`ScrollReveal` observes with

```ts
{ threshold: 0.08, rootMargin: "0px 0px -8% 0px" }
```

The negative bottom margin trims the last 8% of the viewport off the observer's root, so a
reveal fires only once the element is properly on screen rather than peeking in from the bottom.

That works everywhere except at the end of the document, where scrolling cannot bring an element
any further up. `.bottom` is the last element on the page, so at maximum scroll its bottom edge
sits on the viewport's bottom edge. On a 1080px desktop viewport the dead band is 86px and the
one-row bottom bar is ~53px tall — the element lies *entirely* inside the band and never
intersects the root at all.

On a phone the same bar wraps to two lines (~74px) against a ~67px band, so ~7px pokes out —
9.5% of the element, just over the 0.08 threshold. Hence "desktop only".

This is not specific to the footer: any element shorter than 8% of the viewport, sitting in the
last 8% of the document, is permanently invisible.

## Fix — `components/ui/ScrollReveal/ScrollReveal.tsx`

Keep the observer and its options. Add a bottom-of-page fallback: when the document cannot scroll
any further, anything still unrevealed and on screen gets revealed.

After the existing `mutations.observe(...)` line and before the `return`, add:

```ts
    /*
     * The -8% root margin can never be satisfied by an element in the last 8% of the document:
     * scrolling stops before it clears the band. At the very bottom, reveal whatever is left.
     */
    let frame = 0;
    const revealAtPageEnd = () => {
      frame = 0;
      const doc = document.documentElement;
      if (window.innerHeight + window.scrollY < doc.scrollHeight - 2) return;
      for (const node of document.querySelectorAll(
        "[data-reveal]:not([data-reveal-visible])",
      )) {
        const rect = node.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          node.setAttribute("data-reveal-visible", "");
          observer.unobserve(node);
        }
      }
    };
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(revealAtPageEnd);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    onScroll();
```

and extend the cleanup:

```ts
    return () => {
      observer.disconnect();
      mutations.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
```

The handler is rAF-coalesced and bails on its first comparison unless the page is actually at the
bottom, so it costs one arithmetic check per frame of scrolling.

Update the component's doc comment to mention the page-end fallback alongside the
`MutationObserver`.

Nothing else changes — not `globals.scss`, not the footer, not any `data-reveal` attribute.

## Verify

```bash
npm run build
npm run dev
```

1. Desktop 1440×900 and 1920×1080: scroll to the bottom — the rule, the copyright and the credit
   link are all visible, and they fade in rather than popping.
2. Mobile 390px: unchanged.
3. Zoom to 150% on desktop (fewer CSS pixels of viewport) — still appears.
4. Everything above the footer still reveals on its own, once each, with its stagger intact.
5. In the console at the bottom of the page:
   `document.querySelectorAll("[data-reveal]:not([data-reveal-visible])").length` is `0`.
