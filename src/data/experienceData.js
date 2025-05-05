// src/data/experienceData.js
import watai from "../images/companylogos/watai.jpeg"
import kalpolymers from "../images/companylogos/kalpolymers.jpeg"
import buroak from "../images/companylogos/buroak.jpg"

export const experiences = [
    {
      id: 1,
      role: "Full Stack Developer",
      company: "Kal Polymers",
      logo: kalpolymers,
      location: "Mississauga, ON",
      dateRange: "Jan. 2025 – Apr. 2025",
      description: "Developed a full-stack web application for manufacturing analytics, financial reports, and security monitoring.",
      githubLink: "", 
      responsibilities: [
        {
          title: "Developed a camera management system that converts RTSP IP camera streams into HLS web page streams.",
          details: {
            description: "Created a scalable real-time video streaming solution using FFmpeg, React, and Flask. This system allowed 50+ security cameras to be monitored simultaneously through a single web interface, erasing the need to physically enter the plant.",
            technologies: ["FFmpeg", "HLS Protocol", "RTSP Protocol", "React", "Flask"],
            challenges: "Handling overloaded browser performance, FFmpeg-specific stream conversion optimizations, ensuring protected NVR connectivity",
            results: "Successfully deployed to cover 3 manufacturing plants, enabling remote monitoring of critical production areas and reducing security, safety, and worker time punch incidents."
          }
        },
        {
          title: "Engineered a production analytics dashboard to visualize real-time manufacturing metrics for 9 industrial machines.",
          details: {
            description: "Designed and implemented an interactive dashboard with customized production reports that provides real-time visualization of production KPIs and machine status. Also coded an email notification system for any new maintenance requests detected in the server.",
            technologies: ["Recharts", "Tailwind CSS", "REST APIs", "Flask", "Microsoft SQL Server"],
            challenges: "Designing intuitive UI for complex manufacturing metrics, customizing company-specific report features, ensuring near real-time server-side updates without performance degradation.",
            results: "Migrating old Power BI production reports into a real-time web app report reduced load times from minutes to seconds. Reduced preventative maintenance downtime by 58% with new notification system. Production reports provided Plant Manager with actionable data to fix ongoing production problems within the plant."
          }
        },
        {
          title: "Programmed interactive 3D model tours that display important critical to quality items and messages at each step of the machine process.",
          details: {
            description: "Using Three.js I detailed and sorted 3D wireframe models from Erema into parts that could be focused/unfocued on with different camera animations. The model tour allows users to toggle the translucency of materials to be able to see the parts inside each machine, revolutionizing existing training models for new plant workers.",
            technologies: ["Three.js", "WebGL", "React Vite", "Blender", "Raspberry Pi 5"],
            challenges: "3D object rendering performance optimizations through internet connection, cutomization of screen layout.",
            results: "These continuously running model tours displaying through a Raspberry Pi 5 on TVs inside the plant constantly gave reminders to plant workers about safety requirements, job specifications, and what steps to take at different parts of the machine process."
          }
        },
        {
          title: "*NOT SHOWN IN DEMO* Coded 12 different financial reports that visualize company-wide finance analytics, trends, and comparisons.",
          details: {
            description: "Each financial report included several animated charts and tables with numeric labels and well-formatted tooltips, along with options to export all data as CSV files. These reports were used by the CFO to quickly create date-based financial overviews to present in board meetings. Some reports also had a 'compare' feature, which allowed data from different plants to be compared side by side.",
            technologies: ["Python", "Flask", "Recharts", "Microsoft SQL Server"],
            challenges: "Query processing times taking too long, customization of reports based on CFO needs, compare/export feature implementation",
            results: "Presenting financial data was excruciatingly difficult in the past, often requiring the sharing of long, hard-to-read Excel files. My financial reports introduced a way to generate an error-free report with data directly from our ERP with the press of a button, erasing the need for data backchecks and time-consuming data presentation."
          }
        },
        {
          title: "Implemented JWT-based authentication and role-based access control for the manufacturing dashboard.",
          details: {
            description: "Designed and implemented a comprehensive security system with role-based authentication. (ie. Finance vs. General users)",
            technologies: ["JWT Tokens", "HTTPCookie", "React Context API", "Flask Backend Authentication", "Microsoft SQL Server"],
            challenges: "Creating a seamless login experience, conditional navbar rendering based on role, implementing secure token handling across the application stack.",
            results: "Successfully protected sensitive manufacturing and financial data while maintaining a seamless user experience. Even with direct URLs to financial reports, users will be denied access to the page if not logged in with the Finance role."
          }
        }
      ],
      skills: ["React", "Flask", "HLS Streaming", "Recharts", "Tailwind CSS", "REST APIs", "JWT Authentication"],
      color: "#E94057",
      icon: "Monitor",
      media: [
        {
          type: "externalVideo",
          title: "Kal-Polymers Web App Demo",
          description: "Live demonstration of production overviews and reports, security camera monitoring system with HLS streaming, excludes financial reports.",
          embedUrl: "https://drive.google.com/file/d/1E0xkcVyBJ6FR83KWu5fF_D8XXkD89fYw/preview",
          aspectRatio: "16/9"
        },
        {
          type: "externalVideo",
          title: "3D Model Tour Interface",
          description: "Interactive 3D models of manufacturing equipment with step-by-step process explanations.",
          embedUrl: "https://drive.google.com/file/d/1YkcWm-sZNRnhUs2eKvAtaMQQ8jVjeHoN/preview",
          aspectRatio: "16/9"
        }
      ]
    },
    {
      id: 2,
      role: "ML Researcher/Developer",
      company: "WAT.ai",
      logo: watai,
      location: "Waterloo, ON",
      project: "Copyright Detection in LLMs",
      dateRange: "Sep. 2024 – Apr. 2025",
      description: "Researched and developed machine learning solutions for detecting copyrighted content in LLM training data.",
      githubLink: "https://github.com/realstephendong/RoBERTaSentenceExtraction", 
      responsibilities: [
        {
          title: "Researched multiple keyword extraction methods, selecting the BERT model for its scalability and contextual awareness.",
          details: {
            description: "Conducted extensive literature review and comparative analysis of different NLP techniques for keyword extraction, focusing on performance, accuracy, and production readiness.",
            technologies: ["BERT", "RoBERTa", "TF-IDF", "TextRank", "Python", "PyTorch"],
            challenges: "Balancing model complexity with inference speed, optimizing for context-aware extraction, and handling diverse text formats from books to research papers.",
            results: "Achieved 89% accuracy in identifying copyright-protected content, improving over baseline methods by 32%."
          }
        },
        {
          title: "Contributed to the development of our DE-COP algorithm for detecting copyrighted content in LLM training data.",
          details: {
            description: "Designed and implemented a novel question-answering framework for copyright detection, along with two comprehensive benchmark datasets for evaluation.",
            technologies: ["PyTorch", "Hugging Face Transformers", "Python", "Pandas"],
            challenges: "Creating representative benchmark datasets, developing evaluation metrics specific to copyright detection, and optimizing model parameters for real-world LLM training data.",
            results: "Published methodology in team research paper, with BookTection and arXivTection now used as standard benchmarks by the research community."
          }
        },
        {
          title: "Reduced asset load time by integrating the model with a Django-React app.",
          details: {
            description: "Optimized model inference pipeline reducing load times from 63 ms to 43 ms with performance-focused architecture.",
            technologies: ["Django", "React", "Docker"],
            challenges: "Minimizing model size without accuracy loss, optimizing inference for web deployment, and implementing efficient caching strategies.",
            results: "Reduced overall application response time by 30%, enabling real-time analysis of content for copyright protection."
          }
        }
      ],
      skills: ["Machine Learning", "BERT", "Django", "React", "REST API", "Python"],
      color: "#4B93D1",
      icon: "Brain"
      // No media field for this experience
    },
    {
      id: 3,
      role: "Engineering Club Pres.",
      company: "Bur Oak Secondary School",
      logo: buroak,
      location: "Markham, ON",
      dateRange: "Sep. 2023 – Apr. 2024",
      description: "Led and organized engineering-focused activities and competitions for high school students.",
      githubLink: "",
      responsibilities: [
        {
          title: "Hosted school-wide hands-on contests.",
          details: {
            description: "Planned and executed a series of engaging engineering challenges designed to teach fundamental principles while fostering teamwork and creativity.",
            activities: ["Paper Airplane Contest", "Bridge Building Competition", "Hydraulic Arm Design", "Paper Parachute Challenge", "Rube Goldberg Machine Contest"],
            challenges: "Working with limited budget, accommodating diverse skill levels, and creating engaging projects that could be completed within club meeting timeframes.",
            results: "Increased club membership from 28 to 42 students, with consistent attendance throughout the year."
          }
        },
        {
          title: "Managed event logistics and oversaw club marketing on all social media platforms.",
          details: {
            description: "Coordinated all aspects of club management including budget planning, materials procurement, schedule management, and promotion.",
            responsibilities: ["Event Planning", "Budget Management", "Materials Sourcing", "Team Building", "Marketing"],
            challenges: "Balancing academic rigor with accessibility, ensuring equitable participation, and measuring learning outcomes effectively.",
            results: "Successfully organized 12 monthly events with zero cancellations, staying within budget while providing high-quality materials for all activities."
          }
        }
      ],
      skills: ["Leadership", "Event Planning", "Project Management", "Team Building"],
      color: "#F08080",
      icon: "Award"
      // No media field for this experience
    }
  ];
  
  export default experiences;