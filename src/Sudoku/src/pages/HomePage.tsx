import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Play, HelpCircle, Trophy } from 'lucide-react';
import DifficultySelector from '../components/DifficultySelector';
import NavBar from '../components/NavBar';
import { PointsRedeem } from '../components/PointsRedeem';
import { useGameStore } from '../stores/gameStore';
import { useSettingsStore, Difficulty } from '../stores/settingsStore';
import { useStatsStore } from '../stores/statsStore';
import { usePointsStore } from '../stores/pointsStore';
import { playSound, preloadSounds, playBackgroundMusic } from '../utils/audio';
import { WalletConnect } from '../components/WalletConnect';
import { useWallet } from '@solana/wallet-adapter-react';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { initializeGame } = useGameStore();
  const { difficulty } = useSettingsStore();
  const { incrementGamesStarted, updateLastPlayed } = useStatsStore();
  const { publicKey, connected } = useWallet();
  const { getPoints, pointsPerDifficulty } = usePointsStore();

  const userPoints = publicKey ? getPoints(publicKey.toBase58()) : 0;

  useEffect(() => {
    // Preload sounds when the home page loads
    preloadSounds();

    // Start background music (if enabled)
    playBackgroundMusic();
  }, []);

  const handlePlay = async () => {
    playSound('navigate');

    if (!connected) {
      try {
        // Implement wallet connection logic here
      } catch (error) {
        alert('Please connect your wallet to play the game');
        return;
      }
    }

    // Initialize a new game with the current difficulty
    initializeGame(difficulty);

    // Update statistics
    incrementGamesStarted();
    updateLastPlayed();

    // Navigate to the game page
    navigate('/sudoku/game');
  };

  const handleSelectDifficulty = (newDifficulty: Difficulty) => {
    // The difficulty is updated in the DifficultySelector component
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* {<header className="fixed top-0 left-0 right-0 z-50 p-4 bg-white/80 backdrop-blur-sm border-b">
        <div className="container mx-auto flex justify-end">
          <WalletConnect />
        </div>
      </header>} */}

      <main className="flex-1 max-w-4xl mx-auto py-8 px-4 flex flex-col items-center justify-center">
        <div className="paper-bg rounded-lg shadow-lg p-8 w-full max-w-md text-center">
          <div className="mb-6">
            <h1 className="text-3xl font-bold mb-2 flex justify-center items-center gap-2">
              <span>Sudoku</span>
            </h1>
            <p className="text-ink-800 text-opacity-70">
              A serene Sudoku experience
            </p>
            {connected && (
              <div className="mt-4 flex items-center justify-center gap-2 text-ink-800">
                <Trophy size={20} className="text-yellow-500" />
                <span className="font-medium">Your Points: {userPoints}</span>
              </div>
            )}
          </div>

          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-3">Points per Difficulty:</h2>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="bg-paper-200 p-2 rounded">Easy: {pointsPerDifficulty.easy} pts</div>
              <div className="bg-paper-200 p-2 rounded">Medium: {pointsPerDifficulty.medium} pts</div>
              <div className="bg-paper-200 p-2 rounded">Hard: {pointsPerDifficulty.hard} pts</div>
              <div className="bg-paper-200 p-2 rounded">Expert: {pointsPerDifficulty.expert} pts</div>
            </div>
          </div>

          <DifficultySelector
            onSelectDifficulty={handleSelectDifficulty}
            className="mb-8"
          />

          <div className="flex flex-col gap-4">
            <button
              className={`w-full py-3 text-white rounded-md shadow-md
                         focus:outline-none focus:ring-2 focus:ring-opacity-50 
                         flex items-center justify-center gap-2
                         ${connected
                  ? 'bg-red-600 hover:bg-red-700 focus:ring-red-600'
                  : 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-600'}`}
              onClick={handlePlay}
            >
              <Play size={20} />
              {connected ? 'Play Now' : 'Connect Wallet to Play'}
            </button>

            <Link
              to="/sudoku/how-to-play"
              className="w-full py-3 bg-paper-200 text-ink-800 rounded-md shadow-md
                         hover:bg-paper-300 focus:outline-none focus:ring-2 focus:ring-indigo-700
                         focus:ring-opacity-50 flex items-center justify-center gap-2"
              onClick={() => playSound('navigate')}
            >
              <HelpCircle size={20} />
              How to Play
            </Link>
          </div>
        </div>

        {connected && (
          <div className="mt-8 w-full max-w-md">
            <PointsRedeem />
          </div>
        )}
      </main>

      <footer className="py-4 text-center text-sm text-ink-800 text-opacity-60">
        <p>© 2025 Sudoku</p>
      </footer>
    </div>
  );
};

export default HomePage;