import { useState } from 'react';
import { Calendar, Clock, Target, ChevronDown, ChevronUp, ExternalLink, CheckCircle, Trash2, Flame } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function MockHistoryCard({ mock, index, solvedQuestions = [], onDelete }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const date = new Date(mock.date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  const solvedCount = mock.questions?.filter(q => solvedQuestions.includes(q.id)).length || 0;
  const totalQuestions = mock.questions?.length || 3;
  const isPerfect = solvedCount === totalQuestions && totalQuestions > 0;

  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1, type: "spring" }}
      className={`glass-card p-6 flex flex-col gap-4 relative overflow-hidden group border-white/5 hover:border-primary/30 ${isPerfect ? 'shadow-[0_0_15px_rgba(250,204,21,0.1)]' : ''}`}
    >
      {isPerfect && (
        <div className="absolute top-0 right-0 w-32 h-32 bg-accent-gold/10 rounded-full blur-2xl -z-10 translate-x-1/2 -translate-y-1/2"></div>
      )}

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 z-10">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-4">
            <span className="font-black text-white text-xl flex items-center gap-2">
              {isPerfect && <Flame className="w-5 h-5 text-accent-gold drop-shadow-[0_0_8px_rgba(250,204,21,0.8)]" />}
              Mock #{mock.id?.slice(0, 4) || index + 1}
            </span>
            <span className={`px-3 py-1 rounded-lg text-xs font-black uppercase tracking-widest border ${
              mock.difficulty === 'Random' ? 'text-accent-purple border-accent-purple/20 bg-accent-purple/10' :
              mock.difficulty === 'Easy' ? 'text-accent-green border-accent-green/20 bg-accent-green/10' :
              mock.difficulty === 'Medium' ? 'text-yellow-400 border-yellow-400/20 bg-yellow-400/10' :
              mock.difficulty === 'Hard' ? 'text-rose-400 border-rose-400/20 bg-rose-400/10' :
              'text-primary border-primary/20 bg-primary/10'
            }`}>
              {mock.difficulty || 'Mixed'}
            </span>
          </div>
          
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-text-muted font-bold tracking-wide">
            <span className="flex items-center gap-2"><Calendar className="w-4 h-4 text-primary" /> {date}</span>
            <span className="flex items-center gap-2"><Clock className="w-4 h-4 text-primary" /> {mock.duration} mins</span>
            <span className="flex items-center gap-2"><Target className="w-4 h-4 text-primary" /> {mock.questions?.length || 3} Objectives</span>
          </div>
        </div>

        <div className="flex flex-col gap-3 w-full md:w-auto mt-4 md:mt-0">
          <div className="flex flex-wrap gap-2 justify-end items-center">
            {mock.topics && mock.topics.map(topic => (
              <span key={topic} className="text-[11px] font-black uppercase tracking-wider px-2.5 py-1 bg-dark-bg border border-white/5 rounded-md text-text-muted shadow-inner">
                {topic}
              </span>
            ))}
            {onDelete && (
              <button 
                onClick={onDelete}
                className="ml-2 p-2 text-text-muted hover:text-rose-400 hover:bg-rose-400/10 rounded-xl transition-all duration-300 hover:scale-110 border border-transparent hover:border-rose-400/20"
                title="Delete Session"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>
          
          <div className="flex items-center justify-between md:justify-end gap-5 mt-2">
            <div className={`text-xs font-black uppercase tracking-widest px-3 py-1.5 rounded-xl border transition-colors duration-300 ${
              isPerfect
                ? 'bg-accent-gold/10 text-accent-gold border-accent-gold/30 drop-shadow-[0_0_8px_rgba(250,204,21,0.4)]' 
                : solvedCount > 0 
                  ? 'bg-primary/10 text-primary border-primary/20'
                  : 'bg-dark-bg text-text-muted border-white/5'
            }`}>
              {solvedCount} / {totalQuestions} CLEARED
            </div>
            <button 
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center gap-1.5 text-sm font-bold text-text-muted hover:text-white transition-colors"
            >
              {isExpanded ? 'Collapse' : 'Expand'}
              {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="w-full mt-4 pt-5 border-t border-white/10 overflow-hidden"
          >
            <div className="space-y-3">
              {mock.questions?.map((q, qIndex) => {
                const isSolved = solvedQuestions.includes(q.id);
                return (
                  <div key={q.id} className={`flex items-start justify-between gap-4 p-4 rounded-xl border transition-colors duration-300 ${isSolved ? 'bg-green-500/5 border-green-500/20' : 'bg-dark-bg/50 border-white/5 hover:border-white/20'}`}>
                    <div className="flex gap-4">
                      <div className="mt-1 flex-shrink-0">
                        {isSolved ? (
                          <CheckCircle className="w-5 h-5 text-accent-green drop-shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
                        ) : (
                          <div className="w-5 h-5 rounded-full border-2 border-white/20" />
                        )}
                      </div>
                      <div>
                        <h4 className={`text-sm font-bold ${isSolved ? 'text-text-muted line-through' : 'text-white'}`}>
                          {q.title}
                        </h4>
                        <div className="flex items-center gap-3 mt-2">
                          <span className="text-[11px] font-black uppercase tracking-wider text-text-muted">{q.topic}</span>
                          <span className="w-1 h-1 rounded-full bg-white/20"></span>
                          <span className={`text-[11px] font-black uppercase tracking-wider ${
                            q.difficulty === 'Easy' ? 'text-accent-green' :
                            q.difficulty === 'Medium' ? 'text-yellow-400' :
                            'text-rose-400'
                          }`}>
                            {q.difficulty}
                          </span>
                        </div>
                      </div>
                    </div>
                    <a 
                      href={q.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="p-2.5 bg-dark-surface hover:bg-primary/20 border border-white/5 hover:border-primary/50 rounded-xl text-text-muted hover:text-primary transition-all duration-300 hover:scale-110 flex-shrink-0 shadow-inner"
                      title="Enter Challenge"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
