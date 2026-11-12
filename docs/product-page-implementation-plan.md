# Latitude 23.5° — Dynamic Coffee Product Page

**Implementation plan for a CRO/SEO/performance-optimized PDP on Shopify Horizon**

This plan targets the reference "Brazil Direct" layout while keeping **100% of the product content dynamic by origin** (Brazil, Kenya, Panama, Colombia, Ethiopia, Guatemala, …). It is written against the **current theme** in this repo:

- Theme family: **Horizon** (block-based `product-information` section, `_product-details` + `_product-media-gallery` static blocks, `closest.product` Liquid scope).
- Installed apps already wired in `templates/product.json`: **Judge.me** (reviews), **Subi Subscriptions** (app block), **Klaviyo** (newsletter via `_klOnsite.openForm`).
- Metafields already referenced: `metafields.shopify["coffee-roast"]` (Shopify standard taxonomy), `metafields.custom.product_type`, `metafields.reviews.rating` / `rating_count`.
- No metaobjects exist yet — this plan introduces them.

The guiding principle: **the JSON template and section/blocks define the layout once; every word, number, icon and map comes from metafields/metaobjects** so a single `product.json` renders correctly for every origin.

---

## 0. Architecture decision (read first)

Horizon supports two valid approaches. We use a **hybrid**:

1. **Native blocks for everything the merchant edits per-page or that maps to native objects** — gallery, title, price, variant picker, buy buttons, accelerated checkout, accordion, reviews, recommendations. These stay as theme/app blocks in `product.json` (as they are today).
2. **Three new custom theme blocks** that read metaobject/metafield data and render the bespoke marketing modules that have no native equivalent:
   - `block-coffee-badges` — the badge row + the trust strip.
   - `block-coffee-profile` — the "Why you'll love it / Flavor profile / Origin / Brewing" 4-column band.
   - `block-coffee-faq` — origin/type-aware FAQ with schema.

Custom blocks (not app blocks, not custom-liquid) because: they are theme-editor sortable, they get `{{ block.shopify_attributes }}`, they scope CSS, and they keep Liquid out of the JSON. Avoid `custom-liquid` blocks for these — they can't be styled cleanly, don't lazy-scope, and are hard to maintain.

**Why metaobjects + metafields instead of hardcoding:** one `product.json` + one set of blocks renders every origin. Adding "Costa Rica" later = create one product, link one metaobject entry, done. No theme deploy.

---

## 1. Product page layout (content area only)

Desktop = two columns inside `product-information` (already configured: `desktop_media_position: left`, `equal_columns: true`, `gap: 48`, sticky details on). Below the fold = full-width bands.

```
┌─────────────────────────────────────────────────────────────┐
│  product-information  (main section, 2-col, sticky right)    │
│  ┌───────────────────────────┐  ┌────────────────────────┐  │
│  │  _product-media-gallery   │  │  _product-details      │  │
│  │  • main image (zoom)      │  │  Header group:         │  │
│  │  • "Roasted to order"     │  │   breadcrumb           │  │
│  │    overlay badge          │  │   H1 title             │  │
│  │  • thumbnails (bottom)    │  │   judge.me stars +     │  │
│  │                           │  │     "5.0 (1 review)"   │  │
│  │                           │  │   price                │  │
│  │                           │  │   short description    │  │
│  │                           │  │  ── block-coffee-badges│  │
│  │                           │  │   roast • origin •     │  │
│  │                           │  │   farm direct (pills)  │  │
│  │                           │  │   3-up trust strip     │  │
│  │                           │  │  ── Size selector      │  │
│  │                           │  │   1LB / 2×1LB / 3×1LB  │  │
│  │                           │  │  ── Subi widget        │  │
│  │                           │  │   one-time / subscribe │  │
│  │                           │  │   deliver-every select │  │
│  │                           │  │  ── Grind (variant)    │  │
│  │                           │  │  ── Quantity           │  │
│  │                           │  │  ── Add to cart        │  │
│  │                           │  │  ── Shop Pay (acc.)    │  │
│  │                           │  │  ── ships-from box     │  │
│  └───────────────────────────┘  └────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
│  block-coffee-profile  (full width 4-col band)               │
│   Why you'll love it │ Flavor profile │ Origin+map │ Brewing │
│  trust strip (freshness / shipping / store / questions)      │
│  Judge.me review widget  (_blocks section, already present)  │
│  block-coffee-faq  (accordion + FAQ schema)                  │
│  product-recommendations  "You may also like" (present)      │
│  Klaviyo newsletter band  (section, present)                 │
│  product-list  "Discover more extraordinary coffee" (present)│
```

