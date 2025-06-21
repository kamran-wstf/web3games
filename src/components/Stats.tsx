import React from 'react';
import { TrendingUp, Users, Trophy, Coins } from 'lucide-react';

const Stats = () => {
  const stats = [
    {
      icon: Users,
      value: "250K+",
      label: "Active Players",
      description: "Join our growing community",
      color: "text-blue-400"
    },
    {
      icon: Coins,
      value: "$5.2M",
      label: "Total Earnings",
      description: "Distributed to players",
      color: "text-green-400"
    },
    {
      icon: Trophy,
      value: "150+",
      label: "Games Available",
      description: "And growing every day",
      color: "text-yellow-400"
    },
    {
      icon: TrendingUp,
      value: "98%",
      label: "Uptime",
      description: "Reliable gaming experience",
      color: "text-purple-400"
    }
  ];

  return (
    <section className="bg-gray-800/50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">Platform Statistics</h2>
          <p className="text-gray-400 text-lg">
            See why players choose GameXChain for blockchain gaming
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-gray-800/80 rounded-2xl p-8 text-center hover:bg-gray-800 transition-all border border-gray-700/50">
              <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gray-700/50 mb-6 ${stat.color}`}>
                <stat.icon className="w-8 h-8" />
              </div>
              <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
              <div className="text-lg font-medium text-gray-300 mb-2">{stat.label}</div>
              <div className="text-gray-400 text-sm">{stat.description}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;