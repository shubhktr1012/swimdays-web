# Swimdays Shopify Theme (v3)

This folder contains the custom Shopify Online Store 2.0 theme scaffold for the quotation v3 build.

## Local Setup

1. Install Shopify CLI.
2. Authenticate to your development store.
3. Run from this directory:

```bash
shopify theme dev --store swimdays-dev.myshopify.com
```

## Current Scope Implemented

- Base theme architecture (`layout`, `sections`, `templates`, `assets`, `config`, `locales`)
- Core sections from v3 plan:
  - `announcement-bar`
  - `hero-banner`
  - `featured-collection`
  - `lookbook`
  - `main-product`
  - `newsletter-signup`
  - `footer`
- Supporting sections:
  - `header`
  - `main-collection`
  - `main-cart`
  - `main-page`
- Core template contracts:
  - `index.json`
  - `product.json`
  - `collection.json`
  - `cart.json`

## Next Build Steps

- Connect real menus and collection mappings in theme editor.
- Populate product metafields defined in `documents/swimdays-v3/metafields-definition.md`.
- Configure store ops in Shopify admin (payments, shipping, tax, legal pages).
- Run quality gates in `documents/swimdays-v3/qa-checklist.md`.
