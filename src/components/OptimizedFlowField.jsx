import React, { useEffect, useRef, useState } from 'react';

const OptimizedFlowField = () => {
  const canvasRef = useRef(null);
  const animationFrameRef = useRef(null);
  const particlesRef = useRef([]);
  const mouseRef = useRef({ x: null, y: null });
  const [isDark, setIsDark] = useState(true);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // Initialize particles
  const initParticles = (width, height) => {
    const particles = [];
    const count = 180; // Increased count for better visibility

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: Math.random() * 0.5 - 0.25, // More initial velocity
        vy: Math.random() * 0.5 - 0.25, // More initial velocity
        radius: Math.random() * 2.5 + 1.5, // Increased particle size
        color: Math.floor(Math.random() * 360),
        // Add randomness in behavior
        speedFactor: 0.7 + Math.random() * 0.6,
        jitterFactor: 0.7 + Math.random() * 0.6
      });
    }

    return particles;
  };

  // Handle window resize
  useEffect(() => {
    const updateDimensions = () => {
      if (canvasRef.current) {
        const parentElement = canvasRef.current.parentElement;
        const newWidth = parentElement.offsetWidth;
        const newHeight = parentElement.offsetHeight;
        
        setDimensions({ width: newWidth, height: newHeight });
        
        // Reinitialize particles when dimensions change
        particlesRef.current = initParticles(newWidth, newHeight);
      }
    };

    // Initialize
    updateDimensions();
    
    // Add event listener
    window.addEventListener('resize', updateDimensions);
    
    // Cleanup
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  // Handle mouse movement
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!canvasRef.current) return;
      
      const rect = canvasRef.current.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
    };
    
    const handleMouseLeave = () => {
      mouseRef.current = { x: null, y: null };
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  // Detect theme
  useEffect(() => {
    const checkTheme = () => {
      const isDarkTheme = document.documentElement.classList.contains('dark');
      setIsDark(isDarkTheme);
    };
    
    // Initial check
    checkTheme();
    
    // Observer for theme changes
    const observer = new MutationObserver(checkTheme);
    
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });
    
    return () => observer.disconnect();
  }, []);

  // Animation
  useEffect(() => {
    if (!canvasRef.current || dimensions.width === 0 || dimensions.height === 0) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Set canvas dimensions
    canvas.width = dimensions.width;
    canvas.height = dimensions.height;
    
    // Set up the canvas
    ctx.globalCompositeOperation = isDark ? 'lighter' : 'source-over';
    
    // Initialize particles if not already done
    if (particlesRef.current.length === 0) {
      particlesRef.current = initParticles(dimensions.width, dimensions.height);
    }
    
    const animate = () => {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw particles
      particlesRef.current.forEach(particle => {
        // Random movement - increased magnitude for more visible motion
        particle.vx += (Math.random() - 0.5) * 0.08 * particle.jitterFactor;
        particle.vy += (Math.random() - 0.5) * 0.08 * particle.jitterFactor;
        
        // Occasionally apply larger random direction changes
        if (Math.random() < 0.02) {
          const angle = Math.random() * Math.PI * 2;
          const force = 0.2 + Math.random() * 0.3;
          particle.vx += Math.cos(angle) * force;
          particle.vy += Math.sin(angle) * force;
        }
        
        // Apply mouse repulsion
        if (mouseRef.current.x !== null && mouseRef.current.y !== null) {
          const dx = mouseRef.current.x - particle.x;
          const dy = mouseRef.current.y - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 120) { // Increased mouse influence radius
            const angle = Math.atan2(dy, dx);
            const repulsionForce = (120 - distance) / 120 * 0.4; // Stronger repulsion
            
            particle.vx -= Math.cos(angle) * repulsionForce * particle.speedFactor;
            particle.vy -= Math.sin(angle) * repulsionForce * particle.speedFactor;
          }
        }
        
        // Apply some friction
        particle.vx *= 0.96;
        particle.vy *= 0.96;
        
        // Limit max speed - increased for more noticeable movement
        const speed = Math.sqrt(particle.vx * particle.vx + particle.vy * particle.vy);
        const maxSpeed = 1.8 * particle.speedFactor;
        if (speed > maxSpeed) {
          particle.vx = (particle.vx / speed) * maxSpeed;
          particle.vy = (particle.vy / speed) * maxSpeed;
        }
        
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;
        
        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width;
        else if (particle.x > canvas.width) particle.x = 0;
        
        if (particle.y < 0) particle.y = canvas.height;
        else if (particle.y > canvas.height) particle.y = 0;
        
        // Draw the particle with glow effect
        const glowSize = particle.radius * 4; // Size of the glow
        const opacity = isDark ? 0.9 : 0.75;
        const glowOpacity = isDark ? 0.6 : 0.4;
        
        // Create a radial gradient for the glow
        const glow = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, glowSize
        );
        
        // Add color stops to the gradient
        glow.addColorStop(0, `hsla(${particle.color}, 80%, ${isDark ? 65 : 50}%, ${glowOpacity})`);
        glow.addColorStop(1, `hsla(${particle.color}, 80%, ${isDark ? 65 : 50}%, 0)`);
        
        // Draw the glow
        ctx.beginPath();
        ctx.fillStyle = glow;
        ctx.arc(particle.x, particle.y, glowSize, 0, Math.PI * 2);
        ctx.fill();
        
        // Draw the particle core
        ctx.beginPath();
        ctx.fillStyle = `hsla(${particle.color}, 80%, ${isDark ? 70 : 55}%, ${opacity})`;
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fill();
      });
      
      animationFrameRef.current = requestAnimationFrame(animate);
    };
    
    // Start animation
    animate();
    
    // Cleanup
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [dimensions, isDark]);

  return (
    <canvas 
      ref={canvasRef} 
      className="w-full h-full"
    />
  );
};

export default OptimizedFlowField;