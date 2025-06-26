import { create } from 'zustand';
import { GameState } from '../types';
import { endGame, playGame } from '../contract/contract';




const segments = ["Monad is a high-performance, Ethereum-compatible Layer 1 (L1) blockchain designed to address scalability and efficiency challenges in decentralized systems. Launched by Monad Labs (now transitioning into Category Labs and the Monad Foundation), it aims to deliver 10,000 transactions per second (TPS), 1-second block times, and single-slot finality, all while maintaining low hardware requirements. It achieves this through innovative technical enhancements like parallel execution, superscalar pipelining, and a custom consensus mechanism called MonadBFT. Essentially, Monad reimagines Ethereum's architecture to optimize speed and throughput without sacrificing decentralization or compatibility with the Ethereum Virtual Machine (EVM).",

  "The project pitches itself as a solution for developers and users frustrated by Ethereum's high gas fees and slower transaction speeds. By supporting EVM bytecode and Ethereum's Remote Procedure Call (RPC) API, Monad ensures seamless integration with existing Ethereum tools, wallets, and decentralized applications (dapps). This compatibility, paired with its performance upgrades, positions Monad as a blockchain that could attract a wide range of Web3 projects, from DeFi platforms to NFT marketplaces.",

  "Monad's development began in 2021, spearheaded by a team with roots in traditional finance and tech, including co-founder Keone Hon. The project has garnered significant attention—and funding—within the crypto space, reflecting confidence in its potential to reshape the L1 landscape. As of early 2025, Monad is nearing a critical milestone: the launch of its testnet, which will allow developers and community members to experiment with the network before its mainnet debut.",

  "To understand Monad's appeal, it's worth diving into its technical underpinnings. Unlike Ethereum, which processes transactions sequentially, Monad introduces parallel execution, allowing multiple transactions to be handled simultaneously. This is akin to upgrading from a single-lane road to a multi-lane highway. It also employs deferred execution, which separates transaction validation from state updates, reducing network congestion. These optimizations are powered by MonadDb, a custom state database designed for high-speed, asynchronous operations.",

  "The MonadBFT consensus mechanism further enhances security and efficiency. While details are technical and somewhat sparse, it's described as a bespoke solution tailored to Monad's goals, ensuring rapid finality (transactions are confirmed in one block) while preserving decentralization. The use of C++ and Rust—programming languages known for performance—underscores Monad's focus on efficiency, setting it apart from Ethereum's reliance on less optimized frameworks.",

  "This technical prowess doesn't come at the cost of accessibility. Developers familiar with Ethereum's Solidity language or tools like MetaMask can jump into Monad without a steep learning curve. This balance of innovation and familiarity is a key selling point, making Monad a contender in the crowded L1 space alongside networks like Solana, Aptos, and Sui.",

  "The Monad community is buzzing with anticipation as the testnet launch approaches. Posts on X from February 2025 highlight this excitement. For instance, a co-founder expressed pride in the team's relentless efforts since 2021, noting that the testnet is the “biggest moment yet” for the project. This sentiment reflects a community rallying around a tangible milestone after years of development.",

  "The testnet, rolled out in early 2025, is a pivotal event. It's an opportunity for developers to build and stress-test dapps, for validators to experiment with network operations, and for users to get a feel for Monad's promised speed. Community members on X have described it as bringing “Solana-type power to EVM,” emphasizing the blend of high throughput and Ethereum compatibility. Tutorials and threads are popping up, breaking down Monad's features for newcomers, signaling grassroots efforts to onboard more participants.",

  "The Monad Foundation, established to oversee governance and ecosystem growth, is playing a central role in this phase. It's facilitating validator-led governance and community-led proposals, aiming to decentralize decision-making. This shift—coupled with Monad Labs rebranding to Category Labs for software development—shows a maturing organizational structure designed to sustain long-term growth.",

  "However, not everything is rosy. A September 2024 report from DeSpread noted that Monad recently discontinued weekly missions in private chat groups due to “growing fatigue and dissatisfaction” among members. These missions, likely tied to rewards or incentives, may have pressured users into constant activity, risking burnout. The Foundation's decision to pivot suggests a responsiveness to feedback, but it also highlights a challenge: maintaining engagement without over-relying on gamification. Sustaining hype post-testnet—and post-rewards—will require fresh strategies, perhaps through developer grants, hackathons, or partnerships.",

  "Beyond the core team, the Monad ecosystem is expanding. Projects like MonadStarter, a community-focused fundraising platform, are gearing up for the testnet phase, offering tools like Launchpads and Liquidity Bootstrapping Pools (LBPs) to support token launches. Monad Builders, a community explorer, showcases NFTs, games, and DeFi projects on Monad, while Monad Pad provides updates and fosters a sub-community around “Purple Frens.” These initiatives indicate a vibrant, decentralized effort to build out the ecosystem, even before mainnet.",

  "Monad enters a competitive L1 market where scalability is the holy grail. Ethereum, despite its dominance, struggles with congestion and fees, pushing users toward alternatives. Solana offers high TPS but sacrifices some decentralization and has faced outages. Aptos and Sui, newer entrants, prioritize performance but lack Ethereum's mature ecosystem. Monad's niche is its EVM compatibility paired with Solana-like speed—a “best of both worlds” pitch that could lure Ethereum developers seeking scalability without abandoning familiar tools.",

  "The project's funding and team pedigree add credibility. While exact figures aren’t public, Monad’s visibility suggests substantial backing, likely from venture capital firms betting on next-gen blockchains. The involvement of ex-finance professionals hints at a pragmatic approach, blending crypto idealism with real-world execution.",

  "Yet, Monad isn't without risks. The testnet will reveal whether its ambitious claims hold up under real-world conditions. Scalability often comes with trade-offs—whether in security, decentralization, or complexity—and Monad must prove it can deliver without compromising Ethereum's battle-tested resilience. Community sentiment on X is bullish, but hype can fade if execution falters.",

  "Looking ahead, 2025 is a make-or-break year. The testnet's success will set the stage for mainnet, expected later this year or early 2026. Key focus areas include developer adoption, community governance, ecosystem partnerships, and mainnet stability.",

  "The community's role will be pivotal. If Monad balances engagement with sustainability—avoiding the fatigue trap—it could cultivate a loyal base to rival Ethereum's. The “Purple Frens” vibe and grassroots projects like MonadStarter suggest a foundation for organic growth, but execution remains the ultimate test.",

  "As of February 24, 2025, Monad.xyz is a project on the cusp of transformation. Its technical innovations—parallel execution, MonadBFT, and EVM compatibility—position it as a potential Ethereum successor, while its community is a mix of eager builders and cautious optimists. The testnet launch marks a turning point, testing both tech and teamwork. Whether Monad becomes a cornerstone of Web3 or a cautionary tale depends on its ability to deliver on promises and nurture its ecosystem. For now, it's a fascinating experiment in blockchain evolution, with a community rooting for its success."]
