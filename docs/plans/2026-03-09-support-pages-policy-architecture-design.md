# Support Pages And Policy Architecture Design

## Goal

Define the launch information architecture and content boundaries for Swimdays support and policy pages without inventing missing client content.

## Approved Direction

- Use a focused four-page system:
  `Shipping & Returns`
  `FAQ & Contact`
  `Privacy Policy`
  `Terms of Service`
- Use the structure of Knix as the primary reference for support-page information architecture.
- Borrow the restraint and premium presentation cues from SKIMS for visual treatment.
- Do not use content from one page to artificially fill another page.
- Do not draft legal filler for `Privacy Policy` or `Terms of Service` before business inputs are confirmed.
- Treat launch as India-live and UAE-ready.

## Reference Evaluation

- `Knix` is the best structural reference for Swimdays.
- `SKIMS` is the best visual reference for premium layout and summary actions.
- `Outdoor Voices` is too heavy for launch because it assumes a full help-center model.
- `JW PEI` is useful as a plain-text policy reference, not as a page UX model.

## Page Architecture

### Shipping & Returns

- Main operational policy page.
- Contains only shipping, exchange, damaged-item, cancellation, and delivery-policy content supported by the client copy.

### FAQ & Contact

- Contact-first support page.
- Contains contact methods, inquiry paths, and short FAQs only where Swimdays already has real answers.
- Links back to `Shipping & Returns` for full policy details instead of repeating them.

### Privacy Policy

- Separate legal page for data collection, processing, and disclosure practices.
- Must reflect launch realities: newsletter signup, contact forms, account creation, ecommerce orders, and live tracking tools.

### Terms of Service

- Separate legal page for browsing, account use, purchases, payment, fulfillment, promotions, ownership, and liability terms.

## Operational Content Mapping

### Shipping & Returns

- Hero:
  page title
  one-line intro
  support email
- Summary strip:
  `No refunds`
  `Exchange requests within 7 days`
  `Damaged/incorrect items reported within 24-48 hours`
- `Returns & Exchanges`
  no refunds
  bodysuits, shorts, and leggings are non-returnable and non-exchangeable
  exchange window for size or style issues
  items must be unused, unwashed, intact, and in original packaging
- `Damaged or Incorrect Items`
  report within 24-48 hours
  unpacking video required
  video must begin before opening the seal
- `How to Start a Request`
  contact `studioswimdays@gmail.com`
  one-time free shipping for exchange
  pickup arranged after approval
  unauthorized returns not accepted
  if pickup is unavailable, customer sends item back
  express-courier exchange shipping is customer-paid
- `Cancellations`
  request by email within 24-48 hours
- `Shipping`
  dispatch in 1-2 business days
  domestic delivery in 4-5 business days
  free domestic shipping
  express courier at `Rs. 350`
  partial COD
  international charges and timing calculated later
  duties and taxes paid by customer
  tracking shared after order confirmation
- `Lost or Stolen Packages`
  Swimdays is not responsible for lost or stolen packages
  customers should verify address carefully
  carrier assumes responsibility once the parcel is handed over

### FAQ & Contact

- Hero:
  contact-led heading and short support intro
- Primary contact block:
  `studioswimdays@gmail.com`
- Inquiry cards:
  `Exchange request`
  `Damaged or incorrect item`
  `Cancellation`
  `Shipping help`
- Short FAQ layer only for questions already answered elsewhere:
  `Do you offer refunds?`
  `What items are non-returnable?`
  `How do I request an exchange?`
  `How fast do orders ship?`
  `Do you offer express delivery?`
- Each FAQ answer stays short and links to the relevant anchor on `Shipping & Returns`.
- Do not add sizing, fabric care, customs, or payment FAQs until the client provides them.

## Legal Content Mapping

### Privacy Policy

- `Introduction`
  describe data processing when customers browse the site, create accounts, place orders, contact support, or join marketing lists
- `Information We Collect`
  identity and contact data
  account data
  order data
  support correspondence
  marketing preferences
  technical and cookie data
- `How We Use Information`
  order processing
  shipping and support
  account management
  marketing communications
  fraud prevention and security
  analytics and site improvement
  legal compliance
- `When Information Is Shared`
  payment providers
  shipping partners
  Shopify and support apps
  email and marketing tools
  analytics providers
  legal or regulatory disclosures
- `Cookies and Tracking`
  explain essential cookies plus analytics and marketing tools that are actually live
- `Marketing Communications`
  explain email signup and unsubscribe handling
- `Data Retention`
  high-level retention framing only
- `Data Security`
  high-level safeguards statement only
- `Your Rights`
  start broad and refine later if UAE-specific rights language is needed
- `Children's Privacy`
- `International Processing`
  include only if the launch stack requires it
- `Contact`
  provide the actual privacy request channel

### Terms of Service

- `Introduction and Acceptance`
- `Eligibility and Account Use`
- `Products and Availability`
- `Pricing and Payment`
- `Order Acceptance and Cancellation`
- `Shipping and Delivery`
  should reference the public `Shipping & Returns` policy page instead of duplicating details
- `Exchanges, Returns, and Refunds`
  should reference the public `Shipping & Returns` policy page
- `Promotions and Discount Codes`
- `Intellectual Property`
- `Prohibited Use`
- `Third-Party Services and Links`
- `Disclaimer of Warranties`
- `Limitation of Liability`
- `Indemnity`
- `Governing Law and Dispute Resolution`
- `Changes to Terms`
- `Contact`

## Launch Rollout Recommendation

- Publish support and legal pages for India launch conditions.
- Keep `Privacy Policy` and `Terms of Service` structurally ready for UAE expansion.
- Do not publish UAE-specific shipping, return, or legal commitments until UAE sales operations are actually live.
- It is acceptable for UAE visitors to access the site before UAE checkout launches, but the customer-facing policies should not promise UAE fulfillment details prematurely.

## Missing Inputs For The Client

### Operational

- Is the exchange window 7 days from purchase or 7 days from delivery?
- Is the damaged-item claim window 24 hours or 48 hours?
- Is the cancellation window 24 hours or 48 hours?
- What are the UAE delivery timelines?
- Should UAE shipping appear on launch-day customer pages?
- What is the customer support response time?
- Are any non-email support channels available at launch?

### Privacy Policy

- Legal business name
- Registered business address
- Privacy contact email if different from support
- Launch app/tool list:
  Shopify apps
  email platform
  analytics tools
  advertising pixels
  support/chat tools
- Whether cookie consent tooling will be enabled at launch

### Terms Of Service

- Legal business name
- Registered business address
- Governing law and jurisdiction
- Whether disputes are handled only in India at launch
- Final payment methods
- Whether promotions, gift cards, or store credit will exist at launch

## Notes

- The `writing-plans` skill referenced by the brainstorming workflow is not installed in this session.
- This document captures the approved design so implementation planning can continue once that capability is available or replaced with a manual planning step.
