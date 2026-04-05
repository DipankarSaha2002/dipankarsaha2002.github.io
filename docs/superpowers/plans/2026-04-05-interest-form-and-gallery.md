# Interest Form & Photo Gallery Carousel — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a center-focus photo gallery carousel and a Google Forms-backed interest capture form to the Nivedita Vocal Academy site.

**Architecture:** Two independent features added to the existing single-page static site. Gallery is a new section (HTML + CSS + JS carousel logic in existing files). Form is inserted into the existing Contact section with custom styling and client-side validation, submitting to a Google Forms endpoint via hidden iframe.

**Tech Stack:** Vanilla HTML, CSS (Tailwind v4 + custom classes), vanilla JS. No new dependencies.

---

## File Map

| File | Role | Changes |
|------|------|---------|
| `index.html` | Site content | Add Gallery nav links (desktop + mobile), Gallery section HTML, interest form HTML inside Contact section, hidden iframe for form submission |
| `style.css` | Styles | Add gallery carousel classes, form/input/pill classes |
| `main.js` | Interactivity | Add carousel logic (slides, auto-advance, swipe), form validation + submission logic |

---

## Task 1: Add Gallery Section HTML & Nav Links

**Files:**
- Modify: `index.html:59-62` (desktop nav)
- Modify: `index.html:83-91` (mobile nav)
- Modify: `index.html:297-301` (insert gallery section between Classes end and Contact start)

- [ ] **Step 1: Add "Gallery" link to desktop nav**

In `index.html`, inside the desktop nav `<div class="hidden md:flex items-center gap-10">`, add a Gallery link between Classes and Contact:

```html
<a href="#about" class="nav-link link-underline">About</a>
<a href="#classes" class="nav-link link-underline">Classes</a>
<a href="#gallery" class="nav-link link-underline">Gallery</a>
<a href="#contact" class="nav-link link-underline">Contact</a>
```

- [ ] **Step 2: Add "Gallery" link to mobile nav**

In `index.html`, inside `<div id="mobile-menu">`, add Gallery link between Classes and Contact:

```html
<a href="#about" class="block nav-link">About</a>
<a href="#classes" class="block nav-link">Classes</a>
<a href="#gallery" class="block nav-link">Gallery</a>
<a href="#contact" class="block nav-link">Contact</a>
```

- [ ] **Step 3: Add Gallery section HTML**

Insert this between the closing `</section>` of Classes (line 297) and the `<!-- ============ CONTACT ============ -->` comment. Add an `<hr>` before it:

```html
<hr class="hr-warm max-w-6xl mx-auto">


<!-- ============ GALLERY ============ -->
<section id="gallery" class="py-20 md:py-28">
    <div class="max-w-6xl mx-auto px-6 lg:px-8">

        <!-- Section label -->
        <div class="reveal mb-6">
            <p class="ornament ornament-left text-warm-muted text-xs font-semibold tracking-[0.2em] uppercase max-w-xs">
                Gallery
            </p>
        </div>

        <div class="reveal mb-16 max-w-2xl">
            <h2 class="heading-display text-4xl md:text-5xl mb-5">
                Moments from the<br>
                <span class="heading-italic">Academy</span>
            </h2>
            <p class="text-warm-muted text-lg leading-relaxed">
                Performances, practice sessions, and celebrations.
            </p>
        </div>

        <!-- Carousel -->
        <div class="reveal gallery-carousel" aria-label="Photo gallery" aria-roledescription="carousel">
            <div class="gallery-track" aria-live="polite">
                <div class="gallery-slide" data-index="0">
                    <img src="https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=800&h=533&fit=crop"
                         alt="Academy performance" class="img-warm" loading="lazy">
                </div>
                <div class="gallery-slide" data-index="1">
                    <img src="https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=800&h=533&fit=crop"
                         alt="Music practice session" class="img-warm" loading="lazy">
                </div>
                <div class="gallery-slide" data-index="2">
                    <img src="https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=533&fit=crop"
                         alt="Stage performance" class="img-warm" loading="lazy">
                </div>
                <div class="gallery-slide" data-index="3">
                    <img src="https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800&h=533&fit=crop"
                         alt="Musical instruments" class="img-warm" loading="lazy">
                </div>
                <div class="gallery-slide" data-index="4">
                    <img src="https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?w=800&h=533&fit=crop"
                         alt="Academy celebration" class="img-warm" loading="lazy">
                </div>
            </div>

            <!-- Arrows (desktop only) -->
            <button class="gallery-arrow gallery-arrow-prev hidden md:flex" aria-label="Previous photo">
                <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
            </button>
            <button class="gallery-arrow gallery-arrow-next hidden md:flex" aria-label="Next photo">
                <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
            </button>

            <!-- Dot indicators -->
            <div class="gallery-dots">
                <button class="gallery-dot active" aria-label="Go to photo 1" data-index="0"></button>
                <button class="gallery-dot" aria-label="Go to photo 2" data-index="1"></button>
                <button class="gallery-dot" aria-label="Go to photo 3" data-index="2"></button>
                <button class="gallery-dot" aria-label="Go to photo 4" data-index="3"></button>
                <button class="gallery-dot" aria-label="Go to photo 5" data-index="4"></button>
            </div>
        </div>

    </div>
</section>
```

