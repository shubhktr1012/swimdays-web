# SEO Performance Pass Design

## Goal

Reduce a few of the remaining public audit penalties without touching storefront layout or purchase flow behavior.

## Approved Direction

- Keep the pass low-risk and theme-only.
- Target image delivery instead of another broad structural change.
- Validate on the theme preview before rolling anything else forward.

## Problem Summary

The latest live crawl shows the site is still losing score on image delivery and performance. The remaining issues are not best solved with another broad SEO rewrite. They need a narrow pass that improves what the theme serves for high-value images.

## Recommended Solution

Use three contained changes:

1. Preload the most important above-the-fold images in `layout/theme.liquid`.
2. Reduce oversized responsive image candidates in `snippets/product-media.liquid`.
3. Reduce oversized resource-list image candidates in `snippets/resource-image.liquid`.

## Why This Approach

- It focuses on the audit categories still dragging the score down.
- It avoids risky changes to templates, routing, or core product/cart logic.
- It uses Shopify CDN sizing controls rather than custom image infrastructure.
- It is reversible and easy to push file-by-file.

## Scope

### In Scope

- `/Users/shubh/Development/swimdays-web/swimdays-atelier-theme/layout/theme.liquid`
- `/Users/shubh/Development/swimdays-web/swimdays-atelier-theme/snippets/product-media.liquid`
- `/Users/shubh/Development/swimdays-web/swimdays-atelier-theme/snippets/resource-image.liquid`

### Out of Scope

- Collection or page template rewrites
- New theme settings
- JavaScript behavior changes
- App or checkout integrations beyond the control label

## Validation

- Confirm `shopify theme check` does not report new syntax issues in the touched files.
- Confirm product pages still render their gallery and dynamic checkout button.
- Confirm preview HTML includes the new image preloads.
- Push only the targeted files to the draft theme before any live rollout.
