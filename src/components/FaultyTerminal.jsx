import { Renderer, Program, Mesh, Color, Triangle } from 'ogl';
import { useEffect, useRef, useMemo, useState } from 'react';
import vertexShader from '../shaders/faultyTerminal/vertex.glsl?raw';
import fragmentShader from '../shaders/faultyTerminal/fragment.glsl?raw';
import { useTheme } from './theme-provider';
import { isWebGLAvailable, prefersReducedMotion, getDeviceTier, getEffectDpr } from '../lib/gpu';

function hexToRgb(hex) {
  let h = String(hex ?? '#ffffff').replace('#', '').trim();
  if (h.length === 3)
    h = h
      .split('')
      .map(c => c + c)
      .join('');
  const num = parseInt(h, 16);
  if (!Number.isFinite(num)) return [1, 1, 1];
  return [((num >> 16) & 255) / 255, ((num >> 8) & 255) / 255, (num & 255) / 255];
}

function hslToRgb(h, s, l) {
  h = h / 360;
  s = s / 100;
  l = l / 100;

  const hue2rgb = (p, q, t) => {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1/6) return p + (q - p) * 6 * t;
    if (t < 1/2) return q;
    if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
    return p;
  };

  let r, g, b;
  if (s === 0) {
    r = g = b = l;
  } else {
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1/3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1/3);
  }

  return [r, g, b];
}

function StaticBackdrop({ theme, className, style }) {
  const tint = theme === 'light' ? 'rgba(0, 153, 255, 0.10)' : 'rgba(167, 239, 158, 0.08)';
  const base = theme === 'light' ? 'hsl(105, 30%, 95%)' : 'hsl(0, 0%, 4%)';
  return (
    <div
      aria-hidden="true"
      className={`w-full h-full relative overflow-hidden ${className ?? ''}`}
      style={{
        backgroundColor: base,
        backgroundImage: `radial-gradient(60% 60% at 50% 35%, ${tint} 0%, transparent 70%)`,
        ...style
      }}
    />
  );
}