### 1.1 Image gallery
Keep the existing `_product-media-gallery` static block. Settings to confirm:
- `media_presentation: carousel`, `thumbnail_position: bottom`, `slideshow_mobile_controls_style: dots`, `zoom: true`, `aspect_ratio: adapt`, `media_fit: contain`, `media_radius: 16`.
- The **"Roasted to order" overlay badge** (top-left of the image in the reference) is **not** native. Add it as a small custom block `block-image-badge` rendered *inside* the gallery area, or simpler: render it in `block-coffee-badges` absolutely-positioned over the gallery via the section's grid. Recommended: a tiny dedicated block `block-image-ribbon` with one text setting defaulting to `Roasted to order`, positioned `absolute; inset-block-start/inline-start` over the first media. Text can be metafield-driven (`product.metafields.custom.ribbon_label`) with a static fallback.
- The keep current background gradient on `.product-media__image` (already in `custom_css`).

### 1.2 Title / reviews / price / short description (Header group)
- **Breadcrumb** (`Home / Coffee / Single Origin / Brazil Direct`): use a `breadcrumb` block. There's already an AI breadcrumb block (`ai_gen_block_6b663dd`). Prefer a clean snippet `snippets/breadcrumbs.liquid` rendering `collection.title` → `product.title` with **BreadcrumbList JSON-LD** (see §6). Drive the middle crumb ("Single Origin") from `product.metafields.custom.product_type` so it's dynamic.
- **H1 title:** keep `<h1>{{ closest.product.title }}</h1>`.
- **Reviews:** keep the Judge.me `preview_badge` app block (already present) — renders stars + "5.0 (1 review)". Anchor-link it to `#judgeme_product_reviews`.
- **Price:** keep native `price` block. When a size variant is selected the price updates natively.
- **Short description:** the 2-line summary under price ("Smooth and balanced with notes of milk chocolate…") should be a **dedicated metafield** `custom.short_description` (multi-line text), *not* `product.description` (which is reserved for the long body in the accordion + SEO). Render via a `text` block: `{{ closest.product.metafields.custom.short_description }}`.

### 1.3 Product badges (the pill row + 3-up trust strip)
Two visual groups, both in `block-coffee-badges`:
- **Inline meta pills** (Medium Roast • Origins: Brazil • Farm Direct): icon + label, each driven by metafields:
  - Roast: `metafields.shopify["coffee-roast"] | metafield_text: field:'label'` + " Roast" (already used today).
  - Origin: `metafields.custom.origin.value.country` (from the Coffee Origin metaobject, §3).
  - Farm Direct / Organic / Decaf etc.: a `list.single_line_text` or `list.metaobject_reference` of **badge** metaobjects so the merchant can attach any subset per product.
- **3-up trust strip** (Fresh Roasted / Farm Direct / Free Shipping with sub-labels): these are **store-wide and identical across products** → store them in **theme settings** or a `trust_badges` metaobject set referenced once, NOT per product. Render statically with icons from `assets/`.

### 1.4 Size selector (1 LB / 2 × 1 LB / 3 × 1 LB)
This is the **bundle/quantity-break UX**. Two implementation options:

**Option A — Variants (recommended, simplest, checkout-safe).** Model size as a product **option "Size"** with three variants (1 LB, 2 × 1 LB, 3 × 1 LB) priced for the 10%/15% savings. Render with the native `variant-picker` block but **styled as cards** (variant_style currently `dropdowns`; switch the Size option to button/pill cards via CSS, keep Grind as a dropdown). Savings ("SAVE 10%") computed in Liquid: `compare_at_price`/`price` per variant, or a per-variant metafield `custom.savings_label`.
   - Pros: native cart/checkout, native price updates, works with Subi selling plans per variant.
   - Cons: variant count = sizes × grinds (3 × ~5 = 15) — acceptable.

