# Cart Badge Alignment Design

## Goal

Make the cart item count in the custom Swimdays header sit in a visually correct position relative to the cart icon across breakpoints.

## Problem Summary

The current custom header positions the cart badge against the outer clickable cart wrapper. That wrapper uses a larger touch target than the icon itself, so the badge appears slightly too far out and too high.

## Approved Direction

- Keep the current cart icon and badge styling language.
- Keep the larger clickable tap target.
- Change the badge anchoring so it is positioned relative to the cart glyph, not the larger wrapper.

## Recommended Solution

Move the badge inside the cart icon container and make that icon container the positioning context.

### Why This Approach

- The badge will track the actual icon instead of the invisible hit area.
- Offset tuning becomes stable across breakpoints.
- The clickable cart target remains large enough for usability.
- This is more robust than endlessly tweaking `top` and `right` values on the wrapper.

## Scope

- `snippets/swimdays-home-header.liquid`
- Markup and CSS only

## Validation

- Confirm the badge sits cleanly over the top-right of the cart icon.
- Confirm the wrapper still has the same clickable area.
- Confirm single-digit and multi-digit counts still fit.
