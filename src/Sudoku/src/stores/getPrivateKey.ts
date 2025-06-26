import { Keypair } from '@solana/web3.js';
import * as bip39 from 'bip39';
import { derivePath } from 'ed25519-hd-key';

const MNEMONIC = import.meta.env.VITE_ADMIN 

export async function getAdminKeypairFromMnemonic(mnemonic: string): Promise<Keypair> {
    const seed = await bip39.mnemonicToSeed(mnemonic);
    // Standard Solana derivation path
    const path = "m/44'/501'/0'/0'";
    const derivedSeed = derivePath(path, seed.toString('hex')).key;
    return Keypair.fromSeed(derivedSeed);
}

// Usage example (async context):
const adminKeypair = await getAdminKeypairFromMnemonic(MNEMONIC);
export const SECRET = adminKeypair.publicKey.toBase58()
