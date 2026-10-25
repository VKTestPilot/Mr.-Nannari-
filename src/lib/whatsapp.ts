import { site } from "../config/site";

export type WhatsAppIntent =
  | { type: "general" }
  | { type: "product"; productName: string }
  | { type: "order_status"; orderId?: string };

export function whatsappMessage(intent: WhatsAppIntent): string {
  switch (intent.type) {
    case "product":
      return `Hello ${site.brand}, I'd like to know more about "${intent.productName}".`;
    case "order_status":
      return `Hello ${site.brand}, I'd like an update on my order${intent.orderId ? ` ${intent.orderId}` : ""}.`;
    default:
      return `Hello ${site.brand}, I have an enquiry.`;
  }
}

export function whatsappUrl(intent: WhatsAppIntent = { type: "general" }): string {
  return `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(whatsappMessage(intent))}`;
}
