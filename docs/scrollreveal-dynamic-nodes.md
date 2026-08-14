# Fix: revealed elements mounted after page load stay invisible

## Symptom

The tickets section renders empty. The cards are in the DOM with the right sizes — they are just
`opacity: 0`.

## Cause

`components/ui/ScrollReveal/ScrollReveal.tsx` collects its targets exactly once:

```ts
document.querySelectorAll("[data-reveal]").forEach((node) => observer.observe(node));
```

and `app/globals.scss:102` hides every `[data-reveal]` until that observer sets
`data-reveal-visible` on it. So any `[data-reveal]` element that enters the DOM *after* the
effect has run is hidden forever.

That is exactly what the new tickets slider does. It renders the fallback scroller first, then
swaps in Swiper once the chunk loads — React unmounts the fallback cards and mounts brand-new
DOM nodes inside `SwiperSlide`. Those nodes carry `data-reveal` but were never observed.

## Fix — `components/ui/ScrollReveal/ScrollReveal.tsx`

Keep the single IntersectionObserver, and feed it nodes added later via a `MutationObserver`.
Only `childList` is watched, so Swiper's own inline-style and class churn costs nothing.

Replace the body of the effect from the `IntersectionObserver` construction down to the return:

```ts
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.setAttribute("data-reveal-visible", "");
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -8% 0px" },
    );

    const observeTree = (node: Element) => {
      if (node.matches("[data-reveal]:not([data-reveal-visible])")) observer.observe(node);
      node
        .querySelectorAll("[data-reveal]:not([data-reveal-visible])")
        .forEach((child) => observer.observe(child));
    };

    observeTree(document.body);

    /*
     * Anything mounted after this effect — the tickets slider swapping its fallback markup for
     * Swiper, for instance — would otherwise never be observed, and globals.scss keeps every
     * unobserved [data-reveal] at opacity 0 permanently.
     */
    const mutations = new MutationObserver((records) => {
      for (const record of records) {
        for (const added of record.addedNodes) {
          if (added.nodeType === Node.ELEMENT_NODE) observeTree(added as Element);
        }
      }
    });
    mutations.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutations.disconnect();
    };
```

Update the component's doc comment to say the observer also picks up elements mounted later.

Change nothing else — not `globals.scss`, not `Tickets.tsx`, not any other section.

## Verify

```bash
npm run build
npm run dev
```

1. The tickets section shows its cards, and they animate in once.
2. Scroll past tickets, then reload at the top and scroll down again — still visible, animating
   once each.
3. Other sections (About, Speakers, Pricing) reveal exactly as before, once, with their stagger.
4. In the console, `document.querySelectorAll("[data-reveal]:not([data-reveal-visible])").length`
   is 0 after scrolling to the bottom.
