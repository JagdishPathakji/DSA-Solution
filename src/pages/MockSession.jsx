import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, AlertCircle, Sparkles, Target, Trophy } from 'lucide-react';
import Timer from '../components/mock/Timer';
import QuestionCard from '../components/mock/QuestionCard';
import { generateMock } from '../utils/mockGenerator';
import { useLocalStorage } from '../hooks/useLocalStorage';

export default function MockSession() {
  const location = useLocation();
  const navigate = useNavigate();
  const [history, setHistory] = useLocalStorage('mockHistory', []);
  const [solvedQuestions, setSolvedQuestions] = useLocalStorage('solvedQuestions', []);
  
  const difficulty = location.state?.difficulty || 'Random';
  const specificTopics = location.state?.specificTopics || [];
  const qPerTopic = location.state?.qPerTopic || 1;
  
  const [questions, setQuestions] = useState([]);
  const [isCompleted, setIsCompleted] = useState(false);
  const [sessionSaved, setSessionSaved] = useState(false);

  useEffect(() => {
    // Collect all previously seen questions to try and generate unseen ones
    const seenIds = history.flatMap(mock => mock.questions.map(q => q.id));
    const generated = generateMock(difficulty, specificTopics, seenIds, solvedQuestions, qPerTopic);
    setQuestions(generated);
  }, []);

  const handleTimeUp = () => {
    setIsCompleted(true);
    saveSession(90); // default duration
  };

  const handleEndMockEarly = () => {
    setIsCompleted(true);
    saveSession(45); // just a placeholder duration for early end
  };

  const saveSession = (duration) => {
    if (sessionSaved) return;

    const newMock = {
      id: Math.random().toString(36).substring(7),
      date: new Date().toISOString(),
      difficulty,
      duration,
      questions,
      topics: [...new Set(questions.map(q => q.topic))]
    };

    setHistory(prev => [newMock, ...prev]);
    setSessionSaved(true);
  };

  const toggleSolved = (id) => {
    setSolvedQuestions(prev => 
      prev.includes(id) ? prev.filter(qId => qId !== id) : [...prev, id]
    );
  };

  if (questions.length === 0) return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center relative z-10">
      <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
      <p className="text-xl font-bold tracking-widest text-text-muted animate-pulse uppercase">Generating Arena...</p>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
      
      {/* Session Header */}
      <motion.div 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4 glass-panel p-6 sticky top-20 z-50 border-white/10"
      >
        <div className="flex items-center gap-5">
          <div className="bg-gradient-to-br from-primary to-accent-purple p-4 rounded-2xl shadow-lg shadow-primary/20">
            <Target className="w-8 h-8 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-black text-text-main tracking-tight uppercase flex items-center gap-2">
              Combat Arena <Sparkles className="w-5 h-5 text-accent-pink" />
            </h2>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-sm font-bold text-text-muted uppercase tracking-wider">Tier:</span>
              <span className={`px-2 py-0.5 rounded text-xs font-black uppercase tracking-widest ${
                difficulty === 'Hard' ? 'text-rose-400 bg-rose-500/20' :
                difficulty === 'Medium' ? 'text-yellow-400 bg-yellow-500/20' :
                difficulty === 'Easy' ? 'text-green-400 bg-green-500/20' :
                'text-primary bg-primary/20'
              }`}>
                {difficulty}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between md:justify-end w-full md:w-auto gap-4 sm:gap-6 mt-4 md:mt-0">
          {!isCompleted ? (
            <>
              <Timer initialMinutes={90} onTimeUp={handleTimeUp} />
              <button 
                onClick={handleEndMockEarly}
                className="px-6 py-3 bg-dark-bg border border-rose-500/50 hover:bg-rose-500/20 text-rose-400 rounded-xl text-sm font-black uppercase tracking-wider transition-all duration-300 hover:shadow-[0_0_15px_rgba(244,63,94,0.4)] hover:scale-105 whitespace-nowrap"
              >
                Abort Mock
              </button>
            </>
          ) : (
            <div className="flex items-center gap-3 text-accent-green bg-accent-green/10 px-6 py-3 rounded-xl font-black uppercase tracking-widest border border-accent-green/30 shadow-[0_0_15px_rgba(16,185,129,0.3)]">
              <CheckCircle className="w-6 h-6" />
              Arena Conquered
            </div>
          )}
        </div>
      </motion.div>

      {isCompleted && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", bounce: 0.5 }}
          className="mb-12 p-10 glass-panel border border-accent-gold/50 rounded-2xl text-center relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent-gold/10 rounded-full blur-3xl -z-10 translate-x-1/2 -translate-y-1/2"></div>
          
          <Trophy className="w-20 h-20 text-accent-gold mx-auto mb-6 drop-shadow-[0_0_15px_rgba(250,204,21,0.6)]" />
          <h3 className="text-4xl font-black text-white mb-3 drop-shadow-md">Simulation Complete!</h3>
          <p className="text-lg font-bold text-text-muted mb-8 max-w-lg mx-auto">
            Your performance has been permanently etched into your history. Keep training to rank up.
          </p>
          <button 
            onClick={() => navigate('/')}
            className="btn-premium px-10 py-4 text-lg"
          >
            Return to Dashboard
          </button>
        </motion.div>
      )}

      {/* Questions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {questions.map((q, i) => (
          <QuestionCard 
            key={q.id} 
            question={q} 
            index={i} 
            isSolved={solvedQuestions.includes(q.id)}
            onToggleSolved={toggleSolved}
          />
        ))}
      </div>
    </div>
  );
}

