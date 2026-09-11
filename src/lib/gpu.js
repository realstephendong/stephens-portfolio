let cachedSupport;

export function isWebGLAvailable() {
  if (cachedSupport !== undefined) return cachedSupport;
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    cachedSupport = false;
    return cachedSupport;
  }
  try {
    const canvas = document.createElement('canvas');
    const attrs = { failIfMajorPerformanceCaveat: false, depth: false, antialias: false };
    const gl = canvas.getContext('webgl2', attrs) || canvas.getContext('webgl', attrs);
    cachedSupport = !!gl;
    gl?.getExtension('WEBGL_lose_context')?.loseContext();
  } catch {
    cachedSupport = false;
  }
  return cachedSupport;
}

export function prefersReducedMotion() {
  if (typeof window === 'undefined' || !window.matchMedia) return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function getDeviceTier() {
  if (typeof navigator === 'undefined') return 'low';

  const cores = navigator.hardwareConcurrency || 2;
  const memory = navigator.deviceMemory || 4;
  const coarsePointer =
    typeof window !== 'undefined' &&
    window.matchMedia &&
    window.matchMedia('(pointer: coarse)').matches;

  if (cores <= 4 || memory <= 4 || coarsePointer) return 'low';
  if (cores <= 8 || memory <= 8) return 'medium';
  return 'high';
}

export function getEffectDpr(tier = getDeviceTier()) {
  const dpr = (typeof window !== 'undefined' && window.devicePixelRatio) || 1;
  if (tier === 'low') return 1;
  if (tier === 'medium') return Math.min(dpr, 1.25);
  return Math.min(dpr, 1.5);
}
