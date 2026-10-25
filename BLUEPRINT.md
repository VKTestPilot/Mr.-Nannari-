# Mr. Nannari — Project Blueprint

## Assumptions (read first)
1. The client's "VanJS" link (https://www.vantajs.com/?effect=trunk) is **Vanta.js**, the "Trunk" animated background — not the VanJS UI library. Implemented as such.
2. ReactBits components are copy-in source components. Three are implemented locally in the same style (SplitText, SpotlightCard, ShinyButton) behind local wrappers in `src/components/reactbits/`. To use the official versions, follow https://reactbits.dev/get-started/index (TS + Tailwind variant) and replace the file contents; imports elsewhere do not change.
3. The Google Maps link is a short link (https://maps.app.goo.gl/cV5E9chcXVjPtAkA7I). It is used for "Get directions". Short links cannot be iframed, so paste the embed `src` (Maps → Share → Embed a map) into `mapsEmbedSrc` in `src/config/site.ts`.
4. No phone number, address, hours, prices, products, reviews, certifications, logo, or payment provider were supplied. All are labeled `PLACEHOLDER`. No orders are sent anywhere until `orderEndpoint` / `contactEndpoint` are set (until then the UI simulates success with a `DEMO-` reference).
5. Stack: React + Vite + TypeScript + Tailwind v4 (SPA). SSR was not chosen; if SEO for product pages matters, migrate to Next.js.

## Architecture
```
Browser
 └─ BrowserRouter
     └─ CartProvider (context + localStorage)
         └─ App
             └─ LenisProvider (smooth scroll, off for reduced-motion; stops while overlays open)
                 ├─ Header (nav, cart button, mobile menu)
                 ├─ Routes (lazy): Home, Catalog, ProductDetail, Checkout, Contact, About
                 ├─ Footer
                 ├─ CartDrawer (dialog)
                 └─ WhatsAppFloat
config/site.ts ── single source for brand, phone, map links, endpoints
lib/api.ts ────── POST order/contact → serverless endpoint (to be provided)
```

## Component tree
- `Home`: `VantaHero` → `SplitText`; featured `ProductCard` list; story, trust placeholders; `MapEmbed` + `DirectionsButton`
- `Catalog`: search + category filter → `ProductCard` (wraps `SpotlightCard`)
- `ProductDetail`: `ProductImage`, add to cart / `WhatsAppLink`
- `Checkout`: `FormField`s + order summary; states: empty, idle, loading, error, success
- `Contact`: `FormField`s, `WhatsAppLink`, `MapEmbed`, support workflow

## Data model
`Product { id, name, category, description, price | null, images[], availability, tags[] }` — `price: null` means "Request quote" (opens WhatsApp with the product name).
`CartItem { productId, qty }`.

## API (to be implemented by the client's backend/serverless)
- `POST {orderEndpoint}` body `{ customer{name,phone,email,address,payment,notes}, items[{id,name,qty,price}], total }` → `{ id }`
- `POST {contactEndpoint}` body `{ name,email,phone,message }` → `{ id }`
Validation runs client-side with Zod and **must be repeated server-side**.

## Wireframes
- **Home:** sticky header → Vanta hero (brand, tagline, two CTAs) → featured grid → story → trust → map + directions → footer. WhatsApp button floats bottom-right. Mobile: hero is a static gradient, grid is one column.
- **Product:** image left / details right (stacked on mobile): category, name, price, description, Add to cart + Ask on WhatsApp.
- **Checkout:** form left (name, phone, email, address, payment, notes), order summary right (below form on mobile).
- **Contact:** form left; details, WhatsApp, directions, map, "what happens next" right.

## Integration notes
- **Lenis:** `ReactLenis root` in `LenisProvider`; `lenis.stop()` while cart/menu is open; not mounted when `prefers-reduced-motion`.
- **Vanta Trunk:** `import("p5")` + `import("vanta/dist/vanta.trunk.min")` only on the Home hero, skipped on <768px, low-memory/low-core devices and reduced motion; `destroy()` on unmount; dark overlay for contrast.
- **WhatsApp:** `https://wa.me/<number>?text=<encoded>`; intents: general, product, order status.

## QA / accessibility checklist
- [ ] Keyboard-only: skip link, menu, cart dialog (Esc closes), forms, catalog filters
- [ ] Screen reader (NVDA/VoiceOver): form errors announced, cart count, external links say "opens in a new tab"
- [ ] axe DevTools and Lighthouse on Home, Catalog, Product, Checkout, Contact
- [ ] Contrast AA over the Vanta hero (check on desktop with animation running)
- [ ] 44px touch targets; 320px width has no horizontal scroll
- [ ] Reduced motion: no smooth scroll, no Vanta, no reveals
- [ ] Known gap: the cart dialog moves focus in on open but does not yet trap Tab or restore focus on close — add before launch

## Performance
Targets: Lighthouse ≥ 90 mobile, LCP < 2.5s, CLS < 0.1, INP < 200ms.
Measured build (gzip): app shell ≈ 12 kB, vendor ≈ 54 kB, routes 0.4–1.7 kB each. `p5` is ≈ 270 kB gzip and loads only on desktop-class devices for the hero. Not yet measured with Lighthouse — run it once real content and images are in.

## 2-week plan
- **Week 1:** brand tokens from the logo, real content and product data, image pipeline, Home/Catalog/Product polish.
- **Week 2:** order/contact endpoints and payment provider, embed map, focus trap, accessibility + performance pass, QA, deploy.
