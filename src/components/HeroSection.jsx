import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ChevronRight, MousePointer2 } from 'lucide-react';

// Background images (replace with your actual images)
const backgrounds = [
  'https://i.imgur.com/stjULrz.jpeg',
  'https://i.imgur.com/1q4Hn7u.jpeg',
  'https://i.imgur.com/bIDK5Tz.jpeg',
  'https://i.imgur.com/2TUqXje.jpeg',
  'https://i.imgur.com/3vjnJP2.jpeg'
];

const heroTexts = [
  'Hey there!', 
  'My name\'s Stephen.', 
  'Pleasure to meet you!', 
  'This is my portfolio.', 
  'Make yourself at home.'
];

const HeroSection = () => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [currentBackgroundIndex, setCurrentBackgroundIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex((prevIndex) => 
        (prevIndex + 1) % heroTexts.length
      );
      setCurrentBackgroundIndex((prevIndex) => 
        (prevIndex + 1) % backgrounds.length
      );
    }, 4000); // Increased interval for smoother feel

    return () => clearInterval(interval);
  }, []);

  const textVariants = {
    initial: { 
      x: '100%', 
      opacity: 0
    },
    animate: { 
      x: 0, 
      opacity: 1,
      transition: {
        type: 'tween',
        duration: 0.8,
        ease: "easeInOut"
      }
    },
    exit: { 
      x: '-100%', 
      opacity: 0,
      transition: {
        type: 'tween',
        duration: 0.8,
        ease: "easeInOut"
      }
    }
  };

  const backgroundVariants = {
    initial: { 
      opacity: 0 
    },
    animate: { 
      opacity: 1,
      transition: {
        type: 'tween',
        duration: 1,
        ease: "easeInOut"
      }
    },
    exit: { 
      opacity: 0,
      transition: {
        type: 'tween',
        duration: 1,
        ease: "easeInOut"
      }
    }
  };

  return (
    <section 
      className="min-h-[80vh] flex flex-col justify-center relative overflow-hidden"
      data-aos="fade-right"
    >
      {/* Animated Background with Fade to Page Color */}
      <AnimatePresence>
        <motion.div
          key={`bg-${currentBackgroundIndex}`}
          initial="initial"
          animate="animate"
          exit="exit"
          variants={backgroundVariants}
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: `url(${backgrounds[currentBackgroundIndex]})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          {/* Gradient overlay to fade into page color */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background opacity-70" />
        </motion.div>
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-8 relative w-full">
        <div className="space-y-8 relative w-full">
          {/* Animated Text with Fixed Positioning */}
          <div className="relative h-24 overflow-hidden w-full">
            <AnimatePresence mode="wait">
              <motion.h1
                key={`text-${currentTextIndex}`}
                initial="initial"
                animate="animate"
                exit="exit"
                variants={textVariants}
                className="text-7xl font-semibold absolute left-0 whitespace-nowrap"
              >
                <span className="text-primary">{heroTexts[currentTextIndex]}</span>
              </motion.h1>
            </AnimatePresence>
          </div>

          <p className="text-xl text-muted-foreground">
            Come take a look at what I've been up to!
          </p>
          
          <div className="flex items-center gap-6">
            <Link to="/projects" className="inline-block">
              <Button 
                size="lg"
                className="group text-lg bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                Projects
                <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <div className="h-12 w-px bg-border" />
            <a 
              href="https://www.linkedin.com/in/stephen-dong/" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <Button 
                variant="outline"
                size="lg"
                className="group text-lg border-primary/20 hover:border-primary/40 hover:bg-primary/10"
              >
                LinkedIn
                <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </a>
          </div>
        </div>
      </div>
      
      {/* Scroll to Explore Icon - Moved Lower */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="flex flex-col items-center text-muted-foreground">
          <MousePointer2 className="h-6 w-6" />
          <span className="text-sm">Scroll to explore</span>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;