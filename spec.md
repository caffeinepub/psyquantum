# PsyQuantum

## Current State
Privacy Policy (`/privacy`) and Terms & Conditions (`/terms`) pages have all text hardcoded in their respective TSX files. The admin panel has a Site Text tab that can edit text via backend key-value store, but neither legal page is connected to it.

## Requested Changes (Diff)

### Add
- Privacy Policy section in Admin Site Text tab with editable fields for all sections (intro, each numbered section title and body, contact info, last updated date)
- Terms & Conditions section in Admin Site Text tab with editable fields for all sections
- Backend site text keys prefixed with `privacy.` and `terms.` for all editable content

### Modify
- `PrivacyPolicy.tsx`: Load all text from backend site texts (`useGetAllSiteTexts`) using `privacy.*` keys, falling back to hardcoded defaults when backend value is empty
- `TermsAndConditions.tsx`: Load all text from backend site texts using `terms.*` keys, falling back to hardcoded defaults when backend value is empty
- `Admin.tsx` `SiteTextTab`: Add two new sections — Privacy Policy and Terms & Conditions — each with multiline textarea fields for every section title and body text

### Remove
- Nothing removed

## Implementation Plan
1. Define `privacy.*` and `terms.*` site text keys for every editable piece of content in both legal pages (section titles, body paragraphs, last updated date, contact info)
2. Update `PrivacyPolicy.tsx` to call `useGetAllSiteTexts()` and render text from the backend map, using hardcoded strings as defaults
3. Update `TermsAndConditions.tsx` similarly
4. Add a "Legal Pages" section at the bottom of `SiteTextTab` in `Admin.tsx` with `SiteTextField` entries for every key defined in steps 1-2
