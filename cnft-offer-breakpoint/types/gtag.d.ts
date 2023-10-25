import "@types/google.analytics";

declare global {
  interface Window {
    gtag: typeof ga;
  }
}
