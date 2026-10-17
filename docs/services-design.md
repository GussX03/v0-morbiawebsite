# Servicios Morbia

## Visual direction and sources

The service catalog and six detail pages preserve the blue/teal Morbia branding, diagonal background, rounded surfaces and pill buttons from the homepage. They use the same `SiteHeader`, including desktop navigation, active Services indicator, fixed translucent background and mobile menu.

The user selected the graphic language from `Morbia - Redes Sociales/Nuevas publicaciones Instagram/Lote 2026-10-15`. Source guidance: `.agents/skills/morbia-social-content/SKILL.md` and its `references/visual-style.md`, plus `Logo/MORBIA_PALETA_OFICIAL.png`. The official board identifies Montserrat; the web uses self-hosted Montserrat with regular/medium/semibold weights. Original campaign artwork is kept intact, without cropping its headline or mark.

| Service | Artwork source under the social workspace |
| --- | --- |
| Web | `Lote 2026-10-15/08_07_DETRAS_DE_CAMARAS_MORBIA/foto.png` |
| Chatbots | New image generated with the built-in image tool using the campaign's `05_04_TIP_RAPIDO_MORBIA/foto.png` and official `MORBIA_ISOTIPO_PRINCIPAL.png` as references |
| Automation | `Lote 2026-10-15/01_PROBLEMA_REAL_MORBIA/foto.png` |
| RPA | `Lote 2026-10-15/05_04_TIP_RAPIDO_MORBIA/foto.png` |
| AI | `Lote 2026-10-15/06_05_MARCA_VISION_MORBIA/foto.png` |
| Data | `Lote 2026-10-15/10_09_TESTIMONIO_PRUEBA_MORBIA/foto.png` |

The five existing images were encoded without compositing, recoloring or cropping. The original files in the social workspace were not changed. Site assets live in `public/images/services/*.webp` and are statically imported through `lib/service-images.ts`.

### Chatbot artwork prompt

Built-in image generation, with the two references above: portrait Morbia campaign artwork, clean navy/teal medium-weight sans-serif headline, short fine teal rule, textured pale cool stone surface and two physical glass vessels with restrained teal reflections. Exact text: “Cada conversación” / “merece respuesta.” Compact official Morbia orbital mark at the upper right with a generous inset. Match the reference's restrained photographic design and proportions. No people, office, laptop, robot, generated interface, extra labels or speech-bubble icons.

Approved source: `/Users/gustavomorales/.codex/generated_images/01a06d10-89c3-7dd1-b013-4de7190c2b6e/exec-f369696c-300e-40dd-9a39-c9e5f13dd63b.png`.

## Navigation and interaction

- Homepage service titles and the existing detail CTAs lead to their specific `/servicios/...` route.
- Catalog shortcuts jump to the corresponding card; each title and “Conoce este servicio” button opens its detail page.
- Images open a Radix Dialog viewer, showing the entire artwork at a larger size. The viewer traps focus, closes via its button, Escape or outside interaction, and returns focus to its trigger. It also links to the original full-resolution artwork. Hero images grow to 480px wide on desktop, and catalog artwork to 352px.
- Detail breadcrumbs return to the corresponding card in the catalog. Global navigation returns to the homepage section.
- Existing `select_content` events remain; image expansion adds `content_type: service_artwork`.

## Content principles

Each service explains everyday business problems, five concrete ways it can help, an explicitly illustrative before/after example, team benefits, implementation approach and three practical questions. The content avoids invented statistics, prices, testimonials and guarantees.

The structure follows [NN/g's guidance on descriptive links and information scent](https://www.nngroup.com/articles/writing-links/) and [Google's people-first content guidance](https://developers.google.com/search/docs/fundamentals/creating-helpful-content). Service and breadcrumb structured data reflect the visible page; canonical paths are preserved. FAQ content is shown as accessible disclosures, without adding promotional FAQ rich-result markup.

## Image delivery

`scripts/prepare-service-images.mjs <approved-chatbot-source>` produces WebP assets at up to 1080px wide, preserving proportions and typography. Source images ranged from roughly 1.4–2.4 MB; final full-size WebPs range from 42–192 KB. The five reused campaign images are 95–97% smaller.

`next/image` serves responsive sizes, WebP and lazy-loaded catalog images. Only the hero artwork is prioritized. Full-size dialog images mount when opened. Static imports create content-hashed URLs, so unchanged images share browser/CDN cache across the catalog and detail routes; changed artwork gets a new URL. Next's optimizer has a 31-day minimum TTL. [Next.js image caching reference](https://nextjs.org/docs/app/api-reference/components/image#minimumcachettl).

## Verification

- `pnpm build` and `pnpm exec tsc --noEmit`.
- `node scripts/verify-services.mjs [base-url]`: all six routes, one H1, preserved canonical, section destinations, catalog return anchors, homepage links, schema and responsive image tags.
- Browser checks: desktop, tablet and mobile widths; header/menu; homepage-to-service and return navigation; complete uncropped artwork; dialog open/close and keyboard navigation.
- Production checks repeat the route audit and inspect optimized image response size/cache headers.

Observed locally: all six detail routes had no horizontal overflow at 320px and 390px. The 480px chatbot image was 36,264 bytes as WebP; repeated image requests changed from `MISS` to `HIT`. The source's content-hashed URL had `Cache-Control: public, max-age=31536000, immutable`. The viewer used `object-fit: contain`, locked body scroll and restored focus to its trigger after Escape and outside-click dismissal.

SEO quality review: no fabricated claims, review/rating markup, FAQ rich-result markup, keyword stuffing, hidden copy or duplicate city-swapped pages were introduced. All six canonicals and route paths remain unchanged. Per-service examples are explicitly illustrative. Catalog intent and individual-service intent remain distinct.
