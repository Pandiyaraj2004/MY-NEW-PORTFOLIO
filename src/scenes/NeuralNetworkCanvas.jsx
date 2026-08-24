import React, { useEffect, useRef, useState } from 'react';
import { Brain, Cpu, Zap, Sparkles, RefreshCw } from 'lucide-react';

export default function NeuralNetworkCanvas() {
  const canvasRef = useRef(null);
  const [activeModel, setActiveModel] = useState('cnn'); // 'cnn' | 'rag' | 'gemini'
  const [inferenceCount, setInferenceCount] = useState(1480);

  const modelSpecs = {
    cnn: {
      name: "MobileNetV2 Crop Pathology",
      type: "Computer Vision & Transfer Learning",
      inputDim: "224x224x3 Leaf Matrix",
      layers: "MobileNetV2 -> GAP -> Dropout(0.25) -> Softmax",
      outputClasses: "38 Plant Disease Categories",
      latency: "~42ms",
      accuracy: "~85%"
    },
    rag: {
      name: "Contextual RAG Retrieval Pipeline",
      type: "Semantic Search & Vector Embeddings",
      inputDim: "User Natural Language Query",
      layers: "Tokenize -> Chunking -> Vector Cosine Match -> Context Inject",
      outputClasses: "Zero-Hallucination Factual Answers",
      latency: "~68ms",
      accuracy: "High Precision"
    },
    gemini: {
      name: "Multimodal Gemini Generative AI",
      type: "Large Language Model Orchestration",
      inputDim: "Structured Blueprints & Provider Credentials",
      layers: "Multimodal Prompt -> Semantic Reasoning -> JSON Output",
      outputClasses: "Automated Verification & Matching",
      latency: "~120ms",
      accuracy: "Enterprise Grade"
    }
  };

  const triggerInference = () => {
    setInferenceCount((prev) => prev + 1);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let animationId;
    let width = (canvas.width = canvas.parentElement.clientWidth);
    let height = (canvas.height = 340);

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = 340;
    };
    window.addEventListener('resize', handleResize);

    // Layer definitions (x positions and node counts)
    const layerStructure = [
      { name: "Input", count: 4, x: width * 0.12 },
      { name: "Conv2D / Embed", count: 7, x: width * 0.35 },
      { name: "GAP / Attention", count: 6, x: width * 0.62 },
      { name: "Dense Output", count: 3, x: width * 0.88 }
    ];

    // Build node coordinates
    const nodes = [];
    layerStructure.forEach((layer, layerIdx) => {
      const spacing = height / (layer.count + 1);
      for (let i = 0; i < layer.count; i++) {
        nodes.push({
          id: `${layerIdx}-${i}`,
          layerIdx,
          x: layer.x,
          y: spacing * (i + 1),
          radius: layerIdx === 0 || layerIdx === 3 ? 5 : 4,
          baseColor: layerIdx === 0 ? '#38bdf8' : layerIdx === 3 ? '#10b981' : '#818cf8',
          activity: Math.random()
        });
      }
    });

    // Build connections
    const connections = [];
    for (let i = 0; i < nodes.length; i++) {
      for (let j = 0; j < nodes.length; j++) {
        if (nodes[j].layerIdx === nodes[i].layerIdx + 1) {
          connections.push({
            from: nodes[i],
            to: nodes[j],
            weight: Math.random() * 0.8 + 0.2,
            active: Math.random() > 0.3
          });
        }
      }
    }

    // Moving signal pulses
    const pulses = [];
    const createPulse = () => {
      const validConnections = connections.filter((c) => c.from.layerIdx === 0);
      const startConn = validConnections[Math.floor(Math.random() * validConnections.length)];
      if (startConn) {
        pulses.push({
          conn: startConn,
          progress: 0,
          speed: 0.02 + Math.random() * 0.02,
          color: '#06b6d4'
        });
      }
    };

    let time = 0;

    const render = () => {
      time += 0.03;
      ctx.clearRect(0, 0, width, height);

      // Randomly spawn pulses
      if (Math.random() < 0.12 && pulses.length < 25) {
        createPulse();
      }

      // Draw Connections (Synapses)
      connections.forEach((conn) => {
        ctx.strokeStyle = conn.active ? 'rgba(99, 102, 241, 0.18)' : 'rgba(255, 255, 255, 0.04)';
        ctx.lineWidth = conn.weight * 1.5;
        ctx.beginPath();
        ctx.moveTo(conn.from.x, conn.from.y);
        ctx.lineTo(conn.to.x, conn.to.y);
        ctx.stroke();
      });

      // Update and draw Pulses
      for (let i = pulses.length - 1; i >= 0; i--) {
        const p = pulses[i];
        p.progress += p.speed;

        const curX = p.conn.from.x + (p.conn.to.x - p.conn.from.x) * p.progress;
        const curY = p.conn.from.y + (p.conn.to.y - p.conn.from.y) * p.progress;

        ctx.shadowColor = '#06b6d4';
        ctx.shadowBlur = 8;
        ctx.fillStyle = '#38bdf8';
        ctx.beginPath();
        ctx.arc(curX, curY, 2.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;

        // If reached destination, propagate to next layer or remove
        if (p.progress >= 1) {
          const nextLayerConns = connections.filter((c) => c.from.id === p.conn.to.id);
          if (nextLayerConns.length > 0 && Math.random() > 0.3) {
            const nextConn = nextLayerConns[Math.floor(Math.random() * nextLayerConns.length)];
            p.conn = nextConn;
            p.progress = 0;
          } else {
            pulses.splice(i, 1);
          }
        }
      }

      // Draw Layer Nodes
      nodes.forEach((node) => {
        const pulseEffect = Math.sin(time * 3 + node.activity * 10) * 0.4 + 0.6;

        ctx.shadowColor = node.baseColor;
        ctx.shadowBlur = 10 * pulseEffect;
        ctx.fillStyle = node.baseColor;
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fill();

        // Outer glow ring
        ctx.strokeStyle = `rgba(255, 255, 255, ${0.3 * pulseEffect})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius + 3, 0, Math.PI * 2);
        ctx.stroke();
        ctx.shadowBlur = 0;
      });

      // Layer Title Labels
      layerStructure.forEach((layer) => {
        ctx.font = '500 11px Inter, sans-serif';
        ctx.fillStyle = 'rgba(148, 163, 184, 0.6)';
        ctx.textAlign = 'center';
        ctx.fillText(layer.name, layer.x, height - 12);
      });

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, [activeModel]);

  const currentSpec = modelSpecs[activeModel];

  return (
    <div className="w-full bg-slate-950/90 border border-slate-800/80 rounded-2xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl relative overflow-hidden">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 border-b border-slate-800/70 pb-4">
        <div>
          <div className="flex items-center gap-2 text-violet-400 text-xs font-mono font-bold uppercase tracking-wider mb-1">
            <Brain className="w-3.5 h-3.5 animate-pulse" />
            Interactive Neural Network & AI Architecture
          </div>
          <h3 className="text-xl font-bold text-white font-display">
            Deep Learning, RAG Pipelines & Generative AI
          </h3>
        </div>

        {/* Model Toggle Buttons */}
        <div className="flex items-center flex-wrap gap-2">
          <button
            onClick={() => setActiveModel('cnn')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeModel === 'cnn'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm'
                : 'bg-slate-900/60 text-slate-400 border border-slate-800 hover:text-slate-200'
            }`}
          >
            MobileNetV2 CNN
          </button>
          <button
            onClick={() => setActiveModel('rag')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeModel === 'rag'
                ? 'bg-violet-500/20 text-violet-300 border border-violet-500/40 shadow-sm'
                : 'bg-slate-900/60 text-slate-400 border border-slate-800 hover:text-slate-200'
            }`}
          >
            RAG & NLP System
          </button>
          <button
            onClick={() => setActiveModel('gemini')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeModel === 'gemini'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                : 'bg-slate-900/60 text-slate-400 border border-slate-800 hover:text-slate-200'
            }`}
          >
            Gemini AI Integration
          </button>
        </div>
      </div>

      {/* Model Spec Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
        <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-3">
          <div className="text-[11px] text-slate-400 font-mono">Architecture</div>
          <div className="text-xs font-bold text-white mt-0.5 truncate">{currentSpec.name}</div>
        </div>
        <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-3">
          <div className="text-[11px] text-slate-400 font-mono">Pipeline Core</div>
          <div className="text-xs font-bold text-violet-300 mt-0.5 truncate">{currentSpec.type}</div>
        </div>
        <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-3">
          <div className="text-[11px] text-slate-400 font-mono">Target Metric</div>
          <div className="text-xs font-bold text-emerald-400 mt-0.5">{currentSpec.accuracy}</div>
        </div>
        <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-3">
          <div className="text-[11px] text-slate-400 font-mono">Inference Latency</div>
          <div className="text-xs font-bold text-cyan-300 mt-0.5">{currentSpec.latency}</div>
        </div>
      </div>

      {/* Canvas Area */}
      <div className="relative rounded-xl overflow-hidden bg-slate-950 border border-slate-800/60">
        <canvas ref={canvasRef} className="w-full block" />
        
        {/* Interactive Floating Trigger */}
        <div className="absolute bottom-3 right-4 flex items-center gap-2">
          <button
            onClick={triggerInference}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-violet-600 hover:bg-violet-500 text-white shadow-lg shadow-violet-600/30 transition-all active:scale-95"
          >
            <Zap className="w-3.5 h-3.5 text-amber-300" />
            <span>Fire Synthetic Signal</span>
          </button>
        </div>

        <div className="absolute bottom-3 left-4 hidden sm:flex items-center gap-2 text-[11px] text-slate-400 bg-slate-900/80 px-3 py-1 rounded-md border border-slate-800/60 backdrop-blur-md">
          <Cpu className="w-3.5 h-3.5 text-violet-400" />
          <span>Layer: {currentSpec.layers}</span>
        </div>
      </div>
    </div>
  );
}
