(() => {
  const FORM_HOST_ID = 'app-embed-container-1012386';
  const STYLE_ID = 'swimdays-shopify-forms-overrides';
  const STYLE_CONTENT = `
    :host {
      --button-text-color: #ffffff !important;
      --forms-accent-color: #A84F77 !important;
      --button-background-color: #A84F77 !important;
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
  };

  applyFormOverrides();

  const observer = new MutationObserver(applyFormOverrides);
  observer.observe(document.documentElement, {
    childList: true,
    subtree: true,
  });
})();
