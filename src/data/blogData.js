export const blogPosts = [
  {
    slug: "install-react-vite-tailwind",
    title: "quick setup guide: react + vite + tailwind css",
    date: "february 21, 2025",
    author: "stephen dong",
    excerpt: "a quick reference guide for setting up a modern react development environment with vite and tailwind css. no more searching through different documentation!",
    tags: ["react", "vite", "tailwind css", "setup guide"],
    content: {
      intro: "Tired of searching through different documentation every time you need to set up a new React project? Here's your go-to guide for creating a modern React development environment with Vite and Tailwind CSS. Save this for future reference!",
      sections: [
        {
          title: "prerequisites",
          content: "Make sure you have Node.js installed on your machine. You can download it from nodejs.org",
          note: "Verify your installation by running node --version and npm --version in your terminal."
        },
        {
          title: "1. create a new react project",
          content: "First, let's scaffold a new React project using Vite:",
          codeBlocks: [
            {
              code: "npx create-vite my-react-app --template react\ncd my-react-app",
              language: "bash",
              description: "This creates a new React project and navigates into its directory"
            }
          ]
        },
        {
          title: "2. install dependencies",
          content: "Now, let's install Tailwind CSS and its peer dependencies:",
          codeBlocks: [
            {
              code: "npm install -D tailwindcss@latest postcss@latest autoprefixer@latest",
              language: "bash"
            }
          ]
        },
        {
          title: "3. generate configuration files",
          content: "Create the Tailwind CSS configuration files:",
          codeBlocks: [
            {
              code: "npx tailwindcss init -p",
              language: "bash",
              description: "This creates tailwind.config.js and postcss.config.js"
            }
          ]
        },
        {
          title: "4. configure tailwind",
          content: "Update your tailwind.config.js to include the paths to your template files:",
          codeBlocks: [
            {
              code: "/** @type {import('tailwindcss').Config} */\nexport default {\n  content: [\n    \"./index.html\",\n    \"./src/**/*.{js,ts,jsx,tsx}\",\n  ],\n  theme: {\n    extend: {},\n  },\n  plugins: [],\n}",
              language: "javascript",
              description: "tailwind.config.js"
            }
          ]
        },
        {
          title: "5. add tailwind to your css",
          content: "Create a new CSS file (e.g., src/index.css) and add the Tailwind directives:",
          codeBlocks: [
            {
              code: "@tailwind base;\n@tailwind components;\n@tailwind utilities;",
              language: "css",
              description: "src/index.css"
            }
          ]
        },
        {
          title: "6. import the css",
          content: "Import the CSS file in your main.jsx:",
          note: "Remember to remove the original App.css import in your App.jsx file",
          codeBlocks: [
            {
              code: "import './index.css'",
              language: "javascript",
              description: "src/main.jsx"
            }
          ]
        },
        {
          title: "7. start development",
          content: "Start your development server:",
          codeBlocks: [
            {
              code: "npm run dev",
              language: "bash"
            }
          ],
          note: "Your development server should now be running at http://localhost:5173"
        },
        {
          title: "test your setup",
          content: "Update your App.jsx to test Tailwind CSS:",
          codeBlocks: [
            {
              code: "export default function App() {\n  return (\n    <div className=\"min-h-screen bg-gray-100 py-8\">\n      <div className=\"max-w-4xl mx-auto px-4\">\n        <h1 className=\"text-4xl font-bold text-blue-600 mb-4\">\n          Ivy - Frank Ocean 💗\n        </h1>\n        <p className=\"text-gray-600\">\n          The best song ever written ^\n        </p>\n      </div>\n    </div>\n  )\n}",
              language: "jsx",
              description: "Example component using Tailwind CSS classes"
            }
          ]
        }
      ],
      tips: [
        "Use VS Code with the Tailwind CSS IntelliSense extension for better development experience",
        "Check out Tailwind's documentation for utility classes and customization options",
        "Consider adding ESLint and Prettier for code formatting"
      ]
    }
  },
  {
    slug: "complex-algorithm-equality",
    title: "the complex algorithm of equality",
    date: "december 15, 2024",
    author: "stephen dong",
    excerpt: "as artificial intelligence becomes increasingly popular in the workplace, its potential to impact equality—both positively and negatively—has sparked widespread debate. this paper explores the hidden costs of automation and ai's current applications...",
    tags: ["ai", "ethics", "workplace", "equality"],
    fullDocumentLink: "https://drive.google.com/file/d/1AIOztl34fzqYFN6DB0QrtnxYtlHXJA-J/view?usp=sharing",
    content: {
      abstract: "As artificial intelligence becomes increasingly popular in the workplace, its potential to impact equality—both positively and negatively—has sparked widespread debate. Technologies such as automated resume screening tools and industrial robots designed to streamline labour-intensive tasks are becoming more integrated into various industries. However, they often unknowingly exacerbate existing inequalities within the system, reinforcing social issues such as the gender wage gap, exploitative foreign labour practices, and the displacement of low-skill workers.",
      sections: [
        {
          title: "introduction",
          paragraphs: [
            "Naftali Wambalo, a father of two with a college degree in mathematics, wakes before sunrise every day in Nairobi, Kenya's capital. For eight hours, he sits in front of a screen, weeding out pornography, hate speech, and excessive violence from images used to train OpenAI's ChatGPT. Despite his mentally taxing work, he earns only $1.32 USD an hour, living paycheck to paycheck to support his family."
          ]
        },
      ],
      conclusion: "While AI and automation hold immense potential to improve and hasten our workforce, their current application has instead exacerbated the inequalities they were designed to address. From the exploitation of low-wage workers in developing countries to the gender and racial biases embedded in recruitment algorithms, these technologies mirror and perpetuate the inequities of the system they are built upon.",
      publicationInfo: {
        journal: "ENGL 192: Communication in the Engineering Profession",
        year: 2024,
        copyright: "© 2024 Stephen Dong"
      }
    }
  },
];

// Helper function to get a post by slug
export const getBlogPostBySlug = (slug) => {
  return blogPosts.find(post => post.slug === slug);
};