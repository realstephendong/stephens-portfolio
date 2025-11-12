// src/data/projects.js

// image imports - backgrounds
import gradient1 from "../images/gradient1.jpg"
import gradient2 from "../images/gradient2.jpg"
import gradient3 from "../images/gradient3.jpg"
import gradient4 from "../images/gradient4.jpg"

// image imports - project images
import archie from "../images/archie.png"
import kora from "../images/kora.png"
import oncoalert from "../images/oncoalert.png"
import styleit from "../images/styleit.png"

export const projects = [
    {
        "title": "Archie",
        backgroundImage: gradient1,
        image: archie,
        tags: ["Coming Soon"],
        date: "2025-01-15",
        link: ""
    },
    {
        "title": "Kora",
        backgroundImage: gradient2,
        image: kora,
        tags: ["AI Itinerary Planner"],
        date: "2024-12-01",
        link: "https://github.com/realstephendong/KORA"
    },
    {
        "title": "OncoAlert",
        backgroundImage: gradient3,
        image: oncoalert,
        tags: ["AI Cancer Detection"],
        date: "2024-01-15",
        link: "https://github.com/realstephendong/OncoAlert"
    },
    {
        "title": "StyleIT",
        backgroundImage: gradient4,
        image: styleit,
        tags: ["Virtual Wardrobe"],
        date: "2024-06-01",
        link: "https://github.com/realstephendong/StyleIT"
    }
];

export default projects;