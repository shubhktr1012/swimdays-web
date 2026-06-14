(() => {
  const FORM_HOST_ID = 'app-embed-container-1012386';
  const STYLE_ID = 'swimdays-shopify-forms-overrides';
  const CLICKTHROUGH_BOUND_KEY = 'swimdaysFormsClickthroughBound';
  const STYLE_CONTENT = `
    :host {
      --button-text-color: #ffffff !important;
      --forms-accent-color: #A84F77 !important;
      --button-background-color: #A84F77 !important;
      --forms-discount-code-color: #A84F77 !important;
      --forms-discount-code-background-color-hover: #F4D7DF !important;
      --forms-heading-font: normal 400 22px Aboreto, serif !important;
      --forms-body-font: normal 400 14px "Public Sans", sans-serif !important;
    }

    #app-embed {
      font-family: "Public Sans", sans-serif !important;
    }

    #app-embed ._textHeading_2aowh_35,
    #app-embed h2 {
      font: normal 400 22px/1.2 Aboreto, serif !important;
      font-family: Aboreto, serif !important;
      font-weight: 400 !important;
      letter-spacing: 0 !important;
    }

    #app-embed ._textBody_2aowh_10,
    #app-embed ._formDisclaimer_cit2d_38,
    #app-embed input,
    #app-embed label,
    #app-embed button {
      font-family: "Public Sans", sans-serif !important;
    }

    #app-embed button[type="submit"],
    #app-embed ._formSubmitButton_cit2d_96 {
      color: #ffffff !important;
      font-family: "Public Sans", sans-serif !important;
    }
  `;

  const getEmailField = (root) => {
    return root.querySelector('[data-testid="field-email"], input[inputmode="email"], input[type="email"], #email');
  };

  const getCloseButton = (root) => {
    return root.querySelector(
      'button[aria-label="Close modal"], button[aria-label="Close"], button[aria-label*="close" i], button[class*="formCloseButton"]'
    );
  };

  const isInteractiveTarget = (target) => {
    return Boolean(
      target.closest('a, button, input, textarea, select, label, [role="button"], shop-lead-capture')
    );
  };

  const focusEmailField = (root) => {
    const emailField = getEmailField(root);

    if (!emailField) return;

    emailField.focus({ preventScroll: true });
    emailField.scrollIntoView({ block: 'center', inline: 'nearest', behavior: 'smooth' });
  };

  const bindPopupClickthrough = (root) => {
    if (root[CLICKTHROUGH_BOUND_KEY]) return;

    root[CLICKTHROUGH_BOUND_KEY] = true;
    root.addEventListener('click', (event) => {
      const target = event.target;

      if (!(target instanceof Element) || isInteractiveTarget(target)) return;

      const closeButton = getCloseButton(root);
      const isInsidePopup = target.closest(
        'form, [role="dialog"], [class*="formContainer"], [class*="gridItemContent"], [class*="formHeader"], [class*="modalContent"]'
      );

      if (closeButton && !isInsidePopup) {
        event.preventDefault();
        event.stopPropagation();
        closeButton.click();
        return;
      }

      const formContainer = target.closest(
        'form, h2, p, [class*="formHeader"], [class*="textHeading"], [class*="textBody"], [class*="gridItemContent"]'
      );

      if (!formContainer || !getEmailField(root)) return;

      focusEmailField(root);
    });
  };

  const applyFormOverrides = () => {
    const host = document.getElementById(FORM_HOST_ID);
    const root = host?.shadowRoot;

    if (!root) {
      return;
    }

    let style = root.getElementById(STYLE_ID);

    if (!style) {
      style = document.createElement('style');
      style.id = STYLE_ID;
    }

    if (style.textContent !== STYLE_CONTENT) {
      style.textContent = STYLE_CONTENT;
    }

    if (style !== root.lastElementChild) {
      root.appendChild(style);
    }

    bindPopupClickthrough(root);
  };

  applyFormOverrides();

  const observer = new MutationObserver(applyFormOverrides);
  observer.observe(document.documentElement, {
    childList: true,
    subtree: true,
  });
})();
