# Swimdays v4 Launch Runbook & QA

## I. Pre-Launch Configuration Checks

1. **Payments (`Settings > Payments`)**

- Razorpay activated for primary transactions.
- Cash on Delivery (COD) enabled for domestic orders.
- _Test gateway disabled._

2. **Shipping (`Settings > Shipping and Delivery`)**

- "India" shipping zone created with all states active.
- Flat rate or free-shipping threshold correctly applied.
- Processing time set.

3. **Tax & Legal (`Settings > Taxes and duties`, `Settings > Policies`)**

- GST rate mapped properly.
- Privacy, TOS, Refund, and Shipping policies generated, populated, and visibly
  linked in the Footer Menu.

## II. Code Scaffold & Theme QA

- [ ] Theme (Atelier) layout properly scoped in `layout/theme.liquid`
- [ ] Custom fonts (`snippets/swimdays-fonts.liquid`) load without blocking or
      CLS.
- [ ] Theme validation passes cleanly.

## III. Functional Flow

- [ ] Add-to-cart works for products with size/color variants
- [ ] Lookbook image items route to the correct products natively
- [ ] "Pairs Best With" block populates dynamically on PDPs after configuring
      the app
- [ ] Newsletter form successfully tags users in Customer Manager
- [ ] Order confirmation notification tests arrive with correct Swimdays
      branding

## IV. Device & Responsiveness

- [ ] Safari/Chrome iPhone validation (real device)
- [ ] Ensure horizontal scroll lock across Mobile views
- [ ] Keyboard navigation sanity check on main nav and checkout

## V. SEO & Performance

- [ ] Unique meta titles mapped in the admin panel
- [ ] Alt text populated for 12 SKU baseline
- [ ] Search Console sitemap indexed
- [ ] Meta Pixel verifying valid hit counts on staging preview

## VI. Rollback Criteria

Rollback to previous theme state if any of these occur:

- Checkout blocks preventing conversions
- Core layout breaks on mobile breaking product views

## VII. Post Launch (24h)

- Verify Search Console index status.
- Monitor checkout funnel drop-offs.
