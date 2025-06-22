import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import GameGrid from './components/GameGrid';
import Stats from './components/Stats';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-slate-900">
      <Header />
      <Hero />
      <GameGrid />
      <Stats />
      <Footer />
    </div>
  );
}

export default App;