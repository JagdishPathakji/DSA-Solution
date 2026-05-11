import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Home from './pages/Home';
import MockSession from './pages/MockSession';
import History from './pages/History';
import QuestionBank from './pages/QuestionBank';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-dark-bg text-text-main font-sans selection:bg-primary/30">
        <Navbar />
        <main className="pt-16 min-h-[calc(100vh-4rem)]">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/session" element={<MockSession />} />
            <Route path="/history" element={<History />} />
            <Route path="/questions" element={<QuestionBank />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;