// src/data/projects.js

// image imports
import oncoalert from "../images/oncoalert.png"
import stepcode from "../images/stepcode.png"
import supermario from "../images/supermario.png"
import handipark from "../images/handipark.png"
import brailleconverter from "../images/brailleconverter.png"
import styleit from "../images/styleit.png"

export const projects = [
    {
        "id": 1,
        "title": "StyleIT",
        "description": "StyleIT transforms your fashion experience by using your webcam to visualize how different outfits fit you in real time. Revolutionize shopping with AI-powered styling!",
        "highlightedDescription": [
            { "text": "StyleIT", "highlight": true },
            { "text": " is an AI-driven application that utilizes ", "highlight": false },
            { "text": "MediaPipe and OpenCV", "highlight": true },
            { "text": " to dynamically overlay ", "highlight": false },
            { "text": "clothing images", "highlight": true },
            { "text": " onto a user's real-time webcam feed. This project enables users to experience an interactive and personalized shopping journey.", "highlight": false }
        ],
        image: styleit, 
        link: "https://github.com/realstephendong/StyleIT",
        color: "#FFB6C1",
        tags: ["OpenCV", "MediaPipe", "Vite + React", "shadcn", "MongoDB"],
        date: "2025-01-15"
    },
    {
        id: 2,
        title: "OncoAlert",
        description: "OncoAlert is a machine learning application that analyzes medical scan images uploaded by users to detect benign and malignant cancers. It leverages the VGG16 neural network to identify key features in images during training.",
        highlightedDescription: [
            { text: "OncoAlert", highlight: true },
            { text: " is a machine learning application that analyzes ", highlight: false },
            { text: "medical scan images", highlight: true },
            { text: " uploaded by users to detect ", highlight: false },
            { text: "benign and malignant cancers", highlight: true },
            { text: ". It leverages the ", highlight: false },
            { text: "VGG16", highlight: true },
            { text: " neural network to identify key features in images during training.", highlight: false }
        ],
        image: oncoalert,
        link: "https://github.com/realstephendong/OncoAlert",
        color: "#F08080",
        tags: ["Machine Learning", "Python", "TensorFlow", "Medical Imaging"],
        date: "2024-01-15"
    },
    {
        id: 3,
        title: "HandiPark",
        description: "HandiPark is a smart parking solution designed to empower individuals with disabilities by providing real-time updates on accessible parking availability. It enhances safety, saves time, and promotes inclusivity.",
        highlightedDescription: [
            { text: "HandiPark", highlight: true },
            { text: " is a smart parking solution designed to ", highlight: false },
            { text: "empower individuals", highlight: true },
            { text: " with disabilities by providing real-time updates on accessible parking availability. It enhances ", highlight: false },
            { text: "safety, saves time, and promotes inclusivity", highlight: true },
            { text: ".", highlight: false }
        ],
        image: handipark,
        link: "https://github.com/realstephendong/HandiPark",
        color: "#F9B2F4",
        tags: ["IoT", "Real-time", "Accessibility", "Smart Cities"],
        date: "2024-10-10"
    },
    {
        id: 4,
        title: "Braille Converter",
        description: "A tool using Python that automatically detects Braille or English input and converts it into the corresponding output. A helpful tool for those who write in Braille and English often!",
        highlightedDescription: [
            { text: "A tool using ", highlight: false },
            { text: "Python", highlight: true },
            { text: " that ", highlight: false },
            { text: "automatically detects", highlight: true },
            { text: " Braille ", highlight: false },
            { text: "or", highlight: true },
            { text: " English input and converts it into the corresponding output. A helpful tool for those who ", highlight: false },
            { text: "write", highlight: true },
            { text: " in Braille and English often!", highlight: false }
        ],
        image: brailleconverter,
        link: "https://github.com/realstephendong/Braille-Converter",
        color: "#DFD080",
        tags: ["Python", "Accessibility", "Text Processing"],
        date: "2024-09-05"
    },
    {
        id: 5,
        title: "SuperMario in Java",
        description: "A SuperMario game made entirely using Java and its GUI capabilities. Players can select between three levels and two characters (Mario and Luigi).",
        highlightedDescription: [
            { text: "A ", highlight: false },
            { text: "SuperMario game", highlight: true },
            { text: " made entirely using Java and its ", highlight: false },
            { text: "GUI capabilities", highlight: true },
            { text: ". Players can select between three levels and two characters ", highlight: false },
            { text: "(Mario and Luigi)", highlight: true },
            { text: ".", highlight: false }
        ],
        image: supermario,
        link: "https://github.com/realstephendong/supermario",
        color: "#96D6EB",
        tags: ["Java", "Game Development", "GUI"],
        date: "2023-12-20"
    },
    {
        id: 6,
        title: "StepCode Education GUI",
        description: "This interactive GUI made in Java guides users through the fundamentals of Java's classes and objects, and includes a final test with a certificate upon completion.",
        highlightedDescription: [
            { text: "This ", highlight: false },
            { text: "interactive GUI", highlight: true },
            { text: " made in Java guides users through the fundamentals of ", highlight: false },
            { text: "Java's classes and objects", highlight: true },
            { text: ", and includes a final test with a certificate upon completion.", highlight: false }
        ],
        image: stepcode,
        link: "https://github.com/realstephendong/stepcode-educational-GUI",
        color: "#97EB96",
        tags: ["Java", "Education", "GUI", "OOP"],
        date: "2023-12-15"
    }
];

export default projects;