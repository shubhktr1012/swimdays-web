// Import Motion One
import { animate, scroll, inView, stagger, spring } from "https://cdn.jsdelivr.net/npm/motion@10.16.2/+esm"

/**
 * Swimdays - Main JavaScript
 * Handles: Mobile menu, smooth scroll, Motion One animations
 */

// Wait for DOM
document.addEventListener('DOMContentLoaded', () => {
    initLenis();
    initMobileMenu();
    initSmoothScroll();
    initNavbarScroll();
    initMotionAnimations(); // New Motion One Logic
    initViewMore();
});

/**
 * Initialize Motion One Animations
 */
function initMotionAnimations() {
    // 1. Hero Animations
    // Title words stagger
    animate(".hero__title", { opacity: [0, 1], y: [50, 0] }, { duration: 1, easing: "ease-out" });
    animate(".hero__subtitle", { opacity: [0, 1], y: [30, 0] }, { delay: 0.3, duration: 1 });
    animate(".hero__cta", { opacity: [0, 1], scale: [0.9, 1] }, { delay: 0.6, duration: 0.5, easing: spring() });

    // 2. Section Titles Reveal (Fade Up)
    inView("h2", ({ target }) => {
        animate(target, { opacity: [0, 1], y: [40, 0] }, { duration: 0.8, easing: "ease-out" });
    }, { margin: "-100px" });

    // 3. Features Stagger
    inView(".features__container", ({ target }) => {
        animate(
            target.querySelectorAll(".feature"),
            { opacity: [0, 1], y: [30, 0] },
            { delay: stagger(0.1), duration: 0.6, easing: "ease-out" }
        );
    }, { margin: "-50px" });

    // 4. Catalog/Product Stagger
    inView(".catalog__grid", ({ target }) => {
        animate(
            target.querySelectorAll(".product-card"),
            { opacity: [0, 1], y: [50, 0] },
            { delay: stagger(0.1), duration: 0.8, easing: "ease-out" }
        );
    }, { margin: "-50px" });

    // 5. Button Hover Springs
    const buttons = document.querySelectorAll(".btn, .hero__cta, .newsletter__btn");
    buttons.forEach(btn => {
        btn.addEventListener("mouseenter", () => {
            animate(btn, { scale: 1.05 }, { easing: spring({ stiffness: 300, damping: 15 }) });
        });
        btn.addEventListener("mouseleave", () => {
            animate(btn, { scale: 1 }, { easing: spring({ stiffness: 300, damping: 15 }) });
        });
        btn.addEventListener("mousedown", () => {
            animate(btn, { scale: 0.95 }, { duration: 0.1 });
        });
        btn.addEventListener("mouseup", () => {
            animate(btn, { scale: 1.05 }, { duration: 0.1 });
        });
    });

    // 6. Instagram Stagger
    inView(".instagram__grid", ({ target }) => {
        animate(
            target.querySelectorAll(".instagram__item"),
            { opacity: [0, 1], scale: [0.9, 1] },
            { delay: stagger(0.05), duration: 0.5 }
        );
    });
}

/**
 * Initialize Lenis Smooth Scroll
 */
function initLenis() {
    // Check if Lenis is loaded
    if (typeof Lenis === 'undefined') return;

    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        direction: 'vertical',
        gestureDirection: 'vertical',
        smooth: true,
        mouseMultiplier: 1,
        smoothTouch: false,
        touchMultiplier: 2,
    });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
}

/**
 * Mobile Menu Toggle
 */
function initMobileMenu() {
    const toggle = document.querySelector('.navbar__toggle');
    const menu = document.querySelector('.navbar__menu');
    const links = document.querySelectorAll('.navbar__link');

    if (!toggle || !menu) return;

    toggle.addEventListener('click', () => {
        menu.classList.toggle('active');
        toggle.classList.toggle('active');

        // Animate hamburger to X
        const spans = toggle.querySelectorAll('span');
        if (toggle.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
        } else {
            spans[0].style.transform = '';
            spans[1].style.opacity = '';
            spans[2].style.transform = '';
        }
    });

    // Close menu on link click
    links.forEach(link => {
        link.addEventListener('click', () => {
            menu.classList.remove('active');
            toggle.classList.remove('active');
            const spans = toggle.querySelectorAll('span');
            spans[0].style.transform = '';
            spans[1].style.opacity = '';
            spans[2].style.transform = '';
        });
    });
}

/**
 * View More Button Logic
 */
function initViewMore() {
    const btn = document.querySelector('.catalog__cta .btn');
    const moreGrid = document.querySelector('.catalog__grid--more');

    if (!btn || !moreGrid) return;

    btn.addEventListener('click', (e) => {
        e.preventDefault();
        moreGrid.classList.remove('hidden');
        btn.style.display = 'none'; // Hide button after clicking

        // Refresh ScrollTrigger/animations if needed, or simple scroll to new content
        /* 
           If using Motion One or Lenis, we might want to refresh layout awareness 
           but for simple display:block it usually flows naturally. 
        */

        // Animate new items in
        if (typeof animate !== 'undefined' && typeof stagger !== 'undefined') {
            animate(
                ".catalog__grid--more .product-card",
                { opacity: [0, 1], y: [20, 0] },
                { delay: stagger(0.1), duration: 0.5, easing: "ease-out" }
            );
        }
    });
}


/**
 * Smooth Scroll for Anchor Links
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;

            const target = document.querySelector(href);
            if (!target) return;

            e.preventDefault();

            const navbarHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        });
    });
}

/**
 * Navbar Background on Scroll
 */
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        // Add shadow and background on scroll
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
            navbar.style.boxShadow = '0 2px 20px rgba(44, 40, 37, 0.08)';
        } else {
            navbar.classList.remove('scrolled');
            navbar.style.boxShadow = 'none';
        }

        lastScroll = currentScroll;
    });
}