# Swimdays Homepage — FINAL Build Spec

## 10 Sections. No more revisions. Just code.

---

## Design Principles

1. Photography does the work. The site is a frame.
2. Cream background (#FAF6F1), everywhere.
3. Two signature interactions (Silhouettes + Craft), everything else quiet.
4. Generous spacing: 14vh+ between sections.
5. Consistent cards: border-radius 8px, subtle shadow, gentle hover lift.
6. No custom cursor, no loader, no horizontal scroll. Mobile-first.

---

## Global Styles

```css
:root {
    --ocean: #34565b;
    --rose: #a84f77;
    --blush: #e2bcc9;
    --cream: #faf6f1;

    --section-gap: 14vh;
    --section-gap-large: 18vh;
    --content-pad: 48px;

    --card-radius: 8px;
    --card-shadow: 0 4px 24px rgba(52, 86, 91, 0.06);
    --card-shadow-hover: 0 8px 32px rgba(52, 86, 91, 0.1);
    --card-lift: -5px;

    --font-display: "Aboreto", serif;
    --font-body: "Poppins", sans-serif;
    --ease: cubic-bezier(0.23, 1, 0.32, 1);
}
```

---

## The 10 Sections

---

### 1. Announcement Bar

- **Background:** var(--ocean), solid
- **Content:** Scrolling marquee of USPs
- **Items:** "Hand-Beaded Embroidery" · "Free Shipping Above ₹2,999" · "Modest
  Luxury Swimwear" · "Made in India" · "Sizes XS — 4XL"
- **Behavior:** CSS animation, continuous scroll, pauses on hover
- **Schema:** Each item is a block, Fatema can add/edit/remove
- **Complexity:** Low
- **Est. time:** 30-45 min

---

### 2. Navbar

- **Layout:** Three-part — links left, logo center, icons right
- **Left:** Shop By Collection (simple dropdown: Moss / Cove / View All), About,
  Blog
- **Center:** SWIMDAYS in Aboreto, letter-spaced
- **Right:** Search icon, Account icon, Cart icon with count
- **Scroll behavior:** Starts transparent over hero → frosted glass on scroll
  (backdrop-filter: blur + semi-transparent cream bg). One CSS transition +
  ScrollTrigger class toggle.
- **Dropdown:** Simple list. Moss, Cove, View All. Appears on hover/click, clean
  animation.
- **Mobile:** Hamburger → full-screen slide-out overlay
- **Complexity:** Medium
- **Est. time:** 2-3 hours

---

### 3. Hero

- **Layout:** Full-viewport, single powerful image
- **Image:** Best photograph from the shoot (triptych composite or single hero
  shot)
- **Typography:** Large SWIMDAYS text overlay, mix-blend-mode for depth
- **CTA:** Single button — "Discover the Collection"
- **Animation:** GSAP entrance — image scales/fades in, text staggers, 1-2
  seconds
- **Scroll:** Subtle parallax — image and text drift at different speeds
- **Complexity:** Medium
- **Est. time:** 2-3 hours

---

### 4. Brand Statement

- **Layout:** Centered, max-width ~750px
- **Text:** One sentence, large. "Where the ocean meets _artistry_ — each piece
  hand-beaded with marine life that moves with _you._"
- **Typography:** clamp(24px, 3.5vw, 48px), font-weight 200
- **Animation:** Simple fade-in + translateY on scroll (GSAP ScrollTrigger)
- **Padding:** var(--section-gap-large) top and bottom
- **Complexity:** Very low
- **Est. time:** 20-30 min

---

### 5. The Silhouettes ⭐ (Signature Interaction #1)

**Purpose:** Introduce both collections AND show individual product types in one
interactive section.

**Default state — two portrait images side by side:**

```
┌──────────────────────────┬──────────────────────────┐
│                          │                          │
│                          │                          │
│         MOSS             │           COVE           │
│      main image          │        main image        │
│                          │                          │
│      Collection name     │       Collection name    │
│      Motif description   │       Motif description  │
│      [Explore →]         │       [Explore →]        │
│                          │                          │
│                          │                          │
└──────────────────────────┴──────────────────────────┘
```

Each image is portrait aspect ratio. Both fill the section equally (50/50). Text
overlays at bottom of each image: collection name, motif type, CTA.

**Expanded state — user clicks "Explore Moss":** Moss side stays in place. The
Cove image is covered by a 2x2 grid of the other 4 Moss product types.
Animation: the grid slides/expands over the Cove side.

```
┌──────────────────────────┬────────────┬─────────────┐
│                          │            │             │
│                          │  Moss #2   │  Moss #3    │
│         MOSS             │  (image)   │  (image)    │
│      main image          │            │             │
│      (stays)             ├────────────┼─────────────┤
│                          │            │             │
│                          │  Moss #4   │  Moss #5    │
│                          │  (image)   │  (image)    │
│      [← Back]            │            │             │
│                          │            │             │
└──────────────────────────┴────────────┴─────────────┘
```

The 2x2 grid dimensions match the main image dimensions exactly. Each small card
shows product image + product name overlay.

**Expanded state — user clicks "Explore Cove":** Mirror of the above. Cove
stays, Moss side gets covered by 2x2 grid of other 4 Cove pieces.

```
┌────────────┬─────────────┬──────────────────────────┐
│            │             │                          │
│  Cove #2   │  Cove #3    │                          │
│  (image)   │  (image)    │         COVE             │
│            │             │      main image          │
├────────────┼─────────────┤      (stays)             │
│            │             │                          │
│  Cove #4   │  Cove #5    │                          │
│  (image)   │  (image)    │                          │
│            │             │      [← Back]            │
│            │             │                          │
└────────────┴─────────────┴──────────────────────────┘
```

**Back button:** Returns to the default 50/50 state with a reverse animation.

**Technical approach:**

- GSAP animates width/transform of the expanding panel
- The 2x2 grid is always in the DOM, just hidden/offscreen
- On click: animate the grid into view while fading/pushing the opposite image
- Product images and names pulled from Shopify collection data via Liquid

**Complexity:** High (most complex section on the page) **Est. time:** 4-5 hours

---

### 6. The Craft ⭐ (Signature Interaction #2)

**Purpose:** Feature section highlighting 4 key craft/brand features with
scroll-driven storytelling.

**Layout (desktop):**

```
THE CRAFT                         (small label, outside div, top-left)

                 ┌──────────────────────────────────────────────────┐
                 │  1.   2.   3.   4.         (progress indicators) │
                 │                                                   │
                 │                                                   │
        HAND     │                                                   │
                 │                                                   │
           BEADED│                                                   │
                 │                                                   │
                 │           [ FEATURE IMAGE ]                       │
                 │           (fades between features)                │
                 │                                                   │
                 │  Sub 1    ·    Sub 2    ·    Sub 3                │
                 │  (evenly spaced, horizontally centered)           │
                 │                                                   │
                 └──────────────────────────────────────────────────┘

  ◄── 40% ──►   ◄────────────────── 60% ──────────────────►
```

**Element breakdown:**

- **"THE CRAFT" label:** Small text, positioned at top-left, outside the image
  div's left edge. Anchored in the 40% zone.

- **Progress indicators (1. 2. 3. 4.):** Inside the div, top edge, with left
  padding. Greyed out by default. Active number fills with black from bottom to
  top as user scrolls. Completed numbers stay solid black. Upcoming numbers stay
  grey.

- **Feature name:** Large, bold, stacked words. Positioned straddling the 40%
  boundary — first word higher, second word lower and offset slightly right:
  ```
  HAND
     BEADED
  ```
  Vertically centered relative to the div.

- **Feature image:** Inside the div, fills most of the space. Fades between
  images as features change.

- **Sub-features:** 3-4 small labels below the feature name text (the portion
  inside the div). Evenly spaced, horizontally centered within the div. Change
  with each feature.

**Scroll behavior (section is sticky/pinned):**

1. Section pins when it enters viewport
2. "THE CRAFT" label slides up from its bottom edge
3. Feature 1 name slides in word by word from bottom, staggered
4. Sub-features slide in from bottom, one at a time, smooth and quick
5. Feature 1 image fades in
6. As user continues scrolling, `1.` fills with black from bottom to top
   (scroll-linked, scrubbed)
7. When `1.` fully filled → transition to Feature 2:
   - Image crossfades to Feature 2 image
   - Feature name swaps (same slide-in-from-bottom animation)
   - Sub-features swap (same slide-in animation)
   - `2.` begins filling
8. Repeat for Features 3 and 4
9. When all 4 numbers are solid black → section unpins, scroll resumes

**4 Features (placeholder — update with Fatema's real content):**

| # | Feature Name   | Sub-features                                           | Image                |
| - | -------------- | ------------------------------------------------------ | -------------------- |
| 1 | HAND BEADED    | Marine Motifs · Pearl Thread · Coral Beadwork          | Close-up of beadwork |
| 2 | MODEST LUXURY  | Full Coverage · Elegant Silhouettes · Inclusive Sizing | Lifestyle shot       |
| 3 | OCEAN INSPIRED | Jellyfish Motif · Starfish Detail · Tonal Embroidery   | Detail of motif      |
| 4 | MADE IN INDIA  | Artisan Crafted · Ethically Made · Slow Fashion        | Workshop/process     |

**Technical approach:**

- GSAP ScrollTrigger with `pin: true` and `scrub: true`
- Total scroll distance = 4x viewport height (one vh per feature)
- Progress indicator fill = CSS clip-path or height animation, scrubbed to
  scroll
- Text transitions = GSAP timeline triggered at each threshold
- Image swap = CSS opacity crossfade

**Complexity:** High (second most complex section) **Est. time:** 4-5 hours

---

### 7. From the Journal

- **Layout:** Header row + 3 cards in horizontal row
- **Header:** "From the Journal" left, "View All →" right
- **Card contents:**
  - Image (60-70% of card height)
  - Category tag (small, above title)
  - Post title
  - "Read →" link
  - No excerpts, no dates, no author names
- **Card styling:** var(--card-radius), var(--card-shadow), hover lift
- **Data source:** Pulls dynamically from Shopify blog via Liquid
- **Animation:** Staggered fade-in on scroll
- **Complexity:** Low
- **Est. time:** 1-2 hours

---

### 8. Newsletter

- **Layout:** Split — heading left, email input right
- **Heading:** "Join the current"
- **Subtext:** "New collections, artisan stories, and early access."
- **Input:** Email field + "Subscribe" button
- **Note:** "We respect your inbox. Unsubscribe anytime."
- **Divider:** Simple border-top and border-bottom, no fancy backgrounds
- **Animation:** Simple fade-in on scroll
- **Complexity:** Very low
- **Est. time:** 30-45 min

---

### 9. FAQ

- **Layout:** Accordion — questions visible, answers collapsed
- **Topics:**
  1. Shipping & Delivery
  2. Sizing & Fit
  3. Returns & Exchanges
  4. Care Instructions
  5. Materials & Craftsmanship
- **Behavior:** Click to expand/collapse, smooth height animation
- **Only one open at a time** (clicking a new question closes the previous)
- **Animation:** CSS transition on max-height or GSAP
- **Complexity:** Low
- **Est. time:** 1-2 hours

---

### 10. Footer

- **Layout:** 4-column grid
- **Columns:**
  1. SWIMDAYS + tagline
  2. Shop: Moss Collection, Cove Collection, All Products, Size Guide
  3. About: Our Story, The Craft, Blog
  4. Help: FAQs, Shipping, Privacy, Contact
- **Legal bar:** © 2026 Swimdays · Handcrafted in India
- **Complexity:** Very low
- **Est. time:** 45-60 min

---

## Complete Animation List

| Animation                  | Section                              | Method                                      |
| -------------------------- | ------------------------------------ | ------------------------------------------- |
| Marquee scroll             | Announcement Bar                     | CSS @keyframes                              |
| Frosted glass on scroll    | Navbar                               | CSS transition + ScrollTrigger class toggle |
| Hero entrance              | Hero                                 | GSAP timeline (scale + fade + stagger)      |
| Hero parallax              | Hero                                 | GSAP ScrollTrigger scrub                    |
| Fade-in on scroll          | Brand Statement, Journal, Newsletter | GSAP ScrollTrigger (opacity + translateY)   |
| Staggered entrance         | Journal cards                        | GSAP stagger + ScrollTrigger                |
| Card hover lift            | All cards                            | CSS transition                              |
| Collection expand/collapse | The Silhouettes                      | GSAP width/transform animation on click     |
| Section pin                | The Craft                            | GSAP ScrollTrigger pin + scrub              |
| Number fill progress       | The Craft                            | GSAP scrub (clip-path or height)            |
| Text slide-in              | The Craft                            | GSAP from-bottom stagger                    |
| Image crossfade            | The Craft                            | CSS opacity transition                      |
| Accordion expand           | FAQ                                  | CSS max-height transition                   |

---

## Tech Stack

- Shopify Liquid (Online Store 2.0)
- GSAP + ScrollTrigger (self-hosted in assets/)
- Lenis (smooth scroll)
- Hand-written CSS (BEM)
- Aboreto (display) + Poppins (body)

---

## Build Order

| #  | Section          | Time      | Notes                       |
| -- | ---------------- | --------- | --------------------------- |
| 1  | Announcement Bar | 30-45 min | First win, build confidence |
| 2  | Footer           | 45-60 min | Simple, satisfying          |
| 3  | Brand Statement  | 20-30 min | Quick breather              |
| 4  | Newsletter       | 30-45 min | Quick win                   |
| 5  | FAQ              | 1-2 hours | Accordion logic             |
| 6  | Navbar           | 2-3 hours | Core infrastructure         |
| 7  | Hero             | 2-3 hours | Visual impact               |
| 8  | From the Journal | 1-2 hours | Blog data integration       |
| 9  | The Silhouettes  | 4-5 hours | ⭐ Signature interaction    |
| 10 | The Craft        | 4-5 hours | ⭐ Signature interaction    |
| 11 | Responsive pass  | 3-4 hours | Mobile polish               |
| 12 | Final QA         | 2-3 hours | Testing                     |

**Total: ~22-30 hours of building**

Build the simple sections first (1-5) to get your Liquid workflow dialed in.
Then tackle the core infrastructure (6-8). Save the two signature sections
(9-10) for last when you're most comfortable.

---

## Navigation Structure

```
NAVBAR
├── Shop By Collection (simple dropdown)
│   ├── Moss
│   ├── Cove
│   └── View All
├── About
├── Blog
│
│              [ SWIMDAYS ]
│
├── 🔍 Search
├── 👤 Account
└── 🛒 Cart (count)
```

---

## What's Deliberately NOT Here

- ❌ Masthead-to-navbar transformation
- ❌ Sky-to-sand thematic layer
- ❌ Custom cursor
- ❌ Cinematic loader
- ❌ Horizontal scroll lookbook
- ❌ Separate collection cards section
- ❌ Separate product highlights section
- ❌ Story strip section
- ❌ Social proof / Instagram section
- ❌ Wave SVG dividers
- ❌ Caustic light / particle effects

All can be v2 enhancements. Ship first.
