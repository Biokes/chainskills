
import { useState, useCallback } from 'react'
import { useReadContract, useWaitForTransactionReceipt, useWriteContract } from 'wagmi'
import { PONG_ESCROW_ADDRESS } from '../constants'
import { PONG_ESCROW_ABI } from '../contracts/PongEscrow'
import { parseUnits } from 'viem'

interface TransactionState {
  hash: string | null
  isPending: boolean
  isConfirming: boolean
  isSuccess: boolean
  error: Error | null
}


export function useIsRoomCodeAvailable(roomCode: string) {
  return useReadContract({
    address: PONG_ESCROW_ADDRESS,
    abi: PONG_ESCROW_ABI,
    functionName: 'isRoomCodeAvailable',
    args: [roomCode],
    query: {
      enabled: !!roomCode && roomCode.length === 6,
    },
  })
}


export function useGetMatch(roomCode: string) {
  return useReadContract({
    address: PONG_ESCROW_ADDRESS,
    abi: PONG_ESCROW_ABI,
    functionName: 'getMatch',
    args: [roomCode],
    query: {
      enabled: !!roomCode && roomCode.length === 6,
    },
  })
}


export function useGetMatchStatus(roomCode: string) {
  return useReadContract({
    address: PONG_ESCROW_ADDRESS,
    abi: PONG_ESCROW_ABI,
    functionName: 'getMatchStatus',
    args: [roomCode],
    query: {
      enabled: !!roomCode && roomCode.length === 6,
    },
  })
}

// ============ WRITE HOOKS ============

// export function useStakeAsPlayer1() {
//   const { pushChainClient } = usePushChainClient()
//   const { PushChain } = usePushChain()
  
//   const [state, setState] = useState<TransactionState>({
//     hash: null,
//     isPending: false,
//     isConfirming: false,
//     isSuccess: false,
//     error: null,
//   })

//   const stakeAsPlayer1 = useCallback(async (roomCode: string, stakeAmount: string) => {
//     if (!pushChainClient || !PushChain) {
//       throw new Error('Push Chain client not initialized')
//     }

//     try {
//       setState(prev => ({ ...prev, isPending: true, error: null, isSuccess: false }))

//       // Encode function call
//       const data = PushChain.utils.helpers.encodeTxData({
//         abi: PONG_ESCROW_ABI,
//         functionName: 'stakeAsPlayer1',
//         args: [roomCode],
//       })


//       // Send universal transaction
//       const txResponse = await pushChainClient.universal.sendTransaction({
//         to: PONG_ESCROW_ADDRESS,
//         data,
//         value: PushChain.utils.helpers.parseUnits(stakeAmount, 18),
//       })


//       setState(prev => ({
//         ...prev,
//         hash: txResponse.hash,
//         isPending: false,
//         isConfirming: true
//       }))

//       // Wait for confirmation
//       const receipt = await txResponse.wait(1)
      

//       setState(prev => ({
//         ...prev,
//         isConfirming: false,
//         isSuccess: true
//       }))

//     } catch (error) {
//       setState(prev => ({
//         ...prev,
//         error: error as Error,
//         isPending: false,
//         isConfirming: false,
//         isSuccess: false
//       }))
//       throw error
//     }
//   }, [pushChainClient, PushChain])

//   return {
//     stakeAsPlayer1,
//     hash: state.hash,
//     isPending: state.isPending,
//     isConfirming: state.isConfirming,
//     isSuccess: state.isSuccess,
//     error: state.error,
//   }
// }

// export function useStakeAsPlayer2() {
//   const { pushChainClient } = usePushChainClient()
//   const { PushChain } = usePushChain()
  
//   const [state, setState] = useState<TransactionState>({
//     hash: null,
//     isPending: false,
//     isConfirming: false,
//     isSuccess: false,
//     error: null,
//   })

//   const stakeAsPlayer2 = useCallback(async (roomCode: string, stakeAmount: string) => {
//     if (!pushChainClient || !PushChain) {
//       throw new Error('Push Chain client not initialized')
//     }

//     try {
//       setState(prev => ({ ...prev, isPending: true, error: null, isSuccess: false }))

//       const data = PushChain.utils.helpers.encodeTxData({
//         abi: PONG_ESCROW_ABI,
//         functionName: 'stakeAsPlayer2',
//         args: [roomCode],
//       })


