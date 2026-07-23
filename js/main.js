const body = document.body;
const toggle = document.querySelector("[data-nav-toggle]");
const navLinks = document.querySelectorAll(".nav-links a");

if (toggle) {
  toggle.addEventListener("click", () => {
    const isOpen = body.classList.toggle("nav-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });
}

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    body.classList.remove("nav-open");
    toggle?.setAttribute("aria-expanded", "false");
  });
});

const reveals = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.14 }
  );

  reveals.forEach((item) => observer.observe(item));
} else {
  reveals.forEach((item) => item.classList.add("is-visible"));
}

const contactForm = document.querySelector("[data-contact-form]");
const formStatus = document.querySelector("[data-form-status]");

if (contactForm && formStatus) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(contactForm);
    const subject = encodeURIComponent(data.get("subject") || "Zyverio inquiry");
    const message = encodeURIComponent(
      `Name: ${data.get("name")}\nEmail: ${data.get("email")}\n\n${data.get("message")}`
    );

    formStatus.textContent = "Opening your email app with the message prepared.";
    window.location.href = `mailto:hornet.devlo@gmail.com?subject=${subject}&body=${message}`;
  });
}
