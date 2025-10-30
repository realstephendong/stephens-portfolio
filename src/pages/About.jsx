// src/pages/About.js

import React, { useState } from 'react';
import DomeGallery from '../components/DomeGallery';
import Lanyard from '../components/Lanyard';

// Import the Terminal components
import Terminal from '../components/Terminal';
import TerminalAbout from '../components/TerminalAbout'; // Import your new custom content

// Import your gallery images
import IMG_3886 from '../images/gallery/IMG_3886.webp';
import IMG_4572 from '../images/gallery/IMG_4572.webp';
import IMG_5289 from '../images/gallery/IMG_5289.webp';
import IMG_7085 from '../images/gallery/IMG_7085.webp';
import IMG_7361 from '../images/gallery/IMG_7361.webp';
import IMG_8999 from '../images/gallery/IMG_8999.webp';
import IMG_9062 from '../images/gallery/IMG_9062.webp';
import IMG_9070 from '../images/gallery/IMG_9070.webp';
import IMG_9098 from '../images/gallery/IMG_9098.webp';
import IMG_9206 from '../images/gallery/IMG_9206.webp';
import IMG_9260 from '../images/gallery/IMG_9260.webp';


const About = () => {
  // This state is required by the <Terminal> component
  const [isTerminalClosed, setIsTerminalClosed] = useState(false);

  return (
    <main className="min-h-screen pt-0 pb-16">
      
      <div className="space-y-4">
        {/* Lanyard + About Section */}
        <section 
          className="relative bg-background flex flex-col lg:flex-row" 
          style={{ 
            width: '100vw',
            minHeight: '80vh',
          }}
          data-aos="fade-up" 
          data-aos-duration="1000"
        >
          {/* Lanyard - Left Side */}
          <div 
            className="w-full lg:w-1/3 pl-8 sm:pl-12 md:pl-16 lg:pl-20 relative" 
            style={{ height: '80vh' }}
          >
            <Lanyard position={[0, 0, 20]} gravity={[0, -40, 0]} transparent={false} />
            {/* Drag Indicator */}
            <div className="absolute bottom-20 left-20 right-0 flex items-center justify-center gap-2 text-muted-foreground text-sm animate-pulse pointer-events-none">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 11V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v0"></path>
                <path d="M14 10V4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v2"></path>
                <path d="M10 10.5V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v8"></path>
                <path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15"></path>
              </svg>
              <span>Drag me</span>
            </div>
          </div>

          {/* About Description - Right Side (REPLACED) */}
          <div className="w-full lg:w-2/3 flex items-center justify-start pl-4 pr-8 pt-8 pb-2 sm:pl-6 sm:pr-12 sm:pt-12 sm:pb-3 md:pl-8 md:pr-16 md:pt-16 md:pb-4 lg:pl-10 lg:pr-20 lg:pt-20 lg:pb-5">
            
            {/* This wrapper keeps the terminal constrained, similar to your old text box */}
            <div className="w-full max-w-3xl">
              <Terminal 
                currentPage="about"
                isClosed={isTerminalClosed}
                onSetIsClosed={setIsTerminalClosed}
                maxTerminalHeight="350px"
              >
                <TerminalAbout />
              </Terminal>
            </div>

          </div>
        </section>

        {/* Full-Screen Dome Gallery - Below lanyard */}
        <section 
          className="relative" 
          style={{ 
            width: '100vw',
            height: '80vh',
            minHeight: '600px'
          }}
        >
          <DomeGallery 
            images={[
              { src: IMG_3886, alt: "Stephen's photo 1" },
              { src: IMG_4572, alt: "Stephen's photo 2" },
              { src: IMG_5289, alt: "Stephen's photo 3" },
              { src: IMG_7085, alt: "Stephen's photo 4" },
              { src: IMG_7361, alt: "Stephen's photo 5" },
              { src: IMG_8999, alt: "Stephen's photo 6" },
              { src: IMG_9062, alt: "Stephen's photo 7" },
              { src: IMG_9070, alt: "Stephen's photo 8" },
              { src: IMG_9098, alt: "Stephen's photo 9" },
              { src: IMG_9206, alt: "Stephen's photo 10" },
              { src: IMG_9260, alt: "Stephen's photo 11" }
            ]}
            fit={1.0}
            fitBasis="min"
            minRadius={1000}
            maxRadius={1500}
            padFactor={0.02}
            grayscale={false}
            imageBorderRadius="20px"
            openedImageBorderRadius="20px"
            segments={30}
            autoRotate={true}
            autoRotateSpeed={0.04}
            overlayBlurColor="hsl(0, 0%, 4%)"
            openedImageWidth="600px"
            openedImageHeight="600px"
          />
        </section>
      </div>
      
      {/* Fixed background light ray */}
      <div className="fixed top-0 left-0 h-screen w-full pointer-events-none z-[5]">
        <div 
          className="absolute top-0 left-[50px] h-[1200px] w-[500px] -translate-y-[300px] -rotate-45"
          style={{ background: 'var(--gradient-spotlight)' }}
        >
        </div>
      </div>
    </main>
  );
};

export default About;