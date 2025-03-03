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
    <div className="my-3 sm:my-4">
      <div className="relative bg-zinc-950 rounded-lg overflow-hidden">
        <div className="flex justify-between items-center px-3 sm:px-4 py-2 bg-zinc-900">
          <span className="text-xs sm:text-sm text-zinc-400">{language}</span>
          <Button
            variant="ghost"
            size="sm"
            onClick={copyToClipboard}
            className="h-6 w-6 sm:h-8 sm:w-8 p-0 hover:bg-zinc-800"
          >
            {copied ? (
              <Check className="h-3 w-3 sm:h-4 sm:w-4 text-green-500" />
            ) : (
              <Copy className="h-3 w-3 sm:h-4 sm:w-4 text-zinc-400" />
            )}
          </Button>
        </div>
        <div className="p-3 sm:p-4 overflow-x-auto">
          <pre className="text-xs sm:text-sm font-mono text-zinc-100 whitespace-pre-wrap sm:whitespace-pre">{code}</pre>
        </div>
      </div>
      {description && (
        <p className="text-xs sm:text-sm text-muted-foreground mt-2 italic">{description}</p>
      )}
    </div>
  );
};

const TutorialSection = ({ section }) => (
  <div className="mb-6 sm:mb-8">
    <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">{section.title}</h2>
    {section.content && (
      <p className="mb-3 sm:mb-4 text-sm sm:text-base whitespace-pre-line">{section.content}</p>
    )}
    
    {section.codeBlocks?.map((codeBlock, index) => (
      <CodeBlock key={index} {...codeBlock} />
    ))}
    
    {section.note && (
      <div className="mt-3 sm:mt-4 p-3 sm:p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
        <p className="text-xs sm:text-sm text-blue-500">{section.note}</p>
      </div>
    )}
  </div>
);

const StandardBlogPost = ({ post }) => (
  <Card className="mt-6 sm:mt-8">
    <CardContent className="p-4 sm:p-6 md:p-8 prose dark:prose-invert prose-sm sm:prose-base md:prose-lg max-w-none">
      <p className="font-semibold text-base sm:text-lg">Abstract</p>
      <p className="text-sm sm:text-base">{post.content.abstract}</p>

      {post.content.sections?.map((section, index) => (
        <React.Fragment key={index}>
          <h2 className="text-xl sm:text-2xl mt-6 sm:mt-8">{section.title}</h2>
          {section.paragraphs?.map((paragraph, pIndex) => (
            <p key={pIndex} className="text-sm sm:text-base">{paragraph}</p>
          ))}
        </React.Fragment>
      ))}

      <h2 className="text-xl sm:text-2xl mt-6 sm:mt-8">Conclusion</h2>
      <p className="text-sm sm:text-base">{post.content.conclusion}</p>

      <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t space-y-3 sm:space-y-4">
        <p className="text-xs sm:text-sm text-muted-foreground">
          Submitted to {post.content.publicationInfo.journal}, {post.content.publicationInfo.year}
        </p>
        <p className="text-xs sm:text-sm text-muted-foreground">
          {post.content.publicationInfo.copyright}
        </p>
        
        {post.fullDocumentLink && (
          <div className="mt-4 sm:mt-6 text-center">
            <a 
              href={post.fullDocumentLink} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-block"
            >
              <Button variant="default" className="text-sm sm:text-base bg-primary text-primary-foreground hover:bg-primary/90">
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
  <Card className="mt-6 sm:mt-8">
    <CardContent className="p-4 sm:p-6 md:p-8">
      <p className="text-sm sm:text-base md:text-lg mb-6 sm:mb-8">{post.content.intro}</p>
      
      {post.content.sections?.map((section, index) => (
        <TutorialSection key={index} section={section} />
      ))}

      {post.content.tips && (
        <div className="mt-6 sm:mt-8 p-4 sm:p-6 bg-amber-500/10 rounded-lg">
          <div className="flex items-center gap-2 space-y-1 sm:space-y-2 pb-2">
            <Lightbulb className="h-5 w-5 sm:h-7 sm:w-7 text-amber-500" />
            <h3 className="text-base sm:text-lg m-0 font-semibold text-amber-500">Pro Tips</h3>
          </div>
          <ul className="list-disc list-inside space-y-1 sm:space-y-2">
            {post.content.tips.map((tip, index) => (
              <li key={index} className="text-xs sm:text-sm text-muted-foreground">{tip}</li>
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
    <main className="min-h-screen pt-24 sm:pt-28 md:pt-32 pb-10 sm:pb-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="space-y-4 sm:space-y-6 md:space-y-8">
          {/* Navigation */}
          <Link to="/blog" className="inline-block">
            <Button 
              variant="ghost" 
              className="group mb-4 sm:mb-6 md:mb-8 text-sm sm:text-base"
            >
              <ArrowLeft className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4 transition-transform group-hover:-translate-x-1" />
              Back to blog
            </Button>
          </Link>

          {/* Article Header */}
          <div className="space-y-3 sm:space-y-4">
            <div className="flex flex-wrap gap-1 sm:gap-2">
              {post.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs sm:text-sm">
                  {tag}
                </Badge>
              ))}
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">{post.title}</h1>
            <div className="flex items-center gap-2 sm:gap-4 text-xs sm:text-sm text-muted-foreground">
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