**Option B — Quantity-break app / line-item properties.** More complex, risks checkout drift. **Do not** use for this; Option A is cleaner and matches the reference exactly.

Build a custom block `block-size-cards` only if you want the exact 3-card visual with the savings ribbon; otherwise theme the native variant picker. Recommended: **custom `block-size-cards`** that loops `product.options_by_name["Size"].values`, links each to its variant, shows price + savings, and writes the selected variant id to the form. Keep it a thin wrapper over native variant selection so checkout stays native.

### 1.5 Purchase type + 1.6 delivery frequency → Subi (see §4)
Keep the **Subi Subscriptions app block** exactly where it is in the block order (between badges/size and the variant picker). It renders one-time vs Subscribe & Save + the "Deliver every [15 days]" dropdown. Styling/perf in §4.

### 1.7 Grind selector
Native `variant-picker`, **Grind option only** as a dropdown (`Whole Bean`, `Drip`, `Espresso`, `French Press`, …). If Size is also a variant option, the single `variant-picker` block renders both; CSS targets Size to render as cards (§1.4) and Grind as the dropdown.

### 1.8 Quantity / 1.9 Add to cart / 1.10 Shop Pay
Keep the native `buy-buttons` block with its three static children: `quantity`, `add-to-cart`, `accelerated-checkout`. Order: Add to Cart (full-width amber `.button`) → Shop Pay (accelerated). `stacking: true` is already set. Keep `.quantity-selector-wrapper {height:40px}` override.

### 1.11 Ships-from / roasted-to-order box
Small info box ("Roasted to order in Sarasota, FL — Ships within 1–2 business days"). Store-wide copy → **theme setting** or a single metaobject; render as a static styled block under the buy buttons. Make the city/lead-time overridable per product via `metafields.custom.ships_from` / `custom.lead_time` for future flexibility, with theme-setting fallback.

---

## 2. Dynamic origin-based content — the mechanism

**One metaobject does the heavy lifting: `coffee_origin`.** Each product links to exactly one origin entry via a product metafield `custom.origin` (type: *metaobject reference → coffee_origin*). Everything regional comes from that entry so two Brazilian coffees can share one origin record, or differ via per-product overrides.

Resolution order for every field (override → shared → fallback):

```liquid
{%- liquid
  assign origin = product.metafields.custom.origin.value
  # country: product override else origin metaobject
  assign country = product.metafields.custom.origin_country | default: origin.country
-%}
```

| Reference element | Source | Notes |
|---|---|---|
| Origin country ("Brazil") | `origin.country` | shared metaobject |
| Roast level ("Medium Roast") | `product.metafields.shopify["coffee-roast"]` | **per product** (Shopify standard taxonomy, already used) |
| Flavor profile bars (Body/Acidity/Sweetness/Roast) | `product.metafields.custom.body` etc. (integer 1–5) | **per product** — flavor differs per coffee even within a country |
| Tasting notes ("Milk Chocolate, Toasted Nuts, Caramel") | `product.metafields.custom.tasting_notes` (list.single_line_text) or list of `tasting_note` metaobjects | **per product** |
| Sourcing description ("Sourced from small farms across Minas Gerais…") | `origin.sourcing_copy` | shared metaobject (regional story) |
| Brewing recommendations (Drip/Pour Over/French Press/AeroPress/Espresso) | `product.metafields.custom.brew_methods` (list.metaobject_reference → `brew_method`) | **per product** (medium roast recommends different methods than light) |
| Origin map / icon | `origin.map_image` | shared metaobject |
| "Why you'll love it" bullets | `product.metafields.custom.love_points` (list.single_line_text) with `origin.love_points` fallback | per product override, origin default |
| Long description (accordion) | `product.description` | native, per product |
| Short description (under price) | `product.metafields.custom.short_description` | per product |

