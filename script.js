// GSAP ScrollTrigger for screen changes and animations
gsap.registerPlugin(ScrollTrigger);

const sections = document.querySelectorAll('.feature-section');
const screens = document.querySelectorAll('.screen');

function showScreen(index) {
  screens.forEach(screen => screen.classList.remove('active'));
  const targetScreen = screens[index - 1];
  targetScreen.classList.add('active');
  // Animate content inside the screen with enhanced transition
  gsap.fromTo(targetScreen.querySelector('.content > *'), 
    { opacity: 0, y: 30, scale: 0.95, stagger: 0.15 },
    { opacity: 1, y: 0, scale: 1, duration: 1, stagger: 0.15, ease: 'power3.out' }
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

// Enhanced Parallax for hero with multi-layer effect and added scale animation
gsap.to('.hero', {
  backgroundPosition: '50% 100%',
  scale: 1.05,
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

// MacBook rotation, scale, and glow with added parallax and pulse
const macbook = document.querySelector('.macbook');
ScrollTrigger.create({
  trigger: '.demo-container',
  start: 'top top',
  end: 'bottom bottom',
  scrub: true,
  onUpdate: (self) => {
    const progress = self.progress;
    const rotateY = -25 + (50 * progress); // Enhanced rotation range
    const scale = 0.9 + (0.2 * Math.sin(progress * Math.PI * 2)); // Stronger pulsing
    const glowIntensity = 0.3 + (0.4 * Math.abs(Math.sin(progress * Math.PI))); // Brighter glow
    macbook.style.transform = `perspective(2500px) rotateY(${rotateY}deg) scale(${scale}) translateY(${progress * 50}px)`; // Added parallax shift
    macbook.style.filter = `drop-shadow(0 0 ${glowIntensity * 30}px var(--accent))`;
  }
});

// Micro-interactions for buttons and nav links with rotation and shadow
document.querySelectorAll('.button, .navbar nav a').forEach(el => {
  el.addEventListener('mouseenter', () => {
    gsap.to(el, { scale: 1.1, rotation: 5, duration: 0.5, ease: 'elastic.out(1, 0.5)', boxShadow: '0 0 15px var(--accent)' });
  });
  el.addEventListener('mouseleave', () => {
    gsap.to(el, { scale: 1, rotation: 0, duration: 0.5, ease: 'elastic.out(1, 0.5)', boxShadow: 'none' });
  });
});

// Fade-in for pricing and contact sections with stagger and rotation
gsap.from('.pricing > *, .contact > *', {
  opacity: 0,
  y: 50,
  rotation: 10,
  duration: 1.2,
  stagger: 0.3,
  ease: 'power3.out',
  scrollTrigger: {
    trigger: '.pricing',
    start: 'top 80%',
    toggleActions: 'play none none reverse'
  }
});

// Hero content fade-in animation with enhanced stagger and bounce
gsap.from('.hero-content > *', {
  opacity: 0,
  y: 60,
  duration: 1.2,
  stagger: 0.25,
  ease: 'bounce.out'
});

// Particles for hero background with interactivity
particlesJS('particles-js', {
  "particles": {
    "number": {
      "value": 100, // Increased particles for more visual appeal
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
      "value": 0.6,
      "random": true,
      "anim": {
        "enable": true,
        "speed": 1,
        "opacity_min": 0.1,
        "sync": false
      }
    },
    "size": {
      "value": 4,
      "random": true,
      "anim": {
        "enable": true,
        "speed": 20,
        "size_min": 0.1,
        "sync": false
      }
    },
    "line_linked": {
      "enable": true,
      "distance": 150,
      "color": "#00aaff",
      "opacity": 0.5,
      "width": 1.5
    },
    "move": {
      "enable": true,
      "speed": 8, // Faster movement
      "direction": "none",
      "random": true,
      "straight": false,
      "out_mode": "bounce", // Bounce for more interaction
      "bounce": true,
      "attract": {
        "enable": true,
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
        "mode": "bubble" // Changed to bubble for cooler effect
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
        "distance": 300,
        "size": 50,
        "duration": 2,
        "opacity": 0.8,
        "speed": 3
      },
      "repulse": {
        "distance": 200,
        "duration": 0.4
      },
      "push": {
        "particles_nb": 6 // More particles on click
      },
      "remove": {
        "particles_nb": 2
      }
    }
  },
  "retina_detect": true
});

// Animate screenshots on scroll with rotation and scale
gsap.from('.gallery img', {
  opacity: 0,
  y: 100,
  rotation: -15,
  scale: 0.8,
  duration: 1.2,
  stagger: 0.25,
  ease: 'power4.out',
  scrollTrigger: {
    trigger: '.screenshots',
    start: 'top 85%',
    toggleActions: 'play none none reverse'
  }
});

// Add smooth section transitions
gsap.utils.toArray('section').forEach(section => {
  gsap.from(section, {
    opacity: 0,
    y: 50,
    duration: 1,
    ease: 'power2.inOut',
    scrollTrigger: {
      trigger: section,
      start: 'top 90%',
      toggleActions: 'play none none reverse'
    }
  });
});

// Hover effects for feature sections with scale and color shift
document.querySelectorAll('.feature-section').forEach(section => {
  section.addEventListener('mouseenter', () => {
    gsap.to(section, { scale: 1.05, backgroundColor: '#23272d', duration: 0.6, ease: 'power3.out' });
  });
  section.addEventListener('mouseleave', () => {
    gsap.to(section, { scale: 1, backgroundColor: 'var(--card)', duration: 0.6, ease: 'power3.out' });
  });
});
