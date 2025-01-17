import React from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ArrowLeft } from 'lucide-react';
import { getBlogPostBySlug } from '../data/blogData';
import NotFound from './NotFound'; // You'll need to create this component

const BlogPost = () => {
  const { slug } = useParams();
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return <NotFound />;
  }

  return (
    <main className="min-h-screen pt-32 pb-16">
      <div className="max-w-3xl mx-auto px-8">
        <div className="space-y-8">
          {/* Navigation */}
          <Link to="/blog" className="inline-block">
            <Button 
              variant="ghost" 
              className="group mb-8"
            >
              <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
              Back to blog
            </Button>
          </Link>

          {/* Article Header */}
          <div className="space-y-4">
            <div className="flex gap-2">
              {post.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold">{post.title}</h1>
            <div className="flex items-center gap-4 text-muted-foreground">
              <span>{post.author}</span>
              <span>•</span>
              <span>{post.date}</span>
            </div>
          </div>

          {/* Article Content */}
          <Card className="mt-8">
            <CardContent className="p-8 prose dark:prose-invert prose-lg max-w-none">
              <p className="font-semibold text-lg">Abstract</p>
              <p>{post.content.abstract}</p>

              {post.content.sections.map((section, index) => (
                <React.Fragment key={index}>
                  <h2>{section.title}</h2>
                  {section.paragraphs.map((paragraph, pIndex) => (
                    <p key={pIndex}>{paragraph}</p>
                  ))}
                </React.Fragment>
              ))}

              <h2>Conclusion</h2>
              <p>{post.content.conclusion}</p>

              <div className="mt-12 pt-8 border-t space-y-4">
                <p className="text-sm text-muted-foreground">
                  Submitted to {post.content.publicationInfo.journal}, {post.content.publicationInfo.year}
                </p>
                <p className="text-sm text-muted-foreground">
                  {post.content.publicationInfo.copyright}
                </p>
                
                {post.fullDocumentLink && (
                  <div className="mt-6 text-center">
                    <a 
                      href={post.fullDocumentLink} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="inline-block"
                    >
                      <Button variant="default" className="bg-primary text-primary-foreground hover:bg-primary/90">
                        Read Full Document
                      </Button>
                    </a>
                    <p className="text-xs text-muted-foreground mt-2">
                      Opens in a new tab
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
};

export default BlogPost;