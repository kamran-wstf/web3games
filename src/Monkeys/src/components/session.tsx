import { ArrowRight, Clock } from 'lucide-react';

interface SessionProps {
    native: number;
    keys: number;
}

function Session({ native, keys }: SessionProps) {
    return (
        <div className="min-h-screen bg-[#13111C] flex flex-col items-center justify-center p-4">
            {/* Header */}
            <div className="mb-8 text-center">
                <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-500 to-violet-500 bg-clip-text text-transparent mb-2">MONkeys</h1>
                <p className="text-gray-400">Master your typing skills and earn rewards</p>
            </div>

            {/* Main Card */}
            <div className="max-w-xl w-full bg-[#1C1A2E] rounded-2xl shadow-2xl overflow-hidden">
                {/* Status Section */}
                <div className="p-8 flex justify-between items-center border-b border-purple-900/30">
                    <div className="flex items-center space-x-2">
                        <div className="text-2xl font-bold text-white">{keys.toFixed(2)}</div>
                        <div className="text-sm text-gray-400">KEYS</div>
                    </div>
                    <div className="flex items-center space-x-2">
                        <div className="text-2xl font-bold text-white">{native.toFixed(2)}</div>
                        <div className="text-sm text-purple-400">MON</div>
                    </div>
                </div>

                {/* Error Message */}
                <div className="p-8 flex flex-col items-center">
                    <div className="bg-purple-500/10 p-4 rounded-full mb-4">
                        <Clock className="w-12 h-12 text-purple-500" />
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-3">Session Expired</h2>
                    <p className="text-gray-400 text-center max-w-md mb-8">
                        Your MONkeys session has timed out. Please visit our bot to get a new access token and continue earning rewards.
                    </p>

                    <button
                        onClick={() => window.open('https://t.me/Sidemonadbot', '_blank')}
                        className="w-full flex items-center justify-center gap-2 bg-purple-600 text-white py-4 px-6 rounded-lg hover:bg-purple-700 transition-colors text-lg font-semibold"
                    >
                        Get New Token
                        <ArrowRight className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Session;