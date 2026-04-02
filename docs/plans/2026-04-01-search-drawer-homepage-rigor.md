# Search Drawer And Homepage Rigor Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Replace Swimdays' centered search modal with a right-side shopping drawer and tighten homepage flow so products surface earlier with cleaner editorial-to-commerce pacing.

**Architecture:** Reuse the existing predictive-search custom element, dialog component, and resource-card rendering. Convert the search shell to the theme's drawer pattern, replace the reset-state content with a featured/recently-viewed/all-products catalog layout, then reorder the homepage JSON to bring product-led sections higher and remove the placeholder blog teaser.

**Tech Stack:** Shopify Liquid, theme JSON templates, theme JavaScript custom elements, CSS in section/snippet styles, Playwright for live-reference verification.

---

### Task 1: Document the phase and preserve implementation intent

**Files:**
- Create: `docs/plans/2026-04-01-search-drawer-homepage-rigor-design.md`
- Create: `docs/plans/2026-04-01-search-drawer-homepage-rigor.md`

**Step 1: Save the approved design**

Write the validated direction for:

- right-side search drawer shell
- featured, recently viewed, and all-products open state
- in-place product filtering
- homepage reorder and placeholder removal

**Step 2: Save the implementation plan**

Write the concrete execution sequence and exact files to touch before editing theme code.

### Task 2: Convert the search shell from modal to drawer

**Files:**
- Modify: `swimdays-atelier-theme/snippets/search-modal.liquid`
- Inspect: `swimdays-atelier-theme/assets/dialog.js`
- Reference: `swimdays-atelier-theme/blocks/filters.liquid`

**Step 1: Replace centered dialog classes with drawer classes**

Use the existing drawer pattern already used by filters so search opens as a right-side sheet on desktop and a full-screen sheet on smaller viewports.

**Step 2: Update the drawer header and shell layout**

Keep the input, reset action, and close action, but change spacing and content wrappers to suit a shopping drawer rather than a centered popover.

**Step 3: Remove the search-page footer dependency**

Hide or remove the current view-all footer so the main interaction stays inside the drawer.

### Task 3: Replace the reset-state markup with a catalog layout

**Files:**
- Modify: `swimdays-atelier-theme/snippets/predictive-search-empty-state.liquid`
- Modify: `swimdays-atelier-theme/snippets/predictive-search-products-list.liquid`
- Add: `swimdays-atelier-theme/snippets/predictive-search-open-state.liquid`

**Step 1: Add an open-state snippet**

Render:

- featured products from `settings.empty_state_collection` when available
- recently viewed products when available
- all products from `collections.all`

**Step 2: Support larger grid rendering**

Render the all-products list as a grid suitable for drawer browsing, using existing `resource-card` markup.

**Step 3: Preserve recently viewed behavior**

Keep the existing recently-viewed clear behavior and wrapper refs so current JS hooks continue to work.

### Task 4: Change search behavior from remote swap to in-place product filtering

**Files:**
- Modify: `swimdays-atelier-theme/assets/predictive-search.js`
- Inspect: `swimdays-atelier-theme/sections/predictive-search.liquid`

**Step 1: Keep reset-state loading**

Preserve the reset/open-state load path so the drawer can rebuild its default content cleanly on close or clear.

**Step 2: Add client-side filtering for the open-state product grid**

Filter product cards already rendered in the drawer by title and optional product metadata stored on each card item.

**Step 3: Collapse supporting sections during active search**

When the query is non-empty, hide or collapse featured and recently viewed sections while keeping the all-products grid visible.

**Step 4: Keep keyboard behavior aligned with visible items**

Arrow navigation, tab cycling, and Enter should work only against currently visible results.

### Task 5: Reorder the homepage and remove placeholder content

**Files:**
- Modify: `swimdays-atelier-theme/templates/index.json`

**Step 1: Move the shop-all-products section upward**

Place the product-led section directly after the hero.

**Step 2: Reposition the brand statement**

Keep the brand statement, but move it lower in the sequence so it supports commerce instead of delaying it.

**Step 3: Remove the disabled Swimblogs placeholder block**

Drop the “Coming Soon” block from the homepage order.

### Task 6: Verify behavior

**Files:**
- Verify: `swimdays-atelier-theme/snippets/search-modal.liquid`
- Verify: `swimdays-atelier-theme/assets/predictive-search.js`
- Verify: `swimdays-atelier-theme/templates/index.json`

**Step 1: Run targeted code inspection**

Check that:

- search triggers still point to `#search-modal/showDialog`
- the drawer opens with the correct classes
- reset state contains featured, recently viewed, and all products
- homepage order matches the approved flow

**Step 2: Summarize remaining risks**

Call out:

- `collections.all` scalability for larger catalogs
- homepage JSON editor overwrite risk
- anything not yet covered by theme preview testing
