document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const navbar = document.querySelector(".swimdays-navbar");
  const menuToggle = document.querySelector("[data-menu-toggle]");
  const mobileMenu = document.querySelector("[data-mobile-menu]");
  const menuClose = document.querySelector("[data-menu-close]");
  const menuLinks = document.querySelectorAll("[data-mobile-menu] a");

  const setMenuState = (isOpen) => {
    if (!menuToggle || !mobileMenu) return;
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    mobileMenu.setAttribute("aria-hidden", String(!isOpen));
    navbar?.classList.toggle("menu-open", isOpen);
    body.classList.toggle("nav-locked", isOpen);
  };

  const applyScrollState = () => {
    body.classList.toggle("announcement-hidden", window.scrollY > 24);
    navbar?.classList.toggle("is-scrolled", window.scrollY > 20);
  };

  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener("click", () => {
      const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
      setMenuState(!isOpen);
    });

    mobileMenu.addEventListener("click", (event) => {
      if (event.target === mobileMenu) {
        setMenuState(false);
      }
    });
  }

  if (menuClose) {
    menuClose.addEventListener("click", () => setMenuState(false));
  }

  for (const link of menuLinks) {
    link.addEventListener("click", () => setMenuState(false));
  }

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      setMenuState(false);
    }
  });

  window.addEventListener("scroll", applyScrollState, { passive: true });
  window.addEventListener("resize", applyScrollState);
  applyScrollState();
});