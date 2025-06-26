import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Bird, Cloud, Settings, ChevronRight, Trophy, Coins, Info } from 'lucide-react';
import { Leaderboard } from './Leaderboard';
import { GameResult } from '../types';

interface GameHistory {
  games: GameData[];
}

interface GameData {
  id: string;
  score: number;
  timestamp: number;
  jumps: any[];
}

interface QueuedJump {
  timestamp: number;
  processed: boolean;
  scoreAtJump: number;
  multiplierAtJump: number;
}

interface GameState {
  isPlaying: boolean;
  isGameOver: boolean;
  birdPosition: number;
  pipes: Pipe[];
  score: number;
  showStartMessage: boolean;
  gameId?: string;
  jumps: JumpData[];
}

interface Pipe {
  x: number;
  gapY: number;
  passed: boolean;
}

const INITIAL_STATE: GameState = {
  isPlaying: false,
  isGameOver: false,
  birdPosition: 250,
  pipes: [],
  score: 0,
  showStartMessage: true,
  jumps: [],
};

const TOTAL_GAMES_KEY = 'flappyFuse_totalGames';
const TUTORIAL_SHOWN_KEY = 'flappyFuse_tutorialShown';
const GAME_DATA_KEY = 'flappyFuse_gameData';

// Game constants
const GRAVITY = 0.5;
const JUMP_FORCE = -8;
const PIPE_WIDTH = 60;
const PIPE_GAP = 150;
const BIRD_SIZE = 30;
const PIPE_SPACING = 300;
const GAME_SPEED = 3;
const PIPE_BUFFER = 1;

// Add pipe gradient cache
const pipeGradientCache = new Map<string, CanvasGradient>();

// Optimized pipe gradient creation
const getPipeGradient = (ctx: CanvasRenderingContext2D, x: number): CanvasGradient => {
  const key = Math.floor(x / 10) * 10; // Round to nearest 10 for caching
  if (pipeGradientCache.has(key.toString())) {
    return pipeGradientCache.get(key.toString())!;
  }

  const gradient = ctx.createLinearGradient(x, 0, x + PIPE_WIDTH, 0);
  gradient.addColorStop(0, '#228B22');
  gradient.addColorStop(1, '#32CD32');
  pipeGradientCache.set(key.toString(), gradient);
  return gradient;
};

interface JumpData {
  timestamp: number;
  scoreAtJump: number;
  multiplierAtJump: number;
}

interface GameProps {
  onGameOver: () => void;
}

