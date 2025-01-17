import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronRight, ArrowRight, User } from 'lucide-react';
import FeaturedProject from '../components/FeaturedProject';
import HeroSection from '../components/HeroSection';
import projects from '../data/projects';
import { blogPosts } from '../data/blogData';

function Home() {
  const featuredProject = [...projects].sort((a, b) => 
    new Date(b.date) - new Date(a.date)
  )[0];
  
  // Sort blog posts to get the most recent
  const latestBlogPost = [...blogPosts].sort((a, b) => 
    new Date(b.date) - new Date(a.date)
  )[0];

  return (
    <main className="min-h-screen overflow-x-hidden">
      {/* Hero Section with Animated Background */}
      <HeroSection />

      <div className="max-w-7xl mx-auto px-8">
        {/* Latest Blog Section */}
        <section 
          className="min-h-screen flex items-center py-32"
          data-aos="fade-up" 
          data-aos-duration="1000"
        >
          <div className="w-full relative group">
            <div className="absolute -inset-1 bg-primary/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 
                            group-hover:shadow-2xl group-hover:shadow-primary/20"></div>
            <Card className="w-full relative z-10">
              <CardContent className="p-12 space-y-8">
                <h2 className="text-6xl font-bold text-primary">Latest Thoughts</h2>
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
          className="min-h-screen flex items-center py-32"
          data-aos="fade-up" 
          data-aos-duration="1000"
        >
          <div className="w-full relative group">
            <div className="absolute -inset-1 bg-[#2DB19B]/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500
                            group-hover:shadow-2xl group-hover:shadow-[#2DB19B]/20"></div>
            <Card className="w-full relative z-10">
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
          className="min-h-screen flex items-center py-32"
          data-aos="fade-up" 
          data-aos-duration="1000"
        >
          <div className="w-full relative group">
            <div className="absolute -inset-1 bg-[lightcoral]/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500
                            group-hover:shadow-2xl group-hover:shadow-[lightcoral]/20"></div>
            <Card className="w-full relative z-10">
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