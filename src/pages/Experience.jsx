import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Award, Briefcase, MapPin, Calendar, Brain, Monitor, ChevronRight, Github, ExternalLink } from 'lucide-react';
import { experiences } from '../data/experienceData';

const iconMap = {
  "Brain": Brain,
  "Award": Award,
  "Monitor": Monitor,
};

const ExperienceCard = ({ experience }) => {
  const { role, company, logo, location, project, dateRange, description, responsibilities, skills, color, icon, githubLink } = experience;
  
  const IconComponent = icon && iconMap[icon] ? iconMap[icon] : Briefcase;

  return (
    <Card 
      className="w-full dark:bg-gradient-to-br dark:from-[#0D1117] dark:to-[#161B22] 
                 bg-white border dark:border-[#30363D] overflow-hidden group"
      data-aos="fade-up" 
      data-aos-duration="1000"
    >
      <CardContent className="p-0">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-0">
          {/* Left sidebar with date and icon */}
          <div 
            className="md:col-span-1 p-6 md:p-8 flex flex-row md:flex-col items-center md:items-start justify-between md:justify-start gap-4"
            style={{ backgroundColor: `${color}10` }}
          >
            <div className="flex flex-col items-center md:items-start gap-2">
              <IconComponent 
                style={{ color }} 
                className="h-10 w-10 md:h-12 md:w-12"
              />
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>{dateRange}</span>
              </div>
            </div>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>{location}</span>
            </div>
          </div>
          
          {/* Main content */}
          <div className="md:col-span-4 p-6 md:p-8 space-y-4 sm:space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
              <div className="flex items-center gap-3">
                {logo && (
                  <div className="w-16 h-16 sm:w-16 sm:h-16 flex-shrink-0 rounded-md overflow-hidden border border-gray-200 dark:border-[#30363D] bg-white p-1">
                    <img 
                      src={logo} 
                      alt={`${company} logo`} 
                      className="w-full h-full object-contain"
                    />
                  </div>
                )}
                <div>
                  <h3 
                    className="text-2xl sm:text-3xl font-semibold mb-1" 
                    style={{ color }}
                  >
                    {role}
                  </h3>
                  <p className="text-lg font-medium">
                    {company} {project && <span className="text-muted-foreground">| {project}</span>}
                  </p>
                </div>
              </div>
              
              {githubLink && githubLink.trim() !== "" && (
                <a 
                  href={githubLink}
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="shrink-0"
                >
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="gap-2 border-primary/20 hover:border-primary hover:text-primary"
                  >
                    <Github className="h-4 w-4" />
                    <span className="hidden sm:inline">View Code</span>
                    <ExternalLink className="h-3 w-3" />
                  </Button>
                </a>
              )}
            </div>
            
            <p className="text-base sm:text-lg text-muted-foreground">
              {description}
            </p>
            
            <div className="space-y-2 sm:space-y-3">
              <h4 className="text-base sm:text-lg font-medium">Key Responsibilities:</h4>
              <ul className="list-disc list-inside space-y-2 text-sm sm:text-base text-muted-foreground">
                {responsibilities.map((responsibility, index) => (
                  <li key={index} className="pl-2">
                    <span className="pl-2">{responsibility}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="flex flex-wrap gap-2 pt-2">
              {skills.map((skill) => (
                <Badge 
                  key={skill}
                  variant="secondary" 
                  className="text-xs sm:text-sm dark:bg-[#161B22] dark:hover:bg-[#21262D] 
                             bg-gray-100 hover:bg-gray-200"
                  style={{ borderColor: `${color}30` }}
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const Experience = () => {
  const sortedExperiences = [...experiences].sort((a, b) => {
    const aYear = parseInt(a.dateRange.split(' ').pop());
    const bYear = parseInt(b.dateRange.split(' ').pop());
    return bYear - aYear;
  });

  return (
    <main className="min-h-screen pt-24 sm:pt-28 md:pt-32 pb-10 sm:pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="space-y-8 sm:space-y-12">
          {/* Header */}
          <section data-aos="fade-right" data-aos-duration="1000">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/50 mb-4 sm:mb-8">
              Experience
            </h1>
            <Card className="dark:bg-gradient-to-br dark:from-[#0D1117] dark:to-[#161B22] 
                            bg-gray-50 dark:border-[#30363D] border">
              <CardContent className="p-5 sm:p-8">
                <p className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed">
                  My professional journey and the roles where I've applied my technical skills and gained valuable experience.
                </p>
              </CardContent>
            </Card>
          </section>

          {/* Experience Cards */}
          <section className="space-y-6 sm:space-y-8 md:space-y-12">
            {sortedExperiences.map((experience) => (
              <ExperienceCard key={experience.id} experience={experience} />
            ))}
          </section>

          {/* Education Section */}
          <section data-aos="fade-up" data-aos-duration="1000">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6 sm:mb-8 text-primary">Education</h2>
            <Card className="w-full dark:bg-gradient-to-br dark:from-[#0D1117] dark:to-[#161B22] 
                           bg-white border dark:border-[#30363D] hover:border-primary/50 transition-colors">
              <CardContent className="p-6 sm:p-8 md:p-10 space-y-4">
                <div className="flex justify-between items-start flex-wrap gap-4">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-semibold">University of Waterloo</h3>
                    <p className="text-lg text-muted-foreground">BASc in Computer Engineering</p>
                  </div>
                  <div className="text-right">
                    <p className="text-base font-medium">Waterloo, ON</p>
                    <p className="text-muted-foreground">Expected: May 2029</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>
        </div>
      </div>
    </main>
  );
};

export default Experience;