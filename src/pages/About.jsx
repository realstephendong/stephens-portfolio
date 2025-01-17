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
    <main className="min-h-screen pt-32 pb-16">
      <div className="max-w-7xl mx-auto px-8">
        <div className="space-y-12">
          {/* Hero Section */}
          <section data-aos="fade-right" data-aos-duration="1000">
            <Card className="w-full dark:bg-gradient-to-br dark:from-[#0D1117] dark:to-[#161B22] 
                            bg-white border dark:border-[#30363D]">
              <CardContent className="p-12">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                  <div className="space-y-6">
                    <h1 className="text-6xl font-bold text-[#2DB19B]">About Me</h1>
                    <p className="text-xl text-muted-foreground leading-relaxed">
                      My name is <span className="text-[#2DB19B] font-semibold">Stephen.</span> I am an 18-year-old from Canada, currently studying{' '}
                      <span className="text-[#2DB19B] font-semibold">Computer Engineering</span> at the{' '}
                      <span className="text-[#2DB19B] font-semibold">University of Waterloo.</span>
                    </p>
                    <p className="text-xl text-muted-foreground leading-relaxed">
                      I'm all about <span className="text-[#2DB19B] font-semibold">exploring</span> new areas in tech,{' '}
                      <span className="text-[#2DB19B] font-semibold">contributing</span> inspiring ideas, and{' '}
                      <span className="text-[#2DB19B] font-semibold">making a change</span> wherever I end up.
                    </p>
                  </div>
                  <div className="relative group">
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
              <CardContent className="p-12">
                <h2 className="text-4xl font-bold mb-8 text-[#2DB19B]">Skills & Technologies</h2>
                <Tabs defaultValue="languages" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="languages">Languages</TabsTrigger>
                    <TabsTrigger value="frameworks">Frameworks</TabsTrigger>
                    <TabsTrigger value="tools">Tools</TabsTrigger>
                  </TabsList>
                  {Object.entries(skills).map(([category, items]) => (
                    <TabsContent key={category} value={category} className="mt-6">
                      <div className="flex flex-wrap gap-2">
                        {items.map((skill) => (
                          <Badge 
                            key={skill}
                            variant="secondary" 
                            className="text-lg py-2 px-4 dark:bg-[#161B22] dark:hover:bg-[#21262D] 
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
              <CardContent className="p-12">
                <h2 className="text-4xl font-bold mb-8 text-[#2DB19B]">Beyond Coding</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <Card className="dark:bg-[#161B22] dark:border-[#30363D] bg-white border 
                                    hover:border-[#2DB19B] dark:hover:border-[#2DB19B] 
                                    transition-colors">
                        <CardContent className="p-6 text-center space-y-4">
                        <Code2 className="w-12 h-12 mx-auto text-[#2DB19B]" />
                        <h3 className="text-xl font-semibold">Technology</h3>
                        <p className="text-muted-foreground">Always exploring new technologies and keepin' up with the latest trends.</p>
                        </CardContent>
                    </Card>
                    <Card className="dark:bg-[#161B22] dark:border-[#30363D] bg-white border 
                                    hover:border-[#2DB19B] dark:hover:border-[#2DB19B] 
                                    transition-colors">
                        <CardContent className="p-6 text-center space-y-4">
                        <Dumbbell className="w-12 h-12 mx-auto text-[#2DB19B]" />
                        <h3 className="text-xl font-semibold">Fitness</h3>
                        <p className="text-muted-foreground">Sometimes hitting chest is a lot more fun than coding.</p>
                        </CardContent>
                    </Card>
                    <Card className="dark:bg-[#161B22] dark:border-[#30363D] bg-white border 
                                    hover:border-[#2DB19B] dark:hover:border-[#2DB19B] 
                                    transition-colors">
                        <CardContent className="p-6 text-center space-y-4">
                        <ChefHat className="w-12 h-12 mx-auto text-[#2DB19B]" />
                        <h3 className="text-xl font-semibold">Cooking</h3>
                        <p className="text-muted-foreground">Interestingly enough, I've always been really talented at cooking.</p>
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