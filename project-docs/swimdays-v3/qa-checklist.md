# Swimdays v3 QA Checklist

## Status Snapshot (as of February 14, 2026)

- Store-connected QA: not started yet
- Code scaffold QA: partially complete
- Blocking dependency: development store setup and product/media upload

## Code Scaffold Checks (Completed)

- [x] Theme templates mapped to valid section files
- [x] Section schema scaffolds created for core homepage and PDP blocks
- [x] Newsletter form scaffolded with `contact[tags]=newsletter`
- [x] Deferred theme JS and base CSS architecture in place
- [x] Core image lazy-loading patterns applied in collection/lookbook sections

## Functional

- [ ] Add-to-cart works for all products and variants
- [ ] Cart update/remove works without page errors
- [ ] Checkout flow passes with test gateway
- [ ] Lookbook overlays open correct product pages
- [ ] Newsletter form captures contacts

## Responsive and Device

- [ ] iPhone real-device pass
- [ ] Android real-device pass
- [ ] No horizontal overflow at 360px width
- [ ] Touch targets are usable for nav/cart/variants
- [ ] Form fields are keyboard-friendly on mobile

## SEO

- [ ] Unique meta title and description for homepage
- [ ] Unique meta title and description for collection and product pages
- [ ] Image alt text complete for product and lookbook media
- [ ] Sitemap submitted and verified in Google Search Console

## Performance

- [ ] Product and hero media compressed appropriately
- [ ] Lazy loading enabled for below-the-fold media
- [ ] No unnecessary blocking scripts
- [ ] Lighthouse/PageSpeed report exported

## Accessibility

- [ ] Keyboard navigation on header/menu/cart/product form
- [ ] Focus states are visible
- [ ] Color contrast checks pass on key CTAs and text blocks
- [ ] Screen reader sanity check for homepage/PDP/cart landmarks

## Launch Readiness

- [ ] Payments configured
- [ ] Shipping zones configured
- [ ] Tax rules configured
- [ ] Legal pages published
- [ ] DNS/domain checklist ready
