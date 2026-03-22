# Our Story Page Design

## Goal

Create a dedicated `Our Story` page for Swimdays that feels editorial, premium, and founder-led while staying visually consistent with the existing store.

## Approved Direction

- Use an image-led split hero with the founders' portrait at the top of the page.
- Keep the opening hero copy short and emotional rather than placing the full story above the fold.
- Break the brand story into distinct sections so the page reads like an editorial narrative, not a policy page or a wall of text.
- Preserve the existing Swimdays visual language:
  cream backgrounds
  serif + cursive typography pairing
  generous spacing
  restrained accent color
  image-first storytelling
- End the page with a soft shopping CTA rather than a hard promotional push.

## Page Architecture

### Section 1: Split Hero

- Left column:
  founders' portrait
  tall editorial crop
- Right column:
  `OUR STORY` eyebrow
  `Inspired from Sundays` headline
  short introductory paragraph
  floral divider

This section should establish the emotional tone and make the founders visually present immediately.

### Section 2: Story Body

- Present the long-form narrative in a narrow readable text column.
- Split the copy into short paragraphs:
  childhood `swim-days` memory
  difficulty finding suitable swimwear
  July 2024 decision to build Swimdays
- Use supporting section labelling such as `The Beginning` or similar editorial metadata.

### Section 3: Brand Essence

- Isolate the paragraph about Middle-Eastern design aesthetics, Indian palette, color, and beadwork.
- Present it as a centered statement block or softly highlighted editorial callout.
- This section should feel like the brand philosophy crystallized into one moment.

### Section 4: Our Goal

- Use a centered manifesto-style section.
- Keep the heading simple: `OUR GOAL`
- Use one medium-width paragraph with more breathing room than the story body.

### Section 5: Founders' Note

- Render two founder notes as separate cards or panels.
- Desktop:
  two columns
- Mobile:
  stacked cards
- Each card includes:
  founder name
  quote text

This section should feel intimate and personal rather than corporate.

### Section 6: Soft CTA

- Close the page with a quiet shopping bridge back into the collections.
- Use one short heading and 2 CTA buttons:
  `Shop Moss`
  `Shop Cove`

## Visual Treatment

- Background base stays in the same off-white / cream family already used on the homepage.
- The hero portrait should not be over-decorated; the photography should carry the section.
- Use floral/divider motifs sparingly, mainly to separate the intro from the long-form body.
- Keep text blocks narrow enough for comfortable reading and premium pacing.
- Avoid dense boxed layouts or dark dramatic panels that would break the current store tone.

## Responsive Behavior

- Mobile order:
  portrait first
  hero copy second
  then the story sections stacked vertically
- The split hero should collapse cleanly without side-scrolling or overly wide image crops.
- Founders' note cards must stack with comfortable spacing and no cramped quote text.
- Use fluid type and spacing so the page still feels editorial on smaller screens.

## Content Mapping

### Hero Intro

Use a short excerpt adapted from the opening story rather than the full paragraph.

### Story Body

Use the main `Our Story` narrative as 3 short paragraphs.

### Brand Essence

Use the paragraph beginning with `With middle-Eastern design aesthetics...`

### Our Goal

Use the provided `OUR GOAL` paragraph.

### Founders' Note

Use Zahabiya's and Fatema's quotes as separate cards.

## Implementation Recommendation

- Build a dedicated custom section for the page instead of relying on the generic `main-page` rich text template.
- Create a dedicated page template that references this custom section so the merchant can assign it to the `Our Story` page in Shopify admin.
- Seed the section schema with the approved copy as defaults so the page is usable immediately after template assignment.
