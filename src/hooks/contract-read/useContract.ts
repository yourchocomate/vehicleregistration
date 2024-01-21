import { useAccount, useContractRead } from "wagmi";
import { REGISTER_CONTRACT_ABI, REGISTER_CONTRACT_ADDRESS } from "@config/constants";

export const useContract = (functionName: string, args?: any[], account?: `0x${string}` | undefined) => {

    const { address } = useAccount();

    if (!account) {
        account = address;
    }
    
    const result = useContractRead({
        account,
        address: REGISTER_CONTRACT_ADDRESS,
        abi: REGISTER_CONTRACT_ABI,
        functionName,
        args,
    });

    console.log(result.error);

    return result;
}