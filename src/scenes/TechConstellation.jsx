import React, { useState } from 'react';
import { 
  Terminal, 
  Code, 
  Layers, 
  Server, 
  Network, 
  Database, 
  BrainCircuit,
  ArrowRight,
  Sparkles,
  ChevronRight
} from 'lucide-react';

export default function TechConstellation() {
  const [selectedNode, setSelectedNode] = useState(0);

  const constellationNodes = [
    {
      id: "python",
      name: "Python",
      role: "The Algorithmic Foundation",
      stage: "01 · Data & Algorithms",
      icon: Terminal,
      color: "#38bdf8",
      accentBg: "bg-sky-500/10 border-sky-500/30 text-sky-400",
      description: "My starting point: mastering data structures, memory management, data science pipelines, and mathematical computing with Pandas and NumPy.",
      keyCapabilities: ["Data Structures & OOP", "Pandas / NumPy / EDA", "Scikit-Learn Classifiers", "Flask REST Microservices"]
    },
    {
      id: "javascript",
      name: "JavaScript",
      role: "The Asynchronous Bridge",
      stage: "02 · Web Logic & Runtime",
      icon: Code,
      color: "#fbbf24",
      accentBg: "bg-amber-500/10 border-amber-500/30 text-amber-400",
      description: "Mastering modern ES6+ paradigms: closures, event loop, Promises, asynchronous fetch workflows, and dynamic client-side rendering.",
      keyCapabilities: ["Async/Await & Event Loop", "DOM Manipulation & Events", "Functional Array Methods", "API Integration"]
    },
    {
      id: "react",
      name: "React.js",
      role: "Component Architecture",
      stage: "03 · Dynamic Frontend",
      icon: Layers,
      color: "#60a5fa",
      accentBg: "bg-blue-500/10 border-blue-500/30 text-blue-400",
      description: "Engineering scalable single page applications with custom hooks, atomic component hierarchies, state orchestration, and responsive design systems.",
      keyCapabilities: ["Custom Hooks & Context", "Component Lifecycle & Memo", "Tailwind CSS Tokenization", "Three.js / Canvas Integration"]
    },
    {
      id: "nodejs",
      name: "Node & Express",
      role: "Backend Microservices",
      stage: "04 · Server Architecture",
      icon: Server,
      color: "#34d399",
      accentBg: "bg-emerald-500/10 border-emerald-500/30 text-emerald-400",
      description: "Constructing high-throughput backend services, middleware validation, rate limiting, and asynchronous job processing for web applications.",
      keyCapabilities: ["Express.js Routing", "Authentication Middleware", "Puppeteer Web Scraping", "Asynchronous Event Handling"]
    },
    {
      id: "apis",
      name: "REST APIs & Webhooks",
      role: "Systems Connectivity",
      stage: "05 · Production Protocols",
      icon: Network,
      color: "#a78bfa",
      accentBg: "bg-purple-500/10 border-purple-500/30 text-purple-400",
      description: "Designing contract-driven RESTful APIs, webhook ingestion listeners, and integrating third-party systems like payment gateways and AI endpoints.",
      keyCapabilities: ["Idempotent Webhooks", "Signature Verification", "Third-Party API Integration", "Structured JSON Schemas"]
    },
    {
      id: "databases",
      name: "Databases & Cloud Stores",
      role: "Data Persistence",
      stage: "06 · Storage & Sync",
      icon: Database,
      color: "#f43f5e",
      accentBg: "bg-rose-500/10 border-rose-500/30 text-rose-400",
      description: "Modeling relational schemas in PostgreSQL/MySQL/Oracle SQL and leveraging real-time NoSQL collections in Firebase Firestore.",
      keyCapabilities: ["ACID Relational Design", "Firestore Real-time Sync", "SQL Query Optimization", "Data Modeling & Indexing"]
    },
    {
      id: "ai",
      name: "Intelligent Systems & AI",
      role: "Next-Gen Applications",
      stage: "07 · Full-Stack AI",
      icon: BrainCircuit,
      color: "#06b6d4",
      accentBg: "bg-cyan-500/10 border-cyan-500/30 text-cyan-400",
      description: "Fusing full-stack engineering with generative AI APIs (Gemini), RAG pipelines (spaCy/NLTK), and deep learning computer vision (MobileNetV2).",
      keyCapabilities: ["Gemini LLM Integration", "RAG Vector Context", "MobileNetV2 CNNs", "NLP Intent Extraction"]
    }
  ];

  const active = constellationNodes[selectedNode];

  return (
    <div className="w-full bg-slate-950/90 border border-slate-800/80 rounded-2xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-xl h-64 bg-indigo-600/10 blur-[100px] pointer-events-none" />

      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 border-b border-slate-800/70 pb-4 relative z-10">
        <div>
          <div className="flex items-center gap-2 text-indigo-400 text-xs font-mono font-bold uppercase tracking-wider mb-1">
            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
            The Technical Evolution
          </div>
          <h3 className="text-xl font-bold text-white font-display">
            From Scripting & Data to End-to-End Intelligent Systems
          </h3>
        </div>

        <div className="text-xs text-slate-400 font-mono bg-slate-900/90 px-3 py-1.5 rounded-lg border border-slate-800">
          Node {selectedNode + 1} of {constellationNodes.length} · Click or hover to explore
        </div>
      </div>

      {/* Interactive Constellation Horizontal Sequence */}
      <div className="relative mb-8 z-10 overflow-x-auto pb-3">
        <div className="flex items-center justify-between min-w-[700px] relative px-4">
          {/* Connecting Track Line */}
          <div className="absolute top-1/2 left-6 right-6 h-0.5 -translate-y-1/2 bg-slate-800 rounded-full" />
          <div 
            className="absolute top-1/2 left-6 h-0.5 -translate-y-1/2 bg-gradient-to-r from-sky-400 via-indigo-500 to-cyan-400 rounded-full transition-all duration-500"
            style={{ width: `${(selectedNode / (constellationNodes.length - 1)) * 92}%` }}
          />

          {constellationNodes.map((node, index) => {
            const Icon = node.icon;
            const isSelected = selectedNode === index;
            const isPassed = selectedNode >= index;

            return (
              <button
                key={node.id}
                onClick={() => setSelectedNode(index)}
                onMouseEnter={() => setSelectedNode(index)}
                className={`relative flex flex-col items-center group transition-all duration-300 ${
                  isSelected ? 'scale-110 z-20' : 'z-10 hover:scale-105'
                }`}
              >
                {/* Node Orb */}
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center border transition-all duration-300 ${
                    isSelected
                      ? 'bg-slate-900 border-indigo-400 text-white shadow-lg shadow-indigo-500/30'
                      : isPassed
                      ? 'bg-slate-900/80 border-slate-700 text-slate-300'
                      : 'bg-slate-950 border-slate-800 text-slate-500'
                  }`}
                  style={{
                    borderColor: isSelected ? node.color : undefined
                  }}
                >
                  <Icon className="w-5 h-5" style={{ color: isSelected || isPassed ? node.color : undefined }} />
                </div>

                {/* Label */}
                <span className={`text-[11px] font-semibold mt-2 transition-colors ${
                  isSelected ? 'text-white' : 'text-slate-400 group-hover:text-slate-300'
                }`}>
                  {node.name}
                </span>

                {isSelected && (
                  <span className="absolute -top-1 w-2 h-2 rounded-full bg-indigo-400 animate-ping" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Node Details Card */}
      <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-5 sm:p-6 relative z-10">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-4 border-b border-slate-800/80 pb-4">
          <div>
            <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-mono font-semibold border mb-1.5 ${active.accentBg}`}>
              {active.stage}
            </span>
            <h4 className="text-xl font-bold text-white flex items-center gap-2">
              {active.name} <span className="text-sm font-normal text-slate-400">· {active.role}</span>
            </h4>
          </div>

          <div className="flex items-center gap-2">
            <button
              disabled={selectedNode === 0}
              onClick={() => setSelectedNode((prev) => Math.max(0, prev - 1))}
              className="px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800 text-slate-300 hover:bg-slate-700 disabled:opacity-30 disabled:pointer-events-none"
            >
              ← Prev
            </button>
            <button
              disabled={selectedNode === constellationNodes.length - 1}
              onClick={() => setSelectedNode((prev) => Math.min(constellationNodes.length - 1, prev + 1))}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-indigo-600 text-white hover:bg-indigo-500 disabled:opacity-30 disabled:pointer-events-none flex items-center gap-1"
            >
              <span>Next</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <p className="text-sm text-slate-300 leading-relaxed mb-5">
          {active.description}
        </p>

        {/* Capabilities Grid */}
        <div>
          <div className="text-xs font-mono font-semibold text-slate-400 uppercase tracking-wider mb-2.5">
            Key Practical Competencies:
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2.5">
            {active.keyCapabilities.map((cap, idx) => (
              <div key={idx} className="flex items-center gap-2 bg-slate-950/80 border border-slate-800/80 px-3 py-2 rounded-lg text-xs text-slate-200">
                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: active.color }} />
                <span>{cap}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
