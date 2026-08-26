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
  Layers, 
  Smartphone
} from 'lucide-react';

// Official devicon & brand logo mappings
const logoMap = {
  // Programming
  "Python": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg",
  "JavaScript (ES6+)": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg",
  "SQL": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg",
  "HTML5": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg",
  "CSS3": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg",

  // Frontend
  "React.js": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg",
  "Tailwind CSS": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg",
  "Three.js / WebGL": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/threejs/threejs-original.svg",

  // Backend
  "Node.js": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg",
  "Express.js": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg",
  "Flask": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/flask/flask-original.svg",

  // Databases
  "PostgreSQL & MySQL": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg",
  "Firebase / Firestore": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/firebase/firebase-plain.svg",
  "Supabase": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/supabase/supabase-original.svg",
  "Oracle SQL": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/oracle/oracle-original.svg",

  // AI & Data
  "Pandas & NumPy": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/pandas/pandas-original.svg",
  "CNN & Transfer Learning": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tensorflow/tensorflow-original.svg",

  // Tools
  "Git & GitHub": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg",
  "VS Code": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original.svg",
  "Jupyter Notebooks": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/jupyter/jupyter-original.svg",
  "Postman": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postman/postman-original.svg",
  "Figma": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg",
};

// Fallback / Conceptual SVGs & Lucide Icons with light/dark adaptive styling
const fallbackMap = {
  "Generative AI & Gemini API": { icon: Sparkles, color: "text-cyan-500 dark:text-cyan-400" },
  "RAG Systems": { icon: Network, color: "text-violet-500 dark:text-violet-400" },
  "NLP (spaCy / NLTK)": { icon: MessageSquareCode, color: "text-emerald-500 dark:text-emerald-400" },
  "Power BI": { icon: BarChart3, color: "text-amber-500 dark:text-yellow-400" },
  "Responsive UI": { icon: Smartphone, color: "text-blue-500 dark:text-blue-400" },
  "Component Architecture": { icon: Layers, color: "text-indigo-500 dark:text-indigo-400" },
  "RESTful APIs": { icon: Server, color: "text-emerald-500 dark:text-emerald-400" },
  "Payment Webhooks": { icon: Webhook, color: "text-amber-500 dark:text-amber-400" },
};

export default function TechIcon({ name, className = "w-4 h-4" }) {
  const [imgError, setImgError] = useState(false);
  const logoUrl = logoMap[name];
  const fallback = fallbackMap[name] || { icon: Code2, color: "text-indigo-500 dark:text-indigo-400" };
  const FallbackIcon = fallback.icon;

  if (logoUrl && !imgError) {
    return (
      <img
        src={logoUrl}
        alt={`${name} logo`}
        width="18"
        height="18"
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
