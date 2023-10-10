export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_TRACKING_ID;

export type GtagAction = "FIND_HOLDER" | "DOWNLOAD_CSV";

export function trackEvent(action: GtagAction, value = {}) {
  if (GA_TRACKING_ID) {
    window.gtag("event", action, {
      user_id: GA_TRACKING_ID,
      ...value,
    });
  }
}
