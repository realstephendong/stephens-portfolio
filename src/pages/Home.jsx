// src/pages/Home.js

import React, { useRef, useMemo } from 'react';
import { useTheme } from '../components/theme-provider';
import { blogPosts } from '../data/blogData';
import experiences from '../data/experienceData';
import { projects } from '../data/projects';

import Hero from '../components/Hero';
import ExperienceSection from '../components/ExperienceSection';
import { buildRailItems, sortByRecency } from '../lib/career';
import BlogCard from '../components/BlogCard';
import ProjectCard from '../components/ProjectCard';

const SectionHeading = ({ children, meta }) => (
  <div className="flex items-baseline gap-5">
    <h2 className="font-mono text-3xl tracking-tight text-foreground sm:text-4xl md:text-5xl">
      {children}
    </h2>
    <span aria-hidden="true" className="h-px flex-1 -translate-y-2 bg-foreground/10" />
    {meta && (
      <span className="font-mono text-xs tabular-nums text-muted-foreground">{meta}</span>
    )}
  </div>
);

function Home() {
  const scrollRef = useRef(null);
  const { theme } = useTheme();

  const railItems = useMemo(() => buildRailItems(sortByRecency(experiences)), []);

  const sortedProjects = useMemo(
    () => [...projects].sort((a, b) => new Date(b.date) - new Date(a.date)),
    []
  );

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

      <Hero railItems={railItems} />

      <div className="max-w-7xl mx-auto px-6 sm:px-12 md:px-16 lg:px-20 relative z-10">
        <ExperienceSection experiences={experiences} railItems={railItems} />

        {/* Projects Section */}
        <section id="projects" className="py-10 sm:py-16 space-y-10">
          <SectionHeading meta={`${sortedProjects.length} built`}>projects</SectionHeading>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-12">
              {sortedProjects.filter((_, index) => index % 2 === 0).map((project, index) => (
                <div key={project.title} className={index === 0 ? '' : 'md:mt-20'}>
                  <ProjectCard {...project} />
                </div>
              ))}
            </div>

            <div className="space-y-12 md:mt-16">
              {sortedProjects.filter((_, index) => index % 2 === 1).map((project, index) => (
                <div key={project.title} className={index === 0 ? 'md:mt-12' : 'md:mt-20'}>
                  <ProjectCard {...project} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Blog Section */}
        <section className="py-10 sm:py-16 space-y-10 mb-10">
          <SectionHeading meta={`${blogPosts.length} posts`}>writing</SectionHeading>
          <div className="space-y-8">
            {blogPosts.map((post) => (
              <BlogCard key={post.slug} {...post} />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

export default Home;
