document.addEventListener("DOMContentLoaded", () => {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add("visible");
    });
  }, {threshold: 0.2});

  document.querySelectorAll(".hero, .features, .pricing, .contact").forEach(el => observer.observe(el));

  // Shrink MacBook on scroll
  window.addEventListener("scroll", () => {
    const mac = document.querySelector(".macbook");
    const scrollY = window.scrollY;
    if (scrollY > 50) mac.style.transform = "scale(0.85)";
    if (scrollY > 200) mac.style.opacity = 0;
  });
});
