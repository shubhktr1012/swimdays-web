/**
 * Dual launch hero: swipe + autoplay between campaign slides.
 * Progress pills fill in sync with autoplay.
 * Pause on focus / swipe (not hover). No autoplay when prefers-reduced-motion.
 * Syncs body.swimdays-hero-nav-dark from the active slide's data-nav-tone.
 */
(function () {
  const SELECTOR = '[data-swimdays-launch-hero]';
  const NAV_DARK_CLASS = 'swimdays-hero-nav-dark';

  function prefersReducedMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  function setHeroNavTone(tone) {
    document.body.classList.toggle(NAV_DARK_CLASS, tone === 'dark');
  }

  function clearHeroNavTone() {
    document.body.classList.remove(NAV_DARK_CLASS);
  }

  class LaunchHeroSlider {
    constructor(root) {
      this.root = root;
      this.track = root.querySelector('[data-launch-hero-track]');
      this.slides = Array.from(root.querySelectorAll('[data-launch-hero-slide]'));
      this.dots = Array.from(root.querySelectorAll('[data-launch-hero-dot]'));
      this.prevBtn = root.querySelector('[data-launch-hero-prev]');
      this.nextBtn = root.querySelector('[data-launch-hero-next]');
      this.intervalMs = Number(root.dataset.autoplayMs || 6500);
      this.index = 0;
      this.timer = null;
      this.pointerId = null;
      this.startX = 0;
      this.deltaX = 0;
      this.swiping = false;

      this.syncNavTone(0);

      if (this.slides.length < 2) return;

      this.bind();
      this.goTo(0, { instant: true });
      if (!prefersReducedMotion()) this.startAutoplay();
    }

    syncNavTone(index) {
      const slide = this.slides[index] || this.slides[0];
      const tone = slide?.dataset?.navTone || 'light';
      setHeroNavTone(tone);
    }

    bind() {
      this.prevBtn?.addEventListener('click', () => {
        this.goTo(this.index - 1);
        this.restartAutoplay();
      });
      this.nextBtn?.addEventListener('click', () => {
        this.goTo(this.index + 1);
        this.restartAutoplay();
      });

      this.dots.forEach((dot, i) => {
        dot.addEventListener('click', () => {
          this.goTo(i);
          this.restartAutoplay();
        });
      });

      this.root.addEventListener('focusin', () => this.stopAutoplay());
      this.root.addEventListener('focusout', (e) => {
        if (!this.root.contains(e.relatedTarget)) this.restartAutoplay();
      });

      this.root.addEventListener('pointerdown', (e) => this.onPointerDown(e));
      this.root.addEventListener('pointermove', (e) => this.onPointerMove(e));
      this.root.addEventListener('pointerup', (e) => this.onPointerUp(e));
      this.root.addEventListener('pointercancel', () => this.onPointerCancel());
      this.root.addEventListener('pointerleave', () => {
        if (this.swiping) this.onPointerCancel();
      });

      document.addEventListener('visibilitychange', () => {
        if (document.hidden) this.stopAutoplay();
        else this.restartAutoplay();
      });
    }

    onPointerDown(e) {
      if (e.pointerType === 'mouse' && e.button !== 0) return;
      if (e.target.closest('a, button')) return;
      this.pointerId = e.pointerId;
      this.startX = e.clientX;
      this.deltaX = 0;
      this.swiping = true;
      this.stopAutoplay();
      try {
        this.root.setPointerCapture(e.pointerId);
      } catch (_) {
        /* ignore */
      }
    }

    onPointerMove(e) {
      if (!this.swiping || e.pointerId !== this.pointerId) return;
      this.deltaX = e.clientX - this.startX;
    }

    onPointerUp(e) {
      if (!this.swiping || e.pointerId !== this.pointerId) return;
      const threshold = Math.min(80, this.root.clientWidth * 0.12);
      if (this.deltaX > threshold) this.goTo(this.index - 1);
      else if (this.deltaX < -threshold) this.goTo(this.index + 1);
      this.swiping = false;
      this.pointerId = null;
      this.deltaX = 0;
      this.restartAutoplay();
    }

    onPointerCancel() {
      this.swiping = false;
      this.pointerId = null;
      this.deltaX = 0;
      this.restartAutoplay();
    }

    normalize(i) {
      const n = this.slides.length;
      return ((i % n) + n) % n;
    }

    /** Update which pill is active; clear fill classes on inactive pills. */
    markActivePill() {
      this.dots.forEach((dot, idx) => {
        const active = idx === this.index;
        dot.classList.toggle('is-active', active);
        dot.setAttribute('aria-current', active ? 'true' : 'false');
        if (!active) dot.classList.remove('is-progressing', 'is-paused');
      });
    }

    /** Restart the active pill fill from 0. */
    startPillProgress() {
      if (prefersReducedMotion()) return;
      const active = this.dots[this.index];
      if (!active) return;
      active.classList.remove('is-progressing', 'is-paused');
      void active.offsetWidth;
      active.classList.add('is-progressing');
    }

    pausePillProgress() {
      const active = this.dots[this.index];
      if (!active || !active.classList.contains('is-progressing')) return;
      active.classList.add('is-paused');
    }

    goTo(i, { instant = false } = {}) {
      this.index = this.normalize(i);

      this.slides.forEach((slide, idx) => {
        const active = idx === this.index;
        slide.classList.toggle('is-active', active);
        slide.setAttribute('aria-hidden', active ? 'false' : 'true');
        slide.inert = !active;

        const heading = slide.querySelector('[data-launch-hero-heading]');
        if (heading) {
          heading.setAttribute('aria-hidden', active ? 'false' : 'true');
          if (active) heading.removeAttribute('tabindex');
          else heading.setAttribute('tabindex', '-1');
        }
      });

      this.markActivePill();
      this.syncNavTone(this.index);

      if (this.track) {
        this.track.style.transition = instant ? 'none' : '';
        this.track.setAttribute('data-active-index', String(this.index));
      }

      this.root.setAttribute('data-active-slide', String(this.index));
    }

    startAutoplay() {
      if (prefersReducedMotion() || this.slides.length < 2) return;
      this.stopAutoplay({ pausePill: false });
      this.startPillProgress();
      this.timer = window.setInterval(() => {
        this.goTo(this.index + 1);
        this.startPillProgress();
      }, this.intervalMs);
    }

    stopAutoplay({ pausePill = true } = {}) {
      if (this.timer) {
        window.clearInterval(this.timer);
        this.timer = null;
      }
      if (pausePill) this.pausePillProgress();
    }

    restartAutoplay() {
      if (prefersReducedMotion()) return;
      if (this.root.contains(document.activeElement)) return;
      this.startAutoplay();
    }
  }

  function init(root) {
    if (!root || root.dataset.launchHeroReady === 'true') return;
    root.dataset.launchHeroReady = 'true';
    new LaunchHeroSlider(root);
  }

  function boot() {
    document.querySelectorAll(SELECTOR).forEach(init);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }

  document.addEventListener('shopify:section:load', (e) => {
    const root = e.target.querySelector?.(SELECTOR) || (e.target.matches?.(SELECTOR) ? e.target : null);
    if (root) {
      delete root.dataset.launchHeroReady;
      init(root);
    }
  });

  document.addEventListener('shopify:section:unload', (e) => {
    const root = e.target.querySelector?.(SELECTOR) || (e.target.matches?.(SELECTOR) ? e.target : null);
    if (root) clearHeroNavTone();
  });
})();
