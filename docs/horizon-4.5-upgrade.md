# Horizon 4.5.0 upgrade

Updated locally on November 12, 2026 from Horizon 3.1.0.

## Source

- Repository: https://github.com/Shopify/horizon
- Upstream revision: `c531fd5` (Horizon 4.5.0; release commit `51b31c9`).
- Merge baseline: Horizon 3.1.0 (`ddc69b4`).
- Original local revision: `5211d7f`.

## What was retained

All merchant JSON templates, section group JSON files, and
`config/settings_data.json` remain byte-for-byte identical to the original revision.
Custom canister sections, AI blocks, Tapita integration, and store documents remain.
The custom size picker, dropdown interactions, horizontal recommendations,
subscription presentation script, header call-to-action, mobile slide images,
product image gradient, and social landing header/footer rules were carried forward.
Quantity controls retain the original separate wrapper and full-width layout,
with the new volume-pricing and purchase logic retained.

Horizon 4.5 introduces a new palette system. The legacy scheme definitions and
controls remain available alongside it. `legacy-section-colors.liquid` applies
saved section colors, while shared group wrappers honor saved inheritance rules.
Legacy translation keys used by retained files were kept.

New upstream default templates were deliberately not installed over store templates.
Upstream source files removed or relocated are retained when needed by custom files.
The upstream license is included in `LICENSE.md`.

## Validation

- All 87 JavaScript assets pass `node --check`.
- `git diff --check` passes.
- Theme Check: 20 errors and 142 warnings.
- 18 errors are the existing Judge.me/Subi app block references that cannot be
  resolved from local app source.
- Two errors concern `applicable_disclosures`; the unmodified upstream source
  produces the same errors with the installed Shopify CLI.
- No Liquid/HTML syntax, schema structure, or translation errors remain.

## Storefront verification still required

This upgrade has not been uploaded, pushed, or published. Static checks cannot
verify Shopify rendering, app execution, or checkout. Preview as an unpublished
theme before publication and inspect:

1. Home, collection, coffee, tea, K-Cup, canister, and social landing pages on desktop/mobile.
2. Saved brand colors, header button, navigation, and mobile slide images.
3. Size and grind selection, price updates, quantity controls, and correct cart variants.
4. Subi selling plans in cart/checkout and Judge.me rendering.
5. Cart drawer, quick add, product recommendations, and theme editor section reloads.

The previously reported canister cart event issue and inaccurate coffee setup guide
were intentionally left for the follow-up fixes requested after this upgrade.

## Style preservation follow-up

Compared the 3.1.0 customizations against the original Shopify 3.1.0 source,
then audited 149 custom CSS declarations against the upgraded files. Rules with
new component scopes were checked with their corresponding markup; equivalent
media queries and quote changes were treated as equivalent.

Restored variant dropdown borders, the quantity wrapper and spacing, mobile card
layout rules, and horizontal recommendation alignment. Restored the missing global
appearance controls, including sale/sold-out badge schemes, drawer/popover borders,
shadows, and quick-add colors. Drawer and popover schemes are mapped onto the new
4.5 component classes. All previously saved global setting IDs remain defined.

`assets/latitude-legacy-styles.css` holds the presentation overrides with more
specific selectors where upstream component rules would otherwise take priority.
Slides now hide the desktop image on mobile only when a mobile image is configured.

All 87 JavaScript syntax checks and whitespace checks pass. Theme Check still has
the same 20 known errors (18 app references, two upstream filter checks), with no
Liquid/HTML syntax or translation errors. This is source-level compatibility
validation; visual equivalence is not confirmed until both versions are rendered
in Shopify at matching desktop and mobile viewport sizes.

### Live reference access

The reference storefront is https://latitudecoffee.com/. Its public theme metadata
reports Horizon 3.1.0, theme ID `155601535213`. The permanent Shopify domain exposed
by the storefront is `latitude-23-5-coffee-and-tea.myshopify.com`.

Public HTML and base CSS were retrieved for reference. No theme was uploaded.
A rendered before/after comparison remains blocked: the browser access host was
unavailable, and Shopify CLI returned HTTP 401 (`Service is not valid for
authentication`) when reading this store's theme list. Authenticate Shopify CLI
for that store before creating an unpublished development preview.

## Published preview and visual comparison

An unpublished preview was uploaded successfully after Shopify authentication and
identity verification. Theme: **Latitude Horizon 4.5 style review**, ID
`190389289197`. Preview: https://latitudecoffee.com/?preview_theme_id=190389289197
The live theme remains `155601535213`; it was not uploaded or published.

Compared the homepage and Brazil Direct product page at desktop and iPhone 16
(393 × 852) viewport sizes, plus the desktop coffee collection and mobile footer.
The comparison revealed and corrected differences that static checks did not catch:

- Legacy section color settings arrive as Liquid color-scheme objects, not just
  IDs. The compatibility renderer now handles both forms.
- Restored header underlay and cart-count colors, slide foreground colors,
  previous typography measures/spacing, and button weights.
- Restored the hero content's minimum height for vertical centering.
- Restored quantity spacing around the new nested selector wrapper and the
  previous dropdown backgrounds and caret colors.
- Reconnected the custom roast badges and card-level color schemes, and restored
  horizontal variant dropdowns on collection cards.
- Disabled footer content containment, which collapsed the existing image-backed
  footer, and retained blank menu headings rather than newly inferred menu titles.