- [ ] **Step 4: Verify the page loads without errors**

Run: `npm run dev`
Open the site in a browser and confirm the Gallery section appears (unstyled) between Classes and Contact. Nav links should scroll to the new section.

- [ ] **Step 5: Commit**

```bash
git add index.html
git commit -m "feat: add gallery section HTML and nav links"
```

---

## Task 2: Add Gallery Carousel CSS

**Files:**
- Modify: `style.css` (append after existing styles, before the `@media` block at the end)

- [ ] **Step 1: Add gallery carousel styles**

Insert the following before the `/* ---- Responsive ---- */` media query at the end of `style.css`:

```css
/* ---- Gallery carousel ---- */
.gallery-carousel {
    position: relative;
    overflow: hidden;
    padding: 0 60px;
}

@media (max-width: 768px) {
    .gallery-carousel {
        padding: 0;
    }
}

.gallery-track {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    position: relative;
    min-height: 350px;
}

@media (max-width: 768px) {
    .gallery-track {
        min-height: 250px;
    }
}

.gallery-slide {
    position: absolute;
    transition: transform 0.5s cubic-bezier(0.22, 1, 0.36, 1),
                opacity 0.5s cubic-bezier(0.22, 1, 0.36, 1),
                box-shadow 0.5s ease;
    opacity: 0;
    transform: scale(0.85);
    width: 55%;
    max-width: 600px;
    pointer-events: none;
}

@media (max-width: 768px) {
    .gallery-slide {
        width: 85%;
    }
}

.gallery-slide img {
    width: 100%;
    aspect-ratio: 3 / 2;
    object-fit: cover;
    display: block;
}

.gallery-slide.active {
    opacity: 1;
    transform: scale(1);
    z-index: 2;
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
    pointer-events: auto;
}

.gallery-slide.prev,
.gallery-slide.next {
    opacity: 0.5;
    transform: scale(0.85);
    z-index: 1;
    pointer-events: auto;
    cursor: pointer;
}

.gallery-slide.prev {
    transform: scale(0.85) translateX(-75%);
}

.gallery-slide.next {
    transform: scale(0.85) translateX(75%);
}

@media (max-width: 768px) {
    .gallery-slide.prev,
    .gallery-slide.next {
        opacity: 0;
        pointer-events: none;
    }
}

/* Gallery arrows */
.gallery-arrow {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: 3;
    width: 44px;
    height: 44px;
    border-radius: 50%;
    border: 1px solid var(--color-border-warm);
    background: white;
    color: var(--color-warm-brown);
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: border-color 0.3s ease, color 0.3s ease;
}

.gallery-arrow:hover {
    border-color: var(--color-terracotta);
    color: var(--color-terracotta);
}

.gallery-arrow-prev {
    left: 0;
}

.gallery-arrow-next {
    right: 0;
}

/* Gallery dots */
.gallery-dots {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
    margin-top: 2rem;
}

.gallery-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    border: none;
    background: var(--color-sand);
    cursor: pointer;
    transition: width 0.3s ease, background-color 0.3s ease, border-radius 0.3s ease;
    padding: 0;
}

.gallery-dot.active {
    width: 24px;
    border-radius: 12px;
    background: var(--color-terracotta);
}
```

