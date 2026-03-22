# Our Story Page Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a dedicated responsive Shopify page template for Swimdays' `Our Story` page with a founders portrait hero, structured editorial story sections, manifesto block, founder notes, and a soft collections CTA.

**Architecture:** Create one custom section that encapsulates the full page layout and editable copy, then attach it to a dedicated JSON page template. Reuse the store's existing typography and spacing language while implementing mobile-first responsive CSS inside the section.

**Tech Stack:** Shopify Liquid, section schema JSON, theme JSON templates, component-scoped CSS via `{% stylesheet %}`, optional `shopify theme check`

---

### Task 1: Create the dedicated Our Story section

**Files:**
- Create: `/Users/shubh/Development/swimdays-web/swimdays-atelier-theme/sections/swimdays-our-story.liquid`

**Step 1: Define the content contract**

- Add settings for:
  founders portrait
  eyebrow
  hero title
  hero intro
  story label
  story paragraphs
  brand essence title/body
  goal title/body
  founder names
  founder quotes
  CTA title
  CTA button labels + links

**Step 2: Render the HTML structure**

- Build section regions in this order:
  split hero
  story body
  brand essence
  goal
  founders' note
  CTA

**Step 3: Add default content**

- Seed schema defaults with the approved client copy so the template is usable immediately.

**Step 4: Add responsive styling**

- Use mobile-first CSS.
- Stack hero content on mobile and move to a 2-column split on larger screens.
- Stack founder cards on mobile and switch to 2 columns on desktop.

**Step 5: Verify visual consistency**

Run:

```bash
shopify theme check --path swimdays-atelier-theme
```

Expected:
- No Liquid syntax errors introduced by the new section.

### Task 2: Create the dedicated page template

**Files:**
- Create: `/Users/shubh/Development/swimdays-web/swimdays-atelier-theme/templates/page.our-story.json`

**Step 1: Add a page template referencing the new section**

- Use a single top-level section:
  `swimdays-our-story`

**Step 2: Keep the template minimal**

- Avoid mixing `main-page` blocks into the custom story template.

**Step 3: Validate JSON structure**

Run:

```bash
python3 -m json.tool /Users/shubh/Development/swimdays-web/swimdays-atelier-theme/templates/page.our-story.json >/dev/null
```

Expected:
- Command exits successfully with no JSON parse errors.

### Task 3: Review responsiveness and content flow

**Files:**
- Review: `/Users/shubh/Development/swimdays-web/swimdays-atelier-theme/sections/swimdays-our-story.liquid`
- Review: `/Users/shubh/Development/swimdays-web/swimdays-atelier-theme/templates/page.our-story.json`

**Step 1: Check hero behavior**

- Confirm portrait-first stacking on mobile.
- Confirm balanced split layout on desktop.

**Step 2: Check long-form readability**

- Confirm paragraph measure stays comfortable.
- Confirm vertical spacing prevents walls of text.

**Step 3: Check CTA and founder cards**

- Confirm CTA buttons wrap cleanly on smaller screens.
- Confirm founder notes remain legible when stacked.

**Step 4: Run a final theme check**

Run:

```bash
shopify theme check --path swimdays-atelier-theme
```

Expected:
- Section and template pass theme validation or only show unrelated existing warnings.

### Task 4: Prepare merchant rollout

**Files:**
- No file changes required

**Step 1: Identify the template assignment step**

- In Shopify admin, assign `page.our-story` to the `Our Story` page.

**Step 2: Upload the founders' portrait if needed**

- Use the section image setting in the theme editor if the portrait is not yet configured.

**Step 3: Preview before pushing live**

Run:

```bash
shopify theme dev --path swimdays-atelier-theme --open
```

Expected:
- The new `Our Story` page template renders correctly across desktop and mobile.
