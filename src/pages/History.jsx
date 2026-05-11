import { useState } from 'react';
import { motion } from 'framer-motion';
import { History as HistoryIcon, Trash2 } from 'lucide-react';
import MockHistoryCard from '../components/history/MockHistoryCard';
import { useLocalStorage } from '../hooks/useLocalStorage';

export default function History() {
  const [history, setHistory] = useLocalStorage('mockHistory', []);
  const [solvedQuestions] = useLocalStorage('solvedQuestions', []);

  const clearHistory = () => {
    if (window.confirm("Are you sure you want to clear your mock history? This cannot be undone.")) {
      setHistory([]);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="bg-primary/20 p-3 rounded-xl">
            <HistoryIcon className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-text-main">Mock History</h1>
            <p className="text-text-muted">Review your past interview simulations</p>
          </div>
        </div>
        
        {history.length > 0 && (
          <button 
            onClick={clearHistory}
            className="flex items-center gap-2 px-4 py-2 text-red-400 hover:text-white hover:bg-red-500 rounded-lg transition-colors text-sm font-medium"
          >
            <Trash2 className="w-4 h-4" /> Clear History
          </button>
        )}
      </div>

      {history.length === 0 ? (
        <div className="text-center py-20 glass-panel">
          <HistoryIcon className="w-12 h-12 text-dark-border mx-auto mb-4" />
          <h3 className="text-xl font-bold text-text-main mb-2">No History Yet</h3>
          <p className="text-text-muted">Complete your first mock session to see it here.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {history.map((mock, index) => (
            <MockHistoryCard 
              key={mock.id} 
              mock={mock} 
              index={index} 
              solvedQuestions={solvedQuestions} 
            />
          ))}
        </div>
      )}
    </div>
  );
}
