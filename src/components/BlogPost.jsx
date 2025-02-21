import React from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ArrowLeft, Copy, Check, Lightbulb } from 'lucide-react';
import { getBlogPostBySlug } from '../data/blogData';
import NotFound from './NotFound';

const CodeBlock = ({ code, language, description }) => {
  const [copied, setCopied] = React.useState(false);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="my-4">
      <div className="relative bg-zinc-950 rounded-lg overflow-hidden">
        <div className="flex justify-between items-center px-4 py-2 bg-zinc-900">
          <span className="text-sm text-zinc-400">{language}</span>
          <Button
            variant="ghost"
            size="sm"
            onClick={copyToClipboard}
            className="h-8 w-8 p-0 hover:bg-zinc-800"
          >
            {copied ? (
              <Check className="h-4 w-4 text-green-500" />
            ) : (
              <Copy className="h-4 w-4 text-zinc-400" />
            )}
          </Button>
        </div>
        <pre className="p-4 overflow-x-auto">
          <code className="text-sm font-mono text-zinc-100">{code}</code>
        </pre>
      </div>
      {description && (
        <p className="text-sm text-muted-foreground mt-2 italic">{description}</p>
      )}
    </div>
  );
};

const TutorialSection = ({ section }) => (
  <div className="mb-8">
    <h2 className="text-2xl font-bold mb-4">{section.title}</h2>
    {section.content && (
      <p className="mb-4 whitespace-pre-line">{section.content}</p>
    )}
    
    {section.codeBlocks?.map((codeBlock, index) => (
      <CodeBlock key={index} {...codeBlock} />
    ))}
    
    {section.note && (
      <div className="mt-4 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
        <p className="text-sm text-blue-500">{section.note}</p>
      </div>
    )}
  </div>
);

const StandardBlogPost = ({ post }) => (
  <Card className="mt-8">
    <CardContent className="p-8 prose dark:prose-invert prose-lg max-w-none">
      <p className="font-semibold text-lg">Abstract</p>
      <p>{post.content.abstract}</p>

      {post.content.sections?.map((section, index) => (
        <React.Fragment key={index}>
          <h2>{section.title}</h2>
          {section.paragraphs?.map((paragraph, pIndex) => (
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
);

const TutorialBlogPost = ({ post }) => (
  <Card className="mt-8">
    <CardContent className="p-8">
      <p className="text-lg mb-8">{post.content.intro}</p>
      
      {post.content.sections?.map((section, index) => (
        <TutorialSection key={index} section={section} />
      ))}

      {post.content.tips && (
        <div className="mt-8 p-6 bg-amber-500/10 rounded-lg">
          <div className="flex items-center gap-2 space-y-2 pb-2">
            <Lightbulb className="h-7 w-7 text-amber-500" />
            <h3 className="text-lg m-0 font-semibold text-amber-500">Pro Tips</h3>
          </div>
          <ul className="list-disc list-inside space-y-2">
            {post.content.tips.map((tip, index) => (
              <li key={index} className="text-muted-foreground">{tip}</li>
            ))}
          </ul>
        </div>
      )}
    </CardContent>
  </Card>
);

const BlogPost = () => {
  const { slug } = useParams();
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return <NotFound />;
  }

  // Determine post type based on content structure
  const isTutorial = Boolean(post.content.intro);

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

          {/* Render appropriate content based on post type */}
          {isTutorial ? (
            <TutorialBlogPost post={post} />
          ) : (
            <StandardBlogPost post={post} />
          )}
        </div>
      </div>
    </main>
  );
};

export default BlogPost;