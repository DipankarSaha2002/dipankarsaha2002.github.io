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
});
