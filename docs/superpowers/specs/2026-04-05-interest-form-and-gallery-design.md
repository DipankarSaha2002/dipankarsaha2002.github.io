# Interest Form & Photo Gallery Carousel — Design Spec

## Overview

Add two new features to the Nivedita Vocal Academy single-page site:

1. **Photo Gallery Carousel** — center-focus carousel between Classes and Contact sections
2. **Interest Capture Form** — custom-styled form inside the Contact section, submitting to Google Forms

No new dependencies. Pure vanilla HTML/CSS/JS, consistent with the existing stack.

---

## 1. Photo Gallery Carousel

### Placement

- New section between the Classes section and the Contact section
- Preceded by `<hr class="hr-warm">` divider (matching existing pattern)
- Section ID: `#gallery`

### Section Header

- Ornament label: "Gallery" (same style as About/Classes section labels)
- Heading: `Moments from the Academy` with italic "Academy" in terracotta
- Subtitle: "Performances, practice sessions, and celebrations"

### Carousel Design — Center-Focus

**Desktop (md+):**
- Active image: large (max ~600px wide), full opacity, subtle box shadow (`0 8px 30px rgba(0,0,0,0.12)`)
- Adjacent images: visible on both sides, scaled to ~85%, dimmed to 50% opacity
- Circular prev/next arrow buttons on left and right edges, styled with `border-warm` border on white background
- Dot indicators below: inactive = small circle in `sand` color, active = pill-shaped (wider) in `terracotta`

**Mobile (<md):**
- Single image view, full width with padding
- Prev/next arrows hidden
- Dot indicators remain
- Touch swipe support (track touchstart/touchmove/touchend for left/right swipe)

### Behavior

- **Transitions:** CSS `transform` + `opacity` transitions (~0.5s ease) for smooth sliding
- **Auto-advance:** Every 5 seconds, pauses on hover (desktop) and touch (mobile)
- **Infinite loop:** Wraps from last to first and vice versa
- **Scroll reveal:** Section entry uses existing `.reveal` animation system

### Image Treatment

- Apply existing `img-warm` class (sepia 0.08, saturate 1.05, brightness 1.02)
- Aspect ratio: landscape (~3:2) for all images
- `loading="lazy"` on all images

### Images

- Use placeholder Unsplash images initially (music/performance themed)
- Images stored as files in project root or an `images/gallery/` directory
- Easy to swap — just replace image files and update `src` attributes in HTML

### CSS

- New classes in `style.css`: `.gallery-carousel`, `.gallery-slide`, `.gallery-slide.active`, `.gallery-slide.adjacent`, `.gallery-dot`, `.gallery-dot.active`, `.gallery-arrow`
- Responsive behavior via Tailwind breakpoint classes + custom CSS

### JS

- Carousel logic added to `main.js`:
  - Track current slide index
  - `nextSlide()` / `prevSlide()` functions
  - Auto-advance interval with pause-on-hover
  - Touch swipe detection for mobile
  - Update active/adjacent classes and dot indicators

---

## 2. Interest Capture Form

### Placement

- Inside the existing Contact section (`#contact`)
- In the left column (`lg:col-span-5`), inserted between the intro text ("Ready to Begin?") and the phone/address contact details
- Wrapped in a semi-transparent card container

### Form Container

- Background: `rgba(255, 255, 255, 0.05)`
- Border: `1px solid rgba(255, 255, 255, 0.1)`
- Padding: `1.5rem`
- Heading inside: "Register Your Interest" in `font-display` white

### Fields

1. **Name** (text input, required)
   - Label: "NAME" — uppercase, small, muted white
   - Placeholder: "Your full name"
   - Styled: semi-transparent dark input with subtle border

2. **Mobile Number** (tel input, required)
   - Label: "MOBILE NUMBER"
   - Placeholder: "+91 XXXXX XXXXX"
   - Same input styling

3. **Interested In** (multi-select toggle pills, at least one required)
   - Options: Classical, Ghazal, Bollywood, Bhajan, Harmonium
   - Default: all unselected (border + muted text)
   - Selected state: terracotta border, terracotta-tinted background, lighter terracotta text
   - Click toggles selection on/off
   - Multiple selections allowed
   - Submitted as comma-separated string to Google Forms

### Submit Button

- Full-width terracotta button: "SUBMIT INTEREST"
- Matches `.btn-primary` style but adapted for dark background context

### Validation

- Client-side, on submit:
  - Name: non-empty
  - Mobile: non-empty, basic format check (10+ digits)
  - Interest: at least one pill selected
- Error display: small red text below each field
- Prevent submission until valid

### Submission Mechanism

- Form `action` points to Google Forms response URL (`https://docs.google.com/forms/d/e/{FORM_ID}/formResponse`)
- Submit via hidden `<iframe>` target to avoid page redirect
- On successful post: replace form content with thank-you message: "Thank you! We'll reach out soon."
- Hidden iframe name: `hidden_iframe`, form `target="hidden_iframe"`

### Google Forms Setup (User Action Required)

The site owner needs to:
1. Create a Google Form with 3 fields: Name (Short answer), Mobile Number (Short answer), Interested In (Short answer)
2. Get the form's action URL and entry IDs (from form page source)
3. Provide these values to be wired into the HTML form's hidden attributes
4. Enable "Get email notifications for new responses" in Google Forms settings (Responses tab > three-dot menu)

The HTML will include placeholder `entry.XXXXXX` values with a comment explaining how to replace them.

### Form CSS

- New classes in `style.css`: `.form-card`, `.form-input`, `.form-label`, `.interest-pill`, `.interest-pill.selected`, `.form-error`, `.form-success`
- Input styles: transparent dark background, white text, subtle border, focus state with terracotta border

### Form JS

- Added to `main.js`:
  - Interest pill toggle click handlers
  - Form validation on submit
  - Hidden iframe submission
  - Success state swap after submit

---

## 3. Navigation Update

- Add "Gallery" link to both desktop and mobile nav menus, between "Classes" and "Contact"

---

## 4. Files Modified

| File | Changes |
|------|---------|
| `index.html` | Add Gallery section HTML, add form HTML inside Contact section, add Gallery nav link |
| `style.css` | Add gallery carousel styles, form card/input/pill styles |
| `main.js` | Add carousel logic (slide, auto-advance, swipe), form validation and submission logic |

No new files created (except placeholder gallery images if needed). No new dependencies.

---

## 5. Mobile Responsiveness

- Gallery: single-image view, swipe gestures, no arrows, dots remain
- Form: full-width within Contact section (which already stacks to single column on mobile)
- Interest pills: wrap naturally with `flex-wrap`

---

## 6. Accessibility

- Carousel: `aria-label` on carousel container, `aria-live="polite"` for slide changes, arrow buttons with `aria-label`
- Form: proper `<label>` elements linked to inputs, `aria-required` on required fields, error messages linked via `aria-describedby`
- Interest pills: `role="checkbox"` with `aria-checked` state
