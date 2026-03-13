# Support Pages And Policy Architecture Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build client-reviewable Swimdays support and policy page prototypes first, then mirror the approved layouts into the Shopify theme as reusable page templates and sections.

**Architecture:** Start with static HTML prototypes so page hierarchy, spacing, and tone can be reviewed without Shopify editor friction. Once the prototype set is approved, mirror the two operational pages into a reusable `swimdays-support-page` section, mirror the legal layout into a `swimdays-legal-page` section that renders `page.content`, and wire them up through JSON page templates.

**Tech Stack:** Static HTML/CSS/JS prototypes, Shopify Liquid sections, Shopify JSON templates, Atelier/Horizon theme architecture, Shopify CLI (`theme check`, `theme dev`)

---

### Task 1: Create A Shared Prototype Shell

**Files:**
- Create: `prototypes/swimdays-support-pages.css`
- Create: `prototypes/swimdays-support-pages.js`
- Modify: `prototypes/swimdays-home-concept.html`
- Test: `package.json`

**Step 1: Create the shared CSS shell for support pages**

```css
@font-face {
  font-family: "Swimdays Heading";
  src: url("../swimdays-theme/assets/Aboreto-Regular.ttf") format("truetype");
}

:root {
  --bg: #fdfbfb;
  --surface: #ffffff;
  --surface-soft: #f6f4ef;
  --ink: #1c1b1a;
  --muted: #6e6a61;
  --line: #d7d2c6;
  --accent: #1f4f46;
  --accent-soft: #e8f0ee;
  --rose: #a84f77;
  --sky: #adcccc;
  --container: min(1120px, calc(100% - 2rem));
  --radius-lg: 24px;
  --radius-md: 16px;
  --shadow: 0 18px 44px rgba(20, 20, 20, 0.08);
}

.support-page {
  background: linear-gradient(180deg, #fcfbf8 0%, #f4f7f5 100%);
  color: var(--ink);
}

.support-hero,
.support-section,
.legal-article,
.support-footer-cta {
  width: var(--container);
  margin: 0 auto;
}

.support-highlights,
.support-link-grid {
  display: grid;
  gap: 1rem;
}

@media screen and (min-width: 750px) {
  .support-highlights {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .support-link-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
```

**Step 2: Create the shared prototype JS for the announcement bar and mobile menu**

```js
const body = document.body;
const navbar = document.querySelector(".swimdays-navbar");
const menuToggle = document.querySelector("[data-menu-toggle]");
const menu = document.querySelector("[data-mobile-menu]");

if (menuToggle && menu) {
  menuToggle.addEventListener("click", () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!isOpen));
    menu.hidden = isOpen;
    body.classList.toggle("nav-locked", !isOpen);
    navbar?.classList.toggle("menu-open", !isOpen);
  });
}

window.addEventListener("scroll", () => {
  body.classList.toggle("announcement-hidden", window.scrollY > 24);
  navbar?.classList.toggle("is-scrolled", window.scrollY > 20);
});
```

**Step 3: Update the home concept footer and support links to point at the new prototype pages**

```html
<li><a href="./swimdays-shipping-returns.html">Shipping & Returns</a></li>
<li><a href="./swimdays-faq-contact.html">FAQ & Contact</a></li>
<li><a href="./swimdays-privacy-policy.html">Privacy Policy</a></li>
<li><a href="./swimdays-terms-of-service.html">Terms of Service</a></li>
```

**Step 4: Run the prototype server and verify the shared shell loads**

Run: `npm run dev`

Expected: `serve` starts successfully and the homepage still renders with working navigation and no missing prototype asset paths.

**Step 5: Commit**

```bash
git add prototypes/swimdays-support-pages.css prototypes/swimdays-support-pages.js prototypes/swimdays-home-concept.html
git commit -m "feat: add shared support page prototype shell"
```

### Task 2: Build The Shipping & Returns Prototype

**Files:**
- Create: `prototypes/swimdays-shipping-returns.html`
- Test: `prototypes/swimdays-support-pages.css`