- [ ] **Step 2: Verify the carousel looks correct**

Run: `npm run dev`
Open the site. The gallery section should now show a center-focus layout with the first image active and adjacent images dimmed on sides (desktop). On mobile viewport, only one image should show.

- [ ] **Step 3: Commit**

```bash
git add style.css
git commit -m "feat: add gallery carousel CSS styles"
```

---

## Task 3: Add Gallery Carousel JS

**Files:**
- Modify: `main.js` (add carousel logic inside the existing `DOMContentLoaded` listener)

- [ ] **Step 1: Add carousel initialization and slide logic**

Append the following inside the `DOMContentLoaded` callback in `main.js`, after the scroll-reveal observer code:

```js
// ---- Gallery carousel ----
const carousel = document.querySelector('.gallery-carousel');
if (carousel) {
    const slides = carousel.querySelectorAll('.gallery-slide');
    const dots = carousel.querySelectorAll('.gallery-dot');
    const prevBtn = carousel.querySelector('.gallery-arrow-prev');
    const nextBtn = carousel.querySelector('.gallery-arrow-next');
    const total = slides.length;
    let current = 0;
    let autoAdvanceTimer = null;

    function updateSlides() {
        const prevIndex = (current - 1 + total) % total;
        const nextIndex = (current + 1) % total;

        slides.forEach((slide, i) => {
            slide.classList.remove('active', 'prev', 'next');
            if (i === current) {
                slide.classList.add('active');
            } else if (i === prevIndex) {
                slide.classList.add('prev');
            } else if (i === nextIndex) {
                slide.classList.add('next');
            }
        });

        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === current);
        });
    }

    function goToSlide(index) {
        current = (index + total) % total;
        updateSlides();
    }

    function nextSlide() {
        goToSlide(current + 1);
    }

    function prevSlide() {
        goToSlide(current - 1);
    }

    // Arrow buttons
    if (prevBtn) prevBtn.addEventListener('click', () => { prevSlide(); resetAutoAdvance(); });
    if (nextBtn) nextBtn.addEventListener('click', () => { nextSlide(); resetAutoAdvance(); });

    // Click adjacent slides to navigate
    slides.forEach(slide => {
        slide.addEventListener('click', () => {
            if (slide.classList.contains('prev')) { prevSlide(); resetAutoAdvance(); }
            if (slide.classList.contains('next')) { nextSlide(); resetAutoAdvance(); }
        });
    });

    // Dot navigation
    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            goToSlide(parseInt(dot.dataset.index, 10));
            resetAutoAdvance();
        });
    });

    // Auto-advance
    function startAutoAdvance() {
        autoAdvanceTimer = setInterval(nextSlide, 5000);
    }

    function stopAutoAdvance() {
        clearInterval(autoAdvanceTimer);
    }

    function resetAutoAdvance() {
        stopAutoAdvance();
        startAutoAdvance();
    }

    carousel.addEventListener('mouseenter', stopAutoAdvance);
    carousel.addEventListener('mouseleave', startAutoAdvance);

    // Touch swipe support
    let touchStartX = 0;
    let touchEndX = 0;

    carousel.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
        stopAutoAdvance();
    }, { passive: true });

    carousel.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        const diff = touchStartX - touchEndX;
        if (Math.abs(diff) > 50) {
            if (diff > 0) nextSlide();
            else prevSlide();
        }
        startAutoAdvance();
    }, { passive: true });

    // Initialize
    updateSlides();
    startAutoAdvance();
}
```

- [ ] **Step 2: Verify the carousel works**

