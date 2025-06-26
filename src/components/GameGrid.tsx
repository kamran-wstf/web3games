import React, { useState } from 'react';
import { Filter, Search } from 'lucide-react';
import GameCard from './GameCard';

const games = [
  {
    title: "Sudoku",
    category: "Mind",
    players: 15420,
    rating: 4.2,
    earnings: "$50-200/day",
    image: "https://res.cloudinary.com/dovram6cb/image/upload/v1750949138/Screenshot_2025-06-22_141023_v55w4t.png",
    link: '/sudoku',
    isNew: true,
    isTrending: true
  },
  {
    title: "MOkeys",
    category: "Typing Game",
    players: 32100,
    rating: 4.6,
    link: '/monkey',
    earnings: "$30-150/day",
    image: "/api/placeholder/400/225",
    isTrending: true
  },
  {
    title: "Block Farm",
    category: "Simulation",
    players: 8750,
    link: '/monkey',
    rating: 4.4,
    earnings: "$20-80/day",
    image: "/api/placeholder/400/225",
    isNew: true
  },
  {
    title: "Chaincraft",
    category: "Strategy",
    link: '/monkey',
    players: 21300,
    rating: 4.7,
    earnings: "$40-120/day",
    image: "/api/placeholder/400/225"
  },
  {
    title: "Token Battles",
    category: "Action",
    link: '/monkey',
    players: 18900,
    rating: 4.5,
    earnings: "$35-100/day",
    image: "/api/placeholder/400/225",
    isTrending: true
  },
  {
    title: "Metaverse Tycoon",
    category: "Business",
    link: '/monkey',
    players: 12400,
    rating: 4.3,
    earnings: "$25-90/day",
    image: "/api/placeholder/400/225"
  }
];

const categories = ["All", "Action", "RPG", "Strategy", "Racing", "Simulation", "Business"];

const GameGrid = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredGames = games.filter(game => {
    const matchesCategory = selectedCategory === "All" || game.category === selectedCategory;
    const matchesSearch = game.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section className="bg-slate-900 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">Featured Games</h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Discover the most popular blockchain games and start earning while playing
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col lg:flex-row gap-6 mb-12">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search games..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-slate-800 text-white rounded-xl pl-12 pr-4 py-3 border border-slate-700 focus:border-emerald-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-xl font-medium transition-all ${selectedCategory === category
                  ? 'bg-gradient-to-r from-emerald-500 to-cyan-500 text-slate-900'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700'
                  }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Games Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredGames.map((game, index) => (
            <GameCard
              key={index}
              {...game}
              image={index === 0 ? game.image : ""}
              comingSoon={index !== 0}
              link={index === 0 ? game.link : "#"}
            />
          ))}
        </div>

        {filteredGames.length === 0 && (
          <div className="text-center py-12">
            <div className="text-slate-400 text-lg">No games found matching your criteria</div>
          </div>
        )}

        <div className="text-center mt-12">
          <button className="bg-slate-800 text-white px-8 py-3 rounded-xl hover:bg-slate-700 transition-all border border-slate-700 hover:border-emerald-500/50">
            Load More Games
          </button>
        </div>
      </div>
    </section>
  );
};

export default GameGrid;