import { useEffect, useMemo, useRef, useCallback } from 'react';
import { useGesture } from '@use-gesture/react';
import './DomeGallery.css';

// Constants
const DEFAULTS = {
  maxVerticalRotationDeg: 5,
  dragSensitivity: 20,
  enlargeTransitionMs: 300,
  segments: 26,
  maxVelocity: 1.4,
  tapThreshold: { mouse: 6, touch: 10 },
  animationDelays: { hoverEnter: 400, pulseStart: 400 },
  dragThreshold: 16,
  frictionMultiplier: 0.94,
  stopThreshold: 0.015,
  maxFrames: 90
};

// Utility functions
const clamp = (value, min, max) => Math.min(Math.max(value, min), max);
const normalizeAngle = (degrees) => ((degrees % 360) + 360) % 360;
const wrapAngleSigned = (degrees) => {
  const angle = (((degrees + 180) % 360) + 360) % 360;
  return angle - 180;
};

const getDataNumber = (element, name, fallback) => {
  const attr = element.dataset[name] ?? element.getAttribute(`data-${name}`);
  const number = attr == null ? NaN : parseFloat(attr);
  return Number.isFinite(number) ? number : fallback;
};

// Grid configuration
const GRID_CONFIG = {
  xStart: -37,
  xStep: 2,
  evenYs: [-4, -2, 0, 2, 4],
  oddYs: [-3, -1, 1, 3, 5],
  defaultSize: { x: 2, y: 2 }
};

const normalizeImage = (image) => {
  if (typeof image === 'string') {
    return { src: image, alt: '' };
  }
  return { src: image.src || '', alt: image.alt || '' };
};

const distributeImages = (images, totalSlots) => {
  const normalizedImages = images.map(normalizeImage);
  const usedImages = Array.from({ length: totalSlots }, (_, i) => 
    normalizedImages[i % normalizedImages.length]
  );

  // Avoid consecutive duplicate images
  for (let i = 1; i < usedImages.length; i++) {
    if (usedImages[i].src === usedImages[i - 1].src) {
      for (let j = i + 1; j < usedImages.length; j++) {
        if (usedImages[j].src !== usedImages[i].src) {
          [usedImages[i], usedImages[j]] = [usedImages[j], usedImages[i]];
          break;
        }
      }
    }
  }

  return usedImages;
};

const buildItems = (images, segments) => {
  const xCols = Array.from({ length: segments }, (_, i) => 
    GRID_CONFIG.xStart + i * GRID_CONFIG.xStep
  );

  const coords = xCols.flatMap((x, columnIndex) => {
    const ys = columnIndex % 2 === 0 ? GRID_CONFIG.evenYs : GRID_CONFIG.oddYs;
    return ys.map(y => ({ 
      x, 
      y, 
      sizeX: GRID_CONFIG.defaultSize.x, 
      sizeY: GRID_CONFIG.defaultSize.y 
    }));
  });

  const totalSlots = coords.length;
  
  if (images.length === 0) {
    return coords.map(coord => ({ ...coord, src: '', alt: '' }));
  }
  
  if (images.length > totalSlots) {
    console.warn(
      `[DomeGallery] Provided image count (${images.length}) exceeds available tiles (${totalSlots}). Some images will not be shown.`
    );
  }

  const usedImages = distributeImages(images, totalSlots);

  return coords.map((coord, index) => ({
    ...coord,
    src: usedImages[index].src,
    alt: usedImages[index].alt
  }));
};

const computeItemBaseRotation = (offsetX, offsetY, sizeX, sizeY, segments) => {
  const unit = 360 / segments / 2;
  return {
    rotateX: unit * (offsetY - (sizeY - 1) / 2),
    rotateY: unit * (offsetX + (sizeX - 1) / 2)
  };
};

