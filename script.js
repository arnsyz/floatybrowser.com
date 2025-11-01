document.addEventListener("DOMContentLoaded", () => {
  const screen = document.getElementById("screen-content");
  const macbook = document.getElementById("macbook");
  const steps = [...document.querySelectorAll(".step")];

  // each scene can define how “extra” it looks
  // you said “make it more sceny per scroll” so I gave each scene a look
  const sceneStyles = [
    {
      bg: "radial-gradient(70% 60% at 50% 5%, rgba(0,183,255,.18), #0e1114 70%)",
      tone: "rgba(255,255,255,.03)",
      border: "rgba(0,183,255,.25)",
      text: "#e7ecf2",
      tilt: "5deg",
      scale: "1"
    },
    {
      bg: "radial-gradient(60% 50% at 60% 0%, rgba(0,145,255,.2), #0b0f12 70%)",
      tone: "rgba(10,15,18,.35)",
      border: "rgba(0,145,255,.35)",
      text: "#e7ecf2",
      tilt: "7deg",
      scale: "1.02"
    },
    {
      bg: "radial-gradient(70% 60% at 40% 10%, rgba(0,255,213,.16), #0e1114 70%)",
      tone: "rgba(0,255,213,.04)",
      border: "rgba(0,255,213,.45)",
      text: "#f9fffe",
      tilt: "4deg",
      scale: "1.03"
    },
    {
      bg: "radial-gradient(70% 60% at 50% 0%, rgba(255,171,0,.15), #090c10 70%)",
      tone: "rgba(255,171,0,.035)",
      border: "rgba(255,171,0,.25)",
      text: "#fff",
      tilt: "6deg",
      scale: "1.01"
    },
    {
      bg: "radial-gradient(80% 70% at 50% -5%, rgba(255,0,105,.2), #0b0f12 70%)",
      tone: "rgba(255,0,105,.04)",
      border: "rgba(255,0,105,.35)",
      text: "#fff3f9",
      tilt: "5deg",
      scale: "1"
    },
    {
      bg: "radial-gradient(60% 50% at 60% 5%, rgba(127,94,255,.2), #090b0f 70%)",
      tone: "rgba(127,94,255,.045)",
      border: "rgba(127,94,255,.4)",
      text: "#ffffff",
      tilt: "8deg",
      scale: "1.04"
    },
    {
      bg: "radial-gradient(70% 60% at 50% 10%, rgba(0,183,255,.14), #0e1114 70%)",
      tone: "rgba(0,183,255,.03)",
      border: "rgba(0,183,255,.4)",
      text: "#e7ecf2",
      tilt: "5deg",
      scale: "1.02"
    },
    {
      bg: "radial-gradient(70% 60% at 50% 0%, rgba(0,255,157,.18), #0b0e12 70%)",
      tone: "rgba(0,255,157,.04)",
      border: "rgba(0,255,157,.5)",
      text: "#eafff7",
      tilt: "3deg",
      scale: "1"
    }
  ];

  const renderScene = (step) => {
    const title = step.dataset.title || "";
    const text = step.dataset.text || "";
    const cta = step.dataset.cta;
    const link = step.dataset.ctalink || "#";

    const button = cta
      ? `<a href="${link}" class="button" ${link.startsWith("#") ? "" : 'target="_blank" rel="noopener"'}>${cta}</a>`
      : "";

    return `
      <div class="screen-card">
        <h2>${title}</h2>
        <p>${text}</p>
        ${button}
      </div>
    `;
  };

  // initial
  if (steps.length) {
    screen.innerHTML = renderScene(steps[0]);
    applySceneStyle(0);
  }

  function applySceneStyle(idx) {
    const scene = sceneStyles[idx] || sceneStyles[0];
    document.documentElement.style.setProperty("--scene-bg", scene.bg);
    document.documentElement.style.setProperty("--screen-tone", scene.tone);
    document.documentElement.style.setProperty("--screen-border", scene.border);
    document.documentElement.style.setProperty("--screen-text", scene.text);
    document.documentElement.style.setProperty("--mac-tilt", scene.tilt);
    document.documentElement.style.setProperty("--mac-scale", scene.scale);
  }

  // intersection for each scene
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const sceneIndex = Number(entry.target.dataset.scene || 0);
      const newHTML = renderScene(entry.target);

      // crossfade
      const ghost = document.createElement("div");
      ghost.className = "screen-content";
      ghost.innerHTML = newHTML;
      screen.parentElement.appendChild(ghost);

      // fade in
      const card = ghost.querySelector(".screen-card");
      if (card) card.style.animation = "fadeIn .4s ease both";

      setTimeout(() => {
        screen.innerHTML = newHTML;
        ghost.remove();
      }, 390);

      applySceneStyle(sceneIndex);
    });
  }, { threshold: 0.55 });

  steps.forEach((step) => io.observe(step));

  // reveal normal sections later
  const reveal = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) e.target.classList.add("visible");
    });
  }, { threshold: 0.25 });
  document.querySelectorAll(".features,.pricing,.contact").forEach((el) => reveal.observe(el));
});
