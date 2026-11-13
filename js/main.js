(function () {
  document.documentElement.classList.add("js-ready");

  const header = document.querySelector(".site-header");
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".nav");

  if (header) {
    const onScroll = () => {
      header.classList.toggle("is-scrolled", window.scrollY > 24);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  if (toggle && nav) {
    const setNavOpen = (open) => {
      toggle.setAttribute("aria-expanded", String(open));
      nav.classList.toggle("is-open", open);
      toggle.setAttribute("aria-label", open ? "Lukk meny" : "Åpne meny");
    };

    toggle.addEventListener("click", () => {
      setNavOpen(toggle.getAttribute("aria-expanded") !== "true");
    });

    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => setNavOpen(false));
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") setNavOpen(false);
    });
  }

  const reveals = document.querySelectorAll(".reveal");
  if (reveals.length && "IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add("is-visible"));
  }

  const form = document.querySelector("#kontakt-form");
  if (form) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const data = new FormData(form);
      const lines = [
        "Ny forespørsel fra nettsiden",
        "",
        "Navn: " + (data.get("navn") || ""),
        "Telefon: " + (data.get("telefon") || ""),
        "E-post: " + (data.get("epost") || ""),
        "Type: " + (data.get("type") || ""),
        "",
        "Beskrivelse:",
        data.get("beskrivelse") || "",
      ];
      const mailto =
        "mailto:erikandersenskogli@gmail.com" +
        "?subject=" +
        encodeURIComponent("Forespørsel — Fokus Bygg") +
        "&body=" +
        encodeURIComponent(lines.join("\n"));
      window.location.href = mailto;
      const success = document.querySelector("#form-success");
      if (success) {
        success.classList.add("is-visible");
        success.focus();
      }
      form.reset();
    });
  }

  const year = document.querySelector("[data-year]");
  if (year) {
    year.textContent = String(new Date().getFullYear());
  }
})();
