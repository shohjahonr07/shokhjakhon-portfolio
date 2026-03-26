export type BentoScore = {
  label: string;
  score: number;
  outOf: number;
};

export type TimelineItem = {
  company: string;
  role: string;
  highlights: string[];
};

export type ProjectCard = {
  title: string;
  description: string;
  highlights: string[];
  tags: string[];
  youtubeUrl?: string;
  githubUrl?: string;
};

export type PublicationCard = {
  title: string;
  venue: string;
  description: string;
  href: string;
};

export type AwardHighlight = {
  title: string;
  description: string;
  yearLabel?: string;
};

export const hero = {
  headline: "Future Software Engineer and Innovator.",
  name: "Shokhjakhon Rustamov",
  shortBio:
    "I build cinematic, high-performance experiences at the intersection of software engineering, applied math, and ML systems.",
};

export const academicScores: BentoScore[] = [
  { label: "Calculus", score: 30, outOf: 30 },
  { label: "Discrete Math", score: 30, outOf: 30 },
  { label: "Physics", score: 30, outOf: 30 },
];

export const timeline: TimelineItem[] = [
  {
    company: "Ray Cargo LLC",
    role: "Dispatcher",
    highlights: ["Coordinated shipments and schedules under pressure."],
  },
  {
    company: "KPI",
    role: "Cloud Engineering Intern",
    highlights: ["Built and maintained cloud workflows and deployment tooling."],
  },
  {
    company: "Azmafinance",
    role: "ML Intern",
    highlights: [
      "Automated email workflows with ML to reduce manual triage.",
    ],
  },
];

export const projects: ProjectCard[] = [
  {
    title: "AI Trading Bot",
    description:
      "A reinforcement-learning trading system using interpretable indicators and a broker integration bridge.",
    highlights: [
      "Double Deep Q-Learning for decision making.",
      "RSI, MACD, and Bollinger Bands indicators for signals.",
      "Exness MT4/MT5 integration for execution.",
    ],
    tags: ["Reinforcement Learning", "Technical Indicators", "MT4/MT5"],
    // Update this to your exact repo URL when you share it.
    githubUrl: "https://github.com/shokhjakhonrustamov2007",
  },
  {
    title: "Bluetooth Car",
    description:
      "An embedded vehicle controller with responsive wireless command handling and a fully automated mechanism.",
    highlights: [
      "Arduino/ESP32 control pipeline with low-latency command parsing.",
      "Automated upper-side mechanism for simplified operation.",
    ],
    tags: ["Embedded Systems", "ESP32", "Automation"],
    // Placeholder until you provide the exact CV video URL.
    youtubeUrl: "https://www.youtube.com/watch?v=PLACEHOLDER",
  },
];

export const publications: PublicationCard[] = [
  {
    title: "Amazon's Ethical Practices",
    venue: "Zenodo",
    description: "Zenodo publication on Amazon's Ethical Practices.",
    href: "https://zenodo.org/",
  },
];

export const awards: AwardHighlight[] = [
  {
    title: "2nd Place — Regional Armwrestling",
    description: "Discipline & Strength. Competed and secured podium placement through consistent training.",
    yearLabel: "Competitive highlight",
  },
];

