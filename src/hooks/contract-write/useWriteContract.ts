import { useContractWrite, useWaitForTransaction } from "wagmi";

export const useWriteContract = (config: any) => {
    
  const { write, writeAsync, data: transaction, reset, isError, isLoading, error } = useContractWrite(config);

  const { isSuccess, isFetching, isFetched } = useWaitForTransaction({
    hash: transaction?.hash,
  });

  return {
    write,
    writeAsync,
    isLoading,
    isSuccess,
    isError: isError,
    error: error,
    isFetching,
    isFetched,
    transaction,
    reset
  }
}