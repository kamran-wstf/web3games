import React, { useState } from 'react';
import { Home } from './components/Home';
import { Game } from './components/Game';
import './App.css';
import { WagmiProvider } from 'wagmi';
import { config } from './config/wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

function Flappy() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [shouldReloadData, setShouldReloadData] = useState(false);

  const handleStartGame = () => {
    setIsPlaying(true);
    setShouldReloadData(false);
  };

  const handleGameOver = () => {
    setIsPlaying(false);
    setShouldReloadData(true);
  };

  const queryClient = new QueryClient();

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider   client={queryClient}>
      <div className="min-h-screen bg-gray-100">
      {!isPlaying ? (
        <Home onStartGame={handleStartGame} shouldReloadData={shouldReloadData} />
      ) : (
        <div className="container mx-auto p-4">
          <Game onGameOver={handleGameOver} />
        </div>
      )}
    </div>
    </QueryClientProvider>
    </WagmiProvider>
    );
}

export default Flappy;
