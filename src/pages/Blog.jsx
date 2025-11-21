import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { blogPosts } from '../data/blogData';
import { useTheme } from '../components/theme-provider';

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

const Blog = () => {
  const { theme } = useTheme();
  return (
    <main className="min-h-screen pt-32 pb-16">
      <div className="max-w-4xl mx-auto px-8">
        <div className="space-y-12">
          <section data-aos="fade-down" data-aos-duration="1000">
            <h1 className="text-6xl font-bold bg-gradient-to-r from-foreground to-foreground/10 bg-clip-text text-transparent">
              Blog
            </h1>
          </section>

          <section className="space-y-8">
            {blogPosts.map((post, index) => (
              <div key={post.slug} data-aos="fade-up" data-aos-delay={index * 100}>
                <BlogCard {...post} />
              </div>
            ))}
          </section>
        </div>
      </div>

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
    </main>
  );
};

export default Blog;