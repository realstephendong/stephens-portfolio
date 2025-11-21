import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from 'lucide-react';

// Blog Card Component
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

export default BlogCard;
