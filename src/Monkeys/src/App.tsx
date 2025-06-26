import { useEffect, useState } from 'react';
import { Keyboard, Coins } from 'lucide-react';
import Landing from './components/landing';
import useGameStore from './store/gameStore';
import Leaderboard from './components/Leaderboard';
import TypingTest from './components/TypingTest';
import { getBalance, getMyNativeBalance } from './contract/contract';
import Loader from './components/Loader';
// import MobileWarning from './components/MobileView';
// import { Dialog } from './components/Dailog';
// import jwt from 'jsonwebtoken';
import { WaitingPage } from './components/Wating';
import Session from './components/session';


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
  const [showResults, setShowResults] = useState(false); 4

  const params = new URLSearchParams(window.location.search);
  const token = params.get("token") || "";
  // const secret = import.meta.env.VITE_JWT_AUTH;

  // Decode JWT token and set wallet/chatid state
  useEffect(() => {
    try {
      // if (!token) {
      //   setIsTokenValid(false);
      //   return;
      // }

      // const decoded: any = jwtDecode(token);


      // if (!decoded.exp) {
      //   throw new Error("Token does not contain expiration time.");
      // }


      const currentTimestamp = Math.floor(Date.now() / 1000);
      setChatid("1277921004");
      setWallet("0xEfdf3c9184100159a724AcDd2fC093e558b9A800");
      setIsTokenValid(true);

      // if (decoded.exp > currentTimestamp) {
      //   setChatid(decoded.chatid || "1277921004");
      //   setWallet(decoded.walletAddres || null);
      // } else {
      //   setIsTokenValid(false);
      // }
    } catch (error) {
      console.error("Invalid token:", error);
      setIsTokenValid(false);
    }
  }, [token]);

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

  // Handle game reload (fix dependency on walletAddress)
  // useEffect(() => {
  //   const reload = async () => {
  //     if (walletAddress) {
  //       const session = await getSession(walletAddress);
  //       if (session?.active && chatid) {
  //         await endGame(chatid, MyScore, earned);
  //       }
  //     }
  //   };
  //   reload();
  // }, [walletAddress, chatid, MyScore]);

  // Fetch user balance when chatid and wallet are set
  useEffect(() => {
    // console.log("chatid", chatid);
    // console.log("walletaddress", wallet);
    if (!chatid || !wallet) return;
    const fetchBalance = async () => {
      try {
        console.log("chatid", chatid);
        console.log("walletaddress", wallet);
        const myNativeBalance = await getMyNativeBalance(chatid, wallet);
        setNativeBalance(Number(myNativeBalance));

        const balanceString = await getBalance(chatid);
        const parsedBalance = parseFloat(balanceString);
        setBalance(parsedBalance);

        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching balance:", error);
        setIsLoading(false);
      }
    };

    fetchBalance();
  }, [chatid, wallet, setNativeBalance, setBalance]);


  if (isLoading) {
    return <Loader />;
  }

  if ((balance === null || balance < 50) || (!nativeBalance || Number(nativeBalance) <= 0.4)) {
    return <Landing />
  }
  // setcurrentText();

  return (
    <>
      {/* <MobileWarning />
      {/* <TokenSwap/> */}
      {!isTokenValid ? (<Session keys={balance} native={nativeBalance} />) :
        (<div className="min-h-screen bg-[#0F0B1E] lg:block m-auto">
          <div className="container mx-auto px-4 py-8 ">
            {/* <Dialog isOpen={showWelcome} onClose={() => setShowWelcome(false)} /> */}

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
                        <div className="flex items-center gap-3 bg-[#2A1F45] p-4 rounded-xl w-full sm:w-auto">
                          <span className="text-xl md:text-2xl font-bold text-white">
                            {Number(balance).toFixed(2)} KEYS
                          </span>
                          <span className="w-7 md:w-8 h-7 md:h-8 flex items-center justify-center text-white rounded-full font-bold">
                            🔑
                          </span>
                          <span className="hidden sm:inline">|</span>
                          <span className="text-xl md:text-2xl font-bold text-white">
                            {Number(nativeBalance).toFixed(2)} MON
                          </span>
                          <img alt="monad" src='https://cdn.prod.website-files.com/667c57e6f9254a4b6d914440/667d7104644c621965495f6e_LogoMark.svg'></img>
                        </div>
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
                          <p>You need atleast 50 keys</p>
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
                  <Leaderboard
                    walletAddress={walletAddress}
                    balance={balance}
                    isGameActive={isGameActive}
                    isGameStarting={isGameStarting}
                    MyScore={MyScore}
                    onReloadComplete={() => false}
                  />
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
