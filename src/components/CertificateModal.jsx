import React, { useEffect } from 'react';
import { X, ExternalLink, Award, CheckCircle2, ShieldCheck, Copy, Check } from 'lucide-react';

export default function CertificateModal({ certificate, onClose }) {
  const [copied, setCopied] = React.useState(false);

  useEffect(() => {
    if (!certificate) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [certificate, onClose]);

  if (!certificate) return null;

  const handleCopyLink = () => {
    const link = certificate.link || certificate.courseLink || window.location.href;
    navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/85 backdrop-blur-xl animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="relative w-full max-w-2xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="flex items-center justify-between p-6 bg-slate-900 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <span className="font-mono text-xs font-semibold text-indigo-400">
                {certificate.issuer} · {certificate.year}
              </span>
              <div className="flex items-center gap-1.5 text-xs text-emerald-400 mt-0.5">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Verified Credential Record</span>
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-6">
          <div>
            <div className="inline-block px-2.5 py-1 rounded-md text-xs font-mono font-bold bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 mb-2">
              {certificate.badge}
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white font-display">
              {certificate.title}
            </h3>
            <p className="mt-3 text-sm text-slate-300 leading-relaxed font-sans">
              {certificate.description}
            </p>
          </div>

          {/* Key Skills */}
          {certificate.skills && (
            <div>
              <div className="text-xs font-mono font-semibold text-slate-400 uppercase tracking-wider mb-2.5">
                Evaluated Competencies
              </div>
              <div className="flex flex-wrap gap-2">
                {certificate.skills.map((s, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 text-xs font-medium bg-slate-950 border border-slate-800 text-slate-300 rounded-lg"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Tags */}
          {certificate.tags && (
            <div className="flex flex-wrap gap-1.5 pt-2">
              {certificate.tags.map((t, idx) => (
                <span key={idx} className="text-[11px] font-mono text-slate-400 bg-slate-800/60 px-2 py-0.5 rounded">
                  #{t}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Actions Footer */}
        <div className="p-6 bg-slate-950 border-t border-slate-800 flex items-center justify-between gap-3">
          <button
            onClick={handleCopyLink}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-medium text-slate-300 bg-slate-900 hover:bg-slate-800 border border-slate-800 transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied' : 'Copy Link'}</span>
          </button>

          <div className="flex items-center gap-2">
            {certificate.courseLink && (
              <a
                href={certificate.courseLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors"
              >
                <span>Course PDF</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}

            {certificate.link ? (
              <a
                href={certificate.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white shadow-lg shadow-indigo-600/30 transition-all"
              >
                <span>Open Verified Certificate</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            ) : (
              <span className="text-xs text-slate-500 font-mono px-3 py-2">
                Verified on Resume
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
