import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, CheckSquare, Square, ExternalLink, Target } from 'lucide-react';
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
      case 'Easy': return 'text-green-400 bg-green-400/10 border-green-400/20';
      case 'Medium': return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20';
      case 'Hard': return 'text-red-400 bg-red-400/10 border-red-400/20';
      default: return 'text-gray-400 bg-gray-400/10 border-gray-400/20';
    }
  };

  const progressPercentage = Math.round((solvedQuestions.length / questions.length) * 100) || 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header & Progress */}
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-extrabold text-text-main mb-4 tracking-tight">Question <span className="text-primary">Bank</span></h1>
        <p className="text-text-muted mb-8 max-w-2xl mx-auto">
          Track your overall progression. Questions marked as solved here will not appear in your mock interviews.
        </p>

        <div className="max-w-2xl mx-auto bg-dark-surface p-6 rounded-2xl border border-dark-border shadow-xl">
          <div className="flex justify-between items-end mb-2">
            <span className="text-lg font-bold text-text-main flex items-center gap-2">
              <Target className="w-5 h-5 text-primary" /> Overall Progress
            </span>
            <span className="text-primary font-bold">{solvedQuestions.length} / {questions.length} Solved</span>
          </div>
          <div className="h-3 w-full bg-dark-bg rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${progressPercentage}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="h-full bg-primary rounded-full relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-white/20 w-full h-full animate-[shimmer_2s_infinite]"></div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="glass-panel p-4 mb-8 flex flex-col md:flex-row gap-4 items-center sticky top-20 z-10">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted w-5 h-5" />
          <input 
            type="text" 
            placeholder="Search questions..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-dark-bg border border-dark-border text-text-main pl-10 pr-4 py-2.5 rounded-xl focus:outline-none focus:border-primary/50 transition-colors"
          />
        </div>
        
        <div className="flex gap-4 w-full md:w-auto">
          <div className="relative w-full md:w-48">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted w-4 h-4" />
            <select 
              value={topicFilter}
              onChange={(e) => setTopicFilter(e.target.value)}
              className="w-full bg-dark-bg border border-dark-border text-text-main pl-9 pr-4 py-2.5 rounded-xl focus:outline-none focus:border-primary/50 appearance-none"
            >
              {topics.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>

          <select 
            value={diffFilter}
            onChange={(e) => setDiffFilter(e.target.value)}
            className="w-full md:w-36 bg-dark-bg border border-dark-border text-text-main px-4 py-2.5 rounded-xl focus:outline-none focus:border-primary/50"
          >
            <option value="All">All Difficulty</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </div>
      </div>

      {/* List */}
      <div className="bg-dark-surface border border-dark-border rounded-2xl overflow-hidden shadow-xl">
        <div className="grid grid-cols-[auto_1fr_auto_auto_auto] gap-4 p-4 bg-dark-border/30 text-text-muted text-sm font-bold uppercase tracking-wider hidden md:grid">
          <div className="w-10 text-center">Status</div>
          <div>Title</div>
          <div className="w-32">Topic</div>
          <div className="w-24 text-center">Difficulty</div>
          <div className="w-24 text-center">Platform</div>
        </div>

        <div className="divide-y divide-dark-border max-h-[800px] overflow-y-auto">
          {filteredQuestions.length > 0 ? (
            filteredQuestions.map((q, i) => {
              const isSolved = solvedQuestions.includes(q.id);
              return (
                <div 
                  key={q.id} 
                  className={`p-4 flex flex-col md:grid md:grid-cols-[auto_1fr_auto_auto_auto] gap-4 items-center transition-colors hover:bg-dark-border/20 ${isSolved ? 'bg-green-500/5' : ''}`}
                >
                  <button 
                    onClick={() => toggleSolved(q.id)}
                    className={`w-10 flex justify-center items-center transition-colors ${isSolved ? 'text-green-500' : 'text-text-muted hover:text-text-main'}`}
                  >
                    {isSolved ? <CheckSquare className="w-6 h-6" /> : <Square className="w-6 h-6" />}
                  </button>

                  <div className="flex-1 w-full flex items-center gap-2">
                    <a href={q.link} target="_blank" rel="noopener noreferrer" className={`font-semibold hover:text-primary transition-colors flex items-center gap-2 ${isSolved ? 'text-text-muted line-through' : 'text-text-main'}`}>
                      {q.title} <ExternalLink className="w-3 h-3 text-text-muted" />
                    </a>
                  </div>

                  <div className="w-full md:w-32 flex">
                    <span className="px-2 py-1 bg-dark-bg border border-dark-border rounded-md text-xs text-text-muted">
                      {q.topic}
                    </span>
                  </div>

                  <div className="w-full md:w-24 flex md:justify-center">
                    <span className={`px-2 py-1 rounded-md text-xs font-bold border ${getDifficultyColor(q.difficulty)}`}>
                      {q.difficulty}
                    </span>
                  </div>

                  <div className="w-full md:w-24 flex md:justify-center text-xs text-text-muted font-medium">
                    {q.platform}
                  </div>
                </div>
              );
            })
          ) : (
            <div className="p-12 text-center text-text-muted">
              No questions found matching your filters.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
