# Swimdays v4 Project Plan & Dashboard

**Last Updated:** February 26, 2026\
**Target Architecture:** Shopify OS 2.0 (Atelier Theme based)

## 1) Completion Summary & Status

- Overall completion: **~5%**
- Engineering scaffold: **not started** (Requires CLI setup and theme pull)
- Store operations and content population: **not started**
- Live QA and launch readiness: **not started**

## 2) Visual Direction Goal

Create a premium but calm storefront aesthetic that exceeds expected value for
the project budget while remaining editable in Shopify native tooling.

- **Typography:** editorial serif for display (Aboreto) + clean sans body
  (Public Sans / Poppins)
- **Color hierarchy:** warm neutral base + restrained accent for actions
- **Spacing system:** large rhythm blocks, minimal clutter

## 3) Manual Actions You Need To Do Now (Start Blockers)

1. **Store access + CLI auth**

- Run `shopify auth login`
- Pull Atelier theme: `shopify theme pull`
- Start dev server: `shopify theme dev`

2. **Admin setup**

- Create navigation menus (Main, Footer)
- Create placeholder pages (Lookbook, Size Guide, About, Contact, FAQs)

3. **Catalog prep**

- Prepare 12 SKUs per `sku-import-template.csv`
- Gather media for products and lookbook

## 4) Execution Calendar (Consolidated Phase Plan)

### Phase 1: Foundation (Days 1-2)

- [ ] Setup Development Environment (CLI, Atelier theme pull)
- [ ] Configure Store Baseline (Payments, Shipping, Taxes)
- [ ] Initial App Setup (Shopify Email, Search & Discovery)

### Phase 2: Content & Structure (Days 3-5)

- [ ] Create Collections (Moss, Cove, All, New Arrivals)
- [ ] Set up Menus & Navigation
- [ ] Product Upload & "Pairs Best With" Mapping
- [ ] Font installation (`swimdays-fonts.liquid`)

### Phase 3: Theme Customization (Days 6-10)

- [ ] Customize Homepage (Hero, Marquee, Lookbook block, Newsletter)
- [ ] Customize Product Pages (Gallery, Variants, Tabs, Recommendations)
- [ ] Configure Policies and Legal pages
- [ ] Setup email notification branding

### Phase 4: Launch Prep & Buffer (Days 11-14)

- [ ] Install GA4 & Meta Pixel
- [ ] Run QA Matrix
- [ ] Performance and Accessibility audit
- [ ] Final Client Review

## 5) Definition of "Ready to Continue"

You are ready for Phase 3 (Theme Customization) once all below are done:

- [ ] CLI connected to dev store
- [ ] Menus and Pages created
- [ ] At least 4 products uploaded with images and variants
- [ ] Foundational apps installed
