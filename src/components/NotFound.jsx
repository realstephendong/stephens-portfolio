import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";

const NotFound = () => {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/50">
        404
      </h1>
      <p className="text-2xl mb-8 text-muted-foreground">
        Oops! The blog post you're looking for doesn't exist.
      </p>
      <Link to="/blog">
        <Button variant="default">
          Back to Blog
        </Button>
      </Link>
    </main>
  );
};

export default NotFound;