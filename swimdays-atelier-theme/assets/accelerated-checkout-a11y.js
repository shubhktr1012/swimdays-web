/**
 * @param {Document | HTMLElement} [root]
 */
const labelAcceleratedCheckoutButtons = (root = document) => {
  const buttons = root.querySelectorAll('.shopify-payment-button__button');

  for (const button of buttons) {
    if (button.getAttribute('aria-label') || button.getAttribute('aria-labelledby')) continue;

    const visibleLabel = button.textContent.trim();
    button.setAttribute('aria-label', visibleLabel || 'Buy it now');
  }
};

labelAcceleratedCheckoutButtons();

const observer = new MutationObserver((mutations) => {
  for (const mutation of mutations) {
    for (const node of mutation.addedNodes) {
      if (!(node instanceof HTMLElement)) continue;
      labelAcceleratedCheckoutButtons(node);
    }
  }
});

observer.observe(document.documentElement, {
  childList: true,
  subtree: true,
});