`legacy-design-tokens.liquid` retains the previous token definitions while the new
4.5 definitions continue supplying tokens that did not exist in 3.1.

Theme Check still reports 20 known errors (18 local app-source references and two
upstream filter checks), with 142 warnings. Whitespace checks pass. This is a
representative visual comparison, not a pixel-diff certification of every template,
locale, viewport, app state, or checkout. Shopify's newer account icon and component
behavior remain. No checkout or subscription purchase was submitted.

### Follow-up visual and subscription fixes

Restored pill corners on variant dropdowns and the original horizontal recommendation-card grid (with sufficient specificity for the new card styles). The footer now prefers its saved legacy scheme over the new default background contrast override. Restored the text block color selector and its saved CSS variable output, including the gold footer heading.

Product prices now read the selected selling-plan allocation for the current variant. Subscription prices show the regular amount crossed out; switching to one-time purchase restores the server-rendered price markup. Verified locally on Monsooned Malabar: 3 lb $55.59 → $50.03, 1 lb $21.80 → $19.62, and switching back to one-time purchase. Visually checked rounded dropdowns, compact recommendations, and the footer palette. Changes uploaded only to unpublished review theme 190389289197.

### Cart drawer appearance

The cart opts into modal overlay behavior at every viewport, retaining the native dialog focus trap, backdrop dismissal, Escape handling, and scroll lock. Other theme drawers retain their upstream sidebar behavior. Cart state does not persist open across navigation. Restored the 400px drawer width, larger cart title, plain close icon, quantity border, summary typography, and open-note minus icon. Verified empty and populated carts locally and removed the temporary test item. Uploaded only to unpublished theme 190389289197.

### Subi frequency control stability

Narrowed the legacy subscription-row flex rules to the purchase-label container, rather than forcing the app-controlled delivery wrapper into flex layout. Added scoped stable sizing for the visible frequency control while preserving Subi's inline hidden/open dropdown state, removed unsupported :has-text CSS selectors, and disabled dropdown animation. No replacement widget or additional event observers. Verified locally on Espresso Venezia: one-time/subscription switching, intentional menu opening, selecting Every 30 days, and subscription price display. Uploaded CSS only to unpublished theme 190389289197.

## Theme Check error audit — November 12, 2026

Re-ran both installed Shopify CLI 5.0.1 and `npx @shopify/cli@latest`.
Both report the same 20 errors and 138 warnings.

- 18 `JSONMissingBlock` errors incorrectly resolve `shopify://apps/...` URIs
  as local `blocks/*.liquid` files. All 18 containing sections/blocks were
  checked and declare `@app` support. These are 13 Judge.me references and
  five Subi references, not missing merchant theme files.
- Two `UnknownFilter` errors occur in `blocks/disclosures.liquid` and
  `snippets/cart-disclosure-tooltip.liquid`. Shopify documents
  `applicable_disclosures` as a valid filter:
  https://shopify.dev/docs/api/liquid/filters/applicable_disclosures
  Both usages match upstream Horizon.

Shopify's app-block false-positive report:
https://community.shopify.dev/t/theme-check-is-reporting-a-missing-block-for-a-valid-app-block/35850

No runtime code was removed and no checks were disabled to reduce the error
count. An optional per-file checker exclusion would suppress these reports,
but would not repair storefront behavior and would reduce coverage in those
files. Store-connected testing is still needed to confirm installed app
availability; local schema validation cannot prove an app remains installed.

## Completed work inventory — November 12, 2026

The initial validation and upload notes above describe milestones at the time
of each change. Current delivery is an unpublished review theme (190389289197);
no live theme publication or live page/product template assignment was performed.

1. Horizon 4.5 upgrade, retaining merchant settings and legacy brand styling.
2. Header account icon alignment, rounded variant dropdowns, footer colors,
   featured blog cards, and compact horizontal product recommendations.
3. Article content block migration so the post body renders before comments.
4. Subscription price synchronization and stable Subi delivery controls.
5. Modal cart drawer appearance and behavior on desktop and mobile.
6. Kenya and Nicaragua farm page templates and seven reusable farm sections.
7. Explore blog and article templates, related products, and native cart actions.
8. Wholesale template, eight reusable sections, shared Klaviyo form integration,
   and a revised handshake icon with matching rendered stroke weight.
9. Equipment page and quote product templates; category tabs can use collections,
   selected products, or manually configured quote listings. The supplied quote
   template's coffee-specific badges, size selector, and purchase controls were
   removed; its main price is hidden.
10. Existing equipment listings copied with their original image URLs: Classe 11,
    Classe 20, Classe 9, Classe 7, Classe 5 Eco, Classe 5, Baby 9, Kryo, and MD.

The quote product template adds one disabled Judge.me app-block reference, so
Theme Check now reports 21 known false-positive errors (19 app references and
2 valid disclosure-filter usages). New equipment/wholesale/catalog section code
has no reported validation issues. Asset JavaScript syntax and git whitespace
checks passed. Review-theme uploads succeeded; a complete final visual and
purchase-flow regression check is still required before live publication.

Remaining merchant setup: choose hero/content photos, configure future equipment
product/collection sources, save article related-product metafields, and assign
new templates to the intended resources when ready. Existing equipment quote
listings and form IDs were copied from supplied templates/current storefront.
