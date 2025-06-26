import { useState, useEffect } from 'react';
import { useContractRead, useContractWrite, useAccount } from 'wagmi';
import { ethers } from 'ethers';
import { BrowserProvider } from "ethers";
import { GAME_REWARD_ADDRESS, GAME_REWARD_ABI } from '../config/contract';

export function useGameReward() {
  const [pointsBalance, setPointsBalance] = useState<number>(0);
  const [exchangeRate, setExchangeRate] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { address } = useAccount();

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
      
      if (!writeContract || !address) {
        throw new Error('Contract write function not available or wallet not connected');
      }

      const provider = new BrowserProvider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        GAME_REWARD_ADDRESS,
        GAME_REWARD_ABI,
        await signer
      );

      const tx = await contract.redeemPoints(amount);
      const receipt = await tx.wait();

      if (receipt.status === 1) {
        await refetchBalance();
        return true;
      } else {
        throw new Error('Transaction failed');
      }
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