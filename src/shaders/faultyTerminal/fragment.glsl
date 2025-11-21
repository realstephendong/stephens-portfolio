precision mediump float;

varying vec2 vUv;

uniform float iTime;
uniform vec3  iResolution;
uniform float uScale;

uniform vec2  uGridMul;
uniform float uDigitSize;
uniform float uScanlineIntensity;
uniform float uGlitchAmount;
uniform float uFlickerAmount;
uniform float uNoiseAmp;
uniform float uChromaticAberration;
uniform float uDither;
uniform float uCurvature;
uniform vec3  uTint;
uniform vec2  uMouse;
uniform float uMouseStrength;
uniform float uUseMouse;
uniform float uPageLoadProgress;
uniform float uUsePageLoadAnimation;
uniform float uBrightness;
uniform vec3 uBackgroundColor;

float time;

float hash21(vec2 p){
  p = fract(p * 234.56);
  p += dot(p, p + 34.56);
  return fract(p.x * p.y);
}

float noise(vec2 p)
{
  return sin(p.x * 10.0) * sin(p.y * (3.0 + sin(time * 0.090909))) + 0.2; 
}

mat2 rotate(float angle)
{
  float c = cos(angle);
  float s = sin(angle);
  return mat2(c, -s, s, c);
}

float fbm(vec2 p)
{
  p *= 1.1;
  float f = 0.0;
  float amp = 0.5 * uNoiseAmp;
  
  mat2 modify0 = rotate(time * 0.02);
  f += amp * noise(p);
  p = modify0 * p * 2.0;
  amp *= 0.454545;
  
  mat2 modify1 = rotate(time * 0.02);
  f += amp * noise(p);
  p = modify1 * p * 2.0;
  amp *= 0.454545;
  
  mat2 modify2 = rotate(time * 0.08);
  f += amp * noise(p);
  
  return f;
}

float pattern(vec2 p, out vec2 q, out vec2 r) {
  vec2 offset1 = vec2(1.0);
  vec2 offset0 = vec2(0.0);
  mat2 rot01 = rotate(0.1 * time);
  mat2 rot1 = rotate(0.1);
  
  q = vec2(fbm(p + offset1), fbm(rot01 * p + offset1));
  r = vec2(fbm(rot1 * q + offset0), fbm(q + offset0));
  return fbm(p + r);
}

// draw numbers using 5x5 pixel grid
float drawNumber(vec2 p, float num) {
    int col = int(floor(p.x * 5.0));
    int row = int(floor(p.y * 5.0));
    int n = int(floor(num));
    
    // Number 0
    if (n == 0) {
        if (row == 0) return (col >= 1 && col <= 3) ? 1.0 : 0.0;
        if (row == 1 || row == 2 || row == 3) return (col == 0 || col == 4) ? 1.0 : 0.0;
        if (row == 4) return (col >= 1 && col <= 3) ? 1.0 : 0.0;
    }
    // Number 1
    else if (n == 1) {
        if (row == 0) return (col == 2) ? 1.0 : 0.0;
        if (row == 1) return (col == 1 || col == 2) ? 1.0 : 0.0;
        if (row == 2 || row == 3) return (col == 2) ? 1.0 : 0.0;
        if (row == 4) return (col >= 1 && col <= 3) ? 1.0 : 0.0;
    }
    // Number 2
    else if (n == 2) {
        if (row == 0) return (col >= 1 && col <= 3) ? 1.0 : 0.0;
        if (row == 1) return (col == 0 || col == 4) ? 1.0 : 0.0;
        if (row == 2) return (col >= 2 && col <= 3) ? 1.0 : 0.0;
        if (row == 3) return (col == 1) ? 1.0 : 0.0;
        if (row == 4) return 1.0;
    }
    // Number 3
    else if (n == 3) {
        if (row == 0 || row == 4) return (col <= 3) ? 1.0 : 0.0;
        if (row == 1 || row == 3) return (col == 4) ? 1.0 : 0.0;
        if (row == 2) return (col >= 1 && col <= 3) ? 1.0 : 0.0;
    }
    // Number 4
    else if (n == 4) {
        if (row == 0 || row == 1) return (col == 0 || col == 3) ? 1.0 : 0.0;
        if (row == 2) return 1.0;
        if (row == 3 || row == 4) return (col == 3) ? 1.0 : 0.0;
    }
    // Number 5
    else if (n == 5) {
        if (row == 0) return 1.0;
        if (row == 1) return (col == 0) ? 1.0 : 0.0;
        if (row == 2) return (col <= 3) ? 1.0 : 0.0;
        if (row == 3) return (col == 4) ? 1.0 : 0.0;
        if (row == 4) return (col <= 3) ? 1.0 : 0.0;
    }
    // Number 6
    else if (n == 6) {
        if (row == 0 || row == 4) return (col >= 1 && col <= 3) ? 1.0 : 0.0;
        if (row == 1) return (col == 0) ? 1.0 : 0.0;
        if (row == 2) return (col <= 3) ? 1.0 : 0.0;
        if (row == 3) return (col == 0 || col == 4) ? 1.0 : 0.0;
    }
    // Number 7
    else if (n == 7) {
        if (row == 0) return 1.0;
        if (row == 1) return (col == 4) ? 1.0 : 0.0;
        if (row == 2) return (col == 3) ? 1.0 : 0.0;
        if (row == 3) return (col == 2) ? 1.0 : 0.0;
        if (row == 4) return (col == 1) ? 1.0 : 0.0;
    }
    // Number 8
    else if (n == 8) {
        if (row == 0 || row == 2 || row == 4) return (col >= 1 && col <= 3) ? 1.0 : 0.0;
        if (row == 1 || row == 3) return (col == 0 || col == 4) ? 1.0 : 0.0;
    }
    // Number 9
    else if (n == 9) {
        if (row == 0) return (col >= 1 && col <= 3) ? 1.0 : 0.0;
        if (row == 1) return (col == 0 || col == 4) ? 1.0 : 0.0;
        if (row == 2) return (col >= 1) ? 1.0 : 0.0;
        if (row == 3) return (col == 4) ? 1.0 : 0.0;
        if (row == 4) return (col >= 1 && col <= 3) ? 1.0 : 0.0;
    }
    
    return 0.0;
}

