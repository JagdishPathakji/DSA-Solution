import { useState } from 'react';
import { motion } from 'framer-motion';
import { History as HistoryIcon, Trash2, CheckSquare, Sparkles } from 'lucide-react';
import MockHistoryCard from '../components/history/MockHistoryCard';
import { useLocalStorage } from '../hooks/useLocalStorage';

export default function History() {
  const [history, setHistory] = useLocalStorage('mockHistory', []);
  const [solvedQuestions] = useLocalStorage('solvedQuestions', []);

  const clearHistory = () => {
    if (window.confirm("Are you sure you want to clear your combat history? This cannot be undone.")) {
      setHistory([]);
    }
  };

  const deleteMock = (id) => {
    if (window.confirm("Are you sure you want to delete this session record?")) {
      setHistory(prev => prev.filter(mock => mock.id !== id));
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
      
      {/* Background Orbs specific to history */}
      <div className="absolute top-20 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[100px] -z-10 pointer-events-none"></div>

      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col sm:flex-row items-center justify-between mb-12 gap-6"
      >
        <div className="flex items-center gap-5 w-full sm:w-auto">
          <div className="bg-gradient-to-tr from-dark-surface to-dark-border p-4 rounded-2xl shadow-xl border border-white/5 relative group">
            <HistoryIcon className="w-8 h-8 text-white group-hover:rotate-180 transition-transform duration-700" />
            <div className="absolute -top-2 -right-2 bg-primary w-4 h-4 rounded-full animate-ping opacity-75"></div>
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-3xl font-black text-white tracking-tight uppercase drop-shadow-md">Combat History</h1>
              {solvedQuestions.length > 0 && (
                <span className="flex items-center gap-1.5 px-3 py-1 bg-accent-green/10 text-accent-green border border-accent-green/30 shadow-[0_0_10px_rgba(16,185,129,0.2)] rounded-lg text-xs font-black uppercase tracking-widest">
                  <CheckSquare className="w-4 h-4" />
                  {solvedQuestions.length} Objectives Cleared
                </span>
              )}
            </div>
            <p className="text-text-muted mt-2 font-bold tracking-wide">Review your past simulations to analyze performance</p>
          </div>
        </div>
        
        {history.length > 0 && (
          <button 
            onClick={clearHistory}
            className="flex items-center justify-center gap-2 px-5 py-2.5 text-rose-400 border border-rose-500/30 hover:border-rose-400 hover:text-white hover:bg-rose-500/20 hover:shadow-[0_0_15px_rgba(244,63,94,0.4)] rounded-xl transition-all duration-300 text-sm font-black uppercase tracking-widest w-full sm:w-auto"
          >
            <Trash2 className="w-4 h-4" /> Wipe Records
          </button>
        )}
      </motion.div>

      {history.length === 0 ? (
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", bounce: 0.4, delay: 0.2 }}
          className="text-center py-24 glass-panel border-white/5 relative overflow-hidden group"
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary/10 rounded-full blur-[80px] -z-10 group-hover:bg-primary/20 transition-all duration-700"></div>
          
          <div className="relative inline-block mb-6">
            <HistoryIcon className="w-16 h-16 text-text-muted/30 mx-auto" />
            <Sparkles className="w-6 h-6 text-primary absolute -top-2 -right-4 animate-pulse" />
          </div>
          <h3 className="text-2xl font-black text-white mb-3 tracking-wide">No Records Found</h3>
          <p className="text-text-muted font-medium max-w-md mx-auto">
            Your combat history is empty. Enter the arena and complete your first simulation to start building your legacy.
          </p>
        </motion.div>
      ) : (
        <div className="space-y-6">
          {history.map((mock, index) => (
            <MockHistoryCard 
              key={mock.id} 
              mock={mock} 
              index={index} 
              solvedQuestions={solvedQuestions} 
              onDelete={() => deleteMock(mock.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
