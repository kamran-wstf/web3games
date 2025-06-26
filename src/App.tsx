import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import GameGrid from './components/GameGrid';
import Stats from './components/Stats';
import Footer from './components/Footer';
import OtherGame from './OtherGame';
import MONkeys from './Monkeys/src/App';
import Flappy from './Flappy/src/App';
import Sudoku from './Sudoku/src/App';


function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <div className="min-h-screen bg-slate-900">
            <Header />
            <Hero />
            <GameGrid />
            <Stats />
            <Footer />
          </div>
        } />
        <Route path="/sudoku/*" element={<Sudoku />} />
      </Routes>
    </Router>
  );
}

export default App;