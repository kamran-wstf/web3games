import { Connection, Keypair, PublicKey, LAMPORTS_PER_SOL, SystemProgram, Transaction, sendAndConfirmTransaction } from '@solana/web3.js';
import bs58 from 'bs58'

// WARNING: Never expose your real admin key in production!
const RPC_ENDPOINT = 'https://rpc.gorbchain.xyz';
const ADMIN_SECRET = import.meta.env.VITE_ADMIN

const connection = new Connection(RPC_ENDPOINT, 'confirmed');

const secretKeyUint8 = bs58.decode(ADMIN_SECRET);

const admin = Keypair.fromSecretKey(secretKeyUint8);

export async function transferSol(recipient: any, amountSol: any) {
    console.log("address", recipient)
    try {
        // const recipientPubkey = new PublicKey(recipient);
        const lamports = amountSol * LAMPORTS_PER_SOL;

        const transaction = new Transaction().add(
            SystemProgram.transfer({
                fromPubkey: admin.publicKey,
                toPubkey: new PublicKey(recipient),
                lamports,
            })
        );

        console.log("transaction", transaction)

        const signature = await sendAndConfirmTransaction(connection, transaction, [admin]);
        return signature;
    } catch (err: any) {
        throw new Error('Transfer failed: ' + err.message);
    }
}