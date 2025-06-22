import React from 'react';
import { Play, TrendingUp, Shield, Zap } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width=%2260%22%20height=%2260%22%20viewBox=%220%200%2060%2060%22%20xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg%20fill=%22none%22%20fill-rule=%22evenodd%22%3E%3Cg%20fill=%22%2310b981%22%20fill-opacity=%220.1%22%3E%3Ccircle%20cx=%2230%22%20cy=%2230%22%20r=%223%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6">
              Play, Earn &
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
                Own Your Gaming
              </span>
            </h1>
            <p className="text-xl text-slate-300 mb-8 max-w-2xl">
              Enter the future of gaming where every achievement matters. Play blockchain games, 
              earn real rewards, and truly own your in-game assets as NFTs.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12">
              <button className="bg-gradient-to-r from-emerald-500 to-cyan-500 text-slate-900 px-8 py-4 rounded-xl flex items-center justify-center space-x-2 hover:from-emerald-400 hover:to-cyan-400 transition-all transform hover:scale-105 font-semibold">
                <Play className="w-5 h-5" />
                <span>Start Playing</span>
              </button>
              <button className="border border-emerald-500/50 text-emerald-400 px-8 py-4 rounded-xl hover:bg-emerald-500/10 transition-all">
                Learn More
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 text-center lg:text-left">
              <div>
                <div className="text-3xl font-bold text-emerald-400 mb-1">50K+</div>
                <div className="text-slate-400 text-sm">Active Players</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-emerald-400 mb-1">$2.5M</div>
                <div className="text-slate-400 text-sm">Earned by Players</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-emerald-400 mb-1">100+</div>
                <div className="text-slate-400 text-sm">Games Available</div>
              </div>
            </div>
          </div>

          <div className="relative">
            {/* Gaming mockup/illustration */}
            <div className="bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 rounded-3xl p-8 backdrop-blur-sm border border-emerald-400/20">
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-slate-800/80 rounded-xl p-4 flex items-center space-x-3 border border-slate-700">
                  <Shield className="w-8 h-8 text-emerald-400" />
                  <div>
                    <div className="text-white font-medium">Secure</div>
                    <div className="text-slate-400 text-sm">Blockchain</div>
                  </div>
                </div>
                <div className="bg-slate-800/80 rounded-xl p-4 flex items-center space-x-3 border border-slate-700">
                  <TrendingUp className="w-8 h-8 text-cyan-400" />
                  <div>
                    <div className="text-white font-medium">Earn</div>
                    <div className="text-slate-400 text-sm">Real Rewards</div>
                  </div>
                </div>
                <div className="bg-slate-800/80 rounded-xl p-4 flex items-center space-x-3 border border-slate-700">
                  <Zap className="w-8 h-8 text-yellow-400" />
                  <div>
                    <div className="text-white font-medium">Fast</div>
                    <div className="text-slate-400 text-sm">Gameplay</div>
                  </div>
                </div>
                <div className="bg-slate-800/80 rounded-xl p-4 flex items-center space-x-3 border border-slate-700">
                  <Play className="w-8 h-8 text-emerald-400" />
                  <div>
                    <div className="text-white font-medium">Play</div>
                    <div className="text-slate-400 text-sm">& Compete</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-2xl p-6 text-center">
                <div className="text-slate-900 text-2xl font-bold mb-2">Join the Revolution</div>
                <div className="text-slate-800">Start earning while gaming today</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;