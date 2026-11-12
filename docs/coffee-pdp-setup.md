# Coffee PDP — setup & go-live guide

This covers everything that lives **outside** the theme files: the Custom Data
definitions the new blocks read, plus two manual theme-editor tweaks. The
companion design doc is [product-page-implementation-plan.md](product-page-implementation-plan.md).

## What was built (in the theme)

Blocks (`blocks/`): `coffee-badges`, `size-cards`, `coffee-profile`, `coffee-faq`,
`image-ribbon`, `sticky-atc`.
Snippets (`snippets/`): `flavor-bar`, `breadcrumbs`, `schema-product` (optional).
Assets (`assets/`): `size-cards.js`, `sticky-atc.js`.

Already wired into `templates/product.json`:
- In the product details column: **coffee-badges** and **size-cards** (above the
  Subify purchase-options widget), and **sticky-atc** (mobile) after the buy buttons.
- Full-width below the gallery: **coffee-profile** band (after the product),
  then reviews, then **coffee-faq**, then recommendations / newsletter / carousel.

All blocks **degrade gracefully**: with no metafields/metaobjects populated, each
block (or column) simply hides itself, so the page is never broken — it just gets
richer as you fill in data.

---

## 1. Create metaobject definitions

Settings → Custom data → Metaobjects → Add definition. For each, enable
**"Storefront access"** (coffee-faq especially needs it).

### `coffee_origin`
| Field name | Key | Type |
|---|---|---|
| Country | `country` | Single line text |
| Region | `region` | Single line text |
| Map image | `map_image` | File (image) |
| Flag icon | `flag_icon` | File (image) |
| Sourcing copy | `sourcing_copy` | Multi-line text (or Rich text) |
| Sourcing link | `sourcing_link` | URL |
| Default love points | `default_love_points` | List · Single line text |
| Default brew methods | `default_brew_methods` | List · Metaobject reference → `brew_method` |
| SEO blurb | `seo_blurb` | Multi-line text |

### `brew_method`
| Field | Key | Type |
|---|---|---|
| Name | `name` | Single line text |
| Icon | `icon` | File (image, SVG) |
| Guide URL | `guide_url` | URL |
| Sort | `sort` | Integer |

### `coffee_badge`
| Field | Key | Type |
|---|---|---|
| Label | `label` | Single line text |
| Icon | `icon` | File (image, SVG) |
| Sublabel | `sublabel` | Single line text |

### `coffee_faq`
| Field | Key | Type |
|---|---|---|
| Question | `question` | Single line text |
| Answer | `answer` | Rich text |
| Scope | `scope` | Single line text — `global`, a product type (e.g. `single-origin`), or a `coffee_origin` **handle** |
| Sort | `sort` | Integer |

> The FAQ block shows entries where `scope` = `global`, **or** matches the
> product's `custom.product_type`, **or** matches the linked origin's handle.

---

## 2. Create product metafields

Settings → Custom data → Products → Add definition. Namespace `custom` unless noted.

| Name | Key | Type |
|---|---|---|
| Origin | `custom.origin` | Metaobject reference → `coffee_origin` |
| Origin country override | `custom.origin_country` | Single line text (optional) |
| Short description | `custom.short_description` | Multi-line text |
| Body | `custom.body` | Integer (1–5) |
| Acidity | `custom.acidity` | Integer (1–5) |
| Sweetness | `custom.sweetness` | Integer (1–5) |
| Roast intensity | `custom.roast_intensity` | Integer (1–5) |
| Tasting notes | `custom.tasting_notes` | List · Single line text |
| Brew methods | `custom.brew_methods` | List · Metaobject reference → `brew_method` |
| Why you'll love it | `custom.love_points` | List · Single line text |
| Badges | `custom.badges` | List · Metaobject reference → `coffee_badge` |
| Product type | `custom.product_type` | Single line text *(already in use)* |
| FAQs (optional override) | `custom.faqs` | List · Metaobject reference → `coffee_faq` |
| Ribbon label (optional) | `custom.ribbon_label` | Single line text |

Roast level uses the **Shopify standard** taxonomy metafield
`shopify.coffee-roast` (already populated on your products — the badges + roast
bar read it automatically).

