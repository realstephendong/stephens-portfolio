import React from 'react';
import DomeGallery from '../components/DomeGallery';
import Lanyard from '../components/Lanyard';

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
  return (
    <main className="min-h-screen pt-0 pb-16">
      <div className="space-y-8 sm:space-y-12">
        {/* Lanyard + About Section */}
        <section 
          className="relative bg-background flex flex-col lg:flex-row" 
          style={{ 
            width: '100vw',
            minHeight: '100vh',
          }}
          data-aos="fade-up" 
          data-aos-duration="1000"
        >
          {/* Lanyard - Left Side */}
          <div className="w-full lg:w-1/3 h-screen pl-8 sm:pl-12 md:pl-16 lg:pl-20">
            <Lanyard position={[0, 0, 20]} gravity={[0, -40, 0]} transparent={false} />
          </div>

          {/* About Description - Right Side */}
          <div className="w-full lg:w-2/3 flex items-center justify-start pl-4 pr-8 py-8 sm:pl-6 sm:pr-12 sm:py-12 md:pl-8 md:pr-16 md:py-16 lg:pl-10 lg:pr-20 lg:py-20">
            <div className="max-w-2xl space-y-6">
              <div className="space-y-4">
                <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold">
                  Hi, I'm <span className="text-primary">Stephen</span>
                </h1>
                <div className="h-1 w-20 bg-primary"></div>
              </div>
              
              <div className="space-y-4 text-lg sm:text-xl text-muted-foreground leading-relaxed">
                <p>
                  I'm a software engineer passionate about building innovative solutions and creating meaningful digital experiences.
                </p>
                <p>
                  With expertise in full-stack development, machine learning, and UI/UX design, I love turning complex problems into elegant, user-friendly applications.
                </p>
                <p>
                  When I'm not coding, you'll find me exploring new technologies, hitting the gym, or experimenting in the kitchen.
                </p>
              </div>

              <div className="pt-4">
                <a 
                  href="mailto:realstephendong@gmail.com"
                  className="inline-block px-8 py-4 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-lg transition-all hover:scale-105 shadow-lg shadow-primary/20"
                >
                  Get in Touch
                </a>
              </div>
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
          data-aos="fade-up" 
          data-aos-duration="1000"
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
    </main>
  );
};

export default About;