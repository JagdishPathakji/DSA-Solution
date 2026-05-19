import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, CheckSquare, Square, ExternalLink, Target, Sparkles } from 'lucide-react';
import { questions } from '../data/questions';
import { useLocalStorage } from '../hooks/useLocalStorage';

export default function QuestionBank() {
  const [solvedQuestions, setSolvedQuestions] = useLocalStorage('solvedQuestions', []);
  const [searchQuery, setSearchQuery] = useState('');
  const [topicFilter, setTopicFilter] = useState('All');
  const [diffFilter, setDiffFilter] = useState('All');

  // Derive unique topics
  const topics = useMemo(() => ['All', ...new Set(questions.map(q => q.topic))].sort(), []);

  // Filter questions
  const filteredQuestions = useMemo(() => {
    return questions.filter(q => {
      const matchesSearch = q.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesTopic = topicFilter === 'All' || q.topic === topicFilter;
      const matchesDiff = diffFilter === 'All' || q.difficulty === diffFilter;
      return matchesSearch && matchesTopic && matchesDiff;
    });
  }, [searchQuery, topicFilter, diffFilter]);

  const toggleSolved = (id) => {
    setSolvedQuestions(prev => 
      prev.includes(id) ? prev.filter(qId => qId !== id) : [...prev, id]
    );
  };

  const getDifficultyColor = (diff) => {
    switch (diff) {
      case 'Easy': return 'text-green-400 bg-green-400/10 border-green-400/20 shadow-[0_0_10px_rgba(74,222,128,0.2)]';
      case 'Medium': return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20 shadow-[0_0_10px_rgba(250,204,21,0.2)]';
      case 'Hard': return 'text-rose-400 bg-rose-400/10 border-rose-400/20 shadow-[0_0_10px_rgba(244,63,94,0.2)]';
      default: return 'text-gray-400 bg-gray-400/10 border-gray-400/20';
    }
  };

  const progressPercentage = Math.round((solvedQuestions.length / questions.length) * 100) || 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
      {/* Header & Progress */}
      <div className="mb-12 text-center">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center justify-center p-4 bg-gradient-to-tr from-accent-purple/20 to-accent-pink/20 rounded-full mb-6 border border-white/5 shadow-[0_0_30px_rgba(236,72,153,0.15)]"
        >
          <Sparkles className="w-10 h-10 text-accent-pink drop-shadow-[0_0_10px_rgba(236,72,153,0.8)]" />
        </motion.div>

        <h1 className="text-5xl font-extrabold text-text-main mb-4 tracking-tight drop-shadow-lg">
          Question <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-purple to-accent-pink">Arsenal</span>
        </h1>
        <p className="text-lg text-text-muted mb-10 max-w-2xl mx-auto font-medium">
          Track your overall progression. Dominate these problems to rank up. Solved questions will not appear in your mocks.
        </p>

        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-3xl mx-auto glass-panel p-8 rounded-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent-purple/10 rounded-full blur-3xl -z-10 translate-x-1/2 -translate-y-1/2"></div>
          <div className="flex justify-between items-end mb-4">
            <span className="text-xl font-extrabold text-text-main flex items-center gap-2">
              <Target className="w-6 h-6 text-accent-pink" /> Global Mastery
            </span>
            <span className="text-accent-pink font-black text-xl">{solvedQuestions.length} / {questions.length} Solved</span>
          </div>
          <div className="progress-bar-bg h-4">
            <div 
              className="progress-bar-fill" 
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
          <p className="text-right text-xs font-bold text-text-muted mt-2 tracking-widest">{progressPercentage}% COMPLETION</p>
        </motion.div>
      </div>

      {/* Filters */}
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="glass-panel p-5 mb-8 flex flex-col md:flex-row gap-4 items-center sticky top-20 z-50 border border-white/10"
      >
        <div className="relative flex-1 w-full group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted w-5 h-5 group-focus-within:text-primary transition-colors" />
          <input 
            type="text" 
            placeholder="Search arsenal..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-dark-surface border border-white/5 text-text-main pl-12 pr-4 py-3 rounded-xl focus:outline-none focus:border-primary/50 focus:bg-dark-bg transition-all shadow-inner placeholder:text-text-muted/50"
          />
        </div>
        
        <div className="flex gap-4 w-full md:w-auto">
          <div className="relative w-full md:w-56 group">
            <Filter className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted w-4 h-4 group-focus-within:text-accent-purple transition-colors" />
            <select 
              value={topicFilter}
              onChange={(e) => setTopicFilter(e.target.value)}
              className="w-full bg-dark-surface border border-white/5 text-text-main pl-11 pr-4 py-3 rounded-xl focus:outline-none focus:border-accent-purple/50 focus:bg-dark-bg appearance-none transition-all shadow-inner font-medium cursor-pointer"
            >
              {topics.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>

          <select 
            value={diffFilter}
            onChange={(e) => setDiffFilter(e.target.value)}
            className="w-full md:w-40 bg-dark-surface border border-white/5 text-text-main px-4 py-3 rounded-xl focus:outline-none focus:border-accent-pink/50 focus:bg-dark-bg transition-all shadow-inner font-medium cursor-pointer"
          >
            <option value="All">All Tiers</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </div>
      </motion.div>

      {/* List */}
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="glass-panel overflow-hidden border-white/10"
      >
        <div className="grid grid-cols-[auto_1fr_auto_auto_auto] gap-4 p-5 bg-dark-surface/80 border-b border-white/5 text-text-muted text-xs font-black uppercase tracking-widest hidden md:grid">
          <div className="w-12 text-center">Status</div>
          <div>Directive</div>
          <div className="w-40">Category</div>
          <div className="w-28 text-center">Tier</div>
          <div className="w-28 text-center">Platform</div>
        </div>

        <div className="divide-y divide-white/5 max-h-[800px] overflow-y-auto custom-scrollbar">
          {filteredQuestions.length > 0 ? (
            filteredQuestions.map((q, i) => {
              const isSolved = solvedQuestions.includes(q.id);
              return (
                <div 
                  key={q.id} 
                  className={`p-4 flex flex-col md:grid md:grid-cols-[auto_1fr_auto_auto_auto] gap-4 items-center transition-all duration-300 hover:bg-white/5 ${isSolved ? 'bg-green-500/5 hover:bg-green-500/10' : ''}`}
                >
                  <button 
                    onClick={() => toggleSolved(q.id)}
                    className={`w-12 flex justify-center items-center transition-all duration-300 hover:scale-110 ${isSolved ? 'text-accent-green drop-shadow-[0_0_8px_rgba(16,185,129,0.8)]' : 'text-text-muted hover:text-white'}`}
                  >
                    {isSolved ? <CheckSquare className="w-6 h-6" /> : <Square className="w-6 h-6" />}
                  </button>

                  <div className="flex-1 w-full flex items-center gap-2">
                    <a href={q.link} target="_blank" rel="noopener noreferrer" className={`font-bold hover:text-accent-purple transition-all flex items-center gap-2 ${isSolved ? 'text-text-muted/60 line-through' : 'text-white drop-shadow-sm'}`}>
                      {q.title} <ExternalLink className="w-3.5 h-3.5 opacity-50" />
                    </a>
                  </div>

                  <div className="w-full md:w-40 flex">
                    <span className="px-3 py-1 bg-dark-bg border border-white/10 rounded-lg text-xs font-semibold text-text-muted">
                      {q.topic}
                    </span>
                  </div>

                  <div className="w-full md:w-28 flex md:justify-center">
                    <span className={`px-3 py-1 rounded-lg text-xs font-black tracking-wider uppercase border ${getDifficultyColor(q.difficulty)}`}>
                      {q.difficulty}
                    </span>
                  </div>

                  <div className="w-full md:w-28 flex md:justify-center text-xs text-text-muted font-bold uppercase tracking-wider">
                    {q.platform}
                  </div>
                </div>
              );
            })
          ) : (
            <div className="p-16 text-center">
              <Target className="w-12 h-12 text-text-muted/30 mx-auto mb-4" />
              <p className="text-lg font-bold text-text-muted">No directives found in this sector.</p>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
