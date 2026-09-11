// src/data/projects.js

// image imports - backgrounds
import gradient1 from "../images/gradient1.webp"
import gradient2 from "../images/gradient2.webp"
import gradient3 from "../images/gradient3.webp"
import gradient4 from "../images/gradient4.webp"

// image imports - project images
import sblame from "../images/sblame.svg"
import kora from "../images/kora.webp"
import oncoalert from "../images/oncoalert.webp"
import styleit from "../images/styleit.webp"

export const projects = [
    {
        "title": "sblame",
        backgroundImage: gradient1,
        image: sblame,
        tags: ["semantic git blame"],
        date: "2026-06-29",
        link: ""
    },
    {
        "title": "kora",
        backgroundImage: gradient2,
        image: kora,
        tags: ["ai itinerary planner"],
        date: "2024-12-01",
        link: "https://github.com/realstephendong/KORA"
    },
    {
        "title": "oncoalert",
        backgroundImage: gradient3,
        image: oncoalert,
        tags: ["ai cancer detection"],
        date: "2024-01-15",
        link: "https://github.com/realstephendong/OncoAlert"
    },
    {
        "title": "styleit",
        backgroundImage: gradient4,
        image: styleit,
        tags: ["virtual wardrobe"],
        date: "2024-06-01",
        link: "https://github.com/realstephendong/StyleIT"
    }
];

export default projects;
