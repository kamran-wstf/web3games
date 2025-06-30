import { Trophy, Clock, Zap } from 'lucide-react';
import { useState, useEffect } from 'react';
import GameResults from './GameResults';
import Leaderboard from './Leaderboard';
import useGameStore from '../store/gameStore';

interface WaitingPageProps {
    score?: number;
    wpm?: number;
}

export function WaitingPage({ }: WaitingPageProps) {

    const [reloadLeaderboard, setReloadLeaderboard] = useState(false);

    const messages = [
        "Calculating your results...",
        "Analyzing your performance...",
        "Crunching the numbers...",
        "Almost there...",
        "Preparing your stats..."
    ];

    const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
    const [progress, setProgress] = useState(0);
    const [showResults, setShowResults] = useState(false);

    useEffect(() => {
        const messageInterval = setInterval(() => {
            setCurrentMessageIndex((prevIndex) => (prevIndex + 1) % messages.length);
        }, 1000);

        // Reach 100% in 3 seconds
        const startTime = Date.now();
        const duration = 3000; // 3 seconds

        const progressInterval = setInterval(() => {
            const elapsed = Date.now() - startTime;
            const newProgress = Math.min(100, (elapsed / duration) * 100);

            setProgress(newProgress);

            if (newProgress >= 100) {
                clearInterval(progressInterval);
                setTimeout(() => {
                    setShowResults(true);
                }, 500); // Small delay after reaching 100%
            }
        }, 50); // Update frequently for smooth animation

        return () => {
            clearInterval(messageInterval);
            clearInterval(progressInterval);
        };
    }, []);

    if (showResults) {
        return (
            <div className="flex flex-col md:flex-row gap-6 items-start max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <GameResults onClaim={() => setReloadLeaderboard(true)} />
            </div>
        );


    }

    return (
        <div className="min-h-full lg:w-full m-4 p-10 flex items-center justify-center">
            <div className="text-center space-y-8 max-w-md">
                <div className="relative mx-auto w-24 h-24 flex items-center justify-center">
                    <div className="absolute inset-0 animate-ping bg-[#00ff88] rounded-full opacity-20" />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#00ff88]/30 to-[#4ade80]/30 rounded-full animate-pulse" />
                    <div className="relative bg-gradient-to-r from-[#00ff88] to-[#4ade80] p-6 rounded-full inline-block shadow-xl shadow-green-500/50">
                        <Trophy className="w-12 h-12 text-black" />
                    </div>
                </div>

                <div className="space-y-4">
                    <h2 className="text-4xl font-bold bg-gradient-to-r from-[#00ff88] to-[#4ade80] bg-clip-text text-transparent">
                        Calculating Results
                    </h2>
                    <p className="text-gray-200 text-lg min-h-[3.5rem] transition-all duration-500">
                        {messages[currentMessageIndex]}
                    </p>
                </div>

                {/* Progress bar instead of score/wpm */}
                <div className="mt-8 space-y-6">
                    <div className="w-full bg-gradient-to-r from-[#1a2e1a] to-[#2d4a2d] rounded-full h-4 overflow-hidden backdrop-blur-sm shadow-xl border border-green-700/30">
                        <div
                            className="bg-gradient-to-r from-[#00ff88] to-[#4ade80] h-full rounded-full transition-all duration-300 ease-out shadow-lg shadow-green-500/50"
                            style={{ width: `${progress}%` }}
                        />
                    </div>

                    <div className="flex justify-between text-gray-200 px-1">
                        <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            <span>Processing</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <span>{Math.round(progress)}%</span>
                            <Zap className="w-4 h-4 text-[#4ade80]" />
                        </div>
                    </div>
                </div>

                <div className="flex justify-center gap-2 mt-8">
                    {[0, 1, 2].map((i) => (
                        <div
                            key={i}
                            className="w-3 h-3 bg-gradient-to-r from-[#00ff88] to-[#4ade80] rounded-full animate-bounce shadow-lg shadow-green-500/50"
                            style={{ animationDelay: `${i * 150}ms` }}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}