# SEO Performance Pass Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Improve a few remaining SEO and performance audit findings with a small, low-risk theme pass.

**Architecture:** Keep the changes limited to head markup and shared image snippets. Improve image delivery by preloading only the highest-value images and trimming oversized CDN width candidates, without changing storefront behavior.

**Tech Stack:** Shopify Liquid theme, Shopify CDN responsive images, Shopify CLI theme validation and targeted theme push

---

### Task 1: Add low-risk image preloads

**Files:**
- Modify: `/Users/shubh/Development/swimdays-web/swimdays-atelier-theme/layout/theme.liquid`

**Step 1: Preload the logo image**

- Add a conditional `<link rel="preload" as="image">` for the configured store logo.
- Keep it conditional so stores without a logo setting do not emit an empty preload.

**Step 2: Preload the primary product image on product pages**

- Add a conditional product-image preload that only renders on product pages with a featured media preview image.
- Use a single reasonable CDN width rather than a very large source.

**Step 3: Re-run a focused head check**

Run:

```bash
sed -n '1,80p' /Users/shubh/Development/swimdays-web/swimdays-atelier-theme/layout/theme.liquid
```

Expected:
- The preloads appear before the favicon and styles/scripts.

### Task 2: Reduce oversized product image candidates

**Files:**
- Modify: `/Users/shubh/Development/swimdays-web/swimdays-atelier-theme/snippets/product-media.liquid`

**Step 1: Lower the maximum requested width**

- Reduce the high-resolution and default main image URL width from `3840` to `2560`.

**Step 2: Trim the responsive widths list**

- Replace the largest width candidates with a tighter set that still covers large desktop product galleries.

**Step 3: Keep media behavior intact**

- Preserve `fetchpriority`, `sizes`, focal point styling, and video/model behavior.

### Task 3: Reduce oversized card/listing image candidates

**Files:**
- Modify: `/Users/shubh/Development/swimdays-web/swimdays-atelier-theme/snippets/resource-image.liquid`

**Step 1: Tighten the shared widths set**

- Replace the very large width candidates with a smaller list appropriate for cards and editorial resource blocks.

**Step 2: Lower the base requested width**

- Change the main image request from `3840` to `1920`.

**Step 3: Preserve current sizing logic**

- Keep the existing aspect-ratio, placeholder, overlay, and layout-specific `sizes` handling unchanged.

### Task 4: Validate and prepare rollout

**Files:**
- Review: `/Users/shubh/Development/swimdays-web/swimdays-atelier-theme/layout/theme.liquid`
- Review: `/Users/shubh/Development/swimdays-web/swimdays-atelier-theme/snippets/product-media.liquid`
- Review: `/Users/shubh/Development/swimdays-web/swimdays-atelier-theme/snippets/resource-image.liquid`

**Step 1: Run theme validation**

Run:

```bash
shopify theme check --path /Users/shubh/Development/swimdays-web/swimdays-atelier-theme
```

Expected:
- No new syntax errors in the touched files, even if unrelated pre-existing issues remain elsewhere in the theme.

**Step 2: Review the focused diff**

Run:

```bash
git diff -- /Users/shubh/Development/swimdays-web/swimdays-atelier-theme/layout/theme.liquid /Users/shubh/Development/swimdays-web/swimdays-atelier-theme/snippets/product-media.liquid /Users/shubh/Development/swimdays-web/swimdays-atelier-theme/snippets/resource-image.liquid
```

Expected:
- The diff is limited to the approved preload and image-width adjustments.

**Step 3: Push to the draft theme first**

Run:

```bash
shopify theme push --theme 160872005867 --path /Users/shubh/Development/swimdays-web/swimdays-atelier-theme --nodelete --only layout/theme.liquid --only snippets/product-media.liquid --only snippets/resource-image.liquid
```

Expected:
- The performance/accessibility pass is available on `Copy of Atelier 2` for a quick storefront check before any live push.
