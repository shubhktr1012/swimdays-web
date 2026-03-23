# SEO Accessibility Score Lift Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Improve the live site’s overall audit score by fixing theme-owned accessibility, semantics, and low-risk structural issues in the filter/navigation system.

**Architecture:** Keep the pass code-only and scoped to shared Liquid fragments that render collection filters, sorting controls, and icon-only header actions. Avoid redesigning components; fix IDs, roles, accessible names, and form semantics while preserving current storefront behavior.

**Tech Stack:** Shopify Liquid theme, section/block/snippet markup, Shopify CLI validation, live surface audit with squirrelscan

---

### Task 1: Fix duplicate IDs and invalid semantics in sorting controls

**Files:**
- Modify: `/Users/shubh/Development/swimdays-web/swimdays-atelier-theme/snippets/sorting.liquid`

**Step 1: Separate desktop and mobile control IDs**

- Ensure the mobile select, desktop summary/details, and drawer/overflow variants do not reuse the same `id` values for the same `section_id`.
- Include the provided `suffix` or a stable viewport token in control IDs where needed.

**Step 2: Remove invalid listbox semantics**

- Replace `role="listbox"` and `role="option"` usage if the current markup does not satisfy ARIA listbox requirements.
- Prefer native radio-group semantics when the control is already built from radio inputs.

**Step 3: Preserve behavior**

- Keep the current summary/details UI, keyboard handlers, and selected-state behavior intact.

### Task 2: Fix duplicate IDs and control names in filter inputs

**Files:**
- Modify: `/Users/shubh/Development/swimdays-web/swimdays-atelier-theme/snippets/list-filter.liquid`
- Modify: `/Users/shubh/Development/swimdays-web/swimdays-atelier-theme/snippets/price-filter.liquid`

**Step 1: Make filter input IDs unique across view variants**

- Ensure generated IDs for list, swatch, image, pill, and price inputs include enough context to stay unique across desktop/mobile/drawer render paths.

**Step 2: Remove invalid role patterns**

- Replace any role combinations that do not meet ARIA parent/child requirements.
- Keep native checkbox/radio semantics primary where possible.

**Step 3: Recheck price filter IDs**

- Update the price input IDs so drawer and desktop instances do not collide on collection pages.

### Task 3: Fix filter drawer and action button accessible names

**Files:**
- Modify: `/Users/shubh/Development/swimdays-web/swimdays-atelier-theme/blocks/filters.liquid`
- Modify: `/Users/shubh/Development/swimdays-web/swimdays-atelier-theme/snippets/swimdays-home-header.liquid`
- Review: `/Users/shubh/Development/swimdays-web/swimdays-atelier-theme/snippets/header-actions.liquid`

**Step 1: Ensure filter drawer controls are clearly named**

- Add or verify explicit labels for the drawer close button and related action controls where the audit is flagging unnamed buttons.

**Step 2: Fix theme-owned empty anchor text**

- Ensure icon-only cart/account/home links expose accessible names through text or ARIA without changing layout.

**Step 3: Leave Shopify-owned controls alone if they are not theme-overridable**

- If a control is server-rendered/overwritten by Shopify and a safe theme-only fix is not reliable, document it and do not force a brittle workaround.

### Task 4: Fix low-risk heading and structure issues the theme owns

**Files:**
- Modify: `/Users/shubh/Development/swimdays-web/swimdays-atelier-theme/templates/list-collections.json`
- Review: `/Users/shubh/Development/swimdays-web/swimdays-atelier-theme/sections/swimdays-our-story.liquid`
- Review: `/Users/shubh/Development/swimdays-web/swimdays-atelier-theme/snippets/product-grid.liquid`

**Step 1: Correct clearly theme-owned heading-level skips**

- Change only the headings that are caused by template defaults or theme snippets.
- Do not rewrite merchant-authored rich text content in this pass.

**Step 2: Exclude admin-content-only issues**

- Leave the partial-payment page list-structure issue out of the code diff and document it for manual Shopify admin cleanup.

### Task 5: Validate storefront behavior

**Files:**
- Review: touched filter/header/template files

**Step 1: Run theme validation**

Run:

```bash
shopify theme check --path /Users/shubh/Development/swimdays-web/swimdays-atelier-theme
```

Expected:
- No new Liquid errors introduced in the touched files.

**Step 2: Push only the touched files to the draft theme**

Run:

```bash
shopify theme push --theme 160872005867 --path /Users/shubh/Development/swimdays-web/swimdays-atelier-theme --nodelete --only blocks/filters.liquid --only snippets/list-filter.liquid --only snippets/price-filter.liquid --only snippets/sorting.liquid --only snippets/swimdays-home-header.liquid --only templates/list-collections.json
```

Expected:
- The draft theme contains the scoped score-lift changes for verification.

**Step 3: Check storefront behavior**

- Verify filtering and sorting still work on collection pages.
- Verify filter drawer open/close works on mobile.
- Verify header icon links still behave normally.

### Task 6: Roll forward and re-audit

**Files:**
- Review: live theme after draft verification

**Step 1: Push the approved file set to live**

Run:

```bash
shopify theme push --theme 160839467243 --allow-live --path /Users/shubh/Development/swimdays-web/swimdays-atelier-theme --nodelete --only blocks/filters.liquid --only snippets/list-filter.liquid --only snippets/price-filter.liquid --only snippets/sorting.liquid --only snippets/swimdays-home-header.liquid --only templates/list-collections.json
```

Expected:
- Only the approved score-lift files reach the live theme.

**Step 2: Re-audit live**

Run:

```bash
squirrel audit https://shopswimdays.com --coverage surface --max-pages 80 --format llm --output /Users/shubh/Development/swimdays-web/tmp/audits/shopswimdays-surface-2026-03-23-score-lift.llm -n swimdays-web-seo-score-lift --refresh
```

Expected:
- Before/after score movement is measurable, especially in accessibility and overall score.
