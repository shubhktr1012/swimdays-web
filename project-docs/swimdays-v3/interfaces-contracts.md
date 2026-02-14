# Public Interfaces and Contracts (v3)

## Section Schemas

1. `sections/hero-banner.liquid`
- Inputs: image, eyebrow, heading, subheading, CTA labels/links
- Output: branded hero with primary and secondary conversion actions

2. `sections/lookbook.liquid`
- Inputs: heading, copy, blocks(image + linked_product)
- Output: editorial grid with "Shop this look" overlay links

3. `sections/main-product.liquid`
- Inputs: product object + metafields
- Output: gallery, variant controls, add-to-cart, value/care modules

4. `sections/newsletter-signup.liquid`
- Inputs: heading, subtext, button copy
- Output: customer form (`contact[tags]=newsletter`)

5. `sections/footer.liquid`
- Inputs: brand copy, footer menu
- Output: legal/menu structure with policy links

## Template Contracts

1. `templates/index.json`
- Uses: hero, featured, lookbook, newsletter

2. `templates/product.json`
- Uses: main-product, newsletter

3. `templates/collection.json`
- Uses: main-collection, newsletter

4. `templates/cart.json`
- Uses: main-cart

## Data Contract for 12-SKU Import

Required fields:
- `title`
- `handle`
- `price`
- `compare_at_price`
- `variant_size`
- `variant_color`
- `media_url`
- `alt_text`
- `seo_title`
- `seo_description`
- `custom.embroidery_detail`
- `custom.care_instructions`
- `custom.value_indicator`
