// GSAP ScrollTrigger for screen changes and animations
gsap.registerPlugin(ScrollTrigger);

const sections = document.querySelectorAll('.feature-section');
const screens = document.querySelectorAll('.screen');

function showScreen(index) {
  screens.forEach(screen => screen.classList.remove('active'));
  const targetScreen = screens[index - 1];
  targetScreen.classList.add('active');
  // Enhanced animation with rotation, bounce, and color fade
  gsap.fromTo(targetScreen.querySelector('.content > *'), 
    { opacity: 0, y: 50, scale: 0.85, rotation: -10, stagger: 0.25, color: '#aaa' },
    { opacity: 1, y: 0, scale: 1, rotation: 0, duration: 1.5, stagger: 0.25, ease: 'bounce.out', color: '#222' }
  );
}

sections.forEach((section, index) => {
  gsap.from(section, {
    opacity: 0,
    y: 150,
    duration: 1.8,
    ease: 'power4.out',
    scrollTrigger: {
      trigger: section,
      start: 'top 85%',
      end: 'bottom 15%',
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

// Enhanced Parallax for hero with multi-layer effect, scale, rotation, and blur
gsap.to('.hero', {
  backgroundPosition: '50% 100%',
  scale: 1.15,
  rotation: 3,
  filter: 'blur(2px)',
  ease: 'none',
  scrollTrigger: {
    trigger: '.hero',
    start: 'top top',
    end: 'bottom top',
    scrub: true
  }
});
gsap.to('.hero::before', {
  opacity: 1,
  scale: 1.4,
  rotation: -3,
  filter: 'blur(1px)',
  ease: 'none',
  scrollTrigger: {
    trigger: '.hero',
    start: 'top top',
    end: 'bottom top',
    scrub: true
  }
});

// MacBook enhanced with more realistic animations: rotation, scale, glow, wobble, and shadow shift
const macbook = document.querySelector('.macbook');
ScrollTrigger.create({
  trigger: '.demo-container',
  start: 'top top',
  end: 'bottom bottom',
  scrub: true,
  onUpdate: (self) => {
    const progress = self.progress;
    const rotateY = -35 + (70 * progress); // Even wider rotation
    const scale = 0.8 + (0.4 * Math.sin(progress * Math.PI * 2)); // Intensified pulse
    const glowIntensity = 0.5 + (0.6 * Math.abs(Math.sin(progress * Math.PI))); // Stronger glow
    const wobble = 8 * Math.sin(progress * Math.PI * 4); // More pronounced wobble
    const shadowShift = progress * 20; // Dynamic shadow
    macbook.style.transform = `perspective(3500px) rotateY(${rotateY}deg) rotateX(${wobble}deg) scale(${scale}) translateY(${progress * 120}px)`;
    macbook.style.filter = `drop-shadow(${shadowShift}px ${shadowShift}px ${glowIntensity * 50}px var(--accent))`;
  }
});

// Enhanced micro-interactions for buttons and nav links with color shift and glow
document.querySelectorAll('.button, .navbar nav a').forEach(el => {
  el.addEventListener('mouseenter', () => {
    gsap.to(el, { scale: 1.2, rotation: 10, duration: 0.7, ease: 'elastic.out(1, 0.5)', boxShadow: '0 0 25px var(--accent)', color: 'var(--accent-dark)', filter: 'brightness(1.2)' });
  });
  el.addEventListener('mouseleave', () => {
    gsap.to(el, { scale: 1, rotation: 0, duration: 0.7, ease: 'elastic.out(1, 0.5)', boxShadow: 'none', color: 'inherit', filter: 'brightness(1)' });
  });
});

// Fade-in for pricing and contact sections with enhanced stagger, rotation, scale, and color transition
gsap.from('.pricing > *, .contact > *', {
  opacity: 0,
  y: 70,
  rotation: 20,
  scale: 0.85,
  duration: 1.8,
  stagger: 0.5,
  ease: 'power3.out',
  color: '#ccc',
  onComplete: function() { gsap.to(this.targets(), { color: 'inherit', duration: 0.5 }); },
  scrollTrigger: {
    trigger: '.pricing',
    start: 'top 80%',
    toggleActions: 'play none none reverse'
  }
});

// Hero content fade-in with enhanced stagger, bounce, rotation, and shadow
gsap.from('.hero-content > *', {
  opacity: 0,
  y: 100,
  rotation: 15,
  duration: 1.8,
  stagger: 0.4,
  ease: 'bounce.out',
  textShadow: '0 0 10px rgba(0,0,0,0)'
});

// Enhanced particles for hero background with more interactivity and color variation
particlesJS('particles-js', {
  "particles": {
    "number": {
      "value": 150,
      "density": {
        "enable": true,
        "value_area": 800
      }
    },
    "color": {
      "value": ["#00aaff", "#4dd3ff", "#ffffff"]
    },
    "shape": {
      "type": ["circle", "triangle", "star"],
      "stroke": {
        "width": 0,
        "color": "#000000"
      },
      "polygon": {
        "nb_sides": 5
      }
    },
    "opacity": {
      "value": 0.8,
      "random": true,
      "anim": {
        "enable": true,
        "speed": 3,
        "opacity_min": 0.3,
        "sync": false
      }
    },
    "size": {
      "value": 6,
      "random": true,
      "anim": {
        "enable": true,
        "speed": 40,
        "size_min": 0.3,
        "sync": false
      }
    },
    "line_linked": {
      "enable": true,
      "distance": 200,
      "color": "#00aaff",
      "opacity": 0.7,
      "width": 2.5
    },
    "move": {
      "enable": true,
      "speed": 12,
      "direction": "none",
      "random": true,
      "straight": false,
      "out_mode": "bounce",
      "bounce": true,
      "attract": {
        "enable": true,
        "rotateX": 1000,
        "rotateY": 2000
      }
    }
  },
  "interactivity": {
    "detect_on": "canvas",
    "events": {
      "onhover": {
        "enable": true,
        "mode": ["bubble", "grab", "repulse"]
      },
      "onclick": {
        "enable": true,
        "mode": "push"
      },
      "resize": true
    },
    "modes": {
      "grab": {
        "distance": 600,
        "line_linked": {
          "opacity": 1
        }
      },
      "bubble": {
        "distance": 500,
        "size": 80,
        "duration": 4,
        "opacity": 1,
        "speed": 5
      },
      "repulse": {
        "distance": 300,
        "duration": 0.6
      },
      "push": {
        "particles_nb": 10
      },
      "remove": {
        "particles_nb": 4
      }
    }
  },
  "retina_detect": true
});

// Animate use cases on scroll with enhanced effects and color fade
gsap.from('.use-case', {
  opacity: 0,
  y: 120,
  rotation: -25,
  scale: 0.75,
  duration: 1.8,
  stagger: 0.4,
  ease: 'power4.out',
  backgroundColor: '#111',
  onComplete: function() { gsap.to(this.targets(), { backgroundColor: 'var(--card)', duration: 0.6 }); },
  scrollTrigger: {
    trigger: '.use-cases',
    start: 'top 85%',
    toggleActions: 'play none none reverse'
  }
});

// Smooth section transitions with color fade and scale
gsap.utils.toArray('section').forEach(section => {
  gsap.from(section, {
    opacity: 0,
    y: 80,
    scale: 0.95,
    duration: 1.5,
    ease: 'power2.inOut',
    backgroundColor: 'rgba(0,0,0,0.6)',
    scrollTrigger: {
      trigger: section,
      start: 'top 90%',
      toggleActions: 'play none none reverse'
    }
  });
});

// Enhanced hover effects for feature sections with color shift, border glow, and shadow lift
document.querySelectorAll('.feature-section').forEach(section => {
  section.addEventListener('mouseenter', () => {
    gsap.to(section, { scale: 1.1, backgroundColor: '#282c32', duration: 1, ease: 'power3.out', border: '3px solid var(--accent)', boxShadow: '0 0 30px var(--accent-fade)' });
  });
  section.addEventListener('mouseleave', () => {
    gsap.to(section, { scale: 1, backgroundColor: 'var(--card)', duration: 1, ease: 'power3.out', border: 'none', boxShadow: 'var(--shadow-neumorphic)' });
  });
});

// Hover effects for use cases with lift and glow
document.querySelectorAll('.use-case').forEach(caseEl => {
  caseEl.addEventListener('mouseenter', () => {
    gsap.to(caseEl, { scale: 1.08, boxShadow: '0 0 25px var(--accent)', duration: 0.6, ease: 'power2.out', backgroundColor: '#1f2328' });
  });
  caseEl.addEventListener('mouseleave', () => {
    gsap.to(caseEl, { scale: 1, boxShadow: 'var(--shadow-neumorphic)', duration: 0.6, ease: 'power2.out', backgroundColor: 'var(--card)' });
  });
});
