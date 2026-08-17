// src/data/experienceData.js
import watai from "../images/companylogos/watai.jpeg"
import kalpolymers from "../images/companylogos/kalpolymers.jpeg"
import buroak from "../images/companylogos/buroak.jpg"
import medme from "../images/companylogos/medme.jpeg"
import shopify from "../images/companylogos/shopifylogo.jpg"
// cropped to the wordmark so it stays legible at 36px; full logo is sirrllablogo.jpg
import sirrl from "../images/companylogos/sirrllablogo-mark.jpg"

export const experiences = [
    {
      id: 1,
      role: "Software Engineering Intern",
      company: "Shopify",
      logo: shopify,
      website: "https://www.shopify.com/",
      location: "Toronto, ON",
      project: "Flexible Collections",
      dateRange: "May 2026 – Aug. 2026",
      description: "Shipped product exclusions for Flexible Collections end-to-end, from a new database schema out to the public Admin GraphQL API, on the engine that decides collection membership for every Shopify store.",
      githubLink: "",
      responsibilities: [
        {
          title: "Shipped product exclusions for Flexible Collections end-to-end, from new schema to the public Admin GraphQL API.",
          details: {
            description: "Took product exclusions from an empty schema on a 131M-row conditions table all the way out to the public Admin GraphQL API, owning the 2 mutation write paths that merchants and apps reach it through, together serving 700K+ calls/day.",
            technologies: ["Ruby", "Ruby on Rails", "GraphQL", "MySQL", "RSpec"],
            challenges: "Changing the schema of a 131M-row table without downtime, keeping two independent write paths consistent with each other, and designing a public API surface that had to stay backwards compatible for every collection that already existed.",
            results: "Merchants can exclude specific products from an automated collection directly, instead of contorting the collection's conditions to work around them."
          }
        },
        {
          title: "Extended the core engine deciding collection membership for every Shopify store to evaluate and subtract exclusions.",
          details: {
            description: "The membership engine feeds a 24.7B-row (2.2 TB) pipeline, so exclusions had to be evaluated and subtracted inside the query that was already running rather than bolted on afterwards, adding no new round-trip.",
            technologies: ["Ruby on Rails", "MySQL", "SQL Query Optimization"],
            challenges: "Folding a subtraction step into a single-query path that runs for every store, without a second round-trip or a latency regression on a pipeline of that size.",
            results: "Exclusions resolve on the same single-query path as the rest of collection membership, keeping the feature invisible in the engine's cost profile."
          }
        },
        {
          title: "Root-caused 3 error classes hitting 190 stores — 34% of the service's error volume — and cut the largest by 92%.",
          details: {
            description: "Worked backwards from a noisy production error stream to three distinct root causes affecting 190 stores, then fixed the largest contributor.",
            technologies: ["Ruby on Rails", "MySQL", "Production Debugging"],
            challenges: "Separating three overlapping failure modes inside one error stream, and reproducing merchant-specific failures locally from limited production signal.",
            results: "Accounted for 34% of the service's total error volume, with the largest class dropping 92% after the fix."
          }
        },
        {
          title: "Traced a P0 where saved collections dropped merchant-added products; the fix resolved 4 other P0s blocking launch.",
          details: {
            description: "Root-caused a launch-blocking P0 in which saving a collection silently discarded products the merchant had added by hand. The underlying cause turned out to sit beneath four other P0s on the launch checklist.",
            technologies: ["Ruby on Rails", "GraphQL", "RSpec"],
            challenges: "Reproducing a silent data-loss bug that only appeared on particular save paths, then proving one fix genuinely resolved the related P0s rather than hiding their symptoms.",
            results: "Cleared 5 P0s in total and unblocked the launch."
          }
        },
        {
          title: "Made search indexing and Storefront APIs variant-aware across 10M+ membership rows, clearing a launch blocker.",
          details: {
            description: "Extended search indexing and the Storefront APIs to reason at the variant level rather than treating a product as indivisible, across 10M+ collection membership rows.",
            technologies: ["Ruby on Rails", "GraphQL", "Search Indexing"],
            challenges: "Reindexing membership data at that scale while keeping storefront reads correct throughout the migration.",
            results: "Removed the last blocker standing between exclusions and launch on storefronts."
          }
        }
      ],
      jobfocus: ["🛒\u00A0\u00A0\u00A0Collections\u00A0\u00A0Engine"],
      color: "#5E8E3E",
      icon: "ShoppingBag"
    },
    {
      id: 2,
      role: "Undergraduate Research Assistant",
      company: "UWaterloo SIRRL",
      logo: sirrl,
      website: "https://uwaterloo.ca/social-intelligent-robotics-lab/",
      location: "Waterloo, ON",
      project: "Furhat Social Robots",
      dateRange: "Jan. 2026 – Apr. 2026",
      description: "Built the speech-to-text backend for Furhat social robots used in adolescent mental health research at Waterloo's Social and Intelligent Robotics Lab.",
      githubLink: "",
      responsibilities: [
        {
          title: "Built a Python/Flask Whisper transcription service for Furhat social robots in adolescent mental health research.",
          details: {
            description: "The robot's React interaction GUI captures microphone audio through the MediaRecorder API and POSTs it to a Flask service, which transcribes it with OpenAI Whisper and hands the text back to Furhat as a VirtualUserSpeech event. It replaced an earlier approach built on the browser's Web Speech API.",
            technologies: ["Python", "Flask", "OpenAI Whisper", "Kotlin", "React", "Furhat SDK"],
            challenges: "Handling WebM audio blobs coming out of the browser, transcribing reliably without depending on a speech API over the network, and fitting the service into the robot skill's existing Kotlin event loop.",
            results: "Gave the study a transcription path that runs locally and predictably in-lab, rather than one that varied with the browser and the network."
          }
        },
        {
          title: "Benchmarked Whisper model sizes for the accuracy/latency tradeoff, landing on the tiny model at ~50 ms.",
          details: {
            description: "Compared Whisper model sizes on transcription accuracy against round-trip latency through the Furhat skill's REST API, since a robot holding a conversation cannot pause for seconds before replying.",
            technologies: ["OpenAI Whisper", "Python", "REST APIs"],
            challenges: "Conversational turn-taking leaves a very small latency budget, so accuracy gains from larger models had to be weighed against a robot that visibly hesitates.",
            results: "Settled on the tiny model at roughly 50 ms, fast enough to keep back-and-forth with participants feeling natural."
          }
        }
      ],
      jobfocus: ["🎙️\u00A0\u00A0\u00A0Speech-to-Text"],
      color: "#FDBF57",
      icon: "Mic"
    },
    {
      id: 3,
      role: "Software Engineering Intern",
      company: "MedMe Health (YC W21)",
      logo: medme,
      website: "https://www.medmehealth.com/about",
      location: "Toronto, ON",
      dateRange: "Sep. 2025 – Dec. 2025",
      description: "Rebuilt pharmacist scheduling flows and shipped microservices for white-label pharmacy chains at a YC W21 health tech startup serving hundreds of pharmacies across North America.",
      githubLink: "",
      responsibilities: [
        {
          title: "Refactored the Pharmacist Scheduling modals in React/TypeScript with GraphQL, streamlining booking and rescheduling.",
          details: {
            description: "Rebuilt the modals pharmacists use to book, move, and cancel appointments, working in React and TypeScript against a GraphQL API — flows that pharmacy staff run dozens of times a day.",
            technologies: ["React", "TypeScript", "GraphQL"],
            challenges: "Untangling booking and rescheduling logic that had drifted apart over time, while keeping behaviour identical for hundreds of live pharmacies.",
            results: "Booking and rescheduling now run through one consistent set of modals instead of parallel near-duplicates."
          }
        },
        {
          title: "Authored a Jest unit-test suite for core booking logic, raising test coverage from 45% to 95%.",
          details: {
            description: "Covered the code path that decides whether an appointment can be created, moved, or cancelled — the logic every booking in the product passes through.",
            technologies: ["Jest", "TypeScript"],
            challenges: "Pinning down time-sensitive booking rules and their edge cases (double bookings, cancellations, reschedules across timezones) that had previously only been checked by hand.",
            results: "Raised coverage on core booking logic from 45% to 95%, so scheduling changes ship with a regression net underneath them."
          }
        },
        {
          title: "Shipped Java/TypeScript microservices for white-label pharmacy chain expansion, cutting onboarding time by 30%.",
          details: {
            description: "Built services supporting white-label deployments, so a new pharmacy chain can launch under its own branding without a bespoke integration each time.",
            technologies: ["Java", "TypeScript", "Microservices", "GraphQL"],
            challenges: "Pulling chain-specific assumptions out of the codebase and into configuration, turning each new chain from an engineering project into a setup step.",
            results: "Cut onboarding time for new pharmacy chains by 30%."
          }
        },
        {
          title: "Built an end-to-end multilingual NLP chatbot for symptom triage with emergency-escalation logic.",
          details: {
            description: "Built a chatbot that triages patient symptoms across multiple languages and escalates to emergency guidance when the conversation calls for it, rather than attempting to answer.",
            technologies: ["React", "TypeScript", "NLP"],
            challenges: "Reading intent behind a symptom description across languages, and drawing a conservative line for when to escalate — the failure mode that actually matters in healthcare.",
            results: "Demoed end-to-end to the engineering team."
          }
        }
      ],
      jobfocus: ["🗓️\u00A0\u00A0\u00A0Pharmacy\u00A0\u00A0Scheduling"],
      color: "#00B4A6",
      icon: "Calendar"
    },
    {
      id: 4,
      role: "Full Stack Developer",
      company: "WAT.ai",
      logo: watai,
      website: "https://watai.ca/",
      location: "Waterloo, ON",
      project: "Oliver AI",
      dateRange: "Apr. 2025 – Dec. 2025",
      description: "Shipped document-engine features and Waterloo SSO for Oliver, WAT.ai's RAG course assistant for students and instructors.",
      githubLink: "",
      responsibilities: [
        {
          title: "Shipped Oliver AI document-engine features, including drag-and-drop course material uploads.",
          details: {
            description: "Oliver lets instructors upload course content and answers student questions from it through a RAG pipeline. I built the upload experience — drag-and-drop ingestion in React with shadcn/ui — that feeds everything the assistant is able to answer.",
            technologies: ["React", "Vite", "Tailwind CSS", "shadcn/ui", "FastAPI", "Python"],
            challenges: "Handling large course files and multiple concurrent upload states in the UI, and keeping the frontend in step with the backend's document processing pipeline.",
            results: "Instructors can drop course material straight into Oliver rather than handing files to a developer to load."
          }
        },
        {
          title: "Implemented Waterloo OAuth2 / JWT single sign-on for the platform.",
          details: {
            description: "Wired Waterloo account sign-in through OAuth2 with JWT-backed sessions, so students and instructors reach Oliver with their university identity instead of yet another account.",
            technologies: ["OAuth2", "JWT", "FastAPI", "React"],
            challenges: "Carrying the OAuth2 redirect flow cleanly across a React frontend and FastAPI backend, and keeping tokens secure while sessions persist.",
            results: "Put the platform behind Waterloo accounts — a prerequisite for deploying it in an actual course."
          }
        }
      ],
      jobfocus: ["🤖\u00A0\u00A0\u00A0RAG\u00A0\u00A0Course\u00A0\u00A0Assistant"],
      color: "#4B93D1",
      icon: "MessageSquare"
    },
    {
      id: 5,
      role: "Software Engineering Intern",
      company: "Kal Polymers",
      logo: kalpolymers,
      website: "https://kalpolymers.com",
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
      jobfocus: ["📈\u00A0\u00A0\u00A0Manufacturing Analytics"],
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
      id: 6,
      role: "ML Researcher/Developer",
      company: "WAT.ai",
      logo: watai,
      website: "https://watai.ca/",
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
      jobfocus: ["🧠\u00A0\u00A0\u00A0NLP Techniques"],
      color: "#4B93D1",
      icon: "Brain"
    },
    {
      id: 7,
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
      jobfocus: ["🎪\u00A0\u00A0\u00A0Event Planning"],
      color: "#F08080",
      icon: "Award"
      // No media field for this experience
    }
  ];

  export default experiences;
