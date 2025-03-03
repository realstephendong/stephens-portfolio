import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import projects from '../data/projects';

const ProjectCard = ({ title, highlightedDescription, image, link, color, tags }) => (
  <Card 
    className="w-full bg-gradient-to-br dark:from-[#0D1117] dark:to-[#161B22] from-white to-gray-50 
                border dark:border-[#30363D] overflow-hidden group"
    data-aos="fade-up" 
    data-aos-duration="1000"
  >
    <CardContent className="p-0">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        <div className="overflow-hidden">
          <img 
            src={image} 
            alt={title} 
            className="w-full h-64 md:h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        <div className="p-5 sm:p-6 md:p-8 space-y-4 sm:space-y-6">
          <h3 
            className="text-2xl sm:text-3xl md:text-4xl font-semibold" 
            style={{ color }}
          >
            {title}
          </h3>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
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
          <div className="flex flex-wrap gap-1 sm:gap-2">
            {tags.map((tag) => (
              <Badge 
                key={tag}
                variant="secondary" 
                className="text-xs sm:text-sm dark:bg-[#161B22] dark:hover:bg-[#21262D] 
                           bg-gray-100 hover:bg-gray-200"
              >
                {tag}
              </Badge>
            ))}
          </div>
          <a 
            href={link} 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-block"
          >
            <Button 
              variant="outline"
              style={{ 
                borderColor: 'transparent',
                '--hover-color': color 
              }}
              className="group text-sm sm:text-base md:text-lg transition-all hover:border-[--hover-color] hover:text-[--hover-color]"
            >
              See the code
              <ExternalLink className="ml-2 h-3 w-3 sm:h-4 sm:w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </a>
        </div>
      </div>
    </CardContent>
  </Card>
);

const Projects = () => {
  // Sort projects by date, most recent first
  const sortedProjects = [...projects].sort((a, b) => 
    new Date(b.date) - new Date(a.date)
  );

  return (
    <main className="min-h-screen pt-24 sm:pt-28 md:pt-32 pb-10 sm:pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="space-y-8 sm:space-y-12">
          {/* Header */}
          <section data-aos="fade-right" data-aos-duration="1000">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#FF6B6B] dark:text-white mb-4 sm:mb-8">Projects</h1>
            <Card className="dark:bg-gradient-to-br dark:from-[#0D1117] dark:to-[#161B22] 
                            bg-gray-50 dark:border-[#30363D] border">
              <CardContent className="p-5 sm:p-8">
                <p className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed">
                  Here's a collection of projects I've worked on. Each one represents a unique challenge 
                  and learning experience in my journey as a developer.
                </p>
              </CardContent>
            </Card>
          </section>

          {/* Projects Grid */}
          <section className="space-y-6 sm:space-y-8 md:space-y-12">
            {sortedProjects.map((project) => (
              <ProjectCard key={project.id} {...project} />
            ))}
          </section>
        </div>
      </div>
    </main>
  );
};

export default Projects;