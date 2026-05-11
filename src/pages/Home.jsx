import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Terminal, BrainCircuit, Activity, Target, Zap, CheckSquare, Settings2 } from 'lucide-react';
import StatsCard from '../components/stats/StatsCard';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { questions } from '../data/questions';

export default function Home() {
  const navigate = useNavigate();
  const [history] = useLocalStorage('mockHistory', []);
  const [solvedQuestions, setSolvedQuestions] = useLocalStorage('solvedQuestions', []);

  const [selectedTopics, setSelectedTopics] = useState([]);
  const [customDifficulty, setCustomDifficulty] = useState('Random');

  const topics = useMemo(() => [...new Set(questions.map(q => q.topic))].sort(), []);

  // Calculate stats
  const totalMocks = history.length;
  const totalQuestions = history.reduce((acc, curr) => acc + (curr.questions?.length || 3), 0);
  const totalSolved = solvedQuestions.length;
  
  // Calculate Streak
  let streak = 0;
  if (history.length > 0) {
    const sortedHistory = [...history].sort((a, b) => new Date(b.date) - new Date(a.date));
    streak = 1;
  }

  const startMock = (difficulty, specificTopics = []) => {
    navigate('/session', { state: { difficulty, specificTopics } });
  };

  const handleClearSolved = () => {
    if (window.confirm("Are you sure you want to reset your solved questions progress? This will reset your Total Solved counter to 0.")) {
      setSolvedQuestions([]);
    }
  };

  const toggleTopic = (topic) => {
    setSelectedTopics(prev => {
      if (prev.includes(topic)) return prev.filter(t => t !== topic);
      if (prev.length >= 3) return prev;
      return [...prev, topic];
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center justify-center p-4 bg-primary/10 rounded-full mb-6"
        >
          <Terminal className="w-12 h-12 text-primary" />
        </motion.div>
        
        <motion.h1 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl md:text-6xl font-extrabold text-text-main mb-6 tracking-tight"
        >
          DSA Interview <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-400">Mock Generator</span>
        </motion.h1>
        
        <motion.p 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg md:text-xl text-text-muted max-w-2xl mx-auto mb-10"
        >
          Generate random real interview questions, simulate coding rounds under pressure, and track your progress locally. No backend required.
        </motion.p>

        {/* Action Buttons */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row flex-wrap justify-center gap-4 mb-12"
        >
          <button 
            onClick={() => startMock('Random')}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 bg-primary hover:bg-primary-hover text-white rounded-xl font-bold text-lg transition-all shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] hover:-translate-y-1"
          >
            <Zap className="w-5 h-5" /> Start Random Mock
          </button>
          <button 
            onClick={() => startMock('Easy')}
            className="w-full sm:w-auto px-6 py-4 glass-panel border-green-500/30 text-green-400 hover:bg-green-500/10 hover:border-green-500/50 rounded-xl font-bold transition-all hover:-translate-y-1"
          >
            Easy Mock
          </button>
          <button 
            onClick={() => startMock('Medium')}
            className="w-full sm:w-auto px-6 py-4 glass-panel border-yellow-500/30 text-yellow-400 hover:bg-yellow-500/10 hover:border-yellow-500/50 rounded-xl font-bold transition-all hover:-translate-y-1"
          >
            Medium Mock
          </button>
          <button 
            onClick={() => startMock('Hard')}
            className="w-full sm:w-auto px-6 py-4 glass-panel border-red-500/30 text-red-400 hover:bg-red-500/10 hover:border-red-500/50 rounded-xl font-bold transition-all hover:-translate-y-1"
          >
            Hard Mock
          </button>
        </motion.div>

        {/* Custom Mock Section */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="max-w-4xl mx-auto glass-panel p-6 rounded-2xl border-primary/20 bg-dark-surface/50 text-left"
        >
          <div className="flex items-center gap-3 mb-4 border-b border-dark-border pb-4">
            <Settings2 className="w-6 h-6 text-primary" />
            <h2 className="text-xl font-bold text-text-main">Custom Topic Mock</h2>
            <span className="text-sm text-text-muted ml-auto">Select up to 3 topics</span>
          </div>

          <div className="flex flex-wrap gap-2 mb-6">
            {topics.map(topic => {
              const isSelected = selectedTopics.includes(topic);
              const isDisabled = !isSelected && selectedTopics.length >= 3;
              return (
                <button
                  key={topic}
                  onClick={() => toggleTopic(topic)}
                  disabled={isDisabled}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors border ${
                    isSelected 
                      ? 'bg-primary/20 border-primary text-primary' 
                      : isDisabled 
                        ? 'bg-dark-bg border-dark-border text-gray-600 cursor-not-allowed'
                        : 'bg-dark-bg border-dark-border text-text-muted hover:border-text-muted'
                  }`}
                >
                  {topic}
                </button>
              );
            })}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="text-sm text-text-muted font-medium">Difficulty:</span>
              <select 
                value={customDifficulty}
                onChange={(e) => setCustomDifficulty(e.target.value)}
                className="bg-dark-bg border border-dark-border text-text-main px-3 py-1.5 rounded-lg focus:outline-none focus:border-primary/50 text-sm"
              >
                <option value="Random">Random</option>
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
            </div>
            
            <button 
              onClick={() => startMock(customDifficulty, selectedTopics)}
              disabled={selectedTopics.length === 0}
              className={`w-full sm:w-auto px-6 py-2.5 rounded-lg font-bold transition-all ${
                selectedTopics.length > 0 
                  ? 'bg-primary hover:bg-primary-hover text-white shadow-lg shadow-primary/20 hover:-translate-y-0.5' 
                  : 'bg-dark-border text-gray-500 cursor-not-allowed'
              }`}
            >
              Generate Custom Mock ({selectedTopics.length}/3)
            </button>
          </div>
        </motion.div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <StatsCard 
          title="Total Mocks" 
          value={totalMocks} 
          icon={<BrainCircuit className="w-6 h-6" />} 
          delay={0.5}
        />
        <StatsCard 
          title="Questions Encountered" 
          value={totalQuestions} 
          icon={<Target className="w-6 h-6" />} 
          delay={0.6}
        />
        <StatsCard 
          title="Total Solved" 
          value={totalSolved} 
          icon={<CheckSquare className="w-6 h-6" />} 
          delay={0.7}
        />
        <StatsCard 
          title="Current Streak" 
          value={streak} 
          description="days"
          icon={<Activity className="w-6 h-6" />} 
          delay={0.8}
        />
      </div>

      {totalSolved > 0 && (
        <div className="flex justify-center">
          <button 
            onClick={handleClearSolved}
            className="text-sm text-text-muted hover:text-red-400 transition-colors underline decoration-dotted"
          >
            Reset Solved Questions Progress
          </button>
        </div>
      )}
    </div>
  );
}