**Step 1: Create the page shell and reuse the shared header/footer**

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Shipping & Returns | Swimdays Prototype</title>
    <link rel="stylesheet" href="./swimdays-support-pages.css">
  </head>
  <body class="support-page support-page--policy">
    <header class="announcement">...</header>
    <nav class="swimdays-navbar">...</nav>
    <main id="MainContent">...</main>
    <footer class="swimdays-footer">...</footer>
    <script src="./swimdays-support-pages.js"></script>
  </body>
</html>
```

**Step 2: Add the approved hero, summary strip, and anchor navigation**

```html
<section class="support-hero">
  <p class="support-eyebrow">Customer Care</p>
  <h1>Shipping & Returns</h1>
  <p class="support-intro">Everything you need to know before and after your order arrives.</p>
  <a class="support-inline-link" href="mailto:studioswimdays@gmail.com">studioswimdays@gmail.com</a>
</section>

<section class="support-highlights" aria-label="Policy highlights">
  <article class="support-highlight-card"><p>No refunds</p></article>
  <article class="support-highlight-card"><p>Exchange requests within 7 days</p></article>
  <article class="support-highlight-card"><p>Damaged or incorrect items reported within 24-48 hours</p></article>
</section>

<nav class="support-anchor-nav" aria-label="Shipping and returns sections">
  <a href="#returns-exchanges">Returns & Exchanges</a>
  <a href="#damaged-items">Damaged or Incorrect Items</a>
  <a href="#start-request">How to Start a Request</a>
  <a href="#cancellations">Cancellations</a>
  <a href="#shipping">Shipping</a>
  <a href="#lost-stolen">Lost or Stolen Packages</a>
</nav>
```

**Step 3: Add the operational content in accordion sections using only approved client copy**

```html
<section class="support-section" id="returns-exchanges">
  <h2>Returns & Exchanges</h2>
  <details open>
    <summary>What can be exchanged?</summary>
    <div>
      <p>We do not offer refunds on our swimwear.</p>
      <p>Bodysuits, shorts, and leggings are not returnable or exchangeable due to hygiene standards.</p>
      <p>For size or style exchanges, requests must be raised within seven days.</p>
    </div>
  </details>
</section>
```

**Step 4: Verify the prototype visually**

Run: `npm run dev`

Expected: `/prototypes/swimdays-shipping-returns.html` loads with complete sections, readable spacing, and no duplicated content from the FAQ or legal pages.

**Step 5: Commit**

```bash
git add prototypes/swimdays-shipping-returns.html
git commit -m "feat: add shipping and returns prototype"
```

### Task 3: Build The FAQ & Contact Prototype

**Files:**
- Create: `prototypes/swimdays-faq-contact.html`
- Test: `prototypes/swimdays-support-pages.css`

**Step 1: Create the contact-led hero and inquiry cards**

```html
<section class="support-hero support-hero--contact">
  <p class="support-eyebrow">Support</p>
  <h1>FAQ & Contact</h1>
  <p class="support-intro">Need help with an order, exchange, or delivery question? Reach us directly.</p>
  <a class="support-primary-cta" href="mailto:studioswimdays@gmail.com">Email Swimdays</a>
</section>

<section class="support-link-grid" aria-label="Support inquiries">
  <a class="support-link-card" href="mailto:studioswimdays@gmail.com?subject=Exchange%20Request">Exchange request</a>
  <a class="support-link-card" href="mailto:studioswimdays@gmail.com?subject=Damaged%20or%20Incorrect%20Item">Damaged or incorrect item</a>
  <a class="support-link-card" href="mailto:studioswimdays@gmail.com?subject=Cancellation%20Request">Cancellation</a>
  <a class="support-link-card" href="./swimdays-shipping-returns.html#shipping">Shipping help</a>
</section>
```

**Step 2: Add the short FAQ layer with links back to the shipping and returns page**

```html
<section class="support-section">
  <h2>Frequently Asked Questions</h2>
  <details open>
    <summary>Do you offer refunds?</summary>
    <div>
      <p>No. Swimdays does not offer refunds on swimwear.</p>
      <a href="./swimdays-shipping-returns.html#returns-exchanges">Read full policy</a>
    </div>
  </details>
