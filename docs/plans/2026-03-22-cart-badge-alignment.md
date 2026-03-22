# Cart Badge Alignment Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Re-anchor the custom Swimdays header cart count so it positions relative to the cart icon instead of the outer 44x44 tap target.

**Architecture:** Keep the existing custom header structure and move the badge into the cart icon span. Use the icon span as the relative positioning container while preserving the larger clickable cart wrapper.

**Tech Stack:** Shopify Liquid snippet, component-scoped CSS, Shopify theme push workflow

---

### Task 1: Re-anchor the cart badge markup

**Files:**
- Modify: `/Users/shubh/Development/swimdays-web/swimdays-atelier-theme/snippets/swimdays-home-header.liquid`

**Step 1: Move the badge inside the cart icon span**

- Keep the cart anchor wrapper unchanged.
- Place the count badge inside the same span that renders the cart SVG.

**Step 2: Add a cart-specific icon class**

- Add a cart-only modifier class so badge positioning can target the cart icon without affecting the search/account icons.

### Task 2: Update the badge positioning rules

**Files:**
- Modify: `/Users/shubh/Development/swimdays-web/swimdays-atelier-theme/snippets/swimdays-home-header.liquid`

**Step 1: Make the cart icon the positioning context**

- Set the cart icon span to `position: relative`.

**Step 2: Retune badge offsets**

- Update the badge `top/right` offsets so they sit against the icon bounds rather than the wrapper.

**Step 3: Preserve readable badge sizing**

- Keep the existing typography and pill sizing unless the tighter anchoring reveals an obvious fit problem.

### Task 3: Push for testing

**Files:**
- Modify: `/Users/shubh/Development/swimdays-web/swimdays-atelier-theme/snippets/swimdays-home-header.liquid`

**Step 1: Review the diff**

Run:

```bash
git diff -- /Users/shubh/Development/swimdays-web/swimdays-atelier-theme/snippets/swimdays-home-header.liquid
```

Expected:
- Diff only contains the cart badge markup/CSS adjustment.

**Step 2: Push to the test theme**

Run:

```bash
shopify theme push --theme 160872005867 --path /Users/shubh/Development/swimdays-web/swimdays-atelier-theme --nodelete --only snippets/swimdays-home-header.liquid
```

Expected:
- Updated custom header is available on `Copy of Atelier 2` for visual review.
