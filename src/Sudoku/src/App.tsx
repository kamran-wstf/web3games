import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import GamePage from './pages/GamePage';
import HowToPlayPage from './pages/HowToPlayPage';
import SettingsPage from './pages/SettingsPage';
import StatisticsPage from './pages/StatisticsPage';
import { useEffect, useState } from 'react';
import { useSettingsStore } from './stores/settingsStore';
import { SolanaWalletProvider } from '../../SolanaWalletProvider';
import { useWallet } from '@solana/wallet-adapter-react';

function Sudoku() {
  const { initializeSettings } = useSettingsStore();
  const { publicKey, connected } = useWallet();
  const [copied, setCopied] = useState(false);

  const formatAddress = (addr: string) => addr ? `${addr.slice(0, 4)}...${addr.slice(-4)}` : '';
  const handleCopy = () => {
    if (publicKey) {
      navigator.clipboard.writeText(publicKey.toBase58());
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    }
  };

  useEffect(() => {
    // Initialize settings from localStorage if available
    initializeSettings();
  }, [initializeSettings]);

  return (
    <SolanaWalletProvider>
      <div className="min-h-screen paper-bg">
        <header className="fixed top-0 left-0 right-0 z-50 p-4 bg-white/80 backdrop-blur-sm border-b flex justify-end">
          {connected && (
            <div className="px-4 py-2 bg-green-100 text-green-800 rounded-md font-mono shadow flex items-center gap-2">
              <span>{formatAddress(publicKey?.toBase58() || '')}</span>
              <button
                onClick={handleCopy}
                className="ml-2 px-2 py-1 text-xs bg-green-200 rounded hover:bg-green-300 focus:outline-none"
                title="Copy address"
              >
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
          )}
        </header>
        <main className="pt-16">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/game" element={<GamePage />} />
            <Route path="/how-to-play" element={<HowToPlayPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/statistics" element={<StatisticsPage />} />
          </Routes>
        </main>
      </div>
    </SolanaWalletProvider>
  );
}

export default Sudoku;