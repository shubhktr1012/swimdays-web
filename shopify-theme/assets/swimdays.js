(function () {
  const scrollTriggers = document.querySelectorAll('[data-scroll-target]');
  scrollTriggers.forEach((trigger) => {
    trigger.addEventListener('click', (event) => {
      const targetSelector = trigger.getAttribute('data-scroll-target');
      const target = targetSelector ? document.querySelector(targetSelector) : null;
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  const imageSwaps = document.querySelectorAll('[data-main-image]');
  imageSwaps.forEach((container) => {
    const mainImage = container.querySelector('.pdp__main-image');
    if (!mainImage) return;

    container.querySelectorAll('[data-thumb-url]').forEach((button) => {
      button.addEventListener('click', () => {
        const nextUrl = button.getAttribute('data-thumb-url');
        if (!nextUrl) return;
        mainImage.setAttribute('src', nextUrl);
      });
    });
  });
})();
