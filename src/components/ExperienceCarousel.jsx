import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ChevronRightCircle } from 'lucide-react';
import { experiences } from '../data/experienceData';

const ExperienceCarousel = () => {
  const scrollRef = useRef(null);

  const sortedExperiences = [...experiences].sort((a, b) => {
    const aYear = parseInt(a.dateRange.split(' ').pop());
    const bYear = parseInt(b.dateRange.split(' ').pop());
    return bYear - aYear;
  });

  const duplicatedExperiences = [...sortedExperiences, ...sortedExperiences];

  useEffect(() => {
    const scroll = scrollRef.current;
    if (!scroll) return;

    let animationId;
    let startTime;
    let paused = false;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      
      if (!paused) {
        const progress = (timestamp - startTime) * 0.08;
        
        // Reset when the first set of items is scrolled past
        if (scroll.scrollLeft >= scroll.scrollWidth / 2) {
          scroll.scrollLeft = 0;
          startTime = timestamp;
        } else {
          scroll.scrollLeft = progress;
        }
      }
      
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    // Pause animation on hover or touch
    const handlePause = () => {
      paused = true;
    };

    const handleResume = () => {
      paused = false;
    };

    scroll.addEventListener('mouseenter', handlePause);
    scroll.addEventListener('mouseleave', handleResume);
    scroll.addEventListener('touchstart', handlePause);
    scroll.addEventListener('touchend', handleResume);

    return () => {
      cancelAnimationFrame(animationId);
      scroll.removeEventListener('mouseenter', handlePause);
      scroll.removeEventListener('mouseleave', handleResume);
      scroll.removeEventListener('touchstart', handlePause);
      scroll.removeEventListener('touchend', handleResume);
    };
  }, []);

  return (
    <div className="w-full">
      <div 
        ref={scrollRef}
        className="overflow-x-scroll no-scrollbar py-6"
        style={{
          WebkitOverflowScrolling: 'touch',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none'
        }}
      >
        <div className="flex whitespace-nowrap gap-6">
          {duplicatedExperiences.map((experience, index) => {
            const { id, role, company, logo, color, dateRange } = experience;
            
            return (
              <div 
                key={`${id}-${index}`}
                className="inline-block flex-shrink-0 w-80 sm:w-96 transition-transform duration-300 hover:scale-105"
              >
                <div 
                  className="h-52 rounded-xl p-6 sm:p-7 border shadow-sm transition-shadow hover:shadow-md relative overflow-hidden flex flex-col justify-between bg-background/40 backdrop-blur-sm"
                  style={{ 
                    borderColor: `${color}30`
                  }}
                >
                  
                  <div className="flex items-start gap-4 relative z-10">
                    {logo && (
                      <div className="w-12 h-12 rounded-lg overflow-hidden border border-gray-200 dark:border-[#30363D] bg-white p-1 flex-shrink-0">
                        <img 
                          src={logo}
                          alt={`${company} logo`}
                          className="w-full h-full object-contain"
                        />
                      </div>
                    )}
                    <div className="min-w-0"> {/* Added min-w-0 to allow text to wrap properly */}
                      <h3 
                        className="text-xl font-bold line-clamp-2 mb-1" /* Changed from truncate to line-clamp-2 */
                        style={{ color }}
                      >
                        {role}
                      </h3>
                      <p className="text-base font-medium line-clamp-1"> {/* Changed from truncate to line-clamp-1 */}
                        {company}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {dateRange}
                      </p>
                    </div>
                  </div>
                  
                  <Link to="/experience" className="relative z-10">
                    <Button 
                      variant="outline"
                      className="w-full group text-base"
                      style={{
                        borderColor: `${color}30`,
                        color
                      }}
                    >
                      View details
                      <ChevronRightCircle className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      
      {/* Custom scrolling indicator */}
      <div className="flex justify-center mt-4 gap-2">
        <div className="w-16 h-1 rounded-full bg-primary/30"></div>
        <div className="w-3 h-1 rounded-full bg-primary"></div>
        <div className="w-3 h-1 rounded-full bg-primary/50"></div>
        <div className="w-3 h-1 rounded-full bg-primary/50"></div>
      </div>
    </div>
  );
};

// Add a CSS class to hide scrollbars and define line-clamp
const style = document.createElement('style');
style.textContent = `
  .no-scrollbar::-webkit-scrollbar {
    display: none;
  }
  
  .no-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  
  .line-clamp-1 {
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  
  .line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
`;
document.head.appendChild(style);

export default ExperienceCarousel;