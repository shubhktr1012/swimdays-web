# Swimdays v4 Technical Architecture

## Theme & Constraints

- **Base Theme:** Atelier (Horizon framework)
- **Constraint:** Maximize native Theme Editor capabilities. Custom liquid
  should be written only for unsupported interactions (e.g. self-hosted fonts,
  highly specific variant layouts if unachievable in blocks).

## Section Schemas (Atelier Defaults + Overrides)

1. **Hero Banner**

- Inputs: image, eyebrow, heading, subheading, CTA labels/links
- Target: Uses Atelier's native slideshow/hero block configured for editorial
  look.

2. **Lookbook**

- Inputs: heading, copy, blocks(image + linked_product)
- Target: If Atelier lacks a shoppable image overlay, this may require custom
  Liquid or usage of a native "Image with Text" grid alternative.

3. **Main Product**

- Inputs: product object + metafields
- Target: Gallery, variant controls, add-to-cart. We will inject the "Pairs Best
  With" block using Shopify Search & Discovery app here.

4. **Self Hosted Fonts**

- File: `snippets/swimdays-fonts.liquid` injected into `theme.liquid`.
- Dependencies: Aboreto, Poppins, Public Sans.

## Data Contract for 12-SKU Import

Ensure these Custom Metafields are defined via Shopify Admin:

- Namespace: `custom`

1. `custom.embroidery_detail`

- Type: Single line text | Used in: PDP Accordions/Text blocks

2. `custom.care_instructions`

- Type: Rich text or multi-line text | Used in: PDP Accordions/Text blocks

3. `custom.value_indicator`

- Type: Single line text (pipe-separated list) | Used in: General PDP context

## Integrated Skill Stack

1. `shopify`: For API guidance, Theme architecture, OS 2.0 blocks.
2. `accessibility-auditing`: For checking WGAC compliance on custom liquid or
   theme adjustments.
3. `seo-analytics`: For generating speed insights post-launch.
