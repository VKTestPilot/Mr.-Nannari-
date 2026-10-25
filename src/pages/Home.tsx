import { Link } from "react-router-dom";
import { site } from "../config/site";
import { products } from "../data/products";
import { VantaHero } from "../components/VantaHero";
import { SplitText } from "../components/reactbits/SplitText";
import { ProductCard } from "../components/ProductCard";
import { MapEmbed, DirectionsButton } from "../components/Directions";
import { WhatsAppLink } from "../components/WhatsAppButton";

export default function Home() {
  const featured = products.filter((p) => p.tags.includes("featured"));
  return (
    <>
      <VantaHero>
        <h1 id="hero-title" className="max-w-3xl text-5xl font-bold leading-tight md:text-7xl">
          <SplitText text={site.brand} />
        </h1>
        <p className="mt-5 max-w-xl text-lg text-white/90">{site.tagline}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link to="/catalog" className="btn btn-primary">Explore the catalog</Link>
          <WhatsAppLink intent={{ type: "general" }} className="btn btn-ghost text-white">Chat on WhatsApp</WhatsAppLink>
        </div>
      </VantaHero>

      <section className="mx-auto max-w-6xl px-5 py-16" aria-labelledby="featured">
        <h2 id="featured" className="text-3xl font-bold">Featured</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
        <Link to="/catalog" className="btn btn-ghost mt-8">View all</Link>
      </section>

      <section className="mx-auto max-w-6xl px-5" aria-labelledby="story">
        <h2 id="story" className="text-3xl font-bold">Our story</h2>
        <p className="mt-4 max-w-2xl text-muted">PLACEHOLDER — add the Mr. Nannari brand story.</p>
        <Link to="/about" className="mt-4 inline-block underline">Read more</Link>
      </section>

      <section className="mx-auto mt-16 max-w-6xl px-5" aria-labelledby="trust">
        <h2 id="trust" className="text-3xl font-bold">Trusted by customers</h2>
        <p className="mt-4 max-w-2xl text-muted">
          PLACEHOLDER — add real customer reviews and certifications supplied by the business. None are shown until verified.
        </p>
      </section>

      <section className="mx-auto mt-16 max-w-6xl px-5" aria-labelledby="visit">
        <h2 id="visit" className="text-3xl font-bold">Visit us</h2>
        <p className="mt-2 text-muted">{site.addressText}</p>
        <div className="mt-6"><MapEmbed /></div>
        <div className="mt-4"><DirectionsButton /></div>
      </section>
    </>
  );
}
