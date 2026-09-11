import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { blogPosts } from '../data/blogData';
import { useTheme } from '../components/theme-provider';

const BlogCard = ({ title, date, excerpt, tags, slug }) => (
  <Card className="group hover:border-primary/50 transition-colors">
    <CardHeader>
      <div className="flex justify-between items-start gap-4">
        <CardTitle className="font-mono text-xl sm:text-2xl tracking-tight">{title}</CardTitle>
        <span className="shrink-0 font-mono text-xs text-muted-foreground">{date}</span>
      </div>
      <div className="flex flex-wrap gap-2 mt-2">
        {tags.map((tag) => (
          <Badge key={tag} variant="secondary" className="bg-secondary font-mono font-normal">
            {tag}
          </Badge>
        ))}
      </div>
    </CardHeader>
    <CardContent>
      <p className="mb-4 text-sm leading-relaxed text-muted-foreground">{excerpt}</p>
      <Link to={`/blog/${slug}`}>
        <Button variant="link" className="px-0 font-mono text-sm group-hover:text-primary">
          read more
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
          <section>
            <h1 className="font-mono text-4xl sm:text-5xl md:text-6xl tracking-tight text-foreground">
              writing
            </h1>
          </section>

          <section className="space-y-8">
            {blogPosts.map((post, index) => (
              <div key={post.slug}>
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