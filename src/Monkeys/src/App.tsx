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
  const [chatid, setChatid] = useState<string | null>(null);
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
        (<div className="min-h-screen bg-[#0F0B1E] lg:block m-auto">
          <div className="container mx-auto px-4 py-8 ">

            {!isGameActive && !isGameStarting && timeLeft > 0 ? (
              <>
                <div className="mb-12 text-center relative">
                  <div className="absolute left-1/2 -translate-x-1/2 -top-24 w-32 h-32 mascot opacity-50"></div>
                  <h1 className="text-6xl font-bold gradient-text mb-3">MONkeys</h1>
                  <p className="text-gray-400 text-lg">Master your typing skills and earn rewards</p>
                </div>

                <div className="flex flex-col md:flex-row gap-6 items-start max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="flex-1 w-full">
                    <div className="bg-[#1A1432] rounded-2xl shadow-lg shadow-purple-900/20 p-6 sm:p-8 mb-6 md:mb-0">
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4 sm:gap-6">

                        <button
                          onClick={() => {
                            if (chatid && wallet) {
                              startGame(chatid, wallet);
                            } else {
                              console.error("chatid or wallet is null");
                            }
                          }}
                          className="flex items-center justify-center gap-2 bg-gradient-to-r from-[#6C3BEE] to-[#9D70FF] text-white px-6 md:px-8 py-3 md:py-4 rounded-xl text-base md:text-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-purple-900/30 w-full sm:w-auto"
                        >
                          <Keyboard className="w-5 md:w-6 h-5 md:h-6" />
                          Start Typing
                        </button>

                      </div>
                      <div className="bg-[#2A1F45] p-6 md:p-8 rounded-xl">
                        <h2 className="text-xl md:text-2xl font-bold text-white mb-4 md:mb-6">
                          How to Play
                        </h2>
                        <ul className="text-gray-300 space-y-3 md:space-y-4 text-base md:text-lg">
                          <li className="flex items-center gap-3">
                            <span className="w-7 md:w-8 h-7 md:h-8 flex items-center justify-center bg-[#6C3BEE] text-white rounded-full font-bold">
                              1
                            </span>
                            Decode the Monad Lore – Type fast, type right.
                          </li>
                          <li className="flex items-center gap-3">
                            <span className="lg:w-7  md:w-8 lg:h-7 md:h-8 flex items-center justify-center bg-[#6C3BEE] text-white rounded-full font-bold">
                              2
                            </span>
                            Real-Time tracking – WPM and accuracy tracked live, all on-chain.
                          </li>
                          <li className="flex items-center gap-3">
                            <span className="w-7 md:w-8 h-7 md:h-8 flex items-center justify-center bg-[#6C3BEE] text-white rounded-full font-bold">
                              3
                            </span>
                            Farm the Testnet – The better you type, the more you earn, and wallet generates more transactions.
                          </li>
                          <li className="flex items-center gap-3">
                            <span className="w-7 md:w-8 h-7 md:h-8 flex items-center justify-center bg-[#6C3BEE] text-white rounded-full font-bold">
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