Run: `npm run dev`
Test in browser:
- Click left/right arrows — slides should transition smoothly
- Click dots — should jump to that slide
- Click adjacent images — should navigate
- Wait 5 seconds — should auto-advance
- Hover over carousel — auto-advance should pause
- Resize to mobile — arrows should hide, swipe should work

- [ ] **Step 3: Commit**

```bash
git add main.js
git commit -m "feat: add gallery carousel JS logic with auto-advance and swipe"
```

---

## Task 4: Add Interest Form HTML

**Files:**
- Modify: `index.html:301-370` (Contact section)

- [ ] **Step 1: Add hidden iframe for form submission**

Add this just before the closing `</body>` tag in `index.html` (before the `<script>` tag):

```html
<!-- Hidden iframe for Google Forms submission -->
<iframe name="hidden_iframe" id="hidden_iframe" style="display:none;"></iframe>
```

- [ ] **Step 2: Insert the interest form into the Contact section**

In the Contact section's left column (`lg:col-span-5`), insert the form card between the existing intro `<div class="reveal">` block (ending at line ~318) and the contact details `<div class="reveal reveal-delay-1 space-y-6 mb-10">` block. Replace the existing structure so the left column contains: intro → form → contact details → WhatsApp button.

Insert this block after the closing `</div>` of the intro reveal (after "Reach out for trial classes...") and before the `<div class="reveal reveal-delay-1 space-y-6 mb-10">`:

```html
<!-- Interest Form -->
<div class="reveal reveal-delay-1">
    <!--
        GOOGLE FORMS SETUP:
        1. Create a Google Form with 3 fields: Name, Mobile Number, Interested In
        2. Replace FORM_ID below with your form's ID
        3. Replace entry.XXXXXX values with your form's entry IDs
           (View form page source to find them)
        4. In Google Forms: Responses tab > ⋮ menu > "Get email notifications for new responses"
    -->
    <form id="interest-form" class="form-card mb-8"
          action="https://docs.google.com/forms/d/e/FORM_ID/formResponse"
          method="POST" target="hidden_iframe">

        <h3 class="font-display text-xl md:text-2xl font-semibold text-white mb-5">
            Register Your Interest
        </h3>

        <!-- Name -->
        <div class="mb-4">
            <label for="form-name" class="form-label">Name</label>
            <input type="text" id="form-name" name="entry.XXXXXX"
                   class="form-input" placeholder="Your full name"
                   aria-required="true">
            <p class="form-error hidden" id="name-error" role="alert">Please enter your name</p>
        </div>

        <!-- Mobile -->
        <div class="mb-4">
            <label for="form-mobile" class="form-label">Mobile Number</label>
            <input type="tel" id="form-mobile" name="entry.XXXXXX"
                   class="form-input" placeholder="+91 XXXXX XXXXX"
                   aria-required="true">
            <p class="form-error hidden" id="mobile-error" role="alert">Please enter a valid mobile number</p>
        </div>

        <!-- Interest Type -->
        <div class="mb-5">
            <p class="form-label mb-2">Interested In</p>
            <div class="flex flex-wrap gap-2" id="interest-pills" role="group" aria-label="Select your interests">
                <button type="button" class="interest-pill" role="checkbox" aria-checked="false" data-value="Classical">Classical</button>
                <button type="button" class="interest-pill" role="checkbox" aria-checked="false" data-value="Ghazal">Ghazal</button>
                <button type="button" class="interest-pill" role="checkbox" aria-checked="false" data-value="Bollywood">Bollywood</button>
                <button type="button" class="interest-pill" role="checkbox" aria-checked="false" data-value="Bhajan">Bhajan</button>
                <button type="button" class="interest-pill" role="checkbox" aria-checked="false" data-value="Harmonium">Harmonium</button>
            </div>
            <!-- Hidden input to hold comma-separated interests for Google Forms -->
            <input type="hidden" id="form-interests" name="entry.XXXXXX">
            <p class="form-error hidden" id="interest-error" role="alert">Please select at least one interest</p>
        </div>

        <!-- Submit -->
        <button type="submit" class="btn-form-submit w-full">
            Submit Interest
        </button>
    </form>

    <!-- Success message (hidden by default) -->
    <div id="form-success" class="form-success hidden mb-8">
        <svg class="w-8 h-8 text-gold-light mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h3 class="font-display text-xl font-semibold text-white mb-2">Thank You!</h3>
        <p class="text-white/60 text-sm">We'll reach out to you soon about your musical journey.</p>
    </div>
</div>
```

