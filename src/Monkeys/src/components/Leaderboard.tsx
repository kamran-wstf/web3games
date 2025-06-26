import React, { useEffect, useState } from "react";
import { Trophy } from "lucide-react";
import { getLeaderBoard } from "../contract/contract";

// Function to format the address
const formatAddress = (address: string) => {
  return address.slice(0, 6) + "..." + address.slice(-4);
};

interface LeaderboardProps {
  walletAddress: string;
  balance: number;
  isGameActive: boolean;
  isGameStarting: boolean;
  MyScore: number;
  onReloadComplete: () => void;
}

const Leaderboard: React.FC<LeaderboardProps> = ({
  walletAddress,
  balance,
  isGameActive,
  isGameStarting,
  MyScore,
  onReloadComplete,
}) => {
  const [data, setData] = useState<[string, string][]>([]);
  const [fullLeaderboard, setFullLeaderboard] = useState<[string, string][]>([]);
  const [currentPlayerEntry, setCurrentPlayerEntry] = useState<[string, string] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [copied, setCopied] = useState<string | null>(null); // Track copied address

  useEffect(() => {
    const fetchLeaderboard = async () => {
      setLoading(true);
      try {
        const leaderboard = await getLeaderBoard();
        const sortedLeaderboard = [...leaderboard].sort((a: any, b: any) =>
          BigInt(b[1]) > BigInt(a[1]) ? 1 : -1
        );

        setFullLeaderboard(sortedLeaderboard);

        // Find the current player's position
        const playerEntry = sortedLeaderboard.find((entry) => entry[0] === walletAddress);
        setCurrentPlayerEntry(playerEntry || null);

        // Remove current user from the leaderboard list
        const filteredLeaderboard = sortedLeaderboard.filter((entry) => entry[0] !== walletAddress);

        setData(filteredLeaderboard);
      } catch (error) {
        console.error("Error fetching leaderboard data:", error);
      } finally {
        setLoading(false);
        onReloadComplete();
      }
    };

    fetchLeaderboard();
  }, [walletAddress, balance, isGameActive, isGameStarting, MyScore]);

  // Function to copy address
  const copyAddress = (address: string) => {
    navigator.clipboard.writeText(address);
    setCopied(address);
    setTimeout(() => setCopied(null), 1500); // Reset after 1.5 seconds
  };

  return (
    <div className="w-full sm:w-full md:w-[80%] lg:w-96 bg-[#1A1432] rounded-2xl shadow-lg shadow-purple-900/20 p-4 sm:p-6 mx-auto">
      <div className="flex items-center gap-3 mb-4 sm:mb-6">
        <Trophy className="w-6 sm:w-7 h-6 sm:h-7 text-[#9D70FF]" />
        <h2 className="text-lg sm:text-2xl font-bold text-white">Leaderboard</h2>
      </div>

      <div
        className="max-h-64 overflow-y-auto space-y-3 sm:space-y-4 scrollbar-thin scrollbar-thumb-[#9D70FF]/50 scrollbar-track-[#2A1F45]/50"
        style={{
          scrollbarWidth: "thin",
          scrollbarColor: "#9D70FF #2A1F45",
        }}
      >
        {loading ? (
          [...Array(4)].map((_, index) => (
            <div key={index} className="flex items-center justify-between p-3 sm:p-4 rounded-xl bg-[#2A1F45] animate-pulse">
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="w-7 sm:w-8 h-7 sm:h-8 bg-gray-600 rounded-full"></div>
                <div className="w-20 sm:w-24 h-3 sm:h-4 bg-gray-600 rounded"></div>
              </div>
              <div className="w-14 sm:w-16 h-3 sm:h-4 bg-gray-600 rounded"></div>
            </div>
          ))
        ) : (
          data.map((user, index) => {
            let rank = index + 1;

            let rankDisplay;
            if (rank === 1) {
              rankDisplay = <span className="w-7 sm:w-8 h-7 sm:h-8 flex items-center justify-center bg-yellow-400 text-white rounded-full font-bold">🥇</span>;
            } else if (rank === 2) {
              rankDisplay = <span className="w-7 sm:w-8 h-7 sm:h-8 flex items-center justify-center bg-gray-400 text-white rounded-full font-bold">🥈</span>;
            } else if (rank === 3) {
              rankDisplay = <span className="w-7 sm:w-8 h-7 sm:h-8 flex items-center justify-center bg-orange-400 text-white rounded-full font-bold">🥉</span>;
            } else {
              rankDisplay = <span className="w-7 sm:w-8 h-7 sm:h-8 flex items-center justify-center bg-[#6C3BEE] text-white rounded-full font-bold">#{rank}</span>;
            }

            return (
              <div key={user[0]} className="flex items-center justify-between p-3 sm:p-4 rounded-xl bg-[#2A1F45] hover:bg-[#352756] transition-colors">
                <div className="flex items-center gap-3 sm:gap-4">
                  {rankDisplay}
                  <span
                    className="text-gray-300 font-medium text-sm sm:text-base cursor-pointer hover:text-white transition"
                    onClick={() => copyAddress(user[0].toString())}
                  >
                    {formatAddress(user[0].toString())}
                  </span>
                </div>
                <span className="font-bold text-[#9D70FF] text-sm sm:text-base">
                  {user[1].toString()} POINTS
                </span>
              </div>
            );
          })
        )}
      </div>

      {/* Pinned Current Player (if they are not in top leaderboard) */}
      {currentPlayerEntry && (
        <div className="mt-4 p-3 sm:p-4 rounded-xl bg-[#352756] border-2 border-yellow-500 flex items-center justify-between">
          <div className="flex items-center gap-3 sm:gap-4">
            <span className="w-7 sm:w-8 h-7 sm:h-8 flex items-center justify-center bg-yellow-500 text-white rounded-full font-bold">
              #
              {fullLeaderboard.findIndex((entry) => entry[0] === walletAddress) + 1}
            </span>
            <span
              className="text-gray-300 font-medium text-sm sm:text-base cursor-pointer hover:text-white transition"
              onClick={() => copyAddress(currentPlayerEntry[0].toString())}
            >
              {formatAddress(currentPlayerEntry[0].toString())}
            </span>
          </div>
          <span className="font-bold text-[#9D70FF] text-sm sm:text-base">
            {currentPlayerEntry[1].toString()} POINTS
          </span>
        </div>
      )}

      {/* Show copy confirmation */}
      {copied && (
        <div className="fixed bottom-5 left-1/2 transform -translate-x-1/2 bg-[#9D70FF] text-white px-4 py-2 rounded-lg shadow-lg text-sm">
          Address copied!
        </div>
      )}
    </div>
  );
};

export default Leaderboard;
