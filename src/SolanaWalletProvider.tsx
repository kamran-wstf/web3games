import { FC, ReactNode, useMemo } from 'react';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { BackpackWalletAdapter } from '@solana/wallet-adapter-backpack';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-wallets';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';

const endpoint = 'https://api.mainnet-beta.solana.com';

export const SolanaWalletProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const wallets = useMemo(
        () => [
            new BackpackWalletAdapter(),
            new PhantomWalletAdapter(),
        ],
        []
    );

    return (
        <ConnectionProvider endpoint={endpoint}>
            <WalletProvider wallets={wallets} autoConnect>
                <WalletModalProvider>
                    {children}
                </WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
    );
}; 