//       const txResponse = await pushChainClient.universal.sendTransaction({
//         to: PONG_ESCROW_ADDRESS,
//         data,
//         value: PushChain.utils.helpers.parseUnits(stakeAmount, 18),
//       })


//       setState(prev => ({
//         ...prev,
//         hash: txResponse.hash,
//         isPending: false,
//         isConfirming: true
//       }))

//       const receipt = await txResponse.wait(1)
      

//       setState(prev => ({
//         ...prev,
//         isConfirming: false,
//         isSuccess: true
//       }))

//     } catch (error) {
//       setState(prev => ({
//         ...prev,
//         error: error as Error,
//         isPending: false,
//         isConfirming: false,
//         isSuccess: false
//       }))
//       throw error
//     }
//   }, [pushChainClient, PushChain])

//   return {
//     stakeAsPlayer2,
//     hash: state.hash,
//     isPending: state.isPending,
//     isConfirming: state.isConfirming,
//     isSuccess: state.isSuccess,
//     error: state.error,
//   }
// }


// export function useClaimPrize() {
//   const { pushChainClient } = usePushChainClient()
//   const { PushChain } = usePushChain()
  
//   const [state, setState] = useState<TransactionState>({
//     hash: null,
//     isPending: false,
//     isConfirming: false,
//     isSuccess: false,
//     error: null,
//   })

//   const claimPrize = useCallback(async (roomCode: string, signature: string) => {
//     if (!pushChainClient || !PushChain) {
//       throw new Error('Push Chain client not initialized')
//     }

//     try {
//       setState(prev => ({ ...prev, isPending: true, error: null, isSuccess: false }))

//       const data = PushChain.utils.helpers.encodeTxData({
//         abi: PONG_ESCROW_ABI,
//         functionName: 'claimPrize',
//         args: [roomCode, signature],
//       })


//       const txResponse = await pushChainClient.universal.sendTransaction({
//         to: PONG_ESCROW_ADDRESS,
//         data,
//         value: BigInt(0),
//       })


//       setState(prev => ({
//         ...prev,
//         hash: txResponse.hash,
//         isPending: false,
//         isConfirming: true
//       }))

//       const receipt = await txResponse.wait(1)
      

//       setState(prev => ({
//         ...prev,
//         isConfirming: false,
//         isSuccess: true
//       }))

//     } catch (error) {
//       setState(prev => ({
//         ...prev,
//         error: error as Error,
//         isPending: false,
//         isConfirming: false,
//         isSuccess: false
//       }))
//       throw error
//     }
//   }, [pushChainClient, PushChain])

//   return {
//     claimPrize,
//     hash: state.hash,
//     isPending: state.isPending,
//     isConfirming: state.isConfirming,
//     isSuccess: state.isSuccess,
//     error: state.error,
//   }
// }


// export function useClaimRefund() {
 
  
//   const [state, setState] = useState<TransactionState>({
//     hash: null,
//     isPending: false,
//     isConfirming: false,
//     isSuccess: false,
//     error: null,
//   })

//   const claimRefund = useCallback(async (roomCode: string) => {
//     if (!pushChainClient || !PushChain) {
//       throw new Error('Push Chain client not initialized')
//     }

//     try {
//       setState(prev => ({ ...prev, isPending: true, error: null, isSuccess: false }))

//       const data = PushChain.utils.helpers.encodeTxData({
//         abi: PONG_ESCROW_ABI,
//         functionName: 'claimRefund',
//         args: [roomCode],
//       })


//       const txResponse = await pushChainClient.universal.sendTransaction({
//         to: PONG_ESCROW_ADDRESS,
//         data,
//         value: BigInt(0),
//       })


//       setState(prev => ({
//         ...prev,
//         hash: txResponse.hash,
//         isPending: false,
//         isConfirming: true
//       }))

//       const receipt = await txResponse.wait(1)
      

//       setState(prev => ({
//         ...prev,
//         isConfirming: false,
//         isSuccess: true
//       }))

//     } catch (error) {
//       setState(prev => ({
//         ...prev,
//         error: error as Error,
//         isPending: false,
//         isConfirming: false,
//         isSuccess: false
//       }))
//       throw error
//     }
//   }, [pushChainClient, PushChain])