---

## 3. Size variants (for the size cards)

The size cards render a product **option named `Size`** as cards and drive the
native (hidden) variant control — checkout stays native.

1. On each coffee product, add option **Size** with values `1 LB`, `2 × 1 LB`, `3 × 1 LB`.
   (Grind stays a separate option, shown as the dropdown.)
2. Price the multipacks for the discount (e.g. 10% / 15% off).
3. To show the "SAVE 10%" / "SAVE 15%" ribbon, set each multipack variant's
   **Compare-at price** to the full multiple of the 1 LB price
   (2 × $19.80 = $39.60, 3 × $19.80 = $59.40). The card computes the % from that.

The native variant picker already hides any option named `Size`
(see `snippets/variant-main-picker.liquid` → `variant-option--hidden`), so there's
no double UI.

---

## 4. Two manual theme-editor steps

1. **Remove the duplicate roast line.** The details column historically showed
   roast in a small icon+text sub-group (`group_teRhCa` inside the header group).
   `coffee-badges` now shows roast as a pill, so in the theme editor delete the old
   roast sub-group to avoid showing "Medium Roast" twice. (Left in place so nothing
   silently disappears before you review it.)
2. **Place the image ribbon over the gallery.** `image-ribbon` is registered but
   not auto-inserted, because it must sit inside the media gallery's positioned
   container to overlay the image. In the theme editor, add the **Image ribbon**
   block into the media-gallery area. Its label defaults to "Roasted to order"
   and is overridable per product via `custom.ribbon_label`.

Also set per-product **SEO**: `metafields.global.title_tag` and
`global.description_tag` (already read by `snippets/meta-tags.liquid`), e.g.
`Brazil Direct — Medium Roast Coffee from Brazil | Latitude 23.5°`.

---

## 5. Example data — Brazil Direct

**`coffee_origin` entry "Brazil":**
- country: `Brazil`, region: `Minas Gerais`
- sourcing_copy: "Sourced from small farms across Minas Gerais. Direct relationships ensure quality, transparency, and better outcomes for farmers."
- sourcing_link: `/pages/origin-brazil`
- default_love_points: `Smooth, clean, and easy to love` · `Perfect daily sipper` · `Ethically sourced & farm direct` · `Roasted fresh to order`
- default_brew_methods: Drip, Pour Over, French Press, AeroPress, Espresso
- map_image: upload the Brazil map SVG

**Product "Brazil Direct":**
- `custom.origin` → Brazil entry
- `shopify.coffee-roast` → Medium
- `custom.short_description`: "Smooth and balanced with notes of milk chocolate, toasted nuts, and a hint of caramel. A classic Brazilian profile, farm direct."
- body `5`, acidity `2`, sweetness `4`, roast_intensity `3`
- `custom.tasting_notes`: `Milk Chocolate`, `Toasted Nuts`, `Caramel`
- `custom.badges` → Farm Direct
- Size option: 1 LB / 2 × 1 LB / 3 × 1 LB with compare-at prices set

**`coffee_faq` entries (scope `global`):** "When will my coffee ship?",
"How should I store my coffee?", "Is your coffee organic?", "Do you offer subscriptions?".

---

## 6. QA checklist

- [ ] Populate Brazil Direct + one contrasting origin (e.g. Ethiopia, light roast) — confirm the whole page changes with **no theme edit**.
- [ ] Size cards select correctly; price/variant/URL update natively; add a multipack → correct variant in cart.
- [ ] Subscribe (Subify) → cart line carries the selling plan + frequency → checkout shows recurring terms.
- [ ] Exactly **one** Product JSON-LD (theme built-in), one BreadcrumbList, one FAQPage; reviews via Judge.me only. Validate at search.google.com/test/rich-results.
- [ ] Mobile: sticky ATC appears after scrolling past the main button and adds to cart; profile band stacks; FAQ accordions work.
- [ ] Lighthouse mobile: LCP image eager, others lazy; no above-the-fold app JS.
- [ ] Non-coffee templates (`product.tea.json`, `product.k-cups.json`) unaffected — they don't include these blocks.
