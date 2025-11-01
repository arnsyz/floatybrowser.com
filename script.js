document.addEventListener("DOMContentLoaded", () => {
  const screen = document.getElementById("screen-content");
  const root = document.documentElement;
  const steps = [...document.querySelectorAll(".step")];

  // each scene = background + macbook rotation + screen style
  const sceneLooks = [
    {
      bg: "radial-gradient(70% 60% at 50% 5%, rgba(0,183,255,.18), #0e1114 70%)",
      screenBg: "rgba(255,255,255,.03)",
      screenBorder: "rgba(0,183,255,.45)",
      screenText: "#edf2f8",
      rotX: "14deg",
      rotY: "-10deg",
      scale: "1"
    },
    {
      bg: "radial-gradient(60% 60% at 80% 0%, rgba(0,144,255,.22), #0a0c10 80%)",
      screenBg: "rgba(0,144,255,.03)",
      screenBorder: "rgba(0,144,255,.5)",
      screenText: "#f6fbff",
      rotX: "16deg",
      rotY: "-4deg",
      scale: "1.02"
    },
    {
      bg: "radial-gradient(65% 50% at 10% -10%, rgba(0,255,169,.2), #0b0f12 75%)",
      screenBg: "rgba(0,255,169,.04)",
      screenBorder: "rgba(0,255,169,.45)",
      screenText: "#edfff8",
      rotX: "12deg",
      rotY: "-14deg",
      scale: "1.025"
    },
    {
      bg: "radial-gradient(65% 50% at 40% 0%, rgba(255,171,0,.2), #080a0d 75%)",
      screenBg: "rgba(255,171,0,.03)",
      screenBorder: "rgba(255,171,0,.45)",
      screenText: "#fff3df",
      rotX: "15deg",
      rotY: "-6deg",
      scale: "1.015"
    },
    {
      bg: "radial-gradient(70% 60% at 50% 10%, rgba(255,0,105,.24), #090b0f 75%)",
      screenBg: "rgba(255,0,105,.035)",
      screenBorder: "rgba(255,0,105,.5)",
      screenText: "#fff0fa",
      rotX: "13deg",
      rotY: "-10deg",
      scale: "1"
    },
    {
      bg: "radial-gradient(65% 50% at 50% -5%, rgba(130,106,255,.26), #0a0c10 75%)",
      screenBg: "rgba(130,106,255,.035)",
      screenBorder: "rgba(130,106,255,.45)",
      screenText: "#ffffff",
      rotX: "17deg",
      rotY: "-8deg",
      scale: "1.03"
    },
    {
      bg: "radial-gradient(70% 60% at 50% 5%, rgba(0,183,255,.16), #0e1114 80%)",
      screenBg: "rgba(0,183,255,.03)",
      screenBorder: "rgba(0,183,255,.45)",
      screenText: "#eaf6ff",
      rotX: "12deg",
      rotY: "-6deg",
      scale: "1.01"
    },
    {
      bg: "radial-gradient(70% 60% at 60% 0%, rgba(0,255,134,.22), #090b0f 80%)",
      screenBg: "rgba(0,255,134,.03)",
      screenBorder: "rgba(0,255,134,.5)",
      screenText: "#ebfff5",
      rotX: "11deg",
      rotY: "-12deg",
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

  // initial render
  if (steps.length) {
    screen.innerHTML = renderScene(steps[0]);
    applyScene(0);
  }

  function applyScene(idx) {
    const look = sceneLooks[idx] || sceneLooks[0];
    root.style.setProperty("--bg", look.bg);
    root.style.setProperty("--screen-bg", look.screenBg);
    root.style.setProperty("--screen-border", look.screenBorder);
    root.style.setProperty("--screen-text", look.screenText);
    root.style.setProperty("--mac-rot-x", look.rotX);
    root.style.setProperty("--mac-rot-y", look.rotY);
    root.style.setProperty("--mac-scale", look.scale);
  }

  // observe scroll sections
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      const idx = Number(entry.target.dataset.scene || 0);
      const html = renderScene(entry.target);

      // crossfade
      const ghost = document.createElement("div");
      ghost.className = "screen-content";
      ghost.innerHTML = html;
      screen.parentElement.appendChild(ghost);

      const card = ghost.querySelector(".screen-card");
      if (card) card.style.animation = "fadeIn .3s ease both";

      setTimeout(() => {
        screen.innerHTML = html;
        ghost.remove();
      }, 300);

      applyScene(idx);
    });
  }, { threshold: 0.55 });

  steps.forEach(step => io.observe(step));
});
