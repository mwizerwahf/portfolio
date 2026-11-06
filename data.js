// =====================================================================
//  EDIT THIS FILE ONLY — all of your personal content lives here.
// =====================================================================
window.PORTFOLIO = {
  name: "Mwizerwa Honore Frank",
  shortName: "Frank",
  title: "Network Engineer · Cloud & Security Builder",
  location: "Kigali, Rwanda",
  email: "info@mwizerwa.com",
  github: "https://github.com/mwizerwahf",
  linkedin: "https://www.linkedin.com/in/mwizerwahf/",
  resume: "",

  tagline: "I build practical technology that keeps networks running, data safe, and people connected — especially across Africa.",

  about: [
    "I'm Frank, a network engineer from Rwanda. I hold a Bachelor's degree in Network Engineering and I'm currently pursuing a Master of Science in Information Technology at Carnegie Mellon University Africa.",
    "My work sits where networking, cybersecurity, cloud computing and artificial intelligence meet. I've configured routers and firewalls in the field, built backend APIs, and set up security labs to understand how attacks show up on the wire.",
    "What drives me is building practical technology that solves real-world problems and improves people's lives, particularly in Africa. Away from the keyboard, I play guitar and piano."
  ],

  quickFacts: [
    { label: "Studying", value: "MSc IT · Carnegie Mellon University - Africa" },
    { label: "Background", value: "BSc Network Engineering" },
    { label: "Based in", value: "Kigali, Rwanda" },
    { label: "Focus", value: "Networking · Security · Cloud · AI" }
  ],

  superpowers: [
    { name: "Network Mastery", icon: "🌐", level: 92, tags: ["TCP/IP", "Routing", "Switching", "MikroTik", "pfSense", "DNS", "DHCP", "Troubleshooting"] },
    { name: "Cyber Defense", icon: "🛡️", level: 80, tags: ["Network Security", "DNS Monitoring", "Security Automation"] },
    { name: "Cloud & Systems", icon: "☁️", level: 75, tags: ["AWS", "Linux", "Nginx"] },
    { name: "Code Craft", icon: "🐍", level: 82, tags: ["Python", "JavaScript", "TypeScript"] },
    { name: "Backend & Data", icon: "⚙️", level: 78, tags: ["FastAPI", "REST APIs", "PostgreSQL"] },
    { name: "Frontend", icon: "⚛️", level: 70, tags: ["React"] }
  ],

  projects: [
    {
      name: "Ecclesia Flow",
      emoji: "⛪",
      description: "A modular church management platform that simplifies church administration, member management, events and financial operations.",
      tech: ["TypeScript", "React", "REST APIs", "PostgreSQL"],
      link: "",
      repo: "https://github.com/MwizerwaBit/ecclesia-flow-app"
    },
    {
      name: "DNS Telemetry & Network Security Lab",
      emoji: "🔍",
      description: "A hands-on lab for DNS query monitoring, network segmentation and privacy-conscious detection of suspicious DNS activity.",
      tech: ["pfSense", "MikroTik", "Kali Linux", "DNS"],
      link: "",
      repo: ""
    },
    {
      name: "Network Infrastructure Implementations",
      emoji: "📡",
      description: "Real-world network engineering: MikroTik routing, Starlink connectivity, wireless networks, CCTV, access control and enterprise IT infrastructure.",
      tech: ["MikroTik", "Starlink", "Wi-Fi", "CCTV", "Access Control"],
      link: "",
      repo: ""
    },
    {
      name: "This Portfolio",
      emoji: "🃏",
      description: "A hand-built portfolio with a holographic trading-card easter egg, deployed on AWS Amplify Hosting with automatic CI/CD from GitHub.",
      tech: ["HTML", "CSS", "JavaScript", "AWS Amplify"],
      link: "https://main.dq2wu3xall9cs.amplifyapp.com/",
      repo: "https://github.com/mwizerwahf/portfolio"
    }
  ],

  achievements: [
    "MSc IT candidate · Carnegie Mellon University Africa",
    "BSc Network Engineering",
    "AWS Student Builder Challenge 2026"
  ],

  // ===== The Superpower Card (creative feature) =====
  card: {
    initials: "MHF",
    class: "Network Guardian",
    element: "🌐 Network",
    hp: 1500,
    photo: "me.png",
    superpower: "Finds the root cause of any outage. (It's usually DNS.)",
    weakness: "An unlabeled cable. Must trace it.",
    signatureMove: "traceroute --to-the-root-cause",
    stats: [
      { label: "Networking", value: 10 },
      { label: "Security", value: 9 },
      { label: "Code", value: 8 },
      { label: "Music", value: 8 }
    ],
    funFacts: [
      "I play both guitar and piano 🎸🎹. Debugging and music are both about finding the right pattern.",
      "I love taking complex systems apart in my head just to see how every piece talks to the others.",
      "I'm happiest when I'm building something new and experimenting with technology. My lab is never 'finished'.",
      "I've set up Starlink, CCTV and access control in real deployments, not just in simulators."
    ],
    flavorText: "From the land of a thousand hills. Keeps packets flowing, threats out, and ideas shipping to the cloud."
  }
};
