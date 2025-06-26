import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Settings, BarChart, HelpCircle } from 'lucide-react';
import { playSound } from '../utils/audio';

const NavBar: React.FC = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const handleNavClick = () => {
    playSound('navigate');
  };

  return (
    <nav className="paper-bg border-b border-ink-800 border-opacity-20 py-4 px-6 shadow-sm">
      <div className="max-w-4xl mx-auto flex justify-between items-center">
        <Link 
          to="/" 
          className="text-xl font-bold text-ink-800 flex items-center gap-2"
          onClick={handleNavClick}
        >
          Sudoku
        </Link>
        
        <div className="flex gap-1">
          <Link
            to="/sudoku"
            className={`p-2 rounded-md ${isActive('/') ? 'bg-paper-200' : 'hover:bg-paper-200'}`}
            onClick={handleNavClick}
            aria-label="Home"
          >
            <Home size={20} />
          </Link>
          
          <Link
            to="/sudoku/how-to-play"
            className={`p-2 rounded-md ${isActive('/sudoku/how-to-play') ? 'bg-paper-200' : 'hover:bg-paper-200'}`}
            onClick={handleNavClick}
            aria-label="How to Play"
          >
            <HelpCircle size={20} />
          </Link>
          
          <Link
            to="/sudoku/statistics"
            className={`p-2 rounded-md ${isActive('/statistics') ? 'bg-paper-200' : 'hover:bg-paper-200'}`}
            onClick={handleNavClick}
            aria-label="Statistics"
          >
            <BarChart size={20} />
          </Link>
          
          <Link
            to="/sudoku/settings"
            className={`p-2 rounded-md ${isActive('/settings') ? 'bg-paper-200' : 'hover:bg-paper-200'}`}
            onClick={handleNavClick}
            aria-label="Settings"
          >
            <Settings size={20} />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;