//   return {
//     claimRefund,
//     hash: state.hash,
//     isPending: state.isPending,
//     isConfirming: state.isConfirming,
//     isSuccess: state.isSuccess,
//     error: state.error,
//   }
// }


// export function useClaimRefundForAbandoned() {
//   const { writeContractAsync } = useWriteContract()
//   const [state, setState] = useState({
//     hash: null as string | null,
//     isPending: false,
//     isConfirming: false,
//     isSuccess: false,
//     error: null as Error | null,
//   })

//   const claimRefundForAbandoned = useCallback(async (roomCode: string, signature: string) => {
//     setState({
//       hash: null,
//       isPending: true,
//       isConfirming: false,
//       isSuccess: false,
//       error: null,
//     })

//     try {

//       setState(prev => ({ ...prev, isPending: true, error: null, isSuccess: false }))

//       const txHash = await writeContractAsync({
//         address: import.meta.env.VITE_PONG_ESCROW_ADDRESS as Hex,
//         abi: PONG_ESCROW_ABI,
//         functionName: 'claimRefundForAbandoned',
//         args: [roomCode, signature],
//       })
//       await waitForTransactionReceipt(publicClient, { hash: txHash })

//       // const txResponse = await pushChainClient.universal.sendTransaction({
//       //   to: PONG_ESCROW_ADDRESS,
//       //   data,
//       //   value: BigInt(0),
//       // })


//       setState(prev => ({
//         ...prev,
//         hash: txResponse.hash,
//         isPending: false,
//         isConfirming: true
//       }))

//       const receipt = await txResponse.wait(1)
      

//       setState(prev => ({
//         ...prev,
//         isConfirming: false,
//         isSuccess: true
//       }))

//     } catch (error) {
//       setState(prev => ({
//         ...prev,
//         error: error as Error,
//         isPending: false,
//         isConfirming: false,
//         isSuccess: false
//       }))
//       throw error
//     }
//   }, [pushChainClient, PushChain])

//   return {
//     claimRefundForAbandoned,
//     hash: state.hash,
//     isPending: state.isPending,
//     isConfirming: state.isConfirming,
//     isSuccess: state.isSuccess,
//     error: state.error,
//   }
// }

export function useStakeAsPlayer1() {
  const { writeContractAsync } = useWriteContract();
  const [hash, setHash] = useState<string | null>(null);
  const [state, setState] = useState<TransactionState>({
    hash: null,
    isPending: false,
    isConfirming: false,
    isSuccess: false,
    error: null,
  });

  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash: hash as `0x${string}` | undefined,
  });

  const stakeAsPlayer1 = useCallback(
    async (roomCode: string, stakeAmount: string) => {
      try {
        setState(prev => ({ ...prev, isPending: true, error: null, isSuccess: false }));

        const txHash = await writeContractAsync({
          address: import.meta.env.VITE_PONG_ESCROW_ADDRESS as `0x${string}`,
          abi: PONG_ESCROW_ABI,
          functionName: 'stakeAsPlayer1',
          args: [roomCode],
          value: parseUnits(stakeAmount, 18),
        });

        setHash(txHash);
        setState(prev => ({
          ...prev,
          hash: txHash,
          isPending: false,
          isConfirming: true,
        }));
      } catch (error) {
        setState(prev => ({
          ...prev,
          error: error as Error,
          isPending: false,
          isConfirming: false,
          isSuccess: false,
        }));
        throw error;
      }
    },
    [writeContractAsync]
  );

  return {
    stakeAsPlayer1,
    hash: state.hash,
    isPending: state.isPending,
    isConfirming,
    isSuccess,
    error: state.error,
  };
}

export function useStakeAsPlayer2() {
  const { writeContractAsync } = useWriteContract();
  const [hash, setHash] = useState<string | null>(null);
  const [state, setState] = useState<TransactionState>({
    hash: null,
    isPending: false,
    isConfirming: false,
    isSuccess: false,
    error: null,
  });

  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash: hash as `0x${string}` | undefined,
  });

  const stakeAsPlayer2 = useCallback(
    async (roomCode: string, stakeAmount: string) => {
      try {
        setState(prev => ({ ...prev, isPending: true, error: null, isSuccess: false }));

        const txHash = await writeContractAsync({
          address: import.meta.env.VITE_PONG_ESCROW_ADDRESS as `0x${string}`,
          abi: PONG_ESCROW_ABI,
          functionName: 'stakeAsPlayer2',
          args: [roomCode],
          value: parseUnits(stakeAmount, 18),
        });

        setHash(txHash);
        setState(prev => ({
          ...prev,
          hash: txHash,
          isPending: false,
          isConfirming: true,
        }));
      } catch (error) {
        setState(prev => ({
          ...prev,
          error: error as Error,
          isPending: false,
          isConfirming: false,
          isSuccess: false,
        }));
        throw error;
      }
    },
    [writeContractAsync]
  );

  return {
    stakeAsPlayer2,
    hash: state.hash,
    isPending: state.isPending,
    isConfirming,
    isSuccess,
    error: state.error,
  };
}

