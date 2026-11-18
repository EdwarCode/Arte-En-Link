/* ArteEnLink: controles seguros para demos, sin enviar RSVPs ficticios. */
(() => {
  "use strict";
  function showNotice() {
    let notice = document.getElementById("demo-rsvp-notice");
    if (!notice) {
      notice = document.createElement("aside");
      notice.id = "demo-rsvp-notice";
      notice.className = "demo-rsvp-notice";
      notice.setAttribute("role", "note");
      notice.setAttribute("tabindex", "-1");
      const title = document.createElement("strong");
      title.textContent = "Función de demostración";
      const description = document.createElement("p");
      description.textContent = "Esta muestra es ilustrativa: mapas, alojamientos, álbumes, calendarios, regalos y confirmaciones se configuran con los datos reales de cada celebración. Aquí no se envía ningún dato del invitado.";
      const link = document.createElement("a");
      link.href = "/";
      link.textContent = "Explorar ArteEnLink ↗";
      notice.append(title, description, link);
      document.body.append(notice);
    }
    notice.scrollIntoView({ behavior: "auto", block: "center" });
    notice.focus({ preventScroll: true });
    return false;
  }
  window.ArteEnLinkDemo = Object.freeze({ showNotice });
  document.addEventListener("click", (event) => {
    const target = event.target;
    const anchor = target instanceof Element ? target.closest('a[href="#"]') : null;
    if (!anchor || event.defaultPrevented || anchor.hasAttribute("onclick")) return;
    event.preventDefault();
    showNotice();
  });
})();
