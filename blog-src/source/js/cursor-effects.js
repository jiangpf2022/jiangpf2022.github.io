(function () {
  "use strict";

  const managerKey = "__blogCursorEffects";
  const previousManager = window[managerKey];

  if (previousManager && typeof previousManager.destroy === "function") {
    previousManager.destroy();
  }

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const finePointer = window.matchMedia("(pointer: fine)");
  const root = document.documentElement;
  const interactiveSelector = [
    "a",
    "button",
    "input",
    "textarea",
    "select",
    "summary",
    "[role='button']",
    ".right-bottom-tools",
  ].join(",");
  const lightPalette = [
    [21, 114, 224],
    [35, 195, 238],
    [255, 179, 71],
  ];
  const darkPalette = [
    [150, 221, 255],
    [92, 160, 255],
    [255, 218, 145],
  ];
  const maxParticles = 84;

  let canvas = null;
  let context = null;
  let animationFrame = 0;
  let active = false;
  let deviceScale = 1;
  let lastFrameTime = 0;
  let lastEmissionTime = 0;
  let lastEmissionX = 0;
  let lastEmissionY = 0;
  let themeMix = root.classList.contains("dark") ? 1 : 0;
  let particles = [];
  let ripples = [];

  const pointer = {
    x: 0,
    y: 0,
    renderedX: 0,
    renderedY: 0,
    visible: false,
    hovering: false,
    haloOpacity: 0,
  };

  const clamp = (value, minimum, maximum) =>
    Math.min(Math.max(value, minimum), maximum);

  const mix = (start, end, amount) =>
    Math.round(start + (end - start) * amount);

  const colorFor = (index, alpha) => {
    const light = lightPalette[index % lightPalette.length];
    const dark = darkPalette[index % darkPalette.length];
    const red = mix(light[0], dark[0], themeMix);
    const green = mix(light[1], dark[1], themeMix);
    const blue = mix(light[2], dark[2], themeMix);
    return `rgba(${red}, ${green}, ${blue}, ${clamp(alpha, 0, 1)})`;
  };

  const requestDraw = () => {
    if (!animationFrame && active) {
      animationFrame = window.requestAnimationFrame(draw);
    }
  };

  const resizeCanvas = () => {
    if (!canvas || !context) return;

    deviceScale = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(window.innerWidth * deviceScale);
    canvas.height = Math.round(window.innerHeight * deviceScale);
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;
    context.setTransform(deviceScale, 0, 0, deviceScale, 0, 0);
    requestDraw();
  };

  const addParticle = (x, y, options) => {
    if (particles.length >= maxParticles) {
      particles.shift();
    }

    const settings = options || {};
    const angle = settings.angle ?? Math.random() * Math.PI * 2;
    const speed = settings.speed ?? 0.18 + Math.random() * 0.34;
    const life = settings.life ?? 420 + Math.random() * 360;

    particles.push({
      x,
      y,
      velocityX: Math.cos(angle) * speed,
      velocityY: Math.sin(angle) * speed + (settings.lift ?? -0.035),
      size: settings.size ?? 1.2 + Math.random() * 2.2,
      life,
      remaining: life,
      paletteIndex: settings.paletteIndex ?? Math.floor(Math.random() * 3),
      rotation: Math.random() * Math.PI,
      rotationSpeed: (Math.random() - 0.5) * 0.006,
    });
  };

  const emitTrail = (x, y, eventTime) => {
    const movementX = x - lastEmissionX;
    const movementY = y - lastEmissionY;
    const distance = Math.hypot(movementX, movementY);

    if (eventTime - lastEmissionTime < 18 || distance < 7) return;

    const count = distance > 30 ? 2 : 1;
    const directionX = movementX / distance;
    const directionY = movementY / distance;
    const reverseAngle = Math.atan2(movementY, movementX) + Math.PI;

    for (let index = 0; index < count; index += 1) {
      const trailDistance = 5 + Math.random() * Math.min(distance * 0.38, 13);
      const sideScatter = (Math.random() - 0.5) * 6;
      addParticle(
        x - directionX * trailDistance - directionY * sideScatter,
        y - directionY * trailDistance + directionX * sideScatter,
        {
          angle: reverseAngle + (Math.random() - 0.5) * 0.42,
          speed: 0.11 + Math.random() * 0.2,
          lift: 0,
        },
      );
    }

    lastEmissionTime = eventTime;
    lastEmissionX = x;
    lastEmissionY = y;
  };

  const drawStar = (particle, opacity) => {
    const radius = particle.size;
    context.save();
    context.translate(particle.x, particle.y);
    context.rotate(particle.rotation);
    context.beginPath();
    context.moveTo(0, -radius);
    context.lineTo(radius * 0.26, -radius * 0.26);
    context.lineTo(radius, 0);
    context.lineTo(radius * 0.26, radius * 0.26);
    context.lineTo(0, radius);
    context.lineTo(-radius * 0.26, radius * 0.26);
    context.lineTo(-radius, 0);
    context.lineTo(-radius * 0.26, -radius * 0.26);
    context.closePath();
    context.fillStyle = colorFor(particle.paletteIndex, opacity);
    context.shadowColor = colorFor(particle.paletteIndex, opacity * 0.85);
    context.shadowBlur = radius * 3;
    context.fill();
    context.restore();
  };

  const drawHalo = () => {
    if (pointer.haloOpacity <= 0.002) return;

    const radius = pointer.hovering ? 30 : 19;
    const gradient = context.createRadialGradient(
      pointer.renderedX,
      pointer.renderedY,
      0,
      pointer.renderedX,
      pointer.renderedY,
      radius,
    );
    gradient.addColorStop(0, colorFor(1, pointer.haloOpacity * 0.23));
    gradient.addColorStop(0.55, colorFor(0, pointer.haloOpacity * 0.1));
    gradient.addColorStop(1, colorFor(0, 0));
    context.fillStyle = gradient;
    context.beginPath();
    context.arc(pointer.renderedX, pointer.renderedY, radius, 0, Math.PI * 2);
    context.fill();

    if (pointer.hovering) {
      context.strokeStyle = colorFor(1, pointer.haloOpacity * 0.38);
      context.lineWidth = 1;
      context.beginPath();
      context.arc(pointer.renderedX, pointer.renderedY, radius * 0.58, 0, Math.PI * 2);
      context.stroke();
    }
  };

  const draw = (timestamp) => {
    animationFrame = 0;
    if (!active || !context || !canvas) return;

    const delta = Math.min(timestamp - (lastFrameTime || timestamp), 34);
    lastFrameTime = timestamp;
    const targetThemeMix = root.classList.contains("dark") ? 1 : 0;
    const themeStep = 1 - Math.pow(0.001, delta / 900);
    themeMix += (targetThemeMix - themeMix) * themeStep;

    pointer.renderedX += (pointer.x - pointer.renderedX) * 0.34;
    pointer.renderedY += (pointer.y - pointer.renderedY) * 0.34;
    const targetHaloOpacity = pointer.visible ? 1 : 0;
    pointer.haloOpacity += (targetHaloOpacity - pointer.haloOpacity) * 0.2;

    context.clearRect(0, 0, canvas.width / deviceScale, canvas.height / deviceScale);
    drawHalo();

    particles = particles.filter((particle) => {
      particle.remaining -= delta;
      if (particle.remaining <= 0) return false;

      particle.x += particle.velocityX * delta;
      particle.y += particle.velocityY * delta;
      particle.velocityX *= Math.pow(0.986, delta / 16.67);
      particle.velocityY *= Math.pow(0.986, delta / 16.67);
      particle.rotation += particle.rotationSpeed * delta;
      const progress = particle.remaining / particle.life;
      const fadeIn = Math.min((1 - progress) * 7, 1);
      drawStar(particle, progress * fadeIn * 0.84);
      return true;
    });

    ripples = ripples.filter((ripple) => {
      ripple.remaining -= delta;
      if (ripple.remaining <= 0) return false;

      const progress = 1 - ripple.remaining / ripple.life;
      const radius = 7 + progress * 45;
      const opacity = Math.pow(1 - progress, 1.7);
      context.lineWidth = 1.6 - progress * 0.7;
      context.strokeStyle = colorFor(ripple.paletteIndex, opacity * 0.72);
      context.beginPath();
      context.arc(ripple.x, ripple.y, radius, 0, Math.PI * 2);
      context.stroke();

      context.lineWidth = 0.8;
      context.strokeStyle = colorFor((ripple.paletteIndex + 1) % 3, opacity * 0.4);
      context.beginPath();
      context.arc(ripple.x, ripple.y, radius * 0.63, 0, Math.PI * 2);
      context.stroke();
      return true;
    });

    const pointerSettled =
      Math.abs(pointer.x - pointer.renderedX) < 0.1 &&
      Math.abs(pointer.y - pointer.renderedY) < 0.1 &&
      Math.abs(targetHaloOpacity - pointer.haloOpacity) < 0.005;
    const themeSettled = Math.abs(targetThemeMix - themeMix) < 0.005;

    if (particles.length || ripples.length || !pointerSettled || !themeSettled) {
      requestDraw();
    }
  };

  const handlePointerMove = (event) => {
    if (event.pointerType === "touch") return;

    if (!pointer.visible) {
      pointer.renderedX = event.clientX;
      pointer.renderedY = event.clientY;
      lastEmissionX = event.clientX;
      lastEmissionY = event.clientY;
    }

    pointer.x = event.clientX;
    pointer.y = event.clientY;
    pointer.visible = true;
    pointer.hovering = Boolean(
      event.target instanceof Element && event.target.closest(interactiveSelector),
    );
    emitTrail(event.clientX, event.clientY, event.timeStamp);
    requestDraw();
  };

  const handlePointerDown = (event) => {
    if (event.pointerType === "touch") return;

    pointer.x = event.clientX;
    pointer.y = event.clientY;
    pointer.visible = true;
    const paletteIndex = root.classList.contains("dark") ? 2 : 1;
    ripples.push({
      x: event.clientX,
      y: event.clientY,
      life: 620,
      remaining: 620,
      paletteIndex,
    });

    for (let index = 0; index < 12; index += 1) {
      addParticle(event.clientX, event.clientY, {
        angle: (Math.PI * 2 * index) / 12 + (Math.random() - 0.5) * 0.14,
        speed: 0.28 + Math.random() * 0.34,
        size: 1.5 + Math.random() * 2.5,
        life: 480 + Math.random() * 360,
        paletteIndex: (paletteIndex + index) % 3,
      });
    }
    requestDraw();
  };

  const handleWheel = (event) => {
    if (!pointer.visible) return;

    const direction = event.deltaY > 0 ? -1 : 1;
    for (let index = 0; index < 3; index += 1) {
      addParticle(pointer.x + (Math.random() - 0.5) * 14, pointer.y, {
        angle: direction > 0 ? -Math.PI / 2 : Math.PI / 2,
        speed: 0.24 + Math.random() * 0.22,
        size: 1 + Math.random() * 1.8,
        life: 360 + Math.random() * 220,
        paletteIndex: 2,
      });
    }
    requestDraw();
  };

  const handlePointerLeave = () => {
    pointer.visible = false;
    pointer.hovering = false;
    requestDraw();
  };

  const handleVisibilityChange = () => {
    if (document.hidden) {
      if (animationFrame) window.cancelAnimationFrame(animationFrame);
      animationFrame = 0;
      lastFrameTime = 0;
    } else {
      requestDraw();
    }
  };

  const deactivate = () => {
    if (!active) return;

    active = false;
    if (animationFrame) window.cancelAnimationFrame(animationFrame);
    animationFrame = 0;
    window.removeEventListener("pointermove", handlePointerMove);
    window.removeEventListener("pointerdown", handlePointerDown);
    window.removeEventListener("pointerleave", handlePointerLeave);
    window.removeEventListener("wheel", handleWheel);
    window.removeEventListener("resize", resizeCanvas);
    document.removeEventListener("visibilitychange", handleVisibilityChange);
    particles = [];
    ripples = [];
    if (canvas) canvas.remove();
    canvas = null;
    context = null;
  };

  const activate = () => {
    if (active || reducedMotion.matches || !finePointer.matches) return;

    canvas = document.createElement("canvas");
    canvas.className = "blog-cursor-effects";
    canvas.setAttribute("aria-hidden", "true");
    document.body.append(canvas);
    context = canvas.getContext("2d");

    if (!context) {
      canvas.remove();
      canvas = null;
      return;
    }

    active = true;
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerdown", handlePointerDown, { passive: true });
    window.addEventListener("pointerleave", handlePointerLeave, { passive: true });
    window.addEventListener("wheel", handleWheel, { passive: true });
    window.addEventListener("resize", resizeCanvas, { passive: true });
    document.addEventListener("visibilitychange", handleVisibilityChange);
    resizeCanvas();
  };

  const handlePreferenceChange = () => {
    if (reducedMotion.matches || !finePointer.matches) {
      deactivate();
    } else {
      activate();
    }
  };

  reducedMotion.addEventListener("change", handlePreferenceChange);
  finePointer.addEventListener("change", handlePreferenceChange);
  activate();

  window[managerKey] = {
    destroy() {
      deactivate();
      reducedMotion.removeEventListener("change", handlePreferenceChange);
      finePointer.removeEventListener("change", handlePreferenceChange);
    },
  };
})();
