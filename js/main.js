(function () {
  "use strict";

  // Mobile navigation toggle
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("site-nav");

  if (toggle && nav) {
    function setOpen(open) {
      nav.classList.toggle("is-open", open);
      toggle.setAttribute("aria-expanded", String(open));
    }

    toggle.addEventListener("click", function () {
      setOpen(toggle.getAttribute("aria-expanded") !== "true");
    });

    // Close after choosing a link (useful for in-page #contact links)
    nav.addEventListener("click", function (e) {
      if (e.target.closest("a")) setOpen(false);
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
        setOpen(false);
        toggle.focus();
      }
    });
  }

  // Keep the footer year current
  var year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  // Assemble mailto: links at runtime, so a plain-text scrape of the HTML
  // never finds a ready-to-use address. Real visitors get a normal link.
  var emailLinks = document.querySelectorAll(".js-email");
  for (var i = 0; i < emailLinks.length; i++) {
    var link = emailLinks[i];
    var address = link.getAttribute("data-user") + "@" + link.getAttribute("data-domain");
    link.href = "mailto:" + address;
    link.textContent = address;
  }
})();
