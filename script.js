const io = new IntersectionObserver(
  es => es.forEach(e => {
    if (e.isIntersecting) e.target.classList.add('in');
  }),
  { threshold: .08 }
);

document
  .querySelectorAll('section, article, .service-list article, .timeline article')
  .forEach(x => {
    x.classList.add('reveal');
    io.observe(x);
  });


// ============================================================
// HERO — BRÚJULA INTERACTIVA
// ============================================================

const heroSide = document.querySelector('.hero-side');
const compass = document.querySelector('.compass');

if (heroSide && compass) {

  let targetX = 0;
  let targetY = 0;
  let currentX = 0;
  let currentY = 0;
  let animationFrame;

  const prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;

  function animateCompass() {

    currentX += (targetX - currentX) * 0.08;
    currentY += (targetY - currentY) * 0.08;

    compass.style.setProperty('--rotate-x', `${currentY}deg`);
    compass.style.setProperty('--rotate-y', `${currentX}deg`);

    animationFrame = requestAnimationFrame(animateCompass);
  }

  if (!prefersReducedMotion) {
    animationFrame = requestAnimationFrame(animateCompass);

    heroSide.addEventListener('pointermove', event => {

      const rect = heroSide.getBoundingClientRect();

      const x = (event.clientX - rect.left) / rect.width;
      const y = (event.clientY - rect.top) / rect.height;

      // Movimiento muy sutil: máximo ±5 grados
      targetX = (x - 0.5) * 10;
      targetY = (0.5 - y) * 10;
    });

    heroSide.addEventListener('pointerleave', () => {
      targetX = 0;
      targetY = 0;
    });
  }

  // Evita dejar un requestAnimationFrame activo si la página cambia
  window.addEventListener('pagehide', () => {
    if (animationFrame) {
      cancelAnimationFrame(animationFrame);
    }
  });
}

const io = new IntersectionObserver(
  es => es.forEach(e => {
    if (e.isIntersecting) e.target.classList.add('in');
  }),
  { threshold: .08 }
);

document
  .querySelectorAll('section, article, .service-list article, .timeline article')
  .forEach(x => {
    x.classList.add('reveal');
    io.observe(x);
  });


// ============================================================
// HERO — INTERACTIVE IT RADAR
// ============================================================

const heroSide = document.querySelector('.hero-side');
const radar = document.querySelector('.radar');

if (heroSide && radar) {

  let targetX = 0;
  let targetY = 0;
  let currentX = 0;
  let currentY = 0;

  const reducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;

  function animateRadar() {

    currentX += (targetX - currentX) * 0.08;
    currentY += (targetY - currentY) * 0.08;

    radar.style.setProperty('--radar-x', `${currentY}deg`);
    radar.style.setProperty('--radar-y', `${currentX}deg`);

    requestAnimationFrame(animateRadar);
  }

  if (!reducedMotion) {

    requestAnimationFrame(animateRadar);

    heroSide.addEventListener('pointermove', event => {

      const rect = heroSide.getBoundingClientRect();

      const x = (event.clientX - rect.left) / rect.width;
      const y = (event.clientY - rect.top) / rect.height;

      // Movimiento máximo de 7 grados.
      targetX = (x - 0.5) * 14;
      targetY = (0.5 - y) * 14;
    });

    heroSide.addEventListener('pointerleave', () => {
      targetX = 0;
      targetY = 0;
    });
  }

  // ==========================================================
  // INTERACCIÓN CON LOS NODOS
  // ==========================================================

  const nodes = radar.querySelectorAll('.radar-node');

  nodes.forEach(node => {

    node.addEventListener('mouseenter', () => {

      const system = node.dataset.system;

      radar.dataset.active = system;

      const label = radar.querySelector(`.label-${system}`);

      if (label) {
        label.style.color = '#62a7ff';
      }
    });

    node.addEventListener('mouseleave', () => {

      radar.dataset.active = '';

      const system = node.dataset.system;
      const label = radar.querySelector(`.label-${system}`);

      if (label) {
        label.style.color = '';
      }
    });

    node.addEventListener('click', () => {

      nodes.forEach(item => {
        item.classList.remove('active');
      });

      node.classList.add('active');

      setTimeout(() => {
        node.classList.remove('active');
      }, 900);
    });

  });
}