let randomSegment = ""

// Check if segments were created successfully
if (!segments || segments.length === 0) {
  console.error("No segments created.");
} else {
  // Pick a random segment
  const randomIndex = Math.floor(Math.random() * segments.length);
  randomSegment = segments[randomIndex].slice(0, 1000);
}

// , isGameActive, isGameStarting ,timeLeft

const useGameStore = create<GameState>((set) => ({
  currentText: randomSegment,
  userInput: '',
  timeLeft: 30,

  wpm: 0,
  accuracy: 0,
  score: 0,
  currency: 0,
  transactionHash: [],
  isGameActive: false,
  isGameStarting: false,
  countdown: 3,
  chatId: "",
  balance: 0,
  walletAddress: "",
  correctChar: 0,
  existingGame: false,
  nativeBalance: 0,
  MyScore: 0,
  earned: 0,
  waiting: false,
  setTransaction: (transaction: string[]) => {
    set({ transactionHash: transaction })
  },
  setEarned: (earned: number) => {
    set({ earned: earned });
  },
  setWaiting: async (waiting: boolean) => {
    set({ waiting: waiting })
  },
  setMyScore: async (score: number) => {
    set({ MyScore: score })
  },
  setNativeBalance: async (balance: number) => {
    set({ nativeBalance: balance })
  },
  setBalance: async (balance: number) => {
    set({ balance: balance })
  },
  setGameActive: async (isActive: boolean) => {
    set({ isGameActive: isActive })
  },
  setGameStarting: async (isStarting: boolean) => {
    set({ isGameStarting: isStarting })
  },
  setTimeLeft: async (time: number) => {
    set({ timeLeft: time })
  },
  setWalletAddress: async (walletAddress: string) => {
    set({ walletAddress: walletAddress })
  },
  setcurrentText: () => {
    if (!segments || segments.length === 0) {
      console.error("No segments created.");
    } else {
      // Pick a random segment
      const randomIndex = Math.floor(Math.random() * segments.length);
      randomSegment = segments[randomIndex].slice(0, 1000);
    }
    set({ currentText: randomSegment })
  },
  startGame: async (chatId: string, walletAddress: string) => {
    // console.time("Total startGame time");
    if (!segments || segments.length === 0) {
      console.error("No segments created.");
    } else {
      // Pick a random segment
      const randomIndex = Math.floor(Math.random() * segments.length);
      randomSegment = segments[randomIndex].slice(0, 1000);
    }
    set({ currentText: randomSegment })
    set({ isGameStarting: true, countdown: 3, chatId: chatId, walletAddress: walletAddress, waiting: true });

    console.log("CLicked")
    // console.time("getSession time");
    // console.timeEnd("getSession time");

    try {
      await playGame(chatId);
    }
    catch (err) {
      console.log("my error", err)
    }
    finally {
      set({ waiting: false });
    }


    // Start countdown
    const countdownInterval = setInterval(() => {
      set((state) => {
        if (state.countdown > 1) {
          return { countdown: state.countdown - 1 };
        } else {
          clearInterval(countdownInterval);
          return {
            countdown: 0,
            isGameStarting: false,
            isGameActive: true,
            userInput: '',
            timeLeft: 30,
            wpm: 0,
            accuracy: 0
          };
        }
      });
    }, 1000);

    // Start game timer
    setTimeout(() => {
      const gameInterval = setInterval(() => {
        set((state) => {
          if (state.timeLeft > 1) {
            return { timeLeft: state.timeLeft - 1 };
          } else {
            clearInterval(gameInterval);
            const finalScore = Math.round((state.wpm * state.accuracy) / 100);
            const earnedCurrency = Math.round(finalScore / 10);
            return {
              isGameActive: false,
              timeLeft: 0,
              score: finalScore,
              currency: state.currency + earnedCurrency
            };
          }
        });
      }, 1000);
    }, 3000);
  },

  updateUserInput: (input: string) => {
    set((state) => {
      // const words = state.currentText.split(' ');
      // const typedWords = input.split(' ');
      // const correctWords = typedWords.filter((word, i) => word === words[i]).length;

      const totalChars = input.length;
      const correctChars = [...input].filter((char, i) => char === state.currentText[i]).length;
      const totalTimeSpent = 30 - state.timeLeft; // Assuming the total time for the test is 30 seconds
      const timeInMinutes = totalTimeSpent / 60;
      const wpm = timeInMinutes > 0 ? Math.floor((correctChars / 5) / timeInMinutes) : 0;
      set({ correctChar: correctChars })
      const accuracy = Math.round((correctChars / totalChars) * 100) || 0;

      return {
        userInput: input,
        wpm,
        accuracy: Math.min(accuracy, 100)
      };
    });
  },

  resetGame: () => {
    set({
      userInput: '',
      timeLeft: 30,
      wpm: 0,
      accuracy: 0,
      score: 0,
      correctChar: 0,
      MyScore: 0,
      isGameActive: false,
      isGameStarting: false,
      countdown: 3,
    });
  }
}));

export default useGameStore