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
  
  const isLowTime = timeLeft < 300; // Less than 5 minutes

  return (
    <div className={`flex items-center gap-3 px-5 py-2.5 rounded-xl font-mono text-xl font-bold tracking-widest border shadow-lg transition-all duration-300 ${isLowTime ? 'border-rose-500/80 bg-rose-500/20 text-rose-400 drop-shadow-[0_0_15px_rgba(244,63,94,0.5)] animate-pulse' : 'bg-dark-surface/80 border-primary/50 text-primary drop-shadow-[0_0_10px_rgba(59,130,246,0.3)]'}`}>
      <Clock className={`w-5 h-5 ${isLowTime ? 'animate-spin-slow' : ''}`} />
      {minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
    </div>
  );
}
