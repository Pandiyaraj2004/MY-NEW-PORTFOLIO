import React, { useState } from 'react';
import { 
  Code2, 
  Layout, 
  Server, 
  Database, 
  Brain, 
  Wrench, 
  Sparkles, 
  Network, 
  MessageSquareCode, 
  Eye, 
  BarChart3, 
  Webhook, 
  FileCode2, 
  Layers, 
  Smartphone,
  Cpu
} from 'lucide-react';

// Official devicon & brand logo mappings
const logoMap = {
  // Programming
  "Python": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg",
  "JavaScript (ES6+)": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg",
  "SQL": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg",
  "HTML5 / Semantic Web": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg",
  "CSS3 / Modern Styling": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg",

  // Frontend
  "React.js": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg",
  "Tailwind CSS": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg",
  "Three.js / WebGL": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/threejs/threejs-original.svg",

  // Backend
  "Node.js": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg",
  "Express.js": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg",
  "Flask": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/flask/flask-original.svg",

  // Databases
  "Firebase / Firestore": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/firebase/firebase-plain.svg",
  "PostgreSQL & MySQL": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg",
  "Oracle SQL": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/oracle/oracle-original.svg",
  "Supabase": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/supabase/supabase-original.svg",

  // AI & Data
  "Pandas & NumPy": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/pandas/pandas-original.svg",
  "Git & GitHub": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg",
  "VS Code & PyCharm": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original.svg",
  "Jupyter Notebooks": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/jupyter/jupyter-original.svg",
  "Postman": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postman/postman-original.svg",
  "Figma": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg",
};

// Fallback / Conceptual SVGs & Lucide Icons
const fallbackMap = {
  "Generative AI & Gemini API": { icon: Sparkles, color: "text-cyan-400" },
  "RAG (Retrieval-Augmented)": { icon: Network, color: "text-violet-400" },
  "NLP (spaCy / NLTK)": { icon: MessageSquareCode, color: "text-emerald-400" },
  "CNN & Transfer Learning": { icon: Eye, color: "text-amber-400" },
  "Power BI & Visualization": { icon: BarChart3, color: "text-yellow-400" },
  "Responsive UI Design": { icon: Smartphone, color: "text-blue-400" },
  "Component Architecture": { icon: Layers, color: "text-indigo-400" },
  "RESTful API Design": { icon: Server, color: "text-emerald-400" },
  "Webhook Pipelines": { icon: Webhook, color: "text-amber-400" },
};

export default function TechIcon({ name, className = "w-4 h-4" }) {
  const [imgError, setImgError] = useState(false);
  const logoUrl = logoMap[name];
  const fallback = fallbackMap[name] || { icon: Code2, color: "text-indigo-400" };
  const FallbackIcon = fallback.icon;

  if (logoUrl && !imgError) {
    return (
      <img
        src={logoUrl}
        alt={`${name} logo`}
        width="16"
        height="16"
        loading="lazy"
        decoding="async"
        onError={() => setImgError(true)}
        className={`${className} object-contain flex-shrink-0`}
      />
    );
  }

  return (
    <FallbackIcon className={`${className} ${fallback.color} flex-shrink-0`} />
  );
}
