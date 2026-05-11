import { Calendar, Clock, Target } from 'lucide-react';
import { motion } from 'framer-motion';

export default function MockHistoryCard({ mock, index }) {
  const date = new Date(mock.date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="glass-card p-5 flex flex-col md:flex-row md:items-center justify-between gap-4"
    >
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

      <div className="flex flex-wrap gap-2">
        {mock.topics && mock.topics.map(topic => (
          <span key={topic} className="text-xs px-2 py-1 bg-dark-bg border border-dark-border rounded text-text-muted">
            {topic}
          </span>
        ))}
      </div>
    </motion.div>
  );
}
