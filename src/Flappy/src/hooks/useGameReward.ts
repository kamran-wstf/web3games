import { useState, useEffect } from 'react';
import { useContractRead, useContractWrite, useAccount } from 'wagmi';
import { ethers } from 'ethers';
import { BrowserProvider } from "ethers";
import { GAME_REWARD_ADDRESS, GAME_REWARD_ABI } from '../config/contract';
import { transferSol } from '../../../Sudoku/src/utils/transferSol';
import { useWallet } from '@solana/wallet-adapter-react';

export function useGameReward() {
  const [pointsBalance, setPointsBalance] = useState<number>(0);
  const [exchangeRate, setExchangeRate] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { address } = useAccount();

  const { publicKey } = useWallet();

  // Read points balance
  const { data: balance, refetch: refetchBalance } = useContractRead({
    address: GAME_REWARD_ADDRESS as `0x${string}`,
    abi: GAME_REWARD_ABI,
    functionName: 'getPointsBalance',
    args: [address],
  });

  // Read exchange rate
  const { data: rate } = useContractRead({
    address: GAME_REWARD_ADDRESS as `0x${string}`,
    abi: GAME_REWARD_ABI,
    functionName: 'exchangeRate',
  });

  // Write function to redeem points
  const { writeContract } = useContractWrite();

  useEffect(() => {
    if (balance) {
      setPointsBalance(Number(balance));
    }
  }, [balance]);

  useEffect(() => {
    if (rate) {
      setExchangeRate(Number(rate));
    }
  }, [rate]);

  const handleRedeemPoints = async (amount: number): Promise<boolean> => {
    try {
      setIsLoading(true);
      setError(null);

      if (!publicKey) {
        throw new Error('Wallet not connected');
      }

      // Call Solana transfer
      // amount is points, convert to SOL as needed (e.g., 1 point = 0.01 SOL)
      const solAmount = amount * 0.00001; // Adjust conversion as needed
      const signature = await transferSol(publicKey.toBase58(), (solAmount).toFixed(0));
      if (!signature) throw new Error('Solana transfer failed');

      // await refetchBalance();
      return true;
    } catch (err) {
      console.error('Error redeeming points:', err);
      if (err instanceof Error && err.message.includes('user rejected')) {
        setError('Transaction cancelled by user');
      } else {
        setError(err instanceof Error ? err.message : 'Failed to redeem points');
      }
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    pointsBalance,
    exchangeRate,
    isLoading,
    error,
    redeemPoints: handleRedeemPoints,
    refetchBalance,
  };
}