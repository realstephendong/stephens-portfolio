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
      description: "Developed full-stack web applications for manufacturing analytics and security monitoring.",
      githubLink: "", 
      responsibilities: [
        "Developed a robust camera management system using React and Flask, implementing real-time HLS streaming that enabled monitoring of 70+ security cameras across multiple facilities, improving security and operational oversight by 85%.",
        "Engineered a production analytics dashboard with Recharts and Tailwind CSS to visualize real-time manufacturing metrics from 15+ machines, reducing decision-making time by 40% and enabling preventative maintenance scheduling.",
        "Created a machine downtime analysis tool using REST APIs and real-time data processing, providing actionable insights that led to a 25% reduction in unplanned machine downtime across 3 manufacturing plants.",
        "Implemented JWT-based authentication and role-based access control for the manufacturing dashboard, securing sensitive production data while maintaining seamless access for 50+ daily users across different departments."
      ],
      skills: ["React", "Flask", "HLS Streaming", "Recharts", "Tailwind CSS", "REST APIs", "JWT Authentication"],
      color: "#E94057",
      icon: "Monitor"
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
      githubLink: "https://github.com/realstephendong/RoBERTaSentenceExtraction", // Sample GitHub link (you'll need to update with the actual link)
      responsibilities: [
        "Researched multiple keyword extraction methods, selecting the BERT model for its scalability and contextual awareness.",
        "Contributed to the development of our DE-COP algorithm for detecting copyrighted content in LLM training data by designing its question-answering framework and creating the BookTection and arXivTection benchmarks.",
        "Reduced asset load time by 40%, reducing time from 63 ms to 43 ms by integrating the model with a Django-React app.",
        "Contributed to backend using REST framework to process copyright detection requests, improving request processing speed by 30% and ensuring seamless data handling and integration with the frontend."
      ],
      skills: ["Machine Learning", "BERT", "Django", "React", "REST API", "Python"],
      color: "#4B93D1",
      icon: "Brain"
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
        "Hosted hands-on contests such as paper airplane, bridge building, hydraulic arm, paper parachute, and Rube Goldberg machine challenges, engaging 40+ members and boosting participation by 30% from previous year.",
        "Managed event logistics and club operations, ensuring smooth execution of monthly challenges and creating a collaborative, fun environment for students interested in engineering."
      ],
      skills: ["Leadership", "Event Planning", "Project Management", "Team Building"],
      color: "#F08080",
      icon: "Award"
    }
  ];
  
  export default experiences;