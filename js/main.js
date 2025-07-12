// JS de base pour eMat iMad

document.addEventListener("DOMContentLoaded", () => {
  // Menu déroulant accessible
  const submenuLinks = document.querySelectorAll("nav ul li > a");

  submenuLinks.forEach(link => {
    const submenu = link.nextElementSibling;
    if (submenu && submenu.classList.contains("submenu")) {
      link.setAttribute("aria-haspopup", "true");
      link.setAttribute("aria-expanded", "false");

      link.addEventListener("click", (e) => {
        e.preventDefault();
        const expanded = link.getAttribute("aria-expanded") === "true";
        link.setAttribute("aria-expanded", !expanded);
        submenu.classList.toggle("open");
      });
    }
  });

  // Fermeture du sous-menu si clic en dehors
  document.addEventListener("click", (e) => {
    submenuLinks.forEach(link => {
      const submenu = link.nextElementSibling;
      if (submenu && submenu.classList.contains("submenu")) {
        if (!link.contains(e.target) && !submenu.contains(e.target)) {
          submenu.classList.remove("open");
          link.setAttribute("aria-expanded", "false");
        }
      }
    });
  });
});
