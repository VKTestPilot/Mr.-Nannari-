/**
 * Single source of truth for business details.
 * Values marked PLACEHOLDER must be replaced by the client before launch.
 */
export const site = {
  brand: "Mr. Nannari",
  tagline: "PLACEHOLDER — add brand tagline",
  // PLACEHOLDER: international format, digits only, e.g. "919876543210"
  whatsappNumber: "910000000000",
  phoneDisplay: "PLACEHOLDER — add phone number",
  email: "PLACEHOLDER — add email",
  addressText: "PLACEHOLDER — add street address (see Google Maps link for location)",
  hours: "PLACEHOLDER — add opening hours",
  mapsUrl: "https://maps.app.goo.gl/cV5E9chcXVjPtAkA7I",
  /**
   * PLACEHOLDER: paste the iframe `src` from Google Maps → Share → Embed a map.
   * Short links (maps.app.goo.gl) cannot be embedded, so until this is set the
   * map section shows a link card instead of an iframe.
   */
  mapsEmbedSrc: "",
  social: {
    instagram: "",
    facebook: "",
  },
  currency: "INR",
  // PLACEHOLDER: set to a real endpoint (serverless function) to receive orders/messages.
  orderEndpoint: "",
  contactEndpoint: "",
  paymentOptions: ["Cash on delivery", "UPI (PLACEHOLDER — configure provider)"],
} as const;

export const links = {
  lenis: "https://lenis.dev/",
  vanta: "https://www.vantajs.com/?effect=trunk",
  reactbits: "https://reactbits.dev/get-started/index",
};
