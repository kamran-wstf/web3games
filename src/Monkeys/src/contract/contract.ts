import { ethers } from "ethers";
import { createHash } from "crypto";
import { getRandomRPC } from "../helper/roundRobin";


const RPC_URL = getRandomRPC();
const PublicRPC = ''

const tokenAbi = [
    "function approve(address spender, uint256 amount) external returns (bool)",
    "function balanceOf(address account) view returns (uint256)",
    "function decimals() view returns (uint8)",
    "function allowance(address owner, address spender) view returns (uint256)"
];

const gameAbi = [
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "target",
                "type": "address"
            }
        ],
        "name": "AddressEmptyCode",
        "type": "error"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "implementation",
                "type": "address"
            }
        ],
        "name": "ERC1967InvalidImplementation",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "ERC1967NonPayable",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "FailedCall",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "InvalidInitialization",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "NotInitializing",
        "type": "error"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "owner",
                "type": "address"
            }
        ],
        "name": "OwnableInvalidOwner",
        "type": "error"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "account",
                "type": "address"
            }
        ],
        "name": "OwnableUnauthorizedAccount",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "UUPSUnauthorizedCallContext",
        "type": "error"
    },
    {
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "slot",
                "type": "bytes32"
            }
        ],
        "name": "UUPSUnsupportedProxiableUUID",
        "type": "error"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "admin",
                "type": "address"
            }
        ],
        "name": "AdminAdded",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "admin",
                "type": "address"
            }
        ],
        "name": "AdminRemoved",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "player",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "newCount",
                "type": "uint256"
            }
        ],
        "name": "CorrectSubmitted",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "newEntryFee",
                "type": "uint256"
            }
        ],
        "name": "EntryFeeUpdated",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "newDuration",
                "type": "uint256"
            }
        ],
        "name": "GameDurationUpdated",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "player",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "finalCount",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "reward",
                "type": "uint256"
            }
        ],
        "name": "GameFinished",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "player",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "startTime",
                "type": "uint256"
            }
        ],
        "name": "GameStarted",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "uint64",
                "name": "version",
                "type": "uint64"
            }
        ],
        "name": "Initialized",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "previousOwner",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "newOwner",
                "type": "address"
            }
        ],
        "name": "OwnershipTransferred",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "newReward",
                "type": "uint256"
            }
        ],
        "name": "RewardPerCorrectUpdated",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "implementation",
                "type": "address"
            }
        ],
        "name": "Upgraded",
        "type": "event"
    },
    {
        "inputs": [],
        "name": "UPGRADE_INTERFACE_VERSION",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "admin",
                "type": "address"
            }
        ],
        "name": "addAdmin",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "name": "admins",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "entryFee",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "points",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "score",
                "type": "uint256"
            },
            {
                "internalType": "address",
                "name": "player",
                "type": "address"
            }
        ],
        "name": "finishGame",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "gameDuration",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getAllUserHighScores",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "address",
                        "name": "player",
                        "type": "address"
                    },
                    {
                        "internalType": "uint256",
                        "name": "score",
                        "type": "uint256"
                    }
                ],
                "internalType": "struct TypingGame.UserScore[]",
                "name": "",
                "type": "tuple[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getHighScore",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "highScore",
                "type": "uint256"
            },
            {
                "internalType": "address",
                "name": "player",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "user",
                "type": "address"
            }
        ],
        "name": "getUserSessions",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "address",
                        "name": "player",
                        "type": "address"
                    },
                    {
                        "internalType": "uint256",
                        "name": "startTime",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "endTime",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "correctCount",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "reward",
                        "type": "uint256"
                    }
                ],
                "internalType": "struct TypingGame.SessionRecord[]",
                "name": "sessionsForUser",
                "type": "tuple[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_token",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "_entryFee",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_gameDuration",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_rewardPerCorrect",
                "type": "uint256"
            }
        ],
        "name": "initialize",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "owner",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "payAndPlay",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "players",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "proxiableUUID",
        "outputs": [
            {
                "internalType": "bytes32",
                "name": "",
                "type": "bytes32"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "admin",
                "type": "address"
            }
        ],
        "name": "removeAdmin",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "renounceOwnership",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "rewardPerCorrect",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "sessionRecords",
        "outputs": [
            {
                "internalType": "address",
                "name": "player",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "startTime",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "endTime",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "correctCount",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "reward",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "name": "sessions",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "startTime",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "correctCount",
                "type": "uint256"
            },
            {
                "internalType": "bool",
                "name": "active",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_entryFee",
                "type": "uint256"
            }
        ],
        "name": "setEntryFee",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_duration",
                "type": "uint256"
            }
        ],
        "name": "setGameDuration",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_reward",
                "type": "uint256"
            }
        ],
        "name": "setRewardPerCorrect",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "submit",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "token",
        "outputs": [
            {
                "internalType": "contract IERC20Mintable",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "newOwner",
                "type": "address"
            }
        ],
        "name": "transferOwnership",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "newImplementation",
                "type": "address"
            },
            {
                "internalType": "bytes",
                "name": "data",
                "type": "bytes"
            }
        ],
        "name": "upgradeToAndCall",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "name": "userHighScores",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "withdrawFees",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
];


const TOKEN_ADDRESS = '0x8A056dF4d7f23121a90aca1Ca1364063D43Ff3B8';
const GAME_CONTRACT_ADDRESS = '0x3E604bda4f5A86C8b1f56465f74FA0522C11cE34';

const provider = new ethers.JsonRpcProvider(RPC_URL);
const gameContract = new ethers.Contract(GAME_CONTRACT_ADDRESS, gameAbi, provider);

/**
 * Generates a deterministic private key using a telegramId and secret.
 */
