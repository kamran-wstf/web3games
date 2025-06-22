import React from 'react';
import { Twitter, Disc as Discord, Instagram as Telegram, Github } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-slate-900 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-8 h-8 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-lg flex items-center justify-center">
                <span className="text-slate-900 font-bold text-sm">GX</span>
              </div>
              <span className="text-white font-bold text-xl">GameXChain</span>
            </div>
            <p className="text-slate-400 mb-6 max-w-md">
              The leading blockchain gaming platform where players earn real rewards. 
              Join thousands of gamers already earning while playing their favorite games.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center text-slate-400 hover:text-emerald-400 hover:bg-slate-700 transition-all border border-slate-700">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center text-slate-400 hover:text-emerald-400 hover:bg-slate-700 transition-all border border-slate-700">
                <Discord className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center text-slate-400 hover:text-emerald-400 hover:bg-slate-700 transition-all border border-slate-700">
                <Telegram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center text-slate-400 hover:text-emerald-400 hover:bg-slate-700 transition-all border border-slate-700">
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Platform</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-slate-400 hover:text-emerald-400 transition-colors">Browse Games</a></li>
              <li><a href="#" className="text-slate-400 hover:text-emerald-400 transition-colors">Marketplace</a></li>
              <li><a href="#" className="text-slate-400 hover:text-emerald-400 transition-colors">Tournaments</a></li>
              <li><a href="#" className="text-slate-400 hover:text-emerald-400 transition-colors">Leaderboard</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-white font-semibold mb-4">Support</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-slate-400 hover:text-emerald-400 transition-colors">Help Center</a></li>
              <li><a href="#" className="text-slate-400 hover:text-emerald-400 transition-colors">Getting Started</a></li>
              <li><a href="#" className="text-slate-400 hover:text-emerald-400 transition-colors">API Docs</a></li>
              <li><a href="#" className="text-slate-400 hover:text-emerald-400 transition-colors">Contact Us</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-slate-400 text-sm">
            © 2025 GameXChain. All rights reserved.
          </div>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-slate-400 hover:text-emerald-400 text-sm transition-colors">Privacy Policy</a>
            <a href="#" className="text-slate-400 hover:text-emerald-400 text-sm transition-colors">Terms of Service</a>
            <a href="#" className="text-slate-400 hover:text-emerald-400 text-sm transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;