/**
 * Checkout abstraction (spec §13).
 *
 * There is NO real payment integration yet, and we deliberately do not
 * present a fake checkout flow. This module is the single seam where a real
 * provider (iyzico / Stripe / PayTR / ...) would be wired in later. Until
 * then, purchase intent is routed to a real contact channel for inquiries.
 */
export const CHECKOUT_ENABLED = false;

export type CheckoutIntent = {
  slug: string;
  title: string;
};

/**
 * Where a "buy" / "get info" action should send the user while checkout is
 * disabled. Returns a real, existing contact channel (never a fake cart).
 */
export function getInquiryHref(contactUrl: string): string {
  return contactUrl || "https://www.instagram.com/menar.official/";
}