- [ ] **Step 3: Update the reveal-delay classes on subsequent elements**

Since the form now uses `reveal-delay-1`, update the contact details block to `reveal-delay-2` and the WhatsApp button block to `reveal-delay-3`:

Change:
```html
<div class="reveal reveal-delay-1 space-y-6 mb-10">
```
to:
```html
<div class="reveal reveal-delay-2 space-y-6 mb-10">
```

Change:
```html
<div class="reveal reveal-delay-2">
    <a href="https://wa.me/...
```
to:
```html
<div class="reveal reveal-delay-3">
    <a href="https://wa.me/...
```

- [ ] **Step 4: Verify the form appears in the Contact section**

Run: `npm run dev`
Open the site, scroll to Contact. The form card should appear (unstyled inputs) between the intro text and the phone/address details.

- [ ] **Step 5: Commit**

```bash
git add index.html
git commit -m "feat: add interest form HTML in contact section"
```

---

## Task 5: Add Interest Form CSS

**Files:**
- Modify: `style.css` (append after gallery styles, before the `@media` responsive block)

- [ ] **Step 1: Add form styles**

Insert the following CSS after the gallery styles and before the `/* ---- Responsive ---- */` media query:

```css
/* ---- Interest form ---- */
.form-card {
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    padding: 1.5rem;
}

.form-label {
    display: block;
    font-family: var(--font-body);
    font-size: 0.6875rem;
    font-weight: 600;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: rgba(255, 255, 255, 0.5);
    margin-bottom: 0.375rem;
}

.form-input {
    width: 100%;
    padding: 0.625rem 0.75rem;
    font-family: var(--font-body);
    font-size: 0.875rem;
    color: rgba(255, 255, 255, 0.9);
    background: rgba(255, 255, 255, 0.08);
    border: 1px solid rgba(255, 255, 255, 0.15);
    outline: none;
    transition: border-color 0.3s ease;
}

.form-input::placeholder {
    color: rgba(255, 255, 255, 0.3);
}

.form-input:focus {
    border-color: var(--color-terracotta);
}

.interest-pill {
    padding: 0.375rem 1rem;
    font-family: var(--font-body);
    font-size: 0.6875rem;
    font-weight: 600;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    border: 1px solid rgba(255, 255, 255, 0.2);
    color: rgba(255, 255, 255, 0.6);
    background: transparent;
    cursor: pointer;
    transition: border-color 0.3s ease, color 0.3s ease, background-color 0.3s ease;
}

.interest-pill:hover {
    border-color: rgba(255, 255, 255, 0.4);
    color: rgba(255, 255, 255, 0.8);
}

.interest-pill.selected {
    border-color: var(--color-terracotta);
    background: rgba(193, 93, 62, 0.2);
    color: var(--color-terracotta-light);
}

.btn-form-submit {
    display: block;
    padding: 0.875rem 2rem;
    font-family: var(--font-body);
    font-size: 0.8125rem;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: #fff;
    background-color: var(--color-terracotta);
    border: none;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.2s ease;
}

.btn-form-submit:hover {
    background-color: var(--color-terracotta-dark);
    transform: translateY(-1px);
}

.form-error {
    font-size: 0.75rem;
    color: #ef4444;
    margin-top: 0.25rem;
}

.form-success {
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    padding: 2rem 1.5rem;
    text-align: center;
}
```

- [ ] **Step 2: Verify form styling**

Run: `npm run dev`
Open the site, scroll to Contact. The form should now have:
- Semi-transparent card background
- Styled inputs with placeholders
- Interest pills in a row
- Terracotta submit button

- [ ] **Step 3: Commit**

```bash
git add style.css
git commit -m "feat: add interest form CSS styles"
```

---

## Task 6: Add Interest Form JS

