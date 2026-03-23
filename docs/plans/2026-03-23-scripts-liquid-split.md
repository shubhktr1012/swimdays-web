# Scripts Liquid Split Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Reduce route-irrelevant JavaScript loading from `snippets/scripts.liquid` without breaking storefront behavior.

**Architecture:** Keep the import map stable, keep a minimal global script core, and move product-only plus collection/search-only module scripts behind route checks. Validate the resulting behavior on the draft theme before shipping live.

**Tech Stack:** Shopify Liquid, Shopify CLI, Theme Check, Playwright, squirrelscan

---

### Task 1: Document the approved split

**Files:**
- Create: `docs/plans/2026-03-23-scripts-liquid-split-design.md`
- Create: `docs/plans/2026-03-23-scripts-liquid-split.md`

**Step 1: Save the approved design**

Write the design doc with:
- problem statement
- approved balanced split
- exact script buckets
- validation plan

**Step 2: Save the implementation plan**

Write this implementation plan with the exact file path and validation commands.

**Step 3: Commit the docs**

Run:

```bash
git add docs/plans/2026-03-23-scripts-liquid-split-design.md docs/plans/2026-03-23-scripts-liquid-split.md
git commit -m "docs: add scripts loading split plan"
```

### Task 2: Refactor route-based script loading

**Files:**
- Modify: `swimdays-atelier-theme/snippets/scripts.liquid`

**Step 1: Keep the import map unchanged**

Do not remove existing imports in this pass.

**Step 2: Introduce route flags**

Add local Liquid booleans for:
- product page
- collection/search page

**Step 3: Keep only the global core unconditional**

Keep these unconditional:
- `view-transitions.js`
- global modulepreloads for core shared utilities
- `popover-polyfill.js`
- `overflow-list.js`
- `dialog.js`
- `auto-close-details.js`

**Step 4: Move collection/search-only scripts behind a route check**

Guard:
- `paginated-list-aspect-ratio.js`
- `paginated-list.js`
- `product-title-truncation.js`
- `product-card.js`
- `quick-add.js`

**Step 5: Move product-only scripts behind a product route check**

Guard:
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
- inline recently viewed module import

**Step 6: Preserve existing conditional logic**

Keep `cart-discount.js` and `localization.js` under their existing conditions.

### Task 3: Local validation

**Files:**
- Modify: `swimdays-atelier-theme/snippets/scripts.liquid`

**Step 1: Run Theme Check**

Run:

```bash
shopify theme check --path swimdays-atelier-theme
```

Expected:
- existing unrelated warnings/errors may remain
- no new syntax or snippet errors from `snippets/scripts.liquid`

**Step 2: Inspect generated diff**

Run:

```bash
git diff -- swimdays-atelier-theme/snippets/scripts.liquid
```

Expected:
- only route-scoping and load-order changes in `snippets/scripts.liquid`

### Task 4: Draft deployment and smoke test

**Files:**
- Modify: `swimdays-atelier-theme/snippets/scripts.liquid`

**Step 1: Push only the changed snippet to draft**

Run:

```bash
shopify theme push --theme 160872005867 --path swimdays-atelier-theme --nodelete --only snippets/scripts.liquid --json
```

**Step 2: Smoke test homepage**

Verify:
- header menu opens
- search opens
- cart drawer opens

**Step 3: Smoke test collection/search**

Verify:
- product cards still hydrate
- quick add still works if present
- collection pagination/list behavior still works

**Step 4: Smoke test product**

Verify:
- variant selection updates correctly
- add to cart works
- sticky add-to-cart works
- media gallery still works

### Task 5: Live rollout

**Files:**
- Modify: `swimdays-atelier-theme/snippets/scripts.liquid`

**Step 1: Push the same snippet live**

Run:

```bash
shopify theme push --theme 160839467243 --path swimdays-atelier-theme --nodelete --allow-live --only snippets/scripts.liquid --json
```

**Step 2: Re-audit after storefront propagation**

Run:

```bash
squirrel audit https://shopswimdays.com -C surface -r -f llm -o tmp/audits/shopswimdays-surface-2026-03-23-post-scripts-pass.llm -n swimdays-web
```

**Step 3: Compare results**

Check whether:
- `perf/render-blocking` item count dropped
- overall `Performance` score improved
- no new accessibility or interaction regressions appeared
