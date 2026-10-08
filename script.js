// ============================================================
// NORDECH — SITE INTERACTIONS
// ============================================================


// ============================================================
// SCROLL REVEAL
// ============================================================

const revealObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
      }
    });
  },
  { threshold: 0.08 }
);

document
  .querySelectorAll(
    'section, article, .service-list article, .timeline article'
  )
  .forEach(element => {
    element.classList.add('reveal');
    revealObserver.observe(element);
  });


// ============================================================
// HERO — INTERACTIVE IT RADAR
// ============================================================

const heroSide = document.querySelector('.hero-side');
const radar = document.querySelector('.radar');

if (heroSide && radar) {

  // ----------------------------------------------------------
  // 3D movement
  // ----------------------------------------------------------

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

    radar.style.setProperty(
      '--radar-x',
      `${currentY}deg`
    );

    radar.style.setProperty(
      '--radar-y',
      `${currentX}deg`
    );

    requestAnimationFrame(animateRadar);
  }

  if (!reducedMotion) {

    requestAnimationFrame(animateRadar);

    heroSide.addEventListener('pointermove', event => {

      const rect = heroSide.getBoundingClientRect();

      const x =
        (event.clientX - rect.left) / rect.width;

      const y =
        (event.clientY - rect.top) / rect.height;

      targetX = (x - 0.5) * 14;
      targetY = (0.5 - y) * 14;
    });

    heroSide.addEventListener('pointerleave', () => {
      targetX = 0;
      targetY = 0;
    });
  }


  // ----------------------------------------------------------
  // RADAR SWEEP
  // ----------------------------------------------------------

  let sweep = radar.querySelector('.radar-sweep');

  if (!sweep) {
    sweep = document.createElement('div');
    sweep.className = 'radar-sweep';
    radar.appendChild(sweep);
  }

  let angle = 0;
  let lastTime = performance.now();

  // 72º por segundo = 5 segundos por vuelta
  const sweepSpeed = 54;

  const nodes = [
    ...radar.querySelectorAll('.radar-node')
  ];

  function normalizeAngle(value) {
    value %= 360;

    if (value < 0) {
      value += 360;
    }

    return value;
  }

  function getAngle(node, radarRect) {

    const nodeRect =
      node.getBoundingClientRect();

    const radarCenterX =
      radarRect.left + radarRect.width / 2;

    const radarCenterY =
      radarRect.top + radarRect.height / 2;

    const nodeCenterX =
      nodeRect.left + nodeRect.width / 2;

    const nodeCenterY =
      nodeRect.top + nodeRect.height / 2;

    const dx =
      nodeCenterX - radarCenterX;

    const dy =
      nodeCenterY - radarCenterY;

    /*
     * 0º = arriba
     * 90º = derecha
     * 180º = abajo
     * 270º = izquierda
     */
    return normalizeAngle(
      Math.atan2(dx, -dy) * 180 / Math.PI
    );
  }

  function angleDifference(a, b) {

    const difference = Math.abs(a - b);

    return Math.min(
      difference,
      360 - difference
    );
  }

  function detectNode(node) {

    node.classList.remove('is-detected');

    const system =
      node.dataset.system;

    const label =
      radar.querySelector(
        `.label-${system}`
      );

    if (label) {
      label.classList.remove('is-detected');
    }

    /*
     * Forzamos un pequeño reflow para que
     * la animación pueda volver a dispararse.
     */
    void node.offsetWidth;

    node.classList.add('is-detected');

    if (label) {
      label.classList.add('is-detected');
    }

    /*
     * Se apaga después de un momento.
     */
    setTimeout(() => {

      node.classList.remove('is-detected');

      if (label) {
        label.classList.remove('is-detected');
      }

    }, 1200);
  }

  function animateSweep(time) {

    const delta =
      Math.min(time - lastTime, 50);

    lastTime = time;

    angle =
      normalizeAngle(
        angle +
        sweepSpeed * delta / 1000
      );

    /*
     * Giramos el cono del radar.
     */
    sweep.style.transform =
      `rotate(${angle}deg)`;

    const radarRect =
      radar.getBoundingClientRect();

    nodes.forEach(node => {

      const nodeAngle =
        getAngle(node, radarRect);

      const difference =
        angleDifference(
          angle,
          nodeAngle
        );

      /*
       * El sweep acaba de pasar por el nodo.
       */
      if (difference < 2.5) {

        const lastDetection =
          Number(
            node.dataset.lastDetection || 0
          );

        /*
         * Evitamos que un nodo se dispare
         * varias veces durante el mismo barrido.
         */
        if (time - lastDetection > 1800) {

          node.dataset.lastDetection =
            time;

          detectNode(node);
        }
      }

    });

    requestAnimationFrame(
      animateSweep
    );
  }

  if (!reducedMotion) {
    requestAnimationFrame(
      animateSweep
    );
  }


  // ----------------------------------------------------------
  // NODE INTERACTION
  // ----------------------------------------------------------

  nodes.forEach(node => {

    node.addEventListener(
      'mouseenter',
      () => {

        const system =
          node.dataset.system;

        radar.dataset.active =
          system;

        const label =
          radar.querySelector(
            `.label-${system}`
          );

        if (label) {
          label.style.color =
            '#62a7ff';
        }
      }
    );

    node.addEventListener(
      'mouseleave',
      () => {

        radar.dataset.active = '';

        const system =
          node.dataset.system;

        const label =
          radar.querySelector(
            `.label-${system}`
          );

        if (label) {
          label.style.color = '';
        }
      }
    );

    node.addEventListener(
      'click',
      () => {

        nodes.forEach(item => {
          item.classList.remove('active');
        });

        node.classList.add('active');

        setTimeout(() => {
          node.classList.remove('active');
        }, 900);
      }
    );

  });

}