**Files:**
- Modify: `main.js` (add form logic inside the existing `DOMContentLoaded` listener, after carousel code)

- [ ] **Step 1: Add form interaction and validation logic**

Append the following inside the `DOMContentLoaded` callback in `main.js`, after the gallery carousel code:

```js
// ---- Interest form ----
const interestForm = document.getElementById('interest-form');
if (interestForm) {
    const pills = interestForm.querySelectorAll('.interest-pill');
    const hiddenInterests = document.getElementById('form-interests');
    const nameInput = document.getElementById('form-name');
    const mobileInput = document.getElementById('form-mobile');
    const nameError = document.getElementById('name-error');
    const mobileError = document.getElementById('mobile-error');
    const interestError = document.getElementById('interest-error');
    const formSuccess = document.getElementById('form-success');

    // Toggle interest pills
    pills.forEach(pill => {
        pill.addEventListener('click', () => {
            pill.classList.toggle('selected');
            const isSelected = pill.classList.contains('selected');
            pill.setAttribute('aria-checked', isSelected);

            // Update hidden input with comma-separated values
            const selected = Array.from(pills)
                .filter(p => p.classList.contains('selected'))
                .map(p => p.dataset.value);
            hiddenInterests.value = selected.join(', ');
        });
    });

    // Validation
    function validateForm() {
        let valid = true;

        // Name
        if (!nameInput.value.trim()) {
            nameError.classList.remove('hidden');
            nameInput.setAttribute('aria-describedby', 'name-error');
            valid = false;
        } else {
            nameError.classList.add('hidden');
            nameInput.removeAttribute('aria-describedby');
        }

        // Mobile — at least 10 digits
        const digits = mobileInput.value.replace(/\D/g, '');
        if (digits.length < 10) {
            mobileError.classList.remove('hidden');
            mobileInput.setAttribute('aria-describedby', 'mobile-error');
            valid = false;
        } else {
            mobileError.classList.add('hidden');
            mobileInput.removeAttribute('aria-describedby');
        }

        // Interest — at least one selected
        const selectedPills = interestForm.querySelectorAll('.interest-pill.selected');
        if (selectedPills.length === 0) {
            interestError.classList.remove('hidden');
            valid = false;
        } else {
            interestError.classList.add('hidden');
        }

        return valid;
    }

    // Submit handler
    interestForm.addEventListener('submit', (e) => {
        if (!validateForm()) {
            e.preventDefault();
            return;
        }

        // Form submits to Google Forms via hidden iframe (target="hidden_iframe")
        // Show success message after a short delay
        setTimeout(() => {
            interestForm.classList.add('hidden');
            formSuccess.classList.remove('hidden');
        }, 500);
    });

    // Clear errors on input
    nameInput.addEventListener('input', () => nameError.classList.add('hidden'));
    mobileInput.addEventListener('input', () => mobileError.classList.add('hidden'));
}
```

- [ ] **Step 2: Verify form functionality**

Run: `npm run dev`
Test in browser:
- Click interest pills — should toggle terracotta highlight on/off
- Submit with empty fields — should show red error messages
- Fill all fields + select an interest — should submit and show "Thank You!" message
- Form should not cause page navigation (submits to hidden iframe)

- [ ] **Step 3: Commit**

```bash
git add main.js
git commit -m "feat: add interest form JS with validation and submission"
```

---

## Task 7: Final Verification & Production Build

**Files:** None (verification only)

- [ ] **Step 1: Run production build**

Run: `npm run build`
Expected: Build completes successfully with no errors.

- [ ] **Step 2: Preview production build**

Run: `npm run preview`
Open the preview URL and verify:
- Gallery section appears with carousel working (arrows, dots, auto-advance, swipe)
- Interest form appears in Contact section with pills, validation, and submission
- Gallery nav link works in both desktop and mobile menus
- Mobile responsive layout is correct for both features
- No console errors

- [ ] **Step 3: Commit any final fixes if needed**

```bash
git add -A
git commit -m "fix: final adjustments for gallery and form"
```

Only create this commit if there were fixes needed. Skip if everything passed.
