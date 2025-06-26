import { Coins, KeyRound, ExternalLink } from 'lucide-react';
import useGameStore from '../store/gameStore';

export default function Landing() {
    const { nativeBalance, balance } = useGameStore();
    const faucetBotUrl = "https://t.me/Sidemonadbot";
    // Hardcoded balances – replace with dynamic values as needed.
    const myNative = `${Number(nativeBalance).toFixed(2)} MON`;
    const sdtBalance = `${Number(balance).toFixed(2)} KEYS`;

    return (
        <div className="min-h-90 bg-gradient-to-b from-purple-950 to-black text-white">
            <div className="container mx-auto px-4 py-16">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="flex justify-center mb-6">
                        <KeyRound className="w-16 h-16 text-purple-400" />
                    </div>
                    <h1 className="text-5xl font-bold mb-4 text-purple-300">Insufficient Balance</h1>
                    <p className="text-xl text-gray-300 mb-8">
                        Your Balance is empty. The Monad awaits your tribute.
                    </p>

                    <div className="bg-purple-900/50 rounded-lg p-8 backdrop-blur-sm mb-12">
                        <div className="flex justify-around items-center gap-6 mb-6">
                            <div className="flex flex-col items-center">
                                <Coins className="w-8 h-8 text-purple-400" />
                                <span className="text-2xl font-mono">{myNative}</span>
                                <p className="text-gray-300 text-sm">MON</p>
                            </div>
                            <div className="flex flex-col items-center">
                                <Coins className="w-8 h-8 text-purple-400" />
                                <span className="text-2xl font-mono">{sdtBalance}</span>
                                <p className="text-gray-300 text-sm">KEYS</p>
                            </div>
                        </div>
                        <p className="text-gray-300 mb-8">
                            <span className="font-bold">🔺 Minimum Balance Required: 50 KEYS  0.4 MON</span>
                        </p>
                        <a
                            href={faucetBotUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 bg-purple-500 hover:bg-purple-600 text-white px-8 py-4 rounded-lg font-semibold transition-colors"
                        >
                            Buy Tokens
                            <ExternalLink className="w-5 h-5" />
                        </a>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8 text-left">
                        <div className="bg-purple-900/30 p-6 rounded-lg">
                            <h3 className="text-xl font-semibold mb-3 text-purple-300">What are tokens used for?</h3>
                            <p className="text-gray-300">
                                Tokens are in used game or onchain interations on the Monad Testnet.
                            </p>
                        </div>
                        <div className="bg-purple-900/30 p-6 rounded-lg">
                            <h3 className="text-xl font-semibold mb-3 text-purple-300">How to get tokens?</h3>
                            <p className="text-gray-300">
                                Visit our Bot to Buy Keys. <br />
                                <a href="https://t.me/Sidemonadbot" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-purple-500">@Sidemonadbot</a> on Telegram
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
