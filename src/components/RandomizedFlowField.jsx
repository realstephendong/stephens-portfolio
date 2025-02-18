import React, { useEffect, useRef, useState } from 'react';

// Color utility functions
const hexToRgb = (hex) => {
  hex = hex.replace(/^#/, '');
  
  let r, g, b;
  if (hex.length === 3) {
    r = parseInt(hex.charAt(0) + hex.charAt(0), 16);
    g = parseInt(hex.charAt(1) + hex.charAt(1), 16);
    b = parseInt(hex.charAt(2) + hex.charAt(2), 16);
  } else {
    r = parseInt(hex.substring(0, 2), 16);
    g = parseInt(hex.substring(2, 4), 16);
    b = parseInt(hex.substring(4, 6), 16);
  }
  
  return { r, g, b };
};

const rgbToHsl = (r, g, b) => {
  r /= 255;
  g /= 255;
  b /= 255;
  
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h, s, l = (max + min) / 2;
  
  if (max === min) {
    h = s = 0; // achromatic
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
      default: h = 0;
    }
    
    h /= 6;
  }
  
  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100)
  };
};

const extractHSL = (color) => {
  // Already HSL format
  const hslMatch = color.match(/hsla?\((\d+)[\s,]+(\d+)%[\s,]+(\d+)%/i);
  if (hslMatch) {
    return {
      h: parseInt(hslMatch[1]),
      s: parseInt(hslMatch[2]),
      l: parseInt(hslMatch[3])
    };
  }
  
  // RGB format
  const rgbMatch = color.match(/rgba?\((\d+)[\s,]+(\d+)[\s,]+(\d+)/i);
  if (rgbMatch) {
    return rgbToHsl(
      parseInt(rgbMatch[1]),
      parseInt(rgbMatch[2]),
      parseInt(rgbMatch[3])
    );
  }
  
  // Hex format
  if (color.startsWith('#')) {
    const { r, g, b } = hexToRgb(color);
    return rgbToHsl(r, g, b);
  }
  
  // Default fallback
  return { h: 250, s: 70, l: 60 };
};

const RandomizedFlowField = () => {
  const canvasRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const mousePositionRef = useRef({ x: null, y: null });
  const animationRef = useRef(null);
  const timeRef = useRef(0);
  const particlesRef = useRef([]);
  const themeStateRef = useRef({
    isDark: true,
    colors: {
      primary: { h: 250, s: 70, l: 60 },
      background: { r: 10, g: 15, b: 25 }
    }
  });
  
  // Configuration parameters with randomness-friendly values
  const config = {
    particleCount: 800,
    baseSpeed: 1.2,
    noiseScale: 0.002,
    flowStrength: 0.8,
    particleSize: 1.8,
    mouseInfluence: 200,
    mouseForce: 6,
    particleOpacity: {
      light: 0.5,
      dark: 0.6
    },
    glowSize: 8,
    glowOpacity: {
      light: 0.4,
      dark: 0.5
    },
    minVelocity: 0.03,
    drawBuffer: 50,
    maxSpeed: 1.6,
    inertia: 0.92, // Lower inertia for more responsive random changes
    randomJitter: 0.08, // Base random jitter amount
    randomDirectionChangeChance: 0.003, // Chance for sudden direction changes
    individualBehaviorFactor: 1.2 // How much individual particles differ in behavior
  };

  // Handle window resize and mouse movement
  useEffect(() => {
    const updateDimensions = () => {
      if (canvasRef.current?.parentElement) {
        setDimensions({
          width: canvasRef.current.parentElement.offsetWidth,
          height: canvasRef.current.parentElement.offsetHeight
        });
      }
    };

    const handleMouseMove = (event) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      
      const rect = canvas.getBoundingClientRect();
      mousePositionRef.current = {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
      };
    };
    
    const handleMouseLeave = () => {
      mousePositionRef.current = { x: null, y: null };
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('resize', updateDimensions);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  // Monitor theme changes
  useEffect(() => {
    const detectTheme = () => {
      // Check if document has 'dark' class - this is how the ThemeProvider sets theme
      const isDark = document.documentElement.classList.contains('dark');

      // Get computed CSS variables
      const computedStyle = getComputedStyle(document.documentElement);
      const primaryColor = computedStyle.getPropertyValue('--primary').trim() || '#8257e5';
      
      // Extract primary color HSL
      const primaryHsl = extractHSL(primaryColor);
      
      // Set background color based on theme
      const bgRgb = isDark 
        ? { r: 10, g: 15, b: 25 }   // Dark theme background
        : { r: 255, g: 255, b: 255 }; // Light theme - pure white background
      
      // Update theme state
      themeStateRef.current = {
        isDark,
        colors: {
          primary: primaryHsl,
          background: bgRgb
        }
      };
      
      // Reinitialize particle properties with new theme
      initializeParticleProperties();
    };
    
    // Detect theme initially
    detectTheme();
    
    // Set up mutation observer to detect class changes on <html> element
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          detectTheme();
        }
      });
    });
    
    observer.observe(document.documentElement, { 
      attributes: true,
      attributeFilter: ['class'] 
    });
    
    // Also listen for system theme preference changes
    const prefersColorScheme = window.matchMedia('(prefers-color-scheme: dark)');
    const handleSystemThemeChange = () => {
      // Only trigger if system theme is active (no explicit light/dark class)
      const hasExplicitTheme = 
        document.documentElement.classList.contains('light') ||
        document.documentElement.classList.contains('dark');
        
      if (!hasExplicitTheme) {
        detectTheme();
      }
    };
    
    prefersColorScheme.addEventListener('change', handleSystemThemeChange);
    
    return () => {
      observer.disconnect();
      prefersColorScheme.removeEventListener('change', handleSystemThemeChange);
    };
  }, []);

  // Compute particle properties based on theme
  const initializeParticleProperties = () => {
    if (particlesRef.current.length === 0) return;
    
    const { isDark, colors } = themeStateRef.current;
    const { primary } = colors;
    
    // More random color variations
    const baseHue = primary.h; 
    const hueVariation = isDark ? 40 : 180; // Much wider color range

    particlesRef.current.forEach(particle => {
      // Random hue variation for each particle
      const hueOffset = (Math.random() * 2 - 1) * hueVariation;
      const hue = ((baseHue + hueOffset + 360) % 360);
      
      // More varied saturation and lightness
      let saturation, lightness;
      
      if (isDark) {
        // Dark theme colors - more varied
        saturation = Math.min(100, primary.s + Math.random() * 30 - 10);
        lightness = Math.min(90, primary.l + Math.random() * 25 - 5);
      } else {
        // Light theme - vibrant, varied colors
        saturation = 70 + Math.random() * 30; // 70-100% saturation
        lightness = 25 + Math.random() * 35;  // 25-60% lightness with more variation
      }
      
      particle.color = {
        hue,
        saturation,
        lightness
      };
      
      // Opacity values based on theme with individual variation
      const opacityVariation = Math.random() * 0.3;
      particle.opacity = {
        particle: (isDark ? config.particleOpacity.dark : config.particleOpacity.light) * (0.85 + opacityVariation),
        glow: (isDark ? config.glowOpacity.dark : config.glowOpacity.light) * (0.85 + opacityVariation)
      };
    });
  };

  // Initialize particles with fully random distribution
  useEffect(() => {
    if (dimensions.width === 0 || dimensions.height === 0) return;
    
    const particles = [];
    
    for (let i = 0; i < config.particleCount; i++) {
      // Fully random positions
      const x = Math.random() * dimensions.width;
      const y = Math.random() * dimensions.height;
      
      // Random initial velocity (direction and magnitude)
      const speed = 0.05 + Math.random() * 0.2;
      const angle = Math.random() * Math.PI * 2;
      
      particles.push({
        x: x,
        y: y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: 0.5 + Math.random() * config.particleSize * 1.5,
        phaseOffset: Math.random() * 2,
        harmonic: 0.7 + Math.random() * 3.5,
        // Random behavior characteristics for more varied movement
        flowAdherence: 0.4 + Math.random() * 1.2, // How much it follows the flow field
        jitterAmount: Math.random() * config.randomJitter * 2, // Individual jitter amount
        directionChangeFrequency: Math.random() * config.randomDirectionChangeChance * 3, // Individual chance of direction change
        speedVariability: 0.7 + Math.random() * 0.6 // How much speed varies
      });
    }
    
    particlesRef.current = particles;
    initializeParticleProperties();
  }, [dimensions, config.particleCount]);

  // Animation loop with randomized flow field
  useEffect(() => {
    if (!canvasRef.current || dimensions.width === 0 || particlesRef.current.length === 0) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d', { alpha: false });
    
    canvas.width = dimensions.width;
    canvas.height = dimensions.height;

    // Randomized flow field noise function
    const flowNoise = (x, y, t, harmonic) => {
      // Normalize coordinates for wrapping
      const normalizedX = ((x % dimensions.width) + dimensions.width) % dimensions.width;
      const normalizedY = ((y % dimensions.height) + dimensions.height) % dimensions.height;
      
      const scale = config.noiseScale;
      const nx = normalizedX * scale;
      const ny = normalizedY * scale;
      const nt = t * 0.1;
      
      // More complex combinations with varied frequencies and random components
      const baseX = 
        Math.sin(nx + nt * 0.2) * Math.cos(ny + nt * 0.3) * 0.4 +
        Math.sin(nx * 2.7 + nt * 0.15) * Math.cos(ny * 3.2 + nt * 0.25) * 0.3 +
        Math.sin(nx * 5.3 + nt * 0.08) * Math.cos(ny * 4.9 + nt * 0.12) * 0.2 +
        Math.sin(nx * 8.1 + nt * 0.03) * Math.cos(ny * 7.6 + nt * 0.06) * 0.1 +
        // Pure random component
        (Math.random() - 0.5) * 0.4;
      
      const baseY = 
        Math.cos(nx - nt * 0.15) * Math.sin(ny + nt * 0.25) * 0.4 +
        Math.cos(nx * 3.1 - nt * 0.07) * Math.sin(ny * 2.9 + nt * 0.14) * 0.3 +
        Math.cos(nx * 6.2 - nt * 0.04) * Math.sin(ny * 5.8 + nt * 0.09) * 0.2 +
        Math.cos(nx * 9.4 - nt * 0.02) * Math.sin(ny * 8.7 + nt * 0.04) * 0.1 +
        // Pure random component
        (Math.random() - 0.5) * 0.4;
      
      // Add chaotic harmonics with random influence
      const harmonicScale = scale * harmonic * (1 + Math.random() * 0.5);
      const harmonicX = Math.sin(normalizedX * harmonicScale + nt * 0.18 + Math.random()) * 
                       Math.cos(normalizedY * harmonicScale - nt * 0.13 + Math.random()) * 0.4;
      const harmonicY = Math.cos(normalizedX * harmonicScale + nt * 0.12 + Math.random()) * 
                       Math.sin(normalizedY * harmonicScale + nt * 0.17 + Math.random()) * 0.4;
      
      // Add periodic disruptions based on time
      const disruptionFactor = Math.sin(t * 0.23) * 0.3;
      
      return {
        x: baseX + harmonicX + disruptionFactor * Math.sin(nx * ny * 0.01 + t),
        y: baseY + harmonicY + disruptionFactor * Math.cos(nx * ny * 0.01 - t)
      };
    };
    
    // Wrap particle coordinates for seamless edges
    const wrapParticle = (particle) => {
      const w = dimensions.width;
      const h = dimensions.height;
      
      // Wrap x-coordinate
      if (particle.x < 0) {
        particle.x += w;
      } else if (particle.x >= w) {
        particle.x -= w;
      }
      
      // Wrap y-coordinate
      if (particle.y < 0) {
        particle.y += h;
      } else if (particle.y >= h) {
        particle.y -= h;
      }
    };
    
    // Draw particle function remains the same
    const drawParticle = (x, y, particle, ctx, isDark) => {
      const { hue, saturation, lightness } = particle.color;
      const { particle: particleOpacity, glow: glowOpacity } = particle.opacity;
      
      // Calculate glow size
      const glowSize = particle.size * config.glowSize * (isDark ? 1 : 0.7);
      
      // Add shadows in light theme
      if (!isDark) {
        ctx.shadowColor = `hsla(${hue}, ${saturation}%, 20%, 0.3)`;
        ctx.shadowBlur = glowSize * 0.4;
      }
      
      // Draw glow
      const glow = ctx.createRadialGradient(
        x, y, 0,
        x, y, glowSize
      );
      
      if (!isDark) {
        // Light theme gradient
        glow.addColorStop(0, `hsla(${hue}, ${saturation}%, ${lightness}%, ${glowOpacity * 1.5})`);
        glow.addColorStop(0.5, `hsla(${hue}, ${saturation}%, ${lightness}%, ${glowOpacity * 0.5})`);
        glow.addColorStop(1, `hsla(${hue}, ${saturation}%, ${lightness}%, 0)`);
      } else {
        // Dark theme gradient
        glow.addColorStop(0, `hsla(${hue}, ${saturation}%, ${lightness}%, ${glowOpacity})`);
        glow.addColorStop(1, `hsla(${hue}, ${saturation}%, ${lightness}%, 0)`);
      }
      
      ctx.beginPath();
      ctx.fillStyle = glow;
      ctx.arc(x, y, glowSize, 0, Math.PI * 2);
      ctx.fill();
      
      // Draw particle core
      ctx.beginPath();
      ctx.arc(x, y, particle.size, 0, Math.PI * 2);
      
      // Adjust core brightness
      const adjustedLightness = !isDark ? Math.max(30, lightness - 15) : lightness;
      ctx.fillStyle = `hsla(${hue}, ${saturation}%, ${adjustedLightness}%, ${particleOpacity * 1.2})`;
      ctx.fill();
      
      // Reset shadow
      if (!isDark) {
        ctx.shadowColor = 'transparent';
        ctx.shadowBlur = 0;
      }
    };
    
    const animate = () => {
      // Increment time
      timeRef.current += 0.004;
      const t = timeRef.current;
      const { colors, isDark } = themeStateRef.current;
      
      // Get background color
      const { r, g, b } = colors.background;
      
      // Clear the canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Set blending mode based on theme
      ctx.globalCompositeOperation = isDark ? 'lighter' : 'source-over';
      
      // Capture current mouse position
      const mousePosition = mousePositionRef.current;
      
      // Update and draw particles with randomized behavior
      particlesRef.current.forEach(particle => {
        // Get flow field direction
        const flow = flowNoise(
          particle.x, 
          particle.y, 
          t, 
          particle.harmonic
        );
        
        // Calculate base velocity from flow field
        const baseVx = flow.x * config.flowStrength * particle.flowAdherence;
        const baseVy = flow.y * config.flowStrength * particle.flowAdherence;
        
        // Enhanced randomness in velocity
        const randomVx = (Math.random() - 0.5) * particle.jitterAmount;
        const randomVy = (Math.random() - 0.5) * particle.jitterAmount;
        
        // Apply mouse influence
        let mouseVx = 0;
        let mouseVy = 0;
        
        if (mousePosition.x !== null && mousePosition.y !== null) {
          const dx = mousePosition.x - particle.x;
          const dy = mousePosition.y - particle.y;
          const distToMouse = Math.sqrt(dx * dx + dy * dy);
          
          if (distToMouse < config.mouseInfluence) {
            // Gradual falloff with individual variation
            const strength = Math.max(0, (config.mouseInfluence - distToMouse) / config.mouseInfluence);
            // Different particles react differently to mouse
            const forceFactor = strength * strength * config.mouseForce * (0.7 + Math.random() * 0.6);
            
            // Normalize direction and apply force in OPPOSITE direction (repulsion)
            const dist = Math.max(distToMouse, 5);
            mouseVx = -(dx / dist) * forceFactor; // Negative sign for repulsion
            mouseVy = -(dy / dist) * forceFactor; // Negative sign for repulsion
          }
        }
        
        // Update velocity with individual inertia factors
        const particleInertia = config.inertia * (0.9 + Math.random() * 0.2);
        particle.vx = particle.vx * particleInertia + (baseVx + randomVx + mouseVx) * (1 - particleInertia);
        particle.vy = particle.vy * particleInertia + (baseVy + randomVy + mouseVy) * (1 - particleInertia);
        
        // Ensure minimum velocity
        const speed = Math.sqrt(particle.vx * particle.vx + particle.vy * particle.vy);
        if (speed < config.minVelocity) {
          const angle = Math.atan2(particle.vy, particle.vx) || Math.random() * Math.PI * 2;
          particle.vx = Math.cos(angle) * config.minVelocity;
          particle.vy = Math.sin(angle) * config.minVelocity;
        }
        
        // Randomly introduce sudden direction changes
        if (Math.random() < particle.directionChangeFrequency) {
          const newAngle = Math.random() * Math.PI * 2;
          const newSpeed = speed * particle.speedVariability;
          particle.vx = Math.cos(newAngle) * newSpeed;
          particle.vy = Math.sin(newAngle) * newSpeed;
        }
        
        // Limit maximum speed (with individual variation)
        const maxParticleSpeed = config.maxSpeed * particle.speedVariability;
        if (speed > maxParticleSpeed) {
          particle.vx = (particle.vx / speed) * maxParticleSpeed;
          particle.vy = (particle.vy / speed) * maxParticleSpeed;
        }
        
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;
        
        // Apply seamless wrapping
        wrapParticle(particle);
        
        // Draw the particle - main position
        drawParticle(particle.x, particle.y, particle, ctx, isDark);
        
        // Draw particle copies near edges for seamless wrapping effect
        const buffer = config.drawBuffer;
        const w = dimensions.width;
        const h = dimensions.height;
        
        // Draw wrapped copies if particle is near an edge
        if (particle.x < buffer) {
          drawParticle(particle.x + w, particle.y, particle, ctx, isDark);
          
          if (particle.y < buffer) {
            drawParticle(particle.x + w, particle.y + h, particle, ctx, isDark);
          } else if (particle.y > h - buffer) {
            drawParticle(particle.x + w, particle.y - h, particle, ctx, isDark);
          }
        } 
        else if (particle.x > w - buffer) {
          drawParticle(particle.x - w, particle.y, particle, ctx, isDark);
          
          if (particle.y < buffer) {
            drawParticle(particle.x - w, particle.y + h, particle, ctx, isDark);
          } else if (particle.y > h - buffer) {
            drawParticle(particle.x - w, particle.y - h, particle, ctx, isDark);
          }
        }
        
        if (particle.y < buffer) {
          drawParticle(particle.x, particle.y + h, particle, ctx, isDark);
        } 
        else if (particle.y > h - buffer) {
          drawParticle(particle.x, particle.y - h, particle, ctx, isDark);
        }
      });
      
      ctx.globalCompositeOperation = 'source-over';
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [dimensions, config]);

  return (
    <canvas 
      ref={canvasRef}
      className="w-full h-full"
    />
  );
};

export default RandomizedFlowField;