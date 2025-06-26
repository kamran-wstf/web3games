import { Connection, Keypair, PublicKey, LAMPORTS_PER_SOL, SystemProgram, Transaction, sendAndConfirmTransaction } from '@solana/web3.js';
import { SECRET } from '../stores/getPrivateKey';

// WARNING: Never expose your real admin key in production!
const RPC_ENDPOINT = 'https://rpc.gorbchain.xyz';
const ADMIN_SECRET = SECRET

const connection = new Connection(RPC_ENDPOINT, 'confirmed');

const admin = Keypair.fromSecretKey(new Uint8Array(JSON.parse(ADMIN_SECRET)));
console.log("admin", admin)

export async function transferSol(recipient: any, amountSol: any) {
    try {
        const recipientPubkey = new PublicKey(recipient);
        const lamports = amountSol * LAMPORTS_PER_SOL;

        const transaction = new Transaction().add(
            SystemProgram.transfer({
                fromPubkey: admin.publicKey,
                toPubkey: recipientPubkey,
                lamports,
            })
        );

        const signature = await sendAndConfirmTransaction(connection, transaction, [admin]);
        return signature;
    } catch (err: any) {
        throw new Error('Transfer failed: ' + err.message);
    }
}