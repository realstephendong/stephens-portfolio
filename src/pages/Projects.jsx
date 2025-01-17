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
      <div className="grid md:grid-cols-2 gap-8">
        <div className="overflow-hidden">
          <img 
            src={image} 
            alt={title} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        <div className="p-8 space-y-6">
          <h3 
            className="text-4xl font-semibold" 
            style={{ color }}
          >
            {title}
          </h3>
          <p className="text-lg text-muted-foreground leading-relaxed">
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
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Badge 
                key={tag}
                variant="secondary" 
                className="dark:bg-[#161B22] dark:hover:bg-[#21262D] 
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
              className="group text-lg transition-all hover:border-[--hover-color] hover:text-[--hover-color]"
            >
              See the code
              <ExternalLink className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
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
    <main className="min-h-screen pt-32 pb-16">
      <div className="max-w-7xl mx-auto px-8">
        <div className="space-y-12">
          {/* Header */}
          <section data-aos="fade-right" data-aos-duration="1000">
            <h1 className="text-6xl font-bold text-[#FF6B6B] dark:text-white mb-8">Projects</h1>
            <Card className="dark:bg-gradient-to-br dark:from-[#0D1117] dark:to-[#161B22] 
                            bg-gray-50 dark:border-[#30363D] border">
              <CardContent className="p-8">
                <p className="text-xl text-muted-foreground leading-relaxed">
                  Here's a collection of projects I've worked on. Each one represents a unique challenge 
                  and learning experience in my journey as a developer.
                </p>
              </CardContent>
            </Card>
          </section>

          {/* Projects Grid */}
          <section className="space-y-12">
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