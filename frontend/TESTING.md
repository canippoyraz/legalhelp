# LegalHelp Next.js — Manual Test Plan

## Setup
```bash
cd frontend
cp .env.local.example .env.local   # then set ANTHROPIC_API_KEY
npm run dev
# Open http://localhost:3000 in a browser
```

---

## 0. AI Chat Widget (all pages)

| # | Action | Expected |
|---|--------|----------|
| 1 | Load any page (`/`, `/builder`, `/dashboard`) | Floating chat button visible bottom-right |
| 2 | Click the chat button | Panel opens smoothly; disclaimer ("AI-generated guidance only — not legal advice…") visible; greeting message shown |
| 3 | Ask "what is an NDA?" | Typing indicator (bouncing dots) appears, then a streamed, relevant answer from Claude replaces it word-by-word |
| 4 | Ask a follow-up referencing the previous answer | Response shows the assistant used prior context (multi-turn) |
| 5 | Send a message while a response is still streaming | Input and send button are disabled until the current response finishes |
| 6 | Unset `ANTHROPIC_API_KEY` and restart dev server, then send a message | Falls back to a rule-based reply instead of an error or blank response |
| 7 | Click the × button | Panel closes |
| 8 | Resize to mobile (< 420 px) | Chat panel resizes to fit viewport width; button stays reachable |

---

## 1. Home Page (`/`)

| # | Action | Expected |
|---|--------|----------|
| 1 | Navigate to `/` | Hero section renders with "Create Legal Agreements in Minutes" headline |
| 2 | Click "Start Building" button | Navigates to `/builder` |
| 3 | Click "View Dashboard" button | Navigates to `/dashboard` |
| 4 | Scroll down | Features section, FAQ, and Contact sections are visible |
| 5 | Resize to mobile (< 768 px) | Hamburger menu appears; nav links hidden |
| 6 | Click hamburger | Mobile nav slides open |
| 7 | Fill in Contact form — all fields — and submit | Success message appears; form is cleared |
| 8 | Submit Contact form with empty fields | Browser validation prevents submission |

---

## 2. Builder — Step 1 (`/builder`)

| # | Action | Expected |
|---|--------|----------|
| 1 | Navigate to `/builder` | 4 type cards visible; state dropdown shows "Select a state…" placeholder |
| 2 | Click "Mutual NDA" card | Card becomes highlighted/selected; Next button still disabled (no state) |
| 3 | Select "California" in dropdown | State is selected |
| 4 | Click "Next" | Advances to Step 2 |
| 5 | Leave type unselected, pick a state, click "Next" | Button remains disabled |
| 6 | Pick all 4 types one by one | Each card highlights on click; previously selected card unhighlights |
| 7 | Tab through all cards and press Space/Enter | Keyboard-accessible selection works |

---

## 3. Builder — Step 2 (Details Form)

| # | Action | Expected |
|---|--------|----------|
| 1 | Navigate via Step 1 (NDA + CA) | "Mutual Non-Disclosure Agreement Details" heading shown; state badge shows California |
| 2 | Submit form without filling required fields | HTML5 validation blocks submission |
| 3 | Enter `0` in Confidentiality Period field | Field rejects 0 due to min="1" |
| 4 | Enter negative number in a number field | Field rejects it due to min="1" |
| 5 | Fill all fields and click "Preview" | Advances to Step 3 |
| 6 | Click "Back" | Returns to Step 1 with prior type + state still selected |
| 7 | Change type to Employment in Step 1, return to Step 2 | Form is completely reset (no stale values from NDA) |
| 8 | Repeat for Freelance and Lease types | Each shows its own correct set of fields |

---

## 4. Builder — Step 3 (Preview & Download)

| # | Action | Expected |
|---|--------|----------|
| 1 | Complete Steps 1+2 for NDA | Step 3 shows "Your Agreement is Ready"; preview pane contains full agreement text |
| 2 | Check agreement text | Contains both party names, state name, purpose, and duration |
| 3 | Click "Copy to Clipboard" | Toast notification "Copied to clipboard!" appears briefly |
| 4 | Paste in text editor | Agreement text matches the preview |
| 5 | Click "Download PDF" | Browser downloads a `.pdf` file (NOT `.txt`) |
| 6 | Open the downloaded PDF | File opens correctly; text is readable; separator lines are visible (ASCII dashes) |
| 7 | Click "Edit Details" | Returns to Step 2 with previously entered values still populated |
| 8 | Click "Start Over" | Returns to Step 1 completely reset |
| 9 | Check agreement was saved | Navigate to `/dashboard`; new agreement appears in table |

---

## 5. Dashboard (`/dashboard`)

| # | Action | Expected |
|---|--------|----------|
| 1 | Navigate to `/dashboard` with no history | "No agreements yet." empty state shown; stat cards show 0 |
| 2 | Create an NDA via the builder, return to dashboard | Agreement row appears in table with correct type badge, state, parties, and date |
| 3 | Create agreements of 3 different types | Stats update: Total count, States Covered, Most Used Type |
| 4 | Filter by type "NDA" | Only NDA rows shown |
| 5 | Filter by type "Employment" | Only Employment rows shown |
| 6 | Select a state in the state filter | Only rows for that state shown |
| 7 | Combine type + state filter | Correct intersection shown |
| 8 | Click "View →" on any row | Modal opens showing full agreement text with type/state in header |
| 9 | Click "Copy" in modal | Toast appears; clipboard contains agreement text |
| 10 | Click "Download" in modal | PDF downloads with correct name and content |
| 11 | Click × in modal | Modal closes |
| 12 | Click the overlay outside the modal | Modal closes |
| 13 | Click "Clear History" | Confirm dialog appears |
| 14 | Confirm clear | All rows removed; stat cards reset to 0; localStorage cleared |
| 15 | Cancel clear | Nothing changes |
| 16 | Click hamburger (mobile) | Sidebar slides open |
| 17 | Click "New Agreement" | Navigates to `/builder` |

---

## 6. Cross-Cutting Concerns

| # | Scenario | Expected |
|---|----------|----------|
| 1 | Open app in private/incognito window | Works correctly; localStorage starts empty |
| 2 | Create 10+ agreements | All stored; dashboard shows all rows without crash |
| 3 | Create agreements in different states | State filter populates dynamically with the exact states used |
| 4 | Refresh dashboard page | Agreements persist (loaded from localStorage on mount) |
| 5 | Navigate via Next.js client-side routing | No full-page reload; navigation feels instant |
| 6 | Resize to various widths (320 px, 768 px, 1280 px) | Layout adapts; no horizontal scroll; text remains readable |
| 7 | Run `npm run build` | Build completes with 0 errors; no TypeScript errors |
| 8 | Check browser console on each page | No unhandled errors or warnings |

---

## PDF Quality Checklist

- [ ] File has `.pdf` extension (not `.txt`)
- [ ] File opens in any PDF viewer
- [ ] Page margins are correct (not clipped)
- [ ] Long lines wrap (do not overflow page)
- [ ] Separator lines are visible (ASCII dashes, not blank)
- [ ] All party names, dates, and amounts are present
- [ ] State-specific provision text is included
- [ ] Disclaimer text is present at bottom

---

## Agreement Type Matrix

Verify each combination produces a valid agreement:

| Type | CA | TX | NY | FL |
|------|----|----|----|----|
| NDA | ☐ | ☐ | ☐ | ☐ |
| Employment | ☐ | ☐ | ☐ | ☐ |
| Freelance | ☐ | ☐ | ☐ | ☐ |
| Lease | ☐ | ☐ | ☐ | ☐ |
