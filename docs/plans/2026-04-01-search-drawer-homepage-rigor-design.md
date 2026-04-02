# Swimdays Search Drawer And Homepage Rigor Design

**Date:** 2026-04-01

**Goal:** Move Swimdays toward a quieter, more commercially rigorous storefront by redesigning homepage flow and replacing the centered search modal with a right-side shopping drawer.

## Context

Swimdays already has a strong editorial and artisanal point of view. The gap is not taste. The gap is commercial density and shopping momentum.

WearADHD is a useful reference for interaction polish, especially around utility surfaces. Live inspection of `wearadhd.com` with Playwright confirmed that its search experience is not a centered modal. It opens as a right-side utility drawer with the page locked underneath and a predictive search panel anchored inside that drawer layer.

The live-pulled Swimdays theme still uses:

- a centered search dialog in `snippets/search-modal.liquid`
- predictive search rendering in `sections/predictive-search.liquid`
- a small reset state in `snippets/predictive-search-empty-state.liquid`
- a slower homepage flow in `templates/index.json`, including a disabled placeholder block for Swimblogs

## Design Direction

The target mood is not fast-fashion energy. It is quiet luxury with conversion intelligence.

That means:

- keep the Swimdays palette, editorial space, and craft emphasis
- get to products sooner on the homepage
- make search feel like a refined shopping surface, not a utility interruption
- avoid loud urgency patterns that would erode the brand

## Search Drawer

### Structure

Swimdays search will keep the existing predictive-search component and dialog infrastructure, but the shell will change from a centered modal to a right-side drawer.

The drawer will:

- open from the right on desktop
- occupy the full screen on mobile
- lock the page behind it
- focus the search input immediately

### Open State

Before typing, the drawer should present three shopping surfaces:

- Featured products
- Recently viewed products when available
- All products in the store

Featured products will use the current `empty_state_collection` theme setting as a curated row so the merchant can control the lead story without adding new settings in this phase.

All products will render from `collections.all` so the drawer behaves like a mini shop surface instead of a teaser.

### Search Behavior

Typing should filter the all-products grid in place. The interaction should not feel like switching to another page or another search mode.

During active search:

- featured and recently viewed areas collapse away
- the product grid remains in the drawer
- visible results update instantly
- keyboard navigation continues to work
- pressing Enter should open the selected item, or the first visible match when nothing is selected

This phase intentionally narrows predictive search to a product-first experience inside the drawer because that is what the user wants most from the store search experience.

### Visual Direction

The drawer should feel lighter and more editorial than the current dialog, but more commercial than the existing Swimdays presentation.

The key cues are:

- generous spacing in the header
- a clear close action
- section labels that feel like merchandising cues
- a calm right-edge sheet instead of a floating centered box
- smooth collapse behavior when moving from open state to filtered state

## Homepage

### Structural Changes

The homepage should get to shopping earlier while preserving the Swimdays softness.

The new order for phase 1 is:

1. Hero
2. Shop all products
3. Moss and Cove collections
4. Shop by category
5. The Craft
6. Editorial/blog strip

The brand statement should remain, but it should support the shopping flow rather than sitting as a hard stop near the top of the page.

### Content Adjustments

The disabled Swimblogs placeholder block should be removed from the homepage flow because blogs are already live and the placeholder lowers confidence.

The product section should move closer to the top so visitors can start shopping sooner.

## Technical Approach

This phase should reuse as much of the current theme system as possible:

- keep `predictive-search.js` as the behavioral core
- reuse the dialog drawer pattern already present in filter drawers
- reuse `resource-card` for search product tiles
- keep homepage changes primarily in `templates/index.json` and existing Swimdays sections

## Risks And Constraints

- Rendering `collections.all` in the drawer is appropriate while the catalog is still compact. If the catalog grows significantly, this should shift to a server-assisted or paginated strategy.
- `templates/index.json` is Shopify-generated and may be overwritten by later theme-editor activity, so homepage reordering should be treated carefully.
- The repo currently contains freshly pulled live-theme changes, so unrelated pulled files should not be overwritten casually.
