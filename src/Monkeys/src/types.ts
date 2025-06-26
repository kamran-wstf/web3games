export interface User {
  address: string;
  highScore: number;
}

export interface GameState {
  currentText: string;
  userInput: string;
  timeLeft: number;
  wpm: number;
  accuracy: number;
  score: number;
  currency: number;
  MyScore: number;
  isGameActive: boolean;
  isGameStarting: boolean;
  correctChar: number,
  countdown: number;
  chatId: string,
  walletAddress: string,
  existingGame: boolean,
  balance: number,
  nativeBalance: number,
  waiting: boolean,
  earned: number,
  transactionHash: string[],
  setEarned: (earned: number) => void;
  setWaiting: (waiting: boolean) => void,
  setMyScore: (score: number) => void,
  setNativeBalance: (balance: number) => void,
  setBalance: (balance: number) => void,
  setWalletAddress: (input: string) => void,
  updateUserInput: (input: string) => void,
  startGame: (chatid: string, walletAddress: string) => void,
  setGameActive: (isActive: boolean) => void,
  setGameStarting: (isStarting: boolean) => void,
  setTimeLeft: (time: number) => void,
  setcurrentText: () => void,
}