</section>
```

**Step 3: Add a visual contact form stub that mirrors the future Shopify contact form**

```html
<section class="support-form-shell" aria-labelledby="contact-form-title">
  <h2 id="contact-form-title">Send Us A Message</h2>
  <form class="support-form" action="#" method="post">
    <label>Name <input type="text" name="name"></label>
    <label>Email <input type="email" name="email"></label>
    <label>Message <textarea name="message" rows="6"></textarea></label>
    <button type="submit">Submit</button>
  </form>
</section>
```

**Step 4: Verify the prototype visually**

Run: `npm run dev`

Expected: `/prototypes/swimdays-faq-contact.html` loads with inquiry cards, concise FAQs, and a form layout that can be mirrored into Shopify without redesign.

**Step 5: Commit**

```bash
git add prototypes/swimdays-faq-contact.html
git commit -m "feat: add faq and contact prototype"
```

### Task 4: Build The Legal Page Prototypes

**Files:**
- Create: `prototypes/swimdays-privacy-policy.html`
- Create: `prototypes/swimdays-terms-of-service.html`
- Test: `prototypes/swimdays-support-pages.css`

**Step 1: Create a reusable legal page shell with a narrow reading column**

```html
<section class="legal-hero">
  <p class="support-eyebrow">Policies</p>
  <h1>Privacy Policy</h1>
  <p class="support-intro">This layout is ready for final legal copy once business inputs are confirmed.</p>
</section>

<aside class="legal-note" aria-label="Pending legal inputs">
  <h2>Pending legal inputs</h2>
  <p>Business name, registered address, privacy contact, app stack, governing law, and payment methods still need confirmation.</p>
</aside>

<article class="legal-article">
  <section id="information-we-collect"><h2>Information We Collect</h2><p class="legal-placeholder">Final legal copy pending.</p></section>
  <section id="how-we-use-information"><h2>How We Use Information</h2><p class="legal-placeholder">Final legal copy pending.</p></section>
</article>
```

**Step 2: Duplicate the shell for Terms of Service with the approved section map**

```html
<article class="legal-article">
  <section id="eligibility"><h2>Eligibility and Account Use</h2><p class="legal-placeholder">Final legal copy pending.</p></section>
  <section id="pricing-payment"><h2>Pricing and Payment</h2><p class="legal-placeholder">Final legal copy pending.</p></section>
  <section id="shipping-delivery"><h2>Shipping and Delivery</h2><p class="legal-placeholder">See published Shipping & Returns policy.</p></section>
</article>
```

**Step 3: Verify the legal prototypes visually**

Run: `npm run dev`

Expected: both legal prototype pages read like intentional layouts, but clearly signal that final legal copy is pending rather than fabricated.

**Step 4: Commit**

```bash
git add prototypes/swimdays-privacy-policy.html prototypes/swimdays-terms-of-service.html
git commit -m "feat: add legal page prototypes"
```

### Task 5: QA The Prototype Set And Prepare It For Client Review

**Files:**
- Modify: `prototypes/swimdays-shipping-returns.html`
- Modify: `prototypes/swimdays-faq-contact.html`
- Modify: `prototypes/swimdays-privacy-policy.html`
- Modify: `prototypes/swimdays-terms-of-service.html`
- Modify: `prototypes/swimdays-home-concept.html`

**Step 1: Review the prototype set on desktop and mobile widths**

Run: `npm run dev`

Expected: every page loads from the homepage footer links and there is no horizontal overflow at roughly `390px` and `1440px` widths.

**Step 2: Fix any broken spacing, typography, or cross-links discovered in review**

```html
<a href="./swimdays-privacy-policy.html">Privacy Policy</a>
<a href="./swimdays-terms-of-service.html">Terms of Service</a>
```

**Step 3: Confirm content boundaries remain correct**

```text
- Shipping content stays on the shipping page.
- FAQ answers stay short and link outward.
- Legal pages show structure only where final copy is missing.
```

**Step 4: Commit**

```bash
git add prototypes/swimdays-home-concept.html prototypes/swimdays-support-pages.css prototypes/swimdays-support-pages.js prototypes/swimdays-shipping-returns.html prototypes/swimdays-faq-contact.html prototypes/swimdays-privacy-policy.html prototypes/swimdays-terms-of-service.html
git commit -m "fix: polish support and legal prototypes"
```

### Task 6: Implement The Reusable Shopify Support Page Section

**Files:**
- Create: `swimdays-atelier-theme/sections/swimdays-support-page.liquid`
- Modify: `swimdays-atelier-theme/locales/en.default.schema.json`
- Test: `swimdays-atelier-theme/sections/section.liquid`

**Step 1: Create a custom section that mirrors the operational prototype layouts**

```liquid
{% liquid
  assign summary_blocks = section.blocks | where: 'type', 'summary_card'
  assign inquiry_blocks = section.blocks | where: 'type', 'inquiry_card'
  assign content_blocks = section.blocks | where: 'type', 'content_section'
  assign faq_blocks = section.blocks | where: 'type', 'faq_item'
%}

