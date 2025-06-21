import React from 'react';
import { Play, Users, Trophy, Star } from 'lucide-react';

interface GameCardProps {
  title: string;
  category: string;
  players: number;
  rating: number;
  earnings: string;
  image: string;
  isNew?: boolean;
  isTrending?: boolean;
}

const GameCard: React.FC<GameCardProps> = ({
  title,
  category,
  players,
  rating,
  earnings,
  image,
  isNew,
  isTrending
}) => {
  return (
    <div className="bg-gray-800/50 rounded-2xl overflow-hidden hover:bg-gray-800/70 transition-all duration-300 group hover:scale-105 border border-gray-700/50">
      <div className="relative">
        <div className="aspect-video bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center">
          <div className="text-6xl opacity-20">🎮</div>
        </div>
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex space-x-2">
          {isNew && (
            <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full font-medium">
              NEW
            </span>
          )}
          {isTrending && (
            <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded-full font-medium">
              TRENDING
            </span>
          )}
        </div>

        {/* Play Button Overlay */}
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <button className="bg-white/20 backdrop-blur-sm text-white rounded-full p-4 hover:bg-white/30 transition-all transform hover:scale-110">
            <Play className="w-8 h-8" />
          </button>
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="text-white font-bold text-lg mb-1">{title}</h3>
            <p className="text-gray-400 text-sm">{category}</p>
          </div>
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="text-white font-medium">{rating}</span>
          </div>
        </div>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-1">
            <Users className="w-4 h-4 text-gray-400" />
            <span className="text-gray-300 text-sm">{players.toLocaleString()} players</span>
          </div>
          <div className="flex items-center space-x-1">
            <Trophy className="w-4 h-4 text-green-400" />
            <span className="text-green-400 font-medium text-sm">{earnings}</span>
          </div>
        </div>

        <button className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white py-3 rounded-xl font-medium hover:from-purple-600 hover:to-blue-600 transition-all">
          Play Now
        </button>
      </div>
    </div>
  );
};

export default GameCard;