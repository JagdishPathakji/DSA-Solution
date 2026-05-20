import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Tag, Copy, Check, CheckSquare, Square, Code2, BookOpen, Sparkles, Terminal, Cpu, FileText } from 'lucide-react';
import { useLocalStorage } from '../../hooks/useLocalStorage';

export default function QuestionDetailModal({ question, onClose, isSolved, onToggleSolved }) {
  const [activeTab, setActiveTab] = useState('problem');
  const [copiedInput, setCopiedInput] = useState(false);
  const [copiedOutput, setCopiedOutput] = useState(false);
  const [scratchpadCode, setScratchpadCode] = useLocalStorage(`scratch_${question?.id}`, '');
  const [scratchpadLang, setScratchpadLang] = useState('javascript');

  useEffect(() => {
    // Reset active tab on question change
    setActiveTab('problem');
  }, [question]);

  if (!question) return null;

  const copyText = (text, type) => {
    navigator.clipboard.writeText(text);
    if (type === 'input') {
      setCopiedInput(true);
      setTimeout(() => setCopiedInput(false), 2000);
    } else {
      setCopiedOutput(true);
      setTimeout(() => setCopiedOutput(false), 2000);
    }
  };

  const getDifficultyColor = (diff) => {
    switch (diff) {
      case 'Easy': return 'text-green-400 bg-green-400/10 border-green-400/30';
      case 'Medium': return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/30';
      case 'Hard': return 'text-rose-400 bg-rose-400/10 border-rose-400/30';
      default: return 'text-gray-400 bg-gray-400/10 border-gray-400/20';
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-end overflow-hidden">
        {/* Backdrop Fade */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-dark-bg/80 backdrop-blur-md cursor-zoom-out"
        />

        {/* Drawer slide-out */}
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 150 }}
          className="relative w-full max-w-5xl h-screen bg-dark-surface/95 border-l border-white/10 shadow-2xl flex flex-col z-10"
        >
          {/* Subtle glow border top/left */}
          <div className="absolute left-0 top-0 w-[1px] h-full bg-gradient-to-b from-primary via-accent-purple to-accent-pink opacity-50"></div>
          
          {/* Header */}
          <div className="p-6 border-b border-white/10 flex items-start justify-between bg-dark-surface/80 relative">
            <div className="flex-1 pr-8">
              <div className="flex flex-wrap gap-2 items-center mb-3">
                <span className={`px-2.5 py-0.5 rounded-md text-xs font-black uppercase tracking-wider border ${getDifficultyColor(question.difficulty)}`}>
                  {question.difficulty}
                </span>
                <span className="px-2.5 py-0.5 rounded-md text-xs font-bold border border-white/5 bg-dark-bg text-text-muted">
                  {question.topic}
                </span>
                <span className="px-2.5 py-0.5 rounded-md text-xs font-bold bg-primary/10 border border-primary/20 text-primary uppercase tracking-widest font-black">
                  {question.platform}
                </span>
              </div>
              
              <h2 className="text-3xl font-black text-white tracking-tight flex items-center gap-3 drop-shadow-md">
                {question.title}
                <Sparkles className="w-5 h-5 text-accent-pink animate-pulse" />
              </h2>

              {question.companyTags && question.companyTags.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2 items-center text-xs">
                  <Tag className="w-3.5 h-3.5 text-accent-purple" />
                  <span className="text-text-muted font-bold">Asked in:</span>
                  {question.companyTags.map(tag => (
                    <span key={tag} className="px-2 py-0.5 font-extrabold rounded bg-white/5 border border-white/5 text-white hover:border-primary/50 transition-colors">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <button 
              onClick={onClose}
              className="p-3 bg-dark-bg hover:bg-rose-500/20 hover:text-rose-400 text-text-muted border border-white/5 rounded-xl transition-all duration-300 hover:scale-105"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Main Body (Grid split: Left = Problem details, Right = Scratchpad) */}
          <div className="flex-1 overflow-hidden grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] h-full">
            
            {/* Left Panel: Content Tabs */}
            <div className="flex flex-col h-full border-r border-white/5 bg-dark-bg/20 overflow-hidden">
              {/* Tabs list */}
              <div className="flex border-b border-white/5 bg-dark-surface/30 p-2 gap-2">
                <button
                  onClick={() => setActiveTab('problem')}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all ${
                    activeTab === 'problem'
                      ? 'bg-primary/20 text-primary border border-primary/30 shadow-[0_0_15px_rgba(59,130,246,0.15)]'
                      : 'text-text-muted hover:text-white border border-transparent'
                  }`}
                >
                  <BookOpen className="w-4 h-4" /> Problem Statement
                </button>
                <button
                  onClick={() => setActiveTab('format')}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all ${
                    activeTab === 'format'
                      ? 'bg-accent-purple/20 text-accent-purple border border-accent-purple/30 shadow-[0_0_15px_rgba(139,92,246,0.15)]'
                      : 'text-text-muted hover:text-white border border-transparent'
                  }`}
                >
                  <Cpu className="w-4 h-4" /> Constraints & Format
                </button>
                <button
                  onClick={() => setActiveTab('samples')}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all ${
                    activeTab === 'samples'
                      ? 'bg-accent-pink/20 text-accent-pink border border-accent-pink/30 shadow-[0_0_15px_rgba(236,72,153,0.15)]'
                      : 'text-text-muted hover:text-white border border-transparent'
                  }`}
                >
                  <FileText className="w-4 h-4" /> Sample Cases
                </button>
              </div>

              {/* Scrollable contents */}
              <div className="flex-1 overflow-y-auto p-6 custom-scrollbar text-text-main font-medium leading-relaxed">
                
                {activeTab === 'problem' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-6"
                  >
                    <div className="bg-dark-surface/40 border border-white/5 rounded-2xl p-6 relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl pointer-events-none"></div>
                      <h4 className="text-lg font-black text-white mb-3 uppercase tracking-wide flex items-center gap-2 border-b border-white/5 pb-2">
                        <Terminal className="w-4.5 h-4.5 text-primary" /> Story Description
                      </h4>
                      <p className="whitespace-pre-line text-[15px] leading-relaxed text-text-main/90 font-medium">
                        {question.description || "No description provided."}
                      </p>
                    </div>

                    {question.link && (
                      <div className="bg-gradient-to-tr from-accent-purple/10 to-primary/10 border border-primary/20 rounded-xl p-4 flex items-center justify-between">
                        <div>
                          <h5 className="font-extrabold text-white text-sm">Want to run your code online?</h5>
                          <p className="text-xs text-text-muted mt-0.5">This problem has a verified interactive playground.</p>
                        </div>
                        <a
                          href={question.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary-hover text-white rounded-lg text-xs font-black uppercase tracking-wider transition-all duration-300 hover:scale-105"
                        >
                          Solve on {question.platform} <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    )}
                  </motion.div>
                )}

                {activeTab === 'format' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-6"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-dark-surface/40 border border-white/5 rounded-2xl p-5">
                        <h4 className="text-sm font-black text-accent-purple mb-3 uppercase tracking-wider border-b border-white/5 pb-2">
                          📥 Input Format
                        </h4>
                        <p className="text-sm whitespace-pre-line text-text-muted">
                          {question.inputFormat || "Standard input format."}
                        </p>
                      </div>

                      <div className="bg-dark-surface/40 border border-white/5 rounded-2xl p-5">
                        <h4 className="text-sm font-black text-accent-purple mb-3 uppercase tracking-wider border-b border-white/5 pb-2">
                          📤 Output Format
                        </h4>
                        <p className="text-sm whitespace-pre-line text-text-muted">
                          {question.outputFormat || "Standard output format."}
                        </p>
                      </div>
                    </div>

                    <div className="bg-dark-surface/40 border border-white/5 rounded-2xl p-5">
                      <h4 className="text-sm font-black text-rose-400 mb-3 uppercase tracking-wider border-b border-white/5 pb-2">
                        ⚙️ Constraints
                      </h4>
                      <p className="text-sm whitespace-pre-line font-mono text-text-muted bg-dark-bg/60 p-4 rounded-xl border border-white/5">
                        {question.constraints || "No specific constraints."}
                      </p>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'samples' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-6"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Sample Input */}
                      <div className="bg-dark-surface/40 border border-white/5 rounded-2xl p-5 flex flex-col">
                        <div className="flex justify-between items-center mb-3 border-b border-white/5 pb-2">
                          <h4 className="text-sm font-black text-accent-pink uppercase tracking-wider">
                            📝 Sample Input
                          </h4>
                          <button
                            onClick={() => copyText(question.sampleInput, 'input')}
                            className="p-1.5 bg-dark-bg border border-white/5 hover:border-accent-pink/30 hover:text-white rounded-lg text-text-muted transition-all"
                            title="Copy Input"
                          >
                            {copiedInput ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                          </button>
                        </div>
                        <pre className="font-mono text-sm text-text-main bg-dark-bg/60 p-4 rounded-xl border border-white/5 overflow-x-auto whitespace-pre-wrap flex-1 shadow-inner">
                          {question.sampleInput || "N/A"}
                        </pre>
                      </div>

                      {/* Sample Output */}
                      <div className="bg-dark-surface/40 border border-white/5 rounded-2xl p-5 flex flex-col">
                        <div className="flex justify-between items-center mb-3 border-b border-white/5 pb-2">
                          <h4 className="text-sm font-black text-accent-pink uppercase tracking-wider">
                            🎯 Sample Output
                          </h4>
                          <button
                            onClick={() => copyText(question.sampleOutput, 'output')}
                            className="p-1.5 bg-dark-bg border border-white/5 hover:border-accent-pink/30 hover:text-white rounded-lg text-text-muted transition-all"
                            title="Copy Output"
                          >
                            {copiedOutput ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                          </button>
                        </div>
                        <pre className="font-mono text-sm text-accent-green bg-dark-bg/60 p-4 rounded-xl border border-white/5 overflow-x-auto whitespace-pre-wrap flex-1 shadow-inner">
                          {question.sampleOutput || "N/A"}
                        </pre>
                      </div>
                    </div>

                    {question.explanation && (
                      <div className="bg-dark-surface/40 border border-white/5 rounded-2xl p-5">
                        <h4 className="text-sm font-black text-white mb-3 uppercase tracking-wider border-b border-white/5 pb-2 flex items-center gap-2">
                          💡 Explanation & Walkthrough
                        </h4>
                        <p className="text-sm whitespace-pre-line text-text-muted">
                          {question.explanation}
                        </p>
                      </div>
                    )}
                  </motion.div>
                )}
              </div>
            </div>

            {/* Right Panel: Interactive Scratchpad */}
            <div className="flex flex-col h-full bg-dark-surface/20">
              <div className="p-4 border-b border-white/5 flex items-center justify-between bg-dark-surface/40">
                <span className="text-sm font-black text-white uppercase tracking-wider flex items-center gap-2">
                  <Code2 className="w-4.5 h-4.5 text-accent-purple" /> Code Scratchpad
                </span>
                
                <div className="flex items-center gap-2">
                  <select
                    value={scratchpadLang}
                    onChange={(e) => setScratchpadLang(e.target.value)}
                    className="bg-dark-bg border border-white/10 text-text-muted px-2 py-1 rounded-lg text-xs font-semibold focus:outline-none"
                  >
                    <option value="javascript">JavaScript</option>
                    <option value="python">Python</option>
                    <option value="cpp">C++</option>
                    <option value="java">Java</option>
                  </select>
                  
                  <button
                    onClick={() => {
                      if (confirm("Are you sure you want to clear your scratchpad?")) {
                        setScratchpadCode('');
                      }
                    }}
                    className="text-[10px] uppercase font-black tracking-wider text-rose-400 bg-rose-500/10 border border-rose-500/20 px-2 py-1 rounded-lg hover:bg-rose-500/20 transition-all"
                  >
                    Clear
                  </button>
                </div>
              </div>

              {/* Textarea code container */}
              <div className="flex-1 relative p-4 flex flex-col bg-dark-bg/60">
                <textarea
                  value={scratchpadCode}
                  onChange={(e) => setScratchpadCode(e.target.value)}
                  placeholder="// Type your pseudocode, algorithm strategy, or full code here...&#10;// Your progress is automatically saved locally!"
                  className="w-full h-full bg-transparent text-white font-mono text-sm resize-none focus:outline-none border-none p-2 placeholder:text-text-muted/30 custom-scrollbar flex-1 leading-relaxed"
                />
              </div>

              <div className="p-3 bg-dark-surface/40 border-t border-white/5 text-[10px] text-text-muted flex justify-between font-bold">
                <span>Auto-saved to LocalStorage</span>
                <span>{scratchpadCode.length} characters</span>
              </div>
            </div>

          </div>

          {/* Footer Actions */}
          <div className="p-5 border-t border-white/10 bg-dark-surface flex items-center justify-between">
            <button
              onClick={() => onToggleSolved(question.id)}
              className={`flex items-center gap-3 px-6 py-3.5 border rounded-xl text-sm font-black uppercase tracking-wider transition-all duration-300 ${
                isSolved
                  ? 'border-accent-green/30 text-accent-green bg-accent-green/10 hover:bg-accent-green/20'
                  : 'border-white/5 hover:border-white/20 text-text-muted hover:text-white bg-dark-bg/50'
              }`}
            >
              {isSolved ? <CheckSquare className="w-5 h-5" /> : <Square className="w-5 h-5" />}
              {isSolved ? "Mark as Unsolved" : "Mark as Solved"}
            </button>

            <div className="flex gap-3">
              {question.link && (
                <a
                  href={question.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3.5 bg-dark-bg hover:bg-white/5 border border-white/10 text-white rounded-xl text-sm font-bold transition-all duration-300"
                >
                  Solve on {question.platform} <ExternalLink className="w-4 h-4 opacity-70" />
                </a>
              )}
              <button
                onClick={onClose}
                className="px-8 py-3.5 btn-premium text-sm uppercase tracking-wider"
              >
                Close directive
              </button>
            </div>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
}
