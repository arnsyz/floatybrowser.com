// A tiny scene engine: pin the MacBook, swap screen content on scroll, add tilt/parallax.
document.addEventListener("DOMContentLoaded", () => {
  const screen = document.getElementById("screen-content");
  const mac = document.querySelector(".macbook");
  const steps = [...document.querySelectorAll(".step")];

  // Build scene HTML from each step's data attributes
  const renderScene = (el) => {
    const title = el.dataset.title || "";
    const text = el.dataset.text || "";
    const cta = el.dataset.cta;
    const link = el.dataset.ctalink || "#";

    const btn = cta
      ? `<a href="${link}" class="button" ${link.startsWith("#") ? "" : 'target="_blank" rel="noopener"'}>${cta}</a>`
      : "";

    return `
      <div class="screen-card">
        <h2>${title}</h2>
        <p>${text}</p>
        ${btn}
      </div>
    `;
  };

  // Put first scene in immediately
  if (steps.length) screen.innerHTML = renderScene(steps[0]);

  // Observe steps entering viewport
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      const html = renderScene(e.target);
      // crossfade
      const ghost = document.createElement("div");
      ghost.className = "screen-content";
      ghost.innerHTML = html;
      screen.parentElement.appendChild(ghost);
      // fade old out, new in
      ghost.querySelector(".screen-card").style.animation = "fadeIn .45s ease both";
      setTimeout(() => {
        screen.innerHTML = html;
        ghost.remove();
      }, 450);
    });
  }, { threshold: 0.6 });

  steps.forEach(s => io.observe(s));

  // Subtle tilt/parallax on scroll to mimic product page movement
  let lastY = window.scrollY;
  const onScroll = () => {
    const y = window.scrollY;
    const dy = Math.min(Math.max((y - lastY), -30), 30); // clamp
    lastY = y;
    const tilt = Math.max(Math.min(window.scrollY / 1200, 0.06), 0); // up to ~3.4deg
    mac.style.transform = `perspective(1200px) rotateX(${tilt * 60}deg)`;
    requestAnimationFrame(() => {}); // nudge paint
  };
  window.addEventListener("scroll", onScroll, { passive: true });

  // Reveal standard sections after scrolly
  const revealIO = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("visible"); });
  }, { threshold: 0.22 });
  document.querySelectorAll(".features,.pricing,.contact").forEach(el => revealIO.observe(el));
});
