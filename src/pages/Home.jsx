import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Terminal, BrainCircuit, Activity, Target, Zap, CheckSquare, Settings2, Trophy, Star, Crown, Flame } from 'lucide-react';
import StatsCard from '../components/stats/StatsCard';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { questions } from '../data/questions';

const RANK_THRESHOLDS = [
  { limit: 20, name: 'Novice', colorClass: 'rank-novice', icon: Star },
  { limit: 50, name: 'Apprentice', colorClass: 'rank-apprentice', icon: Target },
  { limit: 150, name: 'Adept', colorClass: 'rank-adept', icon: Zap },
  { limit: 300, name: 'Expert', colorClass: 'rank-expert', icon: Flame },
  { limit: 500, name: 'Master', colorClass: 'rank-master', icon: Crown },
  { limit: 1000, name: 'Grandmaster', colorClass: 'text-rose-500 drop-shadow-[0_0_20px_rgba(244,63,94,0.8)]', icon: Trophy },
];

export default function Home() {
  const navigate = useNavigate();
  const [history] = useLocalStorage('mockHistory', []);
  const [solvedQuestions, setSolvedQuestions] = useLocalStorage('solvedQuestions', []);

  const [selectedTopics, setSelectedTopics] = useState([]);
  const [customDifficulty, setCustomDifficulty] = useState('Random');
  const [questionsPerTopic, setQuestionsPerTopic] = useState(1);

  const topics = useMemo(() => [...new Set(questions.map(q => q.topic))].sort(), []);

  // Calculate stats
  const totalMocks = history.length;
  const totalQuestions = history.reduce((acc, curr) => acc + (curr.questions?.length || 3), 0);
  const totalSolved = solvedQuestions.length;

  // Rank Calculation
  const currentRankIndex = RANK_THRESHOLDS.findIndex(r => totalSolved < r.limit) === -1
    ? RANK_THRESHOLDS.length - 1
    : RANK_THRESHOLDS.findIndex(r => totalSolved < r.limit);

  const currentRank = RANK_THRESHOLDS[currentRankIndex];
  const previousLimit = currentRankIndex === 0 ? 0 : RANK_THRESHOLDS[currentRankIndex - 1].limit;
  const nextLimit = currentRank.limit;
  const progressPercent = currentRankIndex === RANK_THRESHOLDS.length - 1
    ? 100
    : Math.max(0, Math.min(100, ((totalSolved - previousLimit) / (nextLimit - previousLimit)) * 100));

  const RankIcon = currentRank.icon;

  // Calculate Streak
  let streak = 0;
  if (history.length > 0) {
    const sortedHistory = [...history].sort((a, b) => new Date(b.date) - new Date(a.date));
    streak = 1; // Simplified streak calculation for visual
  }

  const startMock = (difficulty, specificTopics = [], qPerTopic = 1) => {
    navigate('/session', { state: { difficulty, specificTopics, qPerTopic } });
  };


  const toggleTopic = (topic) => {
    setSelectedTopics(prev => {
      if (prev.includes(topic)) return prev.filter(t => t !== topic);
      if (prev.length >= 3) return prev;
      return [...prev, topic];
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">

      {/* Gamification Bar - Rank Progress */}
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, type: "spring", bounce: 0.4 }}
        className="glass-panel p-6 mb-12 flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden relative"
      >
        <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-primary to-accent-pink"></div>

        <div className="flex items-center gap-4">
          <div className={`p-4 rounded-2xl bg-dark-bg/80 border border-white/10 shadow-lg ${currentRank.colorClass} flex-shrink-0`}>
            <RankIcon className="w-8 h-8" />
          </div>
          <div>
            <p className="text-sm text-text-muted font-medium mb-1">Current Rank</p>
            <h2 className={`text-2xl font-black uppercase tracking-widest ${currentRank.colorClass}`}>
              {currentRank.name}
            </h2>
          </div>
        </div>

        <div className="flex-1 w-full md:px-8">
          <div className="flex justify-between text-sm font-bold mb-2">
            <span className="text-text-main">{totalSolved} Solved</span>
            <span className="text-text-muted">{currentRankIndex === RANK_THRESHOLDS.length - 1 ? 'MAX RANK' : `${nextLimit} Required`}</span>
          </div>
          <div className="progress-bar-bg">
            <div
              className="progress-bar-fill"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
          {currentRankIndex !== RANK_THRESHOLDS.length - 1 && (
            <p className="text-xs text-text-muted text-center mt-2 italic">
              Solve {nextLimit - totalSolved} more questions to rank up!
            </p>
          )}
        </div>
      </motion.div>

      {/* Hero Section */}
      <div className="text-center mb-16">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center justify-center p-5 bg-gradient-to-tr from-primary/20 to-accent-purple/20 rounded-full mb-6 border border-white/5 shadow-[0_0_30px_rgba(139,92,246,0.2)]"
        >
          <Terminal className="w-12 h-12 text-primary drop-shadow-[0_0_10px_rgba(59,130,246,0.8)]" />
        </motion.div>

        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-5xl md:text-7xl font-extrabold text-text-main mb-6 tracking-tight drop-shadow-xl"
        >
          Master DSA with <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent-purple to-accent-pink animate-gradientFlow bg-[length:200%_auto]">
            Infinite Mock Interviews
          </span>
        </motion.h1>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg md:text-xl text-text-muted max-w-2xl mx-auto mb-10 font-medium"
        >
          Stop memorizing. Start simulating. Enter the arena, conquer randomly generated interview rounds under pressure, and rise through the ranks.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row flex-wrap justify-center gap-4 mb-16"
        >
          <button
            onClick={() => startMock('Random')}
            className="w-full sm:w-auto flex items-center justify-center gap-3 px-10 py-4 btn-premium text-lg"
          >
            <Zap className="w-6 h-6 fill-white/20" /> Start Random Mock
          </button>
          <button
            onClick={() => startMock('Easy')}
            className="w-full sm:w-auto px-8 py-4 glass-panel border-green-500/40 text-green-400 hover:bg-green-500/20 hover:border-green-400 hover:shadow-[0_0_20px_rgba(74,222,128,0.3)] rounded-xl font-bold transition-all hover:-translate-y-1"
          >
            Easy Mock
          </button>
          <button
            onClick={() => startMock('Medium')}
            className="w-full sm:w-auto px-8 py-4 glass-panel border-yellow-500/40 text-yellow-400 hover:bg-yellow-500/20 hover:border-yellow-400 hover:shadow-[0_0_20px_rgba(250,204,21,0.3)] rounded-xl font-bold transition-all hover:-translate-y-1"
          >
            Medium Mock
          </button>
          <button
            onClick={() => startMock('Hard')}
            className="w-full sm:w-auto px-8 py-4 glass-panel border-rose-500/40 text-rose-400 hover:bg-rose-500/20 hover:border-rose-400 hover:shadow-[0_0_20px_rgba(244,63,94,0.3)] rounded-xl font-bold transition-all hover:-translate-y-1"
          >
            Hard Mock
          </button>
        </motion.div>

        {/* Custom Mock Section */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="max-w-4xl mx-auto glass-panel p-8 rounded-2xl relative overflow-hidden text-left border-white/10"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -z-10 translate-x-1/2 -translate-y-1/2"></div>

          <div className="flex items-center gap-3 mb-6 border-b border-white/5 pb-4">
            <div className="p-2 bg-dark-bg/50 rounded-lg border border-white/5">
              <Settings2 className="w-6 h-6 text-primary" />
            </div>
            <h2 className="text-2xl font-extrabold text-text-main">Custom Topic Arena</h2>
            <span className="text-sm font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full ml-auto border border-primary/20">
              Select up to 3 topics
            </span>
          </div>

          <div className="flex flex-wrap gap-2 mb-8">
            {topics.map(topic => {
              const isSelected = selectedTopics.includes(topic);
              const isDisabled = !isSelected && selectedTopics.length >= 3;
              return (
                <button
                  key={topic}
                  onClick={() => toggleTopic(topic)}
                  disabled={isDisabled}
                  className={`px-4 py-2 rounded-xl text-sm font-bold transition-all duration-300 border ${isSelected
                    ? 'bg-primary/20 border-primary text-primary shadow-[0_0_15px_rgba(59,130,246,0.3)] scale-105'
                    : isDisabled
                      ? 'bg-dark-bg border-dark-border/50 text-gray-700 cursor-not-allowed'
                      : 'bg-dark-bg/80 border-white/5 text-text-muted hover:border-white/20 hover:text-white'
                    }`}
                >
                  {topic}
                </button>
              );
            })}
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-6 bg-dark-bg/40 p-4 rounded-xl border border-white/5">
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <span className="text-sm font-bold text-text-muted">DIFFICULTY</span>
                <select
                  value={customDifficulty}
                  onChange={(e) => setCustomDifficulty(e.target.value)}
                  className="bg-dark-surface border border-white/10 text-white px-3 py-2 rounded-lg focus:outline-none focus:border-primary/50 text-sm font-semibold cursor-pointer"
                >
                  <option value="Random">🎲 Random</option>
                  <option value="Easy">🟢 Easy</option>
                  <option value="Medium">🟡 Medium</option>
                  <option value="Hard">🔴 Hard</option>
                </select>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <span className="text-sm font-bold text-text-muted whitespace-nowrap">Q'S PER TOPIC</span>
                <select
                  value={questionsPerTopic}
                  onChange={(e) => setQuestionsPerTopic(Number(e.target.value))}
                  className="bg-dark-surface border border-white/10 text-white px-3 py-2 rounded-lg focus:outline-none focus:border-primary/50 text-sm font-semibold cursor-pointer"
                >
                  {[1, 2, 3, 4, 5].map(num => (
                    <option key={num} value={num}>{num}</option>
                  ))}
                </select>
              </div>
            </div>

            <button
              onClick={() => startMock(customDifficulty, selectedTopics, questionsPerTopic)}
              disabled={selectedTopics.length === 0}
              className={`w-full md:w-auto px-8 py-3 rounded-xl font-bold transition-all duration-300 ${selectedTopics.length > 0
                ? 'btn-premium'
                : 'bg-dark-border text-gray-600 cursor-not-allowed opacity-50'
                }`}
            >
              Enter Arena ({selectedTopics.length}/3)
            </button>
          </div>
        </motion.div>
      </div>

      {/* Glowing Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <StatsCard
          title="Total Mocks"
          value={totalMocks}
          icon={<BrainCircuit className="w-6 h-6 text-primary" />}
          delay={0.5}
        />
        <StatsCard
          title="Questions Faced"
          value={totalQuestions}
          icon={<Target className="w-6 h-6 text-accent-pink" />}
          delay={0.6}
        />
        <StatsCard
          title="Total Solved"
          value={totalSolved}
          icon={<CheckSquare className="w-6 h-6 text-accent-green" />}
          delay={0.7}
        />
        <StatsCard
          title="Current Streak"
          value={streak}
          description="days"
          icon={<Flame className="w-6 h-6 text-accent-gold" />}
          delay={0.8}
        />
      </div>

    </div>
  );
}
