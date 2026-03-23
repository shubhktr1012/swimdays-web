# SEO Performance Combined Pass Design

## Goal

Raise the overall site audit score materially by attacking the remaining high-impact image and performance issues without changing storefront layout, checkout flow, or merchandising behavior.

## Approved Direction

- Use a combined pass instead of another theme-only micro-optimization.
- Keep every change visually safe and reversible.
- Prefer code-side delivery improvements first, then replace only the highest-impact uploaded assets that do not change layout geometry.
- Validate on the draft theme before any live rollout.

## Problem Summary

The live audit on March 23, 2026 shows that classic SEO is no longer the bottleneck. Core SEO is already strong, but the overall score is still being pulled down by image delivery and performance:

- Overall: `43 / F`
- Images: `60`
- Performance: `68`
- Accessibility: `70`

The audit still reports many oversized image requests, especially:

- product imagery requested at `2560px`
- collection/editorial imagery requested at `1920px`
- article and video poster imagery requested at `3840px`

There is also a CLS hint from the product-page size guide iframe and ongoing render-blocking pressure from image-heavy routes.

## Recommended Solution

Use one controlled combined pass with two layers:

1. Theme-side delivery changes
2. Targeted uploaded-asset optimization

The theme changes reduce wasted bytes across shared image components. The asset work focuses only on the worst offenders that repeat across key routes, so the score lift is broader than a single-template tweak.

## Theme-Side Changes

### 1. Tighten shared responsive image delivery

Reduce oversized requested widths and improve `sizes` handling in:

- `/Users/shubh/Development/swimdays-web/swimdays-atelier-theme/snippets/product-media.liquid`
- `/Users/shubh/Development/swimdays-web/swimdays-atelier-theme/snippets/resource-image.liquid`
- `/Users/shubh/Development/swimdays-web/swimdays-atelier-theme/blocks/_blog-post-featured-image.liquid`
- `/Users/shubh/Development/swimdays-web/swimdays-atelier-theme/snippets/video.liquid`

This should lower the largest requested Shopify CDN variants without changing how slots are laid out.

### 2. Keep preload and eager-loading behavior selective

Review head-level and route-level image priority in:

- `/Users/shubh/Development/swimdays-web/swimdays-atelier-theme/layout/theme.liquid`

Only true LCP candidates should stay high-priority. Shared or decorative images should not be globally promoted.

### 3. Fix the size-guide CLS hint

Give the size-guide iframe a stable box through markup/CSS adjustments in:

- `/Users/shubh/Development/swimdays-web/swimdays-atelier-theme/snippets/variant-main-picker.liquid`

This should remove the easy layout-shift warning without affecting the dialog behavior.

## Asset-Side Changes

Optimize and replace only the most repeated high-impact uploaded assets:

- homepage/editorial imagery used above the fold
- collection imagery used across collection cards and landing pages
- the blog article cover image used on the featured article and blog page

These replacements must preserve:

- current aspect ratio
- current crop intent
- current visual composition

Product gallery source images are intentionally out of scope for the first combined pass unless the re-audit still shows they are the primary remaining drag. That keeps zoom/detail risk low.

## Why This Approach

- It targets the categories still limiting the overall score.
- It stays within safe storefront boundaries.
- It avoids layout rewrites and business-logic changes.
- It gives two levers for score lift: delivery logic and asset weight.
- It keeps product imagery risk lower than a broad asset replacement sweep.

## Scope

### In Scope

- shared image snippets
- blog featured-image delivery
- video poster delivery
- size-guide iframe stability
- homepage/editorial/collection/article asset optimization
- draft-theme QA and re-audit after deployment

### Out of Scope

- template redesigns
- checkout/cart behavior
- navigation changes
- broad product-image source replacement
- merchant content rewrites
- app configuration changes

## Validation

### Functional

- product galleries still render and zoom as before
- video posters still display and play correctly
- blog feature image still renders crisply without layout shift
- size-guide dialog still opens and displays the PDF correctly
- collection and homepage imagery keep the same crop/composition

### Technical

- no new Liquid or Theme Check syntax errors in touched files
- targeted push succeeds on `Copy of Atelier 2`
- public or preview HTML shows the updated image delivery markup
- follow-up audit should improve `Images` and `Performance` more than another metadata-only pass

## Rollout

1. Apply code changes locally.
2. Validate the touched files.
3. Push code changes to `Copy of Atelier 2`.
4. Replace the targeted uploaded assets in the draft theme/store context.
5. Re-audit.
6. If the visuals and audit both improve, push the same theme-side changes to live and repeat any safe asset replacements there.
