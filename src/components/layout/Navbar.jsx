import { Link, useLocation } from 'react-router-dom';
import { Terminal, History, Home, ListTodo } from 'lucide-react';

export default function Navbar() {
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/', icon: <Home className="w-4 h-4" /> },
    { name: 'Question Bank', path: '/questions', icon: <ListTodo className="w-4 h-4" /> },
    { name: 'History', path: '/history', icon: <History className="w-4 h-4" /> },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full glass-panel border-x-0 border-t-0 rounded-none bg-dark-surface/90">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-primary/20 rounded-lg">
              <Terminal className="w-6 h-6 text-primary" />
            </div>
            <Link to="/" className="text-lg sm:text-xl font-bold tracking-tight text-text-main hidden min-[380px]:block">
              DSA Mock Gen
            </Link>
          </div>
          
          <div className="flex space-x-1 sm:space-x-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  location.pathname === link.path
                    ? 'bg-primary/20 text-primary'
                    : 'text-text-muted hover:bg-dark-border hover:text-text-main'
                }`}
              >
                {link.icon}
                <span className="hidden sm:inline">{link.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
