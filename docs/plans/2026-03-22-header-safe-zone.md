# Header Safe Zone Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add a responsive safe zone to the custom Swimdays header so the left nav links and right action icons do not overlap the decorative flowers on mid-sized non-mobile screens.

**Architecture:** Keep the current custom header markup intact and solve the issue in CSS. Apply extra horizontal inset and slightly larger flower offsets only from the desktop navigation breakpoint up to the pre-2xl range, leaving mobile and very large desktop layouts unchanged.

**Tech Stack:** Shopify Liquid snippet, component-scoped CSS, Shopify theme preview/push workflow

---

### Task 1: Update the mid-range navbar safe zone

**Files:**
- Modify: `/Users/shubh/Development/swimdays-web/swimdays-atelier-theme/snippets/swimdays-home-header.liquid`

**Step 1: Add responsive spacing variables**

- Introduce a CSS variable for the medium-desktop safe zone inside the existing header styles.
- Keep the base value at zero outside the target range.

**Step 2: Increase inner container breathing room**

- In the target range, add horizontal padding or inline inset to `.navbar-inner`.
- Keep the logo centered and avoid changing the mobile layout rules.

**Step 3: Push flowers farther outward in the same range**

- Adjust `.navbar-flower-img.top-left` and `.navbar-flower-img.bottom-right` so both flowers sit farther off-canvas.
- Keep their current size and general visual treatment.

**Step 4: Preserve existing wide-screen behavior**

- Reset or avoid the safe-zone override at the 2xl breakpoint and above.

**Step 5: Sanity-check the snippet structure**

Run:

```bash
shopify theme check --path /Users/shubh/Development/swimdays-web/swimdays-atelier-theme
```

Expected:
- No Liquid syntax issues introduced by the CSS change.

### Task 2: Verify the affected responsive band

**Files:**
- Review: `/Users/shubh/Development/swimdays-web/swimdays-atelier-theme/snippets/swimdays-home-header.liquid`

**Step 1: Check the desktop activation breakpoint**

- Confirm the safe zone begins only once the desktop nav is active.

**Step 2: Check the mid-range layout**

- Confirm the left nav items no longer visually collide with the flower.
- Confirm the right-side icons no longer visually collide with the flower.

**Step 3: Check the 2xl layout**

- Confirm the extra inset is not applied on the wide desktop range.

### Task 3: Prepare theme rollout

**Files:**
- Modify: `/Users/shubh/Development/swimdays-web/swimdays-atelier-theme/snippets/swimdays-home-header.liquid`

**Step 1: Review git diff**

Run:

```bash
git diff -- /Users/shubh/Development/swimdays-web/swimdays-atelier-theme/snippets/swimdays-home-header.liquid
```

Expected:
- Diff only contains the targeted responsive spacing adjustment.

**Step 2: Push the single snippet for testing**

Run:

```bash
shopify theme push --theme 160872005867 --path /Users/shubh/Development/swimdays-web/swimdays-atelier-theme --nodelete --only snippets/swimdays-home-header.liquid
```

Expected:
- Updated header snippet is available on `Copy of Atelier 2` for review before live rollout.
