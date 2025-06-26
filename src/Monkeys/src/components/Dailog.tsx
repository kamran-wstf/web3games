import { Sparkles } from 'lucide-react';

interface DialogProps {
    isOpen: boolean;
    onClose: () => void;
}

export function Dialog({ isOpen, onClose }: DialogProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-[#1F1B2E] rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6">
                    <div className="flex justify-end">
                        <button
                            onClick={onClose}
                            className="text-gray-400 hover:text-white transition-colors"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                        </button>
                    </div>
                    <div className="mt-2">
                        <h2 className="text-3xl font-bold mb-3 font-mono text-[#9D7FFF]">Welcome to Mon Keys</h2>
                        <p className="text-lg text-gray-300 mb-6">
                        ⛩️ Harness the power of the $KEYS. Farm the Monad Testnet. Ascend. ⛩️
                        </p>

                        <div className="space-y-4">
                            <h3 className="text-xl font-bold font-mono">How to Play:</h3>
                            <ul className="space-y-3">
                                {[
                                    'Type the sacred script with speed and precision.',
                                    'Your WPM and accuracy are tracked live',
                                    'Higher performance = bigger rewards, all your game performance goes onchain on Monad.',
                                    'Rise in the Council of Molandak (leaderboard)'
                                ].map((text, index) => (
                                    <li key={index} className="flex items-start gap-3">
                                        <div className="w-6 h-6 rounded-full bg-[#7B5AFF] flex items-center justify-center font-mono text-white text-sm">
                                            {index + 1}
                                        </div>
                                        <p className="text-gray-300 text-sm mt-0.5">{text}</p>
                                    </li>
                                ))}
                            </ul>

                            <div className="bg-[#1F1B2E] rounded-lg p-4 mt-6">
                                <h4 className="text-lg font-bold mb-3 flex items-center gap-2">
                                    <Sparkles className="text-yellow-400" size={16} />
                                    Random Point Blessings:
                                </h4>
                                <ul className="space-y-2 text-sm">
                                    <li className="flex items-center gap-2">
                                        <span className="text-yellow-400">✨ </span> Nail perfect words in a row → 2x
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <span className="text-purple-400">⚡️ </span> Type at ultra speed → 3x
                                    </li>   
                                    <li className="flex items-center gap-2">
                                        <span className="text-blue-400">🎯  </span> Flawless accuracy → 4x
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <span className="text-green-400">🌀 </span> Only the worthy shall ascend. Gmonad. <span className="text-gray-400">🌀</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}