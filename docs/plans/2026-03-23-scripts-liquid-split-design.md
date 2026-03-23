# Scripts Liquid Split Design

**Date:** 2026-03-23

**Goal**

Reduce the number of render-blocking and module-loaded JavaScript assets on non-product and non-collection routes without breaking core header, search, drawer, or product interactions.

**Problem**

[`scripts.liquid`](/Users/shubh/Development/swimdays-web/swimdays-atelier-theme/snippets/scripts.liquid) currently loads a large set of module scripts globally. The audit shows that many of these scripts are only needed on product, collection, or search routes, but they are still added to every page. This inflates render-blocking cost and total byte weight.

**Constraints**

- Keep the site behavior unchanged on the live storefront.
- Avoid moving logic into many different files in this pass.
- Do not redesign the JS architecture; only reduce route-level overdelivery.
- Keep the import map stable so any existing inline module imports continue to resolve.

**Options Considered**

1. Conservative split
   Move only obviously product-only scripts behind a product check. Lowest risk, but smaller performance gain.

2. Balanced split
   Keep a small global core and move the rest behind route checks for product and collection/search. This is the recommended approach because it gives a meaningful reduction while keeping the change localized to one snippet.

3. Aggressive split
   Push script loading into section-level snippets and feature-specific branches. Highest upside, but materially more likely to miss an indirect dependency.

**Approved Approach**

Use the balanced split:

- Keep global core loading for utilities and sitewide interaction infrastructure.
- Move product behavior scripts behind product-route checks.
- Move collection/search card and pagination scripts behind collection/search checks.
- Keep localized and discount-code loading conditional as it already is.
- Leave the import map intact in this pass.

**Global Core**

- `view-transitions.js`
- `utilities.js`
- `component.js`
- `section-renderer.js`
- `section-hydration.js`
- `morph.js`
- `focus.js`
- `scrolling.js`
- `events.js`
- `popover-polyfill.js`
- `overflow-list.js`
- `dialog.js`
- `auto-close-details.js`

**Collection/Search Only**

- `paginated-list-aspect-ratio.js`
- `paginated-list.js`
- `product-title-truncation.js`
- `product-card.js`
- `quick-add.js`

**Product Only**

- `variant-picker.js`
- `product-form.js`
- `fly-to-cart.js`
- `media.js`
- `product-price.js`
- `product-sku.js`
- `product-title-truncation.js`
- `product-inventory.js`
- `show-more.js`
- `accordion-custom.js`
- `anchored-popover.js`
- `floating-panel.js`
- `component-quantity-selector.js`
- `media-gallery.js`
- `volume-pricing.js`
- `price-per-item.js`
- `volume-pricing-info.js`
- `sticky-add-to-cart.js`
- product-only `RecentlyViewed.addProduct(...)`

**Leave Global For Now**

- `slideshow.js`
- `layered-slideshow.js`
- `video-background.js`
- `rte-formatter.js`

These likely still power multiple non-product sections. They can be split in a later pass once the safe route-level reduction is verified.

**Validation**

- Run `shopify theme check --path swimdays-atelier-theme`
- Push only [`scripts.liquid`](/Users/shubh/Development/swimdays-web/swimdays-atelier-theme/snippets/scripts.liquid) to `Copy of Atelier 2`
- Smoke test:
  - homepage header/menu/search
  - collection page product cards and quick add
  - product page gallery, variant selection, add to cart, sticky bar
  - search modal
  - cart drawer open/close

**Rollout**

If draft smoke tests pass, push the same file to the live `Atelier` theme and re-audit after Shopify storefront cache catches up.
