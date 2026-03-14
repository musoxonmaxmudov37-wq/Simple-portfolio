(function () {
  const navToggle = document.getElementById("navToggle");
  const navLinks = document.getElementById("navLinks");

  if (navToggle && navLinks) {
    navToggle.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });

    // close menu after click (mobile)
    navLinks.querySelectorAll("a").forEach((a) => {
      a.addEventListener("click", () => {
        navLinks.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // reveal on scroll
  const items = Array.from(document.querySelectorAll(".reveal"));
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("show");
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  items.forEach((el, i) => {
    // tiny stagger so it feels alive
    el.style.transitionDelay = Math.min(i * 55, 420) + "ms";
    io.observe(el);
  });

  // Copy brief
  const copyBtn = document.getElementById("copyBrief");
  const briefBox = document.getElementById("briefBox");
  const toast = document.getElementById("toast");

  if (copyBtn && briefBox) {
    copyBtn.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(briefBox.innerText.trim());
        if (toast) {
          toast.classList.add("show");
          setTimeout(() => toast.classList.remove("show"), 1200);
        }
      } catch (err) {
        alert("Nusxa olish bo'lmadi. Qayta urinib ko'ring.");
      }
    });
  }
})();
