import React, { useState, useEffect } from 'react';
import { 
  CreditCard, 
  ShoppingCart, 
  ShieldCheck, 
  Webhook, 
  Building2, 
  Receipt, 
  RotateCcw, 
  Play, 
  Pause, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  ArrowRight,
  Terminal,
  RefreshCw,
  Lock,
  Activity
} from 'lucide-react';

export default function PaymentFlowVisualizer() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [flowType, setFlowType] = useState('standard'); // 'standard' | 'refund'
  const [logEvents, setLogEvents] = useState([]);

  const steps = [
    {
      step: 1,
      id: "order_created",
      title: "Order Created",
      actor: "Customer & Checkout UI",
      desc: "Cart verified, order ID & idempotency token generated.",
      icon: ShoppingCart,
      color: "#38bdf8",
      payload: { order_id: "ord_98a7f23c", amount: 4850.00, currency: "INR", items_count: 3, status: "CREATED" }
    },
    {
      step: 2,
      id: "payment_initiated",
      title: "Payment Initiated",
      actor: "Client SDK & API Gateway",
      desc: "Secure checkout session initialized with cryptographic token.",
      icon: CreditCard,
      color: "#818cf8",
      payload: { session_id: "cs_live_09x21", method: "CARD_EMV", auth_channel: "REST_SECURE", status: "PENDING" }
    },
    {
      step: 3,
      id: "auth_success",
      title: "Payment Authorized",
      actor: "Acquiring Gateway & Bank",
      desc: "Card network approval, 3DS authentication token validated.",
      icon: ShieldCheck,
      color: "#34d399",
      payload: { auth_code: "AUTH_88301", rrn: "4190281920", code: 200, risk_score: "LOW", status: "AUTHORIZED" }
    },
    {
      step: 4,
      id: "webhook_dispatched",
      title: "Webhook Received",
      actor: "Async Ingestion Service",
      desc: "Node.js Express webhook listener validates HMAC-SHA256 signature.",
      icon: Webhook,
      color: "#fbbf24",
      payload: { event: "payment.authorized", signature: "sha256=8f3c..a10", timestamp: 1779840212, processed: true }
    },
    {
      step: 5,
      id: "ledger_updated",
      title: "Transaction State Updated",
      actor: "Database & Ledger",
      desc: "Relational database transaction committed; merchant balance updated.",
      icon: Building2,
      color: "#a78bfa",
      payload: { db_tx_id: "tx_019f", merchant_id: "mch_surfboard", state: "CAPTURED", ledger_status: "BALANCED" }
    },
    {
      step: 6,
      id: flowType === 'standard' ? "settlement_receipt" : "refund_issued",
      title: flowType === 'standard' ? "Settlement & Receipt" : "Refund Orchestration",
      actor: flowType === 'standard' ? "Settlement Engine" : "Dispute & Refund Service",
      desc: flowType === 'standard' 
        ? "Automated batch settlement scheduled; PDF digital receipt generated."
        : "Reversal webhook triggered; original payment ledger refunded.",
      icon: flowType === 'standard' ? Receipt : RefreshCw,
      color: flowType === 'standard' ? "#10b981" : "#f43f5e",
      payload: flowType === 'standard' 
        ? { batch_id: "set_20260714", payout_eta: "T+1", receipt_url: "rcpt_pdf_generated", status: "SETTLED" }
        : { refund_id: "ref_88129", reversal_amount: 4850.00, gateway_ref: "REV_OK", status: "REFUNDED" }
    }
  ];

  // Auto-step timer with tab visibility check
  useEffect(() => {
    let interval;
    if (isAutoPlaying) {
      interval = setInterval(() => {
        if (document.visibilityState === 'visible') {
          setCurrentStep((prev) => {
            if (prev >= 6) {
              return 1;
            }
            return prev + 1;
          });
        }
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  // Log updater
  useEffect(() => {
    const active = steps[currentStep - 1];
    const newLog = {
      time: new Date().toLocaleTimeString(),
      stage: active.title,
      event: active.id,
      actor: active.actor,
      payload: JSON.stringify(active.payload)
    };
    setLogEvents((prev) => [newLog, ...prev.slice(0, 5)]);
  }, [currentStep, flowType]);

  return (
    <div className="w-full bg-slate-950 border border-slate-800/80 rounded-2xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
      {/* Background ambient gradient glow */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-indigo-500/10 rounded-full blur-xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-cyan-500/10 rounded-full blur-xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 mb-8 border-b border-slate-800/70 pb-6 relative z-10">
        <div>
          <div className="flex items-center gap-2 text-indigo-400 text-xs font-mono font-bold uppercase tracking-wider mb-1.5">
            <Lock className="w-3.5 h-3.5 text-indigo-400" />
            Engineering Simulation · Surfboard Payments Architecture
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-white font-display">
            Interactive 6-Stage Payment & Webhook Lifecycle
          </h3>
          <p className="text-sm text-slate-400 mt-1 max-w-2xl">
            Simulating resilient full-stack transaction flows, idempotent webhook listeners, and merchant settlement logic built during the Surfboard Payments internship.
          </p>
        </div>

        {/* Controls */}
        <div className="flex items-center flex-wrap gap-2.5">
          <div className="flex rounded-lg bg-slate-900 border border-slate-800 p-0.5">
            <button
              onClick={() => { setFlowType('standard'); setCurrentStep(1); }}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
                flowType === 'standard'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Standard Settlement
            </button>
            <button
              onClick={() => { setFlowType('refund'); setCurrentStep(1); }}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
                flowType === 'refund'
                  ? 'bg-rose-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Refund / Reversal
            </button>
          </div>

          <button
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors"
          >
            {isAutoPlaying ? <Pause className="w-3.5 h-3.5 text-amber-400" /> : <Play className="w-3.5 h-3.5 text-emerald-400" />}
            {isAutoPlaying ? 'Pause' : 'Auto Flow'}
          </button>

          <button
            onClick={() => { setCurrentStep(1); setIsAutoPlaying(false); }}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-slate-200 border border-slate-700/60"
            title="Reset to step 1"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 6-Stage Progress Nodes Line */}
      <div className="relative mb-10 z-10">
        {/* Connecting Line Track */}
        <div className="absolute top-1/2 left-4 right-4 h-1 -translate-y-1/2 bg-slate-800 hidden md:block rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-cyan-500 via-indigo-500 to-emerald-500 transition-all duration-500"
            style={{ width: `${((currentStep - 1) / 5) * 100}%` }}
          />
        </div>

        {/* Nodes Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 relative">
          {steps.map((s) => {
            const Icon = s.icon;
            const isPassed = currentStep > s.step;
            const isCurrent = currentStep === s.step;

            return (
              <button
                key={s.step}
                onClick={() => {
                  setCurrentStep(s.step);
                  setIsAutoPlaying(false);
                }}
                className={`flex flex-col items-center p-3 rounded-xl border text-center transition-all duration-300 relative group ${
                  isCurrent
                    ? 'bg-slate-900 border-indigo-500 shadow-lg shadow-indigo-500/20 scale-105'
                    : isPassed
                    ? 'bg-slate-900/60 border-slate-700/80 text-slate-300'
                    : 'bg-slate-900/30 border-slate-800/50 text-slate-500 hover:border-slate-700'
                }`}
              >
                {/* Node Icon Circle */}
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center mb-2 transition-all ${
                    isCurrent
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/30'
                      : isPassed
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>

                <div className="text-[10px] font-mono font-bold tracking-wider text-slate-400 uppercase">
                  Step 0{s.step}
                </div>
                <div className={`text-xs font-semibold mt-0.5 line-clamp-1 ${isCurrent ? 'text-white' : 'text-slate-300'}`}>
                  {s.title}
                </div>

                {isCurrent && (
                  <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-indigo-400 rounded-full animate-ping" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Stage Deep-Dive & Payload Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 relative z-10">
        {/* Left: Active Stage Details (7 cols) */}
        <div className="lg:col-span-7 bg-slate-900/80 border border-slate-800 rounded-xl p-5 sm:p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-3 mb-3">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  STAGE 0{currentStep} / 06
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  Actor: <strong className="text-slate-200">{steps[currentStep - 1].actor}</strong>
                </span>
              </div>
              <div className="flex items-center gap-1 text-xs text-emerald-400 font-mono">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Deterministic</span>
              </div>
            </div>

            <h4 className="text-xl font-bold text-white mb-2">
              {steps[currentStep - 1].title}
            </h4>
            <p className="text-sm text-slate-300 leading-relaxed mb-4">
              {steps[currentStep - 1].desc}
            </p>

            {/* Workflow Logic Explanation */}
            <div className="bg-slate-950/70 border border-slate-800/80 rounded-lg p-4 text-xs text-slate-300 space-y-2">
              <div className="font-semibold text-slate-200 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                Engineering Guarantees in this Step:
              </div>
              {currentStep === 1 && (
                <p className="text-slate-400">Generates unique client idempotent keys ensuring double clicks do not trigger duplicated charges.</p>
              )}
              {currentStep === 2 && (
                <p className="text-slate-400">Encrypts payment credentials via PCI-DSS compliant tokenization prior to reaching acquiring bank endpoints.</p>
              )}
              {currentStep === 3 && (
                <p className="text-slate-400">Verifies EMV/3DS tokens and bank authorization codes with sub-second latency.</p>
              )}
              {currentStep === 4 && (
                <p className="text-slate-400">Validates SHA256 HMAC headers on incoming webhooks in Express.js to block unauthorized spoofing attempts.</p>
              )}
              {currentStep === 5 && (
                <p className="text-slate-400">Atomic database transaction updates ledger balance, marks order CAPTURED, and fires frontend state notification.</p>
              )}
              {currentStep === 6 && (
                <p className="text-slate-400">
                  {flowType === 'standard'
                    ? "Groups settled transactions into daily merchant payout batches and outputs cryptographically signed receipts."
                    : "Processes automated reverse-capture callbacks and updates merchant reserve accounts with full audit logs."}
                </p>
              )}
            </div>
          </div>

          {/* Navigation buttons */}
          <div className="flex items-center justify-between gap-3 mt-6 pt-4 border-t border-slate-800">
            <button
              disabled={currentStep === 1}
              onClick={() => setCurrentStep((prev) => Math.max(1, prev - 1))}
              className="px-4 py-2 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 disabled:opacity-40 disabled:pointer-events-none transition-colors"
            >
              ← Previous Stage
            </button>
            <button
              disabled={currentStep === 6}
              onClick={() => setCurrentStep((prev) => Math.min(6, prev + 1))}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white disabled:opacity-40 disabled:pointer-events-none transition-colors shadow-md shadow-indigo-600/20"
            >
              <span>Next Stage</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Right: Real-time Payload & Event Log (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          {/* JSON Payload Inspector */}
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 font-mono text-xs overflow-hidden">
            <div className="flex items-center justify-between text-slate-400 mb-2 pb-2 border-b border-slate-800/80">
              <div className="flex items-center gap-1.5 text-cyan-400 font-semibold">
                <Terminal className="w-3.5 h-3.5" />
                <span>Simulated Payload Inspector</span>
              </div>
              <span className="text-[10px] text-slate-500">application/json</span>
            </div>
            <pre className="text-emerald-400/90 overflow-x-auto text-[11px] leading-relaxed p-2 bg-slate-900/60 rounded">
              {JSON.stringify(steps[currentStep - 1].payload, null, 2)}
            </pre>
          </div>

          {/* Event Stream Log */}
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 font-mono text-xs flex-1">
            <div className="flex items-center justify-between text-slate-400 mb-2 pb-2 border-b border-slate-800/80">
              <div className="flex items-center gap-1.5 text-indigo-400 font-semibold">
                <Activity className="w-3.5 h-3.5 animate-pulse" />
                <span>Live Event Stream</span>
              </div>
              <span className="text-[10px] text-slate-500">idempotent audit</span>
            </div>
            <div className="space-y-2 max-h-36 overflow-y-auto pr-1">
              {logEvents.map((ev, idx) => (
                <div key={idx} className="text-[10px] text-slate-400 bg-slate-900/50 p-1.5 rounded border border-slate-800/50 flex flex-col">
                  <div className="flex items-center justify-between text-slate-300 font-semibold">
                    <span className="text-cyan-400">[{ev.time}]</span>
                    <span className="text-indigo-300">{ev.stage}</span>
                  </div>
                  <div className="text-slate-400 truncate text-[9px] mt-0.5 font-mono">
                    {ev.payload}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
