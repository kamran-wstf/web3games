import React from 'react';
import { Play, TrendingUp, Shield, Zap } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width=%2260%22%20height=%2260%22%20viewBox=%220%200%2060%2060%22%20xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg%20fill=%22none%22%20fill-rule=%22evenodd%22%3E%3Cg%20fill=%22%239C92AC%22%20fill-opacity=%220.05%22%3E%3Ccircle%20cx=%2230%22%20cy=%2230%22%20r=%223%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6">
              Play, Earn &
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
                Own Your Gaming
              </span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl">
              Enter the future of gaming where every achievement matters. Play blockchain games, 
              earn real rewards, and truly own your in-game assets as NFTs.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12">
              <button className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-8 py-4 rounded-xl flex items-center justify-center space-x-2 hover:from-purple-600 hover:to-blue-600 transition-all transform hover:scale-105">
                <Play className="w-5 h-5" />
                <span className="font-semibold">Start Playing</span>
              </button>
              <button className="border border-gray-600 text-white px-8 py-4 rounded-xl hover:bg-gray-800 transition-all">
                Learn More
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 text-center lg:text-left">
              <div>
                <div className="text-3xl font-bold text-white mb-1">50K+</div>
                <div className="text-gray-400 text-sm">Active Players</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white mb-1">$2.5M</div>
                <div className="text-gray-400 text-sm">Earned by Players</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white mb-1">100+</div>
                <div className="text-gray-400 text-sm">Games Available</div>
              </div>
            </div>
          </div>

          <div className="relative">
            {/* Gaming mockup/illustration */}
            <div className="bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-3xl p-8 backdrop-blur-sm border border-white/10">
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-800/50 rounded-xl p-4 flex items-center space-x-3">
                  <Shield className="w-8 h-8 text-green-400" />
                  <div>
                    <div className="text-white font-medium">Secure</div>
                    <div className="text-gray-400 text-sm">Blockchain</div>
                  </div>
                </div>
                <div className="bg-gray-800/50 rounded-xl p-4 flex items-center space-x-3">
                  <TrendingUp className="w-8 h-8 text-blue-400" />
                  <div>
                    <div className="text-white font-medium">Earn</div>
                    <div className="text-gray-400 text-sm">Real Rewards</div>
                  </div>
                </div>
                <div className="bg-gray-800/50 rounded-xl p-4 flex items-center space-x-3">
                  <Zap className="w-8 h-8 text-yellow-400" />
                  <div>
                    <div className="text-white font-medium">Fast</div>
                    <div className="text-gray-400 text-sm">Gameplay</div>
                  </div>
                </div>
                <div className="bg-gray-800/50 rounded-xl p-4 flex items-center space-x-3">
                  <Play className="w-8 h-8 text-purple-400" />
                  <div>
                    <div className="text-white font-medium">Play</div>
                    <div className="text-gray-400 text-sm">& Compete</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl p-6 text-center">
                <div className="text-white text-2xl font-bold mb-2">Join the Revolution</div>
                <div className="text-purple-100">Start earning while gaming today</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;