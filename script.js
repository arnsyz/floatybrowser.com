// GSAP ScrollTrigger for screen changes and animations
gsap.registerPlugin(ScrollTrigger);

const sections = document.querySelectorAll('.feature-section');
const screens = document.querySelectorAll('.screen');

function showScreen(index) {
  screens.forEach(screen => screen.classList.remove('active'));
  const targetScreen = screens[index - 1];
  targetScreen.classList.add('active');
  // Enhanced animation with rotation and bounce
  gsap.fromTo(targetScreen.querySelector('.content > *'), 
    { opacity: 0, y: 40, scale: 0.9, rotation: -5, stagger: 0.2 },
    { opacity: 1, y: 0, scale: 1, rotation: 0, duration: 1.2, stagger: 0.2, ease: 'bounce.out' }
  );
}

sections.forEach((section, index) => {
  gsap.from(section, {
    opacity: 0,
    y: 120,
    duration: 1.5,
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

// Enhanced Parallax for hero with multi-layer effect, scale, and rotation
gsap.to('.hero', {
  backgroundPosition: '50% 100%',
  scale: 1.1,
  rotation: 2,
  ease: 'none',
  scrollTrigger: {
    trigger: '.hero',
    start: 'top top',
    end: 'bottom top',
    scrub: true
  }
});
gsap.to('.hero::before', {
  opacity: 0.9,
  scale: 1.3,
  rotation: -2,
  ease: 'none',
  scrollTrigger: {
    trigger: '.hero',
    start: 'top top',
    end: 'bottom top',
    scrub: true
  }
});

// MacBook enhanced rotation, scale, glow, and added wobble
const macbook = document.querySelector('.macbook');
ScrollTrigger.create({
  trigger: '.demo-container',
  start: 'top top',
  end: 'bottom bottom',
  scrub: true,
  onUpdate: (self) => {
    const progress = self.progress;
    const rotateY = -30 + (60 * progress); // Wider rotation
    const scale = 0.85 + (0.3 * Math.sin(progress * Math.PI * 2)); // Stronger pulse
    const glowIntensity = 0.4 + (0.5 * Math.abs(Math.sin(progress * Math.PI))); // Brighter glow
    const wobble = 5 * Math.sin(progress * Math.PI * 4); // Added wobble effect
    macbook.style.transform = `perspective(3000px) rotateY(${rotateY}deg) rotateX(${wobble}deg) scale(${scale}) translateY(${progress * 100}px)`;
    macbook.style.filter = `drop-shadow(0 0 ${glowIntensity * 40}px var(--accent))`;
  }
});

// Enhanced micro-interactions for buttons and nav links with color shift
document.querySelectorAll('.button, .navbar nav a').forEach(el => {
  el.addEventListener('mouseenter', () => {
    gsap.to(el, { scale: 1.15, rotation: 8, duration: 0.6, ease: 'elastic.out(1, 0.5)', boxShadow: '0 0 20px var(--accent)', color: 'var(--accent-dark)' });
  });
  el.addEventListener('mouseleave', () => {
    gsap.to(el, { scale: 1, rotation: 0, duration: 0.6, ease: 'elastic.out(1, 0.5)', boxShadow: 'none', color: 'inherit' });
  });
});

// Fade-in for pricing and contact sections with enhanced stagger, rotation, and scale
gsap.from('.pricing > *, .contact > *', {
  opacity: 0,
  y: 60,
  rotation: 15,
  scale: 0.9,
  duration: 1.5,
  stagger: 0.4,
  ease: 'power3.out',
  scrollTrigger: {
    trigger: '.pricing',
    start: 'top 80%',
    toggleActions: 'play none none reverse'
  }
});

// Hero content fade-in with enhanced stagger, bounce, and rotation
gsap.from('.hero-content > *', {
  opacity: 0,
  y: 80,
  rotation: 10,
  duration: 1.5,
  stagger: 0.3,
  ease: 'bounce.out'
});

// Enhanced particles for hero background with more interactivity
particlesJS('particles-js', {
  "particles": {
    "number": {
      "value": 120, // More particles
      "density": {
        "enable": true,
        "value_area": 800
      }
    },
    "color": {
      "value": ["#00aaff", "#4dd3ff"] // Gradient colors
    },
    "shape": {
      "type": ["circle", "triangle"], // Varied shapes
      "stroke": {
        "width": 0,
        "color": "#000000"
      },
      "polygon": {
        "nb_sides": 5
      }
    },
    "opacity": {
      "value": 0.7,
      "random": true,
      "anim": {
        "enable": true,
        "speed": 2,
        "opacity_min": 0.2,
        "sync": false
      }
    },
    "size": {
      "value": 5,
      "random": true,
      "anim": {
        "enable": true,
        "speed": 30,
        "size_min": 0.2,
        "sync": false
      }
    },
    "line_linked": {
      "enable": true,
      "distance": 180,
      "color": "#00aaff",
      "opacity": 0.6,
      "width": 2
    },
    "move": {
      "enable": true,
      "speed": 10, // Faster
      "direction": "none",
      "random": true,
      "straight": false,
      "out_mode": "bounce",
      "bounce": true,
      "attract": {
        "enable": true,
        "rotateX": 800,
        "rotateY": 1600
      }
    }
  },
  "interactivity": {
    "detect_on": "canvas",
    "events": {
      "onhover": {
        "enable": true,
        "mode": ["bubble", "grab"] // Combined modes
      },
      "onclick": {
        "enable": true,
        "mode": "push"
      },
      "resize": true
    },
    "modes": {
      "grab": {
        "distance": 500,
        "line_linked": {
          "opacity": 1
        }
      },
      "bubble": {
        "distance": 400,
        "size": 60,
        "duration": 3,
        "opacity": 0.9,
        "speed": 4
      },
      "repulse": {
        "distance": 250,
        "duration": 0.5
      },
      "push": {
        "particles_nb": 8
      },
      "remove": {
        "particles_nb": 3
      }
    }
  },
  "retina_detect": true
});

// Animate use cases on scroll with enhanced effects
gsap.from('.use-case', {
  opacity: 0,
  y: 100,
  rotation: -20,
  scale: 0.8,
  duration: 1.5,
  stagger: 0.3,
  ease: 'power4.out',
  scrollTrigger: {
    trigger: '.use-cases',
    start: 'top 85%',
    toggleActions: 'play none none reverse'
  }
});

// Smooth section transitions with color fade
gsap.utils.toArray('section').forEach(section => {
  gsap.from(section, {
    opacity: 0,
    y: 70,
    duration: 1.2,
    ease: 'power2.inOut',
    backgroundColor: 'rgba(0,0,0,0.5)',
    scrollTrigger: {
      trigger: section,
      start: 'top 90%',
      toggleActions: 'play none none reverse'
    }
  });
});

// Enhanced hover effects for feature sections with color shift and border glow
document.querySelectorAll('.feature-section').forEach(section => {
  section.addEventListener('mouseenter', () => {
    gsap.to(section, { scale: 1.08, backgroundColor: '#282c32', duration: 0.8, ease: 'power3.out', border: '2px solid var(--accent)' });
  });
  section.addEventListener('mouseleave', () => {
    gsap.to(section, { scale: 1, backgroundColor: 'var(--card)', duration: 0.8, ease: 'power3.out', border: 'none' });
  });
});

// Hover effects for use cases
document.querySelectorAll('.use-case').forEach(caseEl => {
  caseEl.addEventListener('mouseenter', () => {
    gsap.to(caseEl, { scale: 1.05, boxShadow: '0 0 20px var(--accent)', duration: 0.5, ease: 'power2.out' });
  });
  caseEl.addEventListener('mouseleave', () => {
    gsap.to(caseEl, { scale: 1, boxShadow: 'var(--shadow-neumorphic)', duration: 0.5, ease: 'power2.out' });
  });
});
