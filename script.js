(function () {
    'use strict';

    // Scroll progress bar
    window.addEventListener('scroll', () => {
        const bar = document.getElementById('scrollProgress');
        const total = document.documentElement.scrollHeight - window.innerHeight;
        if (bar && total > 0) {
            bar.style.width = (window.scrollY / total * 100) + '%';
        }
    });

    // Header scroll state
    const header = document.getElementById('mainHeader');
    window.addEventListener('scroll', () => {
        if (header) header.classList.toggle('scrolled', window.scrollY > 60);
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // Scroll reveal
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -80px 0px'
    });

    document.querySelectorAll('.reveal-up').forEach(el => revealObserver.observe(el));

    // Rating circles pop-in animation
    const ratingObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const circles = entry.target.querySelectorAll('.circle.filled');
                circles.forEach((c, i) => {
                    setTimeout(() => c.classList.add('pop'), i * 80);
                });
                ratingObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    const ratingsEl = document.querySelector('.skill-ratings');
    if (ratingsEl) ratingObserver.observe(ratingsEl);

    // Magnetic button effect
    document.querySelectorAll('[data-magnetic]').forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
        });

        btn.addEventListener('mouseleave', () => {
            btn.style.transform = '';
            btn.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
            setTimeout(() => { btn.style.transition = ''; }, 500);
        });
    });

    // Contact form
    const form = document.getElementById('contactForm');
    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            alert('Bedankt voor je bericht! Ik neem zo snel mogelijk contact met je op.');
            this.reset();
        });
    }

    // Mobile nav
    const nav = document.querySelector('header nav');
    const navToggle = document.querySelector('.nav-toggle');

    function closeNav() {
        if (!nav) return;
        nav.classList.remove('nav-open');
        if (navToggle) {
            navToggle.setAttribute('aria-expanded', 'false');
            navToggle.setAttribute('aria-label', 'Open menu');
        }
    }

    function toggleNav() {
        if (!nav || !navToggle) return;
        const isOpen = nav.classList.toggle('nav-open');
        navToggle.setAttribute('aria-expanded', String(isOpen));
        navToggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
    }

    if (navToggle) {
        navToggle.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleNav();
        });
    }

    document.querySelectorAll('#primaryNav a').forEach(link => {
        link.addEventListener('click', () => closeNav());
    });

    document.addEventListener('click', (e) => {
        if (!nav || !nav.classList.contains('nav-open')) return;
        if (nav.contains(e.target)) return;
        closeNav();
    });

    window.addEventListener('resize', () => {
        if (window.matchMedia('(min-width: 769px)').matches) closeNav();
    });

    // Parallax on scroll
    const bigNumber = document.querySelector('.hero-big-number');
    const heroGrid = document.querySelector('.hero-grid-overlay');

    window.addEventListener('scroll', () => {
        const y = window.scrollY;
        if (bigNumber && y < window.innerHeight) {
            bigNumber.style.transform = `translateY(${y * -0.15}px)`;
        }
        if (heroGrid && y < window.innerHeight) {
            heroGrid.style.transform = `translateY(${y * 0.08}px)`;
        }
    });

    // ── Scroll Velocity Marquee ──
    const marqueeTrack = document.querySelector('.marquee-track');
    if (marqueeTrack) {
        let xPos = 0;
        let velocity = -0.4;
        const baseSpeed = -0.4;
        let lastScrollY = window.scrollY;
        let halfWidth = marqueeTrack.scrollWidth / 2;

        window.addEventListener('resize', () => {
            halfWidth = marqueeTrack.scrollWidth / 2;
        });

        window.addEventListener('scroll', () => {
            const delta = window.scrollY - lastScrollY;
            velocity += delta * -0.2;
            lastScrollY = window.scrollY;
        }, { passive: true });

        function tickMarquee() {
            velocity += (baseSpeed - velocity) * 0.05;
            xPos += velocity;

            if (xPos <= -halfWidth) xPos += halfWidth;
            if (xPos > 0) xPos -= halfWidth;

            marqueeTrack.style.transform = `translate3d(${xPos}px, 0, 0)`;
            requestAnimationFrame(tickMarquee);
        }

        tickMarquee();
    }

    // ── Spotlight Card Effect ──
    const isTouchDevice = window.matchMedia('(hover: none)').matches;
    if (!isTouchDevice) {
        document.querySelectorAll('.project-item').forEach(item => {
            const overlay = document.createElement('div');
            overlay.className = 'spotlight-overlay';
            item.insertBefore(overlay, item.firstChild);

            item.addEventListener('mousemove', (e) => {
                const rect = item.getBoundingClientRect();
                item.style.setProperty('--spot-x', (e.clientX - rect.left) + 'px');
                item.style.setProperty('--spot-y', (e.clientY - rect.top) + 'px');
            });
        });
    }

})();
