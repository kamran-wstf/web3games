import React from 'react';
import { Play, Users, Trophy, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface GameCardProps {
  title: string;
  category: string;
  players: number;
  rating: number;
  earnings: string;
  image: string;
  link: string;
  isNew?: boolean;
  isTrending?: boolean;
  comingSoon?: boolean;
}

const GameCard: React.FC<GameCardProps> = ({
  title,
  category,
  players,
  rating,
  earnings,
  image,
  link,
  isNew,
  isTrending,
  comingSoon
}) => {
  const navigate = useNavigate();

  return (
    <div className="bg-slate-800/60 rounded-2xl overflow-hidden hover:bg-slate-800/80 transition-all duration-300 group hover:scale-105 border border-slate-700/50 hover:border-emerald-500/30">
      <div className="relative">
        <div className="aspect-video bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 flex items-center justify-center border-b border-slate-700">
          {image && (
            <img src={image} alt={title} className="object-cover w-full h-full" />
          )}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-6xl opacity-30">🎮</div>
          </div>
          {comingSoon && (
            <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
              <span className="text-white text-2xl font-bold">Coming Soon</span>
            </div>
          )}
        </div>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex space-x-2">
          {isNew && (
            <span className="bg-emerald-500 text-slate-900 text-xs px-2 py-1 rounded-full font-medium">
              NEW
            </span>
          )}
          {isTrending && (
            <span className="bg-cyan-500 text-slate-900 text-xs px-2 py-1 rounded-full font-medium">
              TRENDING
            </span>
          )}
        </div>

        {/* Play Button Overlay */}
        {!comingSoon && (
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <button className="bg-emerald-500/20 backdrop-blur-sm text-emerald-400 border border-emerald-400/50 rounded-full p-4 hover:bg-emerald-500/30 transition-all transform hover:scale-110">
              <Play className="w-8 h-8" />
            </button>
          </div>
        )}
      </div>

      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="text-white font-bold text-lg mb-1">{title}</h3>
            <p className="text-slate-400 text-sm">{category}</p>
          </div>
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="text-white font-medium">{rating}</span>
          </div>
        </div>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-1">
            <Users className="w-4 h-4 text-slate-400" />
            <span className="text-slate-300 text-sm">{players.toLocaleString()} players</span>
          </div>
          <div className="flex items-center space-x-1">
            <Trophy className="w-4 h-4 text-emerald-400" />
            <span className="text-emerald-400 font-medium text-sm">{earnings}</span>
          </div>
        </div>

        <button
          className="w-full bg-gradient-to-r from-emerald-500 to-cyan-500 text-slate-900 py-3 rounded-xl font-semibold hover:from-emerald-400 hover:to-cyan-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={() => !comingSoon && navigate(link)}
          disabled={!!comingSoon}
        >
          {comingSoon ? 'Coming Soon' : 'Play Now'}
        </button>
      </div>
    </div>
  );
};

export default GameCard;