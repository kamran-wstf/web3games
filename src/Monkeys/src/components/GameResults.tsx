import React, { useEffect, useState } from 'react';
import { Trophy, Target, Clock, Coins, Keyboard, Banknote, Wallet } from 'lucide-react';
import useGameStore from '../store/gameStore';
import { endGame } from '../contract/contract';
import dynamic from 'next/dynamic';

const Confetti = dynamic(() => import('react-confetti'), { ssr: false });

const Spinner = () => (
  <svg
    className="animate-spin h-6 w-6 text-black"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
  </svg>
);

interface GameResultsProps {
  onClaim: () => void;
}

const GameResults: React.FC<GameResultsProps> = ({ onClaim }) => {
  const { walletAddress, chatId, wpm, accuracy, correctChar, earned, setGameStarting, setEarned, setGameActive, setTimeLeft, MyScore, setBalance } = useGameStore();
  const [activeGame, setActive] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState(false);
  const [showParty, setShowParty] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: 800, height: 600 });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    }
    const randomValue = (Math.random() * (0.06 - 0.027) + 0.027).toFixed(6);
    setEarned(Math.floor(Number(randomValue) * MyScore));
  }, [MyScore]);

  const handleClaimReward = async () => {
    if (!chatId || MyScore <= 0 || earned <= 0) {
      console.error('Invalid parameters for ending the game.');
      return;
    }

    try {
      await endGame(walletAddress, earned);
      setActive(false);
    } catch (error) {
      console.error('Error ending game: ', error);
    }
  };

  const resetGame = async () => {
    if (!chatId) {
      console.error('Chat ID is missing. Cannot reset the game.');
      return;
    }

    try {
      setTimeLeft(30);
      setGameStarting(false);
      setGameActive(false);

    } catch (error) {
      console.error('Error resetting game: ', error);
    }
  };
  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  const onClaimReward = async () => {
    setIsLoading(true);
    try {
      await handleClaimReward();
      setActive(false);
      setGameStarting(false);
      setShowParty(true);
      await delay(5000);
      setShowParty(false);
    } catch (error) {
      console.error('Error claiming reward: ', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    let timeoutId: any;
    if (showParty) {
      timeoutId = setTimeout(() => setShowParty(false), 5000);
    }
    return () => clearTimeout(timeoutId);
  }, [showParty]);


  return (
    <div className="flex-1 w-full">
      {showParty && <Confetti width={windowSize.width} height={windowSize.height} />}

      <div className="bg-gradient-to-br from-[#1a2e1a] to-[#2d4a2d] rounded-2xl shadow-2xl shadow-green-900/30 p-4 sm:p-6 md:p-8 w-full max-w-2xl mx-auto border border-green-800/30 backdrop-blur-sm">
        <h2 className="text-lg sm:text-2xl md:text-3xl font-bold text-center text-white mb-4 sm:mb-6 bg-gradient-to-r from-[#00ff88] to-[#4ade80] bg-clip-text text-transparent">
          Test Complete!
        </h2>

        {/* Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { icon: <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-[#4ade80]" />, label: "Words per Minute", value: `${wpm} WPM` },
            { icon: <Banknote className="w-5 h-5 sm:w-6 sm:h-6 text-[#4ade80]" />, label: "Transactions per 30sec", value: `${correctChar} Transactions` },
            { icon: <Target className="w-5 h-5 sm:w-6 sm:h-6 text-[#4ade80]" />, label: "Accuracy", value: `${accuracy}%` },
            { icon: <Trophy className="w-5 h-5 sm:w-6 sm:h-6 text-[#4ade80]" />, label: "Score", value: MyScore },
            { icon: <Coins className="w-5 h-5 sm:w-6 sm:h-6 text-[#4ade80]" />, label: "Currency Earned", value: earned },
            {
              icon: <Wallet className="w-5 h-5 sm:w-6 sm:h-6 text-[#4ade80]" />,
              label: (
                <a
                  href={`https://testnet.monadexplorer.com/address/${walletAddress}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 text-xs sm:text-sm hover:text-[#00ff88] transition"
                >
                  View on Monad Explorer
                </a>
              ),
              value: "",
            },
          ].map((item, index) => (
            <div key={index} className="flex items-center gap-3 p-3 sm:p-4 bg-gradient-to-br from-[#0f1f0f] to-[#1a2e1a] rounded-xl border border-green-700/20 shadow-lg shadow-green-900/20">
              {item.icon}
              <div>
                <p className="text-gray-300 text-xs sm:text-sm">{item.label}</p>
                {item.value && <p className="text-sm sm:text-lg font-bold text-white">{item.value}</p>}
              </div>
            </div>
          ))}
        </div>

        {/* Responsive Button */}
        <button
          onClick={() => {
            if (activeGame && Number(MyScore) > 0) {
              onClaimReward(); // Trigger the claim reward function
            } else {
              resetGame(); // Trigger the reset game function
            }
          }}
          disabled={isLoading}
          className="w-full mt-5 sm:mt-6 flex items-center justify-center gap-2 bg-gradient-to-r from-[#00ff88] via-[#4ade80] to-[#22c55e] text-black px-4 sm:px-6 py-2 sm:py-3 rounded-lg text-sm sm:text-base font-bold transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-green-500/50 disabled:opacity-50 border-2 border-green-400/50 hover:border-green-300"
        >
          {isLoading ? (
            <>
              <Spinner />
              Claiming...
            </>
          ) : (
            <>
              <Keyboard className="w-4 sm:w-5 h-4 sm:h-5" />
              {activeGame && Number(MyScore) > 0 ? "Claim your reward" : "Play Again"}
            </>
          )}
        </button>
      </div>
    </div>


  );
};

export default GameResults;