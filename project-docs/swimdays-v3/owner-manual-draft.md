# Swimdays Owner Manual (Draft)

## 0. Pre-Start Setup (Manual Actions Required Now)

- Create/confirm Shopify development store access.
- From `shopify-theme/`, run:
  - `shopify auth login`
  - `shopify theme dev --store <your-dev-store>.myshopify.com`
- In Shopify admin, create/confirm navigation menus used by header/footer.
- Create metafield definitions from `project-docs/swimdays-v3/metafields-definition.md`.
- Prepare product CSV from `project-docs/swimdays-v3/sku-import-template.csv`.
- Upload initial product images and confirm naming/alt text quality.

## 1. Updating Homepage Content

- Go to Online Store > Themes > Customize.
- Open homepage template.
- Update hero text, buttons, featured collection, and lookbook blocks.
- Save and preview before publish.

## 2. Managing Products

- Go to Products.
- Edit title, description, price, media, and variants.
- Keep size variants consistent (XS, S, M, L, XL, XXL, 3XL, 4XL if used).
- Fill metafields:
  - embroidery detail
  - care instructions
  - value indicator

## 3. Managing Lookbook

- Open Theme Customize > Lookbook section.
- Add/edit blocks:
  - lifestyle image
  - linked product
- Keep visual consistency (image tone and crop).

## 4. Newsletter and Leads

- Newsletter form writes to customer contacts with `newsletter` tag.
- Export contacts from Customers when needed.

## 5. Policies and Legal Pages

- Manage from Settings > Policies.
- Confirm links are visible in footer after updates.

## 6. Basic QA After Any Edit

- Check homepage on mobile and desktop.
- Open at least one product page.
- Add to cart and open cart page.
- Confirm no layout breaks.