<div class="swimdays-support-page color-{{ section.settings.color_scheme }}">
  <header class="swimdays-support-page__hero">
    {% if section.settings.eyebrow != blank %}<p>{{ section.settings.eyebrow }}</p>{% endif %}
    <h1>{{ page.title }}</h1>
    {% if section.settings.intro != blank %}<div class="rte">{{ section.settings.intro }}</div>{% endif %}
    {% if section.settings.support_email != blank %}
      <a href="mailto:{{ section.settings.support_email }}">{{ section.settings.support_email }}</a>
    {% endif %}
  </header>

  {% if summary_blocks.size > 0 %}
    <section class="swimdays-support-page__highlights">
      {% for block in summary_blocks %}
        <article {{ block.shopify_attributes }}>
          <h2>{{ block.settings.heading }}</h2>
          <div class="rte">{{ block.settings.body }}</div>
        </article>
      {% endfor %}
    </section>
  {% endif %}
</div>
```

**Step 2: Add support-page block types and theme-editor labels**

```json
{
  "name": "Swimdays support page",
  "blocks": [
    { "type": "summary_card", "name": "Summary card", "settings": [] },
    { "type": "content_section", "name": "Content section", "settings": [] },
    { "type": "inquiry_card", "name": "Inquiry card", "settings": [] },
    { "type": "faq_item", "name": "FAQ item", "settings": [] }
  ]
}
```

**Step 3: Style the section inline with the prototype and use `accordion-custom` for expandable content**

```liquid
<accordion-custom>
  <details {% if block.settings.open_by_default %}open{% endif %}>
    <summary>{{ block.settings.heading }}</summary>
    <div class="details-content rte">{{ block.settings.body }}</div>
  </details>
</accordion-custom>
```

**Step 4: Validate the section**

Run: `shopify theme check --path swimdays-atelier-theme`

Expected: Theme Check passes with no Liquid syntax errors in the new section.

**Step 5: Commit**

```bash
git add swimdays-atelier-theme/sections/swimdays-support-page.liquid swimdays-atelier-theme/locales/en.default.schema.json
git commit -m "feat: add swimdays support page section"
```

### Task 7: Implement The Shopify Legal Page Section

**Files:**
- Create: `swimdays-atelier-theme/sections/swimdays-legal-page.liquid`
- Modify: `swimdays-atelier-theme/locales/en.default.schema.json`

**Step 1: Create the legal section that renders page content inside an editorial article wrapper**

```liquid
<div class="swimdays-legal-page color-{{ section.settings.color_scheme }}">
  <header class="swimdays-legal-page__hero">
    {% if section.settings.eyebrow != blank %}<p>{{ section.settings.eyebrow }}</p>{% endif %}
    <h1>{{ page.title }}</h1>
    {% if section.settings.intro != blank %}<div class="rte">{{ section.settings.intro }}</div>{% endif %}
    {% if section.settings.pending_notice != blank %}
      <aside class="swimdays-legal-page__notice rte">{{ section.settings.pending_notice }}</aside>
    {% endif %}
  </header>

  <article class="swimdays-legal-page__content rte">
    {{ page.content }}
  </article>
