export const blogPosts = [
    {
      slug: "complex-algorithm-equality",
      title: "The Complex Algorithm of Equality",
      date: "December 15, 2024",
      author: "Stephen Dong",
      excerpt: "As artificial intelligence becomes increasingly popular in the workplace, its potential to impact equality—both positively and negatively—has sparked widespread debate. This paper explores the hidden costs of automation and AI's current applications...",
      tags: ["AI", "Ethics", "Workplace", "Equality"],
      fullDocumentLink: "https://drive.google.com/file/d/1AIOztl34fzqYFN6DB0QrtnxYtlHXJA-J/view?usp=sharing",
      content: {
        abstract: "As artificial intelligence becomes increasingly popular in the workplace, its potential to impact equality—both positively and negatively—has sparked widespread debate. Technologies such as automated resume screening tools and industrial robots designed to streamline labour-intensive tasks are becoming more integrated into various industries. However, they often unknowingly exacerbate existing inequalities within the system, reinforcing social issues such as the gender wage gap, exploitative foreign labour practices, and the displacement of low-skill workers.",
        sections: [
          {
            title: "Introduction",
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