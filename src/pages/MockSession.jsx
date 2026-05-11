import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, AlertCircle } from 'lucide-react';
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
  
  const [questions, setQuestions] = useState([]);
  const [isCompleted, setIsCompleted] = useState(false);
  const [sessionSaved, setSessionSaved] = useState(false);

  useEffect(() => {
    // Collect all previously seen questions to try and generate unseen ones
    const seenIds = history.flatMap(mock => mock.questions.map(q => q.id));
    const generated = generateMock(difficulty, specificTopics, seenIds, solvedQuestions);
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

  if (questions.length === 0) return <div className="p-12 text-center text-text-muted">Generating session...</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Session Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4 bg-dark-surface/50 p-4 rounded-2xl border border-dark-border">
        <div className="flex items-center gap-4">
          <div className="bg-primary/20 p-3 rounded-xl">
            <AlertCircle className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-text-main">Interview Round Simulation</h2>
            <p className="text-sm text-text-muted">Difficulty: {difficulty}</p>
          </div>
        </div>

        <div className="flex items-center justify-between md:justify-end w-full md:w-auto gap-4 sm:gap-6 mt-4 md:mt-0">
          {!isCompleted ? (
            <>
              <Timer initialMinutes={90} onTimeUp={handleTimeUp} />
              <button 
                onClick={handleEndMockEarly}
                className="px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 rounded-lg text-sm font-medium transition-colors whitespace-nowrap"
              >
                End Mock
              </button>
            </>
          ) : (
            <div className="flex items-center gap-2 text-green-400 bg-green-400/10 px-4 py-2 rounded-lg font-bold">
              <CheckCircle className="w-5 h-5" />
              Completed
            </div>
          )}
        </div>
      </div>

      {isCompleted && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 p-6 bg-primary/10 border border-primary/20 rounded-xl text-center"
        >
          <h3 className="text-2xl font-bold text-text-main mb-2">Session Saved!</h3>
          <p className="text-text-muted mb-4">Your progress has been recorded in history.</p>
          <button 
            onClick={() => navigate('/')}
            className="px-6 py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary-hover transition-colors"
          >
            Return Home
          </button>
        </motion.div>
      )}

      {/* Questions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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