export function Game({ onGameOver }: GameProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gameLoopRef = useRef<number>();
  const gameContainerRef = useRef<HTMLDivElement>(null);
  const hasEndedRef = useRef(false);
  const lastTimeRef = useRef(0);
  
  const [gameState, setGameState] = useState<GameState>(INITIAL_STATE);
  const [velocity, setVelocity] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [hasStartedMoving, setHasStartedMoving] = useState(false);
  const [totalGamesPlayed, setTotalGamesPlayed] = useState<number>(0);
  const [showTutorial, setShowTutorial] = useState<boolean>(false);
  const [showLeaderboard, setShowLeaderboard] = useState(false);

  // Add window dimensions state
  const [windowDimensions, setWindowDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  // Add resize handler
  useEffect(() => {
    const handleResize = () => {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Initialize game
  const initGame = useCallback(() => {
    // Start with two pipes for smoother beginning
    const initialPipes = [
      {
        x: 300,
        gapY: Math.random() * (250 - PIPE_GAP) + PIPE_GAP,
        passed: false
      },
      {
        x: 500,
        gapY: Math.random() * (250 - PIPE_GAP) + PIPE_GAP,
        passed: false
      }
    ];

    setGameState({
      ...INITIAL_STATE,
      isPlaying: true,
      isGameOver: false,
      showStartMessage: false,
      pipes: initialPipes,
      birdPosition: 250,
      score: 0,
      gameId: `game_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    });
    setVelocity(0);
    hasEndedRef.current = false;
    lastTimeRef.current = performance.now();
  }, []);

  const handleEndGame = useCallback(async () => {
    if (!gameState.gameId || hasEndedRef.current) {
      return;
    }

    hasEndedRef.current = true;

    try {
      const accounts = await window.ethereum.request({ method: 'eth_accounts' });
      const currentAccount = accounts[0];
      
      if (!currentAccount) {
        console.warn('No wallet connected');
        return;
      }

      // Save game data to local storage
      const gameData = localStorage.getItem(GAME_DATA_KEY);
      const history: Record<string, GameHistory> = gameData ? JSON.parse(gameData) : {};
      
      if (!history[currentAccount]) {
        history[currentAccount] = { games: [] };
      }
      
      // Save the final score before resetting game state
      const finalScore = gameState.score;
      
      history[currentAccount].games.push({
        id: gameState.gameId,
        score: finalScore,
        timestamp: Date.now(),
        jumps: gameState.jumps
      });

      localStorage.setItem(GAME_DATA_KEY, JSON.stringify(history));

      // Update total games played for this wallet
      const totalGames = history[currentAccount].games.length;
      setTotalGamesPlayed(totalGames);

      // Reset game state but keep the final score
      setGameState(prev => ({
        ...INITIAL_STATE,
        isGameOver: true,
        showStartMessage: false,
        score: finalScore // Keep the final score
      }));
      setVelocity(0);
      setError(null);
    } catch (err) {
      console.error('Error ending game:', err);
      setError('Failed to save game data');
    }
  }, [gameState.gameId, gameState.score, gameState.jumps]);

  const handleJump = useCallback(() => {
    if (!gameState.isPlaying) {
      initGame();
      return;
    }
    setVelocity(JUMP_FORCE);
    
    // Record jump data
    setGameState(prev => ({
      ...prev,
      jumps: [
        ...prev.jumps,
        {
          timestamp: Date.now(),
          scoreAtJump: prev.score,
          multiplierAtJump: 1 // You can implement multiplier logic if needed
        }
      ]
    }));
  }, [gameState.isPlaying, initGame]);

  // Optimized game loop with fixed timestep
  const gameLoop = useCallback((timestamp: number) => {
    if (!gameState.isPlaying) return;

    const deltaTime = timestamp - lastTimeRef.current;
    lastTimeRef.current = timestamp;

    // Skip frame if deltaTime is too large (tab was inactive)
    if (deltaTime > 100) {
      gameLoopRef.current = requestAnimationFrame(gameLoop);
      return;
    }

    setGameState(prev => {
      // Update bird position
      const newBirdPosition = prev.birdPosition + velocity;
      const newVelocity = velocity + GRAVITY;

      // Update pipes - optimized with single map and filter
      let newPipes = prev.pipes.map(pipe => ({
        ...pipe,
        x: pipe.x - GAME_SPEED
      })).filter(pipe => pipe.x > -PIPE_WIDTH - 50); // Increased buffer for smoother removal

      // Add new pipe when needed - optimized timing
      const lastPipe = newPipes[newPipes.length - 1];
      if (!lastPipe || lastPipe.x < windowDimensions.width - PIPE_SPACING) {
        // Calculate next pipe position
        const nextX = lastPipe ? lastPipe.x + PIPE_SPACING : windowDimensions.width;
        newPipes.push({
          x: nextX,
          gapY: Math.random() * (windowDimensions.height - PIPE_GAP - 100) + 50, // Adjusted for full screen
          passed: false
        });
      }

      // Optimized score update
      let newScore = prev.score;
      const scoringPipes = newPipes.filter(pipe => 
        pipe.x + PIPE_WIDTH < 50 && !pipe.passed
      );
      
      if (scoringPipes.length > 0) {
        newScore += scoringPipes.length;
        newPipes = newPipes.map(pipe => 
          scoringPipes.includes(pipe) ? {...pipe, passed: true} : pipe
        );
      }

      // Clear old gradients from cache
      if (pipeGradientCache.size > 100) {
        pipeGradientCache.clear();
      }

      // Collision detection
      const birdRect = {
        x: 50,
        y: newBirdPosition,
        width: BIRD_SIZE,
        height: BIRD_SIZE
      };

      // Ground/ceiling collision with buffer
      const groundBuffer = 5; // Add a small buffer to prevent edge cases
      if (newBirdPosition <= groundBuffer || newBirdPosition >= windowDimensions.height - BIRD_SIZE - groundBuffer) {
        handleEndGame();
        return { ...prev, isGameOver: true, isPlaying: false };
      }

      // Pipe collision detection - improved accuracy with hitbox
      const hasCollision = newPipes.some(pipe => {
        // Skip pipes that are too far away
        if (pipe.x > 50 + BIRD_SIZE + 5 || pipe.x + PIPE_WIDTH < 50 - 5) return false;

        // Calculate pipe boundaries with a small buffer
        const topPipeBottom = pipe.gapY - PIPE_GAP / 2;
        const bottomPipeTop = pipe.gapY + PIPE_GAP / 2;

        // Create a smaller hitbox for the bird (80% of actual size)
        const birdHitbox = {
          x: birdRect.x + BIRD_SIZE * 0.1,
          y: birdRect.y + BIRD_SIZE * 0.1,
          width: BIRD_SIZE * 0.8,
          height: BIRD_SIZE * 0.8
        };

        // Check collision with top pipe
        if (birdHitbox.y < topPipeBottom) {
          return true;
        }

        // Check collision with bottom pipe
        if (birdHitbox.y + birdHitbox.height > bottomPipeTop) {
          return true;
        }

        return false;
      });

      if (hasCollision) {
        handleEndGame();
        return { ...prev, isGameOver: true, isPlaying: false };
      }

      return {
        ...prev,
        birdPosition: newBirdPosition,
        pipes: newPipes,
        score: newScore
      };
    });

    setVelocity(prev => prev + GRAVITY);
    gameLoopRef.current = requestAnimationFrame(gameLoop);
  }, [gameState.isPlaying, velocity, handleEndGame, windowDimensions]);

  // Optimized draw game function
  const drawGame = useCallback((ctx: CanvasRenderingContext2D) => {
    // Clear canvas
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    // Draw sky gradient
    const skyGradient = ctx.createLinearGradient(0, 0, 0, ctx.canvas.height);
    skyGradient.addColorStop(0, '#1e90ff');
    skyGradient.addColorStop(1, '#87ceeb');
    ctx.fillStyle = skyGradient;
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    // Draw clouds (reduced number for better performance)
    const drawCloud = (x: number, y: number, size: number) => {
      ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.arc(x + size * 0.8, y - size * 0.2, size * 0.8, 0, Math.PI * 2);
      ctx.arc(x + size * 1.6, y, size * 0.9, 0, Math.PI * 2);
      ctx.arc(x + size * 0.8, y + size * 0.2, size * 0.8, 0, Math.PI * 2);
      ctx.fill();
    };

    // Draw fewer clouds for better performance
    drawCloud(100, 80, 20);
    drawCloud(500, 60, 15);

    // Draw ground
    const groundGradient = ctx.createLinearGradient(0, ctx.canvas.height - 50, 0, ctx.canvas.height);
    groundGradient.addColorStop(0, '#90EE90');
    groundGradient.addColorStop(1, '#228B22');
    ctx.fillStyle = groundGradient;
    ctx.fillRect(0, ctx.canvas.height - 50, ctx.canvas.width, 50);

    // Draw pipes with optimized gradient
    gameState.pipes.forEach(pipe => {
      const gradient = getPipeGradient(ctx, pipe.x);
      
      // Top pipe
      ctx.fillStyle = gradient;
      ctx.fillRect(pipe.x, 0, PIPE_WIDTH, pipe.gapY - PIPE_GAP / 2);
      
      // Bottom pipe
      ctx.fillRect(
        pipe.x,
        pipe.gapY + PIPE_GAP / 2,
        PIPE_WIDTH,
        ctx.canvas.height - (pipe.gapY + PIPE_GAP / 2)
      );
    });

    // Draw bird
    const birdX = 50;
    const birdY = gameState.birdPosition;
    
    ctx.save();
    ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
    ctx.shadowBlur = 5;
    ctx.shadowOffsetY = 2;

    // Draw bird body
    ctx.beginPath();
    ctx.fillStyle = '#FFD700';
    ctx.arc(birdX + BIRD_SIZE/2, birdY + BIRD_SIZE/2, BIRD_SIZE/2, 0, Math.PI * 2);
    ctx.fill();

    // Draw wing
    ctx.beginPath();
    ctx.fillStyle = '#DAA520';
    ctx.ellipse(
      birdX + BIRD_SIZE/2,
      birdY + BIRD_SIZE/2,
      BIRD_SIZE/3,
      BIRD_SIZE/4,
      Math.PI/4,
      0,
      Math.PI * 2
    );
    ctx.fill();

    // Draw beak
    ctx.beginPath();
    ctx.fillStyle = '#FF8C00';
    ctx.moveTo(birdX + BIRD_SIZE, birdY + BIRD_SIZE/2);
    ctx.lineTo(birdX + BIRD_SIZE + BIRD_SIZE/3, birdY + BIRD_SIZE/2);
    ctx.lineTo(birdX + BIRD_SIZE, birdY + BIRD_SIZE/2 + BIRD_SIZE/6);
    ctx.fill();

    // Draw eye
    ctx.beginPath();
    ctx.fillStyle = '#000000';
    ctx.arc(birdX + BIRD_SIZE/1.5, birdY + BIRD_SIZE/3, BIRD_SIZE/8, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();

    // Draw score
    ctx.fillStyle = '#000000';
    ctx.font = 'bold 24px Arial';
    ctx.fillText(`Score: ${gameState.score}`, 10, 30);
  }, [gameState.birdPosition, gameState.pipes, gameState.score, windowDimensions]);
      
  // Start game loop when playing
  useEffect(() => {
    if (gameState.isPlaying) {
      lastTimeRef.current = performance.now();
      gameLoopRef.current = requestAnimationFrame(gameLoop);
    } else if (gameLoopRef.current) {
      cancelAnimationFrame(gameLoopRef.current);
    }
    return () => {
      if (gameLoopRef.current) {
        cancelAnimationFrame(gameLoopRef.current);
      }
    };
  }, [gameState.isPlaying, gameLoop]);

  // Handle keyboard events
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        e.preventDefault();
        handleJump();
      }
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleJump]);

  // Draw game on canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    drawGame(ctx);
  }, [drawGame]);

  // Check if tutorial was shown before
  useEffect(() => {
    const tutorialShown = localStorage.getItem(TUTORIAL_SHOWN_KEY);
    if (!tutorialShown) {
      setShowTutorial(true);
    }
  }, []);

  const CountdownDisplay = ({ countdown }: { countdown: number | null }) => {
    if (countdown === null) return null;
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="text-6xl font-bold text-white">{countdown}</div>
      </div>
    );
  };

  const handleCloseTutorial = () => {
    setShowTutorial(false);
    localStorage.setItem(TUTORIAL_SHOWN_KEY, 'true');
  };

  const GameOverScreen = () => {
    if (gameState.isGameOver) {
      return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-lg text-center">
            <h2 className="text-2xl font-bold text-black mb-4">Game Over!</h2>
            <p className="text-xl text-black mb-6">Final Score: {gameState.score}</p>
            <div className="flex gap-4 justify-center">
              <button
                onClick={initGame}
                className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition-colors"
              >
                Play Again
              </button>
              <button
                onClick={() => {
                  handleEndGame();
                  onGameOver();
                }}
                className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600 transition-colors"
              >
                Home
              </button>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  const toggleTutorial = () => {
    setShowTutorial(!showTutorial);
  };

  return (
    <div className="relative w-full h-screen overflow-hidden" ref={gameContainerRef}>
      <canvas
        ref={canvasRef}
        width={windowDimensions.width}
        height={windowDimensions.height}
        className="w-full h-full"
        onClick={handleJump}
      />
      
      {gameState.showStartMessage && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="text-center text-white">
            <h2 className="text-4xl font-bold mb-4">Flappy Bird</h2>
            <p className="text-xl mb-4">Click or press Space to start!</p>
            <div className="flex gap-4 justify-center">
              <button 
                onClick={toggleTutorial}
                className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 text-lg"
              >
                How to Play
              </button>
              <button 
                onClick={() => setShowLeaderboard(true)}
                className="bg-purple-500 text-white px-6 py-3 rounded-lg hover:bg-purple-600 text-lg"
              >
                View Leaderboard
              </button>
            </div>
          </div>
        </div>
      )}
      
      {showTutorial && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-md">
            <h2 className="text-3xl font-bold text-gray-800 text-center mb-4">How to Play</h2>
            <ul className="list-disc list-inside mb-4 space-y-2 text-lg text-gray-800">
              <li>Click or press Space to make the bird jump</li>
              <li>Avoid hitting the pipes and the ground</li>
              <li>Each pipe you pass gives you 1 point</li>
              <li>The game gets faster as you progress</li>
              <li>Try to get the highest score!</li>
            </ul>
            <button
              onClick={handleCloseTutorial}
              className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 w-full text-lg"
            >
              Got it!
            </button>
          </div>
        </div>
      )}

      <CountdownDisplay countdown={countdown} />
      <GameOverScreen />

      {error && (
        <div className="fixed bottom-4 right-4 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg text-lg">
          {error}
        </div>
      )}

      <div className="fixed top-4 right-4 flex gap-2">
        <button 
          onClick={() => setShowLeaderboard(!showLeaderboard)}
          className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 flex items-center text-lg"
        >
          <Trophy className="inline-block mr-2" />
          Leaderboard
        </button>
        <button 
          onClick={toggleTutorial}
          className="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 flex items-center text-lg"
        >
          <Info className="inline-block mr-2" />
          Help
        </button>
      </div>
      
      {showLeaderboard && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-3xl text-black font-bold">Leaderboard</h2>
              <button 
                onClick={() => setShowLeaderboard(false)} 
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ✕
              </button>
            </div>
            <Leaderboard />
            <div className="mt-4 text-center text-gray-600 text-lg">
              <p>Your total games played: {totalGamesPlayed}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}