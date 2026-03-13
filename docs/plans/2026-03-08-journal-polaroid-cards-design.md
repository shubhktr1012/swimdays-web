# Journal Polaroid Cards Design

## Goal

Replace the empty journal/blog placeholder in `prototypes/swimdays-home-concept.html` with a 3-card editorial layout that feels like curated polaroid prints on the pale aqua homepage section.

## Approved Direction

- Use a refined editorial polaroid treatment, not a distressed vintage or scrapbook style.
- Keep the existing `The Journal` heading with the new `View All` CTA.
- Render exactly 3 cards for this prototype pass.
- Make each card fully clickable.
- Show only three content elements per card:
  `Image`
  `Date`
  `Title`
- Do not add excerpt text, buttons, or secondary metadata inside the cards.

## Visual Treatment

- Each card should read as a white printed photo with a slightly deeper bottom margin.
- Use a portrait-leaning image area to reinforce the polaroid silhouette.
- Keep the shadows soft and airy so the cards feel lifted from the aqua background.
- Use subtle rotation variation on larger screens:
  left card slightly counterclockwise
  center card nearly straight and slightly lower
  right card slightly clockwise
- Keep the composition restrained and premium rather than playful.

## Typography

- Date uses the `Swimdays Subhead` / `Poppins` treatment in small uppercase editorial metadata styling.
- Title uses the `Swimdays Heading` / `Aboreto` serif.
- The bottom caption area should contain the date first and the title directly below it.

## Motion

- Hover/focus motion should be minimal:
  small vertical lift
  tilt relaxes slightly
  image scales very subtly
- Focus styles must remain visible for keyboard users.

## Responsive Behavior

- Mobile: cards stack vertically with no visible tilt.
- Tablet: cards can move into a 2-column grid while staying easy to scan.
- Desktop: cards sit in a 3-column row with the approved tilt variation.

## Assets

- Use local photos from `public/photoshoot/` for the prototype.
- Keep `href="#"` links as UI placeholders until the real journal routes are defined.
