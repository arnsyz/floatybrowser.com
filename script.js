console.log("FloatyBrowser site loaded. You’re officially a web dev now.");

// GSAP ScrollTrigger for screen changes and animations
gsap.registerPlugin(ScrollTrigger);

const sections = document.querySelectorAll('.feature-section');
const screens = document.querySelectorAll('.screen');

function showScreen(index) {
  screens.forEach(screen => screen.classList.remove('active'));
  screens[index - 1].classList.add('active');
}

sections.forEach((section, index) => {
  gsap.from(section, {
    opacity: 0,
    y: 50,
    duration: 1,
    scrollTrigger: {
      trigger: section,
      start: 'top 80%',
      end: 'bottom 20%',
      toggleActions: 'play none none reverse'
    }
  });

  ScrollTrigger.create({
    trigger: section,
    start: 'top 50%',
    end: 'bottom 50%',
    onEnter: () => showScreen(index + 1),
    onEnterBack: () => showScreen(index + 1),
  });
});

// Parallax for hero
gsap.to('.hero', {
  backgroundPosition: '50% 100%',
  ease: 'none',
  scrollTrigger: {
    trigger: '.hero',
    start: 'top top',
    end: 'bottom top',
    scrub: true
  }
});

// MacBook rotation and scale for wow effect
const macbook = document.querySelector('.macbook');
ScrollTrigger.create({
  trigger: '.demo-container',
  start: 'top top',
  end: 'bottom bottom',
  scrub: true,
  onUpdate: (self) => {
    const progress = self.progress;
    const rotateY = -15 + (30 * progress); // Subtler rotation: -15 to 15 deg
    const scale = 1 - (0.1 * Math.sin(progress * Math.PI)); // Slight scale pulse
    macbook.style.transform = `perspective(2000px) rotateY(${rotateY}deg) scale(${scale})`;
  }
});

// Micro-interaction for buttons
document.querySelectorAll('.button').forEach(button => {
  button.addEventListener('mouseenter', () => {
    gsap.to(button, { scale: 1.05, duration: 0.3, ease: 'power2.out' });
  });
  button.addEventListener('mouseleave', () => {
    gsap.to(button, { scale: 1, duration: 0.3, ease: 'power2.out' });
  });
});
