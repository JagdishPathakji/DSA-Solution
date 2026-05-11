import { useState } from 'react';
import { Calendar, Clock, Target, ChevronDown, ChevronUp, ExternalLink, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function MockHistoryCard({ mock, index, solvedQuestions = [] }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const date = new Date(mock.date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  const solvedCount = mock.questions?.filter(q => solvedQuestions.includes(q.id)).length || 0;
  const totalQuestions = mock.questions?.length || 3;

  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="glass-card p-5 flex flex-col gap-4"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex flex-col gap-2">
        <div className="flex items-center gap-3">
          <span className="font-bold text-text-main text-lg">Mock Session #{mock.id?.slice(0, 4) || index + 1}</span>
          <span className={`px-2 py-0.5 rounded text-xs font-medium border ${
            mock.difficulty === 'Random' ? 'text-purple-400 border-purple-400/20 bg-purple-400/10' :
            mock.difficulty === 'Easy' ? 'text-green-400 border-green-400/20 bg-green-400/10' :
            mock.difficulty === 'Medium' ? 'text-yellow-400 border-yellow-400/20 bg-yellow-400/10' :
            mock.difficulty === 'Hard' ? 'text-red-400 border-red-400/20 bg-red-400/10' :
            'text-primary border-primary/20 bg-primary/10'
          }`}>
            {mock.difficulty || 'Mixed'}
          </span>
        </div>
        
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-text-muted">
          <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> {date}</span>
          <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> {mock.duration} mins</span>
          <span className="flex items-center gap-1.5"><Target className="w-4 h-4" /> {mock.questions?.length || 3} Questions</span>
        </div>
      </div>

      <div className="flex flex-col gap-2 w-full md:w-auto mt-4 md:mt-0">
        <div className="flex flex-wrap gap-2 justify-end">
          {mock.topics && mock.topics.map(topic => (
            <span key={topic} className="text-xs px-2 py-1 bg-dark-bg border border-dark-border rounded text-text-muted">
              {topic}
            </span>
          ))}
        </div>
        
        <div className="flex items-center justify-between md:justify-end gap-4 mt-2">
          <div className={`text-xs font-medium px-2 py-1 rounded-md border ${
            solvedCount === totalQuestions 
              ? 'bg-green-500/10 text-green-400 border-green-500/20' 
              : solvedCount > 0 
                ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'
                : 'bg-dark-bg text-text-muted border-dark-border'
          }`}>
            {solvedCount} / {totalQuestions} Solved
          </div>
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-1 text-sm text-primary hover:text-primary-hover transition-colors"
          >
            {isExpanded ? 'Hide Questions' : 'View Questions'}
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
            className="w-full mt-4 pt-4 border-t border-dark-border overflow-hidden"
          >
            <div className="space-y-3">
              {mock.questions?.map((q, qIndex) => {
                const isSolved = solvedQuestions.includes(q.id);
                return (
                  <div key={q.id} className="flex items-start justify-between gap-4 p-3 rounded-lg bg-dark-bg/50 border border-dark-border/50">
                    <div className="flex gap-3">
                      <div className="mt-0.5">
                        {isSolved ? (
                          <CheckCircle className="w-5 h-5 text-green-400" />
                        ) : (
                          <div className="w-5 h-5 rounded-full border-2 border-dark-border" />
                        )}
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-text-main">
                          Question {qIndex + 1}: {q.title}
                        </h4>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs text-text-muted">{q.topic}</span>
                          <span className="text-xs text-text-muted">•</span>
                          <span className={`text-xs ${
                            q.difficulty === 'Easy' ? 'text-green-400' :
                            q.difficulty === 'Medium' ? 'text-yellow-400' :
                            'text-red-400'
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
                      className="p-2 hover:bg-dark-border rounded-lg text-text-muted hover:text-primary transition-colors flex-shrink-0"
                      title="Solve on platform"
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
