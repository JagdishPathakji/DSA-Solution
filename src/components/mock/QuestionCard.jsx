import { ExternalLink, Tag, CheckSquare, Square } from 'lucide-react';
import { motion } from 'framer-motion';

export default function QuestionCard({ question, index, isSolved, onToggleSolved }) {
  const getDifficultyColor = (diff) => {
    switch (diff) {
      case 'Easy': return 'text-green-400 bg-green-400/10 border-green-400/20';
      case 'Medium': return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20';
      case 'Hard': return 'text-red-400 bg-red-400/10 border-red-400/20';
      default: return 'text-gray-400 bg-gray-400/10 border-gray-400/20';
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className={`glass-card p-6 flex flex-col h-full relative overflow-hidden group ${isSolved ? 'opacity-75 grayscale-[0.3]' : ''}`}
    >
      {/* Platform Badge overlay */}
      <div className="absolute top-0 right-0 bg-dark-border px-3 py-1 rounded-bl-lg text-xs text-text-muted font-medium border-l border-b border-dark-border group-hover:border-primary/30 transition-colors">
        {question.platform}
      </div>

      <div className="flex-1">
        <div className="flex items-start justify-between gap-4 mb-3">
          <h3 className={`text-xl font-bold pr-16 ${isSolved ? 'text-text-muted line-through' : 'text-text-main'}`}>
            {question.title}
          </h3>
          
          {onToggleSolved && (
            <button 
              onClick={() => onToggleSolved(question.id)}
              className={`p-1.5 rounded-md flex-shrink-0 transition-colors ${isSolved ? 'text-green-400 bg-green-400/10' : 'text-text-muted hover:bg-dark-border hover:text-text-main'}`}
              title={isSolved ? "Mark as Unsolved" : "Mark as Solved"}
            >
              {isSolved ? <CheckSquare className="w-5 h-5" /> : <Square className="w-5 h-5" />}
            </button>
          )}
        </div>
        
        <div className="flex flex-wrap gap-2 mb-4">
          <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${getDifficultyColor(question.difficulty)}`}>
            {question.difficulty}
          </span>
          <span className="px-2.5 py-0.5 rounded-full text-xs font-medium border border-dark-border bg-dark-surface text-text-muted">
            {question.topic}
          </span>
        </div>

        {question.companyTags && question.companyTags.length > 0 && (
          <div className="mb-6 flex flex-wrap gap-2 items-center">
            <Tag className="w-3.5 h-3.5 text-text-muted" />
            {question.companyTags.slice(0, 3).map(tag => (
              <span key={tag} className="text-xs text-text-muted bg-dark-bg px-2 py-0.5 rounded-md">
                {tag}
              </span>
            ))}
            {question.companyTags.length > 3 && (
              <span className="text-xs text-text-muted">+{question.companyTags.length - 3}</span>
            )}
          </div>
        )}
      </div>

      <div className="pt-4 border-t border-dark-border mt-auto">
        <a 
          href={question.link} 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full py-2.5 bg-primary/10 hover:bg-primary hover:text-white text-primary rounded-lg font-medium transition-colors"
        >
          Solve Now <ExternalLink className="w-4 h-4" />
        </a>
      </div>
    </motion.div>
  );
}
