import { useState, useRef, useEffect } from 'react';
import { 
  Play, 
  Pause, 
  ChevronRight, 
  Maximize, 
  Minimize,
  ArrowLeft,
  ArrowRight
} from 'lucide-react';
import { Button } from "@/components/ui/button";

const MediaShowcase = ({ media, color }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);
  const iframeRef = useRef(null);
  const showcaseRef = useRef(null);

  const currentMedia = media[activeIndex];
  
  // Reset video state when changing media items
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  }, [activeIndex]);
  
  // Handle fullscreen changes
  useEffect(() => {
    const handleEscKey = (e) => {
      if (e.key === 'Escape' && isFullscreen) {
        setIsFullscreen(false);
      }
    };
    
    document.addEventListener('keydown', handleEscKey);
    return () => document.removeEventListener('keydown', handleEscKey);
  }, [isFullscreen]);
  
  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? media.length - 1 : prev - 1));
  };
  
  const handleNext = () => {
    setActiveIndex((prev) => (prev === media.length - 1 ? 0 : prev + 1));
  };
  
  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };
  
  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };
  
  const handleVideoEnd = () => {
    setIsPlaying(false);
  };

  const renderMedia = () => {
    switch(currentMedia.type) {
      case 'video':
        return (
          <>
            <video
              ref={videoRef}
              src={currentMedia.url}
              poster={currentMedia.thumbnail}
              className="w-full h-full object-contain"
              onEnded={handleVideoEnd}
              controls={isFullscreen}
            />
            
            {/* Video controls overlay (only show when not fullscreen) */}
            {!isFullscreen && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 hover:opacity-100 transition-opacity">
                <button 
                  onClick={togglePlay}
                  className="p-3 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors"
                >
                  {isPlaying ? (
                    <Pause className="h-8 w-8 text-white" />
                  ) : (
                    <Play className="h-8 w-8 text-white" />
                  )}
                </button>
              </div>
            )}
          </>
        );
      
      case 'externalVideo':
        // For external videos (Google Drive, YouTube, etc.)
        return (
          <iframe
            ref={iframeRef}
            src={currentMedia.embedUrl}
            className="w-full h-full"
            allowFullScreen
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          />
        );
      
      case 'image':
      default:
        return (
          <img 
            src={currentMedia.url} 
            alt={currentMedia.title}
            className="w-full h-full object-contain"
          />
        );
    }
  };

  if (!media || media.length === 0) return null;

  return (
    <div 
      ref={showcaseRef}
      className={`bg-black/5 dark:bg-white/5 rounded-lg transition-all relative ${
        isFullscreen ? 'fixed inset-0 z-50 flex items-center justify-center bg-black/90' : ''
      }`}
    >
      <div className={`relative ${isFullscreen ? 'w-full h-full max-w-5xl mx-auto flex flex-col justify-center' : ''}`}>
        {/* Media display */}
        <div 
          className={`relative rounded-t-lg overflow-hidden ${
            isFullscreen ? 'w-full' : currentMedia.aspectRatio ? '' : 'aspect-video'
          } bg-black/20`}
          style={currentMedia.aspectRatio && !isFullscreen ? { aspectRatio: currentMedia.aspectRatio } : {}}
        >
          {renderMedia()}
          
          {/* Fullscreen toggle button - not for external videos which have their own controls */}
          {currentMedia.type !== 'externalVideo' && (
            <button 
              onClick={toggleFullscreen}
              className="absolute top-3 right-3 p-2 bg-black/30 hover:bg-black/50 rounded-full text-white transition-colors"
            >
              {isFullscreen ? (
                <Minimize className="h-5 w-5" />
              ) : (
                <Maximize className="h-5 w-5" />
              )}
            </button>
          )}
          
          {/* Side navigation arrows for multiple media items */}
          {media.length > 1 && (
            <>
              <button
                onClick={handlePrev}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 p-2 bg-black/30 hover:bg-black/50 rounded-full text-white transition-colors"
                aria-label="Previous media"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
              <button
                onClick={handleNext}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 bg-black/30 hover:bg-black/50 rounded-full text-white transition-colors"
                aria-label="Next media"
              >
                <ArrowRight className="h-5 w-5" />
              </button>
            </>
          )}
        </div>
        
        {/* Media info and navigation */}
        <div className={`p-4 ${isFullscreen ? 'text-white' : ''}`}>
          <div className="flex justify-between items-start mb-3">
            <div>
              <h4 className="font-medium text-lg" style={{ color: isFullscreen ? 'white' : color }}>
                {currentMedia.title}
              </h4>
              <p className="text-sm text-muted-foreground">{currentMedia.description}</p>
            </div>
            
            {/* Navigation controls */}
            {media.length > 1 && (
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handlePrev}
                  className="h-8 w-8 p-0"
                >
                  <ChevronRight className="h-4 w-4 rotate-180" />
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleNext}
                  className="h-8 w-8 p-0"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
          
          {/* Media counter/indicators */}
          {media.length > 1 && (
            <div className="flex justify-center gap-1 mt-2">
              {media.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className="focus:outline-none"
                  aria-label={`Go to media ${index + 1}`}
                >
                  <span 
                    className={`h-1.5 rounded-full transition-all block ${
                      index === activeIndex 
                        ? `w-4 bg-primary` 
                        : 'w-1.5 bg-gray-300 dark:bg-gray-700'
                    }`}
                    style={{ backgroundColor: index === activeIndex ? color : '' }}
                  ></span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MediaShowcase;