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

2. **Typography System**

- **Display/Headings:** Aboreto (Editorial Serif). Use for large titles, hero
  banners, and moments requiring a sophisticated, premium feel.
- **Display/Accents:** Katheriny (Script/Accent). Use sparingly for elegant
  touches, signature moments, subheadings, or stylistic contrast against the
  clean sans fonts.
- **Primary Body/UI Elements:** Poppins (Clean Sans). Use for navigation,
  buttons, and short UI text requiring high legibility and a modern touch.
- **Secondary Body/Long Form:** Public Sans (Clean Sans). Use for paragraphs,
  product descriptions, and dense text areas.
- **File Implementation:** `snippets/swimdays-fonts.liquid` injected into
  `theme.liquid`. Dependencies include Aboreto, Katheriny, Poppins, and Public
  Sans.

3. **Brand Color Palette**

The following colors from the PSD should be applied systematically to maintain
the brand's calm, premium aesthetic:

- **Deep Ocean (`#34565B`):** Darkest color. Use for primary text, deep
  backgrounds, and high-contrast UI elements (like primary CTA buttons). Grounds
  the design.
- **Old Rose (`#A84F77`):** Primary bold accent. Use sparingly for sale badges,
  notification dots, or interactions requiring immediate attention without being
  overly aggressive.
- **Spring Green (`#B1BD75`):** Secondary calm accent. Good for success states,
  secondary buttons, or subtle highlight backgrounds.
- **Sky (`#ADCCCC`):** Soft, cool neutral. Ideal for section backgrounds (e.g.,
  alternating content blocks) or subtle borders. Provides breathing room.
- **Blush (`#E2BCC9`):** Soft, warm neutral. Excellent for delicate hover
  states, light backgrounds behind product images, or secondary text highlights.

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
4. `web-design-guidelines`: Use when building or styling UI components to ensure
   modern, premium aesthetics.
5. `brand-color-psychology`: Refer to this when deciding which brand color
   (`Deep Ocean`, `Old Rose`, etc.) to apply to specific UI elements to maintain
   psychological harmony.
6. `brainstorming`: Invoke when stuck on a design problem to generate
   structured, creative lateral thinking ideas.
7. `multi-agent-brainstorming`: Use to simulate a panel of experts (e.g.,
   designer, marketer) critiquing new features or flows.
8. `creative-intelligence`: Boosts creative solutions for abstract problems,
   particularly useful for unconventional UI/UX patterns.
9. `marketing-ideas`: Use when planning how to highlight features or structure
   the Lookbook to drive engagement and sales.
