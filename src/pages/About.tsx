import { site } from "../config/site";

export default function About() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-12">
      <h1 className="text-4xl font-bold">About {site.brand}</h1>
      <p className="mt-6 text-muted">PLACEHOLDER — add the brand story.</p>
      <h2 className="mt-10 text-2xl font-bold">Our values</h2>
      <ul className="mt-3 list-disc space-y-1 pl-5 text-muted">
        <li>PLACEHOLDER — value one</li>
        <li>PLACEHOLDER — value two</li>
        <li>PLACEHOLDER — value three</li>
      </ul>
      <div role="img" aria-label="Brand imagery placeholder" className="mt-10 flex h-64 items-center justify-center rounded-2xl bg-sand text-muted">
        Brand imagery placeholder
      </div>
    </div>
  );
}
