document.addEventListener("DOMContentLoaded", () => {
  const screen = document.getElementById("screen-content");
  const mac = document.getElementById("macbook");
  const steps = [...document.querySelectorAll(".step")];

  // per-scene styling to fake the “video” changing look every scroll
  const sceneLooks = [
    {
      bg: "radial-gradient(70% 60% at 50% 5%, rgba(0,183,255,.18), #0e1114 70%)",
      screenBg: "rgba(255,255,255,.03)",
      screenBorder: "rgba(0,183,255,.45)",
      screenText: "#ecf1f6",
      tilt: "4deg",
      scale: "1"
    },
    {
      bg: "radial-gradient(50% 50% at 80% 0%, rgba(0,146,255,.25), #090b0f 70%)",
      screenBg: "rgba(0,146,255,.04)",
      screenBorder: "rgba(0,146,255,.5)",
      screenText: "#f7fbff",
      tilt: "6deg",
      scale: "1.02"
    },
    {
      bg: "radial-gradient(75% 70% at 10% -10%, rgba(0,255,189,.2), #0b0e12 80%)",
      screenBg: "rgba(0,255,189,.04)",
      screenBorder: "rgba(0,255,189,.4)",
      screenText: "#edfff9",
      tilt: "5deg",
      scale: "1.03"
    },
    {
      bg: "radial-gradient(70% 60% at 30% 0%, rgba(255,171,0,.16), #0a0d11 80%)",
      screenBg: "rgba(255,171,0,.04)",
      screenBorder: "rgba(255,171,0,.4)",
      screenText: "#fff4e3",
      tilt: "7deg",
      scale: "1.01"
    },
    {
      bg: "radial-gradient(65% 58% at 50% 10%, rgba(255,0,104,.2), #090b0f 80%)",
      screenBg: "rgba(255,0,104,.03)",
      screenBorder: "rgba(255,0,104,.4)",
      screenText: "#fff0fa",
      tilt: "5deg",
      scale: "1"
    },
    {
      bg: "radial-gradient(65% 58% at 50% -5%, rgba(140,116,255,.3), #090b0f 85%)",
      screenBg: "rgba(140,116,255,.05)",
      screenBorder: "rgba(140,116,255,.5)",
      screenText: "#ffffff",
      tilt: "6deg",
      scale: "1.04"
    },
    {
      bg: "radial-gradient(70% 60% at 50% 5%, rgba(0,183,255,.15), #0e1114 80%)",
      screenBg: "rgba(0,183,255,.03)",
      screenBorder: "rgba(0,183,255,.45)",
      screenText: "#edf8ff",
      tilt: "4deg",
      scale: "1.01"
    },
    {
      bg: "radial-gradient(70% 60% at 60% 0%, rgba(0,255,134,.22), #0a0d11 80%)",
      screenBg: "rgba(0,255,134,.03)",
      screenBorder: "rgba(0,255,134,.5)",
      screenText: "#edfff7",
      tilt: "3deg",
      scale: "1"
    }
  ];

  const renderScene = (step) => {
    const title = step.dataset.title || "";
    const text = step.dataset.text || "";
    const cta = step.dataset.cta;
    const link = step.dataset.ctalink || "#";

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

  // initial content
  if (steps.length) {
    screen.innerHTML = renderScene(steps[0]);
    applyScene(0);
  }

  function applyScene(idx) {
    const look = sceneLooks[idx] || sceneLooks[0];
    const root = document.documentElement;
    root.style.setProperty("--scene-bg", look.bg);
    root.style.setProperty("--screen-bg", look.screenBg);
    root.style.setProperty("--screen-border", look.screenBorder);
    root.style.setProperty("--screen-text", look.screenText);
    root.style.setProperty("--mac-tilt", look.tilt);
    root.style.setProperty("--mac-scale", look.scale);
  }

  // observe each step to swap screen like the video
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const idx = Number(entry.target.dataset.scene || 0);
      const html = renderScene(entry.target);

      // crossfade by temporarily placing a ghost over screen
      const ghost = document.createElement("div");
      ghost.className = "screen-content";
      ghost.innerHTML = html;
      screen.parentElement.appendChild(ghost);
      const card = ghost.querySelector(".screen-card");
      if (card) card.style.animation = "fadeIn .35s ease both";

      setTimeout(() => {
        screen.innerHTML = html;
        ghost.remove();
      }, 340);

      applyScene(idx);
    });
  }, { threshold: 0.52 });

  steps.forEach(step => io.observe(step));

  // reveal bottom sections
  const revealIO = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("visible"); });
  }, { threshold: 0.25 });

  document.querySelectorAll(".features,.pricing,.contact").forEach(el => revealIO.observe(el));
});
