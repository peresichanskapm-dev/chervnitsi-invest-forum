export type DataLayerEvent = {
  event: string;
} & Record<string, unknown>;

declare global {
  interface Window {
    dataLayer?: DataLayerEvent[];
  }
}

/**
 * GTM itself creates `window.dataLayer`, so pushing before its snippet has run — or when a
 * blocker has swallowed it — must stay a no-op rather than throw inside a submit handler.
 */
export function pushToDataLayer(event: DataLayerEvent): void {
  if (typeof window === "undefined") {
    return;
  }

  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push(event);
}
