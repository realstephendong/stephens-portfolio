import { useState, useRef } from 'react';
import { 
  Card, 
  CardContent 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Award, 
  Briefcase, 
  MapPin, 
  Calendar, 
  Brain, 
  Monitor,
  ChevronRight, 
  ChevronDown,
  Github, 
  ExternalLink,
  Code,
  Image as ImageIcon,
  Check,
  LineChart,
  Play,
  Pause,
  Film,
  Maximize,
  Minimize,
  Zap,
  PanelRight,
  HardDrive,
  BarChart
} from 'lucide-react';

import experiences from '../data/experienceData';

const iconMap = {
  "Brain": Brain,
  "Award": Award,
  "Monitor": Monitor,
};

const MediaShowcase = ({ media, color }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);
  const iframeRef = useRef(null);

  const currentMedia = media[activeIndex];
  
  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? media.length - 1 : prev - 1));
    if (videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };
  
  const handleNext = () => {
    setActiveIndex((prev) => (prev === media.length - 1 ? 0 : prev + 1));
    if (videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };
  
  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };
  
  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };
  
  const handleVideoEnd = () => {
    setIsPlaying(false);
  };

  const renderMedia = () => {
    switch(currentMedia.type) {
      case 'video':
        return (
          <>
            <video
              ref={videoRef}
              src={currentMedia.url}
              poster={currentMedia.thumbnail}
              className="w-full h-full object-contain"
              onEnded={handleVideoEnd}
              controls={isFullscreen}
            />
            
            {/* Video controls overlay (only show when not fullscreen) */}
            {!isFullscreen && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 hover:opacity-100 transition-opacity">
                <button 
                  onClick={togglePlay}
                  className="p-3 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors"
                >
                  {isPlaying ? (
                    <Pause className="h-8 w-8 text-white" />
                  ) : (
                    <Play className="h-8 w-8 text-white" />
                  )}
                </button>
              </div>
            )}
          </>
        );
      
      case 'externalVideo':
        // For external videos (Google Drive, YouTube, etc.)
        return (
          <iframe
            ref={iframeRef}
            src={currentMedia.embedUrl}
            className="w-full h-full"
            allowFullScreen
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          />
        );
      
      case 'image':
      default:
        return (
          <img 
            src={currentMedia.url} 
            alt={currentMedia.title}
            className="w-full h-full object-contain"
          />
        );
    }
  };

  if (!media || media.length === 0) return null;

  return (
    <div className={`bg-black/5 dark:bg-white/5 rounded-lg transition-all ${isFullscreen ? 'fixed inset-0 z-50 flex items-center justify-center bg-black/90' : ''}`}>
      <div className={`relative ${isFullscreen ? 'w-full h-full max-w-5xl mx-auto flex flex-col justify-center' : ''}`}>
        {/* Media display */}
        <div className={`relative rounded-t-lg overflow-hidden ${isFullscreen ? 'w-full' : currentMedia.aspectRatio ? '' : 'aspect-video'} bg-black/20`}
             style={currentMedia.aspectRatio && !isFullscreen ? { aspectRatio: currentMedia.aspectRatio } : {}}>
          
          {renderMedia()}
          
          {/* Fullscreen toggle button - not for external videos which have their own controls */}
          {currentMedia.type !== 'externalVideo' && (
            <button 
              onClick={toggleFullscreen}
              className="absolute top-3 right-3 p-2 bg-black/30 hover:bg-black/50 rounded-full text-white transition-colors"
            >
              {isFullscreen ? (
                <Minimize className="h-5 w-5" />
              ) : (
                <Maximize className="h-5 w-5" />
              )}
            </button>
          )}
        </div>
        
        {/* Media info and navigation */}
        <div className={`p-4 ${isFullscreen ? 'text-white' : ''}`}>
          <div className="flex justify-between items-start mb-3">
            <div>
              <h4 className="font-medium text-lg" style={{ color: isFullscreen ? 'white' : color }}>
                {currentMedia.title}
              </h4>
              <p className="text-sm text-muted-foreground">{currentMedia.description}</p>
            </div>
            
            {/* Navigation controls */}
            {media.length > 1 && (
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handlePrev}
                  className="h-8 w-8 p-0"
                >
                  <ChevronRight className="h-4 w-4 rotate-180" />
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleNext}
                  className="h-8 w-8 p-0"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
          
          {/* Media counter */}
          {media.length > 1 && (
            <div className="flex justify-center gap-1 mt-2">
              {media.map((_, index) => (
                <span 
                  key={index}
                  className={`h-1.5 rounded-full transition-all ${
                    index === activeIndex 
                      ? `w-4 bg-primary` 
                      : 'w-1.5 bg-gray-300 dark:bg-gray-700'
                  }`}
                  style={{ backgroundColor: index === activeIndex ? color : '' }}
                ></span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Helper function to get appropriate icon for detail sections
const getDetailIcon = (key) => {
  switch(key) {
    case 'technologies':
      return <Code className="h-4 w-4 mr-2 flex-shrink-0" />;
    case 'activities':
      return <Zap className="h-4 w-4 mr-2 flex-shrink-0" />;
    case 'challenges':
      return <PanelRight className="h-4 w-4 mr-2 flex-shrink-0" />;
    case 'results':
      return <BarChart className="h-4 w-4 mr-2 flex-shrink-0" />;
    case 'responsibilities':
      return <HardDrive className="h-4 w-4 mr-2 flex-shrink-0" />;
    default:
      return null;
  }
};

const ExperienceCard = ({ experience }) => {
  const { 
    id, role, company, logo, location, project, dateRange, description, 
    responsibilities, skills, color, icon, githubLink, media 
  } = experience;
  
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [showProjects, setShowProjects] = useState(false);
  const [showMedia, setShowMedia] = useState(false);

  const IconComponent = icon && iconMap[icon] ? iconMap[icon] : Briefcase;
  
  const projects = [];
  
  // Check if media exists and is not empty
  const hasMedia = media && media.length > 0;
  
  // Check if media includes video
  const hasVideo = hasMedia && media.some(item => item.type === 'video' || item.type === 'externalVideo');

  const toggleExpand = (index) => {
    if (expandedIndex === index) {
      setExpandedIndex(null);
    } else {
      setExpandedIndex(index);
    }
  };

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
              
              <div className="flex flex-wrap gap-2">
                {/* Media Showcase Button - only show if media exists */}
                {hasMedia && (
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="gap-2 border-primary/20 hover:border-primary hover:text-primary"
                    onClick={() => setShowMedia(!showMedia)}
                  >
                    {hasVideo ? (
                      <Film className="h-4 w-4" />
                    ) : (
                      <ImageIcon className="h-4 w-4" />
                    )}
                    <span className="hidden sm:inline">
                      {showMedia ? "Hide Showcase" : "View Showcase"}
                    </span>
                    {showMedia ? 
                      <ChevronDown className="h-3 w-3" /> : 
                      <ChevronRight className="h-3 w-3" />
                    }
                  </Button>
                )}
                
                {/* Projects Button - only show if projects exist */}
                {projects.length > 0 && (
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="gap-2 border-primary/20 hover:border-primary hover:text-primary"
                    onClick={() => setShowProjects(!showProjects)}
                  >
                    <Code className="h-4 w-4" />
                    <span className="hidden sm:inline">
                      {showProjects ? "Hide Projects" : "View Projects"}
                    </span>
                    {showProjects ? 
                      <ChevronDown className="h-3 w-3" /> : 
                      <ChevronRight className="h-3 w-3" />
                    }
                  </Button>
                )}
                
                {/* GitHub Button - only show if link exists */}
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
            </div>
            
            <p className="text-base sm:text-lg text-muted-foreground">
              {description}
            </p>
            
            {/* Media Showcase (conditionally rendered) */}
            {showMedia && hasMedia && (
              <MediaShowcase media={media} color={color} />
            )}
            
            {/* Projects showcase (conditionally rendered) */}
            {showProjects && projects.length > 0 && (
              <div className="bg-black/5 dark:bg-white/5 rounded-lg p-4 space-y-4 transition-all">
                <h4 className="text-base sm:text-lg font-medium flex items-center gap-2">
                  <Code className="h-5 w-5" style={{ color }} />
                  Project Showcase:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {projects.map((project, idx) => (
                    <div 
                      key={idx} 
                      className="bg-black/5 dark:bg-white/5 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-800"
                    >
                      <div className="h-40 bg-gray-100 dark:bg-gray-800 overflow-hidden">
                        <img 
                          src={project.image} 
                          alt={project.title} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-4 space-y-2">
                        <h5 className="font-medium" style={{ color }}>{project.title}</h5>
                        <p className="text-sm text-muted-foreground">{project.description}</p>
                        <div className="text-xs text-muted-foreground">{project.details}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            <div className="space-y-2 sm:space-y-3">
              <h4 className="text-base sm:text-lg font-medium">Key Responsibilities:</h4>
              <div className="space-y-2">
                {responsibilities.map((responsibility, index) => (
                  <div 
                    key={index} 
                    className="border dark:border-gray-800 rounded-lg overflow-hidden"
                  >
                    <div 
                      className="p-3 cursor-pointer flex justify-between items-start hover:bg-black/5 dark:hover:bg-white/5"
                      onClick={() => toggleExpand(index)}
                    >
                      <div className="flex gap-2">
                        <div className="mt-1 flex-shrink-0">
                          <Check className="h-4 w-4" style={{ color }} />
                        </div>
                        <span className="text-sm sm:text-base">{responsibility.title}</span>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="ml-2 flex-shrink-0"
                      >
                        {expandedIndex === index ? 
                          <ChevronDown className="h-4 w-4" /> : 
                          <ChevronRight className="h-4 w-4" />
                        }
                      </Button>
                    </div>
                    
                    {expandedIndex === index && responsibility.details && (
                      <div className="p-4 bg-black/5 dark:bg-white/5 border-t dark:border-gray-800 space-y-4 transition-all">
                        {/* Description */}
                        {responsibility.details.description && (
                          <div className="text-sm">
                            <p>{responsibility.details.description}</p>
                          </div>
                        )}
                        
                        {/* Render other detail sections */}
                        {Object.entries(responsibility.details).map(([key, value]) => {
                          // Skip rendering the description as we've already handled it above
                          if (key === 'description') return null;
                          
                          // Handle array values (technologies, activities, etc.)
                          if (Array.isArray(value)) {
                            return (
                              <div key={key} className="mt-3">
                                <h5 className="text-sm font-medium mb-2 flex items-center" style={{ color }}>
                                  {getDetailIcon(key)}
                                  {key.charAt(0).toUpperCase() + key.slice(1)}:
                                </h5>
                                <div className="flex flex-wrap gap-2">
                                  {value.map((item, i) => (
                                    <Badge 
                                      key={i}
                                      variant="outline" 
                                      className="text-xs py-1"
                                    >
                                      {item}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            );
                          }
                          
                          // Handle string values (challenges, results, etc.)
                          return (
                            <div key={key} className="mt-3">
                              <h5 className="text-sm font-medium mb-1 flex items-center" style={{ color }}>
                                {getDetailIcon(key)}
                                {key.charAt(0).toUpperCase() + key.slice(1)}:
                              </h5>
                              <p className="text-sm text-muted-foreground">{value}</p>
                            </div>
                          );
                        })}
                      </div>
                    )}
                    </div>
                ))}
              </div>
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

// Main Experience component
const Experience = () => {
  return (
    <div className="container mx-auto px-4 pt-20 pb-8 max-w-7xl">
      <div className="space-y-8">
        {experiences.map((experience) => (
          <ExperienceCard key={experience.id} experience={experience} />
        ))}
      </div>
    </div>
  );
};

export default Experience;