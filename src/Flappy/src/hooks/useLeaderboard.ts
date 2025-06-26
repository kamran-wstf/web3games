import { useEffect, useState } from 'react';

interface LeaderboardEntry {
  address: string;
  score: number;
  timestamp: number;
}

// Local storage key for caching leaderboard data
const LEADERBOARD_CACHE_KEY = 'flappyFuse_leaderboardCache';
const GAME_DATA_KEY = 'flappyFuse_gameData';

// Helper function to save to local storage
const saveToLocalStorage = (key: string, data: any) => {
  try {
    localStorage.setItem(key, JSON.stringify({
      data,
      timestamp: Date.now()
    }));
  } catch (error) {
    console.error(`Failed to save ${key} to localStorage:`, error);
  }
};

// Helper function to get from local storage with expiry check
const getFromLocalStorage = (key: string, maxAgeMs = 5 * 60 * 1000) => {
  try {
    const item = localStorage.getItem(key);
    if (!item) return null;
    
    const { data, timestamp } = JSON.parse(item);
    const isExpired = Date.now() - timestamp > maxAgeMs;
    
    if (isExpired) {
      localStorage.removeItem(key);
      return null;
    }
    
    return data;
  } catch (error) {
    console.error(`Failed to retrieve ${key} from localStorage:`, error);
    return null;
  }
};

export function useLeaderboard() {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Track if we're using real data or mock data
  const [isRealData, setIsRealData] = useState(false);

  // Function to update leaderboard with local scores
  const updateWithLocalScores = () => {
    try {
      // Get game data from local storage
      const gameData = localStorage.getItem(GAME_DATA_KEY);
      if (!gameData) return [];

      const data = JSON.parse(gameData);
      const walletScores: Record<string, { score: number; timestamp: number }> = {};

      // Process each wallet's games
      Object.entries(data).forEach(([walletAddress, walletData]: [string, any]) => {
        if (!walletData.games || !Array.isArray(walletData.games)) return;

        // Find highest score for this wallet
        const highestScore = walletData.games.reduce((highest: number, game: any) => {
          return Math.max(highest, game.score || 0);
        }, 0);

        // Find the timestamp of the game with highest score
        const highestScoreGame = walletData.games.find((game: any) => game.score === highestScore);
        
        if (highestScore > 0) {
          walletScores[walletAddress] = {
            score: highestScore,
            timestamp: highestScoreGame?.timestamp || Date.now()
          };
        }
      });

      // Convert to array and sort by score
      const leaderboardEntries = Object.entries(walletScores).map(([address, data]) => ({
        address,
        score: data.score,
        timestamp: data.timestamp
      }));

      // Sort by score (highest first)
      leaderboardEntries.sort((a, b) => b.score - a.score);
      
      // Take top 10
      return leaderboardEntries.slice(0, 10);
      
    } catch (error) {
      console.error('Failed to update with local scores:', error);
      return [];
    }
  };

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        console.log('Fetching leaderboard data...');
        
        // First check for cached data
        const cachedData = getFromLocalStorage(LEADERBOARD_CACHE_KEY);
        if (cachedData) {
          console.log('Using cached leaderboard data');
          setEntries(updateWithLocalScores());
          setLoading(false);
        }

        // Get fresh data from local storage
        const localScores = updateWithLocalScores();
        
        if (localScores.length > 0) {
          console.log('Using local game data for leaderboard');
          setEntries(localScores);
          setIsRealData(true);
          
          // Cache the data
          saveToLocalStorage(LEADERBOARD_CACHE_KEY, localScores);
        } else {
          console.log('No leaderboard data available');
          setEntries([]);
          setError('No leaderboard data available');
        }
      } catch (err) {
        console.error('Error in leaderboard hook:', err);
        setEntries([]);
        setError('Failed to load leaderboard data');
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  return { entries, loading, error, isRealData };
} 