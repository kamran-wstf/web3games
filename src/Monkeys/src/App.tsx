import { useEffect, useState } from 'react';
import { Keyboard, Coins } from 'lucide-react';
import Landing from './components/landing';
import useGameStore from './store/gameStore';
import Leaderboard from './components/Leaderboard';
import TypingTest from './components/TypingTest';
import Loader from './components/Loader';
// import MobileWarning from './components/MobileView';
// import { Dialog } from './components/Dailog';
// import jwt from 'jsonwebtoken';
import { WaitingPage } from './components/Wating';
import Session from './components/session';
import { useWallet } from '@solana/wallet-adapter-react';


function MONkeys() {
  const {
    isGameActive,
    isGameStarting,
    startGame,
    wpm,
    nativeBalance,
    setNativeBalance,
    timeLeft,
    setcurrentText,
    walletAddress,
    setWalletAddress,
    setBalance,
    MyScore,
    earned,
    balance,
  } = useGameStore();

  const [isLoading, setIsLoading] = useState(true);
  const [showWelcome, setShowWelcome] = useState(true);
  const [isTokenValid, setIsTokenValid] = useState(false);
  const [wallet, setWallet] = useState<string | null>(null);
  const [chatid, setChatid] = useState<string | null>("1277921004");
  const [showResults, setShowResults] = useState(false);

  const { publicKey } = useWallet()

  const params = new URLSearchParams(window.location.search);
  const token = params.get("token") || "";
  // const secret = import.meta.env.VITE_JWT_AUTH;

  // Decode JWT token and set wallet/chatid state
  useEffect(() => {
    try {

      const currentTimestamp = Math.floor(Date.now() / 1000);
      setChatid("1277921004");
      setWallet(publicKey ? publicKey.toBase58() : null);
      setIsTokenValid(true);

    } catch (error) {
      console.error("Invalid token:", error);
      setIsTokenValid(false);
    }
  }, []);

  // Automatically show results after the game ends
  useEffect(() => {
    if (!isGameActive && !isGameStarting && timeLeft === 0) {
      const timer = setTimeout(() => {
        setShowResults(true);
      }, 4000); // 4 seconds delay
      return () => clearTimeout(timer);
    } else {
      setShowResults(false);
    }
  }, [isGameActive, isGameStarting, timeLeft]);

  // Set wallet address in the store when it's updated
  useEffect(() => {
    if (wallet) {
      setWalletAddress(wallet);
    }
  }, [wallet, setWalletAddress]);

  useEffect(() => {

    const fetchBalance = async () => {
      try {
        setTimeout(() => {
          setIsLoading(false);
        }, 4000)
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching balance:", error);
        setIsLoading(false);
      }
    };

    fetchBalance();
  }, []);


  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      {!isTokenValid ? (<Session keys={balance} native={nativeBalance} />) :
        (<div className="min-h-screen bg-gradient-to-br from-[#0a0a0a] via-[#0f1a0f] to-[#1a1a0a] lg:block m-auto">
          <div className="container mx-auto px-4 py-8 ">

            {!isGameActive && !isGameStarting && timeLeft > 0 ? (
              <>
                <div className="mb-12 text-center relative">
                  <div className="absolute left-1/2 -translate-x-1/2 -top-24 w-32 h-32 mascot opacity-50"></div>
                  <h1 className="text-6xl font-bold bg-gradient-to-r from-[#00ff88] via-[#4ade80] to-[#22c55e] bg-clip-text text-transparent mb-3 drop-shadow-lg">
                    MONkeys
                  </h1>
                  <p className="text-gray-300 text-lg">Master your typing skills and earn rewards in the swamp</p>
                </div>

                <div className="flex flex-col md:flex-row gap-6 items-start max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="flex-1 w-full">
                    <div className="bg-gradient-to-br from-[#1a2e1a] to-[#2d4a2d] rounded-2xl shadow-2xl shadow-green-900/30 p-6 sm:p-8 mb-6 md:mb-0 border border-green-800/30 backdrop-blur-sm">
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4 sm:gap-6">

                        <button
                          onClick={() => {
                            if (chatid && wallet) {
                              startGame(chatid, wallet);
                            } else {
                              console.error("chatid or wallet is null");
                            }
                          }}
                          className="flex items-center justify-center gap-2 bg-gradient-to-r from-[#00ff88] via-[#4ade80] to-[#22c55e] text-black px-6 md:px-8 py-3 md:py-4 rounded-xl text-base md:text-lg font-bold transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-green-500/50 w-full sm:w-auto border-2 border-green-400/50 hover:border-green-300"
                        >
                          <Keyboard className="w-5 md:w-6 h-5 md:h-6" />
                          Start Typing
                        </button>

                      </div>
                      <div className="bg-gradient-to-br from-[#0f1f0f] to-[#1a2e1a] p-6 md:p-8 rounded-xl border border-green-700/30 shadow-inner">
                        <h2 className="text-xl md:text-2xl font-bold text-white mb-4 md:mb-6 bg-gradient-to-r from-[#00ff88] to-[#4ade80] bg-clip-text text-transparent">
                          How to Play
                        </h2>
                        <ul className="text-gray-200 space-y-3 md:space-y-4 text-base md:text-lg">
                          <li className="flex items-center gap-3">
                            <span className="w-7 md:w-8 h-7 md:h-8 flex items-center justify-center bg-gradient-to-r from-[#00ff88] to-[#4ade80] text-black rounded-full font-bold shadow-lg">
                              1
                            </span>
                            Decode the Monad Lore – Type fast, type right.
                          </li>
                          <li className="flex items-center gap-3">
                            <span className="lg:w-7  md:w-8 lg:h-7 md:h-8 flex items-center justify-center bg-gradient-to-r from-[#00ff88] to-[#4ade80] text-black rounded-full font-bold shadow-lg">
                              2
                            </span>
                            Real-Time tracking – WPM and accuracy tracked live, all on-chain.
                          </li>
                          <li className="flex items-center gap-3">
                            <span className="w-7 md:w-8 h-7 md:h-8 flex items-center justify-center bg-gradient-to-r from-[#00ff88] to-[#4ade80] text-black rounded-full font-bold shadow-lg">
                              3
                            </span>
                            Farm the Testnet – The better you type, the more you earn, and wallet generates more transactions.
                          </li>
                          <li className="flex items-center gap-3">
                            <span className="w-7 md:w-8 h-7 md:h-8 flex items-center justify-center bg-gradient-to-r from-[#00ff88] to-[#4ade80] text-black rounded-full font-bold shadow-lg">
                              4
                            </span>
                            Join the Council – Climb the Leaderboard of MONKeys.
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : null}

            {(isGameStarting || isGameActive) && (
              <div className="pt-8">
                <TypingTest />
              </div>
            )}

            {!isGameActive && !isGameStarting && timeLeft === 0 && (
              <WaitingPage />
            )}

          </div>
        </div>)
      }
    </>
  );
}

export default MONkeys;