// src/pages/Home.js

import React, { useRef, useState, useEffect, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ChevronRight, 
  ArrowRight,
} from 'lucide-react';
import { blogPosts } from '../data/blogData';
import experiences from '../data/experienceData';
import { projects } from '../data/projects';

// Import the faulty terminal animation
import FaultyTerminal from '../components/FaultyTerminal';

// Import the new Terminal components
import Terminal from '../components/Terminal';
import TerminalIntro from '../components/TerminalIntro';

// Experience Timeline Component
const ExperienceTimeline = ({ experience, index }) => {
  const {
    role, company, logo, location, project, dateRange, jobfocus
  } = experience;

  return (
    <div
      className="group"
      data-aos="fade-up"
      data-aos-duration="800"
      data-aos-delay={index * 150}
      data-aos-easing="ease-out"
    >
      {/* Content */}
      <div className="flex items-center space-y-8 gap-12 md:gap-14 flex-wrap md:flex-nowrap">
        {/* Left: Date & Location */}
        <div className="flex flex-col gap-1 w-full md:w-56 flex-shrink-0">
          <span className="text-lg font-semibold text-foreground/90 whitespace-nowrap">{dateRange}</span>
          <span className="text-md text-muted-foreground whitespace-nowrap">{location}</span>
        </div>

        {/* Connecting line */}
        <div className="hidden md:block flex-grow h-px bg-white/40 max-w-[200px]"></div>

        {/* Company & Role */}
        <div className="flex-1 min-w-0 space-y-4">
            <div>
              <h3 className="text-2xl sm:text-3xl font-bold text-foreground group-hover:text-primary transition-colors">
                {company}
              </h3>
              <p className="text-lg font-medium text-muted-foreground">
                {role} {project && <span className="text-muted-foreground/70">· {project}</span>}
              </p>
            </div>

            {jobfocus && (
              <div className="flex flex-wrap gap-2">
                  <Badge
                    key={jobfocus}
                    className="text-md bg-primary/10 hover:bg-primary/20 border border-primary/20 text-primary transition-colors"
                  >
                    {jobfocus}
                  </Badge>
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

// Project Card Component
const ProjectCard = ({ title, backgroundImage, image, tags, link }) => {
  const cardContent = (
    <Card className={`hover:border-primary/50 transition-colors overflow-hidden relative ${link ? 'cursor-pointer' : ''}`}>
    <CardContent className="p-0">
      <div className="relative aspect-[1079/740] overflow-hidden">
        {/* Background gradient */}
        <img
          src={backgroundImage}
          alt={`${title} background`}
          className="w-full h-full object-cover absolute inset-0"
        />

        {/* Project image overlay */}
        <img
          src={image}
          alt={title}
          className="w-full h-full object-contain transition-transform duration-500 hover:scale-105 relative z-10"
        />

        {/* Overlay with gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent opacity-100 flex flex-col justify-between p-4 z-20 pointer-events-none">
          {/* Description label in top right */}
          <div className="self-end">
            <span className="bg-white/90 text-black px-3 py-1 rounded-full text-sm font-medium">
              {tags[0]}
            </span>
          </div>
          {/* Project name at bottom */}
          <div className="self-start">
            <h3 className="text-2xl md:text-3xl lg:text-4xl pl-3 font-bold bg-gradient-to-r from-white to-white/50 bg-clip-text text-transparent">
              {title}
            </h3>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
  );

  return link ? (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="block"
    >
      {cardContent}
    </a>
  ) : (
    cardContent
  );
};

function Home() {
  const scrollRef = useRef(null);
  
  const [isTerminalClosed, setIsTerminalClosed] = useState(false);

  // Sort experiences by date
  const sortedExperiences = useMemo(() => {
    return [...experiences].sort((a, b) => {
      const getEndDate = (dateRange) => {
        const parts = dateRange.split('–');
        const endDateStr = parts.length > 1 ? parts[1].trim() : parts[0].trim();

        const [month, year] = endDateStr.split(' ');
        const monthMap = {
          'Jan.': 0, 'Feb.': 1, 'Mar.': 2, 'Apr.': 3, 'May': 4, 'Jun.': 5,
          'Jul.': 6, 'Aug.': 7, 'Sep.': 8, 'Oct.': 9, 'Nov.': 10, 'Dec.': 11
        };

        return new Date(parseInt(year), monthMap[month] || 0);
      };

      const dateA = getEndDate(a.dateRange);
      const dateB = getEndDate(b.dateRange);

      return dateB - dateA;
    });
  }, []);

  // Sort projects by date, most recent first
  const sortedProjects = useMemo(() => {
    return [...projects].sort((a, b) => new Date(b.date) - new Date(a.date));
  }, []);

  const faultyTerminalComponent = useMemo(() => (
    <FaultyTerminal
      scale={1.7}
      gridMul={[2, 1]}
      digitSize={1.5}
      timeScale={1.1}
      scanlineIntensity={0.7}
      glitchAmount={1}
      flickerAmount={1}
      noiseAmp={0.8}
      chromaticAberration={0}
      dither={0}
      curvature={0.3}
      tint="#a7ef9e"
      mouseReact={true}
      mouseStrength={0.4}
      pageLoadAnimation={true}
      brightness={0.6}
    />
  ), []);

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

      {/* Hero Section*/}
      <section 
        className="min-h-screen flex flex-col justify-center relative z-[1] overflow-x-hidden"
        data-aos="fade-in"
      >
        <div className="absolute inset-0 z-0 bg-[hsl(0,0%,4%)]">
          {faultyTerminalComponent}
          <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[hsl(0,0%,4%)] via-[hsl(0,0%,4%)]/80 via-30% to-transparent pointer-events-none"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 sm:px-12 md:px-16 lg:px-20 w-full relative z-[15]">
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
          <Terminal
            currentPage="home"
            isClosed={isTerminalClosed}
            onSetIsClosed={setIsTerminalClosed}
            shrunkSizeClass="w-4/5 sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-2/5 mx-auto"
          >
            <TerminalIntro currentPage="home" />
          </Terminal>
          
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 sm:px-12 md:px-16 lg:px-20 relative z-10">
        {/* Experience Section */}
        <section 
          className="py-10 sm:py-16 space-y-16"
          data-aos="fade-up"
          data-aos-duration="1000"
        >
          <div className="space-y-4">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary">Experience</h2>
          </div>
            <div className="space-y-16">
              {sortedExperiences.map((experience, index) => (
                <ExperienceTimeline key={experience.id} experience={experience} index={index} />
              ))}
            </div>

          {/* Projects Section */}
          <div className="space-y-8">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary">Projects</h2>
            <div className="relative">
              {/* Staggered 2-column layout */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
                {/* Left Column - Projects 1 & 3 */}
                <div className="space-y-12">
                  {sortedProjects.filter((_, index) => index % 2 === 0).map((project, index) => (
                    <div
                      key={project.id}
                      data-aos="fade-up"
                      data-aos-delay={index * 150}
                      className={index === 0 ? "" : "md:mt-20"}
                    >
                      <ProjectCard {...project} />
                    </div>
                  ))}
                </div>

                {/* Right Column - Projects 2 & 4 (offset down) */}
                <div className="space-y-12 md:mt-16">
                  {sortedProjects.filter((_, index) => index % 2 === 1).map((project, index) => (
                    <div
                      key={project.id}
                      data-aos="fade-up"
                      data-aos-delay={(index + 1) * 150}
                      className={index === 0 ? "md:mt-12" : "md:mt-20"}
                    >
                      <ProjectCard {...project} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Blog Section */}
        <section 
          className="py-10 sm:py-16 space-y-8 mb-10"
          data-aos="fade-up" 
          data-aos-duration="1000"
        >
          <div className="space-y-4">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary">Blog</h2>
                <p className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed">
              Stuff I like to talk about.
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