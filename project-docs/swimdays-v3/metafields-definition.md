# Swimdays Product Metafields (v3)

Define the following metafields in Shopify Admin.

## Namespace

- Namespace: `custom`

## Definitions

1. `custom.embroidery_detail`
- Type: Single line text
- Example: `Hand-beaded pearl motif at neckline`
- Used in: `sections/main-product.liquid`

2. `custom.care_instructions`
- Type: Rich text (preferred) or multi-line text
- Example: `Hand wash cold. Dry flat. Do not bleach.`
- Used in: `sections/main-product.liquid`

3. `custom.value_indicator`
- Type: Single line text
- Format rule: pipe-separated list
- Example: `UPF 50+ | Lined for coverage | Chlorine resistant`
- Used in: `sections/main-product.liquid`

## Validation Rule

Before upload, ensure all 12 products have at least:
- `embroidery_detail` or meaningful fallback copy
- `care_instructions`
- `value_indicator` with at least 2 items
