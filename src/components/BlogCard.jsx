import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// Blog Card Component
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

export default BlogCard;
