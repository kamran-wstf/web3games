import { useEffect, useState } from "react";
import { Gamepad2, Zap, Target, Sparkles } from "lucide-react";

export function LoadGame() {
    const messages = [
        "Fetching Balances from Molandak..",
        "Paying Chog for KEYS...",
        "Pulling out a contract for Keone..",
        "Sending Contract to Keone through Mouch..",
        "Waiting for Apprroval from JohnWRich Kid.."
    ];

    const [message, setMessage] = useState(messages[0]);

    useEffect(() => {
        const interval = setInterval(() => {
            const randomIndex = Math.floor(Math.random() * messages.length);
            setMessage(messages[randomIndex]);
        }, 2000); // Change every 2 seconds

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="min-h-full text-white flex items-center justify-center p-4">
            <div className="bg-[#1F1B2E] rounded-3xl p-8 md:p-12 max-w-3xl w-full shadow-2xl backdrop-blur-sm bg-opacity-90">
                <div className="flex items-center justify-center gap-4 mb-12 animate-[pulse-glow_3s_ease-in-out_infinite]">
                    <Gamepad2 className="w-12 h-12 text-[#8B5CF6]" />
                    <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#8B5CF6] to-[#EC4899] bg-clip-text text-transparent">
                        Monad keys
                    </h1>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                    <div className="flex flex-col items-center text-center">
                        <div className="feature-icon bg-[#2D2640] p-4 rounded-2xl mb-4">
                            <Zap className="w-8 h-8 text-[#8B5CF6]" />
                        </div>
                        <h2 className="text-xl font-semibold text-[#8B5CF6]">Fast-Paced</h2>
                    </div>

                    <div className="flex flex-col items-center text-center">
                        <div className="feature-icon bg-[#2D2640] p-4 rounded-2xl mb-4">
                            <Target className="w-8 h-8 text-[#8B5CF6]" />
                        </div>
                        <h2 className="text-xl font-semibold text-[#8B5CF6]">Test Your Speed</h2>
                    </div>

                    <div className="flex flex-col items-center text-center">
                        <div className="feature-icon bg-[#2D2640] p-4 rounded-2xl mb-4">
                            <Sparkles className="w-8 h-8 text-[#8B5CF6]" />
                        </div>
                        <h2 className="text-xl font-semibold text-[#8B5CF6]">Earn Points</h2>
                    </div>
                </div>

                <div className="text-center space-y-4">
                    <p className="text-2xl text-[#8B5CF6] loading-dots">
                        {message}
                    </p>
                    <div className="flex justify-center items-center gap-2 mt-4">
                        <div className="dot"></div>
                        <div className="dot"></div>
                        <div className="dot"></div>
                    </div>
                    <p className="text-gray-400">
                        Get ready to test your clicking speed!
                    </p>
                </div>

                <div className="mt-12 text-center text-sm text-gray-500">
                    © 2025 SideBot. All rights reserved.
                </div>
            </div>
        </div>
    );
}
