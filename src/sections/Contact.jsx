import React, { useState } from 'react';
import SectionHeader from '../components/SectionHeader';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Linkedin, 
  Github, 
  Globe, 
  FileText, 
  Download, 
  Send, 
  CheckCircle,
  Copy,
  Check
} from 'lucide-react';
import { ScrollRevealContainer, ScrollRevealItem } from '../components/ScrollReveal';

export default function Contact({ onOpenResume }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isCopied, setIsCopied] = useState(false);
  const [formSent, setFormSent] = useState(false);

  const contactData = {
    email: "pandiyaraja409@gmail.com",
    phone: "9384905937",
    location: "Karaikudi / Chennai, Tamil Nadu — 630305",
    linkedin: "https://www.linkedin.com/in/pandiyaraj-a-mca/",
    github: "https://github.com/Pandiyaraj2004",
    portfolio: "https://pandiyaraj.netlify.app"
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(contactData.email);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    const mailtoLink = `mailto:${contactData.email}?subject=${encodeURIComponent(
      subject || 'Opportunity / Collaboration'
    )}&body=${encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
    )}`;
    window.location.href = mailtoLink;
    setFormSent(true);
  };

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-5xl mx-auto">
        <SectionHeader
          badge="Get in Touch"
          title="Let's build something meaningful."
          subtitle="Open to full-time roles, software engineering opportunities, and collaborative projects."
        />

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
          {/* Left Column: Direct Info & Social Channels (5 cols) */}
          <ScrollRevealContainer className="md:col-span-5 glass-panel p-6 rounded-2xl space-y-5">
            <div>
              <h3 className="text-lg font-bold text-[var(--text-main)] font-display mb-0.5">
                Pandiyaraj A
              </h3>
              <p className="text-xs font-mono text-cyan-400">
                Full-Stack & AI Engineer
              </p>
            </div>

            {/* Direct Contact Links */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between p-3 rounded-xl glass-panel">
                <a
                  href={`mailto:${contactData.email}`}
                  className="flex items-center gap-2.5 text-xs text-[var(--text-main)] hover:text-cyan-400 transition-colors truncate"
                >
                  <Mail className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
                  <span className="truncate">{contactData.email}</span>
                </a>
                <button
                  onClick={handleCopyEmail}
                  className="p-1 rounded-lg glass-panel text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors ml-1.5"
                  title="Copy email"
                >
                  {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>

              <a
                href={`tel:${contactData.phone}`}
                className="flex items-center gap-2.5 p-3 rounded-xl glass-panel text-xs text-[var(--text-main)] hover:text-indigo-400 transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-indigo-400 flex-shrink-0" />
                <span>+91 {contactData.phone}</span>
              </a>

              <div className="flex items-center gap-2.5 p-3 rounded-xl glass-panel text-xs text-[var(--text-muted)]">
                <MapPin className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                <span className="truncate">{contactData.location}</span>
              </div>
            </div>

            {/* Profiles */}
            <div className="grid grid-cols-3 gap-2 pt-1">
              <a
                href={contactData.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center justify-center p-2.5 rounded-xl glass-panel text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors"
              >
                <Linkedin className="w-4 h-4 text-blue-400 mb-1" />
                <span className="text-[10px] font-mono">LinkedIn</span>
              </a>

              <a
                href={contactData.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center justify-center p-2.5 rounded-xl glass-panel text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors"
              >
                <Github className="w-4 h-4 text-purple-400 mb-1" />
                <span className="text-[10px] font-mono">GitHub</span>
              </a>

              <a
                href={contactData.portfolio}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center justify-center p-2.5 rounded-xl glass-panel text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors"
              >
                <Globe className="w-4 h-4 text-cyan-400 mb-1" />
                <span className="text-[10px] font-mono">Portfolio</span>
              </a>
            </div>

            {/* Resume CTAs */}
            <div className="pt-3 border-t border-[var(--border-subtle)] flex items-center gap-2">
              <button
                onClick={onOpenResume}
                className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white shadow transition-all active:scale-95"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>View Resume</span>
              </button>

              <a
                href="/assets/Pandiyaraj_A_Resume.pdf"
                download="Pandiyaraj_A_Resume.pdf"
                className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-semibold glass-panel text-[var(--text-main)] transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download PDF</span>
              </a>
            </div>
          </ScrollRevealContainer>

          {/* Right Column: Direct Message Form (7 cols) */}
          <ScrollRevealContainer className="md:col-span-7 glass-panel p-6 sm:p-7 rounded-2xl">
            <h3 className="text-base sm:text-lg font-bold text-[var(--text-main)] font-display mb-1">
              Send a Direct Message
            </h3>
            <p className="text-xs text-[var(--text-muted)] mb-4">
              Have an opportunity or inquiry? Drop your note to open a direct email draft.
            </p>

            <form onSubmit={handleSendMessage} className="space-y-3.5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-mono text-[var(--text-muted)] mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Hiring Manager"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full glass-panel rounded-xl px-3.5 py-2 text-xs text-[var(--text-main)] placeholder-[var(--text-dim)] focus:outline-none focus:border-indigo-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-[var(--text-muted)] mb-1">
                    Your Email
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="recruiter@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full glass-panel rounded-xl px-3.5 py-2 text-xs text-[var(--text-main)] placeholder-[var(--text-dim)] focus:outline-none focus:border-indigo-500 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-mono text-[var(--text-muted)] mb-1">
                  Subject
                </label>
                <input
                  type="text"
                  required
                  placeholder="Software Engineer Opportunity / Project Inquiry"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full glass-panel rounded-xl px-3.5 py-2 text-xs text-[var(--text-main)] placeholder-[var(--text-dim)] focus:outline-none focus:border-indigo-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono text-[var(--text-muted)] mb-1">
                  Message
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="Hi Pandiyaraj, I came across your portfolio and would like to discuss an opportunity for..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full glass-panel rounded-xl px-3.5 py-2 text-xs text-[var(--text-main)] placeholder-[var(--text-dim)] focus:outline-none focus:border-indigo-500 transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white shadow-md transition-all active:scale-95"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Send Message via Email</span>
              </button>

              {formSent && (
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-emerald-950/40 border border-emerald-800/60 text-xs text-emerald-300">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                  <span>Email client opened with pre-filled message!</span>
                </div>
              )}
            </form>
          </ScrollRevealContainer>
        </div>
      </div>
    </section>
  );
}
