# Swimdays — Shopify Setup Guide
### From Zero to Working Store Architecture

**For:** Shubh Khatri  
**Date:** February 26, 2026

---

## Step 1: Create the Shopify Store

### 1.1 — Sign Up
1. Go to **shopify.com** → "Start free trial"
2. You get **3 days free**, then **₹79/month for the first 3 months** (after that, Basic is ~₹2,000/month)
3. Fill in:
   - Store name: `Swimdays` (this creates a temporary URL like swimdays.myshopify.com)
   - Country: India
   - You can set this up under your account initially, then transfer ownership to Fatema later

### 1.2 — Initial Store Settings
Go to **Settings** (bottom-left of Shopify admin):

**Store details:**
- Store name: Swimdays
- Store contact email: [Fatema's email]
- Store industry: Clothing and accessories
- Store currency: INR (₹)
- Timezone: (GMT+05:30) Mumbai, Kolkata

**Plan:**
- Select **Shopify Basic** when trial ends (₹2,000/month)
- This gives: 2 staff accounts, basic reports, Shopify Payments

---

## Step 2: Install the Atelier Theme

### 2.1 — Add Atelier to Your Theme Library
1. Go to **Online Store → Themes**
2. Click **"Visit Theme Store"** (or go directly to themes.shopify.com)
3. Search for **"Atelier"** — it's in the Horizon collection
4. Click **"Try theme"** → This adds it to your theme library
5. **DO NOT click "Publish" yet** — we'll customize first

### 2.2 — Understand the Theme Library
In **Online Store → Themes**, you'll now see:
- **Current theme:** Whatever default theme came with your store (likely Dawn or Horizon base)
- **Theme library:** Atelier (unpublished)

The theme library is your workspace. You can customize Atelier here without affecting the live store. When ready, you publish it.

### 2.3 — Open the Theme Editor
1. In the theme library, find Atelier
2. Click **"Customize"**
3. You're now in the **Theme Editor** — this is where 80% of the non-code work happens

Take a moment to explore. On the left sidebar you'll see the section/block tree. In the center is the live preview. At the top you can switch between pages (Homepage, Products, Collections, etc).

---

## Step 3: Set Up Your Development Environment

This is how you'll write custom Liquid code alongside using the theme editor.

### 3.1 — Install Shopify CLI
```bash
# Make sure you have Node.js 18+ installed
node --version

# Install Shopify CLI globally
npm install -g @shopify/cli @shopify/theme

# Verify installation
shopify version
```

### 3.2 — Connect to Your Store
```bash
# Navigate to where you want the theme files
mkdir swimdays-theme
cd swimdays-theme

# Pull the Atelier theme from your store
shopify theme pull

# This will prompt you to:
# 1. Log in to your Shopify account (opens browser)
# 2. Select the store
# 3. Select which theme to pull (choose Atelier)
```

This downloads the entire Atelier theme to your local machine. You'll see a folder structure like:
```
swimdays-theme/
├── assets/          ← CSS, JS, fonts, images
├── config/          ← Theme settings JSON
├── layout/          ← theme.liquid (the master wrapper)
├── locales/         ← Translation files
├── sections/        ← All sections (including custom ones you'll add)
├── snippets/        ← Reusable code fragments
├── templates/       ← Page templates (JSON-based in Horizon)
└── blocks/          ← Theme blocks (new in Horizon)
```

### 3.3 — Start the Development Server
```bash
# Start live development mode
shopify theme dev

# This gives you:
# - A local preview URL (usually localhost:9292)
# - Hot reload — edit a file, save, see changes instantly
# - Syncs to a development theme on your store
```

**Important:** `shopify theme dev` creates a temporary "development theme" on your store. It's not visible to customers. You edit locally, and it syncs automatically.

### 3.4 — VS Code Setup (Recommended)
Install these VS Code extensions:
- **Shopify Liquid** — Syntax highlighting + IntelliSense for .liquid files
- **Theme Check** — Linting for Shopify themes (catches errors before they go live)

### 3.5 — Your Two Workflows

From this point, you have **two ways** to make changes:

| Method | What It's For | How |
|--------|---------------|-----|
| **Theme Editor** (browser) | Configuring settings, rearranging sections, changing colors/fonts, setting up pages | Online Store → Themes → Customize |
| **Code Editor** (VS Code + CLI) | Writing custom Liquid sections, adding custom CSS, uploading fonts, anything code-related | Edit files locally → `shopify theme dev` auto-syncs |

**Both methods edit the same theme.** Changes in the theme editor update the JSON config files. Changes in your code editor update the Liquid/CSS/JS files. They coexist.

---

## Step 4: Store Configuration

### 4.1 — Payments (Settings → Payments)

**Primary: Razorpay**
1. Go to **Settings → Payments**
2. Under "Third-party providers", search for **Razorpay**
3. Click "Activate" and follow Razorpay's onboarding (you'll need Fatema's business PAN, GST, bank details)
4. Razorpay supports: UPI, all Indian cards, netbanking, wallets — essential for Indian market

**Also enable:**
- **Cash on Delivery (COD)** — Still huge in India. Go to Settings → Payments → Manual payment methods → Add "Cash on Delivery"

**For testing:** 
- Enable **Shopify's Bogus Gateway** for test orders: Settings → Payments → Enable "Bogus Gateway" (use this during development, disable before launch)

### 4.2 — Shipping (Settings → Shipping and delivery)

**Domestic (India):**
1. Create a shipping zone: "India"
2. Add all Indian states
3. Set rates:
   - Option A: **Flat rate** — e.g., ₹99 shipping on all orders
   - Option B: **Free shipping threshold** — Free above ₹2,999, ₹149 below (recommended — drives larger cart sizes)
4. Set processing time: 2–3 business days

**International (if needed later):**
- Skip for v1 launch. Can add later.

### 4.3 — Taxes (Settings → Taxes and duties)
1. Shopify auto-configures GST for India-based stores
2. Verify that tax is set to "Include tax in prices" (standard for Indian e-commerce) OR "Add tax at checkout" — confirm with Fatema which approach she prefers
3. GST rate for clothing: 5% (below ₹1,000) or 12% (₹1,000 and above) — Shopify handles this if configured correctly

### 4.4 — Legal Pages (Settings → Policies)
1. Shopify provides **auto-generated templates** for:
   - Privacy Policy
   - Terms of Service
   - Refund Policy
   - Shipping Policy
2. Click "Create from template" for each
3. Customize with Swimdays-specific details (Fatema should review these)
4. These auto-link in the checkout footer

### 4.5 — Notifications (Settings → Notifications)
Customize these email templates with Swimdays branding:
1. **Order confirmation** — Most important, this is the customer's first post-purchase touchpoint
2. **Shipping confirmation**
3. **Abandoned cart** — Enable this from day one (Settings → Checkout → scroll to "Abandoned checkouts")

For now, just update the **logo** and **accent color** in the notification settings. Copy polish can come later.

---

## Step 5: Create Collections

### 5.1 — Collection Structure
Go to **Products → Collections** and create:

| Collection | Handle | Type | Description |
|------------|--------|------|-------------|
| **Moss** | `/collections/moss` | Manual | First launch collection |
| **Cove** | `/collections/cove` | Manual | Second launch collection |
| **All** | `/collections/all` | Automatic (all products) | Shows everything |
| **New Arrivals** | `/collections/new-arrivals` | Automatic (sort by newest) | Dynamic, auto-updates |

### 5.2 — Creating a Collection
1. Go to **Products → Collections → Create collection**
2. Title: "Moss"
3. Description: [TBD — Fatema provides copy]
4. Collection type: **Manual** (since she's curating exactly which products go in each)
5. Collection image: [Upload when photography is ready]
6. SEO: Edit the URL handle to be clean (e.g., `moss` not `moss-collection`)

Repeat for Cove.

---

## Step 6: Set Up "Pairs Best With" Feature

This is the complementary products feature using Shopify's free Search & Discovery app.

### 6.1 — Install the App
1. Go to **Apps** in Shopify admin
2. Search the App Store for **"Shopify Search & Discovery"**
3. Install it (it's free, made by Shopify)

### 6.2 — Set Up Product Pairings
Once products are uploaded (Phase 4 in the build sequence), Fatema will:

1. Open **Apps → Search & Discovery**
2. Go to **Recommendations**
3. Click on a product (e.g., "Coastal Blue Swim Dress")
4. Under **"Complementary products"** → Click "Add products"
5. Select the products that pair with it (e.g., "Ocean Mist Cover-Up", "Shell Bead Sarong")
6. She can add up to 10 complementary products per item
7. Click **Save**
8. Repeat for every product

**Bulk editing shortcut:**
- On the Recommendations page, select multiple products
- Click "Bulk edit" to open the Bulk Editor
- Assign complementary products to several items at once

### 6.3 — Add the Block to Product Pages (Theme Editor)
1. Open the **Theme Editor** (Online Store → Themes → Customize)
2. Navigate to a **Product page** (use the page selector dropdown at top)
3. In the left sidebar, find the **"Product information"** section
4. Click **"Add block"**
5. Select **"Complementary products"**
6. Configure the block settings:
   - **Heading:** Change from default to `"Pairs Best With"`
   - **Number of products to show:** 2–3 (for a clean look; more can be scrolled)
   - **Enable slider:** Yes (so users can scroll through if there are more than shown)
7. **Position the block:** Drag it to sit below the "Add to Bag" button area but above the accordion tabs — this is the ideal placement for cross-sell
8. Click **Save**

### 6.4 — How It Looks on the Product Page

```
┌──────────────────────────────────────────────┐
│                                              │
│  [Product Image]     PRODUCT NAME            │
│                      ₹X,XXX                  │
│                                              │
│                      Size: [XS][S][M]...     │
│                      [ ADD TO BAG ]          │
│                                              │
│                      ── Pairs Best With ──   │
│                      ┌──────┐  ┌──────┐      │
│                      │Prod A│  │Prod B│      │
│                      │₹X,XXX│  │₹X,XXX│      │
│                      └──────┘  └──────┘      │
│                                              │
│                      ▸ Description           │
│                      ▸ Fabric & Care         │
│                      ▸ Shipping              │
│                                              │
└──────────────────────────────────────────────┘
```

The complementary products display as small product cards with image, name, price, and a quick-add button. Customers can add paired items without leaving the page.

### 6.5 — Strategy for Swimdays Pairings

With 12 SKUs across 2 collections, here's how to think about pairings:

- **Swim dress → Cover-up** (natural pair: you wear the cover-up over the swim dress)
- **Bikini top → Matching bottom** (if sold separately)
- **Any swim piece → Sarong or wrap** (accessory upsell)
- **Moss piece → Cove piece** (cross-collection discovery: "like earth tones? try ocean tones")
- Keep it to **2–3 pairings per product** for a clean, curated feel (not a product wall)

---

## Step 7: Navigation Setup

### 7.1 — Create the Main Menu
Go to **Online Store → Navigation → Main menu**

```
Main Menu:
├── Shop
│   ├── Moss                → /collections/moss
│   ├── Cove                → /collections/cove
│   └── All Products        → /collections/all
├── Lookbook                → /pages/lookbook
├── Size Guide              → /pages/size-guide
└── About                   → /pages/about
```

### 7.2 — Create the Footer Menu
Go to **Online Store → Navigation** → Add menu → "Footer"

```
Footer Menu:
├── Shop
│   ├── Moss
│   ├── Cove
│   └── All Products
├── Help
│   ├── Size Guide
│   ├── FAQs
│   ├── Shipping & Returns
│   └── Contact Us
├── About
│   └── Our Story
└── Legal
    ├── Privacy Policy        → /policies/privacy-policy
    ├── Terms of Service      → /policies/terms-of-service
    └── Refund Policy         → /policies/refund-policy
```

### 7.3 — Assign Menus in Theme Editor
1. Open Theme Editor
2. Click on the **Header** section
3. Set "Menu" to → Main menu
4. Click on the **Footer** section
5. Set menus accordingly

---

## Step 8: Create Essential Pages

Go to **Online Store → Pages** and create these placeholder pages:

| Page | Handle | Purpose | Content Status |
|------|--------|---------|----------------|
| **Lookbook** | `lookbook` | Editorial gallery | Will be built with custom template |
| **Size Guide** | `size-guide` | Measurements + how to measure | Need body measurement data from Fatema |
| **About** | `about` | Brand story | Need copy from Fatema |
| **Contact** | `contact-us` | Email + WhatsApp info | Can set up now |
| **FAQs** | `faqs` | Common questions | Draft questions, finalize with Fatema |

For now, just create the pages with placeholder text so navigation links work. Content will be filled in later.

---

## Step 9: Font Setup (Code)

This is your first code task. We're self-hosting the fonts for performance.

### 9.1 — Download Font Files
Download `.woff2` versions of:
- **Aboreto** — from Google Fonts (fonts.google.com → Aboreto → download)
- **Poppins** — from Google Fonts (Regular, Medium, SemiBold weights)
- **Public Sans** — from Google Fonts (Regular, Italic)
- **Katheriny** — This may be a purchased font. Check if Fatema has the .woff2 file. If it's a font she purchased, she needs to provide the web font files.

**Convert to .woff2 if needed:**
Use an online converter like cloudconvert.com (TTF/OTF → WOFF2)

### 9.2 — Upload to Theme Assets
Using Shopify CLI (your local theme files):
1. Place all `.woff2` files in the `assets/` folder:
```
assets/
├── aboreto-regular.woff2
├── poppins-regular.woff2
├── poppins-medium.woff2
├── poppins-semibold.woff2
├── public-sans-regular.woff2
├── public-sans-italic.woff2
└── katheriny-regular.woff2
```

### 9.3 — Create Font Face Declarations
Create a new file: `snippets/swimdays-fonts.liquid`

```liquid
{%- comment -%} Swimdays Custom Fonts {%- endcomment -%}

<style>
  @font-face {
    font-family: 'Aboreto';
    src: url('{{ 'aboreto-regular.woff2' | asset_url }}') format('woff2');
    font-weight: 400;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: 'Poppins';
    src: url('{{ 'poppins-regular.woff2' | asset_url }}') format('woff2');
    font-weight: 400;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: 'Poppins';
    src: url('{{ 'poppins-medium.woff2' | asset_url }}') format('woff2');
    font-weight: 500;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: 'Poppins';
    src: url('{{ 'poppins-semibold.woff2' | asset_url }}') format('woff2');
    font-weight: 600;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: 'PublicSans';
    src: url('{{ 'public-sans-regular.woff2' | asset_url }}') format('woff2');
    font-weight: 400;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: 'PublicSans';
    src: url('{{ 'public-sans-italic.woff2' | asset_url }}') format('woff2');
    font-weight: 400;
    font-style: italic;
    font-display: swap;
  }

  @font-face {
    font-family: 'Katheriny';
    src: url('{{ 'katheriny-regular.woff2' | asset_url }}') format('woff2');
    font-weight: 400;
    font-style: normal;
    font-display: swap;
  }
</style>

{%- comment -%} Preload the heading font for faster rendering {%- endcomment -%}
<link rel="preload" href="{{ 'aboreto-regular.woff2' | asset_url }}" as="font" type="font/woff2" crossorigin>
```

### 9.4 — Include in Theme Layout
Open `layout/theme.liquid` and add this line inside the `<head>` tag, near the top (before other stylesheets):

```liquid
{% render 'swimdays-fonts' %}
```

### 9.5 — Configure in Theme Editor
After fonts are loaded, go to **Theme Editor → Theme settings → Typography**:
- Set heading font to: Aboreto (it should now appear as an option since it's loaded)
- Set body font to: PublicSans

**Note:** Horizon themes may handle font configuration differently than Dawn. If Atelier's typography settings don't show custom self-hosted fonts in the dropdown, you may need to override via CSS custom properties instead. We'll handle that when we get there.

---

## Step 10: Newsletter Setup (Shopify Email — Free)

### 10.1 — Enable Email Collection at Checkout
1. **Settings → Checkout** → Under "Customer contact," ensure "Email" is selected
2. Scroll to **"Email marketing"** → Check "Show option at checkout"
3. Optional: Pre-select the checkbox (more signups, but some customers find this annoying)

### 10.2 — Set Up Shopify Email
1. Go to **Apps** → Search for **"Shopify Email"**
2. Install (free — 10,000 emails/month included)
3. This gives Fatema the ability to:
   - Create branded email campaigns
   - Send to her subscriber list
   - Use pre-built templates
   - Track open rates and clicks
4. No monthly cost until she exceeds 10,000 emails

### 10.3 — Newsletter Signup on the Site
The homepage newsletter section (built into Atelier) will collect emails automatically into Shopify's customer list. No extra wiring needed — when someone enters their email in the newsletter section, they become a "subscriber" in Shopify's customer database, and Shopify Email can send to them.

---

## Step 11: Essential Free Apps to Install

Go to **Apps** in Shopify admin and install these:

| App | What It Does | Setup Time |
|-----|-------------|------------|
| **Shopify Search & Discovery** | "Pairs Best With" feature + search filters | 10 min |
| **Judge.me Product Reviews** | Customer reviews with photos | 15 min |
| **Shopify Email** | Newsletter campaigns | 5 min |
| **Google & YouTube** | Connects GA4 + Google Search Console | 15 min |

**Apps to install LATER (during Phase 5):**
- Kiwi Size Chart (only if we don't build a custom size guide)
- Plug in SEO (for SEO audits post-launch)

**Important: Keep apps minimal.** Every app adds JavaScript to the store, which slows page load. Only install what you'll actively use.

---

## Step 12: Google Analytics & Meta Pixel

### 12.1 — Google Analytics 4
1. Create a GA4 property at analytics.google.com (use Fatema's Google account)
2. Get the Measurement ID (starts with "G-")
3. In Shopify: **Online Store → Preferences** → Paste the GA4 ID in the "Google Analytics" field
4. OR use the Google & YouTube app for deeper integration

### 12.2 — Meta Pixel (for future Instagram/Facebook ads)
1. Create a Meta Pixel at business.facebook.com
2. Get the Pixel ID
3. In Shopify: **Online Store → Preferences** → Paste in the "Meta Pixel" field
4. This starts collecting data immediately — even if Fatema doesn't run ads yet, the pixel learns about her audience

### 12.3 — Google Search Console
1. Go to search.google.com/search-console
2. Add property → Enter the domain
3. Verify via DNS or HTML tag (Shopify makes this easy)
4. Submit the sitemap: `swimdays.com/sitemap.xml` (Shopify auto-generates this)
5. This ensures Google indexes the store

---

## Architecture Summary — What You Now Have

After completing Steps 1–12, your setup looks like this:

```
SHOPIFY ADMIN
├── Store Settings ✓
│   ├── Razorpay (payments)
│   ├── Domestic shipping zones
│   ├── GST tax rules
│   └── Legal policies
│
├── Atelier Theme (unpublished, in library) ✓
│   ├── Theme Editor → for visual configuration
│   └── Shopify CLI → for custom code
│
├── Collections ✓
│   ├── Moss (manual)
│   ├── Cove (manual)
│   ├── All (automatic)
│   └── New Arrivals (automatic)
│
├── Navigation ✓
│   ├── Main menu (Shop/Lookbook/Size Guide/About)
│   └── Footer menu (Shop/Help/About/Legal)
│
├── Pages ✓ (placeholders)
│   ├── Lookbook
│   ├── Size Guide
│   ├── About
│   ├── Contact
│   └── FAQs
│
├── Apps ✓
│   ├── Search & Discovery (Pairs Best With)
│   ├── Judge.me (Reviews)
│   ├── Shopify Email (Newsletter)
│   └── Google & YouTube (Analytics)
│
└── Tracking ✓
    ├── GA4
    ├── Meta Pixel
    └── Google Search Console

LOCAL DEVELOPMENT
├── swimdays-theme/ (pulled via Shopify CLI)
│   ├── snippets/swimdays-fonts.liquid ✓
│   ├── assets/*.woff2 (fonts) ✓
│   ├── sections/ (custom sections go here — next phase)
│   └── shopify theme dev (running)
```

---

## What's Next After Setup

Once this architecture is in place, the next steps are:

1. **Upload products** — When Fatema provides the 12 SKUs with images
2. **Set up complementary pairings** — In Search & Discovery, pair products
3. **Build custom sections** — The 5 Liquid sections (marquee, lookbook, USP bar, newsletter+FAQ, size guide)
4. **Configure the homepage** — Arrange sections in the theme editor
5. **Polish and test** — Mobile, checkout, performance

**You can start Steps 1–12 RIGHT NOW** — none of them require product photography or final copy. This is all the structural foundation work.

---

*This guide gets you from zero to a fully architected, properly configured Shopify store ready to receive products and custom sections. The "Pairs Best With" feature is wired up and waiting — as soon as products are uploaded, Fatema can start pairing them.*
