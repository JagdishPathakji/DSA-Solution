import { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

export default function Timer({ initialMinutes = 90, onTimeUp }) {
  const [timeLeft, setTimeLeft] = useState(initialMinutes * 60);

  useEffect(() => {
    if (timeLeft <= 0) {
      if (onTimeUp) onTimeUp();
      return;
    }

    const interval = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft, onTimeUp]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className={`flex items-center gap-2 px-4 py-2 rounded-full font-mono text-lg font-bold border ${timeLeft < 300 ? 'border-red-500/50 bg-red-500/10 text-red-400' : 'glass-panel text-primary'}`}>
      <Clock className="w-5 h-5" />
      {minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
    </div>
  );
}
