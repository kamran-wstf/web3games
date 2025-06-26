import React from 'react';
import { Trophy } from 'lucide-react';
import { useLeaderboard } from '../hooks/useLeaderboard';

interface LeaderboardProps {
  onPlayerClick?: (address: string) => void;
}

// Helper function to shorten wallet address
const shortenAddress = (address: string): string => {
  if (!address) return '';
  return `${address.slice(0, 4)}...${address.slice(-4)}`;
};

export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T) => void] {
  // Get from local storage then
  // parse stored json or return initialValue
  const [storedValue, setStoredValue] = React.useState<T>(() => {
    if (typeof window === "undefined") {
      return initialValue;
    }
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });

  // Return a wrapped version of useState's setter function that ...
  // ... persists the new value to localStorage.
  const setValue = (value: T) => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      // Save to local storage
      if (typeof window !== "undefined") {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
      setStoredValue(valueToStore);
    } catch (error) {
      console.log(error);
    }
  };
  return [storedValue, setValue];
}

export function Leaderboard({ onPlayerClick }: LeaderboardProps) {
  const { entries = [], loading, error } = useLeaderboard();

  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-1/3 mb-2"></div>
        <div className="space-y-2">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-10 bg-gray-200 rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      {error && (
        <div className="bg-red-100 rounded p-3 mb-3 text-sm text-red-600">
          {error}
        </div>
      )}

      <div className="space-y-2">
        {entries.map((entry, index) => (
          <div
            key={entry.address + index}
            className="bg-gray-100 rounded p-3 flex items-center justify-between cursor-pointer hover:bg-gray-200 transition-colors"
            onClick={() => onPlayerClick?.(entry.address)}
          >
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded bg-blue-100 flex items-center justify-center text-blue-600 font-medium text-sm">
                {index + 1}
              </div>
              <div className="font-medium text-sm text-gray-700 flex items-center gap-1">
                <span className="font-mono">{shortenAddress(entry.address)}</span>
                <span className="mx-1.5 text-gray-400">•</span>
                <span className="text-gray-500 text-xs">
                  {new Date(entry.timestamp).toLocaleDateString(undefined, {
                    month: 'short',
                    day: 'numeric'
                  })}
                </span>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-2">
                <Trophy className="w-4 h-4 text-yellow-500" />
                <span className="text-base font-medium text-green-600">{entry.score}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {entries.length === 0 && !error && (
        <div className="text-center py-4">
          <p className="text-gray-500 text-sm">No games played yet</p>
        </div>
      )}
    </div>
  );
} 