export default function DomeGallery({
  images = [],
  fit = 1,
  fitBasis = 'auto',
  minRadius = 600,
  maxRadius = Infinity,
  padFactor = 0.25,
  overlayBlurColor = '#060010',
  maxVerticalRotationDeg = DEFAULTS.maxVerticalRotationDeg,
  dragSensitivity = DEFAULTS.dragSensitivity,
  enlargeTransitionMs = DEFAULTS.enlargeTransitionMs,
  segments = DEFAULTS.segments,
  dragDampening = 2,
  openedImageWidth = '400px',
  openedImageHeight = '400px',
  imageBorderRadius = '30px',
  openedImageBorderRadius = '30px',
  grayscale = true,
  autoRotate = false,
  autoRotateSpeed = 0.04
}) {
  // DOM refs
  const refs = {
    root: useRef(null),
    main: useRef(null),
    sphere: useRef(null),
    frame: useRef(null),
    viewer: useRef(null),
    scrim: useRef(null)
  };

  // State refs
  const state = {
    rotation: useRef({ x: 0, y: 0 }),
    startRotation: useRef({ x: 0, y: 0 }),
    startPosition: useRef(null),
    focusedElement: useRef(null),
    originalTilePosition: useRef(null),
    lockedRadius: useRef(null)
  };

  // Interaction refs
  const interaction = {
    dragging: useRef(false),
    cancelTap: useRef(false),
    moved: useRef(false),
    pointerType: useRef('mouse'),
    tapTarget: useRef(null),
    opening: useRef(false),
    openStartedAt: useRef(0),
    lastDragEndAt: useRef(0),
    scrollLocked: useRef(false)
  };

  // Animation refs
  const animations = {
    inertiaRAF: useRef(null),
    autoRotateRAF: useRef(null)
  };
  const lockScroll = useCallback(() => {
    if (interaction.scrollLocked.current) return;
    interaction.scrollLocked.current = true;
    document.body.classList.add('dg-scroll-lock');
  }, []);

  const unlockScroll = useCallback(() => {
    if (!interaction.scrollLocked.current) return;
    if (refs.root.current?.getAttribute('data-enlarging') === 'true') return;
    interaction.scrollLocked.current = false;
    document.body.classList.remove('dg-scroll-lock');
  }, []);

  const items = useMemo(() => buildItems(images, segments), [images, segments]);

  const applyTransform = useCallback((xDeg, yDeg) => {
    const element = refs.sphere.current;
    if (element) {
      element.style.transform = `translateZ(calc(var(--radius) * -1)) rotateX(${xDeg}deg) rotateY(${yDeg}deg)`;
    }
  }, []);

  useEffect(() => {
    const root = refs.root.current;
    if (!root) return;
    const ro = new ResizeObserver(entries => {
      const cr = entries[0].contentRect;
      const w = Math.max(1, cr.width),
        h = Math.max(1, cr.height);
      const minDim = Math.min(w, h),
        maxDim = Math.max(w, h),
        aspect = w / h;
      let basis;
      switch (fitBasis) {
        case 'min':
          basis = minDim;
          break;
        case 'max':
          basis = maxDim;
          break;
        case 'width':
          basis = w;
          break;
        case 'height':
          basis = h;
          break;
        default:
          basis = aspect >= 1.3 ? w : minDim;
      }
      let radius = basis * fit;
      const heightGuard = h * 1.35;
      radius = Math.min(radius, heightGuard);
      radius = clamp(radius, minRadius, maxRadius);
      state.lockedRadius.current = Math.round(radius);

      const viewerPad = Math.max(8, Math.round(minDim * padFactor));
      root.style.setProperty('--radius', `${state.lockedRadius.current}px`);
      root.style.setProperty('--viewer-pad', `${viewerPad}px`);
      root.style.setProperty('--overlay-blur-color', overlayBlurColor);
      root.style.setProperty('--tile-radius', imageBorderRadius);
      root.style.setProperty('--enlarge-radius', openedImageBorderRadius);
      root.style.setProperty('--image-filter', grayscale ? 'grayscale(1)' : 'none');
      applyTransform(state.rotation.current.x, state.rotation.current.y);

      const enlargedOverlay = refs.viewer.current?.querySelector('.enlarge');
      if (enlargedOverlay && refs.frame.current && refs.main.current) {
        const frameR = refs.frame.current.getBoundingClientRect();
        const mainR = refs.main.current.getBoundingClientRect();

        const hasCustomSize = openedImageWidth && openedImageHeight;
        if (hasCustomSize) {
          const tempDiv = document.createElement('div');
          tempDiv.style.cssText = `position: absolute; width: ${openedImageWidth}; height: ${openedImageHeight}; visibility: hidden;`;
          document.body.appendChild(tempDiv);
          const tempRect = tempDiv.getBoundingClientRect();
          document.body.removeChild(tempDiv);

          const centeredLeft = frameR.left - mainR.left + (frameR.width - tempRect.width) / 2;
          const centeredTop = frameR.top - mainR.top + (frameR.height - tempRect.height) / 2;

          enlargedOverlay.style.left = `${centeredLeft}px`;
          enlargedOverlay.style.top = `${centeredTop}px`;
        } else {
          enlargedOverlay.style.left = `${frameR.left - mainR.left}px`;
          enlargedOverlay.style.top = `${frameR.top - mainR.top}px`;
          enlargedOverlay.style.width = `${frameR.width}px`;
          enlargedOverlay.style.height = `${frameR.height}px`;
        }
      }
    });
    ro.observe(root);
    return () => ro.disconnect();
  }, [
    fit,
    fitBasis,
    minRadius,
    maxRadius,
    padFactor,
    overlayBlurColor,
    grayscale,
    imageBorderRadius,
    openedImageBorderRadius,
    openedImageWidth,
    openedImageHeight
  ]);

  useEffect(() => {
    applyTransform(state.rotation.current.x, state.rotation.current.y);
  }, [applyTransform]);

  // Auto-rotation effect
  useEffect(() => {
    if (!autoRotate) return;

    const startAutoRotate = () => {
      const animate = () => {
        if (animations.autoRotateRAF.current) {
          state.rotation.current.y += autoRotateSpeed;
          applyTransform(state.rotation.current.x, state.rotation.current.y);
          animations.autoRotateRAF.current = requestAnimationFrame(animate);
        }
      };
      animations.autoRotateRAF.current = requestAnimationFrame(animate);
    };

    const stopAutoRotate = () => {
      if (animations.autoRotateRAF.current) {
        cancelAnimationFrame(animations.autoRotateRAF.current);
        animations.autoRotateRAF.current = null;
      }
    };

    // Start auto-rotation
    startAutoRotate();

    // Stop auto-rotation when user interacts
    const handleInteraction = () => {
      stopAutoRotate();
      // Restart after a delay
      setTimeout(() => {
        if (autoRotate && !interaction.dragging.current && !state.focusedElement.current) {
          startAutoRotate();
        }
      }, 3000);
    };

    const main = refs.main.current;
    if (main) {
      main.addEventListener('mousedown', handleInteraction);
      main.addEventListener('touchstart', handleInteraction);
    }

    return () => {
      stopAutoRotate();
      if (main) {
        main.removeEventListener('mousedown', handleInteraction);
        main.removeEventListener('touchstart', handleInteraction);
      }
    };
  }, [autoRotate, autoRotateSpeed]);

  const stopInertia = useCallback(() => {
    if (animations.inertiaRAF.current) {
      cancelAnimationFrame(animations.inertiaRAF.current);
      animations.inertiaRAF.current = null;
    }
  }, []);

  const startInertia = useCallback(
    (vx, vy) => {
      let vX = clamp(vx, -DEFAULTS.maxVelocity, DEFAULTS.maxVelocity) * 80;
      let vY = clamp(vy, -DEFAULTS.maxVelocity, DEFAULTS.maxVelocity) * 80;
      let frames = 0;
      const dampening = clamp(dragDampening ?? 0.6, 0, 1);
      const frictionMultiplier = DEFAULTS.frictionMultiplier + 0.055 * dampening;
      const stopThreshold = DEFAULTS.stopThreshold - 0.01 * dampening;
      const maxFrames = Math.round(DEFAULTS.maxFrames + 270 * dampening);
      
      const step = () => {
        vX *= frictionMultiplier;
        vY *= frictionMultiplier;
        
        if (Math.abs(vX) < stopThreshold && Math.abs(vY) < stopThreshold) {
          animations.inertiaRAF.current = null;
          return;
        }
        
        if (++frames > maxFrames) {
          animations.inertiaRAF.current = null;
          return;
        }
        
        const nextX = clamp(
          state.rotation.current.x - vY / 200, 
          -maxVerticalRotationDeg, 
          maxVerticalRotationDeg
        );
        const nextY = wrapAngleSigned(state.rotation.current.y + vX / 200);
        
        state.rotation.current = { x: nextX, y: nextY };
        applyTransform(nextX, nextY);
        animations.inertiaRAF.current = requestAnimationFrame(step);
      };
      
      stopInertia();
      animations.inertiaRAF.current = requestAnimationFrame(step);
    },
    [dragDampening, maxVerticalRotationDeg, stopInertia, applyTransform]
  );

  useGesture(
    {
      onDragStart: ({ event }) => {
        if (state.focusedElement.current) return;
        stopInertia();

        interaction.pointerType.current = event.pointerType || 'mouse';
        if (interaction.pointerType.current === 'touch') {
          event.preventDefault();
          lockScroll();
        }
        
        interaction.dragging.current = true;
        interaction.cancelTap.current = false;
        interaction.moved.current = false;
        state.startRotation.current = { ...state.rotation.current };
        state.startPosition.current = { x: event.clientX, y: event.clientY };
        
        const potential = event.target.closest?.('.item__image');
        interaction.tapTarget.current = potential || null;
      },
      onDrag: ({ event, last, velocity: velArr = [0, 0], direction: dirArr = [0, 0], movement }) => {
        if (state.focusedElement.current || !interaction.dragging.current || !state.startPosition.current) return;

        if (interaction.pointerType.current === 'touch') event.preventDefault();

        const dxTotal = event.clientX - state.startPosition.current.x;
        const dyTotal = event.clientY - state.startPosition.current.y;

        if (!interaction.moved.current) {
          const dist2 = dxTotal * dxTotal + dyTotal * dyTotal;
          if (dist2 > DEFAULTS.dragThreshold) interaction.moved.current = true;
        }

        const nextX = clamp(
          state.startRotation.current.x - dyTotal / dragSensitivity,
          -maxVerticalRotationDeg,
          maxVerticalRotationDeg
        );
        const nextY = state.startRotation.current.y + dxTotal / dragSensitivity;

        const current = state.rotation.current;
        if (current.x !== nextX || current.y !== nextY) {
          state.rotation.current = { x: nextX, y: nextY };
          applyTransform(nextX, nextY);
        }

        if (last) {
          interaction.dragging.current = false;
          let isTap = false;

          if (state.startPosition.current) {
            const dx = event.clientX - state.startPosition.current.x;
            const dy = event.clientY - state.startPosition.current.y;
            const dist2 = dx * dx + dy * dy;
            const tapThreshold = interaction.pointerType.current === 'touch' 
              ? DEFAULTS.tapThreshold.touch 
              : DEFAULTS.tapThreshold.mouse;
            if (dist2 <= tapThreshold * tapThreshold) {
              isTap = true;
            }
          }

          let [vMagX, vMagY] = velArr;
          const [dirX, dirY] = dirArr;
          let vx = vMagX * dirX;
          let vy = vMagY * dirY;

          if (!isTap && Math.abs(vx) < 0.001 && Math.abs(vy) < 0.001 && Array.isArray(movement)) {
            const [mx, my] = movement;
            vx = (mx / dragSensitivity) * 0.02;
            vy = (my / dragSensitivity) * 0.02;
          }

          if (!isTap && (Math.abs(vx) > 0.005 || Math.abs(vy) > 0.005)) {
            startInertia(vx, vy);
          }
          
          state.startPosition.current = null;
          interaction.cancelTap.current = !isTap;

          if (isTap && interaction.tapTarget.current && !state.focusedElement.current) {
            openItemFromElement(interaction.tapTarget.current);
          }
          interaction.tapTarget.current = null;

          if (interaction.cancelTap.current) {
            setTimeout(() => (interaction.cancelTap.current = false), 120);
          }
          if (interaction.moved.current) {
            interaction.lastDragEndAt.current = performance.now();
          }
          interaction.moved.current = false;
          if (interaction.pointerType.current === 'touch') unlockScroll();
        }
      }
    },
    { target: refs.main, eventOptions: { passive: false } }
  );

  useEffect(() => {
    const scrim = refs.scrim.current;
    if (!scrim) return;

    const close = () => {
      if (performance.now() - interaction.openStartedAt.current < 250) return;
      const element = state.focusedElement.current;
      if (!element) return;
      const parent = element.parentElement;
      const overlay = refs.viewer.current?.querySelector('.enlarge');
      if (!overlay) return;

      const refDiv = parent.querySelector('.item__image--reference');
      const originalPos = state.originalTilePosition.current;
      if (!originalPos) {
        overlay.remove();
        if (refDiv) refDiv.remove();
        parent.style.setProperty('--rot-y-delta', `0deg`);
        parent.style.setProperty('--rot-x-delta', `0deg`);
        element.style.visibility = '';
        element.style.zIndex = 0;
        state.focusedElement.current = null;
        refs.root.current?.removeAttribute('data-enlarging');
        interaction.opening.current = false;
        return;
      }

      const currentRect = overlay.getBoundingClientRect();
      const rootRect = refs.root.current.getBoundingClientRect();

      const originalPosRelativeToRoot = {
        left: originalPos.left - rootRect.left,
        top: originalPos.top - rootRect.top,
        width: originalPos.width,
        height: originalPos.height
      };

      const overlayRelativeToRoot = {
        left: currentRect.left - rootRect.left,
        top: currentRect.top - rootRect.top,
        width: currentRect.width,
        height: currentRect.height
      };

      const animatingOverlay = document.createElement('div');
      animatingOverlay.className = 'enlarge-closing';
      animatingOverlay.style.cssText = `
        position: absolute;
        left: ${overlayRelativeToRoot.left}px;
        top: ${overlayRelativeToRoot.top}px;
        width: ${overlayRelativeToRoot.width}px;
        height: ${overlayRelativeToRoot.height}px;
        z-index: 9999;
        border-radius: ${openedImageBorderRadius};
        overflow: hidden;
        box-shadow: 0 10px 30px rgba(0,0,0,.35);
        transition: all ${enlargeTransitionMs}ms ease-out;
        pointer-events: none;
        margin: 0;
        transform: none;
        filter: ${grayscale ? 'grayscale(1)' : 'none'};
      `;

      const originalImg = overlay.querySelector('img');
      if (originalImg) {
        const img = originalImg.cloneNode();
        img.style.cssText = 'width: 100%; height: 100%; object-fit: cover;';
        animatingOverlay.appendChild(img);
      }

      overlay.remove();
      refs.root.current.appendChild(animatingOverlay);

      void animatingOverlay.getBoundingClientRect();

      requestAnimationFrame(() => {
        animatingOverlay.style.left = originalPosRelativeToRoot.left + 'px';
        animatingOverlay.style.top = originalPosRelativeToRoot.top + 'px';
        animatingOverlay.style.width = originalPosRelativeToRoot.width + 'px';
        animatingOverlay.style.height = originalPosRelativeToRoot.height + 'px';
        animatingOverlay.style.opacity = '0';
      });

      const cleanup = () => {
        animatingOverlay.remove();
        state.originalTilePosition.current = null;

        if (refDiv) refDiv.remove();
        parent.style.transition = 'none';
        element.style.transition = 'none';

        parent.style.setProperty('--rot-y-delta', `0deg`);
        parent.style.setProperty('--rot-x-delta', `0deg`);

        requestAnimationFrame(() => {
          element.style.visibility = '';
          element.style.opacity = '0';
          element.style.zIndex = 0;
          state.focusedElement.current = null;
          refs.root.current?.removeAttribute('data-enlarging');

          requestAnimationFrame(() => {
            parent.style.transition = '';
            element.style.transition = 'opacity 300ms ease-out';

            requestAnimationFrame(() => {
              element.style.opacity = '1';
              setTimeout(() => {
                element.style.transition = '';
                element.style.opacity = '';
                interaction.opening.current = false;
                if (!interaction.dragging.current && refs.root.current?.getAttribute('data-enlarging') !== 'true')
                  document.body.classList.remove('dg-scroll-lock');
              }, 300);
            });
          });
        });
      };

      animatingOverlay.addEventListener('transitionend', cleanup, {
        once: true
      });
    };

    scrim.addEventListener('click', close);
    const onKey = e => {
      if (e.key === 'Escape') close();
    };
    window.addEventListener('keydown', onKey);

    return () => {
      scrim.removeEventListener('click', close);
      window.removeEventListener('keydown', onKey);
    };
  }, [enlargeTransitionMs, openedImageBorderRadius, grayscale]);

  const openItemFromElement = (element) => {
    if (interaction.opening.current) return;
    interaction.opening.current = true;
    interaction.openStartedAt.current = performance.now();
    lockScroll();
    const parent = element.parentElement;
    state.focusedElement.current = element;
    element.setAttribute('data-focused', 'true');

    const offsetX = getDataNumber(parent, 'offsetX', 0);
    const offsetY = getDataNumber(parent, 'offsetY', 0);
    const sizeX = getDataNumber(parent, 'sizeX', 2);
    const sizeY = getDataNumber(parent, 'sizeY', 2);

    const parentRot = computeItemBaseRotation(offsetX, offsetY, sizeX, sizeY, segments);
    const parentY = normalizeAngle(parentRot.rotateY);
    const globalY = normalizeAngle(state.rotation.current.y);
    let rotY = -(parentY + globalY) % 360;
    if (rotY < -180) rotY += 360;
    const rotX = -parentRot.rotateX - state.rotation.current.x;

    parent.style.setProperty('--rot-y-delta', `${rotY}deg`);
    parent.style.setProperty('--rot-x-delta', `${rotX}deg`);

    const refDiv = document.createElement('div');
    refDiv.className = 'item__image item__image--reference opacity-0';
    refDiv.style.transform = `rotateX(${-parentRot.rotateX}deg) rotateY(${-parentRot.rotateY}deg)`;
    parent.appendChild(refDiv);

    void refDiv.offsetHeight;

    const tileR = refDiv.getBoundingClientRect();
    const mainR = refs.main.current?.getBoundingClientRect();
    const frameR = refs.frame.current?.getBoundingClientRect();

    if (!mainR || !frameR || tileR.width <= 0 || tileR.height <= 0) {
      interaction.opening.current = false;
      state.focusedElement.current = null;
      parent.removeChild(refDiv);
      unlockScroll();
      return;
    }

    state.originalTilePosition.current = {
      left: tileR.left,
      top: tileR.top,
      width: tileR.width,
      height: tileR.height
    };

    element.style.visibility = 'hidden';
    element.style.zIndex = 0;

    const overlay = document.createElement('div');
    overlay.className = 'enlarge';
    overlay.style.position = 'absolute';
    overlay.style.left = frameR.left - mainR.left + 'px';
    overlay.style.top = frameR.top - mainR.top + 'px';
    overlay.style.width = frameR.width + 'px';
    overlay.style.height = frameR.height + 'px';
    overlay.style.opacity = '0';
    overlay.style.zIndex = '30';
    overlay.style.willChange = 'transform, opacity';
    overlay.style.transformOrigin = 'top left';
    overlay.style.transition = `transform ${enlargeTransitionMs}ms ease, opacity ${enlargeTransitionMs}ms ease`;
    overlay.style.borderRadius = openedImageBorderRadius;
    overlay.style.overflow = 'hidden';
    overlay.style.boxShadow = '0 10px 30px rgba(0,0,0,.35)';

    const rawSrc = parent.dataset.src || element.querySelector('img')?.src || '';
    const rawAlt = parent.dataset.alt || element.querySelector('img')?.alt || '';
    const img = document.createElement('img');
    img.src = rawSrc;
    img.alt = rawAlt;
    img.style.width = '100%';
    img.style.height = '100%';
    img.style.objectFit = 'cover';
    img.style.filter = grayscale ? 'grayscale(1)' : 'none';
    overlay.appendChild(img);
    refs.viewer.current.appendChild(overlay);

    const tx0 = tileR.left - frameR.left;
    const ty0 = tileR.top - frameR.top;
    const sx0 = tileR.width / frameR.width;
    const sy0 = tileR.height / frameR.height;

    const validSx0 = isFinite(sx0) && sx0 > 0 ? sx0 : 1;
    const validSy0 = isFinite(sy0) && sy0 > 0 ? sy0 : 1;

    overlay.style.transform = `translate(${tx0}px, ${ty0}px) scale(${validSx0}, ${validSy0})`;

    setTimeout(() => {
      if (!overlay.parentElement) return;
      overlay.style.opacity = '1';
      overlay.style.transform = 'translate(0px, 0px) scale(1, 1)';
      refs.root.current?.setAttribute('data-enlarging', 'true');
    }, 16);

    const wantsResize = openedImageWidth || openedImageHeight;
    if (wantsResize) {
      const onFirstEnd = ev => {
        if (ev.propertyName !== 'transform') return;
        overlay.removeEventListener('transitionend', onFirstEnd);
        const prevTransition = overlay.style.transition;
        overlay.style.transition = 'none';
        const tempWidth = openedImageWidth || `${frameR.width}px`;
        const tempHeight = openedImageHeight || `${frameR.height}px`;
        overlay.style.width = tempWidth;
        overlay.style.height = tempHeight;
        const newRect = overlay.getBoundingClientRect();
        overlay.style.width = frameR.width + 'px';
        overlay.style.height = frameR.height + 'px';
        void overlay.offsetWidth;
        overlay.style.transition = `left ${enlargeTransitionMs}ms ease, top ${enlargeTransitionMs}ms ease, width ${enlargeTransitionMs}ms ease, height ${enlargeTransitionMs}ms ease`;
        const centeredLeft = frameR.left - mainR.left + (frameR.width - newRect.width) / 2;
        const centeredTop = frameR.top - mainR.top + (frameR.height - newRect.height) / 2;
        requestAnimationFrame(() => {
          overlay.style.left = `${centeredLeft}px`;
          overlay.style.top = `${centeredTop}px`;
          overlay.style.width = tempWidth;
          overlay.style.height = tempHeight;
        });
        const cleanupSecond = () => {
          overlay.removeEventListener('transitionend', cleanupSecond);
          overlay.style.transition = prevTransition;
        };
        overlay.addEventListener('transitionend', cleanupSecond, {
          once: true
        });
      };
      overlay.addEventListener('transitionend', onFirstEnd);
    }
  };

  useEffect(() => {
    return () => {
      document.body.classList.remove('dg-scroll-lock');
    };
  }, []);

  return (
    <>
      <div
        ref={refs.root}
        className="sphere-root relative w-full h-full"
        style={{
          ['--segments-x']: segments,
          ['--segments-y']: segments,
          ['--overlay-blur-color']: overlayBlurColor,
          ['--tile-radius']: imageBorderRadius,
          ['--enlarge-radius']: openedImageBorderRadius,
          ['--image-filter']: grayscale ? 'grayscale(1)' : 'none'
        }}
      >
        <main
          ref={refs.main}
          className="absolute inset-0 grid place-items-center overflow-hidden select-none bg-transparent"
          style={{
            touchAction: 'none',
            WebkitUserSelect: 'none'
          }}
        >
          <div className="stage">
            <div ref={refs.sphere} className="sphere">
              {items.map((it, i) => (
                <div
                  key={`${it.x},${it.y},${i}`}
                  className="sphere-item absolute m-auto"
                  data-src={it.src}
                  data-alt={it.alt}
                  data-offset-x={it.x}
                  data-offset-y={it.y}
                  data-size-x={it.sizeX}
                  data-size-y={it.sizeY}
                  style={{
                    ['--offset-x']: it.x,
                    ['--offset-y']: it.y,
                    ['--item-size-x']: it.sizeX,
                    ['--item-size-y']: it.sizeY,
                    top: '-999px',
                    bottom: '-999px',
                    left: '-999px',
                    right: '-999px'
                  }}
                >
                  <div
                    className="item__image absolute block overflow-hidden cursor-pointer bg-gray-200"
                    role="button"
                    tabIndex={0}
                    aria-label={it.alt || 'Open image'}
                    onClick={e => {
                      if (interaction.dragging.current) return;
                      if (interaction.moved.current) return;
                      if (performance.now() - interaction.lastDragEndAt.current < 80) return;
                      if (interaction.opening.current) return;
                      openItemFromElement(e.currentTarget);
                    }}
                    onPointerUp={e => {
                      if (e.pointerType !== 'touch') return;
                      if (interaction.dragging.current) return;
                      if (interaction.moved.current) return;
                      if (performance.now() - interaction.lastDragEndAt.current < 80) return;
                      if (interaction.opening.current) return;
                      openItemFromElement(e.currentTarget);
                    }}
                    style={{
                      inset: '10px',
                      borderRadius: `var(--tile-radius, ${imageBorderRadius})`,
                      backfaceVisibility: 'hidden'
                    }}
                  >
                    <img
                      src={it.src}
                      draggable={false}
                      alt={it.alt}
                      className="w-full h-full object-cover pointer-events-none"
                      style={{
                        backfaceVisibility: 'hidden',
                        filter: `var(--image-filter, ${grayscale ? 'grayscale(1)' : 'none'})`
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div
            className="absolute inset-0 m-auto z-[3] pointer-events-none"
            style={{
              backgroundImage: `radial-gradient(rgba(235, 235, 235, 0) 40%, var(--overlay-blur-color, ${overlayBlurColor}) 100%)`
            }}
          />

          <div
            className="absolute inset-0 m-auto z-[3] pointer-events-none"
            style={{
              WebkitMaskImage: `radial-gradient(rgba(235, 235, 235, 0) 40%, var(--overlay-blur-color, ${overlayBlurColor}) 80%)`,
              maskImage: `radial-gradient(rgba(235, 235, 235, 0) 40%, var(--overlay-blur-color, ${overlayBlurColor}) 80%)`,
              backdropFilter: 'blur(3px)'
            }}
          />

          <div
            className="absolute left-0 right-0 top-0 h-[200px] z-[5] pointer-events-none rotate-180"
            style={{
              background: `linear-gradient(to bottom, transparent, var(--overlay-blur-color, ${overlayBlurColor}))`
            }}
          />
          <div
            className="absolute left-0 right-0 bottom-0 h-[200px] z-[5] pointer-events-none"
            style={{
              background: `linear-gradient(to bottom, transparent, var(--overlay-blur-color, ${overlayBlurColor}))`
            }}
          />

          <div
            ref={refs.viewer}
            className="absolute inset-0 z-20 pointer-events-none flex items-center justify-center"
            style={{ padding: 'var(--viewer-pad)' }}
          >
            <div
              ref={refs.scrim}
              className="scrim absolute inset-0 z-10 pointer-events-none opacity-0 transition-opacity duration-500"
              style={{
                background: 'rgba(0, 0, 0, 0.4)',
                backdropFilter: 'blur(3px)'
              }}
            />
            <div
              ref={refs.frame}
              className="viewer-frame h-full aspect-square flex"
              style={{ borderRadius: `var(--enlarge-radius, ${openedImageBorderRadius})` }}
            />
          </div>
        </main>
      </div>
    </>
  );
}