</div>
```

**Step 2: Add the minimal schema required for intro copy and pending-notice text**

```json
{
  "name": "Swimdays legal page",
  "settings": [
    { "type": "text", "id": "eyebrow", "label": "Eyebrow" },
    { "type": "richtext", "id": "intro", "label": "Intro" },
    { "type": "richtext", "id": "pending_notice", "label": "Pending notice" },
    { "type": "color_scheme", "id": "color_scheme", "label": "Color scheme", "default": "scheme-1" }
  ]
}
```

**Step 3: Validate the section**

Run: `shopify theme check --path swimdays-atelier-theme`

Expected: Theme Check passes and the new legal section renders `page.content` without Liquid errors.

**Step 4: Commit**

```bash
git add swimdays-atelier-theme/sections/swimdays-legal-page.liquid swimdays-atelier-theme/locales/en.default.schema.json
git commit -m "feat: add swimdays legal page section"
```

### Task 8: Create The Shopify Page Templates

**Files:**
- Create: `swimdays-atelier-theme/templates/page.shipping-returns.json`
- Create: `swimdays-atelier-theme/templates/page.faq-contact.json`
- Create: `swimdays-atelier-theme/templates/page.legal.json`
- Reference: `swimdays-atelier-theme/templates/page.contact.json`

**Step 1: Create the shipping and returns template with support blocks preloaded**

```json
{
  "sections": {
    "main": {
      "type": "swimdays-support-page",
      "settings": {
        "eyebrow": "Customer Care",
        "intro": "<p>Everything you need to know before and after your order arrives.</p>",
        "support_email": "studioswimdays@gmail.com"
      },
      "blocks": {
        "summary_1": { "type": "summary_card", "settings": { "heading": "No refunds", "body": "<p>Swimwear purchases are final sale.</p>" } }
      },
      "block_order": ["summary_1"]
    }
  },
  "order": ["main"]
}
```

**Step 2: Create the FAQ and contact template and append the existing contact form section pattern**

```json
{
  "sections": {
    "main": {
      "type": "swimdays-support-page",
      "settings": {
        "eyebrow": "Support",
        "intro": "<p>Reach out for exchanges, damaged items, cancellations, and shipping help.</p>",
        "support_email": "studioswimdays@gmail.com"
      }
    },
    "form": {
      "type": "section",
      "blocks": {
        "contact_form": {
          "type": "contact-form",
          "settings": {
            "width": "custom",
            "custom_width": 50
          }
        }
      },
      "block_order": ["contact_form"]
    }
  },
  "order": ["main", "form"]
}
```

**Step 3: Create the shared legal template**

```json
{
  "sections": {
    "main": {
      "type": "swimdays-legal-page",
      "settings": {
        "eyebrow": "Policies"
      }
    }
  },
  "order": ["main"]
}
```

**Step 4: Validate the templates**

Run: `shopify theme check --path swimdays-atelier-theme`

Expected: Theme Check passes and all three JSON templates parse correctly.

**Step 5: Commit**

```bash
git add swimdays-atelier-theme/templates/page.shipping-returns.json swimdays-atelier-theme/templates/page.faq-contact.json swimdays-atelier-theme/templates/page.legal.json
git commit -m "feat: add swimdays support page templates"
```

### Task 9: Run Theme Preview QA And Document Content Entry

**Files:**
- Create: `project-docs/swimdays-v4/support-pages-content-entry.md`

**Step 1: Create a short content-entry guide for Shopify admin setup**

```md
# Support Pages Content Entry

- Create page: `Shipping & Returns`
  Template: `page.shipping-returns`
- Create page: `FAQ & Contact`
  Template: `page.faq-contact`
- Create page: `Privacy Policy`
  Template: `page.legal`
- Create page: `Terms of Service`
  Template: `page.legal`

Missing client inputs:
- Exchange window: purchase date or delivery date?
- Damaged item window: 24 or 48 hours?
- Governing law and registered business address
```

**Step 2: Run the theme locally in Shopify**

Run: `shopify theme dev --path swimdays-atelier-theme --open`

Expected: Shopify CLI opens a development preview and the three custom page templates render without broken layout or missing section assets.

**Step 3: Run Theme Check one final time**

Run: `shopify theme check --path swimdays-atelier-theme`

Expected: no new validation errors.

**Step 4: Commit**

```bash
git add project-docs/swimdays-v4/support-pages-content-entry.md
git commit -m "docs: add support pages content entry guide"
```
