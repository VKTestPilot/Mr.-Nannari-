import { whatsappUrl, type WhatsAppIntent } from "../lib/whatsapp";

const icon = (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M21 11.5a8.5 8.5 0 0 1-12.6 7.4L3 20.500l1.700-5A8.500 8.500 0 1 1 21 11.500Z" />
    <path d="M9 9.500c.5 2 2 3.500 4.500 4.500l1.300-1.300-1.800-1-.9.700c-.8-.4-1.400-1-1.800-1.800l.7-.9-1-1.800Z" />
  </svg>
);

/** Inline link for a given intent (product page, order status, etc). */
export function WhatsAppLink({ intent, children, className = "btn btn-ghost" }: { intent: WhatsAppIntent; children: React.ReactNode; className?: string }) {
  return (
    <a href={whatsappUrl(intent)} target="_blank" rel="noopener noreferrer" className={className}>
      {icon}
      {children}
      <span className="sr-only"> (opens WhatsApp in a new tab)</span>
    </a>
  );
}

/** Persistent floating chat button. */
export function WhatsAppFloat() {
  return (
    <a
      href={whatsappUrl({ type: "general" })}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#0b6b3a] text-white shadow-lg transition hover:scale-105"
      aria-label="Chat with us on WhatsApp (opens in a new tab)"
    >
      {icon}
    </a>
  );
}
