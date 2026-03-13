# Brand Statement Scroll Reveal Design

## Goal

Replace the current gallery-based brand statement in `prototypes/swimdays-home-concept.html` with a text-only reveal that sharpens word by word as the section scrolls from the bottom of the viewport to the top, then evolve it into a side-by-side font comparison for typography review.

## Approved Direction

- Use the existing `GSAP + ScrollTrigger + Lenis` stack already present in the prototype.
- Keep the section in normal document flow.
- Do not use sticky or pinned behavior.
- Remove the image/gallery treatment entirely.
- Reveal the statement word by word with blur and opacity tied to scroll progress.
- Keep the final state fully readable by the time the section reaches the top of the viewport.
- Compare two type treatments side by side:
  `Swimdays Subhead` / `Poppins`
  `Swimdays Body` / `Public Sans`
- On reduced motion or no-JS paths, render both text variants fully visible with no animation dependency.

## Structure

- Replace the current brand statement markup with a comparison block that contains two text variants of the same sentence.
- Keep the markup readable in HTML and split each text block into per-word spans in JavaScript.
- Preserve accessibility by exposing the full sentence through each parent element while generated word spans remain decorative.
- Add small labels so each font treatment is identifiable during review.

## Motion

- `ScrollTrigger` start: `top bottom`
- `ScrollTrigger` end: `top top`
- `scrub: true`
- Each word animates from blurred + low opacity to sharp + full opacity.
- Both text variants animate over the same scroll window with the same stagger profile so the typography remains the only comparison variable.

## Styling

- Text-only section with generous vertical spacing.
- No gallery, thumbnails, or image placeholders.
- Use a wider shell so the comparison can breathe.
- Increase the text max width beyond the original single-column version.
- Keep the section background aligned with the site’s unified `#fdfbfb` surface.
- Stack the variants on smaller screens and show them side by side on desktop widths.

## Fallbacks

- `prefers-reduced-motion: reduce`: skip the reveal and show the sentence fully visible.
- No GSAP or ScrollTrigger available: leave the sentence static and readable.

## Cleanup

- Remove the old gallery markup.
- Remove the old gallery CSS and responsive overrides.
- Remove the old brand statement gallery animation logic and fallback observer from the script.
- Replace the single-text assumptions in the reveal code with multi-block handling.