// Draw original distance-based shapes (circles, squares, stars)
float drawOriginalShape(vec2 p, float shapeType) {
    float px5 = p.x * 5.0;
    float py5 = (1.0 - p.y) * 5.0;
    float i = floor(py5) - 2.0;
    float j = floor(px5) - 2.0;
    float n = i * i + j * j;
    float f = n * 0.0625;
    
    // Different shape variations based on shapeType
    if (shapeType < 0.33) {
        // Original circles (concentric)
        return f;
    } else if (shapeType < 0.66) {
        // Square pattern (Chebyshev distance)
        float maxDist = max(abs(i), abs(j));
        return maxDist * maxDist * 0.0625;
    } else {
        // Star/diamond pattern
        float manhattanDist = abs(i) + abs(j);
        return manhattanDist * manhattanDist * 0.02;
    }
}

// Draw various symbols
float drawSymbol(vec2 p, float symbolType) {
    int col = int(floor(p.x * 5.0));
    int row = int(floor(p.y * 5.0));
    
    // Hash symbol (#)
    if (symbolType < 0.2) {
        return (col == 1 || col == 3 || row == 1 || row == 3) ? 1.0 : 0.0;
    }
    // Plus (+)
    else if (symbolType < 0.4) {
        return (col == 2 || row == 2) ? 1.0 : 0.0;
    }
    // X pattern
    else if (symbolType < 0.6) {
        return (col == row || col == 4 - row) ? 1.0 : 0.0;
    }
    // Asterisk (*)
    else if (symbolType < 0.8) {
        return (col == 2 || row == 2 || col == row || col == 4 - row) ? 1.0 : 0.0;
    }
    // Diamond
    else {
        float dist = abs(float(col - 2)) + abs(float(row - 2));
        return (dist <= 2.0) ? 1.0 : 0.0;
    }
}

