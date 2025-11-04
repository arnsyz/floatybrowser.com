// GSAP ScrollTrigger for screen changes and animations
gsap.registerPlugin(ScrollTrigger);

const sections = document.querySelectorAll('.feature-section');
const screens = document.querySelectorAll('.screen');

function showScreen(index) {
  screens.forEach(screen => screen.classList.remove('active'));
  const targetScreen = screens[index - 1];
  targetScreen.classList.add('active');
  // Animate content with smooth fade and slide
  gsap.fromTo(targetScreen.querySelector('.content > *'), 
    { opacity: 0, y: 30, stagger: 0.1 },
    { opacity: 1, y: 0, duration: 1, stagger: 0.1, ease: 'power3.out' }
  );
}

sections.forEach((section, index) => {
  gsap.from(section, {
    opacity: 0,
    y: 100,
    duration: 1.2,
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

// Enhanced Parallax for hero with multi-layer effect
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
gsap.to('.hero::before', {
  opacity: 0.8,
  scale: 1.2,
  ease: 'none',
  scrollTrigger: {
    trigger: '.hero',
    start: 'top top',
    end: 'bottom top',
    scrub: true
  }
});

// MacBook rotation, scale, and glow for wow effect (game-like polish)
const macbook = document.querySelector('.macbook');
ScrollTrigger.create({
  trigger: '.demo-container',
  start: 'top top',
  end: 'bottom bottom',
  scrub: true,
  onUpdate: (self) => {
    const progress = self.progress;
    const rotateY = -20 + (40 * progress); // Wider rotation for dynamic feel
    const scale = 0.95 + (0.1 * Math.sin(progress * Math.PI * 2)); // Pulsing scale like breathing
    const glowIntensity = 0.2 + (0.3 * Math.abs(Math.sin(progress * Math.PI))); // Pulsing glow
    macbook.style.transform = `perspective(2500px) rotateY(${rotateY}deg) scale(${scale})`;
    macbook.style.filter = `drop-shadow(0 0 ${glowIntensity * 20}px var(--accent))`;
  }
});

// Micro-interactions for buttons and nav links (game-like hover feedback)
document.querySelectorAll('.button, .navbar nav a').forEach(el => {
  el.addEventListener('mouseenter', () => {
    gsap.to(el, { scale: 1.08, duration: 0.4, ease: 'elastic.out(1, 0.5)' });
  });
  el.addEventListener('mouseleave', () => {
    gsap.to(el, { scale: 1, duration: 0.4, ease: 'elastic.out(1, 0.5)' });
  });
});

// Fade-in for pricing and contact sections
gsap.from('.pricing, .contact', {
  opacity: 0,
  y: 50,
  duration: 1,
  stagger: 0.3,
  scrollTrigger: {
    trigger: '.pricing',
    start: 'top 80%',
    toggleActions: 'play none none reverse'
  }
});

// Hero content fade-in animation
gsap.from('.hero-content > *', {
  opacity: 0,
  y: 50,
  duration: 1,
  stagger: 0.2,
  ease: 'power3.out'
});

// Particles for hero background
particlesJS('particles-js', {
  "particles": {
    "number": {
      "value": 80,
      "density": {
        "enable": true,
        "value_area": 800
      }
    },
    "color": {
      "value": "#00aaff"
    },
    "shape": {
      "type": "circle",
      "stroke": {
        "width": 0,
        "color": "#000000"
      },
      "polygon": {
        "nb_sides": 5
      }
    },
    "opacity": {
      "value": 0.5,
      "random": false,
      "anim": {
        "enable": false,
        "speed": 1,
        "opacity_min": 0.1,
        "sync": false
      }
    },
    "size": {
      "value": 3,
      "random": true,
      "anim": {
        "enable": false,
        "speed": 40,
        "size_min": 0.1,
        "sync": false
      }
    },
    "line_linked": {
      "enable": true,
      "distance": 150,
      "color": "#00aaff",
      "opacity": 0.4,
      "width": 1
    },
    "move": {
      "enable": true,
      "speed": 6,
      "direction": "none",
      "random": false,
      "straight": false,
      "out_mode": "out",
      "bounce": false,
      "attract": {
        "enable": false,
        "rotateX": 600,
        "rotateY": 1200
      }
    }
  },
  "interactivity": {
    "detect_on": "canvas",
    "events": {
      "onhover": {
        "enable": true,
        "mode": "repulse"
      },
      "onclick": {
        "enable": true,
        "mode": "push"
      },
      "resize": true
    },
    "modes": {
      "grab": {
        "distance": 400,
        "line_linked": {
          "opacity": 1
        }
      },
      "bubble": {
        "distance": 400,
        "size": 40,
        "duration": 2,
        "opacity": 8,
        "speed": 3
      },
      "repulse": {
        "distance": 200,
        "duration": 0.4
      },
      "push": {
        "particles_nb": 4
      },
      "remove": {
        "particles_nb": 2
      }
    }
  },
  "retina_detect": true
});

// Animate use cases on scroll
gsap.from('.use-case', {
  opacity: 0,
  y: 100,
  duration: 1,
  stagger: 0.2,
  ease: 'power4.out',
  scrollTrigger: {
    trigger: '.use-cases',
    start: 'top 85%',
    toggleActions: 'play none none reverse'
  }
});
