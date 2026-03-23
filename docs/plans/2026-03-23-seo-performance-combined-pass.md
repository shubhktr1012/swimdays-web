# SEO Performance Combined Pass Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Raise the overall audit score by improving image delivery and stabilizing a few remaining low-risk performance issues without changing storefront behavior.

**Architecture:** Keep the pass focused on shared image-delivery primitives and one contained product-dialog fix. Pair those code changes with a small asset-optimization batch for the most repeated non-product images, then validate on the draft theme before any live rollout.

**Tech Stack:** Shopify Liquid theme, Shopify CDN responsive images, Shopify theme editor assets, Shopify CLI validation/push workflow

---

### Task 1: Tighten shared image delivery for product media

**Files:**
- Modify: `/Users/shubh/Development/swimdays-web/swimdays-atelier-theme/snippets/product-media.liquid`

**Step 1: Review the current width ladder**

Run:

```bash
sed -n '1,140p' /Users/shubh/Development/swimdays-web/swimdays-atelier-theme/snippets/product-media.liquid
```

Expected:
- The current default widths and base image request are visible near the top of the snippet.

**Step 2: Lower the maximum requested product-image width**

- Reduce the base requested preview image width from the current high-water mark to the smallest value that still covers the actual gallery slot on large desktop.
- Keep the separate high-resolution URL in sync with the displayed source request.

**Step 3: Trim the responsive widths list**

- Remove width candidates that exceed the real rendered gallery need.
- Preserve `fetchpriority`, focal-point styling, transition refs, and model/video behavior.

**Step 4: Re-check the snippet**

Run:

```bash
sed -n '1,140p' /Users/shubh/Development/swimdays-web/swimdays-atelier-theme/snippets/product-media.liquid
```

Expected:
- Only width and image-delivery values changed.

### Task 2: Tighten shared image delivery for collection/editorial cards

**Files:**
- Modify: `/Users/shubh/Development/swimdays-web/swimdays-atelier-theme/snippets/resource-image.liquid`

**Step 1: Review the current `sizes` and widths logic**

Run:

```bash
sed -n '1,220p' /Users/shubh/Development/swimdays-web/swimdays-atelier-theme/snippets/resource-image.liquid
```

Expected:
- The snippet shows the shared `sizes`, loading logic, and widths list for article and collection cards.

**Step 2: Tighten desktop `sizes` assumptions**

- Make the generated `sizes` reflect actual multi-column card widths more closely.
- Keep layout-specific logic intact for grid, carousel, editorial, and bento modes.

**Step 3: Trim oversized width candidates**

- Lower the base `image_url` request and width ladder so cards do not ask Shopify for unnecessarily large derivatives.
- Preserve placeholders, overlays, and aspect-ratio behavior.

### Task 3: Reduce oversized article and poster image requests

**Files:**
- Modify: `/Users/shubh/Development/swimdays-web/swimdays-atelier-theme/blocks/_blog-post-featured-image.liquid`
- Modify: `/Users/shubh/Development/swimdays-web/swimdays-atelier-theme/snippets/video.liquid`

**Step 1: Review article featured-image delivery**

Run:

```bash
sed -n '1,120p' /Users/shubh/Development/swimdays-web/swimdays-atelier-theme/blocks/_blog-post-featured-image.liquid
```

Expected:
- The current article image request is still using a very large width ladder.

**Step 2: Lower article featured-image widths**

- Reduce the main request size and candidate widths to values appropriate for the centered blog shell.
- Keep eager/high-priority loading only if the image is still the blog-post LCP element.

**Step 3: Review video poster delivery**

Run:

```bash
sed -n '1,220p' /Users/shubh/Development/swimdays-web/swimdays-atelier-theme/snippets/video.liquid
```

Expected:
- Poster images and placeholder images are requesting oversized widths.

**Step 4: Lower video poster widths**

- Trim the poster and placeholder width requests without changing autoplay, iframe/embed logic, or controls behavior.

### Task 4: Re-check head-level priority loading

**Files:**
- Modify: `/Users/shubh/Development/swimdays-web/swimdays-atelier-theme/layout/theme.liquid`

**Step 1: Review current preload behavior**

Run:

```bash
sed -n '1,90p' /Users/shubh/Development/swimdays-web/swimdays-atelier-theme/layout/theme.liquid
```

Expected:
- The current head shows favicon markup and conditional image preloads.

**Step 2: Keep only justified high-priority image loads**

