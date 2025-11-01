console.log("FloatyBrowser site loaded. You’re officially a web dev now.");

// GSAP ScrollTrigger for screen changes
gsap.registerPlugin(ScrollTrigger);

const sections = document.querySelectorAll('.feature-section');
const screens = document.querySelectorAll('.screen');

function showScreen(index) {
  screens.forEach(screen => screen.classList.remove('active'));
  screens[index - 1].classList.add('active');
}

sections.forEach((section, index) => {
  ScrollTrigger.create({
    trigger: section,
    start: 'top 50%',
    end: 'bottom 50%',
    onEnter: () => showScreen(index + 1),
    onEnterBack: () => showScreen(index + 1),
    onLeave: () => {},
    onLeaveBack: () => {}
  });
});

// Optional: Slight rotation animation on scroll for wow factor
const macbook = document.querySelector('.macbook');
ScrollTrigger.create({
  trigger: '.demo-container',
  start: 'top top',
  end: 'bottom bottom',
  scrub: true,
  onUpdate: (self) => {
    const progress = self.progress;
    const rotateY = -30 + (60 * progress); // From -30deg to 30deg as scroll
    macbook.style.transform = `perspective(1500px) rotateY(${rotateY}deg)`;
  }
});
