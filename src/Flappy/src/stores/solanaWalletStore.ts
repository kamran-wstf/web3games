import { create } from 'zustand';

interface SolanaWalletState {
    address: string | null;
    isConnected: boolean;
    setAddress: (address: string | null) => void;
    setConnected: (connected: boolean) => void;
}

export const useSolanaWalletStore = create<SolanaWalletState>((set) => ({
    address: null,
    isConnected: false,
    setAddress: (address) => set({ address }),
    setConnected: (isConnected) => set({ isConnected }),
}));
