import { BigNumber } from '@ethersproject/bignumber'
import { ethers } from 'ethers';
import { useCallback } from 'react'
import { useSingleCallResult } from 'state/multicall/hooks'
import { useSaleContract } from 'hooks/useContract'
import { useActiveWeb3React } from 'hooks'
import { useTransactionAdder } from 'state/transactions/hooks';


export function useSaleHooks(account) {
  const saleContract = useSaleContract(false)
  
  const started = useSingleCallResult(saleContract, 'started')?.result?.[0]
  const liquidityAdded = useSingleCallResult(saleContract, 'liquidityAdded')?.result?.[0]
  const forSale: BigNumber = useSingleCallResult(saleContract, 'forSale')?.result?.[0]
  const cap: BigNumber = useSingleCallResult(saleContract, 'cap')?.result?.[0]
  const totalSold: BigNumber = useSingleCallResult(saleContract, 'totalSold')?.result?.[0]
  const price: BigNumber = useSingleCallResult(saleContract, 'price')?.result?.[0]
  const purchased: BigNumber = useSingleCallResult(saleContract, 'purchased', [account])?.result?.[0]

  return { started, forSale, cap, totalSold, purchased, price, liquidityAdded }
}

export function useBuyTokens(ethAmount: string, price: BigNumber) {
  const { account, library } = useActiveWeb3React()
  const saleContract = useSaleContract(true)
  const addTransaction = useTransactionAdder()


  return useCallback(async (): Promise<void> => {
    if (!saleContract || !library || !account) return;

    const amountInWei = ethers.utils.parseEther(ethAmount);

    // We estimate the gas required for the transaction
    saleContract.estimateGas.purchase({ value: amountInWei })
      .then((estimatedGasLimit) => {
        // Here we execute the purchase transaction with the estimated gas limit
        saleContract
          .purchase({ value: amountInWei, gasLimit: estimatedGasLimit })
          .then((response: ethers.providers.TransactionResponse) => {
            addTransaction(response, {
              summary: `Purchase ${ethAmount} PLS worth of tokens = ${Number(ethAmount)/Number(price)} CARDIO`,
            });
          })
          .catch((error: Error) => {
            console.error('Failed to purchase token', error);
            throw error;
          });
      })
      .catch((estimateError) => {
        console.error('Failed to estimate gas', estimateError);
        throw estimateError;
      });
  }, [library, account, ethAmount, saleContract, addTransaction, price]);
}

export function useClaimTokens() {
  const { account, library } = useActiveWeb3React()
  const saleContract = useSaleContract(true)
  const addTransaction = useTransactionAdder()


  return useCallback(async (): Promise<void> => {
    if (!saleContract || !library || !account) return;


    // We estimate the gas required for the transaction
    saleContract.estimateGas.claim()
      .then((estimatedGasLimit) => {
        // Here we execute the purchase transaction with the estimated gas limit
        saleContract
          .claim({ gasLimit: estimatedGasLimit })
          .then((response: ethers.providers.TransactionResponse) => {
            addTransaction(response, {
              summary: `CARDIO Tokens Claimed, you will soon receive them in your account`,
            });
          })
          .catch((error: Error) => {
            console.error('Failed to claim token', error);
            throw error;
          });
      })
      .catch((estimateError) => {
        console.error('Failed to estimate gas', estimateError);
        throw estimateError;
      });
  }, [library, account, saleContract, addTransaction]);
}