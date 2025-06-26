import { useState } from 'react';
import { Wallet, ArrowDownUp, X, Settings, ChevronDown, ExternalLink } from 'lucide-react';

interface Token {
    symbol: string;
    name: string;
    logo: string;
    balance: string;
}

export function TokenSwap() {
    const [isOpen, setIsOpen] = useState(false);
    const [fromToken, setFromToken] = useState<Token>({
        symbol: 'ETH',
        name: 'Ethereum',
        logo: 'https://images.unsplash.com/photo-1622790698141-94e30457a316?q=80&w=50&auto=format&fit=crop',
        balance: '1.245'
    });
    const [toToken, setToToken] = useState<Token>({
        symbol: 'USDC',
        name: 'USD Coin',
        logo: 'https://images.unsplash.com/photo-1621416894569-0f39ed31d247?q=80&w=50&auto=format&fit=crop',
        balance: '1,250.00'
    });
    const [fromAmount, setFromAmount] = useState('0.5');
    const [toAmount, setToAmount] = useState('750.00');

    const [showTokenList, setShowTokenList] = useState<'from' | 'to' | null>(null);

    const tokens: Token[] = [
        fromToken,
        toToken,
        {
            symbol: 'BTC',
            name: 'Bitcoin',
            logo: 'https://images.unsplash.com/photo-1543699565-003b8adda5fc?q=80&w=50&auto=format&fit=crop',
            balance: '0.056'
        },
        {
            symbol: 'MATIC',
            name: 'Polygon',
            logo: 'https://images.unsplash.com/photo-1622790698141-94e30457a316?q=80&w=50&auto=format&fit=crop&ixlib=rb-4.0.3',
            balance: '250.45'
        }
    ];

    const toggleDialog = () => {
        setIsOpen(!isOpen);
    };

    const swapTokens = () => {
        const temp = fromToken;
        setFromToken(toToken);
        setToToken(temp);

        const tempAmount = fromAmount;
        setFromAmount(toAmount);
        setToAmount(tempAmount);
    };

    const selectToken = (token: Token) => {
        if (showTokenList === 'from') {
            setFromToken(token);
        } else {
            setToToken(token);
        }
        setShowTokenList(null);
    };

    return (
        <>
            {/* Floating button */}
            <button
                onClick={toggleDialog}
                className="fixed bottom-6 right-6 bg-purple-600 hover:bg-purple-700 text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110 z-50"
            >
                <ArrowDownUp className="w-6 h-6" />
            </button>

            {/* Overlay */}
            {isOpen && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    {/* Dialog */}
                    <div
                        className="bg-purple-900 rounded-xl shadow-2xl w-full max-w-md overflow-hidden relative animate-fadeIn"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Header */}
                        <div className="flex justify-between items-center p-4 border-b border-purple-800">
                            <h2 className="text-xl font-bold text-white">Swap Tokens</h2>
                            <div className="flex gap-3">
                                <button className="text-purple-300 hover:text-white">
                                    <Settings className="w-5 h-5" />
                                </button>
                                <button
                                    onClick={toggleDialog}
                                    className="text-purple-300 hover:text-white"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                        </div>

                        {/* Main content */}
                        <div className="p-4">
                            {/* From token */}
                            <div className="bg-purple-800/50 rounded-xl p-4 mb-2">
                                <div className="flex justify-between mb-2">
                                    <span className="text-purple-300 text-sm">From</span>
                                    <span className="text-purple-300 text-sm">Balance: {fromToken.balance} {fromToken.symbol}</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <button
                                        className="flex items-center gap-2 bg-purple-700/70 hover:bg-purple-700 rounded-lg px-3 py-2 transition-colors"
                                        onClick={() => setShowTokenList('from')}
                                    >
                                        <img src={fromToken.logo} alt={fromToken.symbol} className="w-6 h-6 rounded-full" />
                                        <span className="text-white font-medium">{fromToken.symbol}</span>
                                        <ChevronDown className="w-4 h-4 text-purple-300" />
                                    </button>
                                    <input
                                        type="text"
                                        value={fromAmount}
                                        onChange={(e) => setFromAmount(e.target.value)}
                                        className="bg-transparent text-white text-xl font-bold flex-1 text-right focus:outline-none"
                                        placeholder="0.0"
                                    />
                                </div>
                                <div className="flex justify-end mt-1">
                                    <span className="text-purple-300 text-sm">≈ $750.00</span>
                                </div>
                            </div>

                            {/* Swap button */}
                            <div className="flex justify-center -my-3 relative z-10">
                                <button
                                    onClick={swapTokens}
                                    className="bg-purple-700 hover:bg-purple-600 p-2 rounded-lg shadow-lg transition-colors"
                                >
                                    <ArrowDownUp className="w-5 h-5 text-white" />
                                </button>
                            </div>

                            {/* To token */}
                            <div className="bg-purple-800/50 rounded-xl p-4 mt-2">
                                <div className="flex justify-between mb-2">
                                    <span className="text-purple-300 text-sm">To</span>
                                    <span className="text-purple-300 text-sm">Balance: {toToken.balance} {toToken.symbol}</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <button
                                        className="flex items-center gap-2 bg-purple-700/70 hover:bg-purple-700 rounded-lg px-3 py-2 transition-colors"
                                        onClick={() => setShowTokenList('to')}
                                    >
                                        <img src={toToken.logo} alt={toToken.symbol} className="w-6 h-6 rounded-full" />
                                        <span className="text-white font-medium">{toToken.symbol}</span>
                                        <ChevronDown className="w-4 h-4 text-purple-300" />
                                    </button>
                                    <input
                                        type="text"
                                        value={toAmount}
                                        onChange={(e) => setToAmount(e.target.value)}
                                        className="bg-transparent text-white text-xl font-bold flex-1 text-right focus:outline-none"
                                        placeholder="0.0"
                                    />
                                </div>
                                <div className="flex justify-end mt-1">
                                    <span className="text-purple-300 text-sm">≈ $750.00</span>
                                </div>
                            </div>

                            {/* Exchange rate */}
                            <div className="flex justify-between items-center mt-4 text-sm text-purple-300">
                                <span>Exchange Rate</span>
                                <span>1 {fromToken.symbol} ≈ 1,500 {toToken.symbol}</span>
                            </div>

                            {/* Slippage */}
                            <div className="flex justify-between items-center mt-2 text-sm text-purple-300">
                                <span>Max Slippage</span>
                                <span>0.5%</span>
                            </div>

                            {/* Network fee */}
                            <div className="flex justify-between items-center mt-2 text-sm text-purple-300">
                                <span>Network Fee</span>
                                <span>≈ $2.50</span>
                            </div>

                            {/* Swap button */}
                            <button className="w-full bg-purple-600 hover:bg-purple-500 text-white font-bold py-3 px-4 rounded-lg mt-6 transition-colors">
                                Swap Tokens
                            </button>

                            {/* Powered by */}
                            <div className="flex justify-center items-center gap-1 mt-4 text-xs text-purple-400">
                                <span>Powered by UniSwap</span>
                                <ExternalLink className="w-3 h-3" />
                            </div>
                        </div>

                        {/* Token selection list */}
                        {showTokenList && (
                            <div className="absolute inset-0 bg-purple-900 z-20 animate-slideIn">
                                <div className="flex justify-between items-center p-4 border-b border-purple-800">
                                    <h3 className="text-lg font-bold text-white">Select Token</h3>
                                    <button
                                        onClick={() => setShowTokenList(null)}
                                        className="text-purple-300 hover:text-white"
                                    >
                                        <X className="w-5 h-5" />
                                    </button>
                                </div>

                                <div className="p-2">
                                    <input
                                        type="text"
                                        placeholder="Search token name or address"
                                        className="w-full bg-purple-800/50 text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 mb-2"
                                    />

                                    <div className="max-h-[300px] overflow-y-auto">
                                        {tokens.map((token) => (
                                            <button
                                                key={token.symbol}
                                                onClick={() => selectToken(token)}
                                                className="flex items-center gap-3 w-full p-3 hover:bg-purple-800/50 rounded-lg transition-colors"
                                            >
                                                <img src={token.logo} alt={token.symbol} className="w-8 h-8 rounded-full" />
                                                <div className="text-left">
                                                    <div className="text-white font-medium">{token.symbol}</div>
                                                    <div className="text-purple-300 text-sm">{token.name}</div>
                                                </div>
                                                <div className="ml-auto text-right">
                                                    <div className="text-white">{token.balance}</div>
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}