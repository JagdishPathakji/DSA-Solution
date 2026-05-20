import { ExternalLink, Tag, CheckSquare, Square } from 'lucide-react';
import { motion } from 'framer-motion';

export default function QuestionCard({ question, index, isSolved, onToggleSolved, onViewDetails }) {
  const getDifficultyColor = (diff) => {
    switch (diff) {
      case 'Easy': return 'text-green-400 bg-green-400/10 border-green-400/30 shadow-[0_0_10px_rgba(74,222,128,0.2)]';
      case 'Medium': return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/30 shadow-[0_0_10px_rgba(250,204,21,0.2)]';
      case 'Hard': return 'text-rose-400 bg-rose-400/10 border-rose-400/30 shadow-[0_0_10px_rgba(244,63,94,0.2)]';
      default: return 'text-gray-400 bg-gray-400/10 border-gray-400/20';
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1, type: "spring" }}
      className={`glass-card p-6 flex flex-col h-full relative overflow-hidden group border-white/10 ${isSolved ? 'bg-green-500/5 border-green-500/20' : ''}`}
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl -z-10 group-hover:bg-primary/10 transition-all duration-500 translate-x-1/2 -translate-y-1/2"></div>
      
      {/* Platform Badge overlay */}
      <div className="absolute top-0 right-0 bg-dark-surface/90 px-4 py-1.5 rounded-bl-xl text-[10px] uppercase tracking-widest text-text-muted font-black border-l border-b border-white/10 group-hover:border-primary/50 group-hover:text-primary transition-all duration-300">
        {question.platform}
      </div>

      <div className="flex-1 z-10">
        <div className="flex items-start justify-between gap-4 mb-4">
          <h3 className={`text-xl font-extrabold pr-16 transition-colors duration-300 ${isSolved ? 'text-text-muted line-through opacity-60' : 'text-white group-hover:text-primary drop-shadow-sm'}`}>
            {question.title}
          </h3>
          
          {onToggleSolved && (
            <button 
              onClick={() => onToggleSolved(question.id)}
              className={`p-2 rounded-xl flex-shrink-0 transition-all duration-300 hover:scale-110 shadow-inner ${isSolved ? 'text-accent-green bg-accent-green/10 drop-shadow-[0_0_10px_rgba(16,185,129,0.5)]' : 'text-text-muted bg-dark-bg border border-white/5 hover:border-primary hover:text-white'}`}
              title={isSolved ? "Mark as Unsolved" : "Mark as Solved"}
            >
              {isSolved ? <CheckSquare className="w-6 h-6" /> : <Square className="w-6 h-6" />}
            </button>
          )}
        </div>
        
        <div className="flex flex-wrap gap-2 mb-5">
          <span className={`px-3 py-1 rounded-lg text-xs font-black uppercase tracking-wider border ${getDifficultyColor(question.difficulty)}`}>
            {question.difficulty}
          </span>
          <span className="px-3 py-1 rounded-lg text-xs font-bold border border-white/10 bg-dark-bg/80 text-text-muted shadow-inner">
            {question.topic}
          </span>
        </div>

        {question.companyTags && question.companyTags.length > 0 && (
          <div className="mb-6 flex flex-wrap gap-2 items-center">
            <Tag className="w-4 h-4 text-accent-purple" />
            {question.companyTags.slice(0, 3).map(tag => (
              <span key={tag} className="text-[11px] font-bold tracking-wider text-text-muted bg-dark-bg border border-white/5 px-2 py-1 rounded-md">
                {tag}
              </span>
            ))}
            {question.companyTags.length > 3 && (
              <span className="text-[11px] font-bold text-accent-purple bg-accent-purple/10 px-2 py-1 rounded-md">+{question.companyTags.length - 3}</span>
            )}
          </div>
        )}
      </div>

      <div className="pt-5 border-t border-white/10 mt-auto z-10 relative">
        {question.description && onViewDetails ? (
          <button 
            onClick={() => onViewDetails(question)}
            className="flex items-center justify-center gap-3 w-full py-3 bg-dark-bg/80 border border-white/10 text-white rounded-xl font-bold transition-all duration-300 group-hover:btn-premium group-hover:border-transparent group-hover:text-white shadow-inner cursor-pointer"
          >
            ENTER CHALLENGE <ExternalLink className="w-4 h-4 opacity-70 group-hover:opacity-100" />
          </button>
        ) : (
          <a 
            href={question.link} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 w-full py-3 bg-dark-bg/80 border border-white/10 text-white rounded-xl font-bold transition-all duration-300 group-hover:btn-premium group-hover:border-transparent group-hover:text-white shadow-inner"
          >
            ENTER CHALLENGE <ExternalLink className="w-4 h-4 opacity-70 group-hover:opacity-100" />
          </a>
        )}
      </div>
    </motion.div>
  );
}