**Rule of thumb used throughout:**
- **Per-product metafield** = anything that varies between two coffees from the same country (roast, flavor bars, tasting notes, brew methods, short copy, savings).
- **Shared metaobject** = anything tied to the *region* (country name, map, sourcing story, default love-points, FAQ-by-origin).

The flavor bars render as a 5-dot scale:
```liquid
{%- assign score = product.metafields.custom.body.value | default: 0 -%}
<span class="profile-bar" aria-label="Body {{ score }} of 5">
  {%- for i in (1..5) -%}
    <span class="dot{% if i <= score %} dot--on{% endif %}"></span>
  {%- endfor -%}
</span>
```

---

## 3. Metaobjects & metafields configuration

Create in **Settings → Custom data**. Definition names use `snake_case` keys; access in Liquid via `.value`.

### 3.1 Metaobject: `coffee_origin` (shared per region)
| Field key | Type | Purpose |
|---|---|---|
| `country` | Single line text | "Brazil" |
| `region` | Single line text | "Minas Gerais" |
| `map_image` | File (image) | SVG/PNG origin map shown in the Origin column |
| `flag_icon` | File (image) | optional small flag/icon |
| `sourcing_copy` | Multi-line text / Rich text | "Sourced from small farms across Minas Gerais…" |
| `sourcing_link` | URL | → origin story page (`/pages/origin-…`) |
| `default_love_points` | List of single line text | fallback "Why you'll love it" bullets |
| `default_brew_methods` | List of metaobject ref → `brew_method` | regional brew default |
| `seo_blurb` | Multi-line text | AI/SEO origin sentence (see §6) |
| `handle` | (system) | used to build internal links |

### 3.2 Metaobject: `brew_method`
| Field key | Type | Purpose |
|---|---|---|
| `name` | Single line text | "Pour Over" |
| `icon` | File (image, SVG) | brew icon shown in the Brewing column |
| `guide_url` | URL | → `/pages/brewing-guides#pour-over` |
| `sort` | Integer | display order |

### 3.3 Metaobject: `coffee_badge` (the pills: Farm Direct, Organic, Decaf, Single Origin…)
| Field key | Type | Purpose |
|---|---|---|
| `label` | Single line text | "Farm Direct" |
| `icon` | File (image, SVG) | pill icon |
| `sublabel` | Single line text | optional ("Ethical & sustainable") |
| `tooltip` | Multi-line text | optional |

