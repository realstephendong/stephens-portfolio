import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronRight, Code2, Brain, Dumbbell, ChefHat } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import DomeGallery from '../components/DomeGallery';

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
  const skills = {
    languages: ["Python", "TypeScript", "JavaScript", "Java", "C++", "HTML/CSS", "SQL", "SystemVerilog"],
    frameworks: ["React", "Flask", "Sklearn", "XGBoost", "VGG16", "Matplotlib", "NumPy", "Jupyter", "REST", "Vite", "Node.js", "shadcn", "Express", "TailwindCSS", "Bootstrap"],
    tools: ["Git", "VS Code", "Docker", "Firebase", "MongoDB", "Figma", "PyCharm", "Eclipse", "PowerBI"],
  };

  return (
    <main className="min-h-screen pt-24 sm:pt-28 md:pt-32 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="space-y-8 sm:space-y-12">
          {/* Full-Screen Dome Gallery - Breaks out of container */}
          <section 
            className="relative -mx-4 sm:-mx-6 md:-mx-8" 
            style={{ 
              marginLeft: 'calc(-50vw + 50%)',
              marginRight: 'calc(-50vw + 50%)',
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
              overlayBlurColor="hsl(222.2, 84%, 4.9%)"
              openedImageWidth="600px"
              openedImageHeight="600px"
            />
          </section>

          {/* Skills Section */}
          <section data-aos="fade-up" data-aos-duration="1000">
            <Card className="w-full dark:bg-gradient-to-br dark:from-[#0D1117] dark:to-[#161B22] 
                            bg-white border dark:border-[#30363D]">
              <CardContent className="p-6 sm:p-8 md:p-12">
                <h2 className="text-3xl sm:text-4xl font-bold mb-6 sm:mb-8 text-[#2DB19B]">Skills & Technologies</h2>
                <Tabs defaultValue="languages" className="w-full">
                  <TabsList className="grid w-full pb-9 grid-cols-3">
                    <TabsTrigger value="languages" className="text-xs sm:text-sm md:text-base">Languages</TabsTrigger>
                    <TabsTrigger value="frameworks" className="text-xs sm:text-sm md:text-base">Frameworks</TabsTrigger>
                    <TabsTrigger value="tools" className="text-xs sm:text-sm md:text-base">Tools</TabsTrigger>
                  </TabsList>
                  {Object.entries(skills).map(([category, items]) => (
                    <TabsContent key={category} value={category} className="mt-4 sm:mt-6">
                      <div className="flex flex-wrap gap-2">
                        {items.map((skill) => (
                          <Badge 
                            key={skill}
                            variant="secondary" 
                            className="text-sm sm:text-base md:text-lg py-1 sm:py-2 px-2 sm:px-4 dark:bg-[#161B22] dark:hover:bg-[#21262D] 
                                     bg-gray-100 hover:bg-gray-200 transition-colors"
                          >
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </TabsContent>
                  ))}
                </Tabs>
              </CardContent>
            </Card>
          </section>

          {/* Interests Section */}
          <section data-aos="fade-up" data-aos-duration="1000">
            <Card className="w-full dark:bg-gradient-to-br dark:from-[#0D1117] dark:to-[#161B22] 
                            bg-white border dark:border-[#30363D]">
              <CardContent className="p-6 sm:p-8 md:p-12">
                <h2 className="text-3xl sm:text-4xl font-bold mb-6 sm:mb-8 text-[#2DB19B]">Beyond Coding</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
                  <Card className="dark:bg-[#161B22] dark:border-[#30363D] bg-white border 
                                 hover:border-[#2DB19B] dark:hover:border-[#2DB19B] 
                                 transition-colors">
                    <CardContent className="p-4 sm:p-6 text-center space-y-3 sm:space-y-4">
                      <Code2 className="w-10 h-10 sm:w-12 sm:h-12 mx-auto text-[#2DB19B]" />
                      <h3 className="text-lg sm:text-xl font-semibold">Technology</h3>
                      <p className="text-sm sm:text-base text-muted-foreground">Always exploring new technologies and keepin' up with the latest trends.</p>
                    </CardContent>
                  </Card>
                  <Card className="dark:bg-[#161B22] dark:border-[#30363D] bg-white border 
                                 hover:border-[#2DB19B] dark:hover:border-[#2DB19B] 
                                 transition-colors">
                    <CardContent className="p-4 sm:p-6 text-center space-y-3 sm:space-y-4">
                      <Dumbbell className="w-10 h-10 sm:w-12 sm:h-12 mx-auto text-[#2DB19B]" />
                      <h3 className="text-lg sm:text-xl font-semibold">Fitness</h3>
                      <p className="text-sm sm:text-base text-muted-foreground">Sometimes hitting chest is a lot more fun than coding.</p>
                    </CardContent>
                  </Card>
                  <Card className="dark:bg-[#161B22] dark:border-[#30363D] bg-white border 
                                 hover:border-[#2DB19B] dark:hover:border-[#2DB19B] 
                                 transition-colors sm:col-span-2 md:col-span-1">
                    <CardContent className="p-4 sm:p-6 text-center space-y-3 sm:space-y-4">
                      <ChefHat className="w-10 h-10 sm:w-12 sm:h-12 mx-auto text-[#2DB19B]" />
                      <h3 className="text-lg sm:text-xl font-semibold">Cooking</h3>
                      <p className="text-sm sm:text-base text-muted-foreground">Interestingly enough, I've always been really talented at cooking.</p>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </section>
        </div>
      </div>
    </main>
  );
};

export default About;