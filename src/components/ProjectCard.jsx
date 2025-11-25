import React from 'react';
import { Card, CardContent } from "@/components/ui/card";

// Project Card Component
const ProjectCard = ({ title, backgroundImage, image, tags, link }) => {
  const cardContent = (
    <Card className={`hover:border-primary/50 transition-colors overflow-hidden relative ${link ? 'cursor-pointer' : ''}`}>
    <CardContent className="p-0">
      <div className="relative aspect-[1079/740] overflow-hidden">
        {/* Background gradient */}
        <img
          src={backgroundImage}
          alt={`${title} background`}
          className="w-full h-full object-cover absolute inset-0"
        />

        {/* Project image overlay */}
        <img
          src={image}
          alt={title}
          className="w-full h-full object-contain transition-transform duration-500 hover:scale-105 relative z-10"
        />

        {/* Overlay with gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent opacity-100 flex flex-col justify-between p-4 z-20 pointer-events-none">
          <div className="self-end">
            <span className="bg-white/90 text-black px-3 py-1 rounded-full text-sm font-medium">
              {tags[0]}
            </span>
          </div>
          <div className="self-start">
            <h3 className="text-2xl md:text-3xl lg:text-4xl pl-3 font-bold bg-gradient-to-r from-white to-white/50 bg-clip-text text-transparent">
              {title}
            </h3>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
  );

  return link ? (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="block"
    >
      {cardContent}
    </a>
  ) : (
    cardContent
  );
};

export default ProjectCard;
