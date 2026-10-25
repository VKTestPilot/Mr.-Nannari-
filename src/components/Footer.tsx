import { Link } from "react-router-dom";
import { site } from "../config/site";
import { DirectionsButton } from "./Directions";

export function Footer() {
  return (
    <footer className="mt-24 bg-ink text-white">
      <div className="mx-auto grid max-w-6xl gap-8 px-5 py-12 md:grid-cols-3">
        <div>
          <p className="font-display text-2xl font-bold">{site.brand}</p>
          <p className="mt-2 text-white/75">{site.tagline}</p>
        </div>
        <address className="not-italic text-white/85">
          <p>{site.addressText}</p>
          <p className="mt-2">{site.phoneDisplay}</p>
          <p>{site.email}</p>
          <p className="mt-2">{site.hours}</p>
        </address>
        <div className="flex flex-col items-start gap-3">
          <Link to="/catalog" className="underline">Catalog</Link>
          <Link to="/contact" className="underline">Contact</Link>
          <DirectionsButton className="btn bg-white text-ink" />
        </div>
      </div>
      <p className="border-t border-white/10 py-4 text-center text-sm text-white/60">
        © {new Date().getFullYear()} {site.brand}
      </p>
    </footer>
  );
}
