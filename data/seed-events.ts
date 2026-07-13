export type SeedEvent = {
  slug: string;
  image: string;
  title: string;
  location: string;
  date: string;
  time: string;
  description: string;
  overview: string;
  venue: string;
  mode: "online" | "offline" | "hybrid";
  audience: string;
  agenda: string[];
  organizer: string;
  tags: string[];
};

export const seedEvents: SeedEvent[] = [
  {
    slug: "react-conf-2024",
    image:
      "https://res.cloudinary.com/o0h1cdd9/image/upload/v1783949951/event-full_t6boaa.png",
    title: "React Conf 2024",
    location: "San Francisco, CA",
    date: "March 15, 2024",
    time: "9:00 AM - 6:00 PM",
    description:
      "React Conf 2024 brings together the global React community for a full day of talks, workshops, and networking focused on the future of UI development.",
    overview:
      "Join core contributors and industry leaders to explore React 19, Server Components, and the next generation of web apps.",
    venue: "Moscone Center",
    mode: "offline",
    audience: "React developers, frontend engineers, and technical leads",
    agenda: ["Keynote", "React 19 Deep Dive", "Server Components Workshop", "Community Panel"],
    organizer: "Meta Open Source",
    tags: ["react", "frontend", "conference"],
  },
  {
    slug: "nextjs-summit",
    image:
      "https://res.cloudinary.com/o0h1cdd9/image/upload/v1783949950/event5_htjcaw.png",
    title: "Next.js Summit",
    location: "Austin, TX",
    date: "April 22, 2024",
    time: "10:00 AM - 5:00 PM",
    description:
      "The Next.js Summit is a one-day event dedicated to full-stack React applications, performance, and deployment at scale.",
    overview:
      "Learn from Vercel engineers and production teams shipping Next.js apps to millions of users worldwide.",
    venue: "Austin Convention Center",
    mode: "offline",
    audience: "Full-stack developers and platform engineers",
    agenda: ["App Router Masterclass", "Edge & Serverless", "Performance Tuning", "Case Studies"],
    organizer: "Vercel",
    tags: ["nextjs", "react", "fullstack"],
  },
  {
    slug: "javascript-world",
    image:
      "https://res.cloudinary.com/o0h1cdd9/image/upload/v1783949947/event2_uqby8d.png",
    title: "JavaScript World Conference",
    location: "New York, NY",
    date: "May 8, 2024",
    time: "8:30 AM - 7:00 PM",
    description:
      "JavaScript World Conference covers the entire JS ecosystem — from language fundamentals to frameworks, tooling, and runtime innovation.",
    overview:
      "A packed agenda with keynotes, breakout sessions, and hands-on labs for developers at every level.",
    venue: "Javits Center",
    mode: "hybrid",
    audience: "JavaScript developers of all experience levels",
    agenda: ["Language Updates", "Framework Showdown", "Testing & Tooling", "Career Track"],
    organizer: "JS World Foundation",
    tags: ["javascript", "web", "conference"],
  },
  {
    slug: "ai-hackathon-2024",
    image:
      "https://res.cloudinary.com/o0h1cdd9/image/upload/v1783949939/event4_edxl08.png",
    title: "AI Innovation Hackathon",
    location: "Seattle, WA",
    date: "June 14-16, 2024",
    time: "48 Hours",
    description:
      "A 48-hour hackathon where teams build AI-powered products using LLMs, agents, and modern ML tooling.",
    overview:
      "Compete for prizes, get mentorship from AI engineers, and ship a working prototype over one intense weekend.",
    venue: "Seattle Tech Hub",
    mode: "offline",
    audience: "Developers, designers, and product builders interested in AI",
    agenda: ["Opening Ceremony", "Hacking Sprint", "Mentor Office Hours", "Demo Day"],
    organizer: "AI Builders Collective",
    tags: ["ai", "hackathon", "machine-learning"],
  },
  {
    slug: "web3-developer-meetup",
    image:
      "https://res.cloudinary.com/o0h1cdd9/image/upload/v1783949937/event3_acwszj.png",
    title: "Web3 Developer Meetup",
    location: "Miami, FL",
    date: "July 20, 2024",
    time: "6:00 PM - 9:00 PM",
    description:
      "An evening meetup for Web3 developers to discuss smart contracts, dApps, and decentralized infrastructure.",
    overview:
      "Short talks, live demos, and open networking with builders in the Miami blockchain scene.",
    venue: "Wynwood Labs",
    mode: "offline",
    audience: "Blockchain developers and crypto-curious engineers",
    agenda: ["Lightning Talks", "Smart Contract Demo", "Networking"],
    organizer: "Miami Web3 Guild",
    tags: ["web3", "blockchain", "meetup"],
  },
  {
    slug: "fullstack-conference",
    image:
      "https://res.cloudinary.com/o0h1cdd9/image/upload/v1783949934/event1_or1rdp.png",
    title: "Full Stack Conference",
    location: "Denver, CO",
    date: "August 12, 2024",
    time: "9:00 AM - 6:00 PM",
    description:
      "Full Stack Conference explores end-to-end application development — APIs, databases, frontends, and DevOps.",
    overview:
      "Hear from teams running production systems and learn patterns you can apply immediately in your stack.",
    venue: "Colorado Convention Center",
    mode: "offline",
    audience: "Full-stack engineers and engineering managers",
    agenda: ["API Design", "Database Patterns", "Frontend Architecture", "DevOps & Observability"],
    organizer: "Full Stack Denver",
    tags: ["fullstack", "backend", "frontend"],
  },
];
