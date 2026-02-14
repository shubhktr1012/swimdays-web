# Swimdays v3 Launch Runbook

## Pre-Launch

1. Freeze non-essential content edits.
2. Duplicate current live theme for rollback.
3. Validate payments/shipping/tax/legal configuration.
4. Re-run QA checklist in `documents/swimdays-v3/qa-checklist.md`.
5. Confirm DNS and domain ownership access.

## Launch Steps

1. Push reviewed theme to store as unpublished.
2. Run final stakeholder review on preview URL.
3. Publish theme during low-traffic window.
4. Perform smoke tests:
- homepage
- product page
- add-to-cart
- checkout entry
- newsletter submit

## Rollback Criteria

Rollback if any of these occur after launch:
- Checkout blockers
- Broken navigation/cart paths
- Critical rendering issues on mobile

## Rollback Steps

1. Re-publish previous duplicated theme.
2. Capture issue logs/screenshots.
3. Patch on development branch.
4. Re-run smoke tests and republish.

## Post-Launch (24h)

- Monitor orders and checkout funnel activity.
- Verify Search Console indexing and crawl status.
- Log fixes and prepare handover notes.
