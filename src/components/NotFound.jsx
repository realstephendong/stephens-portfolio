import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";

const NotFound = () => {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center text-center px-4 sm:px-6 md:px-8">
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-3 sm:mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/50">
        404
      </h1>
      <p className="text-lg sm:text-xl md:text-2xl mb-6 sm:mb-8 text-muted-foreground">
        Oops! The blog post you're looking for doesn't exist.
      </p>
      <Link to="/blog">
        <Button variant="default" className="text-sm sm:text-base">
          Back to Blog
        </Button>
      </Link>
    </main>
  );
};

export default NotFound;