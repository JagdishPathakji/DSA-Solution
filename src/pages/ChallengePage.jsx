import { useParams, useNavigate } from 'react-router-dom';
import { questions } from '../data/questions';
import { useLocalStorage } from '../hooks/useLocalStorage';
import QuestionDetailModal from '../components/mock/QuestionDetailModal';

export default function ChallengePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [solvedQuestions, setSolvedQuestions] = useLocalStorage('solvedQuestions', []);

  const question = questions.find(q => q.id === id);

  const toggleSolved = (qid) => {
    setSolvedQuestions(prev =>
      prev.includes(qid) ? prev.filter(x => x !== qid) : [...prev, qid]
    );
  };

  const handleClose = () => {
    // If opened as a new tab, close it. Otherwise go back.
    if (window.history.length <= 1 || window.opener) {
      window.close();
    } else {
      navigate(-1);
    }
  };

  if (!question) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-dark-bg text-white">
        <p className="text-2xl font-black mb-4">Question not found.</p>
        <button
          onClick={handleClose}
          className="px-6 py-2 bg-primary/20 border border-primary/30 text-primary rounded-xl font-bold"
        >
          Close
        </button>
      </div>
    );
  }

  return (
    <QuestionDetailModal
      question={question}
      onClose={handleClose}
      isSolved={solvedQuestions.includes(question.id)}
      onToggleSolved={toggleSolved}
    />
  );
}
