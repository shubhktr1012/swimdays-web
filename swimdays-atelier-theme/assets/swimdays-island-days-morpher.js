/**
 * Island Days mobile showcase controller.
 *
 * Desktop (>=750px): static equal trio, no JS behaviour.
 * Mobile (<750px): three rough variants, switched locally via
 *   ?island-days-mobile=peek|panels|fan (default: peek)
 *   - peek:   scroll-snap carousel, next colour peeking
 *   - panels: full-bleed colour panel per tote, scroll-snap
 *   - fan:    stacked fan, swipe/chip cycles the front card
 */
(function () {
  const SELECTOR = '[data-island-days-morpher]';
  const DESKTOP_MQ = '(min-width: 750px)';
  const VARIANTS = ['peek', 'panels', 'fan'];
  const QUERY_PARAM = 'island-days-mobile';

  function prefersReducedMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  function isDesktop() {
    return window.matchMedia(DESKTOP_MQ).matches;
  }

  function resolveVariant() {
    try {
      const requested = new URLSearchParams(window.location.search).get(QUERY_PARAM);
      if (requested && VARIANTS.includes(requested)) return requested;
    } catch (_) {
      /* no-op: default below */
    }
    return 'peek';
  }

  class IslandDaysShowcase {
    constructor(root) {
      this.root = root;
      this.section = root.closest('.swimdays-home-island-days') || root;
      this.stage = root.querySelector('[data-morpher-stage]');
      this.layers = Array.from(root.querySelectorAll('[data-morpher-layer]'));
      this.chips = Array.from(root.querySelectorAll('[data-morpher-chip]'));
      this.label = root.querySelector('[data-morpher-label]');
      this.shopLink = root.querySelector('[data-morpher-shop]');
      this.intervalMs = Number(root.dataset.intervalMs || 4500);
      this.variant = resolveVariant();
      this.index = 0;
      this.timer = null;
      this.scrollRaf = null;
      this.mq = window.matchMedia(DESKTOP_MQ);

      if (this.layers.length === 0 || !this.stage) return;

      this.section.dataset.mobileVariant = this.variant;

      this.onMqChange = () => this.syncMode();
      if (this.mq.addEventListener) this.mq.addEventListener('change', this.onMqChange);
      else this.mq.addListener(this.onMqChange);

      this.bind();
      this.syncMode();
    }

    bind() {
      this.chips.forEach((chip, i) => {
        chip.addEventListener('click', () => {
          if (isDesktop()) return;
          this.select(i);
          this.restartAutoCycle();
        });
      });

      // Scroll variants: track the card nearest the viewport centre.
      this.stage.addEventListener(
        'scroll',
        () => {
          if (isDesktop() || !this.isScrollVariant()) return;
          if (this.scrollRaf) return;
          this.scrollRaf = window.requestAnimationFrame(() => {
            this.scrollRaf = null;
            this.setActive(this.nearestIndex(), { scroll: false });
          });
        },
        { passive: true }
      );

      // Fan variant: horizontal swipe cycles the stack.
      this.stage.addEventListener('pointerdown', (e) => {
        if (isDesktop() || this.variant !== 'fan') return;
        this.swipeStartX = e.clientX;
        this.swipeStartY = e.clientY;
      });
      this.stage.addEventListener('pointerup', (e) => {
        if (isDesktop() || this.variant !== 'fan' || this.swipeStartX == null) return;
        const dx = e.clientX - this.swipeStartX;
        const dy = e.clientY - this.swipeStartY;
        this.swipeStartX = null;
        if (Math.abs(dx) < 32 || Math.abs(dx) < Math.abs(dy)) return;
        e.preventDefault();
        this.select(this.index + (dx < 0 ? 1 : -1));
        this.restartAutoCycle();
      });
      // A real swipe should not trigger the card link.
      this.stage.addEventListener('click', (e) => {
        if (this.suppressClick) {
          e.preventDefault();
          e.stopPropagation();
          this.suppressClick = false;
        }
      }, true);
      this.stage.addEventListener('pointermove', (e) => {
        if (this.swipeStartX == null) return;
        if (Math.abs(e.clientX - this.swipeStartX) > 12) this.suppressClick = true;
      });

      this.root.addEventListener('mouseenter', () => this.stopAutoCycle());
      this.root.addEventListener('mouseleave', () => this.restartAutoCycle());
      this.root.addEventListener('focusin', () => this.stopAutoCycle());
      this.root.addEventListener('focusout', (e) => {
        if (!this.root.contains(e.relatedTarget)) this.restartAutoCycle();
      });

      document.addEventListener('visibilitychange', () => {
        if (document.hidden) this.stopAutoCycle();
        else this.restartAutoCycle();
      });
    }

    isScrollVariant() {
      return this.variant === 'peek' || this.variant === 'panels';
    }

    syncMode() {
      this.stopAutoCycle();

      if (isDesktop()) {
        this.layers.forEach((layer) => {
          layer.classList.add('is-active');
          layer.style.removeProperty('--fan-pos');
          layer.inert = false;
        });
        return;
      }

      this.setActive(this.index, { scroll: false });
      if (this.variant === 'fan' && !prefersReducedMotion() && this.layers.length > 1) {
        this.startAutoCycle();
      }
    }

    nearestIndex() {
      const stageRect = this.stage.getBoundingClientRect();
      const centre = stageRect.left + stageRect.width / 2;
      let best = 0;
      let bestDist = Infinity;
      this.layers.forEach((layer, i) => {
        const rect = layer.getBoundingClientRect();
        const dist = Math.abs(rect.left + rect.width / 2 - centre);
        if (dist < bestDist) {
          bestDist = dist;
          best = i;
        }
      });
      return best;
    }

    select(i) {
      this.setActive(i, { scroll: true });
    }

    setActive(i, { scroll = true } = {}) {
      if (isDesktop()) return;

      const n = this.layers.length;
      const next = ((i % n) + n) % n;
      const changed = next !== this.index;
      this.index = next;

      this.layers.forEach((layer, idx) => {
        const active = idx === this.index;
        layer.classList.toggle('is-active', active);
        if (this.variant === 'fan') {
          layer.style.setProperty('--fan-pos', String(((idx - this.index) % n + n) % n));
          layer.inert = !active;
        } else {
          layer.inert = false;
        }
      });

      this.chips.forEach((chip, idx) => {
        const active = idx === this.index;
        chip.classList.toggle('is-active', active);
        chip.setAttribute('aria-pressed', active ? 'true' : 'false');
      });

      const activeLayer = this.layers[this.index];
      const name = activeLayer?.dataset.colourName || '';
      const url = activeLayer?.dataset.productUrl || '';

      if (this.label && name) this.label.textContent = name;
      if (this.shopLink) {
        if (url) {
          this.shopLink.href = url;
          this.shopLink.removeAttribute('aria-disabled');
          this.shopLink.classList.remove('is-disabled');
        } else {
          this.shopLink.removeAttribute('href');
          this.shopLink.setAttribute('aria-disabled', 'true');
          this.shopLink.classList.add('is-disabled');
        }
      }

      if (scroll && this.isScrollVariant()) {
        const card = this.layers[this.index];
        const left = card.offsetLeft - (this.stage.clientWidth - card.clientWidth) / 2;
        this.stage.scrollTo({
          left,
          behavior: prefersReducedMotion() ? 'auto' : 'smooth',
        });
      }

      if (changed) {
        this.root.dispatchEvent(
          new CustomEvent('swimdays:island-days-colour', {
            detail: { index: this.index, name, url },
            bubbles: true,
          })
        );
      }
    }

    startAutoCycle() {
      if (isDesktop() || this.variant !== 'fan') return;
      if (prefersReducedMotion() || this.layers.length < 2) return;
      this.stopAutoCycle();
      this.timer = window.setInterval(() => this.select(this.index + 1), this.intervalMs);
    }

    stopAutoCycle() {
      if (this.timer) {
        window.clearInterval(this.timer);
        this.timer = null;
      }
    }

    restartAutoCycle() {
      if (isDesktop() || this.variant !== 'fan' || prefersReducedMotion()) return;
      if (this.root.matches(':hover') || this.root.contains(document.activeElement)) return;
      this.startAutoCycle();
    }
  }

  function init(root) {
    if (!root || root.dataset.morpherReady === 'true') return;
    root.dataset.morpherReady = 'true';
    new IslandDaysShowcase(root);
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
      delete root.dataset.morpherReady;
      init(root);
    }
  });
})();