float digit(vec2 p){
    vec2 grid = uGridMul * 15.0;
    vec2 s = floor(p * grid) / grid;
    p = p * grid;
    vec2 q, r;
    float intensity = pattern(s * 0.1, q, r) * 1.3 - 0.03;
    
    if(uUseMouse > 0.5){
        vec2 mouseWorld = uMouse * uScale;
        float distToMouse = distance(s, mouseWorld);
        float mouseInfluence = exp(-distToMouse * 8.0) * uMouseStrength * 10.0;
        intensity += mouseInfluence;
        
        float ripple = sin(distToMouse * 20.0 - iTime * 5.0) * 0.1 * mouseInfluence;
        intensity += ripple;
    }
    
    if(uUsePageLoadAnimation > 0.5){
        float cellRandom = fract(sin(dot(s, vec2(12.9898, 78.233))) * 43758.5453);
        float cellDelay = cellRandom * 0.8;
        float cellProgress = clamp((uPageLoadProgress - cellDelay) / 0.2, 0.0, 1.0);
        
        float fadeAlpha = smoothstep(0.0, 1.0, cellProgress);
        intensity *= fadeAlpha;
    }
    
    p = fract(p);
    p *= uDigitSize;
    
    // Determine what to draw for this cell
    float cellHash = fract(sin(dot(s, vec2(12.9898, 78.233))) * 43758.5453);
    float contentType = fract(cellHash * 7.123);
    
    float px5 = p.x * 5.0;
    float py5 = (1.0 - p.y) * 5.0;
    float x = fract(px5);
    float y = fract(py5);
    
    float shapeValue;
    float isOn;
    
    // 40% numbers, 25% symbols, 35% original shapes (circles/squares/stars)
    if (contentType < 0.4) {
        // Draw numbers 0-9
        float numChoice = floor(fract(cellHash * 11.456) * 10.0);
        shapeValue = drawNumber(vec2(p.x, 1.0 - p.y), numChoice);
        isOn = step(0.1, intensity) * shapeValue;
    } else if (contentType < 0.65) {
        // Draw various symbols
        float symbolChoice = fract(cellHash * 13.789);
        shapeValue = drawSymbol(vec2(p.x, 1.0 - p.y), symbolChoice);
        isOn = step(0.1, intensity) * shapeValue;
    } else {
        // Draw original shapes (circles, squares, stars)
        float shapeChoice = fract(cellHash * 17.234);
        float f = drawOriginalShape(p, shapeChoice);
        isOn = step(0.1, intensity - f);
    }
    
    float brightness = isOn * (0.2 + y * 0.8) * (0.75 + x * 0.25);
    
    return step(0.0, p.x) * step(p.x, 1.0) * step(0.0, p.y) * step(p.y, 1.0) * brightness;
}

float onOff(float a, float b, float c)
{
  return step(c, sin(iTime + a * cos(iTime * b))) * uFlickerAmount;
}

float displace(vec2 look)
{
    float y = look.y - mod(iTime * 0.25, 1.0);
    float window = 1.0 / (1.0 + 50.0 * y * y);
    return sin(look.y * 20.0 + iTime) * 0.0125 * onOff(4.0, 2.0, 0.8) * (1.0 + cos(iTime * 60.0)) * window;
}

vec3 getColor(vec2 p){
    
    float bar = step(mod(p.y + time * 20.0, 1.0), 0.2) * 0.4 + 1.0;
    bar *= uScanlineIntensity;
    
    float displacement = displace(p);
    p.x += displacement;

    if (uGlitchAmount != 1.0) {
      float extra = displacement * (uGlitchAmount - 1.0);
      p.x += extra;
    }

    float middle = digit(p);
    
    const float off = 0.002;
    float sum = digit(p + vec2(-off, -off)) + digit(p + vec2(0.0, -off)) + digit(p + vec2(off, -off)) +
                digit(p + vec2(-off, 0.0)) + digit(p + vec2(0.0, 0.0)) + digit(p + vec2(off, 0.0)) +
                digit(p + vec2(-off, off)) + digit(p + vec2(0.0, off)) + digit(p + vec2(off, off));
    
    vec3 baseColor = vec3(0.9) * middle + sum * 0.1 * vec3(1.0) * bar;
    return baseColor;
}

vec2 barrel(vec2 uv){
  vec2 c = uv * 2.0 - 1.0;
  float r2 = dot(c, c);
  c *= 1.0 + uCurvature * r2;
  return c * 0.5 + 0.5;
}

void main() {
    time = iTime * 0.333333;
    vec2 uv = vUv;

    if(uCurvature != 0.0){
      uv = barrel(uv);
    }
    
    vec2 p = uv * uScale;
    vec3 col = getColor(p);

    if(uChromaticAberration != 0.0){
      vec2 ca = vec2(uChromaticAberration) / iResolution.xy;
      col.r = getColor(p + ca).r;
      col.b = getColor(p - ca).b;
    }

    col *= uTint;
    col *= uBrightness;

    if(uDither > 0.0){
      float rnd = hash21(gl_FragCoord.xy);
      col += (rnd - 0.5) * (uDither * 0.003922);
    }

    // Add base background color to match page background (theme-aware)
    // Only replace pure black areas, keep the green patterns bright
    vec3 backgroundColor = uBackgroundColor;
    float luminance = dot(col, vec3(0.299, 0.587, 0.114));
    col = mix(backgroundColor, col, smoothstep(0.0, 0.02, luminance));

    gl_FragColor = vec4(col, 1.0);
}


