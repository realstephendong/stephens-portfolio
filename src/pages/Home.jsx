import React, { useRef, useState, useEffect, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ChevronRight, 
  MousePointer2, 
  ArrowRight,
  X,
  Minus,
  Maximize2
} from 'lucide-react';
import { blogPosts } from '../data/blogData';
import experiences from '../data/experienceData';

// Import the faulty terminal animation
import FaultyTerminal from '../components/FaultyTerminal';

// Experience Timeline Component
const ExperienceTimeline = ({ experience, index }) => {
  const { 
    role, company, logo, location, project, dateRange, description, 
    skills, githubLink
  } = experience;

  return (
    <div 
      className="relative group pb-20"
      data-aos="fade-up" 
      data-aos-duration="800"
      data-aos-delay={index * 150}
      data-aos-easing="ease-out"
    >      
      {/* Timeline dot */}
      <div 
        className="absolute left-0 top-6 w-3 h-3 rounded-full bg-primary shadow-lg shadow-primary/50 hidden md:block group-hover:scale-125 transition-transform"
        data-aos="fade-up"
        data-aos-duration="600"
        data-aos-delay={index * 150}
      ></div>
      
      {/* Content */}
      <div className="md:pl-12">
        {/* Horizontal Layout: Date/Location --- Line --- Company/Role --- Logo */}
        <div className="flex items-center gap-4 md:gap-6 flex-wrap md:flex-nowrap">
          {/* Left: Date & Location */}
          <div className="flex flex-col gap-1 w-full md:w-44 flex-shrink-0">
            <span className="text-sm font-semibold text-foreground/90 whitespace-nowrap">{dateRange}</span>
            <span className="text-xs text-muted-foreground whitespace-nowrap">{location}</span>
          </div>
          
          {/* Connecting line */}
          <div className="hidden md:block flex-grow h-px bg-white/40 max-w-[200px]"></div>
          
          {/* Middle: Company & Role */}
          <div className="flex-1 min-w-0 space-y-2 md:ml-8">
            <div>
              <h3 className="text-2xl sm:text-3xl font-bold text-foreground group-hover:text-primary transition-colors">
                {company}
              </h3>
              <p className="text-base font-medium text-muted-foreground">
                {role} {project && <span className="text-muted-foreground/70">· {project}</span>}
              </p>
            </div>
            
            {/* Show 1-2 key skills */}
            {skills && skills.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {skills.slice(0, 2).map((skill) => (
                  <Badge 
                    key={skill}
                    className="text-xs bg-primary/10 hover:bg-primary/20 border border-primary/20 text-primary transition-colors"
                  >
                    {skill}
                  </Badge>
                ))}
                {skills.length > 2 && (
                  <span className="text-xs text-muted-foreground self-center">+{skills.length - 2} more</span>
                )}
              </div>
            )}
          </div>
          
          {/* Right: Logo */}
          {logo && (
            <div className="w-12 h-12 flex-shrink-0 rounded-lg overflow-hidden border-2 border-zinc-400 bg-black/40 backdrop-blur-sm group-hover:border-zinc-300 transition-all relative shadow-[inset_4px_4px_6px_rgba(255,255,255,0.4),inset_-4px_-4px_6px_rgba(255,255,255,0.4)]">
              <img 
                src={logo} 
                alt={`${company} logo`} 
                className="w-full h-full object-cover"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Blog Card Component
const BlogCard = ({ title, date, excerpt, tags, slug }) => (
  <Card className="group hover:border-primary/50 transition-colors">
    <CardHeader>
      <div className="flex justify-between items-start">
        <CardTitle className="text-2xl font-bold">{title}</CardTitle>
        <span className="text-sm text-muted-foreground">{date}</span>
      </div>
      <div className="flex flex-wrap gap-2 mt-2">
        {tags.map((tag) => (
          <Badge key={tag} variant="secondary" className="bg-secondary">
            {tag}
          </Badge>
        ))}
      </div>
    </CardHeader>
    <CardContent>
      <p className="text-muted-foreground mb-4">{excerpt}</p>
      <Link to={`/blog/${slug}`}>
        <Button variant="link" className="px-0 font-semibold group-hover:text-primary">
          Read more <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Button>
      </Link>
    </CardContent>
  </Card>
);

function Home() {
  const scrollRef = useRef(null);
  const terminalContentRef = useRef(null);
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const [terminalInput, setTerminalInput] = useState('');
  const [terminalHistory, setTerminalHistory] = useState([]);
  const [isTerminalClosed, setIsTerminalClosed] = useState(false);
  const [isTerminalMinimized, setIsTerminalMinimized] = useState(false);
  const [isTerminalFullscreen, setIsTerminalFullscreen] = useState(false);

  // Sort experiences by date (most recent first)
  const sortedExperiences = useMemo(() => {
    return [...experiences].sort((a, b) => {
      // Extract end dates from dateRange (format: "Month Year – Month Year")
      const getEndDate = (dateRange) => {
        const parts = dateRange.split('–');
        const endDateStr = parts.length > 1 ? parts[1].trim() : parts[0].trim();
        
        // Parse month and year
        const [month, year] = endDateStr.split(' ');
        const monthMap = {
          'Jan.': 0, 'Feb.': 1, 'Mar.': 2, 'Apr.': 3, 'May': 4, 'Jun.': 5,
          'Jul.': 6, 'Aug.': 7, 'Sep.': 8, 'Oct.': 9, 'Nov.': 10, 'Dec.': 11
        };
        
        return new Date(parseInt(year), monthMap[month] || 0);
      };
      
      const dateA = getEndDate(a.dateRange);
      const dateB = getEndDate(b.dateRange);
      
      return dateB - dateA; // Most recent first
    });
  }, []);

  // Memoize the FaultyTerminal component to prevent re-renders
  const faultyTerminalComponent = useMemo(() => (
    <FaultyTerminal
      scale={1.7}
      gridMul={[2, 1]}
      digitSize={1.7}
      timeScale={1.1}
      scanlineIntensity={0.5}
      glitchAmount={1}
      flickerAmount={1}
      noiseAmp={0.8}
      chromaticAberration={0}
      dither={0}
      curvature={0.27}
      tint="#a7ef9e"
      mouseReact={true}
      mouseStrength={1.1}
      pageLoadAnimation={true}
      brightness={0.6}
    />
  ), []); // Empty dependency array means this will only be created once

  // Auto-scroll to bottom when terminal history changes
  useEffect(() => {
    if (terminalContentRef.current) {
      terminalContentRef.current.scrollTop = terminalContentRef.current.scrollHeight;
    }
  }, [terminalHistory]);

  // Focus input when clicking anywhere on the terminal
  const handleTerminalClick = () => {
    inputRef.current?.focus();
  };

  // Handle window controls
  const handleClose = () => {
    setIsTerminalClosed(true);
  };

  const handleMinimize = () => {
    setIsTerminalMinimized(!isTerminalMinimized);
  };

  const handleFullscreen = () => {
    setIsTerminalFullscreen(!isTerminalFullscreen);
  };

  // Handle terminal commands
  const handleTerminalSubmit = (e) => {
    e.preventDefault();
    const command = terminalInput.trim().toLowerCase();
    
    // Add command to history
    setTerminalHistory(prev => [...prev, { type: 'command', text: terminalInput }]);
    
    // Process commands
    if (command === 'help') {
      setTerminalHistory(prev => [...prev, { 
        type: 'output', 
        text: 'Available commands: help, clear, projects, about, linkedin, hello'
      }]);
    } else if (command === 'clear') {
      setTerminalHistory([]);
    } else if (command === 'projects') {
      navigate('/projects');
    } else if (command === 'about') {
      navigate('/about');
    } else if (command === 'linkedin') {
      window.open('https://www.linkedin.com/in/stephen-dong/', '_blank');
      setTerminalHistory(prev => [...prev, { type: 'output', text: 'Opening LinkedIn...' }]);
    } else if (command === 'hello' || command === 'hi') {
      setTerminalHistory(prev => [...prev, { type: 'output', text: 'Hello! Welcome to my portfolio 👋' }]);
    } else if (command !== '') {
      setTerminalHistory(prev => [...prev, { 
        type: 'output', 
        text: `Command not found: ${terminalInput}. Type 'help' for available commands.`
      }]);
    }
    
    setTerminalInput('');
  };

  return (
    <main className="min-h-screen relative" ref={scrollRef}>
      {/* Fixed background light ray */}
      <div className="fixed top-0 left-0 h-screen w-full pointer-events-none z-[5]">
        <div 
          className="absolute top-0 left-[50px] h-[1200px] w-[500px] -translate-y-[300px] -rotate-45"
          style={{ background: 'var(--gradient-spotlight)' }}
        >
        </div>
      </div>

      {/* Hero Section - Simplified */}
      <section 
        className="min-h-screen flex flex-col justify-center relative z-[1] overflow-x-hidden"
        data-aos="fade-right"
      >
        {/* Faulty Terminal background - only in hero section, full width */}
        <div className="absolute inset-0 z-0 bg-[hsl(0,0%,4%)]">
          {faultyTerminalComponent}
          {/* Bottom fade overlay */}
          <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[hsl(0,0%,4%)] via-[hsl(0,0%,4%)]/80 via-30% to-transparent pointer-events-none"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 sm:px-12 md:px-16 lg:px-20 w-full relative z-[15]">
          {/* Reopen Terminal Button - shows when terminal is closed */}
          {isTerminalClosed && (
            <div className="flex flex-col items-center justify-center min-h-[400px] space-y-6">
              <Button 
                onClick={() => setIsTerminalClosed(false)}
                size="lg"
                className="group text-base sm:text-lg bg-primary hover:bg-primary/90 text-primary-foreground font-mono shadow-lg shadow-primary/20"
              >
                <ChevronRight className="mr-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                Open Terminal
                <ChevronRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          )}

          {/* Terminal Window Card */}
          {!isTerminalClosed && (
            <div className={`relative bg-black/80 border-2 border-primary/40 rounded-lg overflow-hidden shadow-2xl shadow-primary/20 transition-all duration-300 ${
              isTerminalMinimized ? 'h-12' : ''
            } ${
              isTerminalFullscreen ? 'max-w-3xl mx-auto' : ''
            }`}>
              {/* Terminal Title Bar */}
              <div className="bg-black/50 border-b-2 border-primary/30 px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex gap-2">
                    <button 
                      onClick={handleClose}
                      className="w-3 h-3 rounded-full bg-red-500/80 hover:bg-red-500 transition-colors cursor-pointer relative group flex items-center justify-center"
                      title="Close terminal"
                    >
                      <X className="w-2 h-2 text-red-900 opacity-0 group-hover:opacity-100 transition-opacity absolute" strokeWidth={3} />
                    </button>
                    <button 
                      onClick={handleMinimize}
                      className="w-3 h-3 rounded-full bg-yellow-500/80 hover:bg-yellow-500 transition-colors cursor-pointer relative group flex items-center justify-center"
                      title="Minimize terminal"
                    >
                      <Minus className="w-2 h-2 text-yellow-900 opacity-0 group-hover:opacity-100 transition-opacity absolute" strokeWidth={3} />
                    </button>
                    <button 
                      onClick={handleFullscreen}
                      className="w-3 h-3 rounded-full bg-green-500/80 hover:bg-green-500 transition-colors cursor-pointer relative group flex items-center justify-center"
                      title="Toggle size"
                    >
                      <Maximize2 className="w-2 h-2 text-green-900 opacity-0 group-hover:opacity-100 transition-opacity absolute" strokeWidth={3} />
                    </button>
                  </div>
                  <span className="text-xs text-foreground/60 font-mono">stephen@portfolio:~/intro</span>
                </div>
                <div className="text-xs text-foreground/40 font-mono hidden sm:block">bash</div>
              </div>
              
              {/* Terminal Content */}
              {!isTerminalMinimized && (
                <div 
                  ref={terminalContentRef}
                  className="h-[500px] overflow-y-auto p-6 sm:p-10 font-mono scrollbar-thin scrollbar-thumb-primary/30 scrollbar-track-transparent" 
                  onClick={handleTerminalClick}
                >
              {/* Command Line 1 */}
              <div className="flex items-start gap-2 text-primary text-sm sm:text-base mb-4">
                <span className="text-primary/80 select-none">$</span>
                <div className="flex-1">
                  <span>cat welcome.txt</span>
                </div>
              </div>
              
              {/* Output */}
              <div className="mb-6 sm:mb-8 pl-0 sm:pl-4 space-y-4 sm:space-y-6">
                <div className="space-y-2 sm:space-y-3">
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-primary/60">
                    <span className="select-none">#</span>
                    <span>WELCOME_MESSAGE</span>
                  </div>
                  <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold font-sans">
                    Hi, I am <span className="text-primary">Stephen.</span>
                  </h1>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-primary/60">
                    <span className="select-none">#</span>
                    <span>DESCRIPTION</span>
                  </div>
                  <p className="text-base sm:text-lg md:text-xl text-foreground/80 font-sans">
                    Beep boop. Let's build cool stuff together.
                  </p>
                </div>
              </div>
              
              {/* Command Line 2 */}
              <div className="flex items-start gap-2 text-primary text-sm sm:text-base mb-3">
                <span className="text-primary/80 select-none">$</span>
                <div className="flex-1">
                  <span>./navigate.sh --options</span>
                </div>
              </div>
              
              {/* Navigation Buttons as Terminal Output */}
              <div className="pl-0 sm:pl-4 mb-6">
                <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                  <Link to="/projects" className="inline-block">
                    <Button 
                      size="lg"
                      className="group text-sm sm:text-base bg-primary hover:bg-primary/90 text-primary-foreground font-mono shadow-lg shadow-primary/20"
                    >
                      [1] Projects
                      <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </Link>
                  
                  <Link to="/about" className="inline-block">
                    <Button 
                      variant="outline"
                      size="lg"
                      className="group text-sm sm:text-base border-2 border-primary/40 hover:border-primary/60 hover:bg-primary/15 text-foreground font-mono"
                    >
                      [2] About Me
                      <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </Link>
                  
                  <a 
                    href="https://www.linkedin.com/in/stephen-dong/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    <Button 
                      variant="outline"
                      size="lg"
                      className="group text-sm sm:text-base border-2 border-primary/40 hover:border-primary/60 hover:bg-primary/15 text-foreground font-mono"
                    >
                      [3] LinkedIn
                      <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </a>
                </div>
              </div>

              {/* Command History */}
              {terminalHistory.length > 0 && (
                <div className="mb-4 space-y-2">
                  {terminalHistory.map((entry, index) => (
                    <div key={index} className="text-sm sm:text-base">
                      {entry.type === 'command' ? (
                        <div className="flex items-start gap-2 text-primary">
                          <span className="text-primary/80 select-none">$</span>
                          <span>{entry.text}</span>
                        </div>
                      ) : (
                        <div className="text-foreground/70 pl-4">{entry.text}</div>
                      )}
                    </div>
                  ))}
                </div>
              )}
              
              {/* Interactive Input Line */}
              <form onSubmit={handleTerminalSubmit} className="flex items-center gap-2 text-primary text-sm sm:text-base mt-4">
                <span className="text-primary/80 select-none">$</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={terminalInput}
                  onChange={(e) => setTerminalInput(e.target.value)}
                  className="flex-1 bg-transparent border-none outline-none text-foreground font-mono caret-primary"
                  placeholder="Type 'help' for commands..."
                  autoComplete="off"
                  spellCheck="false"
                />
              </form>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 sm:px-12 md:px-16 lg:px-20 relative z-10">
        {/* Experience Section */}
        <section 
          className="py-10 sm:py-16 space-y-8"
          data-aos="fade-up" 
          data-aos-duration="1000"
        >
          <div className="space-y-4">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-primary">Experience</h2>
          </div>
          <div className="relative space-y-0">
            {/* Persistent timeline line - always visible, fading at bottom */}
            <div className="absolute left-[5px] top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/60 via-primary/40 via-70% to-transparent hidden md:block"></div>
            
            {sortedExperiences.map((experience, index) => (
              <ExperienceTimeline key={experience.id} experience={experience} index={index} />
            ))}
          </div>
        </section>
        
        {/* Blog Section */}
        <section 
          className="py-10 sm:py-16 space-y-8 mb-10"
          data-aos="fade-up" 
          data-aos-duration="1000"
        >
          <div className="space-y-4">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-primary">Latest Ideas</h2>
                <p className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed">
              Thoughts, ideas, and experiences from my journey in technology and engineering.
                </p>
          </div>
          <div className="space-y-8">
            {blogPosts.map((post, index) => (
              <div key={post.slug} data-aos="fade-up" data-aos-delay={index * 100}>
                <BlogCard {...post} />
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

export default Home;