export function useClaimPrize() {
  const { writeContractAsync } = useWriteContract();
  const [hash, setHash] = useState<string | null>(null);
  const [state, setState] = useState<TransactionState>({
    hash: null,
    isPending: false,
    isConfirming: false,
    isSuccess: false,
    error: null,
  });

  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash: hash as `0x${string}` | undefined,
  });

  const claimPrize = useCallback(
    async (roomCode: string, signature: string) => {
      try {
        setState(prev => ({ ...prev, isPending: true, error: null, isSuccess: false }));

        const txHash = await writeContractAsync({
          address: import.meta.env.VITE_PONG_ESCROW_ADDRESS as `0x${string}`,
          abi: PONG_ESCROW_ABI,
          functionName: 'claimPrize',
          args: [roomCode, signature],
        });

        setHash(txHash);
        setState(prev => ({
          ...prev,
          hash: txHash,
          isPending: false,
          isConfirming: true,
        }));
      } catch (error) {
        setState(prev => ({
          ...prev,
          error: error as Error,
          isPending: false,
          isConfirming: false,
          isSuccess: false,
        }));
        throw error;
      }
    },
    [writeContractAsync]
  );

  return {
    claimPrize,
    hash: state.hash,
    isPending: state.isPending,
    isConfirming,
    isSuccess,
    error: state.error,
  };
}

export function useClaimRefund() {
  const { writeContractAsync } = useWriteContract();
  const [hash, setHash] = useState<string | null>(null);
  const [state, setState] = useState<TransactionState>({
    hash: null,
    isPending: false,
    isConfirming: false,
    isSuccess: false,
    error: null,
  });

  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash: hash as `0x${string}` | undefined,
  });

  const claimRefund = useCallback(
    async (roomCode: string) => {
      try {
        setState(prev => ({ ...prev, isPending: true, error: null, isSuccess: false }));

        const txHash = await writeContractAsync({
          address: import.meta.env.VITE_PONG_ESCROW_ADDRESS as `0x${string}`,
          abi: PONG_ESCROW_ABI,
          functionName: 'claimRefund',
          args: [roomCode],
        });

        setHash(txHash);
        setState(prev => ({
          ...prev,
          hash: txHash,
          isPending: false,
          isConfirming: true,
        }));
      } catch (error) {
        setState(prev => ({
          ...prev,
          error: error as Error,
          isPending: false,
          isConfirming: false,
          isSuccess: false,
        }));
        throw error;
      }
    },
    [writeContractAsync]
  );

  return {
    claimRefund,
    hash: state.hash,
    isPending: state.isPending,
    isConfirming,
    isSuccess,
    error: state.error,
  };
}

export function useClaimRefundForAbandoned() {
  const { writeContractAsync } = useWriteContract();
  const [hash, setHash] = useState<string | null>(null);
  const [error, setError] = useState<Error | null>(null);

  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash: hash as `0x${string}` | undefined,
  });

  const claimRefundForAbandoned = useCallback(async (roomCode: string, signature: string) => {
    try {
      setError(null);
      const txHash = await writeContractAsync({
        address: import.meta.env.VITE_PONG_ESCROW_ADDRESS as `0x${string}`,
        abi: PONG_ESCROW_ABI,
        functionName: 'claimRefundForAbandoned',
        args: [roomCode, signature],
      });

      setHash(txHash);
    } catch (err) {
      setError(err as Error);
      console.log("Error writing contract in useClaimRefundForAbandoned with error: ",err)
    }
  }, [writeContractAsync]);

  return {
    claimRefundForAbandoned,
    hash,
    isConfirming,
    isSuccess,
    error,
  };
}