- Confirm the existing logo preload and product-image preload are still worth keeping.
- Remove or lower priority if a preload is global but not serving a real LCP benefit.

**Step 3: Preserve SEO/head behavior**

- Do not move or break the meta-tags, schema, favicon, stylesheets, or scripts ordering.

### Task 5: Remove the product size-guide CLS hint

**Files:**
- Modify: `/Users/shubh/Development/swimdays-web/swimdays-atelier-theme/snippets/variant-main-picker.liquid`

**Step 1: Review the size-guide dialog markup**

Run:

```bash
sed -n '240,360p' /Users/shubh/Development/swimdays-web/swimdays-atelier-theme/snippets/variant-main-picker.liquid
```

Expected:
- The size-guide iframe is present without explicit dimensions.

**Step 2: Add stable iframe sizing**

- Give the iframe a stable width/height or aspect-ratio-backed wrapper sizing.
- Keep the dialog title, close button, and PDF source unchanged.

**Step 3: Preserve dialog behavior**

- Do not change the open/close flow or scroll-lock behavior.

### Task 6: Prepare the asset optimization batch

**Files:**
- Review only: `/Users/shubh/Development/swimdays-web/tmp/audits/shopswimdays-surface-2026-03-23-pass4.llm`

**Step 1: Identify the first replacement batch**

- Pull the repeated non-product assets from the audit output.
- Prioritize homepage/editorial, collection, and article images before product gallery assets.

**Step 2: Create a replacement checklist**

- Record each target asset URL, where it appears, and the preferred export constraints.
- Preserve aspect ratio and crop intent for each replacement.

**Step 3: Keep the batch intentionally small**

- Limit the first asset batch to the highest-impact safe replacements so QA stays manageable.

### Task 7: Validate locally and on the draft theme

**Files:**
- Review: `/Users/shubh/Development/swimdays-web/swimdays-atelier-theme/layout/theme.liquid`
- Review: `/Users/shubh/Development/swimdays-web/swimdays-atelier-theme/snippets/product-media.liquid`
- Review: `/Users/shubh/Development/swimdays-web/swimdays-atelier-theme/snippets/resource-image.liquid`
- Review: `/Users/shubh/Development/swimdays-web/swimdays-atelier-theme/blocks/_blog-post-featured-image.liquid`
- Review: `/Users/shubh/Development/swimdays-web/swimdays-atelier-theme/snippets/video.liquid`
- Review: `/Users/shubh/Development/swimdays-web/swimdays-atelier-theme/snippets/variant-main-picker.liquid`

**Step 1: Run theme validation**

Run:

```bash
shopify theme check --path /Users/shubh/Development/swimdays-web/swimdays-atelier-theme
```

Expected:
- No new syntax errors in the touched files, even if unrelated theme issues still exist elsewhere.

**Step 2: Review the focused diff**

Run:

```bash
git diff -- /Users/shubh/Development/swimdays-web/swimdays-atelier-theme/layout/theme.liquid /Users/shubh/Development/swimdays-web/swimdays-atelier-theme/snippets/product-media.liquid /Users/shubh/Development/swimdays-web/swimdays-atelier-theme/snippets/resource-image.liquid /Users/shubh/Development/swimdays-web/swimdays-atelier-theme/blocks/_blog-post-featured-image.liquid /Users/shubh/Development/swimdays-web/swimdays-atelier-theme/snippets/video.liquid /Users/shubh/Development/swimdays-web/swimdays-atelier-theme/snippets/variant-main-picker.liquid
```

Expected:
- The diff is limited to image-delivery and size-stability adjustments.

**Step 3: Push the code changes to the draft theme**

Run:

```bash
shopify theme push --theme 160872005867 --path /Users/shubh/Development/swimdays-web/swimdays-atelier-theme --nodelete --only layout/theme.liquid --only snippets/product-media.liquid --only snippets/resource-image.liquid --only blocks/_blog-post-featured-image.liquid --only snippets/video.liquid --only snippets/variant-main-picker.liquid
```

Expected:
- The safe code-side pass is available on `Copy of Atelier 2` for QA.

**Step 4: Re-audit after draft QA**

- Run the site audit again after code deployment and any selected asset replacements.
- Compare `Overall`, `Images`, `Performance`, and the remaining failed-rule counts against the March 23 baseline.

**Step 5: Roll forward only if the results hold**

- If visuals and scores both improve, repeat the theme push to live.
- If the lift is still capped by non-product image assets, execute the prepared replacement batch next.
