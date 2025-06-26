// Remove exports that don't exist yet
export interface GameResult {
  id: string;
  score: number;
  timestamp: number;
  jumps: {
    timestamp: number;
    processed: boolean;
    scoreAtJump: number;
    multiplierAtJump: number;
  }[];
}

export interface LeaderboardEntry {
  address: string;
  score: number;
  timestamp: number;
}

export interface Transaction {
  id: string;
  type: 'start' | 'end';
  status: 'pending' | 'confirmed' | 'failed';
  timestamp: number;
  hash: string;
  data: {
    score: number;
  };
} 