### 3.4 Metaobject: `tasting_note` (optional, for icons/links per note)
| Field key | Type | Purpose |
|---|---|---|
| `name` | Single line text | "Milk Chocolate" |
| `icon` | File (image) | optional |
*(If you don't need per-note icons, skip this and store tasting notes as a plain `list.single_line_text` metafield — recommended to start.)*

### 3.5 Metaobject: `coffee_faq` (FAQ entry)
| Field key | Type | Purpose |
|---|---|---|
| `question` | Single line text | |
| `answer` | Rich text | |
| `scope` | Single line text / list | "global", a product_type ("single-origin"), or an origin handle — controls where it shows |
| `sort` | Integer | |

### 3.6 Metaobject: `trust_badge` (the 3-up + 4-up strips, store-wide)
| Field key | Type | Purpose |
|---|---|---|
| `title` | Single line text | "Fresh Roasted" |
| `subtitle` | Single line text | "Roasted to order" |
| `icon` | File (image, SVG) | |
*(Reference once theme-wide; do not attach per product.)*

### 3.7 Product metafields (`custom.*` unless noted)
| Metafield | Type | Drives |
|---|---|---|
| `custom.origin` | Metaobject reference → `coffee_origin` | the whole origin column + sourcing + map |
| `shopify.coffee-roast` | (Shopify standard taxonomy — exists) | roast pill + roast bar |
| `custom.short_description` | Multi-line text | summary under price |
| `custom.body` | Integer (1–5) | Body bar |
| `custom.acidity` | Integer (1–5) | Acidity bar |
| `custom.sweetness` | Integer (1–5) | Sweetness bar |
| `custom.roast_intensity` | Integer (1–5) | Roast bar |
| `custom.tasting_notes` | List · single line text | tasting notes chips |
| `custom.brew_methods` | List · metaobject ref → `brew_method` | brewing column |
| `custom.love_points` | List · single line text | "Why you'll love it" |
| `custom.badges` | List · metaobject ref → `coffee_badge` | pill row |
| `custom.product_type` | Single line text (exists) | breadcrumb crumb + product-type FAQ scope |
| `custom.savings_label_2pack` / `_3pack` | Single line text | optional override of "SAVE 10%/15%" |
| `custom.ribbon_label` | Single line text | "Roasted to order" image ribbon (optional) |
| `custom.ships_from` / `custom.lead_time` | Single line text | optional per-product override of ships box |
| `seo.*` | (see §6) | meta title/description by origin |

**Metaobjects vs metafields — the rule:** Reusable, shared-across-products content (origin story, brew icons, badge definitions, trust strip, FAQ library) = **metaobjects**. Per-product values and per-product *links/selections into* those metaobjects = **product metafields**. Never duplicate origin copy on every product; link it.

---

## 4. Subscription app integration (Subi)

Subi is already installed and configured in `product.json` (`subi-subscriptions/blocks/app-block/...`). Keep it as the **single source of truth for selling plans** so cart/checkout stay native — do **not** build a custom subscription UI that bypasses the app's form fields.

### 4.1 Visual: one-time vs Subscribe & Save
- Keep Subi's app block placed **above the variant picker** (current order), rendered as the two-radio "Purchase options" widget seen in the reference (One-Time Purchase / Subscribe and Save 10%).
- Use Subi's "skin" that renders radio rows; set widget label "Purchase options" (already set). The 10% is configured in the app's selling plan, surfaced via `subscription_text: "Subscribe and Save 10%"`.

### 4.2 Delivery frequency
The "Deliver every [15 days ▾]" dropdown is rendered by Subi when Subscribe is selected. Configure the selling plan group's intervals in the Subi admin (15/30/45/60 days). Don't hardcode a separate select — it must be the app's field so the chosen `selling_plan` is submitted to cart.

### 4.3 Styling to match the design
- Subi exposes block settings (text labels — already customized) and the app injects its own CSS. Override **cosmetically only** with scoped CSS in a theme asset (`assets/subscription-overrides.css`) targeting the app block's wrapper class. Match: radio accent = brand green, selected row border/background, font = `var(--font-body--family)`, the price-each suffix styling. **Do not** restructure its DOM.
- Constrain overrides under the section so they don't leak: prefix with the product details container class.

### 4.4 Avoid loading unnecessary subscription scripts
- Subi loads via its app embed / app block only on pages where the block is present — it already is only on product templates. Ensure the app embed (theme `app-embed`) is **not** also force-loading the widget storewide; if it is, disable the global embed and rely on the per-template app block so non-product pages don't pay the cost.
- Keep the app block **out of above-the-fold critical path**: it's fine where it is (below price), and its script is `defer`/async by the app. Do not move subscription JS into `layout/theme.liquid` head.
- Don't render the Subi block on templates that have no subscription product (`product.k-cups.json`, `product.tea.json`) unless those SKUs subscribe.

### 4.5 Keep the form cart/checkout compatible
- The Subi block **must live inside the product form** (`buy-buttons`/product form scope) so the `selling_plan` hidden input is submitted. In Horizon the `product-information` section wraps details in the product form — verify the app block is inside that form context. If selling plan isn't reaching the cart, the block is outside the form: move it within the details form wrapper.
- Test: add a subscription item → cart line shows the selling plan name + frequency → checkout shows recurring terms.

### 4.6 Products without a subscription option
- Subi only renders selling-plan UI when the product has an associated selling plan group. For products with no plan, the widget collapses to one-time automatically — but to be safe, guard:
```liquid
{%- if product.selling_plan_groups.size > 0 -%}
  {%- render Subi block -%}
{%- endif -%}
```
In Horizon JSON you can't `if` around a block, so instead rely on Subi's built-in empty-state (it hides itself) OR maintain a separate template (`product.no-subscription.json`) without the block for non-sub products and assign via template suffix.

---

## 5. CRO best practices

1. **Savings messaging** — Size cards show "SAVE 10% / SAVE 15%" with the higher per-LB value struck. Add a per-LB unit price ("$X/lb") on each card so the value of multi-packs is obvious. Subscribe row shows the discounted price each + "Save 10%".
2. **Free-shipping threshold** — "FREE SHIPPING ON ORDERS OVER $35" is in the announcement bar already; **repeat it contextually** near Add to Cart as a thin reassurance line, and ideally a dynamic "You're $X away from free shipping" in the cart drawer (`cart-drawer.liquid`).
3. **Trust badges** — the 3-up (Fresh Roasted / Farm Direct / Free Shipping) directly under the meta pills, plus the 4-up strip (Freshness Guaranteed / Fast Shipping / Store It Right / Questions) above reviews. Store-wide metaobject-driven (§3.6).
4. **Reviews placement** — stars in the header (above the fold, social proof early) + full Judge.me widget mid-page (already present). Ensure the header stars deep-link to the widget.
5. **Sticky mobile add-to-cart** — see §9; add a `block-sticky-atc` that mirrors price + selected variant + Add to Cart, revealed on scroll past the main buy button (IntersectionObserver).
6. **Education without overwhelm** — keep the long description, "Coffee Information", and detailed specs inside **accordions** (already an accordion block); the flavor/origin/brewing band is scannable (icons + bars), not paragraphs. Progressive disclosure.
7. **Cross-sell** — keep `product-recommendations` "You may also like" (related, 3 across) — already present and styled.
8. **FAQ** — `block-coffee-faq` with 4–6 Q&As (shipping, storage, organic, subscriptions) pulled from `coffee_faq` metaobjects scoped global + by product_type/origin. Also emits FAQ schema (§6).
9. **Newsletter capture** — keep the "Unlock 10% Off First Order" band (already present, Klaviyo `openForm SJ8rD3`) near the bottom, after value has been communicated. Don't pop it above the fold on PDP.
10. **Bundling** — the 2-pack/3-pack *are* the bundle (Size variants). Reinforce with "Best value" tag on the 3-pack card and the per-LB price comparison. Optionally a "Build your own sampler" cross-link to a bundle product.

---

## 6. SEO & AI-overview optimization

All schema as **JSON-LD** in dedicated snippets, rendered once each. There's already a `tapita-seo-schema.liquid` snippet — audit it first to **avoid duplicate Product/Review schema** (two Product nodes = Google ignores both). Consolidate to one source.

- **Product schema** (`snippets/schema-product.liquid`): `Product` with `name`, `image`, `description` (use `short_description`), `brand` (Latitude 23.5°), `sku`, `offers` (AggregateOffer across size variants, price, availability, priceCurrency, shippingDetails for free-shipping), `additionalProperty` for roast/origin/tasting notes (great for AI overviews).
- **Review schema**: prefer Judge.me's own structured data (enable it in Judge.me settings) and **disable theme review schema** to avoid duplication. If Judge.me schema is off, emit `aggregateRating` from `metafields.reviews.rating`/`rating_count` inside the Product node — not as a separate node.
- **FAQ schema** (`FAQPage`): emitted by `block-coffee-faq` from the same `coffee_faq` entries it renders (single source → no content/markup mismatch, which Google requires).
- **Breadcrumb schema** (`BreadcrumbList`): from `snippets/breadcrumbs.liquid`, mirroring the visible breadcrumb (Home / Coffee / {product_type} / {title}).
- **Dynamic SEO copy by origin**: set `metafields.global.title_tag` and `global.description_tag` (already referenced in `meta-tags.liquid`) per product, templated like `{{ product.title }} — {{ roast }} Roast Coffee from {{ origin.country }} | Latitude 23.5°`. The `origin.seo_blurb` feeds the meta description fallback.
- **AI-friendly descriptions**: write the short description and love-points as **factual, attribute-rich, self-contained sentences** ("Brazil Direct is a medium-roast single-origin coffee from Minas Gerais with tasting notes of milk chocolate, toasted nuts, and caramel; farm-direct sourced; roasted to order in Sarasota, FL"). Surface roast/origin/notes as `additionalProperty` so LLMs and Google's AI Overviews can extract them.
- **Internal links**: origin column → origin story page (`origin.sourcing_link`); each brew icon → `/pages/brewing-guides#method`; subscription mention → `/pages/subscriptions`; a "Buying for a cafe?" link → `/pages/wholesale`. These also strengthen topical internal linking.

---

## 7. Theme architecture (files to create / touch)

```
templates/
  product.json                ← edit: insert custom blocks into _product-details block_order
  product.coffee.json         ← optional: copy of product.json as the canonical coffee PDP
                                 (assign coffee products the "coffee" template suffix)
  product.no-subscription.json← optional: same minus Subi block (§4.6)

sections/
  product-information.liquid  ← exists; no structural change (renders blocks)

blocks/                       ← NEW custom theme blocks (underscore-free = merchant-addable)
  coffee-badges.liquid        ← meta pills (roast/origin/farm-direct) + 3-up trust strip
  size-cards.liquid           ← 1LB / 2×1LB / 3×1LB cards over native variant selection
  coffee-profile.liquid       ← Why you'll love it | Flavor bars | Origin+map | Brewing
  coffee-faq.liquid           ← FAQ accordion + FAQPage JSON-LD
  image-ribbon.liquid         ← "Roasted to order" overlay on gallery
  sticky-atc.liquid           ← mobile sticky add-to-cart

snippets/
  breadcrumbs.liquid          ← visible crumb + BreadcrumbList JSON-LD
  schema-product.liquid       ← single Product+offers(+aggregateRating) JSON-LD
  coffee-origin-resolve.liquid← shared Liquid: resolves origin override→metaobject→fallback
  flavor-bar.liquid           ← reusable 5-dot bar (param: score, label)

assets/
  coffee-pdp.css              ← all PDP-specific styles (pills, cards, profile grid, faq)
  subscription-overrides.css  ← Subi cosmetic overrides (§4.3)
  sticky-atc.js               ← IntersectionObserver for mobile sticky bar (only JS needed)
```

**Liquid approach**
- Custom blocks read `closest.product` (Horizon scope) — same pattern as existing JSON (`{{ closest.product.metafields... }}`).
- Centralize origin resolution in `snippets/coffee-origin-resolve.liquid` (assigns `origin`, `country`, `region`, etc.) and `{% render %}` it at the top of each custom block so logic isn't duplicated.
- Use `{% render %}` (not `{% include %}`) for scoping/perf.
- Guard every dynamic field with `default:` fallbacks so an origin with missing data never renders blank/broken.

**CSS organization**
- One PDP stylesheet `coffee-pdp.css`, loaded by the section/blocks (Horizon supports `{{ 'coffee-pdp.css' | asset_url | stylesheet_tag }}` once, or per-block `{% stylesheet %}` which Horizon dedupes). Prefer `{% stylesheet %}` inside each block so CSS ships only when the block is on the page.
- Reuse theme tokens: `var(--color-foreground)`, `var(--font-body--family)`, the existing scheme colors. No new color system.

**JavaScript approach**
- **Only one custom script**: `sticky-atc.js` (IntersectionObserver, ~30 lines, `defer`).
- Everything else uses native Horizon web components (variant selection, gallery, quantity) and the apps' own JS (Judge.me, Subi). No jQuery, no framework.

---

## 8. Performance requirements

- **Lazy load images**: gallery uses native `loading="lazy"` on non-first media; first/LCP image `loading="eager"` + `fetchpriority="high"`. Origin map, brew icons, trust icons all `loading="lazy"` (below fold).
- **Optimized thumbnails**: serve thumbnails at the rendered size with `image_url: width: 88` + `srcset` (Horizon's `image` snippet already does responsive `srcset`). SVGs for icons/map (no raster scaling cost).
- **Minimal JS**: one custom script (sticky bar). Profile bars are pure CSS. Accordions use native `<details>`/Horizon accordion (no JS).
- **No app scripts above the fold**: Subi and Judge.me load below the LCP region; don't inline their scripts in `<head>`. Klaviyo form opens on click only (already implemented via `openForm`).
- **Fast mobile**: defer non-critical CSS; inline only critical above-fold rules if needed. Avoid the heavy gradient repaint by keeping it desktop-only (already `@media min-width:800px`).
- **Clean Liquid**: resolve origin once per render (shared snippet), avoid N+1 metaobject lookups inside loops, cap recommendation/list queries (`max_products` already 3/6).
- **Avoid duplicate content**: one Product schema source (§6), one canonical (Shopify default), `short_description` ≠ `description` so they're not duplicated, and the same FAQ data feeds both visible markup and schema.
- **Lightweight subscription**: per-template app block (not storewide embed), cosmetic CSS only, no custom subscription JS.

---

## 9. Mobile experience

- **Gallery**: single-column swipeable carousel with **dots** (already `slideshow_mobile_controls_style: dots`); thumbnails hidden or below. Image first, details stack beneath.
- **Sticky Add to Cart** (`block-sticky-atc` + `sticky-atc.js`): fixed bottom bar appearing after the user scrolls past the inline buy button; shows mini thumbnail + current price + "Add to cart". Mirrors the native form's selected variant (reads the form's selected variant id) so it submits correctly. Hidden on desktop.
- **Purchase options**: size cards reflow to a single row of 3 compact cards (or 2-up + 1) ; Subi radios stack full-width; grind/quantity full-width.
- **Accordion sections**: the descriptive content (Coffee Information, specs, shipping) collapsed by default to keep the page short; FAQ as accordions too.
- **Reviews**: Judge.me responsive widget; keep header stars visible above fold.
- **FAQ**: native accordions, one open at a time optional.
- **Cross-sells**: "You may also like" becomes a horizontal swipe carousel on mobile (`carousel_on_mobile` — currently `false` for recommendations; set `true` for the "Discover more" product-list which already supports it).
- Tap targets ≥ 44px (size cards, radios, ATC) — matches the existing `.quantity-selector-wrapper{height:40px}`; bump to 44 on mobile.

---

## 10. Build order (suggested sequence)

1. **Custom data**: create the 6 metaobject definitions (§3.1–3.6) + product metafields (§3.7). Populate Brazil Direct + one more origin (e.g. Ethiopia) to test dynamism.
2. **Snippets**: `coffee-origin-resolve`, `flavor-bar`, `breadcrumbs`, `schema-product`.
3. **Blocks**: `coffee-badges` → `size-cards` → `coffee-profile` → `coffee-faq` → `image-ribbon` → `sticky-atc`. Test each in the theme editor against both origins.
4. **Wire into `product.json`** `_product-details.block_order` and add full-width blocks/sections below.
5. **Subi**: verify form scope, add `subscription-overrides.css`, test sub add-to-cart → checkout.
6. **SEO**: consolidate schema (remove duplicate from `tapita-seo-schema`/theme review schema), set `title_tag`/`description_tag` per product.
7. **Perf pass**: Lighthouse mobile; confirm one Product JSON-LD, lazy images, no above-fold app JS.
8. **QA matrix**: Brazil, Ethiopia (light roast, different brews), Decaf, K-Cups (no/low data) → confirm graceful fallbacks and that non-coffee templates (`tea`, `k-cups`) are unaffected.

### Acceptance criteria
- Switching `custom.origin` + roast/flavor metafields on any product changes the entire page with **zero theme edits**.
- One `product.json` (or `product.coffee.json`) serves all origins.
- Subscription line items carry the selling plan to checkout.
- Exactly one Product, one Breadcrumb, one FAQ JSON-LD; reviews via Judge.me only.
- Mobile sticky ATC works; LCP image eager, everything else lazy.
- No new framework JS beyond `sticky-atc.js`.
```
