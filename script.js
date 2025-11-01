document.addEventListener("DOMContentLoaded", () => {
  const screen = document.querySelector("#screen-content");
  const steps = Array.from(document.querySelectorAll(".scene-step"));
  const root = document.documentElement;

  if (!screen || !steps.length) {
    console.error("FloatyBrowser: screen or steps not found.");
    return;
  }

  // this is your actual content, in order
  const SCENES = [
    {
      title: "FloatyBrowser",
      text: "The browser that floats above everything. Stays visible even when other windows are locked.",
      cta: "Get FloatyBrowser",
      link: "#scene-6",
      look: {
        bg: "radial-gradient(70% 60% at 50% 5%, rgba(0,183,255,.18), #0e1114 70%)",
        screenBg: "rgba(255,255,255,.03)",
        screenBorder: "rgba(0,183,255,.45)",
        screenText: "#eef2f7",
        rotX: "14deg",
        rotY: "-12deg",
        scale: "1"
      }
    },
    {
      title: "Works with Lockdown Browser",
      text: "Use FloatyBrowser while your testing or locked environment is running. No juggling windows.",
      cta: "",
      link: "",
      look: {
        bg: "radial-gradient(60% 55% at 80% 0%, rgba(0,144,255,.25), #070a0d 80%)",
        screenBg: "rgba(0,144,255,.03)",
        screenBorder: "rgba(0,144,255,.5)",
        screenText: "#f6fbff",
        rotX: "16deg",
        rotY: "-5deg",
        scale: "1.02"
      }
    },
    {
      title: "Built-in Screenshot Tool",
      text: "Screenshot instantly from inside the app. Copy, send, done. No extra installs.",
      cta: "",
      link: "",
      look: {
        bg: "radial-gradient(65% 50% at 10% -10%, rgba(0,255,169,.2), #0b0f12 75%)",
        screenBg: "rgba(0,255,169,.04)",
        screenBorder: "rgba(0,255,169,.45)",
        screenText: "#edfff8",
        rotX: "12deg",
        rotY: "-14deg",
        scale: "1.025"
      }
    },
    {
      title: "Custom Keybinds",
      text: "Assign your own shortcuts for hide/show and focus so it fits how you actually work.",
      cta: "",
      link: "",
      look: {
        bg: "radial-gradient(65% 50% at 40% 0%, rgba(255,171,0,.18), #090c10 75%)",
        screenBg: "rgba(255,171,0,.03)",
        screenBorder: "rgba(255,171,0,.45)",
        screenText: "#fff3df",
        rotX: "15deg",
        rotY: "-6deg",
        scale: "1.01"
      }
    },
    {
      title: "Privacy-First",
      text: "No trackers. No analytics. No mystery network calls. Just your floating browser.",
      cta: "",
      link: "",
      look: {
        bg: "radial-gradient(70% 60% at 50% 10%, rgba(255,0,105,.25), #090b0f 70%)",
        screenBg: "rgba(255,0,105,.035)",
        screenBorder: "rgba(255,0,105,.5)",
        screenText: "#fff0fa",
        rotX: "13deg",
        rotY: "-10deg",
        scale: "1"
      }
    },
    {
      title: "Built in Swift",
      text: "Native macOS app. Fast startup, low memory, looks like it belongs on macOS.",
      cta: "",
      link: "",
      look: {
        bg: "radial-gradient(65% 50% at 50% -5%, rgba(130,106,255,.28), #0a0c10 80%)",
        screenBg: "rgba(130,106,255,.035)",
        screenBorder: "rgba(130,106,255,.45)",
        screenText: "#ffffff",
        rotX: "17deg",
        rotY: "-8deg",
        scale: "1.03"
      }
    },
    {
      title: "$80 — One-Time License",
      text: "Lifetime updates. Discord support. No subscription.",
      cta: "Contact to Buy",
      link: "#scene-7",
      look: {
        bg: "radial-gradient(70% 60% at 50% 5%, rgba(0,183,255,.16), #0e1114 78%)",
        screenBg: "rgba(0,183,255,.03)",
        screenBorder: "rgba(0,183,255,.45)",
        screenText: "#eaf6ff",
        rotX: "12deg",
        rotY: "-6deg",
        scale: "1.01"
      }
    },
    {
      title: "Discord Support",
      text: "Server: Join Here • Username: Arnsyz",
      cta: "Join Discord",
      link: "https://discord.gg/Rpn567xcPs",
      look: {
        bg: "radial-gradient(70% 60% at 60% 0%, rgba(0,255,134,.22), #090b0f 80%)",
        screenBg: "rgba(0,255,134,.03)",
        screenBorder: "rgba(0,255,134,.5)",
        screenText: "#ebfff5",
        rotX: "11deg",
        rotY: "-12deg",
        scale: "1"
      }
    }
  ];

  function renderScene(idx) {
    const scene = SCENES[idx] || SCENES[0];
    const btn = scene.cta
      ? `<a href="${scene.link}" class="button" ${scene.link.startsWith("#") ? "" : 'target="_blank" rel="noopener"'}>${scene.cta}</a>`
      : "";
    screen.innerHTML = `
      <div class="screen-card">
        <h2>${scene.title}</h2>
        <p>${scene.text}</p>
        ${btn}
      </div>
    `;

    // apply look
    root.style.setProperty("--bg", scene.look.bg);
    root.style.setProperty("--screen-bg", scene.look.screenBg);
    root.style.setProperty("--screen-border", scene.look.screenBorder);
    root.style.setProperty("--screen-text", scene.look.screenText);
    root.style.setProperty("--mac-rot-x", scene.look.rotX);
    root.style.setProperty("--mac-rot-y", scene.look.rotY);
    root.style.setProperty("--mac-scale", scene.look.scale);
  }

  // initial
  renderScene(0);

  // observe scroll
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const sceneIdx = Number(entry.target.dataset.scene || 0);
      renderScene(sceneIdx);
    });
  }, { threshold: 0.55 });

  steps.forEach((step) => observer.observe(step));
});
