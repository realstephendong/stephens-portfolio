import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import TypewriterEffect from '../components/TypewriterEffect';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronRight, MousePointer2, ArrowRight, User } from 'lucide-react';
import FeaturedProject from '../components/FeaturedProject';
import projects from '../data/projects';
import { blogPosts } from '../data/blogData';

// Import the enhanced flow field animation
import EnhancedFlowField from '../components/RandomizedFlowField';

function Home() {
  const scrollRef = useRef(null);
  const featuredProject = [...projects].sort((a, b) => 
    new Date(b.date) - new Date(a.date)
  )[0];
  
  // Sort blog posts to get the most recent
  const latestBlogPost = [...blogPosts].sort((a, b) => 
    new Date(b.date) - new Date(a.date)
  )[0];

  useEffect(() => {
    function updateMousePosition(e) {
      if (!scrollRef.current) return;
      const { clientX, clientY } = e;
      const x = clientX / window.innerWidth;
      const y = clientY / window.innerHeight;
      scrollRef.current.style.setProperty('--mouse-x', x);
      scrollRef.current.style.setProperty('--mouse-y', y);
    }

    window.addEventListener('mousemove', updateMousePosition);
    return () => window.removeEventListener('mousemove', updateMousePosition);
  }, []);

  return (
    <main className="min-h-screen overflow-x-hidden" ref={scrollRef}>
      {/* Animation background with theme support */}
      <div className="fixed inset-0 z-0 opacity-75 transition-opacity duration-500">
        <EnhancedFlowField />
      </div>
      
      <div className="max-w-7xl mx-auto px-8 relative z-10">
        {/* Hero Section */}
        <section 
          className="min-h-screen flex flex-col justify-center relative px-6"
          data-aos="fade-right"
        >
          <div 
            className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent opacity-[0.15] blur-3xl"
            style={{
              transform: 'translate(calc(var(--mouse-x) * 20px), calc(var(--mouse-y) * 20px))'
            }}
          />
          <div className="space-y-8 relative backdrop-blur-sm bg-background/30 p-8 rounded-xl">
            <div className="space-y-4">
              <TypewriterEffect />
              <h1 className="text-7xl font-semibold">
                I am <span className="text-primary">Stephen.</span>
              </h1>
            </div>
            <p className="text-xl text-muted-foreground">
              Come take a look at what I've been up to!
            </p>
            
            <div className="flex items-center gap-6">
              <Link to="/projects" className="inline-block">
                <Button 
                  size="lg"
                  className="group text-lg bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  Projects
                  <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <div className="h-12 w-px bg-border" />
              <a 
                href="https://www.linkedin.com/in/stephen-dong/" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <Button 
                  variant="outline"
                  size="lg"
                  className="group text-lg border-primary/20 hover:border-primary/40 hover:bg-primary/10"
                >
                  LinkedIn
                  <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </a>
            </div>
          </div>
          
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce">
            <div className="flex flex-col items-center text-muted-foreground p-2 rounded-full">
              <MousePointer2 className="h-6 w-6" />
              <span className="text-sm">Scroll to explore</span>
            </div>
          </div>
        </section>

        {/* Latest Blog Section */}
        <section 
          className="py-16 flex items-center"
          data-aos="fade-up" 
          data-aos-duration="1000"
        >
          <div className="w-full relative group">
            <div className="absolute -inset-1 bg-primary/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 
                            group-hover:shadow-2xl group-hover:shadow-primary/20"></div>
            <Card className="w-full relative z-10 backdrop-blur-md bg-background/70">
              <CardContent className="p-12 space-y-8">
                <h2 className="text-6xl font-bold text-primary">Latest Ideas</h2>
                <div className="grid md:grid-cols-2 gap-12">
                  <Link to={`/blog/${latestBlogPost.slug}`} className="block">
                    <Card className="bg-background/50 backdrop-blur hover:bg-background/70 transition-colors">
                      <CardContent className="p-8 space-y-4">
                        <h3 className="text-2xl font-semibold">{latestBlogPost.title}</h3>
                        <p className="text-muted-foreground">
                          {latestBlogPost.excerpt}
                        </p>
                        <div className="group/link inline-flex items-center text-primary">
                          Read more
                          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/link:translate-x-1" />
                        </div>
                      </CardContent>
                    </Card>
                  </Link>

                  <div className="space-y-6">
                    <p className="text-xl text-muted-foreground leading-relaxed">
                      I write about technology, engineering, and my experiences as a student and developer.
                    </p>
                    <Link to="/blog" className="inline-block">
                      <Button 
                        variant="outline"
                        size="lg"
                        className="group text-lg border-primary/20 hover:border-primary hover:text-primary transition-colors"
                      >
                        View all posts
                        <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* About Section */}
        <section 
          className="py-16 flex items-center"
          data-aos="fade-up" 
          data-aos-duration="1000"
        >
          <div className="w-full relative group">
            <div className="absolute -inset-1 bg-[#2DB19B]/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500
                            group-hover:shadow-2xl group-hover:shadow-[#2DB19B]/20"></div>
            <Card className="w-full relative z-10 backdrop-blur-md bg-background/70">
              <CardContent className="p-12 space-y-12">
                <h2 className="text-6xl font-bold text-[#2DB19B]">About Me</h2>
                <div className="grid md:grid-cols-2 gap-12 items-center">
                  <div className="space-y-6">
                    <p className="text-xl text-muted-foreground leading-relaxed">
                      Learn more about my background, skills, and the journey that shapes my approach to technology and innovation.
                    </p>
                    <Link to="/about" className="inline-block">
                      <Button 
                        variant="outline"
                        size="lg"
                        className="group text-lg border-[#2DB19B]/20 hover:border-[#2DB19B] hover:text-[#2DB19B] transition-colors"
                      >
                        Get to know me
                        <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Button>
                    </Link>
                  </div>
                  <div className="flex justify-center">
                    <User className="h-48 w-48 text-[#2DB19B]/50" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Projects Section */}
        <section 
          className="py-16 flex items-center"
          data-aos="fade-up" 
          data-aos-duration="1000"
        >
          <div className="w-full relative group">
            <div className="absolute -inset-1 bg-[lightcoral]/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500
                            group-hover:shadow-2xl group-hover:shadow-[lightcoral]/20"></div>
            <Card className="w-full relative z-10 backdrop-blur-md bg-background/70">
              <CardContent className="p-12 space-y-12">
                <h2 className="text-6xl font-bold text-[lightcoral]">Projects</h2>
                <FeaturedProject project={featuredProject} />
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </main>
  );
}

export default Home;