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

import selfie from "../images/aboutmeselfie.png"

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
          {/* Hero Section */}
          <section data-aos="fade-right" data-aos-duration="1000">
            <Card className="w-full dark:bg-gradient-to-br dark:from-[#0D1117] dark:to-[#161B22] 
                           bg-white border dark:border-[#30363D]">
              <CardContent className="p-6 sm:p-8 md:p-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
                  <div className="space-y-4 sm:space-y-6 order-2 md:order-1">
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#2DB19B]">About Me</h1>
                    <p className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed">
                      My name is <span className="text-[#2DB19B] font-semibold">Stephen.</span> I am an 18-year-old from Canada, currently studying{' '}
                      <span className="text-[#2DB19B] font-semibold">Computer Engineering</span> at the{' '}
                      <span className="text-[#2DB19B] font-semibold">University of Waterloo.</span>
                    </p>
                    <p className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed">
                      I'm all about <span className="text-[#2DB19B] font-semibold">exploring</span> new areas in tech,{' '}
                      <span className="text-[#2DB19B] font-semibold">contributing</span> inspiring ideas, and{' '}
                      <span className="text-[#2DB19B] font-semibold">making a change</span> wherever I end up.
                    </p>
                  </div>
                  <div className="relative group order-1 md:order-2">
                    <div 
                      className="absolute -inset-1 bg-[#2DB19B] rounded-lg opacity-20 
                                group-hover:opacity-30 transition-opacity duration-300"
                    ></div>
                    <div className="relative overflow-hidden rounded-lg">
                      <img 
                        src={selfie}
                        alt="Profile" 
                        className="w-full object-cover transition-transform duration-500 
                                  group-hover:scale-105 group-hover:rotate-1 group-hover:brightness-90"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Skills Section */}
          <section data-aos="fade-up" data-aos-duration="1000">
            <Card className="w-full dark:bg-gradient-to-br dark:from-[#0D1117] dark:to-[#161B22] 
                            bg-white border dark:border-[#30363D]">
              <CardContent className="p-6 sm:p-8 md:p-12">
                <h2 className="text-3xl sm:text-4xl font-bold mb-6 sm:mb-8 text-[#2DB19B]">Skills & Technologies</h2>
                <Tabs defaultValue="languages" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
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