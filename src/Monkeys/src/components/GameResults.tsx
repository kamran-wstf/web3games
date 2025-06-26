import React, { useEffect, useState } from 'react';
import { Trophy, Target, Clock, Coins, Keyboard, Banknote, Wallet } from 'lucide-react';
import useGameStore from '../store/gameStore';
import { endGame, getBalance, getSession } from '../contract/contract';
import dynamic from 'next/dynamic';

const Confetti = dynamic(() => import('react-confetti'), { ssr: false });

const Spinner = () => (
  <svg
    className="animate-spin h-6 w-6 text-white"
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
  const { walletAddress, chatId, wpm, accuracy, correctChar, earned, setGameStarting, setMyScore, setEarned, setGameActive, setTimeLeft, MyScore, setBalance } = useGameStore();
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
      await endGame(chatId, MyScore, earned);
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
      const balanceString = await getBalance(chatId);
      setTimeLeft(30);
      setGameStarting(false);
      setGameActive(false);

      const parsedBalance = parseFloat(balanceString);
      setBalance(parsedBalance);
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

      <div className="bg-[#1A1432] rounded-2xl shadow-lg shadow-purple-900/20 p-4 sm:p-6 md:p-8 w-full max-w-2xl mx-auto">
        <h2 className="text-lg sm:text-2xl md:text-3xl font-bold text-center text-white mb-4 sm:mb-6">
          Test Complete!
        </h2>

        {/* Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { icon: <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-[#9D70FF]" />, label: "Words per Minute", value: `${wpm} WPM` },
            { icon: <Banknote className="w-5 h-5 sm:w-6 sm:h-6 text-[#9D70FF]" />, label: "Transactions per 30sec", value: `${correctChar} Transactions` },
            { icon: <Target className="w-5 h-5 sm:w-6 sm:h-6 text-[#9D70FF]" />, label: "Accuracy", value: `${accuracy}%` },
            { icon: <Trophy className="w-5 h-5 sm:w-6 sm:h-6 text-[#9D70FF]" />, label: "Score", value: MyScore },
            { icon: <Coins className="w-5 h-5 sm:w-6 sm:h-6 text-[#9D70FF]" />, label: "Currency Earned", value: earned },
            {
              icon: <Wallet className="w-5 h-5 sm:w-6 sm:h-6 text-[#9D70FF]" />,
              label: (
                <a
                  href={`https://testnet.monadexplorer.com/address/${walletAddress}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 text-xs sm:text-sm hover:text-white transition"
                >
                  View on Monad Explorer
                </a>
              ),
              value: "",
            },
          ].map((item, index) => (
            <div key={index} className="flex items-center gap-3 p-3 sm:p-4 bg-[#2A1F45] rounded-xl">
              {item.icon}
              <div>
                <p className="text-gray-400 text-xs sm:text-sm">{item.label}</p>
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
          className="w-full mt-5 sm:mt-6 flex items-center justify-center gap-2 bg-gradient-to-r from-[#6C3BEE] to-[#9D70FF] text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg text-sm sm:text-base font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-purple-900/30 disabled:opacity-50"
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
