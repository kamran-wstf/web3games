import React from 'react';
import { Search, Wallet, User, Menu } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-slate-900/95 backdrop-blur-md border-b border-slate-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-lg flex items-center justify-center">
              <span className="text-slate-900 font-bold text-sm">GX</span>
            </div>
            <span className="text-white font-bold text-xl">GameXChain</span>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-slate-300 hover:text-emerald-400 transition-colors">Games</a>
            <a href="#" className="text-slate-300 hover:text-emerald-400 transition-colors">Marketplace</a>
            <a href="#" className="text-slate-300 hover:text-emerald-400 transition-colors">Tournaments</a>
            <a href="#" className="text-slate-300 hover:text-emerald-400 transition-colors">Earn</a>
          </nav>

          {/* Search and Actions */}
          <div className="flex items-center space-x-4">
            <div className="hidden sm:flex items-center space-x-2 bg-slate-800 rounded-lg px-3 py-2 border border-slate-700">
              <Search className="w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search games..." 
                className="bg-transparent text-white placeholder-slate-400 border-none outline-none w-40"
              />
            </div>
            
            <button className="bg-gradient-to-r from-emerald-500 to-cyan-500 text-slate-900 px-4 py-2 rounded-lg flex items-center space-x-2 hover:from-emerald-400 hover:to-cyan-400 transition-all font-semibold">
              <Wallet className="w-4 h-4" />
              <span className="hidden sm:inline">Connect</span>
            </button>

            <button className="md:hidden text-slate-300 hover:text-white">
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;