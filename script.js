document.addEventListener("DOMContentLoaded", () => {
  // Reveal-on-scroll
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) e.target.classList.add("visible");
    });
  }, { threshold: 0.18 });

  document.querySelectorAll(".reveal, .features, .pricing, .contact").forEach(el => io.observe(el));

  // Cinematic intro transform
  const mac = document.querySelector(".macbook");
  const intro = document.querySelector(".intro");

  const onScroll = () => {
    const y = window.scrollY || window.pageYOffset;
    // scale and lift MacBook a bit as you start scrolling
    const clamped = Math.min(y, 400);
    const scale = 1 - clamped / 1600;         // 1 -> ~0.75
    const lift = -clamped / 6;                 // subtle upward move
    mac.style.transform = `translateY(${lift}px) scale(${scale})`;

    // fade intro out after ~60% viewport
    const fadeStart = window.innerHeight * 0.4;
    const fade = Math.max(0, 1 - (y - fadeStart) / (window.innerHeight * 0.6));
    intro.style.opacity = isNaN(fade) ? 1 : Math.min(1, Math.max(0, fade));
    // when fully faded, let clicks pass through
    intro.style.pointerEvents = fade <= 0.02 ? "none" : "auto";
  };

  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
});
