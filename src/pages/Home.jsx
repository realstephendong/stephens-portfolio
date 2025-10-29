import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ChevronRight, 
  MousePointer2, 
  ArrowRight
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
          <div className="flex flex-col gap-1 w-full md:w-36 flex-shrink-0">
            <span className="text-sm font-semibold text-foreground/90">{dateRange}</span>
            <span className="text-xs text-muted-foreground">{location}</span>
          </div>
          
          {/* Connecting line */}
          <div className="hidden md:block flex-grow h-[2px] bg-primary/40 max-w-[200px]"></div>
          
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
          {/* Bottom fade overlay */}
          <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[hsl(0,0%,4%)] via-[hsl(0,0%,4%)]/80 via-30% to-transparent pointer-events-none"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 sm:px-12 md:px-16 lg:px-20 w-full relative z-[15]">
          <div className="space-y-6 sm:space-y-8 bg-background/30 p-6 sm:p-10 rounded-xl backdrop-blur-sm">
            <div className="space-y-2 sm:space-y-4">
              <h1 className="text-4xl sm:text-5xl md:text-7xl font-semibold">
                Hi, I am <span className="text-primary">Stephen.</span>
              </h1>
            </div>
            <p className="text-lg sm:text-xl text-muted-foreground">
              A software engineer passionate about building impactful solutions. Explore my work, experiences, and thoughts below.
            </p>
            
            <div className="flex flex-wrap items-center gap-4 sm:gap-6">
              <Link to="/projects" className="inline-block">
                <Button 
                  size="lg"
                  className="group text-base sm:text-lg bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  Projects
                  <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <div className="hidden sm:block h-12 w-px bg-border" />
              <Link to="/about" className="inline-block">
                <Button 
                  variant="outline"
                  size="lg"
                  className="group text-base sm:text-lg border-primary/20 hover:border-primary/40 hover:bg-primary/10"
                >
                  About Me
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
                  className="group text-base sm:text-lg border-primary/20 hover:border-primary/40 hover:bg-primary/10"
                >
                  LinkedIn
                  <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </a>
            </div>
          </div>
        </div>
        
        <div className="absolute left-1/2 bottom-12 z-[15]">
          <div className="flex flex-col items-center text-muted-foreground p-2 rounded-full -translate-x-1/2 animate-bounce">
            <MousePointer2 className="h-5 w-5 sm:h-6 sm:w-6" />
            <span className="text-xs sm:text-sm">Scroll to explore</span>
          </div>
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
                    <p className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed">
              Places I've worked and projects I've contributed to throughout my career.
            </p>
          </div>
          <div className="relative space-y-0">
            {/* Persistent timeline line - always visible, fading at bottom */}
            <div className="absolute left-[5px] top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/60 via-primary/40 via-70% to-transparent hidden md:block"></div>
            
            {experiences.map((experience, index) => (
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