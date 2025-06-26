import React, { useEffect, useState } from 'react';
import { useGameStore } from '../stores/gameStore';
import { Trophy } from 'lucide-react';
import { rewardUser } from '../utils/sudokuGenerator';
import { useWallet } from '@solana/wallet-adapter-react';

interface Notification {
  id: number;
  message: string;
}

const GameNotification: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const { status } = useGameStore();
  const {publicKey} = useWallet()

  useEffect(() => {
    if (status === 'completed') {
      const handleReward = async () => {
        try {
          if (publicKey) {
            await rewardUser(publicKey.toBase58(),5);
            addNotification('Congratulations! You completed the puzzle!');
          } else {
            addNotification('Wallet not connected. Cannot reward.');
          }
        } catch (err) {
          addNotification('Reward failed. Please try again.');
        }
      };
      handleReward();
    }
  }, [status]);

  const addNotification = (message: string) => {
    const id = Date.now();
    setNotifications(prev => [...prev, { id, message }]);

    // Remove notification after 5 seconds
    setTimeout(() => {
      setNotifications(prev => prev.filter(notification => notification.id !== id));
    }, 5000);
  };

  return (
    <div className="fixed top-20 right-4 z-50 flex flex-col gap-2">
      {notifications.map(notification => (
        <div
          key={notification.id}
          className="flex items-center gap-2 px-4 py-3 rounded-lg shadow-lg transform transition-all duration-300 animate-slide-in bg-green-100 text-green-800 border border-green-200"
        >
          <Trophy className="w-5 h-5" />
          <p className="text-sm font-medium">{notification.message}</p>
        </div>
      ))}
    </div>
  );
};

export default GameNotification;