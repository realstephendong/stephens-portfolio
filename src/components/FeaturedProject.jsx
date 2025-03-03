import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ChevronRight } from 'lucide-react';

function FeaturedProject({ project }) {
  const { title, highlightedDescription, image, color } = project;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-12 items-start">
      <div className="overflow-hidden rounded-lg border dark:border-[#30363D] border-gray-200 
                      transition-all hover:border-[lightcoral] group/image">
        <Link to="/projects">
          <img 
            src={image}
            alt={`${title} Project`}
            className="w-full h-full object-cover transition-transform duration-500 group-hover/image:scale-105"
          />
        </Link>
      </div>
      <div className="space-y-4 sm:space-y-6 md:space-y-8">
        <h3 className="text-2xl sm:text-3xl md:text-4xl font-semibold" style={{ color }}>{title}</h3>
        <p className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed">
          {highlightedDescription.map((part, index) => (
            <span 
              key={index} 
              style={{ color: part.highlight ? color : 'inherit' }}
              className={part.highlight ? 'font-semibold' : ''}
            >
              {part.text}
            </span>
          ))}
        </p>
        <Link to="/projects" className="inline-block">
          <Button 
            variant="outline"
            size="lg"
            style={{
              '--hover-border-color': color,
              '--hover-text-color': color,
              borderColor: `${color}20`
            }}
            className="group text-sm sm:text-base md:text-lg hover:border-[--hover-border-color] hover:text-[--hover-text-color] transition-colors"
          >
            See more
            <ChevronRight className="ml-1 sm:ml-2 h-3 w-3 sm:h-4 sm:w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default FeaturedProject;