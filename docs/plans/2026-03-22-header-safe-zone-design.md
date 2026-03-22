# Header Safe Zone Design

## Goal

Prevent the decorative navbar flowers from visually colliding with the leftmost nav link and rightmost cart icon on mid-sized non-mobile screens.

## Approved Direction

- Keep the current mobile header unchanged.
- Keep the current extra-large desktop layout unchanged.
- Add more horizontal breathing room only on the desktop-to-pre-2xl range where the overlap appears.
- Solve both sides together:
  left nav links
  right action icons
  decorative flowers

## Problem Summary

The custom Swimdays header shows floral SVGs cropped into the navbar from the left and right edges. On medium desktop widths, the content column sits too close to those decorative edges, so the `Home` link and cart icon visually overlap the flowers.

## Recommended Solution

Use a mid-range safe zone instead of changing the entire header architecture.

### Safe Zone Behavior

- Between the desktop nav breakpoint and the 2xl breakpoint, increase horizontal inset on the navbar content container.
- In that same range, push the flower graphics slightly farther off-canvas so the visual overlap is reduced from both directions.
- Preserve the current center logo behavior and existing mobile drawer behavior.

### Why This Approach

- It directly addresses the collision range without disturbing mobile behavior.
- It keeps the current large-desktop balance intact.
- It is less brittle than individually padding only the first nav link or only the cart icon.
- It preserves the decorative treatment while acknowledging that the layout needs more usable edge space on medium desktop widths.

## Scope

### In Scope

- `snippets/swimdays-home-header.liquid`
- CSS only
- Desktop and tablet-adjacent widths where the desktop nav is active

### Out of Scope

- Mobile menu layout
- Header markup changes
- New theme settings
- Reworking logo sizing or nav structure

## Responsive Range

- Leave mobile behavior untouched below the desktop nav breakpoint.
- Apply the safe zone from the desktop nav breakpoint up to, but not including, the extra-large 2xl range.
- At 2xl and above, fall back to the current spacing.

## Validation

- Confirm the `Home` link no longer sits on top of the left flower.
- Confirm the cart icon no longer sits on top of the right flower.
- Confirm the logo remains visually centered.
- Confirm no regression to mobile drawer behavior.
