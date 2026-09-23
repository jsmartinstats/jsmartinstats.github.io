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

  // Office hours: location and booking link alternate week to week.
  // referenceMonday is any Monday that falls in a locations[0] ("A") week -
  // parity is counted from there, so locations[1] ("B") is the week either
  // side of it, and so on indefinitely. Update the two entries if the
  // rooms/links change; only touch referenceMonday if the alternation itself shifts.
  var officeHoursAlternating = {
    referenceMonday: "2026-09-28",
    locations: [
      { location: "Fry Building, Room LG.12", url: "https://bookings.cloud.microsoft/bookwithme/user/980e4d6a4c3c4638a4389ea97b279dfb@bristol.ac.uk/meetingtype/dd3FW-cVuketpi03tE0h8g2?anonymous&ismsaljsauthenabled" }, // A weeks
      { location: "Fry Building, Room G.06", url: "https://bookings.cloud.microsoft/bookwithme/user/980e4d6a4c3c4638a4389ea97b279dfb@bristol.ac.uk/meetingtype/dd3FW-cVuketpi03tE0h8g2?anonymous&ismsaljsauthenabled" }  // B weeks
    ]
  };

  var officeHoursInfo = document.getElementById("office-hours-info");
  if (officeHoursInfo) {
    var msPerDay = 86400000;
    var todayStr = new Date().toISOString().slice(0, 10);
    var daysSinceReference = Math.floor(
      (Date.parse(todayStr) - Date.parse(officeHoursAlternating.referenceMonday)) / msPerDay
    );
    var weekIndex = Math.floor(daysSinceReference / 7);
    var parity = ((weekIndex % 2) + 2) % 2; // normalise in case today is before referenceMonday
    var thisWeek = officeHoursAlternating.locations[parity];

    officeHoursInfo.innerHTML =
      '<p class="muted">This week’s office hours: ' + thisWeek.location + '.</p>' +
      '<div class="button-row"><a class="button" href="' + thisWeek.url +
      '" target="_blank" rel="noopener">Book a slot</a></div>';
  }
})();
