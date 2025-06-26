import React, { useState, useEffect } from 'react';
import { Game } from './Game';
import { Trophy, Medal, AlertCircle } from 'lucide-react';
import { useGameReward } from '../hooks/useGameReward';

interface HomeProps {
  onStartGame: () => void;
  shouldReloadData: boolean;
}

interface GameData {
  id: string;
  score: number;
  timestamp: number;
  jumps: any[];
}

interface GameHistory {
  games: GameData[];
  redeemedPoints: number;
}

export function Home({ onStartGame, shouldReloadData }: HomeProps) {
  const [isConnected, setIsConnected] = useState(false);
  const [account, setAccount] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [totalPoints, setTotalPoints] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [gamesPlayed, setGamesPlayed] = useState(0);
  const [recentGames, setRecentGames] = useState<GameData[]>([]);
  const [showErrorPopup, setShowErrorPopup] = useState(false);

  const { exchangeRate, isLoading: isRedeeming, error: redeemError, redeemPoints } = useGameReward();

  const loadGameData = () => {
    try {
      if (!account) return;
      
      const gameData = localStorage.getItem('flappyFuse_gameData');
      if (gameData) {
        const history: Record<string, GameHistory> = JSON.parse(gameData);
        const userGames = history[account]?.games || [];
        const redeemedPoints = history[account]?.redeemedPoints || 0;
        
        // Calculate total points
        const total = userGames.reduce((sum, game) => sum + game.score, 0);
        setTotalPoints(total - redeemedPoints);

        // Find high score
        const highest = Math.max(...userGames.map(game => game.score), 0);
        setHighScore(highest);

        // Set games played
        setGamesPlayed(userGames.length);

        // Get recent games (last 5)
        const recent = [...userGames]
          .sort((a, b) => b.timestamp - a.timestamp)
          .slice(0, 5);
        setRecentGames(recent);
      }
    } catch (err) {
      console.error('Error loading game data:', err);
    }
  };

  // Add effect to reload data when shouldReloadData changes
  useEffect(() => {
    if (shouldReloadData && isConnected) {
      loadGameData();
    }
  }, [shouldReloadData, isConnected]);

  const connectWallet = async () => {
    try {
      if (!window.ethereum) {
        setError('Please install MetaMask to play this game');
        return;
      }

      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      if (accounts.length > 0) {
        setAccount(accounts[0]);
        setIsConnected(true);
        setError(null);
        loadGameData(); // Load game data after connecting
      }
    } catch (err) {
      setError('Failed to connect to MetaMask');
      console.error('Error connecting to MetaMask:', err);
    }
  };

  useEffect(() => {
    // Check if already connected
    if (window.ethereum) {
      window.ethereum.request({ method: 'eth_accounts' })
        .then((accounts: string[]) => {
          if (accounts.length > 0) {
            setAccount(accounts[0]);
            setIsConnected(true);
            loadGameData(); // Load game data if already connected
          }
        })
        .catch(console.error);

      // Listen for account changes
      window.ethereum.on('accountsChanged', (accounts: string[]) => {
        if (accounts.length > 0) {
          setAccount(accounts[0]);
          setIsConnected(true);
          loadGameData(); // Reload game data on account change
        } else {
          setAccount(null);
          setIsConnected(false);
        }
      });
    }

    return () => {
      if (window.ethereum) {
        window.ethereum.removeAllListeners('accountsChanged');
      }
    };
  }, []);

  const handleRedeem = async () => {
    if (totalPoints <= 0) {
      setError('No points available to redeem');
      setShowErrorPopup(true);
      return;
    }
    try {
      // Wait for the redemption transaction to be confirmed
      const success = await redeemPoints(totalPoints);
      
      // Only update local storage and refresh data after transaction is confirmed
      if (success) {
        // Update redemption history in local storage
        const gameData = localStorage.getItem('flappyFuse_gameData');
        if (gameData && account) {
          const history: Record<string, GameHistory> = JSON.parse(gameData);
          if (!history[account]) {
            history[account] = { games: [], redeemedPoints: 0 };
          }
          history[account].redeemedPoints = (history[account].redeemedPoints || 0) + totalPoints;
          localStorage.setItem('flappyFuse_gameData', JSON.stringify(history));
          
          // Immediately update the total points display
          const userGames = history[account]?.games || [];
          const total = userGames.reduce((sum, game) => sum + game.score, 0);
          setTotalPoints(total - history[account].redeemedPoints);
        }
      }
    } catch (err) {
      console.error('Error redeeming points:', err);
      setError('Failed to redeem points');
      setShowErrorPopup(true);
    }
  };

  // Auto-hide error popup after 3 seconds
  useEffect(() => {
    if (showErrorPopup) {
      const timer = setTimeout(() => {
        setShowErrorPopup(false);
        setError(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showErrorPopup]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-500 to-purple-600 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full">
        <h1 className="text-3xl font-bold text-center mb-6">Flappy Bird</h1>
        
        {!isConnected ? (
          <div className="text-center">
            <p className="text-gray-600 mb-4">
              Connect your MetaMask wallet to start playing
            </p>
            <button
              onClick={connectWallet}
              className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition-colors"
            >
              Connect MetaMask
            </button>
            {error && (
              <p className="text-red-500 mt-4">{error}</p>
            )}
          </div>
        ) : (
          <div className="text-center">
            <p className="text-gray-600 mb-4">
              Connected: {account?.slice(0, 6)}...{account?.slice(-4)}
            </p>
            
            {/* Stats Section */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="bg-blue-50 p-3 rounded-lg">
                <p className="text-sm text-gray-600">Total Points</p>
                <p className="text-xl font-bold text-blue-600">{totalPoints}</p>
              </div>
              <div className="bg-green-50 p-3 rounded-lg">
                <p className="text-sm text-gray-600">High Score</p>
                <p className="text-xl font-bold text-green-600">{highScore}</p>
              </div>
              <div className="bg-purple-50 p-3 rounded-lg">
                <p className="text-sm text-gray-600">Games Played</p>
                <p className="text-xl font-bold text-purple-600">{gamesPlayed}</p>
              </div>
            </div>

            {/* Points Redemption Section */}
            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-semibold text-black mb-2">Redeem Points</h3>
              <div className="flex justify-center">
                <button
                  onClick={handleRedeem}
                  disabled={isRedeeming || totalPoints <= 0}
                  className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 w-full"
                >
                  {isRedeeming ? 'Redeeming...' : `Redeem ${totalPoints} Points`}
                </button>
              </div>
              {redeemError && (
                <p className="text-red-500 mt-2 text-sm">{redeemError}</p>
              )}
            </div>

            <button
              onClick={onStartGame}
              className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors w-full"
            >
              Start New Game
            </button>
          </div>
        )}

        <div className="mt-8 text-center text-gray-500">
          <h2 className="text-xl font-semibold mb-2">How to Play</h2>
          <ul className="text-left list-disc list-inside space-y-2">
            <li>Connect your MetaMask wallet</li>
            <li>Click or press Space to make the bird jump</li>
            <li>Avoid hitting the pipes and the ground</li>
            <li>Each pipe you pass gives you 1 point</li>
            <li>Try to get the highest score!</li>
          </ul>
        </div>

        {/* Error Popup */}
        {showErrorPopup && (
          <div className="fixed top-4 right-4 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 animate-fade-in">
            <AlertCircle className="w-5 h-5" />
            <span>{error}</span>
          </div>
        )}
      </div>
    </div>
  );
} 