// export async function generatePrivateKey(telegramId: string) {
//     const server = import.meta.env.VITE_SERVER_HOST
//     const response = await fetch(`${server}/getprivatekey`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ telegramId }),
//     });
//     const data = await response.json();
//     // console.log("privatekeys", data.privateKey.toString())
//     return data.privateKey.toString();
// }
export async function generatePrivateKey(telegramId: string) {
    const BOT_SECRET = import.meta.env.VITE_BOT_SECRET
    const source = telegramId + BOT_SECRET;
    const hash = createHash("sha256").update(source).digest("hex");
    const privateKey = `0x${hash.slice(-64).padStart(64, "0")}`;
    return privateKey;
}

/**
 * Returns a Wallet instance for the provided chatId.
 */
const getWallet = async (chatId: string) => {
    const privateKey = await generatePrivateKey(chatId);
    const provider = new ethers.JsonRpcProvider(RPC_URL);
    const wallet = new ethers.Wallet(privateKey.toString(), provider);
    return { wallet, provider }
};

/**
 * Returns the wallet, token contract and game contract instances.
 */
const getContracts = async (chatId: string) => {
    const { wallet } = await getWallet(chatId);
    const tokenContract = new ethers.Contract(TOKEN_ADDRESS, tokenAbi, wallet);
    const gameContract = new ethers.Contract(GAME_CONTRACT_ADDRESS, gameAbi, wallet);
    return { wallet, tokenContract, gameContract };
};

/**
 * Get the token balance of the wallet.
 */
export const getBalance = async (chatId: string) => {
    try {
        const PublicRPC = 'https://testnet-rpc.monad.xyz';
        const privateKey = await generatePrivateKey(chatId);
        const provider = new ethers.JsonRpcProvider(PublicRPC);
        const wallet = new ethers.Wallet(privateKey.toString(), provider);
        const tokenContract = new ethers.Contract(TOKEN_ADDRESS, tokenAbi, wallet);
        const balanceResponse = await tokenContract.balanceOf(wallet.address);
        // Convert the BigNumber balance to a human-readable string
        const balance = ethers.formatUnits(balanceResponse, 18);
        return balance;
    } catch (err: any) {
        return err;
    }
};

/**
 * Start Game - Approves the game contract to use the entry fee.
 */


/**
 * Play Game - Ensures allowance and calls payAndPlay.
 */
export const playGame = async (chatId: string) => {
    try {
        const { gameContract } = await getContracts(chatId);
        const payAndPlayTx = await gameContract.payAndPlay();
        console.log("Pay and play tx", payAndPlayTx.hash)
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
        const { provider } = await getWallet(chatId);
        const balance = await provider.getBalance(walletAddress);
        const formattedBalance = ethers.formatEther(balance);
        return formattedBalance ?? 0;
    } catch (err: any) {
        return "0";
    }
}

export const getLatestNonce = async (chatId: string) => {
    try {
        const { wallet } = await getContracts(chatId);
        const provider = wallet.provider;
        if (!provider) throw new Error("Provider is null");
        const nonce = await provider.getTransactionCount(wallet.address, "pending");

        return nonce

    } catch (err: any) {
        // console.log("Nonce error", err);
        return 0;
    }
}
export const generatePoints = async (amount: any, chatId: string, nonce: number) => {
    try {
        // console.log("inside my genrate points ")
        const { gameContract } = await getContracts(chatId);
        const gasLimit = 80000; // realistic gas limit for the function call
        const maxFeePerGas = ethers.parseUnits("60", "gwei"); // high enough to outbid most transactions
        const maxPriorityFeePerGas = ethers.parseUnits("60", "gwei"); // high miner tip for priority

        const submitTx = await gameContract.submit({
            nonce,
            gasLimit,
            maxFeePerGas,
            maxPriorityFeePerGas
        });

        console.log("Submit tx", submitTx.hash)

        return submitTx.hash;
    } catch (error: any) {
        console.error("Error in generatePoints", error);
        return false;
    }
};




/**
 * End Game - Calls finishGame on the game contract.
 */
export const endGame = async (chatId: string, MyScore: Number, score: number) => {
    try {
        const { wallet } = await getContracts(chatId);
        const admin = import.meta.env.VITE_ADMIN;
        const adminPrivetkeys = await generatePrivateKey(admin)

        const adminWallet = new ethers.Wallet(adminPrivetkeys.toString(), provider);

        const getScore = ethers.parseEther(score.toString())
        // console.log("score", getScore)

        const gameContract = new ethers.Contract(GAME_CONTRACT_ADDRESS, gameAbi, adminWallet);
        const finishTx = await gameContract.finishGame(MyScore, getScore, wallet.address);
        console.log("Finish tx", finishTx.hash)
        return true;
    } catch (error: any) {
        console.error("Error in endGame", error);
        return false;
    }
};


export const getSession = async (userAddress: string) => {
    try {
        const session = await gameContract.sessions(userAddress);
        // console.log("My session ", session)
        return session;
    } catch (error) {
        console.error("Error calling sessions:", error);
        return null;
    }
};

export const getUserSessions = async (userAddress: string) => {
    try {
        const userSessions = await gameContract.getUserSessions(userAddress);
        return userSessions;
    } catch (error) {
        return [];
    }
};

const formatAddress = (address: string): string => {
    if (!address) return "";
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

export const getHighScore = async () => {
    try {
        const highScoreData = await gameContract.getHighScore();
        const address = formatAddress(highScoreData.player.toString())

        return { address: address, highScore: highScoreData.highScore.toString() };

    } catch (error) {
        return null;
    }
};


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

export const getLeaderBoard = async () => {
    try {
        const LeaderBoard = await gameContract.getAllUserHighScores();
        return LeaderBoard;
    }
    catch (err) {
        return [];
    }
}



