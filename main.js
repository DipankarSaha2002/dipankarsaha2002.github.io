document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu toggle
    const btn = document.getElementById('mobile-menu-btn');
    const menu = document.getElementById('mobile-menu');

    btn.addEventListener('click', () => {
        const isExpanded = btn.getAttribute('aria-expanded') === 'true';
        btn.setAttribute('aria-expanded', !isExpanded);
        menu.classList.toggle('hidden');
    });

    // Close mobile menu when clicking a link
    menu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            menu.classList.add('hidden');
            btn.setAttribute('aria-expanded', 'false');
        });
    });

    // Navbar border on scroll
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 10) {
            navbar.style.borderBottom = '1px solid rgba(221, 213, 203, 0.5)';
        } else {
            navbar.style.borderBottom = '1px solid transparent';
        }
    }, { passive: true });

    // Scroll-triggered reveal animations
    const reveals = document.querySelectorAll('.reveal');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -40px 0px'
    });

    reveals.forEach(el => observer.observe(el));

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
});
