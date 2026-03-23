# SEO Accessibility Score Lift Design

## Goal

Raise the live site’s overall audit score with the safest next batch of theme changes, now that classic SEO and structured data are mostly in place.

## Current Audit Position

- Overall: `42 / F`
- Core SEO: `95`
- Structured Data: `100`
- Social Media: `97`
- Accessibility: `65`
- Images: `60`
- Performance: `68`

The current bottleneck is no longer metadata or schema. The biggest score drag comes from collection filter semantics, unnamed controls, empty-link semantics, and some theme-owned structural issues.

## Approved Direction

Use the balanced score-lift path:

1. Fix theme-owned accessibility and semantics issues in collection filtering and sorting.
2. Fix unnamed/weakly named controls and empty anchor text where the theme owns the markup.
3. Clean up low-risk structural issues that the theme controls.
4. Re-audit before deciding whether asset replacement in Shopify admin is worth doing.

## What This Pass Will Change

### Collection Filters And Sorting

Target the facets system in:

- `/Users/shubh/Development/swimdays-web/swimdays-atelier-theme/blocks/filters.liquid`
- `/Users/shubh/Development/swimdays-web/swimdays-atelier-theme/snippets/list-filter.liquid`
- `/Users/shubh/Development/swimdays-web/swimdays-atelier-theme/snippets/price-filter.liquid`
- `/Users/shubh/Development/swimdays-web/swimdays-atelier-theme/snippets/sorting.liquid`

Scope:

- Remove duplicate IDs created across desktop/mobile/filter-drawer variants.
- Replace invalid listbox/option semantics with native form semantics or valid ARIA usage.
- Ensure close buttons and filter controls expose clear accessible names.
- Preserve the current visual UI and filtering behavior.

### Header / Link Semantics

Target theme-owned navigation and icon links where audit tools are reporting empty or weak anchor semantics.

Likely files:

- `/Users/shubh/Development/swimdays-web/swimdays-atelier-theme/snippets/swimdays-home-header.liquid`
- `/Users/shubh/Development/swimdays-web/swimdays-atelier-theme/snippets/header-actions.liquid`

Scope:

- Ensure icon-only links/buttons retain explicit accessible names.
- Remove or correct theme-owned empty anchor-text cases.
- Avoid changing the current header layout or cart/account behavior.

### Low-Risk Structure Cleanup

Scope:

- Fix heading-order issues where they are caused by theme markup rather than merchant content.
- Leave content-managed issues alone if they come from Shopify page/article body HTML.

## Explicitly Out Of Scope

- Rewriting the Shopify dynamic checkout button markup if Shopify keeps overriding it.
- Editing merchant-managed page body content through the theme.
- Replacing uploaded Shopify image assets in this pass.
- Visual redesigns to filters, header, or product pages.

## Constraint Discovered During Review

The partial-payment page list-structure failure is coming from `{{ closest.page.content }}` on the generic page template, which means the bad list HTML is in Shopify admin content, not in theme markup. That issue should be handled as a separate content/admin task, not folded into this code pass.

## Validation

- `shopify theme check` must not introduce new Liquid errors in the touched files.
- Collection pages must still filter and sort normally on desktop and mobile.
- Header cart/account/search actions must behave exactly as before.
- Re-run the live surface audit and compare scores before deciding on the next batch.
