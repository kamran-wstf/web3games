import React from 'react';
import { Search, Wallet, User, Menu } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-gray-900/90 backdrop-blur-md border-b border-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">GX</span>
            </div>
            <span className="text-white font-bold text-xl">GameXChain</span>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-gray-300 hover:text-white transition-colors">Games</a>
            <a href="#" className="text-gray-300 hover:text-white transition-colors">Marketplace</a>
            <a href="#" className="text-gray-300 hover:text-white transition-colors">Tournaments</a>
            <a href="#" className="text-gray-300 hover:text-white transition-colors">Earn</a>
          </nav>

          {/* Search and Actions */}
          <div className="flex items-center space-x-4">
            <div className="hidden sm:flex items-center space-x-2 bg-gray-800 rounded-lg px-3 py-2">
              <Search className="w-4 h-4 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search games..." 
                className="bg-transparent text-white placeholder-gray-400 border-none outline-none w-40"
              />
            </div>
            
            <button className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:from-purple-600 hover:to-blue-600 transition-all">
              <Wallet className="w-4 h-4" />
              <span className="hidden sm:inline">Connect</span>
            </button>

            <button className="md:hidden text-gray-300 hover:text-white">
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;