// src/pages/Home.js

import React, { useRef, useState, useEffect, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../components/theme-provider';
import { Button } from "@/components/ui/button";
import {
  ChevronRight,
} from 'lucide-react';
import { blogPosts } from '../data/blogData';
import experiences from '../data/experienceData';
import { projects } from '../data/projects';

// Import the faulty terminal animation
import FaultyTerminal from '../components/FaultyTerminal';

// Import the new Terminal components
import Terminal from '../components/Terminal';
import TerminalIntro from '../components/TerminalIntro';

// Import the extracted components
import ExperienceTimeline from '../components/ExperienceTimeline';
import BlogCard from '../components/BlogCard';
import ProjectCard from '../components/ProjectCard';


function Home() {
  const scrollRef = useRef(null);
  const { theme } = useTheme();

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
      tint={theme === 'light' ? '#0099FF' : '#a7ef9e'}
      mouseReact={true}
      mouseStrength={0.4}
      pageLoadAnimation={true}
      brightness={0.6}
    />
  ), [theme]);

  return (
    <main className="min-h-screen relative" ref={scrollRef}>
      {/* Fixed background light ray */}
      <div className="fixed top-0 left-0 h-screen w-full pointer-events-none z-[5]">
        <div
          className="absolute top-0 left-[50px] h-[1200px] w-[500px] -translate-y-[300px] -rotate-45"
          style={{
            background: theme === 'dark'
              ? 'var(--gradient-spotlight-dark)'
              : 'var(--gradient-spotlight-light)'
          }}
        >
        </div>
      </div>

      {/* Hero Section*/}
      <section 
        className="min-h-screen flex flex-col justify-center relative z-[1] overflow-x-hidden"
        data-aos="fade-in"
      >
        <div className="absolute inset-0 z-0 bg-background">
          {faultyTerminalComponent}
          <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-background via-background/80 via-30% to-transparent pointer-events-none"></div>
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
          id="experience"
          className="py-10 sm:py-16 space-y-8"
        >
          <div className="space-y-4">
            <h2 className="inline-block text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-foreground to-foreground/30 bg-clip-text text-transparent">Experience</h2>
          </div>
            <div className="grid gap-y-16 md:gap-y-18">
              {sortedExperiences.map((experience, index) => (
                <div key={experience.id} data-aos="fade-up" data-aos-delay={index * 150}>
                  <ExperienceTimeline experience={experience} index={index} />
                </div>
              ))}
            </div>

          {/* Projects Section */}
          <div id="projects" className="space-y-8">
            <div className="space-y-4" data-aos="fade-up">
              <h2 className="
                inline-block
                text-3xl sm:text-4xl md:text-5xl
                font-bold
                bg-gradient-to-r from-foreground to-foreground/30
                bg-clip-text text-transparent
              ">
                Projects
              </h2>
            </div>
            <div className="relative">
              {/* Staggered 2-column layout */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-12">
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
            <h2 className="inline-block text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-foreground to-foreground/30 bg-clip-text text-transparent">Blog</h2>
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