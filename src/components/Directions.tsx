import { site } from "../config/site";

export function DirectionsButton({ className = "btn btn-primary" }: { className?: string }) {
  return (
    <a href={site.mapsUrl} target="_blank" rel="noopener noreferrer" className={className}>
      Get directions
      <span className="sr-only"> (opens Google Maps in a new tab)</span>
    </a>
  );
}

/** Map iframe is only rendered once an embed src is configured, and loads lazily. */
export function MapEmbed() {
  if (!site.mapsEmbedSrc) {
    return (
      <div className="flex h-72 flex-col items-center justify-center gap-3 rounded-2xl bg-sand p-6 text-center">
        <p className="font-semibold">Find {site.brand} on Google Maps</p>
        <DirectionsButton />
      </div>
    );
  }
  return (
    <iframe
      title={`Map showing the location of ${site.brand}`}
      src={site.mapsEmbedSrc}
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      className="h-72 w-full rounded-2xl border-0 md:h-96"
    />
  );
}
