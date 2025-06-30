declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
    gtag: (...args: (string | Date | Record<string, unknown>)[]) => void;
  }
}

export { };
