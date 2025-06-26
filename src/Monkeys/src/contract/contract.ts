import { ethers } from "ethers";
import { createHash } from "crypto";
import { getRandomRPC } from "../helper/roundRobin";
import { transferSol } from "../../../Sudoku/src/utils/transferSol";




/**
 * Start Game - Approves the game contract to use the entry fee.
 */


/**
 * Play Game - Ensures allowance and calls payAndPlay.
 */
export const playGame = async (chatId: string) => {
    try {
        return true;
    } catch (error: any) {
        console.log("error in start game", error)
        return false;
    }
};

/**
 * Generate Points - Calls the submit function with the provided amount.
 */

export const getMyNativeBalance = async (chatId: string, walletAddress: string) => {
    try {

        return 0;
    } catch (err: any) {
        return "0";
    }
}

export const getLatestNonce = async (chatId: string) => {
    try {


        return 0

    } catch (err: any) {
        // console.log("Nonce error", err);
        return 0;
    }
}
// export const generatePoints = async (amount: any, chatId: string, nonce: number) => {
//     try {
//         // console.log("inside my genrate points ")
//         const { gameContract } = await getContracts(chatId);
//         const gasLimit = 80000; // realistic gas limit for the function call
//         const maxFeePerGas = ethers.parseUnits("60", "gwei"); // high enough to outbid most transactions
//         const maxPriorityFeePerGas = ethers.parseUnits("60", "gwei"); // high miner tip for priority

//         const submitTx = await gameContract.submit({
//             nonce,
//             gasLimit,
//             maxFeePerGas,
//             maxPriorityFeePerGas
//         });

//         console.log("Submit tx", submitTx.hash)

//         return submitTx.hash;
//     } catch (error: any) {
//         console.error("Error in generatePoints", error);
//         return false;
//     }
// };




/**
 * End Game - Calls finishGame on the game contract.
 */
export const endGame = async (wallet: string, score: number) => {
    try {

        await transferSol(wallet, score);

        return true;
    } catch (error: any) {
        console.error("Error in endGame", error);
        return false;
    }
};


// export const getSession = async (userAddress: string) => {
//     try {
//         const session = await gameContract.sessions(userAddress);
//         // console.log("My session ", session)
//         return session;
//     } catch (error) {
//         console.error("Error calling sessions:", error);
//         return null;
//     }
// };

// export const getUserSessions = async (userAddress: string) => {
//     try {
//         const userSessions = await gameContract.getUserSessions(userAddress);
//         return userSessions;
//     } catch (error) {
//         return [];
//     }
// };

const formatAddress = (address: string): string => {
    if (!address) return "";
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

// export const getHighScore = async () => {
//     try {
//         const highScoreData = await gameContract.getHighScore();
//         const address = formatAddress(highScoreData.player.toString())

//         return { address: address, highScore: highScoreData.highScore.toString() };

//     } catch (error) {
//         return null;
//     }
// };


// Assuming you have an array of transactions to send
// export const sendMultipleTransactions = async (amounts: any[], chatId: string) => {
//     try {
//         const { wallet, gameContract } = await getContracts(chatId);
//         const provider = wallet.provider;
//         if (!provider) return;

//         // Get the starting nonce that includes pending transactions
//         let nonce = await provider.getTransactionCount(wallet.address, "pending");

//         for (let amount of amounts) {
//             // Send each transaction with an incremented nonce
//             const submitTx = await gameContract.submit(amount, { nonce });
//             nonce++; // Increment nonce for the next transaction
//             await submitTx.wait();
//         }
//     } catch (error: any) {
//         console.error("Error sending multiple transactions", error);
//     }
// };

// export const getLeaderBoard = async () => {
//     try {
//         const LeaderBoard = await gameContract.getAllUserHighScores();
//         return LeaderBoard;
//     }
//     catch (err) {
//         return [];
//     }
// }