export default function FaultyTerminal({
  scale = 1,
  gridMul = [2, 1],
  digitSize = 1.5,
  timeScale = 0.3,
  pause = false,
  scanlineIntensity = 0.3,
  glitchAmount = 1,
  flickerAmount = 1,
  noiseAmp = 1,
  chromaticAberration = 0,
  dither = 0,
  curvature = 0.2,
  tint = '#ffffff',
  mouseReact = true,
  mouseStrength = 0.2,
  dpr,
  pageLoadAnimation = true,
  brightness = 1,
  maxFps = 30,
  className,
  style,
  ...rest
}) {
  const { theme } = useTheme();

  const [caps] = useState(() => ({
    webgl: isWebGLAvailable(),
    reducedMotion: prefersReducedMotion(),
    tier: getDeviceTier()
  }));
  const [disabled, setDisabled] = useState(false);

  const effectiveDpr = dpr ?? getEffectDpr(caps.tier);
  const lowQuality = caps.tier === 'low';

  // Set theme-aware background color
  const themeBackgroundColor = useMemo(
    () => (theme === 'light' ? hslToRgb(105, 30, 95) : hslToRgb(0, 0, 4)),
    [theme]
  );

  const containerRef = useRef(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const smoothMouseRef = useRef({ x: 0.5, y: 0.5 });
  const rafRef = useRef(0);
  const visibleRef = useRef(true);
  const programRef = useRef(null);

  const tintVec = useMemo(() => hexToRgb(tint), [tint]);
  const ditherValue = useMemo(
    () => (typeof dither === 'boolean' ? (dither ? 1 : 0) : dither),
    [dither]
  );
  const gridMulX = gridMul?.[0] ?? 2;
  const gridMulY = gridMul?.[1] ?? 1;

  const propsRef = useRef();
  propsRef.current = {
    scale, digitSize, timeScale, pause, scanlineIntensity, glitchAmount,
    flickerAmount, noiseAmp, chromaticAberration, ditherValue, curvature,
    tintVec, mouseReact, mouseStrength, pageLoadAnimation, brightness,
    themeBackgroundColor, gridMulX, gridMulY, maxFps
  };

  const shouldRender = caps.webgl && !caps.reducedMotion && !disabled;

  useEffect(() => {
    const ctn = containerRef.current;
    if (!ctn || !shouldRender) return;

    let renderer;
    let program;
    let mesh;
    let canvas;
    let disposed = false;

    try {
      renderer = new Renderer({ dpr: effectiveDpr, alpha: false, antialias: false, depth: false });
      if (!renderer.gl) throw new Error('WebGL context unavailable');
    } catch (err) {
      console.warn('[FaultyTerminal] WebGL unavailable, falling back to static backdrop:', err);
      setDisabled(true);
      return;
    }

    const gl = renderer.gl;
    canvas = gl.canvas;
    gl.clearColor(0, 0, 0, 1);

    const p = propsRef.current;

    try {
      const geometry = new Triangle(gl);
      program = new Program(gl, {
        vertex: vertexShader,
        fragment: lowQuality ? `#define LOW_QUALITY 1\n${fragmentShader}` : fragmentShader,
        uniforms: {
          iTime: { value: 0 },
          iResolution: {
            value: new Color(gl.canvas.width, gl.canvas.height, gl.canvas.width / gl.canvas.height)
          },
          uScale: { value: p.scale },
          uGridMul: { value: new Float32Array([p.gridMulX, p.gridMulY]) },
          uDigitSize: { value: p.digitSize },
          uScanlineIntensity: { value: p.scanlineIntensity },
          uGlitchAmount: { value: p.glitchAmount },
          uFlickerAmount: { value: p.flickerAmount },
          uNoiseAmp: { value: p.noiseAmp },
          uChromaticAberration: { value: p.chromaticAberration },
          uDither: { value: p.ditherValue },
          uCurvature: { value: p.curvature },
          uTint: { value: new Color(p.tintVec[0], p.tintVec[1], p.tintVec[2]) },
          uMouse: {
            value: new Float32Array([smoothMouseRef.current.x, smoothMouseRef.current.y])
          },
          uMouseStrength: { value: p.mouseStrength },
          uUseMouse: { value: p.mouseReact ? 1 : 0 },
          uPageLoadProgress: { value: p.pageLoadAnimation ? 0 : 1 },
          uUsePageLoadAnimation: { value: p.pageLoadAnimation ? 1 : 0 },
          uBrightness: { value: p.brightness },
          uBackgroundColor: {
            value: new Color(p.themeBackgroundColor[0], p.themeBackgroundColor[1], p.themeBackgroundColor[2])
          }
        }
      });
      mesh = new Mesh(gl, { geometry, program });
      programRef.current = program;
    } catch (err) {
      console.warn('[FaultyTerminal] shader setup failed, falling back to static backdrop:', err);
      gl.getExtension('WEBGL_lose_context')?.loseContext();
      setDisabled(true);
      return;
    }

    const handleContextLost = e => {
      e.preventDefault();
      cancelAnimationFrame(rafRef.current);
      console.warn('[FaultyTerminal] WebGL context lost, falling back to static backdrop');
      if (!disposed) setDisabled(true);
    };
    canvas.addEventListener('webglcontextlost', handleContextLost);

    function resize() {
      if (!ctn || disposed) return;
      renderer.setSize(ctn.offsetWidth, ctn.offsetHeight);
      program.uniforms.iResolution.value = new Color(
        gl.canvas.width,
        gl.canvas.height,
        gl.canvas.width / gl.canvas.height
      );
    }

    let resizeRaf = 0;
    const resizeObserver = new ResizeObserver(() => {
      cancelAnimationFrame(resizeRaf);
      resizeRaf = requestAnimationFrame(resize);
    });
    resizeObserver.observe(ctn);
    resize();

    const intersectionObserver = new IntersectionObserver(
      entries => { visibleRef.current = entries[0]?.isIntersecting ?? true; },
      { threshold: 0 }
    );
    intersectionObserver.observe(ctn);

    const handleMouseMove = e => {
      // Use window dimensions for better tracking across the entire page
      mouseRef.current = {
        x: e.clientX / window.innerWidth,
        y: 1 - e.clientY / window.innerHeight
      };
    };

    const timeOffset = Math.random() * 100;
    let loadAnimationStart = 0;
    let frozenTime = 0;
    let lastDraw = 0;
    let slowFrames = 0;
    let steppedDown = false;

    const update = t => {
      rafRef.current = requestAnimationFrame(update);
      if (disposed) return;

      const cur = propsRef.current;
      const minFrameMs = 1000 / Math.max(1, cur.maxFps) - 4;
      if (t - lastDraw < minFrameMs) return;
      const frameDelta = lastDraw === 0 ? minFrameMs : t - lastDraw;
      lastDraw = t;

      if (!visibleRef.current) return;

      if (cur.pageLoadAnimation && loadAnimationStart === 0) loadAnimationStart = t;

      if (!cur.pause) {
        const elapsed = (t * 0.001 + timeOffset) * cur.timeScale;
        program.uniforms.iTime.value = elapsed;
        frozenTime = elapsed;
      } else {
        program.uniforms.iTime.value = frozenTime;
      }

      if (cur.pageLoadAnimation && loadAnimationStart > 0) {
        const progress = Math.min((t - loadAnimationStart) / 2000, 1);
        program.uniforms.uPageLoadProgress.value = progress;
      }

      if (cur.mouseReact) {
        const dampingFactor = 0.08;
        const smoothMouse = smoothMouseRef.current;
        const mouse = mouseRef.current;
        smoothMouse.x += (mouse.x - smoothMouse.x) * dampingFactor;
        smoothMouse.y += (mouse.y - smoothMouse.y) * dampingFactor;
        const mouseUniform = program.uniforms.uMouse.value;
        mouseUniform[0] = smoothMouse.x;
        mouseUniform[1] = smoothMouse.y;
      }

      renderer.render({ scene: mesh });

      if (frameDelta > minFrameMs * 3) {
        slowFrames += 1;
        if (slowFrames > 20) {
          if (!steppedDown) {
            steppedDown = true;
            slowFrames = 0;
            renderer.dpr = Math.max(0.5, renderer.dpr * 0.5);
            resize();
            console.warn('[FaultyTerminal] slow frames, reducing resolution');
          } else {
            console.warn('[FaultyTerminal] still slow, disabling animated backdrop');
            cancelAnimationFrame(rafRef.current);
            if (!disposed) setDisabled(true);
          }
        }
      } else if (slowFrames > 0) {
        slowFrames -= 1;
      }
    };

    rafRef.current = requestAnimationFrame(update);
    ctn.appendChild(canvas);
    // Listen to mouse events on window instead of container for full-page tracking
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      disposed = true;
      programRef.current = null;
      cancelAnimationFrame(rafRef.current);
      cancelAnimationFrame(resizeRaf);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      window.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('webglcontextlost', handleContextLost);
      if (canvas.parentElement === ctn) ctn.removeChild(canvas);
      gl.getExtension('WEBGL_lose_context')?.loseContext();
    };
  }, [shouldRender, effectiveDpr, lowQuality]);

  useEffect(() => {
    const program = programRef.current;
    if (!program) return;
    program.uniforms.uTint.value.set(tintVec[0], tintVec[1], tintVec[2]);
    program.uniforms.uBackgroundColor.value.set(
      themeBackgroundColor[0], themeBackgroundColor[1], themeBackgroundColor[2]
    );
  }, [tintVec, themeBackgroundColor]);

  if (!shouldRender) {
    return <StaticBackdrop theme={theme} className={className} style={style} {...rest} />;
  }

  return (
    <div
      ref={containerRef}
      className={`w-full h-full relative overflow-hidden ${className ?? ''}`}
      style={style}
      {...rest}
    />
  );
}
