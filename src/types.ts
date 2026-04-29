export interface Project {
  id: string;
  title: string;
  description: string;
  tech: string[];
  link: string;
  imageUrl: string;
}

export interface SkillCategory {
  name: string;
  skills: string[];
}

export interface Education {
  institution: string;
  degree: string;
  period: string;
}

export interface UserProfile {
  name: string;
  roles: string[];
  about: string;
  careerGoal: string;
  skills: SkillCategory[];
  projects: Project[];
  certifications: string[];
  achievements: string[];
  education: Education[];
  areasOfInterest: string[];
  contact: {
    email: string;
    linkedin: string;
    phone: string;
    github: string;
  };
  profileImage?: string;
}

export const defaultProfile: UserProfile = {
  name: "Rithik Roshan G",
  profileImage: "https://images.unsplash.com/photo-1618761714954-0b8cd0026356?q=80&w=2070&auto=format&fit=crop",
  roles: ["AI Developer", "UI/UX Designer", "Data Analyst"],
  about: "Aspiring UI/UX Designer with a strong technical background, seeking opportunities to apply user-centered design, prototyping, and front-end skills to build intuitive and impactful digital experiences.",
  careerGoal: "To build the next generation of intuitive AI interfaces.",
  skills: [
    { name: "AI & ML", skills: ["Python", "TensorFlow", "PyTorch", "LLMs", "RAG"] },
    { name: "Web Development", skills: ["React", "TypeScript", "Next.js", "Tailwind CSS", "Node.js"] },
    { name: "UI/UX", skills: ["Figma", "Framer", "Prototyping", "User Research"] },
    { name: "Data Science", skills: ["Pandas", "SQL", "Data Visualization", "Jupyter"] }
  ],
  projects: [
    {
      id: "1",
      title: "AURA V-SAGE",
      description: "Smart AI Planning for Budget-Friendly Group Trips. Features mobile OTP and Google sign-in.",
      tech: ["React", "Firebase", "Tailwind", "Gemini API"],
      link: "https://aistudio.google.com/apps/c44fb422-1a7b-4603-ad29-e88329c8dc1a?showPreview=true&showAssistant=true",
      imageUrl: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2021&auto=format&fit=crop"
    },
    {
      id: "2",
      title: "EcoCraft AI",
      description: "Architectural blueprint digitization tool. Converts 2D plans into generating 3D eco-plans.",
      tech: ["Three.js", "React", "Python Backend", "AI Vision"],
      link: "https://aistudio.google.com/apps/951b1278-5154-4b7b-9ed5-98c6229a0ee0?showPreview=true&showAssistant=true",
      imageUrl: "https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2053&auto=format&fit=crop"
    },
    {
      id: "3",
      title: "BraidTrack 360",
      description: "An AI-powered tracking solution for seamless and efficient resource management.",
      tech: ["React", "AI Models", "Analytics Dashboard"],
      link: "https://aistudio.google.com/apps/7a2cceb9-4aaf-4dac-822d-4d44963122ce?showPreview=true&showAssistant=true",
      imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop"
    },
    {
      id: "4",
      title: "Nector AI News",
      description: "A smart news aggregation platform that delivers personalized, AI-curated news feeds.",
      tech: ["AI Summarization", "React", "Node.js", "News API"],
      link: "https://aistudio.google.com/apps/d19f16a7-354b-46d0-86a4-6ba2dc4401bc?showPreview=true&showAssistant=true",
      imageUrl: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=2070&auto=format&fit=crop"
    }
  ],
  certifications: [
    "HP Life Skills Certification Program",
    "Data Analytics & AI certifications - Great Learning",
    "Professional certification courses - Novitech",
    "Oracle Certified Foundations Associate - Oracle",
    "Cybersecurity Professional Certificate - Google",
    "JavaScript Essentials 1 - Cisco",
    "EBPL Certification - Naan Mudhalvan Skill Development",
    "AWS Academy Graduate - Generative AI Foundations",
    "AWS Academy Graduate - Machine Learning Foundations",
    "Completed Excel Workshop - Thulir Infotech",
    "Training programs from NASSCOM"
  ],
  achievements: [],
  education: [
    {
      institution: "Sasurie College of Engineering, Tirupur",
      degree: "B.Tech in Artificial Intelligence and Data Science (CGPA: 8.2)",
      period: "July 2023 - May 2027"
    },
    {
      institution: "Government Boys Higher Secondary School, Uthukuli",
      degree: "Higher Secondary Education (+2) (80%)",
      period: "June 2021 - May 2023"
    },
    {
      institution: "Government Boys Higher Secondary School, Uthukuli",
      degree: "Secondary School Leaving Certificate (SSLC) (100%)",
      period: "June 2020 - April 2021"
    }
  ],
  areasOfInterest: [
     "Artificial Intelligence",
     "Generative AI",
     "UI/UX Design",
     "Full-Stack Web Development",
     "Data Visualization"
  ],
  contact: {
    email: "amsavenirithikroshan23@gmail.com",
    linkedin: "shorturl.at/AcSub",
    phone: "9600848394",
    github: "github.com/roshan-stack143"
  }
};
