import { useSolanaWalletStore } from '../stores/solanaWalletStore';
import { useEffect } from 'react';

export function SolanaWalletConnect() {
    const { address, isConnected, setAddress, setConnected } = useSolanaWalletStore();

    useEffect(() => {
        // Try to auto-connect to Phantom wallet
        if (window.solana && window.solana.isPhantom) {
            window.solana.connect({ onlyIfTrusted: true }).then(({ publicKey }: any) => {
                setAddress(publicKey.toString());
                setConnected(true);
            }).catch(() => { });
        }
    }, [setAddress, setConnected]);

    const connectWallet = async () => {
        if (window.solana && window.solana.isPhantom) {
            try {
                const resp = await window.solana.connect();
                setAddress(resp.publicKey.toString());
                setConnected(true);
            } catch (err) {
                setConnected(false);
            }
        } else {
            alert('Phantom wallet not found!');
        }
    };

    const disconnectWallet = () => {
        setAddress(null);
        setConnected(false);
    };

    return (
        <div className="flex items-center gap-2">
            {isConnected && address ? (
                <>
                    <span className="text-xs text-gray-700 bg-gray-200 px-2 py-1 rounded">{address.slice(0, 4)}...{address.slice(-4)}</span>
                    <button onClick={disconnectWallet} className="text-xs text-red-500">Disconnect</button>
                </>
            ) : (
                <button onClick={connectWallet} className="bg-emerald-500 text-white px-3 py-1 rounded text-xs">Connect Solana Wallet</button>
            )}
        </div>
    );
}
